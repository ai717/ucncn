/**
 * MovieDNA - 豆瓣观影数据免插件一键提取书签脚本 (Bookmarklet)
 *
 * 使用方式：
 * 1. 登录豆瓣，进入个人电影主页 (movie.douban.com/mine 或 movie.douban.com/people/{id}/collect)
 * 2. 点击浏览器书签栏中的本脚本，或直接在控制台粘贴执行
 * 3. 脚本在页面右上方展示实时进度，爬取完毕后自动触发下载 douban_movie_{id}_{date}.json
 */
(async function () {
  if (window.__MOVIEDNA_RUNNING__) {
    alert("MovieDNA 提取任务已在运行中，请勿重复点击！");
    return;
  }
  window.__MOVIEDNA_RUNNING__ = true;

  // 1. 校验当前页面域名
  if (!location.hostname.includes("douban.com")) {
    alert("请先登录豆瓣，并在豆瓣页面（推荐个人电影页 movie.douban.com/mine）运行此脚本！");
    window.__MOVIEDNA_RUNNING__ = false;
    return;
  }

  // 2. 智能精准识别当前登录用户 ID (禁止在正文区盲目抓取其他豆友链接)
  let userId = null;

  // 策略 A: 从当前 URL 识别 (/people/{id}/...)
  const userMatch = location.pathname.match(/\/people\/([^/]+)/);
  if (userMatch && !['login', 'register', 'help'].includes(userMatch[1])) {
    userId = userMatch[1];
  }

  // 策略 B: 从豆瓣全站统一顶栏自身账号区提取 (#db-global-nav .top-nav-info)
  if (!userId) {
    const navUser = document.querySelector('#db-global-nav .top-nav-info a[href*="/people/"], #db-global-nav .nav-user-account a[href*="/people/"], a.bn-more[href*="/people/"]');
    if (navUser) {
      const match = navUser.href.match(/\/people\/([^/]+)/);
      if (match && !['login', 'register', 'help'].includes(match[1])) {
        userId = match[1];
      }
    }
  }

  // 策略 C: 异步发起 /mine 重定向探测（已登录时会直接跟随重定向到个人主页 URL）
  if (!userId) {
    try {
      const resp = await fetch('https://movie.douban.com/mine', { credentials: 'include', redirect: 'follow' });
      if (resp && resp.url) {
        const m = resp.url.match(/\/people\/([^/]+)/);
        if (m && !['login', 'register', 'help'].includes(m[1])) {
          userId = m[1];
        }
      }
    } catch (e) {}
  }

  // 策略 D: 弹窗确认或手动输入（绝不随意将页面其他网友作为目标用户！）
  if (!userId) {
    userId = prompt("【MovieDNA】未能自动检测到您的豆瓣登录账号。\n请输入您的豆瓣个性域名或数字 ID（即个人主页 URL /people/你的ID/ 中的字符）：");
    if (!userId) {
      window.__MOVIEDNA_RUNNING__ = false;
      return;
    }
    userId = userId.trim().replace(/^@/, '');
  }

  // 3. 构建悬浮面板 UI
  const panel = document.createElement("div");
  panel.id = "moviedna-panel";
  panel.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999999;
    background: #111827;
    color: #f3f4f6;
    padding: 18px 22px;
    border-radius: 14px;
    box-shadow: 0 12px 30px rgba(0,0,0,0.5);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    min-width: 320px;
    border: 1px solid #374151;
  `;

  panel.innerHTML = `
    <div style="font-weight: 700; font-size: 15px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between;">
      <span>🎬 MovieDNA 数据提取器</span>
      <span id="mdna-status" style="font-size: 12px; color: #10b981; font-weight: 600;">准备就绪</span>
    </div>
    <div style="font-size: 12px; color: #9ca3af; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between; background: rgba(255,255,255,0.05); padding: 6px 10px; border-radius: 8px;">
      <span>目标账号: <strong id="mdna-user-val" style="color: #fbbf24; font-size: 13px;">@${userId}</strong></span>
      <a href="javascript:void(0)" id="mdna-btn-change" style="color: #60a5fa; text-decoration: underline; cursor: pointer; font-size: 11px;">不是我？修改</a>
    </div>
    <div style="background: #374151; border-radius: 6px; height: 8px; overflow: hidden; margin-bottom: 10px;">
      <div id="mdna-bar" style="width: 0%; height: 100%; background: #3b82f6; transition: width 0.3s;"></div>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 12px; color: #d1d5db; margin-bottom: 12px;">
      <span id="mdna-count">已抓取: 0 部</span>
      <span id="mdna-page">第 0 页</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button id="mdna-btn-stop" style="flex: 1; padding: 7px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">中止并导出</button>
      <button id="mdna-btn-close" style="display: none; flex: 1; padding: 7px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600;">关闭</button>
    </div>
  `;
  document.body.appendChild(panel);

  const statusEl = document.getElementById("mdna-status");
  const barEl = document.getElementById("mdna-bar");
  const countEl = document.getElementById("mdna-count");
  const pageEl = document.getElementById("mdna-page");
  const stopBtn = document.getElementById("mdna-btn-stop");
  const closeBtn = document.getElementById("mdna-btn-close");
  const changeBtn = document.getElementById("mdna-btn-change");
  const userValEl = document.getElementById("mdna-user-val");

  let isAborted = false;
  stopBtn.onclick = () => {
    isAborted = true;
    statusEl.innerText = "已手动中止";
    statusEl.style.color = "#f59e0b";
  };

  closeBtn.onclick = () => {
    panel.remove();
    window.__MOVIEDNA_RUNNING__ = false;
  };

  changeBtn.onclick = () => {
    const newId = prompt("请输入您自己的豆瓣个性域名或数字 ID：", userId);
    if (newId && newId.trim()) {
      userId = newId.trim().replace(/^@/, '');
      userValEl.innerText = "@" + userId;
      isAborted = true;
      setTimeout(() => {
        panel.remove();
        window.__MOVIEDNA_RUNNING__ = false;
        alert("已切换目标账号为 @" + userId + "，请再次点击书签立即开始抓取！");
      }, 300);
    }
  };

  // 4. 解析单页数据
  function parseCollectPage(htmlText) {
    const doc = new DOMParser().parseFromString(htmlText, "text/html");
    const items = doc.querySelectorAll(".grid-view .item");
    const records = [];

    items.forEach((item) => {
      try {
        const titleEl = item.querySelector(".info .title a");
        if (!titleEl) return;
        const titleFull = titleEl.innerText.trim().replace(/\s+/g, " ");
        const link = titleEl.href;
        const idMatch = link.match(/\/subject\/(\d+)/);
        const subjectId = idMatch ? idMatch[1] : "";

        const introEl = item.querySelector(".info .intro");
        const intro = introEl ? introEl.innerText.trim() : "";

        const dateEl = item.querySelector(".info .date");
        const markDate = dateEl ? dateEl.innerText.trim() : "";

        let rating = null;
        const ratingEl = item.querySelector(".info span[class*='rating']");
        if (ratingEl) {
          const match = ratingEl.className.match(/rating(\d)-t/);
          if (match) {
            rating = parseInt(match[1], 10) * 2;
          }
        }

        const tagsEl = item.querySelector(".info .tags");
        const tags = tagsEl ? tagsEl.innerText.replace("标签:", "").trim().split(/\s+/) : [];

        const commentEl = item.querySelector(".info .comment");
        const comment = commentEl ? commentEl.innerText.trim() : "";

        records.push({
          subject_id: subjectId,
          title: titleFull,
          url: link,
          intro: intro,
          rating: rating,
          mark_date: markDate,
          tags: tags.filter(Boolean),
          comment: comment,
        });
      } catch (err) {
        console.error("解析条目异常:", err);
      }
    });

    const nextLink = doc.querySelector(".paginator .next a");
    const hasNext = !!nextLink;

    let totalCount = null;
    const h1 = doc.querySelector("#content h1");
    if (h1) {
      const match = h1.innerText.match(/\((\d+)\)/);
      if (match) totalCount = parseInt(match[1], 10);
    }

    return { records, hasNext, totalCount };
  }

  // 5. 触发文件下载
  function downloadJson(data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `douban_movie_${userId}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // 6. 随机休眠函数
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // 7. 主采集流水线
  async function runScraper() {
    let start = 0;
    let page = 1;
    let allRecords = [];
    let totalExpected = null;

    statusEl.innerText = "采集中...";

    while (!isAborted) {
      pageEl.innerText = `第 ${page} 页`;
      const url = `https://movie.douban.com/people/${userId}/collect?start=${start}&sort=time&rating=all&filter=all&mode=grid`;

      try {
        const resp = await fetch(url, { credentials: "include" });
        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`);
        }
        const text = await resp.text();
        const { records, hasNext, totalCount } = parseCollectPage(text);

        if (totalCount && !totalExpected) {
          totalExpected = totalCount;
        }

        allRecords.push(...records);
        countEl.innerText = `已抓取: ${allRecords.length} 部`;

        if (totalExpected) {
          const pct = Math.min(100, Math.round((allRecords.length / totalExpected) * 100));
          barEl.style.width = `${pct}%`;
        }

        if (!hasNext || records.length === 0) {
          break;
        }

        start += 15;
        page += 1;

        const delay = 800 + Math.floor(Math.random() * 700);
        await sleep(delay);
      } catch (e) {
        console.error("抓取失败:", e);
        statusEl.innerText = "网络异常";
        statusEl.style.color = "#ef4444";
        break;
      }
    }

    statusEl.innerText = isAborted ? "已中止并导出" : "已完成！";
    statusEl.style.color = "#10b981";
    barEl.style.width = "100%";
    stopBtn.style.display = "none";
    closeBtn.style.display = "block";

    if (allRecords.length > 0) {
      const exportPayload = {
        meta: {
          douban_id: userId,
          export_time: new Date().toISOString(),
          total_count: allRecords.length,
          client: "MovieDNA Bookmarklet v2.0",
        },
        records: allRecords,
      };
      downloadJson(exportPayload);
    } else {
      alert("未获取到任何观影记录！\n请检查：\n1. 账号 @" + userId + " 的看过的电影是否设置为仅自己可见；\n2. 请确认当前是否已登录豆瓣。");
    }
  }

  runScraper();
})();

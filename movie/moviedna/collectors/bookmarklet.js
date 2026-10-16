/**
 * MovieDNA - 豆瓣观影数据免插件一键提取书签脚本 (Bookmarklet)
 *
 * 使用方式：
 * 1. 登录豆瓣，进入任意“我看过的电影”页面 (movie.douban.com/people/{id}/collect)
 * 2. 点击浏览器书签栏中的本脚本，或直接在控制台粘贴执行
 * 3. 脚本在页面右上方展示实时进度，爬取完毕后自动触发下载 moviedna_records.json
 */
(function () {
  if (window.__MOVIEDNA_RUNNING__) {
    alert("MovieDNA 提取任务已在运行中，请勿重复点击！");
    return;
  }
  window.__MOVIEDNA_RUNNING__ = true;

  // 1. 校验当前页面域名
  if (!location.hostname.includes("douban.com")) {
    alert("请先登录豆瓣，并在豆瓣页面运行此脚本！");
    window.__MOVIEDNA_RUNNING__ = false;
    return;
  }

  // 2. 智能全域识别当前用户 ID (4层兜底探测，在任何豆瓣页面如首页/电影首页均可直接识别)
  let userId = null;

  // 策略 A: 从当前 URL 识别 (/people/{id})
  const userMatch = location.pathname.match(/\/people\/([^/]+)/);
  if (userMatch) userId = userMatch[1];

  // 策略 B: 从豆瓣核心登录 Cookie (dbcl2) 中直接提取数字 ID (只要登录了任何豆瓣页面必定存在)
  if (!userId) {
    const cookieMatch = document.cookie.match(/dbcl2="?(\d+)/);
    if (cookieMatch) {
      userId = cookieMatch[1];
    }
  }

  // 策略 C: 从页面所有个人链接扫描 (如顶部头像、导航菜单等)
  if (!userId) {
    const allUserLinks = document.querySelectorAll('a[href*="/people/"]');
    for (const a of allUserLinks) {
      const match = a.href.match(/\/people\/([^/]+)/);
      if (match && !['login', 'register', 'help'].includes(match[1])) {
        userId = match[1];
        break;
      }
    }
  }

  // 策略 D: 极端情况弹窗手动输入
  if (!userId) {
    userId = prompt("未能自动识别豆瓣账号ID，请输入您的豆瓣个性域名或数字ID：");
    if (!userId) {
      window.__MOVIEDNA_RUNNING__ = false;
      return;
    }
  }

  // 3. 构建悬浮面板 UI
  const panel = document.createElement("div");
  panel.id = "moviedna-panel";
  panel.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 999999;
    background: #1e1e24;
    color: #f3f4f6;
    padding: 16px 20px;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.4);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    min-width: 300px;
    border: 1px solid #374151;
  `;

  panel.innerHTML = `
    <div style="font-weight: 600; font-size: 15px; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
      <span>🎬 MovieDNA 数据提取器</span>
      <span id="mdna-status" style="font-size: 12px; color: #10b981;">准备就绪</span>
    </div>
    <div style="font-size: 12px; color: #9ca3af; margin-bottom: 12px;" id="mdna-user">目标用户: ${userId}</div>
    <div style="background: #374151; border-radius: 6px; height: 8px; overflow: hidden; margin-bottom: 10px;">
      <div id="mdna-bar" style="width: 0%; height: 100%; background: #3b82f6; transition: width 0.3s;"></div>
    </div>
    <div style="display: flex; justify-content: space-between; font-size: 12px; color: #d1d5db; margin-bottom: 12px;">
      <span id="mdna-count">已抓取: 0 部</span>
      <span id="mdna-page">第 0 页</span>
    </div>
    <div style="display: flex; gap: 8px;">
      <button id="mdna-btn-stop" style="flex: 1; padding: 6px; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">中止并导出</button>
      <button id="mdna-btn-close" style="display: none; flex: 1; padding: 6px; background: #10b981; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 12px;">关闭</button>
    </div>
  `;
  document.body.appendChild(panel);

  const statusEl = document.getElementById("mdna-status");
  const barEl = document.getElementById("mdna-bar");
  const countEl = document.getElementById("mdna-count");
  const pageEl = document.getElementById("mdna-page");
  const stopBtn = document.getElementById("mdna-btn-stop");
  const closeBtn = document.getElementById("mdna-btn-close");

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

        // 评分与标记日期
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

        // 标签与短评
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

    // 检查是否有下一页
    const nextLink = doc.querySelector(".paginator .next a");
    const hasNext = !!nextLink;

    // 获取总记录数（通常在 h1 或筛选栏）
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

  // 6. 随机休眠函数 (防封控节流)
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

        // 随机延迟 800ms ~ 1500ms
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
          client: "MovieDNA Bookmarklet v1.0",
        },
        records: allRecords,
      };
      downloadJson(exportPayload);
    } else {
      alert("未获取到任何观影记录，请检查账号是否公开或是否登录！");
    }
  }

  runScraper();
})();

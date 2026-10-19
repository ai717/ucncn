/**
 * MovieDNA - 豆瓣观影数据免插件一键提取书签脚本 (Bookmarklet v2.2)
 *
 * 核心特性：
 * 1. 登录豆瓣任意页面即可点击运行（包括 movie.douban.com/mine、movie.douban.com 首页及个人页）
 * 2. 7 重静默自动探测用户账号（Cookie dbcl2、/mine 302 重定向、顶栏与个人侧栏 DOM、全局变量），绝不弹出烦人 prompt
 * 3. 提取完成后自动下载 douban_movie_{id}_{date}.json
 */
(function () {
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

  // 2. 构建高辨识度悬浮确认与进度面板 (先展示，再异步平滑显示识别到的账号)
  const panel = document.createElement("div");
  panel.id = "moviedna-panel";
  panel.style.cssText = `
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 9999999;
    background: #0f172a;
    color: #f8fafc;
    padding: 20px 22px;
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.1);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    min-width: 330px;
    max-width: 390px;
  `;

  panel.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
      <span style="font-weight: 800; font-size: 15px; color: #38bdf8; display: flex; align-items: center; gap: 6px;">
        <span>🎬</span> MovieDNA 数据提取器
      </span>
      <span id="mdna-status-badge" style="font-size: 11px; padding: 2px 8px; border-radius: 12px; background: rgba(56, 189, 248, 0.15); color: #38bdf8; font-weight: 700;">
        识别中...
      </span>
    </div>

    <!-- 账号确认区 -->
    <div id="mdna-account-box" style="background: rgba(255,255,255,0.06); padding: 12px 14px; border-radius: 12px; margin-bottom: 14px; border: 1px solid rgba(255,255,255,0.1);">
      <div style="font-size: 11px; color: #94a3b8; margin-bottom: 4px;">🎯 即将提取的豆瓣账号：</div>
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <strong id="mdna-user-val" style="color: #fbbf24; font-size: 16px; font-family: monospace; letter-spacing: 0.5px;">🔍 自动探测中...</strong>
        <button id="mdna-btn-change" style="background: rgba(59, 130, 246, 0.2); border: 1px solid #3b82f6; color: #93c5fd; padding: 3px 10px; border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: 700;">修改</button>
      </div>
      <div id="mdna-user-hint" style="font-size: 10px; color: #64748b; margin-top: 6px;">正在自动匹配您的登录状态，无需手动复制 ID</div>
    </div>

    <!-- 初始确认按钮组 -->
    <div id="mdna-action-group" style="display: flex; gap: 10px;">
      <button id="mdna-btn-start" style="flex: 2; padding: 10px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #022c22; font-weight: 900; font-size: 13px; border: none; border-radius: 10px; cursor: pointer; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);">
        🚀 确认无误，开始提取
      </button>
      <button id="mdna-btn-cancel" style="flex: 1; padding: 10px; background: rgba(255,255,255,0.08); color: #94a3b8; font-size: 12px; border: none; border-radius: 10px; cursor: pointer;">
        取消
      </button>
    </div>

    <!-- 运行中进度与状态区 -->
    <div id="mdna-running-box" style="display: none;">
      <div style="background: #334155; border-radius: 8px; height: 8px; overflow: hidden; margin-bottom: 10px;">
        <div id="mdna-bar" style="width: 0%; height: 100%; background: linear-gradient(90deg, #38bdf8 0%, #10b981 100%); transition: width 0.3s;"></div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 12px; color: #cbd5e1; margin-bottom: 12px;">
        <span id="mdna-count" style="font-weight: 700;">已抓取: 0 部</span>
        <span id="mdna-page" style="color: #94a3b8;">第 0 页</span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button id="mdna-btn-stop" style="flex: 1; padding: 8px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 700;">中止并导出当前数据</button>
        <button id="mdna-btn-close" style="display: none; flex: 1; padding: 8px; background: #10b981; color: #022c22; border: none; border-radius: 8px; cursor: pointer; font-size: 12px; font-weight: 900;">完成并关闭</button>
      </div>
    </div>
  `;
  document.body.appendChild(panel);

  const statusBadge = document.getElementById("mdna-status-badge");
  const userValEl = document.getElementById("mdna-user-val");
  const userHintEl = document.getElementById("mdna-user-hint");
  const changeBtn = document.getElementById("mdna-btn-change");
  const startBtn = document.getElementById("mdna-btn-start");
  const cancelBtn = document.getElementById("mdna-btn-cancel");
  const actionGroup = document.getElementById("mdna-action-group");
  const runningBox = document.getElementById("mdna-running-box");

  const barEl = document.getElementById("mdna-bar");
  const countEl = document.getElementById("mdna-count");
  const pageEl = document.getElementById("mdna-page");
  const stopBtn = document.getElementById("mdna-btn-stop");
  const closeBtn = document.getElementById("mdna-btn-close");

  let userId = null;
  let isAborted = false;

  // 3. 多通道全自动账号静默探测函数 (绝不主动弹出原生 prompt)
  async function detectUserId() {
    // 通道 1: 从当前 URL 识别 (/people/{id}/...)
    const urlMatch = location.pathname.match(/\/people\/([^/]+)/) || location.href.match(/\/people\/([^/]+)/);
    if (urlMatch && !['login', 'register', 'help', 'mine', 'explore', 'subject', 'tag', 'settings'].includes(urlMatch[1])) {
      return urlMatch[1].replace(/^@/, '');
    }

    // 通道 2: 从豆瓣最核心的登录 Cookie (dbcl2) 直接读取纯数字 UID
    const cookieMatch = document.cookie.match(/dbcl2="?(\d+)/);
    if (cookieMatch && cookieMatch[1]) {
      return cookieMatch[1];
    }

    // 通道 3: 扫描页面中当前登录用户的个人链接 (导航、侧边栏、个人信息卡)
    const selectors = [
      '#db-global-nav .top-nav-info a[href*="/people/"]',
      '#db-global-nav .nav-user-account a[href*="/people/"]',
      '.global-nav .top-nav-info a[href*="/people/"]',
      '.global-nav .nav-user-account a[href*="/people/"]',
      '.nav-user-account a[href*="/people/"]',
      '#db-usr-profile a[href*="/people/"]',
      '.aside .info a[href*="/people/"]',
      '.aside a.nbg[href*="/people/"]',
      '.user-info a[href*="/people/"]',
      'a.user-profile[href*="/people/"]'
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.href) {
        const m = el.href.match(/\/people\/([^/]+)/);
        if (m && !['login', 'register', 'help', 'mine', 'explore', 'subject', 'tag'].includes(m[1])) {
          return m[1].replace(/^@/, '');
        }
      }
    }

    // 通道 4: 全局扫描页面导航及侧边栏所有指向 /people/ 的个人链接
    const navAndAside = document.querySelectorAll('#db-global-nav a, .global-nav a, #db-usr-profile a, .aside a');
    for (const a of navAndAside) {
      if (a.href && a.href.includes('/people/')) {
        const m = a.href.match(/\/people\/([^/]+)/);
        if (m && !['login', 'register', 'help', 'mine', 'explore', 'subject', 'tag'].includes(m[1])) {
          return m[1].replace(/^@/, '');
        }
      }
    }

    // 通道 5: 扫描页面内联脚本变量 (豆瓣常见 _USER_ID / currentUser)
    for (const script of document.scripts) {
      const txt = script.textContent || '';
      const m = txt.match(/["']?user_id["']?\s*:\s*["']?(\w+)["']?/i) || txt.match(/_USER_ID\s*=\s*["']?(\w+)["']?/);
      if (m && m[1] && m[1] !== '0' && !['null', 'undefined', 'false'].includes(m[1])) {
        return m[1].replace(/^@/, '');
      }
    }

    // 通道 6: 异步请求官方个人短链 /mine (带 Cookie 触发 302 重定向)
    try {
      const resp = await fetch('https://movie.douban.com/mine', { credentials: 'include', redirect: 'follow' });
      if (resp && resp.url) {
        const m = resp.url.match(/\/people\/([^/]+)/);
        if (m && !['login', 'register', 'mine', 'help'].includes(m[1])) {
          return m[1].replace(/^@/, '');
        }
      }
      const htmlText = await resp.text();
      const mHtml = htmlText.match(/movie\.douban\.com\/people\/([^/]+)\/collect/) ||
                    htmlText.match(/\/people\/([^/"]+)\/collect/);
      if (mHtml && !['login', 'register', 'mine', 'help'].includes(mHtml[1])) {
        return mHtml[1].replace(/^@/, '');
      }
    } catch (e) {
      console.warn("探测 movie.douban.com/mine 异常:", e);
    }

    // 通道 7: 备用端点：异步请求 www.douban.com/mine/
    try {
      const resp = await fetch('https://www.douban.com/mine/', { credentials: 'include', redirect: 'follow' });
      if (resp && resp.url) {
        const m = resp.url.match(/\/people\/([^/]+)/);
        if (m && !['login', 'register', 'mine', 'help'].includes(m[1])) {
          return m[1].replace(/^@/, '');
        }
      }
    } catch (e) {}

    return null;
  }

  // 执行静默探测
  detectUserId().then((detected) => {
    if (detected) {
      userId = detected;
      userValEl.innerText = "@" + userId;
      statusBadge.innerText = "已就绪";
      statusBadge.style.color = "#10b981";
      statusBadge.style.background = "rgba(16, 185, 129, 0.15)";
      userHintEl.innerText = "已自动匹配您的账号，确认无误即可开始提取";
    } else {
      userValEl.innerHTML = "<span style='color: #f87171; font-size: 13px;'>未检测到登录账号</span>";
      statusBadge.innerText = "需手动指定";
      statusBadge.style.color = "#f59e0b";
      userHintEl.innerText = "请确认您已登录豆瓣，或点击右侧手动输入您的账号";
      changeBtn.innerText = "手动输入";
    }
  }).catch(() => {
    userValEl.innerHTML = "<span style='color: #f87171; font-size: 13px;'>未检测到登录</span>";
    statusBadge.innerText = "需手动指定";
    statusBadge.style.color = "#f59e0b";
    changeBtn.innerText = "手动输入";
  });

  cancelBtn.onclick = () => {
    panel.remove();
    window.__MOVIEDNA_RUNNING__ = false;
  };

  changeBtn.onclick = () => {
    const newId = prompt("请输入您自己的豆瓣个性域名或数字 ID：", userId || '');
    if (newId && newId.trim()) {
      userId = newId.trim().replace(/^@/, '');
      userValEl.innerText = "@" + userId;
      statusBadge.innerText = "已手动指定";
      statusBadge.style.color = "#38bdf8";
      userHintEl.innerText = "已设定提取账号为 @" + userId;
      changeBtn.innerText = "修改";
    }
  };

  stopBtn.onclick = () => {
    isAborted = true;
    statusBadge.innerText = "已手动中止";
    statusBadge.style.color = "#f59e0b";
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

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  startBtn.onclick = async function () {
    if (!userId) {
      const manual = prompt("未能自动检测到账号，请输入您的豆瓣账号 ID（打开个人主页 URL /people/你的ID/ 中的这串字符）：");
      if (!manual || !manual.trim()) return;
      userId = manual.trim().replace(/^@/, '');
      userValEl.innerText = "@" + userId;
    }

    actionGroup.style.display = "none";
    changeBtn.style.display = "none";
    runningBox.style.display = "block";
    statusBadge.innerText = "采集中";
    statusBadge.style.color = "#34d399";
    statusBadge.style.background = "rgba(52, 211, 153, 0.15)";

    let start = 0;
    let page = 1;
    let allRecords = [];
    let totalExpected = null;

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
        statusBadge.innerText = "网络异常";
        statusBadge.style.color = "#ef4444";
        break;
      }
    }

    statusBadge.innerText = isAborted ? "已中止" : "已完成";
    statusBadge.style.color = "#10b981";
    barEl.style.width = "100%";
    stopBtn.style.display = "none";
    closeBtn.style.display = "block";

    if (allRecords.length > 0) {
      const exportPayload = {
        meta: {
          douban_id: userId,
          export_time: new Date().toISOString(),
          total_count: allRecords.length,
          client: "MovieDNA Bookmarklet v2.2",
        },
        records: allRecords,
      };
      downloadJson(exportPayload);
    } else {
      alert("未获取到任何观影记录！\n请检查：\n1. 账号 @" + userId + " 的“我看过的电影”是否设置为仅自己可见；\n2. 请确认该账号是否有观影标记。");
    }
  };
})();

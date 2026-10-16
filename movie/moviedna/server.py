import os
import json
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse

from core.parser import DoubanDataParser
from core.analyzer import MovieStatsAnalyzer
from core.dna_engine import MovieDnaPromptEngine
from web.report_generator import ReportGenerator

app = FastAPI(title="MovieDNA - 豆瓣观影基因系统")

HOME_HTML = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MovieDNA - 个人观影基因一键生成</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: #0b0f19; color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .glass-card { background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.08); }
    .gold-gradient { background: linear-gradient(135deg, #f59e0b, #fbbf24); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .drop-zone { border: 2px dashed rgba(255, 255, 255, 0.15); transition: all 0.3s ease; }
    .drop-zone.dragover { border-color: #3b82f6; background: rgba(59, 130, 246, 0.05); }
    .bookmarklet-btn { cursor: move; cursor: grab; user-select: none; }
    .bookmarklet-btn:active { cursor: grabbing; }
  </style>
</head>
<body class="min-h-screen py-10 px-4 flex items-center justify-center">
  <div class="max-w-3xl w-full space-y-8 text-center">
    
    <!-- 头部标语 -->
    <div>
      <div class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/40 text-emerald-400 border border-emerald-500/20 mb-3">
        安全 · 零插件 · 零封号风险
      </div>
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">
        豆瓣个人 <span class="gold-gradient">观影基因</span> 一键生成
      </h1>
      <p class="text-gray-400 text-sm mt-3 max-w-lg mx-auto">
        全量观影记录清洗 · 五维审美雷达构建 · 极端评价毒辣画像 · 专属选片模型
      </p>
    </div>

    <!-- 步骤一：拖拽书签按钮 (核心一键添加) -->
    <div class="glass-card rounded-2xl p-6 text-left border border-amber-500/20 bg-amber-950/10 space-y-4">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-amber-500 text-black text-xs font-black flex items-center justify-center">1</span>
        <h2 class="text-base font-bold text-amber-300">第一步：将按钮拖到书签栏</h2>
      </div>
      
      <p class="text-xs text-gray-400 leading-relaxed">
        鼠标按住下方按钮，<strong class="text-gray-200">直接拖拽到浏览器书签栏</strong>（若未显示书签栏，按快捷键 <kbd class="px-1.5 py-0.5 bg-gray-800 rounded border border-gray-700 text-amber-400 font-mono">Ctrl + Shift + B</kbd> 打开）：
      </p>

      <div class="flex flex-wrap items-center gap-3 pt-1">
        <!-- 核心可拖拽 a 标签，文字精炼利落 -->
        <a id="bookmarklet-link" href="#" class="bookmarklet-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5">
          <span>🎬 豆瓣数据提取</span>
        </a>

        <button onclick="copyBookmarkletCode()" class="text-xs text-gray-400 hover:text-white px-3 py-2 rounded-lg bg-gray-800/80 border border-gray-700 transition">
          📋 复制脚本代码
        </button>
      </div>
    </div>

    <!-- 步骤二：打开任意豆瓣页面并点击书签提取 -->
    <div class="glass-card rounded-2xl p-6 text-left border border-emerald-500/20 bg-emerald-950/10 space-y-4">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-emerald-500 text-black text-xs font-black flex items-center justify-center">2</span>
        <h2 class="text-base font-bold text-emerald-300">第二步：打开豆瓣并点击书签提取</h2>
      </div>

      <p class="text-xs text-gray-400 leading-relaxed">
        点击下方按钮打开豆瓣电影（或已登录的任意豆瓣页面）。打开后，在页面上直接点击书签栏上的 <strong class="text-emerald-300">「🎬 豆瓣数据提取」</strong>，脚本将<strong class="text-gray-200">自动嗅探识别你的账号 ID</strong> 并静默提取全量观影记录：
      </p>

      <div class="pt-1">
        <a href="https://movie.douban.com/" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition transform hover:-translate-y-0.5">
          <span>🔗 打开豆瓣电影首页 (movie.douban.com)</span>
          <span class="text-xs opacity-80">↗</span>
        </a>
      </div>
    </div>

    <!-- 步骤三：上传 JSON 区域 -->
    <div class="glass-card rounded-2xl p-6 text-left space-y-4">
      <div class="flex items-center gap-2">
        <span class="w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-black flex items-center justify-center">3</span>
        <h2 class="text-base font-bold text-blue-400">第三步：上传导出的 JSON 并生成报告</h2>
      </div>

      <div id="drop-area" class="drop-zone glass-card rounded-xl p-8 cursor-pointer text-center space-y-3">
        <input type="file" id="file-input" accept=".json" class="hidden" />
        <div class="w-12 h-12 mx-auto rounded-full bg-blue-600/10 flex items-center justify-center text-blue-400 text-xl border border-blue-500/20">
          📁
        </div>
        <div>
          <div class="text-sm font-semibold text-gray-200">点击选择或将 JSON 文件拖入此处</div>
          <div class="text-xs text-gray-500 mt-1">支持由 MovieDNA 导出的观影记录</div>
        </div>
        <button id="upload-btn" class="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition shadow-lg shadow-blue-500/20">
          选择文件并生成
        </button>
      </div>
    </div>

  </div>

  <script>
    // 注入 Bookmarklet 代码到拖拽链接
    fetch('/collectors/bookmarklet.min.txt')
      .then(r => r.text())
      .then(code => {
        document.getElementById('bookmarklet-link').href = code.trim();
        window.__BOOKMARKLET_CODE__ = code.trim();
      })
      .catch(() => {
        // 兜底回退
        const fallback = "javascript:(function(){alert('请确保服务已启动并能读取 collectors/bookmarklet.min.txt');})();";
        document.getElementById('bookmarklet-link').href = fallback;
      });

    function copyBookmarkletCode() {
      if (window.__BOOKMARKLET_CODE__) {
        navigator.clipboard.writeText(window.__BOOKMARKLET_CODE__);
        alert('书签脚本代码已复制！您可以新建浏览器书签并将网址(URL)粘贴进去。');
      } else {
        alert('脚本正在加载，请稍等一秒后重试！');
      }
    }

    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-btn');

    uploadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });
    dropArea.addEventListener('click', () => fileInput.click());

    dropArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropArea.classList.add('dragover');
    });
    dropArea.addEventListener('dragleave', () => dropArea.classList.remove('dragover'));
    dropArea.addEventListener('drop', (e) => {
      e.preventDefault();
      dropArea.classList.remove('dragover');
      if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        handleFile(fileInput.files[0]);
      }
    });

    function handleFile(file) {
      if (!file.name.endsWith('.json')) {
        alert('请上传 .json 文件！');
        return;
      }
      const formData = new FormData();
      formData.append('file', file);

      dropArea.innerHTML = '<div class="py-8 text-blue-400 font-medium animate-pulse">🚀 正在解析观影数据并构建五维审美雷达...</div>';

      fetch('/api/analyze', {
        method: 'POST',
        body: formData
      })
      .then(resp => {
        if (!resp.ok) throw new Error('解析失败，请检查文件格式');
        return resp.json();
      })
      .then(data => {
        if (data.redirect_url) {
          window.location.href = data.redirect_url;
        } else {
          location.reload();
        }
      })
      .catch(err => {
        alert(err.message);
        location.reload();
      });
    }
  </script>
</body>
</html>
"""

@app.get("/", response_class=HTMLResponse)
async def index():
    return HOME_HTML

from fastapi.staticfiles import StaticFiles

# 挂载静态资源 (favicon 等)
static_dir = os.path.join(os.path.dirname(__file__), "web", "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

@app.get("/favicon.ico")
async def favicon():
    fav_path = os.path.join(static_dir, "favicon.svg")
    if os.path.exists(fav_path):
        with open(fav_path, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read(), media_type="image/svg+xml")
    return HTMLResponse(content="", status_code=404)

@app.get("/collectors/bookmarklet.min.txt")
async def get_bookmarklet_txt():
    path = os.path.join(os.path.dirname(__file__), "collectors", "bookmarklet.min.txt")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read(), media_type="text/plain")
    return HTMLResponse(content="", status_code=404)

import urllib.request
from fastapi import Response

_IMG_CACHE = {}

@app.get("/api/proxy/image")
async def proxy_image(url: str):
    """自建零依赖图片反向代理：伪装豆瓣 Referer 穿透防盗链，支持多镜像智能容灾回退与防爬 HTML 过滤"""
    if not url.startswith("http://") and not url.startswith("https://"):
        raise HTTPException(status_code=400, detail="Invalid URL")
    
    if url in _IMG_CACHE:
        cached_content, content_type = _IMG_CACHE[url]
        return Response(content=cached_content, media_type=content_type, headers={"Cache-Control": "public, max-age=86400"})
    
    # 构建智能重试候选列表 (处理豆瓣部分老海报 webp 404 或特定子域被阻断/EdgeOne 拦截的问题)
    candidate_urls = [url]
    
    # 优先替换为最稳定的图片子域：img1, img2, img3 (img9 常被 EdgeOne 拦截)
    for current_sub in ["img9", "img1", "img2", "img3"]:
        if f"{current_sub}.doubanio.com" in url:
            for target_sub in ["img1", "img2", "img3", "img9"]:
                if target_sub != current_sub:
                    cand = url.replace(f"{current_sub}.doubanio.com", f"{target_sub}.doubanio.com")
                    if cand not in candidate_urls:
                        candidate_urls.append(cand)
    
    extra_candidates = []
    for cand in candidate_urls:
        if ".webp" in cand:
            extra_candidates.append(cand.replace(".webp", ".jpg"))
            extra_candidates.append(cand.replace(".webp", ".jpeg"))
    candidate_urls.extend(extra_candidates)
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://movie.douban.com/",
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
    }
    
    for candidate in candidate_urls:
        try:
            req = urllib.request.Request(candidate, headers=headers)
            with urllib.request.urlopen(req, timeout=4) as resp:
                content = resp.read()
                c_type = resp.headers.get_content_type() or ""
                # 关键防护：豆瓣防爬挑战会返回 HTTP 200 text/html (长度通常在 900-1000 字节)
                # 必须严格校验只有真正的图片数据 (c_type 是 image/* 且长度大于 1200 字节) 才能被作为海报返回！
                if not c_type.startswith("image/") or len(content) < 1200:
                    continue
                if len(_IMG_CACHE) < 500:
                    _IMG_CACHE[url] = (content, c_type)
                return Response(content=content, media_type=c_type, headers={"Cache-Control": "public, max-age=86400"})
        except Exception:
            continue
            
    # 若所有远程均无法获取，返回高雅电影胶片占位 SVG，绝不碎图或黑块
    fallback_svg = """<svg xmlns="http://www.w3.org/2000/svg" width="300" height="450" viewBox="0 0 300 450">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
  </defs>
  <rect width="300" height="450" fill="url(#g)" rx="12"/>
  <rect x="8" y="8" width="284" height="434" fill="none" stroke="rgba(148,163,184,0.15)" stroke-width="2" stroke-dasharray="6,6" rx="8"/>
  <circle cx="150" cy="190" r="44" fill="rgba(0,181,29,0.15)"/>
  <text x="150" y="202" font-size="38" text-anchor="middle">🎬</text>
  <text x="150" y="260" font-size="16" font-weight="bold" fill="#f1f5f9" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,sans-serif">殿堂光影</text>
  <text x="150" y="285" font-size="12" fill="#64748b" text-anchor="middle" font-family="-apple-system,BlinkMacSystemFont,sans-serif">豆瓣年度电影记忆</text>
</svg>""".encode("utf-8")
    return Response(content=fallback_svg, media_type="image/svg+xml", headers={"Cache-Control": "public, max-age=86400"})

@app.post("/api/analyze")
async def analyze_file(file: UploadFile = File(...)):
    if not file.filename.endswith(".json"):
        raise HTTPException(status_code=400, detail="Only .json files are supported")
    try:
        content = await file.read()
        raw_json = json.loads(content.decode("utf-8"))

        parsed = DoubanDataParser.parse_json_data(raw_json)
        meta = parsed.get("meta", {})
        records = parsed.get("records", [])

        if not records:
            raise HTTPException(status_code=400, detail="No movie records found in file")

        douban_id = meta.get("douban_id", "user")

        analyzer = MovieStatsAnalyzer(records)
        stats = analyzer.analyze()

        # 生成 Prompt
        prompt = MovieDnaPromptEngine.build_dna_generation_prompt(stats, meta)
        html_report = ReportGenerator.generate_html(stats, meta, dna_markdown="", dna_prompt=prompt)

        # 植入持久化专属链接提示条（如果需要）
        persistent_bar = f"""
        <div style="margin-top: 16px; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid rgba(0,181,29,0.3); border-radius: 12px; font-size: 12px; color: #9ca3af; display: flex; justify-content: space-between; align-items: center;">
          <span>🔗 本报告永久专属链接：<a href="/report/{douban_id}" style="color: #34d399; text-decoration: underline; font-family: monospace;">/report/{douban_id}</a></span>
          <span style="color: #10b981; font-weight: 600;">✓ 已永久持久化保存</span>
        </div>
        """
        html_report = html_report.replace("</div>\n    </section>", persistent_bar + "</div>\n    </section>", 1)

        # 在生成的 HTML 顶部注入一段小脚本，静默将浏览器地址栏更新为专属链接 /report/{douban_id}
        url_sync_script = f"""<script>if (window.history && window.history.pushState) {{ window.history.pushState(null, '', '/report/{douban_id}'); }}</script>"""
        html_report = html_report.replace("</body>", f"{url_sync_script}</body>")

        # 核心持久化存储：保存到 output/reports 目录
        reports_dir = os.path.join(os.path.dirname(__file__), "output", "reports")
        os.makedirs(reports_dir, exist_ok=True)

        user_html_path = os.path.join(reports_dir, f"{douban_id}.html")
        with open(user_html_path, "w", encoding="utf-8") as f:
            f.write(html_report)

        user_stats_path = os.path.join(reports_dir, f"{douban_id}_stats.json")
        with open(user_stats_path, "w", encoding="utf-8") as f:
            json.dump({"meta": meta, "stats": stats}, f, ensure_ascii=False, indent=2)

        return JSONResponse(content={
            "success": True,
            "user_id": douban_id,
            "redirect_url": f"/report/{douban_id}"
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")

@app.get("/report/{user_id}", response_class=HTMLResponse)
async def view_report(user_id: str):
    reports_dir = os.path.join(os.path.dirname(__file__), "output", "reports")
    user_html_path = os.path.join(reports_dir, f"{user_id}.html")
    if os.path.exists(user_html_path):
        with open(user_html_path, "r", encoding="utf-8") as f:
            return HTMLResponse(content=f.read())
    raise HTTPException(status_code=404, detail=f"报告未找到：用户 @{user_id} 尚未生成观影基因。")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8765, reload=True)

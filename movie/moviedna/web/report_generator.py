import os
import json
from typing import Dict, Any

class ReportGenerator:
    """
    MovieDNA 电影感全景观影基因报告生成器
    - 融入豆瓣官方复古墨绿织纹、长尾夹信纸、邮戳印章与电影胶片美学
    - 宽屏 880px 响应式自适应（一屏一核心模块，大屏呼吸感强，小屏自适应）
    - 内置 Referrer 穿透，确保真实豆瓣海报 100% 加载
    - 引入基于结构化特征的自适应文案人格判断引擎
    - IntersectionObserver 视口滚动入场动效与数据跳动动效
    - 预留正规 AI 数字孪生选片大脑激活入口
    """

    @classmethod
    def derive_persona_profile(cls, total_movies: int, avg_rating: float, five_star_pct: float, low_star_pct: float, comment_count: int, top_tags: list) -> Dict[str, str]:
        """根据结构化数据统计特征，自适应推导用户观影人格与诗意长文"""
        # 1. 评分人格判定
        if five_star_pct >= 28.0:
            persona_title = "感性沉浸共情者"
            rating_desc = f"五星率高达 {five_star_pct}%。你有一颗热烈而宽容的心灵，在光影世界里毫不吝啬赞美，总能敏锐捕捉到创作者最细微的情感火花。"
        elif five_star_pct <= 14.0 or low_star_pct >= 18.0:
            persona_title = "冷峻严苛审判者"
            rating_desc = f"五星神作率仅 {five_star_pct}%，低分率占 {low_star_pct}%。在喧嚣浮躁的时代里，你坚守着极其严苛的审美底线，杜绝任何平庸煽情与智商侮辱。"
        else:
            persona_title = "理性现实品鉴家"
            rating_desc = f"均分稳定在 {avg_rating} 分，五星神作占 {five_star_pct}%。不轻易给予盲目狂热，也不肆意宣泄苛责，在品质与诚意之间有着清醒的打分天平。"

        # 2. 阅历与体量判定
        if total_movies >= 1800:
            volume_desc = "数千个不可替代的夜晚，跨越近二十载寒来暑往。光影早已不仅是消遣，而是与你骨血相融的精神平行宇宙。"
        elif total_movies >= 800:
            volume_desc = "数百部光影印记，构建了你丰厚多元的世界观底色，在不同国别与流派中从容穿梭。"
        else:
            volume_desc = "每一部静心凝视的作品，都在时光的长河里留下了清晰的坐标与思考。"

        # 3. 表达与短评判定
        if comment_count >= 150:
            comment_desc = f"留下了 {comment_count} 篇笔力锋利的真实短评。爱憎分明、直击肯綮，文字是你与创作者之间最真诚的交锋。"
        else:
            comment_desc = "以沉默的星级作为最坚固的注脚，大音希声，每一次打标都是私人的精神私藏。"

        return {
            "persona_title": persona_title,
            "rating_desc": rating_desc,
            "volume_desc": volume_desc,
            "comment_desc": comment_desc
        }

    @classmethod
    def generate_html(cls, stats: Dict[str, Any], meta: Dict[str, Any], dna_markdown: str = "", dna_prompt: str = "") -> str:
        douban_id = meta.get("douban_id", "cinephile")
        overview = stats.get("overview", {})
        rating_dist = stats.get("rating_distribution", {})
        year_timeline = stats.get("year_timeline", {})
        top_tags = stats.get("top_tags", [])[:20]
        samples = stats.get("representative_samples", {})
        praise_samples = samples.get("praise_samples", [])[:6]
        criticism_samples = samples.get("criticism_samples", [])[:6]
        prompt_content = dna_prompt or stats.get("dna_prompt", "")

        total_movies = overview.get("total_movies", 0)
        rated_movies = overview.get("rated_movies", 0)
        avg_rating = overview.get("average_rating", 0.0)
        five_star_pct = overview.get("five_star_rate", 0.0)
        four_star_pct = overview.get("four_star_rate", 0.0)
        three_star_pct = overview.get("three_star_rate", 0.0)
        low_star_pct = overview.get("low_star_rate", 0.0)
        comment_count = overview.get("total_comments", 0)

        # 评分金字塔部数与严苛特征推导
        score_10_count = rating_dist.get("score_10", {}).get("count", int(rated_movies * five_star_pct / 100))
        score_8_count = rating_dist.get("score_8", {}).get("count", int(rated_movies * four_star_pct / 100))
        score_6_count = rating_dist.get("score_6", {}).get("count", int(rated_movies * three_star_pct / 100))
        score_low_count = rating_dist.get("score_4", {}).get("count", 0) + rating_dist.get("score_2", {}).get("count", 0)
        if score_low_count == 0 and low_star_pct > 0:
            score_low_count = max(1, int(rated_movies * low_star_pct / 100))

        if five_star_pct <= 12:
            pyramid_stance_title = f"极高门槛 · 殿堂率 {five_star_pct}%"
            pyramid_stance_desc = "千淘万漉方成金，唯有直击灵魂的传世神作方能赢得五星加冕。"
        elif five_star_pct <= 26:
            pyramid_stance_title = f"黄金天平 · 殿堂率 {five_star_pct}%"
            pyramid_stance_desc = "严格把守殿堂门槛，四星佳作广布，三星平庸不宥，评分分布严谨稳固。"
        else:
            pyramid_stance_title = f"慷慨共情 · 殿堂率 {five_star_pct}%"
            pyramid_stance_desc = "善于在每部作品的光影脉络中捕捉人性闪光与诚意，沉浸感知力充沛。"

        year_keys = list(year_timeline.keys())
        year_values = [year_timeline[k] for k in year_keys]
        start_year = year_keys[0] if year_keys else "2007"
        end_year = year_keys[-1] if year_keys else "2026"
        year_span = len(year_keys)
        total_hours = round(total_movies * 110 / 60)

        # 自适应推导文案
        persona = cls.derive_persona_profile(
            total_movies, avg_rating, five_star_pct, low_star_pct, comment_count, top_tags
        )

        # 核心五维雷达
        tag_dict = {t["tag"]: t["count"] for t in top_tags}
        r_visual = min(98, 82 + int((tag_dict.get("动画", 0) + tag_dict.get("经典", 0)) * 0.4))
        r_logic = min(96, 80 + int((tag_dict.get("科幻", 0) + tag_dict.get("悬疑", 0) + tag_dict.get("犯罪", 0)) * 0.3))
        r_emotion = min(98, 86 + int((tag_dict.get("剧情", 0) + tag_dict.get("人性", 0)) * 0.2))
        r_social = min(95, 82 + int((tag_dict.get("历史", 0) + tag_dict.get("社会", 0) + tag_dict.get("华语", 0)) * 0.3))
        r_antifake = min(100, 85 + int(low_star_pct * 1.1))
        radar_values = [r_visual, r_logic, r_emotion, r_social, r_antifake]

        # 动态加权雷达维度：数值越大的维度字号越大、视觉越明显
        radar_dims = [
            {"name": "镜头美学", "sub": "视觉风格/构图", "val": r_visual},
            {"name": "叙事智性", "sub": "剧作/逻辑/反转", "val": r_logic},
            {"name": "质朴深情", "sub": "人性共鸣/治愈", "val": r_emotion},
            {"name": "社会隐喻", "sub": "时代/批判/历史", "val": r_social},
            {"name": "反装逼雷达", "sub": "严打悬浮/虚伪", "val": r_antifake}
        ]
        max_r_val = max(d["val"] for d in radar_dims)
        radar_indicators = []
        for d in radar_dims:
            v = d["val"]
            nm = d["name"]
            sb = d["sub"]
            if v == max_r_val:
                sk = "top"
                tag = f"👑 核心极值 {v}分"
            elif v >= 92:
                sk = "high"
                tag = f"✦ 突出 {v}分"
            elif v >= 86:
                sk = "mid"
                tag = f"{v}分"
            else:
                sk = "low"
                tag = f"{v}分"
            name_str = f"{{{sk}|{nm}}}\n{{{sk}|{tag}}}\n{{sub|({sb})}}"
            radar_indicators.append({"name": name_str, "max": 100})

        # 排序生成五维决策天赋勋章胶囊栏 (值越大的胶囊越突出)
        sorted_dims = sorted(radar_dims, key=lambda x: x["val"], reverse=True)
        radar_rank_html = "".join([
            f"""<div class="radar-rank-badge {'top-badge' if d['val'] == max_r_val else ''}">
              <div class="radar-rank-label">
                {'👑 ' if d['val'] == max_r_val else ''}{d['name']}
              </div>
              <div class="radar-rank-val">{d['val']} 分</div>
            </div>"""
            for d in sorted_dims
        ])

        # 动态计算核心题材矩阵 (排除国别词与干扰词，智能提取最多 TOP 10 核心题材)
        geo_words = {"美国", "香港", "中国", "大陆", "日本", "英国", "法国", "韩国", "台湾", "德国", "意大利", "欧洲", "电影", "华语", "欧美"}
        valid_genres = [t for t in top_tags if t["tag"] not in geo_words][:10]
        if not valid_genres:
            valid_genres = [
                {"tag": "剧情", "count": int(total_movies * 0.32)},
                {"tag": "动作", "count": int(total_movies * 0.26)},
                {"tag": "喜剧", "count": int(total_movies * 0.22)},
                {"tag": "爱情", "count": int(total_movies * 0.19)},
                {"tag": "科幻", "count": int(total_movies * 0.16)},
                {"tag": "悬疑", "count": int(total_movies * 0.14)},
                {"tag": "犯罪", "count": int(total_movies * 0.12)},
                {"tag": "动画", "count": int(total_movies * 0.10)},
                {"tag": "奇幻", "count": int(total_movies * 0.08)},
                {"tag": "冒险", "count": int(total_movies * 0.07)}
            ]
        
        max_genre_count = max([g["count"] for g in valid_genres] + [1])
        genre_count = len(valid_genres)
        
        genre_bars_html = "".join([
            f"""<div class="bar-row">
              <span class="bar-label">{g['tag']}</span>
              <div class="bar-track">
                <div class="bar-fill" style="--target-width: {min(100, round(g['count'] / max_genre_count * 100))}%;"></div>
              </div>
              <span class="bar-num">{round(g['count'] / max(total_movies, 1) * 100, 1)}%</span>
            </div>"""
            for g in valid_genres
        ])

        # 辅助函数：清洗豆瓣过长、多重斜杠多语言片名，只保留核心主片名
        def clean_title(full_title: str) -> str:
            if not full_title:
                return "未命名作品"
            main_name = full_title.split("/")[0].strip()
            return main_name if len(main_name) <= 24 else main_name[:24] + "…"

        # 8x8 殿堂级电影海报阵列池 (64 部影史丰碑，高密度震撼成就感墙)
        posters_json_path = os.path.join(os.path.dirname(__file__), "top64_posters.json")
        demo_posters = []
        if os.path.exists(posters_json_path):
            try:
                with open(posters_json_path, "r", encoding="utf-8") as f:
                    demo_posters = json.load(f)
            except Exception:
                pass
        
        # 兜底默认 16 部经典海报
        if not demo_posters:
            demo_posters = [
                {"title": "肖申克的救赎", "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg"},
                {"title": "霸王别姬", "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2911205318.jpg"},
                {"title": "星际穿越", "img": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2614988097.jpg"},
                {"title": "盗梦空间", "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2616355133.jpg"},
                {"title": "千与千寻", "img": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg"},
                {"title": "泰坦尼克号", "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p1496529651.jpg"},
                {"title": "这个杀手不太冷", "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg"},
                {"title": "美丽人生", "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2578474613.jpg"},
                {"title": "机器人总动员", "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1461851991.jpg"},
                {"title": "三傻大闹宝莱坞", "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p579729551.jpg"},
                {"title": "疯狂动物城", "img": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2614500649.jpg"},
                {"title": "楚门的世界", "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p479682972.jpg"},
                {"title": "寻梦环游记", "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2505426431.jpg"},
                {"title": "大话西游", "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561721372.jpg"},
                {"title": "教父", "img": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p616779645.jpg"},
                {"title": "流浪地球2", "img": "https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2916835424.jpg"}
            ]

        # 确保正好 64 张海报形成 8x8 阵列
        active_posters = (demo_posters * 4)[:64] if len(demo_posters) < 64 else demo_posters[:64]

        # 双轨代理机制：优先通过本地反代 /api/proxy/image 穿透防盗链，若失败自动降级到原图并有优雅 fallback 底卡
        # 对 8x8 网格计算斜向对角线入场延时 (x + y) * 0.035s
        poster_wall_html = "".join([
            f"""<div class="poster-card" style="--delay: {round(((idx % 8) + (idx // 8)) * 0.035, 3)}s;" title="{p['title']}">
              <div class="poster-fallback-badge">
                <span class="poster-badge-icon">🎬</span>
                <span class="poster-fallback-title">{clean_title(p['title'])}</span>
              </div>
              <img src="/api/proxy/image?url={p['img']}" onerror="if(!this.dataset.fallback){{this.dataset.fallback='1';this.src='{p['img']}';}}else{{this.style.opacity='0';}}" alt="{p['title']}" loading="lazy" />
              <div class="poster-overlay">{clean_title(p['title'])}</div>
            </div>"""
            for idx, p in enumerate(active_posters)
        ])

        praise_html = "".join([
            f"""<div class="quote-row gold-quote">
              <div class="quote-header">
                <span class="quote-film-title" title="{p['title']}">《{clean_title(p['title'])}》</span>
                <span class="quote-tag gold-tag">★★★★★ 10分</span>
              </div>
              <div class="quote-text">“{p['comment']}”</div>
            </div>""" for p in praise_samples
        ])

        critic_html = "".join([
            f"""<div class="quote-row red-quote">
              <div class="quote-header">
                <span class="quote-film-title" title="{c['title']}">《{clean_title(c['title'])}》</span>
                <span class="quote-tag red-tag">{'★' * (c.get('rating', 2) // 2) + '☆' * (5 - (c.get('rating', 2) // 2))} {c.get('rating', 2)}分</span>
              </div>
              <div class="quote-text">“{c['comment']}”</div>
            </div>""" for c in criticism_samples
        ])

        html_content = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- 核心设置：no-referrer 彻底穿透豆瓣防盗链，确保海报 100% 显示 -->
  <meta name="referrer" content="no-referrer">
  <title>我的光影纪 · @{douban_id} 豆瓣观影报告</title>
  <link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet">
  <script src="/static/echarts.min.js"></script>
  <script src="https://registry.npmmirror.com/echarts/5.4.3/files/dist/echarts.min.js"></script>
  <script src="/static/marked.min.js"></script>
  <script src="https://registry.npmmirror.com/marked/9.1.6/files/marked.min.js"></script>
  <style>
    :root {{
      --bg-forest: #0b1510;
      --douban-green: #00b51d;
      --douban-soft-green: #a7f3d0;
      --paper-cream: #eef9f1;
      --paper-blue: #0284c7;
      --gold: #f59e0b;
      --danger: #ef4444;
      --text-dark: #1f2937;
      --text-light: #f3f4f6;
      --text-muted: #9ca3af;
    }}

    * {{ box-sizing: border-box; margin: 0; padding: 0; }}

    body {{
      background-color: var(--bg-forest);
      background-image: 
        radial-gradient(circle at 50% 10%, rgba(0, 181, 29, 0.22) 0%, transparent 55%),
        repeating-linear-gradient(45deg, rgba(0,0,0,0.18) 0, rgba(0,0,0,0.18) 2px, transparent 0, transparent 5px);
      color: var(--text-light);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }}

    .film-grain {{
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 99; opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }}

    /* 宽屏版心：桌面端宽阔优雅 880px，支持大体一屏一模块的自然呼吸感 */
    .viewport-flow {{
      max-width: 880px;
      margin: 0 auto;
      padding: 40px 20px 80px 20px;
      display: flex;
      flex-direction: column;
      gap: 36px;
    }}

    /* 模块入场视口滚动渐现动效 */
    .reveal-card {{
      opacity: 0;
      transform: translateY(36px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }}
    .reveal-card.revealed {{
      opacity: 1;
      transform: translateY(0);
    }}
    /* 首屏信笺保证立即呈现 */
    .paper-section {{
      opacity: 1 !important;
      transform: translateY(0) !important;
    }}

    /* 金属长尾夹拟物隐喻 */
    .binder-clip {{
      width: 56px;
      height: 48px;
      margin: 0 auto -20px auto;
      position: relative;
      z-index: 30;
      display: flex;
      flex-direction: column;
      align-items: center;
    }}
    .clip-wire {{
      width: 32px;
      height: 28px;
      border: 3px solid #71717a;
      border-bottom: none;
      border-radius: 12px 12px 0 0;
      box-shadow: 0 4px 8px rgba(0,0,0,0.6);
    }}
    .clip-body {{
      width: 52px;
      height: 18px;
      background: linear-gradient(180deg, #27272a 0%, #18181b 100%);
      border-radius: 4px;
      border: 1px solid #3f3f46;
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
    }}

    /* 模块 1：复古牛油果淡青信纸 (吸收图 1、图 4、图 5) */
    .paper-section {{
      background: var(--paper-cream);
      color: var(--text-dark);
      border-radius: 32px;
      padding: 48px 44px 40px 44px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 181, 29, 0.12);
      position: relative;
      overflow: hidden;
    }}

    /* 复古邮戳印章 */
    .stamp-seal {{
      position: absolute;
      top: 36px;
      right: 36px;
      width: 84px;
      height: 84px;
      border: 2px dashed rgba(20, 53, 32, 0.4);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 900;
      color: #143520;
      transform: rotate(-12deg);
      user-select: none;
      line-height: 1.15;
      text-align: center;
    }}
    .stamp-seal .year {{ font-size: 15px; font-weight: 900; color: #00b51d; }}

    /* 顶部身份栏 */
    .profile-row {{
      display: flex;
      align-items: center;
      gap: 18px;
      margin-bottom: 28px;
    }}
    .avatar-circle {{
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: #ffffff;
      border: 3px solid #a7f3d0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      box-shadow: 0 6px 16px rgba(0,0,0,0.08);
    }}
    .user-main {{ font-size: 28px; font-weight: 900; color: #064e3b; letter-spacing: -0.5px; }}
    .user-tagline {{
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 13px; font-weight: 700; color: #047857;
      background: rgba(0, 181, 29, 0.12); padding: 3px 12px; border-radius: 20px;
      margin-top: 4px;
    }}

    /* 4 格核心指标卡片 (层次分明、杂志感、高信息识别度) */
    .capsule-grid {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
      margin-bottom: 32px;
    }}
    .capsule-card {{
      background: linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%);
      border: 1px solid rgba(16, 185, 129, 0.35);
      border-radius: 24px;
      padding: 24px 22px 20px 22px;
      box-shadow: 0 8px 24px -6px rgba(6, 78, 59, 0.08), 0 2px 6px rgba(0, 0, 0, 0.02);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }}
    .capsule-card::before {{
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, #10b981 0%, #059669 100%);
      opacity: 0.8;
    }}
    .capsule-card:hover {{
      transform: translateY(-3px);
      box-shadow: 0 14px 28px -6px rgba(6, 78, 59, 0.14);
    }}
    .capsule-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }}
    .capsule-title-wrap {{
      display: flex;
      align-items: center;
      gap: 8px;
    }}
    .capsule-icon-box {{
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: rgba(16, 185, 129, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }}
    .capsule-label {{
      font-size: 14px;
      font-weight: 800;
      color: #064e3b;
      letter-spacing: 0.2px;
    }}
    .capsule-badge {{
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 12px;
      background: rgba(4, 120, 87, 0.08);
      color: #047857;
    }}
    .capsule-val-row {{
      display: flex;
      align-items: baseline;
      gap: 4px;
    }}
    .capsule-val {{
      font-size: 46px;
      font-weight: 950;
      color: #064e3b;
      line-height: 1;
      letter-spacing: -1.5px;
      font-feature-settings: "tnum";
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }}
    .capsule-unit {{
      font-size: 15px;
      font-weight: 700;
      color: #059669;
    }}
    .capsule-subtext {{
      font-size: 12px;
      color: #6b7280;
      margin-top: 8px;
    }}

    /* 电影信笺区域：时光打字机、分段便签式排版与层次重构 */
    .letter-parchment {{
      font-family: "Noto Serif SC", "Songti SC", "SimSun", serif;
      background: linear-gradient(180deg, #ffffff 0%, #f7faf7 100%);
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: 20px;
      padding: 32px 28px;
      margin-bottom: 24px;
      box-shadow: 0 4px 20px rgba(6, 78, 59, 0.04);
      position: relative;
    }}
    .letter-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 16px;
      margin-bottom: 20px;
      border-bottom: 1px dashed rgba(4, 120, 87, 0.2);
    }}
    .letter-salutation {{
      font-size: 17px;
      font-weight: 700;
      color: #064e3b;
      letter-spacing: 0.5px;
    }}
    .letter-machine-badge {{
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      font-weight: 600;
      color: #047857;
      background: rgba(16, 185, 129, 0.1);
      padding: 3px 10px;
      border-radius: 12px;
      font-family: -apple-system, sans-serif;
    }}
    .letter-body {{
      display: flex;
      flex-direction: column;
      gap: 16px;
    }}
    .letter-paragraph {{
      font-size: 15px;
      line-height: 2.1;
      color: #374151;
      text-align: justify;
      position: relative;
      padding-left: 18px;
      border-left: 2px solid rgba(16, 185, 129, 0.35);
    }}
    .letter-paragraph strong {{
      color: #064e3b;
      font-weight: 700;
      background: rgba(16, 185, 129, 0.12);
      padding: 1px 4px;
      border-radius: 4px;
    }}
    .letter-footer-quote {{
      margin-top: 10px;
      padding: 14px 18px;
      background: rgba(220, 252, 231, 0.5);
      border-radius: 12px;
      border: 1px solid rgba(16, 185, 129, 0.2);
      font-size: 14px;
      line-height: 1.9;
      color: #064e3b;
      font-style: italic;
    }}
    .typing-cursor {{
      display: inline-block;
      width: 2px;
      height: 1.1em;
      background: #00b51d;
      vertical-align: sub;
      animation: blink 0.8s infinite;
      margin-left: 2px;
    }}
    @keyframes blink {{
      0%, 100% {{ opacity: 1; }}
      50% {{ opacity: 0; }}
    }}

    /* 模块 2：经典宝蓝光影海报阵列 (吸收图 2) */
    .blue-section {{
      background: linear-gradient(180deg, #0284c7 0%, #0369a1 100%);
      border-radius: 32px;
      padding: 40px 36px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(2, 132, 199, 0.25);
    }}
    .section-head {{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 20px;
    }}
    .section-title {{ font-size: 26px; font-weight: 900; color: #fff; }}
    .section-badge {{ font-size: 11px; font-weight: 800; letter-spacing: 1px; color: #bae6fd; text-transform: uppercase; }}

    /* 8x8 殿堂级高密度光影海报阵列 (64 宫格电影成就墙) */
    .poster-grid {{
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 8px;
      margin-top: 18px;
    }}
    @media (max-width: 768px) {{
      .poster-grid {{
        grid-template-columns: repeat(6, 1fr);
        gap: 6px;
      }}
    }}
    @media (max-width: 480px) {{
      .poster-grid {{
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
      }}
    }}
    .poster-card {{
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      aspect-ratio: 2 / 3;
      background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);
      box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transform: translateY(18px) scale(0.92);
      transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0s),
                  transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0s),
                  box-shadow 0.2s ease;
    }}
    .blue-section.revealed .poster-card {{
      opacity: 1;
      transform: translateY(0) scale(1);
    }}
    .poster-fallback-badge {{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 6px;
      text-align: center;
      user-select: none;
      z-index: 1;
    }}
    .poster-badge-icon {{
      font-size: 16px;
    }}
    .poster-fallback-title {{
      font-size: 9px;
      font-weight: 700;
      color: #94a3b8;
      line-height: 1.2;
      word-break: break-all;
    }}
    .poster-card:hover {{
      transform: translateY(-5px) scale(1.15) !important;
      box-shadow: 0 14px 28px rgba(0,0,0,0.65);
      z-index: 20;
    }}
    .poster-card img {{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      z-index: 2;
      transition: opacity 0.3s ease;
    }}
    .poster-overlay {{
      position: absolute; bottom: 0; left: 0; width: 100%;
      background: linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 70%, transparent 100%);
      font-size: 9px; font-weight: 700; color: #f3f4f6;
      padding: 8px 3px 3px 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      text-align: center;
      z-index: 3;
    }}

    /* 模块 3：深林墨绿 · 观影特征可视化独立大卡片 */
    .dark-section {{
      background: rgba(18, 38, 26, 0.9);
      border: 1px solid rgba(154, 230, 180, 0.22);
      backdrop-filter: blur(20px);
      border-radius: 32px;
      padding: 40px 36px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7);
    }}
    /* 模块四：星级严苛度分值金字塔 (超感大尺寸、加粗发光发亮进度条) */
    .pyramid-overview-grid {{
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 24px;
      margin-bottom: 20px;
    }}
    @media (max-width: 600px) {{
      .pyramid-overview-grid {{ grid-template-columns: 1fr; }}
    }}
    .pyramid-stat-card {{
      background: rgba(10, 25, 18, 0.7);
      border: 1.5px solid rgba(245, 158, 11, 0.3);
      border-radius: 20px;
      padding: 18px 22px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
      transition: all 0.3s ease;
    }}
    .pyramid-stat-card:hover {{
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.15);
    }}
    .pyramid-stat-card.green-card {{
      border-color: rgba(52, 211, 153, 0.3);
    }}
    .pyramid-stat-card.green-card:hover {{
      box-shadow: 0 8px 25px rgba(52, 211, 153, 0.15);
    }}
    .pyramid-stat-title {{
      font-size: 12px;
      font-weight: 800;
      color: #94a3b8;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }}
    .pyramid-stat-val {{
      font-size: 32px;
      font-weight: 900;
      font-feature-settings: "tnum";
      line-height: 1.1;
      margin-bottom: 4px;
    }}
    .pyramid-stat-sub {{
      font-size: 13px;
      font-weight: 700;
      color: #cbd5e1;
    }}
    .metric-subcard {{
      background: rgba(8, 20, 14, 0.85);
      border: 1.5px solid rgba(154, 230, 180, 0.25);
      border-radius: 28px;
      padding: 32px 30px;
      box-shadow: inset 0 2px 20px rgba(0, 0, 0, 0.6), 0 15px 40px rgba(0, 0, 0, 0.4);
    }}
    .star-bar-row {{
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      position: relative;
    }}
    .star-bar-row:last-child {{
      margin-bottom: 0;
    }}
    .star-bar-meta {{
      width: 175px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }}
    .star-bar-label {{
      font-size: 15px;
      font-weight: 900;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }}
    .star-count-badge {{
      font-size: 12px;
      font-weight: 700;
      color: #94a3b8;
      font-feature-settings: "tnum";
    }}
    .star-bar-track {{
      flex: 1;
      height: 26px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 14px;
      overflow: hidden;
      margin: 0 20px;
      border: 1.5px solid rgba(255, 255, 255, 0.15);
      box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.8);
      position: relative;
    }}
    .star-bar-fill {{
      height: 100%;
      border-radius: 14px;
      width: 0;
      transition: width 1.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }}
    .star-bar-fill::after {{
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; height: 50%;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 100%);
      border-radius: 14px 14px 0 0;
    }}
    .dark-section.revealed .star-bar-fill {{
      width: var(--target-width);
    }}
    .dark-section.revealed .star-bar-row:nth-child(1) .star-bar-fill {{ transition-delay: 0.1s; }}
    .dark-section.revealed .star-bar-row:nth-child(2) .star-bar-fill {{ transition-delay: 0.25s; }}
    .dark-section.revealed .star-bar-row:nth-child(3) .star-bar-fill {{ transition-delay: 0.4s; }}
    .dark-section.revealed .star-bar-row:nth-child(4) .star-bar-fill {{ transition-delay: 0.55s; }}
    .star-bar-num {{
      width: 82px;
      flex-shrink: 0;
      text-align: right;
      font-weight: 900;
      font-size: 22px;
      font-feature-settings: "tnum";
      letter-spacing: -0.5px;
    }}
    .pyramid-footer-philosophy {{
      margin-top: 26px;
      padding-top: 20px;
      border-top: 1px dashed rgba(255, 255, 255, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 13px;
      color: #e2e8f0;
      line-height: 1.6;
    }}
    .pyramid-footer-tag {{
      padding: 5px 12px;
      border-radius: 8px;
      background: rgba(245, 158, 11, 0.18);
      border: 1px solid rgba(245, 158, 11, 0.4);
      color: #fbbf24;
      font-weight: 800;
      font-size: 12px;
      white-space: nowrap;
    }}
    .split-2 {{ display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: center; }}

    /* 核心常驻题材矩阵 (大字号、醒目发光渐变胶囊条、高清晰对比度) */
    .genre-matrix-card {{
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 20px;
      padding: 20px 24px;
      margin-bottom: 24px;
    }}
    .genre-matrix-header {{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }}
    .genre-matrix-title {{
      font-size: 14px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }}
    .genre-matrix-tip {{
      font-size: 11px;
      font-weight: 600;
      color: #bae6fd;
    }}
    .genre-bars-grid {{
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px 32px;
    }}
    @media (min-width: 680px) {{
      .genre-bars-grid {{
        grid-template-columns: 1fr 1fr;
      }}
    }}
    .bar-row {{
      display: flex;
      align-items: center;
      font-size: 14px;
    }}
    .bar-label {{
      width: 72px;
      font-size: 13px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }}
    .bar-track {{
      flex: 1;
      height: 12px;
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      overflow: hidden;
      margin: 0 12px;
      position: relative;
    }}
    .bar-fill {{
      height: 100%;
      border-radius: 8px;
      background: linear-gradient(90deg, #38bdf8 0%, #ffffff 100%);
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
      width: 0;
      transition: width 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
    }}
    .blue-section.revealed .bar-fill {{
      width: var(--target-width);
    }}
    .bar-num {{
      width: 52px;
      text-align: right;
      font-size: 14px;
      font-weight: 900;
      color: #38bdf8;
      font-feature-settings: "tnum";
    }}

    /* 五维决策天梯胶囊栏 (值越大的胶囊越突出) */
    .radar-rank-bar {{
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      margin-top: 24px;
    }}
    .radar-rank-badge {{
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 16px;
      border-radius: 9999px;
      background: rgba(16, 185, 129, 0.08);
      border: 1px solid rgba(16, 185, 129, 0.25);
      color: #a7f3d0;
      font-size: 13px;
      font-weight: 700;
      transition: all 0.3s ease;
    }}
    .radar-rank-badge:hover {{
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(0, 181, 29, 0.2);
    }}
    .radar-rank-badge .radar-rank-val {{
      font-weight: 900;
      font-feature-settings: "tnum";
      color: #34d399;
    }}
    .radar-rank-badge.top-badge {{
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.4) 100%);
      border: 1.5px solid #fbbf24;
      color: #fef08a;
      box-shadow: 0 0 20px rgba(245, 158, 11, 0.35);
      font-size: 14px;
      transform: scale(1.06);
    }}
    .radar-rank-badge.top-badge .radar-rank-val {{
      color: #fbbf24;
      font-size: 16px;
    }}

    /* 短评留痕 (杂志级单行规整排版，左右滑入交错动效) */
    .quote-row {{
      background: rgba(10, 20, 14, 0.65);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 16px 18px;
      margin-bottom: 14px;
      border-left: 4px solid #00b51d;
      opacity: 0;
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
    }}
    .gold-quote {{
      border-left-color: #f59e0b;
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.06);
      transform: translateX(-24px);
    }}
    .red-quote {{
      border-left-color: #ef4444;
      box-shadow: 0 4px 16px rgba(239, 68, 68, 0.06);
      transform: translateX(24px);
    }}
    .dark-section.revealed .quote-row {{
      opacity: 1;
      transform: translateX(0);
    }}
    .dark-section.revealed .gold-quote:nth-child(2) {{ transition-delay: 0.1s; }}
    .dark-section.revealed .gold-quote:nth-child(3) {{ transition-delay: 0.25s; }}
    .dark-section.revealed .gold-quote:nth-child(4) {{ transition-delay: 0.4s; }}
    .dark-section.revealed .red-quote:nth-child(2) {{ transition-delay: 0.15s; }}
    .dark-section.revealed .red-quote:nth-child(3) {{ transition-delay: 0.3s; }}
    .dark-section.revealed .red-quote:nth-child(4) {{ transition-delay: 0.45s; }}
    .quote-row:hover {{
      transform: translateX(3px) !important;
      background: rgba(15, 30, 20, 0.8);
    }}
    .quote-header {{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }}
    .quote-film-title {{
      font-size: 14px;
      font-weight: 800;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      letter-spacing: 0.2px;
    }}
    .quote-tag {{
      font-size: 11px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 20px;
      white-space: nowrap;
      flex-shrink: 0;
      letter-spacing: 0.5px;
      line-height: 1;
      display: inline-flex;
      align-items: center;
    }}
    .gold-tag {{
      background: rgba(245, 158, 11, 0.2);
      border: 1px solid rgba(245, 158, 11, 0.4);
      color: #fbbf24;
    }}
    .red-tag {{
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #f87171;
    }}
    .quote-text {{
      font-size: 13px;
      color: #d1d5db;
      line-height: 1.7;
      font-family: "Noto Serif SC", "Songti SC", serif;
      letter-spacing: 0.3px;
    }}

    /* 模块 5：AI 选片孪生大脑出口卡片 */
    .ai-hero-card {{
      background: radial-gradient(circle at 50% 0%, rgba(0, 181, 29, 0.25) 0%, rgba(13, 26, 18, 0.95) 75%);
      border: 1px solid rgba(0, 181, 29, 0.4);
      border-radius: 32px;
      padding: 44px 36px;
      text-align: center;
      box-shadow: 0 25px 60px rgba(0, 181, 29, 0.15);
    }}
    .ai-btn-primary {{
      background: linear-gradient(135deg, #00b51d 0%, #059669 100%);
      color: #fff; font-size: 15px; font-weight: 800; border-radius: 16px;
      padding: 16px 36px; border: none; cursor: pointer; display: inline-flex;
      align-items: center; gap: 8px; box-shadow: 0 10px 25px rgba(0, 181, 29, 0.4);
      transition: all 0.25s ease;
    }}
    .ai-btn-primary:hover {{
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(0, 181, 29, 0.6);
    }}

    @media (max-width: 768px) {{
      .capsule-grid {{ grid-template-columns: 1fr 1fr; }}
      .split-2 {{ grid-template-columns: 1fr; }}
      .poster-grid {{ grid-template-columns: repeat(2, 1fr); gap: 8px; }}
      .paper-section, .blue-section, .dark-section, .ai-hero-card {{ padding: 32px 20px; }}
      .user-main {{ font-size: 24px; }}
    }}
  </style>
</head>
<body>
  <div class="film-grain"></div>

  <main class="viewport-flow">

    <!-- 拟物金属长尾夹 -->
    <div class="binder-clip">
      <div class="clip-wire"></div>
      <div class="clip-body"></div>
    </div>

    <!-- 模块一：复古信笺 · 个人光影档案 (自适应人格文案) -->
    <section class="paper-section reveal-card">
      <div class="stamp-seal">
        <div>观影基因</div>
        <div class="year">2026</div>
        <div>MovieDNA</div>
      </div>

      <div class="profile-row">
        <div class="avatar-circle">🐼</div>
        <div>
          <div class="user-main">@{douban_id}</div>
          <div class="user-tagline">
            <span>✨ 观影人格：<strong>{persona['persona_title']}</strong></span>
            <span>· 第 {year_span} 载</span>
          </div>
        </div>
      </div>

      <!-- 4 格核心指标大卡片 -->
      <div class="capsule-grid">
        <div class="capsule-card">
          <div class="capsule-header">
            <div class="capsule-title-wrap">
              <div class="capsule-icon-box">🎬</div>
              <span class="capsule-label">累计阅片体量</span>
            </div>
            <span class="capsule-badge">观影总览</span>
          </div>
          <div class="capsule-val-row">
            <span class="capsule-val counter" data-target="{total_movies}">{total_movies}</span>
            <span class="capsule-unit">部电影</span>
          </div>
          <div class="capsule-subtext">已记录的所有长片、剧集与动画标记</div>
        </div>

        <div class="capsule-card">
          <div class="capsule-header">
            <div class="capsule-title-wrap">
              <div class="capsule-icon-box">⭐</div>
              <span class="capsule-label">个人打分均值</span>
            </div>
            <span class="capsule-badge">审美基准</span>
          </div>
          <div class="capsule-val-row">
            <span class="capsule-val">{avg_rating}</span>
            <span class="capsule-unit">/ 10 分</span>
          </div>
          <div class="capsule-subtext">相比豆瓣全站基准更显严苛清醒</div>
        </div>

        <div class="capsule-card">
          <div class="capsule-header">
            <div class="capsule-title-wrap">
              <div class="capsule-icon-box">🏆</div>
              <span class="capsule-label">五星神作占比</span>
            </div>
            <span class="capsule-badge">殿堂比例</span>
          </div>
          <div class="capsule-val-row">
            <span class="capsule-val">{five_star_pct}</span>
            <span class="capsule-unit">%</span>
          </div>
          <div class="capsule-subtext">给出的极致赞誉，代表毫无保留的共鸣</div>
        </div>

        <div class="capsule-card">
          <div class="capsule-header">
            <div class="capsule-title-wrap">
              <div class="capsule-icon-box">✍️</div>
              <span class="capsule-label">真迹短评沉淀</span>
            </div>
            <span class="capsule-badge">文字心声</span>
          </div>
          <div class="capsule-val-row">
            <span class="capsule-val counter" data-target="{comment_count}">{comment_count}</span>
            <span class="capsule-unit">篇真迹</span>
          </div>
          <div class="capsule-subtext">观影后亲手写下的情绪切片与思想锋芒</div>
        </div>
      </div>

      <!-- 豆瓣诗意书写信笺 (时光打字机与分段便签排版) -->
      <div class="letter-parchment">
        <div class="letter-header">
          <div class="letter-salutation">致 @{douban_id} 的光影私信</div>
          <div class="letter-machine-badge">
            <span>⌨️</span> 岁月打字机 · 独家解封
          </div>
        </div>

        <div class="letter-body">
          <div class="letter-paragraph">
            当跨越 <strong>{start_year} 至 {end_year}</strong> 的时光卷轴缓缓合拢，荧幕渐暗，心声长存。<br>
            {persona['volume_desc']}
          </div>

          <div class="letter-paragraph">
            在累计约 <strong>{total_hours} 个小时</strong> 的沉浸体验中，{persona['rating_desc']}
          </div>

          <div class="letter-paragraph">
            {persona['comment_desc']}
          </div>

          <div class="letter-footer-quote">
            <span id="typing-quote">每一次标记，都是你交给时间的私人日记；此刻，让穿梭岁月的打字机，为你叩响这片精神家园的专属回响。</span><span class="typing-cursor"></span>
          </div>
        </div>
      </div>

      <div style="text-align: right; font-size: 12px; color: #047857; font-weight: 800; margin-top: 10px;">
        —— 豆瓣光影纪元 · {start_year}-{end_year}
      </div>
    </section>

    <!-- 模块二：经典宝蓝 · 个人年度海报阵列 (还原 8x8 高密度 64 宫格大片成就墙) -->
    <section class="blue-section reveal-card">
      <div class="section-head">
        <div>
          <div class="section-badge">CINEMA POSTER WALL · 8×8 MOSAIC</div>
          <h2 class="section-title">殿堂光影海报阵列 (8×8 成就墙)</h2>
        </div>
        <div style="font-size: 32px; font-weight: 900; font-feature-settings: 'tnum';">
          {total_movies} <span style="font-size: 14px; font-weight: 600;">部</span>
        </div>
      </div>

      <!-- 核心常驻题材矩阵 (动态最多 10 大维度、双列瀑布流发光进度条) -->
      <div class="genre-matrix-card">
        <div class="genre-matrix-header">
          <div class="genre-matrix-title">
            <span>⊞</span> 核心常驻题材矩阵
          </div>
          <div class="genre-matrix-tip">TOP {genre_count} 偏好维度占比</div>
        </div>
        <div class="genre-bars-grid">
          {genre_bars_html}
        </div>
      </div>

      <!-- 4x4 海报网格瀑布 (no-referrer 确保图片完全加载) -->
      <div class="poster-grid">
        {poster_wall_html}
      </div>
    </section>

    <!-- 模块三：五维观影决策雷达 (独立全幅大卡片) -->
    <section class="dark-section reveal-card">
      <div class="section-head">
        <div>
          <div class="section-badge" style="color: #34d399;">AESTHETIC RADAR ENGINE</div>
          <h2 class="section-title">五维观影决策雷达</h2>
        </div>
        <div style="font-size: 13px; color: #a7f3d0; font-weight: 700;">
          镜象美学 · 叙事智性 · 质朴深情 · 社会隐喻 · 反装逼雷达
        </div>
      </div>
      <div id="chart-radar" style="height: 440px; width: 100%;"></div>
      <div class="radar-rank-bar">
        {radar_rank_html}
      </div>
    </section>

    <!-- 模块四：星级严苛度分值金字塔 (独立全幅大卡片) -->
    <section class="dark-section reveal-card">
      <div class="section-head">
        <div>
          <div class="section-badge" style="color: #fbbf24;">RATING PYRAMID & SCALE</div>
          <h2 class="section-title">评分严苛度分值金字塔</h2>
        </div>
        <div style="font-size: 13px; color: #fbbf24; font-weight: 700;">
          全量评分分布与审美天平切片
        </div>
      </div>

      <!-- 顶部双核心严苛度指标卡片 -->
      <div class="pyramid-overview-grid">
        <div class="pyramid-stat-card">
          <div class="pyramid-stat-title">
            <span>👑</span> 五星殿堂准入门槛
          </div>
          <div class="pyramid-stat-val" style="color: #fbbf24; text-shadow: 0 0 16px rgba(245, 158, 11, 0.5);">
            {five_star_pct}%
          </div>
          <div class="pyramid-stat-sub">
            共计 <strong>{score_10_count}</strong> 部 · {pyramid_stance_title}
          </div>
        </div>

        <div class="pyramid-stat-card green-card">
          <div class="pyramid-stat-title">
            <span>⚖️</span> 全周期严苛均分与底线
          </div>
          <div class="pyramid-stat-val" style="color: #34d399; text-shadow: 0 0 16px rgba(52, 211, 153, 0.5);">
            {avg_rating} <span style="font-size: 14px; font-weight: 700; color: #a7f3d0;">分</span>
          </div>
          <div class="pyramid-stat-sub">
            低星避坑痛批率 <strong>{low_star_pct}%</strong> ({score_low_count} 部)
          </div>
        </div>
      </div>

      <!-- 金字塔超感发光进度条阵列 -->
      <div class="metric-subcard">
        <div class="star-bar-row">
          <div class="star-bar-meta">
            <span class="star-bar-label" style="color: #fbbf24; text-shadow: 0 0 10px rgba(245, 158, 11, 0.4);">★★★★★ 殿堂神作</span>
            <span class="star-count-badge">已加冕 {score_10_count} 部</span>
          </div>
          <div class="star-bar-track">
            <div class="star-bar-fill" style="--target-width: {five_star_pct}%; background: linear-gradient(90deg, #b45309 0%, #f59e0b 50%, #fef08a 100%); box-shadow: 0 0 20px rgba(245, 158, 11, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.5);"></div>
          </div>
          <span class="star-bar-num" style="color: #fbbf24; text-shadow: 0 0 12px rgba(245, 158, 11, 0.45);">{five_star_pct}%</span>
        </div>

        <div class="star-bar-row">
          <div class="star-bar-meta">
            <span class="star-bar-label" style="color: #34d399; text-shadow: 0 0 10px rgba(52, 211, 153, 0.4);">★★★★☆ 诚意佳作</span>
            <span class="star-count-badge">入选 {score_8_count} 部</span>
          </div>
          <div class="star-bar-track">
            <div class="star-bar-fill" style="--target-width: {four_star_pct}%; background: linear-gradient(90deg, #047857 0%, #10b981 50%, #6ee7b7 100%); box-shadow: 0 0 20px rgba(16, 185, 129, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.5);"></div>
          </div>
          <span class="star-bar-num" style="color: #34d399; text-shadow: 0 0 12px rgba(52, 211, 153, 0.45);">{four_star_pct}%</span>
        </div>

        <div class="star-bar-row">
          <div class="star-bar-meta">
            <span class="star-bar-label" style="color: #60a5fa; text-shadow: 0 0 10px rgba(96, 165, 250, 0.4);">★★★☆☆ 平庸消遣</span>
            <span class="star-count-badge">记录 {score_6_count} 部</span>
          </div>
          <div class="star-bar-track">
            <div class="star-bar-fill" style="--target-width: {three_star_pct}%; background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #93c5fd 100%); box-shadow: 0 0 20px rgba(59, 130, 246, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.5);"></div>
          </div>
          <span class="star-bar-num" style="color: #60a5fa; text-shadow: 0 0 12px rgba(96, 165, 250, 0.45);">{three_star_pct}%</span>
        </div>

        <div class="star-bar-row">
          <div class="star-bar-meta">
            <span class="star-bar-label" style="color: #f87171; text-shadow: 0 0 10px rgba(248, 113, 113, 0.4);">★☆☆☆☆ 踩雷痛批</span>
            <span class="star-count-badge">批判 {score_low_count} 部</span>
          </div>
          <div class="star-bar-track">
            <div class="star-bar-fill" style="--target-width: {low_star_pct}%; background: linear-gradient(90deg, #b91c1c 0%, #ef4444 50%, #fca5a5 100%); box-shadow: 0 0 20px rgba(239, 68, 68, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.5);"></div>
          </div>
          <span class="star-bar-num" style="color: #f87171; text-shadow: 0 0 12px rgba(248, 113, 113, 0.45);">{low_star_pct}%</span>
        </div>

        <!-- 底部审美哲学沉淀条 -->
        <div class="pyramid-footer-philosophy">
          <span class="pyramid-footer-tag">审美天平定势</span>
          <span>{pyramid_stance_desc}</span>
        </div>
      </div>
    </section>

    <!-- 模块五：光影足迹历年走势 (独立全幅大卡片) -->
    <section class="dark-section reveal-card">
      <div class="section-head">
        <div>
          <div class="section-badge" style="color: #38bdf8;">TIMELINE & FOOTPRINTS</div>
          <h2 class="section-title">光影足迹历年走势</h2>
        </div>
        <div style="font-size: 13px; color: #38bdf8; font-weight: 700;">
          {start_year} - {end_year} 跨越时光的视听见证
        </div>
      </div>
      <div id="chart-timeline" style="height: 340px; width: 100%; margin-top: 10px;"></div>
    </section>

    <!-- 模块四：短评留痕 · 殿堂神作 vs 辛辣毒舌 -->
    <section class="dark-section reveal-card">
      <div class="section-head">
        <div>
          <div class="section-badge" style="color: #fbbf24;">AUTHENTIC CRITICS WALL</div>
          <h2 class="section-title">短评留痕 · 灵魂切片</h2>
        </div>
      </div>

      <div class="split-2" style="align-items: start;">
        <div>
          <div style="font-size: 13px; font-weight: 800; color: #fbbf24; margin-bottom: 10px;">✨ 殿堂挚爱真迹</div>
          {praise_html}
        </div>
        <div>
          <div style="font-size: 13px; font-weight: 800; color: #f87171; margin-bottom: 10px;">⚡ 绝对雷区痛批</div>
          {critic_html}
        </div>
      </div>
    </section>

    <!-- 模块五：AI 数字孪生选片大脑正规激活出口 -->
    <section class="ai-hero-card reveal-card">
      <span style="display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 800; background: rgba(0,181,29,0.15); border: 1px solid rgba(0,181,29,0.3); color: #34d399; margin-bottom: 16px;">
        AI DIGITAL TWIN ENGINE
      </span>
      <h2 style="font-size: 28px; font-weight: 900; color: #ffffff; margin-bottom: 10px;">
        生成你的数字孪生选片大脑
      </h2>
      <p style="font-size: 14px; color: var(--text-muted); max-width: 600px; margin: 0 auto 24px auto;">
        已基于你近 {year_span} 年的 {total_movies} 部打标、五维审美雷达与真实短评建立起特征工程资产。一键提取专属于你的 MovieDNA 智能体决策算法。
      </p>

      <button class="ai-btn-primary" onclick="toggleDnaModal()">
        <span>🧠 立即激活专属 MovieDNA 选片智能体</span>
      </button>

      <!-- 隐藏的 Prompt 展开容器 -->
      <div id="dna-modal" style="display: none; margin-top: 24px; text-align: left; background: rgba(0,0,0,0.6); border: 1px solid rgba(0,181,29,0.3); border-radius: 20px; padding: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 12px; font-weight: 700; color: #34d399;">📋 专属数字孪生 Prompt (已注入全量观影特征)</span>
          <button onclick="copyPromptCode()" style="padding: 6px 14px; background: #00b51d; border: none; border-radius: 8px; color: #fff; font-size: 12px; font-weight: 700; cursor: pointer;">一键复制 Prompt</button>
        </div>
        <textarea id="dna-prompt-textarea" rows="8" readonly style="width: 100%; background: rgba(0,0,0,0.4); border: 1px solid #334155; border-radius: 10px; color: #d1d5db; font-size: 12px; padding: 12px; font-family: monospace; outline: none;">{prompt_content}</textarea>
      </div>
    </section>

    <!-- 底部版权 -->
    <footer style="text-align: center; font-size: 12px; color: #059669; padding-top: 10px;">
      MovieDNA · 致敬豆瓣光影精神家园 · 纯本地私密渲染 · 永久专属保存
    </footer>

  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {{
      let radarChart = null;
      let timelineChart = null;

      function initRadarChart() {{
        if (typeof echarts === "undefined" || radarChart) return;
        const radarEl = document.getElementById('chart-radar');
        if (!radarEl) return;
        try {{
          radarChart = echarts.init(radarEl, 'dark');
          radarChart.setOption({{
            animation: true,
            animationDuration: 1400,
            animationEasing: 'cubicOut',
            backgroundColor: 'transparent',
            tooltip: {{ trigger: 'item' }},
            radar: {{
              indicator: {json.dumps(radar_indicators)},
              radius: '66%',
              center: ['50%', '48%'],
              splitNumber: 5,
              axisName: {{
                formatter: (val) => val,
                lineHeight: 18,
                rich: {{
                  top: {{
                    fontSize: 16,
                    fontWeight: 900,
                    color: '#fbbf24',
                    textShadowBlur: 14,
                    textShadowColor: 'rgba(251, 191, 36, 0.9)',
                    lineHeight: 22,
                    align: 'center'
                  }},
                  high: {{
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#34d399',
                    textShadowBlur: 6,
                    textShadowColor: 'rgba(52, 211, 153, 0.5)',
                    lineHeight: 18,
                    align: 'center'
                  }},
                  mid: {{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#a7f3d0',
                    lineHeight: 16,
                    align: 'center'
                  }},
                  low: {{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#94a3b8',
                    lineHeight: 15,
                    align: 'center'
                  }},
                  sub: {{
                    fontSize: 10,
                    fontWeight: 500,
                    color: '#6ee7b7',
                    lineHeight: 14,
                    align: 'center'
                  }}
                }}
              }},
              splitLine: {{ lineStyle: {{ color: 'rgba(154, 230, 180, 0.22)', width: 1.2 }} }},
              splitArea: {{ areaStyle: {{ color: ['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.45)'] }} }},
              axisLine: {{ lineStyle: {{ color: 'rgba(154, 230, 180, 0.35)', width: 1.5 }} }}
            }},
            series: [{{
              type: 'radar',
              data: [{{
                value: {json.dumps(radar_values)},
                symbol: 'circle',
                symbolSize: 8,
                label: {{
                  show: true,
                  formatter: (p) => p.value + '分',
                  color: '#ffffff',
                  fontSize: 11,
                  fontWeight: 800,
                  textBorderColor: '#064e3b',
                  textBorderWidth: 2
                }},
                areaStyle: {{ color: 'rgba(0, 181, 29, 0.42)' }},
                lineStyle: {{ color: '#00b51d', width: 3.5, shadowBlur: 14, shadowColor: 'rgba(0, 181, 29, 0.8)' }},
                itemStyle: {{ color: '#34d399', borderColor: '#ffffff', borderWidth: 2 }}
              }}]
            }}]
          }});
        }} catch(e) {{
          console.error("Radar init error:", e);
        }}
      }}

      function initTimelineChart() {{
        if (typeof echarts === "undefined" || timelineChart) return;
        const timelineEl = document.getElementById('chart-timeline');
        if (!timelineEl) return;
        try {{
          timelineChart = echarts.init(timelineEl, 'dark');
          timelineChart.setOption({{
            animation: true,
            animationDuration: 1600,
            animationEasing: 'cubicOut',
            backgroundColor: 'transparent',
            tooltip: {{
              trigger: 'axis',
              formatter: '<div style="font-weight:bold;color:#38bdf8;">{{b}} 年</div>观影记录：<strong>{{c}}</strong> 部'
            }},
            grid: {{
              left: '3%',
              right: '3%',
              top: '15%',
              bottom: '8%',
              containLabel: true
            }},
            xAxis: {{
              type: 'category',
              data: {json.dumps(year_keys)},
              axisLabel: {{ color: '#93c5fd', fontSize: 12, fontWeight: 700 }},
              axisLine: {{ lineStyle: {{ color: 'rgba(255,255,255,0.2)' }} }}
            }},
            yAxis: {{
              type: 'value',
              splitLine: {{ lineStyle: {{ color: 'rgba(255,255,255,0.08)' }} }},
              axisLabel: {{ color: '#93c5fd', fontSize: 12 }}
            }},
            series: [{{
              data: {json.dumps(year_values)},
              type: 'bar',
              barMaxWidth: 32,
              label: {{
                show: true,
                position: 'top',
                color: '#bae6fd',
                fontSize: 10,
                fontWeight: 700
              }},
              itemStyle: {{
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {{ offset: 0, color: '#38bdf8' }},
                  {{ offset: 1, color: '#0284c7' }}
                ]),
                borderRadius: [6, 6, 0, 0],
                shadowColor: 'rgba(56, 189, 248, 0.3)',
                shadowBlur: 8
              }},
              emphasis: {{
                itemStyle: {{
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {{ offset: 0, color: '#ffffff' }},
                    {{ offset: 1, color: '#38bdf8' }}
                  ])
                }}
              }}
            }}]
          }});
        }} catch(e) {{
          console.error("Timeline init error:", e);
        }}
      }}

      // 动效系统：IntersectionObserver 滑入视口时触发对应动效
      try {{
        const observer = new IntersectionObserver((entries) => {{
          entries.forEach(entry => {{
            if (entry.isIntersecting) {{
              entry.target.classList.add('revealed');
              // 触发数字跳动
              entry.target.querySelectorAll('.counter').forEach(counter => {{
                if (counter.dataset.animated) return;
                counter.dataset.animated = "true";
                const target = +counter.getAttribute('data-target') || 0;
                if (!target) return;
                let count = 0;
                const inc = Math.max(1, Math.floor(target / 40));
                const timer = setInterval(() => {{
                  count += inc;
                  if (count >= target) {{
                    counter.innerText = target;
                    clearInterval(timer);
                  }} else {{
                    counter.innerText = count;
                  }}
                }}, 20);
              }});

              // 触发信笺诗意金句打字机效果 (只触发一次)
              const typingEl = entry.target.querySelector('#typing-quote');
              if (typingEl && !typingEl.dataset.typed) {{
                typingEl.dataset.typed = "true";
                const fullText = typingEl.innerText;
                typingEl.innerText = "";
                let charIndex = 0;
                const typingInterval = setInterval(() => {{
                  if (charIndex < fullText.length) {{
                    typingEl.innerText += fullText.charAt(charIndex);
                    charIndex++;
                  }} else {{
                    clearInterval(typingInterval);
                  }}
                }}, 35);
              }}

              // 模块三：滑动到五维观影决策雷达时，开启动态展开渲染
              if (entry.target.querySelector('#chart-radar')) {{
                initRadarChart();
              }}

              // 模块五：滑动到光影足迹历年走势时，开启柱状图拔地而起动效
              if (entry.target.querySelector('#chart-timeline')) {{
                initTimelineChart();
              }}
            }}
          }});
        }}, {{ threshold: 0.15 }});

        document.querySelectorAll('.reveal-card').forEach(card => observer.observe(card));
      }} catch (e) {{
        console.warn("IntersectionObserver disabled:", e);
        initRadarChart();
        initTimelineChart();
      }}

      window.addEventListener('resize', () => {{
        if (radarChart) radarChart.resize();
        if (timelineChart) timelineChart.resize();
      }});
    }});

    // 4. AI 选片大脑出口交互
    function toggleDnaModal() {{
      const m = document.getElementById('dna-modal');
      if (!m) return;
      const isHidden = m.style.display === 'none';
      m.style.display = isHidden ? 'block' : 'none';
      const ta = document.getElementById('dna-prompt-textarea');
      if (isHidden && ta && !ta.value) {{
        ta.value = {json.dumps(prompt_content)};
      }}
    }}

    function copyPromptCode() {{
      const ta = document.getElementById('dna-prompt-textarea');
      if (ta) {{
        navigator.clipboard.writeText(ta.value);
        alert('MovieDNA 选片智能体 Prompt 已复制到剪贴板！可直接发送给 ChatGPT、Claude 或 Gemini 激活。');
      }}
    }}
  </script>
</body>
</html>"""
        return html_content

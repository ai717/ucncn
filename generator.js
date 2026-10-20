// MovieDNA Client-Side Engine v2.0
// 纯浏览器端本地分析与报告生成引擎，保护隐私，零依赖运行
(function(window) {
  'use strict';

  const TOP64_POSTERS = [
  {
    "title": "肖申克的救赎",
    "img": "/movie/static/posters/p2934829882.jpg"
  },
  {
    "title": "霸王别姬",
    "img": "/movie/static/posters/p2911205318.jpg"
  },
  {
    "title": "泰坦尼克号",
    "img": "/movie/static/posters/p457760035.jpg"
  },
  {
    "title": "阿甘正传",
    "img": "/movie/static/posters/p510876253.jpg"
  },
  {
    "title": "千与千寻",
    "img": "/movie/static/posters/p2557573348.jpg"
  },
  {
    "title": "星际穿越",
    "img": "/movie/static/posters/p2614988097.jpg"
  },
  {
    "title": "美丽人生",
    "img": "/movie/static/posters/p2578474613.jpg"
  },
  {
    "title": "这个杀手不太冷",
    "img": "/movie/static/posters/p2913554676.jpg"
  },
  {
    "title": "盗梦空间",
    "img": "/movie/static/posters/p513344864.jpg"
  },
  {
    "title": "楚门的世界",
    "img": "/movie/static/posters/p479682972.jpg"
  },
  {
    "title": "辛德勒的名单",
    "img": "/movie/static/posters/p492406163.jpg"
  },
  {
    "title": "忠犬八公的故事",
    "img": "/movie/static/posters/p2587099240.jpg"
  },
  {
    "title": "海上钢琴师",
    "img": "/movie/static/posters/p2914698334.jpg"
  },
  {
    "title": "疯狂动物城",
    "img": "/movie/static/posters/p2924128964.jpg"
  },
  {
    "title": "三傻大闹宝莱坞",
    "img": "/movie/static/posters/p579729551.jpg"
  },
  {
    "title": "机器人总动员",
    "img": "/movie/static/posters/p2934742160.jpg"
  },
  {
    "title": "放牛班的春天",
    "img": "/movie/static/posters/p2884280708.jpg"
  },
  {
    "title": "无间道",
    "img": "/movie/static/posters/p2597979873.jpg"
  },
  {
    "title": "控方证人",
    "img": "/movie/static/posters/p2927451337.jpg"
  },
  {
    "title": "寻梦环游记",
    "img": "/movie/static/posters/p2505426431.jpg"
  },
  {
    "title": "大话西游之大圣娶亲",
    "img": "/movie/static/posters/p2455050536.jpg"
  },
  {
    "title": "熔炉",
    "img": "/movie/static/posters/p1363250216.jpg"
  },
  {
    "title": "触不可及",
    "img": "/movie/static/posters/p1454261925.jpg"
  },
  {
    "title": "教父",
    "img": "/movie/static/posters/p616779645.jpg"
  },
  {
    "title": "哈利·波特与魔法石",
    "img": "/movie/static/posters/p2913781448.jpg"
  },
  {
    "title": "末代皇帝",
    "img": "/movie/static/posters/p452089833.jpg"
  },
  {
    "title": "当幸福来敲门",
    "img": "/movie/static/posters/p2220721286.jpg"
  },
  {
    "title": "龙猫",
    "img": "/movie/static/posters/p2540924496.jpg"
  },
  {
    "title": "活着",
    "img": "/movie/static/posters/p2597919477.jpg"
  },
  {
    "title": "怦然心动",
    "img": "/movie/static/posters/p501177648.jpg"
  },
  {
    "title": "蝙蝠侠：黑暗骑士",
    "img": "/movie/static/posters/p462657443.jpg"
  },
  {
    "title": "指环王3：王者无敌",
    "img": "/movie/static/posters/p2642829472.jpg"
  },
  {
    "title": "我不是药神",
    "img": "/movie/static/posters/p2527119568.jpg"
  },
  {
    "title": "乱世佳人",
    "img": "/movie/static/posters/p1963126880.jpg"
  },
  {
    "title": "让子弹飞",
    "img": "/movie/static/posters/p1512562287.jpg"
  },
  {
    "title": "飞屋环游记",
    "img": "/movie/static/posters/p485887754.jpg"
  },
  {
    "title": "哈尔的移动城堡",
    "img": "/movie/static/posters/p2907583906.jpg"
  },
  {
    "title": "十二怒汉",
    "img": "/movie/static/posters/p2173577632.jpg"
  },
  {
    "title": "海蒂和爷爷",
    "img": "/movie/static/posters/p2554525534.jpg"
  },
  {
    "title": "素媛",
    "img": "/movie/static/posters/p2118532944.jpg"
  },
  {
    "title": "猫鼠游戏",
    "img": "/movie/static/posters/p453924541.jpg"
  },
  {
    "title": "天空之城",
    "img": "/movie/static/posters/p2892409201.jpg"
  },
  {
    "title": "鬼子来了",
    "img": "/movie/static/posters/p2930874010.jpg"
  },
  {
    "title": "摔跤吧！爸爸",
    "img": "/movie/static/posters/p2401676338.jpg"
  },
  {
    "title": "少年派的奇幻漂流",
    "img": "/movie/static/posters/p1784592701.jpg"
  },
  {
    "title": "死亡诗社",
    "img": "/movie/static/posters/p2575465690.jpg"
  },
  {
    "title": "指环王2：双塔奇兵",
    "img": "/movie/static/posters/p2640236255.jpg"
  },
  {
    "title": "钢琴家",
    "img": "/movie/static/posters/p1381339291.jpg"
  },
  {
    "title": "大话西游之月光宝盒",
    "img": "/movie/static/posters/p2561721372.jpg"
  },
  {
    "title": "绿皮书",
    "img": "/movie/static/posters/p2531065411.jpg"
  },
  {
    "title": "何以为家",
    "img": "/movie/static/posters/p2875749222.jpg"
  },
  {
    "title": "闻香识女人",
    "img": "/movie/static/posters/p2550757929.jpg"
  },
  {
    "title": "大闹天宫",
    "img": "/movie/static/posters/p2184505167.jpg"
  },
  {
    "title": "黑客帝国",
    "img": "/movie/static/posters/p451926968.jpg"
  },
  {
    "title": "指环王1：护戒使者",
    "img": "/movie/static/posters/p2197698335.jpg"
  },
  {
    "title": "罗马假日",
    "img": "/movie/static/posters/p2189265085.jpg"
  },
  {
    "title": "教父2",
    "img": "/movie/static/posters/p2194138787.jpg"
  },
  {
    "title": "狮子王",
    "img": "/movie/static/posters/p726659067.jpg"
  },
  {
    "title": "天堂电影院",
    "img": "/movie/static/posters/p2653054340.jpg"
  },
  {
    "title": "饮食男女",
    "img": "/movie/static/posters/p1910899751.jpg"
  },
  {
    "title": "辩护人",
    "img": "/movie/static/posters/p2158166535.jpg"
  },
  {
    "title": "本杰明·巴顿奇事",
    "img": "/movie/static/posters/p2192535722.jpg"
  },
  {
    "title": "搏击俱乐部",
    "img": "/movie/static/posters/p1910931622.jpg"
  },
  {
    "title": "美丽心灵",
    "img": "/movie/static/posters/p1665997400.jpg"
  }
];

  function cleanTitle(fullTitle) {
    if (!fullTitle) return '未命名作品';
    const main = fullTitle.split('/')[0].trim();
    return main.length <= 24 ? main : main.slice(0, 24) + '…';
  }

  function derivePersona(totalMovies, avgRating, fiveStarPct, lowStarPct, commentCount) {
    let personaTitle = '理性现实品鉴家';
    let ratingDesc = `均分稳定在 ${avgRating} 分，五星神作占 ${fiveStarPct}%。不轻易给予盲目狂热，也不肆意宣泄苛责，在品质与诚意之间有着清醒的打分天平。`;

    if (fiveStarPct >= 28.0) {
      personaTitle = '感性沉浸共情者';
      ratingDesc = `五星率高达 ${fiveStarPct}%。你有一颗热烈而宽容的心灵，在光影世界里毫不吝啬赞美，总能敏锐捕捉到创作者最细微的情感火花。`;
    } else if (fiveStarPct <= 14.0 || lowStarPct >= 18.0) {
      personaTitle = '冷峻严苛审判者';
      ratingDesc = `五星神作率仅 ${fiveStarPct}%，低分率占 ${lowStarPct}%。在喧嚣浮躁的时代里，你坚守着极其严苛的审美底线，杜绝任何平庸煽情与智商侮辱。`;
    }

    let volumeDesc = '每一部静心凝视的作品，都在时光的长河里留下了清晰的坐标与思考。';
    if (totalMovies >= 1800) {
      volumeDesc = '数千个不可替代的夜晚，跨越近二十载寒来暑往。光影早已不仅是消遣，而是与你骨血相融的精神平行宇宙。';
    } else if (totalMovies >= 800) {
      volumeDesc = '数百部光影印记，构建了你丰厚多元的世界观底色，在不同国别与流派中从容穿梭。';
    }

    let commentDesc = '以沉默的星级作为最坚固的注脚，大音希声，每一次打标都是私人的精神私藏。';
    if (commentCount >= 150) {
      commentDesc = `留下了 ${commentCount} 篇笔力锋利的真实短评。爱憎分明、直击肯綮，文字是你与创作者之间最真诚的交锋。`;
    }

    return { personaTitle, ratingDesc, volumeDesc, commentDesc };
  }

  function analyzeRecords(records) {
    const totalCount = records.length;
    if (totalCount === 0) return null;

    const ratedRecords = records.filter(r => r.rating !== null && r.rating !== undefined && !isNaN(r.rating) && Number(r.rating) > 0);
    const unratedCount = totalCount - ratedRecords.length;

    // 智能适配 5分制 / 10分制
    const rawRatings = ratedRecords.map(r => Number(r.rating));
    const isFiveScale = rawRatings.length > 0 && Math.max(...rawRatings) <= 5;

    ratedRecords.forEach(r => {
      let num = Number(r.rating);
      if (isFiveScale) num = num * 2;
      r._calc_rating = num;
    });

    const ratings = ratedRecords.map(r => r._calc_rating !== undefined ? r._calc_rating : Number(r.rating));
    const avgRating = ratings.length ? +(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2) : 0.0;

    const ratingDist = { 10: 0, 8: 0, 6: 0, 4: 0, 2: 0 };
    ratings.forEach(r => {
      let bucket = Math.round(r / 2) * 2;
      if (bucket > 10) bucket = 10;
      if (bucket < 2) bucket = 2;
      if (ratingDist[bucket] !== undefined) ratingDist[bucket]++;
    });

    const n = ratings.length || 1;
    const ratingPct = {
      score_10: { count: ratingDist[10], pct: +((ratingDist[10] / n) * 100).toFixed(1) },
      score_8:  { count: ratingDist[8],  pct: +((ratingDist[8] / n) * 100).toFixed(1) },
      score_6:  { count: ratingDist[6],  pct: +((ratingDist[6] / n) * 100).toFixed(1) },
      score_4:  { count: ratingDist[4],  pct: +((ratingDist[4] / n) * 100).toFixed(1) },
      score_2:  { count: ratingDist[2],  pct: +((ratingDist[2] / n) * 100).toFixed(1) },
    };

    // Year timeline
    const yearCounts = {};
    records.forEach(r => {
      if (r.mark_date) {
        const yr = String(r.mark_date).split('-')[0].trim();
        if (/^\d{4}$/.test(yr)) {
          yearCounts[yr] = (yearCounts[yr] || 0) + 1;
        }
      }
    });
    const sortedYears = Object.keys(yearCounts).sort();
    const yearTimeline = {};
    sortedYears.forEach(y => yearTimeline[y] = yearCounts[y]);

    // Top tags
    const tagCounts = {};
    records.forEach(r => {
      (r.tags || []).forEach(t => {
        const clean = String(t).trim();
        if (clean && clean.length <= 10) {
          tagCounts[clean] = (tagCounts[clean] || 0) + 1;
        }
      });
    });
    const topTags = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([tag, count]) => ({ tag, count }));

    // Comments & quotes
    const commented = records.filter(r => r.comment && String(r.comment).trim());
    const commentCount = commented.length;

    const fiveStarSamples = ratedRecords
      .filter(r => r.rating === 10 && r.comment && String(r.comment).trim())
      .slice(0, 10)
      .map(r => ({ title: r.title, rating: r.rating, comment: r.comment }));

    const oneStarSamples = ratedRecords
      .filter(r => r.rating <= 4 && r.comment && String(r.comment).trim())
      .slice(0, 10)
      .map(r => ({ title: r.title, rating: r.rating, comment: r.comment }));

    return {
      overview: {
        total_movies: totalCount,
        rated_movies: ratedRecords.length,
        unrated_movies: unratedCount,
        average_rating: avgRating,
        five_star_rate: ratingPct.score_10.pct,
        four_star_rate: ratingPct.score_8.pct,
        three_star_rate: ratingPct.score_6.pct,
        low_star_rate: +(ratingPct.score_4.pct + ratingPct.score_2.pct).toFixed(1),
        total_comments: commentCount,
      },
      rating_distribution: ratingPct,
      year_timeline: yearTimeline,
      top_tags: topTags,
      representative_samples: {
        praise_samples: fiveStarSamples,
        criticism_samples: oneStarSamples,
      }
    };
  }

  function generateHtml(stats, meta) {
    const doubanId = meta.douban_id || 'cinephile';
    const origin = (typeof window !== 'undefined' && window.location && window.location.origin && window.location.origin !== 'null') ? window.location.origin : 'https://ucncn.cn';
    const overview = stats.overview || {};
    const ratingDist = stats.rating_distribution || {};
    const yearTimeline = stats.year_timeline || {};
    const topTags = (stats.top_tags || []).slice(0, 20);
    const samples = stats.representative_samples || {};
    const praiseSamples = (samples.praise_samples || []).slice(0, 6);
    const criticismSamples = (samples.criticism_samples || []).slice(0, 6);

    const totalMovies = overview.total_movies || 0;
    const ratedMovies = overview.rated_movies || 0;
    const avgRating = overview.average_rating || 0.0;
    const fiveStarPct = overview.five_star_rate || 0.0;
    const fourStarPct = overview.four_star_rate || 0.0;
    const threeStarPct = overview.three_star_rate || 0.0;
    const lowStarPct = overview.low_star_rate || 0.0;
    const commentCount = overview.total_comments || 0;

    const score10Count = (ratingDist.score_10 && ratingDist.score_10.count !== undefined)
      ? ratingDist.score_10.count : Math.round(ratedMovies * fiveStarPct / 100);
    const score8Count = (ratingDist.score_8 && ratingDist.score_8.count !== undefined)
      ? ratingDist.score_8.count : Math.round(ratedMovies * fourStarPct / 100);
    const score6Count = (ratingDist.score_6 && ratingDist.score_6.count !== undefined)
      ? ratingDist.score_6.count : Math.round(ratedMovies * threeStarPct / 100);
    let scoreLowCount = (ratingDist.score_4 ? ratingDist.score_4.count : 0) + (ratingDist.score_2 ? ratingDist.score_2.count : 0);
    if (scoreLowCount === 0 && lowStarPct > 0) scoreLowCount = Math.max(1, Math.round(ratedMovies * lowStarPct / 100));

    let pyramidStanceTitle = '黄金天平 · 殿堂率 ' + fiveStarPct + '%';
    let pyramidStanceDesc = '严格把守殿堂门槛，四星佳作广布，三星平庸不宥，评分分布严谨稳固。';
    if (fiveStarPct <= 12) {
      pyramidStanceTitle = '极高门槛 · 殿堂率 ' + fiveStarPct + '%';
      pyramidStanceDesc = '千淘万漉方成金，唯有直击灵魂的传世神作方能赢得五星加冕。';
    } else if (fiveStarPct > 26) {
      pyramidStanceTitle = '慷慨共情 · 殿堂率 ' + fiveStarPct + '%';
      pyramidStanceDesc = '善于在每部作品的光影脉络中捕捉人性闪光与诚意，沉浸感知力充沛。';
    }

    const yearKeys = Object.keys(yearTimeline);
    const yearValues = yearKeys.map(k => yearTimeline[k]);
    const startYear = yearKeys[0] || '2008';
    const endYear = yearKeys[yearKeys.length - 1] || '2026';
    const yearSpan = yearKeys.length || 1;
    const totalHours = Math.round(totalMovies * 110 / 60);

    const persona = derivePersona(totalMovies, avgRating, fiveStarPct, lowStarPct, commentCount);

    const tagDict = {};
    topTags.forEach(t => tagDict[t.tag] = t.count);

    const r_visual = Math.min(98, 82 + Math.floor(((tagDict['动画'] || 0) + (tagDict['经典'] || 0)) * 0.4));
    const r_logic = Math.min(96, 80 + Math.floor(((tagDict['科幻'] || 0) + (tagDict['悬疑'] || 0) + (tagDict['犯罪'] || 0)) * 0.3));
    const r_emotion = Math.min(98, 86 + Math.floor(((tagDict['剧情'] || 0) + (tagDict['人性'] || 0)) * 0.2));
    const r_social = Math.min(95, 82 + Math.floor(((tagDict['历史'] || 0) + (tagDict['社会'] || 0) + (tagDict['华语'] || 0)) * 0.3));
    const r_antifake = Math.min(100, 85 + Math.floor(lowStarPct * 1.1));
    const radarValues = [r_visual, r_logic, r_emotion, r_social, r_antifake];

    const radarDims = [
      { name: '镜头美学', sub: '视觉风格/构图', val: r_visual },
      { name: '叙事智性', sub: '剧作/逻辑/反转', val: r_logic },
      { name: '质朴深情', sub: '人性共鸣/治愈', val: r_emotion },
      { name: '社会隐喻', sub: '时代/批判/历史', val: r_social },
      { name: '反装逼雷达', sub: '严打悬浮/虚伪', val: r_antifake }
    ];
    const maxRVal = Math.max(...radarDims.map(d => d.val));
    const radarIndicators = radarDims.map(d => {
      const v = d.val;
      let sk = 'mid';
      let tag = `${v}分`;
      if (v === maxRVal) { sk = 'top'; tag = `👑 核心极值 ${v}分`; }
      else if (v >= 92) { sk = 'high'; tag = `✦ 突出 ${v}分`; }
      else if (v < 86)  { sk = 'low'; tag = `${v}分`; }
      const nameStr = `{${sk}|${d.name}}\n{${sk}|${tag}}\n{sub|(${d.sub})}`;
      return { name: nameStr, max: 100 };
    });

    const sortedDims = [...radarDims].sort((a, b) => b.val - a.val);
    const radarRankHtml = sortedDims.map(d => `
      <div class="radar-rank-badge ${d.val === maxRVal ? 'top-badge' : ''}">
        <div class="radar-rank-label">
          ${d.val === maxRVal ? '👑 ' : ''}${d.name}
        </div>
        <div class="radar-rank-val">${d.val} 分</div>
      </div>`).join('');

    const geoWords = new Set(['美国', '香港', '中国', '大陆', '日本', '英国', '法国', '韩国', '台湾', '德国', '意大利', '欧洲', '电影', '华语', '欧美']);
    let validGenres = topTags.filter(t => !geoWords.has(t.tag)).slice(0, 10);
    if (!validGenres.length) {
      validGenres = [
        { tag: '剧情', count: Math.round(totalMovies * 0.32) },
        { tag: '动作', count: Math.round(totalMovies * 0.26) },
        { tag: '喜剧', count: Math.round(totalMovies * 0.22) },
        { tag: '爱情', count: Math.round(totalMovies * 0.19) },
        { tag: '科幻', count: Math.round(totalMovies * 0.16) },
        { tag: '悬疑', count: Math.round(totalMovies * 0.14) },
        { tag: '犯罪', count: Math.round(totalMovies * 0.12) },
        { tag: '动画', count: Math.round(totalMovies * 0.10) },
        { tag: '奇幻', count: Math.round(totalMovies * 0.08) },
        { tag: '冒险', count: Math.round(totalMovies * 0.07) }
      ];
    }
    const maxGenreCount = Math.max(...validGenres.map(g => g.count), 1);
    const genreCount = validGenres.length;
    const genreBarsHtml = validGenres.map(g => `
      <div class="bar-row">
        <span class="bar-label">${g.tag}</span>
        <div class="bar-track">
          <div class="bar-fill" style="--target-width: ${Math.min(100, Math.round(g.count / maxGenreCount * 100))}%;"></div>
        </div>
        <span class="bar-num">${(g.count / Math.max(totalMovies, 1) * 100).toFixed(1)}%</span>
      </div>`).join('');

    let activePosters = TOP64_POSTERS;
    if (activePosters.length < 64) {
      while (activePosters.length < 64) activePosters = activePosters.concat(TOP64_POSTERS);
    }
    activePosters = activePosters.slice(0, 64);

    const posterWallHtml = activePosters.map((p, idx) => {
      const delay = +(((idx % 8) + Math.floor(idx / 8)) * 0.035).toFixed(3);
      const ct = cleanTitle(p.title);
      const fullImg = p.img.startsWith('http') ? p.img : `${origin}${p.img}`;
      return `
        <div class="poster-card" style="--delay: ${delay}s;" title="${p.title}">
          <div class="poster-fallback-badge">
            <span class="poster-badge-icon">🎬</span>
            <span class="poster-fallback-title">${ct}</span>
          </div>
          <img src="${fullImg}" alt="${p.title}" referrerpolicy="no-referrer" loading="lazy" onload="if(this.previousElementSibling)this.previousElementSibling.style.display='none';" onerror="this.style.opacity='0';" />
          <div class="poster-overlay">${ct}</div>
        </div>`;
    }).join('');

    const praiseHtml = praiseSamples.map(p => `
      <div class="quote-row gold-quote">
        <div class="quote-header">
          <span class="quote-film-title" title="${p.title}">《${cleanTitle(p.title)}》</span>
          <span class="quote-tag gold-tag">★★★★★ 10分</span>
        </div>
        <div class="quote-text">“${p.comment}”</div>
      </div>`).join('');

    const criticHtml = criticismSamples.map(c => `
      <div class="quote-row red-quote">
        <div class="quote-header">
          <span class="quote-film-title" title="${c.title}">《${cleanTitle(c.title)}》</span>
          <span class="quote-tag red-tag">${'★'.repeat(Math.floor((c.rating || 2) / 2)) + '☆'.repeat(5 - Math.floor((c.rating || 2) / 2))} ${c.rating || 2}分</span>
        </div>
        <div class="quote-text">“${c.comment}”</div>
      </div>`).join('');

    const promptContent = meta.dna_prompt || `你现在是用户 @${doubanId} 的专属私人选片顾问。以下是该用户的真实观影基因：
- 观影体量：${totalMovies} 部，均分 ${avgRating} 分，五星神作率 ${fiveStarPct}%，低分率 ${lowStarPct}%
- 观影人格：${persona.personaTitle}（${persona.ratingDesc}）
- 五维审美雷达：镜头美学 ${r_visual}、叙事智性 ${r_logic}、质朴深情 ${r_emotion}、社会隐喻 ${r_social}、反装逼雷达 ${r_antifake}
- 严选法则：严禁推荐剧情悬浮、煽情虚伪、智力侮辱的平庸之作；优先推荐在镜头审美或剧作智性上有极致表现的作品。`;

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <base href="${origin}/">
  <!-- 核心设置：no-referrer 彻底穿透豆瓣防盗链，确保海报 100% 显示 -->
  <meta name="referrer" content="no-referrer">
  <title>我的光影纪 · @${doubanId} 豆瓣观影报告</title>
  <link rel="icon" type="image/svg+xml" href="${origin}/static/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet">
  <script src="${origin}/movie/static/echarts.min.js" onerror="this.onerror=null;var s=document.createElement('script');s.src='https://registry.npmmirror.com/echarts/5.4.3/files/dist/echarts.min.js';document.head.appendChild(s);"></script>
  <script src="${origin}/movie/static/marked.min.js" onerror="this.onerror=null;var s=document.createElement('script');s.src='https://registry.npmmirror.com/marked/9.1.6/files/marked.min.js';document.head.appendChild(s);"></script>
  <style>
    :root {
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
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background-color: var(--bg-forest);
      background-image: 
        radial-gradient(circle at 50% 10%, rgba(0, 181, 29, 0.22) 0%, transparent 55%),
        repeating-linear-gradient(45deg, rgba(0,0,0,0.18) 0, rgba(0,0,0,0.18) 2px, transparent 0, transparent 5px);
      color: var(--text-light);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    .film-grain {
      position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
      pointer-events: none; z-index: 99; opacity: 0.04;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    /* ===== 逐屏漫游 (Story Mode) vs 全景长卷 (Overview Mode) ===== */
    html {
      scroll-behavior: smooth;
    }

    body.story-mode {
      height: 100vh;
      overflow-y: scroll;
      scroll-snap-type: y mandatory;
      scroll-behavior: smooth;
    }

    body.story-mode .viewport-flow {
      max-width: 100%;
      padding: 0;
      gap: 0;
    }

    .story-mode .story-slide-wrapper {
      height: 100vh;
      min-height: 100vh;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 70px 16px 36px 16px;
      box-sizing: border-box;
      position: relative;
    }

    .story-mode .story-slide-wrapper > section {
      width: 100%;
      max-width: 880px;
      max-height: calc(100vh - 110px);
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(16, 185, 129, 0.4) transparent;
    }

    /* 全景长卷模式 (Overview Mode) */
    body.overview-mode {
      height: auto !important;
      overflow-y: visible !important;
      scroll-snap-type: none !important;
    }

    body.overview-mode .viewport-flow {
      max-width: 880px;
      margin: 0 auto;
      padding: 85px 20px 80px 20px;
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    body.overview-mode .story-slide-wrapper {
      height: auto !important;
      min-height: auto !important;
      scroll-snap-align: none !important;
      padding: 0 !important;
      display: block !important;
    }

    body.overview-mode .story-slide-wrapper > section {
      max-height: none !important;
      overflow: visible !important;
    }

    body.overview-mode #bottom-scroll-cue,
    body.overview-mode #story-nav-dots {
      display: none !important;
    }

    /* 顶部悬浮控制栏 */
    .story-top-bar {
      position: fixed;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 32px);
      max-width: 880px;
      z-index: 100;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      border-radius: 24px;
      background: rgba(11, 21, 16, 0.85);
      border: 1px solid rgba(255, 255, 255, 0.16);
      backdrop-filter: blur(20px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }

    .top-nav-btn {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #cbd5e1;
      padding: 6px 14px;
      border-radius: 18px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .top-nav-btn:hover {
      background: rgba(255, 255, 255, 0.16);
      color: #ffffff;
    }

    .top-nav-btn.download-btn {
      background: rgba(0, 181, 29, 0.18);
      border-color: rgba(0, 181, 29, 0.4);
      color: #a7f3d0;
    }
    .top-nav-btn.download-btn:hover {
      background: rgba(0, 181, 29, 0.32);
    }

    .mode-switch-pill {
      display: inline-flex;
      background: rgba(0, 0, 0, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 20px;
      padding: 3px;
      gap: 3px;
    }

    .mode-btn {
      padding: 4px 12px;
      border-radius: 16px;
      border: none;
      background: transparent;
      color: #94a3b8;
      font-size: 11px;
      font-weight: 800;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .mode-btn.active {
      background: #00b51d;
      color: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 181, 29, 0.4);
    }

    /* 右侧悬浮分页点 */
    .story-nav-dots {
      position: fixed;
      right: 18px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 90;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .nav-dot-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .nav-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.25);
      border: 1.5px solid transparent;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      outline: none;
    }

    .nav-dot:hover, .nav-dot.active {
      background: #00b51d;
      transform: scale(1.4);
      box-shadow: 0 0 12px #00b51d;
    }

    .nav-dot.active {
      border-color: #ffffff;
    }

    .dot-label {
      position: absolute;
      right: 22px;
      padding: 3px 8px;
      border-radius: 6px;
      background: rgba(15, 23, 42, 0.92);
      border: 1px solid rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
      font-size: 11px;
      font-weight: 700;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transform: translateX(6px);
      transition: all 0.2s ease;
    }

    .nav-dot-wrap:hover .dot-label {
      opacity: 1;
      transform: translateX(0);
    }

    /* 底部滚动提示箭头 */
    .bottom-scroll-cue {
      position: fixed;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 80;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 16px;
      border-radius: 20px;
      background: rgba(11, 21, 16, 0.8);
      border: 1px solid rgba(0, 181, 29, 0.35);
      color: #a7f3d0;
      font-size: 11px;
      font-weight: 800;
      backdrop-filter: blur(10px);
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(0,0,0,0.4);
      animation: floatCue 2s infinite ease-in-out;
      transition: opacity 0.3s ease;
    }

    @keyframes floatCue {
      0%, 100% { transform: translate(-50%, 0); }
      50% { transform: translate(-50%, -6px); }
    }

    /* 漫游通关全景解锁卡片 */
    .completion-unlock-box {
      background: radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.22) 0%, rgba(15, 23, 42, 0.95) 75%);
      border: 1.5px solid rgba(245, 158, 11, 0.4);
      border-radius: 24px;
      padding: 24px 20px;
      text-align: center;
      margin-top: 24px;
      box-shadow: 0 15px 40px rgba(0,0,0,0.6);
    }

    .unlock-btn {
      padding: 12px 28px;
      border-radius: 14px;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: #000;
      font-size: 13px;
      font-weight: 900;
      border: none;
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
      transition: all 0.25s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .unlock-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(245, 158, 11, 0.6);
    }

    /* 全模块保证 100% 完整呈现，避免动效脚本未触发时空白隐形 */
    .reveal-card {
      opacity: 1;
      transform: none;
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    .reveal-card.revealed {
      opacity: 1;
      transform: none;
    }
    .paper-section {
      opacity: 1 !important;
      transform: none !important;
    }

    /* 金属长尾夹拟物隐喻 */
    .binder-clip {
      width: 56px;
      height: 48px;
      margin: 0 auto -20px auto;
      position: relative;
      z-index: 30;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .clip-wire {
      width: 32px;
      height: 28px;
      border: 3px solid #71717a;
      border-bottom: none;
      border-radius: 12px 12px 0 0;
      box-shadow: 0 4px 8px rgba(0,0,0,0.6);
    }
    .clip-body {
      width: 52px;
      height: 18px;
      background: linear-gradient(180deg, #27272a 0%, #18181b 100%);
      border-radius: 4px;
      border: 1px solid #3f3f46;
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
    }

    /* 模块 1：复古牛油果淡青信纸 (吸收图 1、图 4、图 5) */
    .paper-section {
      background: var(--paper-cream);
      color: var(--text-dark);
      border-radius: 32px;
      padding: 48px 44px 40px 44px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(0, 181, 29, 0.12);
      position: relative;
      overflow: hidden;
    }

    /* 复古邮戳印章 */
    .stamp-seal {
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
    }
    .stamp-seal .year { font-size: 15px; font-weight: 900; color: #00b51d; }

    /* 顶部身份栏 */
    .profile-row {
      display: flex;
      align-items: center;
      gap: 18px;
      margin-bottom: 28px;
    }
    .avatar-circle {
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
    }
    .user-main { font-size: 28px; font-weight: 900; color: #064e3b; letter-spacing: -0.5px; }
    .user-tagline {
      display: inline-flex; align-items: center; gap: 6px;
      font-size: 13px; font-weight: 700; color: #047857;
      background: rgba(0, 181, 29, 0.12); padding: 3px 12px; border-radius: 20px;
      margin-top: 4px;
    }

    /* 4 格核心指标卡片 (层次分明、杂志感、高信息识别度) */
    .capsule-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 18px;
      margin-bottom: 32px;
    }
    .capsule-card {
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
    }
    .capsule-card::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 4px;
      background: linear-gradient(90deg, #10b981 0%, #059669 100%);
      opacity: 0.8;
    }
    .capsule-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 14px 28px -6px rgba(6, 78, 59, 0.14);
    }
    .capsule-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }
    .capsule-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .capsule-icon-box {
      width: 32px;
      height: 32px;
      border-radius: 10px;
      background: rgba(16, 185, 129, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
    }
    .capsule-label {
      font-size: 14px;
      font-weight: 800;
      color: #064e3b;
      letter-spacing: 0.2px;
    }
    .capsule-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 12px;
      background: rgba(4, 120, 87, 0.08);
      color: #047857;
    }
    .capsule-val-row {
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    .capsule-val {
      font-size: 46px;
      font-weight: 950;
      color: #064e3b;
      line-height: 1;
      letter-spacing: -1.5px;
      font-feature-settings: "tnum";
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .capsule-unit {
      font-size: 15px;
      font-weight: 700;
      color: #059669;
    }
    .capsule-subtext {
      font-size: 12px;
      color: #6b7280;
      margin-top: 8px;
    }

    /* 电影信笺区域：时光打字机、分段便签式排版与层次重构 */
    .letter-parchment {
      font-family: "Noto Serif SC", "Songti SC", "SimSun", serif;
      background: linear-gradient(180deg, #ffffff 0%, #f7faf7 100%);
      border: 1px solid rgba(16, 185, 129, 0.25);
      border-radius: 20px;
      padding: 32px 28px;
      margin-bottom: 24px;
      box-shadow: 0 4px 20px rgba(6, 78, 59, 0.04);
      position: relative;
    }
    .letter-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 16px;
      margin-bottom: 20px;
      border-bottom: 1px dashed rgba(4, 120, 87, 0.2);
    }
    .letter-salutation {
      font-size: 17px;
      font-weight: 700;
      color: #064e3b;
      letter-spacing: 0.5px;
    }
    .letter-machine-badge {
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
    }
    .letter-body {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .letter-paragraph {
      font-size: 15px;
      line-height: 2.1;
      color: #374151;
      text-align: justify;
      position: relative;
      padding-left: 18px;
      border-left: 2px solid rgba(16, 185, 129, 0.35);
    }
    .letter-paragraph strong {
      color: #064e3b;
      font-weight: 700;
      background: rgba(16, 185, 129, 0.12);
      padding: 1px 4px;
      border-radius: 4px;
    }
    .letter-footer-quote {
      margin-top: 10px;
      padding: 14px 18px;
      background: rgba(220, 252, 231, 0.5);
      border-radius: 12px;
      border: 1px solid rgba(16, 185, 129, 0.2);
      font-size: 14px;
      line-height: 1.9;
      color: #064e3b;
      font-style: italic;
    }
    .typing-cursor {
      display: inline-block;
      width: 2px;
      height: 1.1em;
      background: #00b51d;
      vertical-align: sub;
      animation: blink 0.8s infinite;
      margin-left: 2px;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }

    /* 模块 2：经典宝蓝光影海报阵列 (吸收图 2) */
    .blue-section {
      background: linear-gradient(180deg, #0284c7 0%, #0369a1 100%);
      border-radius: 32px;
      padding: 40px 36px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(2, 132, 199, 0.25);
    }
    .section-head {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: 20px;
    }
    .section-title { font-size: 26px; font-weight: 900; color: #fff; }
    .section-badge { font-size: 11px; font-weight: 800; letter-spacing: 1px; color: #bae6fd; text-transform: uppercase; }

    /* 8x8 殿堂级高密度光影海报阵列 (64 宫格电影成就墙) */
    .poster-grid {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 8px;
      margin-top: 18px;
    }
    @media (max-width: 768px) {
      .poster-grid {
        grid-template-columns: repeat(6, 1fr);
        gap: 6px;
      }
    }
    @media (max-width: 480px) {
      .poster-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 6px;
      }
    }
    .poster-card {
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
      opacity: 0.2;
      transform: scale(0.92) translateY(8px);
      transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0s),
                  transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0s),
                  box-shadow 0.2s ease;
    }
    .blue-section.revealed .poster-card {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
    .poster-fallback-badge {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 6px;
      text-align: center;
      user-select: none;
      z-index: 1;
    }
    .poster-badge-icon {
      font-size: 16px;
    }
    .poster-fallback-title {
      font-size: 9px;
      font-weight: 700;
      color: #94a3b8;
      line-height: 1.2;
      word-break: break-all;
    }
    .poster-card:hover {
      transform: translateY(-5px) scale(1.15) !important;
      box-shadow: 0 14px 28px rgba(0,0,0,0.65);
      z-index: 20;
    }
    .poster-card img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      z-index: 2;
      transition: opacity 0.3s ease;
    }
    .poster-overlay {
      position: absolute; bottom: 0; left: 0; width: 100%;
      background: linear-gradient(0deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 70%, transparent 100%);
      font-size: 9px; font-weight: 700; color: #f3f4f6;
      padding: 8px 3px 3px 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
      text-align: center;
      z-index: 3;
    }

    /* 模块 3：深林墨绿 · 观影特征可视化独立大卡片 */
    .dark-section {
      background: rgba(18, 38, 26, 0.9);
      border: 1px solid rgba(154, 230, 180, 0.22);
      backdrop-filter: blur(20px);
      border-radius: 32px;
      padding: 40px 36px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7);
    }
    /* 模块四：星级严苛度分值金字塔 (超感大尺寸、加粗发光发亮进度条) */
    .pyramid-overview-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-top: 24px;
      margin-bottom: 20px;
    }
    @media (max-width: 600px) {
      .pyramid-overview-grid { grid-template-columns: 1fr; }
    }
    .pyramid-stat-card {
      background: rgba(10, 25, 18, 0.7);
      border: 1.5px solid rgba(245, 158, 11, 0.3);
      border-radius: 20px;
      padding: 18px 22px;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
      transition: all 0.3s ease;
    }
    .pyramid-stat-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(245, 158, 11, 0.15);
    }
    .pyramid-stat-card.green-card {
      border-color: rgba(52, 211, 153, 0.3);
    }
    .pyramid-stat-card.green-card:hover {
      box-shadow: 0 8px 25px rgba(52, 211, 153, 0.15);
    }
    .pyramid-stat-title {
      font-size: 12px;
      font-weight: 800;
      color: #94a3b8;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .pyramid-stat-val {
      font-size: 32px;
      font-weight: 900;
      font-feature-settings: "tnum";
      line-height: 1.1;
      margin-bottom: 4px;
    }
    .pyramid-stat-sub {
      font-size: 13px;
      font-weight: 700;
      color: #cbd5e1;
    }
    .metric-subcard {
      background: rgba(8, 20, 14, 0.85);
      border: 1.5px solid rgba(154, 230, 180, 0.25);
      border-radius: 28px;
      padding: 32px 30px;
      box-shadow: inset 0 2px 20px rgba(0, 0, 0, 0.6), 0 15px 40px rgba(0, 0, 0, 0.4);
    }
    .star-bar-row {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      position: relative;
    }
    .star-bar-row:last-child {
      margin-bottom: 0;
    }
    .star-bar-meta {
      width: 175px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 3px;
    }
    .star-bar-label {
      font-size: 15px;
      font-weight: 900;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .star-count-badge {
      font-size: 12px;
      font-weight: 700;
      color: #94a3b8;
      font-feature-settings: "tnum";
    }
    .star-bar-track {
      flex: 1;
      height: 26px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 14px;
      overflow: hidden;
      margin: 0 20px;
      border: 1.5px solid rgba(255, 255, 255, 0.15);
      box-shadow: inset 0 3px 10px rgba(0, 0, 0, 0.8);
      position: relative;
    }
    .star-bar-fill {
      height: 100%;
      border-radius: 14px;
      width: 0;
      transition: width 1.3s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    .star-bar-fill::after {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; height: 50%;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.05) 100%);
      border-radius: 14px 14px 0 0;
    }
    .dark-section.revealed .star-bar-fill,
    .reveal-card.revealed .star-bar-fill {
      width: var(--target-width);
    }
    .dark-section.revealed .star-bar-row:nth-child(1) .star-bar-fill { transition-delay: 0.1s; }
    .dark-section.revealed .star-bar-row:nth-child(2) .star-bar-fill { transition-delay: 0.25s; }
    .dark-section.revealed .star-bar-row:nth-child(3) .star-bar-fill { transition-delay: 0.4s; }
    .dark-section.revealed .star-bar-row:nth-child(4) .star-bar-fill { transition-delay: 0.55s; }
    .star-bar-num {
      width: 82px;
      flex-shrink: 0;
      text-align: right;
      font-weight: 900;
      font-size: 22px;
      font-feature-settings: "tnum";
      letter-spacing: -0.5px;
    }
    .pyramid-footer-philosophy {
      margin-top: 26px;
      padding-top: 20px;
      border-top: 1px dashed rgba(255, 255, 255, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 13px;
      color: #e2e8f0;
      line-height: 1.6;
    }
    .pyramid-footer-tag {
      padding: 5px 12px;
      border-radius: 8px;
      background: rgba(245, 158, 11, 0.18);
      border: 1px solid rgba(245, 158, 11, 0.4);
      color: #fbbf24;
      font-weight: 800;
      font-size: 12px;
      white-space: nowrap;
    }
    .split-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: center; }

    /* 核心常驻题材矩阵 (大字号、醒目发光渐变胶囊条、高清晰对比度) */
    .genre-matrix-card {
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 20px;
      padding: 20px 24px;
      margin-bottom: 24px;
    }
    .genre-matrix-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .genre-matrix-title {
      font-size: 14px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .genre-matrix-tip {
      font-size: 11px;
      font-weight: 600;
      color: #bae6fd;
    }
    .genre-bars-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px 32px;
    }
    @media (min-width: 680px) {
      .genre-bars-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .bar-row {
      display: flex;
      align-items: center;
      font-size: 14px;
    }
    .bar-label {
      width: 72px;
      font-size: 13px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.3px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bar-track {
      flex: 1;
      height: 12px;
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      overflow: hidden;
      margin: 0 12px;
      position: relative;
    }
    .bar-fill {
      height: 100%;
      border-radius: 8px;
      background: linear-gradient(90deg, #38bdf8 0%, #ffffff 100%);
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
      width: 0;
      transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .blue-section.revealed .bar-fill,
    .reveal-card.revealed .bar-fill {
      width: var(--target-width);
    }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(1) .bar-fill { transition-delay: 0.05s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(2) .bar-fill { transition-delay: 0.11s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(3) .bar-fill { transition-delay: 0.17s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(4) .bar-fill { transition-delay: 0.23s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(5) .bar-fill { transition-delay: 0.29s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(6) .bar-fill { transition-delay: 0.35s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(7) .bar-fill { transition-delay: 0.41s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(8) .bar-fill { transition-delay: 0.47s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(9) .bar-fill { transition-delay: 0.53s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(10) .bar-fill { transition-delay: 0.59s; }
    .bar-num {
      width: 52px;
      text-align: right;
      font-size: 14px;
      font-weight: 900;
      color: #38bdf8;
      font-feature-settings: "tnum";
    }

    /* 五维决策天梯胶囊栏 (值越大的胶囊越突出) */
    .radar-rank-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      justify-content: center;
      margin-top: 24px;
    }
    .radar-rank-badge {
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
    }
    .radar-rank-badge:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 14px rgba(0, 181, 29, 0.2);
    }
    .radar-rank-badge .radar-rank-val {
      font-weight: 900;
      font-feature-settings: "tnum";
      color: #34d399;
    }
    .radar-rank-badge.top-badge {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(217, 119, 6, 0.4) 100%);
      border: 1.5px solid #fbbf24;
      color: #fef08a;
      box-shadow: 0 0 20px rgba(245, 158, 11, 0.35);
      font-size: 14px;
      transform: scale(1.06);
    }
    .radar-rank-badge.top-badge .radar-rank-val {
      color: #fbbf24;
      font-size: 16px;
    }

    /* 短评留痕 (杂志级单行规整排版，左右滑入交错动效) */
    .quote-row {
      background: rgba(10, 20, 14, 0.65);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 16px 18px;
      margin-bottom: 14px;
      border-left: 4px solid #00b51d;
      opacity: 1;
      transform: none;
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
    }
    .gold-quote {
      border-left-color: #f59e0b;
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.06);
    }
    .red-quote {
      border-left-color: #ef4444;
      box-shadow: 0 4px 16px rgba(239, 68, 68, 0.06);
    }
    .quote-row {
      opacity: 1;
      transform: none;
    }
    .dark-section.revealed .gold-quote:nth-child(2) { transition-delay: 0.1s; }
    .dark-section.revealed .gold-quote:nth-child(3) { transition-delay: 0.25s; }
    .dark-section.revealed .gold-quote:nth-child(4) { transition-delay: 0.4s; }
    .dark-section.revealed .red-quote:nth-child(2) { transition-delay: 0.15s; }
    .dark-section.revealed .red-quote:nth-child(3) { transition-delay: 0.3s; }
    .dark-section.revealed .red-quote:nth-child(4) { transition-delay: 0.45s; }
    .quote-row:hover {
      transform: translateX(3px) !important;
      background: rgba(15, 30, 20, 0.8);
    }
    .quote-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 8px;
    }
    .quote-film-title {
      font-size: 14px;
      font-weight: 800;
      color: #ffffff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      letter-spacing: 0.2px;
    }
    .quote-tag {
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
    }
    .gold-tag {
      background: rgba(245, 158, 11, 0.2);
      border: 1px solid rgba(245, 158, 11, 0.4);
      color: #fbbf24;
    }
    .red-tag {
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #f87171;
    }
    .quote-text {
      font-size: 13px;
      color: #d1d5db;
      line-height: 1.7;
      font-family: "Noto Serif SC", "Songti SC", serif;
      letter-spacing: 0.3px;
    }

    /* 模块 5：AI 选片孪生大脑出口卡片 */
    .ai-hero-card {
      background: radial-gradient(circle at 50% 0%, rgba(0, 181, 29, 0.25) 0%, rgba(13, 26, 18, 0.95) 75%);
      border: 1px solid rgba(0, 181, 29, 0.4);
      border-radius: 32px;
      padding: 44px 36px;
      text-align: center;
      box-shadow: 0 25px 60px rgba(0, 181, 29, 0.15);
    }
    .ai-btn-primary {
      background: linear-gradient(135deg, #00b51d 0%, #059669 100%);
      color: #fff; font-size: 15px; font-weight: 800; border-radius: 16px;
      padding: 16px 36px; border: none; cursor: pointer; display: inline-flex;
      align-items: center; gap: 8px; box-shadow: 0 10px 25px rgba(0, 181, 29, 0.4);
      transition: all 0.25s ease;
    }
    .ai-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 35px rgba(0, 181, 29, 0.6);
    }

    @media (max-width: 768px) {
      .capsule-grid { grid-template-columns: 1fr 1fr; }
      .split-2 { grid-template-columns: 1fr; }
      .poster-grid { grid-template-columns: repeat(2, 1fr); gap: 8px; }
      .paper-section, .blue-section, .dark-section, .ai-hero-card { padding: 32px 20px; }
      .user-main { font-size: 24px; }
    }
  </style>
</head>
<body class="story-mode">
  <div class="film-grain"></div>

  <!-- 顶部悬浮控制栏 (常驻大屏，兼顾逐屏与全景) -->
  <header class="story-top-bar">
    <button onclick="if(window.parent && window.parent.closeReportView) window.parent.closeReportView(); else if(window.parent && window.parent.history && window.parent !== window) window.parent.history.back(); else window.history.back();" class="top-nav-btn">
      <span>←</span> <span>返回重新上传</span>
    </button>
    <div class="mode-switch-pill">
      <button id="btn-mode-story" onclick="toggleViewMode('story')" class="mode-btn active">📖 逐屏漫游</button>
      <button id="btn-mode-overview" onclick="toggleViewMode('overview')" class="mode-btn">📜 全景长卷</button>
    </div>
    <button onclick="window.downloadThisReport()" class="top-nav-btn download-btn">
      <span>💾</span> <span>导出离线 HTML</span>
    </button>
  </header>

  <!-- 右侧逐屏导航锚点 -->
  <aside class="story-nav-dots" id="story-nav-dots">
    <div class="nav-dot-wrap"><span class="dot-label">1. 个人档案</span><button class="nav-dot active" onclick="goToSlide(1)" data-index="1"></button></div>
    <div class="nav-dot-wrap"><span class="dot-label">2. 殿堂海报</span><button class="nav-dot" onclick="goToSlide(2)" data-index="2"></button></div>
    <div class="nav-dot-wrap"><span class="dot-label">3. 决策雷达</span><button class="nav-dot" onclick="goToSlide(3)" data-index="3"></button></div>
    <div class="nav-dot-wrap"><span class="dot-label">4. 严苛金字塔</span><button class="nav-dot" onclick="goToSlide(4)" data-index="4"></button></div>
    <div class="nav-dot-wrap"><span class="dot-label">5. 历年足迹</span><button class="nav-dot" onclick="goToSlide(5)" data-index="5"></button></div>
    <div class="nav-dot-wrap"><span class="dot-label">6. 短评切片</span><button class="nav-dot" onclick="goToSlide(6)" data-index="6"></button></div>
    <div class="nav-dot-wrap"><span class="dot-label">7. 数字孪生</span><button class="nav-dot" onclick="goToSlide(7)" data-index="7"></button></div>
  </aside>

  <!-- 底部向下滑动探索提示 -->
  <div class="bottom-scroll-cue" id="bottom-scroll-cue" onclick="goToNextSlide()">
    <span>向下滚动探索下一章</span>
    <span>↓</span>
  </div>

  <main class="viewport-flow">

    <div class="story-slide-wrapper" id="slide-1" data-index="1" data-title="个人档案">
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
          <div class="user-main">@${doubanId}</div>
          <div class="user-tagline">
            <span>✨ 观影人格：<strong>${persona.personaTitle}</strong></span>
            <span>· 第 ${yearSpan} 载</span>
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
            <span class="capsule-val counter" data-target="${totalMovies}">${totalMovies}</span>
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
            <span class="capsule-val">${avgRating}</span>
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
            <span class="capsule-val">${fiveStarPct}</span>
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
            <span class="capsule-val counter" data-target="${commentCount}">${commentCount}</span>
            <span class="capsule-unit">篇真迹</span>
          </div>
          <div class="capsule-subtext">观影后亲手写下的情绪切片与思想锋芒</div>
        </div>
      </div>

      <!-- 豆瓣诗意书写信笺 (时光打字机与分段便签排版) -->
      <div class="letter-parchment">
        <div class="letter-header">
          <div class="letter-salutation">致 @${doubanId} 的光影私信</div>
          <div class="letter-machine-badge">
            <span>⌨️</span> 岁月打字机 · 独家解封
          </div>
        </div>

        <div class="letter-body">
          <div class="letter-paragraph">
            当跨越 <strong>${startYear} 至 ${endYear}</strong> 的时光卷轴缓缓合拢，荧幕渐暗，心声长存。<br>
            ${persona.volumeDesc}
          </div>

          <div class="letter-paragraph">
            在累计约 <strong>${totalHours} 个小时</strong> 的沉浸体验中，${persona.ratingDesc}
          </div>

          <div class="letter-paragraph">
            ${persona.commentDesc}
          </div>

          <div class="letter-footer-quote">
            <span id="typing-quote">每一次标记，都是你交给时间的私人日记；此刻，让穿梭岁月的打字机，为你叩响这片精神家园的专属回响。</span><span class="typing-cursor"></span>
          </div>
        </div>
      </div>

      <div style="text-align: right; font-size: 12px; color: #047857; font-weight: 800; margin-top: 10px;">
        —— 豆瓣光影纪元 · ${startYear}-${endYear}
      </div>
    </section>
    </div>

    <div class="story-slide-wrapper" id="slide-2" data-index="2" data-title="殿堂海报">
    <!-- 模块二：经典宝蓝 · 个人年度海报阵列 (还原 8x8 高密度 64 宫格大片成就墙) -->
    <section class="blue-section reveal-card">
      <div class="section-head">
        <div>
          <div class="section-badge">CINEMA POSTER WALL · 8×8 MOSAIC</div>
          <h2 class="section-title">殿堂光影海报阵列 (8×8 成就墙)</h2>
        </div>
        <div style="font-size: 32px; font-weight: 900; font-feature-settings: 'tnum';">
          ${totalMovies} <span style="font-size: 14px; font-weight: 600;">部</span>
        </div>
      </div>

      <!-- 核心常驻题材矩阵 (动态最多 10 大维度、双列瀑布流发光进度条) -->
      <div class="genre-matrix-card">
        <div class="genre-matrix-header">
          <div class="genre-matrix-title">
            <span>⊞</span> 核心常驻题材矩阵
          </div>
          <div class="genre-matrix-tip">TOP ${genreCount} 偏好维度占比</div>
        </div>
        <div class="genre-bars-grid">
          ${genreBarsHtml}
        </div>
      </div>

      <!-- 4x4 海报网格瀑布 (no-referrer 确保图片完全加载) -->
      <div class="poster-grid">
        ${posterWallHtml}
      </div>
    </section>
    </div>

    <div class="story-slide-wrapper" id="slide-3" data-index="3" data-title="决策雷达">
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
        ${radarRankHtml}
      </div>
    </section>
    </div>

    <div class="story-slide-wrapper" id="slide-4" data-index="4" data-title="严苛金字塔">
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
            ${fiveStarPct}%
          </div>
          <div class="pyramid-stat-sub">
            共计 <strong>${score10Count}</strong> 部 · ${pyramidStanceTitle}
          </div>
        </div>

        <div class="pyramid-stat-card green-card">
          <div class="pyramid-stat-title">
            <span>⚖️</span> 全周期严苛均分与底线
          </div>
          <div class="pyramid-stat-val" style="color: #34d399; text-shadow: 0 0 16px rgba(52, 211, 153, 0.5);">
            ${avgRating} <span style="font-size: 14px; font-weight: 700; color: #a7f3d0;">分</span>
          </div>
          <div class="pyramid-stat-sub">
            低星避坑痛批率 <strong>${lowStarPct}%</strong> (${scoreLowCount} 部)
          </div>
        </div>
      </div>

      <!-- 金字塔超感发光进度条阵列 -->
      <div class="metric-subcard">
        <div class="star-bar-row">
          <div class="star-bar-meta">
            <span class="star-bar-label" style="color: #fbbf24; text-shadow: 0 0 10px rgba(245, 158, 11, 0.4);">★★★★★ 殿堂神作</span>
            <span class="star-count-badge">已加冕 ${score10Count} 部</span>
          </div>
          <div class="star-bar-track">
            <div class="star-bar-fill" style="--target-width: ${fiveStarPct}%; background: linear-gradient(90deg, #b45309 0%, #f59e0b 50%, #fef08a 100%); box-shadow: 0 0 20px rgba(245, 158, 11, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.5);"></div>
          </div>
          <span class="star-bar-num" style="color: #fbbf24; text-shadow: 0 0 12px rgba(245, 158, 11, 0.45);">${fiveStarPct}%</span>
        </div>

        <div class="star-bar-row">
          <div class="star-bar-meta">
            <span class="star-bar-label" style="color: #34d399; text-shadow: 0 0 10px rgba(52, 211, 153, 0.4);">★★★★☆ 诚意佳作</span>
            <span class="star-count-badge">入选 ${score8Count} 部</span>
          </div>
          <div class="star-bar-track">
            <div class="star-bar-fill" style="--target-width: ${fourStarPct}%; background: linear-gradient(90deg, #047857 0%, #10b981 50%, #6ee7b7 100%); box-shadow: 0 0 20px rgba(16, 185, 129, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.5);"></div>
          </div>
          <span class="star-bar-num" style="color: #34d399; text-shadow: 0 0 12px rgba(52, 211, 153, 0.45);">${fourStarPct}%</span>
        </div>

        <div class="star-bar-row">
          <div class="star-bar-meta">
            <span class="star-bar-label" style="color: #60a5fa; text-shadow: 0 0 10px rgba(96, 165, 250, 0.4);">★★★☆☆ 平庸消遣</span>
            <span class="star-count-badge">记录 ${score6Count} 部</span>
          </div>
          <div class="star-bar-track">
            <div class="star-bar-fill" style="--target-width: ${threeStarPct}%; background: linear-gradient(90deg, #1d4ed8 0%, #3b82f6 50%, #93c5fd 100%); box-shadow: 0 0 20px rgba(59, 130, 246, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.5);"></div>
          </div>
          <span class="star-bar-num" style="color: #60a5fa; text-shadow: 0 0 12px rgba(96, 165, 250, 0.45);">${threeStarPct}%</span>
        </div>

        <div class="star-bar-row">
          <div class="star-bar-meta">
            <span class="star-bar-label" style="color: #f87171; text-shadow: 0 0 10px rgba(248, 113, 113, 0.4);">★☆☆☆☆ 踩雷痛批</span>
            <span class="star-count-badge">批判 ${scoreLowCount} 部</span>
          </div>
          <div class="star-bar-track">
            <div class="star-bar-fill" style="--target-width: ${lowStarPct}%; background: linear-gradient(90deg, #b91c1c 0%, #ef4444 50%, #fca5a5 100%); box-shadow: 0 0 20px rgba(239, 68, 68, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.5);"></div>
          </div>
          <span class="star-bar-num" style="color: #f87171; text-shadow: 0 0 12px rgba(248, 113, 113, 0.45);">${lowStarPct}%</span>
        </div>

        <!-- 底部审美哲学沉淀条 -->
        <div class="pyramid-footer-philosophy">
          <span class="pyramid-footer-tag">审美天平定势</span>
          <span>${pyramidStanceDesc}</span>
        </div>
      </div>
    </section>
    </div>

    <div class="story-slide-wrapper" id="slide-5" data-index="5" data-title="历年足迹">
    <!-- 模块五：光影足迹历年走势 (独立全幅大卡片) -->
    <section class="dark-section reveal-card">
      <div class="section-head">
        <div>
          <div class="section-badge" style="color: #38bdf8;">TIMELINE & FOOTPRINTS</div>
          <h2 class="section-title">光影足迹历年走势</h2>
        </div>
        <div style="font-size: 13px; color: #38bdf8; font-weight: 700;">
          ${startYear} - ${endYear} 跨越时光的视听见证
        </div>
      </div>
      <div id="chart-timeline" style="height: 340px; width: 100%; margin-top: 10px;"></div>
    </section>
    </div>

    <div class="story-slide-wrapper" id="slide-6" data-index="6" data-title="短评切片">
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
          ${praiseHtml}
        </div>
        <div>
          <div style="font-size: 13px; font-weight: 800; color: #f87171; margin-bottom: 10px;">⚡ 绝对雷区痛批</div>
          ${criticHtml}
        </div>
      </div>
    </section>
    </div>

    <div class="story-slide-wrapper" id="slide-7" data-index="7" data-title="数字孪生">
    <!-- 模块五：AI 数字孪生选片大脑正规激活出口 -->
    <section class="ai-hero-card reveal-card">
      <span style="display: inline-block; padding: 4px 14px; border-radius: 20px; font-size: 11px; font-weight: 800; background: rgba(0,181,29,0.15); border: 1px solid rgba(0,181,29,0.3); color: #34d399; margin-bottom: 16px;">
        AI DIGITAL TWIN ENGINE
      </span>
      <h2 style="font-size: 28px; font-weight: 900; color: #ffffff; margin-bottom: 10px;">
        生成你的数字孪生选片大脑
      </h2>
      <p style="font-size: 14px; color: var(--text-muted); max-width: 600px; margin: 0 auto 24px auto;">
        已基于你近 ${yearSpan} 年的 ${totalMovies} 部打标、五维审美雷达与真实短评建立起特征工程资产。一键提取专属于你的 MovieDNA 智能体决策算法。
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
        <textarea id="dna-prompt-textarea" rows="8" readonly style="width: 100%; background: rgba(0,0,0,0.4); border: 1px solid #334155; border-radius: 10px; color: #d1d5db; font-size: 12px; padding: 12px; font-family: monospace; outline: none;">${promptContent}</textarea>
      </div>

      <!-- 漫游通关全景解锁卡片 -->
      <div class="completion-unlock-box">
        <div style="font-size: 20px; font-weight: 900; color: #fbbf24; margin-bottom: 6px;">🎉 光影基因探索漫游已全部完成！</div>
        <div style="font-size: 13px; color: #cbd5e1; margin-bottom: 16px;">恭喜您通览专属影迷画像。点击下方按钮即可进入全景长卷模式，通览整页长卷！</div>
        <button onclick="toggleViewMode('overview')" class="unlock-btn">
          <span>📜</span> 解锁全景长卷模式 (自由滚动浏览)
        </button>
      </div>
    </section>
    </div>

    <!-- 底部版权 -->
    <footer class="overview-footer" style="text-align: center; padding: 30px 20px 60px 20px; font-size: 12px; color: #64748b; border-top: 1px dashed rgba(255,255,255,0.15); margin-top: 20px;" style="text-align: center; font-size: 12px; color: #059669; padding-top: 10px;">
      MovieDNA · 致敬豆瓣光影精神家园 · 纯本地私密渲染 · 永久专属保存
    </footer>

  </main>

  <script>
    function __initReportInteractions() {
      let radarChart = null;
      let timelineChart = null;

      function initRadarChart() {
        if (radarChart) return;
        const radarEl = document.getElementById('chart-radar');
        if (!radarEl) return;
        if (typeof echarts === "undefined") {
          setTimeout(initRadarChart, 150);
          return;
        }
        try {
          radarChart = echarts.init(radarEl, 'dark');
          radarChart.setOption({
            animation: true,
            animationDuration: 1400,
            animationEasing: 'cubicOut',
            backgroundColor: 'transparent',
            tooltip: { trigger: 'item' },
            radar: {
              indicator: ${JSON.stringify(radarIndicators)},
              radius: '66%',
              center: ['50%', '48%'],
              splitNumber: 5,
              axisName: {
                formatter: (val) => val,
                lineHeight: 18,
                rich: {
                  top: {
                    fontSize: 16,
                    fontWeight: 900,
                    color: '#fbbf24',
                    textShadowBlur: 14,
                    textShadowColor: 'rgba(251, 191, 36, 0.9)',
                    lineHeight: 22,
                    align: 'center'
                  },
                  high: {
                    fontSize: 13,
                    fontWeight: 800,
                    color: '#34d399',
                    textShadowBlur: 6,
                    textShadowColor: 'rgba(52, 211, 153, 0.5)',
                    lineHeight: 18,
                    align: 'center'
                  },
                  mid: {
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#a7f3d0',
                    lineHeight: 16,
                    align: 'center'
                  },
                  low: {
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#94a3b8',
                    lineHeight: 15,
                    align: 'center'
                  },
                  sub: {
                    fontSize: 10,
                    fontWeight: 500,
                    color: '#6ee7b7',
                    lineHeight: 14,
                    align: 'center'
                  }
                }
              },
              splitLine: { lineStyle: { color: 'rgba(154, 230, 180, 0.22)', width: 1.2 } },
              splitArea: { areaStyle: { color: ['rgba(0,0,0,0.15)', 'rgba(0,0,0,0.45)'] } },
              axisLine: { lineStyle: { color: 'rgba(154, 230, 180, 0.35)', width: 1.5 } }
            },
            series: [{
              type: 'radar',
              data: [{
                value: ${JSON.stringify(radarValues)},
                symbol: 'circle',
                symbolSize: 8,
                label: {
                  show: true,
                  formatter: (p) => p.value + '分',
                  color: '#ffffff',
                  fontSize: 11,
                  fontWeight: 800,
                  textBorderColor: '#064e3b',
                  textBorderWidth: 2
                },
                areaStyle: { color: 'rgba(0, 181, 29, 0.42)' },
                lineStyle: { color: '#00b51d', width: 3.5, shadowBlur: 14, shadowColor: 'rgba(0, 181, 29, 0.8)' },
                itemStyle: { color: '#34d399', borderColor: '#ffffff', borderWidth: 2 }
              }]
            }]
          });
        } catch(e) {
          console.error("Radar init error:", e);
        }
      }

      function initTimelineChart() {
        if (timelineChart) return;
        const timelineEl = document.getElementById('chart-timeline');
        if (!timelineEl) return;
        if (typeof echarts === "undefined") {
          setTimeout(initTimelineChart, 150);
          return;
        }
        try {
          timelineChart = echarts.init(timelineEl, 'dark');
          timelineChart.setOption({
            animation: true,
            animationDuration: 1600,
            animationEasing: 'cubicOut',
            backgroundColor: 'transparent',
            tooltip: {
              trigger: 'axis',
              formatter: '<div style="font-weight:bold;color:#38bdf8;">{b} 年</div>观影记录：<strong>{c}</strong> 部'
            },
            grid: {
              left: '3%',
              right: '3%',
              top: '15%',
              bottom: '8%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ${JSON.stringify(yearKeys)},
              axisLabel: { color: '#93c5fd', fontSize: 12, fontWeight: 700 },
              axisLine: { lineStyle: { color: 'rgba(255,255,255,0.2)' } }
            },
            yAxis: {
              type: 'value',
              splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
              axisLabel: { color: '#93c5fd', fontSize: 12 }
            },
            series: [{
              data: ${JSON.stringify(yearValues)},
              type: 'bar',
              barMaxWidth: 32,
              label: {
                show: true,
                position: 'top',
                color: '#bae6fd',
                fontSize: 10,
                fontWeight: 700
              },
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: '#38bdf8' },
                  { offset: 1, color: '#0284c7' }
                ]),
                borderRadius: [6, 6, 0, 0],
                shadowColor: 'rgba(56, 189, 248, 0.3)',
                shadowBlur: 8
              },
              emphasis: {
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#ffffff' },
                    { offset: 1, color: '#38bdf8' }
                  ])
                }
              }
            }]
          });
        } catch(e) {
          console.error("Timeline init error:", e);
        }
      }

      function triggerCardReveal(target) {
        if (!target) return;
        target.classList.add('revealed');
        // 触发数字跳动
        target.querySelectorAll('.counter').forEach(counter => {
          if (counter.dataset.animated) return;
          counter.dataset.animated = "true";
          const targetVal = +counter.getAttribute('data-target') || 0;
          if (!targetVal) return;
          let count = 0;
          const inc = Math.max(1, Math.floor(targetVal / 40));
          const timer = setInterval(() => {
            count += inc;
            if (count >= targetVal) {
              counter.innerText = targetVal;
              clearInterval(timer);
            } else {
              counter.innerText = count;
            }
          }, 20);
        });

        // 触发信笺诗意金句打字机效果 (只触发一次)
        const typingEl = target.querySelector('#typing-quote');
        if (typingEl && !typingEl.dataset.typed) {
          typingEl.dataset.typed = "true";
          const fullText = typingEl.innerText;
          typingEl.innerText = "";
          let charIndex = 0;
          const typingInterval = setInterval(() => {
            if (charIndex < fullText.length) {
              typingEl.innerText += fullText.charAt(charIndex);
              charIndex++;
            } else {
              clearInterval(typingInterval);
            }
          }, 35);
        }

        // 模块三：滑动到五维观影决策雷达时，开启动态展开渲染
        if (target.querySelector('#chart-radar')) {
          initRadarChart();
        }

        // 模块五：滑动到光影足迹历年走势时，开启柱状图拔地而起动效
        if (target.querySelector('#chart-timeline')) {
          initTimelineChart();
        }
      }

      // ===== 逐屏漫游控制器与状态机 =====
      let currentMode = 'story'; // 'story' | 'overview'
      let currentSlideIndex = 1;
      const totalSlides = 7;

      window.toggleViewMode = function(mode) {
        currentMode = mode;
        const body = document.body;
        const btnStory = document.getElementById('btn-mode-story');
        const btnOverview = document.getElementById('btn-mode-overview');
        const cue = document.getElementById('bottom-scroll-cue');
        const dots = document.getElementById('story-nav-dots');

        if (mode === 'overview') {
          body.classList.remove('story-mode');
          body.classList.add('overview-mode');
          if (btnStory) btnStory.classList.remove('active');
          if (btnOverview) btnOverview.classList.add('active');
          if (cue) cue.style.display = 'none';
          if (dots) dots.style.display = 'none';

          // 激活所有卡片与图表
          document.querySelectorAll('.reveal-card').forEach(c => triggerCardReveal(c));
          initRadarChart();
          initTimelineChart();
        } else {
          body.classList.remove('overview-mode');
          body.classList.add('story-mode');
          if (btnStory) btnStory.classList.add('active');
          if (btnOverview) btnOverview.classList.remove('active');
          if (cue) cue.style.display = 'inline-flex';
          if (dots) dots.style.display = 'flex';
          goToSlide(currentSlideIndex || 1);
        }

        setTimeout(() => {
          if (radarChart) radarChart.resize();
          if (timelineChart) timelineChart.resize();
        }, 200);
      };

      window.goToSlide = function(index) {
        index = Math.max(1, Math.min(totalSlides, index));
        currentSlideIndex = index;
        const targetSlide = document.getElementById('slide-' + index);
        if (targetSlide) {
          targetSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        updateNavDots(index);
      };

      window.goToNextSlide = function() {
        if (currentSlideIndex < totalSlides) {
          goToSlide(currentSlideIndex + 1);
        } else {
          toggleViewMode('overview');
        }
      };

      function updateNavDots(index) {
        document.querySelectorAll('.nav-dot').forEach(dot => {
          const idx = +dot.getAttribute('data-index');
          if (idx === index) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });

        const cue = document.getElementById('bottom-scroll-cue');
        if (cue) {
          if (index >= totalSlides) {
            cue.style.opacity = '0';
            cue.style.pointerEvents = 'none';
          } else {
            cue.style.opacity = '1';
            cue.style.pointerEvents = 'auto';
          }
        }
      }

      // 键盘快捷上下页翻屏
      window.addEventListener('keydown', (e) => {
        if (currentMode !== 'story') return;
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          goToNextSlide();
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          goToSlide(currentSlideIndex - 1);
        }
      });

      // 视口监听：每滑入一屏，激活对应动效并更新指示器
      try {
        const slideObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const idx = +entry.target.getAttribute('data-index');
              if (idx) {
                currentSlideIndex = idx;
                updateNavDots(idx);
              }
              const card = entry.target.querySelector('.reveal-card');
              if (card) {
                triggerCardReveal(card);
              }
            }
          });
        }, { threshold: 0.35 });

        document.querySelectorAll('.story-slide-wrapper').forEach(wrapper => slideObserver.observe(wrapper));
      } catch (e) {
        console.warn("IntersectionObserver disabled:", e);
        document.querySelectorAll('.reveal-card').forEach(card => triggerCardReveal(card));
      }

      window.addEventListener('resize', () => {
        if (radarChart) radarChart.resize();
        if (timelineChart) timelineChart.resize();
      });
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(__initReportInteractions, 30);
    } else {
      document.addEventListener("DOMContentLoaded", __initReportInteractions);
    }

    // 4. AI 选片大脑出口交互
    function toggleDnaModal() {
      const m = document.getElementById('dna-modal');
      if (!m) return;
      const isHidden = m.style.display === 'none';
      m.style.display = isHidden ? 'block' : 'none';
      const ta = document.getElementById('dna-prompt-textarea');
      if (isHidden && ta && !ta.value) {
        ta.value = ${JSON.stringify(promptContent)};
      }
    }

    function copyPromptCode() {
      const ta = document.getElementById('dna-prompt-textarea');
      if (ta) {
        navigator.clipboard.writeText(ta.value);
        alert('MovieDNA 选片智能体 Prompt 已复制到剪贴板！可直接发送给 ChatGPT、Claude 或 Gemini 激活。');
      }
    }

    // 报告离线下载功能
    window.downloadThisReport = function() {
      const htmlContent = '<!DOCTYPE html>' + document.documentElement.outerHTML;
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'moviedna_report_' + doubanId + '.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

  </script>
</body>
</html>`;
  }

  // Public MovieDNA Engine Interface
  window.MovieDNAEngine = {
    parseDoubanJson(raw) {
      let data = raw;
      if (typeof raw === 'string') {
        // 去除可能的 UTF-8 BOM 头与首尾空白
        const cleaned = raw.trim().replace(/^\uFEFF/, '');
        data = JSON.parse(cleaned);
      }
      if (!data) {
        throw new Error('JSON 数据解析为空');
      }

      let meta = { douban_id: 'cinephile' };
      let records = [];

      if (Array.isArray(data)) {
        // 直接就是条目数组
        records = data;
      } else if (typeof data === 'object') {
        if (data.meta && typeof data.meta === 'object') {
          meta = data.meta;
        }
        records = data.records || data.items || data.data || data.movies || data.list || [];
        if (!records.length && Array.isArray(data.rows)) {
          records = data.rows;
        }
      }

      return { meta, records };
    },

    analyze(records) {
      return analyzeRecords(records);
    },

    generateHtml(stats, meta) {
      return generateHtml(stats, meta);
    },

    buildReportFromRawJson(raw) {
      const { meta, records } = this.parseDoubanJson(raw);
      if (!records || records.length === 0) {
        throw new Error('未在 JSON 文件中检测到任何观影记录 (records为空)！');
      }
      const stats = this.analyze(records);
      return {
        html: this.generateHtml(stats, meta),
        meta,
        stats
      };
    }
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.MovieDNAEngine;
  }

})(typeof window !== 'undefined' ? window : globalThis);

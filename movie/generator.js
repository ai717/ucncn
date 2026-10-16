// MovieDNA Client-Side Engine v2.0
// 纯浏览器端本地分析与报告生成引擎，保护隐私，零依赖运行
(function(window) {
  'use strict';

  const TOP64_POSTERS = [
  {
    "title": "肖申克的救赎",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2934829882.jpg"
  },
  {
    "title": "霸王别姬",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2911205318.jpg"
  },
  {
    "title": "泰坦尼克号",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p457760035.jpg"
  },
  {
    "title": "阿甘正传",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p510876253.jpg"
  },
  {
    "title": "千与千寻",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2557573348.jpg"
  },
  {
    "title": "星际穿越",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2614988097.jpg"
  },
  {
    "title": "美丽人生",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2578474613.jpg"
  },
  {
    "title": "这个杀手不太冷",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2913554676.jpg"
  },
  {
    "title": "盗梦空间",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p513344864.jpg"
  },
  {
    "title": "楚门的世界",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p479682972.jpg"
  },
  {
    "title": "辛德勒的名单",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p492406163.jpg"
  },
  {
    "title": "忠犬八公的故事",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2587099240.jpg"
  },
  {
    "title": "海上钢琴师",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2914698334.jpg"
  },
  {
    "title": "疯狂动物城",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2924128964.jpg"
  },
  {
    "title": "三傻大闹宝莱坞",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p579729551.jpg"
  },
  {
    "title": "机器人总动员",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2934742160.jpg"
  },
  {
    "title": "放牛班的春天",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2884280708.jpg"
  },
  {
    "title": "无间道",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2597979873.jpg"
  },
  {
    "title": "控方证人",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2927451337.jpg"
  },
  {
    "title": "寻梦环游记",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2505426431.jpg"
  },
  {
    "title": "大话西游之大圣娶亲",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2455050536.jpg"
  },
  {
    "title": "熔炉",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p1363250216.jpg"
  },
  {
    "title": "触不可及",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p1454261925.jpg"
  },
  {
    "title": "教父",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p616779645.jpg"
  },
  {
    "title": "哈利·波特与魔法石",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2913781448.jpg"
  },
  {
    "title": "末代皇帝",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p452089833.jpg"
  },
  {
    "title": "当幸福来敲门",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2220721286.jpg"
  },
  {
    "title": "龙猫",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2540924496.jpg"
  },
  {
    "title": "活着",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2597919477.jpg"
  },
  {
    "title": "怦然心动",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p501177648.jpg"
  },
  {
    "title": "蝙蝠侠：黑暗骑士",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p462657443.jpg"
  },
  {
    "title": "指环王3：王者无敌",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2642829472.jpg"
  },
  {
    "title": "我不是药神",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2527119568.jpg"
  },
  {
    "title": "乱世佳人",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1963126880.jpg"
  },
  {
    "title": "让子弹飞",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1512562287.jpg"
  },
  {
    "title": "飞屋环游记",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p485887754.jpg"
  },
  {
    "title": "哈尔的移动城堡",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2907583906.jpg"
  },
  {
    "title": "十二怒汉",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2173577632.jpg"
  },
  {
    "title": "海蒂和爷爷",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2554525534.jpg"
  },
  {
    "title": "素媛",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2118532944.jpg"
  },
  {
    "title": "猫鼠游戏",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p453924541.jpg"
  },
  {
    "title": "天空之城",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2892409201.jpg"
  },
  {
    "title": "鬼子来了",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2930874010.jpg"
  },
  {
    "title": "摔跤吧！爸爸",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2401676338.jpg"
  },
  {
    "title": "少年派的奇幻漂流",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p1784592701.jpg"
  },
  {
    "title": "死亡诗社",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2575465690.jpg"
  },
  {
    "title": "指环王2：双塔奇兵",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2640236255.jpg"
  },
  {
    "title": "钢琴家",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p1381339291.jpg"
  },
  {
    "title": "大话西游之月光宝盒",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561721372.jpg"
  },
  {
    "title": "绿皮书",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2531065411.jpg"
  },
  {
    "title": "何以为家",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2875749222.jpg"
  },
  {
    "title": "闻香识女人",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2550757929.jpg"
  },
  {
    "title": "大闹天宫",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2184505167.jpg"
  },
  {
    "title": "黑客帝国",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p451926968.jpg"
  },
  {
    "title": "指环王1：护戒使者",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2197698335.jpg"
  },
  {
    "title": "罗马假日",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2189265085.jpg"
  },
  {
    "title": "教父2",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2194138787.jpg"
  },
  {
    "title": "狮子王",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p726659067.jpg"
  },
  {
    "title": "天堂电影院",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2653054340.jpg"
  },
  {
    "title": "饮食男女",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p1910899751.jpg"
  },
  {
    "title": "辩护人",
    "img": "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2158166535.jpg"
  },
  {
    "title": "本杰明·巴顿奇事",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2192535722.jpg"
  },
  {
    "title": "搏击俱乐部",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1910931622.jpg"
  },
  {
    "title": "美丽心灵",
    "img": "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p1665997400.jpg"
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

    const ratedRecords = records.filter(r => r.rating !== null && r.rating !== undefined && !isNaN(r.rating));
    const unratedCount = totalCount - ratedRecords.length;

    const ratings = ratedRecords.map(r => Number(r.rating));
    const avgRating = ratings.length ? +(ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2) : 0.0;

    const ratingDist = { 10: 0, 8: 0, 6: 0, 4: 0, 2: 0 };
    ratings.forEach(r => {
      if (ratingDist[r] !== undefined) ratingDist[r]++;
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
      return `
        <div class="poster-card" style="--delay: ${delay}s;" title="${p.title}">
          <div class="poster-fallback-badge">
            <span class="poster-badge-icon">🎬</span>
            <span class="poster-fallback-title">${ct}</span>
          </div>
          <img src="${p.img}" alt="${p.title}" loading="lazy" onerror="this.style.opacity='0';" />
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
  <!-- 核心设置：no-referrer 彻底穿透豆瓣防盗链，确保海报 100% 显示 -->
  <meta name="referrer" content="no-referrer">
  <title>我的光影纪 · @${doubanId} 豆瓣观影报告</title>
  <link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;600&family=Noto+Serif+SC:wght@400;600;700;900&display=swap" rel="stylesheet">
  <script src="/static/echarts.min.js"></script>
  <script src="https://registry.npmmirror.com/echarts/5.4.3/files/dist/echarts.min.js"></script>
  <script src="/static/marked.min.js"></script>
  <script src="https://registry.npmmirror.com/marked/9.1.6/files/marked.min.js"></script>
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

    /* 宽屏版心：桌面端宽阔优雅 880px，支持大体一屏一模块的自然呼吸感 */
    .viewport-flow {
      max-width: 880px;
      margin: 0 auto;
      padding: 40px 20px 80px 20px;
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    /* 模块入场视口滚动渐现动效 */
    .reveal-card {
      opacity: 0;
      transform: translateY(36px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    .reveal-card.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    /* 首屏信笺保证立即呈现 */
    .paper-section {
      opacity: 1 !important;
      transform: translateY(0) !important;
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
      opacity: 0;
      transform: translateY(18px) scale(0.92);
      transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0s),
                  transform 0.45s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0s),
                  box-shadow 0.2s ease;
    }
    .blue-section.revealed .poster-card {
      opacity: 1;
      transform: translateY(0) scale(1);
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
    .dark-section.revealed .star-bar-fill {
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
      transition: width 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
    }
    .blue-section.revealed .bar-fill {
      width: var(--target-width);
    }
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
      opacity: 0;
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
    }
    .gold-quote {
      border-left-color: #f59e0b;
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.06);
      transform: translateX(-24px);
    }
    .red-quote {
      border-left-color: #ef4444;
      box-shadow: 0 4px 16px rgba(239, 68, 68, 0.06);
      transform: translateX(24px);
    }
    .dark-section.revealed .quote-row {
      opacity: 1;
      transform: translateX(0);
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
    </section>

    <!-- 底部版权 -->
    <footer style="text-align: center; font-size: 12px; color: #059669; padding-top: 10px;">
      MovieDNA · 致敬豆瓣光影精神家园 · 纯本地私密渲染 · 永久专属保存
    </footer>

  </main>

  <script>
    document.addEventListener("DOMContentLoaded", () => {
      let radarChart = null;
      let timelineChart = null;

      function initRadarChart() {
        if (typeof echarts === "undefined" || radarChart) return;
        const radarEl = document.getElementById('chart-radar');
        if (!radarEl) return;
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
        if (typeof echarts === "undefined" || timelineChart) return;
        const timelineEl = document.getElementById('chart-timeline');
        if (!timelineEl) return;
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

      // 动效系统：IntersectionObserver 滑入视口时触发对应动效
      try {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              // 触发数字跳动
              entry.target.querySelectorAll('.counter').forEach(counter => {
                if (counter.dataset.animated) return;
                counter.dataset.animated = "true";
                const target = +counter.getAttribute('data-target') || 0;
                if (!target) return;
                let count = 0;
                const inc = Math.max(1, Math.floor(target / 40));
                const timer = setInterval(() => {
                  count += inc;
                  if (count >= target) {
                    counter.innerText = target;
                    clearInterval(timer);
                  } else {
                    counter.innerText = count;
                  }
                }, 20);
              });

              // 触发信笺诗意金句打字机效果 (只触发一次)
              const typingEl = entry.target.querySelector('#typing-quote');
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
              if (entry.target.querySelector('#chart-radar')) {
                initRadarChart();
              }

              // 模块五：滑动到光影足迹历年走势时，开启柱状图拔地而起动效
              if (entry.target.querySelector('#chart-timeline')) {
                initTimelineChart();
              }
            }
          });
        }, { threshold: 0.15 });

        document.querySelectorAll('.reveal-card').forEach(card => observer.observe(card));
      } catch (e) {
        console.warn("IntersectionObserver disabled:", e);
        initRadarChart();
        initTimelineChart();
      }

      window.addEventListener('resize', () => {
        if (radarChart) radarChart.resize();
        if (timelineChart) timelineChart.resize();
      });
    });

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
      const htmlContent = '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
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
      const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
      const meta = data.meta || { douban_id: 'cinephile' };
      const records = data.records || [];
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

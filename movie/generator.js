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

    // 1. 时空节律分析 (Chronotype & Seasonality)
    let weekendCount = 0;
    let weekdayCount = 0;
    const seasonCounts = { spring: 0, summer: 0, autumn: 0, winter: 0 };
    const monthYearCounts = {};

    records.forEach(r => {
      if (r.mark_date) {
        const str = String(r.mark_date).trim();
        const datePart = str.split(' ')[0];
        const parts = datePart.split('-');
        if (parts.length >= 2) {
          const yr = parts[0];
          const m = parseInt(parts[1], 10);
          if (m >= 3 && m <= 5) seasonCounts.spring++;
          else if (m >= 6 && m <= 8) seasonCounts.summer++;
          else if (m >= 9 && m <= 11) seasonCounts.autumn++;
          else if (m === 12 || m === 1 || m === 2) seasonCounts.winter++;

          if (parts.length >= 3) {
            const d = new Date(parseInt(yr, 10), m - 1, parseInt(parts[2], 10));
            const day = d.getDay();
            if (day === 0 || day === 6) weekendCount++;
            else weekdayCount++;

            const ym = `${yr}-${String(m).padStart(2, '0')}`;
            monthYearCounts[ym] = (monthYearCounts[ym] || 0) + 1;
          }
        }
      }
    });

    const totalDated = weekendCount + weekdayCount || 1;
    const weekendPct = Math.round((weekendCount / totalDated) * 100);
    const weekdayPct = 100 - weekendPct;

    let chronotypeTitle = '工作日深夜解压者';
    let chronotypeDesc = `${weekdayPct}% 的作品标记于工作日夜晚。在充满压力的白昼之后，夜深人静的光影是你卸下防备、与真实自我独处的唯一庇护所。`;
    if (weekendPct >= 38) {
      chronotypeTitle = '周末沉浸式闭关家';
      chronotypeDesc = `周末标记占比高达 ${weekendPct}%。你习惯在周末切断外界喧嚣，用一整个下午或漫漫长夜享受高密度的影史探索。`;
    }

    let peakMonthYm = '';
    let peakMonthCount = 0;
    Object.entries(monthYearCounts).forEach(([ym, count]) => {
      if (count > peakMonthCount) {
        peakMonthCount = count;
        peakMonthYm = ym;
      }
    });

    const maxSeason = Object.entries(seasonCounts).sort((a, b) => b[1] - a[1])[0] || ['autumn', 0];
    const seasonNames = { spring: '春季灵感萌生期', summer: '炎夏热烈放映季', autumn: '金秋深沉反思季', winter: '冬夜孤绝壁炉派' };
    const seasonName = seasonNames[maxSeason[0]] || '金秋深沉反思季';

    // 2. 审美反骨指数 (Contrarian Index)
    const lowStarPct = +(ratingPct.score_4.pct + ratingPct.score_2.pct).toFixed(1);
    const fiveStarPct = ratingPct.score_10.pct;
    const contrarianScore = Math.min(96, Math.max(62, Math.round(62 + (lowStarPct * 1.3) + Math.max(0, (20 - fiveStarPct) * 0.7) + (Math.abs(avgRating - 7.5) * 5))));

    const watchedTitles = Array.from(new Set(records.map(r => cleanTitle(r.title).toLowerCase().trim())));

    return {
      overview: {
        total_movies: totalCount,
        rated_movies: ratedRecords.length,
        unrated_movies: unratedCount,
        average_rating: avgRating,
        five_star_rate: ratingPct.score_10.pct,
        four_star_rate: ratingPct.score_8.pct,
        three_star_rate: ratingPct.score_6.pct,
        low_star_rate: lowStarPct,
        total_comments: commentCount,
      },
      rating_distribution: ratingPct,
      year_timeline: yearTimeline,
      top_tags: topTags,
      chronotype: {
        title: chronotypeTitle,
        desc: chronotypeDesc,
        weekend_pct: weekendPct,
        weekday_pct: weekdayPct,
        season_name: seasonName,
        peak_month: peakMonthYm || `${sortedYears[sortedYears.length - 1] || '2024'}-10`,
        peak_month_count: peakMonthCount || Math.max(3, Math.round(totalCount / Math.max(1, sortedYears.length * 8)))
      },
      contrarian: {
        score: contrarianScore,
        title: contrarianScore >= 80 ? '冷眼拒斥盲从的审美孤勇者' : '清醒克制的独立审判者',
        desc: `五星神作率严控在 ${fiveStarPct}%，踩雷差评占 ${lowStarPct}%。对资本公关造神、流水线跟风和无病呻吟具有天然的审美排异反应，拒绝一切廉价感动。`
      },
      representative_samples: {
        praise_samples: fiveStarSamples,
        criticism_samples: oneStarSamples,
      },
      watched_titles: watchedTitles
    };
  }

  // 动态编译生成行业标准的专业级 Agent SKILL 规范 (带零门槛打招呼唤醒协议与四大意图引擎)
  function buildMovieDnaSkill(stats, meta, persona, radarDims, topTags, praiseSamples, criticismSamples, startYear, endYear) {
    const doubanId = meta.douban_id || 'cinephile';
    const overview = stats.overview || {};
    const ratingDist = stats.rating_distribution || {};
    const totalMovies = overview.total_movies || 0;
    const ratedMovies = overview.rated_movies || 0;
    const unratedMovies = overview.unrated_movies || 0;
    const avgRating = overview.average_rating || 0.0;
    const fiveStarPct = overview.five_star_rate || 0.0;
    const fourStarPct = overview.four_star_rate || 0.0;
    const threeStarPct = overview.three_star_rate || 0.0;
    const lowStarPct = overview.low_star_rate || 0.0;
    const commentCount = overview.total_comments || 0;

    const s10 = (ratingDist.score_10 && ratingDist.score_10.count !== undefined) ? ratingDist.score_10.count : Math.round(ratedMovies * fiveStarPct / 100);
    const s8 = (ratingDist.score_8 && ratingDist.score_8.count !== undefined) ? ratingDist.score_8.count : Math.round(ratedMovies * fourStarPct / 100);
    const s6 = (ratingDist.score_6 && ratingDist.score_6.count !== undefined) ? ratingDist.score_6.count : Math.round(ratedMovies * threeStarPct / 100);
    const sLow = ((ratingDist.score_4 ? ratingDist.score_4.count : 0) + (ratingDist.score_2 ? ratingDist.score_2.count : 0)) || Math.round(ratedMovies * lowStarPct / 100);

    const r_visual = radarDims[0].val;
    const r_logic = radarDims[1].val;
    const r_emotion = radarDims[2].val;
    const r_social = radarDims[3].val;
    const r_antifake = radarDims[4].val;

    const sortedDims = [...radarDims].sort((a, b) => b.val - a.val);
    const maxDimName = sortedDims[0].name;
    const maxDimVal = sortedDims[0].val;

    const chronotype = stats.chronotype || {
      title: '工作日深夜解压者',
      desc: '夜深人静的光影是你卸下防备、与真实自我独处的唯一庇护所。',
      weekend_pct: 35,
      weekday_pct: 65,
      season_name: '金秋深沉反思季',
      peak_month: '2024-10',
      peak_month_count: 28
    };

    const contrarian = stats.contrarian || {
      score: 78,
      title: '清醒克制的独立审判者',
      desc: `五星神作率严控在 ${fiveStarPct}%，对资本公关造神与无病呻吟具有天然的审美排异反应。`
    };

    const topTagLines = topTags.slice(0, 10).map((t, idx) => `| ${idx + 1} | **${t.tag}** | ${t.count} 部 | ${(t.count / Math.max(totalMovies, 1) * 100).toFixed(1)}% | 核心常驻题材 |`).join('\n');

    const praiseLines = (praiseSamples && praiseSamples.length > 0)
      ? praiseSamples.slice(0, 5).map(p => `- **《${p.title}》**（10分 · 五星神作）：“${p.comment}”`).join('\n')
      : '- 暂无五星长评文本，优先推荐影史顶流传世经典与大师级视听。';

    const criticLines = (criticismSamples && criticismSamples.length > 0)
      ? criticismSamples.slice(0, 5).map(c => `- **《${c.title}》**（${c.rating}分 · 避坑差评）：“${c.comment}”`).join('\n')
      : '- 暂无低分长评文本，默认严控剧作硬伤、假模假式与降智类作品。';

    const yearSpan = (parseInt(endYear, 10) - parseInt(startYear, 10) + 1) || 1;

    // 智能私享候选片单库（已自动排查去重）
    const GEM_BANK = [
      { title: '鲭鱼罐头', year: '2022', score: '8.3', genre: '剧情/治愈', cat: 'emotion', reason: '昭和乡村夏日物语，关于童年、友情与生命力最质朴的注脚。', caution: '节奏舒缓平实，需在深夜静心沉浸观看。' },
      { title: '给阿嬷的情书', year: '2007', score: '8.9', genre: '剧情/家庭', cat: 'emotion', reason: '没有任何廉价煽情，两个阿嬷跨越半个世纪的无声守候与纯粹深情。', caution: '后半程催泪极深，请备足纸巾。' },
      { title: '姥姥的外孙', year: '2024', score: '8.9', genre: '剧情/亲情', cat: 'emotion', reason: '平静克制却刀刀致命的东亚亲情解剖，孙辈视角下世间最温柔的守望。', caution: '真实得令人心酸，后劲极大。' },
      { title: '如父如子', year: '2013', score: '8.7', genre: '剧情', cat: 'emotion', reason: '是枝裕和代表作，血缘与陪伴的克制拷问，无声处听惊雷。', caution: '日式极简生活流，无大起大落戏剧冲突。' },
      { title: '彗星来的那一夜', year: '2013', score: '8.6', genre: '科幻/悬疑', cat: 'logic', reason: '极低成本下的多重宇宙分裂奇迹，密室人性博弈与薛定谔的猫。', caution: '前15分钟手持摄影略晃，进入主线后极度烧脑。' },
      { title: '无姓之人', year: '2009', score: '8.4', genre: '科幻/爱情/哲学', cat: 'logic', reason: '极致多重分支生命可能性的诗意哲学迷宫，时空交叠与蝴蝶效应。', caution: '非线性碎片化叙事，需要充足专注力。' },
      { title: '看不见的客人', year: '2016', score: '8.8', genre: '悬疑/犯罪', cat: 'logic', reason: '层层反转剥茧抽丝的逻辑智力狂欢，谎言与真相的极致对决。', caution: '全片信息密度极高，严防剧透。' },
      { title: '异次元杀阵', year: '1997', score: '8.2', genre: '悬疑/科幻/惊悚', cat: 'logic', reason: '几何密室与阶层博弈的开山鼻祖，纯粹高智商解谜与人性试金石。', caution: '带有一定惊悚血腥成分。' },
      { title: '路边野餐', year: '2015', score: '8.0', genre: '剧情/诗性', cat: 'visual', reason: '42分钟长镜头勾勒出的潮湿亚热带诗性梦境，光影与时间的折叠流动。', caution: '方言对白与诗歌跳跃叙事，偏实验艺术风格。' },
      { title: '冷战', year: '2018', score: '7.9', genre: '剧情/爱情/音乐', cat: 'visual', reason: '黑白4:3画幅下的东欧冷冽绝唱，每一帧都是摄影构图教科书。', caution: '叙事极为克制留白，跨度长达数十年。' },
      { title: '燃烧', year: '2018', score: '8.0', genre: '剧情/悬疑', cat: 'visual', reason: '李沧东镜头下的黄昏微光与阶层荒原，视听张力拉满的现代隐喻。', caution: '开放式结局，无标准凶手答案。' },
      { title: '绝美之城', year: '2013', score: '8.3', genre: '剧情', cat: 'visual', reason: '保罗·索伦蒂诺镜头下的罗马繁华与虚无，视听语言的流动盛宴。', caution: '意识流浮世绘，重在氛围而非主线。' },
      { title: '驴得水', year: '2016', score: '8.3', genre: '剧情/喜剧', cat: 'social', reason: '荒诞黑色幽默外壳下的知识分子骨气解构，笑着笑着脊背发凉。', caution: '话剧感较强，后半程人性撕裂极度压抑。' },
      { title: '狩猎', year: '2012', score: '9.1', genre: '剧情', cat: 'social', reason: '舆论霸凌与群体无意识之恶的冰冷解剖，直击人性至暗时刻。', caution: '观影过程极度憋屈愤怒，心脏承受力需强。' },
      { title: '降临', year: '2016', score: '7.9', genre: '科幻/哲学', cat: 'scifi', reason: '环形语言与非线性时空感知，知晓全貌却依然奔赴宿命的终极浪漫。', caution: '非爆米花特效大片，以语言学哲学思辨为主。' },
      { title: '千钧一发', year: '1997', score: '8.8', genre: '科幻/惊悚', cat: 'scifi', reason: '基因决定论时代的纯粹肉身抗争，永不回头的游泳哲学。', caution: '复古未来主义，节奏紧凑但气质内敛。' }
    ];

    const watchedSet = new Set((stats.watched_titles || []).map(t => String(t).toLowerCase()));
    const unwatchedGems = GEM_BANK.filter(g => !watchedSet.has(g.title.toLowerCase()));
    const finalGems = (unwatchedGems.length >= 3 ? unwatchedGems : GEM_BANK).slice(0, 3);
    const rec1 = finalGems[0];
    const rec2 = finalGems[1];
    const rec3 = finalGems[2];

    return `---
name: movie-dna-${doubanId}
description: "基于用户 @${doubanId} 跨越 ${startYear}-${endYear} 年近 ${yearSpan} 载、累计 ${totalMovies} 部真实观影大数据的个人观影基因与专属选片决策模型。沉淀其五维审美雷达、题材偏好矩阵、真实评价毒舌切片、时空节律与避坑决策算法。支持零门槛打招呼即输出全貌、新片测毒打分预测、情绪场景精准点单与第一人称毒舌影评撰写。"
agent_created: true
---

# @${doubanId} 个人专属观影基因与选片决策智能体 (MovieDNA Master Skill)

本技能基于用户 @${doubanId} 在豆瓣跨越 **${startYear} 年至 ${endYear} 年长达 ${yearSpan} 载的真实时光轨迹**、累计 **${totalMovies} 部观影记录、${ratedMovies} 部深度打分（全周期严苛均分 ${avgRating}/10 分）以及 ${commentCount} 篇真实短评真迹** 深度萃取提炼而成。

作为该用户的“专属数字孪生选片大脑”，你必须完全代入并执行该用户的审美偏好、情绪触发开关与绝对雷区红线，为用户提供极其精准的选片评估与毒辣品鉴。

---

## 〇、零门槛智能交互协议 (Zero-Shot Wakeup Contract)

**【极其重要指令 · 优先级最高】**：
当用户的首条输入或当前输入属于以下问候、测试或初始打招呼时：
\`hello\` / \`hi\` / \`你好\` / \`在吗\` / \`启动\` / \`你是谁\` / \`开始\` / \`help\` / \`菜单\` / 空白问候：

**严禁**回复“你好！我是您的选片助手，请问有什么可以帮您”这类千篇一律的机械废话！
**必须立即且自主**直接输出以下精雕细琢的【专属光影指纹速览简报】与【今日私享特调灵感】：

\`\`\`markdown
### 🎬 专属影迷数字孪生已就绪 · @${doubanId}
> “${persona.volumeDesc}”

| 核心维度 | 沉淀数据 / 审美定势 |
| :--- | :--- |
| **观影人格** | **${persona.personaTitle}**（${persona.ratingDesc}） |
| **修行跨度** | **${startYear} - ${endYear}**（历经 ${yearSpan} 载光影淘洗） |
| **数据资产** | 累计阅片 **${totalMovies}** 部（严谨评分 **${ratedMovies}** 部 · 沉淀短评 **${commentCount}** 篇） |
| **审美天平** | 真实均分 **${avgRating} / 10** · 五星神作率 **${fiveStarPct}%** · 踩雷痛批率 **${lowStarPct}%** |
| **时空节律** | **${chronotype.title}**（${chronotype.weekend_pct}% 周末 / ${chronotype.weekday_pct}% 工作日 · ${chronotype.season_name}） |
| **审美反骨** | **${contrarian.score}% 独立思考指数**（${contrarian.title}） |
| **核心偏好** | ${topTags.slice(0, 5).map(t => `**${t.tag}**`).join(' · ')} |

#### ⚡ 你的灵魂软肋 vs 绝对雷区红线：
- **🎯 灵魂软肋（一触即中）**：对【${maxDimName}】(${maxDimVal}分)有着极深共鸣，钟情扎实的人物弧光、克制的人性表达与高级视听电影感。
- **🚫 绝对雷区（一票否决）**：中产浮夸悬浮、伪文艺口嗨、逻辑降智漏洞、资本强推面瘫流量、恶俗小品段子，遇之必给低分痛斥！

#### 🍿 今日私享特调灵感 · 3部命中靶心的冷门私藏：
*(已通过你的全量观影库去重，严选你尚未标记的冷门高质感之作)*
1. **《${rec1.title}》** (${rec1.year} · 豆瓣 ${rec1.score}分 · ${rec1.genre})
   - **专属理由**：${rec1.reason}
   - **避坑提示**：${rec1.caution}
2. **《${rec2.title}》** (${rec2.year} · 豆瓣 ${rec2.score}分 · ${rec2.genre})
   - **专属理由**：${rec2.reason}
   - **避坑提示**：${rec2.caution}
3. **《${rec3.title}》** (${rec3.year} · 豆瓣 ${rec3.score}分 · ${rec3.genre})
   - **专属理由**：${rec3.reason}
   - **避坑提示**：${rec3.caution}

---
🧭 **你随时可以对我下达以下指令（支持直接输入编号或自然语言）：**
- **【1】新片测毒与评分预测**：发送 \`1 [电影名]\` 或 \`帮我看看《XX》我能给几分\`，我将以你的严苛天平预测得分并排查毒点。
- **【2】情绪/场景私人点单**：发送 \`2 [你的心境/场景]\`（如：深夜失眠、极度郁闷想看爽片、高智商反转），为你定制专属片单。
- **【3】第一人称毒辣短评**：发送 \`3 [电影名]\`，我将化身你的分身，以你的真实笔风写出辛辣过瘾的影评。
- **【4】同好口味契合度诊断**：发送 \`4 [TA推荐的片单/TA的口味]\`，我来诊断你们的审美交集与分歧。
\`\`\`

---

## 一、用户画像与审美底色 (Aesthetic Profile)

| 核心维度 | 画像属性 / 审美特征 |
| :--- | :--- |
| **影迷标识** | 豆瓣影迷 **@${doubanId}** |
| **观影人格** | **${persona.personaTitle}**（${persona.ratingDesc}） |
| **阅片体量与周期** | 累计 **${totalMovies} 部**作品（有效评分 ${ratedMovies} 部，纯标记/短评 ${unratedMovies} 部），历时 **${startYear}-${endYear}** 年。 |
| **审美天平定势** | **殿堂率 ${fiveStarPct}%，均分 ${avgRating} 分**。不轻易加冕五星，拒绝通胀与跟风捧杀；但面对真正震撼灵魂之作绝不吝啬赞美。 |
| **时空生活流** | **${chronotype.title}**：${chronotype.desc} |
| **审美反骨偏执** | **${contrarian.score}% 独立指数**：${contrarian.desc} |
| **核心偏好关键词** | ${topTags.slice(0, 6).map(t => t.tag).join(' · ')} |

---

## 二、全量数据量化全景图 (Data Landscape)

### 1. 评分严苛度分值金字塔 (${ratedMovies} 部有效评分)
- **10 分（★★★★★ 殿堂神作）**：**${s10} 部 (${fiveStarPct}%)** —— 真正击中灵魂、视听封神或情感至纯的极少数殿堂之作。
- **8 分（★★★★☆ 诚意佳作）**：**${s8} 部 (${fourStarPct}%)** —— 观影主力军，品质过硬、剧本扎实、演职在线的高完成度作品。
- **6 分（★★★☆☆ 平庸消遣）**：**${s6} 部 (${threeStarPct}%)** —— 合格工业流水线或爆米花消遣，尚能一看但缺乏回味与深度。
- **2~4 分（★☆☆☆☆ 踩雷痛批）**：**${sLow} 部 (${lowStarPct}%)** —— 剧本硬伤、逻辑崩溃、伪文艺装逼或侮辱智商的恶俗作品。

### 2. 核心题材常驻矩阵 (Top Genres)
| 排名 | 题材维度 | 累计阅片 | 占总体量 | 审美象限 |
| :---: | :--- | :---: | :---: | :--- |
${topTagLines}

---

## 三、五维审美雷达与偏好强度 (Aesthetic Radar)

\`\`\`mermaid
radar
  axis 镜头美学, 叙事智性, 质朴深情, 社会隐喻, 反装逼雷达
  "审美强度分值" : [${r_visual}, ${r_logic}, ${r_emotion}, ${r_social}, ${r_antifake}]
\`\`\`

1. **镜头美学 (权重: ${r_visual} / 100)**：极其注重视听语言、构图、光影层次与电影感，厌恶电视剧廉价质感与 PPT 式机位。
2. **叙事智性 (权重: ${r_logic} / 100)**：钟爱剧作扎实、逻辑严密、多线反转或高概念闭环，严禁情节降智与把观众当傻子。
3. **质朴深情 (权重: ${r_emotion} / 100)**：对真挚动人的人间温情、克制深沉的羁绊与生命力共鸣极深，但高度警惕廉价催泪与工业糖精。
4. **社会隐喻 (权重: ${r_social} / 100)**：偏好具有历史厚度、时代关照、人性幽微剖析与现实批判锋芒的作品。
5. **反装逼雷达 (权重: ${r_antifake} / 100)**：【一票否决项】对装腔作势、假大空哲学口嗨、刻意无病呻吟的悬浮伪文艺片保持零容忍。

---

## 四、真实品味切片 (Authentic Critics Wall)

### 1. 殿堂级真爱切片 (代表其五星最高赞誉靶心)
${praiseLines}

### 2. 绝对雷区痛批切片 (代表其踩雷痛骂与避坑底线)
${criticLines}

---

## 五、四大专精任务执行规范 (Four Execution Engines)

在为该用户评估影片、预测评分或推荐片单时，**必须执行以下决策管线**：

### 引擎 1：新片测毒与评分精准预测 (Rating Predictor)
- **触发情境**：用户提及某部未标记作品、正在热映影片，或发送 \`1 [片名]\`。
- **基准锚点**：以用户的全量真实均分 **${avgRating} 分**为基准起评分（严禁套用豆瓣大众分！）。
- **动态量化测算**：
  - 核心题材命中【${topTags.slice(0, 3).map(t => t.tag).join('/')}】且剧作过硬：\`+1.0 ~ +1.5\`；
  - 镜头光影构图具有大师级审美质感、视听语言纯粹：\`+1.0\`；
  - 逻辑严密、多重反转或高概念闭环：\`+1.0\`；
  - 情感真挚克制、人物弧光扎实无工业狗血：\`+1.0\`；
  - 触发中产悬浮、伪文艺装逼、口嗨无病呻吟：\`-2.5 ~ -3.5\`；
  - 剧情漏洞百出、流量面瘫资本强捧：\`-3.0 ~ -4.0\`。
- **固定输出格式**：
  1. 🎯 **【综合预测得分】**：精确到小数点后一位（如：\`7.8 / 10 分 (★★★★☆ 4星佳作)\`）；
  2. ✨ **【击中你的亮点】**：明确指出最对胃口的 2 个维度；
  3. ⚠️ **【潜在劝退毒点】**：明确指出可能导致烦躁甚至扣分的瑕疵；
  4. 🎟️ **【观影场景建议】**：【进影院大银幕】/【深夜独居流媒体】/【倍速下饭】/【坚决避坑】。

### 引擎 2：情绪与场景私人点单选片 (Contextual Matchmaker)
- **触发情境**：用户提供当下心境（失眠、郁闷、想哭、烧脑、下饭），或发送 \`2 [场景]\`。
- **选片原则**：
  - 严格根据其五维雷达最高项（【${maxDimName}】）进行加权过滤；
  - 严禁推荐烂大街商业流水线爆米花或悬浮短剧；
  - 单次精选 2~3 部，每部必须附带 1 句“为什么击中你当下心境”的专属解析。

### 引擎 3：用户第一人称毒辣影评撰写 (First-Person Reviewer)
- **触发情境**：用户要求写影评、锐评某部电影，或发送 \`3 [片名]\`。
- **行文与人格规范**：
  - 完全吸收该用户在真实短评中的语言习惯：文字洗练、切中肯綮、爱憎分明、杜绝官腔套话；
  - 遇到好片毫不掩饰震撼，遇到烂片下笔如刀、绝不留情；
  - 字数控制在 150~300 字，文末附带该用户的拟真星级打分。

### 引擎 4：同好审美契合度把脉 (Taste Compatibility)
- **触发情境**：用户提及朋友/相亲对象/伴侣推荐的电影或对方的喜好，或发送 \`4 [片单]\`。
- **诊断逻辑**：
  - 扫描对方片单中是否踩中该用户的死穴（伪文艺、悬浮、降智）；
  - 输出【审美契合指数（百分比）】+【双方唯一的共同精神绿洲】+【可能吵架的审美雷区】。
`;
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

    const chronotype = stats.chronotype || {
      title: '工作日深夜解压者',
      desc: '夜深人静的光影是你卸下防备、与真实自我独处的唯一庇护所。',
      weekend_pct: 35,
      weekday_pct: 65,
      season_name: '金秋深沉反思季',
      peak_month: `${endYear}-10`,
      peak_month_count: 28
    };

    const contrarian = stats.contrarian || {
      score: 78,
      title: '清醒克制的独立审判者',
      desc: `五星神作率严控在 ${fiveStarPct}%，对资本公关造神与无病呻吟具有天然的审美排异反应。`
    };

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
    const maxDimName = sortedDims[0].name;
    const maxDimVal = sortedDims[0].val;

    const radarRankHtml = sortedDims.map(d => `
      <div class="radar-rank-badge ${d.val === maxRVal ? 'top-badge' : ''}">
        <div class="radar-rank-label">
          ${d.val === maxRVal ? '👑 ' : ''}${d.name}
        </div>
        <div class="radar-rank-val">${d.val} 分</div>
      </div>`).join('');

    // 专属同频寻友卡候选冷门真金库（去重后挑选 3 部）
    const GEM_BANK_CARDS = [
      { title: '野草莓', desc: '伯格曼关于时间与救赎的梦境巅峰' },
      { title: '乡愁', desc: '塔可夫斯基极致的诗意长镜头与灵魂烛火' },
      { title: '蜂巢幽灵', desc: '孩童纯真双眸中的时代暗影' },
      { title: '红白蓝三部曲之蓝', desc: '基耶斯洛夫斯基对自由与悲伤的解剖' },
      { title: '无人知晓', desc: '是枝裕和最克制温柔的现实主义丰碑' },
      { title: '爱在黎明破晓前', desc: '关于漫谈与精神交汇的永恒浪漫' },
      { title: '阳光普照', desc: '在灼热阳光的阴影里孤独喘息' },
      { title: '燃烧', desc: '不可名状的时代虚无与阶级隐喻' }
    ];
    const watchedTitleSet = new Set((stats.watched_titles || []).map(t => String(t).toLowerCase().trim()));
    const unmarkCards = GEM_BANK_CARDS.filter(g => !watchedTitleSet.has(g.title.toLowerCase().trim())).slice(0, 3);
    const selectedGems = unmarkCards.length >= 3 ? unmarkCards : GEM_BANK_CARDS.slice(0, 3);
    const gemCardHtml = selectedGems.map(g => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 6px 0; border-bottom: 1px dashed rgba(255,255,255,0.08); font-size: 11.5px;">
        <span style="font-weight: 800; color: #fbbf24;">《${g.title}》</span>
        <span style="color: #94a3b8; font-size: 10.5px;">${g.desc}</span>
      </div>
    `).join('');

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
      const delay = +(((idx % 8) + Math.floor(idx / 8)) * 0.045).toFixed(3);
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

    const promptContent = (meta.dna_prompt && meta.dna_prompt.startsWith('---')) 
      ? meta.dna_prompt 
      : buildMovieDnaSkill(stats, meta, persona, radarDims, topTags, praiseSamples, criticismSamples, startYear, endYear);

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

    /* 逐屏漫游：一整屏全景画布，彻底消除卡片断层与黑缝隙 */
    body.story-mode {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
      margin: 0;
      padding: 0;
      position: fixed;
      top: 0;
      left: 0;
    }

    body.story-mode .viewport-flow {
      width: 100vw;
      height: 100vh;
      margin: 0;
      padding: 0;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      transition: transform 0.95s cubic-bezier(0.22, 1, 0.36, 1);
      will-change: transform;
    }

    body.story-mode .story-slide-wrapper {
      width: 100vw;
      height: 100vh;
      min-height: 100vh;
      max-height: 100vh;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 68px 24px 62px 24px;
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
    }

    /* 专属各章节主题光影氛围（满屏柔和极光呼吸，消除硬边） */
    #slide-1 {
      background: radial-gradient(circle at 50% 32%, rgba(16, 185, 129, 0.16) 0%, rgba(9, 21, 16, 0.98) 75%);
    }
    #slide-2 {
      background: radial-gradient(circle at 50% 32%, rgba(14, 165, 233, 0.16) 0%, rgba(8, 18, 30, 0.98) 75%);
    }
    #slide-3 {
      background: radial-gradient(circle at 50% 32%, rgba(52, 211, 153, 0.16) 0%, rgba(9, 21, 16, 0.98) 75%);
    }
    #slide-4 {
      background: radial-gradient(circle at 50% 32%, rgba(245, 158, 11, 0.16) 0%, rgba(20, 15, 8, 0.98) 75%);
    }
    #slide-5 {
      background: radial-gradient(circle at 50% 32%, rgba(56, 189, 248, 0.16) 0%, rgba(8, 18, 28, 0.98) 75%);
    }
    #slide-6 {
      background: radial-gradient(circle at 50% 32%, rgba(245, 158, 11, 0.13) 0%, rgba(17, 12, 18, 0.98) 75%);
    }
    #slide-7 {
      background: radial-gradient(circle at 50% 32%, rgba(16, 185, 129, 0.22) 0%, rgba(6, 16, 12, 0.98) 75%);
    }

    body.story-mode .story-slide-wrapper > section {
      width: 100%;
      max-width: 900px;
      max-height: calc(100vh - 128px);
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(16, 185, 129, 0.35) transparent;
      margin: 0 auto;
      border-radius: 26px;
    }

    /* 全景长卷模式 (Overview Mode) —— 连贯画卷，光影过渡，杜绝生硬切割 */
    body.overview-mode {
      height: auto !important;
      overflow-y: auto !important;
      position: static !important;
    }

    body.overview-mode .viewport-flow {
      position: static !important;
      transform: none !important;
      max-width: 900px;
      margin: 0 auto;
      padding: 85px 20px 80px 20px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    body.overview-mode .story-slide-wrapper {
      width: 100% !important;
      height: auto !important;
      min-height: auto !important;
      max-height: none !important;
      padding: 0 !important;
      background: none !important;
      display: block !important;
    }

    body.overview-mode .story-slide-wrapper > section {
      max-height: none !important;
      overflow: visible !important;
    }

    /* 长卷模式模块间高级微光胶片分割条 */
    body.overview-mode .story-slide-wrapper:not(:last-child)::after {
      content: "";
      display: block;
      width: 180px;
      height: 2px;
      margin: 32px auto 0 auto;
      background: linear-gradient(90deg, transparent, rgba(52, 211, 153, 0.35), transparent);
    }

    body.overview-mode #bottom-scroll-cue,
    body.overview-mode #story-nav-dots {
      display: none !important;
    }

    body.story-mode .overview-footer {
      display: none !important;
    }
    body.overview-mode .overview-footer {
      display: block !important;
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

    /* 底部翻页控制器与当前页码指示 */
    .bottom-scroll-cue {
      position: fixed;
      bottom: 18px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 80;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 8px 22px;
      border-radius: 24px;
      background: rgba(11, 21, 16, 0.9);
      border: 1px solid rgba(52, 211, 153, 0.4);
      color: #a7f3d0;
      font-size: 12px;
      font-weight: 800;
      backdrop-filter: blur(16px);
      cursor: pointer;
      box-shadow: 0 6px 20px rgba(0,0,0,0.5), 0 0 20px rgba(16, 185, 129, 0.2);
      transition: all 0.25s ease;
      user-select: none;
    }
    .bottom-scroll-cue:hover {
      background: rgba(16, 185, 129, 0.2);
      border-color: #34d399;
      transform: translateX(-50%) translateY(-2px);
      box-shadow: 0 10px 25px rgba(0,0,0,0.6), 0 0 25px rgba(52, 211, 153, 0.35);
    }

    /* 全模块在逐屏漫游模式下拥有典雅平缓的入场动效；在全景长卷下直接全显 */
    body.story-mode .reveal-card {
      opacity: 0.18;
      transform: translateY(28px) scale(0.985);
      transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }
    body.story-mode .reveal-card.revealed {
      opacity: 1;
      transform: translateY(0) scale(1);
      transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.22s, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) 0.22s;
    }
    body.overview-mode .reveal-card {
      opacity: 1 !important;
      transform: none !important;
      position: relative;
    }
    .paper-section {
      position: relative;
    }

    /* 模块 1：深邃墨绿 & 典藏黄金私信殿堂 (纯正电影暗夜质感，杜绝白卡片割裂) */
    .paper-section {
      background: linear-gradient(145deg, rgba(16, 36, 26, 0.88) 0%, rgba(8, 20, 15, 0.96) 100%);
      color: var(--text-light);
      border: 1px solid rgba(52, 211, 153, 0.25);
      border-radius: 28px;
      padding: 40px 38px 34px 38px;
      box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.65), 0 0 30px rgba(0, 181, 29, 0.12);
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(20px);
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
    .user-main { font-size: 28px; font-weight: 900; color: #f8fafc; letter-spacing: -0.5px; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
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
      background: rgba(11, 26, 19, 0.78);
      border: 1px solid rgba(52, 211, 153, 0.25);
      border-radius: 20px;
      padding: 22px 20px 18px 20px;
      box-shadow: 0 8px 24px -6px rgba(0, 0, 0, 0.45);
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
      font-size: 13px;
      font-weight: 800;
      color: #e2e8f0;
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
      font-size: 42px;
      font-weight: 950;
      color: #34d399;
      line-height: 1;
      letter-spacing: -1.2px;
      font-feature-settings: "tnum";
      text-shadow: 0 0 15px rgba(52, 211, 153, 0.35);
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
      background: rgba(7, 18, 13, 0.82);
      border: 1px solid rgba(52, 211, 153, 0.2);
      border-radius: 18px;
      padding: 28px 24px;
      margin-bottom: 20px;
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
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
      font-size: 16px;
      font-weight: 700;
      color: #a7f3d0;
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
      font-size: 14.5px;
      line-height: 2.1;
      color: #cbd5e1;
      text-align: justify;
      position: relative;
      padding-left: 18px;
      border-left: 2px solid rgba(52, 211, 153, 0.4);
    }
    .letter-paragraph strong {
      color: #a7f3d0;
      font-weight: 700;
      background: rgba(16, 185, 129, 0.18);
      padding: 1px 4px;
      border-radius: 4px;
    }
    .letter-footer-quote {
      margin-top: 10px;
      padding: 14px 18px;
      background: rgba(6, 78, 59, 0.25);
      border-radius: 12px;
      border: 1px solid rgba(52, 211, 153, 0.25);
      font-size: 13.5px;
      line-height: 1.9;
      color: #6ee7b7;
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

    /* 模块 2：深邃午夜蓝宝石 · 殿堂级海报阵列 */
    .blue-section {
      background: linear-gradient(145deg, rgba(10, 30, 48, 0.88) 0%, rgba(6, 18, 30, 0.96) 100%);
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 28px;
      padding: 36px 34px;
      box-shadow: 0 20px 50px -10px rgba(0, 0, 0, 0.65), 0 0 30px rgba(14, 165, 233, 0.12);
      backdrop-filter: blur(20px);
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
      opacity: 0.15;
      transform: scale(0.9) translateY(12px);
      transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--delay, 0s) + 0.28s),
                  transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) calc(var(--delay, 0s) + 0.28s),
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
      transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
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
    .dark-section.revealed .star-bar-row:nth-child(1) .star-bar-fill { transition-delay: 0.38s; }
    .dark-section.revealed .star-bar-row:nth-child(2) .star-bar-fill { transition-delay: 0.56s; }
    .dark-section.revealed .star-bar-row:nth-child(3) .star-bar-fill { transition-delay: 0.74s; }
    .dark-section.revealed .star-bar-row:nth-child(4) .star-bar-fill { transition-delay: 0.92s; }
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
      transition: width 1.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .blue-section.revealed .bar-fill,
    .reveal-card.revealed .bar-fill {
      width: var(--target-width);
    }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(1) .bar-fill { transition-delay: 0.35s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(2) .bar-fill { transition-delay: 0.43s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(3) .bar-fill { transition-delay: 0.51s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(4) .bar-fill { transition-delay: 0.59s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(5) .bar-fill { transition-delay: 0.67s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(6) .bar-fill { transition-delay: 0.75s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(7) .bar-fill { transition-delay: 0.83s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(8) .bar-fill { transition-delay: 0.91s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(9) .bar-fill { transition-delay: 0.99s; }
    .blue-section.revealed .genre-bars-grid .bar-row:nth-child(10) .bar-fill { transition-delay: 1.07s; }
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
    body.story-mode .quote-row {
      background: rgba(10, 20, 14, 0.65);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 16px 18px;
      margin-bottom: 14px;
      border-left: 4px solid #00b51d;
      opacity: 0.15;
      transform: translateX(18px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease;
    }
    body.overview-mode .quote-row {
      background: rgba(10, 20, 14, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 16px;
      padding: 16px 18px;
      margin-bottom: 14px;
      border-left: 4px solid #00b51d;
      opacity: 1 !important;
      transform: none !important;
    }
    .gold-quote {
      border-left-color: #f59e0b;
      box-shadow: 0 4px 16px rgba(245, 158, 11, 0.06);
    }
    .red-quote {
      border-left-color: #ef4444;
      box-shadow: 0 4px 16px rgba(239, 68, 68, 0.06);
    }
    .dark-section.revealed .quote-row {
      opacity: 1;
      transform: translateX(0);
    }
    .dark-section.revealed .gold-quote:nth-child(2) { transition-delay: 0.35s; }
    .dark-section.revealed .gold-quote:nth-child(3) { transition-delay: 0.52s; }
    .dark-section.revealed .gold-quote:nth-child(4) { transition-delay: 0.69s; }
    .dark-section.revealed .red-quote:nth-child(2) { transition-delay: 0.42s; }
    .dark-section.revealed .red-quote:nth-child(3) { transition-delay: 0.59s; }
    .dark-section.revealed .red-quote:nth-child(4) { transition-delay: 0.76s; }
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
    <!-- 模块一：典藏墨绿 · 个人光影档案 (自适应人格文案) -->
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

      <div style="text-align: right; font-size: 12px; color: #34d399; font-weight: 800; margin-top: 10px;">
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
      <div id="chart-timeline" style="height: 270px; width: 100%; margin-top: 10px;"></div>

      <!-- 时空节律与生活流分析卡片 -->
      <div class="chronotype-card" style="margin-top: 20px; padding: 18px 22px; background: rgba(15, 23, 42, 0.55); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 20px; backdrop-filter: blur(10px);">
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 10px; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 8px;">
          <div style="font-size: 13px; font-weight: 800; color: #bae6fd; display: flex; align-items: center; gap: 6px;">
            <span>⏳</span> 时空节律 · 观影生活流与情绪周期
          </div>
          <div style="font-size: 11px; color: #94a3b8;">基于 ${totalMovies} 部历史标记时间戳推演</div>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 12px;">
          <div style="background: rgba(8, 18, 30, 0.6); padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(56, 189, 248, 0.2);">
            <div style="font-size: 11px; color: #94a3b8;">生活节奏偏好</div>
            <div style="font-size: 14px; font-weight: 800; color: #38bdf8; margin-top: 2px;">${chronotype.title}</div>
            <div style="font-size: 11px; color: #cbd5e1; margin-top: 2px;">周末 ${chronotype.weekend_pct}% · 工作日 ${chronotype.weekday_pct}%</div>
          </div>
          <div style="background: rgba(8, 18, 30, 0.6); padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(245, 158, 11, 0.2);">
            <div style="font-size: 11px; color: #94a3b8;">情绪季相规律</div>
            <div style="font-size: 14px; font-weight: 800; color: #fbbf24; margin-top: 2px;">${chronotype.season_name}</div>
            <div style="font-size: 11px; color: #cbd5e1; margin-top: 2px;">长夜漫漫更易与光影沉浸共鸣</div>
          </div>
          <div style="background: rgba(8, 18, 30, 0.6); padding: 10px 14px; border-radius: 12px; border: 1px solid rgba(52, 211, 153, 0.2);">
            <div style="font-size: 11px; color: #94a3b8;">光影狂热峰值月</div>
            <div style="font-size: 14px; font-weight: 800; color: #34d399; margin-top: 2px;">${chronotype.peak_month}</div>
            <div style="font-size: 11px; color: #cbd5e1; margin-top: 2px;">创下单月标记 ${chronotype.peak_month_count} 部记录</div>
          </div>
        </div>
        <div style="font-size: 12.5px; line-height: 1.6; color: #cbd5e1; font-style: italic; border-left: 2px solid #38bdf8; padding-left: 10px;">
          “${chronotype.desc}”
        </div>
      </div>
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
        <div style="font-size: 13px; color: #fbbf24; font-weight: 700;">
          审美反骨指数 · 拒斥跟风虚伪
        </div>
      </div>

      <!-- 审美反骨指数徽章卡片 -->
      <div class="contrarian-banner" style="margin-bottom: 22px; padding: 16px 20px; background: rgba(24, 16, 12, 0.65); border: 1.5px solid rgba(245, 158, 11, 0.35); border-radius: 18px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="width: 52px; height: 52px; border-radius: 16px; background: linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(239,68,68,0.2) 100%); border: 1.5px solid #fbbf24; display: flex; flex-direction: column; align-items: center; justify-content: center; flex-shrink: 0;">
            <span style="font-size: 18px; font-weight: 900; color: #fbbf24; line-height: 1;">${contrarian.score}</span>
            <span style="font-size: 9px; font-weight: 800; color: #f59e0b; text-transform: uppercase;">INDEX</span>
          </div>
          <div>
            <div style="font-size: 15px; font-weight: 900; color: #ffffff; display: flex; align-items: center; gap: 6px;">
              <span>👑 审美反骨度 ${contrarian.score}% · ${contrarian.title}</span>
            </div>
            <div style="font-size: 12px; color: #cbd5e1; margin-top: 3px; line-height: 1.5;">
              ${contrarian.desc}
            </div>
          </div>
        </div>
        <div style="display: flex; gap: 6px; flex-wrap: wrap;">
          <span style="font-size: 11px; padding: 4px 10px; border-radius: 8px; background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.35); font-weight: 800;">#拒绝跟风捧杀</span>
          <span style="font-size: 11px; padding: 4px 10px; border-radius: 8px; background: rgba(239,68,68,0.15); color: #f87171; border: 1px solid rgba(239,68,68,0.35); font-weight: 800;">#戳破虚伪泡沫</span>
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

      <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap;">
        <button class="ai-btn-primary" onclick="toggleDnaModal()">
          <span>🧠 立即激活专属 MovieDNA 选片智能体</span>
        </button>
        <button onclick="toggleMatchCardModal()" style="padding: 14px 26px; background: linear-gradient(135deg, rgba(245,158,11,0.2) 0%, rgba(217,119,6,0.3) 100%); border: 1.5px solid rgba(245,158,11,0.55); border-radius: 14px; color: #fde68a; font-size: 14px; font-weight: 800; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; box-shadow: 0 4px 18px rgba(245,158,11,0.25); transition: all 0.25s ease;">
          <span>📱 预览「同频寻友卡」(9:16)</span>
        </button>
      </div>

      <!-- 隐藏的 Prompt / SKILL 展开容器 -->
      <div id="dna-modal" style="display: none; margin-top: 24px; text-align: left; background: rgba(8, 20, 15, 0.95); border: 1.5px solid rgba(52, 211, 153, 0.4); border-radius: 22px; padding: 24px; box-shadow: 0 15px 40px rgba(0,0,0,0.6);">
        <!-- 零门槛打招呼即时唤醒横幅 -->
        <div style="background: rgba(16, 185, 129, 0.12); border: 1px dashed rgba(52, 211, 153, 0.45); border-radius: 14px; padding: 12px 16px; margin-bottom: 16px; font-size: 12.5px; color: #a7f3d0; line-height: 1.6;">
          <div style="font-weight: 900; color: #34d399; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">
            <span>⚡ 零门槛打招呼即时唤醒 (Zero-Shot Wakeup)：</span>
          </div>
          无需输入任何繁杂命令。复制或上传给任意 AI（ChatGPT、Claude、DeepSeek、Antigravity 等）后，发送一句 <code style="background: rgba(0,0,0,0.45); padding: 2px 7px; border-radius: 4px; color: #fbbf24; font-weight: 800;">你好</code> / <code style="background: rgba(0,0,0,0.45); padding: 2px 7px; border-radius: 4px; color: #fbbf24; font-weight: 800;">hello</code> / <code style="background: rgba(0,0,0,0.45); padding: 2px 7px; border-radius: 4px; color: #fbbf24; font-weight: 800;">启动</code>，智能体便会自动出具全景影迷指纹速览简报、呈送今日 3 部未标记冷门真金推荐，并激活四大专精服务菜单！
        </div>

        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 14px;">
          <div>
            <div style="font-size: 14px; font-weight: 800; color: #34d399; display: flex; align-items: center; gap: 6px;">
              <span>🧬</span> 专属选片智能体 SKILL 资产 (通用 Agent 契约标准)
            </div>
            <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">
              包含 YAML 元数据、零门槛交互协议、五维偏好函数与四大专精任务规范
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button onclick="copyPromptCode()" style="padding: 7px 16px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border: none; border-radius: 10px; color: #022c22; font-size: 12px; font-weight: 900; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
              <span>📋</span> 复制 SKILL 全文
            </button>
            <button onclick="downloadSkillFile()" style="padding: 7px 16px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2); border-radius: 10px; color: #cbd5e1; font-size: 12px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 5px;">
              <span>💾</span> 导出 .skill.md
            </button>
          </div>
        </div>
        <textarea id="dna-prompt-textarea" rows="12" readonly style="width: 100%; background: rgba(0,0,0,0.5); border: 1px solid rgba(52, 211, 153, 0.25); border-radius: 12px; color: #e2e8f0; font-size: 12px; line-height: 1.6; padding: 14px; font-family: 'Fira Code', Consolas, monospace; outline: none; resize: vertical;">${promptContent}</textarea>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 11px; color: #64748b;">
          <span>💡 兼容 ChatGPT / Claude / DeepSeek / Antigravity / Cursor / Dify 等主流平台</span>
          <span>按标准 Agent SKILL 规范构建</span>
        </div>
      </div>
    </section>
    </div>

    <!-- 底部版权 -->
    <footer class="overview-footer" style="text-align: center; padding: 30px 20px 60px 20px; font-size: 12px; color: #64748b; border-top: 1px dashed rgba(255,255,255,0.15); margin-top: 20px;">
      MovieDNA · 致敬豆瓣光影精神家园 · 纯本地私密渲染 · 永久专属保存
    </footer>

  </main>

  <!-- 9:16 同频寻友社交卡弹窗 (MovieDNA Match Card) -->
  <div id="match-card-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.85); backdrop-filter: blur(14px); z-index: 99999; justify-content: center; align-items: center; padding: 16px; box-sizing: border-box; overflow-y: auto;">
    <div style="position: relative; max-width: 360px; width: 100%; margin: auto;">
      <!-- 关闭按钮 -->
      <button onclick="toggleMatchCardModal()" style="position: absolute; top: -14px; right: -10px; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.3); color: #ffffff; border-radius: 50%; width: 34px; height: 34px; font-size: 15px; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; box-shadow: 0 4px 12px rgba(0,0,0,0.5);">✕</button>

      <!-- 卡片主体 (9:16 比例设计) -->
      <div id="match-card-body" style="background: linear-gradient(165deg, #0e1713 0%, #060b08 55%, #181c15 100%); border: 1.8px solid rgba(245, 158, 11, 0.45); border-radius: 24px; padding: 26px 22px 22px 22px; box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(16, 185, 129, 0.15); color: #e2e8f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        
        <!-- 卡片头部标牌 -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 900; letter-spacing: 2px; color: #34d399; text-transform: uppercase;">
            MOVIEDNA · CINEPHILE CARD
          </div>
          <div style="font-size: 10px; color: #fbbf24; font-weight: 800; border: 1px solid rgba(245,158,11,0.4); padding: 1px 7px; border-radius: 6px;">
            # ${doubanId}
          </div>
        </div>

        <!-- 用户名与总览 -->
        <div style="text-align: center; margin-bottom: 18px;">
          <div style="font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: 0.5px;">${persona.title}</div>
          <div style="font-size: 12px; color: #94a3b8; margin-top: 4px;">
            ${yearSpan} 年光影纪元 · 见证 ${totalMovies} 部传世光影
          </div>
        </div>

        <!-- 核心审美标签网格 -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px;">
          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.25); border-radius: 12px; padding: 10px; text-align: center;">
            <div style="font-size: 10px; color: #94a3b8;">审美雷达极值</div>
            <div style="font-size: 14px; font-weight: 900; color: #34d399; margin-top: 2px;">${maxDimName} ${maxDimVal}</div>
          </div>
          <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 12px; padding: 10px; text-align: center;">
            <div style="font-size: 10px; color: #94a3b8;">审美反骨指数</div>
            <div style="font-size: 14px; font-weight: 900; color: #fbbf24; margin-top: 2px;">${contrarian.score}%</div>
          </div>
          <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 12px; padding: 10px; text-align: center; grid-column: span 2;">
            <div style="font-size: 10px; color: #94a3b8;">生活流时空节律</div>
            <div style="font-size: 13px; font-weight: 800; color: #38bdf8; margin-top: 2px;">${chronotype.title} (周末${chronotype.weekend_pct}%)</div>
          </div>
        </div>

        <!-- 3部冷门私藏真金佳作 -->
        <div style="background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 12px 14px; margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; color: #fde68a; margin-bottom: 8px; display: flex; align-items: center; gap: 4px;">
            <span>✨</span> 私藏同频试金石 (未标记冷门真金)
          </div>
          ${gemCardHtml}
        </div>

        <!-- 底部信条 -->
        <div style="text-align: center; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 14px;">
          <div style="font-size: 11px; color: #cbd5e1; font-style: italic; margin-bottom: 8px;">
            “以极致严苛对抗平庸，以光影印记重塑生活”
          </div>
          <div style="display: flex; justify-content: center; align-items: center; gap: 6px; font-size: 10px; color: #64748b;">
            <span>🌐</span> ucncn.cn/movie · 豆瓣数字孪生资产
          </div>
        </div>

      </div>

      <!-- 提示说明 -->
      <div style="text-align: center; margin-top: 12px; font-size: 11px; color: #94a3b8;">
        💡 手机端请直接<strong>长按或截屏</strong>保存此卡，即可发送给好友或朋友圈寻觅同频知己
      </div>
    </div>
  </div>

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
            animationDuration: 1800,
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
            animationDuration: 2000,
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

        // 触发数字平滑滚动跳动动效 (350ms 后启动，持续 1.4 秒，easeOutCubic 拟真减速阻尼)
        target.querySelectorAll('.counter').forEach(counter => {
          if (counter.dataset.animated) return;
          counter.dataset.animated = "true";
          const targetVal = +counter.getAttribute('data-target') || 0;
          if (!targetVal) return;
          
          setTimeout(() => {
            const startTime = performance.now();
            const duration = 1400;
            function step(now) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const ease = 1 - Math.pow(1 - progress, 3);
              const current = Math.round(targetVal * ease);
              counter.innerText = current.toLocaleString();
              if (progress < 1) {
                requestAnimationFrame(step);
              } else {
                counter.innerText = targetVal.toLocaleString();
              }
            }
            requestAnimationFrame(step);
          }, 350);
        });

        // 触发信笺诗意金句打字机效果 (延时 500ms 启动，每字 42ms，只触发一次)
        const typingEl = target.querySelector('#typing-quote');
        if (typingEl && !typingEl.dataset.typed) {
          typingEl.dataset.typed = "true";
          const fullText = typingEl.innerText;
          typingEl.innerText = "";
          let charIndex = 0;
          setTimeout(() => {
            const typingInterval = setInterval(() => {
              if (charIndex < fullText.length) {
                typingEl.innerText += fullText.charAt(charIndex);
                charIndex++;
              } else {
                clearInterval(typingInterval);
              }
            }, 42);
          }, 500);
        }

        // 模块三：滑动到五维观影决策雷达时，开启动态展开渲染 (延时 350ms 优雅铺展)
        if (target.querySelector('#chart-radar')) {
          setTimeout(initRadarChart, 350);
        }

        // 模块五：滑动到光影足迹历年走势时，开启柱状图拔地而起动效 (延时 350ms 逐根升起)
        if (target.querySelector('#chart-timeline')) {
          setTimeout(initTimelineChart, 350);
        }
      }

      // ===== 真正一页一页滑动与平滑漫游控制器 (Slide Flip Deck Engine) =====
      let currentMode = 'story'; // 'story' | 'overview'
      let currentSlideIndex = 1;
      const totalSlides = 7;
      const SLIDE_TITLES = ['个人档案', '殿堂海报', '决策雷达', '严苛金字塔', '历年足迹', '短评切片', '数字孪生'];

      window.toggleViewMode = function(mode) {
        currentMode = mode;
        const body = document.body;
        const flow = document.querySelector('.viewport-flow');
        const btnStory = document.getElementById('btn-mode-story');
        const btnOverview = document.getElementById('btn-mode-overview');
        const cue = document.getElementById('bottom-scroll-cue');
        const dots = document.getElementById('story-nav-dots');

        if (mode === 'overview') {
          body.classList.remove('story-mode');
          body.classList.add('overview-mode');
          if (flow) flow.style.transform = 'none';
          if (btnStory) btnStory.classList.remove('active');
          if (btnOverview) btnOverview.classList.add('active');
          if (cue) cue.style.display = 'none';
          if (dots) dots.style.display = 'none';

          // 激活所有卡片动画
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
        }, 250);
      };

      window.goToSlide = function(index) {
        index = Math.max(1, Math.min(totalSlides, index));
        currentSlideIndex = index;

        if (currentMode === 'story') {
          const flow = document.querySelector('.viewport-flow');
          if (flow) {
            flow.style.transform = 'translateY(-' + ((index - 1) * 100) + 'vh)';
          }
        } else {
          const targetSlide = document.getElementById('slide-' + index);
          if (targetSlide) {
            targetSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }

        updateNavDots(index);

        // 激活当前页卡片入场动画
        const curWrapper = document.getElementById('slide-' + index);
        if (curWrapper) {
          const card = curWrapper.querySelector('.reveal-card');
          if (card) triggerCardReveal(card);
        }

        // 调整图表尺寸 (延时待滑屏与卡片入场稳定后重设)
        setTimeout(() => {
          if (index === 3 && radarChart) radarChart.resize();
          if (index === 5 && timelineChart) timelineChart.resize();
        }, 500);
      };

      window.goToNextSlide = function() {
        if (currentSlideIndex < totalSlides) {
          goToSlide(currentSlideIndex + 1);
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
          if (index < totalSlides) {
            const nextTitle = SLIDE_TITLES[index] || '下一章';
            cue.innerHTML = '<span style="font-size:11px; opacity:0.85;"><strong>0' + index + ' / 0' + totalSlides + '</strong> · ' + SLIDE_TITLES[index-1] + '</span> <span style="color:#34d399;">▾</span> <span>翻至：' + nextTitle + '</span>';
            cue.style.opacity = '1';
            cue.style.pointerEvents = 'auto';
          } else {
            cue.style.opacity = '0';
            cue.style.pointerEvents = 'none';
          }
        }
      }

      // 智能滚轮翻页（防卡在两屏中间，支持内部自适应内容滚动）
      let isScrollingLock = false;

      window.addEventListener('wheel', (e) => {
        if (currentMode !== 'story') return;

        // 如果在当前屏内部有滚动条
        const activeWrapper = document.getElementById('slide-' + currentSlideIndex);
        const activeSection = activeWrapper ? activeWrapper.querySelector('section') : null;

        if (activeSection && activeSection.scrollHeight > activeSection.clientHeight + 12) {
          const atTop = activeSection.scrollTop <= 6;
          const atBottom = activeSection.scrollTop + activeSection.clientHeight >= activeSection.scrollHeight - 6;

          if (e.deltaY > 0 && !atBottom) {
            return; // 允许在卡片内部正常向下滚
          }
          if (e.deltaY < 0 && !atTop) {
            return; // 允许在卡片内部正常向上滚
          }
        }

        e.preventDefault();

        if (isScrollingLock) return;
        if (Math.abs(e.deltaY) < 18) return;

        isScrollingLock = true;
        setTimeout(() => { isScrollingLock = false; }, 1000);

        if (e.deltaY > 0) {
          goToNextSlide();
        } else if (e.deltaY < 0) {
          goToSlide(currentSlideIndex - 1);
        }
      }, { passive: false });

      // 触控滑动翻页
      let touchStartY = 0;
      window.addEventListener('touchstart', (e) => {
        if (currentMode !== 'story') return;
        if (e.touches && e.touches.length > 0) {
          touchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      window.addEventListener('touchend', (e) => {
        if (currentMode !== 'story') return;
        if (!e.changedTouches || e.changedTouches.length === 0) return;
        const deltaY = touchStartY - e.changedTouches[0].clientY;
        if (Math.abs(deltaY) > 50) {
          if (deltaY > 0) {
            goToNextSlide();
          } else {
            goToSlide(currentSlideIndex - 1);
          }
        }
      }, { passive: true });

      // 键盘快捷键切页
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

      // 初始化第一屏指示器并触发第一屏优雅入场
      updateNavDots(1);
      const firstSlide = document.getElementById('slide-1');
      if (firstSlide) {
        const firstCard = firstSlide.querySelector('.reveal-card');
        if (firstCard) {
          setTimeout(() => triggerCardReveal(firstCard), 80);
        }
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

    // 4. AI 选片大脑出口交互与同频寻友卡
    function toggleMatchCardModal() {
      const modal = document.getElementById('match-card-modal');
      if (!modal) return;
      const isHidden = modal.style.display === 'none' || !modal.style.display;
      modal.style.display = isHidden ? 'flex' : 'none';
    }

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
        navigator.clipboard.writeText(ta.value).then(() => {
          alert('🎉 专属 MovieDNA 选片智能体 SKILL 已成功复制到剪贴板！可直接粘贴至 ChatGPT、Claude、DeepSeek、Antigravity 或任何 AI Agent 作为 System Prompt / 专属技能使用。');
        }).catch(() => {
          ta.select();
          document.execCommand('copy');
          alert('🎉 专属 MovieDNA 选片智能体 SKILL 已成功复制到剪贴板！');
        });
      }
    }

    function downloadSkillFile() {
      const ta = document.getElementById('dna-prompt-textarea');
      const text = (ta && ta.value) ? ta.value : '';
      const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'movie-dna-' + ${JSON.stringify(doubanId)} + '.skill.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
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

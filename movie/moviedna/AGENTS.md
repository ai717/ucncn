# AGENTS.md - MovieDNA 项目规则与架构契约

## 1. 项目定位
豆瓣个人观影数据分析与观影基因生成系统（Movie DNA）。
- **安全采集**：浏览器免插件 Bookmarklet 脚本，走本机环境，零封号零泄露风险。
- **特征工程**：秒级清洗全量打分分布、年代跨度、核心题材、短评正负切片。
- **美学报告**：吸收豆瓣官方复古墨绿织纹、长尾夹信笺、邮戳印章、真实海报墙的沉浸式体验。
- **数字孪生**：基于五维审美雷达与自适应文案，导出个人专属 AI 选片智能体（SKILL.md）。

---

## 2. 核心架构与目录

```
moviedna/
├── AGENTS.md                  # 规则与架构契约
├── PROJECT_LOG.md             # 进度追踪与开发日志
├── README.md                  # 项目对外说明
├── server.py                  # FastAPI 服务 (8765 端口, 拖拽上传与持久化)
├── core/
│   ├── parser.py              # 数据模型与 JSON 解析
│   ├── analyzer.py            # 特征工程与统计指标计算
│   └── dna_engine.py          # 观影基因提炼与 Prompt 引擎
├── collectors/
│   ├── bookmarklet.js         # 书签脚本源码 (含 Cookie dbcl2 全域嗅探)
│   └── bookmarklet.min.txt    # 单行可拖拽书签代码
├── web/
│   ├── report_generator.py    # 电影感全景 HTML 报告生成器
│   └── static/favicon.svg     # 网站胶片笑脸图标
└── output/reports/            # 持久化存储用户静态报告与统计 JSON
```

---

## 3. 开发规范与铁律
1. **启动前必读**：每次任务前通读 `AGENTS.md` 与 `PROJECT_LOG.md`。
2. **端口隔离**：默认监听 `8765` 端口，避免与其他开发服务冲突。
3. **改动后服务生命周期与探测闭环**：每次代码、模板或排版发生变动后，必须自动平滑停止 8765 端口旧进程并重新启动服务，同时通过 HTTP 探测验证最新 `/report/{user_id}` 页面可正常读取并包含最新变更特征。
4. **防盗链穿透**：渲染外部豆瓣海报时，通过内置 `/api/proxy/image` 反代并携带 `<meta name="referrer" content="no-referrer">`。
5. **Token 优化**：非必要不输出完整大文件，优先 Diff 与精简记录。

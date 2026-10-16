# MovieDNA - 豆瓣观影数据分析与观影基因一键生成系统

MovieDNA 是一个轻量、安全、免插件的个人观影数据分析与观影数字孪生（Movie DNA）生成引擎。

---

## 核心特性
1. **多模式安全数据接入**：
   - 浏览器免插件 Bookmarklet 书签脚本（零依赖、走用户本机环境、无封号封 IP 风险）。
   - 本地 CSV / JSON 一键导入（兼容豆伴、纳豆 dou_archive 等导出格式）。
2. **全维度特征工程分析**：
   - 均分、星级结构、活跃年份偏好、打分严苛度。
   - 核心常驻题材 TOP 标签、极端高分与极端低分短评真迹切片。
3. **AI 观影基因建模**：
   - 组装五维审美雷达（镜头美学、叙事智性、质朴深情、社会隐喻、反装逼雷达）。
   - 沉淀专属的选片决策算法与 AI Agent 技能配置（`SKILL.md`）。
4. **一键生成美学报告**：
   - 交互式年度观影全景报告（包含 ECharts 评分金字塔、活跃年份走势）。

---

## 快速上手指南

### 第一步：使用 Bookmarklet 提取豆瓣数据（免安装任何插件）

1. 打开浏览器（Chrome / Edge / Safari 等均可），新建任意书签，名称设为 `🎬 MovieDNA 提取器`。
2. 将 [collectors/bookmarklet.min.txt](collectors/bookmarklet.min.txt) 文件中的单行代码完整复制，粘贴到该书签的 **网址 (URL)** 一栏并保存。
3. 登录豆瓣，进入任意“我看过的电影”页面（例如 `https://movie.douban.com/people/{你的ID}/collect`）。
4. 点击书签栏上的该书签（或按 F12 打开 Console 控制台直接粘贴执行），页面右上角将弹出进度面板。
5. 脚本自动智能抓取，完成后自动触发下载 `douban_movie_{你的ID}_{日期}.json`。

### 第二步：运行 MovieDNA 分析流水线

确保机器安装了 Python 3.8+，在 `moviedna/` 目录下执行：

```bash
python main.py <导出的JSON文件路径> --out output
```

例如使用测试数据运行：
```bash
python main.py tests/mock_export.json --out output
```

### 第三步：产物交付与使用

命令执行完成后，`output/` 目录下将生成三个核心文件：
- `{user}_stats.json`：全量清洗后的统计指标资产（均分、星级占比、年代曲线、高频标签等）。
- `{user}_report.html`：双击直接在浏览器中打开的高颜值交互式观影全景看板。
- `{user}_dna_prompt.md`：结构化提炼 Prompt。将其完整输入给 Claude / Gemini / ChatGPT，即可获得专属于你的**五维审美雷达评分、一票否决黑名单与专属选片决策模型**，并可一键保存为你的专属 AI Agent 技能。

### 第四步：启动线上 Web 服务 (可选)

如果希望使用可视化 Web 界面：

```bash
pip install -r requirements.txt
python server.py
```
服务将在本地 **`8765`** 端口启动，浏览器直接访问：`http://127.0.0.1:8765`。
拖入通过 Bookmarklet 导出的 JSON 文件，即可秒级生成观影看板并一键复制专属 AI 观影基因 Prompt。

---

## 运行单元测试

```bash
python -m unittest discover tests
```

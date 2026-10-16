import json
from typing import Dict, Any

class MovieDnaPromptEngine:
    """负责将数据特征工程指标组装为结构化 LLM 基因提炼 Prompt"""

    SYSTEM_PROMPT = """你是一位世界顶级的电影评论家、影视人类学学者与资深心理画像分析师。
你的任务是根据提供的用户个人真实豆瓣观影数据（包括均分、星级结构分布、年代趋势、高频题材、以及用户本人的真实极端好评与差评短评），深度提炼出专属于该用户的【个人观影基因与审美决策模型 (Movie DNA)】。

分析必须犀利、深刻、有血有肉，彻底杜绝公关套话与AI流水线式空话。以毒辣而精准的洞察，剖析该用户的精神世界与审美开关。"""

    @classmethod
    def build_dna_generation_prompt(cls, stats: Dict[str, Any], user_meta: Dict[str, Any]) -> str:
        douban_id = user_meta.get("douban_id", "未知用户")
        overview = stats.get("overview", {})
        rating_dist = stats.get("rating_distribution", {})
        year_timeline = stats.get("year_timeline", {})
        top_tags = stats.get("top_tags", [])
        samples = stats.get("representative_samples", {})

        praise_texts = "\n".join([
            f"- 《{s['title']}》({s['rating']}分): {s['comment']}"
            for s in samples.get("praise_samples", [])
        ]) or "无"

        criticism_texts = "\n".join([
            f"- 《{s['title']}》({s['rating']}分): {s['comment']}"
            for s in samples.get("criticism_samples", [])
        ]) or "无"

        tags_summary = ", ".join([f"{t['tag']}({t['count']}部)" for t in top_tags[:15]])

        prompt = f"""### 输入数据资产

1. **基本体量与用户标识**
- 豆瓣 ID: {douban_id}
- 累计观影总量: {overview.get('total_movies', 0)} 部
- 独立打分作品: {overview.get('rated_movies', 0)} 部
- 综合均分: {overview.get('average_rating', 0.0)} 分 / 10分制
- 累计短评沉淀: {overview.get('total_comments', 0)} 条

2. **打分金字塔与严苛度结构**
- 10 分（★★★★★ 五星神作）: {rating_dist.get('score_10', {}).get('pct', 0)}% ({rating_dist.get('score_10', {}).get('count', 0)} 部)
- 8 分（★★★★☆ 四星佳作）: {rating_dist.get('score_8', {}).get('pct', 0)}% ({rating_dist.get('score_8', {}).get('count', 0)} 部)
- 6 分（★★★☆☆ 三星平庸）: {rating_dist.get('score_6', {}).get('pct', 0)}% ({rating_dist.get('score_6', {}).get('count', 0)} 部)
- 4 分（★★☆☆☆ 两星缺陷）: {rating_dist.get('score_4', {}).get('pct', 0)}% ({rating_dist.get('score_4', {}).get('count', 0)} 部)
- 2 分（★☆☆☆☆ 一星雷区）: {rating_dist.get('score_2', {}).get('pct', 0)}% ({rating_dist.get('score_2', {}).get('count', 0)} 部)

3. **高频核心题材标签 (TOP 15)**
{tags_summary}

4. **用户极端好评样本真迹 (5星)**
{praise_texts}

5. **用户极端差评样本真迹 (1~2星)**
{criticism_texts}

---

### 输出要求与格式规范
请严格按照以下 Markdown 格式结构输出，不要包含多余废话：

# 个人专属观影基因与审美决策模型 (Movie DNA)

## 一、用户画像与审美底色 (Aesthetic Profile)
- **代际与阅历特征**：结合观影年限与题材偏好分析心理成熟度。
- **评分人格类型**：剖析其是“苛刻现实主义者”、“感性共情者”还是“理性学院派”等。
- **一句话审美信条**：提炼最核心的一句话精神宣言。

## 二、五维审美雷达 (0 ~ 100 评分与洞察)
请给出以下五个维度的精准得分（0~100）与深度洞察：
1. **视觉影调与镜头美学** (得分与说明)
2. **叙事智性与严密逻辑** (得分与说明)
3. **质朴深情与情感开关** (得分与说明)
4. **社会隐喻与现实讽刺** (得分与说明)
5. **反装逼与去悬浮雷达** (得分与说明)

## 三、殿堂偏好与绝对雷区
- **殿堂真爱题材与元素** (说明深层共鸣原因)
- **绝对一票否决黑名单与毒点** (根据差评归纳触发自动扣分或低分的红线)

## 四、专属选片推荐与评分预测算法 (Rules)
- 基准分定义与加分触发项 (+1.0 ~ +3.0)
- 扣分项与一票否决项 (-2.0 ~ -6.0)
- 对该用户的评片与交互规范
"""
        return prompt

    @classmethod
    def generate_skill_markdown(cls, douban_id: str, dna_content: str) -> str:
        """将生成的基因内容包装为即开即用的标准 SKILL.md 技能定义"""
        header = f"""---
name: movie-dna-{douban_id}
description: "基于用户豆瓣ID: {douban_id} 的个人全量观影数据提炼的专属观影基因与审美决策模型。包含五维审美雷达、红黑榜与专属选片推荐规则。"
agent_created: true
---

"""
        return header + dna_content.strip()

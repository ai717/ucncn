from collections import Counter
from typing import List, Dict, Any, Optional
from core.parser import MovieRecord

class MovieStatsAnalyzer:
    def __init__(self, records: List[MovieRecord]):
        self.records = records

    def analyze(self) -> Dict[str, Any]:
        total_count = len(self.records)
        if total_count == 0:
            return {"total_count": 0}

        rated_records = [r for r in self.records if r.rating is not None]
        unrated_count = total_count - len(rated_records)

        # 1. 评分统计与结构分布
        ratings = [r.rating for r in rated_records]
        avg_rating = round(sum(ratings) / len(ratings), 2) if ratings else 0.0

        # 分布统计：10分(5星), 8分(4星), 6分(3星), 4分(2星), 2分(1星)
        rating_dist = {10: 0, 8: 0, 6: 0, 4: 0, 2: 0}
        for r in ratings:
            if r in rating_dist:
                rating_dist[r] += 1

        rating_pct = {
            f"score_{k}": {
                "count": v,
                "pct": round((v / len(ratings)) * 100, 1) if ratings else 0.0
            }
            for k, v in rating_dist.items()
        }

        # 2. 标记年份时间线 (Mark Year Timeline)
        year_counter = Counter([r.mark_year for r in self.records if r.mark_year is not None])
        sorted_years = sorted(year_counter.keys())
        year_timeline = {str(yr): year_counter[yr] for yr in sorted_years}

        # 3. 标签与题材偏好 (Tags Analysis)
        tag_counter = Counter()
        for r in self.records:
            for tag in r.tags:
                tag_cleaned = tag.strip()
                if tag_cleaned and len(tag_cleaned) <= 10:
                    tag_counter[tag_cleaned] += 1
        top_tags = tag_counter.most_common(20)

        # 4. 短评沉淀统计 (Comments)
        comments_list = [r for r in self.records if r.comment]
        comment_count = len(comments_list)

        # 极端好评与极端差评切片 (供 LLM 进行审美雷达微观分析)
        five_star_samples = [
            {"title": r.title, "rating": r.rating, "comment": r.comment}
            for r in rated_records if r.rating == 10 and r.comment
        ][:15]

        one_star_samples = [
            {"title": r.title, "rating": r.rating, "comment": r.comment}
            for r in rated_records if r.rating <= 4 and r.comment
        ][:15]

        return {
            "overview": {
                "total_movies": total_count,
                "rated_movies": len(rated_records),
                "unrated_movies": unrated_count,
                "average_rating": avg_rating,
                "five_star_rate": rating_pct["score_10"]["pct"],
                "four_star_rate": rating_pct["score_8"]["pct"],
                "three_star_rate": rating_pct["score_6"]["pct"],
                "low_star_rate": round(
                    rating_pct["score_4"]["pct"] + rating_pct["score_2"]["pct"], 1
                ),
                "total_comments": comment_count,
            },
            "rating_distribution": rating_pct,
            "year_timeline": year_timeline,
            "top_tags": [{"tag": t[0], "count": t[1]} for t in top_tags],
            "representative_samples": {
                "praise_samples": five_star_samples,
                "criticism_samples": one_star_samples,
            }
        }

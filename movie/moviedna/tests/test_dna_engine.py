import unittest
from core.dna_engine import MovieDnaPromptEngine

class TestDnaEngine(unittest.TestCase):
    def test_prompt_generation(self):
        mock_stats = {
            "overview": {
                "total_movies": 100,
                "rated_movies": 90,
                "average_rating": 7.5,
                "total_comments": 20
            },
            "rating_distribution": {
                "score_10": {"pct": 20.0, "count": 18},
                "score_8": {"pct": 40.0, "count": 36},
                "score_6": {"pct": 30.0, "count": 27},
                "score_4": {"pct": 5.0, "count": 5},
                "score_2": {"pct": 5.0, "count": 4},
            },
            "top_tags": [{"tag": "科幻", "count": 30}, {"tag": "剧情", "count": 50}],
            "representative_samples": {
                "praise_samples": [{"title": "星际穿越", "rating": 10, "comment": "神作！爱跨越时空"}],
                "criticism_samples": [{"title": "某烂片", "rating": 2, "comment": "剧作稀烂"}]
            }
        }
        mock_meta = {"douban_id": "test_user"}

        prompt = MovieDnaPromptEngine.build_dna_generation_prompt(mock_stats, mock_meta)
        self.assertIn("豆瓣 ID: test_user", prompt)
        self.assertIn("五维审美雷达", prompt)
        self.assertIn("星际穿越", prompt)

        skill_md = MovieDnaPromptEngine.generate_skill_markdown("test_user", "# 基因内容")
        self.assertIn("name: movie-dna-test_user", skill_md)
        self.assertIn("# 基因内容", skill_md)

if __name__ == "__main__":
    unittest.main()

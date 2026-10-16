import unittest
from core.parser import DoubanDataParser
from core.analyzer import MovieStatsAnalyzer

class TestMovieParserAndAnalyzer(unittest.TestCase):
    def setUp(self):
        self.mock_data = {
            "meta": {
                "douban_id": "test_cinephile",
                "export_time": "2026-10-11T12:00:00Z",
                "total_count": 4
            },
            "records": [
                {
                    "subject_id": "1292052",
                    "title": "肖申克的救赎 The Shawshank Redemption",
                    "url": "https://movie.douban.com/subject/1292052/",
                    "intro": "弗兰克·德拉邦特 / 蒂姆·罗宾斯 / 剧情 犯罪",
                    "rating": 10,
                    "mark_date": "2023-05-01",
                    "tags": ["剧情", "经典", "希望"],
                    "comment": "无论看多少遍都热泪盈眶，对自由与坚守的最深致敬。"
                },
                {
                    "subject_id": "1291546",
                    "title": "霸王别姬",
                    "url": "https://movie.douban.com/subject/1291546/",
                    "intro": "陈凯歌 / 张国荣 / 剧情 爱情",
                    "rating": 10,
                    "mark_date": "2023-06-15",
                    "tags": ["经典", "张国荣", "华语"],
                    "comment": "不疯魔不成活，时代洪流下的个体悲歌。"
                },
                {
                    "subject_id": "9999991",
                    "title": "某恶俗悬浮烂片",
                    "url": "https://movie.douban.com/subject/9999991/",
                    "intro": "某导演 / 喜剧",
                    "rating": 2,
                    "mark_date": "2024-01-10",
                    "tags": ["烂片", "避坑"],
                    "comment": "剧作毫无逻辑，小品化闹剧，侮辱智商！"
                },
                {
                    "subject_id": "9999992",
                    "title": "某未打分纪录片",
                    "url": "https://movie.douban.com/subject/9999992/",
                    "intro": "纪录片",
                    "rating": None,
                    "mark_date": "2024-02-01",
                    "tags": ["纪录片"],
                    "comment": ""
                }
            ]
        }

    def test_parser(self):
        parsed = DoubanDataParser.parse_json_data(self.mock_data)
        self.assertEqual(parsed["meta"]["douban_id"], "test_cinephile")
        self.assertEqual(len(parsed["records"]), 4)
        self.assertEqual(parsed["records"][0].mark_year, 2023)
        self.assertEqual(parsed["records"][3].rating, None)

    def test_analyzer(self):
        parsed = DoubanDataParser.parse_json_data(self.mock_data)
        analyzer = MovieStatsAnalyzer(parsed["records"])
        stats = analyzer.analyze()

        overview = stats["overview"]
        self.assertEqual(overview["total_movies"], 4)
        self.assertEqual(overview["rated_movies"], 3)
        self.assertEqual(overview["unrated_movies"], 1)
        # 均分: (10 + 10 + 2) / 3 = 7.33
        self.assertEqual(overview["average_rating"], 7.33)
        self.assertEqual(overview["five_star_rate"], 66.7)
        self.assertEqual(overview["total_comments"], 3)

        # 时间线检验
        timeline = stats["year_timeline"]
        self.assertEqual(timeline.get("2023"), 2)
        self.assertEqual(timeline.get("2024"), 2)

        # 样本切片检验
        samples = stats["representative_samples"]
        self.assertEqual(len(samples["praise_samples"]), 2)
        self.assertEqual(len(samples["criticism_samples"]), 1)
        self.assertIn("侮辱智商", samples["criticism_samples"][0]["comment"])

if __name__ == "__main__":
    unittest.main()

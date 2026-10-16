import os
import sys
import json
import unittest
from fastapi.testclient import TestClient

# 确保可以直接运行本测试文件
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.parser import DoubanDataParser
from core.analyzer import MovieStatsAnalyzer
from web.report_generator import ReportGenerator
from server import app


class TestIntegrationPipeline(unittest.TestCase):
    def setUp(self):
        mock_file_path = os.path.join(os.path.dirname(__file__), "mock_export.json")
        with open(mock_file_path, "r", encoding="utf-8") as f:
            self.raw_data = json.load(f)
        self.client = TestClient(app)

    def test_full_pipeline_html_generation(self):
        """测试解析 -> 分析 -> 报告生成的端到端输出完整度与 DOM 契约"""
        parsed = DoubanDataParser.parse_json_data(self.raw_data)
        meta = parsed["meta"]
        records = parsed["records"]

        analyzer = MovieStatsAnalyzer(records)
        stats = analyzer.analyze()

        html = ReportGenerator.generate_html(stats, meta)

        # 1. 验证防盗链穿透
        self.assertIn('<meta name="referrer" content="no-referrer">', html)

        # 2. 验证版心与核心 CSS 样式契约
        self.assertIn(".viewport-flow", html)
        self.assertIn("max-width: 880px", html)

        # 3. 验证邮戳印章文案
        self.assertIn("观影基因", html)
        self.assertIn("MovieDNA", html)

        # 4. 验证核心数据在 HTML 中的渲染
        self.assertIn(meta["douban_id"], html)
        self.assertIn(str(stats["overview"]["total_movies"]), html)
        self.assertIn(str(stats["overview"]["average_rating"]), html)

        # 5. 验证自适应文案与 AI 孪生入口
        profile = ReportGenerator.derive_persona_profile(
            total_movies=stats["overview"]["total_movies"],
            avg_rating=stats["overview"]["average_rating"],
            five_star_pct=stats["overview"].get("five_star_rate", 0),
            low_star_pct=stats["overview"].get("low_star_rate", 0),
            comment_count=stats["overview"]["total_comments"],
            top_tags=stats.get("top_tags", [])
        )
        self.assertIn(profile["persona_title"], html)
        self.assertIn("生成你的数字孪生选片大脑", html)
        self.assertIn(f"近 {len(stats['year_timeline'])} 年的 {stats['overview']['total_movies']} 部打标", html)

    def test_server_api_upload_and_persistence(self):
        """测试 Web 服务上传分析接口 /api/analyze 与持久化读取 /report/{user_id}"""
        mock_bytes = json.dumps(self.raw_data, ensure_ascii=False).encode("utf-8")
        
        # 1. 发起文件上传分析，验证返回规范的 JSON 跳转协议
        response = self.client.post(
            "/api/analyze",
            files={"file": ("test_export.json", mock_bytes, "application/json")}
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertTrue(data.get("success"))
        self.assertEqual(data.get("user_id"), self.raw_data["meta"]["douban_id"])
        self.assertEqual(data.get("redirect_url"), f"/report/{self.raw_data['meta']['douban_id']}")

        # 2. 模拟前端跳转并验证持久化页面可通过 GET /report/{user_id} 完整读取所有样式与核心组件
        report_resp = self.client.get(data.get("redirect_url"))
        self.assertEqual(report_resp.status_code, 200)
        self.assertIn("text/html", report_resp.headers.get("content-type", ""))
        self.assertIn("cinephile_demo", report_resp.text)
        self.assertIn("dna-prompt-textarea", report_resp.text)
        self.assertIn("viewport-flow", report_resp.text)
        self.assertIn("paper-section", report_resp.text)

    def test_server_static_and_bookmarklet_routes(self):
        """测试静态路由与书签文本接口"""
        favicon_resp = self.client.get("/favicon.ico")
        self.assertEqual(favicon_resp.status_code, 200)
        self.assertIn("image/svg+xml", favicon_resp.headers.get("content-type", ""))

        bm_resp = self.client.get("/collectors/bookmarklet.min.txt")
        self.assertEqual(bm_resp.status_code, 200)
        self.assertIn("javascript:", bm_resp.text)

    def test_proxy_image_route(self):
        """测试自建图片防盗链代理接口 /api/proxy/image"""
        # 测试不合法 URL 拦截
        bad_resp = self.client.get("/api/proxy/image?url=invalid")
        self.assertEqual(bad_resp.status_code, 400)


if __name__ == "__main__":
    unittest.main()

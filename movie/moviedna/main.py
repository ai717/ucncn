import sys
import os
import json
import argparse

# 确保 core 和 web 模块可被导入
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from core.parser import DoubanDataParser
from core.analyzer import MovieStatsAnalyzer
from core.dna_engine import MovieDnaPromptEngine
from web.report_generator import ReportGenerator

def process_file(json_file_path: str, output_dir: str = "output"):
    if not os.path.exists(json_file_path):
        print(f"[错误] 文件未找到: {json_file_path}")
        return

    os.makedirs(output_dir, exist_ok=True)

    print(f"[*] 正在读取并解析数据文件: {json_file_path}")
    with open(json_file_path, "r", encoding="utf-8") as f:
        raw_data = json.load(f)

    parsed = DoubanDataParser.parse_json_data(raw_data)
    meta = parsed.get("meta", {})
    records = parsed.get("records", [])
    douban_id = meta.get("douban_id", "user")

    print(f"[*] 成功解析 {len(records)} 条观影记录，用户 ID: {douban_id}")

    # 特征工程分析
    analyzer = MovieStatsAnalyzer(records)
    stats = analyzer.analyze()

    # 导出统计 JSON
    stats_file = os.path.join(output_dir, f"{douban_id}_stats.json")
    with open(stats_file, "w", encoding="utf-8") as f:
        json.dump(stats, f, ensure_ascii=False, indent=2)
    print(f"[+] 统计特征文件已保存: {stats_file}")

    # 生成 LLM 提炼 Prompt 文件
    prompt = MovieDnaPromptEngine.build_dna_generation_prompt(stats, meta)
    prompt_file = os.path.join(output_dir, f"{douban_id}_dna_prompt.md")
    with open(prompt_file, "w", encoding="utf-8") as f:
        f.write(prompt)
    print(f"[+] LLM 基因提炼 Prompt 已生成: {prompt_file}")

    # 生成可视化独立 HTML 报告
    html_content = ReportGenerator.generate_html(stats, meta, dna_markdown="", dna_prompt=prompt)
    html_file = os.path.join(output_dir, f"{douban_id}_report.html")
    with open(html_file, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"[+] 观影基因交互报告已生成: {html_file}")

    print("\n[OK] 任务完成！已成功输出统计 JSON、LLM Prompt 与可视化报告 HTML。")

def main():
    parser = argparse.ArgumentParser(description="MovieDNA 观影数据分析与基因生成流水线")
    parser.add_argument("file", help="Bookmarklet 导出的 JSON 数据文件路径")
    parser.add_argument("--out", default="output", help="输出目录 (默认: output)")
    args = parser.parse_args()

    process_file(args.file, args.out)

if __name__ == "__main__":
    main()

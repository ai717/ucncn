import json
from typing import List, Dict, Any, Optional
from datetime import datetime

class MovieRecord:
    def __init__(
        self,
        subject_id: str,
        title: str,
        url: str,
        intro: str = "",
        rating: Optional[int] = None,
        mark_date: str = "",
        tags: Optional[List[str]] = None,
        comment: str = ""
    ):
        self.subject_id = str(subject_id)
        self.title = title.strip()
        self.url = url
        self.intro = intro.strip()
        self.rating = rating  # 2, 4, 6, 8, 10 or None
        self.mark_date = mark_date.strip()
        self.tags = tags or []
        self.comment = comment.strip()

    @property
    def mark_year(self) -> Optional[int]:
        if not self.mark_date:
            return None
        try:
            return int(self.mark_date.split("-")[0])
        except (ValueError, IndexError):
            return None

    def to_dict(self) -> Dict[str, Any]:
        return {
            "subject_id": self.subject_id,
            "title": self.title,
            "url": self.url,
            "intro": self.intro,
            "rating": self.rating,
            "mark_date": self.mark_date,
            "tags": self.tags,
            "comment": self.comment,
        }

class DoubanDataParser:
    @staticmethod
    def parse_json_data(raw_data: Any) -> Dict[str, Any]:
        """解析 Bookmarklet 导出的标准 JSON 结构"""
        if isinstance(raw_data, str):
            data = json.loads(raw_data)
        elif isinstance(raw_data, dict):
            data = raw_data
        else:
            raise ValueError("Unsupported data format, expected dict or JSON string.")

        meta = data.get("meta", {})
        raw_records = data.get("records", [])

        records: List[MovieRecord] = []
        for item in raw_records:
            records.append(
                MovieRecord(
                    subject_id=item.get("subject_id", ""),
                    title=item.get("title", ""),
                    url=item.get("url", ""),
                    intro=item.get("intro", ""),
                    rating=item.get("rating"),
                    mark_date=item.get("mark_date", ""),
                    tags=item.get("tags", []),
                    comment=item.get("comment", ""),
                )
            )

        return {
            "meta": meta,
            "records": records,
        }

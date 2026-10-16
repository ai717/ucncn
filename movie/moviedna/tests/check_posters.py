import urllib.request
import re

movies = [
    ("肖申克的救赎", "1292052"),
    ("霸王别姬", "1291546"),
    ("星际穿越", "1889243"),
    ("盗梦空间", "3541415"),
    ("千与千寻", "1291560"),
    ("泰坦尼克号", "1292722"),
    ("这个杀手不太冷", "1295644"),
    ("美丽人生", "1292063"),
    ("机器人总动员", "2131459"),
    ("三傻大闹宝莱坞", "3793023"),
    ("疯狂动物城", "25662329"),
    ("楚门的世界", "1292064"),
    ("寻梦环游记", "20495023"),
    ("大话西游", "1292213"),
    ("教父", "1291841"),
    ("流浪地球2", "35267208")
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://movie.douban.com/'
}

for name, mid in movies:
    url = f"https://movie.douban.com/subject/{mid}/"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8')
            matches = re.findall(r'https://img\d\.doubanio\.com/view/photo/s_ratio_poster/public/[^"\']+', html)
            if matches:
                print(f"{name}: {matches[0]}")
            else:
                matches2 = re.findall(r'https://[^"\']+\.jpg', html)
                print(f"{name} (fallback): {matches2[:2]}")
    except Exception as e:
        print(f"{name}: ERROR {e}")

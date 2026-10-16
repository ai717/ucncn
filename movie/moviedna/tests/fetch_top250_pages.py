import urllib.request
import re
import json
import time

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://movie.douban.com/'
}

all_movies = []

# Fetch 3 pages (25 * 3 = 75 movies > 64)
for start in [0, 25, 50]:
    url = f"https://movie.douban.com/top250?start={start}"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=5) as resp:
            html = resp.read().decode('utf-8')
            # Extract img src and alt
            pattern = re.compile(r'<div class="pic">.*?<img[^>]+alt="([^"]+)"[^>]+src="([^"]+)"', re.DOTALL)
            matches = pattern.findall(html)
            for title, img in matches:
                # Replace img9 with img2/img3
                safe_img = img.replace("img9.doubanio.com", "img2.doubanio.com").replace("img1.doubanio.com", "img2.doubanio.com")
                all_movies.append({"title": title, "img": safe_img})
    except Exception as e:
        print(f"Error on start={start}: {e}")
    time.sleep(0.5)

print(f"Total movies parsed: {len(all_movies)}")
if len(all_movies) >= 64:
    with open("moviedna/tests/top64_posters.json", "w", encoding="utf-8") as f:
        json.dump(all_movies[:64], f, ensure_ascii=False, indent=2)
    print("Successfully saved 64 posters to moviedna/tests/top64_posters.json")

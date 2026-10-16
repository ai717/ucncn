import urllib.request
import urllib.parse
import json
import time

classics = [
    '肖申克的救赎', '霸王别姬', '阿甘正传', '泰坦尼克号', '千与千寻', 
    '这个杀手不太冷', '美丽人生', '星际穿越', '盗梦空间', '楚门的世界',
    '辛德勒的名单', '忠犬八公的故事', '海上钢琴师', '三傻大闹宝莱坞', '机器人总动员',
    '放牛班的春天', '大话西游之大圣娶亲', '疯狂动物城', '无间道', '教父',
    '龙猫', '控方证人', '当幸福来敲门', '怦然心动', '触不可及',
    '蝙蝠侠：黑暗骑士', '末代皇帝', '活着', '寻梦环游记', '乱世佳人',
    '指环王3：王者无敌', '摔跤吧！爸爸', '飞屋环游记', '少年派的奇幻漂流', '哈利·波特与魔法石',
    '素媛', '罗马假日', '指环王1：护戒使者', '天空之城', '指环王2：双塔奇兵',
    '闻香识女人', '天堂电影院', '辩护人', '狮子王', '鬼子来了',
    '死亡诗社', '大话西游之月光宝盒', '教父2', '搏击俱乐部', '黑客帝国',
    '绿皮书', '美丽心灵', '饮食男女', '钢琴家', '被嫌弃的松子的一生',
    '本杰明·巴顿奇事', '让子弹飞', '情书', '七宗罪', '西西里的美丽传说',
    '寄生虫', '布达佩斯大饭店', '流浪地球2', '爱在黎明破晓前'
]

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://movie.douban.com/'
}

results = []
for name in classics:
    q = urllib.parse.quote(name)
    url = f'https://movie.douban.com/j/subject_suggest?q={q}'
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=4) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            if data and 'img' in data[0]:
                raw_img = data[0]['img']
                # 将 img9 换为 img2 或 img3 避免反爬
                safe_img = raw_img.replace('img9.doubanio.com', 'img2.doubanio.com').replace('img1.doubanio.com', 'img2.doubanio.com')
                results.append({'title': name, 'img': safe_img})
            else:
                results.append({'title': name, 'img': ''})
    except Exception as e:
        print(f"Error {name}: {e}")
        results.append({'title': name, 'img': ''})
    time.sleep(0.08)

valid_count = len([r for r in results if r.get('img')])
print(f"Fetched {len(results)} items, valid count: {valid_count}")

with open('moviedna/tests/posters_64.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print("Saved to moviedna/tests/posters_64.json")

import urllib.request
import re

def get_title(vid):
    url = f"https://www.youtube.com/watch?v={vid}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        html = urllib.request.urlopen(req).read().decode('utf-8')
        title = re.search(r'<title>(.*?)</title>', html)
        print(f"{vid}: {title.group(1)}")
    except:
        print(f"{vid}: failed")

for vid in ["U6A7Iv0RbdA", "j0GUfkP1xik"]:
    get_title(vid)

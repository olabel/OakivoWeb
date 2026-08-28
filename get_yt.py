import urllib.request
import re

def search(q):
    url = f"https://www.youtube.com/results?search_query={q.replace(' ', '+')}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    html = urllib.request.urlopen(req).read().decode('utf-8')
    matches = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
    if matches:
        return matches[0]
    return "none"

print(search("cybersecurity hud data stream background loop 4k"))
print(search("hyperrealistic futuristic server room loop 4k"))

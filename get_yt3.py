import urllib.request
import re

url = "https://www.youtube.com/results?search_query=abstract+technology+background+loop+4k+motion+graphics"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

matches = re.findall(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
if matches:
    print(matches[0])

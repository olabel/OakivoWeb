import urllib.request
import re

url = "https://www.youtube.com/watch?v=RR2EI8EEOOw"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
title = re.search(r'<title>(.*?)</title>', html)
print(title.group(1) if title else "No title")

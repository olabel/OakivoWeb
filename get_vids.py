import urllib.request
import json
import re
import sys

q = sys.argv[1].replace(' ', '+')
url = f"https://www.youtube.com/results?search_query={q}"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

match = re.search(r'var ytInitialData = ({.*?});</script>', html)
if match:
    data = json.loads(match.group(1))
    contents = data['contents']['twoColumnSearchResultsRenderer']['primaryContents']['sectionListRenderer']['contents'][0]['itemSectionRenderer']['contents']
    for item in contents:
        if 'videoRenderer' in item:
            vid = item['videoRenderer']['videoId']
            title = item['videoRenderer']['title']['runs'][0]['text']
            print(f"{vid}: {title}")

import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(
    'https://assets.mixkit.co/videos/preview/mixkit-server-rack-in-a-dark-room-4233-large.mp4',
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'}
)

try:
    with urllib.request.urlopen(req, context=ctx) as response, open('public/server-room.mp4', 'wb') as out_file:
        data = response.read()
        out_file.write(data)
    print("Success")
except Exception as e:
    print("Error:", e)

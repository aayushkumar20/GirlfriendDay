import urllib.request

headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request("https://freepd.com/music/Spring%20In%20My%20Step.mp3", headers=headers)
with urllib.request.urlopen(req) as response, open('assets/music.mp3', 'wb') as out_file:
    out_file.write(response.read())

print("Downloaded music successfully")

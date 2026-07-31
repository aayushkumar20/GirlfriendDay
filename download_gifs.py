import urllib.request

headers = {'User-Agent': 'Mozilla/5.0'}

req1 = urllib.request.Request("https://media.tenor.com/pUozGN-hKxQAAAAM/maariohead.gif", headers=headers)
with urllib.request.urlopen(req1) as response, open('assets/dudu.gif', 'wb') as out_file:
    out_file.write(response.read())

req2 = urllib.request.Request("https://media.tenor.com/1e05XpEk3DEAAAAM/bubu-dudu-sseeyall.gif", headers=headers)
with urllib.request.urlopen(req2) as response, open('assets/bubu.gif', 'wb') as out_file:
    out_file.write(response.read())

req3 = urllib.request.Request("https://media.tenor.com/-PbGSZKddD8AAAAM/hug-and-kiss.gif", headers=headers)
with urllib.request.urlopen(req3) as response, open('assets/hug.gif', 'wb') as out_file:
    out_file.write(response.read())

print("Downloaded all GIFs successfully")

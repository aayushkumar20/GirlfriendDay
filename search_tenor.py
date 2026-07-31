import urllib.request
import json
import sys

def search_tenor(query):
    url = f"https://tenor.googleapis.com/v2/search?q={urllib.parse.quote(query)}&key=LIVDSRZULELA&client_key=my_test_app&limit=5"
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read())
            print(f"--- Results for: {query} ---")
            for item in data.get('results', []):
                media = item.get('media_formats', {})
                gif = media.get('gif', {}).get('url')
                print(f"GIF URL: {gif}")
    except Exception as e:
        print(f"Error for {query}: {e}")

search_tenor("dudu brown bear cute")
search_tenor("bubu white panda cute")
search_tenor("bubu dudu backpack kiss")

import sys
import requests
import json
import time

cmdict = {}

#Decorator to automatically rgister
#functions as callable with the cli
def addEntry(func) :
	cmdict[func.__name__] = func
	return func

HOOK_URL="https://discord.com/api/webhooks/1302646064225980426/mN8vyNtOFnwqbEzh0Io_3XAkgDzIqglyrxFAB6YVjd8DbzVnJZZoPuFFRFGLJPacco0e"

@addEntry
def hook(text) :
	global hookUrl

	text = text.strip()

	if not(text) :
		print(json.dumps({
			"success": False,
			"error": "No text given"
		}))
		return

	text = time.strftime("%x %X | ") + text

	form = {"content" : f"```{text}```"}
	requests.post(HOOK_URL, json = form)
	print(json.dumps({
		"success": True
	}))

if __name__ == "__main__" :
	cmdict[sys.argv[1]](*sys.argv[2:])

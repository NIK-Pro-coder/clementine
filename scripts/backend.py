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

HOOK_URL="https://discord.com/api/webhooks/1318505561268158475/0hQswuLjik9jhTnz6a_gmdCWp_ritjZmm_6i_8NOOHm5hJ-awndiYUbaWOLgJMcw-pG7"

@addEntry
def hook(nome, classe, numero, consegna) :
	global hookUrl

	text = f"{nome} vuole {numero} clementine"
	if consegna == "true" :
		text += f" consegnate in {classe}"

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

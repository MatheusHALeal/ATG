import requests	
import json

a = requests.get("http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=6cdc036afa25edf9ffa2f4b26794ebc5&format=json")
v = json.dumps(a.json())
d = json.loads(v)

topMundo = []
for i in range(len(d['artists']['artist'])):
	topMundo.append(d['artists']['artist'][i]['name'])




req = requests.get("http://ws.audioscrobbler.com/2.0/?method=user.getweeklyartistchart&user=thematheusm&api_key=6cdc036afa25edf9ffa2f4b26794ebc5&format=json")
temp = json.dumps(req.json())
user = json.loads(temp)
for i in range(len(user['weeklyartistchart']['artist'])):
	print user['weeklyartistchart']['artist'][i]['name']


---
---
#/usr/bin/python
import urllib, urllib2
import csv
import os
import json
from datetime import datetime
import string

def readfile(filename):
  with open(filename, 'r') as f:
    read_data = f.read()
  f.closed
  return read_data

def writefile(file_name, buf):
  myFile = open(file_name, 'w')
  myFile.write(buf)
  myFile.close()

def url2file(url,file_name):
  req = urllib2.Request(url)
  try:
    rsp = urllib2.urlopen(req)
  except urllib2.HTTPError, err:
    print str(err.code) + " " + url
    return
  myFile = open(file_name, 'w')
  myFile.write(rsp.read())
  myFile.close()

def clean_osm(source,dest):
  osm = json.loads(readfile(source))
  geojson = { "type": "FeatureCollection", "features": [ ] }

  for item in osm['elements']:
    feature = {"type": "Feature", "geometry": { "type": "Point", "coordinates": [ item['lon'], item['lat']]}}

    properties = {}
    for osm_property in item['tags'].keys():
      properties[ "osm:" + osm_property ] = item['tags'][ osm_property ]
    if 'user' in item:
        properties[ "osm:_user" ] = item['user']
    if 'timestamp' in item:
        properties[ "osm:_timestamp" ] = datetime.strptime(item['timestamp'],'%Y-%m-%dT%H:%M:%SZ').strftime('%Y-%m-%d')
    properties[ "osm:id" ] = item['id'] #TODO change to "_id"?

    feature['properties'] = properties
    geojson['features'].append(feature)

  dump = json.dumps(geojson, sort_keys=True, indent=2)
  writefile(dest,dump)

if os.path.exists('trigger'):
  os.remove('trigger')
  {% for post in site.posts %}{% if post.query %}
  url2file("{{post.query}}","tmp-osm.json")
  clean_osm("tmp-osm.json", "{{post.geojson}}")
  {% endif %}{% endfor %}

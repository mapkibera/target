---
---
#/usr/bin/python
import urllib, urllib2
import csv
import os
import geojson
from geojson import MultiPoint
from datetime import datetime
import string
from PIL import Image
from copy import deepcopy

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

def sync_osm():
  kibera = "36.7651,-1.3211,36.8178,-1.3009"
  mathare = "36.8430,-1.2679,36.8790,-1.2489"
  kangemi = "36.71167,-1.28065,36.82926,-1.20960"
  mathare = "36.8427,-1.2673,36.8792,-1.2479"
  url_base = "http://overpass-api.de/api/interpreter?data=[bbox];node['education:type'];out%20meta;&bbox="
  url2file(url_base + kibera,"kibera-schools-osm.xml")
  url_base = "http://overpass-api.de/api/interpreter?data=[bbox];node[amenity='school'];out%20meta;&bbox="
  url2file(url_base + mathare,"mathare-schools-osm.xml")
  url_base = "http://overpass-api.de/api/interpreter?data=[bbox];node[amenity='school'](newer:'2018-10-08T00:00:00Z');out%20meta;&bbox="
  url2file(url_base + kangemi,"kangemi-schools-osm.xml")

def clean_osm(file):
  osm = geojson.loads(readfile(file))

  for feature in osm.features:
    properties = {}
    #properties = feature.properties
    for osm_property in feature.properties['tags'].keys():
      properties[ "osm:" + osm_property ] = feature.properties['tags'][ osm_property ]
    if 'user' in feature.properties['meta']:
        properties[ "osm:_user" ] = feature.properties['meta']['user']
    if 'timestamp' in feature.properties['meta']:
        properties[ "osm:_timestamp" ] = datetime.strptime(feature.properties['meta']['timestamp'],'%Y-%m-%dT%H:%M:%SZ').strftime('%Y-%m-%d')
    properties[ "osm:id" ] = feature['id'] #TODO change to "_id"?
    properties[ "osm:location" ] = os.path.splitext(os.path.basename(file))[0].split('-')[0]

    feature.properties = properties

  dump = geojson.dumps(osm, sort_keys=True, indent=2)
  writefile(file,dump)

if os.path.exists('trigger'):
  os.remove('trigger')       
  {% for post in site.posts %}{% if post.query %}
  url2file("{{post.query}}","tmp-osm.xml")
  os.system("osmtogeojson -e tmp-osm.xml > {{post.geojson}}")
  clean_osm("{{post.geojson}}")
  {% endif %}{% endfor %}

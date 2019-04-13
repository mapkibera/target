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

def clean_osm(file):
  osm = geojson.loads(readfile(file))

  for feature in osm.features:
    properties = {}
    #properties = feature.properties
    for osm_property in feature.properties.keys():
      properties[ "osm:" + osm_property ] = feature.properties[ osm_property ]
    #if 'user' in feature.properties['meta']:
    #    properties[ "osm:_user" ] = feature.properties['meta']['user']
    #if 'timestamp' in feature.properties['meta']:
    #    properties[ "osm:_timestamp" ] = datetime.strptime(feature.properties['meta']['timestamp'],'%Y-%m-%dT%H:%M:%SZ').strftime('%Y-%m-%d')
    #properties[ "osm:id" ] = feature['id'] #TODO change to "_id"?
    #properties[ "osm:location" ] = os.path.splitext(os.path.basename(file))[0].split('-')[0]

    feature.properties = properties

  dump = geojson.dumps(osm, sort_keys=True, indent=2)
  writefile(file,dump)

#url2file("https://docs.google.com/spreadsheets/d/15AlGgcWiMAWYWvYiU93kFotOzgbsa0ReI3F0hiSdl88/export?format=csv&id=15AlGgcWiMAWYWvYiU93kFotOzgbsa0ReI3F0hiSdl88&gid=1451579495", "mathare-schools.csv")

os.system("csv2geojson mathare-schools.csv > mathare-schools.geojson")
clean_osm('mathare-schools.geojson')

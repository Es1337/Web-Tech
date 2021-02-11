#!/usr/bin/python3
import sys 
sys.stderr = sys.stdout 
import os 
from html import escape 
  
print ("Content-type: text/html" )
print ("")
print ("<html><head><title>CGI ENV from python</title></head><body><p>" )
print ("Running:") 
print ("<b>Python %s</b><br><br>" %(sys.version)) 
print ("Environmental variables:<br>" )
print ("<ul>") 
for k in sorted(os.environ): 
  print ("<li><b>%s:</b>\t\t%s</li><br>" %(escape(k), escape(os.environ[k])) )
  print ("</ul></p></body></html>")
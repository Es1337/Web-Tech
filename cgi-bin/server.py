#!/usr/bin/python3
from lxml import etree
import cgi

form = cgi.FieldStorage()
sort = form.getvalue("sort", "title")
xmlfile = open('../TI_lab6/lab2.xml')
xslfile = open('../TI_lab6/lab3.xsl')
xmldom = etree.parse(xmlfile)
xsldom = etree.parse(xslfile)
transform = etree.XSLT(xsldom)

print ("Content-type: text/html")
print ()
print ("<!DOCTYPE html>")

if sort == "autor":
    result = transform(xmldom, sortby="'autor'")
else:
    result = transform(xmldom, sortby="'tytul'")

print (result)

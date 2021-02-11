#!/usr/bin/python3
import cgi

form = cgi.FieldStorage()
option = form.getvalue("option", "(no data)")
if option == "1":
    filename = "opcje1.xml"
if option == "2":
    filename = "opcje2.xml"
else:
    filename = "opcje1.xml"


print ("Content-Type: application/xml")
print ("")

f = open("../TI_lab7b/" + filename, "r")

for line in f:
    print(line)

f.close()
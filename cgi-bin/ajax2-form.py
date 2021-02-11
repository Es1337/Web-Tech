#!/usr/bin/python3
import cgi
import socket
import time

f = open("../TI_lab5/records.txt", "a")

form = cgi.FieldStorage()
text1 = form.getvalue("tytul","(no data)")
text2 = form.getvalue("autor","(no data)")

hostname = socket.gethostname()
ip = socket.gethostbyname(hostname)

timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

f.write(f"{text1};{text2};{timestamp};{ip};\n")
f.close()

print("Content-Type: text/html")
print("")
print("<br/>Wpisano<br/>")
print("<a href=\"../TI_lab7/index.html\">Wroc</a>")
#!/usr/bin/python3
import cgi
import socket
import time

f = open("../TI_lab5/records.txt", "a")

form = cgi.FieldStorage()
hostname = socket.gethostname()
ip = socket.gethostbyname(hostname)
text1 = form.getvalue("tytul","(no data)")
text2 = form.getvalue("autor","(no data)")
timestamp = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
f.write(f"{text1};{text2};{timestamp};{ip};\n")
f.close()

print ("Content-type: text/html")
print ()
print ("<!DOCTYPE html>")
print ("<html><head>")
print ("""<style>table {
  background-color: #e5ffe2;
  border: solid black 1px;
}

table thead {
  background-color: #fa9790;
}

table tbody tr:nth-child(even) {
  background-color: skyblue;
}

table th {
  text-align: center;
  width: 33%;
}

table td {
  width: 33%;
}</style>""")
print ("<title>Rekordy</title>")
print ("</head><body>")
  
print ("REKORDY DOSTEPNE W BAZIE DANYCH")
print ("<table>")
print ("<tr><th>title</th><th>author</th><th>date</th><th>IP</th></tr>")

r = open("../TI_lab5/records.txt", "r")

for line in r:
    data = line.split(";")
    print (f"<tr><td>{data[0]}</td><td>{data[1]}</td><td>{data[2]}</td><td>{data[3]}</td></tr>")

r.close()

print ("</table>")
print ("</body></html>")
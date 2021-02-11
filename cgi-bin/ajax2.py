#!/usr/bin/python3
import cgi
import socket
import time

print ("Content-Type: text/html")
print ("")

form = cgi.FieldStorage()
mode = form.getvalue("mode", "(no data)")

if mode == "0":
    print("""
            <form action="../cgi-bin/ajax2-form.py" method="post">
                Tytul
                <input type="text" name="tytul">
                <br> 
                Autor
                <input type="text" name="autor">
                <br> 
                <input class="submit-btn" type="submit"> 
            </form>""")
if mode == "1":   
    print ("REKORDY DOSTEPNE W BAZIE DANYCH")
    print ("<table>")
    print ("<tr><th>title</th><th>author</th><th>date</th><th>IP</th></tr>")

    r = open("../TI_lab5/records.txt", "r")

    for line in r:
        data = line.split(";")
        print (f"<tr><td>{data[0]}</td><td>{data[1]}</td><td>{data[2]}</td><td>{data[3]}</td></tr>")

    r.close()

    print ("</table>")
else:
    print("")

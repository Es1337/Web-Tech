#!/usr/bin/python3

print ("Content-Type: text/html")
print ("")

print ("<br/>")
print ("REKORDY DOSTEPNE W BAZIE DANYCH")
print ("<table>")
print ("<tr><th>x</th><th>y</th><th>radius</th><th>color</th></tr>")

r = open("../zad01/circles.txt", "r")

for line in r:
    data = line.split(";")
    print (f"<tr><td>{data[0]}</td><td>{data[1]}</td><td>{data[2]}</td><td>{data[3]}</td>")
    print ("<td><input type=\"button\" class=\"draw-btn\" value=\"Rysuj\" onclick=\"#\"/></td></tr>")

r.close()

print ("</table>")

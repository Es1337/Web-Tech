#!/usr/bin/python3
import cgi
import os

print ("Content-Type: text/html")
print ("")

path = "../zad01/circles.txt"
os.system('chmod 777 ../zad01/circles.txt')

form = cgi.FieldStorage()
x = form.getvalue("x","(no data)")
y = form.getvalue("y","(no data)")
radius = form.getvalue("r","(no data)")
color = form.getvalue("c","(no data)")

f = open(path, "a")

f.write(f"{x};{y};{radius};{color};\n")
f.close()

print("Wpisano")

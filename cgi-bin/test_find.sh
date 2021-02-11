#!/bin/sh
echo "Content-Type: text/html"
echo
echo "<html><body>"
echo "<p>"
echo "skrypt znajdujący wzorzec podany w QUERY_STRING w plikach w katalogu bieżącym"
echo "<p>"
SLOWO=`echo "$QUERY_STRING" | sed s/^.*=//`
echo "Poszukiwanie $SLOWO... w `pwd`"
echo "<ul>"
grep -rli "$QUERY_STRING" * |
while read f
do
  echo "<li><a href=\"$f\">$f</a></li>"
done
echo "</ul>"
echo "OK"
echo "</body></html>"

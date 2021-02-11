#include <stdio.h>
#include <stdlib.h>
int main( void )
{
       
printf("Content-type: text/html\n\n");  /* generaja naglowka czastkowego */
       
printf("<html><head><title>Przyklad 1</title></head>\n");  /* Wydruk kodu HTML na STDOUT */
printf("<body><h2>Przyklad 1</h2><br>\n");
       
printf("Nazwa serwera klienta: %s<br>\n", getenv("REMOTE_HOST") );  /* Pobranie informacji o kliencie */
printf("Adres IP klienta: %s<p>\n", getenv("REMOTE_ADDR") );
       
printf("Nazwa serwera: %s<br>\n", getenv("SERVER_NAME") );  /* dane serwera przechowywane w zmiennych srodowiskowych */
printf("Oprogramowanie na serwerze: %s<br>\n", getenv("SERVER_SOFTWARE") );
printf("Protokol serwera WWW: %s<br>\n", getenv("SERVER_PROTOCOL") );
printf("Numer portu na serwerze: %s<br>\n", getenv("SERVER_PORT") );
printf("</body>\n</html>\n");
return(0);
}

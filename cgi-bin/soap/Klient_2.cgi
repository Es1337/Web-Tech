#!/usr/bin/perl -w
    
  use SOAP::Lite;
  print "Content-type: text/html\n\n";  
  
  print SOAP::Lite                                             
    -> uri('http://pascal.fis.agh.edu.pl/Demo')                     
    -> proxy('http://pascal.fis.agh.edu.pl/~8kusm/cgi-bin/soap/Serwer_2.cgi')
    -> hi()                                                    
    -> result;
  print "\n";
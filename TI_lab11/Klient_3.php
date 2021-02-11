<?php
$client = new SoapClient(null, array(
      'location' => "http://pascal.fis.agh.edu.pl/~8kusm/cgi-bin/soap/Serwer_3.cgi",
      'uri'      => "//pascal.fis.agh.edu.pl/SoapServer",
      'soap_version' => SOAP_1_1 ,
      'trace'    => 0 ));
  
   $add = $client->__soapCall("add",array(1, 2));
   echo("\nAdd(1,2): ".$add);
   echo("<p/>");

   $subtract = $client->__soapCall("subtract",array(1, 2));
   echo("\nSubtract(1,2): ".$subtract);
   echo("<p/>");

   $multiply = $client->__soapCall("multiply",array(1, 2));
   echo("\nMultiply(1,2): ".$multiply);
   echo("<p/>");

   $divide = $client->__soapCall("divide",array(1, 2));
   echo("\nDivide(1,2): ".$divide);
   echo("<p/>");
    
?>
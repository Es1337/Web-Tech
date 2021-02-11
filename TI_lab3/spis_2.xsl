<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> 
<xsl:template match="/"> 
<html> 
   <head> 
      <title>Dane</title> 
   </head> 
   <body> 
        Lista osob
         <table width="200" border="1"> 
           
            <tbody> 
            <xsl:for-each select="dane/miasto"> 
               <tr> 
                  <th colspan="2" align="center"><xsl:value-of select="nazwa"/></th> 
               </tr> 
                             <xsl:for-each select="osoba">
               <tr> 
                  <td align="right">pesel:</td> 
                  <td align="center"><xsl:value-of select="@pesel"/></td> 
               </tr> 
                              
               <xsl:for-each select="imie">
                             <tr> 
                                 
                  <td align="right">Imie:</td> 
                  <td align="center"><xsl:value-of select="text()"/></td>
                                     
               </tr> 
               </xsl:for-each> 
               <tr> 
                  <td align="right">Nazwisko:</td> 
                  <td align="center"><xsl:value-of select="nazwisko"/></td> 
               </tr> 
               </xsl:for-each>  
                
              </xsl:for-each> 
             </tbody> 
           
         </table> 
         <br/> 
  
   </body> 
</html>  
</xsl:template> 
</xsl:stylesheet>
<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> 
<xsl:template match="/"> 
<html> 
   <head> 
      <title>Dane</title> 
   </head> 
   <body> 
        Lista osob
        <br/>
        <table width="200" border="1"> 
            <thead><th colspan="4" align="center">UCZNIOWIE</th></thead>
            <tbody>
                <xsl:for-each select="dane/osoba[@rodzaj='uczen']">   
                    <tr> 
                        <th align="right">Imie:</th> 
                        <td align="center"><xsl:value-of select="imie"/></td> 
                        <th align="right">Nazwisko:</th> 
                        <td align="center"><xsl:value-of select="nazwisko"/></td> 
                    </tr>                                      
                </xsl:for-each>
            </tbody> 
        </table> 
        <br/>
        <table width="200" border="1"> 
        <thead><th colspan="3" align="center">NAUCZYCIELE</th></thead>
        <tbody>
            <tr> 
                <th align="center">Imie</th> 
                <th align="center">Nazwisko</th> 
                <th align="center">Miasto</th> 
            </tr>   
            <xsl:for-each select="dane/osoba[@rodzaj='nauczyciel']">   
                <tr> 
                    <td align="center"><xsl:value-of select="imie"/></td> 
                    <td align="center"><xsl:value-of select="nazwisko"/></td> 
                    <td align="center"><xsl:value-of select="miasto"/></td> 
                </tr>                                      
            </xsl:for-each>  
        </tbody> 
        </table>  
        <br/>
   </body> 
</html>  
</xsl:template> 
</xsl:stylesheet>
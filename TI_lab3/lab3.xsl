<?xml version="1.0" encoding="UTF-8"?> 
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"> 
<xsl:template match="/"> 
<html> 
   <head> 
      <title>Biblioteka</title>
      <link rel="stylesheet" type="text/css" href="biblioteka.css" /> 
   </head> 
   <body>
       BIBLIOTEKA
       <br/>
       <xsl:for-each select="biblioteka/dzial">
        <xsl:sort select="nazwa-el"/>
            <br/>
            <table width="600" border="1" class="{@nazwa}">
                <thead>
                    <th colspan="8" align="center"><xsl:value-of select="nazwa-el"/></th>
                </thead>
                <tbody>
                    <tr class="ksiazka">
                        <th align="right">Autor:</th> 
                        <th align="right">Tytuł:</th> 
                        <th align="right">Cena:</th> 
                    </tr>
                    <xsl:for-each select="ksiazka">
                        <xsl:sort select="autor/nazwisko"/>
                        <tr class="ksiazka"> 
                            <td align="center" class="autor">
                                <xsl:for-each select="autor">
                                    <a/> 
                                    <xsl:value-of select="imie"/>
                                    <a/>                    
                                    <xsl:value-of select="nazwisko"/>
                                    <a/>  
                                </xsl:for-each> 
                            </td> 
                            <td align="center" colspan="1" class="tytul">
                                <xsl:value-of select="tytul"/>
                            </td>
                            <td align="center" colspan="1" class="cena">
                                <xsl:value-of select="cena"/>
                            </td>                            
                        </tr>
                        <tr>
                        </tr>
                        <tr>
                        </tr>
                    </xsl:for-each>
                </tbody>
            </table>
       </xsl:for-each>
   </body> 
</html>  
</xsl:template> 
</xsl:stylesheet>
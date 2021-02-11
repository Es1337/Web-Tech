<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<xsl:output method="html" version="1.0"
     indent="yes" doctype-system="about:legacy-compact" />
<!-- szablon dopasowujacy sie do korzenia dokumentu XML -->
<xsl:template match="/">
        <html>
            <head>
                <title>
                    Lista osob
                </title>
            </head>
            <body>
                <h1>
                    Spis osob
                </h1>
                <table>
                <tr><th>miasto</th><th>imie</th><th>nazwisko</th><th>pesel</th><th>status</th></tr>
                <!-- wyszukiwanie wezlow osoba w dokumencie XML -->
                <xsl:apply-templates select="//osoba" />
                </table>
            </body>
        </html>
</xsl:template>
<!-- szablon dopasowujacy sie do wezla osoba -->
<xsl:template match="osoba">
  <tr>
    <!-- odwolanie do wezla powyzej -->
     <td><xsl:value-of select="../nazwa" /></td>
   <td><xsl:value-of select="imie" /></td>
   <td><xsl:value-of select="nazwisko" /></td>
     <!-- odwolanie do atrybutu -->
     <td><xsl:value-of select="@pesel"/></td>
   <td><xsl:value-of select="status" /></td>
  </tr>
</xsl:template>
</xsl:stylesheet>
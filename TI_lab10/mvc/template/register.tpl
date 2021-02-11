<form name="form">            
  <table>
    <tr><td><label for="email">Email:</label></td>
    <td><input value="<?php if(isset($formData)) echo $formData['email']; ?>" type="text" id="email" name="email" /></td></tr>
    <tr><td><label for="pass">Hasło:</label></td>
    <td><input value="<?php if(isset($formData)) echo $formData['pass']; ?>" type="pass" id="pass" name="pass" /></td></tr>
    <tr><td><span id="data"><input type="button" value="Zapisz" onclick="fn_register()" /></span></td>
    <td><span id="response"></span></td></tr>
  </table>
</form> 
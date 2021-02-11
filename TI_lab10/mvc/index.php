<?php
      try {
         function __autoload($class_name) {
           if       ( file_exists($path = 'baza/class/'.$class_name.'.php')) {
              include 'baza/class/'.$class_name.'.php' ;
           } elseif ( file_exists($path = 'info/class/'.$class_name.'.php')) {
              include 'info/class/'.$class_name.'.php' ;
           } elseif ( file_exists($path = 'test/class/'.$class_name.'.php')) {
              include 'test/class/'.$class_name.'.php' ;
           } elseif ( file_exists($path = 'users/class/'.$class_name.'.php')) {
              include 'users/class/'.$class_name.'.php' ;
           } elseif ( file_exists($path = 'appl/'.$class_name.'.php')) {
              include 'appl/'.$class_name.'.php' ;
           } else {
              controller::http404() ;
           }
         } 
         
       }
       catch (Exception $e) {
         echo 'Blad: [' . $e->getCode() . '] ' . $e->getMessage() ;
       }

   $user = new users ;
   if($user->_is_logged())
   {
        if (empty ($_GET['sub']))    { $contr = 'info' ;   }
        else                         { $contr = $_GET['sub'] ; }
        if (empty ($_GET['action'])) { $action     = 'index' ;  }
        else                         { $action     = $_GET['action'] ; } 
         
        // print $contr. ' ' . $action ;
        $controller = new $contr() ;
        echo $controller->$action() ;
   }
   else
   {
         if (empty ($_GET['sub']))    { $contr = 'users' ;   }
         else                         { $contr = $_GET['sub'] ; }
         if (empty ($_GET['action'])) { $action     = 'loginScreen' ;  }
         else                         { $action     = $_GET['action'] ; } 
          
         // print $contr. ' ' . $action ;
         $controller = new $contr() ;    
         echo $controller->$action() ;
   }
 
?>
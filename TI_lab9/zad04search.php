<?php
    function __autoload($class_name) {
        include $class_name . '.php' ;
        }
        $user = new Register_new;
        $email_search = $_POST['email'] ;
        if ( $user->_is_logged() ) {
            $table = $user->_read_all();
            echo "<table>" ;
            foreach ( $table as $key => $record ) {
                if($record['email'] == $email_search) {
                    echo
                    "JEST";
                }
                else
                    echo "Nie ma";
            }
            echo "</table>" ;
            echo "<p><a href='zad04.php'>Powrot do programu glownego</a></p>";
        }
?>
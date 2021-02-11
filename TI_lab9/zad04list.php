<?php
    function __autoload($class_name) {
        include $class_name . '.php' ;
    }

    $user = new Register_new ;
    $blog = new Blog ;
    if ( $user->_is_logged() ) {
        $table = $blog->_read_messages();
        echo "Informacje uzytkownika ".$_SESSION['user']."</br>" ;

        foreach ( $table as $key => $record ) {
            $date = date('D Y-m-d H:i', $record['key'] - $_SESSION['user']);
            echo "&emsp;".$date."</br>".$record['text']."</br>";
        }

        echo "<p><a href='zad04new.html'>Nowy wpis</a></p>";
        echo "<p><a href='zad04.php'>Powrot do programu glownego</a></p>";
    }
?>
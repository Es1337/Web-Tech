<?php
    function __autoload($class_name) {
        include $class_name . '.php' ;
    }
    $user = new Register_new;
    $blog = new Blog;
    
    if ( $user->_is_logged() ) {
        $blog->_read();
        $blog->_save_messages();
    }
    echo "<p><a href='zad04list.php'>Lista wpisow</a></p>";
    echo "<p><a href='zad04.php'>Powrot do programu glownego</a></p>";
?>
<?php
class model3 
{
    static $dsn = 'sqlite:sql/users.db' ;
    protected static $db ;
    private $sth ;
 
    function __construct()
    {
        session_start() ;
        self::$db = new PDO ( self::$dsn ) ;//interfejs języka PHP przeznaczony do komunikacji z bazami danych
        self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION) ;
    }
    
    public function listAll()
    {
        $this->sth = self::$db->prepare('SELECT * FROM users') ;
        $this->sth->execute() ;
        $result = $this->sth->fetchAll() ;
        return $result ;
    }

    public function register($obj)
    {
        $pass = md5($obj->pass) ;
        $this->sth = self::$db->prepare('INSERT INTO users VALUES ( :username, :pass)');
        $this->sth->bindValue(':username',$obj->email,PDO::PARAM_STR) ; 
        $this->sth->bindValue(':pass', $pass,PDO::PARAM_STR) ; 
        $resp = ( $this->sth->execute() ? 'true' : 'false' ) ;
        return $resp ; 
    }

    public function login($obj)
    {
        $email = $obj->email ;
        $pass = md5($obj->pass) ;
        $access = false ;

        $this->sth = self::$db->prepare('SELECT COUNT(*) as count FROM users u WHERE :username == u.username AND :pass == u.pass');
        $this->sth->bindValue(':username',$email,PDO::PARAM_STR) ; 
        $this->sth->bindValue(':pass',$pass,PDO::PARAM_STR) ; 
        $this->sth->execute() ;
        $resp = ($this->sth->fetch(PDO::FETCH_ASSOC)) ;

        if ( $resp[count] ) {
                $_SESSION['auth'] = 'OK' ;
                $_SESSION['user'] = $email ;
                $access = true ;
        }

        $text = ( $access ? 'Uzytkownik zalogowany' : ' Uzytkownik niezalogowany ' ) ;
        return $text ;
    }

}
?>
<?php 
 
class users extends controller 
{
    protected $layout ;
    protected $model ;
 
    function __construct() {
       parent::__construct() ;
       $this->layout = new view('main') ;
       $this->model  = new model3 ;
       $this->layout->css = $this->css ;
       $this->layout->menu = $this->menu ;
       $this->layout->title  = 'Baza danych uzytkownikow' ;
    }
 
    function listAll() {
       $this->layout->header = 'Lista wszystkich uzytkownikow' ;
       $this->view = new view('listAllUsers') ;
       $this->view->data = $this->model->listAll() ;
       $this->layout->content = $this->view ; 
       return $this->layout ;
    }
    
    function index() {
        return $this->listAll() ;
    }
      
          
    function registerScreen() {
        $this->layout->header = 'Register' ;
        $this->view = new view('register') ;
        $this->layout->content = $this->view ;
        return $this->layout ;
    }

    function loginScreen() {
        $this->layout->header = 'Login' ;
        $this->view = new view('login') ;
        $this->layout->content = $this->view ;
        return $this->layout ;
    }

    function login() {
        $data = $_POST['data'] ;
        $obj  = json_decode($data) ;
        if ( isset($obj->email) and isset($obj->pass)) {    
             $response = $this->model->login($obj) ;
        }
        return ($response == 'true' ? "Zalogowano" : "Blad") ;
    }
      
    function register() {
        $data = $_POST['data'] ;
        $obj  = json_decode($data) ;
        echo $obj->email + $obj->pass + " <p>"; 
        if ( isset($obj->email) and isset($obj->pass) ) { 
             $response = $this->model->register($obj) ;
        }
        return ( $response ? "Zarejestrowano" : "Blad " ) ;
    }
    
    function _is_logged() {
        if ( isset ( $_SESSION['auth'] ) ) 
        {
            $ret = $_SESSION['auth'] == 'OK' ? true : false ;
        } 
        else 
        { 
            $ret = false ; 
        }

        return $ret ;
    }

    function _logout() {
        unset($_SESSION);
        session_destroy();
        $text = 'Uzytkownik wylogowany ' ;

        return $text ;
    }
}
 
?>
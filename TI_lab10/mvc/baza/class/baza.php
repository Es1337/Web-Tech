<?php 
 
class baza extends controller 
{
 
    protected $layout ;
    protected $model ;
 
    function __construct() {
       parent::__construct() ;
       $this->layout = new view('main') ;
       $this->model  = new model2 ;
       $this->layout->css = $this->css ;
       $this->layout->menu = $this->menu ;
       $this->layout->title  = 'Baza danych SQL' ;
    }
 
    function listAll() {
       $this->layout->header = 'Lista wszystkich rekordow' ;
       $this->view = new view('listAll') ;
       $this->view->data = $this->model->listAll() ;
       $this->layout->content = $this->view ; 
       return $this->layout ;
    }
    
    function index() {
        return $this->listAll() ;
    }
      
          
    function insertRec() {
        $this->layout->header = 'Wprowadzanie danych do bazy' ;
        $this->view = new view('form') ;
        $this->layout->content = $this->view ;
        return $this->layout ;
    }

    function searchRec() {
        $this->layout->header = 'Wyszukiwanie uzytkownika w bazie' ;
        $this->view = new view('search') ;
        $this->layout->content = $this->view ;
        return $this->layout ;
    }

    function findRec() {
        $data = $_POST['data'] ;
        $obj  = json_decode($data) ;
        if ( isset($obj->fname) and isset($obj->lname) and isset($obj->city)  ) {    
             $response = $this->model->findRec($obj) ;
        }
        return ($response == 'true' ? "JEST" : "NIE MA") ;
    }
      
    function saveRec() {
        $data = $_POST['data'] ;
        $obj  = json_decode($data) ;
        if ( isset($obj->fname) and isset($obj->lname) and isset($obj->city)  ) {    
             $response = $this->model->saveRec($obj) ;
        }
        return ( $response ? "Dodano rekord" : "Blad " ) ;
    }
}
 
?>
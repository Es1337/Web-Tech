<?php
    class Blog implements NoteInterface {
        protected $data = array();
        private $dbh;
        private $dbfile = "files/notes.db";
        function __construct () {
            session_start();
        }
        public function _read() {
            $this->data['key'] = $_SERVER['REQUEST_TIME'] + $_SESSION['user']; 
            $this->data['text'] = $_POST['text-field'] ;
        }

        public function _save_messages() {
            $this->dbh = dba_open( $this->dbfile, "c");

            if ( !dba_exists($this->data['key'], $this->dbh )) {
                $serialized_data = serialize($this->data) ;
                dba_insert($this->data['key'], $serialized_data, $this->dbh) ;
                $text = 'Dane zostaly zapisane' ;
            } 
            else {
                $text = 'Dane nie wpisane' ;
            }
            dba_close($this->dbh) ;
            return $text;
        }

        public function _read_messages() {
            $table = array();
            $this->dbh = dba_open( $this->dbfile, "r");

            $key = dba_firstkey($this->dbh);
            while ($key) {
                $serialized_data = dba_fetch($key, $this->dbh) ;
                $this->data = unserialize($serialized_data);
                $table[$key]['key'] = $this->data['key'];
                $table[$key]['text'] = $this->data['text'];
                $key = dba_nextkey($this->dbh);
            }
            dba_close($this->dbh) ;
            return $table;
        }
    }
?>
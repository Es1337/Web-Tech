<table border="1">
 <?php 
    if ($data) { 
       foreach ( $data as $row ) { 
       echo '<tr><td>'.$row['username'].'</td><td>'.$row['pass'].'</td></tr>' ;
    }}
 ?> 
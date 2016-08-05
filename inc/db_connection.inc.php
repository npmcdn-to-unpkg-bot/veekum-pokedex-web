<?php
set_time_limit(45);

function connect(){
  $conn = mysqli_connect("localhost", "root", "qwerty123", "pokedex");
  if( $conn ) {
    mysqli_set_charset($conn, "utf8");
    return $conn;
  }else{
      //sqlError($sql, $conn);
    return false;
  }
}

function iniciaTransaction($conn){
  if ( mysqli_begin_transaction( $conn ) === false ) {
    return false;
  }else{
    return true;
  }
}

function queery($sql){
  $conn = connect();
  $result = mysqli_query($conn, $sql);
  if($result === false){
    //sqlError($sql, $conn);
    return false;
  }else{
    return true;
  }
  mysqli_free_result($result);
}

function sql2arr($sql){
  $conn = connect();
  $result = mysqli_query($conn, $sql);
  if($result === false){
    //sqlError($sql, $conn);
    return false;
  }else{
    $arrayResult = array();
    while( $row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
      $arrayResult[]=$row;    
    }
    mysqli_close($conn);
    if(sizeof($arrayResult)>0){
      return $arrayResult;
    }else{
      return false;
    }
  }
  mysqli_free_result($result);
}

function sql2arrTrans($sql, $conn){
  $result = mysqli_query($conn, $sql, array(), array( "Scrollable" => 'keyset' ));  
  if($result === false){
    //sqlError($sql, $conn);
    return false;
  }else{
    $arrayResult = array();
    while( $row = mysqli_fetch_array($result, MYSQLI_ASSOC))
    {
      $arrayResult[]=$row;    
    }
    If(sizeof($arrayResult)>0){
      return $arrayResult;
    }else{
      return false;
    }
  }
  mysqli_free_result($result); 
}

function executeQuery($sql){
  $conn = connect();
  $stmt = mysqli_prepare( $conn, $sql);
  if(mysqli_execute($stmt) === false) {
    //sqlError($sql, $conn);
      return false;
    }else{
    mysqli_close($conn);
    return true;
  }
}

function executeQueryTrans($sql, $conn){
  $stmt = mysqli_prepare( $conn, $sql);
  if(mysqli_execute($stmt) === false) {
        //sqlError($sql, $conn);
    return false;
  }else{
    return true;
  }
}
  
function numRows($sql) {
  $result = mysqli_query($conn, $sql);
  $rowcount = mysqli_num_rows($result);
  return $rowcount; 
}

function sqlError($sql, $conn){
  if(($error = mysqli_error($conn)) != null) {
    customError("SQL", $error, __FILE__, $sql);
  }
  mysqli_close($conn);
}

function rollback($conn){
  mysqli_rollback($conn);
  mysqli_close($conn);
}

function commit($conn){
   mysqli_commit($conn);
   mysqli_close($conn);
}

?>
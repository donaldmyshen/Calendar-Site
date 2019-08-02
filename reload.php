<?php
    require 'database.php';
	//Session cookie is HTTP-Only
	ini_set("session.cookie_httponly", 1);
    session_start();
    header("Content-Type: application/json");
    if(isset($_SESSION['token']) == false){
        echo json_encode(
            array(
                "success"=>false,
                "why"=> "Please login first")
        );
        exit();
    }
    // check the username
    $username = htmlentities($_SESSION['username']);
    if (mysqli_num_rows(mysqli_query($mysqli, "select username from users where username = '$username'" )) == 0){
        echo json_encode(
            array(
                "success"=>false,
                "why"=> "username doesn't exist or password is wrong")
        );
        exit();
    }
    
    else{
        echo json_encode(
            array(
                "success"=>true,
                "username" => $_SESSION['username'],
                "token"=> $_SESSION['token'],
                "why"=> "Successfully")
            );
        exit();
    }
?>
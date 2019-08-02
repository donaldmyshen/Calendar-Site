<?php
	require 'database.php';
	//Session cookie is HTTP-Only
	ini_set("session.cookie_httponly", 1);
    session_start();
    header("Content-Type: application/json");
    $token = htmlentities($_POST["token"]);
    if(isset($_SESSION['token']) == false){
        echo json_encode(
			array(
				"success"=>false,
				"why"=> "Please login first"
				));
        exit();
    }
	
    $user = htmlentities($_SESSION['username']);
	$name = htmlentities($_POST["event_name"]);
	$user_share = htmlentities($_POST["user_share"]);
	$event_year = htmlentities($_POST["event_year"]);
	$event_month = htmlentities($_POST["event_month"]);
	$event_day = htmlentities($_POST["event_day"]);
	$event_hour = htmlentities($_POST["event_hour"]);
	$event_minute = htmlentities($_POST["event_minute"]);
	$tag = htmlentities($_POST["tag"]);

	if($user_share != ""){
	if(mysqli_num_rows(mysqli_query($mysqli, "select username from users where username = '$user_share'" )) ==0){
        echo json_encode(array(
	    "success" => false,
        "why" => "User doesn't exist"
	));
       exit;
    }}
	if($user_share ===$user){
		echo json_encode(array(
	    "success" => false,
        "why" => "You can't share event with yourself"
	));
       exit;
	}
	
	
    if(mysqli_num_rows(mysqli_query($mysqli, "select event_name from events where event_name = '$name'" )) ==1){
        echo json_encode(array(
	    "success" => false,
        "why" => "Event already exists"
	));
       exit;
    }

	
    // insert the event
	$stmt = $mysqli->prepare("insert into events (username,  event_name, event_year,  event_month, event_day, 
													event_hour, event_minute, tag, user_share)
										values ('$user', '$name', '$event_year', '$event_month', '$event_day',
													'$event_hour',  '$event_minute', '$tag', '$user_share')");
    if(!$stmt){
        echo json_encode(
			array(
				"success" => false,
				"why" => "Sorry, please try again"
			));
    }
    else{
        echo json_encode(
			array(
				"success" => true,
				"username" => $_SESSION['username'],
				"why"=>"event created"
			));
    }
    $stmt->execute();
    $stmt->close();
    exit();
?>
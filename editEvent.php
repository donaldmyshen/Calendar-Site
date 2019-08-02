<?php
	require 'database.php';
	//Session cookie is HTTP-Only
	ini_set("session.cookie_httponly", 1);
    session_start();
    header("Content-Type: application/json");
    $token = htmlentities($_POST["token"]);
    if (isset($_SESSION['token']) == false){
        echo json_encode(
			array("success"=>false,
            "why"=> "Request forgery detected!"
             ));
        exit();
    }
    $user = htmlentities($_SESSION['username']);
	$name = htmlentities($_POST["new_name"]);
	$user_share = htmlentities($_POST["new_share"]);
	if ($user_share != ""){
		if(mysqli_num_rows(mysqli_query($mysqli, "select username from users where username = '$user_share'" )) ==0){
			echo json_encode(
				array(
					"success" => false,
					"why" => "Username doesn't exist, check again!"
				));
		exit();
		}
	}
	if ($user_share === $user){
		echo json_encode(
			array(
				"success" => false,
				"why" => "You can't share with yourself!"
			));
       exit();
	}
    // check if event exists
    if (mysqli_num_rows(mysqli_query($mysqli, "select event_name from events where event_name = '$name'" )) ==0){
        echo json_encode(
			array(
				"success" => false,
				"why" => "Event doesn't exist!"
			));
       exit();
    }
	$stmt1= $mysqli->prepare("select username from events where event_name=?");
	if(!$stmt1){
        echo json_encode(
			array(
				"success"=>false,
				"why" => $mysqli->error
			));
        exit();
    }
	$stmt1->bind_param('s', $name);
	$stmt1->execute();
	$stmt1->bind_result($user_name);
	$stmt1->fetch();
	$stmt1->close();
	if ($user_name !=$user){
		echo json_encode(
			array(
				"success" => false,
				"why" => "You can't change other's event"
			));
	exit();
	}
    $newEvent_owner = $user;
	$newEvent_year = htmlentities($_POST["new_year"]);
	$newEvent_month = htmlentities($_POST["new_month"]);
	$newEvent_day = htmlentities($_POST["new_day"]);
	$newEvent_hour = htmlentities($_POST["new_hour"]);
	$newEvent_minute = htmlentities($_POST["new_minute"]);
	$new_tag = htmlentities($_POST["new_tag"]);
	
    // insert the event
	$stmt2 = $mysqli->prepare("update events set
							  event_year = '$newEvent_year',
							  event_month = '$newEvent_month',
							  event_day = '$newEvent_day',
							  event_hour = '$newEvent_hour',
							  event_minute = '$newEvent_minute',
							  tag = '$new_tag',
							  user_share = '$user_share'
							  WHERE event_name = '$name' ");
	if (!$stmt2){
		echo json_encode(
			array(
				"success" => false,
				"why" => $mysqli->error
			));
	}
    else {
        echo json_encode(
			array(
				"success" => true,
				"username" => $_SESSION['username'],
				"why"=>"Edit the event successfully"
			));
    }
    $stmt2->execute();
    $stmt2->close();
    exit();
?>
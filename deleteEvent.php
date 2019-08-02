<?php
	require 'database.php';
	//Session cookie is HTTP-Only
	ini_set("session.cookie_httponly", 1);
	session_start();
	if (!isset($_SESSION['username'])) {
		echo json_encode(
			array(
				"success"=>false,
				"why"=> "PLEASE Logine first"
			));
        exit();
	}
	$event_name_delete = htmlentities($_POST['event_name_delete']);
	//check token 
	if(!hash_equals($_SESSION['token'], $_POST['token'])){
		echo json_encode(
			array(
				"success"=>false,
				"why"=> "Request forgery detected "
            ));
        exit();
	}
	// delete the event
	$stmt = $mysqli->prepare("select username from events where event_name= ?");
	if(!$stmt){
		echo json_encode(
			array(
				"success"=>false,
				"why"=> $mysqli->error
			));
			exit();
		}
	$stmt->bind_param('s', $event_name_delete);
	$stmt->execute();
	$stmt->bind_result($user_name);
	$stmt->fetch();
	$stmt->close();
	
	if($_SESSION['username'] === $user_name){
		$stmt1 = $mysqli->prepare("delete from events where event_name= ?");
			if(!$stmt1){
				echo json_encode(
					array(
						"success"=>false,
						"why"=> $mysqli->error
					));
				exit();
			}			

		$stmt1->bind_param('s', $event_name_delete);
		$stmt1->execute();
		$stmt1->close();
		echo json_encode(
			array(
				"success"=>true,
				"why"=> "Delete the event successfully"
			));
		exit();
	}
	else{
		echo json_encode(
			array(
				"success"=>false,
				"why"=> " You can't delete other's event"
			));
		exit();
	}

?>

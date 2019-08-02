<?php
	require 'database.php';
	//Session cookie is HTTP-Only
	ini_set("session.cookie_httponly", 1);
	session_start();
	header("Content-Type: application/json");
	//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
	$json_str = file_get_contents('php://input');
	//This will store the data into an associative array
	$json_obj = json_decode($json_str, true);

	//Variables can be accessed as such:
	$username = $json_obj['username'];
	$pwd= $json_obj['password'];
	// hash password
	$pwd_hash= password_hash($pwd, PASSWORD_BCRYPT);
	// check username

	if ( !preg_match('/^[\w_\-]+$/', $username) ){
		echo json_encode(
			array(
				"success" => false,
				"message" => "Invalid username"
			));
	}

	 
	// Use a prepared statement
	$stmt= $mysqli->prepare("insert into users (username, password) values (?, ?)");
	if (!$stmt) {
		echo json_encode(
			array(
				"success" => false
			));
		exit;
	} else{
		echo json_encode(
			array(
				"success" => true,
				"message" => $pwd,$username
			));
		$stmt->bind_param('ss', $username, $pwd_hash);
		$stmt->execute();
		$stmt->close();
		exit;
	}
?>
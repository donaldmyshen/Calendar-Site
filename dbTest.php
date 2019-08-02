<?php
	require 'database.php';
	session_start();
	// get username password and email
	$username= 'test2';
	$pwd= '1234';
	// hash password
	$pwd_hash= password_hash($pwd, PASSWORD_BCRYPT);
	// insert username pssword email to db
	$stmt= $mysqli->prepare("insert into users (username, password) values (?, ?)");

	if (!$stmt){
		printf("Query Prep Failed: %s\n", $mysqli->error);
		exit;
	}
	 
	$stmt->bind_param('ss', $username, $pwd_hash);
	 
	$stmt->execute();
	 
	$stmt->close();
?>

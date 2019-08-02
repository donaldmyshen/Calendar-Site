<?php
	require 'database.php';
	//Session cookie is HTTP-Only
	session_start();
	header("Content-Type: application/json");
	//Because you are posting the data via fetch(), php has to retrieve it elsewhere.
	$json_str = file_get_contents('php://input');
	//This will store the data into an associative array
	$json_obj = json_decode($json_str, true);

	//Variables can be accessed as such:
	$username = $json_obj['username'];
	$pwd_guess = $json_obj['password'];
	// check username
	
	if ( !preg_match('/^[\w_\-]+$/', $username) ){
		echo json_encode(array(
			"success" => false,
			"message" => "Invalid username"
		));
	}
	
	// Use a prepared statement
	$stmt = $mysqli->prepare("SELECT password FROM users WHERE username=?");
	 
	// Bind the parameter
	$stmt->bind_param('s', $username);
	$stmt->execute();
	 
	// Bind the results
	$stmt->bind_result($pwd_hash);
	$stmt->fetch();
	$bool = password_verify($pwd_guess, $pwd_hash);
	// Compare the submitted password to the actual password hash
	if ($bool) {
		// Login succeeded, go to profile page
		$_SESSION['username'] = $username;
		$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32)); 
		echo json_encode(array(
				"success" => true,
				"username" => $_SESSION['username'],
            	"token"=> $_SESSION['token']
		));
        exit();
	} else{
		echo json_encode(array(
			"success" => false,
			"message" => "Incorrect Username or Password"
		));
		exit;
	}
?>

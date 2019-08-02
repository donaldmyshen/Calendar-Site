<?php
	// connect to database, db username : M3,  psw: 1234, db name: M5
	$mysqli = new mysqli('localhost', 'M3', '1234', 'M5');

	if($mysqli->connect_error) {
		printf("Connection Failed: %s\n", $mysqli->connect_error);
		exit;
	}
?>

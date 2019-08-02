<?php
    session_start();
    header("Content-Type: application/json");
    session_destroy();
    echo json_encode(array("status"=>"success", "why"=>"Log out!","username"=>"null",));
    echo json_encode(array(
			"message" => "not exit"
		));
        exit;
?>
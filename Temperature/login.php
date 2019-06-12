<?php
session_start();
include("config.php");

$data = $_GET;

if(password_verify($data["password"],$password)){
	echo "correct";
	$_SESSION["login"] = "login";
} else {
	echo "IncorrectPsw";
	$_SESSION["login"] = "nologin";
}

?>
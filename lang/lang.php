<?php
//require_once('db.php');
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
session_start();
// If form submitted, insert values into the database.
if (isset($_GET["lang"]))
{
	$json = file_get_contents('facilino_'.$_GET["lang"].'.json');
	//echo json_encode($game_cards);
	echo $json;
}
?>
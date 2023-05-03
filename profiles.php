<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json; charset=utf-8');
if (isset($_GET["path"]))
	$json = file_get_contents($_GET["path"].'profiles.json');
else
	$json = file_get_contents('profiles.json');
echo $json;
?>
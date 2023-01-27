<?php
require_once('db.php');
include("auth.php");
if (isset($_GET["id"])&&isset($_GET["action"])&&($_GET["action"]=="arduino")&&!isset($_POST["action"])){
	//$query = "SELECT proj.name,code.arduino_code from `projects` as proj inner join `facilino_code` as code on code.id=proj.facilino_code_id where proj.`id` = ".$_GET["id"];
	//$result = mysqli_query($con,$query);
	$query = "SELECT proj.name,code.arduino_code from `projects` as proj inner join `facilino_code` as code on code.id=proj.facilino_code_id where proj.`id` =?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("i",$_GET["id"]);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row = mysqli_fetch_row($result);
		header("Content-type: text/plain");
		header("Content-Disposition: attachment; filename=".$row[0].".ino.");
		echo str_replace("&apos;","'",$row[1]);
		//echo $row[1];
	}
}
elseif (isset($_GET["id"])&&isset($_GET["action"])&&($_GET["action"]=="facilino")&&!isset($_POST["action"])){
	//$query = "SELECT proj.name,code.blockly_code from `projects` as proj inner join `facilino_code` as code on code.id=proj.facilino_code_id where proj.`id` = ".$_GET["id"];
	//$result = mysqli_query($con,$query);
	$query = "SELECT proj.name,code.blockly_code from `projects` as proj inner join `facilino_code` as code on code.id=proj.facilino_code_id where proj.`id` =?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("i",$_GET["id"]);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row = mysqli_fetch_row($result);
		header("Content-type: text/plain");
		header("Content-Disposition: attachment; filename=".$row[0].".bly.");
		echo $row[1];
	}
}
?>
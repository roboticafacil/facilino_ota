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
elseif (isset($_GET["id"])&&isset($_GET["action"])&&(($_GET["action"]=="facilino")||($_GET["action"]=="facilino_example"))&&!isset($_POST["action"])){
	//$query = "SELECT proj.name,code.blockly_code from `projects` as proj inner join `facilino_code` as code on code.id=proj.facilino_code_id where proj.`id` = ".$_GET["id"];
	//$result = mysqli_query($con,$query);
	if ($_GET["action"]=="facilino")
		$query = "SELECT proj.name,code.blockly_code,proj.processor_id,proj.filter_id,proj.facilino_code_id,proj.version_id,proj.language_id,proj.share_key,proj.server_ip,proj.device_ip,proj.id,users.id,users.first_name,users.last_name from `projects` as proj inner join `facilino_code` as code on code.id=proj.facilino_code_id inner join `users` on `users`.`id`=proj.user_id where proj.`id` =?";
	else
		$query = "SELECT proj.name,code.blockly_code,proj.processor_id,proj.filter_id,proj.facilino_code_id,proj.version_id,proj.language_id,proj.share_key,proj.server_ip,proj.device_ip,proj.id,users.id,users.first_name,users.last_name from `examples` as proj inner join `facilino_code_examples` as code on code.id=proj.facilino_code_id inner join `users` on `users`.`id`=proj.user_id where proj.`id` =?";
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
		echo '<project><name>'.$row[0].'</name><processor_id>'.$row[2].'</processor_id><filter_id>'.$row[3].'</filter_id><facilino_code_id>'.$row[4].'</facilino_code_id><version_id>'.$row[5].'</version_id><language_id>'.$row[6].'</language_id><share_key>'.$row[7].'</share_key><server_ip>'.$row[8].'</server_ip><device_ip>'.$row[9].'</device_ip><attribution_proj_id>'.$row[10].'</attribution_proj_id><attribution_id>'.$row[11].'</attribution_id><attribution>'.$row[12]." ".$row[13].'</attribution>';
		echo $row[1];
		echo '</project>';
	}
}
?>
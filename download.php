<?php
require_once('db.php');

function getUserIdAndRole($con,$username,$key)
{
	$query = "SELECT `id`,`user_role_id`,`email` from `users` WHERE username=\"".$username."\" and `users`.`key`=\"".$key."\" and active=1";
	$result = mysqli_query($con,$query);
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		return mysqli_fetch_assoc($result);
	}
	else
	{
		return array();
	}
}

function arduinoCode($con,$project_id,$action,$table='')
{
	if ($action=="arduino")
		$query = "SELECT proj.name,code.arduino_code from `projects".$table."` as proj inner join `facilino_code".$table."` as code on code.id=proj.facilino_code_id where proj.`id` =?";
	else
		$query = "SELECT proj.name,code.arduino_code from `examples` as proj inner join `facilino_code` as code on code.id=proj.facilino_code_id where proj.`id` =?";
	//echo $query;
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("i",$project_id);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row = mysqli_fetch_assoc($result);
		return (array("result"=>"OK","name"=>$row['name'],"arduino_code"=>str_replace("&apos;","'",$row['arduino_code'])));
	}
	else
	{
		return (array("result"=>"Error, no project found","name"=>"","arduino_code"=>""));
	}
}

if (isset($_GET["id"])&&isset($_GET["action"])&&($_GET["action"]=="arduino")&&!isset($_POST["action"])){
	include("auth.php");
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
elseif (isset($_POST["action"])&&(($_POST["action"]=="arduino")||($_POST["action"]=="arduino_example"))&&isset($_POST["id"])&&isset($_POST["username"])&&isset($_POST["key"]))
{
	header("Content-type: application/json; charset=utf-8");
	$row_user=getUserIdAndRole($con,$_POST["username"],$_POST["key"]);
	if (!empty($row_user))
	{
		echo json_encode(arduinoCode($con,$_POST["id"],$_POST["action"]));
	}
	else
		echo json_encode(array("result"=>"Error"));
}
elseif (isset($_POST["action"])&&($_POST["action"]=="arduino")&&isset($_POST["id"])&&isset($_POST["user_id"])&&isset($_POST["invited"]))
{
	header("Content-type: application/json; charset=utf-8");
	echo json_encode(arduinoCode($con,$_POST["id"],$_POST["action"],"_tmp"));
}
elseif (isset($_GET["id"])&&isset($_GET["action"])&&(($_GET["action"]=="facilino")||($_GET["action"]=="facilino_example"))&&!isset($_POST["action"])){
	include("auth.php");
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
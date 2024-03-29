<?php
	require_once('db.php');
	session_start();
	$project_id = $_REQUEST['id'];
	$share_key = $_REQUEST['share_key'];
	$toolbox = $_REQUEST['toolbox'];
	//$query = "SELECT id FROM `projects` WHERE `id`=".$project_id." and `share_key`='".$share_key."'";
	//$result = mysqli_query($con,$query);
	$query = "SELECT id FROM `projects` WHERE `id`=? and `share_key`=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("is",$project_id,$share_key);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	
	if ($rows==1)
	{
		//$query = "SELECT id FROM `projects_meta` WHERE `project_id`=".$project_id." and `meta_key`='TOOLBOX'";
		//$result = mysqli_query($con,$query);
		$query = "SELECT id FROM `projects_meta` WHERE `project_id`=? and `meta_key`='TOOLBOX'";
		$statement=mysqli_prepare($con,$query);
		$statement->bind_param("i",$project_id);
		$statement->execute();
		$result=$statement->get_result();
		$rows = mysqli_num_rows($result);
		if ($rows==1)
		{
			//$query = "UPDATE `projects_meta` SET `meta_value`='".$toolbox."' WHERE `project_id`=".$project_id." and `meta_key`='TOOLBOX'";
			//$result = mysqli_query($con,$query);
			$query = "UPDATE `projects_meta` SET `meta_value`=? WHERE `project_id`=? and `meta_key`='TOOLBOX'";
			$statement=mysqli_prepare($con,$query);
			$statement->bind_param("si",$toolbox,$project_id);
			$statement->execute();
			echo 'project_meta.php: meta key updated';
		}
		else
		{
			//$query = "INSERT INTO `projects_meta`(`project_id`, `meta_key`, `meta_value`) VALUES ('".$project_id."','TOOLBOX','".$toolbox."')";
			//$result = mysqli_query($con,$query);
			$query = "INSERT INTO `projects_meta`(`project_id`, `meta_key`, `meta_value`) VALUES (?,'TOOLBOX',?)";
			$statement=mysqli_prepare($con,$query);
			$statement->bind_param("is",$project_id,$toolbox);
			$statement->execute();
			echo 'project_meta.php: new meta key created';
		}
	}
	else
		echo 'project_meta.php: Project id and share key not found';
	
	//echo 'ok';
	
	mysqli_close($con);
?>
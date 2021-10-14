<?php
	require_once('db.php');
	session_start();
	$project_id = $_REQUEST['id'];
	$share_key = $_REQUEST['share_key'];
	$toolbox = $_REQUEST['toolbox'];
	$query = "SELECT id FROM `projects` WHERE `id`=".$project_id." and `share_key`='".$share_key."'";
	$result = mysqli_query($con,$query);
	$rows = mysqli_num_rows($result);
	
	if ($rows==1)
	{
		$query = "SELECT id FROM `projects_meta` WHERE `project_id`=".$project_id." and `meta_key`='TOOLBOX'";
		$result = mysqli_query($con,$query);
		$rows = mysqli_num_rows($result);
		if ($rows==1)
		{
			$query = "UPDATE `projects_meta` SET `meta_value`='".$toolbox."' WHERE `project_id`=".$project_id." and `meta_key`='TOOLBOX'";
			$result = mysqli_query($con,$query);
			echo 'project_meta.php: meta key updated';
		}
		else
		{
			$query = "INSERT INTO `projects_meta`(`project_id`, `meta_key`, `meta_value`) VALUES ('".$project_id."','TOOLBOX','".$toolbox."')";
			$result = mysqli_query($con,$query);
			echo 'project_meta.php: new meta key created';
		}
	}
	else
		echo 'project_meta.php: Project id and share key not found';
	
	//echo 'ok';
	
	mysqli_close($con);
?>
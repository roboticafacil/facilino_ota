<?php
require_once('db.php');
include("auth.php");
if (isset($_GET["id"])&&isset($_GET["share_key"])&&!isset($_POST["action"])){
	//$query = "SELECT * from `projects` as proj where proj.`id`= ".$_GET["id"]." and proj.share_key=\"".$_GET["share_key"]."\"";
	//$result = mysqli_query($con,$query);
	$query = "SELECT * from `projects` as proj where proj.`id`= ? and proj.share_key=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("is",$_GET["id"],$_GET["share_key"]);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row_project = mysqli_fetch_row($result);
		//$query_user = "SELECT id,email from `users` WHERE username=\"".$_SESSION["username"]."\" and active=1";
		//$result_user = mysqli_query($con,$query_user);
		$query_user = "SELECT id,email from `users` WHERE username=? and active=1";
		$statement_user = mysqli_prepare($con,$query_user);
		$statement_user->bind_param("s",$_SESSION["username"]);
		$statement_user->execute();
		$result_user=$statement_user->get_result();
		$rows_user = mysqli_num_rows($result_user);
		if ($rows_user==1)
		{
			$row_user = mysqli_fetch_row($result_user);
			$row_project[2] = $row_user[0];
			$email = stripslashes($row_user[1]);
			$email = mysqli_real_escape_string($con,$email);
			$key = md5($email);
			$addKey = substr(md5(uniqid(rand(),1)),3,10);
			$key = $key . $addKey;
			
			$curDate = date("Y-m-d H:i:s");
			$row_project[8] = $curDate;
			$row_project[9] = $curDate;
			
			//$query_code ="SELECT * from `facilino_code` where `facilino_code`.id=".$row_project[5];
			//$result_code = 	mysqli_query($con,$query_code);
			$query_code ="SELECT * from `facilino_code` where `facilino_code`.id=?";
			$statement_code=mysqli_prepare($con,$query_code);
			$statement_code->bind_param("i",$row_project[5]);
			$statement_code->execute();
			$result_code=$statement_code->get_result();
			$rows_code = mysqli_num_rows($result_code);
			if ($rows_code==1)
			{
				$row_code = mysqli_fetch_row($result_code);
				//$query="INSERT INTO `facilino_code`(`blockly_code`,`arduino_code`) VALUES (\"".$row_code[1]."\",\"".$row_code[2]."\")";
				//$result = mysqli_query($con,$query);  //insert
				$query="INSERT INTO `facilino_code`(`blockly_code`,`arduino_code`) VALUES (\"".$row_code[1]."\",\"".$row_code[2]."\")";
				$statement=mysqli_prepare($con,$query);
				$statement->bind_param("ss",$row_code[1],$row_code[2]);
				$statement->execute();
				$facilino_code_id=$con->insert_id;
				//$query="INSERT INTO `projects`(`name`,`user_id`,`processor_id`,`filter_id`,`facilino_code_id`,`version_id`,`language_id`,`create_date`,`modified_date`,`share_key`) VALUES (\"".$row_project[1]."\",".$row_project[2].",".$row_project[3].",".$row_project[4].",".$facilino_code_id.",".$row_project[6].",".$row_project[7].",\"".$row_project[8]."\",\"".$row_project[9]."\",\"".$key."\")";
				//$result = mysqli_query($con,$query);
				$query="INSERT INTO `projects`(`name`,`user_id`,`processor_id`,`filter_id`,`facilino_code_id`,`version_id`,`language_id`,`create_date`,`modified_date`,`share_key`) VALUES (?,?,?,?,?,?,?,?,?,?)";
				$statement=mysqli_prepare($con,$query);
				$statement->bind_param("siiiiiisss",$row_project[1],$row_project[2],$row_project[3],$row_project[4],$facilino_code_id,$row_project[6],$row_project[7],$row_project[8],$row_project[9],$key);
				$statement->execute();
				header("Location: dashboard.php");
			}
		}
	}
	else
	{
		?>
		<html>
		<?php include "head.php"; ?>
		<body>
	<h1>Share</h1>
	<p>The link is not valid anymore</p>
	<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
	</html>
<?php
	}
}
?>
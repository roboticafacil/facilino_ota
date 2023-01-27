<?php
require_once('db.php');
include("auth.php");
?>
<!DOCTYPE html>
<html><?php include "head.php"; 
?>
<body>
		<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:2em; margin-left: 0.5em; margin-right: 0.5em">
		<h1 >Upgrade your user account</h1>
		<?php
		if (isset($_GET["action"])&&($_GET["action"]=="update")&&!isset($_POST["action"])&&isset($_POST["update_button"])){
			
		}
		else if (isset($_GET["action"])&&($_GET["action"]=="update")&&!isset($_POST["action"])&&isset($_POST["upgrade_button"])){
			header("Location: upgrade.php");
		}
		else if (isset($_GET["action"])&&($_GET["action"]=="update")&&!isset($_POST["action"])&&isset($_POST["cancel_button"])){
			header("Location: dashboard.php");
		}
		else
		{
			//$query_user = "SELECT `users`.`username`,`users`.`email`,`users`.`first_name`,`users`.`last_name`,`user_roles`.`FullName` from `users` inner join `user_roles` on (`user_roles`.`id`=`users`.`id`) where username='".$_SESSION["username"]."' and active=1";
			//$result_user = mysqli_query($con,$query_user);
			$query_user = "SELECT `users`.`username`,`users`.`email`,`users`.`first_name`,`users`.`last_name`,`user_roles`.`FullName` from `users` inner join `user_roles` on (`user_roles`.`id`=`users`.`id`) where username=? and active=1";
			$statement_user = mysqli_prepare($con,$query_user);
			$statement_user->bind_param("s",$_SESSION["username"]);
			$statement_user->execute();
			$result_user=$statement_user->get_result();
			$rows_user = mysqli_num_rows($result_user);
			if ($rows_user==1)
			{
				$row_user = mysqli_fetch_row($result_user);
				echo '<div class="form">';
				/*echo '<form enctype="multipart/form-data" action="user.php?action=update" method="POST" style="margin-to: 2em; margin-bottom:2em">';
				echo '<label>Username:</label>&nbsp;&nbsp;<label>'.$row_user[0].'</label></br>';
				echo '<label>Email:</label>&nbsp;&nbsp;<label>'.$row_user[1].'</label></br>';
				echo '<label>User Type:</label>&nbsp;&nbsp;<label>'.$row_user[4].'</label></br>';
				echo '<label>First Name:</label>&nbsp;&nbsp;<input type="text" name="first_name" value="'.$row_user[2].'" maxlength="50" required></input></br>';
				echo '<label>Lasts Name:</label>&nbsp;&nbsp;<input type="text" name="last_name" value="'.$row_user[3].'" maxlength="50" required></input></br>';
				echo '<label>Remove Ads</label>&nbsp;&nbsp;<input name="update_button" type="submit" value="Update"/></br>';
				echo '<input name="upgrade_button" type="submit" value="Upgrade"/>&nbsp;&nbsp;';
				echo '<input name="cancel_button" type="submit" value="Cancel" />';
				echo '</form>';*/
				echo '</div>';
			}
			else
			{
				echo "User not found! Something weird happen";
			}
		}
		?>
		</div>
		<div id="ads"><?php include "ads.php" ?></div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
</html>
<?php
require_once('db.php');

if (isset($_GET["action"])&&($_GET["action"]=="update")&&!isset($_POST["action"])&&isset($_POST["update_button"])){
	include("auth.php");
	$query = "UPDATE `users` SET `first_name`=?,`last_name`=?,`default_lang_id`=? WHERE `username`=?";
	$statement=mysqli_prepare($con,$query);
	if (isset($_POST["language"]))
		$language_id=intval($_POST["language"]);
	else
		$language_id=4;
	$statement->bind_param("ssis",$_POST["first_name"],$_POST["last_name"],$language_id,$_SESSION["username"]);
	$statement->execute();
	header("Location: dashboard.php");
}
elseif (isset($_POST["action"])&&($_POST["action"]=="update")&&isset($_POST["username"])&&isset($_POST["key"])&&isset($_POST["first_name"])&&isset($_POST["last_name"])&&(isset($_POST["lang_id"]))){
	header("Content-type: application/json; charset=utf-8");
	$query = "UPDATE `users` SET `first_name`=?,`last_name`=?,`default_lang_id`=? WHERE `username`=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("ssis",$_POST["first_name"],$_POST["last_name"],$_POST["lang_id"],$_POST["username"]);
	if ($statement->execute())
	{
		echo json_encode(array("result"=>"OK"));
	}
	else
		echo json_encode(array("result"=>"Error"));
}
elseif (isset($_GET["action"])&&($_GET["action"]=="apply")&&!isset($_POST["action"])&&isset($_POST["upgrade_button"])){
	header("Location: upgrade.php");
}
elseif (isset($_GET["action"])&&($_GET["action"]=="apply")&&!isset($_POST["action"])&&isset($_POST["recover_button"])){
	include("auth.php");
	$query = "SELECT `prev_user_role_id` FROM `users` WHERE `username`=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("s",$_SESSION["username"]);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row = mysqli_fetch_row($result);
		if ($row[0]==4) {
			header("Location: user.php?username='".$_SESSION["username"]."'&action=modify_to_standard");
		}
		elseif ($row[0]==5){
			header("Location: user.php?username='".$_SESSION["username"]."'&action=modify_to_academic");
		}
		else
		{
			header("Location: user.php?username='".$_SESSION["username"]."'&action=modify_to_standard");
		}
	}
}
elseif (isset($_GET["action"])&&($_GET["action"]=="apply")&&!isset($_POST["action"])&&isset($_POST["translation_button"])){
	header("Location: translation_program.php");
}
elseif (isset($_GET["action"])&&($_GET["action"]=="apply")&&!isset($_POST["action"])&&isset($_POST["academy_button"])){
	header("Location: academy_program.php");
}
elseif (isset($_GET["action"])&&($_GET["action"]=="update")&&!isset($_POST["action"])&&isset($_POST["cancel_button"])){
	header("Location: dashboard.php");
}
elseif (isset($_GET["action"])&&(($_GET["action"]=="modify_to_standard")||($_GET["action"]=="modify_to_academic"))){
	include("auth.php");	
	$query="SELECT `users`.`id`,`user_role_id`,`email`,`first_name`,`prev_user_role_id`,`user_roles`.`FullName` FROM `users` INNER JOIN `user_roles` ON (`users`.`user_role_id`=`user_roles`.`id`) WHERE `username`=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("s",$_SESSION["username"]);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row = mysqli_fetch_row($result);
		if ($row[1]==2)
		{
			require("functions.php");
			$query="UPDATE `users` SET `user_role_id`=?, `prev_user_role_id`=? WHERE `id`=?";
			$statement=mysqli_prepare($con,$query);
			$statement->bind_param("ii",$row[4],$row[1],$row[0]);
			$statement->execute();
			$mail=create_email_account_changed($row[2],$row[3],$row[5]);
			if(!$mail->Send()){
				echo "Mailer Error: " . $mail->ErrorInfo;
			}else{
				header("Location: user.php");
			}
		}
	}
	header("Location: user.php");
}
elseif (isset($_GET["username"])&&isset($_GET["action"])&&($_GET["action"]=="accept_as_reviewer")){
	include("auth.php");
	require_once('website_translation.php');
	?>
	<!DOCTYPE html>
	<html><?php include "head.php"; 
	?>
	<body>
		<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:2em; margin-left: 0.5em; margin-right: 0.5em">
		<h3><?php echo $website["USER_DATA"]?></h3>
		<?php
	//Accept a user as a reviewer
	$query="SELECT `id`,`user_role_id`,`email`,`first_name` FROM `users` WHERE `username`=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("s",$_SESSION["username"]);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row = mysqli_fetch_assoc($result);
		if ($row['user_role_id']==1)
		{
			$query="SELECT `id`,`user_role_id`,`email`,`first_name` FROM `users` WHERE `username`=?";
			$statement=mysqli_prepare($con,$query);
			$statement->bind_param("s",$_GET["username"]);
			$statement->execute();
			$result=$statement->get_result();
			$rows = mysqli_num_rows($result);
			if ($rows==1)
			{
				$row = mysqli_fetch_assoc($result);
				if ($row['user_role_id']==4)
				{
					require("functions.php");
					$query="UPDATE `users` SET `user_role_id`=3, `prev_user_role_id`=? WHERE `id`=?";
					$statement=mysqli_prepare($con,$query);
					$statement->bind_param("ii",$row['user_role_id'],$row['id']);
					$statement->execute();
					$mail=create_email_reviewer_response($row['email'],$row['first_name'],1);
					if(!$mail->Send())
					{
						echo "Mailer Error: " . $mail->ErrorInfo;
					}
					else
					{
						?>
						<h3><?php echo $website["EMAIL_SENT_USER_RESPONSE"]?></h3>
						<form action="dashboard.php"><input type="submit" value="<?php echo $website["CONTINUE"]?>" /></form>
						<?php
					}
				}
				else
				{
					echo 'This user is already a translator contributor.';
				}
			}
			else
			{
				echo 'User not found.';
			}
		}
		else
		{
			echo 'You are not allowed, because your user is not an administrator.';
		}
	}
	else
	{
		?>
		<h3><?php echo $website["UPS"]?></h3>
		<form action="translate.php"><input type="submit" value="<?php echo $website["CONTINUE"]?>" /></form>
		<?php
	}
	?>
		</div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
	</html>
	<?php
}
elseif (isset($_GET["action"])&&($_GET["action"]=="decline_as_reviewer")){
	include("auth.php");
	require_once('website_translation.php');
	?>
	<!DOCTYPE html>
	<html><?php include "head.php"; 
	?>
	<body>
		<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:2em; margin-left: 0.5em; margin-right: 0.5em">
		<h3><?php echo $website["USER_DATA"]?></h3>
		<?php
	//Decline a user as an academic
	$query="SELECT `id`,`user_role_id`,`email`,`first_name` FROM `users` WHERE `username`=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("s",$_POST["username"]);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		require("functions.php");
		$row = mysqli_fetch_row($result);
		$mail=create_email_reviewer_response($row[2],$row[3],0,$_POST["comments"]);
		if(!$mail->Send()){
				echo "Mailer Error: " . $mail->ErrorInfo;
		}else{
			?>
			<h3><?php echo $website["EMAIL_SENT_USER_RESPONSE"]?></h3>
			<form action="dashboard.php"><input type="submit" value="<?php echo $website["CONTINUE"]?>" /></form>
			<?php
		}
	}
	else
	{
		?>
		<h3><?php echo $website["UPS"]?></h3>
		<form action="translate.php"><input type="submit" value="<?php echo $website["CONTINUE"]?>" /></form>
		<?php
	}
	?>
		</div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
	</html>
	<?php
}
elseif (isset($_GET["action"])&&($_GET["action"]=="accept_as_academic")){
	include("auth.php");
	require_once('website_translation.php');
	?>
	<!DOCTYPE html>
	<html><?php include "head.php"; 
	?>
	<body>
		<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:2em; margin-left: 0.5em; margin-right: 0.5em">
		<h3><?php echo $website["USER_DATA"]?></h3>
		<?php
	//Accept a user as an academic
	$query="SELECT `id`,`user_role_id`,`email`,`first_name` FROM `users` WHERE `username`=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("s",$_SESSION["username"]);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$row = mysqli_fetch_row($result);
		if ($row[1]>1)
		{
			require("functions.php");
			$query="UPDATE `users` SET `user_role_id`=5 WHERE `id`=?";
			$statement=mysqli_prepare($con,$query);
			$statement->bind_param("i",$row[0]);
			$statement->execute();
			$mail=create_email_academic_response($row[2],$row[3],1);
			if(!$mail->Send()){
				echo "Mailer Error: " . $mail->ErrorInfo;
			}else{
				?>
				<h3><?php echo $website["EMAIL_SENT_USER_RESPONSE"]?></h3>
				<form action="dashboard.php"><input type="submit" value="<?php echo $website["CONTINUE"]?>"/></form>
				<?php
			}
		}
		else
		{
			echo 'This user is already an academic.';
		}
	}
	else
	{
		?>
		<h3><?php echo $website["UPS"]?></h3>
		<form action="translate.php"><input type="submit" value="<?php echo $website["CONTINUE"]?>"/></form>
		<?php
	}
	?>
		</div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
	</html>
	<?php
}
elseif (isset($_GET["action"])&&($_GET["action"]=="decline_as_academic")){
	include("auth.php");
	require_once('website_translation.php');
	?>
	<!DOCTYPE html>
	<html><?php include "head.php"; 
	?>
	<body>
		<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:2em; margin-left: 0.5em; margin-right: 0.5em">
		<h3><?php echo $website["USER_DATA"]?></h3>
		<?php
	//Decline a user as an academic
	$query="SELECT `id`,`user_role_id`,`email`,`first_name` FROM `users` WHERE `username`=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("s",$_POST["username"]);
	$statement->execute();
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		require("functions.php");
		$row = mysqli_fetch_row($result);
		$mail=create_email_academic_response($row[2],$row[3],0,$_POST["comments"]);
		if(!$mail->Send()){
				echo "Mailer Error: " . $mail->ErrorInfo;
		}else{
			?>
			<h3><?php echo $website["EMAIL_SENT_USER_RESPONSE"]?></h3>
			<form action="dashboard.php"><input type="submit" value="<?php echo $website["CONTINUE"]?>"/></form>
			<?php
		}
	}
	else
	{
		?>
		<h3><?php echo $website["UPS"]?></h3>
		<form action="translate.php"><input type="submit" value="<?php echo $website["CONTINUE"]?>"/></form>
		<?php
	}
	?>
		</div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
	</html>
	<?php
}
else
{
	include("auth.php");
	require_once('website_translation.php');
	?>
	<!DOCTYPE html>
	<html><?php include "head.php"; 
	?>
	<body>
		<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:2em; margin-left: 0.5em; margin-right: 0.5em">
		<h3><?php echo $website["USER_DATA"]?></h3>
		<?php
			//$query_user = "SELECT `users`.`username`,`users`.`email`,`users`.`first_name`,`users`.`last_name`,`users`.`user_role_id`,`user_roles`.`FullName` from `users` inner join `user_roles` on (`user_roles`.`id`=`users`.`user_role_id`) where username='".$_SESSION["username"]."' and active=1";
			//$result_user = mysqli_query($con,$query_user);
			$query_user = "SELECT `users`.`username`,`users`.`email`,`users`.`first_name`,`users`.`last_name`,`users`.`user_role_id`,`user_roles`.`FullName`,`languages`.`id` from `users` inner join `user_roles` on (`user_roles`.`id`=`users`.`user_role_id`) inner join `languages` on (`users`.`default_lang_id`=`languages`.`id`) where username=? and active=1";
			$statement_user=mysqli_prepare($con,$query_user);
			$statement_user->bind_param("s",$_SESSION["username"]);
			$statement_user->execute();
			$result_user=$statement_user->get_result();
			$rows_user = mysqli_num_rows($result_user);
			if ($rows_user==1)
			{
				$row_user = mysqli_fetch_row($result_user);
				?>
				<div class="form" style="width:100%">
				<form enctype="multipart/form-data" action="user.php?action=update" method="POST" style="margin-to: 2em; margin-bottom:0.5em">
				<div class="datagrid">
				<table style="margin-top:0.5em;margin-bottom:0.5em">
				<tr><td><label><?php echo $website["USERNAME"]?>:</label></td><td><label><?php echo $row_user[0]?></label></td></tr>
				<tr><td><label><?php echo $website["EMAIL"]?>:</label></td><td><label><?php echo $row_user[1]?></label></td></tr>
				<tr><td><label><?php echo $website["USER_ACCOUNT_TYPE"]?>:</label></td><td><label><?php echo $row_user[5]?></label></td></tr>
				<tr><td><label><?php echo $website["FIRST_NAME"]?>:</label></td><td><input type="text" name="first_name" value="<?php echo $row_user[2]?>" maxlength="50"></input></td></tr>
				<tr><td><label><?php echo $website["LAST_NAME"]?>:</label></td><td><input type="text" name="last_name" value="<?php echo $row_user[3]?>" maxlength="50"></input></td></tr>
				<tr><td><label><?php echo $website["LANGUAGE"];?>:</label></td><td>
				<?php
					if ($row_user[6]==5)
					{
					?>
						<div><input type="radio" id="en_GB" name="language" value=4><label for="en_GB" >Inglés</label></input></div>
						<div><input type="radio" id="es_ES" name="language" value=5 checked="checked"><label for="es_ES" >Español</label></input></div>
					<?php
					}
					else
					{
						?>
						<div><input type="radio" id="en_GB" name="language" value=4 checked="checked"><label for="en_GB" >English</label></input></div>
						<div><input type="radio" id="es_ES" name="language" value=5><label for="es_ES" >Spanish</label></input></div>
						<?php
					}
				?>
				</td></tr>
				</table>
				<div style="margin-bottom:0.5em;padding:0.5em">
				<input name="update_button" type="submit" value="<?php echo $website["UPDATE"]?>"/>&nbsp;&nbsp;
				<input name="cancel_button" type="submit" value="<?php echo $website["CANCEL"]?>"/>
				</div>
				</form>
				</div>
				<div class="form" style="width:100%">
				<form action="user.php?action=apply" method="POST" style="margin-to: 2em; margin-bottom:2em">
				<div class="datagrid" style="margin-bottom:0.5em;padding:0.5em">
				<table style="margin-top:1em">
				<?php
				if (($row_user[4]==1)||($row_user[4]==2))
				{
					?>
					<tr><td>
					<label><?php echo $website["TIRED_CONTRIBUTING"]?>&#128532;</label></br>
					<label><?php echo $website["RECOVER_PREVIOUS_USER"]?></label>
					<!-- </td><td>-->
					&nbsp;<input name="recover_button" type="submit" value="<?php echo $website["APPLY"]?>"/>
					</td></tr>
					<?php
				}
				else if ($row_user[4]==4)
				{
					?>
					<!-- <tr><td>-->
					<!-- </td></tr>-->
					<tr><td>
					<label><?php echo $website["CONTRIBUTE_TRANSLATION"]?></label>
					<!-- </td><td> -->
					&nbsp;<input name="translation_button" type="submit" value="<?php echo $website["APPLY"]?>"/>
					</td></tr>
					<tr><td>
					<label><?php echo $website["ARE_YOU_ACADEMIC"]?></label>
					<!-- </td><td>-->
					&nbsp;<input name="academy_button" type="submit" value="<?php echo $website["APPLY"]?>"/>
					</td></tr>
					<?php
				}
				else if ($row_user[4]==5)
				{
					?>
					<tr><td>
					<label><?php echo $website["CONTRIBUTE_TRANSLATION"]?></label>
					<!-- </td><td>-->
					&nbsp;<input name="translation_button" type="submit" value="<?php echo $website["APPLY"]?>"/>
					</td></tr>
					<?php
				}
				?>
				</table>
				</div>
				</form>
				</div>
				<?php
			}
			else
			{
				echo "User not found! Something weird happened";
			}
	?>
		</div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
	</html>
<?php
}
		
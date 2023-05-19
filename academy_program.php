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
		<h1 >Academic Program</h1>
		<?php
		if (isset($_POST["apply_button"])){
			require("functions.php");
			$query="SELECT `email`,`key` FROM `users` WHERE `username`=\"".$_SESSION["username"]."\"";
			$result = mysqli_query($con,$query);
			$rows = mysqli_num_rows($result);
			if ($rows==1)
			{
				$row = mysqli_fetch_row($result);
				$upload_dir = 'uploads/'.$_SESSION["username"];
				if (!file_exists($upload_dir)) {
					mkdir("uploads/" . $_SESSION["username"],0777);
					mkdir("uploads/" . $_SESSION["username"].'/credentials',0777);
					$upload_dir .='/credentials/';
				}
				else
				{
					$upload_dir .='/credentials/';
					if (!file_exists($upload_dir))
					{
						mkdir("uploads/" . $_SESSION["username"].'/credentials',0777);
					}
				}
				$uploaded_file_id_card = $upload_dir . basename($_FILES['id_card']['name']);
				if (move_uploaded_file($_FILES['id_card']['tmp_name'], $uploaded_file_id_card)) {
					$uploaded_file_credentials = $upload_dir . basename($_FILES['credentials']['name']);
					if (move_uploaded_file($_FILES['credentials']['tmp_name'], $uploaded_file_credentials)) {
						$mail=create_email_academic_request($_SESSION["username"],$row[0],$row[1],$_POST["academic"],$uploaded_file_id_card,$uploaded_file_credentials,$_POST["additional_info"]);
						if(!$mail->Send()){
							echo "Mailer Error: " . $mail->ErrorInfo;
						}else{
							?>
							<h3>An e-mail has been sent to the administrators with your application. You will be notified with a response soon, please be patient.</h3>
							<form action="dashboard.php"><input type="submit" value="Continue" /></form>
							<?php
						}
					}
				}
			}
			else
			{
				?><h3>Ups! Something went wrong...</h3>
				<form action="academy_program.php"><input type="submit" value="Continue" /></form>
				<?php
			}
		}
		elseif (isset($_POST["cancel_button"])){
			header("Location: dashboard.php");
		}
		elseif (isset($_GET["action"])&&($_GET["action"]=="decline_as_academic")){
			//Decline a user as an academic
			$query="SELECT `id`,`user_role_id`,`email`,`first_name`,`last_name` FROM `users` WHERE `username`=\"".$_GET["username"]."\"";
			$result = mysqli_query($con,$query);
			$rows = mysqli_num_rows($result);
			if ($rows==1)
			{
				$row = mysqli_fetch_row($result);
				?>
				<h3>Decline a user as academic</h3>';
				<form action="user.php?action=decline_as_academic" method="POST">
				<table>
				<tr><td><label>Username:</label></td><td><label><?php echo $_GET["username"]?></label></td></tr>
				<tr><td><label>Email:</label></td><td><label><?php echo $row[2]?></label></td></tr>
				<tr><td><label>First Name:</label></td><td><label><?php echo $row[3]?></label></td></tr>
				<tr><td><label>Lasts Name:</label></td><td><label><?php echo $row[4]?></label></td></tr>
				<tr><td><label>Comments:</label></td><td><textarea name="comments" style="width:100%; height:10em" maxlength=1000></textarea></td></tr>
				</table>
				<input name="username" type="hidden" value="<?php echo $_GET["username"]?>"/>
				<input name="decline_button" type="submit" value="Decline"/>&nbsp;&nbsp;
				</form>
				<form action="dashboard.php">
				<input name="cancel_button" type="submit" value="Cancel"/>
				</form>
				<?php
			}
			else
			{
				?>
				<h3>Ups! Something went wrong...</h3>
				<form action="translate.php"><input type="submit" value="Continue"/></form>';
				<?php
			}
		}
		else
		{
			?>
			<h4>Are you an academic? We offer unlimited access to features for academics.</h4>
			<h5 style="margin-top:1em">Applying to this program implies that you send us data we can verify about your academic activity.</h5>';
			<div>
			<form enctype="multipart/form-data" action="academy_program.php" method="POST" style="margin-to: 2em; margin-bottom:2em">
			<h5 style="margin-top:0.5em">Academic Job</h5>
			<select id="academic" name="academic" type="text" value="1">
			<option value="School">School teacher</option>
			<option value="Secondary">Secondary teacher</option>
			<option value="High School">High school teacher</option>
			<option value="VET">VET teacher</option>
			<option value="Higher Education">Higher Education</option>
			<option value="Other">Other</option>
			</select>
			<h5 style="margin-top:1em">ID card</h5>
			<input type="file" accept="image/png,image/jpeg" name="id_card" max-size="5000"></input>
			<h5 style="margin-top:1em">ID staff credentials</h5>
			<input type="file" accept="image/png,image/jpeg" name="credentials" max-size="5000"></input>
			<h5 style="margin-top:1em">Tell us about yourself... (i.e.: workplace)</h5>
			<textarea name="additional_info" style="width:100%; height:10em" maxlength=1000></textarea>
			<h5>Your information will be treated confidentially, just for examining your viability.</h5>
			<h5>Once approved, your come back to this page to help us improving Facilino.</h5>
			<input name="apply_button" type="submit" value="Apply"/>&nbsp;&nbsp;
			<input name="cancel_button" type="submit" value="Cancel"/>
			</form>
			</div>
			<?php
		}
		?>
		</div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
</html>
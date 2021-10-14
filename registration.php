<!DOCTYPE html>
<html>
<?php include "head.php"; ?>
<body>
<?php
require_once('db.php');
include('functions.php');
?>
	<div id="header"><?php include "inc-header.php" ?></div>
	<div id="content" style="margin-top:3em; margin-left:0.5em">
<?php
// If form submitted, insert values into the database.
if (isset($_GET["key"])&&isset($_GET["action"])&&($_GET["action"]=="activate")&&!isset($_POST["action"]))
{
	$key = $_GET["key"];
	//Checking is user exists in the database or not
	$query = "SELECT * FROM `users` WHERE `key`='".$key."'";
	$result = mysqli_query($con,$query) or die(mysql_error());
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$obj= $result->fetch_object();
		$query2= "update `users` set `active` = '1' where `id` = '".$obj->id."'";
		$result2 = mysqli_query($con,$query2) or die(mysql_error());
		$email = $obj->email;
		$mail=create_email_activated($email,$key);
		if(!$mail->Send()){
			echo "Mailer Error: " . $mail->ErrorInfo;
		}else{
			$_SESSION['username'] = $obj->username;
			// Redirect user to index.php
			header("Location: index.php");
		 }
	}
	else
	{
		echo "<div class='form'><h3>The submitted key ".$key." was not found. Check you have provided the correct key.</h3><br/>Click here to <a href='login.php'>Log In</a></div>";
	}
}
else if (isset($_GET["key"])&&isset($_GET["action"])&&($_GET["action"]=="resend")&&!isset($_POST["action"]))
{
	$key = $_GET["key"];
	//Checking is user exists in the database or not
	$query = 'SELECT * FROM `users` WHERE `key`="'.$key.'"';
	$result = mysqli_query($con,$query) or die(mysql_error());
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$obj= $result->fetch_object();
		$email = $obj->email;
		$mail=create_email_activation($email,$key);
		if(!$mail->Send()){
			echo "Mailer Error: " . $mail->ErrorInfo;
		}else{
		echo "<div class='form'>
		<h3>We have sent you an e-mail with a link to activate your account. Please, check your mailbox.</h3>
		<br/>Click here to <a href='login.php'>Login</a><br/>Click here to <a href='registration.php?key=".$key."&action=resend'>Resend email</a></div>";
		 }
	}
	else
	{
		echo "<div class='form'><h3>The submitted key ".$key." was not found. Check you have provided the correct key.</h3><br/>Click here to <a href='login.php'>Login</a></div>";
	}
}
else if (isset($_REQUEST['username'])){
		// removes backslashes
		$username = stripslashes($_REQUEST['username']);
		//escapes special characters in a string
		$username = mysqli_real_escape_string($con,$username);
		$query = "SELECT * FROM `users` WHERE `username`='".$_REQUEST['username']."'";
		$result = mysqli_query($con,$query);
		$rows = mysqli_num_rows($result);
		if ($rows==0)
		{
			$email = stripslashes($_REQUEST['email']);
			$email = mysqli_real_escape_string($con,$email);
			$password = stripslashes($_REQUEST['password']);
			$first_name = $_REQUEST['first_name'];
			$last_name = $_REQUEST['last_name'];
			$password = mysqli_real_escape_string($con,$password);
			$trn_date = date("Y-m-d H:i:s");
			$key = md5($email);
			$addKey = substr(md5(uniqid(rand(),1)),3,10);
			$key = $key . $addKey;
			$query = "INSERT into `users` (`username`,`password`, `email`,`trn_date`,`key`,`active`,`first_name`,`last_name`) VALUES ('".$username."','".md5($password)."','".$email."','".$trn_date."','".$key."', 0,'".$first_name."','".$last_name."')";
			$result = mysqli_query($con,$query);
			if($result){
				$mail=create_email_activation($email,$key);
				if(!$mail->Send()){
				echo "Mailer Error: " . $mail->ErrorInfo;
				}else{
				echo "<div class='form'>
				<h3>You have been successfully registered. We have sent you an e-mail with a link to activate your account. Please, check your mailbox.</h3>
				<br/>Click here to <a href='login.php'>Login</a><br/>Click here to <a href='registration.php?key=".$key."&action=resend'>Resend email</a></div>";
				 }
			}
		}
		else
		{
			echo "<div class='form'><h3>Username '".$_REQUEST['username']."' is in use. Please, introduce another username.</h3><br/>Click here to <a href='login.php'>Login</a><br/>Click here to <a href='registration.php'>Registration</a></div>";
		}
		
    }else{
?>
<div class="form">
<h1>Registration</h1>
<form name="registration" action="" method="post">
<input type="text" name="username" placeholder="Username" required />
<input type="email" name="email" placeholder="Email" required />
<input type="password" name="password" placeholder="Password" required />
<input type="text" name="first_name" placeholder="Fist name" required />
<input type="text" name="last_name" placeholder="Last name" required />
<input type="submit" name="submit" value="Register" />
</form>
<p>Already registered? <a href='login.php'>Login Here</a></p>
</div>
<?php } ?>
</div>
<div id="ads"><?php include "ads.php" ?></div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>
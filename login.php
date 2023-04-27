<!DOCTYPE html>
<html>
<?php include "head.php"; ?>
<body>
<?php
require_once('db.php');
include('functions.php');
session_start();
?>
	<div id="header"><?php include "inc-header.php" ?></div>
	<div id="content" style="margin-top:3em; margin-left:0.5em">
<?php
// If form submitted, insert values into the database.
if (isset($_GET["key"])&&isset($_GET["action"])&&($_GET["action"]=="activate")&&!isset($_POST["action"]))
{
	$key = $_GET["key"];
	//Checking is user existing in the database or not
	//$query = "SELECT * FROM `users` WHERE `key`='$key'";
	//$result = mysqli_query($con,$query) or die(mysql_error());
	$query = "SELECT * FROM `users` WHERE `key`=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("s",$key);
	$statement->execute() or die(mysql_error());
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if ($rows==1)
	{
		$obj= $result->fetch_object();
		//$query2= "update `users` set `validate` = '1' where `id` = '$obj->id'";
		//$result2 = mysqli_query($con,$query2) or die(mysql_error());
		$query2= "update `users` set `validate` = '1' where `id`=?";
		$statement2=mysqli_prepare($con,$query2);
		$statement2->bind_param("i",$obj->id);
		$statement2->execute() or die(mysql_error());
		$email = $obj->email;
		$mail=create_email_activated($email,$key);
		if(!$mail->Send()){
			echo "Mailer Error: " . $mail->ErrorInfo;
		}else{
			$_SESSION['username'] = $obj->username;
			header("Location: dashboard.php");
		 }
	}
	else
	{
		echo "<div class='form'><h3>The submitted key ".$key." was not found. Check you have provided the correct key.</h3><br/>Click here to <a href='login.php'>Login</a></div>";
	}
}
else if (isset($_GET["key"])&&isset($_GET["action"])&&($_GET["action"]=="resend")&&!isset($_POST["action"]))
{
	$key = $_GET["key"];
	//Checking is user existing in the database or not
	//$query = "SELECT * FROM `users` WHERE `key`='$key'";
	//$result = mysqli_query($con,$query) or die(mysql_error());
	$query = "SELECT * FROM `users` WHERE `key`=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("s",$key);
	$statement->execute() or die(mysqli_error());
	$result = $statement->get_result();
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
elseif (isset($_POST['username'])){
	// removes backslashes
	$username = stripslashes($_REQUEST['username']);
	//escapes special characters in a string
	$username = mysqli_real_escape_string($con,$username);
	$password = stripslashes($_REQUEST['password']);
	$password = mysqli_real_escape_string($con,$password);
	$password = md5($password);
	//Checking is user existing in the database or not
	//$query = "SELECT * FROM `users` WHERE (username='$username' or email='$username') and password='".md5($password)."'";
	//$result = mysqli_query($con,$query) or die(mysql_error());
	$query = "SELECT * FROM `users` WHERE (username=? or email=?) and password=?";
	$statement=mysqli_prepare($con,$query);
	$statement->bind_param("sss",$username,$username,$password);
	$statement->execute() or die(mysql_error());
	$result=$statement->get_result();
	$rows = mysqli_num_rows($result);
	if($rows==1){
		$obj= $result->fetch_object();
		if ($obj->active==1)
		{
		$_SESSION['username'] = $obj->username;
		header("Location: dashboard.php");
		}
		else
		{
			echo "<div class='form'><h3>Username is not active. Please, verify the link in the email you should have received.</h3><br/>Click here to <a href='login.php'>Login</a><br/>Click here to <a href='login.php?key=".$obj->key."&action=resend'>Resend email</a></div>";
		}
	}else{
		echo "<div class='form'><h3>Username/password is incorrect.</h3><br/>Click here to <a href='login.php'>Login</a></div>";
	}
}
else{
	require_once('website_translation.php');
?>
<div class="form">
<h1><?php echo $website["LOGIN"];?></h1>
<form action="" method="post" name="login">
<input type="text" name="username" placeholder="<?php echo $website["USERNAME_EMAIL"];?>" required />
<input type="password" name="password" placeholder="<?php echo $website["PASSWORD"];?>" required /></br>
<input name="submit" type="submit" value="<?php echo $website["DO_LOGIN"];?>" />
</form>
<p><?php echo $website["NOT_REGISTERED_YET"];?> <a href='registration.php'><?php echo $website["REGISTER_HERE"];?></a></p>
<p><?php echo $website["LOST_PASSWORD"];?>? <a href='lost-password.php'><?php echo $website["RESET_PASSWORD_HERE"];?></a></p>
</div>
<?php } ?>
	</div>
	<div id="ads"><?php include "ads.php" ?></div>
	<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>
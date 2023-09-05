<?php
if (isset($_POST["username"])&&isset($_POST["email"])&&isset($_POST["password"])&&isset($_POST["first_name"])&&isset($_POST["last_name"])&&isset($_POST["lang_id"])&&isset($_POST["json"]))
{
	require_once('db.php');
	include('functions.php');
	header("Content-type: application/json; charset=utf-8");
	$username = stripslashes($_POST['username']);
	//escapes special characters in a string
	$username = mysqli_real_escape_string($con,$username);
	$query = "SELECT * FROM `users` WHERE `username`='".$_POST['username']."'";
	$result = mysqli_query($con,$query);
	$rows = mysqli_num_rows($result);
	if ($rows==0)
	{
		$email = stripslashes($_POST['email']);
		$email = mysqli_real_escape_string($con,$email);
		$query1 = "SELECT * FROM `users` WHERE `email`='".$_POST['email']."'";
		$result1 = mysqli_query($con,$query1);
		$rows1 = mysqli_num_rows($result1);
		if ($rows1==0)
		{
			$password = stripslashes($_POST['password']);
			$first_name = $_POST['first_name'];
			$last_name = $_POST['last_name'];
			$lang_id = $_POST['lang_id'];
			$password = mysqli_real_escape_string($con,$password);
			$trn_date = date("Y-m-d H:i:s");
			$key = md5($email);
			$addKey = substr(md5(uniqid(rand(),1)),3,10);
			$key = $key . $addKey;
			$query = "INSERT into `users` (`username`,`password`, `email`,`trn_date`,`key`,`active`,`first_name`,`last_name`,`default_lang_id`) VALUES ('".$username."','".md5($password)."','".$email."','".$trn_date."','".$key."', 0,'".$first_name."','".$last_name."',".$lang_id.")";
			$result = mysqli_query($con,$query);
			if($result){
				$mail=create_email_activation($email,$key);
				if(!$mail->Send()){
				echo json_encode(array("status"=>"Error","result"=>"Mailer Error: " . $mail->ErrorInfo));
				}else{
				echo json_encode(array("status"=>"OK","result"=>"You have been successfully registered. We have sent you an e-mail with a link to activate your account. Please, check your mailbox."));
				 }
			}
		}
		else
		{
			echo json_encode(array("status"=>"Error","result"=>"Email '".$_POST['email']."' is in use. Please, introduce another email."));
		}
	}
	else
	{
		echo json_encode(array("status"=>"Error","result"=>"Username '".$_POST['username']."' is in use. Please, introduce another username."));
	}
}
else
{	
?>
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
elseif (isset($_REQUEST['username'])){
	//echo "Hello";
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
			$query1 = "SELECT * FROM `users` WHERE `email`='".$_REQUEST['email']."'";
			$result1 = mysqli_query($con,$query1);
			$rows1 = mysqli_num_rows($result1);
			if ($rows1==0)
			{
				$password = stripslashes($_REQUEST['password']);
				$first_name = $_REQUEST['first_name'];
				$last_name = $_REQUEST['last_name'];
				$password = mysqli_real_escape_string($con,$password);
				$trn_date = date("Y-m-d H:i:s");
				$key = md5($email);
				$addKey = substr(md5(uniqid(rand(),1)),3,10);
				$key = $key . $addKey;
				//$mail=create_email_activation($email,$key);
				$query = "INSERT into `users` (`username`,`password`, `email`,`trn_date`,`key`,`active`,`first_name`,`last_name`,`default_lang_id`) VALUES ('".$username."','".md5($password)."','".$email."','".$trn_date."','".$key."', 0,'".$first_name."','".$last_name."',".$_REQUEST['lang'].")";
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
				echo "<div class='form'><h3>Email '".$_REQUEST['email']."' is in use. Please, introduce another email.</h3><br/>Click here to <a href='login.php'>Login</a><br/>Click here to <a href='registration.php'>Registration</a></div>";
			}
		}
		else
		{
			echo "<div class='form'><h3>Username '".$_REQUEST['username']."' is in use. Please, introduce another username.</h3><br/>Click here to <a href='login.php'>Login</a><br/>Click here to <a href='registration.php'>Registration</a></div>";
		}
    }else{
		require_once('website_translation.php');
?>
<div class="form">
<h1><?php echo $website["REGISTRATION"];?></h1>
<form name="registration" action="" method="post">
<input type="text" name="username" placeholder="<?php echo $website["USERNAME"];?>" required />
<input type="email" name="email" placeholder="<?php echo $website["EMAIL"];?>" required />
<input type="password" name="password" placeholder="<?php echo $website["PASSWORD"];?>" required />
<input type="text" name="first_name" placeholder="<?php echo $website["FIRST_NAME"];?>" required />
<input type="text" name="last_name" placeholder="<?php echo $website["LAST_NAME"];?>" required />
<p> <label for="lang"><?php echo $website["LANGUAGE"];?>:</label>
<select id="lang" name="lang">
  <option value="4"><?php echo $website["ENGLISH"];?></option>
  <option value="5"><?php echo $website["SPANISH"];?></option>
</select> </p>
<input type="submit" name="submit" value="Register" />
</form>
<p><?php echo $website["ALREADY_REGISTERED"];?> <a href='login.php'><?php echo $website["LOGIN_HERE"];?></a></p>
</div>
<?php } ?>
</div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>
<?php
}
?>
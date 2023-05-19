<!DOCTYPE html>
<html>
<?php include "head.php"; ?>
<body>
<?php
require_once('db.php');
require('functions.php');
?>
	<div id="header"><?php include "inc-header.php" ?></div>
	<div id="content" style="margin-top:3em; margin-left:0.5em">
<?php
if(isset($_POST["email"]) && (!empty($_POST["email"]))){
	$error='';
	$email = $_POST["email"];
	$email = filter_var($email, FILTER_SANITIZE_EMAIL);
	$email = filter_var($email, FILTER_VALIDATE_EMAIL);
if (!$email) {
   $error .="<p>Invalid email address please type a valid email address!</p>";
   }else{
   //$sel_query = "SELECT * FROM `users` WHERE email='".$email."'";
   //$results = mysqli_query($con,$sel_query);
   $sel_query = "SELECT * FROM `users` WHERE email=?";
   $statement_sel=mysqli_prepare($con,$sel_query);
   $statement_sel->bind_param("s",$email);
   $statement_sel->execute();
   $results=$statement_sel->get_result();
   $row = mysqli_num_rows($results);
   if ($row==""){
   $error .= "<p>No user is registered with this email address!</p>";
   }
  }
   if($error!=""){
   echo "<div class='error'>".$error."</div>
   <br /><a href='javascript:history.go(-1)'>Go Back</a>";
   }else{
	
   $expFormat = mktime(date("H"), date("i"), date("s"), date("m") ,date("d")+1, date("Y"));
   $expDate = date("Y-m-d H:i:s",$expFormat);
   //$key = md5(2418*2+$email);
   $key = md5($email);
   $addKey = substr(md5(uniqid(rand(),1)),3,10);
   $key = $key . $addKey;
// Insert Temp Table
//$query="INSERT INTO `password_reset_temp` (`email`, `key`, `expDate`) VALUES ('".$email."', '".$key."', '".$expDate."')";
//mysqli_query($con,$query);
$query="INSERT INTO `password_reset_temp` (`email`, `key`, `expDate`) VALUES (?,?,?)";
$statement=mysqli_prepare($con,$query);
$statement->bind_param("sss",$email,$key,$expDate);
$statement->execute();
 $mail=create_email_password_recovery($email,$key);
if(!$mail->Send()){
echo "Mailer Error: " . $mail->ErrorInfo;
}else{
echo "<div class='error'>
<p>An email has been sent to you with instructions on how to reset your password.</p>
</div><br /><br /><br />";
 }
   }
}else{
?>
<div class="form">
<h1>Lost Password?</h1>
<form method="post" action="" name="reset"><br />
<input type="email" name="email" placeholder="username@email.com" />
<br /><br />
<input type="submit" value="Reset Password"/>
</form>
<p>&nbsp;</p>
<p>Not registered yet? <a href='registration.php'>Register Here</a></p>
<p>Login <a href='login.php'>Login Here</a></p>
</div>
<?php } ?>
</div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>
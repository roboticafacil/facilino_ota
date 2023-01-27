<!DOCTYPE html>
<html>
<?php include "head.php"; ?>
<body>
<?php
require_once('db.php');
?>
	<div id="header"><?php include "inc-header.php" ?></div>
	<div id="content" style="margin-top:3em; margin-left:0.5em">
<?php
$error='';
if (isset($_GET["key"]) && isset($_GET["email"]) && isset($_GET["action"]) 
&& ($_GET["action"]=="reset") && !isset($_POST["action"])){
  $key = $_GET["key"];
  $email = $_GET["email"];
  $curDate = date("Y-m-d H:i:s");
  //$query="SELECT * FROM `password_reset_temp` WHERE `key`='".$key."' and `email`='".$email."';";
  //$result = mysqli_query($con,$result);
  $query="SELECT * FROM `password_reset_temp` WHERE `key`='".$key."' and `email`='".$email."';";
  $statement=mysqli_prepare($con,$query);
  $statement->bind_param("ss",$key,$email);
  $statement->execute();
  $result=$statement->get_result();
  $row = mysqli_num_rows($result);
  $dir = $_SERVER['HTTP_HOST'];
  if (strpos($_SERVER['HTTP_HOST'],'localhost')>=0)
  $lost_password='lost-password.php';
  else
  {
    $url = $_SERVER['REQUEST_URI']; //returns the current URL
    $parts = explode('/',$url);
    for ($i = 0; $i < count($parts)- 1; $i++) {
      $dir .= $parts[$i] . "/";
    }
    $lost_password='https://'.$dir.'lost-password.php';
  } 
  if ($row==""){
    $error .= '<h2>Invalid Link</h2><p>The link is invalid/expired. Either you did not copy the correct link from the email, or you have already used the key in which case it is  deactivated.</p> <p><a href="'.$lost_password.'"> Click here</a> to reset password.</p>';
  }
  else
  {
	  $row = mysqli_fetch_assoc($result);
	  $expDate = $row['expDate'];
	  if ($expDate >= $curDate){
	    ?>
	    <br />
	    <div class="form">
	    <h1>Reset Password</h1>
	    <form method="post" action="" name="update">
	    <input type="hidden" name="action" value="update" />
	    <br /><br />
	    <label><strong>Enter New Password:</strong></label><br />
	    <input type="password" name="pass1" maxlength="15" required />
	    <br /><br />
	    <label><strong>Re-Enter New Password:</strong></label><br />
	    <input type="password" name="pass2" maxlength="15" required/>
	    <br /><br />
	    <input type="hidden" name="email" value="<?php echo $email;?>"/>
	    <input type="submit" value="Reset Password"/>
	    </form>
	    </div>
	    <?php
	  }
	  else{
	    $error .= "<h2>Link Expired</h2>
	    <p>The link is expired. You are trying to use the expired link which 
	    as valid only 24 hours (1 days after request).<br /><br /></p>";
      }
  }
if($error!=""){
  echo "<div class='error'>".$error."</div><br />";
  } 
} // isset email key validate end
if(isset($_POST["email"]) && isset($_POST["action"]) &&
 ($_POST["action"]=="update")){
$error="";
$pass1 = mysqli_real_escape_string($con,$_POST["pass1"]);
$pass2 = mysqli_real_escape_string($con,$_POST["pass2"]);
$email = $_POST["email"];
$curDate = date("Y-m-d H:i:s");
if ($pass1!=$pass2){
$error.= "<p>Password do not match, both password should be same.<br /><br /></p>";
  }
  if($error!=""){
echo "<div class='error'>".$error."</div><br />";
}else{
$pass1 = md5($pass1);
mysqli_query($con,
"UPDATE `users` SET `password`='".$pass1."', `trn_date`='".$curDate."' 
WHERE `email`='".$email."';"
);
 
//$query="DELETE FROM `password_reset_temp` WHERE `email`='".$email."'";
$query="DELETE FROM `password_reset_temp` WHERE `email`=?";
//mysqli_query($con,$query);
$statement=mysqli_prepare($con,$query);
$statement->bind_param("s",$email);
$statement->execute();
 $dir = $_SERVER['HTTP_HOST'];
	 if (strpos($_SERVER['HTTP_HOST'],'localhost')>=0)
		$login='login.php';
	 else
	 {
		$url = $_SERVER['REQUEST_URI']; //returns the current URL
		$parts = explode('/',$url);
		for ($i = 0; $i < count($parts)- 1; $i++) {
			$dir .= $parts[$i] . "/";
		}
		$login='https://'.$dir.'login.php';
	 }
echo '<div class="error"><p>Congratulations! Your password has been updated successfully.</p><p><a href="'.$login.'">Click here</a> to Login.</p></div><br />';
   } 
}
?>
</div>
<div id="ads"><?php include "ads.php" ?></div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>
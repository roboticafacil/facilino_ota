<?php

function isLocalhost($whitelist = ['127.0.0.1', '::1']) {
    return in_array($_SERVER['REMOTE_ADDR'], $whitelist);
}


function create_email_password_recovery($email,$key)
{
	$dir = $_SERVER['HTTP_HOST'];
	 if (isLocalhost())
		$reset='http://'.$dir.'/Facilino/src/facilino-ota/html2/reset-password.php';
	 else
	 {
		$url = $_SERVER['REQUEST_URI']; //returns the current URL
		$parts = explode('/',$url);
		for ($i = 0; $i < count($parts)- 1; $i++) {
			$dir .= $parts[$i] . "/";
		}
		$reset='https://'.$dir.'reset-password.php';
	 }
	$output='<p>Dear user,</p>';
$output.='<p>Please click on the following link to reset your password.</p>';
$output.='<p>-------------------------------------------------------------</p>';
$output.='<p><a href="'.$reset.'?key='.$key.'&email='.$email.'&action=reset" target="_blank">'.$reset.'?key='.$key.'&email='.$email.'&action=reset</a></p>';
$output.='<p>-------------------------------------------------------------</p>';
$output.='<p>Please be sure to copy the entire link into your browser.
The link will expire after 1 day for security reason.</p>';
$output.='<p>If you did not request this forgotten password email, no action 
is needed, your password will not be reset. However, you may want to log into 
your account and change your security password as someone may have guessed it.</p>';   
$output.='<p>Thanks,</p>';
$output.='<p>Robotica Fácil Team</p>';
$body = $output; 
$subject = "Facilino Password Recovery";
 
$email_to = $email;
$fromserver = "no-reply@roboticafacil.es"; 
require("PHPMailer/PHPMailerAutoload.php");
$mail = new PHPMailer();
$mail->IsSMTP();
$mail->Host = "smtp.hostinger.es"; // Enter your host here
$mail->SMTPAuth = true;
$mail->CharSet = 'UTF-8';
$mail->Encoding = 'base64';
$mail->Username = "no-reply@roboticafacil.es"; // Enter your email here
$mail->Password = "xxx"; //Enter your password here
$mail->Port = 587;
$mail->IsHTML(true);
$mail->setFrom('no-reply@roboticafacil.es', 'Robótica Fácil');
$mail->AddAddress($email);
$mail->Sender = $fromserver; // indicates ReturnPath header
$mail->Subject = $subject;
$mail->Body = $body;
return $mail;
}

function create_email_activation($email,$key)
{
	$dir = $_SERVER['HTTP_HOST'];
	 if (isLocalhost())
		$registration='http://'.$dir.'/Facilino/src/facilino-ota/html2/registration.php';
	 else
	 {
		$url = $_SERVER['REQUEST_URI']; //returns the current URL
		$parts = explode('/',$url);
		for ($i = 0; $i < count($parts)- 1; $i++) {
			$dir .= $parts[$i] . "/";
		}
		$registration='https://'.$dir.'registration.php';
	 }
	$output='<p>Dear user,</p>';
	$output.='<p>Please click on the following link to activate your account.</p>';
	$output.='<p>-------------------------------------------------------------</p>';
	$output.='<p><a href="'.$registration.'?key='.$key.'&action=activate" target="_blank">'.$registration.'?key='.$key.'&action=activate</a></p>';
	$output.='<p>-------------------------------------------------------------</p>';
	$output.='<p>Please be sure to copy the entire link into your browser.</p>';
	$output.='<p>If you did not request this activation email, no action 
is needed, your account will not be modified. However, you may want to log into 
your account and change your security password as someone may have guessed it.</p>';   
	$output.='<p>Thanks,</p>';
	$output.='<p>Robotica Fácil Team</p>';
	$body = $output; 
	$subject = "Facilino Account Activation";
 
	$email_to = $email;
	$fromserver = "no-reply@roboticafacil.es"; 
	require("PHPMailer/PHPMailerAutoload.php");
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->Host = "smtp.hostinger.es"; // Enter your host here
	$mail->SMTPAuth = true;
	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	$mail->Username = "no-reply@roboticafacil.es"; // Enter your email here
	$mail->Password = "xxx"; //Enter your password here
	$mail->Port = 587;
	$mail->IsHTML(true);
	$mail->setFrom('no-reply@roboticafacil.es', 'Robótica Fácil');
	$mail->AddAddress($email);
	$mail->Sender = $fromserver; // indicates ReturnPath header
	$mail->Subject = $subject;
	$mail->Body = $body;
    return $mail;
}

function create_email_activated($email,$key)
{
	$dir = $_SERVER['HTTP_HOST'];
	 if (isLocalhost())
		$login='http://'.$dir.'/Facilino/src/facilino-ota/html2/login.php';
	 else
	 {
		$url = $_SERVER['REQUEST_URI']; //returns the current URL
		$parts = explode('/',$url);
		for ($i = 0; $i < count($parts)- 1; $i++) {
			$dir .= $parts[$i] . "/";
		}
		$login='https://'.$dir.'login.php';
	 }
	$output='<p>Dear user,</p>';
	$output.='<p>This email is to inform you that your account has been activated. Now, you can login into:</p>';
	$output.='<p>-------------------------------------------------------------</p>';
	$output.='<p><a href="'.$login.'" target="_blank">'.$login.'</a></p>';
	$output.='<p>-------------------------------------------------------------</p>';
	$output.='<p>Please be sure to copy the entire link into your browser.</p>';
	$output.='<p>If you did not request the account activation an inmediate action is required. Please, log into 
your account and change your security password as someone may have guessed it.</p>';   
	$output.='<p>Thanks,</p>';
	$output.='<p>Robotica Fácil Team</p>';
	$body = $output; 
	$subject = "Facilino Account Activated";
 
	$email_to = $email;
	$fromserver = "no-reply@roboticafacil.es"; 
	require("PHPMailer/PHPMailerAutoload.php");
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->Host = "smtp.hostinger.es"; // Enter your host here
	$mail->SMTPAuth = true;
	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	$mail->Username = "no-reply@roboticafacil.es"; // Enter your email here
	$mail->Password = "xxx"; //Enter your password here
	$mail->Port = 587;
	$mail->IsHTML(true);
	$mail->setFrom('no-reply@roboticafacil.es', 'Robótica Fácil');
	$mail->AddAddress($email);
	$mail->Sender = $fromserver; // indicates ReturnPath header
	$mail->Subject = $subject;
	$mail->Body = $body;
    return $mail;
}

function create_email_reviewer_request($username,$email,$key,$language,$academic,$electronics,$block,$additional)
{
	$dir = $_SERVER['HTTP_HOST'];
	 if (isLocalhost())
	 {
		$accept='http://'.$dir.'/Facilino/src/facilino-ota/html2/user.php?username='.$username.'&action=accept_as_reviewer';
		$decline='http://'.$dir.'/Facilino/src/facilino-ota/html2/translate.php?username='.$username.'&action=decline_as_reviewer';
	 }
	 else
	 {
		$url = $_SERVER['REQUEST_URI']; //returns the current URL
		$parts = explode('/',$url);
		for ($i = 0; $i < count($parts)- 1; $i++) {
			$dir .= $parts[$i] . "/";
		}
		$accept='https://'.$dir.'user.php?username='.$username.'&action=accept_as_reviewer';
		$decline='https://'.$dir.'translate.php?username='.$username.'&action=decline_as_reviewer';
	 }
	$output='<p>Dear Administrator,</p>';
	$output.='<p>This email is to inform you that a Facilino translation request has been submitted. Please, accept or decline the application.</p>';
	$output.='<p>-------------------------------------------------------------</p>';
	$output.='<p>Username: '.$username.'</p>';
	$output.='<p>Email: '.$email.'</p>';
	$output.='<p>Language: '.$language.'</p>';
	$output.='<p>Academic: '.$academic.'</p>';
	$output.='<p>Electronics: '.$electronics.'</p>';
	$output.='<p>Block: '.$block.'</p>';
	$output.='<p>Additional info: '.$additional.'</p>';
	$output.='<p>-------------------------------------------------------------</p>';
	$output.='<p><a href="'.$accept.'" target="_blank">Accept</a></p>';
	$output.='<p><a href="'.$decline.'" target="_blank">Decline</a></p>';
	$output.='<p>-------------------------------------------------------------</p>';
	$output.='<p>If you did not request to be a reviewer an inmediate action is required. Please, log into 
your account and change your security password as someone may have guessed it.</p>';   
	$output.='<p>Thanks,</p>';
	$output.='<p>Robotica Fácil Team</p>';
	$body = $output; 
	$subject = "Facilino Translation Request";
 
	$email_to = "soporte@roboticafacil.es";
	$fromserver = "no-reply@roboticafacil.es"; 
	require("PHPMailer/PHPMailerAutoload.php");
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->Host = "smtp.hostinger.es"; // Enter your host here
	$mail->SMTPAuth = true;
	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	$mail->Username = "no-reply@roboticafacil.es"; // Enter your email here
	$mail->Password = "xxx"; //Enter your password here
	$mail->Port = 587;
	$mail->IsHTML(true);
	$mail->setFrom('no-reply@roboticafacil.es', 'Robótica Fácil');
	$mail->AddAddress($email_to);
	$mail->Sender = $fromserver; // indicates ReturnPath header
	$mail->Subject = $subject;
	$mail->Body = $body;
    return $mail;
}

function create_email_reviewer_response($email,$first_name,$response,$comments="")
{
	$output='<p>Dear '.$first_name.',</p>';
	if ($response==1)
	{
		$output.='<p>This email is to inform you that your Facilino Translation request has been accepted. We thank you in advance for your kind interest. Now, you can translate Facilino into your native language or review pending translations from other contributors. We will, eventually, send you pending reviews, please, accept or decline the text to review. <b>If you detect an inappropriate translation, please, do not hesitate to report it</b>.</p>';
	}
	else
	{
		$output.='<p>We regret to inform you that your Facilino Translation request has been declined. Please, check the comments below.</p>';
		$output.='<p>-------------------------------------------------------------</p>';
		$output.='<p>Comments: '.$comments.'</p>';
		$output.='<p>-------------------------------------------------------------</p>';
	}
	$output.='<p>If you did not request to be part of the Facilino Translation Team, an inmediate action is required. Please, log into 
your account and change your security password as someone may have guessed it.</p>';   
	$output.='<p>Thanks,</p>';
	$body = $output; 
	$subject = "Facilino Translation Response";
 
	$email_to = $email;
	$fromserver = "no-reply@roboticafacil.es"; 
	require("PHPMailer/PHPMailerAutoload.php");
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->Host = "smtp.hostinger.es"; // Enter your host here
	$mail->SMTPAuth = true;
	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	$mail->Username = "no-reply@roboticafacil.es"; // Enter your email here
	$mail->Password = "xxx"; //Enter your password here
	$mail->Port = 587;
	$mail->IsHTML(true);
	$mail->setFrom('no-reply@roboticafacil.es', 'Robótica Fácil');
	$mail->AddAddress($email_to);
	$mail->Sender = $fromserver; // indicates ReturnPath header
	$mail->Subject = $subject;
	$mail->Body = $body;
    return $mail;
}

function create_email_academic_request($username,$email,$key,$academic,$id_card,$credentials,$additional)
{
	$dir = $_SERVER['HTTP_HOST'];
	 if (isLocalhost())
	 {
		$accept='http://'.$dir.'/Facilino/src/facilino-ota/html2/user.php?username='.$username.'&action=accept_as_academic';
		$decline='http://'.$dir.'/Facilino/src/facilino-ota/html2/academy_program.php?username='.$username.'&action=decline_as_academic';
	 }
	 else
	 {
		$url = $_SERVER['REQUEST_URI']; //returns the current URL
		$parts = explode('/',$url);
		for ($i = 0; $i < count($parts)- 1; $i++) {
			$dir .= $parts[$i] . "/";
		}
		$accept='https://'.$dir.'user.php?username='.$username.'&action=accept_as_academic';
		$decline='https://'.$dir.'academy_program.php?username='.$username.'&action=decline_as_academic';
	 }
	$output='<p>Dear Administrator,</p>';
	$output.='<p>This email is to inform you that a Academic request has been submitted. Please, accept or decline the application.</p>';
	$output.='<p>-------------------------------------------------------------</p>';
	$output.='<p>Username: '.$username.'</p>';
	$output.='<p>Email: '.$email.'</p>';
	$output.='<p>Academic: '.$academic.'</p>';
	$output.='<p>ID card: </p>';
	$output.='<p><img src="'.$id_card.'"></img></p>';
	$output.='<p>Credentials: </p>';
	$output.='<p><img src="'.$credentials.'"></img></p>';
	$output.='<p>Additional info: '.$additional.'</p>';
	$output.='<p>-------------------------------------------------------------</p>';
	$output.='<p><a href="'.$accept.'" target="_blank">Accept</a></p>';
	$output.='<p><a href="'.$decline.'" target="_blank">Decline</a></p>';
	$output.='<p>-------------------------------------------------------------</p>';
	$output.='<p>If you did not request membership as academic an inmediate action is required. Please, log into 
your account and change your security password as someone may have guessed it.</p>';   
	$output.='<p>Thanks,</p>';
	$output.='<p>Robotica Fácil Team</p>';
	$body = $output; 
	$subject = "Facilino Academic Request";
 
	$email_to = "soporte@roboticafacil.es";
	$fromserver = "no-reply@roboticafacil.es"; 
	require("PHPMailer/PHPMailerAutoload.php");
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->Host = "smtp.hostinger.es"; // Enter your host here
	$mail->SMTPAuth = true;
	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	$mail->Username = "no-reply@roboticafacil.es"; // Enter your email here
	$mail->Password = "xxx"; //Enter your password here
	$mail->Port = 587;
	$mail->IsHTML(true);
	$mail->setFrom('no-reply@roboticafacil.es', 'Robótica Fácil');
	$mail->AddAddress($email_to);
	$mail->Sender = $fromserver; // indicates ReturnPath header
	$mail->Subject = $subject;
	$mail->Body = $body;
    return $mail;
}

function create_email_academic_response($email,$first_name,$response,$comments="")
{
	$output='<p>Dear '.$first_name.',</p>';
	if ($response==1)
	{
		$output.='<p>This email is to inform you that your academic membership request has been accepted. Now, you can get benefit of full features of Facilino next time you log in. Please, check that the change has been made effective in your user profile.</p>';
	}
	else
	{
		$output.='<p>We regret to inform you that your academic membership request has been declined. Please, check the comments below and submit again.</p>';
		$output.='<p>-------------------------------------------------------------</p>';
		$output.='<p>Comments: '.$comments.'</p>';
		$output.='<p>-------------------------------------------------------------</p>';
	}
	$output.='<p>If you did not request membership as academic an inmediate action is required. Please, log into 
your account and change your security password as someone may have guessed it.</p>';   
	$output.='<p>Thanks,</p>';
	$body = $output; 
	$subject = "Facilino Academic Membership Response";
 
	$email_to = $email;
	$fromserver = "no-reply@roboticafacil.es"; 
	require("PHPMailer/PHPMailerAutoload.php");
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->Host = "smtp.hostinger.es"; // Enter your host here
	$mail->SMTPAuth = true;
	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	$mail->Username = "no-reply@roboticafacil.es"; // Enter your email here
	$mail->Password = "xxx"; //Enter your password here
	$mail->Port = 587;
	$mail->IsHTML(true);
	$mail->setFrom('no-reply@roboticafacil.es', 'Robótica Fácil');
	$mail->AddAddress($email_to);
	$mail->Sender = $fromserver; // indicates ReturnPath header
	$mail->Subject = $subject;
	$mail->Body = $body;
    return $mail;
}

function create_email_account_changed($email,$first_name,$account_name)
{
	$output='<p>Dear '.$first_name.',</p>';
	$output.='<p>This email is to inform your account has been changed to '.$account_name.'.</p>';
	$output.='<p>If you did not request this change, an inmediate action is required. Please, log into 
your account and change your security password as someone may have guessed it and contact the administrators.</p>';   
	$output.='<p>Thanks,</p>';
	$body = $output; 
	$subject = "Facilino Standard User Downgrade";
 
	$email_to = $email;
	$fromserver = "no-reply@roboticafacil.es"; 
	require("PHPMailer/PHPMailerAutoload.php");
	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->Host = "smtp.hostinger.es"; // Enter your host here
	$mail->SMTPAuth = true;
	$mail->CharSet = 'UTF-8';
	$mail->Encoding = 'base64';
	$mail->Username = "no-reply@roboticafacil.es"; // Enter your email here
	$mail->Password = "xxx"; //Enter your password here
	$mail->Port = 587;
	$mail->IsHTML(true);
	$mail->setFrom('no-reply@roboticafacil.es', 'Robótica Fácil');
	$mail->AddAddress($email_to);
	$mail->Sender = $fromserver; // indicates ReturnPath header
	$mail->Subject = $subject;
	$mail->Body = $body;
    return $mail;
}
?>
<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
	
require('PHPMailer/Exception.php');
require('PHPMailer/PHPMailer.php');
require('PHPMailer/SMTP.php');

$email_to="leo.armesto.angel@gmail.com";
$subject="Test";
$body="Hello guy!";

$fromserver="noreplyfacilino@gmail.com";
$mail = new PHPMailer();
$mail->IsSMTP();
$mail->Host = "smtp.gmail.com"; // Enter your host here
$mail->SMTPAuth = true;

$mail->CharSet = 'UTF-8';
$mail->Encoding = 'base64';
$mail->Username = "noreplyfacilino@gmail.com";
$mail->Password = "bxbmeihbvrtzpzks";
$mail->Port=465;
$mail->IsHTML(true);
$mail->setFrom('roreplyfacilino@gmail.com', 'Facilino');
$mail->AddAddress($email_to);
$mail->Sender = $fromserver; // indicates ReturnPath header
$mail->Subject = $subject;
$mail->Body = $body;

$mail->Send();

?>
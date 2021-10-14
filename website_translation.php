<?php
require_once('db.php');
if (session_status() !== PHP_SESSION_ACTIVE)
{
	session_start();
}
if(strpos($_SERVER['PHP_SELF'],'index.php') !== false)
{
	
	if (isset($_GET["lang"])&&(isset($_SESSION["username"])))
	{
		$lang=$_GET["lang"];
		$query_translate="UPDATE `users` SET `default_lang_id`=(SELECT `id` FROM `languages` WHERE `lang_key`=\"".$_GET["lang"]."\") WHERE `username`=\"".$_SESSION["username"]."\"";
		$result_translate=mysqli_query($con,$query_translate);
	}
	else
	{
		if(isset($_SESSION["username"]))
		{
			$query_translate= "SELECT `languages`.`lang_key` FROM `users` INNER JOIN `languages` on (`languages`.`id`=`users`.`default_lang_id`) WHERE `users`.`username`=\"".$_SESSION["username"]."\"";
			$result_translate = mysqli_query($con,$query_translate);
			$num_rows_translate = mysqli_num_rows($result_translate);
			if ($num_rows_translate==1)
			{
				$row_translate=mysqli_fetch_row($result_translate);
				$lang=$row_translate[0];
			}
			else
			{
				$lang='en-GB';
			}
		}
		else
		{
			$lang='en-GB';
		}
	}
}
else
{
	if(isset($_SESSION["username"]))
	{
		$query_translate= "SELECT `languages`.`lang_key` FROM `users` INNER JOIN `languages` on (`languages`.`id`=`users`.`default_lang_id`) WHERE `users`.`username`=\"".$_SESSION["username"]."\"";
		$result_translate = mysqli_query($con,$query_translate);
		$num_rows_translate = mysqli_num_rows($result_translate);
		if ($num_rows_translate==1)
		{
			$row_translate=mysqli_fetch_row($result_translate);
			$lang=$row_translate[0];
		}
		else
		{
			$lang='en-GB';
		}
	}
	else
	{
		$lang='en-GB';
	}
}
$query_website = "SELECT `key`,`".$lang."` FROM `translate` WHERE 1";
$result_website = mysqli_query($con,$query_website);
$translation=mysqli_fetch_all($result_website,MYSQLI_ASSOC);
$website=array();
foreach ($translation as $entry)
{
	$website[$entry["key"]]=$entry[$lang];
}
?>
<?php
require_once('db.php');
require_once('website_translation.php');
include("auth.php");
?>
<!DOCTYPE html>
<html><?php include "head.php"; 
?>
<body>
		<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:2em; margin-left: 0.5em; margin-right: 0.5em">
		<h3><?php echo $website["FACILINO_TRANSLATE"] ?></h3>
		<?php
		if (isset($_GET["action"])&&($_GET["action"]=="translate")&&!isset($_POST["action"])&&isset($_POST["upload_button"])){
			//Upload JSON file
			$upload_dir = 'uploads/';
			$uploaded_file = $upload_dir . basename($_FILES['translation_file']['name']);
			//$query_lang = "SELECT `lang_key` from `languages` where id=".$_POST["language_id"];
			//$result_lang = mysqli_query($con,$query_lang);
			$query_lang = "SELECT `lang_key` from `languages` where id=?";
			$statement_lang=mysqli_prepare($con,$query_lang);
			$statement_lang->bind_param("i",$_POST["language_id"]);
			$statement_lang->execute();
			$result_lang=$statement_lang->get_result();
			$rows_lang = mysqli_num_rows($result_lang);
			if ($rows_lang==1)
			{
				$row_lang = mysqli_fetch_row($result_lang);
				echo '<pre>';
				if (move_uploaded_file($_FILES['translation_file']['tmp_name'], $uploaded_file)) {
					echo "The file was successfully uploaded\n";
					$string = file_get_contents($uploaded_file);
					$json_a = json_decode($string, true);
					if (isset($json_a["langs"][$row_lang[0]]))
					{
						$lang_keys=$json_a["langs"][$row_lang[0]]["keys"];
						foreach ($lang_keys as $key => $lang_key) {
//							$query = "SELECT `key`,`value` FROM `lang_keys_".$row_lang[0]."` WHERE `key`='".$key."'";
							//$result = mysqli_query($con,$query);
							$query = "SELECT `key`,`value` FROM `lang_keys_".$row_lang[0]."` WHERE `key`=?";
							$statement=mysqli_prepare($con,$query);
							$statement->bind_param("s",$key);
							$statement->execute();
							$result=$statement->get_result();
							$rows = mysqli_num_rows($result);
							if ($rows==1)
							{
								//Key has been found. Create a meta entry to be reviewed
								//TODO: Si los contenidos están vacíos?? Actualizamos `lang_keys` o `lang_keys_meta`
								$row_key_lang = mysqli_fetch_row($result);
								if (is_null($row_key_lang[1]))
								{
									//$query = "UPDATE `lang_keys_".$row_lang[0]."` SET `value`=\"".$lang_key."\" WHERE `key`='".$key."'";
									//$result = mysqli_query($con,$query);
									$query = "UPDATE `lang_keys_".$row_lang[0]."` SET `value`=? WHERE `key`=?";
									$statement=mysqli_prepare($con,$query);
									$statement->bind_param("ss",$lang_key,$key);
									$statement->execute();
									echo "lang_keys[".$row_lang[0]."] update ".$key.": ".$lang_key."\n";
								}
								else
								{
									//$query = "UPDATE `lang_keys_".$row_lang[0]."` SET `value_temp`=\"".$lang_key."\" WHERE `key`='".$key."'";
									//$result = mysqli_query($con,$query);
									$query = "UPDATE `lang_keys_".$row_lang[0]."` SET `value_temp`=? WHERE `key`=?";
									$statement=mysqli_prepare($con,$query);
									$statement->bind_param("ss",$lang_key,$key);
									$statement->execute();
									echo "lang_keys[".$row_lang[0]."] update temp ".$key.": ".$lang_key."\n";
								}
							}
							elseif ($rows==0)
							{
								//Key not found. Insert a new one
								//$query = "INSERT INTO `lang_keys_".$row_lang[0]."` (`key`,`value`) VALUES ('".$key."',\"".$lang_key."\")";
								//$result = mysqli_query($con,$query);
								$query = "INSERT INTO `lang_keys_".$row_lang[0]."` (`key`,`value`) VALUES (?,?)";
								$statement=mysqli_prepare($con,$query);
								$statement->bind_param("ss",$key,$lang_key);
								$statement->execute();
								echo "lang_keys[".$row_lang[0]."] insert ".$key.": ".$lang_key."\n";
							}
						}
					}
				} else {
					echo "Possible file attack!\n";
				}
				echo "</pre>";
			}
		}
		elseif (isset($_GET["action"])&&($_GET["action"]=="translate")&&!isset($_POST["action"])&&isset($_POST["cancel_button"])){
			//Cancel button
			header("Location: dashboard.php");
		}
		elseif (isset($_GET["action"])&&($_GET["action"]=="translate")&&!isset($_POST["action"])&&isset($_POST["translate_button"])){ 
			//Upload a single translation
			//$query_translator = "SELECT id FROM `users` WHERE `username`=\"".$_SESSION["username"]."\"";
			//$result_translator = mysqli_query($con,$query_translator);
			$query_translator = "SELECT id FROM `users` WHERE `username`=?";
			$statement_translator=mysqli_prepare($con,$query_translator);
			$statement_translator->bind_param("s",$_SESSION["username"]);
			$statement_translator->execute();
			$result_translator=$statement_translator->get_result();
			$rows_translator = mysqli_num_rows($result_translator);
			if ($rows_translator==1)
			{
				$translator_id=mysqli_fetch_row($result_translator);
				$translated_key=substr($_POST["translated_key"], 0, -1);
				$query_lang = "SELECT id,name,lang_key from `languages` where 1";
				$result_lang = mysqli_query($con,$query_lang);
				$rows_lang = mysqli_num_rows($result_lang);
				$languages = array();
				if ($rows_lang>0)
				{
					for ($j = 0; $j < $rows_lang; $j++)
					{
						$row_lang = mysqli_fetch_row($result_lang);
						array_push($languages,['name' => $row_lang[1], 'key' => $row_lang[2]]);
					}
					echo "<h3>Your translation has been submitted to a reviewer. Thanks for your contribution!</h3>";
					//$query = "UPDATE `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` SET `value_temp`=\"".$_POST["translated_text"]."\" `translator_id`=".$translator_id." `translation_date`=GETDATE() WHERE `key`=\"".$translated_key."\"";
					//$result = mysqli_query($con,$query);
					$query = "UPDATE `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` SET `value_temp`=?,`translator_id`=?,`translation_date`=GETDATE() WHERE `key`=?";
					$statement=mysqli_prepare($con,$query);
					$statement->bind_param("sis",$_POST["translated_text"],$translator_id,$translated_key);
					$statement->execute();
				}
				else
				{
					echo "<h4>".$website["UPS"]."</h4>";
				}
			}
			else
			{
				echo "<h3>".$website["UPS"]."</h3>";
			}
			echo '<form action="translate.php"><input type="submit" value="'.$website["CONTINUE"].'" /></from>';
		}
		elseif (isset($_GET["action"])&&($_GET["action"]=="translate")&&!isset($_POST["action"])&&isset($_POST["accept_translation_button"])){
			//Accept a given translation
			//$query_reviewer = "SELECT id FROM `users` WHERE `username`=\"".$_SESSION["username"]."\"";
			//$result_reviewer = mysqli_query($con,$query_reviewer);
			$query_reviewer = "SELECT id FROM `users` WHERE `username`=?";
			$statement_reviewer=mysqli_prepare($con,$query_reviewer);
			$statement_reviewer->bind_param("s",$_SESSION["username"]);
			$statement_reviewer->execute();
			$result_reviewer=$statement_reviewer->get_result();
			$rows_reviewer = mysqli_num_rows($result_reviewer);
			if ($rows_reviewer==1)
			{
				$reviewer_id=mysqli_fetch_row($result_translator);
				$reviewed_key=substr($_POST["reviewed_key"], 0, -1);
				$query_lang = "SELECT id,name,lang_key from `languages` where 1";
				$result_lang = mysqli_query($con,$query_lang);
				$rows_lang = mysqli_num_rows($result_lang);
				$languages = array();
				if ($rows_lang>0)
				{
					for ($j = 0; $j < $rows_lang; $j++)
					{
						$row_lang = mysqli_fetch_row($result_lang);
						array_push($languages,['name' => $row_lang[1], 'key' => $row_lang[2]]);
					}
					//$query = "UPDATE `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` SET `value`=\"".$_POST["reviewed_text"]."\", `value_temp`=NULL `reviewer_id=`".$reviewer_id." `review_date`=GETDATE()` WHERE `key`=\"".$reviewed_key."\"";
					//$result = mysqli_query($con,$query);
					$query = "UPDATE `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` SET `value`=?,`value_temp`=NULL,`reviewer_id=`?,`review_date`=GETDATE()` WHERE `key`=?";
					$statement=mysqli_prepare($con,$query);
					$statement->bind_param("sis",$_POST["reviewed_text"],$reviewer_id,$reviewed_key);
					$statement->execute();
					header("Location: translate.php");
				}
				else
				{
					echo "<h4>".$website["CONTINUE"]."</h4>";
					echo '<form action="translate.php"><input type="submit" value="'.$website["CONTINUE"].'" /></from>';
				}
			}
			else
			{
				echo "<h4>".$website["CONTINUE"]."</h4>";
				echo '<form action="translate.php"><input type="submit" value="'.$website["CONTINUE"].'" /></from>';
			}
		}
		elseif (isset($_GET["action"])&&($_GET["action"]=="translate")&&!isset($_POST["action"])&&isset($_POST["decline_translation_button"])){
			//Decline a given translation
			$reviewed_key=substr($_POST["reviewed_key"], 0, -1);
			$query_lang = "SELECT id,name,lang_key from `languages` where 1";
			$result_lang = mysqli_query($con,$query_lang);
			$rows_lang = mysqli_num_rows($result_lang);
			$languages = array();
			if ($rows_lang>0)
			{
				for ($j = 0; $j < $rows_lang; $j++)
				{
					$row_lang = mysqli_fetch_row($result_lang);
					array_push($languages,['name' => $row_lang[1], 'key' => $row_lang[2]]);
				}
			}
			//$query = "UPDATE `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` SET `value_temp`=NULL WHERE `key`=\"".$reviewed_key."\"";
			//$result = mysqli_query($con,$query);
			$query = "UPDATE `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` SET `value_temp`=NULL WHERE `key`=?";
			$statement=mysqli_prepare($con,$query);
			$statement->bind_param("s",$reviewed_key);
			$statement->execute();
			header("Location: translate.php");
		}
		elseif (isset($_GET["action"])&&($_GET["action"]=="translate")&&!isset($_POST["action"])&&isset($_POST["report_translation_button"])){
			//Report a given translation
			$reviewed_key=substr($_POST["reviewed_key"], 0, -1);
			$query_lang = "SELECT id,name,lang_key from `languages` where 1";
			$result_lang = mysqli_query($con,$query_lang);
			$rows_lang = mysqli_num_rows($result_lang);
			$languages = array();
			if ($rows_lang>0)
			{
				for ($j = 0; $j < $rows_lang; $j++)
				{
					$row_lang = mysqli_fetch_row($result_lang);
					array_push($languages,['name' => $row_lang[1], 'key' => $row_lang[2]]);
				}
			}
			//$query = "UPDATE `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` SET `value_temp`=NULL WHERE `key`=\"".$reviewed_key."\"";
			//$result = mysqli_query($con,$query);
			$query = "UPDATE `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` SET `value_temp`=NULL WHERE `key`=?";
			$statement=mysqli_prepare($con,$query);
			$statement->bind_param("s",$reviewed_key);
			$statement->execute();
			//TODO: Pending send the report e-mail.
			echo "<h3>".$website["EMAIL_SENT_REPORT_TRANSLATION"]."</h3>";
			echo '<form action="translate.php"><input type="submit" value="'.$website["CONTINUE"].'" /></from>';
		}
		elseif (isset($_GET["action"])&&($_GET["action"]=="translate")&&!isset($_POST["action"])&&isset($_POST["apply_reviewer"])){
			require("functions.php");
			//$query="SELECT `email`,`key` FROM `users` WHERE `username`=\"".$_SESSION["username"]."\"";
			//$result = mysqli_query($con,$query);
			$query="SELECT `email`,`key` FROM `users` WHERE `username`=?";
			$statement=mysqli_prepare($con,$query);
			$statement->bind_param("s",$_SESSION["username"]);
			$statement->execute();
			$result=$statement->get_result();
			$rows = mysqli_num_rows($result);
			if ($rows==1)
			{
				$row = mysqli_fetch_row($result);
				//$query_lang = "SELECT `name` FROM `languages` WHERE `id`=".$_POST["language_id"];
				//$result_lang = mysqli_query($con,$query_lang);
				$query_lang = "SELECT `name` FROM `languages` WHERE `id`=?";
				$statement_lang=mysqli_prepare($con,$query_lang);
				$statement_lang->bind_param("i",$_POST["language_id"]);
				$statement_lang->execute();
				$result_lang=$statement_lang->get_result();
				$rows_lang = mysqli_num_rows($result_lang);
				if ($rows_lang==1)
				{
					$row_lang=mysqli_fetch_row($result_lang);
					$mail=create_email_reviewer_request($_SESSION["username"],$row[0],$row[1],$row_lang[0],$_POST["academic"],$_POST["electronics"],$_POST["block_programming"],$_POST["additional_info"]);
					if(!$mail->Send()){
						echo "Mailer Error: " . $mail->ErrorInfo;
					}else{
						echo "<h4>".$website["EMAIL_SENT_COLLABORATION_REQUEST"]."</h4>";
						echo '<form action="dashboard.php"><input type="submit" value="'.$website["CONTINUE"].'" /></from>';
					}
				}
			}
			else
			{
				echo "<h4>".$website["UPS"]."</h4>";
				echo '<form action="translate.php"><input type="submit" value="'.$website["CONTINUE"].'" /></from>';
			}
			
		}
		elseif (isset($_GET["action"])&&($_GET["action"]=="decline_as_reviewer")){
			//Decline a user as a reviewer
			//$query="SELECT `id`,`user_role_id`,`email`,`first_name`,`last_name` FROM `users` WHERE `username`=\"".$_GET["username"]."\"";
			//$result = mysqli_query($con,$query);
			$query="SELECT `id`,`user_role_id`,`email`,`first_name`,`last_name` FROM `users` WHERE `username`=?";
			$statement=mysqli_prepare($con,$query);
			$statement->bind_param("s",$_GET["username"]);
			$statement->execute();
			$result=$statement->get_result();
			$rows = mysqli_num_rows($result);
			if ($rows==1)
			{
				$row = mysqli_fetch_row($result);
				echo '<h4>Decline a user as a Contributor</h4>';
				echo '<form action="user.php?action=decline_as_reviewer" method="POST">';
				echo '<table>';
				echo '<tr><td><label>'.$website["USERNAME"].':</label></td><td><label>'.$_GET["username"].'</label></td></tr>';
				echo '<tr><td><label>'.$website["EMAIL"].':</label></td><td><label>'.$row[2].'</label></td></tr>';
				echo '<tr><td><label>'.$website["FIRST_NAME"].':</label></td><td><label>'.$row[3].'</label></td></tr>';
				echo '<tr><td><label>'.$website["LAST_NAME"].':</label></td><td><label>'.$row[4].'</label></td></tr>';
				echo '<tr><td><label>'.$website["COMMENTS"].':</label></td><td><textarea name="comments" style="width:100%; height:10em" maxlength=1000></textarea></td></tr>';
				echo '</table>';
				echo '<input name="username" type="hidden" value="'.$_GET["username"].'"/>';
				echo '<input name="decline_button" type="submit" value="'.$website["DECLINE"].'"/>&nbsp;&nbsp;';
				echo '</form>';
				echo '<form action="dashboard.php">';
				echo '<input name="cancel_button" type="submit" value="'.$website["CANCEL"].'" />';
				echo '</form>';
			}
			else
			{
				echo "<h3>".$website["UPS"]."</h3>";
				echo '<form action="translate.php"><input type="submit" value="'.$website["CONTINUE"].'" /></from>';
			}
		}elseif (isset($_GET["action"])&&($_GET["action"]=="translate")&&!isset($_POST["action"])&&isset($_POST["cancel_dashboard"])){
			header("Location: dashboard.php");
		}
		else
		{
			//$query_user = "SELECT `key`,`user_role_id` from `users` where username='".$_SESSION["username"]."' and active=1";
			//$result_user = mysqli_query($con,$query_user);
			$query_user = "SELECT `key`,`user_role_id` from `users` where username=? and active=1";
			$statement_user=mysqli_prepare($con,$query_user);
			$statement_user->bind_param("s",$_SESSION["username"]);
			$statement_user->execute();
			$result_user=$statement_user->get_result();
			$rows_user = mysqli_num_rows($result_user);
			if ($rows_user==1)
			{
				$row_user = mysqli_fetch_row($result_user);
				echo '<form enctype="multipart/form-data" action="translate.php?action=translate" method="POST" style="margin-to: 2em; margin-bottom:2em">';
				if (($row_user[1]==1)||($row_user[1]==2))
				{
					echo '<h4>Translation language: ';
					$query_lang = "SELECT id,name,lang_key from `languages` where 1";
					$result_lang = mysqli_query($con,$query_lang);
					$rows_lang = mysqli_num_rows($result_lang);
					$languages = array();
					if ($rows_lang>0)
					{
						echo '<select id="language_id" name="language_id" type="text" value="4" onchange="selectLanguage()"/>';
						for ($j = 0; $j < $rows_lang; $j++)
						{
							$row_lang = mysqli_fetch_row($result_lang);
							echo '<option value="'.$row_lang[0].'">'.$row_lang[1].'</option>';
							array_push($languages,['name' => $row_lang[1], 'key' => $row_lang[2]]);
						}
						echo '</select>';
						echo '<script>';
						echo 'function selectLanguage(){';
						echo 'document.cookie = "cookieLanguageId="+document.getElementById(\'language_id\').value;';
						echo 'window.location.href="translate.php";';
						echo '}';
						echo '</script>';
					}
					echo '</h4>';
					if (isset($_COOKIE["cookieLanguageId"]))
						echo '<script>document.getElementById("language_id").value="'.$_COOKIE["cookieLanguageId"].'";</script>';
					else
						echo '<script>document.getElementById("language_id").value="4";</script>';
				}
				if ($row_user[1]==1)
				{
					//Admin user
					echo '<h4 style="margin-top:0.5em;">'.$website["UPLOAD_JSON"].'</h4>';
					echo '<div class="datagrid">';
					echo '<table width="100%">';
					echo '<tr><th style="width:100%">File</th></tr>';
					echo '<tr>';
					echo '<td><input type="file" id="translation_file" name="translation_file" accept="application/json"></td>';
					echo '</tr>';
					echo '</table>';
					
					echo '</div>';
					echo '<input name="upload_button" type="submit" value="'.$website["UPLOAD"].'" />&nbsp;&nbsp;';
					echo '<input name="cancel_button" type="submit" value="'.$website["CANCEL"].'"/>';
					//echo '<input name="project_id" value="'.$row[0].'" type="hidden"/>';
					
				}
				if (($row_user[1]==1) || ($row_user[1]==2))
				{
					//Administrator or Contributor user
					if (isset($_COOKIE["cookieLanguageId"]))
					{
						$query = "SELECT t1.`key` FROM `lang_keys_en-gb` t1 LEFT JOIN `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` t2 ON t2.`key` = t1.`key` WHERE t2.`key` IS NULL";
						$result = mysqli_query($con,$query);
						$rows = mysqli_num_rows($result);
						if ($rows>0)
						{
							for ($j = 0; $j < $rows; $j++)
							{
								$row = mysqli_fetch_row($result);
								$query_key = "INSERT INTO `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."`(`key`) VALUES (\"".$row[0]."\")";
								$result_key = mysqli_query($con,$query_key);
							}
						}
						
						$query = "SELECT `t1`.`key`,`t2`.`value`,`t1`.`value_temp` from `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` as t1 inner join `lang_keys_en-gb` as t2 on `t1`.`key`=`t2`.`key` where `t1`.`value` is NULL and `t1`.`value_temp` is NOT NULL ORDER BY RAND() LIMIT 1";
						$result = mysqli_query($con,$query);
						$rows = mysqli_num_rows($result);
						if ($rows==1)
						{
							echo '<h4 style="margin-top:0.5em;">'.$website["REVIEW_TRANSLATION"].'</h4>';
							echo '<h5 style="color:red">'.$website["PLEASE_REPORT"].'</h5>';
							echo '<div class="datagrid">';
							echo '<table width="100%">';
							echo '<tr><th style="width:50%;text-align:center">English</th><th style="width:50%;text-align:center">'.$languages[$_COOKIE["cookieLanguageId"]-1]["name"].' ('.$website["REVIEW_PENDING"].')</th></tr>';
							echo '<tr>';
							$row = mysqli_fetch_row($result);
							echo '<td><label>'.$row[1].'</label><input type="hidden" name="reviewed_key" value='.$row[0].'/></td>';
							echo '<td><label>'.$row[2].'</label><input type="hidden" name="reviewed_text" value="'.$row[2].'"/></td>';
							echo '</tr>';
							echo '</table>';
							echo '</div>';
							echo '<input name="review_lang" type="hidden" value="'.$_COOKIE["cookieLanguageId"].'"></input>';
							echo '<input name="accept_translation_button" type="submit" value="'.$website["ACCEPT_TRANSLATION"].'" />&nbsp;&nbsp;';
							echo '<input name="decline_translation_button" type="submit" value="'.$website["REVIEW_TRANSLATION"].'" />&nbsp;&nbsp;';
							echo '<input name="report_translation_button" type="submit" value="'.$website["REPORT_TRANSLATION"].'" />&nbsp;&nbsp;';
							echo '<input name="next_review_button" type="submit" value="'.$website["NEXT"].'"/>';
						}
						else
						{
							echo '<h4 style="margin-top:0.5em;">'.$website["NO_PENDING_TRANSLATIONS"].'</h4>';
						}
						
						
						$query = "SELECT `t1`.`key`,`t2`.`value` from `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` as t1 inner join `lang_keys_en-gb` as t2 on `t1`.`key`=`t2`.`key` where `t1`.`value` is NULL and `t1`.`value_temp` is NULL ORDER BY RAND() LIMIT 1";
						$result = mysqli_query($con,$query);
						$rows = mysqli_num_rows($result);
						echo '<h4 style="margin-top:0.5em;">'.$website["TRANSLATE_WORDS_SENTENCES"].'</h4>';
						echo '<h5>'.$website["PEER_TO_PEER"].'</h5><h5 style="color:red">'.$website["INAPPROPRIATE_TRANSLATIONS"].'</h5>';
						echo '<div class="datagrid">';
						echo '<table width="100%">';
						if ($rows==1)
						{
							echo '<tr><th style="width:50%;text-align:center">English</th><th style="width:50%;text-align:center">'.$languages[$_COOKIE["cookieLanguageId"]-1]["name"].' ('.$website["REVIEW_PENDING"].')</th></tr>';
							echo '<tr>';
							$row = mysqli_fetch_row($result);
							echo '<td><label>'.$row[1].'</label><input type="hidden" name="translated_key" value='.$row[0].'/></td>';
							echo '<td><input type="text" name="translated_text" style="width:100%"/></td>';
						}
						else
						{
							echo '<tr><th style="width:33%;text-align:center">English</th><th style="width:33%;text-align:center">'.$languages[$_COOKIE["cookieLanguageId"]-1]["name"].'</th><th style="width:33%;text-align:center">'.$languages[$_COOKIE["cookieLanguageId"]-1]["name"].' ('.$website["REVIEW_PENDING"].')</th></tr>';
							echo '<tr>';
							$query = "SELECT `t1`.`key`,`t1`.`value`,`t2`.`value` from `lang_keys_en-GB` as `t1` inner join `lang_keys_".$languages[$_COOKIE["cookieLanguageId"]-1]["key"]."` as `t2` on `t1`.`key`=`t2`.`key` where 1 ORDER BY RAND() LIMIT 1";
							$result = mysqli_query($con,$query);
							$row = mysqli_fetch_row($result);
							echo '<td><label>'.$row[1].'</label><input type="hidden" name="translated_key" value='.$row[0].'/></td>';
							echo '<td><label>'.$row[2].'</label></td>';
							echo '<td><input type="text" name="translated_text" style="width:100%" value="'.$row[2].'"/></td>';
						}
						echo '</tr>';
						echo '</table>';
						echo '</div>';
						echo '<input name="translated_lang" type="hidden" value="'.$_COOKIE["cookieLanguageId"].'"></input>';
						echo '<input name="translate_button" type="submit" value="'.$website["TRANSLATE_WORDS_SENTENCES"].'" />&nbsp;&nbsp;';
						echo '<input name="next_button" type="submit" value="'.$website["NEXT"].'"/>';
					}
				}
				elseif (($row_user[1]==3) || ($row_user[1]==4) || ($row_user[1]==5))  //Standard, Pro, Academic
				{
					echo '<h4>Do you want to contribute to Facilino translation? We kindly appreciate your help.</h4>';
					//echo '<h4>After 25 approved translations you will become a Pro user with unlimited access and Ads removed (see <a href="upgrade.php">Upgrade</a>)</h4>';
					echo '<h5 style="margin-top:1em">'.$website["APPLYING_TO_TRANSLATION_PROGRAM"].'<a href="translation_program.php" target="_blank">'.$website["TRANSLATION_PROGRAM"].'</a> '.$website["FOR_DETAILS"].'.</h5>';
					echo '<h5 style="margin-top:1em">'.$website["NATIVE_LANGUAGE"].'</h5>';
					$query_lang = "SELECT id,name,lang_key from `languages` where 1";
					$result_lang = mysqli_query($con,$query_lang);
					$rows_lang = mysqli_num_rows($result_lang);
					$languages = array();
					if ($rows_lang>0)
					{
						echo '<select id="language_id" name="language_id" type="text" value="4"/>';
						for ($j = 0; $j < $rows_lang; $j++)
						{
							$row_lang = mysqli_fetch_row($result_lang);
							echo '<option value="'.$row_lang[0].'">'.$row_lang[1].'</option>';
							array_push($languages,['name' => $row_lang[1], 'key' => $row_lang[2]]);
						}
						echo '</select>';
						echo '<script>';
						echo 'function selectLanguage(){';
						echo 'document.cookie = "cookieLanguageId="+document.getElementById(\'language_id\').value;';
						echo '}';
						echo '</script>';
					}
					echo '<h5 style="margin-top:0.5em">'.$website["ACADEMIC_JOB"].'</h5>';
					echo '<select id="academic" name="academic" type="text" value="1">';
					echo '<option value="School">'.$website["SCHOOL_TEACHER"].'</option>';
					echo '<option value="Secondary">'.$website["SECONDARY_TEACHER"].'</option>';
					echo '<option value="High School">'.$website["HIGH_SCHOOL_TEACHER"].'</option>';
					echo '<option value="VET">'.$website["VET_TEACHER"].'</option>';
					echo '<option value="Higher Education">'.$website["HIGHER_EDUCATION"].'</option>';
					echo '<option value="Other">'.$website["OTHER"].'</option>';
					echo '</select>';
					echo '<h5 style="margin-top:0.5em">'.$website["ELECTRONICS_EXPERTISE"].'</h5>';
					echo '<select id="electronics" name="electronics" type="text" value="1">';
					echo '<option value="High Confident">'.$website["HIGH_CONFIDENT"].'</option>';
					echo '<option value="Medium Confident">'.$website["MEDIUM_CONFIDENT"].'</option>';
					echo '<option value="Low Confident">'.$website["LOW_CONFIDENT"].'</option>';
					echo '</select>';
					echo '<h5 style="margin-top:0.5em">'.$website["BLOCK_PROGRAMMING_EXPERTISE"].'</h5>';
					echo '<select id="blocks" name="block_programming" type="text" value="1"/>';
					echo '<option value="High Confident">'.$website["HIGH_CONFIDENT"].'</option>';
					echo '<option value="Medium Confident">'.$website["MEDIUM_CONFIDENT"].'</option>';
					echo '<option value="Low Confident">'.$website["LOW_CONFIDENT"].'</option>';
					echo '</select>';
					echo '<h5 style="margin-top:0.5em">'.$website["TELL_ABOUT_YOURSELF"].'</h5>';
					echo '<textarea name="additional_info" style="width:100%; height:10em" maxlength=1000></textarea>';
					echo '<h5>'.$website["CONFIDENTIAL_INFO"].'</h5>';
					echo '<h5>'.$website["ONCE_APPROVED"].'</h5>';
					echo '<input name="apply_reviewer" type="submit" value="'.$website["APPLY"].'"/>&nbsp;&nbsp;';
					echo '<input name="cancel_dashboard" type="submit" value="'.$website["CANCEL"].'" />';
				}
				echo '</form>';
			}
			else
			{
				echo "User not found! Something weird happen";
			}
		}
		?>
		</div>
		<div id="ads"><?php include "ads.php" ?></div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
</html>
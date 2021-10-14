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
		<h1 >Translation Program</h1>
		<?php
		if (isset($_POST["contribute_button"])){
			header("Location: translate.php");
		}
		else if (isset($_POST["cancel_button"])){
			header("Location: dashboard.php");
		}
		else
		{
			?>
			<p><label>We seek for enthusiastic people who wants to help us in the translation of Facilino to their native languages.</label></p>
			<p><label>If you can\'t find your language within available options, do not hesitate to contact to the administrators to include your language within the list of languages.</label></p>
			<p><label>We will review your application and, in case of being accepted, you will belong to the team of Facilino Translators.</label></p>
			<p><label>Eventually, you will receive an email with pending translations to review. Please, do not desist on reviewing translations, otherwise the proposed translations won\'t be included in the live version of Facilino.</label></p>
			<p><label>If at anytime, you prefer to pop-out from the Translation Team, you request to recover your previous user account type inside the user profile.</label></p>
			<p><label>Inappropriate translations or malicious intentions will be detected and reported and the user account will be banned.</label></p>
			<div class="form">
			<form enctype="multipart/form-data" action="translation_program.php" method="POST" style="margin-to: 2em; margin-bottom:2em">
			<input name="contribute_button" type="submit" value="Contribute"/>&nbsp;&nbsp;
			<input name="cancel_button" type="submit" value="Cancel" />
			</form>
			</div>
			<?php
		}
		?>
		</div>
		<div id="ads"><?php include "ads.php" ?></div>
		<div id="footer"><?php include "inc-footer.php" ?></div>
	</body>
</html>
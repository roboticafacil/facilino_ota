<?php
require_once('db.php');
require_once('website_translation.php');
?>
<!DOCTYPE html>
<html>
<?php include "head.php"; include "projects_head.php";
?>
<body>
<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:0em; margin-left: 0em; margin-right: 0em">
<?php
echo '<script>window.FacilinoLanguage="'.$lang.'";</script>';
?>
<script src="tutorial/assets/web/assets/jquery/jquery.min.js"></script>

<div id="main"></div>
<script>$(function(){var file='projects/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='tutorial/en-GB/home.html';},success: function(){}}); $('#main').load(file);});</script>
</div>
<div id="ads"><?php include "ads.php" ?></div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>

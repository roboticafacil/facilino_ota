<?php
chdir("..");
require_once('db.php');
require_once('website_translation.php');
require_once('projects_translation.php');
?>
<!DOCTYPE html>
<html>
<?php 
chdir("projects");
include "head.php"; 
include "projects_head.php";
?>
<body>
<div id="header"><?php chdir(".."); include "inc-header.php"; ?></div>
		<div id="content" style="margin-top:0em; margin-left: 0em; margin-right: 0em">
<?php
echo '<script>window.FacilinoLanguage="'.$lang.'";</script>';
?>
<script src="assets/web/assets/jquery/jquery.min.js"></script>
<script>
    function onHome()
	{
		//window.title='home_'+window.FacilinoLanguage;
		//$(function(){var file='projects/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='projects/en-GB/home.html';},success: function(){}}); $('#main').load(file); location.href = "#menu";});
		window.location='../index.php';
	}
	function onProjects()
	{
		window.location='../FacilinoProjects.php';
	}
</script>

<div id="main">
<section class="features18 popup-btn-cards cid-qYa5rQWOty" id="features">
    <div class="container">
		<div class="mbr-section-btn text-center"><a onclick="onProjects();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>
        <h2 class="mbr-section-title pb-3 align-center mbr-fonts-style display-2">
            <?php echo $projects["LED_RACE"]; ?></h2>
        <h3 class="mbr-section-subtitle display-5 align-center mbr-fonts-style mbr-light">
            <?php echo $projects["LED_RACE_DESC"]; ?></h3>
			<div class="row pt-5 " style="justify-content: left">
				<div class="card p-3 col-12 col-md-6 col-lg-4">
					<div class="card-wrapper ">
						<div class="card-img">
							<div class="mbr-overlay"></div>
							<div class="mbr-section-btn text-center"><a onclick="window.location='LEDRaceGettingStarted.php?project_id=1';" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
							<a onclick="window.location='LEDRaceGettingStarted.php?project_id=1';"><img src="assets/images/LED_Gradient.jpg" alt="LED Strip" title=""></img></a>
						</div>
						<div class="card-box">
							<h4 class="card-title mbr-fonts-style display-7">
								<?php echo $projects["GETTING_STARTED"];?></h4>
							<p class="mbr-text mbr-fonts-style align-left display-7">
								<?php echo $projects["GETTING_STARTED_DESC"]; ?></p>
						</div>
					</div>
				</div>
				<div class="card p-3 col-12 col-md-6 col-lg-4">
					<div class="card-wrapper ">
						<div class="card-img">
							<div class="mbr-overlay"></div>
							<div class="mbr-section-btn text-center"><a onclick="window.location='LEDRaceMoveOneLED.php?project_id=1';" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
							<a onclick="window.location='LEDRaceMoveOneLED.php?project_id=1';"><img src="assets/images/LED_Strip.jpg" alt="LED Strip with One Button" title=""></img></a>
						</div>
						<div class="card-box">
							<h4 class="card-title mbr-fonts-style display-7">
								<?php echo $projects["MOVING_LEDS"];?></h4>
							<p class="mbr-text mbr-fonts-style align-left display-7">
								<?php echo $projects["MOVING_LEDS_DESC"];?></p>
						</div>
					</div>
				</div>
				<div class="card p-3 col-12 col-md-6 col-lg-4">
					<div class="card-wrapper ">
						<div class="card-img">
							<div class="mbr-overlay"></div>
							<div class="mbr-section-btn text-center"><a onclick="window.location='LEDRaceBasicLEDRace.php?project_id=1';" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
							<a onclick="window.location='LEDRaceBasicLEDRace.php?project_id=1';"><img src="assets/images/RGB_LEDs.jpg" alt="LED Race" title=""></img></a>
						</div>
						<div class="card-box">
							<h4 class="card-title mbr-fonts-style display-7">
								<?php echo $projects["BASIC_LED_RACE"];?></h4>
							<p class="mbr-text mbr-fonts-style align-left display-7">
								<?php echo $projects["BASIC_LED_RACE_DESC"];?></p>
						</div>
					</div>
				</div>
			</div>
		<div class="mbr-section-btn text-center"><a onclick="onProjects();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>
	</div>
</section>
</div>
</div>
<!-- <script>$(function(){var file='projects/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='projects/en-GB/home.html';},success: function(){}}); $('#main').load(file);});</script>-->
</div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>

<script>
	/*function onExercise(num)
	{
		window.title='exercise'+num+'_'+window.FacilinoLanguage;
		$(function(){var file= 'projects/'+window.FacilinoLanguage+'/exercise'+num+'.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){ file= 'projects/'+'en-GB/exercise'+num+'.html';},success: function(){}}); 
		
		$('#main').load(file); 
		//location.href = "#menu";
		});
	}*/
</script>
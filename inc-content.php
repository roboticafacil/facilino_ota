<?php
require_once('website_translation.php');
?>
<!-- <h1>Welcome to Facilino</h1>-->
<section class="features18 popup-btn-cards cid-qYa5rQWOty" id="features">
<div class="container">
<!-- <h2 class="mbr-section-title pb-3 align-center mbr-fonts-style display-2">
Welcome to Facilino</h2>-->
<!-- <h3 class="mbr-section-subtitle display-5 align-center mbr-fonts-style mbr-light">
Learn how to program Arduino and ESP using Facilino with a full set of tutorials and exercises.</h3>-->
<h3 class="mbr-section-subtitle display-5 align-center mbr-fonts-style mbr-light"><?php echo $website["GET_READY"]; ?></h3>

<section class="mbr-section article content11 cid-qYh0wTJYr3" id="content11-53">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text counter-container col-12 col-md-8 mbr-fonts-style display-7">
                <?php
				if(!isset($_SESSION["username"]))
				{
					?>
					<div class="card-wrapper ">
					<div class="card-box" style="height: 100px; position: relative; border: 3px solid red;">
						<center>
						<p class="card-title mbr-fonts-style display-5" style="text-align: center;margin: 0; position: absolute; left: 50%; top: 50%; -ms-transform: translateX(-50%) translateY(-50%); transform: translateX(-50%) translateY(-60%);">
							<?php echo $website["START_SESSION"]; ?>
						</p>
						<center>
					</div>
					</div>
					<?php
				}
				?>
            </div>
        </div>
    </div>
</section>

<div class="row" style="padding-top:0.5em">
	<div class="card p-3 col-12 col-md-6 col-lg-4">
		<div class="card-wrapper ">
			<div class="card-img">
				<div class="mbr-overlay"></div>
				<div class="mbr-section-btn text-center"><a  onclick="onHomeFile('installation.php');" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
				<a  onclick="onHomeFile('installation.php');"><img src="assets/images/mbr-676x450.jpg" alt="Installation" title=""></a>
			</div>
			<div class="card-box">
				<h4 class="card-title mbr-fonts-style display-7">
					<?php echo $website["FACILINO_INSTALLATION_SETUP"]; ?></h4>
				<p class="mbr-text mbr-fonts-style align-left display-7">
					<?php echo $website["LEARN_SETUP"]; ?></p>
			</div>
		</div>
	</div>

	<div class="card p-3 col-12 col-md-6 col-lg-4">
		<div class="card-wrapper">
			<div class="card-img">
				<div class="mbr-overlay"></div>
				<div class="mbr-section-btn text-center"><a onclick="onHomeFile('FacilinoTutorial.php');" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
				<a onclick="onHomeFile('FacilinoTutorial.php');"><img src="assets/images/facilino_title.jpg" alt="Introduction Facilino" title=""></a>
			</div>
			<div class="card-box">
				<h4 class="card-title mbr-fonts-style display-7"><?php echo $website["INTRODUCTION_FACILINO"]; ?></h4>
				<p class="mbr-text mbr-fonts-style display-7"><?php echo $website["LEARN_FACILINO"]; ?></p>
			</div>
		</div>
	</div>

	<div class="card p-3 col-12 col-md-6 col-lg-4">
		<div class="card-wrapper ">
			<div class="card-img">
				<div class="mbr-overlay"></div>
				<div class="mbr-section-btn text-center"><a onclick="onHomeFile('FacilinoProjects.php');" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
				<a onclick="onHomeFile('FacilinoProjects.php');"><img src="assets/images/mbr-676x406.jpg" alt="Overview" title=""></a>
			</div>
			<div class="card-box">
				<h4 class="card-title mbr-fonts-style display-7"><?php echo $website["OUR_PROJECTS"]; ?></h4>
				<p class="mbr-text mbr-fonts-style align-left display-7"><?php echo $website["LEARN_PROJECTS"]; ?></p>
			</div>
		</div>
	</div>
</div>

</div>
</section>
<script>
function onHomeFile(filename)
{
	window.location=filename;
}
</script>
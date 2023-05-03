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
<script>
	function onEcoThings()
	{
		window.location='EcoThings.php?project_id=5';
	}
</script>
<body>
<div id="header"><?php chdir(".."); include "inc-header.php"; ?></div>
		<div id="content" style="margin-top:0em; margin-left: 0em; margin-right: 0em">
<script src="assets/web/assets/jquery/jquery.min.js"></script>
<div id="main">
<section class="mbr-section content4 cid-qYh0wRA9Kt" id="content4-4z">
	<div class="container">
		<div class="media-container-row">
			<div class=" title col-12 col-md-8">
				<h2 class="align-center pb-3 mbr-fonts-style display-2"/>
				<h2 class="align-center pb-3 mbr-fonts-style display-2"/>
				<h2 class="align-center pb-3 mbr-fonts-style display-2"/>
				<div class="mbr-section-btn text-center"><a onclick="onEcoThings();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>
				<h2 class="align-center pb-3 mbr-fonts-style display-2">
					<?php echo $projects["ASSEMBLY_ECOTHINGS"]; ?></h2>
				<h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5">
					<?php echo $projects["ASSEMBLY_ECOTHINGS_DESC"]; ?></h3>
			</div>
		</div>
	</div>
	
	<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u" style="page-break-before: always">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $projects["ASSEMBLY_ECOTHINGS_LASERCUTTING"]; ?></div>
            <hr class="line" style="width: 25%;"></hr>
        </div>
        </div>
	</section>
	
	<section class="mbr-section article content1 cid-qYfUXHWAEF" id="content1-44">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $projects["ASSEMBLY_ECOTHINGS_LASERCUTTING_DESC"]; ?></p></div>
        </div>
    </div>
</section>
	
	<section class="cid-qYh0wSah5G" id="image3-50" style="page-break-before: always">
    <figure class="mbr-figure container">
            <div class="image-block" style="width: 90%;">
                <img src="../assets/images/EcoThings/Assembly1.png" width="1400" alt="Assembly1" title=""></img>
            </div>
    </figure>
	</section>
	
	<section class="cid-qYh0wSah5G" id="image3-50" style="page-break-before: always">
    <figure class="mbr-figure container">
            <div class="image-block" style="width: 90%;">
                <img src="../assets/images/EcoThings/Assembly2.png" width="1400" alt="Assembly2" title=""></img>
            </div>
    </figure>
	</section>

	<section class="mbr-section article content1 cid-qYfUXHWAEF" id="content1-44">
		<div class="container">
			<div class="media-container-row">
				<div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $projects["ASSEMBLY_ECOTHINGS_STEP1"]; ?></p></div>
			</div>
		</div>
	</section>

	<section class="cid-qYh0wSah5G" id="image3-50" style="page-break-before: always">
		<figure class="mbr-figure container">
				<div class="image-block" style="width: 90%;">
					<img src="../assets/images/EcoThings/Step1.png" width="1400" alt="Step1" title=""></img>
				</div>
		</figure>
	</section>

	<section class="mbr-section article content1 cid-qYfUXHWAEF" id="content1-44">
		<div class="container">
			<div class="media-container-row">
				<div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $projects["ASSEMBLY_ECOTHINGS_STEP2"]; ?></p></div>
			</div>
		</div>
	</section>

	<section class="cid-qYh0wSah5G" id="image3-50" style="page-break-before: always">
		<figure class="mbr-figure container">
				<div class="image-block" style="width: 90%;">
					<img src="../assets/images/EcoThings/Step2.png" width="1400" alt="Step2" title=""></img>
				</div>
		</figure>
	</section>
	
	<section class="mbr-section article content1 cid-qYfUXHWAEF" id="content1-44">
		<div class="container">
			<div class="media-container-row">
				<div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $projects["ASSEMBLY_ECOTHINGS_STEP3"]; ?></p></div>
			</div>
		</div>
	</section>

	<section class="cid-qYh0wSah5G" id="image3-50" style="page-break-before: always">
		<figure class="mbr-figure container">
				<div class="image-block" style="width: 90%;">
					<img src="../assets/images/EcoThings/Step3.png" width="1400" alt="Step3" title=""></img>
				</div>
		</figure>
	</section>
	
	<section class="mbr-section article content1 cid-qYfUXHWAEF" id="content1-44">
		<div class="container">
			<div class="media-container-row">
				<div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $projects["ASSEMBLY_ECOTHINGS_STEP4"]; ?></p></div>
			</div>
		</div>
	</section>

	<section class="cid-qYh0wSah5G" id="image3-50" style="page-break-before: always">
		<figure class="mbr-figure container">
				<div class="image-block" style="width: 90%;">
					<img src="../assets/images/EcoThings/Step4.png" width="1400" alt="Step4" title=""></img>
				</div>
		</figure>
	</section>

	<section class="mbr-section article content1 cid-qYfUXHWAEF" id="content1-44">
		<div class="container">
			<div class="media-container-row">
				<div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $projects["ASSEMBLY_ECOTHINGS_STEP5"]; ?></p></div>
			</div>
		</div>
	</section>

	<section class="cid-qYh0wSah5G" id="image3-50" style="page-break-before: always">
		<figure class="mbr-figure container">
				<div class="image-block" style="width: 90%;">
					<img src="../assets/images/EcoThings/Step5.png" width="1400" alt="Step5" title=""></img>
				</div>
		</figure>
	</section>
	
	<section class="mbr-section article content1 cid-qYfUXHWAEF" id="content1-44">
		<div class="container">
			<div class="media-container-row">
				<div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $projects["ASSEMBLY_ECOTHINGS_STEP6"]; ?></p></div>
			</div>
		</div>
	</section>

	<section class="cid-qYh0wSah5G" id="image3-50" style="page-break-before: always">
		<figure class="mbr-figure container">
				<div class="image-block" style="width: 90%;">
					<img src="../assets/images/EcoThings/Step6.png" width="1400" alt="Step6" title=""></img>
				</div>
		</figure>
	</section>


<div class="mbr-section-btn text-center"><a onclick="onEcoThings();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>
</div>

<div id="ads"><?php include "ads.php" ?></div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>




<?php
require_once('db.php');
require_once('projects_translation.php');
?>
<section class="features18 popup-btn-cards cid-qYa5rQWOty" id="features">
    <div class="container">
		<h3/>
        <h2 class="mbr-section-title pb-3 align-center mbr-fonts-style display-2">
            <?php echo $projects["PROJECTS_WITH_FACILINO"]; ?>
			</h2>
		<h3 class="mbr-section-subtitle display-5 align-center mbr-fonts-style mbr-light">
            <?php echo $projects["PROJECTS_WITH_FACILINO_DESC"]; ?></h3>

		<div class="row pt-5 ">
		
			<div class="card p-3 col-12 col-md-6 col-lg-4">
                <div class="card-wrapper ">
                    <div class="card-img">
                        <div class="mbr-overlay"></div>
                        <div class="mbr-section-btn text-center"><a onclick="window.location='LEDRace.php?project_id=1';" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
                        <a onclick="window.location='LEDRace.php?project_id=1';"><img src="projects/assets/images/LED_race.jpg" alt="LED Race" title=""></a>
                    </div>
                    <div class="card-box">
                        <h4 class="card-title mbr-fonts-style display-7">
                            <?php echo $projects["LED_RACE"]; ?></h4>
                        <p class="mbr-text mbr-fonts-style align-left display-7">
                            <?php echo $projects["LED_RACE_DESC"]; ?></p>
                    </div>
                </div>
            </div>
		
			<!-- project_id 2 -->
			<div class="card p-3 col-12 col-md-6 col-lg-4">
                <div class="card-wrapper ">
                    <div class="card-img">
                        <div class="mbr-overlay"></div>
                        <div class="mbr-section-btn text-center"><a class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
                        <a><img src="projects/assets/images/DYOR_robot1.jpg" alt="DYOR" title=""></a>
                    </div>
                    <div class="card-box">
                        <h4 class="card-title mbr-fonts-style display-7">
                            <?php echo $projects["DYOR"]; ?></h4>
                        <p class="mbr-text mbr-fonts-style align-left display-7">
                            <?php echo $projects["DYOR_DESC"]; ?></p>
                    </div>
                </div>
            </div>
			
			<!-- project_id 3 -->
			<div class="card p-3 col-12 col-md-6 col-lg-4">
                <div class="card-wrapper ">
                    <div class="card-img">
                        <div class="mbr-overlay"></div>
                        <div class="mbr-section-btn text-center"><a class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
                        <a><img src="projects/assets/images/bPED.jpeg" alt="bPED" title=""></a>
                    </div>
                    <div class="card-box">
                        <h4 class="card-title mbr-fonts-style display-7">
                            <?php echo $projects["bPED"]; ?></h4>
                        <p class="mbr-text mbr-fonts-style align-left display-7">
                            <?php echo $projects["bPED_DESC"]; ?></p>
                    </div>
                </div>
            </div>
			
			<!-- project_id 4 -->
			<div class="card p-3 col-12 col-md-6 col-lg-4">
                <div class="card-wrapper ">
                    <div class="card-img">
                        <div class="mbr-overlay"></div>
                        <div class="mbr-section-btn text-center"><a class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
                        <a><img src="projects/assets/images/meArm.jpg" alt="meArm" title=""></a>
                    </div>
                    <div class="card-box">
                        <h4 class="card-title mbr-fonts-style display-7">
                            meArm</h4>
                        <p class="mbr-text mbr-fonts-style align-left display-7">
                            Learn how to program a complete DIY robot arm.</p>
                    </div>
                </div>
            </div>
		
			<!-- project_id 5 -->
			<div class="card p-3 col-12 col-md-6 col-lg-4">
                <div class="card-wrapper ">
                    <div class="card-img">
                        <div class="mbr-overlay"></div>
                        <div class="mbr-section-btn text-center"><a onclick="onHomeFile('EcoThings.php?project_id=5');" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
                        <a onclick="onHomeFile('EcoThings.php?project_id=5');"><img src="projects/assets/images/home_automation.jpg" alt="IoT Home Automation" title=""></a>
                    </div>
                    <div class="card-box">
                        <h4 class="card-title mbr-fonts-style display-7">
                            <?php echo $projects["ECOTHINGS"]; ?></h4>
                        <p class="mbr-text mbr-fonts-style align-left display-7">
                            <?php echo $projects["ECOTHINGS_DESC"]; ?></p>
                    </div>
                </div>
            </div>

			<div class="card p-3 col-12 col-md-6 col-lg-4">
                <div class="card-wrapper ">
                    <div class="card-img">
                        <div class="mbr-overlay"></div>
                        <div class="mbr-section-btn text-center"><a class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
                        <a><img src="projects/assets/images/greenhouse.jpg" alt="IoT Greenhouse" title=""></a>
                    </div>
                    <div class="card-box">
                        <h4 class="card-title mbr-fonts-style display-7">
                            IoT Starter Kit Intelligent Green House</h4>
                        <p class="mbr-text mbr-fonts-style align-left display-7">
                            Everything to get you started instantly to control temperature and humidity!</p>
                    </div>
                </div>
            </div>

			<div class="card p-3 col-12 col-md-6 col-lg-4">
                <div class="card-wrapper ">
                    <div class="card-img">
                        <div class="mbr-overlay"></div>
                        <div class="mbr-section-btn text-center"><a class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
                        <a><img src="projects/assets/images/rain.jpg" alt="IoT Weather Station" title=""></a>
                    </div>
                    <div class="card-box">
                        <h4 class="card-title mbr-fonts-style display-7">
                            IoT Starter Kit Weather Station</h4>
                        <p class="mbr-text mbr-fonts-style align-left display-7">
                            Everything to get you started instantly to sense temperature, humidity, gas and rain!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
	if (localStorage.getItem("language")===undefined || localStorage.getItem("language")===null)
		localStorage.setItem('language', 'en-GB');
	window.FacilinoLanguage = localStorage.getItem("language");
	$("#language").val(window.FacilinoLanguage);
	function onHomeFile(html_file)
	{
		window.location='projects/'+html_file;
		//window.title=html_file+'_'+window.FacilinoLanguage;
		//$(function(){var file='projects/'+ window.FacilinoLanguage+'/'+html_file; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='projects/'+'en-GB/'+html_file;},success: function(){}}); $('#main').load(file); location.href = "#menu";});
	}
</script>			
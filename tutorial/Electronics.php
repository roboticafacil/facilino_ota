<?php
chdir("..");
require_once('db.php');
require_once('website_translation.php');
?>
<!DOCTYPE html>
<html>
<?php 
chdir("tutorial");
include "head.php"; 
include "tutorial_head.php";
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
		window.location='../index.php';
	}
	function onTutorial()
	{
		window.location='../FacilinoTutorial.php';
	}
</script>

<div id="main">
<section class="features18 popup-btn-cards cid-qYa5rQWOty" id="features">
    <div class="container">
		<div class="mbr-section-btn text-center"><a onclick="onTutorial();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>
        <h2 class="mbr-section-title pb-3 align-center mbr-fonts-style display-2">
            <?php echo $website["ELECTRONICS"]; ?></h2>
        <h3 class="mbr-section-subtitle display-5 align-center mbr-fonts-style mbr-light">
            <?php echo $website["ELECTRONICS_DESC"]; ?></h3>
			
			
		<section class="mbr-section article content9 cid-qYh5KdWW4b_new" id="content9-5u">
			<div class="container">
				<div class="inner-container" style="width: 100%;">
					<hr class="line" style="width: 25%;"></hr>
					<div class="section-text align-center mbr-fonts-style display-5">
							<?php echo $website["BOARDS_AND_SHIELDS"]; ?></div>
					<hr class="line" style="width: 25%;"></hr>
				</div>
			</div>
		</section>
			
		<div class="row pt-5 " style="justify-content: left">
		
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ArduinoBoards.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ArduinoBoards.php';"><img src="assets/images/arduino_boards.jpg" alt="Arduino Boards" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["ARDUINO_BOARDS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["ARDUINO_BOARDS_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ESPBoards.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ESPBoards.php';"><img src="assets/images/esp_boards.jpg" alt="ESP Boards" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["ESP_BOARDS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["ESP_BOARDS_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='MultisensorShield.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='MultisensorShield.php';"><img src="assets/images/multifunctional_shield_keyes.png" alt="Multisensor Shield" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["MULTISENSOR_SHIELD"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["MULTISENSOR_SHIELD_DESC"]; ?></p>
					</div>
				</div>
			</div>
		</div>
			
		<section class="mbr-section article content9 cid-qYh5KdWW4b_new" id="content9-5u">
			<div class="container">
				<div class="inner-container" style="width: 100%;">
					<hr class="line" style="width: 25%;"></hr>
					<div class="section-text align-center mbr-fonts-style display-5">
							<?php echo $website["GENERAL_PURPOSE_ELECTRONICS"]; ?></div>
					<hr class="line" style="width: 25%;"></hr>
				</div>
				</div>
		</section>
		
		<div class="row pt-5 " style="justify-content: left">
		
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ElectronicsBasics.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ElectronicsBasics.php';"><img src="assets/images/mbr-676x459.jpg" alt="Electronics basics" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["ELECTRONICS_BASICS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["ELECTRONICS_BASICS_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='Semiconductors.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='Semiconductors.php';"><img src="assets/images/Semiconductors.jpg" alt="Electronics Semiconductors" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["SEMICONDUCTORS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["SEMICONDUCTORS_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='DigitalInput.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='DigitalInput.php';"><img src="assets/images/mbr-5-676x451.jpg" alt="Digital Input" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["DIGITAL_INPUT"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["DIGITAL_INPUT_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='DigitalOutput.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='DigitalOutput.php';"><img src="assets/images/mbr-2-676x380.jpg" alt="Digital Output" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["DIGITAL_OUTPUT"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["DIGITAL_OUTPUT_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='AnalogInput.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='AnalogInput.php';"><img src="assets/images/mbr-676x426.jpg" alt="Analog Input" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["ANALOG_INPUT"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["ANALOG_INPUT_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='AnalogOutput.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='AnalogOutput.php';"><img src="assets/images/mbr-4-676x451.jpg" alt="Analog Output" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["ANALOG_OUTPUT"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["ANALOG_OUTPUT_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='LEDs.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='LEDs.php';"><img src="assets/images/mbr-2-676x451.jpg" alt="LEDs" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["LEDS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["LEDS_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ButtonsSwitches.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ButtonsSwitches.php';"><img src="assets/images/mbr-1-676x451.jpg" alt="Buttons and Switches" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["BUTTONS_SWITCHES"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["BUTTONS_SWITCHES_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='Potentiometers.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='Potentiometers.php';"><img src="assets/images/mbr-3-676x451.jpg" alt="Potentiometers" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["POTENTIOMETERS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["POTENTIOMETERS_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='Interrupts.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='Interrupts.php';"><img src="assets/images/mbr-6-676x451.jpg" alt="Interrupts" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["INTERRUPTS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["INTERRUPTS_DESC"]; ?></p>
					</div>
				</div>
			</div>
		</div>
		
		<section class="mbr-section article content9 cid-qYh5KdWW4b_new" id="content9-5u">
			<div class="container">
				<div class="inner-container" style="width: 100%;">
					<hr class="line" style="width: 25%;"></hr>
					<div class="section-text align-center mbr-fonts-style display-5">
							<?php echo $website["SENSORS"];?></div>
					<hr class="line" style="width: 25%;"></hr>
				</div>
				</div>
		</section>
		
		<div class="row pt-5 " style="justify-content: left">
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='LDRs.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='LDRs.php';"><img src="assets/images/ldr.jpg" alt="LDRs" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["LDRs"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["LDRs_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='TemperatureHumidity.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='TemperatureHumidity.php';"><img src="assets/images/mbr-674x446.jpg" alt="Temperature Humidity" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["TEMPERATURE_HUMIDITY"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["TEMPERATURE_HUMIDITY_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='AnalogTemperature.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='AnalogTemperature.php';"><img src="assets/images/mbr-11-676x451.jpg" alt="Analog Temperature" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["ANALOG_TEMPERATURE"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["ANALOG_TEMPERATURE_DESC"]; ?></p>
					</div>
				</div>
			</div>
		</div>
		
		<section class="mbr-section article content9 cid-qYh5KdWW4b_new" id="content9-5u">
			<div class="container">
				<div class="inner-container" style="width: 100%;">
					<hr class="line" style="width: 25%;"></hr>
					<div class="section-text align-center mbr-fonts-style display-5">
							<?php echo $website["ACTUATORS"];?></div>
					<hr class="line" style="width: 25%;"></hr>
				</div>
				</div>
		</section>
		
		<div class="row pt-5 " style="justify-content: left">
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='Buzzer.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='Buzzer.php';"><img src="assets/images/mbr-1-676x380.jpg" alt="Buzzer" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["BUZZER"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["BUZZER_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='Relay.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='Relay.php';"><img src="assets/images/mbr-9-676x451.jpg" alt="Relay" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["RELAY"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["RELAY_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='Servo.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='Servo.php';"><img src="assets/images/servo1.jpg" alt="Servo" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["SERVO"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["SERVO_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='DCMotor.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='DCMotor.php';"><img src="assets/images/mbr-676x418.jpg" alt="DCMotor" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["DCMOTOR"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["DCMOTOR_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='StepperMotor.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='StepperMotor.php';"><img src="assets/images/stepper1.jpg" alt="StepperMotor" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["STEPPER_MOTOR"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["STEPPER_MOTOR_DESC"]; ?></p>
					</div>
				</div>
			</div>
		</div>
		
		
		
		<section class="mbr-section article content9 cid-qYh5KdWW4b_new" id="content9-5u">
			<div class="container">
				<div class="inner-container" style="width: 100%;">
					<hr class="line" style="width: 25%;"></hr>
					<div class="section-text align-center mbr-fonts-style display-5">
							<?php echo $website["INTERNET_OF_THINGS"]; ?></div>
					<hr class="line" style="width: 25%;"></hr>
				</div>
				</div>
		</section>
		
		
		<div class="row pt-5 " style="justify-content: left">
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='IoTOverview.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='IoTOverview.php';"><img src="assets/images/overview.jpg" alt="IoT" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $website["INTERNET_OF_THINGS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $website["INTERNET_OF_THINGS_DESC"]; ?></p>
					</div>
				</div>
			</div>
		</div>
	<div class="mbr-section-btn text-center"><a onclick="onTutorial();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>	
	</div>
</section>
</div>
</div>
<!-- <script>$(function(){var file='projects/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='projects/en-GB/home.html';},success: function(){}}); $('#main').load(file);});</script>-->
</div>
<div id="ads"><?php include "ads.php" ?></div>
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
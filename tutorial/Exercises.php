<?php
chdir("..");
require_once('db.php');
require_once('website_translation.php');
require_once('examples_translation.php');
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
            <?php echo $website["EXERCISES"]; ?></h2>
        <h3 class="mbr-section-subtitle display-5 align-center mbr-fonts-style mbr-light">
            <?php echo $website["EXERCISES_DESC"]; ?></h3>
			
			
		<section class="mbr-section article content9 cid-qYh5KdWW4b_new" id="content9-5u">
			<div class="container">
				<div class="inner-container" style="width: 100%;">
					<hr class="line" style="width: 25%;"></hr>
					<div class="section-text align-center mbr-fonts-style display-5">
							<?php echo $examples["BEGINNERS_BASIC_PROGRAMMING"]; ?></div>
					<hr class="line" style="width: 25%;"></hr>
				</div>
			</div>
		</section>
			
		<div class="row pt-5 " style="justify-content: left">
		
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesUSBSerial.php?example_id=1';" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
						<a onclick="window.location='ExercisesUSBSerial.php?example_id=1';"><img src="assets/images/usb_serial.png" alt="USB Serial" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["USB_SERIAL"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["USB_SERIAL_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesBlinkingLEDs.php?example_id=2';" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
						<a onclick="window.location='ExercisesBlinkingLEDs.php?example_id=2';"><img src="assets/images/LEDs.jpg" alt="BlinkingLEDs" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["BLINKING_LEDS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["BLINKING_LEDS_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesLogic.php?example_id=3';" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
						<a onclick="window.location='ExercisesLogic.php?example_id=3';"><img src="assets/images/True-False.jpg" alt="Logic" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["LOGIC"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["LOGIC_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesFlowControl.php?example_id=4';" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
						<a onclick="window.location='ExercisesFlowControl.php?example_id=4';"><img src="assets/images/decision.png" alt="Flow Control" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["FLOW_CONTROL"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["FLOW_CONTROL_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesFunctions.php?example_id=5';" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
						<a onclick="window.location='ExercisesFunctions.php?example_id=5';"><img src="assets/images/function.png" alt="Functions" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["FUNCTIONS_PROCEDURES"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["FUNCTIONS_PROCEDURES_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesVariables.php?example_id=6';" class="btn btn-primary display-4"><?php echo $website["LEARN_MORE"]; ?></a></div>
						<a onclick="window.location='ExercisesVariables.php?example_id=6';"><img src="assets/images/variables.png" alt="Variables" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["VARIABLES"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["VARIABLES_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesMaths.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesMaths.php';"><img src="assets/images/math.jpg" alt="Maths" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["MATHS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["MATHS_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesText.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesText.php';"><img src="assets/images/text.jpg" alt="Text" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["TEXT"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["TEXT_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
		</div>
			
		<section class="mbr-section article content9 cid-qYh5KdWW4b_new" id="content9-5u">
			<div class="container">
				<div class="inner-container" style="width: 100%;">
					<hr class="line" style="width: 25%;"></hr>
					<div class="section-text align-center mbr-fonts-style display-5">
							<?php echo $examples["INTERMEDIATE_SENSORS_ACTUATORS"]; ?></div>
					<hr class="line" style="width: 25%;"></hr>
				</div>
				</div>
		</section>
		
		<div class="row pt-5 " style="justify-content: left">
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesRGBLEDs.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesRGBLEDs.php';"><img src="assets/images/keyboard.jpg" alt="RGB LEDs" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["RGB_LEDS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["RGB_LEDS_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesDHT.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesDHT.php';"><img src="assets/images/mbr-1-1920x1280.jpg" alt="DHT" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["DIGITAL_TEMPERATURE_HUMIDITY"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["DIGITAL_TEMPERATURE_HUMIDITY_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesSoundBuzzer.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesSoundBuzzer.php';"><img src="assets/images/sound_title.jpg" alt="Text" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["SOUND_BUZZER"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["SOUND_BUZZER_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesIR.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesIR.php';"><img src="assets/images/remote_title.jpg" alt="IR" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["INFRARED_RECEIVE"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["INFRARED_RECEIVE_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesLCD.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesLCD.php';"><img src="assets/images/LCD_title.jpg" alt="LCD" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["LYQUID_CRISTAL_DISPLAY"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["LYQUID_CRISTAL_DISPLAY_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesLDR.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesLDR.php';"><img src="assets/images/LDR_title.jpg" alt="LDR" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["LIGHT_DEPENDENT_RESISTOR"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["LIGHT_DEPENDENT_RESISTOR_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesGas.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesGas.php';"><img src="assets/images/mbr-1920x1440.jpg" alt="Gas Sensor" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["GAS_SENSOR"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["GAS_SENSOR_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesRelayServo.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesRelayServo.php';"><img src="assets/images/relays.jpg" alt="Relay Servo" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["RELAY_SERVO_ACTUATORS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["RELAY_SERVO_ACTUATORS_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesRGBLEDStrips.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesRGBLEDStrips.php';"><img src="assets/images/ledstrip.jpg" alt="RGB LED Strips" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["RGB_LED_STRIPS"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["RGB_LED_STRIPS_DESC"]; ?></p>
					</div>
				</div>
			</div>
		</div>
		
		<section class="mbr-section article content9 cid-qYh5KdWW4b_new" id="content9-5u">
			<div class="container">
				<div class="inner-container" style="width: 100%;">
					<hr class="line" style="width: 25%;"></hr>
					<div class="section-text align-center mbr-fonts-style display-5">
							<?php echo $examples["ADVANCED_IOT_DEVICES"];?></div>
					<hr class="line" style="width: 25%;"></hr>
				</div>
				</div>
		</section>
		
		<div class="row pt-5 " style="justify-content: left">
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesLightDimmer.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesLightDimmer.php';"><img src="assets/images/LD.jpg" alt="LIGHT Dimmer" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["LIGHT_DIMMER"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["LIGHT_DIMMER_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesOLED_128x32.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesOLED_128x32.php';"><img src="assets/images/smart-watch-821565__340.jpg" alt="OLED_128x32" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["OLED_128x32_DISPLAY"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["OLED_128x32_DISPLAY_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesTwoButtonsUI.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesTwoButtonsUI.php';"><img src="assets/images/TB.jpg" alt="TwoButtonsUI" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["TWO_BUTTONS_UI"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["TWO_BUTTONS_UI_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesBluetooth.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesBluetooth.php';"><img src="assets/images/BT.jpg" alt="Bluetooth" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["BLUETOOTH_CLASSIC"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["BLUETOOTH_CLASSIC_DESC"]; ?></p>
					</div>
				</div>
			</div>
			
			
			<div class="card p-3 col-12 col-md-6 col-lg-4">
				<div class="card-wrapper ">
					<div class="card-img">
						<div class="mbr-overlay"></div>
						<div class="mbr-section-btn text-center"><a onclick="window.location='ExercisesBluetoothLE.php';" class="btn btn-primary display-4"><?php echo $website["COMMING_SOON"]; ?></a></div>
						<a onclick="window.location='ExercisesBluetoothLE.php';"><img src="assets/images/BTLE.jpg" alt="BluetoothLE" title=""></img></a>
					</div>
					<div class="card-box">
						<h4 class="card-title mbr-fonts-style display-7">
							<?php echo $examples["BLUETOOTH_LOW_ENERGY"];?></h4>
						<p class="mbr-text mbr-fonts-style align-left display-7">
							<?php echo $examples["BLUETOOTH_LOW_ENERGY_DESC"]; ?></p>
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
<div id="ads"><?php include "../ads.php" ?></div>
<div id="footer"><?php include "../inc-footer.php" ?></div>
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
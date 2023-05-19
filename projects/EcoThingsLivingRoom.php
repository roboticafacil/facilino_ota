<?php
chdir("..");
require_once('db.php');
require_once('website_translation.php');
require_once('projects_translation.php');
?>
<!DOCTYPE html>
<script src="../assets/web/assets/jquery/jquery.min.js"></script>
<script src="../javascript/underscore/underscore.js"></script>
<script src="../javascript/blockly-bq/blockly_compressed.js"></script>
<script src="../javascript/blockly-bq/blocks_compressed.js"></script>
<script src="../javascript/blockly-bq/arduino_compressed.js"></script>
<script src="../javascript/blockly-bq/FieldButton.js"></script>
<script src="../facilino.js"></script>
<script src="../facilino_common.js"></script>
<script src="../facilino_maths.js"></script>
<script src="../facilino_controls.js"></script>
<script src="../facilino_variables.js"></script>
<script src="../facilino_serial.js"></script>
<script src="../facilino_inout.js"></script>
<script src="../facilino_lcd.js"></script>
<script src="../facilino_motor.js"></script>
<script src="../facilino_temperature.js"></script>
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
<script>
if (localStorage.getItem("processor")===undefined || localStorage.getItem("processor")===null)
		localStorage.setItem('processor', 'WEMOS_D1R32_SHIELD');
	window.FacilinoProcessor = localStorage.getItem("processor");
if (window.FacilinoProcessor==='WEMOS D1R32 SHIELD')
{
  window.board='_wemosD1R32';
}
else if (window.FacilinoProcessor==='ArduinoUno')
{
  window.board='_uno';
}
else {
  window.board='_wemosD1R32';
}
$.ajax({url: '../lang/facilino_'+window.FacilinoLanguage+'.json',dataType: "text",async: false,}).done(function(text) {window.langKeys = $.parseJSON(text).langs[window.FacilinoLanguage].keys;});
$.ajax({url: '../lang/facilino_en-GB.json',dataType: "text",async: false,}).done(function(text) {window.langKeysEng = $.parseJSON(text).langs['en-GB'].keys;});
</script>
<script>
window.FacilinoAdvanced=true;
Facilino.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoControls.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoMaths.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoVariables.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoSerial.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoInOut.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoLCD.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoMotor.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoTemperature.load({ zoom: 1, readOnly:true, collapse: false});
</script>
<script>
	Blockly.onMouseUp_=function(e){};
	Blockly.onMouseDown_=function(e){};
	
    function onHome()
	{
		//window.title='home_'+window.FacilinoLanguage;
		//$(function(){var file='projects/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='projects/en-GB/home.html';},success: function(){}}); $('#main').load(file); location.href = "#menu";});
		window.location='index.php';
	}
	function onProjects()
	{
		window.location='../FacilinoProjects.php';
	}
	function onEcoThingsCoding()
	{
		window.location='EcoThingsCoding.php?project_id=5';
	}
	function resizeIFrameToFitContent( iFrame ) {
		iFrame.width  = iFrame.contentWindow.document.body.scrollWidth+30;
		iFrame.height = iFrame.contentWindow.document.body.scrollHeight+30;
	}
	function injectInstruction(block,blockDiv) {
			var instructionPreview = document.getElementById(blockDiv);
			var mainWorkspace = Blockly.inject(blockDiv, {readOnly:true, collapse: false});
			mainWorkspace.clear();
			var block = mainWorkspace.newBlock(block);
			block.initSvg();
			block.render();
			block.setMovable(false);
			block.setDeletable(false);
			block.moveBy(15, 10);
			var bbox = block.getHeightWidth();
			instructionPreview.style.height = (bbox.height+25)+ 'px';
			instructionPreview.style.width = (bbox.width+25) + 'px';
			window.dispatchEvent(new Event('resize'));
		}
		
	function injectInstruction1(block,blockDiv) {
		var instructionPreview = document.getElementById(blockDiv);
		var mainWorkspace = Blockly.inject(blockDiv, {readOnly:true, collapse: false});
		mainWorkspace.clear();
		var block = mainWorkspace.newBlock(block);
		block.initSvg();
		block.render();
		block.setMovable(false);
		block.setDeletable(false);
		block.moveBy(15, 10);
		var bbox = block.getHeightWidth();
		instructionPreview.style.height = (bbox.height+25)+ 'px';
		instructionPreview.style.width = (bbox.width+55) + 'px';
		window.dispatchEvent(new Event('resize'));
	}
	function injectInstructionTooltip(block,blockDiv,tooltipDiv) {
			
			var instructionPreview = document.getElementById(blockDiv);
			try
			{
				var mainWorkspace = Blockly.inject(blockDiv, {readOnly:true, collapse: false});
				if (mainWorkspace!==null)
				{
					mainWorkspace.clear();
					var block = mainWorkspace.newBlock(block);
					document.getElementById(tooltipDiv).innerHTML=block.tooltip;
					block.initSvg();
					block.render();
					block.setMovable(false);
					block.setDeletable(false);
					block.moveBy(15, 10);
					var bbox = block.getHeightWidth();
					instructionPreview.style.height = (bbox.height+25)+ 'px';
					instructionPreview.style.width = (bbox.width+25) + 'px';
					window.dispatchEvent(new Event('resize'));
				}
			}
			catch(e)
			{
				console.log(e);
			}
		}

		function injectInstructionTooltip1(block,blockDiv,tooltipDiv) {
			var instructionPreview = document.getElementById(blockDiv);
			var mainWorkspace = Blockly.inject(blockDiv, {readOnly:true, collapse: false});
			mainWorkspace.clear();
			var block = mainWorkspace.newBlock(block);
			document.getElementById(tooltipDiv).innerHTML=block.tooltip;
			block.initSvg();
			block.render();
			block.setMovable(false);
			block.setDeletable(false);
			block.moveBy(15, 10);
			var bbox = block.getHeightWidth();
			instructionPreview.style.height = (bbox.height+25)+ 'px';
			instructionPreview.style.width = (bbox.width+55) + 'px';
			window.dispatchEvent(new Event('resize'));
		}
		
	function showHideElement(el){
		var el = document.getElementById(el);
		  if (el.style.display==='none')
			el.style.display="block";
		  else
			el.style.display="none";
	}
</script>
<script src="assets/web/assets/jquery/jquery.min.js"></script>
<div id="main">
<section class="mbr-section content4 cid-qYh0wRA9Kt" id="content4-4z">
	<div class="container">
		<div class="media-container-row">
			<div class=" title col-12 col-md-8">
				<h2 class="align-center pb-3 mbr-fonts-style display-2"/>
				<h2 class="align-center pb-3 mbr-fonts-style display-2"/>
				<h2 class="align-center pb-3 mbr-fonts-style display-2"/>
				<div class="mbr-section-btn text-center"><a onclick="onEcoThingsCoding();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>
				<h2 class="align-center pb-3 mbr-fonts-style display-2">
					<?php echo $projects["ECOTHINGS_LIVING_ROOM"]; ?></h2>
				<h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5">
					<?php echo $projects["ECOTHINGS_LIVING_ROOM_DESC"]; ?></h3>
			</div>
		</div>
	</div>
</section>

<section class="mbr-section article content1 cid-qYh0wSDsTN" id="content2-51">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7">
                <blockquote><strong><?php echo $website["REQUIRED_MATERIAL"]; ?> ESP32</strong><ul>
				<li><?php echo $website["BOARD_ESP32"]; ?></li>
				<li><?php echo $website["MATERIAL_NTC_SENSOR"]; ?> 36 (A4).</li>
				<li><?php echo $website["MATERIAL_RESISTORS_PACK_120"]; ?> 26 (D2).</li>
				<li><?php echo $website["MATERIAL_MINI_FAN"]; ?> 17 (D4).</li>
				<li><?php echo $website["MATERIAL_SERVO"]; ?> 25 (D3).</li>
				<li><?php echo $website["MATERIAL_TFT_SCREEN_18"]; ?> TFT_CLK&rarr; 18 (D13); TFT_SDA&rarr; 23 (D11); TFT_CS&rarr; 13 (D9); TFT_RST&rarr; 5 (D10); TFT_RS&rarr; 27 (D6).</li>
				</ul></blockquote>
				<blockquote><strong><?php echo $website["REQUIRED_MATERIAL"]; ?> Arduino Uno</strong><ul>
				<li><?php echo $website["BOARD_ARDUINO_UNO"]; ?></li>
				<li><?php echo $website["MATERIAL_NTC_SENSOR"]; ?> A0.</li>
				<li><?php echo $website["MATERIAL_RESISTORS_PACK_120"]; ?> D11.</li>
				<li><?php echo $website["MATERIAL_MINI_FAN"]; ?> D6.</li>
				<li><?php echo $website["MATERIAL_SERVO"]; ?> D3.</li>
				<li><?php echo $website["MATERIAL_LCD_I2C"]; ?> SDA&rarr; 18 A4; SCL&rarr; A5.</li>
				</ul></blockquote>
            </div>
        </div>
    </div>
</section>

<section class="cid-qYh0wSah5G" id="image3-50">
    <figure class="mbr-figure container">
            <div class="mbr-text align-center mbr-fonts-style display-5"><?php echo $website["CONNECTION_DIAGRAM"]; ?> ESP32</div>
            <div class="image-block mbr-fonts-style display-7" style="width: 50%;">
                <img id="schematic_modules" src="../assets/images/EcoThings/ecothings_living_room_bb.png" width="1400" alt="Modules" title=""></img>
            </div>
    </figure>
	<figure class="mbr-figure container">
            <div class="mbr-text align-center mbr-fonts-style display-5"><?php echo $website["CONNECTION_DIAGRAM"]; ?> Arduino Uno</div>
            <div class="image-block mbr-fonts-style display-7" style="width: 50%;">
                <img id="schematic_modules" src="../assets/images/EcoThings/ecothings_living_room_uno_bb.png" width="1400" alt="Modules" title=""></img>
            </div>
    </figure>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $website["WORKED_INSTRUCTIONS"]; ?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>


<section class="mbr-section article content11 cid-qYh0wTJYr3" id="content11-5w">
    <div class="container">
		<div class="media-container-row">
			<div class="mbr-text counter-container col-12 col-md-8 mbr-fonts-style display-7">
                <ol id="workedInstructions">
								<!-- Change the list of worked instructions. Modify the ids accordingly -->
								<li><div><span id='tooltipInstruction1'></span></div><div  id='blocklyInstruction1'></div><script>injectInstructionTooltip('inout_analog_read','blocklyInstruction1','tooltipInstruction1');</script></li>
								<li><div><span id='tooltipInstruction2'></span></div><div  id='blocklyInstruction2'></div><script>injectInstructionTooltip('pin_analog','blocklyInstruction2','tooltipInstruction2');</script></li>
								<li><div><span id='tooltipInstruction2a'></span></div><div  id='blocklyInstruction2a'></div><script>injectInstructionTooltip('pin_analog','blocklyInstruction2a','tooltipInstruction2a');</script></li>
								<li><div><span id='tooltipInstruction3'></span></div><div  id='blocklyInstruction3'></div><script>injectInstructionTooltip1('inout_digital_write','blocklyInstruction3','tooltipInstruction3');</script></li>
								<li><div><span id='tooltipInstruction6'></span></div><div  id='blocklyInstruction6'></div><script>injectInstructionTooltip('pin_digital','blocklyInstruction6','tooltipInstruction6');</script></li>
								<li><div><span id='tooltipInstruction4'></span></div><div  id='blocklyInstruction4'></div><script>injectInstructionTooltip1('inout_highlow','blocklyInstruction4','tooltipInstruction4');</script></li>
								<li><div><span id='tooltipInstruction5'></span></div><div  id='blocklyInstruction5'></div><script>injectInstructionTooltip('inout_analog_write','blocklyInstruction5','tooltipInstruction5');</script></li>
								<li><div><span id='tooltipInstruction7'></span></div><div  id='blocklyInstruction7'></div><script>injectInstructionTooltip('pin_pwm','blocklyInstruction7','tooltipInstruction7');</script></li>
								<li><div><span id='tooltipInstruction8'></span></div><div  id='blocklyInstruction8'></div><script>injectInstructionTooltip1('movement_servo_move','blocklyInstruction8','tooltipInstruction8');</script></li>
								<li><div><span id='tooltipInstruction9'></span></div><div  id='blocklyInstruction9'></div><script>injectInstructionTooltip1('lcd_def1','blocklyInstruction9','tooltipInstruction9');</script></li>
								<li><div><span id='tooltipInstruction10'></span></div><div  id='blocklyInstruction10'></div><script>injectInstructionTooltip1('lcd_print','blocklyInstruction10','tooltipInstruction10');</script></li>
								<li><div><span id='tooltipInstruction11'></span></div><div  id='blocklyInstruction11'></div><script>injectInstructionTooltip1('lcd_cursor','blocklyInstruction11','tooltipInstruction11');</script></li>
								<li><div><span id='tooltipInstruction12'></span></div><div  id='blocklyInstruction12'></div><script>injectInstructionTooltip1('lcd_clear','blocklyInstruction12','tooltipInstruction12');</script></li>
                </ol>
            </div>
		</div>
    </div>
</section>

<section class="mbr-section article content9 cid-qYh0wTdIZC">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5"><?php echo $website["BASIC_EXERCISES"]; ?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>


<section class="mbr-section article content11 cid-qYh0wTJYr3" id="content11-53">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text counter-container col-12 col-md-8 mbr-fonts-style display-7">
                <ol>
				  <!-- Change exercise title EXERCISE_BASIC_TITLE, description EXERCISE_BASIC_DESC and hint EXERCISE_BASIC_HINT. Modity the ids-->
                  <li><strong><?php echo $projects["READ_ANALOG_ECOTHINGS"]; ?> I</strong><p><?php echo $projects["READ_ANALOG_ECOTHINGS_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $projects["READ_ANALOG_ECOTHINGS_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise1b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise1b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/byTP4rFfn7N" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <?php
				  /*
				  ?><li><strong><?php echo $examples["BLINK_LEDS_AS_YOU_WISH"]; ?> II</strong><p><?php echo $examples["BLINK_LEDS_AS_YOU_WISH_DESC2"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["BLINK_LEDS_AS_YOU_WISH_HINT2"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise2b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise2b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/8HYpmsKkHWI" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["SUM_TWO_NUMBERS"]; ?></strong><p><?php echo $examples["SUM_TWO_NUMBERS_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["SUM_TWO_NUMBERS_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise3b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise3b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/guLuaqAqDhJ" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["MEAN_ANALOG_READ"]; ?></strong><p><?php echo $examples["MEAN_ANALOG_READ_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["MEAN_ANALOG_READ_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise4b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise4b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/6VT4jL2rYay" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <?php
				  */
				  ?>
                </ol>
            </div>
        </div>
    </div>
</section>


<section class="mbr-section article content9 cid-qYh0wTdIZC">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5"><?php echo $website["INTERMEDIATE_EXERCISES"];?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>

<section class="mbr-section article content11 cid-qYh0wTJYr3" id="content11-53">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text counter-container col-12 col-md-8 mbr-fonts-style display-7">
                <ol>
					<?php
				  /*
				  ?>
				  <li><strong><?php echo $examples["BASIC_SOS"]; ?></strong><p><?php echo $examples["BASIC_SOS_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["BASIC_SOS_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise1i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise1i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/3r5jUfw5ABf" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["SOS"]; ?></strong><p><?php echo $examples["SOS_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["SOS_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise2i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise2i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/e4L0qYFl7hm" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["ENCRYPTION"]; ?></strong><p><?php echo $examples["ENCRYPTION_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["ENCRYPTION_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise3i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise3i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/eq8Xu9sMEOs" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li><?php
				  */
				  ?>
					</ol>
            </div>
        </div>
    </div>
</section>


</div> <!-- main-->
<div class="mbr-section-btn text-center"><a onclick="onEcoThingsCoding();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>

</div>
<!-- <script>$(function(){var file='projects/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='projects/en-GB/home.html';},success: function(){}}); $('#main').load(file);});</script>-->

<script>
  $('#exercise1b').attr('src','../facilino.php?action=view_example&embbeded&id=122&lang='+window.FacilinoLanguage);
 
  
$('#exercise1b').on("load", function() {
    showHideElement('exercise1b');
});

/*$('#exercise2b').on("load", function() {
    showHideElement('exercise2b');
});

$('#exercise3b').on("load", function() {
    showHideElement('exercise3b');
});

$('#exercise4b').on("load", function() {
    showHideElement('exercise4b');
});

$('#exercise1i').on("load", function() {
    showHideElement('exercise1i');
});

$('#exercise2i').on("load", function() {
    showHideElement('exercise2i');
});

$('#exercise3i').on("load", function() {
    showHideElement('exercise3i');
});*/
</script>

</div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>




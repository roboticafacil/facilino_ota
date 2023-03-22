<?php
require_once('db.php');
require_once('website_translation.php');
require_once('projects_translation.php');

?>
<!DOCTYPE html>
<!-- 
<script src="assets/web/assets/jquery/jquery.min.js"></script>
<script src="javascript/underscore/underscore.js"></script>
<script src="javascript/blockly-bq/blockly_compressed.js"></script>
<script src="javascript/blockly-bq/blocks_compressed.js"></script>
<script src="javascript/blockly-bq/arduino_compressed.js"></script>
<script src="javascript/blockly-bq/FieldButton.js"></script>
<script src="facilino.js"></script>
<script src="facilino_common.js"></script>
<script src="facilino_functions.js"></script>
<script src="facilino_controls.js"></script>
<script src="facilino_programming.js"></script>
<script src="facilino_interrupts.js"></script>
<script src="facilino_statemachine.js"></script>
<script src="facilino_logic.js"></script>
<script src="facilino_bitwise.js"></script>
<script src="facilino_maths.js"></script>
<script src="facilino_arrays.js"></script>
<script src="facilino_curves.js"></script>
<script src="facilino_variables.js"></script>
<script src="facilino_variables_array.js"></script>
<script src="facilino_variables_object.js"></script>
<script src="facilino_eeprom.js"></script>
<script src="facilino_text.js"></script>
<script src="facilino_inout.js"></script>
<script src="facilino_buttons.js"></script>
<script src="facilino_bus.js"></script>
<script src="facilino_inout_others.js"></script>
<script src="facilino_lcd.js"></script>
<script src="facilino_led_matrix.js"></script>
<script src="facilino_led_strip.js"></script>
<script src="facilino_oled.js"></script>
<script src="facilino_serial.js"></script>
<script src="facilino_bluetooth.js"></script>
<script src="facilino_ble.js"></script>
<script src="facilino_wifi.js"></script>
<script src="facilino_http.js"></script>
<script src="facilino_iot.js"></script>
<script src="facilino_ir.js"></script>
<script src="facilino_sonar.js"></script>
<script src="facilino_infrared.js"></script>
<script src="facilino_buzzer.js"></script>
<script src="facilino_voice.js"></script>
<script src="facilino_mic.js"></script>
<script src="facilino_melody.js"></script>
<script src="facilino_mp3.js"></script>
<script src="facilino_color.js"></script>
<script src="facilino_ldr.js"></script>
<script src="facilino_lightdimmer.js"></script>
<script src="facilino_motor.js"></script>
<script src="facilino_robot_base.js"></script>
<script src="facilino_robot_acc.js"></script>
<script src="facilino_robot_walk.js"></script>
<script src="facilino_controller.js"></script>
<script src="facilino_filter.js"></script>
<script src="facilino_temperature.js"></script>
<script src="facilino_humidity.js"></script>
<script src="facilino_rain.js"></script>
<script src="facilino_gas.js"></script>
<script src="facilino_ambient_miscellaneous.js"></script>
<script src="facilino_html.js"></script>
<script src="facilino_espui.js"></script> -->
<html>
<?php include "head.php"; include "projects_head.php";
?>
<body>
<div id="header"><?php include "inc-header.php" ?></div>
		<div id="content" style="margin-top:0em; margin-left: 0em; margin-right: 0em">
<?php
echo '<script>window.FacilinoLanguage="'.$lang.'";</script>';
?>
<!-- 
<script>
	Blockly.onMouseUp_=function(e){};
	Blockly.onMouseDown_=function(e){};
	
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
	$.ajax({url: 'lang/facilino_'+window.FacilinoLanguage+'.json',dataType: "text",async: false,}).done(function(text) {window.langKeys = $.parseJSON(text).langs[window.FacilinoLanguage].keys;});
	$.ajax({url: 'lang/facilino_en-GB.json',dataType: "text",async: false,}).done(function(text) {window.langKeysEng = $.parseJSON(text).langs['en-GB'].keys;});
	
    function onHome()
	{
		//window.title='home_'+window.FacilinoLanguage;
		//$(function(){var file='projects/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='projects/en-GB/home.html';},success: function(){}}); $('#main').load(file); location.href = "#menu";});
		window.location='index.php';
	}
	function onProjects()
	{
		window.location='FacilinoProjects.php';
	}
	function onLEDRace()
	{
		window.title='LED_race_'+window.FacilinoLanguage;
		$(function(){var file='projects/'+ window.FacilinoLanguage+'/LED_race.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='projects/en-GB/LED_race.html';},success: function(){}}); $('#main').load(file); location.href = "#menu";});
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
</script>-->
<script src="projects/assets/web/assets/jquery/jquery.min.js"></script>

<div id="main">
<?php include('projects/home.php'); 
?>
</div>
</div>
</div>
<div id="ads"><?php include "ads.php" ?></div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>

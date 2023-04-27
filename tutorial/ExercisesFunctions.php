<?php
chdir("..");
require_once('db.php');
require_once('website_translation.php');
require_once('examples_translation.php');
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
<script src="../facilino_functions.js"></script>
<script src="../facilino_serial.js"></script>
<script src="../facilino_inout.js"></script>
<script src="../facilino_maths.js"></script>
<script src="../facilino_text.js"></script>
<script src="../facilino_controls.js"></script>
<script src="../facilino_variables.js"></script>
<script src="../facilino_buzzer.js"></script>
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
FacilinoFunctions.load({zoom: 1, readOnly:true, collapse: false});
FacilinoSerial.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoMaths.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoText.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoControls.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoInOut.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoVariables.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoBuzzer.load({ zoom: 1});
</script>
<script>
	Blockly.onMouseUp_=function(e){};
	Blockly.onMouseDown_=function(e){};
	
    function onHome()
	{
		window.location='index.php';
	}
	function onProjects()
	{
		window.location='../FacilinoProjects.php';
	}
	function onReturn()
	{
		/* Change with appropriate URL where to go when pushing BACK button */
		window.location='Exercises.php';
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
		window.dispatchEvent(new Event('resize'));
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
				<div class="mbr-section-btn text-center"><a onclick="onReturn();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>
				<h2 class="align-center pb-3 mbr-fonts-style display-2">
				<!-- Change EXERCISE_TITLE with appropiate key -->
					<?php echo $examples["FUNCTIONS_PROCEDURES"]; ?></h2>
				<h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5">
				<!-- Change EXERCISE_TITLE_DESC with appropiate key -->
					<?php echo $examples["FUNCTIONS_PROCEDURES_DESC"]; ?></h3>
			</div>
		</div>
	</div>
</section>

<section class="mbr-section article content1 cid-qYh0wSDsTN" id="content2-51">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7">
                <blockquote><strong><?php echo $website["REQUIRED_MATERIAL"]; ?></strong><ul>
				<!-- Change with appropiate list of materials -->
				<li><?php echo $website["BOARDS_LIST"]; ?></li>
				<li><?php echo $website["MATERIAL_POTENTIOMETER"]; ?> A0.</li>
				<li><?php echo $website["MATERIAL_PASSIVE_BUZZER"]; ?> D5.</li>
				<li><?php echo $website["MATERIAL_RED_LED"]; ?> D12.</li>
				
				</ul></blockquote>
            </div>
        </div>
    </div>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                   <?php echo $examples["PRELIMINARIES"]; ?></</div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["PROCEDURES_DESC"]; ?></div>
        </div>
    </div>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $examples["MORSE_CODE"]; ?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["MORSE_CODE_DESC"]; ?></div>
        </div>
    </div>
</section>

<section class="section-table cid-table" id="table1-62">
  <div class="container container-table" style="width: 62%">
      <div class="table-wrapper">
        <div class="container">
        </div>
        <div class="container scroll">
          <table class="table" cellspacing="0">
            <thead>
              <tr class="table-heads ">
              <th class="head-item mbr-fonts-style display-7">
                      <?php echo $examples["SIGN"]; ?></th><th class="head-item mbr-fonts-style display-7">
                      <?php echo $examples["MORSE_CODE"]; ?></th><th class="head-item mbr-fonts-style display-7">
                      <?php echo $examples["SIGN"]; ?></th><th class="head-item mbr-fonts-style display-7">
                      <?php echo $examples["MORSE_CODE"]; ?></th></tr>
            </thead>
            <tbody>
            <tr>
			  <td class="body-item mbr-fonts-style display-7">A</td><td class="body-item mbr-fonts-style display-7">· —</td><td class="body-item mbr-fonts-style display-7">T</td><td class="body-item mbr-fonts-style display-7">—</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">B</td><td class="body-item mbr-fonts-style display-7">— · · ·</td><td class="body-item mbr-fonts-style display-7">U</td><td class="body-item mbr-fonts-style display-7">· · —</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">C</td><td class="body-item mbr-fonts-style display-7">— · — ·</td><td class="body-item mbr-fonts-style display-7">V</td><td class="body-item mbr-fonts-style display-7">· · · —</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">D</td><td class="body-item mbr-fonts-style display-7">— · ·</td><td class="body-item mbr-fonts-style display-7">W</td><td class="body-item mbr-fonts-style display-7">· — —</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">E</td><td class="body-item mbr-fonts-style display-7">·</td><td class="body-item mbr-fonts-style display-7">X</td><td class="body-item mbr-fonts-style display-7">— · · —</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">F</td><td class="body-item mbr-fonts-style display-7">· · — ·</td><td class="body-item mbr-fonts-style display-7">Y</td><td class="body-item mbr-fonts-style display-7">— · — —</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">G</td><td class="body-item mbr-fonts-style display-7">— — ·</td><td class="body-item mbr-fonts-style display-7">Z</td><td class="body-item mbr-fonts-style display-7">— — · ·</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">H</td><td class="body-item mbr-fonts-style display-7">· · · ·</td><td class="body-item mbr-fonts-style display-7">0</td><td class="body-item mbr-fonts-style display-7">— — — — —</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">I</td><td class="body-item mbr-fonts-style display-7">· ·</td><td class="body-item mbr-fonts-style display-7">1</td><td class="body-item mbr-fonts-style display-7">· — — — —</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">J</td><td class="body-item mbr-fonts-style display-7">· — — —</td><td class="body-item mbr-fonts-style display-7">2</td><td class="body-item mbr-fonts-style display-7">· · — — —</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">K</td><td class="body-item mbr-fonts-style display-7">— · —</td><td class="body-item mbr-fonts-style display-7">3</td><td class="body-item mbr-fonts-style display-7">· · · — —</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">L</td><td class="body-item mbr-fonts-style display-7">· — · ·</td><td class="body-item mbr-fonts-style display-7">4</td><td class="body-item mbr-fonts-style display-7">· · · · —</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">M</td><td class="body-item mbr-fonts-style display-7">— —</td><td class="body-item mbr-fonts-style display-7">5</td><td class="body-item mbr-fonts-style display-7">· · · · ·</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">N</td><td class="body-item mbr-fonts-style display-7">— ·</td><td class="body-item mbr-fonts-style display-7">6</td><td class="body-item mbr-fonts-style display-7">— · · · ·</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">O</td><td class="body-item mbr-fonts-style display-7">— — —</td><td class="body-item mbr-fonts-style display-7">7</td><td class="body-item mbr-fonts-style display-7">— — · · ·</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">P</td><td class="body-item mbr-fonts-style display-7">· — — ·</td><td class="body-item mbr-fonts-style display-7">8</td><td class="body-item mbr-fonts-style display-7">— — — · ·</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">Q</td><td class="body-item mbr-fonts-style display-7">— — · —</td><td class="body-item mbr-fonts-style display-7">9</td><td class="body-item mbr-fonts-style display-7">— — — — ·</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">R</td><td class="body-item mbr-fonts-style display-7">· — ·</td><td class="body-item mbr-fonts-style display-7">.</td><td class="body-item mbr-fonts-style display-7">· — · — · —</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">S</td><td class="body-item mbr-fonts-style display-7">· · ·</td><td class="body-item mbr-fonts-style display-7">,</td><td class="body-item mbr-fonts-style display-7">— · — · — —</td></tr></tbody>
          </table>
        </div>
        <div class="container table-info-container">

        </div>
      </div>
    </div>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $examples["ENCRYPTION"]; ?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><strong><?php echo $examples["ENCRYPTION"]; ?></strong> <?php echo $examples["ATBASH_TABLE_DESC"]; ?></div>
        </div>
    </div>
</section>

<section class="section-table cid-table" id="table1-62">
  <div class="container container-table" style="width: 62%">
      <div class="table-wrapper">
        <div class="container">
        </div>
        <div class="container scroll">
          <table class="table" cellspacing="0">
            <thead>
              <tr class="table-heads ">
              <th class="head-item mbr-fonts-style display-7" colspan="4">
                      <?php echo $examples["ATBASH_ENCRYPTION_TABLE"]; ?></th></tr>
            </thead>
            <tbody>
            <tr>
			  <td class="body-item mbr-fonts-style display-7">a&#8594;z</td><td class="body-item mbr-fonts-style display-7">b&#8594;y</td><td class="body-item mbr-fonts-style display-7">c&#8594;x</td><td class="body-item mbr-fonts-style display-7">d&#8594;w</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">e&#8594;v</td><td class="body-item mbr-fonts-style display-7">f&#8594;u</td><td class="body-item mbr-fonts-style display-7">g&#8594;t</td><td class="body-item mbr-fonts-style display-7">h&#8594;s</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">i&#8594;r</td><td class="body-item mbr-fonts-style display-7">j&#8594;q</td><td class="body-item mbr-fonts-style display-7">k&#8594;p</td><td class="body-item mbr-fonts-style display-7">l&#8594;o</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">m&#8594;n</td><td class="body-item mbr-fonts-style display-7">n&#8594;m</td><td class="body-item mbr-fonts-style display-7">o&#8594;l</td><td class="body-item mbr-fonts-style display-7">p&#8594;k</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">q&#8594;j</td><td class="body-item mbr-fonts-style display-7">r&#8594;i</td><td class="body-item mbr-fonts-style display-7">s&#8594;h</td><td class="body-item mbr-fonts-style display-7">t&#8594;g</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">u&#8594;f</td><td class="body-item mbr-fonts-style display-7">v&#8594;e</td><td class="body-item mbr-fonts-style display-7">w&#8594;d</td><td class="body-item mbr-fonts-style display-7">x&#8594;c</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">y&#8594;b</td><td class="body-item mbr-fonts-style display-7">z&#8594;a</td></tr></tbody>
          </table>
        </div>
        <div class="container table-info-container">

        </div>
      </div>
    </div>
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
								<li><div><span id='tooltipInstruction1'></span></div><div  id='blocklyInstruction1'></div><script>injectInstructionTooltip('procedures_defnoreturn','blocklyInstruction1','tooltipInstruction1');</script></li>
								<li><div><span id='tooltipInstruction2'></span></div><div  id='blocklyInstruction2'></div><script>injectInstructionTooltip('procedures_defreturn','blocklyInstruction2','tooltipInstruction2');</script></li>
								<li><div><span id='tooltipInstruction3'></span></div><div  id='blocklyInstruction3'></div><script>injectInstructionTooltip1('procedures_callnoreturn','blocklyInstruction3','tooltipInstruction3');</script></li>
								<li><div><span id='tooltipInstruction4'></span></div><div  id='blocklyInstruction4'></div><script>injectInstructionTooltip1('procedures_callreturn','blocklyInstruction4','tooltipInstruction4');</script></li>
                </ol>
            </div>
		</div>
    </div>
</section>


<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $website["ADDITIONAL_INSTRUCTIONS"]; ?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>


<section class="mbr-section article content11 cid-qYh0wTJYr3" id="content11-5w">
    <div class="container">
		<div class="media-container-row">
			<div class="mbr-text counter-container col-12 col-md-8 mbr-fonts-style display-7">
                <ol id="workedInstructions">
					<!-- Change the list of additional instructions. Modify the ids accordingly -->
					<li><div><span id='tooltipInstruction5'></span></div><div  id='blocklyInstruction5'></div><script>injectInstructionTooltip('serial_available','blocklyInstruction5','tooltipInstruction5');</script></li>
					<li><div><span id='tooltipInstruction6'></span></div><div  id='blocklyInstruction6'></div><script>injectInstructionTooltip('serial_parseint','blocklyInstruction6','tooltipInstruction6');</script></li>
					<li><div><span id='tooltipInstruction7'></span></div><div  id='blocklyInstruction7'></div><script>injectInstructionTooltip('variables_local','blocklyInstruction7','tooltipInstruction7');</script></li>
					<li><div><span id='tooltipInstruction7a'></span></div><div  id='blocklyInstruction7a'></div><script>injectInstructionTooltip('variables_local_type','blocklyInstruction7a','tooltipInstruction7a');</script></li>
					<li><div><span id='tooltipInstruction8'></span></div><div  id='blocklyInstruction8'></div><script>injectInstructionTooltip1('variables_get','blocklyInstruction8','tooltipInstruction8');</script></li>
					<li><div><span id='tooltipInstruction8a'></span></div><div  id='blocklyInstruction8a'></div><script>injectInstructionTooltip1('variables_set','blocklyInstruction8a','tooltipInstruction8a');</script></li>
					<li><div><span id='tooltipInstruction9'></span></div><div  id='blocklyInstruction9'></div><script>injectInstructionTooltip1('controls_for','blocklyInstruction9','tooltipInstruction9');</script></li>
					<li><div><span id='tooltipInstruction9a'></span></div><div  id='blocklyInstruction9a'></div><script>injectInstructionTooltip1('controls_repeat','blocklyInstruction9a','tooltipInstruction9a');</script></li>
					<li><div><span id='tooltipInstruction9b'></span></div><div  id='blocklyInstruction9b'></div><script>injectInstructionTooltip1('controls_whileUntil','blocklyInstruction9b','tooltipInstruction9b');</script></li>
					<li><div><span id='tooltipInstruction10'></span></div><div  id='blocklyInstruction10'></div><script>injectInstructionTooltip('inout_digital_write','blocklyInstruction10','tooltipInstruction10');</script></li>
					<li><div><span id='tooltipInstruction11'></span></div><div  id='blocklyInstruction11'></div><script>injectInstructionTooltip('pin_digital','blocklyInstruction11','tooltipInstruction11');</script></li>
					<li><div><span id='tooltipInstruction11a'></span></div><div  id='blocklyInstruction11a'></div><script>injectInstructionTooltip('math_arithmetic','blocklyInstruction11a','tooltipInstruction11a');</script></li>
					<li><div><span id='tooltipInstruction12'></span></div><div  id='blocklyInstruction12'></div><script>injectInstructionTooltip('text_append','blocklyInstruction12','tooltipInstruction12');</script></li>
					<li><div><span id='tooltipInstruction13'></span></div><div  id='blocklyInstruction13'></div><script>injectInstructionTooltip('text_length','blocklyInstruction13','tooltipInstruction13');</script></li>
					<li><div><span id='tooltipInstruction14'></span></div><div  id='blocklyInstruction14'></div><script>injectInstructionTooltip('text_charAt','blocklyInstruction14','tooltipInstruction14');</script></li>
					<li><div><span id='tooltipInstruction15'></span></div><div  id='blocklyInstruction15'></div><script>injectInstructionTooltip('text_to_text','blocklyInstruction15','tooltipInstruction15');</script></li>
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
                  <li><strong><?php echo $examples["BLINK_LEDS_AS_YOU_WISH"]; ?> I</strong><p><?php echo $examples["BLINK_LEDS_AS_YOU_WISH_DESC1"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["BLINK_LEDS_AS_YOU_WISH_HINT1"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise1b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise1b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/k9FNBl8b1cS" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["BLINK_LEDS_AS_YOU_WISH"]; ?> II</strong><p><?php echo $examples["BLINK_LEDS_AS_YOU_WISH_DESC2"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["BLINK_LEDS_AS_YOU_WISH_HINT2"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise2b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise2b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/8HYpmsKkHWI" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["SUM_TWO_NUMBERS"]; ?></strong><p><?php echo $examples["SUM_TWO_NUMBERS_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["SUM_TWO_NUMBERS_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise3b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise3b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/guLuaqAqDhJ" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["MEAN_ANALOG_READ"]; ?></strong><p><?php echo $examples["MEAN_ANALOG_READ_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["MEAN_ANALOG_READ_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise4b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise4b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/6VT4jL2rYay" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
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
					<!-- Change exercise title EXERCISE_INTERMEDIATE_TITLE, description EXERCISE_INTERMEDIATE_DESC and hint EXERCISE_INTERMEDIATE_HINT. Modity the ids-->
					<li><strong><?php echo $examples["BASIC_SOS"]; ?></strong><p><?php echo $examples["BASIC_SOS_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["BASIC_SOS_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise1i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise1i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/3r5jUfw5ABf" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["SOS"]; ?></strong><p><?php echo $examples["SOS_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["SOS_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise2i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise2i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/e4L0qYFl7hm" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["ENCRYPTION"]; ?></strong><p><?php echo $examples["ENCRYPTION_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["ENCRYPTION_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise3i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise3i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/eq8Xu9sMEOs" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					</ol>
            </div>
        </div>
    </div>
</section>


</div> <!-- main-->
<div class="mbr-section-btn text-center"><a onclick="onReturn();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>

<script>
  $('#exercise1b').attr('src','../facilino.php?action=view_example&embbeded&id=38&lang='+window.FacilinoLanguage);
  $('#exercise2b').attr('src','../facilino.php?action=view_example&embbeded&id=39&lang='+window.FacilinoLanguage);
  if (window.FacilinoProcessor==='WEMOS_D1R32_SHIELD')
  {
	$('#exercise1b').attr('src','../facilino.php?action=view_example&embbeded&id=46&lang='+window.FacilinoLanguage);
	$('#exercise2b').attr('src','../facilino.php?action=view_example&embbeded&id=48&lang='+window.FacilinoLanguage);
	$('#exercise3b').attr('src','../facilino.php?action=view_example&embbeded&id=50&lang='+window.FacilinoLanguage);
	$('#exercise4b').attr('src','../facilino.php?action=view_example&embbeded&id=51&lang='+window.FacilinoLanguage);
	$('#exercise1i').attr('src','../facilino.php?action=view_example&embbeded&id=53&lang='+window.FacilinoLanguage);
	$('#exercise2i').attr('src','../facilino.php?action=view_example&embbeded&id=55&lang='+window.FacilinoLanguage);
	$('#exercise3i').attr('src','../facilino.php?action=view_example&embbeded&id=64&lang='+window.FacilinoLanguage);
  }
  else
  {
	$('#exercise1b').attr('src','../facilino.php?action=view_example&embbeded&id=47&lang='+window.FacilinoLanguage);
	$('#exercise2b').attr('src','../facilino.php?action=view_example&embbeded&id=49&lang='+window.FacilinoLanguage);
	$('#exercise3b').attr('src','../facilino.php?action=view_example&embbeded&id=50&lang='+window.FacilinoLanguage);
	$('#exercise4b').attr('src','../facilino.php?action=view_example&embbeded&id=52&lang='+window.FacilinoLanguage);
	$('#exercise1i').attr('src','../facilino.php?action=view_example&embbeded&id=54&lang='+window.FacilinoLanguage);
	$('#exercise2i').attr('src','../facilino.php?action=view_example&embbeded&id=56&lang='+window.FacilinoLanguage);
	$('#exercise3i').attr('src','../facilino.php?action=view_example&embbeded&id=64&lang='+window.FacilinoLanguage);
  }
 
  
$('#exercise1b').on("load", function() {
    showHideElement('exercise1b');
});

$('#exercise2b').on("load", function() {
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
});
</script>
</div>
</div>
<div id="ads"><?php include "../ads.php" ?></div>
<div id="footer"><?php include "../inc-footer.php" ?></div>
</body>
</html>
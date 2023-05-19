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
<script src="../facilino_serial.js"></script>
<script src="../facilino_inout.js"></script>
<script src="../facilino_logic.js"></script>
<script src="../facilino_maths.js"></script>
<script src="../facilino_text.js"></script>
<script src="../facilino_controls.js"></script>
<script src="../facilino_variables.js"></script>
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
FacilinoSerial.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoMaths.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoLogic.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoText.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoControls.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoInOut.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoVariables.load({ zoom: 1, readOnly:true, collapse: false});
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
					<?php echo $examples["BLINKING_LEDS"]; ?></h2>
				<h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5">
				<!-- Change EXERCISE_TITLE_DESC with appropiate key -->
					<?php echo $examples["BLINKING_LEDS_DESC"]; ?></h3>
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
				<li><?php echo $website["MATERIAL_PUSHBUTTON"]; ?> D2.</li>
				<li><?php echo $website["MATERIAL_RED_LED"]; ?> D12.</li>
				<li><?php echo $website["MATERIAL_BLUE_LED"]; ?> D13.</li>
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
								<li><div><span id='tooltipInstruction3'></span></div><div  id='blocklyInstruction3'></div><script>injectInstructionTooltip('inout_digital_read','blocklyInstruction3','tooltipInstruction3');</script></li>
								<li><div><span id='tooltipInstruction4'></span></div><div  id='blocklyInstruction4'></div><script>injectInstructionTooltip('inout_digital_write','blocklyInstruction4','tooltipInstruction4');</script></li>
								<li><div><span id='tooltipInstruction5'></span></div><div  id='blocklyInstruction5'></div><script>injectInstructionTooltip('inout_highlow','blocklyInstruction5','tooltipInstruction5');</script></li>
								<li><div><span id='tooltipInstruction6'></span></div><div  id='blocklyInstruction6'></div><script>injectInstructionTooltip('pin_digital','blocklyInstruction6','tooltipInstruction6');</script></li>
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
					<li><div><span id='tooltipInstruction7'></span></div><div  id='blocklyInstruction7'></div><script>injectInstructionTooltip('controls_if','blocklyInstruction7','tooltipInstruction7');</script></li>
					<li><div><span id='tooltipInstruction8'></span></div><div  id='blocklyInstruction8'></div><script>injectInstructionTooltip('base_delay','blocklyInstruction8','tooltipInstruction8');</script></li>
					<li><div><span id='tooltipInstruction9'></span></div><div  id='blocklyInstruction9'></div><script>injectInstructionTooltip('logic_compare','blocklyInstruction9','tooltipInstruction9');</script></li>
					<li><div><span id='tooltipInstruction10'></span></div><div  id='blocklyInstruction10'></div><script>injectInstructionTooltip('base_map','blocklyInstruction10','tooltipInstruction10');</script></li>
					<li><div><span id='tooltipInstruction11'></span></div><div  id='blocklyInstruction11'></div><script>injectInstructionTooltip('math_minmax','blocklyInstruction11','tooltipInstruction11');</script></li>
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
                  <li><strong><?php echo $examples["EXERCISE_SET_LED"]; ?></strong><p><?php echo $examples["EXERCISE_SET_LED_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["EXERCISE_SET_LED_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise1b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise1b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/5yp7yRRxRnY" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["EXERCISE_READ_PUSHBUTTON"]; ?></strong><p><?php echo $examples["EXERCISE_READ_PUSHBUTTON_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["EXERCISE_READ_PUSHBUTTON_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise2b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise2b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/4C9YSJxhZb9" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["EXERCISE_SET_LED_WHEN_NOT_PUSHED"]; ?></strong><p><?php echo $examples["EXERCISE_SET_LED_WHEN_NOT_PUSHED_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["EXERCISE_SET_LED_WHEN_NOT_PUSHED_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise3b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise3b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/cDACNxc5IKm" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["EXERCISE_BLINKING_LED"]; ?></strong><p><?php echo $examples["EXERCISE_BLINKING_LED_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["EXERCISE_BLINKING_LED_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise4b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise4b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/2sEMGInhQTD" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["EXERCISE_BLINKING_LEDs"]; ?></strong><p><?php echo $examples["EXERCISE_BLINKING_LEDs_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["EXERCISE_BLINKING_LEDs_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise5b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise5b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/b8wjPv83xdC" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
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
					<li><strong><?php echo $examples["EXERCISE_BLINKING_LEDs_VARYING_FREQ"]; ?></strong><p><?php echo $examples["EXERCISE_BLINKING_LEDs_VARYING_FREQ_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["EXERCISE_BLINKING_LEDs_VARYING_FREQ_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise1i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise1i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/kJVoMU1MvVK" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["EXERCISE_BLINKING_LEDs_INCREASING_FREQ"]; ?></strong><p><?php echo $examples["EXERCISE_BLINKING_LEDs_INCREASING_FREQ_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["EXERCISE_BLINKING_LEDs_INCREASING_FREQ_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise2i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise2i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/aGOMvthyPQu" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["EXERCISE_IS_IT_BLINKING"]; ?></strong><p><?php echo $examples["EXERCISE_IS_IT_BLINKING_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["EXERCISE_IS_IT_BLINKING_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise3i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise3i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/jZtlIohKwyF" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					</ol>
            </div>
        </div>
    </div>
</section>


</div> <!-- main-->
<div class="mbr-section-btn text-center"><a onclick="onReturn();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>

<script>
  if (window.FacilinoProcessor==='WEMOS_D1R32_SHIELD')
  {
	$('#exercise1b').attr('src','../facilino.php?action=view_example&embbeded&id=8&lang='+window.FacilinoLanguage);
	$('#exercise2b').attr('src','../facilino.php?action=view_example&embbeded&id=10&lang='+window.FacilinoLanguage);
	$('#exercise3b').attr('src','../facilino.php?action=view_example&embbeded&id=12&lang='+window.FacilinoLanguage);
	$('#exercise4b').attr('src','../facilino.php?action=view_example&embbeded&id=14&lang='+window.FacilinoLanguage);
	$('#exercise5b').attr('src','../facilino.php?action=view_example&embbeded&id=16&lang='+window.FacilinoLanguage);
	$('#exercise1i').attr('src','../facilino.php?action=view_example&embbeded&id=18&lang='+window.FacilinoLanguage);
	$('#exercise2i').attr('src','../facilino.php?action=view_example&embbeded&id=20&lang='+window.FacilinoLanguage);
	$('#exercise3i').attr('src','../facilino.php?action=view_example&embbeded&id=22&lang='+window.FacilinoLanguage);
  }
  else
  {
	$('#exercise1b').attr('src','../facilino.php?action=view_example&embbeded&id=9&lang='+window.FacilinoLanguage);
	$('#exercise2b').attr('src','../facilino.php?action=view_example&embbeded&id=11&lang='+window.FacilinoLanguage);
	$('#exercise3b').attr('src','../facilino.php?action=view_example&embbeded&id=13&lang='+window.FacilinoLanguage);
	$('#exercise4b').attr('src','../facilino.php?action=view_example&embbeded&id=15&lang='+window.FacilinoLanguage);
	$('#exercise5b').attr('src','../facilino.php?action=view_example&embbeded&id=17&lang='+window.FacilinoLanguage);
	$('#exercise1i').attr('src','../facilino.php?action=view_example&embbeded&id=19&lang='+window.FacilinoLanguage);
	$('#exercise2i').attr('src','../facilino.php?action=view_example&embbeded&id=21&lang='+window.FacilinoLanguage);
	$('#exercise3i').attr('src','../facilino.php?action=view_example&embbeded&id=23&lang='+window.FacilinoLanguage);
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

$('#exercise5b').on("load", function() {
    showHideElement('exercise5b');
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
<div id="footer"><?php include "../inc-footer.php" ?></div>
</body>
</html>
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
					<?php echo $examples["FLOW_CONTROL"]; ?></h2>
				<h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5">
				<!-- Change EXERCISE_TITLE_DESC with appropiate key -->
					<?php echo $examples["FLOW_CONTROL_DESC"]; ?></h3>
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
				<li><?php echo $website["MATERIAL_PUSHBUTTON"]; ?> D3.</li>
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
								<li><div><span id='tooltipInstruction1'></span></div><div  id='blocklyInstruction1'></div><script>injectInstructionTooltip('controls_repeat','blocklyInstruction1','tooltipInstruction1');</script></li>
								<li><div><span id='tooltipInstruction2'></span></div><div  id='blocklyInstruction2'></div><script>injectInstructionTooltip('controls_for','blocklyInstruction2','tooltipInstruction2');</script></li>
								<li><div><span id='tooltipInstruction3'></span></div><div  id='blocklyInstruction3'></div><script>injectInstructionTooltip('controls_if','blocklyInstruction3','tooltipInstruction3');</script></li>
								<li><div><span id='tooltipInstruction4'></span></div><div  id='blocklyInstruction4'></div><script>injectInstructionTooltip('base_delay','blocklyInstruction4','tooltipInstruction4');</script></li>
								<li><div><span id='tooltipInstruction5'></span></div><div  id='blocklyInstruction5'></div><script>injectInstructionTooltip('controls_flow_statements','blocklyInstruction5','tooltipInstruction5');</script></li>
								<li><div><span id='tooltipInstruction6'></span></div><div  id='blocklyInstruction6'></div><script>injectInstructionTooltip('controls_whileUntil','blocklyInstruction6','tooltipInstruction6');</script></li>
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
					<li><div><span id='tooltipInstruction7'></span></div><div  id='blocklyInstruction7'></div><script>injectInstructionTooltip('variables_local','blocklyInstruction7','tooltipInstruction7');</script></li>
					<li><div><span id='tooltipInstruction8'></span></div><div  id='blocklyInstruction8'></div><script>injectInstructionTooltip1('variables_get','blocklyInstruction8','tooltipInstruction8');</script></li>
					<li><div><span id='tooltipInstruction9'></span></div><div  id='blocklyInstruction9'></div><script>injectInstructionTooltip1('variables_set','blocklyInstruction9','tooltipInstruction9');</script></li>
					<li><div><span id='tooltipInstruction10'></span></div><div  id='blocklyInstruction10'></div><script>injectInstructionTooltip('text_join','blocklyInstruction10','tooltipInstruction10');</script></li>
					<li><div><span id='tooltipInstruction11'></span></div><div  id='blocklyInstruction11'></div><script>injectInstructionTooltip('zum_piezo_buzzerav','blocklyInstruction11','tooltipInstruction11');</script></li>
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
                  <li><strong><?php echo $examples["REPEATING_SENTENCE"]; ?></strong><p><?php echo $examples["REPEATING_SENTENCE_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["REPEATING_SENTENCE_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise1b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise1b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/d86zPFDiA2U" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["REPEATING_NUMBERED_SENTENCE"]; ?></strong><p><?php echo $examples["REPEATING_NUMBERED_SENTENCE_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["REPEATING_NUMBERED_SENTENCE_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise2b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise2b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/fyc7eEQdP0i" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
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
					<li><strong><?php echo $examples["HYSTERESIS"]; ?></strong><p><?php echo $examples["HYSTERESIS_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["HYSTERESIS_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise1i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise1i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/49Xz3uG8Zxf" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["WAIT_UNTIL_BREAK_LOOP"]; ?></strong><p><?php echo $examples["WAIT_UNTIL_BREAK_LOOP_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["WAIT_UNTIL_BREAK_LOOP_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise2i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise2i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/1730TgmjMQg" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["ALARM_EFFECT"]; ?></strong><p><?php echo $examples["ALARM_EFFECT_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["ALARM_EFFECT_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise3i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise3i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/abwxXWEnoXS" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
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
	$('#exercise1i').attr('src','../facilino.php?action=view_example&embbeded&id=40&lang='+window.FacilinoLanguage);
	$('#exercise2i').attr('src','../facilino.php?action=view_example&embbeded&id=42&lang='+window.FacilinoLanguage);
	$('#exercise3i').attr('src','../facilino.php?action=view_example&embbeded&id=44&lang='+window.FacilinoLanguage);
  }
  else
  {
	$('#exercise1i').attr('src','../facilino.php?action=view_example&embbeded&id=41&lang='+window.FacilinoLanguage);
	$('#exercise2i').attr('src','../facilino.php?action=view_example&embbeded&id=43&lang='+window.FacilinoLanguage);
	$('#exercise3i').attr('src','../facilino.php?action=view_example&embbeded&id=45&lang='+window.FacilinoLanguage);
  }
  
$('#exercise1b').on("load", function() {
    showHideElement('exercise1b');
});

$('#exercise2b').on("load", function() {
    showHideElement('exercise2b');
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
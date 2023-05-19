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
<script src="../facilino_led_strip.js"></script>
<script src="../facilino_interrupts.js"></script>
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
FacilinoLEDStrip.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoInterrupts.load({ zoom: 1, readOnly:true, collapse: false});
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
	function onLEDRace()
	{
		window.location='LEDRace.php';
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
				<div class="mbr-section-btn text-center"><a onclick="onLEDRace();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>
				<h2 class="align-center pb-3 mbr-fonts-style display-2">
					<?php echo $projects["BASIC_LED_RACE"]; ?></h2>
				<h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5">
					<?php echo $projects["BASIC_LED_RACE_DESC"]; ?></h3>
			</div>
		</div>
	</div>
</section>

<section class="mbr-section article content1 cid-qYh0wSDsTN" id="content2-51">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7">
                <blockquote><strong><?php echo $website["REQUIRED_MATERIAL"]; ?></strong><ul>
				<li><?php echo $website["BOARDS_LIST"]; ?></li>
				<li><?php echo $website["MATERIAL_LED_STRIP"]; ?> D7.</li>
				<li><?php echo $website["MATERIAL_PUSHBUTTON"]; ?> D2.</li>
				<li><?php echo $website["MATERIAL_PUSHBUTTON"]; ?> D3.</li>
				</ul></blockquote>
            </div>
        </div>
    </div>
</section>

<section class="cid-qYh0wSah5G" id="image3-50">
    <figure class="mbr-figure container">
            <div class="mbr-text align-center mbr-fonts-style display-5"><?php echo $website["MODULES"]; ?></div>
            <div class="image-block mbr-fonts-style display-7" style="width: 50%;">
                <img id="schematic_modules" src="assets/images/Electronics/led_race_nano_bb.png" width="1400" alt="Modules" title=""></img>
            </div>
    </figure>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><strong><?php echo $projects["BASIC_LED_RACE"]; ?></strong>: <?php echo $projects["BASIC_LED_RACE_INSTRUCTIONS"]; ?></div>
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
								<li><div><span id='tooltipInstruction1'></span></div><div  id='blocklyInstruction1'></div><script>injectInstructionTooltip1('led_strip','blocklyInstruction1','tooltipInstruction1');</script></li>
								<li><div><span id='tooltipInstruction2'></span></div><div  id='blocklyInstruction2'></div><script>injectInstructionTooltip1('led_strip_all_pixels','blocklyInstruction2','tooltipInstruction2');</script></li>
								<li><div><span id='tooltipInstruction5'></span></div><div  id='blocklyInstruction5'></div><script>injectInstructionTooltip1('led_strip_brightness','blocklyInstruction5','tooltipInstruction5');</script></li>
								<li><div><span id='tooltipInstruction7'></span></div><div  id='blocklyInstruction7'></div><script>injectInstructionTooltip1('attachInterrupt','blocklyInstruction7','tooltipInstruction7');</script></li>
								<li><div><span id='tooltipInstruction4'></span></div><div  id='blocklyInstruction4'></div><script>injectInstructionTooltip1('led_strip_gradient','blocklyInstruction4','tooltipInstruction4');</script></li>
								<li><div><span id='tooltipInstruction3'></span></div><div  id='blocklyInstruction3'></div><script>injectInstructionTooltip1('led_strip_hue','blocklyInstruction3','tooltipInstruction3');</script></li>
								<li><div><span id='tooltipInstruction8'></span></div><div  id='blocklyInstruction8'></div><script>injectInstructionTooltip1('variables_global_volatile_type','blocklyInstruction8','tooltipInstruction8');</script></li>
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
					<li><div><span id='tooltipInstruction9'></span></div><div  id='blocklyInstruction9'></div><script>injectInstructionTooltip1('variables_get','blocklyInstruction9','tooltipInstruction9');</script></li>
					<li><div><span id='tooltipInstruction10'></span></div><div  id='blocklyInstruction10'></div><script>injectInstructionTooltip1('controls_for','blocklyInstruction10','tooltipInstruction10');</script></li>
					<li><div><span id='tooltipInstruction13'></span></div><div  id='blocklyInstruction13'></div><script>injectInstructionTooltip1('math_random','blocklyInstruction13','tooltipInstruction13');</script></li>
				  </ol>
            </div>
		</div>
    </div>
</section>

<section class="mbr-section article content9 cid-qYh0wTdIZC">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5"><?php echo $website["INTERMEDIATE_EXERCISES"]; ?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>


<section class="mbr-section article content11 cid-qYh0wTJYr3" id="content11-53">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text counter-container col-12 col-md-8 mbr-fonts-style display-7">
                <ol>
			<li><strong><?php echo $projects["EXERCISE_MOVE_TWO_LEDS"]; ?></strong><p><?php echo $projects["EXERCISE_MOVE_TWO_LEDS_DESC"]; ?> </p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $projects["EXERCISE_MOVE_TWO_LEDS_HINT"]; ?></i></p>
			<button  type="button" title="Facilino code" onclick="showHideElement('exercise1i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise1i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/84laolPdAar" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
			</li>
			<li><strong><?php echo $projects["EXERCISE_MOVE_TWO_LEDS_BLINKING"]; ?></strong><p><?php echo $projects["EXERCISE_MOVE_TWO_LEDS_BLINKING_DESC"]; ?> </p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $projects["EXERCISE_MOVE_TWO_LEDS_BLINKING_HINT"]; ?></i></p>
			<button  type="button" title="Facilino code" onclick="showHideElement('exercise2i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise2i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/eyXGGVV05TE" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
			</li>
			<li><strong><?php echo $projects["EXERCISE_MOVE_TWO_LEDS_FINISHING"]; ?></strong><p><?php echo $projects["EXERCISE_MOVE_TWO_LEDS_FINISHING_DESC"]; ?></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $projects["EXERCISE_MOVE_TWO_LEDS_FINISHING_HINT"]; ?></i></p>
			<button  type="button" title="Facilino code" onclick="showHideElement('exercise3i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise3i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/1y5H008X41v" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
			</li>
			<li><strong><?php echo $projects["EXERCISE_MOVE_TWO_LEDS_LOOPS"]; ?></strong><p><?php echo $projects["EXERCISE_MOVE_TWO_LEDS_LOOPS_DESC"]; ?></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $projects["EXERCISE_MOVE_TWO_LEDS_LOOPS_HINT"]; ?></i></p>
			<button  type="button" title="Facilino code" onclick="showHideElement('exercise4i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise4i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/fnDRdZWg2M4" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
			</li>
			<li><strong><?php echo $projects["EXERCISE_BASIC_LED_RACE"]; ?></strong><p><?php echo $projects["EXERCISE_BASIC_LED_RACE_DESC"]; ?></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $projects["EXERCISE_BASIC_LED_RACE_HINT"]; ?></i></p>
			  <button  type="button" title="Facilino code" onclick="showHideElement('exercise5i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise5i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/2b5qEg2oZe6" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
			  </li>
			
                </ol>
            </div>
        </div>
    </div>
</section>
</div> <!-- main-->
<div class="mbr-section-btn text-center"><a onclick="onLEDRace();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>

<script>
$('#exercise1i').attr('src','../facilino.php?action=view_example&embbeded&id=108&lang='+window.FacilinoLanguage);
$('#exercise2i').attr('src','../facilino.php?action=view_example&embbeded&id=116&lang='+window.FacilinoLanguage);
$('#exercise3i').attr('src','../facilino.php?action=view_example&embbeded&id=118&lang='+window.FacilinoLanguage);
$('#exercise4i').attr('src','../facilino.php?action=view_example&embbeded&id=117&lang='+window.FacilinoLanguage);
$('#exercise5i').attr('src','../facilino.php?action=view_example&embbeded&id=112&lang='+window.FacilinoLanguage);

$('#exercise1i').on("load", function() {
    showHideElement('exercise1i');
});

$('#exercise2i').on("load", function() {
    showHideElement('exercise2i');
});

$('#exercise3i').on("load", function() {
    showHideElement('exercise3i');
});

$('#exercise4i').on("load", function() {
    showHideElement('exercise4i');
});

$('#exercise5i').on("load", function() {
    showHideElement('exercise5i');
});
</script>
</div>
<!-- <script>$(function(){var file='projects/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='projects/en-GB/home.html';},success: function(){}}); $('#main').load(file);});</script>-->
</div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>

<!-- <script>
	function onExercise(num)
	{
		window.title='exercise'+num+'_'+window.FacilinoLanguage;
		$(function(){var file= 'projects/'+window.FacilinoLanguage+'/exercise'+num+'.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){ file= 'projects/'+'en-GB/exercise'+num+'.html';},success: function(){}}); 
		
		$('#main').load(file); 
		//location.href = "#menu";
		});
	}
</script>-->




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
<script src="../facilino_maths.js"></script>
<script src="../facilino_text.js"></script>
<script src="../facilino_arrays.js"></script>
<script src="../facilino_controls.js"></script>
<script src="../facilino_variables.js"></script>
<script src="../facilino_variables_array.js"></script>
<script src="../facilino_serial.js"></script>
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
FacilinoMaths.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoArrays.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoText.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoControls.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoVariables.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoVariablesArray.load({ zoom: 1, readOnly:true, collapse: false});
FacilinoSerial.load({ zoom: 1, readOnly:true, collapse: false});
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
				<li><?php echo $website["MATERIAL_LDR"]; ?> A1.</li>
				<li><?php echo $website["MATERIAL_LM35"]; ?> A2.</li>
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
                    <?php echo $examples["VARIABLES_SCOPE"]; ?></div>
            <hr class="line" style="width: 25%;"></hr>
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $examples["VARIABLE_SCOPE_DESC1"]; ?></p>
			</div>
    </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $examples["VARIABLE_SCOPE_DESC2"]; ?></p>
			</div>
    </div>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    Variable types</div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>


<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $examples["VARIABLE_TYPES_DESC1"]; ?></p>
			</div>
    </div>
</section>



<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["VARIABLE_TYPES_DESC2"]; ?></div>
        </div>
    </div>
</section>

<section class="section-table cid-table" id="table1-62">
  <div class="container container-table" style="width: 40%">
      <div class="table-wrapper">
        <div class="container">
        </div>
        <div class="container scroll">
          <table class="table" cellspacing="0">
            <thead>
              <tr class="table-heads ">
              <th class="head-item mbr-fonts-style display-7">
                      <?php echo $examples["TYPE"]; ?></th><th class="head-item mbr-fonts-style display-7">
                      <?php echo $examples["BITS"]; ?></th><th class="head-item mbr-fonts-style display-7">
					  <?php echo $examples["MIN_VALUE"]; ?></th><th class="head-item mbr-fonts-style display-7">
					  <?php echo $examples["MAX_VALUE"]; ?></th><th class="head-item mbr-fonts-style display-7">
            </thead>
            <tbody>
            <tr>
			  <td class="body-item mbr-fonts-style display-7">boolean</td><td class="body-item mbr-fonts-style display-7">1</td><td class="body-item mbr-fonts-style display-7">0</td><td class="body-item mbr-fonts-style display-7">1</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">byte</td><td class="body-item mbr-fonts-style display-7">8</td><td class="body-item mbr-fonts-style display-7">0</td><td class="body-item mbr-fonts-style display-7">255</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">int</td><td class="body-item mbr-fonts-style display-7">16</td><td class="body-item mbr-fonts-style display-7">-32768</td><td class="body-item mbr-fonts-style display-7">32767</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">long int</td><td class="body-item mbr-fonts-style display-7">32</td><td class="body-item mbr-fonts-style display-7">-2147483648</td><td class="body-item mbr-fonts-style display-7">2147483647</td></tr><tr>
			  <td class="body-item mbr-fonts-style display-7">float</td><td class="body-item mbr-fonts-style display-7">32</td><td class="body-item mbr-fonts-style display-7">-3.4028235E+38</td><td class="body-item mbr-fonts-style display-7">3.4028235E+38</td></tr><tr></tbody>
          </table>
        </div>
        <div class="container table-info-container">

        </div>
      </div>
    </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["VARIABLE_TYPES_DESC3"]; ?></div>
        </div>
    </div>
</section>

<section class="section-table cid-table" id="table1-62">
  <div class="container container-table" style="width: 40%">
      <div class="table-wrapper">
        <div class="container">
        </div>
        <div class="container scroll">
          <table class="table" cellspacing="0">
            <thead>
              <tr class="table-heads ">
              <th class="head-item mbr-fonts-style display-7">
                      <?php echo $examples["TYPE"]; ?></th><th class="head-item mbr-fonts-style display-7">
                      <?php echo $examples["BITS"]; ?></th><th class="head-item mbr-fonts-style display-7">
					  <?php echo $examples["MIN_VALUE"]; ?></th><th class="head-item mbr-fonts-style display-7">
					  <?php echo $examples["MAX_VALUE"]; ?></th><th class="head-item mbr-fonts-style display-7">
            </thead>
            <tbody>
            <tr>
			  <td class="body-item mbr-fonts-style display-7">boolean</td><td class="body-item mbr-fonts-style display-7">1</td><td class="body-item mbr-fonts-style display-7">0</td><td class="body-item mbr-fonts-style display-7">1</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">byte</td><td class="body-item mbr-fonts-style display-7">8</td><td class="body-item mbr-fonts-style display-7">0</td><td class="body-item mbr-fonts-style display-7">255</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">short int</td><td class="body-item mbr-fonts-style display-7">16</td><td class="body-item mbr-fonts-style display-7">-32768</td><td class="body-item mbr-fonts-style display-7">32767</td></tr><tr>
			  <td class="body-item mbr-fonts-style display-7">int</td><td class="body-item mbr-fonts-style display-7">32</td><td class="body-item mbr-fonts-style display-7">-2147483648</td><td class="body-item mbr-fonts-style display-7">2147483647</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">long int</td><td class="body-item mbr-fonts-style display-7">32</td><td class="body-item mbr-fonts-style display-7">-2147483648</td><td class="body-item mbr-fonts-style display-7">2147483647</td></tr><tr>
			  <td class="body-item mbr-fonts-style display-7">float</td><td class="body-item mbr-fonts-style display-7">32</td><td class="body-item mbr-fonts-style display-7">-3.4028235E+38</td><td class="body-item mbr-fonts-style display-7">3.4028235E+38</td></tr><tr></tbody>
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
                    <?php echo $examples["ARRAY_VARIABLES"]; ?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $examples["ARRAY_VARIABLES_DESC"]; ?></p></div>
        </div>
    </div>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $examples["CHESSBOARD_LEGEND"]; ?></div>
            <hr class="line" style="width: 25%;">
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["CHESSBOARD_LEGEND_DESC"]; ?></div>
        </div>
    </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["CHESSBOARD_LEGEND_DESC2"]; ?></div>
        </div>
    </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["CHESSBOARD_LEGEND_DESC3"]; ?></div>
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
								<li><div><span id='tooltipInstruction1'></span></div><div  id='blocklyInstruction1'></div><script>injectInstructionTooltip1('variables_get','blocklyInstruction1','tooltipInstruction1');</script></li>
								<li><div><span id='tooltipInstruction2'></span></div><div  id='blocklyInstruction2'></div><script>injectInstructionTooltip1('variables_set','blocklyInstruction2','tooltipInstruction2');</script></li>
								<li><div><span id='tooltipInstruction3'></span></div><div  id='blocklyInstruction3'></div><script>injectInstructionTooltip1('variables_local','blocklyInstruction3','tooltipInstruction3');</script></li>
								<li><div><span id='tooltipInstruction4'></span></div><div  id='blocklyInstruction4'></div><script>injectInstructionTooltip1('variables_local_type','blocklyInstruction4','tooltipInstruction4');</script></li>
								<li><div><span id='tooltipInstruction5'></span></div><div  id='blocklyInstruction5'></div><script>injectInstructionTooltip('variables_global','blocklyInstruction5','tooltipInstruction5');</script></li>
								<li><div><span id='tooltipInstruction6'></span></div><div  id='blocklyInstruction6'></div><script>injectInstructionTooltip('variables_global_type','blocklyInstruction6','tooltipInstruction6');</script></li>
								<li><div><span id='tooltipInstruction7'></span></div><div  id='blocklyInstruction7'></div><script>injectInstructionTooltip1('variables_get_1Darray','blocklyInstruction7','tooltipInstruction7');</script></li>
								<li><div><span id='tooltipInstruction8'></span></div><div  id='blocklyInstruction8'></div><script>injectInstructionTooltip('variables_local_1DArray','blocklyInstruction8','tooltipInstruction8');
								</script></li>
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
					<li><div><span id='tooltipInstruction9'></span></div><div  id='blocklyInstruction9'></div><script>injectInstructionTooltip1('math_1DArray_decode','blocklyInstruction9','tooltipInstruction9');</script></li>
					<li><div><span id='tooltipInstruction10'></span></div><div  id='blocklyInstruction10'></div><script>injectInstructionTooltip('math_1DArray_encode','blocklyInstruction10','tooltipInstruction10');</script></li>
					<li><div><span id='tooltipInstruction11'></span></div><div  id='blocklyInstruction11'></div><script>injectInstructionTooltip('text_join','blocklyInstruction11','tooltipInstruction11');</script></li>
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
                  <li><strong><?php echo $examples["LOCAL_VARIABLE"]; ?></strong><p><?php echo $examples["LOCAL_VARIABLE_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["LOCAL_VARIABLE_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise1b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise1b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/i9in6ANCP1A" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["GLOBAL_VARIABLE"]; ?></strong><p><?php echo $examples["GLOBAL_VARIABLE_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["GLOBAL_VARIABLE_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise2b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise2b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/l3gc8oj9RsI" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["VARIABLE_CONTEXT"]; ?></strong><p><?php echo $examples["VARIABLE_CONTEXT_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["VARIABLE_CONTEXT_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise3b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise3b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/5zvEkEU9Xo9" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["MOVING_AVERAGE"]; ?></strong><p><?php echo $examples["MOVING_AVERAGE_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["MOVING_AVERAGE_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise4b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise4b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/8Ad9fyDrl2W" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
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
					<li><strong><?php echo $examples["RICE_GRAINS_IN_TOTAL"]; ?></strong><p><?php echo $examples["RICE_GRAINS_IN_TOTAL_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["RICE_GRAINS_IN_TOTAL_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise1i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise1i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/dRwLKbzY7hp" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["SEND_ARRAY_DATA"]; ?></strong><p><?php echo $examples["SEND_ARRAY_DATA_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["SEND_ARRAY_DATA_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise2i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise2i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/70WqwWgsb51" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["STORE_ARRAY_DATA"]; ?></strong><p><?php echo $examples["STORE_ARRAY_DATA_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["STORE_ARRAY_DATA_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise3i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise3i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/kvxf69OaB0t" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
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
	$('#exercise1b').attr('src','../facilino.php?action=view_example&embbeded&id=65&lang='+window.FacilinoLanguage);
	$('#exercise2b').attr('src','../facilino.php?action=view_example&embbeded&id=66&lang='+window.FacilinoLanguage);
	$('#exercise3b').attr('src','../facilino.php?action=view_example&embbeded&id=67&lang='+window.FacilinoLanguage);
	$('#exercise4b').attr('src','../facilino.php?action=view_example&embbeded&id=69&lang='+window.FacilinoLanguage);
	$('#exercise1i').attr('src','../facilino.php?action=view_example&embbeded&id=71&lang='+window.FacilinoLanguage);
	$('#exercise2i').attr('src','../facilino.php?action=view_example&embbeded&id=73&lang='+window.FacilinoLanguage);
	$('#exercise3i').attr('src','../facilino.php?action=view_example&embbeded&id=75&lang='+window.FacilinoLanguage);
  }
  else
  {
	$('#exercise1b').attr('src','../facilino.php?action=view_example&embbeded&id=65&lang='+window.FacilinoLanguage);
	$('#exercise2b').attr('src','../facilino.php?action=view_example&embbeded&id=66&lang='+window.FacilinoLanguage);
	$('#exercise3b').attr('src','../facilino.php?action=view_example&embbeded&id=68&lang='+window.FacilinoLanguage);
	$('#exercise4b').attr('src','../facilino.php?action=view_example&embbeded&id=70&lang='+window.FacilinoLanguage);
	$('#exercise1i').attr('src','../facilino.php?action=view_example&embbeded&id=72&lang='+window.FacilinoLanguage);
	$('#exercise2i').attr('src','../facilino.php?action=view_example&embbeded&id=74&lang='+window.FacilinoLanguage);
	$('#exercise3i').attr('src','../facilino.php?action=view_example&embbeded&id=76&lang='+window.FacilinoLanguage);
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
<div id="footer"><?php include "../inc-footer.php" ?></div>
</body>
</html>
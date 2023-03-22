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
<script src="../facilino_bitwise.js"></script>
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
FacilinoBitwise.load({ zoom: 1, readOnly:true, collapse: false});
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
					<?php echo $examples["LOGIC"]; ?></h2>
				<h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5">
				<!-- Change EXERCISE_TITLE_DESC with appropiate key -->
					<?php echo $examples["LOGIC_DESC"]; ?></h3>
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
				<li><?php echo $website["MATERIAL_PUSHBUTTON"]; ?> D2.</li>
				<li><?php echo $website["MATERIAL_PUSHBUTTON"]; ?> D3.</li>
				<li><?php echo $website["MATERIAL_RED_LED"]; ?> D12.</li>
				<li><?php echo $website["MATERIAL_BLUE_LED"]; ?> D13.</li>
				</ul></blockquote>
            </div>
        </div>
    </div>
</section>

<section class="cid-qYh0wSah5G" id="image3-50">
    <figure class="mbr-figure container">
            <div class="mbr-text align-center mbr-fonts-style display-5"><?php echo $website["MULTISENSOR"]; ?></div>
            <div class="image-block mbr-fonts-style display-7" style="width: 50%;">
			<!-- Change image URL XXX.png with appropriate name -->
                <img id="schematic" src="assets/images/Electronics/multisensor_wemosD1R32_bb.png" width="1400" alt="Multisensor" title=""></img>
            </div>
    </figure>
</section>

<section class="cid-qYh0wSah5G" id="image3-50">
    <figure class="mbr-figure container">
            <div class="mbr-text align-center mbr-fonts-style display-5"><?php echo $website["MODULES"]; ?></div>
            <div class="image-block mbr-fonts-style display-7" style="width: 50%;">
			<!-- Change image URL XXX.png with appropriate name -->
                <img id="schematic_modules" src="assets/images/Electronics/multisensor_wemosD1R32_LEDs_pushbuttons_modules_bb.png" width="1400" alt="Modules" title=""></img>
            </div>
    </figure>
</section>

<section class="cid-qYh0wSah5G" id="image3-50">
    <figure class="mbr-figure container">
            <div class="mbr-text align-center mbr-fonts-style display-5"><?php echo $website["PROTOBOARD"]; ?></div>
            <div class="image-block mbr-fonts-style display-7" style="width: 50%;">
                <img id="schematic_proto" src="assets/images/Electronics/multisensor_wemosD1R32_LEDs_pushbuttons_bb.png" width="1400" alt="Protoboard" title=""></img>
            </div>
    </figure>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $examples["BOOLEAN_LOGIC"]; ?></div>
            <hr class="line" style="width: 25%;"></hr>
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["BOOLEAN_LOGIC_DESC1"]; ?></div>
        </div>
    </div>
</section>

<section class="cid-qYh0wSah5G" id="image3-50">
    <figure class="mbr-figure container">
            <div class="image-block" style="width: 20%;">
                <img src="assets/images/George_Boole.jpg" width="1400" alt="George Boole" title=""></img>

            </div>
    </figure>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["BOOLEAN_LOGIC_DESC2"]; ?></div>
        </div>
    </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><p><?php echo $examples["BOOLEAN_LOGIC_DESC3"]; ?></div>
        </div>
    </div>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $examples["BITS_AND_NUMBERS"]; ?></div>
            <hr class="line" style="width: 25%;"></hr>
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><strong><?php echo $examples["BITS_AND_NUMBERS_DESC1"]; ?></div>
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
                      <?php echo $examples["DECIMAL_NUMBER"]; ?></th><th class="head-item mbr-fonts-style display-7">
                      <?php echo $examples["REQUIRED_BITS"]; ?></th><th class="head-item mbr-fonts-style display-7">
					  					<?php echo $examples["BINARY_REPRESENTATION"]; ?></th><th class="head-item mbr-fonts-style display-7">
            </thead>
            <tbody>
            <tr>
			  <td class="body-item mbr-fonts-style display-7">0</td><td class="body-item mbr-fonts-style display-7">1</td><td class="body-item mbr-fonts-style display-7">0b</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">1</td><td class="body-item mbr-fonts-style display-7">1</td><td class="body-item mbr-fonts-style display-7">1b</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">2</td><td class="body-item mbr-fonts-style display-7">2</td><td class="body-item mbr-fonts-style display-7">10b</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">3</td><td class="body-item mbr-fonts-style display-7">2</td><td class="body-item mbr-fonts-style display-7">11b</td></tr><tr>
			  			<td class="body-item mbr-fonts-style display-7">4</td><td class="body-item mbr-fonts-style display-7">3</td><td class="body-item mbr-fonts-style display-7">100b</td></tr><tr>
							<td class="body-item mbr-fonts-style display-7">7</td><td class="body-item mbr-fonts-style display-7">3</td><td class="body-item mbr-fonts-style display-7">111b</td></tr><tr>
							<td class="body-item mbr-fonts-style display-7">8</td><td class="body-item mbr-fonts-style display-7">4</td><td class="body-item mbr-fonts-style display-7">1000b</td></tr><tr>
							<td class="body-item mbr-fonts-style display-7">15</td><td class="body-item mbr-fonts-style display-7">4</td><td class="body-item mbr-fonts-style display-7">1111b</td></tr><tr>
							<td class="body-item mbr-fonts-style display-7">16</td><td class="body-item mbr-fonts-style display-7">5</td><td class="body-item mbr-fonts-style display-7">10000b</td></tr><tr>
							</tbody>
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
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["BITS_AND_NUMBERS_DESC2"]; ?></div>
        </div>
    </div>
</section>

<section class="mbr-section article content9 cid-qYh5KdWW4b" id="content9-5u">
    <div class="container">
        <div class="inner-container" style="width: 100%;">
            <hr class="line" style="width: 25%;">
            <div class="section-text align-center mbr-fonts-style display-5">
                    <?php echo $examples["BITWISE_OPERATIONS"]; ?></div>
            <hr class="line" style="width: 25%;"></hr>
        </div>
        </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["BITWISE_OPERATIONS_DESC1"]; ?></div>
        </div>
    </div>
</section>

<section class="mbr-section article content1 cid-qYh5PFH3xX" id="content1-5w">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7"><?php echo $examples["BOOLEAN_LOGIC_DESC1"]; ?></div>
        </div>
    </div>
</section>

<section class="section-table cid-table" id="table1-62">
  <div class="container container-table" style="width: 60%">
      <div class="table-wrapper">
        <div class="container">
        </div>
        <div class="container scroll">
          <table class="table" cellspacing="0">
            <thead>
              <tr class="table-heads ">
              <th class="head-item mbr-fonts-style display-7">
                      <?php echo $examples["OPERAND"]; ?> 1</th><th class="head-item mbr-fonts-style display-7">
											<?php echo $examples["OPERAND"]; ?> 2</th><th class="head-item mbr-fonts-style display-7">
                      <?php echo $examples["BITWISE_OPERATION"]; ?></th><th class="head-item mbr-fonts-style display-7">
					  					<?php echo $examples["RESULT"]; ?></th><th class="head-item mbr-fonts-style display-7">
            </thead>
            <tbody>
            <tr>
			  		  <td class="body-item mbr-fonts-style display-7">7 (111b)</td><td class="body-item mbr-fonts-style display-7">4 (100b)</td><td class="body-item mbr-fonts-style display-7">AND<br>OR<br>XOR</td><td class="body-item mbr-fonts-style display-7">4 (100b)<br>7 (111b)<br>3 (011b)</td></tr><tr>
							<td class="body-item mbr-fonts-style display-7">11 (1011b)</td><td class="body-item mbr-fonts-style display-7">5 (0101b)</td><td class="body-item mbr-fonts-style display-7">AND<br>OR<br>XOR</td><td class="body-item mbr-fonts-style display-7">1 (0001b)<br>15 (1111b)<br>14 (1110b)</td></tr><tr>
              <td class="body-item mbr-fonts-style display-7">25 (011001b)</td><td class="body-item mbr-fonts-style display-7">47 (101111b)</td><td class="body-item mbr-fonts-style display-7">AND<br>OR<br>XOR</td><td class="body-item mbr-fonts-style display-7">9 (001001b)<br>63 (111111b)<br>54 (110110b)</td></tr><tr>
							<td class="body-item mbr-fonts-style display-7">100 (01100100b)</td><td class="body-item mbr-fonts-style display-7">200 (11001000b)</td><td class="body-item mbr-fonts-style display-7">AND<br>OR<br>XOR</td><td class="body-item mbr-fonts-style display-7">64 (1000000b)<br>236 (11101100b)<br>172 (10101100b)</td></tr><tr>
							</tbody>
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
								<li><div><span id='tooltipInstruction1'></span></div><div  id='blocklyInstruction1'></div><script>injectInstructionTooltip('logic_compare','blocklyInstruction1','tooltipInstruction1');</script></li>
								<li><div><span id='tooltipInstruction2'></span></div><div  id='blocklyInstruction2'></div><script>injectInstructionTooltip('logic_operation','blocklyInstruction2','tooltipInstruction2');</script></li>
								<li><div><span id='tooltipInstruction3'></span></div><div  id='blocklyInstruction3'></div><script>injectInstructionTooltip('logic_negate','blocklyInstruction3','tooltipInstruction3');</script></li>
								<li><div><span id='tooltipInstruction4'></span></div><div  id='blocklyInstruction4'></div><script>injectInstructionTooltip('logic_bitwise_operation','blocklyInstruction4','tooltipInstruction4');</script></li>
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
					<li><div><span id='tooltipInstruction5'></span></div><div  id='blocklyInstruction5'></div><script>injectInstructionTooltip('variables_local','blocklyInstruction5','tooltipInstruction5');</script></li>
					<li><div><span id='tooltipInstruction6'></span></div><div  id='blocklyInstruction6'></div><script>injectInstructionTooltip1('variables_get','blocklyInstruction6','tooltipInstruction6');</script></li>
					<li><div><span id='tooltipInstruction7'></span></div><div  id='blocklyInstruction7'></div><script>injectInstructionTooltip('inout_digital_read','blocklyInstruction7','tooltipInstruction7');</script></li>
					<li><div><span id='tooltipInstruction8'></span></div><div  id='blocklyInstruction8'></div><script>injectInstructionTooltip('inout_digital_write','blocklyInstruction8','tooltipInstruction8');</script></li>
					<li><div><span id='tooltipInstruction9'></span></div><div  id='blocklyInstruction9'></div><script>injectInstructionTooltip('pin_digital','blocklyInstruction9','tooltipInstruction9');</script></li>
					<li><div><span id='tooltipInstruction10'></span></div><div  id='blocklyInstruction10'></div><script>injectInstructionTooltip('inout_analog_read','blocklyInstruction10','tooltipInstruction10');</script></li>
					<li><div><span id='tooltipInstruction11'></span></div><div  id='blocklyInstruction11'></div><script>injectInstructionTooltip('pin_analog','blocklyInstruction11','tooltipInstruction11');</script></li>
				  <li><div><span id='tooltipInstruction12'></span></div><div  id='blocklyInstruction12'></div><script>injectInstructionTooltip('controls_if','blocklyInstruction12','tooltipInstruction12');</script></li>
					<li><div><span id='tooltipInstruction13'></span></div><div  id='blocklyInstruction13'></div><script>injectInstructionTooltip('serial_available','blocklyInstruction13','tooltipInstruction13');</script></li>
				  <li><div><span id='tooltipInstruction14'></span></div><div  id='blocklyInstruction14'></div><script>injectInstructionTooltip('serial_parseint','blocklyInstruction14','tooltipInstruction14');</script></li>
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
                  <li><strong><?php echo $examples["EXERCISE_SET_LED_WHEN_PUSHED"]; ?></strong><p><?php echo $examples["EXERCISE_SET_LED_WHEN_PUSHED_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["EXERCISE_SET_LED_WHEN_PUSHED_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise1b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise1b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/ezRMhBwAYu9" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["EXERCISE_AND_OPERATION"]; ?></strong><p><?php echo $examples["EXERCISE_AND_OPERATION_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["EXERCISE_AND_OPERATION_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise2b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise2b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/aGSDFuqKUSF" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["EXERCISE_EQUIVALENT_AND_OPERATION"]; ?></strong><p><?php echo $examples["EXERCISE_EQUIVALENT_AND_OPERATION_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["EXERCISE_EQUIVALENT_AND_OPERATION_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise3b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise3b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/2CrGKMPlbH9" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
				  </li>
				  <li><strong><?php echo $examples["EXERCISE_SIMPLE_COMPARISON"]; ?></strong><p><?php echo $examples["EXERCISE_SIMPLE_COMPARISON_DESC"]; ?></i></p><strong><?php echo $website["HINT"]; ?></strong><p><i><?php echo $examples["EXERCISE_SIMPLE_COMPARISON_HINT"]; ?></i></p>
				  <button  type="button" title="Facilino code" onclick="showHideElement('exercise4b');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
					<div><iframe id="exercise4b" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
					<iframe width="725" height="453" src="https://www.tinkercad.com/embed/lu2Ned3Devm" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
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
					<li><strong><?php echo $examples["EXERCISE_AND_OR_OPERATIONS"]; ?></strong><p><?php echo $examples["EXERCISE_AND_OR_OPERATIONS_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["EXERCISE_AND_OR_OPERATIONS_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise1i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise1i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/eqfs4bUC5OX" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["EXERCISE_EVEN_OR_ODD"]; ?></strong><p><?php echo $examples["EXERCISE_EVEN_OR_ODD_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["EXERCISE_EVEN_OR_ODD_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise2i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise2i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/5wxg5GdZ1mR" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					<li><strong><?php echo $examples["EXERCISE_COMPARISON"]; ?></strong><p><?php echo $examples["EXERCISE_COMPARISON_DESC"]; ?></p><strong><?php echo $website["HINT"];?></strong><p><i><?php echo $examples["EXERCISE_COMPARISON_HINT"]; ?></i></p>            
					<button  type="button" title="Facilino code" onclick="showHideElement('exercise3i');" class="btn-primary display-4"><span class="mbri-extension mbr-iconfont mbr-iconfont-btn"></span></button>
			<div><iframe id="exercise3i" style="display:block" frameBorder="0"  src="" onload="resizeIFrameToFitContent(this);"></iframe></div>
					<!-- Change TinkerCAD URL -->
			<iframe width="725" height="453" src="https://www.tinkercad.com/embed/jjzzWwfVQ6U" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe>
					</li>
					</ol>
            </div>
        </div>
    </div>
</section>


</div> <!-- main-->
<div class="mbr-section-btn text-center"><a onclick="onReturn();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>

<script>
var sch=document.getElementById('schematic');
sch.src='assets/images/Electronics/multisensor'+window.board+'_bb.png';
var sch_modules=document.getElementById('schematic_modules');
sch_modules.src='assets/images/Electronics/multisensor'+window.board+'_pot_LEDs_pushbutton_modules_bb.png';
var sch_proto=document.getElementById('schematic_proto');
sch_proto.src='assets/images/Electronics/multisensor'+window.board+'_pot_LEDs_pushbutton_bb.png';
if (window.FacilinoProcessor==='WEMOS_D1R32_SHIELD')
{
	$('#exercise1b').attr('src','../facilino.php?action=view_example&embbeded&id=24&lang='+window.FacilinoLanguage);
	$('#exercise2b').attr('src','../facilino.php?action=view_example&embbeded&id=26&lang='+window.FacilinoLanguage);
	$('#exercise3b').attr('src','../facilino.php?action=view_example&embbeded&id=28&lang='+window.FacilinoLanguage);
	$('#exercise4b').attr('src','../facilino.php?action=view_example&embbeded&id=30&lang='+window.FacilinoLanguage);
	$('#exercise1i').attr('src','../facilino.php?action=view_example&embbeded&id=32&lang='+window.FacilinoLanguage);
	$('#exercise2i').attr('src','../facilino.php?action=view_example&embbeded&id=34&lang='+window.FacilinoLanguage);
	$('#exercise3i').attr('src','../facilino.php?action=view_example&embbeded&id=36&lang='+window.FacilinoLanguage);
}
else
{
	$('#exercise1b').attr('src','../facilino.php?action=view_example&embbeded&id=25&lang='+window.FacilinoLanguage);
	$('#exercise2b').attr('src','../facilino.php?action=view_example&embbeded&id=27&lang='+window.FacilinoLanguage);
	$('#exercise3b').attr('src','../facilino.php?action=view_example&embbeded&id=29&lang='+window.FacilinoLanguage);
	$('#exercise4b').attr('src','../facilino.php?action=view_example&embbeded&id=31&lang='+window.FacilinoLanguage);
	$('#exercise1i').attr('src','../facilino.php?action=view_example&embbeded&id=33&lang='+window.FacilinoLanguage);
	$('#exercise2i').attr('src','../facilino.php?action=view_example&embbeded&id=35&lang='+window.FacilinoLanguage);
	$('#exercise3i').attr('src','../facilino.php?action=view_example&embbeded&id=37&lang='+window.FacilinoLanguage);
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
<div id="ads"><?php include "ads.php" ?></div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>
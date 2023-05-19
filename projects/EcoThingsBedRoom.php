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
					<?php echo $projects["ECOTHINGS_BEDROOM"]; ?></h2>
				<h3 class="mbr-section-subtitle align-center mbr-light mbr-fonts-style display-5">
					<?php echo $projects["ECOTHINGS_BEDROOM_DESC"]; ?></h3>
			</div>
		</div>
	</div>
</section>

<section class="mbr-section article content1 cid-qYh0wSDsTN" id="content2-51">
    <div class="container">
        <div class="media-container-row">
            <div class="mbr-text col-12 col-md-8 mbr-fonts-style display-7">
                <blockquote><strong><?php echo $website["REQUIRED_MATERIAL"]; ?></strong><ul>
				<li><?php echo $website["BOARD_ESP32_ARDUINO_328"]; ?></li>
				<li><?php echo $website["MATERIAL_LDR_SENSOR"]; ?> 39 (A5)</li>
				<li><?php echo $website["MATERIAL_MIC_SENSOR"]; ?> 35 (A2)</li>
				<li><?php echo $website["MATERIAL_PIC_SENSOR"]; ?> 2 (A0)</li>
				<li><?php echo $website["MATERIAL_SERVO"]; ?> 4 (A1)</li>
				<li><?php echo $website["MATERIAL_LED_STRIP_7"]; ?> 12 (D8)</li>
				</ul></blockquote>
            </div>
        </div>
    </div>
</section>

<section class="cid-qYh0wSah5G" id="image3-50">
    <figure class="mbr-figure container">
            <div class="mbr-text align-center mbr-fonts-style display-5"><?php echo $website["CONNECTION_DIAGRAM"]; ?></div>
            <div class="image-block mbr-fonts-style display-7" style="width: 50%;">
                <img id="schematic_modules" src="../assets/images/EcoThings/ecothings_bedroom_bb.png" width="1400" alt="Modules" title=""></img>
            </div>
    </figure>
</section>


</div> <!-- main-->
<div class="mbr-section-btn text-center"><a onclick="onEcoThingsCoding();" class="btn btn-primary display-4">&#8592;&nbsp;<?php echo $website["BACK"]; ?></a></div>

</div>
<!-- <script>$(function(){var file='projects/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='projects/en-GB/home.html';},success: function(){}}); $('#main').load(file);});</script>-->
</div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>




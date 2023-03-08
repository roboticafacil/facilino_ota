<?php
require_once('db.php');
require_once('website_translation.php');
?>
<!DOCTYPE html>
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
<script src="facilino_espui.js"></script>
<html>
<?php include "head.php"; include "tutorial_head.php";
?>
<body>
<div id="header"><?php include "inc-header.php" ?></div>
<!-- <select id="processor" class="text-black dropdown-toggle display-6 icon-menu" onchange="processorChange(this.value)" style="display: initial">
<option value="ArduinoUno" class="text-black dropdown-item display-6">Arduino Uno</option>
<option value="WEMOS_D1R32_SHIELD" class="text-black dropdown-item display-6">WeMos D1R32 (Sensor Shield)</option>
</select>-->
		<div id="content" style="margin-top:0em; margin-left: 0em; margin-right: 0em">
<?php
echo '<script>window.FacilinoLanguage="'.$lang.'";</script>';
?>
<script>
	Blockly.onMouseUp_=function(e){};
	Blockly.onMouseDown_=function(e){};

	if (localStorage.getItem("processor")===undefined || localStorage.getItem("processor")===null)
			localStorage.setItem('processor', 'WEMOS_D1R32_SHIELD');
		window.FacilinoProcessor = localStorage.getItem("processor");
	$("#processor").val(window.FacilinoProcessor);
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
	
    window.title='home_'+window.FacilinoLanguage;

	function onHome()
	{
		//window.title='home_'+window.FacilinoLanguage;
		//$(function(){var file='tutorial/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='tutorial/en-GB/home.html';},success: function(){}}); $('#main').load(file); location.href = "#menu";});
		window.location='index.php';
	}
	
	function onTutorial()
	{
		window.location='FacilinoTutorial.php';
	}

	function onElectronics()
	{
		window.title='electronics_'+window.FacilinoLanguage;
		$(function(){var file='tutorial/'+ window.FacilinoLanguage+'/electronics.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='tutorial/en-GB/electronics.html';},success: function(){}}); $('#main').load(file); location.href = "#menu";});
	}
	
	function onFacilino()
	{
  window.title='facilino_programming_'+window.FacilinoLanguage;
		$(function(){var file='tutorial/'+ window.FacilinoLanguage+'/facilino_programming.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='tutorial/en-GB/facilino_programming.html';},success: function(){}}); $('#main').load(file); location.href = "#menu";});
	}

	function onExercises()
	{
		showHideProcessor(true);
  window.title='exercises_'+window.FacilinoLanguage;
		$(function(){var file='tutorial/'+ window.FacilinoLanguage+'/exercises.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='tutorial/en-GB/exercises.html';},success: function(){}}); $('#main').load(file); location.href = "#menu";} );
	}

	function langChange(lang)
	{
		localStorage.setItem('language',lang);
		window.location.reload();
	}

	function processorChange(processor)
	{
		console.log('processorChange');
		console.log(processor);
		localStorage.setItem('processor',processor);
		//window.location.reload();
	}
	function showHideLanguage(show)
	{
		var lang=document.getElementById('language');
		//console.log(lang.style.display);
		if (show===true)
			lang.style.display='initial';
		else
			lang.style.display='none';
	}

	function showHideProcessor(show)
	{
		var proc=document.getElementById('processor');
		if (proc==null)
			proc.style.display='initial';
		else
		{
			if (show==true)
				proc.style.display='initial';
			else
				proc.style.display='none';
		}
	}

    function printAll()
    {
      showAllCode('solutions_basic','exercises_basic','showHideBasic');
      showAllCode('solutions_intermediate','exercises_intermediate','showHideIntermediate');
      window.orig_title=document.title;
      document.title=window.title;
      print();
      document.title=window.orig_title;
    }
	
	function resizeIFrameToFitContent( iFrame ) {
		iFrame.width  = iFrame.contentWindow.document.body.scrollWidth+30;
		iFrame.height = iFrame.contentWindow.document.body.scrollHeight+30;
	}

		function openFunction(bly) {
			$.ajax({
				type: "GET" ,
				url: bly ,
				dataType: "xml" , async: false,
				success: function(xml) {
					var txt = new XMLSerializer().serializeToString(xml);
					Blockly.mainWorkspace.clear();
					var xmlDOM = Blockly.Xml.textToDom(txt);
					Blockly.Xml.domToWorkspace(xmlDOM,Blockly.getMainWorkspace());
				}
			});
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

		function injectExample(exercise,exampleDiv) {
      var instructionPreview = document.getElementById(exampleDiv);
      var mainWorkspace = Blockly.inject(exampleDiv, {readOnly:true, collapse: false});
			openFunction('tutorial/exercises/'+exercise);
      var bbox = mainWorkspace.svgBlockCanvas_.getBBox();
			instructionPreview.style.height = (bbox.height+25)+ 'px';
      instructionPreview.style.width = (bbox.width+25) + 'px';
      window.dispatchEvent(new Event('resize'));
		}

    function injectExampleCode(exercise,exampleDiv,exampleDivCode) {
      var instructionPreview = document.getElementById(exampleDiv);
      var instructionPreviewCode = document.getElementById(exampleDivCode);
      instructionPreview.style="width: 0%;";
      instructionPreviewCode.style="width: 100%; margin-left: 3em; margin-right: 3em; line-height: 1.1em;";
      var mainWorkspace = Blockly.inject(exampleDiv, {readOnly:true, collapse: false});
			openFunction('tutorial/exercises/'+exercise);
	  if (mainWorkspace!==null)
		instructionPreviewCode.innerHTML="<br/>&nbsp;&nbsp;&nbsp;&nbsp;"+escapeCode(Blockly.Arduino.workspaceToCode(mainWorkspace))+"<br/>";
		}

    function escapeCode(code) {
        var str = code;
        str = str.replace(/</g, "&lt;");
        str = str.replace(/>/g, "&gt;");
        str = str.replace(/\/\*.*\*?\n/g,"");
        str = str.replace(/\n/g, "<br/>&nbsp;&nbsp;&nbsp;&nbsp;");
        var len = str.length;
        while(true)
        {
          str = str.replace("<br/>&nbsp;&nbsp;&nbsp;&nbsp;<br/>", "<br/>");
          if (str.length==len)
            break;
          len=str.length;
        }
        return str;
    }

		function showHide(el1,ex,el) {
			var y = document.getElementById(el1);
			if (y.style.display === "none") {
				y.style.display = "block";
				currentSolutions=currentSolutions+1;
			} else {
				y.style.display = "none";
				currentSolutions=currentSolutions-1;
			}
			var solutions = document.getElementById('solutions');
			if (currentSolutions>0)
				solutions.style.display="block";
			else
				solutions.style.display="none";
			var x = document.getElementById(el);
			if (y.style.display === "block"){
				var parent = x.parentNode;
				parent.removeChild(x);
				var div = document.createElement("div");
				div.setAttribute("id",el);
				parent.appendChild(div);
				injectExample(ex,el);
			}
		}

    /*function showHideBasic(el1,ex,el) {
	  var solutions_basic = document.getElementById('solutions_basic');
      solutions_basic.style.display="block";
      if (currentBasicSolutions>0)
      {
        var x = document.getElementById('solutions'+currentBasicSolutions+'b');
        x.style.display = "none";
      }
      currentBasicSolutions=el1.substring(el1.length-2,el1.length-1);
      var y = document.getElementById(el1);
			y.style.display = "block";
      var yc = document.getElementById(el+'c');
			yc.style.display = "none";
			var x = document.getElementById(el);
			if (y.style.display === "block"){
				var parent = x.parentNode;
				parent.removeChild(x);
				var div = document.createElement("div");
				div.setAttribute("id",el);
				parent.appendChild(div);
				//injectExample(ex,el);
        location.hash = "#solutions_basic";
			}
		}*/
		
	function showHideBasic(el) {
	  /*var el = document.getElementById(el);
	  if (el.style.display==='none')
		el.style.display="auto";
	  else
	    el.style.display="none";*/
	}
	
	function showHideElement(el){
		var el = document.getElementById(el);
		  if (el.style.display==='none')
			el.style.display="block";
		  else
			el.style.display="none";
	}

    function showHideBasicCode(el1,ex,el,elc) {
      var solutions_basic = document.getElementById('solutions_basic');
      solutions_basic.style.display="block";
      if (currentBasicSolutions>0)
      {
        var x = document.getElementById('solutions'+currentBasicSolutions+'b');
        x.style.display = "none";
      }
      currentBasicSolutions=el1.substring(el1.length-2,el1.length-1);
      var y = document.getElementById(el1);
			y.style.display = "block";
			var x = document.getElementById(el);
      var xCode = document.getElementById(elc);
			if (y.style.display === "block"){
				var parent = x.parentNode;
				parent.removeChild(x);
        var parentCode = xCode.parentNode;
        parentCode.removeChild(xCode);
        var div = document.createElement("div");
        var divCode = document.createElement("div");
        div.setAttribute("id",el);
        divCode.setAttribute("id",elc);
				parent.appendChild(div);
        parentCode.appendChild(divCode);
        injectExampleCode(ex,el,elc);
        location.hash = "#solutions_basic";
			}
		}

    function showHideIntermediate(el1,ex,el) {
      var solutions_intermediate = document.getElementById('solutions_intermediate');
      solutions_intermediate.style.display="block";
      if (currentIntermediateSolutions>0)
      {
        var x = document.getElementById('solutions'+currentIntermediateSolutions+'i');
        x.style.display = "none";
      }
      currentIntermediateSolutions=el1.substring(el1.length-2,el1.length-1);
      var y = document.getElementById(el1);
			y.style.display = "block";
      var yc = document.getElementById(el+'c');
			yc.style.display = "none";
			var x = document.getElementById(el);
			if (y.style.display === "block"){
				var parent = x.parentNode;
				parent.removeChild(x);
				var div = document.createElement("div");
				div.setAttribute("id",el);
				parent.appendChild(div);
				injectExample(ex,el);
        location.hash = "#solutions_intermediate";
			}
		}

    function showHideIntermediateCode(el1,ex,el,elc) {
      var solutions_intermediate = document.getElementById('solutions_intermediate');
      solutions_intermediate.style.display="block";
      if (currentIntermediateSolutions>0)
      {
        var x = document.getElementById('solutions'+currentIntermediateSolutions+'i');
        x.style.display = "none";
      }
      currentIntermediateSolutions=el1.substring(el1.length-2,el1.length-1);
      var y = document.getElementById(el1);
			y.style.display = "block";
			var x = document.getElementById(el);
      var xCode = document.getElementById(elc);
			if (y.style.display === "block"){
				var parent = x.parentNode;
				parent.removeChild(x);
        var parentCode = xCode.parentNode;
        parentCode.removeChild(xCode);
        var div = document.createElement("div");
        var divCode = document.createElement("div");
        div.setAttribute("id",el);
        divCode.setAttribute("id",elc);
				parent.appendChild(div);
        parentCode.appendChild(divCode);
        injectExampleCode(ex,el,elc);
        location.hash = "#solutions_intermediate";
			}
		}

    function showAllCode(sol_div,ex_div,showHideFnc) {
      var solutions_basic = document.getElementById(sol_div);
      var exercises_basic = document.getElementById(ex_div);
      if (solutions_basic && exercises_basic)
      {
        solutions_basic.style.display="block";
        var exercises_list = exercises_basic.getElementsByTagName('li');
        for (var i=0;i<exercises_list.length;i++){
          var button_list = exercises_list[i].getElementsByTagName('button');
          var str = button_list[0].getAttribute('onclick');
          str=str.replace(showHideFnc+'(','');
          str=str.replace(');','');
          var str_list = str.split(',');
          for (var j=0;j<str_list.length;j++)
            str_list[j]=eval(str_list[j]);
          var sol = document.getElementById(str_list[0]);
          var example_div = document.getElementById(str_list[2]);
          sol.style.display = "block";
          example_div.style.display = "block";
          var parent = example_div.parentNode;
          parent.removeChild(example_div);
          var div = document.createElement("div");
          div.setAttribute("id",str_list[2]);
          parent.appendChild(div);
          injectExample(str_list[1],str_list[2]);
        }
      }
		}

		function HideButton(el)
		{
			if (localStorage.getItem("solutions")===undefined || localStorage.getItem("solutions")===null)
			{
				var y = document.getElementById(el);
				y.style.display = "none";
			}
		}

		function onPageClicked(page)
		{
			window.open(page, '_blank');
			if (window.webHelper.pageClicked !== undefined)
				window.webHelper.pageClicked(page);
		}

		function onFileDownloaded(file)
		{
      console.log(file);
			//window.open('tutorial/'+file, '_blank');
			var anchor=document.createElement('a');
			anchor.setAttribute('href','tutorial/exercises/'+file);
			anchor.setAttribute('download',file);
			document.body.appendChild(anchor);
			anchor.click();
			anchor.parentNode.removeChild(anchor);
			if (window.webHelper.fileDownloaded !== undefined)
				window.webHelper.fileDownloaded(file);
		}
		
		$.ajax({url: 'lang/facilino_'+window.FacilinoLanguage+'.json',dataType: "text",async: false,}).done(function(text) {window.langKeys = $.parseJSON(text).langs[window.FacilinoLanguage].keys;});
		$.ajax({url: 'lang/facilino_en-GB.json',dataType: "text",async: false,}).done(function(text) {window.langKeysEng = $.parseJSON(text).langs['en-GB'].keys;});
		//RoboBlocks.load({ zoom: 1 });
		//Facilino.load({ zoom: 1});

</script>
<script src="tutorial/assets/web/assets/jquery/jquery.min.js"></script>

<div id="main"></div>
<script>$(function(){var file='tutorial/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='tutorial/en-GB/home.html';},success: function(){}}); $('#main').load(file);});</script>
	<!-- <div id="menu"></div>
<script>$(function(){var file='tutorial/'+ window.FacilinoLanguage+'/menu.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='tutorial/en-GB/menu.html';},success: function(){}}); $('#menu').load(file);});</script>

<div id="main"></div>
<script>$(function(){var file='tutorial/'+ window.FacilinoLanguage+'/home.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='tutorial/en-GB/home.html';},success: function(){}}); $('#main').load(file);});</script>



<div id="footer"></div>
<script>$(function(){var file='tutorial/'+ window.FacilinoLanguage+'/footer.html'; $.ajax({url:file,async:false,type:"HEAD",error: function(){file='tutorial/en-GB/footer.html';},success: function(){}}); $('#footer').load(file);});</script>

<div id="modal" class="modal">
  <div class="modal-content">
	<span class="close" id="close">&times;</span>
	<p id="doc">Please, wait until data is loaded...</p>
  </div>
</div>

  <script src="tutorial/assets/web/assets/jquery/jquery.min.js"></script>
  <script src="tutorial/assets/popper/popper.min.js"></script>
  <script src="tutorial/assets/tether/tether.min.js"></script>
  <script src="tutorial/assets/bootstrap/js/bootstrap.min.js"></script>
  <script src="tutorial/assets/mbr-popup-btns/mbr-popup-btns.js"></script>
  <script src="tutorial/assets/dropdown/js/script.min.js"></script>
  <script src="tutorial/assets/touchswipe/jquery.touch-swipe.min.js"></script>
  <script src="tutorial/assets/smoothscroll/smooth-scroll.js"></script>
  <script src="tutorial/assets/theme/js/script.js"></script>
-->
</div>
<div id="ads"><?php include "ads.php" ?></div>
<div id="footer"><?php include "inc-footer.php" ?></div>
</body>
</html>

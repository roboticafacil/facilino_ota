<?php
require_once('db.php');
?>
<!DOCTYPE html>
<html><?php include "head.php"; ?>
	<body>
		<div id="header"><?php include "inc-header.php" ?></div>
		<!-- <div id="content">-->
		<?php
		require('facilino_scripts.php');
		$query = "SELECT * from `categories` where 1";
			$result = mysqli_query($con,$query);
			$rows = mysqli_num_rows($result);
			$categories = array();
			echo '<script language="JavaScript">';
			echo 'window.toolbox=[';
			for ($j = 0; $j < ($rows-1); $j++)
			{
				$row=mysqli_fetch_row($result);
				array_push($categories,$row[1]);
				echo '\''.$row[1].'\',';
			}
			$row=mysqli_fetch_row($result);
			array_push($categories,$row[1]);
			echo '\''.$row[1].'\']</script>';
		?>
		<xml id='startBlocks' style='display:none'><block></block></xml>
		<div id="wrap" style="height: 69%;">
					<div id="blockly" style="float: left; width: 35%;">
					<div id="dragbar"></div>
					</div>
					<div id="doc" style="float: left; width: 65%;  padding: 0.5em">
					<div id="blockly2">
					</div>
					</div>
		</div>
		<script language="JavaScript">
		if (localStorage.getItem("language")===undefined || localStorage.getItem("language")===null)
			localStorage.setItem('language', 'en-GB');
		window.FacilinoLanguage = localStorage.getItem("language");
		window.FacilinoBlockFilter = 'Generic';
		window.FacilinoVersion = 'Facilino';
		if (localStorage.getItem("processor")===undefined || localStorage.getItem("processor")===null)
			localStorage.setItem('processor', 'ArduinoNano');
		window.FacilinoProcessor = localStorage.getItem("processor");
		$.ajax({url: 'lang/facilino_'+window.window.FacilinoLanguage+'.json',dataType: "text",async: false,}).done(function(text) {window.langKeys = $.parseJSON(text).langs[window.window.FacilinoLanguage].keys;});
		$.ajax({url: 'lang/facilino_en-GB.json',dataType: "text",async: false,}).done(function(text) {window.langKeysEng = $.parseJSON(text).langs['en-GB'].keys;});
		if (window.FacilinoVersion==='FacilinoJunior')
		{
			window.FacilinoAdvanced=false;
			window.FacilinoOTA=false;
		}
		else
		{
			window.FacilinoAdvanced=true;
			if (window.FacilinoVersion==='FacilinoOTA')
				window.FacilinoOTA=true;
			else
				window.FacilinoOTA=false;
		}
					
					
		var updateCode=true;
		var justOnce=true;
		var ev = document.createEvent('Event');
		ev.initEvent('resize', true, true);
		
		Blockly.Doc = [];
					
		window.toolboxNames = getToolboxNames(window.toolbox);
		var options = {zoom: 1};
		Facilino.load(options);
		FacilinoFunctions.load(options);
		FacilinoControls.load(options);
		FacilinoProgramming.load(options);
		FacilinoInterrupts.load(options);
		FacilinoStateMachine.load(options);
		FacilinoLogic.load(options);
		FacilinoBitwise.load(options);
		FacilinoMaths.load(options);
		FacilinoArrays.load(options);
		FacilinoCurves.load(options);
		FacilinoVariables.load(options);
		FacilinoVariablesArray.load(options);
		//FacilinoVariablesObject.load(options);
		FacilinoEEPROM.load(options);
		FacilinoText.load(options);
		FacilinoInOut.load(options);
		FacilinoButtons.load(options);
		FacilinoBus.load(options);
		FacilinoInOutOthers.load(options);
		FacilinoLCD.load(options);
		FacilinoLEDMatrix.load(options);
		FacilinoLEDStrip.load(options);
		FacilinoOLED.load(options);
		FacilinoSerial.load(options);
		FacilinoBluetooth.load(options);
		FacilinoBLE.load(options);
		FacilinoWiFi.load(options);
		FacilinoHTTP.load(options);
		FacilinoIoT.load(options);
		FacilinoIR.load(options);
		FacilinoSonar.load(options);
		FacilinoInfraRed.load(options);
		FacilinoColor.load(options);
		FacilinoLDR.load(options);
		FacilinoLightDimmer.load(options);
		FacilinoBuzzer.load(options);
		FacilinoVoice.load(options);
		FacilinoMic.load(options);
		FacilinoMelody.load(options);
		FacilinoMP3.load(options);
		FacilinoMotor.load(options);
		FacilinoRobotBase.load(options);
		FacilinoRobotAcc.load(options);
		FacilinoRobotWalk.load(options);
		FacilinoController.load(options);
		FacilinoFilter.load(options);
		FacilinoTemperature.load(options);
		FacilinoHumidity.load(options);
		FacilinoRain.load(options);
		FacilinoGas.load(options);
		FacilinoAmbientMiscellaneous.load(options);
		FacilinoHTML.load(options);
		FacilinoESPUI.load(options);


		window.dispatchEvent(new Event('resize'));
				
		var el = document.getElementById('blockly');
		var docEl=document.getElementById('doc');
		
		/*toolbox = Blockly.createToolbox(window.toolboxNames);
		toolboxDiv = goog.dom.createDom('div','blocklyToolboxDiv');
		toolboxDiv.setAttribute("dir","RTL");
		toolboxDiv.setAttribute("style","left: 0px; height:100%");
		el.appendChild(toolboxDiv);*/
		
		//Blockly.inject(el, {toolbox: Blockly.createToolbox(window.toolboxNames), zoom: {controls: false, wheel: false, readOnly:true, collapse: false}});
		if (window.innerWidth>1000)
		{
			Blockly.inject(el,{toolbox: Blockly.createToolbox(window.toolboxNames), collapse: false, zoom: {controls: false, wheel: false, startScale: 0.7}});
		}
		else
		{
			Blockly.inject(el,{toolbox: Blockly.createToolbox(window.toolboxNames), collapse: false, zoom: {controls: false, wheel: false, startScale: 0.5}});
		}
		
		
		$('.blocklySvg, #blockly').height('100%');
		$('.blocklySvg').width('35%');
		//$('#doc').css("width","65%");
		el.style.width='35%';
		docEl.style.width='65%';
		ws=Blockly.getMainWorkspace();
		
		ws.clear();
		Blockly.Xml.domToWorkspace(document.getElementById('startBlocks'),ws);

		$('.blocklySvg, #blockly').height('100%');
		//$('.blocklySvg').width('100%');
		el.style.width=ws.toolbox_.width;
		$('.blocklySvg').width(ws.toolbox_.width);
		//$('#doc').css("width",window.innerWidth-ws.toolbox_.width);
		docEl.style.width=window.innerWidth-ws.toolbox_.width;
		ws.scrollbar.setContainerVisible(false);
		
		var file = "doc/"+window.FacilinoLanguage+"/index.html";
		$.ajax({url:file,type:'HEAD',error: function(){file="doc/en-GB/index.html";},success: function(){}});
		$(function(){$("#doc").load(file);});
		
		var dragging = false;
			
		$('#dragbar').mousedown(function(e){
			e.preventDefault();
			dragging = true;
			//var doc = $('#doc');
			var ghostbar = $('<div>',
                        {id:'ghostbar',
                         css: {
                                height: docEl.outerHeight(),
                                top: docEl.offset().top,
                                left: docEl.offset().left
                               }
                        }).appendTo('body');
       
				$(document).mousemove(function(e){
					ghostbar.css("left",e.pageX+2);
				});
       
		});

		$(document).mouseup(function(e){
			if (dragging) 
			{
				var percentage = (e.pageX / window.innerWidth) * 100;
				var mainPercentage = 100-percentage;
           
				//$('#console').text("side:" + percentage + " main:" + mainPercentage);
				
				//$('#blockly').css("width",percentage + "%");
				//$('#doc').css("width",mainPercentage + "%");
				el.style.width=percentage + "%";
				docEl.style.width=mainPercentage + "%";
				$('#ghostbar').remove();
				$(document).unbind('mousemove');
				Blockly.svgResize(Blockly.getMainWorkspace());
				dragging = false;
			}
		});
		
		Blockly.getMainWorkspace().addChangeListener(function (event) {
			if (event.type===Blockly.Events.DELETE)
			{
				Facilino.removedBlocks(event.ids);
			}
			ws=Blockly.getMainWorkspace();
			blocs = ws.getAllBlocks();
			if (blocs.length>0)
			{
				//last_selected_block=blocs[0].type;
				if (blocs[0].type!==undefined)
				{
					window.currentInstruction=blocs[0].type;
					//$(function(){$("#doc").load("doc/en-GB/"+blocs[0].type+".html#up")});
					$(function(){$("#doc").load("doc/en-GB/generic_instruction.html#up")});
					//console.log(blocs[0].type);
				}
			}
			ws.clear();
			if (justOnce)
			{
				justOnce=false;
				window.dispatchEvent(new Event('resize'));
			}
		});
	
		function getToolboxNames(keys)
		{
			var toolboxNames = [];
			keys.forEach(function (key){toolboxNames.push(window.langKeys[key]);});
			return toolboxNames;
		}
		
		</script>
	<div id="ads"><?php include "ads.php" ?></div>
	</body>
</html>
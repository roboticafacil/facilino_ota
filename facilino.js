/*All rights reserved Rob?tica F?cil*/

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		//Facilino={};
		Facilino.Arduino={};
		Facilino.Blocks={};
		Facilino.NumStates=0;
		Facilino.NumLEDMatrixStreams=0;
		Facilino.NumMelodies=0;
		Facilino.NumAlternateCases=0;
		Facilino.NumRGBLEDStripStreams=0;
		Facilino.NumImages=0;
		Blockly.Arduino.play_melody='';
		Blockly.Arduino.play_led_matrix_stream='';
		Blockly.Arduino.play_RGBstream='';
		Facilino.NumBLEServices=0;
		Facilino.NumBLECharacteristics=0;
		Facilino.BLE_services=[];
		Facilino.BLE_characteristics={};
		Facilino.BLE_notify_characteristics={};
		Facilino.PWMChannelsIDs={};
		Facilino.ServosIDs={};
		Facilino.RGBLEDStripIDs={};
		Facilino.DHTTemperatureIDs={};
		Facilino.DHTHumidityIDs={};
		
		var loc = window.location.pathname;
		loc = loc.substring(0, loc.lastIndexOf('/'));
		var dir = loc.substring(loc.lastIndexOf('/')+1);
		if (dir==='projects')
			Facilino.path = '../';
		else if (dir==='tutorial')
			Facilino.path = '../';
		else
			Facilino.path = '';

		Facilino.removedBlocks = function(ids) {
			ids.forEach(function(blockId){
				if (Facilino.BLE_characteristics[blockId]!==undefined)
					delete Facilino.BLE_characteristics[blockId];
				if (Facilino.BLE_notify_characteristics[blockId]!==undefined)
					delete Facilino.BLE_notify_characteristics[blockId];
				if (Facilino.PWMChannelsIDs[blockId]!==undefined)
					delete Facilino.PWMChannelsIDs[blockId];
				if (Facilino.ServosIDs[blockId]!==undefined)
					delete Facilino.ServosIDs[blockId];
				if (Facilino.RGBLEDStripIDs[blockId]!==undefined)
					delete Facilino.RGBLEDStripIDs[blockId];
			});
		}

		Facilino.getStates = function() {
			states = [];
			for (var x=0;x<Facilino.NumStates;x++)
				states.push(x);
			return states;
		}

		Facilino.getBLEServices = function() {
			services = [];
			for (var x=0;x<Facilino.NumBLEServices;x++)
				services.push(x);
			return services;
		}

		Facilino.getBLECharacteristics = function() {
			characteristics = [];
			for (var x=0;x<Facilino.NumBLECharacteristics;x++)
				characteristics.push(x);
			return characteristics;
		}

		Facilino.getHelpUrl = function (block) {
			return '<script>changeTab(tabs,"tabdoc"); $(function(){var file = "doc/"+window.FacilinoLanguage+"/'+block+'.html"; $.ajax({url:file,type:"HEAD",error: function(){file="doc/en-GB/'+block+'.html"; $.ajax({url:file,type:"HEAD",error: function(){ if(Blockly.Doc[\''+block+'\']!==undefined) $("#doc").html(Blockly.Doc[\''+block+'\']); else $("#doc").load("doc/"+window.FacilinoLanguage+"/not_found.html") },success: function(){$("#doc").load(file);}});},success: function(){$("#doc").load(file);}}); });</script>';
		}

		Facilino.locales = {
			defaultLanguage: {},
			processor: ''
		};

		Facilino.locales.setLang = function(lang) {
			this.defaultLanguage = lang;
		}
		Facilino.locales.getKey = function(key) {
			if (this.defaultLanguage[key]===undefined)
				console.log(key);
			return this.defaultLanguage[key] || this.EngLanguage[key];
		};

		Facilino.locales.setKey = function(key,value) {
			this.defaultLanguage[key]=value;
		};

		Facilino.locales.initialize = function() {
			this.defaultLanguage = options.langKeys ||window.langKeys || {};
			this.EngLanguage = window.langKeysEng;
			//console.log(this.defaultLanguage);
			//console.log(window.langKeysEng);
			this.processor = options.proc || window.FacilinoProcessor;
			return this;
		};

		Facilino.locales.initialize();
		Facilino.variables = {};
		Facilino.isVariable = function(varValue) {
			for (var i in Blockly.Variables.allUsedVariables) {
				if (Blockly.Variables.allUsedVariables[i] === varValue) {
					return true;
				}
			}
			if (Facilino.variables[varValue] !== undefined) {
				return true;
			}
			if (varValue.search('digitalRead\\(') >= 0 || varValue.search('analogRead\\(') >= 0) {
				return true;
			}
			return false;
		};

		Facilino.findKey = function(obj, value)
	  	{
	  		var key = null;
	  		for (var prop in obj)
	  		{
	  			if (obj.hasOwnProperty(prop))
	  			{
	  				if (obj[prop] === value)
	  				{
	  					key = prop;
	  				}
	  			}
	  		}
	  		return key;
	  	};

		Facilino.hexToRgb = function(hex) {
			// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
			var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			hex = hex.replace(shorthandRegex, function(m, r, g, b) {
				return r + r + g + g + b + b;
			});

			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;
		};

		Facilino.pad = function(str,padString,length) {
			while (str.length < length)
				str = padString + str;
			return str;
		}
		
		Facilino.indentSentences = function(sentences) {
			var splitted_sentences = sentences.split('\n');
			var final_sentences = '';
			for (var i in splitted_sentences) {
				final_sentences += '  ' + splitted_sentences[i] + '\n';
			}
			return final_sentences;
		};
		
		if (options.profiles===undefined)
		{
			var profiles;
			var loc = window.location.pathname;
			loc = loc.substring(0, loc.lastIndexOf('/'));
			var dir = loc.substring(loc.lastIndexOf('/')+1);
			var url = 'https://facilino.webs.upv.es/profiles.php';
			$.ajax({
				url: url,
				dataType: "text",
				async: false,
				}).done(function(text) {
					options.profiles=$.parseJSON(text);
				});
		}
		
		if (Facilino.locales.processor==='ArduinoNano')
		{
			options.profiles['default'] = options.profiles.arduinoNano;
			options.profiles['processor'] = 'ATmega328';
		}
		else if (Facilino.locales.processor==='ArduinoUno')
		{
			options.profiles['default'] = options.profiles.arduinoUno;
			options.profiles['processor'] = 'ATmega328';
		}
		else if (Facilino.locales.processor==='ArduinoMega2560')
		{
			options.profiles['default'] = options.profiles.arduinoMega2560;
			options.profiles['processor'] = 'ATmega2560';
		}
		else if (Facilino.locales.processor==='ArduinoMicro')
		{
			options.profiles['default'] = options.profiles.arduinoMicro;
			options.profiles['processor'] = 'ATmega32U4';
		}
		else if (Facilino.locales.processor==='ArduinoLilyPad')
		{
			Facilino.profiles['default'] = options.profiles.arduinoLilyPad;
			Facilino.profiles['processor'] = 'ATmega328';
		}
		else if (Facilino.locales.processor==='ArduinoMini')
		{
			options.profiles['default'] = options.profiles.arduinoMini;
			options.profiles['processor'] = 'ATmega328';
		}
		else if (Facilino.locales.processor==='ArduinoPro')
		{
			options.profiles['default'] = options.profiles.arduinoPro;
			options.profiles['processor'] = 'ATmega328';
		}
		else if (Facilino.locales.processor==='ArduinoLeonardo')
		{
			options.profiles['default'] = options.profiles.arduinoLeonardo;
			options.profiles['processor'] = 'ATmega32U4';
		}
		else if (Facilino.locales.processor==='ESP8266')
		{
			options.profiles['default'] = options.profiles.nodeMCU;
			options.profiles['processor'] = 'ESP8266';
		}
		else if (Facilino.locales.processor==='NodeMCU')
		{
			options.profiles['default'] = options.profiles.nodeMCU;
			options.profiles['processor'] = 'ESP8266';
		}
		else if (Facilino.locales.processor==='WEMOS_D1R2')
		{
			options.profiles['default'] = options.profiles.wemosD1R2;
			options.profiles['processor'] = 'ESP8266';
		}
		else if (Facilino.locales.processor==='ESP32')
		{
			options.profiles['default'] = options.profiles.esp32;
			options.profiles['processor'] = 'ESP32';
		}
		else if (Facilino.locales.processor==='WEMOS_D1R32')
		{
			options.profiles['default'] = options.profiles.wemosD1R32;
			options.profiles['processor'] = 'ESP32';
		}
		else if (Facilino.locales.processor==='WEMOS_D1R32_SHIELD')
		{
			options.profiles['default'] = options.profiles.wemosD1R32_shield;
			options.profiles['processor'] = 'ESP32';
		}
		else if (Facilino.locales.processor==='RP2040')
		{
			options.profiles['default'] = options.profiles.RP2040;
			options.profiles['processor'] = 'RP2040';
		}
		else
		{
			options.profiles['default'] = options.profiles.arduinoNano;
			options.profiles['processor'] = 'ATmega328';
		}
		
		Facilino.profiles=options.profiles;
		
		// RGB block colors
		Facilino.LANG_COLOUR_DISTANCE = '#D04141';
		Facilino.LANG_COLOUR_DISTANCE_ULTRASOUND = '#D04141'; //BD3939, AB3131, 992929, 872121
		Facilino.LANG_COLOUR_SOUND = '#CC7B44';
		Facilino.LANG_COLOUR_SOUND_BUZZER = '#CC7B44';
		Facilino.LANG_COLOUR_SOUND_VOICE = '#B46B3A';
		Facilino.LANG_COLOUR_SOUND_MIC = '#9D5C30';
		Facilino.LANG_COLOUR_SOUND_MUSIC = '#854C26';
		Facilino.LANG_COLOUR_SOUND_MP3 = '#6E3D1C';
		Facilino.LANG_COLOUR_MOVEMENT = '#CECE42';
		Facilino.LANG_COLOUR_MOVEMENT_MOTORS = '#CECE42';
		Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE = '#B8B838';
		Facilino.LANG_COLOUR_MOVEMENT_ROBOTACC = '#A3A32F';
		Facilino.LANG_COLOUR_MOVEMENT_WALK = '#8D8D25'; // 78781C
		Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM = '#78781C'; 
		Facilino.LANG_COLOUR_SCREEN = '#ACCE42';
		Facilino.LANG_COLOUR_SCREEN_LCD = '#ACCE42'; //7F9B2A, 718B23
		Facilino.LANG_COLOUR_SCREEN_LEDMATRIX = '#9DBD3A';
		Facilino.LANG_COLOUR_SCREEN_LEDSTRIP = '#8EAC32';
		Facilino.LANG_COLOUR_SCREEN_OLED = '#7F9B2A';
		Facilino.LANG_COLOUR_CONTROL = '#44CC44';
		Facilino.LANG_COLOUR_PROGRAMMING = '#3EB83E';
		Facilino.LANG_COLOUR_CONTROL_INTERRUPTS = '#39A539';
		Facilino.LANG_COLOUR_CONTROL_STATEMACHINE = '#339233';
		Facilino.LANG_COLOUR_LOGIC = '#42CE91';  //#39c576, #39c06a, #39bb60, #39b157
		Facilino.LANG_COLOUR_LOGIC_BITWISE = '#39C576';
		Facilino.LANG_COLOUR_MATH = '#42CBCE';
		Facilino.LANG_COLOUR_TEXT = '#42A3CE';
		Facilino.LANG_COLOUR_COMMUNICATION = '#4263CE';
		Facilino.LANG_COLOUR_COMMUNICATION_USB = '#4263CE'; // #2E489B, #283F8A
		Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH = '#3B5ABD';
		Facilino.LANG_COLOUR_COMMUNICATION_WIFI = '#3551AC';
		Facilino.LANG_COLOUR_HTML = '#3551AC';
		Facilino.LANG_COLOUR_ESPUI = '#283F8A'; //A6A6A6, 9A9A9A, 8F8F8F
		Facilino.LANG_COLOUR_COMMUNICATION_IOT = '#2E489B';
		Facilino.LANG_COLOUR_ADVANCED = '#9142CE'; //853BBE, 7A34AF, 6E2DA0, 632791
		Facilino.LANG_COLOUR_IR = '#9142CE';
		Facilino.LANG_COLOUR_ADVANCED_ANALOG = '#9142CE';
		Facilino.LANG_COLOUR_ADVANCED_DIGITAL = '#853BBE';
		Facilino.LANG_COLOUR_ADVANCED_PWM = '#7A34AF';
		Facilino.LANG_COLOUR_ADVANCED_BUTTON = '#6E2DA0';
		Facilino.LANG_COLOUR_ADVANCED_BUS = '#632791';
		Facilino.LANG_COLOUR_VARIABLES = '#B244CC';
		Facilino.LANG_COLOUR_PROCEDURES = '#CE42B3';
		//Facilino.LANG_COLOUR_COLOUR ='#9FD388';
		Facilino.LANG_COLOUR_LIGHT= '#FF8A00';
		Facilino.LANG_COLOUR_LIGHT_INFRARED= '#FF8A00'; //D27201, BB6602, A55B03
		Facilino.LANG_COLOUR_LIGHT_COLOR= '#E87E00'; //D27201 , BB6602, A55B03
		Facilino.LANG_COLOUR_LIGHT_LDR = '#D27201';
		Facilino.LANG_COLOUR_LIGHT_DIMMER = '#BB6602';
		Facilino.LANG_COLOUR_AMBIENT = '#99CCFF';  //78BBFE, 58ABFD, 389AFC, 188AFB
		Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE = '#99CCFF';
		Facilino.LANG_COLOUR_AMBIENT_HUMIDITY = '#78BBFE';
		Facilino.LANG_COLOUR_AMBIENT_RAIN = '#58ABFD';
		Facilino.LANG_COLOUR_AMBIENT_GAS = '#389AFC';
		Facilino.LANG_COLOUR_AMBIENT_MISC = '#188AFB';
		Facilino.LANG_COLOUR_BLOCKS = '#FF00FF';
		Facilino.LANG_COLOUR_SYSTEM = '#ADAD85';  //#adad85, #a3a375, #999966, #8a8a5c,#7a7a52, #6b6b47, #5c5c3d, #4d4d33
		Facilino.LANG_COLOUR_SYSTEM_CONTROL = '#ADAD85';
		Facilino.LANG_COLOUR_SYSTEM_FILTER = '#A3A375';
		Facilino.LANG_COLOUR_DEPRECATED = '#000000';
		
		

		Facilino.checkHelpUrl = function (block) {
			var file = 'doc/'+window.FacilinoLanguage+'/'+block+'.html';
			var found=false;

			$.ajax({
				url:file,
				async:false,
				type:"HEAD",
				error: function(){
					$found=false;
					console.log('Checking '+block+' block in '+file);
					console.log(block+' not found');
				},
				success: function(){
					$found=true;
					//console.log(block+' found');
				}
			});
		}

		Blockly.findMissingDoc = function() {

			var blocks = {};
			//var ignore = ['dyor_piezo_music_silencio_redonda','dyor_piezo_music_do_redonda','dyor_piezo_music_re_redonda','dyor_piezo_music_mi_redonda','dyor_piezo_music_fa_redonda','dyor_piezo_music_sol_redonda','dyor_piezo_music_la_redonda','dyor_piezo_music_si_redonda','dyor_piezo_music_silencio_blanca','dyor_piezo_music_do_blanca','dyor_piezo_music_re_blanca','dyor_piezo_music_mi_blanca','dyor_piezo_music_fa_blanca','dyor_piezo_music_sol_blanca','dyor_piezo_music_la_blanca','dyor_piezo_music_si_blanca','dyor_piezo_music_silencio_negra','dyor_piezo_music_do_negra','dyor_piezo_music_re_negra','dyor_piezo_music_mi_negra','dyor_piezo_music_fa_negra','dyor_piezo_music_sol_negra','dyor_piezo_music_la_negra','dyor_piezo_music_si_negra','dyor_piezo_music_silencio_corchea','dyor_piezo_music_do_corchea','dyor_piezo_music_re_corchea','dyor_piezo_music_mi_corchea','dyor_piezo_music_fa_corchea','dyor_piezo_music_sol_corchea','dyor_piezo_music_la_corchea','dyor_piezo_music_si_corchea','dyor_piezo_music_silencio_semicorchea','dyor_piezo_music_do_semicorchea','dyor_piezo_music_re_semicorchea','dyor_piezo_music_mi_semicorchea','dyor_piezo_music_fa_semicorchea','dyor_piezo_music_sol_semicorchea','dyor_piezo_music_la_semicorchea','dyor_piezo_music_si_semicorchea','dyor_piezo_music_end','HIPPIE_adv_movement2','dyor_piezo_music_silencio_redondap','dyor_piezo_music_silencio_blancap','dyor_piezo_music_silencio_negrap','dyor_piezo_music_silencio_corcheap','dyor_piezo_music_silencio_semicorcheap','dyor_piezo_music_do_redondap_vb','dyor_piezo_music_do_redonda_vb','dyor_piezo_music_do_blancap_vb','dyor_piezo_music_do_blanca_vb','dyor_piezo_music_do_negrap_vb','dyor_piezo_music_do_negra_vb','dyor_piezo_music_do_corcheap_vb','dyor_piezo_music_do_corchea_vb','dyor_piezo_music_do_semicorcheap_vb','dyor_piezo_music_do_semicorchea_vb','dyor_piezo_music_dos_redondap_vb','dyor_piezo_music_dos_redonda_vb','dyor_piezo_music_dos_blancap_vb','dyor_piezo_music_dos_blanca_vb','dyor_piezo_music_dos_negrap_vb','dyor_piezo_music_dos_negra_vb','dyor_piezo_music_dos_corcheap_vb','dyor_piezo_music_dos_corchea_vb','dyor_piezo_music_dos_semicorcheap_vb','dyor_piezo_music_dos_semicorchea_vb','dyor_piezo_music_reb_redondap_vb','dyor_piezo_music_reb_redonda_vb','dyor_piezo_music_reb_blancap_vb','dyor_piezo_music_reb_blanca_vb','dyor_piezo_music_reb_negrap_vb','dyor_piezo_music_reb_negra_vb','dyor_piezo_music_reb_corcheap_vb','dyor_piezo_music_reb_corchea_vb','dyor_piezo_music_reb_semicorcheap_vb','dyor_piezo_music_reb_semicorchea_vb','dyor_piezo_music_re_redondap_vb','dyor_piezo_music_re_redonda_vb','dyor_piezo_music_re_blancap_vb','dyor_piezo_music_re_blanca_vb','dyor_piezo_music_re_negrap_vb','dyor_piezo_music_re_negra_vb','dyor_piezo_music_re_corcheap_vb','dyor_piezo_music_re_corchea_vb','dyor_piezo_music_re_semicorcheap_vb','dyor_piezo_music_re_semicorchea_vb','dyor_piezo_music_res_redondap_vb','dyor_piezo_music_res_redonda_vb','dyor_piezo_music_res_blancap_vb','dyor_piezo_music_res_blanca_vb','dyor_piezo_music_res_negrap_vb','dyor_piezo_music_res_negra_vb','dyor_piezo_music_res_corcheap_vb'];

			for (var block in this.Blocks) {
				// important check that this is objects own property
				// not from prototype prop inherited
				if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
					var category = this.Blocks[block].category;
					blocks[category] = blocks[category] || [];
					blocks[category].push(block);
				}
			}

			var missingDoc = '';

			var categoryItem = function(type) {
				if (!(type.includes('dyor_piezo_music_end')|| type.includes('dyor_piezo_music_silencio')||type.includes('dyor_piezo_music_do')||type.includes('dyor_piezo_music_re')||type.includes('dyor_piezo_music_mi')||type.includes('dyor_piezo_music_fa')||type.includes('dyor_piezo_music_sol')||type.includes('dyor_piezo_music_la')||type.includes('dyor_piezo_music_si')))
				{
					if (Facilino.checkHelpUrl(type)===false)
					missingDoc += type+'\n';
				}
				/*if (ignore.indexOf(type)<0){
				  if (Facilino.checkHelpUrl(type)===false)
					missingDoc += type+'\n';
				}*/
			};

			for (block in blocks) {

				if (blocks.hasOwnProperty(block)) {
					blocks[block].forEach(categoryItem);
				}

			}
			//console.log(missingDoc);
		};

		Blockly.getBlocks = function() {

			var blocks = { };

			for (var block in this.Blocks) {
				// important check that this is objects own property
				// not from prototype prop inherited
				if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object) {
					var category = this.Blocks[block].category;
					var subcategory = this.Blocks[block].subcategory;
					var colour = this.Blocks[block].category_colour;
					if (subcategory===undefined)
						subcategory='root';
					blocks[category] = blocks[category] || { };
					blocks[category][subcategory] = blocks[category][subcategory] || [];
					blocks[category][subcategory].push(block);
				}
			}
			return blocks;
		};

		Blockly.createToolbox = function(toolboxNames) {

			var blocks = { };
			var colours = { };

			for (var block in this.Blocks) {
				// important check that this is objects own property
				// not from prototype prop inherited
				if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
					var category = this.Blocks[block].category;
					var subcategory = this.Blocks[block].subcategory;
					var colour = this.Blocks[block].category_colour;
					var subsubcategory = this.Blocks[block].subsubcategory;
					var found = false;
					if (subcategory===undefined)
					{
						subcategory='root';
						subsubcategory='root';
						found = toolboxNames.find(function(element) { return (element===category);});
					}
					else
					{
						if (subsubcategory===undefined)
						{
							subsubcategory='root';
							found = toolboxNames.find(function(element) {return (element===subcategory);});
						}
						found = toolboxNames.find(function(element) {return (element===subcategory);});
					}
					if (found){
						blocks[category] = blocks[category] || { };
						colours[category] = colours[category] || colour;
						blocks[category][subcategory] = blocks[category][subcategory] || [];
						blocks[category][subcategory][subsubcategory] = blocks[category][subcategory][subsubcategory] || [];
						blocks[category][subcategory][subsubcategory].push(block);
					}
				}
			}

			var toolbox = '<xml id="toolbox" style="display: none">';

			var categoryItem = function(type) {
				if (Blockly.Blocks[type].toolbox_hidden===undefined)
				{
					if (Blockly.Blocks[type].default_inputs!==undefined)
					{
						var def_inputs=Blockly.Blocks[type].default_inputs();
						if (Array.isArray(def_inputs))
						{
							def_inputs.forEach(function (el) {toolbox +='<block type="' + type + '">'+el+'</block>';});
						}
						else
							toolbox +='<block type="' + type + '">'+def_inputs+'</block>';
					}
					else
					{
						toolbox += '<block type="' + type + '"></block>';
					}
					if (type==='ble_characteristic')
					{
						/*console.log(Facilino.BLE_characteristics);
						if (Blockly.getMainWorkspace()!==null)
						{
							Blockly.getMainWorkspace().getAllBlocks().forEach(function (b){ if (b.type==='ble_characteristic'){
							toolbox += '<block type="ble_characteristic_value"><field name="NAME">'+b.getFieldValue('CHARACTERISTIC_NAME')+'</field></block>';
							toolbox += '<block type="ble_set_characteristic"><field name="CHARACTERISTIC">'+b.getFieldValue('CHARACTERISTIC_NAME')+'</field></block>';
							toolbox += '<block type="ble_notify_characteristic"><field name="CHARACTERISTIC">'+b.getFieldValue('CHARACTERISTIC_NAME')+'</field></block>';
							}});
							
						}*/
						/*Object.keys(Facilino.BLE_characteristics).forEach(function (c){
							toolbox += '<block type="ble_characteristic_value"><field name="NAME">'+Facilino.BLE_characteristics[c]+'</field></block>';
							toolbox += '<block type="ble_set_characteristic"><field name="CHARACTERISTIC">'+Facilino.BLE_characteristics[c]+'</field></block>';
							toolbox += '<block type="ble_notify_characteristic"><field name="CHARACTERISTIC">'+Facilino.BLE_characteristics[c]+'</field></block>';
						});*/
						
						var unique = [];
						$.each(Object.values(Facilino.BLE_characteristics), function(i, el){
							if($.inArray(el, unique) === -1) unique.push(el);
						});
						unique.forEach(function (element){
							toolbox += '<block type="ble_characteristic_value"><field name="NAME">'+element+'</field></block>';
							toolbox += '<block type="ble_set_characteristic"><field name="CHARACTERISTIC">'+element+'</field></block>';
							toolbox += '<block type="ble_notify_characteristic"><field name="CHARACTERISTIC">'+element+'</field></block>';
						});
					}
				}				
			};

			for (category in blocks) {
				if (blocks.hasOwnProperty(category)) {
					toolbox += '<category id="' + category + '" name="' + category + '" colour="'+colours[category]+'">';
					for (subcategory in blocks[category]) {
						if (subcategory==='root')
							blocks[category]['root']['root'].forEach(categoryItem);
						if (subcategory!=='root'){
							//console.log(blocks);
							toolbox += '<category id="' + subcategory + '" name="' + subcategory + '" colour="'+this.Blocks[blocks[category][subcategory]['root'][0]].colour+'">';
							for (subsubcategory in blocks[category][subcategory])
							{
								if (subsubcategory==='root')
								{
									blocks[category][subcategory]['root'].forEach(categoryItem);
								}
								if (subsubcategory!=='root')
								{
									toolbox += '<category id="' + subsubcategory + '" name="' + subsubcategory + '" colour="'+this.Blocks[blocks[category][subcategory][subsubcategory][0]].colour+'">';
									blocks[category][subcategory][subsubcategory].forEach(categoryItem);
									toolbox += '</category>';
								}
							}
							toolbox += '</category>';
						}
					}
					toolbox += '</category>';
				}

			}
			toolbox += '</xml>';
			return toolbox;
		};
		
		Blockly.createToolbox1 = function(toolboxNames) {

			var blocks = { };
			var colours = { };

			for (var block in this.Blocks) {
				// important check that this is objects own property
				// not from prototype prop inherited
				if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
					var category = this.Blocks[block].category;
					var subcategory = this.Blocks[block].subcategory;
					var colour = this.Blocks[block].category_colour;
					var subsubcategory = this.Blocks[block].subsubcategory;
					var found = false;
					if (subcategory===undefined)
					{
						subcategory='root';
						subsubcategory='root';
						found = toolboxNames.find(function(element) { return (element===category);});
					}
					else
					{
						if (subsubcategory===undefined)
						{
							subsubcategory='root';
							found = toolboxNames.find(function(element) {return (element===subcategory);});
						}
						found = toolboxNames.find(function(element) {return (element===subcategory);});
					}
					if (found){
						blocks[category] = blocks[category] || { };
						colours[category] = colours[category] || colour;
						blocks[category][subcategory] = blocks[category][subcategory] || [];
						blocks[category][subcategory][subsubcategory] = blocks[category][subcategory][subsubcategory] || [];
						blocks[category][subcategory][subsubcategory].push(block);
					}
				}
			}

			var toolbox = '<xml id="toolbox1" style="display: none">';

			var categoryItem = function(type) {
				//toolbox += '<block type="' + type + '"></block>';
				if (Blockly.Blocks[type].toolbox_hidden===undefined)
				{
					if (Blockly.Blocks[type].default_inputs!==undefined)
					{
						var def_inputs=Blockly.Blocks[type].default_inputs();
						if (Array.isArray(def_inputs))
						{
							def_inputs.forEach(function (el) {toolbox +='<block type="' + type + '">'+el+'</block>';});
						}
						else
							toolbox +='<block type="' + type + '">'+def_inputs+'</block>';
					}
					else
					{
						toolbox += '<block type="' + type + '"></block>';
					}
				}		
			};

			for (category in blocks) {
				if (blocks.hasOwnProperty(category)) {
					toolbox += '<category id="' + category + '" name="' + category + '" colour="'+colours[category]+'">';
					for (subcategory in blocks[category]) {
						if (subcategory==='root')
							blocks[category]['root']['root'].forEach(categoryItem);
						if (subcategory!=='root'){
							//console.log(blocks);
							toolbox += '<category id="' + subcategory + '" name="' + subcategory + '" colour="'+this.Blocks[blocks[category][subcategory]['root'][0]].colour+'">';
							for (subsubcategory in blocks[category][subcategory])
							{
								if (subsubcategory==='root')
								{
									blocks[category][subcategory]['root'].forEach(categoryItem);
								}
								if (subsubcategory!=='root')
								{
									toolbox += '<category id="' + subsubcategory + '" name="' + subsubcategory + '" colour="'+this.Blocks[blocks[category][subcategory][subsubcategory][0]].colour+'">';
									blocks[category][subcategory][subsubcategory].forEach(categoryItem);
									toolbox += '</category>';
								}
							}
							toolbox += '</category>';
						}
					}
					toolbox += '</category>';
				}

			}
			toolbox += '</xml>';
			return toolbox;
		};


		Blockly.updateToolboxXml = function(show_cat) {

			var blocks = { };
			var colours = { };

			for (var block in this.Blocks) {
				// important check that this is objects own property
				// not from prototype prop inherited
				if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
					var category = this.Blocks[block].category;
					var subcategory = this.Blocks[block].subcategory;
					var colour = this.Blocks[block].category_colour;
					var subsubcategory = this.Blocks[block].subsubcategory;
					var found = false;
					if (subcategory===undefined)
					{
						subcategory='root';
						subsubcategory='root';
						found = show_cat.find(function(element) { return (element===category);});
					}
					else
					{
						if (subsubcategory===undefined)
						{
							subsubcategory='root';
							found = show_cat.find(function(element) {return (element===subcategory);});
						}
						found = show_cat.find(function(element) {return (element===subcategory);});
					}
					if (found){
						blocks[category] = blocks[category] || { };
						colours[category] = colours[category] || colour;
						blocks[category][subcategory] = blocks[category][subcategory] || [];
						blocks[category][subcategory][subsubcategory] = blocks[category][subcategory][subsubcategory] || [];
						blocks[category][subcategory][subsubcategory].push(block);
					}
				}
			}

			var toolbox = '<xml id="toolbox" style="display: none">';

			var categoryItem = function(type) {
				//toolbox += '<block type="' + type + '"></block>';
				if (Blockly.Blocks[type].toolbox_hidden===undefined)
				{
					if (Blockly.Blocks[type].default_inputs!==undefined)
					{
						var def_inputs=Blockly.Blocks[type].default_inputs();
						if (Array.isArray(def_inputs))
						{
							def_inputs.forEach(function (el) {toolbox +='<block type="' + type + '">'+el+'</block>';});
						}
						else
							toolbox +='<block type="' + type + '">'+def_inputs+'</block>';
					}
					else
					{
						toolbox += '<block type="' + type + '"></block>';
					}
					if (type==='ble_characteristic')
					{
						/*if (Blockly.getMainWorkspace()!==null)
						{
							Blockly.getMainWorkspace().getAllBlocks().forEach(function (b){ if (b.type==='ble_characteristic'){ 
							toolbox += '<block type="ble_characteristic_value"><field name="NAME">'+b.getFieldValue('CHARACTERISTIC_NAME')+'</field></block>';
							toolbox += '<block type="ble_set_characteristic"><field name="CHARACTERISTIC">'+b.getFieldValue('CHARACTERISTIC_NAME')+'</field></block>';
							toolbox += '<block type="ble_notify_characteristic"><field name="CHARACTERISTIC">'+b.getFieldValue('CHARACTERISTIC_NAME')+'</field></block>';
							}});
							
						}*/
						toolbox += '<block type="ble_characteristic_value"><field name="NAME"></field></block>';
						toolbox += '<block type="ble_set_characteristic"><field name="CHARACTERISTIC"></field></block>';
						toolbox += '<block type="ble_notify_characteristic"><field name="CHARACTERISTIC"></field></block>';
						/*Object.keys(Facilino.BLE_characteristics).forEach(function (c){
							toolbox += '<block type="ble_characteristic_value"><field name="NAME">'+Facilino.BLE_characteristics[c]+'</field></block>';
							toolbox += '<block type="ble_set_characteristic"><field name="CHARACTERISTIC">'+Facilino.BLE_characteristics[c]+'</field></block>';
							toolbox += '<block type="ble_notify_characteristic"><field name="CHARACTERISTIC">'+Facilino.BLE_characteristics[c]+'</field></block>';
						});
						var unique = [];
						$.each(Object.values(Facilino.BLE_characteristics), function(i, el){
							if($.inArray(el, unique) === -1) unique.push(el);
						});
						unique.forEach(function (element){
							
						});*/
					}
				}		
			};

			for (category in blocks) {
				if (blocks.hasOwnProperty(category)) {
					toolbox += '<category id="' + category + '" name="' + category + '" colour="'+colours[category]+'">';
					for (subcategory in blocks[category]) {
						if (subcategory==='root')
							blocks[category]['root']['root'].forEach(categoryItem);
						if (subcategory!=='root'){
							//console.log(blocks);
							toolbox += '<category id="' + subcategory + '" name="' + subcategory + '" colour="'+this.Blocks[blocks[category][subcategory]['root'][0]].colour+'">';
							for (subsubcategory in blocks[category][subcategory])
							{
								if (subsubcategory==='root')
								{
									blocks[category][subcategory]['root'].forEach(categoryItem);
								}
								if (subsubcategory!=='root')
								{
									toolbox += '<category id="' + subsubcategory + '" name="' + subsubcategory + '" colour="'+this.Blocks[blocks[category][subcategory][subsubcategory][0]].colour+'">';
									blocks[category][subcategory][subsubcategory].forEach(categoryItem);
									toolbox += '</category>';
								}
							}
							toolbox += '</category>';
						}
					}
					toolbox += '</category>';
				}

			}
			toolbox += '</xml>';
			
			return toolbox;
		};

		Blockly.createToolboxColours = function() {

			var blocks = {};

			for (var block in this.Blocks) {
				// important check that this is objects own property
				// not from prototype prop inherited
				if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
					var category = this.Blocks[block].category;
					blocks[category] = blocks[category] || [];
					if (this.Blocks[block].colour !== undefined)
					{
						blocks[category].push(this.Blocks[block].colour);
					}
				}
			}
			//return blocks[category];
			return blocks;
		};



		Blockly.getInstructionList = function() {

			var blocks = { };
			var colours = { };

			for (var block in this.Blocks) {
				// important check that this is objects own property
				// not from prototype prop inherited
				if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
					var category = this.Blocks[block].category;
					var subcategory = this.Blocks[block].subcategory;
					var colour = this.Blocks[block].category_colour;
					var subsubcategory = this.Blocks[block].subsubcategory;
					var found = false;
					if (subcategory===undefined)
					{
						subcategory='root';
						subsubcategory='root';
					}
					else
					{
						if (subsubcategory===undefined)
						{
							subsubcategory='root';
						}
					}
					blocks[category] = blocks[category] || { };
					colours[category] = colours[category] || colour;
					blocks[category][subcategory] = blocks[category][subcategory] || [];
					blocks[category][subcategory][subsubcategory] = blocks[category][subcategory][subsubcategory] || [];
					blocks[category][subcategory][subsubcategory].push(block);
				}
			}

			var instruction_list = '<ul class="instruction">';

			var categoryItem = function(type) {
				instruction_list += '<li>'+type+'</li>';
			};

			for (category in blocks) {
				if (blocks.hasOwnProperty(category)) {
					instruction_list += '<li id="'+category+'">'+category+'<ul>';
					for (subcategory in blocks[category]) {
						if (subcategory==='root')
							blocks[category]['root']['root'].forEach(categoryItem);
						if (subcategory!=='root'){
							//console.log(blocks);
							instruction_list += '<li id="'+subcategory+'">'+subcategory+'<ul>';
							for (subsubcategory in blocks[category][subcategory])
							{
								if (subsubcategory==='root')
								{
									blocks[category][subcategory]['root'].forEach(categoryItem);
								}
								if (subsubcategory!=='root')
								{
									instruction_list += '<li id="'+subsubcategory+'">'+subsubcategory+'<ul>';
									blocks[category][subcategory][subsubcategory].forEach(categoryItem);
									instruction_list += '</li></ul>';
								}
							}
							instruction_list += '</li></ul>';
						}
					}
					instruction_list += '</li></ul>';
				}

			}
			instruction_list += '</ul>';

			return instruction_list;
		};
		
		this["JST"] = this["JST"] || {};
		
		
		
	}
	
	var Facilino = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return Facilino;
	} else {
		window.Facilino = Facilino;
	}
}));
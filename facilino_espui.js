(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		if (window.FacilinoAdvanced===true)
		{
			
		if ((Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32'))
		{
			Blockly.Blocks['espui'] = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_ESPUI'),
			helpUrl: Facilino.getHelpUrl('espui'),
			tags: ['webinterface'],
			examples: ['lol.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_ESPUI,
			keys: ['LANG_ESPUI_ESPUI_TITLE_NAME','LANG_ESPUI_ESPUI_TITLE','LANG_ESPUI_ESPUI_HOTSPOT','LANG_ESPUI_ESPUI_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ESPUI_ESPUI_TITLE_NAME'),
			init: function() {
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_ESPUI_TITLE')).appendField(new Blockly.FieldTextInput(Facilino.locales.getKey('LANG_ESPUI_ESPUI_TITLE')), 'ui_name');
			   this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_ESPUI_HOTSPOT')).appendField(new Blockly.FieldDropdown([['No', 'N'],['Yes', 'Y']]), 'wifi_option').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('ui_elements').setCheck('ui_element');
				this.setColour(Facilino.LANG_COLOUR_ESPUI);
				this.setTooltip(Facilino.locales.getKey('LANG_ESPUI_ESPUI_TOOLTIP'));
				},
			isNotDuplicable: true
			};

	Blockly.Arduino['espui'] = function(block) {
		var ui_name = block.getFieldValue('ui_name');
		var wifi_option = block.getFieldValue('wifi_option');
		var ui_elements = Blockly.Arduino.statementToCode(block, 'ui_elements');
		Blockly.Arduino.setups_['setup_serial'] = JST['communications_serial_begin']({'bitrate': Facilino.profiles.default.serial});
		if (Facilino.profiles['processor']==='ESP8266')
			Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
		else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
			Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
		Blockly.Arduino.definitions_['define_espui_h'] = '#include <ESPUI.h>';
		Blockly.Arduino.setups_['setup_espui'] = '\n';
		if(wifi_option==='Y'){
		  Blockly.Arduino.setups_['setup_espui'] +=
		  '	WiFi.mode(WIFI_AP);\n' +
		  '	   WiFi.softAPConfig(IPAddress(192, 168, 1, 1),IPAddress(192, 168, 1, 1),IPAddress(255, 255, 255, 0));\n' +
		  '	WiFi.softAP("' + ui_name + '");\n' +
		  '	Serial.print("IP address: ");\n' +
		  '	Serial.println(WiFi.softAPIP());\n\n';
		}
		Blockly.Arduino.setups_['setup_espui'] += ui_elements;
		Blockly.Arduino.setups_['setup_espui'] += '	ESPUI.begin("' + ui_name + '");\n';
		return null;
	};

//Elements

	Blockly.Blocks['espui_button'] = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_ESPUI'),
			helpUrl: Facilino.getHelpUrl('espui_button'),
			tags: ['webinterface'],
			examples: ['lol.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_ESPUI,
			keys: ['LANG_ESPUI_BUTTON_BUTTON_NAME','LANG_ESPUI_BUTTON_BUTTON','LANG_ESPUI_NAME','LANG_ESPUI_COLOR','LANG_ESPUI_TEXT','LANG_ESPUI_BUTTON_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ESPUI_BUTTON_BUTTON_NAME'),
		init: function() {
			var colour = new Blockly.FieldColour('#000000');
			colour.setColours(['#000000','#40e0d0','#50c878','#3498dc','#687894','#e4d422','#eb8921','#e32636']).setColumns(2);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_BUTTON_BUTTON')).appendField(new Blockly.FieldTextInput(Facilino.locales.getKey('LANG_ESPUI_NAME')), 'ui_name');
			//this.appendDummyInput().appendField('UI Color').appendField(new Blockly.FieldDropdown(colorOptions), 'ui_color');
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_COLOR')).appendField(colour, 'ui_color');
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_TEXT')).appendField(new Blockly.FieldTextInput(Facilino.locales.getKey('LANG_ESPUI_TEXT')), 'button_text');
			this.setColour(Facilino.LANG_COLOUR_ESPUI);
			this.setPreviousStatement(true, 'ui_element');
			this.setNextStatement(true, 'ui_element');
			this.setTooltip(Facilino.locales.getKey('LANG_ESPUI_BUTTON_TOOLTIP'));
			this.appendStatementInput('on_down').appendField(new Blockly.FieldImage('img/blocks/button_pressed.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.appendStatementInput('on_up').appendField(new Blockly.FieldImage('img/blocks/button_released.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
		}
	};

	Blockly.Arduino['espui_button'] = function(block) {
		var ui_name = block.getFieldValue('ui_name');
		var color = block.getFieldValue('ui_color');
		var colorOptions = {"#000000": "COLOR_NONE", "#40e0d0": "COLOR_TURQUOISE", "#50c878": "COLOR_EMERALD", "#3498dc": "COLOR_PETERRIVER", "#687894": "COLOR_WETASPHALT", "#e4d422": "COLOR_SUNFLOWER", "#eb8921": "COLOR_CARROT", "#e32636": "COLOR_ALIZARIN"};
		var ui_color = colorOptions[color];
		var button_text = block.getFieldValue('button_text');
		var ui_name_clean = ui_name.replace(' ', '_');
		var on_down = Blockly.Arduino.statementToCode(block, 'on_down');
		var on_up = Blockly.Arduino.statementToCode(block, 'on_up');
		Blockly.Arduino.definitions_['define_ui_button_' + ui_name_clean] =
			'void button_' + ui_name_clean + '(Control* c, int type) {\n' +
			' switch(type){\n' +
			'  case B_DOWN:\n' +
			on_down + '	break;\n' +
			'  case B_UP:\n' +
			on_up + '	break;\n' +
			' }\n' +
			'}\n';

		var code = '  ESPUI.button("' + ui_name + '", &button_' + ui_name_clean + ', ' + ui_color + ', "' + button_text + '");\n';
		return code;
	};

	Blockly.Blocks['espui_label'] = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_ESPUI'),
			helpUrl: Facilino.getHelpUrl('espui_label'),
			tags: ['webinterface'],
			examples: ['lol.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_ESPUI,
			keys: ['LANG_ESPUI_LABEL_LABEL_NAME','LANG_ESPUI_LABEL_LABEL','LANG_ESPUI_NAME','LANG_ESPUI_COLOR','LANG_ESPUI_TEXT','LANG_ESPUI_LABEL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ESPUI_LABEL_LABEL_NAME'),
		init: function() {
			var colour = new Blockly.FieldColour('#000000');
			colour.setColours(['#000000','#40e0d0','#50c878','#3498dc','#687894','#e4d422','#eb8921','#e32636']).setColumns(2);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_LABEL_LABEL')).appendField(new Blockly.FieldTextInput(Facilino.locales.getKey('LANG_ESPUI_NAME')), 'ui_name');
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_COLOR')).appendField(colour, 'ui_color');
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_TEXT')).appendField(new Blockly.FieldTextInput('value'), 'start_value');
			this.setColour(Facilino.LANG_COLOUR_ESPUI);
			this.setPreviousStatement(true, 'ui_element');
			this.setNextStatement(true, 'ui_element');
			this.setTooltip(Facilino.locales.getKey('LANG_ESPUI_LABEL_TOOLTIP'));
		}
	};

	Blockly.Arduino['espui_label'] = function(block) {
		var ui_name = block.getFieldValue('ui_name');
		var color = block.getFieldValue('ui_color');
		var colorOptions = {"#000000": "COLOR_NONE", "#40e0d0": "COLOR_TURQUOISE", "#50c878": "COLOR_EMERALD", "#3498dc": "COLOR_PETERRIVER", "#687894": "COLOR_WETASPHALT", "#e4d422": "COLOR_SUNFLOWER", "#eb8921": "COLOR_CARROT", "#e32636": "COLOR_ALIZARIN"};
		var ui_color = colorOptions[color];
		var ui_name_clean = ui_name.replace(' ', '_');
		var start_value = block.getFieldValue('start_value');
		var code = '  ESPUI.label("' + ui_name_clean + '", ' + ui_color + ', "' + start_value + '");\n';
		return code;
	};

	Blockly.Blocks['espui_label_print'] = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_ESPUI'),
			helpUrl: Facilino.getHelpUrl('espui_label'),
			tags: ['webinterface'],
			examples: ['lol.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_ESPUI,
			keys: ['LANG_ESPUI_PRINT_LABEL_NAME','LANG_ESPUI_LABEL_LABEL','LANG_ESPUI_NAME','LANG_ESPUI_TEXT','LANG_ESPUI_LABEL_PRINT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ESPUI_PRINT_LABEL_NAME'),
		init: function() {
			var colour = new Blockly.FieldColour('#000000');
			colour.setColours(['#000000','#40e0d0','#50c878','#3498dc','#687894','#e4d422','#eb8921','#e32636']).setColumns(2);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_LABEL_LABEL')).appendField(new Blockly.FieldTextInput(Facilino.locales.getKey('LANG_ESPUI_NAME')), 'ui_name');
			this.appendValueInput('value').appendField(Facilino.locales.getKey('LANG_ESPUI_TEXT')).setCheck([String,'Variable']);
			this.setColour(Facilino.LANG_COLOUR_ESPUI);
			this.setPreviousStatement(true, 'code');
			this.setNextStatement(true, 'code');
			this.setTooltip(Facilino.locales.getKey('LANG_ESPUI_LABEL_PRINT_TOOLTIP'));
		}
	};

	Blockly.Arduino['espui_label_print'] = function(block) {
		var ui_name = block.getFieldValue('ui_name');
		var ui_name_clean = ui_name.replace(' ', '_');
		var value = Blockly.Arduino.valueToCode(this,'value',Blockly.Arduino.ORDER_ATOMIC);
		var code = '  ESPUI.print("' + ui_name_clean + '", ' + value + ');\n';
		return code;
	};

	Blockly.Blocks['espui_switcher'] = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_ESPUI'),
			helpUrl: Facilino.getHelpUrl('espui_switcher'),
			tags: ['webinterface'],
			examples: ['lol.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_ESPUI,
			keys: ['LANG_ESPUI_SWITCH_SWITCH_NAME','LANG_ESPUI_SWITCH_SWITCH','LANG_ESPUI_NAME','LANG_ESPUI_COLOR','LANG_ESPUI_STATE','LANG_ESPUI_SWITCH_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ESPUI_SWITCH_SWITCH_NAME'),
		init: function() {
			var colour = new Blockly.FieldColour('#000000');
			colour.setColours(['#000000','#40e0d0','#50c878','#3498dc','#687894','#e4d422','#eb8921','#e32636']).setColumns(2);
			var stateOptions = [['Off', 'false'],['On', 'true']];
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_SWITCH_SWITCH')).appendField(new Blockly.FieldTextInput(Facilino.locales.getKey('LANG_ESPUI_NAME')), 'ui_name');
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_COLOR')).appendField(colour, 'ui_color');
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_STATE')).appendField(new Blockly.FieldDropdown(stateOptions), 'switcher_state');
			this.setColour(Facilino.LANG_COLOUR_ESPUI);
			this.setPreviousStatement(true, 'ui_element');
			this.setNextStatement(true, 'ui_element');
			this.setTooltip(Facilino.locales.getKey('LANG_ESPUI_SWITCH_TOOLTIP')); //''
			this.appendStatementInput('on_on').appendField(new Blockly.FieldImage('img/blocks/switch_on.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.appendStatementInput('on_off').appendField(new Blockly.FieldImage('img/blocks/switch_off.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
		}
	};

	Blockly.Arduino['espui_switcher'] = function(block) {
		var ui_name = block.getFieldValue('ui_name');
		var color = block.getFieldValue('ui_color');
		var colorOptions = {"#000000": "COLOR_NONE", "#40e0d0": "COLOR_TURQUOISE", "#50c878": "COLOR_EMERALD", "#3498dc": "COLOR_PETERRIVER", "#687894": "COLOR_WETASPHALT", "#e4d422": "COLOR_SUNFLOWER", "#eb8921": "COLOR_CARROT", "#e32636": "COLOR_ALIZARIN"};
		var ui_color = colorOptions[color];
		var switcher_state = block.getFieldValue('switcher_state');
		var ui_name_clean = ui_name.replace(' ', '_');
		var on_on = Blockly.Arduino.statementToCode(block, 'on_on');
		var on_off = Blockly.Arduino.statementToCode(block, 'on_off');
		Blockly.Arduino.definitions_['define_ui_switcher_' + ui_name_clean] =
			'void switcher_' + ui_name_clean + '(Control* c, int type) {\n' +
			' switch(type){\n' +
			'  case S_ACTIVE:\n' +
			on_on + '\n	break;\n' +
			'  case S_INACTIVE:\n' +
			on_off + '\n	break;\n' +
			' }\n' +
			'}\n';

		var code = '  ESPUI.switcher("' + ui_name + '", ' + switcher_state + ', &switcher_' + ui_name_clean + ', ' + ui_color + ');\n';
		return code;
	};

	Blockly.Blocks['espui_pad'] = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_ESPUI'),
			helpUrl: Facilino.getHelpUrl('espui_pad'),
			tags: ['webinterface'],
			examples: ['lol.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_ESPUI,
			keys: ['LANG_ESPUI_PAD_PAD_NAME','LANG_ESPUI_PAD_PAD','LANG_ESPUI_NAME','LANG_ESPUI_COLOR','LANG_ESPUI_PAD_CENTER','LANG_ESPUI_PAD_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ESPUI_PAD_PAD_NAME'),
		init: function() {
			var colour = new Blockly.FieldColour('#000000');
			colour.setColours(['#000000','#40e0d0','#50c878','#3498dc','#687894','#e4d422','#eb8921','#e32636']).setColumns(2);
			var centerOptions = [['Yes', 'false'],['No', 'true']];
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_PAD_PAD')).appendField(new Blockly.FieldTextInput(Facilino.locales.getKey('LANG_ESPUI_NAME')), 'ui_name');
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_COLOR')).appendField(colour, 'ui_color');
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_PAD_CENTER')).appendField(new Blockly.FieldDropdown(centerOptions), 'pad_center');
			this.setColour(Facilino.LANG_COLOUR_ESPUI);
			this.setPreviousStatement(true, 'ui_element');
			this.setNextStatement(true, 'ui_element');
			this.setTooltip(Facilino.locales.getKey('LANG_ESPUI_PAD_TOOLTIP'));
			this.appendStatementInput('on_down_for').appendField(new Blockly.FieldImage('img/blocks/controller_up_pressed.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.appendStatementInput('on_up_for').appendField(new Blockly.FieldImage('img/blocks/controller_up_released.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.appendStatementInput('on_down_back').appendField(new Blockly.FieldImage('img/blocks/controller_down_pressed.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.appendStatementInput('on_up_back').appendField(new Blockly.FieldImage('img/blocks/controller_down_released.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.appendStatementInput('on_down_left').appendField(new Blockly.FieldImage('img/blocks/controller_right_pressed.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.appendStatementInput('on_up_left').appendField(new Blockly.FieldImage('img/blocks/controller_right_released.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.appendStatementInput('on_down_right').appendField(new Blockly.FieldImage('img/blocks/controller_left_pressed.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.appendStatementInput('on_up_right').appendField(new Blockly.FieldImage('img/blocks/controller_left_released.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.appendStatementInput('on_down_center').appendField(new Blockly.FieldImage('img/blocks/controller_center_pressed.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.appendStatementInput('on_up_center').appendField(new Blockly.FieldImage('img/blocks/controller_center_released.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.lastOption=this.getFieldValue('pad_center');
		},
		onchange: function()
		{
			if (this.lastOption!==this.getFieldValue('pad_center'))
			{
				if (this.getFieldValue('pad_center')==='false')
				{
					try{

						this.removeInput('on_down_center');
						this.removeInput('on_up_center');
						this.appendStatementInput('on_down_center').appendField(new Blockly.FieldImage('img/blocks/controller_center_pressed.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
						this.appendStatementInput('on_up_center').appendField(new Blockly.FieldImage('img/blocks/controller_center_released.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
					}
					catch(e)
					{
					}
				}
				else
				{
					try{
						this.removeInput('on_down_center');
						this.removeInput('on_up_center');
					}
					catch(e)
					{
					}
				}
				this.lastOption=this.getFieldValue('pad_center');
			}
		}
	};

	Blockly.Arduino['espui_pad'] = function(block) {
			var ui_name = block.getFieldValue('ui_name');
			var color = block.getFieldValue('ui_color');
			var colorOptions = {"#000000": "COLOR_NONE", "#40e0d0": "COLOR_TURQUOISE", "#50c878": "COLOR_EMERALD", "#3498dc": "COLOR_PETERRIVER", "#687894": "COLOR_WETASPHALT", "#e4d422": "COLOR_SUNFLOWER", "#eb8921": "COLOR_CARROT", "#e32636": "COLOR_ALIZARIN"};
			var ui_color = colorOptions[color];
			var pad_center = block.getFieldValue('pad_center');
			var ui_name_clean = ui_name.replace(' ', '_');
			var on_down_for = Blockly.Arduino.statementToCode(block, 'on_down_for');
			var on_up_for = Blockly.Arduino.statementToCode(block, 'on_up_for');
			var on_down_back = Blockly.Arduino.statementToCode(block, 'on_down_back');
			var on_up_back = Blockly.Arduino.statementToCode(block, 'on_up_back');
			var on_down_left = Blockly.Arduino.statementToCode(block, 'on_down_left');
			var on_up_left = Blockly.Arduino.statementToCode(block, 'on_up_left');
			var on_down_right = Blockly.Arduino.statementToCode(block, 'on_down_right');
			var on_up_right = Blockly.Arduino.statementToCode(block, 'on_up_right');
			var on_down_center = Blockly.Arduino.statementToCode(block, 'on_down_center');
			var on_up_center = Blockly.Arduino.statementToCode(block, 'on_up_center');
			Blockly.Arduino.definitions_['define_ui_pad_' + ui_name_clean] =
			'void pad_' + ui_name_clean + '(Control* c, int type) {\n' +
			' switch(type){\n' +
			'   case P_FOR_DOWN:\n' +
			on_down_for + '\n	break;\n' +
			'   case P_FOR_UP:\n' +
			on_up_for + '\n	break;\n' +

			'   case P_BACK_DOWN:\n' +
			on_down_back + '\n	break;\n' +
			'   case P_BACK_UP:\n' +
			on_up_back + '\n   break;\n' +

			'   case P_RIGHT_DOWN:\n' +
			on_down_left + '\n	break;\n' +
			'   case P_RIGHT_UP:\n' +
			on_up_left + '\n	break;\n' +

			'  case P_LEFT_DOWN:\n' +
			on_down_right + '\n	break;\n' +
			'  case P_LEFT_UP:\n' +
			on_up_right + '\n	break;\n' +

			'  case P_CENTER_DOWN:\n' +
			on_down_center + '\n	break;\n' +
			'  case P_CENTER_UP:\n' +
			on_up_center + '\n	break;\n' +
			' }\n' +
			'}\n';
			var code = '  ESPUI.pad("' + ui_name + '", ' + pad_center + ', &pad_' + ui_name_clean + ', ' + ui_color + ');\n';
			return code;
		};

		Blockly.Blocks['espui_slider'] = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_ESPUI'),
			helpUrl: Facilino.getHelpUrl('espui_slider'),
			tags: ['webinterface'],
			examples: ['lol.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_ESPUI,
			keys: ['LANG_ESPUI_SLIDER_SLIDER_NAME','LANG_ESPUI_SLIDER_SLIDER','LANG_ESPUI_NAME','LANG_ESPUI_COLOR','LANG_ESPUI_STATE','LANG_ESPUI_SLIDER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ESPUI_SLIDER_SLIDER_NAME'),
		init: function() {
			var colour = new Blockly.FieldColour('#000000');
			colour.setColours(['#000000','#40e0d0','#50c878','#3498dc','#687894','#e4d422','#eb8921','#e32636']).setColumns(2);
			var stateOptions = [['Off', 'false'],['On', 'true']];
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_SLIDER_SLIDER')).appendField(new Blockly.FieldTextInput(Facilino.locales.getKey('LANG_ESPUI_NAME')), 'ui_name');
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ESPUI_COLOR')).appendField(colour, 'ui_color');
			this.appendStatementInput('slider_value').appendField(new Blockly.FieldImage('img/blocks/slider.svg', 22*options.zoom, 22*options.zoom)).setCheck('code');
			this.setColour(Facilino.LANG_COLOUR_ESPUI);
			this.setPreviousStatement(true, 'ui_element');
			this.setNextStatement(true, 'ui_element');
			this.setTooltip(Facilino.locales.getKey('LANG_ESPUI_SLIDER_TOOLTIP')); //''
		}
	};

	Blockly.Arduino['espui_slider'] = function(block) {
		var ui_name = block.getFieldValue('ui_name');
		var color = block.getFieldValue('ui_color');
		var colorOptions = {"#000000": "COLOR_NONE", "#40e0d0": "COLOR_TURQUOISE", "#50c878": "COLOR_EMERALD", "#3498dc": "COLOR_PETERRIVER", "#687894": "COLOR_WETASPHALT", "#e4d422": "COLOR_SUNFLOWER", "#eb8921": "COLOR_CARROT", "#e32636": "COLOR_ALIZARIN"};
		var ui_color = colorOptions[color];
		var ui_name_clean = ui_name.replace(' ', '_');
		var slider_code = Blockly.Arduino.statementToCode(block, 'slider_value');
		Blockly.Arduino.definitions_['define_ui_slider_' + ui_name_clean] =
			'void slider_' + ui_name_clean + '(Control* c, int value) {\n' +
			slider_code +
			'}\n';

		var code = '  ESPUI.slider("' + ui_name + '", &slider_' + ui_name_clean + ', ' + ui_color + ', "50");\n';
		return code;
	};

	Blockly.Blocks['espui_slider_value'] = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_ESPUI'),
			helpUrl: Facilino.getHelpUrl('espui_label'),
			tags: ['webinterface'],
			examples: ['lol.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_ESPUI,
			keys: ['LANG_ESPUI_SLIDER_LABEL_NAME','LANG_ESPUI_LABEL_LABEL','LANG_ESPUI_NAME','LANG_ESPUI_TEXT','LANG_ESPUI_LABEL_PRINT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ESPUI_SLIDER_LABEL_NAME'),
		init: function() {
			var colour = new Blockly.FieldColour('#000000');
			colour.setColours(['#000000','#40e0d0','#50c878','#3498dc','#687894','#e4d422','#eb8921','#e32636']).setColumns(2);
			this.appendDummyInput().appendField(new Blockly.FieldImage('img/blocks/slider.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_ESPUI_SLIDER_VALUE'));
			this.setColour(Facilino.LANG_COLOUR_ESPUI);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_ESPUI_SLIDER_VALUE_TOOLTIP'));
		}
	};

	Blockly.Arduino['espui_slider_value'] = function(block) {
		var code = 'c.value.toInt()';
		return [code,Blockly.Arduino.ORDER_ATOMIC];
	};
		}

		}
	}
	
	var FacilinoESPUI = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoESPUI;
	} else {
		window.FacilinoESPUI = FacilinoESPUI;
	}
}));
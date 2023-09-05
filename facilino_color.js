(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		//if (window.FacilinoAdvanced===true)
		{
			var color_category=Facilino.locales.getKey('LANG_CATEGORY_LIGHT');
			var color_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_COLOR');
			var color_cat_colour=Facilino.LANG_COLOUR_LIGHT;
			if (window.FacilinoAdvanced===true)
				var color_colour=Facilino.LANG_COLOUR_LIGHT_COLOR;
			else
				var color_colour=Facilino.LANG_COLOUR_LIGHT_INFRARED;
		}
		/*else
		{
			var color_category=Facilino.locales.getKey('LANG_CATEGORY_ADVANCED');
			var color_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL');
			var color_cat_colour=Facilino.LANG_COLOUR_ADVANCED;
			var color_colour=Facilino.LANG_COLOUR_ADVANCED_DIGITAL;
		}*/
		
	Blockly.Arduino.red_green_led = function() {
			var code = '';
			var pinR = Blockly.Arduino.valueToCode(this, 'PIN_R', Blockly.Arduino.ORDER_ATOMIC);
			var pinG = Blockly.Arduino.valueToCode(this, 'PIN_G', Blockly.Arduino.ORDER_ATOMIC);
			
			Blockly.Arduino.setups_['inout_digital_output' + pinR] = JST['inout_digital_output']({'pin': pinR});
			Blockly.Arduino.setups_['inout_digital_output' + pinG] = JST['inout_digital_output']({'pin': pinG});
			var state = this.getFieldValue('STATE') || '#000000';
			if (state === 'OFF')
			{
				code += JST['inout_digital_write']({'pin': pinR,'state': 'LOW'});
				code += JST['inout_digital_write']({'pin': pinG,'state': 'LOW'});
			}
			else if (state ==='RED')
			{
				code += JST['inout_digital_write']({'pin': pinR,'state': 'HIGH'});
				code += JST['inout_digital_write']({'pin': pinG,'state': 'LOW'});
			}
			else if (state ==='GREEN')
			{
				code += JST['inout_digital_write']({'pin': pinR,'state': 'LOW'});
				code += JST['inout_digital_write']({'pin': pinG,'state': 'HIGH'});
			}
			return code;
		};

		Blockly.Blocks.red_green_led = {
			category: color_category,
			subcategory: color_subcategory,
			tags: ['rgb','led'],
			helpUrl: Facilino.getHelpUrl('red_green_led'),
			examples: ['rgb_led_example.bly'],
			category_colour: color_cat_colour,
			colour: color_colour,
			keys: ['LANG_RG_LED_NAME','LANG_RG_LED','LANG_RG_LED_PIN_R','LANG_RG_LED_PIN_G','LANG_RG_LED_VALUE','LANG_RG_LED_OFF','LANG_RG_LED_RED','LANG_RG_LED_GREEN','LANG_RG_LED_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_RG_LED_NAME'),
			init: function() {
				this.setColour(color_colour);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_RG_LED')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/red_green_led.svg', 48*options.zoom, 48*options.zoom));
				this.appendValueInput('PIN_R').appendField(Facilino.locales.getKey('LANG_RG_LED_PIN_R')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN_G').appendField(Facilino.locales.getKey('LANG_RG_LED_PIN_G')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_RG_LED_VALUE')).appendField(new Blockly.FieldDropdown(([[Facilino.locales.getKey('LANG_RG_LED_OFF'),'OFF'],[Facilino.locales.getKey('LANG_RG_LED_RED'),'RED'],[Facilino.locales.getKey('LANG_RG_LED_GREEN'),'GREEN']])),'STATE').setAlign(Blockly.ALIGN_RIGHT);
		this.setInputsInline(false);
		this.setPreviousStatement(true,'code');
		this.setNextStatement(true,'code');
		this.setTooltip(Facilino.locales.getKey('LANG_RG_LED_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='<value name="PIN_R"><shadow type="pin_digital"></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="PIN_G"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_G"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				return xml;
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.red_green_led['subcategory'];

		Blockly.Arduino.rgb_led = function() {
			var code = '';
			var pinR = Blockly.Arduino.valueToCode(this, 'PIN_R', Blockly.Arduino.ORDER_ATOMIC);
			var pinG = Blockly.Arduino.valueToCode(this, 'PIN_G', Blockly.Arduino.ORDER_ATOMIC);
			var pinB = Blockly.Arduino.valueToCode(this, 'PIN_B', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.setups_['inout_digital_output' + pinR] = JST['inout_digital_output']({'pin': pinR});
			Blockly.Arduino.setups_['inout_digital_output' + pinG] = JST['inout_digital_output']({'pin': pinG});
			Blockly.Arduino.setups_['inout_digital_output' + pinB] = JST['inout_digital_output']({'pin': pinB});
			var color = this.getFieldValue('COLOR') || '#000000';
			if (color === '#000000')
			{
				code += JST['inout_digital_write']({'pin': pinR,'state': 'LOW'});
				code += JST['inout_digital_write']({'pin': pinG,'state': 'LOW'});
				code += JST['inout_digital_write']({'pin': pinB,'state': 'LOW'});
			}
			else if (color ==='#ffffff')
			{
				code += JST['inout_digital_write']({'pin': pinR,'state': 'HIGH'});
				code += JST['inout_digital_write']({'pin': pinG,'state': 'HIGH'});
				code += JST['inout_digital_write']({'pin': pinB,'state': 'HIGH'});
			}
			else if (color ==='#ff0000')
			{
				code += JST['inout_digital_write']({'pin': pinR,'state': 'HIGH'});
				code += JST['inout_digital_write']({'pin': pinG,'state': 'LOW'});
				code += JST['inout_digital_write']({'pin': pinB,'state': 'LOW'});
			}
			else if (color ==='#ffff00')
			{
				code += JST['inout_digital_write']({'pin': pinR,'state': 'HIGH'});
				code += JST['inout_digital_write']({'pin': pinG,'state': 'HIGH'});
				code += JST['inout_digital_write']({'pin': pinB,'state': 'LOW'});
			}
			else if (color ==='#00ff00')
			{
				code += JST['inout_digital_write']({'pin': pinR,'state': 'LOW'});
				code += JST['inout_digital_write']({'pin': pinG,'state': 'HIGH'});
				code += JST['inout_digital_write']({'pin': pinB,'state': 'LOW'});
			}
			else if (color ==='#00ffff')
			{
				code += JST['inout_digital_write']({'pin': pinR,'state': 'LOW'});
				code += JST['inout_digital_write']({'pin': pinG,'state': 'HIGH'});
				code += JST['inout_digital_write']({'pin': pinB,'state': 'HIGH'});
			}
			else if (color ==='#0000ff')
			{
				code += JST['inout_digital_write']({'pin': pinR,'state': 'LOW'});
				code += JST['inout_digital_write']({'pin': pinG,'state': 'LOW'});
				code += JST['inout_digital_write']({'pin': pinB,'state': 'HIGH'});
			}
			else if (color ==='#ff00ff')
			{
				code += JST['inout_digital_write']({'pin': pinR,'state': 'HIGH'});
				code += JST['inout_digital_write']({'pin': pinG,'state': 'LOW'});
				code += JST['inout_digital_write']({'pin': pinB,'state': 'HIGH'});
			}
			return code;
		};

		Blockly.Blocks.rgb_led = {
			category: color_category,
			subcategory: color_subcategory,
			tags: ['rgb','led'],
			helpUrl: Facilino.getHelpUrl('rgb_led'),
			examples: ['rgb_led_example.bly'],
			category_colour: color_cat_colour,
			colour: color_colour,
			keys: ['LANG_RGB_LED_NAME','LANG_RGB_LED','LANG_RGB_LED_PIN_R','LANG_RGB_LED_PIN_G','LANG_RGB_LED_PIN_B','LANG_RGB_LED_VALUE','LANG_RGB_LED_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_RGB_LED_NAME'),
			init: function() {
				this.setColour(color_colour);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_RGB_LED')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/rgb_led.svg', 48*options.zoom, 48*options.zoom));
		this.appendValueInput('PIN_R').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_R')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
			//this.appendValueInput('VALUE_R', Boolean).setCheck(Number).appendField(Facilino.locales.getKey('LANG_RGB_LED_VALUE_R')).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('PIN_G').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_G')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
		//this.appendValueInput('VALUE_G', Boolean).setCheck(Number).appendField(Facilino.locales.getKey('LANG_RGB_LED_VALUE_G')).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('PIN_B').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_B')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
		//this.appendValueInput('VALUE_B', Boolean).setCheck(Number).appendField(Facilino.locales.getKey('LANG_RGB_LED_VALUE_B')).setAlign(Blockly.ALIGN_RIGHT);
		//this.appendValueInput('VALUE', Boolean).setCheck('COLOR').appendField(Facilino.locales.getKey('LANG_RGB_LED_VALUE')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/color.png",24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
		var colour = new Blockly.FieldColour('#000000');
		colour.setColours(['#000000','#FFFFFF','#FF0000','#FFFF00','#00FF00','#00FFFF','#0000FF','#FF00FF']).setColumns(2);
		//colour.COLOURS=['#000000','#FFFFFF','#FF0000','#FFFF00','#00FF00','#00FFFF','#0000FF','#FF00FF'];
		//colour.COLUMNS=2;
	 	this.appendDummyInput('COLOR').appendField(Facilino.locales.getKey('LANG_RGB_LED_VALUE')).appendField(colour,'COLOR').setAlign(Blockly.ALIGN_RIGHT);
		this.setInputsInline(false);
		this.setPreviousStatement(true,'code');
		this.setNextStatement(true,'code');
		this.setTooltip(Facilino.locales.getKey('LANG_RGB_LED_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='<value name="PIN_R"><shadow type="pin_digital"></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="PIN_G"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_G"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>2)
					xml+='<value name="PIN_B"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[2][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_B"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				return xml;
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.rgb_led['subcategory'];

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.rgb_raw_sensor = function() {
			var code = '';
			var pinS0 = Blockly.Arduino.valueToCode(this, 'PIN_S0', Blockly.Arduino.ORDER_ATOMIC);
			var pinS1 = Blockly.Arduino.valueToCode(this, 'PIN_S1', Blockly.Arduino.ORDER_ATOMIC);
			var pinS2 = Blockly.Arduino.valueToCode(this, 'PIN_S2', Blockly.Arduino.ORDER_ATOMIC);
			var pinS3 = Blockly.Arduino.valueToCode(this, 'PIN_S3', Blockly.Arduino.ORDER_ATOMIC);
			var pinOUT = Blockly.Arduino.valueToCode(this, 'PIN_OUT', Blockly.Arduino.ORDER_ATOMIC);
			var colour = this.getFieldValue('COLOR');
			if (colour ==='#ffffff'|| colour ==='#FFFFFF')
			  Blockly.Arduino.definitions_['define_colour_white'] = JST['dyor_definitions_colour_white']({});
			else if (colour ==='#ff0000' || colour ==='#FF0000')
			  Blockly.Arduino.definitions_['define_colour_red'] = JST['dyor_definitions_colour_red']({});
			else if (colour ==='#00ff00' || colour ==='#00FF00')
			  Blockly.Arduino.definitions_['define_colour_green'] = JST['dyor_definitions_colour_green']({});
			else if (colour ==='#0000ff' || colour ==='#0000FF')
			  Blockly.Arduino.definitions_['define_colour_blue'] = JST['dyor_definitions_colour_blue']({});

			Blockly.Arduino.setups_['inout_digital_output' + pinS0] = JST['inout_digital_output']({'pin': pinS0});
			Blockly.Arduino.setups_['inout_digital_setups' + pinS0]=JST['inout_digital_write']({'pin': pinS0,'state': 'HIGH'});
			Blockly.Arduino.setups_['inout_digital_output' + pinS1] = JST['inout_digital_output']({'pin': pinS1});
			Blockly.Arduino.setups_['inout_digital_setups' + pinS1]=JST['inout_digital_write']({'pin': pinS1,'state': 'LOW'});
			Blockly.Arduino.setups_['inout_digital_output' + pinS2] = JST['inout_digital_output']({'pin': pinS2});
			Blockly.Arduino.setups_['inout_digital_output' + pinS3] = JST['inout_digital_output']({'pin': pinS3});
			Blockly.Arduino.setups_['inout_digital_input' + pinOUT] = JST['inout_digital_input']({'pin': pinOUT});

			if (colour ==='#ffffff'|| colour ==='#FFFFFF')
			  code+='getRawColourWhite('+pinS2+','+pinS3+','+pinOUT+')';
			else if (colour ==='#ff0000' || colour ==='#FF0000')
			  code+='getRawColourRed('+pinS2+','+pinS3+','+pinOUT+')';
			else if (colour ==='#00ff00' || colour ==='#00FF00')
			  code+='getRawColourGreen('+pinS2+','+pinS3+','+pinOUT+')';
			else if (colour ==='#0000ff' || colour ==='#0000FF')
			  code+='getRawColourBlue('+pinS2+','+pinS3+','+pinOUT+')';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.rgb_raw_sensor = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_COLOR'),
			tags: ['rgb_sensor'],
			helpUrl: Facilino.getHelpUrl('rgb_raw_sensor'),
			examples: ['rgb_raw_sensor_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_COLOR,
			keys: ['LANG_RGB_RAW_SENSOR_NAME','LANG_RGB_RAW_SENSOR','LANG_RGB_LED_PIN_S0','LANG_RGB_LED_PIN_S1','LANG_RGB_LED_PIN_S2','LANG_RGB_LED_PIN_S3','LANG_RGB_LED_PIN_OUT','LANG_RGB_RAW_SENSOR_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_RGB_RAW_SENSOR_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_COLOR);
				var colour = new Blockly.FieldColour('#FFFFFF');
				colour.setColours(['#FFFFFF','#FF0000','#00FF00','#0000FF']).setColumns(1);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_RGB_RAW_SENSOR')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tcs3200.svg', 91*options.zoom, 63*options.zoom)).appendField(colour,'COLOR');
				this.appendValueInput('PIN_S0').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_S0')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN_S1').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_S1')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN_S2').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_S2')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN_S3').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_S3')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN_OUT').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_OUT')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_RGB_RAW_SENSOR_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='<value name="PIN_S0"><shadow type="pin_digital"></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="PIN_S1"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_S1"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>2)
					xml+='<value name="PIN_S2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[2][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_S2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>3)
					xml+='<value name="PIN_S3"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[3][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_S3"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>4)
					xml+='<value name="PIN_OUT"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[4][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_OUT"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				return xml;
			}
		};

		Blockly.Arduino.rgb_sensor = function() {
			var code = '';
			var pinS0 = Blockly.Arduino.valueToCode(this, 'PIN_S0', Blockly.Arduino.ORDER_ATOMIC);
			var pinS1 = Blockly.Arduino.valueToCode(this, 'PIN_S1', Blockly.Arduino.ORDER_ATOMIC);
			var pinS2 = Blockly.Arduino.valueToCode(this, 'PIN_S2', Blockly.Arduino.ORDER_ATOMIC);
			var pinS3 = Blockly.Arduino.valueToCode(this, 'PIN_S3', Blockly.Arduino.ORDER_ATOMIC);
			var pinOUT = Blockly.Arduino.valueToCode(this, 'PIN_OUT', Blockly.Arduino.ORDER_ATOMIC);
			var colour = this.getFieldValue('COLOR');

			Blockly.Arduino.definitions_['declare_var_define_colour'] = JST['dyor_colour_definitions_variables']({});
			Blockly.Arduino.definitions_['define_colour_white'] = JST['dyor_definitions_colour_white']({});
			Blockly.Arduino.definitions_['define_colour_red'] = JST['dyor_definitions_colour_red']({});
			Blockly.Arduino.definitions_['define_colour_green'] = JST['dyor_definitions_colour_green']({});
			Blockly.Arduino.definitions_['define_colour_blue'] = JST['dyor_definitions_colour_blue']({});
			Blockly.Arduino.definitions_['define_colour_readDetect'] = JST['dyor_definitions_colour_readDetect']({});

			Blockly.Arduino.setups_['inout_digital_output' + pinS0] = JST['inout_digital_output']({'pin': pinS0});
			Blockly.Arduino.setups_['inout_digital_setups' + pinS0]=JST['inout_digital_write']({'pin': pinS0,'state': 'HIGH'});
			Blockly.Arduino.setups_['inout_digital_output' + pinS1] = JST['inout_digital_output']({'pin': pinS1});
			Blockly.Arduino.setups_['inout_digital_setups' + pinS1]=JST['inout_digital_write']({'pin': pinS1,'state': 'LOW'});
			Blockly.Arduino.setups_['inout_digital_output' + pinS2] = JST['inout_digital_output']({'pin': pinS2});
			Blockly.Arduino.setups_['inout_digital_output' + pinS3] = JST['inout_digital_output']({'pin': pinS3});
			Blockly.Arduino.setups_['inout_digital_input_' + pinOUT] = JST['inout_digital_input']({'pin': pinOUT});
			code+='readDetectColor('+pinS2+','+pinS3+','+pinOUT+')';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.rgb_sensor = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_COLOR'),
			tags: ['rgb_sensor'],
			helpUrl: Facilino.getHelpUrl('rgb_sensor'),
			examples: ['rgb_sensor_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_COLOR,
			keys: ['LANG_RGB_SENSOR_NAME','LANG_RGB_SENSOR','LANG_RGB_LED_PIN_S0','LANG_RGB_LED_PIN_S1','LANG_RGB_LED_PIN_S2','LANG_RGB_LED_PIN_S3','LANG_RGB_LED_PIN_OUT','LANG_RGB_SENSOR_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_RGB_SENSOR_NAME'),
			//rgb led initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_COLOR);
				this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/color.png', 20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_RGB_SENSOR')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tcs3200.svg', 91*options.zoom, 63*options.zoom));
				this.appendValueInput('PIN_S0').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_S0')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN_S1').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_S1')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN_S2').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_S2')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN_S3').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_S3')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN_OUT').appendField(Facilino.locales.getKey('LANG_RGB_LED_PIN_OUT')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,'ColorDetect');
				this.setTooltip(Facilino.locales.getKey('LANG_RGB_SENSOR_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='<value name="PIN_S0"><shadow type="pin_digital"></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="PIN_S1"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_S1"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>2)
					xml+='<value name="PIN_S2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[2][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_S2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>3)
					xml+='<value name="PIN_S3"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[3][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_S3"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>4)
					xml+='<value name="PIN_OUT"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[4][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_OUT"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				return xml;
			}
		};

		Blockly.Arduino.rgb_classify = function() {
			// Color classify if's conditions.
			var n = 1;
			var color_input = Blockly.Arduino.valueToCode(this,'COLOR_INPUT',Blockly.Arduino.ORDER_ATOMIC);
			var argument, branch, loop, loop_code,case2_argument,case2_code;
			//Blockly.Arduino.definitions_['declare_var_define_color'] = 'int _color_classifier=-1;\n';
			//var code = '_color_classifier='+color_input+';\n';
			var code = 'switch('+color_input+'){\n';
			for (n=1;n<this.itemCount_;n++){
				argument = Blockly.Arduino.valueToCode(this, 'DATA' + n, Blockly.Arduino.ORDER_NONE);
				branch = Blockly.Arduino.statementToCode(this, 'ITEM' + n);
				branch = branch.substring(0, branch.length - 1);
				code+='  case '+argument+':\n';
				code+=branch;
				code+='	break;\n';
			}
			code+='  default: break;\n';
			code+='}\n';
			return code;
		};

		Blockly.Blocks.rgb_classify = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_COLOR'),
			tags: ['bluetooth'],
			helpUrl: Facilino.getHelpUrl('rgb_classify'),
			examples: ['rgb_sensor_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_COLOR,
			keys: ['LANG_RGB_CLASSIFY_NAME','LANG_RGB_CLASSIFY','LANG_RGB_CLASSIFY_TOOLTIP','LANG_RGB_CLASSIFY_COLOR','LANG_RGB_CLASSIFY_DO'],
			name: Facilino.locales.getKey('LANG_RGB_CLASSIFY_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_COLOR);
				this.appendValueInput('COLOR_INPUT').setCheck('ColorDetect').appendField(Facilino.locales.getKey('LANG_RGB_CLASSIFY')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/color.png', 20*options.zoom, 20*options.zoom));
				this.appendValueInput('DATA1').setCheck('Color').appendField(Facilino.locales.getKey('LANG_RGB_CLASSIFY_COLOR')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('ITEM1').appendField(Facilino.locales.getKey('LANG_RGB_CLASSIFY_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setMutator(new Blockly.Mutator(['rgb_classify_color_item']));
				this.itemCount_ = 1;
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_RGB_CLASSIFY_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='<value name="COLOR_INPUT"><block type="rgb_sensor"><value name="PIN_S0"><shadow type="pin_digital"></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="PIN_S1"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_S1"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>2)
					xml+='<value name="PIN_S2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[2][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_S2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>3)
					xml+='<value name="PIN_S3"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[3][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_S3"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>4)
					xml+='<value name="PIN_OUT"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[4][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_OUT"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				xml+='</block></value><value name="DATA1"><shadow type="rgb_colour"></shadow></value>';
				return xml;
			},
		mutationToDom: function() {
				if (!this.itemCount_ ) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.itemCount_) {
					container.setAttribute('item', this.itemCount_);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.itemCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
				for (var x = 2; x <= this.itemCount_; x++) {
				this.appendValueInput('DATA' + x).setCheck('Color').appendField(Facilino.locales.getKey('LANG_RGB_CLASSIFY_COLOR')).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.appendStatementInput('ITEM' + x).appendField(Facilino.locales.getKey('LANG_RGB_CLASSIFY_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('rgb_classify_color_stack');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				var itemBlock = workspace.newBlock('rgb_classify_color_item');
				itemBlock.initSvg();
				connection.connect(itemBlock.previousConnection);
				connection = itemBlock.nextConnection;
				for (var x = 2; x <= this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('rgb_classify_color_item');
					itemBlock.initSvg();
					connection.connect(itemBlock.previousConnection);
					connection = itemBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the items input blocks and remove the inputs.
				for (var x = this.itemCount_; x > 1; x--) {
					this.removeInput('DATA' + x);
					this.removeInput('ITEM' + x);
				}
				this.itemCount_ = 1;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				if (clauseBlock)
				{
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
					while (clauseBlock) {
						switch (clauseBlock.type) {
							case 'rgb_classify_color_item':
								this.itemCount_++;
								this.setInputsInline(false);
								var dataInput = this.appendValueInput('DATA' + this.itemCount_).setCheck('Color').appendField(Facilino.locales.getKey('LANG_RGB_CLASSIFY_COLOR')).setAlign(Blockly.ALIGN_RIGHT);
								var itemInput = this.appendStatementInput('ITEM' + this.itemCount_).appendField(Facilino.locales.getKey('LANG_RGB_CLASSIFY_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
								// Reconnect any child blocks.
								if (clauseBlock.valueConnection_) {
									dataInput.connection.connect(clauseBlock.valueConnection_);
								}
								if (clauseBlock.statementConnection_) {
									itemInput.connection.connect(clauseBlock.statementConnection_);
								}
								break;
							default:
								throw 'Unknown block type.';
						}
						clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
					}
				}
			},
			saveConnections: function(containerBlock) {
				// Store a pointer to any connected child blocks.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				var x = 2;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'rgb_classify_color_item':
							var inputData = this.getInput('DATA' + x);
							var inputItem = this.getInput('ITEM' + x);
							clauseBlock.valueConnection_ =
								inputData && inputData.connection.targetConnection;
							clauseBlock.statementConnection_ =
								inputItem && inputItem.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			}
		};


	Blockly.Blocks.rgb_classify_color_stack = {
			// App
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_COLOR,
			keys: ['LANG_RGB_CLASSIFY_STACK','LANG_RGB_CLASSIFY_STACK_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_COLOR);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_RGB_CLASSIFY_STACK')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('color_item');
				this.setTooltip(Facilino.locales.getKey('LANG_RGB_CLASSIFY_STACK_TOOLTIP'));
				this.contextMenu = false;
			},
			onchange: function()
			{
				var clauseBlock = this.getInputTargetBlock('STACK');
				if (clauseBlock===null)
				{
					var blocks=this.workspace.getAllBlocks();
					if (blocks[0].type==='rgb_classify_color_stack')
						blocks[0].getInput('STACK').connection.connect(blocks[1].previousConnection);
				}
			}
		};

	Blockly.Blocks.rgb_classify_color_item = {
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_COLOR,
			keys: ['LANG_RGB_CLASSIFY_COLOR','LANG_RGB_CLASSIFY_COLOR_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_COLOR);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_RGB_CLASSIFY_COLOR')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'color_item');
				this.setNextStatement(true,'color_item');
				this.setTooltip(Facilino.locales.getKey('LANG_RGB_CLASSIFY_COLOR_TOOLTIP'));
		this.contextMenu = false;
			}
		};

		Blockly.Arduino.rgb_colour = function() {
				var code='';
				var color = this.getFieldValue('COLOR')
				if (color === '#000000') {
					code = '0';
				}
				else if (color ==='#ffffff' || color === '#FFFFFF') {
					code = '1';
				}
				else if (color ==='#ff0000' || color === '#FF0000') {
					code = '2';
				}
				else if (color ==='#007f00' || color === '#007F00') {
					code = '3';
				}
				else if (color ==='#00007f' || color === '#00007F') {
					code = '4';
				}
				else if (color ==='#ffff00' || color === '#FFFF00') {
					code = '5';
				}
				else if (color ==='#ff00ff' || color === '#FF00FF') {
					code = '6';
				}
				else if (color ==='#55ff55' || color === '#55FF55') {
					code = '7';
				}
				else if (color ==='#5555ff' || color === '#5555FF') {
					code = '8';
				}
				else if (color ==='#7f007f' || color === '#7F007F') {
					code = '9';
				}
				else if (color ==='#ff6600' || color === '#FF6600') {
					code = '10';
				}

			return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.rgb_colour = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_COLOR'),
			tags: ['rgb_sensor'],
			helpUrl: Facilino.getHelpUrl('rgb_colour'),
			examples: ['rgb_sensor_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_COLOR,
			keys: ['LANG_RGB_COLOUR_NAME','LANG_RGB_COLOUR_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_RGB_COLOUR_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_COLOR);
				//var colour = new Blockly.FieldColour('#FFFFFF');
				//colour.setColours(['#FFFFFF','#FF0000','#00FF00','#0000FF']).setColumns(1);
				var colour = new Blockly.FieldColour('#000000');
				colour.setColours(['#000000','#FFFFFF','#FF0000','#007F00','#00007F','#FFFF00','#FF00FF','#55FF55','#5555FF','#7F007F','#FF6600']).setColumns(1);
				this.appendDummyInput('').appendField(colour,'COLOR');
				this.setInputsInline(true);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,'Color');
				this.setTooltip(Facilino.locales.getKey('LANG_RGB_COLOUR_TOOLTIP'));
			}
		};
		}
	
	}
	
	var FacilinoColor = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoColor;
	} else {
		window.FacilinoColor = FacilinoColor;
	}
}));
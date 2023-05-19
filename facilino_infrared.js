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
			var infrared_category=Facilino.locales.getKey('LANG_CATEGORY_LIGHT');
			var infrared_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_INFRARED');
			var infrared_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_INFRARED');
			var infrared_cat_colour=Facilino.LANG_COLOUR_LIGHT;
			var infrared_analog_colour=Facilino.LANG_COLOUR_LIGHT_INFRARED;
			var infrared_digital_colour=Facilino.LANG_COLOUR_LIGHT_INFRARED;
		}
		else
		{
			var infrared_category=Facilino.locales.getKey('LANG_CATEGORY_ADVANCED');
			var infrared_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG');
			var infrared_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL');
			var infrared_cat_colour=Facilino.LANG_COLOUR_ADVANCED;
			var infrared_analog_colour=Facilino.LANG_COLOUR_ADVANCED_ANALOG;
			var infrared_digital_colour=Facilino.LANG_COLOUR_ADVANCED_DIGITAL;
		}
		
	Blockly.Arduino.dyor_infrared = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';
			code += JST['inout_analog_read']({'pin': pin});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};


		Blockly.Blocks.dyor_infrared = {
			category: infrared_category,
			subcategory: infrared_analog_subcategory,
			tags: ['infrared','light'],
			helpUrl: Facilino.getHelpUrl('dyor_infrared'),
			examples: ['dyor_infrared_example.bly'],
			category_colour: infrared_cat_colour,
			colour: infrared_analog_colour,
			//infrared initialization
			keys: ['LANG_INFRARED_ANALOG_NAME','LANG_INFRARED','LANG_INFRARED_PIN','LANG_INFRARED_ANALOG_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_INFRARED_ANALOG_NAME'),
			init: function() {
				this.setColour(infrared_analog_colour);
		this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/light_diode.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_INFRARED')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/TCRT5000.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_INFRARED_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/analog_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,[Number,'LineFollowing']);
				this.setTooltip(Facilino.locales.getKey('LANG_INFRARED_ANALOG_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_analog"></shadow></value>';
			}
		};

	Blockly.Arduino.dyor_infrared_digital = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';
			Blockly.Arduino.setups_['inout_digital_input' + pin] = JST['inout_digital_input']({'pin': pin});
			code += JST['inout_digital_read']({'pin': pin});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};


		Blockly.Blocks.dyor_infrared_digital = {
			category: infrared_category,
			subcategory: infrared_digital_subcategory,
			tags: ['infrared','light'],
			helpUrl: Facilino.getHelpUrl('dyor_infrared_digital'),
			examples: ['dyor_infrared_digital_example.bly'],
			category_colour: infrared_cat_colour,
			colour: infrared_digital_colour,
			keys: ['LANG_INFRARED_DIGITAL_NAME','LANG_INFRARED','LANG_INFRARED_PIN','LANG_INFRARED_DIGITAL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_INFRARED_DIGITAL_NAME'),
			init: function() {
				this.setColour(infrared_digital_colour);
		this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/light_diode.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_INFRARED')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/TCRT5000.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_INFRARED_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_INFRARED_DIGITAL_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_digital"></shadow></value>';
			}
		};
		
		/*if (window.FacilinoAdvanced===false)
		{
			delete Blockly.Blocks.dyor_infrared_digital.subcategory;
			delete Blockly.Blocks.dyor_infrared.subcategory;
		}*/

	if (window.FacilinoAdvanced===true)
	{
	Blockly.Arduino.infrarred_follow = function() {
		var light = Blockly.Arduino.valueToCode(this, 'LIGHT', Blockly.Arduino.ORDER_ATOMIC);
			var gain = Blockly.Arduino.valueToCode(this, 'GAIN', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			//Blockly.Arduino.definitions_['include_line_following'] = JST['infrarred_follow_definitions_include']({});
			Blockly.Arduino.definitions_['define_line_following'] = 'int follow(int light, int gain)\n{\n  return (int)(((float)(gain)/100.0)*((float)(('+this.getFieldValue('BLACK')+'-'+this.getFieldValue('WHITE')+')/2+'+this.getFieldValue('WHITE')+')-(float)(light)));\n}\n';

			code += 'follow('+light+','+gain+')';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

	Blockly.Blocks.infrarred_follow = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_INFRARED'),
			tags: ['light','linefollowing'],
			helpUrl: Facilino.getHelpUrl('infrarred_follow'),
			examples: ['infrarred_follow_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_INFRARED,
			keys: ['LANG_LINE_FOLLOWING_LIGHT_NAME','LANG_LINE_FOLLOWING_LIGHT','LANG_LINE_FOLLOWING_GAIN','LANG_LINE_FOLLOWING_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LINE_FOLLOWING_LIGHT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_INFRARED);
				this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/turn.svg", 20*options.zoom, 20*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING'));
				this.appendValueInput('LIGHT').appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING_LIGHT')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/light_diode.svg",24*options.zoom,24*options.zoom)).setCheck('LineFollowing').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('GAIN').appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING_GAIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/knob.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLACK')).appendField(new Blockly.FieldNumber(800,0,4096),'BLACK').appendField(Facilino.locales.getKey('LANG_WHITE')).appendField(new Blockly.FieldNumber(30,0,4096),'WHITE');
				this.setInputsInline(false);
				this.setOutput(true,[Number,'Turn']);
					this.setTooltip(Facilino.locales.getKey('LANG_LINE_FOLLOWING_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="LIGHT"><block type="dyor_infrared"><value name="PIN"><shadow type="pin_analog"></shadow></value></block></value><value name="GAIN"><shadow type="math_number"><field name="NUM">10</field></shadow></value>';
			}
		};

	Blockly.Arduino.infrarred_follow_binary = function() {
		var light = Blockly.Arduino.valueToCode(this, 'LIGHT', Blockly.Arduino.ORDER_ATOMIC);
			var white = Blockly.Arduino.statementToCode(this,'WHITE');
		var grey = Blockly.Arduino.statementToCode(this,'GREY');
		var black = Blockly.Arduino.statementToCode(this,'BLACK');
			var code = '';

			code += 'if('+light+'<(0.4*('+this.getFieldValue('BLACK')+'-'+this.getFieldValue('WHITE')+')+'+this.getFieldValue('WHITE')+'))\n{\n'+white+	'}\nelse if('+light+	'<(0.6*('+this.getFieldValue('BLACK')+'-'+this.getFieldValue('WHITE')+')+'+this.getFieldValue('WHITE')+'))\n{\n'+grey+	'}\nelse\n{'+black+			'\n}';
			return code;
		};

	Blockly.Blocks.infrarred_follow_binary = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_INFRARED'),
			tags: ['light','linefollowing'],
			helpUrl: Facilino.getHelpUrl('infrarred_follow_binary'),
			examples: ['infrarred_follow_binary_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_INFRARED,
			keys: ['LANG_LINE_FOLLOWING_LIGHT_BINARY_NAME','LANG_LINE_FOLLOWING_LIGHT','LANG_BLACK','LANG_GRAY','LANG_WHITE','LANG_LINE_FOLLOWING_BINARY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LINE_FOLLOWING_LIGHT_BINARY_NAME'),
			init: function() {
		this.setColour(Facilino.LANG_COLOUR_LIGHT_INFRARED);
		this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/turn.svg", 20*options.zoom, 20*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING'));
		this.appendValueInput('LIGHT').appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING_LIGHT')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/light_diode.svg",24*options.zoom,24*options.zoom)).setCheck('LineFollowing').setAlign(Blockly.ALIGN_RIGHT);
		this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_WHITE')).appendField(new Blockly.FieldNumber(800,0,4096),'WHITE').appendField(Facilino.locales.getKey('LANG_BLACK')).appendField(new Blockly.FieldNumber(30,0,4096),'BLACK');
				this.appendStatementInput('BLACK').appendField(Facilino.locales.getKey('LANG_BLACK')).setCheck('code');
		this.appendStatementInput('GREY').appendField(Facilino.locales.getKey('LANG_GRAY')).setCheck('code');
		this.appendStatementInput('WHITE').appendField(Facilino.locales.getKey('LANG_WHITE')).setCheck('code');
		this.setInputsInline(false);
		this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
			this.setTooltip(Facilino.locales.getKey('LANG_LINE_FOLLOWING_BINARY_TOOLTIP'));
			}
			,
			default_inputs: function ()
			{
				return '<value name="LIGHT"><block type="dyor_infrared"><value name="PIN"><shadow type="pin_analog"></shadow></value></block></value>';
			}
			
		};
	}
	
	}
	
	var FacilinoInfraRed = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoInfraRed;
	} else {
		window.FacilinoInfraRed = FacilinoInfraRed;
	}
}));
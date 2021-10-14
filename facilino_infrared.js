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
		this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/light_diode.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_INFRARED')).appendField(new Blockly.FieldImage('img/blocks/TCRT5000.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_INFRARED_PIN')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,[Number,'LineFollowing']);
				this.setTooltip(Facilino.locales.getKey('LANG_INFRARED_ANALOG_TOOLTIP'));
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
		this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/light_diode.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_INFRARED')).appendField(new Blockly.FieldImage('img/blocks/TCRT5000.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_INFRARED_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_INFRARED_DIGITAL_TOOLTIP'));
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
		Blockly.Arduino.definitions_['declare_var_define_light_following'] = JST['infrarred_follow_definitions_variables']({});

		Blockly.Arduino.definitions_['define_line_following'] = JST['follow_definitions']({});

		code += JST['infrarred_follow']({
				'light': light,
				'gain': gain
			});

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
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/turn.svg", 20*options.zoom, 20*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING'));
				this.appendValueInput('LIGHT').appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING_LIGHT')).appendField(new Blockly.FieldImage("img/blocks/light_diode.svg",24*options.zoom,24*options.zoom)).setCheck('LineFollowing').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('GAIN').appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING_GAIN')).appendField(new Blockly.FieldImage("img/blocks/knob.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
						this.setInputsInline(false);
				this.setOutput(true,[Number,'Turn']);
					this.setTooltip(Facilino.locales.getKey('LANG_LINE_FOLLOWING_TOOLTIP'));
					}
		};

	Blockly.Arduino.infrarred_follow_binary = function() {
		var light = Blockly.Arduino.valueToCode(this, 'LIGHT', Blockly.Arduino.ORDER_ATOMIC);
			var white = Blockly.Arduino.statementToCode(this,'WHITE');
		var grey = Blockly.Arduino.statementToCode(this,'GREY');
		var black = Blockly.Arduino.statementToCode(this,'BLACK');
			var code = '';

		Blockly.Arduino.definitions_['declare_var_define_light_following'] = JST['infrarred_follow_definitions_variables']({});

		code += JST['infrarred_follow_binary']({
				'light': light,
				'white': white,
		'gray' : grey,
		'black' : black
			});

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
		this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/turn.svg", 20*options.zoom, 20*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING'));
		this.appendValueInput('LIGHT').appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING_LIGHT')).appendField(new Blockly.FieldImage("img/blocks/light_diode.svg",24*options.zoom,24*options.zoom)).setCheck('LineFollowing').setAlign(Blockly.ALIGN_RIGHT);
		this.appendStatementInput('BLACK').appendField(Facilino.locales.getKey('LANG_BLACK')).setCheck('code');
		this.appendStatementInput('GREY').appendField(Facilino.locales.getKey('LANG_GRAY')).setCheck('code');
		this.appendStatementInput('WHITE').appendField(Facilino.locales.getKey('LANG_WHITE')).setCheck('code');
		this.setInputsInline(false);
		this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
			this.setTooltip(Facilino.locales.getKey('LANG_LINE_FOLLOWING_BINARY_TOOLTIP'));
			}
		};

	Blockly.Arduino.dyor_white = function() {
			Blockly.Arduino.definitions_['declare_var_define_light_following'] = JST['infrarred_follow_definitions_variables']({});

		code = '(_white)';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

	Blockly.Blocks.dyor_white = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_INFRARED'),
			tags: ['light'],
			helpUrl: Facilino.getHelpUrl('dyor_white'),
			examples: ['dyor_infrared_calibration_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_INFRARED,
			keys: ['LANG_WHITE_NAME','LANG_WHITE','LANG_LINE_FOLLOWING_WHITE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_WHITE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_INFRARED);
				this.appendDummyInput('LIGHT').appendField(Facilino.locales.getKey('LANG_WHITE')).appendField(new Blockly.FieldImage("img/blocks/bright-light-bulb.svg",24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_LINE_FOLLOWING_WHITE_TOOLTIP'));
			}
		};

	Blockly.Arduino.dyor_black = function() {
			Blockly.Arduino.definitions_['declare_var_define_light_following'] = JST['infrarred_follow_definitions_variables']({});

		code = '(_black)';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

	Blockly.Blocks.dyor_black = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_INFRARED'),
			tags: ['light'],
			helpUrl: Facilino.getHelpUrl('dyor_black'),
			examples: ['dyor_infrared_calibration_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_INFRARED,
			keys: ['LANG_BLACK_NAME','LANG_BLACK','LANG_LINE_FOLLOWING_BLACK_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BLACK_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_INFRARED);
				this.appendDummyInput('LIGHT').appendField(Facilino.locales.getKey('LANG_BLACK')).appendField(new Blockly.FieldImage("img/blocks/light-bulb.svg",24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_LINE_FOLLOWING_BLACK_TOOLTIP'));
			}
		};


	Blockly.Arduino.infrarred_white = function() {
		var light = Blockly.Arduino.valueToCode(this, 'LIGHT', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['declare_var_define_light_following'] = JST['infrarred_follow_definitions_variables']({});

		code = JST['infrarred_white']({
				'white': light
			});

			return code;
		};

	Blockly.Blocks.infrarred_white = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_INFRARED'),
			tags: ['light'],
			helpUrl: Facilino.getHelpUrl('infrarred_white'),
			examples: ['dyor_infrared_calibration_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_INFRARED,
			keys: ['LANG_LINE_FOLLOWING_WHITE_NAME','LANG_LINE_FOLLOWING_WHITE','LANG_LINE_FOLLOWING_CALIBRATE_WHITE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LINE_FOLLOWING_WHITE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_INFRARED);
				this.appendValueInput('LIGHT').appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING_WHITE')).appendField(new Blockly.FieldImage("img/blocks/bright-light-bulb.svg",24*options.zoom,24*options.zoom)).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
						this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_LINE_FOLLOWING_CALIBRATE_WHITE_TOOLTIP'));
			}
		};

	Blockly.Arduino.infrarred_black = function() {
		var light = Blockly.Arduino.valueToCode(this, 'LIGHT', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['declare_var_define_light_following'] = JST['infrarred_follow_definitions_variables']({});
		code = JST['infrarred_black']({
				'black': light
			});

			return code;
		};

	Blockly.Blocks.infrarred_black = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_INFRARED'),
			tags: ['light'],
			helpUrl: Facilino.getHelpUrl('infrarred_black'),
			examples: ['dyor_infrared_calibration_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_INFRARED,
			keys: ['LANG_LINE_FOLLOWING_BLACK_NAME','LANG_LINE_FOLLOWING_BLACK','LANG_LINE_FOLLOWING_CALIBRATE_BLACK_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LINE_FOLLOWING_BLACK_NAME'),
			init: function() {
		this.setColour(Facilino.LANG_COLOUR_LIGHT_INFRARED);
		this.appendValueInput('LIGHT').appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING_BLACK')).appendField(new Blockly.FieldImage("img/blocks/light-bulb.svg",24*options.zoom,24*options.zoom)).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
		this.setInputsInline(true);
		this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
			this.setTooltip(Facilino.locales.getKey('LANG_LINE_FOLLOWING_CALIBRATE_BLACK_TOOLTIP'));
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
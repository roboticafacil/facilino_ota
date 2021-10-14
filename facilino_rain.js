(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	Blockly.Arduino.ambient_raindrop = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';

			code += JST['inout_analog_read']({
				'pin': pin
			});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};
		
		if (window.FacilinoAdvanced===true)
		{
			var rain_category=Facilino.locales.getKey('LANG_CATEGORY_AMBIENT');
			var rain_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_RAIN');
			var rain_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_RAIN');
			var rain_cat_colour=Facilino.LANG_COLOUR_AMBIENT;
			var rain_analog_colour=Facilino.LANG_COLOUR_AMBIENT_RAIN;
			var rain_digital_colour=Facilino.LANG_COLOUR_AMBIENT_RAIN;
		}
		else
		{
			var rain_category=Facilino.locales.getKey('LANG_CATEGORY_ADVANCED');
			var rain_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG');
			var rain_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL');
			var rain_cat_colour=Facilino.LANG_COLOUR_ADVANCED;
			var rain_analog_colour=Facilino.LANG_COLOUR_ADVANCED_ANALOG;
			var rain_digital_colour=Facilino.LANG_COLOUR_ADVANCED_DIGITAL;
		}

		Blockly.Blocks.ambient_raindrop = {
			category: rain_category,
			subcategory: rain_analog_subcategory,
			tags: ['raindrop','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_raindrop'),
			examples: ['ambient_raindrop_example','ambient_raindrop_alarm_example'],
			category_colour: rain_cat_colour,
			colour: rain_analog_colour,
			keys: ['LANG_RAINDROP_ANALOG_NAME','LANG_RAINDROP_ANALOG_DESCRIPTION','LANG_RAINDROP_ANALOG_INPUT_PIN','LANG_RAINDROP_ANALOG_OUTPUT','LANG_RAINDROP','LANG_RAINDROP_PIN','LANG_RAINDROP_ANALOG_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_RAINDROP_ANALOG_NAME'),
			description: Facilino.locales.getKey('LANG_RAINDROP_ANALOG_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_RAINDROP_ANALOG_INPUT_PIN')],
			output: Facilino.locales.getKey('LANG_RAINDROP_ANALOG_OUTPUT'),
			init: function() {
				this.setColour(rain_analog_colour);
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/rain.png",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_RAINDROP')).appendField(new Blockly.FieldImage('img/blocks/yl_83.svg', 73*options.zoom, 49*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_RAINDROP_PIN')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_RAINDROP_ANALOG_TOOLTIP'));
			}
		};

		Blockly.Arduino.ambient_raindrop_digital = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';
			Blockly.Arduino.setups_['inout_digital_input' + pin] = JST['inout_digital_input']({'pin': pin});
			code += JST['inout_digital_read']({'pin': pin});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};


		Blockly.Blocks.ambient_raindrop_digital = {
			category: rain_category,
			subcategory: rain_digital_subcategory,
			tags: ['raindrop_sensor','meteo'],
			helpUrl: Facilino.getHelpUrl('ambient_raindrop_digital'),
			examples: ['ambient_raindrop_example'],
			category_colour: rain_cat_colour,
			colour: rain_digital_colour,
			keys: ['LANG_RAINDROP_DIGITAL_NAME','LANG_RAINDROP_DIGITAL_DESCRIPTION','LANG_RAINDROP_DIGITAL_INPUT_PIN','LANG_RAINDROP_DIGITAL_OUTPUT','LANG_RAINDROP','LANG_RAINDROP_PIN','LANG_RAINDROP_DIGITAL_TOOPTIP'],
			name: Facilino.locales.getKey('LANG_RAINDROP_DIGITAL_NAME'),
			description: Facilino.locales.getKey('LANG_RAINDROP_DIGITAL_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_RAINDROP_DIGITAL_INPUT_PIN')],
			output: Facilino.locales.getKey('LANG_RAINDROP_DIGITAL_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_AMBIENT_RAIN);
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/rain.png",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_RAINDROP')).appendField(new Blockly.FieldImage('img/blocks/yl_83.svg', 73*options.zoom, 49*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_RAINDROP_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_RAINDROP_DIGITAL_TOOPTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.ambient_raindrop_alarm = function() {
			var code = '';
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var rain = Blockly.Arduino.statementToCode(this,'RAIN') || '';
			var wet = Blockly.Arduino.statementToCode(this,'WET') || '';
			var dry = Blockly.Arduino.statementToCode(this,'DRY') || '';
			Blockly.Arduino.definitions_['declare_var_define_raindrop'+pin]=JST['raindrop_definitions_variables']({pin : pin});
			code += JST['raindrop_alarm']({pin: pin, wet: wet, rain: rain, dry: dry});
			return code;
		};

		Blockly.Blocks.ambient_raindrop_alarm = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_RAIN'),
			tags: ['raindrop','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_raindrop_alarm'),
			examples: ['ambient_raindrop_alarm_example'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_RAIN,
			keys: ['LANG_RAINDROP_LEVEL_NAME','LANG_RAINDROP_LEVEL_DESCRIPTION','LANG_RAINDROP_LEVEL_INPUT_PIN','LANG_RAINDROP_LEVEL_STATEMENT_INTENSE_RAIN','LANG_RAINDROP_LEVEL_STATEMENT_SOFT_RAIN','LANG_RAINDROP_LEVEL_STATEMENT_NO_RAIN','LANG_RAINDROP_LEVEL','LANG_RAINDROP_PIN','LANG_RAINDROP_LEVEL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_RAINDROP_LEVEL_NAME'),
			description: Facilino.locales.getKey('LANG_RAINDROP_LEVEL_DESCRIPTION'),
			additional: ['ambient_raindrop_set_alarm'],
			inputs: [Facilino.locales.getKey('LANG_RAINDROP_LEVEL_INPUT_PIN')],
			statements: [Facilino.locales.getKey('LANG_RAINDROP_LEVEL_STATEMENT_INTENSE_RAIN'),Facilino.locales.getKey('LANG_RAINDROP_LEVEL_STATEMENT_SOFT_RAIN'),Facilino.locales.getKey('LANG_RAINDROP_LEVEL_STATEMENT_NO_RAIN')],
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_RAIN);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_RAINDROP_LEVEL')).appendField(new Blockly.FieldImage("img/blocks/yl_83.svg",73*options.zoom,49*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_RAINDROP_PIN')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('RAIN').appendField(new Blockly.FieldImage("img/blocks/rain_drop.png", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('WET').appendField(new Blockly.FieldImage("img/blocks/wet.png", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('DRY').appendField(new Blockly.FieldImage("img/blocks/sun.png", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				//this.setOutput(true, Number);
		this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_RAINDROP_LEVEL_TOOLTIP'));
			}
		};

		Blockly.Arduino.ambient_raindrop_set_alarm = function() {
		var code='';
			var option = this.getFieldValue('OPTION');
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var value_pin = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['declare_var_define_raindrop'+pin]=JST['raindrop_definitions_variables']({pin : pin});
			code+='_raindrop_'+option+'_'+pin+'='+value_pin+';\n';

			return code;
		};

		Blockly.Blocks.ambient_raindrop_set_alarm = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_RAIN'),
			tags: ['raindrop','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_raindrop_set_alarm'),
			examples: ['ambient_raindrop_alarm_example'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_RAIN,
			keys: ['LANG_RAINDROP_SET_LEVEL_NAME','LANG_RAINDROP_LEVEL_SET','LANG_RAINDROP_LEVEL_RAIN','LANG_RAINDROP_LEVEL_WET','LANG_RAINDROP_PIN','LANG_RAINDROP_VALUE','LANG_RAINDROP_SET_LEVEL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_RAINDROP_SET_LEVEL_NAME'),
			description: Facilino.locales.getKey('LANG_RAINDROP_SET_LEVEL_DESCRIPTION'),
			additional: ['ambient_raindrop_alarm'],
			dropdown: [Facilino.locales.getKey('LANG_RAINDROP_SET_LEVEL_DROPDOWN_TYPE')],
			inputs: [Facilino.locales.getKey('LANG_RAINDROP_SET_LEVEL_INPUT_PIN')],
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_RAIN);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_RAINDROP_LEVEL_SET')||'Set').appendField(new Blockly.FieldDropdown([
		[Facilino.locales.getKey('LANG_RAINDROP_LEVEL_RAIN'), 'rain'],
		[Facilino.locales.getKey('LANG_RAINDROP_LEVEL_WET'), 'wet']
		]),'OPTION').appendField(new Blockly.FieldImage('img/blocks/yl_83.svg', 73*options.zoom, 49*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_RAINDROP_PIN')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_RAINDROP_VALUE')||'Value').setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
		this.setPreviousStatement(true,'code');
		this.setNextStatement(true,'code');
		this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_RAINDROP_SET_LEVEL_TOOLTIP'));
			},
			isVariable: function(varValue) {
				for (var i in Blockly.Variables.allUsedVariables) {
					if (Blockly.Variables.allUsedVariables[i] === varValue) {
						return true;
					}
				}
				return false;
			}
		};
		}
	}
	
	var FacilinoRain = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoRain;
	} else {
		window.FacilinoRain = FacilinoRain;
	}
}));
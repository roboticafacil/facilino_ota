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
			var ldr_category=Facilino.locales.getKey('LANG_CATEGORY_LIGHT');
			var ldr_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_LDR');
			var ldr_cat_colour=Facilino.LANG_COLOUR_LIGHT;
			var ldr_colour=Facilino.LANG_COLOUR_LIGHT_LDR;
		}
		else
		{
			var ldr_category=Facilino.locales.getKey('LANG_CATEGORY_ADVANCED');
			var ldr_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG');
			var ldr_cat_colour=Facilino.LANG_COLOUR_ADVANCED;
			var ldr_colour=Facilino.LANG_COLOUR_ADVANCED_ANALOG;
		}
	Blockly.Arduino.ldr_read = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';
			code += JST['inout_analog_read']({'pin': pin});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};


		Blockly.Blocks.ldr_read = {
			category: ldr_category,
			subcategory: ldr_subcategory,
			tags: ['infrared','light'],
			helpUrl: Facilino.getHelpUrl('ldr_read'),
			examples: [''],
			category_colour: ldr_cat_colour,
			colour: ldr_colour,
			//infrared initialization
			keys: ['LANG_LDR_READ_NAME','LANG_LDR_READ','LANG_LDR_PIN','LANG_LDR_READ_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LDR_READ_NAME'),
			init: function() {
				this.setColour(ldr_colour);
		this.appendValueInput('PIN').appendField(new Blockly.FieldImage("img/blocks/ldr.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_LDR_READ')).appendField(Facilino.locales.getKey('LANG_LDR_PIN')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",22*options.zoom, 22*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_LDR_READ_TOOLTIP'));
			}
		};
		
		/*if (window.FacilinoAdvanced===false)
		{
			delete Blockly.Blocks.ldr_read.subcategory;
		}*/

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.ldr_read_calibrated = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_rational_function'] = 'float rational(float x, float a, float b, float c, float d){\n return (a+b*x)/(1.0+c*x+d*x*x);\n}\n';
			Blockly.Arduino.definitions_['define_illuminance_function'] = 'float illuminance (float LDR) {\nfloat logLDR=log(LDR)/log(10);\n  float\nlogLux=rational(logLDR,0.60520301477,-0.199225473,-0.602130415,0.0897771308217);\n  return logLux;\n }\n';
			Blockly.Arduino.definitions_['declare_var_define_min_lux'] = 'float _min_lux=100;\n';
			Blockly.Arduino.definitions_['declare_var_define_max_lux'] = 'float _max_lux=4000;\n';

			var code = '';
			if ((Facilino.profiles['processor']=== 'ATmega328') || (Facilino.profiles['processor']=== 'ATmega2560') || (Facilino.profiles['processor']=== 'ATmega32U4'))
				code += 'max(0,min((map(pow(10,illuminance('+JST['inout_analog_read']({'pin': pin})+')),_min_lux,_max_lux,0,100)),100))';
			else if (Facilino.profiles['processor']=== 'ESP8266')
				code += '_max(0,_min((map(pow(10,illuminance('+JST['inout_analog_read']({'pin': pin})+')),_min_lux,_max_lux,0,100)),100))';
			else if (Facilino.profiles['processor']=== 'ESP32')
				code += '_max(0,_min((map(pow(10,illuminance(map('+JST['inout_analog_read']({'pin': pin})+',4095,1492,621,205))),_min_lux,_max_lux,0,100)),100))';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.ldr_read_calibrated = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LDR'),
			tags: ['infrared','light'],
			helpUrl: Facilino.getHelpUrl('ldr_read_calibrated'),
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_LDR,
			//infrared initialization
			keys: ['LANG_LDR_READ_CALIBRATED_NAME','LANG_LDR_READ_CALIBRATED','LANG_LDR_PIN','LANG_LDR_READ_CALIBRATED_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LDR_READ_CALIBRATED_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_LDR);
		this.appendValueInput('PIN').appendField(new Blockly.FieldImage("img/blocks/ldr.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_LDR_READ_CALIBRATED')).appendField(Facilino.locales.getKey('LANG_LDR_PIN')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",22*options.zoom, 22*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_LDR_READ_CALIBRATED_TOOLTIP'));
			}
		};

		Blockly.Arduino.ldr_read_lux = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_rational_function'] = 'float rational(float x, float a, float b, float c, float d){\n return (a+b*x)/(1.0+c*x+d*x*x);\n}\n';
			Blockly.Arduino.definitions_['define_illuminance_function'] = 'float illuminance (float LDR) {\nfloat logLDR=log(LDR)/log(10);\n  float\nlogLux=rational(logLDR,0.60520301477,-0.199225473,-0.602130415,0.0897771308217);\n  return logLux;\n }\n';
			var code = '';
			if ((Facilino.profiles['processor']=== 'ATmega328') || (Facilino.profiles['processor']=== 'ATmega2560') || (Facilino.profiles['processor']=== 'ATmega32U4')|| (Facilino.profiles['processor']==='ESP8266'))
				code += 'pow(10,illuminance('+JST['inout_analog_read']({'pin': pin})+'))';
			else if (Facilino.profiles['processor']=== 'ESP32')
				code += 'pow(10,illuminance(map('+JST['inout_analog_read']({'pin': pin})+',4095,1492,621,205)))';
				return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.ldr_read_lux = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LDR'),
			tags: ['infrared','light'],
			helpUrl: Facilino.getHelpUrl('ldr_read_lux'),
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_LDR,
			//infrared initialization
			keys: ['LANG_LDR_READ_LUX_NAME','LANG_LDR_READ_LUX','LANG_LDR_PIN','LANG_LDR_READ_LUX_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LDR_READ_LUX_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_LDR);
		this.appendValueInput('PIN').appendField(new Blockly.FieldImage("img/blocks/ldr.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_LDR_READ_LUX')).appendField(Facilino.locales.getKey('LANG_LDR_PIN')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",22*options.zoom, 22*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_LDR_READ_LUX_TOOLTIP'));
			}
		};

		Blockly.Arduino.ldr_max_lux = function() {
			var light = Blockly.Arduino.valueToCode(this, 'LIGHT', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['declare_var_define_max_lux'] = 'float _max_lux=4000;\n';
			code = '_max_lux='+light+';\n';
			return code;
		};

		Blockly.Blocks.ldr_max_lux = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LDR'),
			tags: ['light'],
			helpUrl: Facilino.getHelpUrl('ldr_max_lux'),
			examples: ['dyor_infrared_calibration_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_LDR,
			keys: ['LANG_LDR_MAX_LUX_NAME','LANG_LDR_MAX_LUX','LANG_LDR_MAX_LUX_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LDR_MAX_LUX_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_LDR);
				this.appendValueInput('LIGHT').appendField(Facilino.locales.getKey('LANG_LDR_MAX_LUX')).appendField(new Blockly.FieldImage("img/blocks/bright-light-bulb.svg",24*options.zoom,24*options.zoom)).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_LDR_MAX_LUX_TOOLTIP'));
			}
		};

		Blockly.Arduino.ldr_min_lux = function() {
			var light = Blockly.Arduino.valueToCode(this, 'LIGHT', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['declare_var_define_min_lux'] = 'float _min_lux=100;\n';
			code = '_min_lux='+light+';\n';
			return code;
		};

		Blockly.Blocks.ldr_min_lux = {
			category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LDR'),
			tags: ['light'],
			helpUrl: Facilino.getHelpUrl('ldr_min_lux'),
			examples: ['dyor_infrared_calibration_example.bly'],
			category_colour: Facilino.LANG_COLOUR_LIGHT,
			colour: Facilino.LANG_COLOUR_LIGHT_LDR,
			keys: ['LANG_LDR_MIN_LUX_NAME','LANG_LDR_MIN_LUX','LANG_LDR_MIN_LUX_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LDR_MIN_LUX_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LIGHT_LDR);
				this.appendValueInput('LIGHT').appendField(Facilino.locales.getKey('LANG_LDR_MIN_LUX')).appendField(new Blockly.FieldImage("img/blocks/light-bulb.svg",24*options.zoom,24*options.zoom)).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_LDR_MIN_LUX_TOOLTIP'));
			}
		};
		}
	
	}
	
	var FacilinoLDR = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoLDR;
	} else {
		window.FacilinoLDR = FacilinoLDR;
	}
}));
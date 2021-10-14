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
			var other_analog=Facilino.locales.getKey('LANG_SUBCATEGORY_OTHER');
			var other_digital=Facilino.locales.getKey('LANG_SUBCATEGORY_OTHER');
			var other_analog_colour=Facilino.LANG_COLOUR_ADVANCED_OTHER;
			var other_digital_colour=Facilino.LANG_COLOUR_ADVANCED_OTHER;
		}
		else
		{
			var other_analog=Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG');
			var other_digital=Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL');
			var other_analog_colour=Facilino.LANG_COLOUR_ADVANCED_ANALOG;
			var other_digital_colour=Facilino.LANG_COLOUR_ADVANCED_DIGITAL;
		}
	
	Blockly.Arduino.joystick_dir = function() {
			var pinx = Blockly.Arduino.valueToCode(this, 'PINX', Blockly.Arduino.ORDER_NONE);
			var piny = Blockly.Arduino.valueToCode(this, 'PINY', Blockly.Arduino.ORDER_NONE);
			var code = '';
			code = '57.295779513082320876798154814105*atan2((float)(analogRead('+pinx+')-512),(float)(analogRead('+piny+')-512))';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.joystick_dir = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: other_analog,
			tags: ['joystick'],
			helpUrl: Facilino.getHelpUrl('joystick_dir'),
			examples: ['joystick_dir_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: other_analog_colour,
			keys: ['LANG_BQ_JOYSTICK_DIR_NAME','LANG_BQ_JOYSTICK_DIR','LANG_BQ_JOYSTICK_PIN_X','LANG_BQ_JOYSTICK_PIN_Y','LANG_BQ_JOYSTICK_DIR_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BQ_JOYSTICK_DIR_NAME'),
			init: function() {
				this.setColour(other_analog_colour);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BQ_JOYSTICK_DIR')).appendField(new Blockly.FieldImage('img/blocks/joystick.png', 52*options.zoom, 24*options.zoom));
				this.appendValueInput('PINX').appendField(Facilino.locales.getKey('LANG_BQ_JOYSTICK_PIN_X')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('AnalogPin');
				this.appendValueInput('PINY').appendField(Facilino.locales.getKey('LANG_BQ_JOYSTICK_PIN_Y')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('AnalogPin');
				this.setOutput(true,Number);
				// this.setPreviousStatement(true, null);
				// this.setNextStatement(true, null);
				this.setTooltip(Facilino.locales.getKey('LANG_BQ_JOYSTICK_DIR_TOOLTIP'));
			}
		};

		Blockly.Arduino.joystick_mag = function() {
			var pinx = Blockly.Arduino.valueToCode(this, 'PINX', Blockly.Arduino.ORDER_ATOMIC);
			var piny = Blockly.Arduino.valueToCode(this, 'PINY', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			code = 'min(100,0.1953125*sqrt(pow((float)(analogRead('+pinx+')-512),2)+pow((float)(analogRead('+piny+')-512),2)))';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.joystick_mag = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: other_analog,
			tags: ['joystick'],
			helpUrl: Facilino.getHelpUrl('joystick_mag'),
			examples: ['joystick_dir_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: other_analog_colour,
			keys: ['LANG_BQ_JOYSTICK_MAG_NAME','LANG_BQ_JOYSTICK_MAG','LANG_BQ_JOYSTICK_PIN_X','LANG_BQ_JOYSTICK_PIN_Y','LANG_BQ_JOYSTICK_MAG_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BQ_JOYSTICK_MAG_NAME'),
			init: function() {
				this.setColour(other_analog_colour);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BQ_JOYSTICK_MAG')).appendField(new Blockly.FieldImage('img/blocks/joystick.png', 52*options.zoom, 24*options.zoom));
				this.appendValueInput('PINX').appendField(Facilino.locales.getKey('LANG_BQ_JOYSTICK_PIN_X')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('AnalogPin');
				this.appendValueInput('PINY').appendField(Facilino.locales.getKey('LANG_BQ_JOYSTICK_PIN_Y')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('AnalogPin');
				this.setOutput(true,Number);
				// this.setPreviousStatement(true, null);
				// this.setNextStatement(true, null);
				this.setTooltip(Facilino.locales.getKey('LANG_BQ_JOYSTICK_MAG_TOOLTIP'));
			}
		};

	Blockly.Arduino.dyor_31_in_1_rele = function() {
			var code = '';
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.setups_['inout_digital_output' + pin] = JST['inout_digital_output']({'pin': pin});
			code += JST['inout_digital_write']({'pin': pin,'state': value});
			return code;
		};

		Blockly.Blocks.dyor_31_in_1_rele = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: other_digital,
			tags: ['input','output','rele'],
			helpUrl: Facilino.getHelpUrl('dyor_31_in_1_rele'),
			examples: ['dyor_31_in_1_relay_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: other_digital_colour,
			keys: ['LANG_RELE_NAME','LANG_RELE','LANG_RELE_VALUE','LANG_RELE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_RELE_NAME'),
			init: function() {
				this.setColour(other_digital_colour);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_RELE')).appendField(new Blockly.FieldImage('img/blocks/relays.png', 52*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_RELE_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",22*options.zoom,22*options.zoom)).setCheck('DigitalPin');
		this.appendValueInput('VALUE').setCheck(Boolean).setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_RELE_VALUE')).setCheck([Boolean,'Variable']);
				this.setPreviousStatement('code');
				this.setNextStatement('code');
				this.setTooltip(Facilino.locales.getKey('LANG_RELE_TOOLTIP'));
			}
		};
	
	};
		
		
	var FacilinoInOutOthers = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoInOutOthers;
	} else {
		window.FacilinoInOutOthers = FacilinoInOutOthers;
	}
}));
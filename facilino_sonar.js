(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	Blockly.Arduino.dyor_us = function() {
			var echo_pin = Blockly.Arduino.valueToCode(this, 'RED PIN', Blockly.Arduino.ORDER_ATOMIC);
			var trigger_pin = Blockly.Arduino.valueToCode(this, 'BLUE PIN', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			
			if ((profiles['processor']==='ATmega328')||(profiles['processor']==='ATmega32U4')||(profiles['processor']==='ATmega2560')){
				Blockly.Arduino.definitions_['include_us'] = JST['dyor_us_definitions_include']({});
				Blockly.Arduino.definitions_['define_us_pulseIn'] = JST['dyor_us_definitions_pulseIn']({});
			}
			Blockly.Arduino.definitions_['define_us_init'] = JST['dyor_us_definitions_us_init']({});
			Blockly.Arduino.definitions_['define_us_distance'] = JST['dyor_us_definitions_distance']({});
			
			Blockly.Arduino.setups_['inout_digital_input' + echo_pin] = JST['inout_digital_input']({'pin': echo_pin});
			Blockly.Arduino.setups_['inout_digital_output' + trigger_pin] = JST['inout_digital_output']({'pin': trigger_pin});
			code += JST['dyor_us']({'trigger_pin': trigger_pin,'echo_pin': echo_pin});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.dyor_us = {
			category: Facilino.locales.getKey('LANG_CATEGORY_DISTANCE'),
			//subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ULTRASOUND'),
			tags: ['us','distance'],
			helpUrl: Facilino.getHelpUrl('dyor_us'),
			examples: ['dyor_us_example.bly'],
			category_colour: Facilino.LANG_COLOUR_DISTANCE,
			colour: Facilino.LANG_COLOUR_DISTANCE_ULTRASOUND,
			keys: ['LANG_US_NAME','LANG_US','LANG_US_ECHO_PIN','LANG_US_TRIGGER_PIN','LANG_US_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_US_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_DISTANCE_ULTRASOUND);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_US')).appendField(new Blockly.FieldImage('img/blocks/hc_sr04.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('RED PIN').appendField(Facilino.locales.getKey('LANG_US_ECHO_PIN')).appendField(new Blockly.FieldImage('img/blocks/hearing.svg',20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('BLUE PIN').appendField(Facilino.locales.getKey('LANG_US_TRIGGER_PIN')).appendField(new Blockly.FieldImage('img/blocks/speaking.svg',20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_US_TOOLTIP'));
			}
		};

	Blockly.Arduino.dyor_us_collision = function() {
			var echo_pin = Blockly.Arduino.valueToCode(this, 'RED PIN', Blockly.Arduino.ORDER_ATOMIC);
			var trigger_pin = Blockly.Arduino.valueToCode(this, 'BLUE PIN', Blockly.Arduino.ORDER_ATOMIC);
			var distance = Blockly.Arduino.valueToCode(this, 'DISTANCE', Blockly.Arduino.ORDER_ATOMIC);
			var collision = Blockly.Arduino.statementToCode(this,'COLLISION') || '';
			var not_collision = Blockly.Arduino.statementToCode(this,'NOT_COLLISION') || '';
			var code = '';
			
			if ((profiles['processor']==='ATmega328')||(profiles['processor']==='ATmega32U4')||(profiles['processor']==='ATmega2560')){
				Blockly.Arduino.definitions_['include_us'] = JST['dyor_us_definitions_include']({});
				Blockly.Arduino.definitions_['define_us_pulseIn'] = JST['dyor_us_definitions_pulseIn']({});
			}
			Blockly.Arduino.definitions_['define_us_init'] = JST['dyor_us_definitions_us_init']({});
			Blockly.Arduino.definitions_['define_us_distance'] = JST['dyor_us_definitions_distance']({});
			Blockly.Arduino.setups_['setup_us_' + echo_pin + trigger_pin] = JST['inout_digital_input']({'pin': echo_pin});
			Blockly.Arduino.setups_['setup_us_2' + trigger_pin + echo_pin] = JST['inout_digital_output']({'pin': trigger_pin});
			code += JST['dyor_us_collision']({'trigger_pin': trigger_pin,'echo_pin': echo_pin,'distance': distance,'collision': collision,'not_collision': not_collision});
			return code;
		};

	Blockly.Blocks.dyor_us_collision = {
			category: Facilino.locales.getKey('LANG_CATEGORY_DISTANCE'),
			//subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ULTRASOUND'),
			tags: ['us','distance'],
			helpUrl: Facilino.getHelpUrl('dyor_us_collision'),
			examples: ['dyor_us_collision_example.bly'],
			category_colour: Facilino.LANG_COLOUR_DISTANCE,
			colour: Facilino.LANG_COLOUR_DISTANCE_ULTRASOUND,
			keys: ['LANG_US_COLLISION_NAME','LANG_US_DETECT_COLLISION','LANG_US_ECHO_PIN','LANG_US_TRIGGER_PIN','LANG_US_DISTANCE','LANG_US_COLLISION','LANG_US_NOT_COLLISION','LANG_US_COLLISION_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_US_COLLISION_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_DISTANCE_ULTRASOUND);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_US_DETECT_COLLISION')).appendField(new Blockly.FieldImage('img/blocks/hc_sr04.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('RED PIN').appendField(Facilino.locales.getKey('LANG_US_ECHO_PIN')).appendField(new Blockly.FieldImage('img/blocks/hearing.svg',20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('BLUE PIN').appendField(Facilino.locales.getKey('LANG_US_TRIGGER_PIN')).appendField(new Blockly.FieldImage('img/blocks/speaking.svg',20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('DISTANCE').appendField(Facilino.locales.getKey('LANG_US_DISTANCE')).appendField(new Blockly.FieldImage('img/blocks/distance.svg',24*options.zoom,24*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('COLLISION').appendField(Facilino.locales.getKey('LANG_US_COLLISION')).appendField(new Blockly.FieldImage('img/blocks/rear-end-collision.svg',24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
		this.appendStatementInput('NOT_COLLISION').appendField(Facilino.locales.getKey('LANG_US_NOT_COLLISION')).appendField(new Blockly.FieldImage('img/blocks/no-collision.svg',24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
		this.setInputsInline(false);
				//this.setOutput(true, Number);
		this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_US_COLLISION_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{
	Blockly.Arduino.dyor_us_keep_distance = function() {
			var distance = Blockly.Arduino.valueToCode(this, 'Distance', Blockly.Arduino.ORDER_ATOMIC);
			var ref_distance = Blockly.Arduino.valueToCode(this, 'RefDistance', Blockly.Arduino.ORDER_ATOMIC);
		var gain = Blockly.Arduino.valueToCode(this,'Gain', Blockly.Arduino.ORDER_ATOMIC);
			var code = '(int)((((float)'+gain+')/100.0)*(('+distance+')-('+ref_distance+')))';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.dyor_us_keep_distance = {
			category: Facilino.locales.getKey('LANG_CATEGORY_DISTANCE'),
			//subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ULTRASOUND'),
			tags: ['us','distance'],
			helpUrl: Facilino.getHelpUrl('dyor_us_keep_distance'),
			examples: ['dyor_us_keep_distance_example.bly'],
			category_colour: Facilino.LANG_COLOUR_DISTANCE,
			colour: Facilino.LANG_COLOUR_DISTANCE_ULTRASOUND,
			keys: ['LANG_US_KEEPDISTANCE_NAME','LANG_US_DISTANCE','LANG_US_REF_DISTANCE','LANG_LINE_FOLLOWING_GAIN','LANG_US_KEEPDISTANCE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_US_KEEPDISTANCE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_DISTANCE_ULTRASOUND);
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/vertical-resize.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_US_KEEP')).appendField(new Blockly.FieldImage('img/blocks/hc_sr04.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('Distance').appendField(Facilino.locales.getKey('LANG_US_DISTANCE')).appendField(new Blockly.FieldImage('img/blocks/distance.svg',24*options.zoom,24*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('RefDistance').appendField(Facilino.locales.getKey('LANG_US_REF_DISTANCE')).appendField(new Blockly.FieldImage('img/blocks/distance.svg',24*options.zoom,24*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('Gain').appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING_GAIN')).appendField(new Blockly.FieldImage('img/blocks/knob.svg',24*options.zoom,24*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_US_KEEPDISTANCE_TOOLTIP'));
			}
		};

	Blockly.Arduino.dyor_us_regulate_speed = function() {
			var distance = Blockly.Arduino.valueToCode(this, 'Distance', Blockly.Arduino.ORDER_ATOMIC);
			var ref_distance = Blockly.Arduino.valueToCode(this, 'RefDistance', Blockly.Arduino.ORDER_ATOMIC);
		var gain = Blockly.Arduino.valueToCode(this,'Gain', Blockly.Arduino.ORDER_ATOMIC);
			var code = '((('+gain+')*('+distance+')/100))';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.dyor_us_regulate_speed = {
			category: Facilino.locales.getKey('LANG_CATEGORY_DISTANCE'),
			//subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ULTRASOUND'),
			tags: ['us'],
			helpUrl: Facilino.getHelpUrl('dyor_us_regulate_speed'),
			examples: ['dyor_us_regulate_speed_example.bly'],
			category_colour: Facilino.LANG_COLOUR_DISTANCE,
			colour: Facilino.LANG_COLOUR_DISTANCE_ULTRASOUND,
			keys: ['LANG_US_SPEED_NAME','LANG_US_DISTANCE','LANG_LINE_FOLLOWING_GAIN','LANG_US_SPEED_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_US_SPEED_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_DISTANCE_ULTRASOUND);
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/vertical-resize.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_US_REGULATE')).appendField(new Blockly.FieldImage('img/blocks/hc_sr04.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('Distance').appendField(Facilino.locales.getKey('LANG_US_DISTANCE')).appendField(new Blockly.FieldImage('img/blocks/distance.svg',24*options.zoom,24*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Gain').appendField(Facilino.locales.getKey('LANG_LINE_FOLLOWING_GAIN')).appendField(new Blockly.FieldImage('img/blocks/knob.svg',24*options.zoom,24*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_US_SPEED_TOOLTIP'));
			}
		};
		}
	
	}
	
	var FacilinoSonar = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoSonar;
	} else {
		window.FacilinoSonar = FacilinoSonar;
	}
}));
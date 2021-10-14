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
			var pwm_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL');
			var pwm_colour=Facilino.LANG_COLOUR_ADVANCED_DIGITAL;
		}
		else
		{
			var pwm_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG');
			var pwm_colour=Facilino.LANG_COLOUR_ADVANCED_ANALOG;
		}
		
		Blockly.Arduino.inout_analog_read = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';
			code += JST['inout_analog_read']({'pin': pin});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};


		Blockly.Blocks.inout_analog_read = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG'),
			helpUrl: Facilino.getHelpUrl('inout_analog_read'),
			examples: ['inout_analog_read_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_ANALOG,
			keys: ['LANG_ADVANCED_INOUT_ANALOG_READ_NAME','LANG_ADVANCED_INOUT_ANALOG_READ','LANG_ADVANCED_INOUT_ANALOG_READ_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_READ_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_ANALOG);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_READ')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",20*options.zoom, 20*options.zoom)).setCheck(['AnalogPin']);
				this.setOutput(true,[Number,'AnalogRead']);
				this.setInputsInline(true);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_READ_TOOLTIP'));
			}
		};
		
		Blockly.Arduino.inout_analog_write = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);  //Do not change! It affects to the channel in ESP32
			var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
			{
				Blockly.Arduino.setups_['inout_digital_output' + pin] = JST['inout_digital_output']({'pin': pin});
				code += JST['inout_analog_write']({'pin': pin,'value_num': value_num});
			}
			else if (Facilino.profiles['processor']==='ESP32')
			{
				var freq_num = this.getFieldValue('FREQ');
				var res_num = this.getFieldValue('RES');
				Facilino.PWMChannelsIDs[this.id]=pin;
				var unique = [];
				this.uniqueVariables = [];
				$.each(Object.values(Facilino.PWMChannelsIDs), function(i, el){
					if($.inArray(el, unique) === -1) unique.push(el);
				});
				var channel = unique.indexOf(pin);
				Blockly.Arduino.setups_['ledc_'+pin] = 'ledcSetup('+channel+','+freq_num+','+res_num+');\n  ledcAttachPin('+pin+','+channel+');\n';
				code += 'ledcWrite('+channel+','+value_num+');\n';
			}
			return code;
		};
		Blockly.Blocks.inout_analog_write = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: pwm_subcategory,
			helpUrl: Facilino.getHelpUrl('inout_analog_write'),
			examples: ['inout_analog_write_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: pwm_colour,
			keys: ['LANG_ADVANCED_INOUT_ANALOG_WRITE_NAME','LANG_ADVANCED_INOUT_ANALOG_WRITE','LANG_ADVANCED_INOUT_ANALOG_WRITE_VALUE','LANG_ADVANCED_INOUT_ANALOG_WRITE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_NAME'),
			init: function() {
				this.setColour(pwm_colour);
				if (window.FacilinoAdvanced===true)
				{
					this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_PWM_WRITE')).appendField(new Blockly.FieldImage("img/blocks/pwm_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('PWMPin');
				}
				else
				{
					this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE')).appendField(new Blockly.FieldImage("img/blocks/pwm_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('PWMPin');
				}
				if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ATmega2560'))
				this.appendValueInput('NUM').appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_VALUE')).setCheck([Number,'Variable']);
				else if (Facilino.profiles['processor']==='ESP32')
					this.appendValueInput('NUM').appendField(new Blockly.FieldNumber(1000,0,40000000),'FREQ').appendField('Hz').appendField(new Blockly.FieldNumber(8,1,16),'RES').appendField('bits').appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_VALUE')).setCheck([Number,'Variable']);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_INOUT_ANALOG_WRITE_TOOLTIP'));
			}
		};

		Blockly.Arduino.inout_builtin_led = function() {
			var state = this.getFieldValue('STAT');
			var code = '';
			var pin = Facilino.profiles.default.builtin;
			Blockly.Arduino.setups_['inout_digital_output' + pin] = JST['inout_digital_output']({'pin': pin});

			if (state==='TOGGLE')
			{
				code +='digitalWrite('+pin+',!digitalRead('+pin+'));\n';
			}
			else
			{
			  code = JST['inout_digital_write']({'pin': pin, 'state': state});
			}

			return code;
		};
		Blockly.Blocks.inout_builtin_led = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
			helpUrl: Facilino.getHelpUrl('inout_builtin_led'),
			examples: ['inout_digital_write_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_ADVANCED_BUILTIN_LED_NAME','LANG_ADVANCED_BUILTIN_LED','LANG_ADVANCED_BUILTIN_LED_ON','LANG_ADVANCED_BUILTIN_LED_OFF','LANG_ADVANCED_BUILTIN_LED_TOGGLE','LANG_ADVANCED_BUILTIN_LED_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_BUILTIN_LED_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
				this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_ADVANCED_BUILTIN_LED'))
					.appendField(new Blockly.FieldImage("img/blocks/diode.png",24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_ADVANCED_BUILTIN_LED_STATE'))
					.appendField(new Blockly.FieldDropdown([
						[Facilino.locales.getKey('LANG_ADVANCED_BUILTIN_LED_ON') || 'ON', 'HIGH'],
						[Facilino.locales.getKey('LANG_ADVANCED_BUILTIN_LED_OFF') || 'OFF', 'LOW'],
						[Facilino.locales.getKey('LANG_ADVANCED_BUILTIN_LED_TOGGLE') || 'TOGGLE', 'TOGGLE']
					]), 'STAT');
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_BUILTIN_LED_TOOLTIP'));
			}
		};

		// Source: src/blocks/inout_digital_read/inout_digital_read.js
		Blockly.Arduino.inout_digital_read = function() {
			var pin = Blockly.Arduino.valueToCode(this,'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';
			Blockly.Arduino.setups_['inout_digital_input' + pin] = JST['inout_digital_input']({'pin': pin});
			code += JST['inout_digital_read']({'pin': pin});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.inout_digital_read = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
			helpUrl: Facilino.getHelpUrl('inout_digital_read'),
			examples: ['inout_digital_read_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_ADVANCED_INOUT_DIGITAL_READ_NAME','LANG_ADVANCED_INOUT_DIGITAL_READ','LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('DigitalPin');
				this.setOutput(true,[Boolean,'DigitalRead']);
				this.setInputsInline(true);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_READ_TOOLTIP'));
			}
		};
		// Source: src/blocks/inout_digital_write/inout_digital_write.js

		Blockly.Arduino.inout_digital_write = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var state = Blockly.Arduino.valueToCode(this, 'STAT', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			Blockly.Arduino.setups_['inout_digital_output' + pin] = JST['inout_digital_output']({'pin': pin});
			code += JST['inout_digital_write']({'pin': pin,'state': state});
			return code;
		};

		Blockly.Blocks.inout_digital_write = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
			helpUrl: Facilino.getHelpUrl('inout_digital_write'),
			examples: ['inout_digital_read_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_ADVANCED_INOUT_DIGITAL_WRITE_NAME','LANG_ADVANCED_INOUT_DIGITAL_WRITE','LANG_ADVANCED_INOUT_DIGITAL_WRITE_PIN','LANG_ADVANCED_INOUT_DIGITAL_WRITE_STATE','LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE')).appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom)).setCheck(['DigitalPin','Variable']);
				this.appendValueInput('STAT').appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_STATE')).setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,'Variable']);
				this.setPreviousStatement(true,'code');
				this.setInputsInline(true);
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_WRITE_TOOLTIP'));
			}
		};

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.inout_digital_mode = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var dropdown_mode = this.getFieldValue('MODE');
			var code = '';
			code = 'pinMode('+pin+','+dropdown_mode+');';
			return code;
		};

		Blockly.Blocks.inout_digital_mode = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
			helpUrl: Facilino.getHelpUrl('inout_digital_mode'),
			examples: ['inout_digital_mode_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_ADVANCED_INOUT_DIGITAL_MODE_NAME','LANG_ADVANCED_INOUT_DIGITAL_MODE','LANG_ADVANCED_INOUT_DIGITAL_MODE_PIN','LANG_ADVANCED_INOUT_DIGITAL_MODE_MODE','LANG_ADVANCED_INOUT_DIGITAL_MODE_OUTPUT','LANG_ADVANCED_INOUT_DIGITAL_MODE_INPUT','LANG_ADVANCED_INOUT_DIGITAL_MODE_PULLUP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE')).appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom)).setCheck(['DigitalPin','Variable']);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_MODE')).appendField(new Blockly.FieldDropdown([
						[Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_OUTPUT') || 'OUTPUT', 'OUTPUT'],
						[Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_INPUT') || 'INPUT', 'INPUT'],
						[Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_PULLUP') || 'PULLUP', 'INPUT_PULLUP']
					]), 'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setInputsInline(true);
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_INOUT_DIGITAL_MODE_TOOLTIP'));
			}
		};
		}
		// Source: src/blocks/inout_highlow/inout_highlow.js

		Blockly.Arduino.inout_highlow = function() {
			var bool_value = this.getFieldValue('BOOL');
			var code = bool_value;
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.inout_highlow = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
			helpUrl: Facilino.getHelpUrl('inout_highlow'),
			tags: ['input','output'],
			examples: ['inout_highlow_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_ADVANCED_HIGHLOW_NAME','LANG_ADVANCED_HIGHLOW_HIGH','LANG_ADVANCED_HIGHLOW_LOW','LANG_ADVANCED_HIGHLOW_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_HIGHLOW_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
				this.appendDummyInput('')
					.appendField(new Blockly.FieldDropdown([
						[Facilino.locales.getKey('LANG_ADVANCED_HIGHLOW_HIGH') || 'HIGH', 'HIGH'],
						[Facilino.locales.getKey('LANG_ADVANCED_HIGHLOW_LOW') || 'LOW', 'LOW']
					]), 'BOOL');
				this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_HIGHLOW_TOOLTIP'));
			}
		};
		
		
		Blockly.Arduino.pin_analog = function() {
			var pin = this.getFieldValue('PIN') || '';
			return [pin, Blockly.Arduino.ORDER_NONE];
		};

		Blockly.Blocks.pin_analog = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG'),
			helpUrl: Facilino.getHelpUrl('pin_analog'),
			examples: ['inout_analog_read_example.bly'],
			tags: ['input','output'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED,
			keys: ['LANG_VARIABLES_PIN_ANALOG_NAME','LANG_VARIABLES_PIN_ANALOG','LANG_VARIABLES_PIN_ANALOG_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_PIN_ANALOG_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED);
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",20*options.zoom, 20*options.zoom))
					.appendField(Facilino.locales.getKey('LANG_VARIABLES_PIN_ANALOG'))
					.appendField(new Blockly.FieldDropdown(Facilino.profiles.default.analog), 'PIN');
				this.setInputsInline(true);
				this.setOutput(true,'AnalogPin');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_PIN_ANALOG_TOOLTIP'));
			}
		};

		// Source: src/blocks/pin_digital/pin_digital.js
		Blockly.Arduino.pin_digital = function() {
			var pin = this.getFieldValue('PIN') || '';
			return [pin, Blockly.Arduino.ORDER_NONE];
		};

		Blockly.Blocks.pin_digital = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL'),
			helpUrl: Facilino.getHelpUrl('pin_digital'),
			examples: ['inout_digital_read_example.bly'],
			tags: ['input','output'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_VARIABLES_PIN_DIGITAL_NAME','LANG_VARIABLES_PIN_DIGITAL','LANG_VARIABLES_PIN_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_PIN_DIGITAL_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom))
					.appendField(Facilino.locales.getKey('LANG_VARIABLES_PIN_DIGITAL'))
					.appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital), 'PIN');

				this.setInputsInline(true);
				this.setOutput(true,'DigitalPin');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_PIN_TOOLTIP'));
			}
		};

		
		Blockly.Arduino.pin_pwm = function() {
			var pin = this.getFieldValue('PIN') || '';
			return [pin, Blockly.Arduino.ORDER_NONE];
		};

		Blockly.Blocks.pin_pwm = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: pwm_subcategory,
			helpUrl: Facilino.getHelpUrl('pin_pwm'),
			examples: ['inout_analog_write_example.bly'],
			tags: ['input','output'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: pwm_colour,
			keys: ['LANG_VARIABLES_PIN_PWM_NAME','LANG_VARIABLES_PIN_PWM','LANG_VARIABLES_PIN_ANALOG','LANG_VARIABLES_PIN_PWM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_PIN_PWM_NAME'),
			init: function() {
				this.setColour(pwm_colour);
				if (window.FacilinoAdvanced===true)
				{
					this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/pwm_signal.svg",20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_VARIABLES_PIN_PWM')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.pwm), 'PIN');
				}
				else
				{
					this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/pwm_signal.svg",20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_VARIABLES_PIN_ANALOG_OUT')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.pwm), 'PIN');
				}

				this.setInputsInline(true);
				this.setOutput(true,'PWMPin');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_PIN_PWM_TOOLTIP'));
			}
		};
	
	};
		
		
	var FacilinoInOut = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoInOut;
	} else {
		window.FacilinoInOut = FacilinoInOut;
	}
}));
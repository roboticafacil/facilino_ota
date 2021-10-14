(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		Facilino.indentSentences = function(sentences) {
			var splitted_sentences = sentences.split('\n');
			var final_sentences = '';
			for (var i in splitted_sentences) {
				final_sentences += '  ' + splitted_sentences[i] + '\n';
			}
			return final_sentences;
		};
		
		if (window.FacilinoAdvanced===true)
		{
			var humidity_category=Facilino.locales.getKey('LANG_CATEGORY_AMBIENT');
			var humidity_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_HUMIDITY');
			var humidity_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_HUMIDITY');
			var humidity_cat_colour=Facilino.LANG_COLOUR_AMBIENT;
			var humidity_analog_colour=Facilino.LANG_COLOUR_AMBIENT_HUMIDITY;
			var humidity_digital_colour=Facilino.LANG_COLOUR_AMBIENT_HUMIDITY;
		}
		else
		{
			var humidity_category=Facilino.locales.getKey('LANG_CATEGORY_ADVANCED');
			var humidity_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG');
			var humidity_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL');
			var humidity_cat_colour=Facilino.LANG_COLOUR_ADVANCED;
			var humidity_analog_colour=Facilino.LANG_COLOUR_ADVANCED_ANALOG;
			var humidity_digital_colour=Facilino.LANG_COLOUR_ADVANCED_DIGITAL;
		}
		
		Blockly.Arduino.ambient_humid_humidityDHT = function() {
				var code = '';
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				var type = this.getFieldValue('TYPE');
				if (Facilino.profiles['processor']==='ESP32')
				{
					Blockly.Arduino.definitions_['dht']=JST['esp32_dht_definitions_include']({});
					Blockly.Arduino.definitions_['declare_var_define_dht'+type+pin]=JST['esp32_dht_definitions_variables']({pin : pin, type: type});
					Blockly.Arduino.setups_['setup_dht' + pin] = JST['esp32_dht_setups']({pin: pin, type: type});
					code += 'sensor'+type+'_'+pin+'.getHumidity()';
				}
				else
				{
					Blockly.Arduino.definitions_['dht']=JST['dht_definitions_include']({});
					Blockly.Arduino.definitions_['declare_var_define_dht'+type+pin]=JST['dht_definitions_variables']({pin : pin, type: type});
					Blockly.Arduino.setups_['setup_dht' + pin] = JST['dht_setups']({pin: pin, type: type});
					code += 'sensor'+type+'_'+pin+'.readHumidity()';
				}
				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_humid_humidityDHT = {
			category: humidity_category,
			subcategory: humidity_digital_subcategory,
			tags: ['humidity','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_humid_humidityDHT'),
			examples: ['ambient_humid_humidityDHT_example.bly'],
			category_colour: humidity_cat_colour,
			colour: humidity_digital_colour,
			keys: ['LANG_HUMID_READ_HUMID_NAME','LANG_HUMID_READ_HUMID','LANG_HUMID_PIN','LANG_HUMID_READ_HUMID_DHT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_HUMID_READ_HUMID_NAME'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_HUMIDITY);
			this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/humidity.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_HUMID_READ_HUMID')).appendField(new Blockly.FieldDropdown([['DHT11','DHT11'],['DHT21','DHT21'],['DHT22','DHT22']]),'TYPE').appendField(new Blockly.FieldImage("img/blocks/dht11.svg",63*options.zoom,63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_HUMID_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_HUMID_READ_HUMID_DHT_TOOLTIP'));
			}
		};

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.ambient_humid_alarm = function() {
			var code = '';
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var high = Blockly.Arduino.statementToCode(this,'HIGH') || '';
			var low = Blockly.Arduino.statementToCode(this,'LOW') || '';
			var ok = Blockly.Arduino.statementToCode(this,'OK') || '';
			var type = this.getFieldValue('TYPE');
			var once = this.getFieldValue('ONCE');
			if (once==='TRUE')
			{
				Blockly.Arduino.definitions_['declare_var_define_humid_alarm_dht'+type+pin]=JST['dht_humid_alarm_definitions_variables']({pin : pin, type: type});
				high='if (!_dht_humid_'+type+'_'+pin+'){\n  _dht_humid_'+type+'_'+pin+'=true;\n  _dht_dry_'+type+'_'+pin+'=false;\n  _dht_humid_ok_'+type+'_'+pin+'=false;\n'+indentSentences(high)+'\n}\n';
				low='if (!_dht_dry_'+type+'_'+pin+'){\n  _dht_dry_'+type+'_'+pin+'=true;\n  _dht_humid_'+type+'_'+pin+'=false;\n  _dht_humid_ok_'+type+'_'+pin+'=false;\n'+indentSentences(low)+'\n}\n';
				ok='if (!_dht_humid_ok_'+type+'_'+pin+'){\n  _dht_humid_ok_'+type+'_'+pin+'=true;\n  _dht_dry_'+type+'_'+pin+'=false;\n  _dht_humid_'+type+'_'+pin+'=false;\n'+indentSentences(ok)+'\n}\n';
			}
			if (profiles['processor']==='ESP32')
			{
				Blockly.Arduino.definitions_['dht']=JST['esp32_dht_definitions_include']({});
				Blockly.Arduino.definitions_['declare_var_define_dht'+type+pin]=JST['esp32_dht_definitions_variables']({pin : pin, type: type});
				Blockly.Arduino.setups_['setup_dht' + pin] = JST['esp32_dht_setups']({pin: pin, type: type});
				code += JST['esp32_dht_humid_alarm']({pin: pin, type: type, high: high, ok: ok, low: low});
			}
			else
			{
				Blockly.Arduino.definitions_['dht']=JST['dht_definitions_include']({});
				Blockly.Arduino.definitions_['declare_var_define_dht'+type+pin]=JST['dht_definitions_variables']({pin : pin, type: type});
				Blockly.Arduino.setups_['setup_dht' + pin] = JST['dht_setups']({pin: pin, type: type});
				code += JST['dht_humid_alarm']({pin: pin, type: type, high: high, ok: ok, low: low});
			}
			Blockly.Arduino.definitions_['define_dht_tooHumid'] = 'bool isTooHumid(float temperature, float humidity)\n{\n  if((temperature+(humidity*56.5-3981.2))>0)\n	return true;\n  else\n	return false;\n}\n';
			Blockly.Arduino.definitions_['define_dht_tooDry'] = 'bool isTooDry(float temperature,float humidity)\n{\n  if ((\n((humidity*77.8-2364)+temperature))<0)\n	return true;\n  else\n	return false;\n}\n';
			return code;
		};

		Blockly.Blocks.ambient_humid_alarm = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HUMIDITY'),
			tags: ['humidity','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_humid_alarm'),
			examples: ['ambient_humid_alarm_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_HUMIDITY,
			keys: ['LANG_HUMID_ALARM_NAME','LANG_HUMID_ALARM','LANG_HUMID_PIN','LANG_HUMID_ALARM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_HUMID_ALARM_NAME'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_HUMIDITY);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_HUMID_ALARM')).appendField(new Blockly.FieldDropdown([['DHT11','DHT11'],['DHT21','DHT21'],['DHT22','DHT22']]),'TYPE').appendField(new Blockly.FieldImage("img/blocks/dht11.svg",63*options.zoom,63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_HUMID_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_HUMID_ONCE')).appendField(new Blockly.FieldCheckbox('FALSE'),'ONCE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('HIGH').appendField(new Blockly.FieldImage("img/blocks/humidity_high.png", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('OK').appendField(new Blockly.FieldImage("img/blocks/humidity_ok.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('LOW').appendField(new Blockly.FieldImage("img/blocks/humidity_low.png", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				//this.setOutput(true, Number);
		this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_HUMID_ALARM_TOOLTIP'));
			}
		};
		}

		Blockly.Arduino.ambient_moist = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';

			if (Facilino.isVariable(pin)) {
				code += JST['inout_digital_input']({
					'pin': pin,
				});
			} else {
				Blockly.Arduino.setups_['setup_green_analog_read' + pin] = JST['inout_digital_input']({
					'pin': pin,
				});
			}
			code += JST['inout_analog_read']({
				'pin': pin,
			});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.ambient_moist = {
			category: humidity_category,
			subcategory: humidity_analog_subcategory,
			tags: ['humidity','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_moist'),
			examples: ['ambient_humid_humidityDHT_example.bly'],
			category_colour: humidity_cat_colour,
			colour: humidity_analog_colour,
			keys: ['LANG_MOIST_READ_MOIST_NAME','LANG_MOIST_READ_MOIST','LANG_MOIST_PIN','LANG_MOIST_READ_MOIST_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOIST_READ_MOIST_NAME'),
			init: function() {
			this.setColour(humidity_analog_colour);
			this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/sprout.svg",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOIST_READ_MOIST')).appendField(new Blockly.FieldImage("img/blocks/moist.svg",64*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_HUMID_PIN')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_MOIST_READ_MOIST_TOOLTIP'));
			}
		};

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.ambient_moist_alarm = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';
			var high = Blockly.Arduino.statementToCode(this,'HIGH') || '';
			var low = Blockly.Arduino.statementToCode(this,'LOW') || '';
			var ok = Blockly.Arduino.statementToCode(this,'OK') || '';
			if (Facilino.isVariable(pin)) {
				code += JST['inout_digital_input']({'pin': pin});
			} else {
				Blockly.Arduino.setups_['setup_green_analog_read' + pin] = JST['inout_digital_input']({'pin': pin});
			}
			var once = this.getFieldValue('ONCE');
			if (once==='TRUE')
			{
				Blockly.Arduino.definitions_['declare_var_define_moist_alarm'+pin]=JST['moist_alarm_definitions_variables']({pin : pin});
				high='if (!_moist_'+pin+'){\n  _moist_humid_'+pin+'=true;\n  _moist_dry_'+pin+'=false;\n  _moist_ok_'+pin+'=false;\n'+indentSentences(high)+'\n}\n';
				low='if (!_moist_dry_'+pin+'){\n  _moist_dry_'+pin+'=true;\n  _moist_humid_'+pin+'=false;\n  _moist_ok_'+pin+'=false;\n'+indentSentences(low)+'\n}\n';
				ok='if (!_moist_ok_'+pin+'){\n  _moist_ok_'+pin+'=true;\n  _moist_dry_'+pin+'=false;\n  _moist_humid_'+pin+'=false;\n'+indentSentences(ok)+'\n}\n';
			}
			if (profiles['processor']==='ESP32')
			{
				code += JST['moist_alarm']({pin: pin, high_value: '1000', low_value: '600', high: high, ok: ok, low: low});
			}
			else
			{
				code += JST['moist_alarm']({pin: pin, high_value: '250', low_value: '150', high: high, ok: ok, low: low});
			}

			return code;
		};

		Blockly.Blocks.ambient_moist_alarm = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HUMIDITY'),
			tags: ['humidity','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_moist_alarm'),
			examples: ['ambient_moist_alarm_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_HUMIDITY,
			keys: ['LANG_MOIST_ALARM_NAME','LANG_MOIST_ALARM','LANG_MOIST_PIN','LANG_MOIST_ALARM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOIST_ALARM_NAME'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_HUMIDITY);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_MOIST_ALARM')).appendField(new Blockly.FieldImage("img/blocks/moist.svg",64*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_MOIST_PIN')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_HUMID_ONCE')).appendField(new Blockly.FieldCheckbox('FALSE'),'ONCE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('HIGH').appendField(new Blockly.FieldImage("img/blocks/sprout_humid.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('OK').appendField(new Blockly.FieldImage("img/blocks/sprout.svg",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('LOW').appendField(new Blockly.FieldImage("img/blocks/sprout_dried.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				//this.setOutput(true, Number);
		this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_MOIST_ALARM_TOOLTIP'));
			}
		};
		}
	}
	
	var FacilinoHumidity = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoHumidity;
	} else {
		window.FacilinoHumidity = FacilinoHumidity;
	}
}));
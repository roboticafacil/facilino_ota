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
			var temperature_category=Facilino.locales.getKey('LANG_CATEGORY_AMBIENT');
			var temperature_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_TEMPERATURE');
			var temperature_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_TEMPERATURE');
			var temperature_cat_colour=Facilino.LANG_COLOUR_AMBIENT;
			var temperature_analog_colour=Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE;
			var temperature_digital_colour=Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE;
		}
		else
		{
			var temperature_category=Facilino.locales.getKey('LANG_CATEGORY_ADVANCED');
			var temperature_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG');
			var temperature_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL');
			var temperature_cat_colour=Facilino.LANG_COLOUR_ADVANCED;
			var temperature_analog_colour=Facilino.LANG_COLOUR_ADVANCED_ANALOG;
			var temperature_digital_colour=Facilino.LANG_COLOUR_ADVANCED_DIGITAL;
		}
		
	Blockly.Arduino.ambient_temp_lm35 = function() {
				var code = '';
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				var factor='0.48828125';
				if (Facilino.profiles['processor']==='ESP32')
				{
					factor='0.1220703125‬';
				}
				else if (Facilino.profiles['processor']==='ESP8266')
				{
					factor='0.322265625';
				}

				Blockly.Arduino.setups_['setup_green_analog_read' + pin] = JST['inout_digital_input']({'pin': pin});
				code += factor+'*((float)('+JST['inout_analog_read']({'pin': pin})+'))';

				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_temp_lm35 = {
			category: temperature_category,
			subcategory: temperature_analog_subcategory,
			tags: ['temperature','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_temp_lm35'),
			examples: ['ambient_temp_temperature_example.bly'],
			category_colour: temperature_cat_colour,
			colour: temperature_analog_colour,
			keys: ['LANG_TEMP_LM35_NAME','LANG_TEMP_READ_TEMP','LANG_TEMP_PIN','LANG_TEMP_LM35_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_LM35_NAME'),
			description: Facilino.locales.getKey('LANG_TEMP_LM35_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_TEMP_LM35_INPUT_PIN')],
			output: Facilino.locales.getKey('LANG_TEMP_LM35_OUTPUT'),
			init: function() {
			this.setColour(temperature_analog_colour);
			this.appendValueInput('PIN').appendField(new Blockly.FieldImage("img/blocks/thermometer.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_READ_TEMP')).appendField(new Blockly.FieldImage("img/blocks/lm35.svg",48*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_PIN')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,[Number,'Temperature']);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_LM35_TOOLTIP'));
			}
		};
		
		Blockly.Arduino.ambient_temp_temperatureDHT = function() {
				var code = '';
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				var type = this.getFieldValue('TYPE');
				if (Facilino.profiles['processor']==='ESP32')
				{
					Blockly.Arduino.definitions_['dht']=JST['esp32_dht_definitions_include']({});
					Blockly.Arduino.definitions_['declare_var_define_dht'+type+pin]=JST['esp32_dht_definitions_variables']({pin : pin, type: type});
					Blockly.Arduino.setups_['setup_dht' + pin] = JST['esp32_dht_setups']({pin: pin, type: type});
					code += 'sensor'+type+'_'+pin+'.getTemperature()';
				}
				else
				{
					Blockly.Arduino.definitions_['dht']=JST['dht_definitions_include']({});
					Blockly.Arduino.definitions_['declare_var_define_dht'+type+pin]=JST['dht_definitions_variables']({pin : pin, type: type});
					Blockly.Arduino.setups_['setup_dht' + pin] = JST['dht_setups']({pin: pin, type: type});
					code += 'sensor'+type+'_'+pin+'.readTemperature()';
				}
				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_temp_temperatureDHT = {
			category: temperature_category,
			subcategory: temperature_digital_subcategory,
			tags: ['temperature_sensor','meteo'],
			helpUrl: Facilino.getHelpUrl('ambient_temp_temperatureDHT'),
			examples: ['ambient_temp_temperatureDHT_example.bly'],
			category_colour: temperature_cat_colour,
			colour: temperature_digital_colour,
			keys: ['LANG_TEMP_READ_TEMP_DHT_NAME','LANG_TEMP_READ_HUMID','LANG_TEMP_PIN','LANG_TEMP_READ_TEMP_DHT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_NAME'),
			description: Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_DESCRIPTION'),
			requirements: [Facilino.locales.getKey('LANG_TEMP_DHT_REQUIREMENTS')],
			dropdown: [Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_DROPDOWN_MODEL')],
			inputs: [Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_INPUT_PIN')],
			output: [Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_OUTPUT')],
			init: function() {
			this.setColour(temperature_digital_colour);
			this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/thermometer_celsius.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_READ_HUMID')).appendField(new Blockly.FieldDropdown([['DHT11','DHT11'],['DHT21','DHT21'],['DHT22','DHT22']]),'TYPE').appendField(new Blockly.FieldImage("img/blocks/dht11.svg",63*options.zoom,63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_TEMP_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,[Number,'Temperature']);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_TOOLTIP'));
			}
		};

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.ambient_temp_alarmDHT = function() {
			var code = '';
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var high = Blockly.Arduino.statementToCode(this,'HIGH') || '';
			var low = Blockly.Arduino.statementToCode(this,'LOW') || '';
			var ok = Blockly.Arduino.statementToCode(this,'OK') || '';
			var type = this.getFieldValue('TYPE');
			var once = this.getFieldValue('ONCE');
			if (once==='TRUE')
			{
				Blockly.Arduino.definitions_['declare_var_define_temp_alarm_dht'+type+pin]=JST['dht_temp_alarm_definitions_variables']({pin : pin, type: type});
				high='if (!_dht_hot_'+type+'_'+pin+'){\n  _dht_hot_'+type+'_'+pin+'=true;\n  _dht_cold_'+type+'_'+pin+'=false;\n  _dht_ok_'+type+'_'+pin+'=false;\n'+indentSentences(high)+'\n}\n';
				low='if (!_dht_cold_'+type+'_'+pin+'){\n  _dht_cold_'+type+'_'+pin+'=true;\n  _dht_hot_'+type+'_'+pin+'=false;\n  _dht_ok_'+type+'_'+pin+'=false;\n'+indentSentences(low)+'\n}\n';
				ok='if (!_dht_ok_'+type+'_'+pin+'){\n  _dht_ok_'+type+'_'+pin+'=true;\n  _dht_cold_'+type+'_'+pin+'=false;\n  _dht_hot_'+type+'_'+pin+'=false;\n'+indentSentences(ok)+'\n}\n';
			}
			if (Facilino.profiles['processor']==='ESP32')
			{
				Blockly.Arduino.definitions_['dht']=JST['esp32_dht_definitions_include']({});
				Blockly.Arduino.definitions_['declare_var_define_dht'+type+pin]=JST['esp32_dht_definitions_variables']({pin : pin, type: type});
				Blockly.Arduino.setups_['setup_dht' + pin] = JST['esp32_dht_setups']({pin: pin, type: type});
				code += JST['esp32_dht_temp_alarm']({pin: pin, type: type, high: high, ok: ok, low: low});
			}
			else
			{
				Blockly.Arduino.definitions_['dht']=JST['dht_definitions_include']({});
				Blockly.Arduino.definitions_['declare_var_define_dht'+type+pin]=JST['dht_definitions_variables']({pin : pin, type: type});
				Blockly.Arduino.setups_['setup_dht' + pin] = JST['dht_setups']({pin: pin, type: type});
				code += JST['dht_temp_alarm']({pin: pin, type: type, high: high, ok: ok, low: low});
			}
			Blockly.Arduino.definitions_['define_dht_tooHot'] = 'bool isTooHot(float temperature, float humidity)\n{\n   if((temperature+(humidity*0.095-32.85)) > 0)\n	return true;\n  else\n	return false;\n}\n';
			Blockly.Arduino.definitions_['define_dht_tooCold'] = 'bool isTooCold(float temperature, float humidity)\n{\n  if ((((humidity*0.04175-23.476675)+temperature))<0)\n	return true;\n  else\n	return false;\n}\n';


			return code;
		};

		Blockly.Blocks.ambient_temp_alarmDHT = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TEMPERATURE'),
			tags: ['temperature','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_temp_alarmDHT'),
			examples: ['ambient_temp_alarm_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE,
			keys: ['LANG_TEMP_ALARM_NAME','LANG_TEMP_ALARM_DHT_DESCRIPTION','LANG_TEMP_ALARM_DHT_DROPDOWN_MODEL','LANG_TEMP_ALARM_DHT_STATEMENT_HIGH','LANG_TEMP_ALARM_DHT_STATEMENT_MEDIUM','LANG_TEMP_ALARM_DHT_STATEMENT_LOW','LANG_TEMP_ALARM_DHT_INPUT_PIN','LANG_TEMP_ALARM_DHT_FIELD_WARN','LANG_TEMP_ALARM_DHT_OUTPUT','LANG_TEMP_ALARM_DHT','LANG_TEMP_BUS_PIN','LANG_TEMP_ONCE','LANG_TEMP_ALARM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_ALARM_NAME'),
			description: Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_DESCRIPTION'),
			requirements: [Facilino.locales.getKey('LANG_TEMP_DHT_REQUIREMENTS')],
			dropdown: [Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_DROPDOWN_MODEL')],
			statements: [Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_STATEMENT_HIGH'),Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_STATEMENT_MEDIUM'),Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_STATEMENT_LOW')],
			inputs: [Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_INPUT_PIN')],
			fields: [Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_FIELD_WARN')],
			output: [Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_OUTPUT')],
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_TEMP_ALARM_DHT')).appendField(new Blockly.FieldDropdown([['DHT11','DHT11'],['DHT21','DHT21'],['DHT22','DHT22']]),'TYPE').appendField(new Blockly.FieldImage("img/blocks/dht11.svg",63*options.zoom,63*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_TEMP_BUS_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_TEMP_ONCE')).appendField(new Blockly.FieldCheckbox('FALSE'),'ONCE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('HIGH').appendField(new Blockly.FieldImage("img/blocks/thermometer_high.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('OK').appendField(new Blockly.FieldImage("img/blocks/thermometer_ok.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('LOW').appendField(new Blockly.FieldImage("img/blocks/thermometer_low.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_TEMP_ALARM_TOOLTIP'));
			}
		};
		}

		Blockly.Arduino.ambient_temp_temperature = function() {
				var code = '';
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				Blockly.Arduino.definitions_['dallas_temp']=JST['dallas_temp_definitions_include']({});
				Blockly.Arduino.definitions_['one_wire_temp']=JST['one_wire_temp_definitions_include']({pin : pin});
				Blockly.Arduino.definitions_['declare_var_define_dht_one_wire'+pin]=JST['one_wire_temp_definitions_variables']({pin : pin});
				Blockly.Arduino.definitions_['declare_var_define_dht_dallas'+pin]=JST['dallas_temp_definitions_variables']({pin : pin});
				Blockly.Arduino.setups_['setup_dallas_temp' + pin] = JST['dallas_temp_setups']({pin: pin});

				if (this.getFieldValue('TYPE')==='C')
				  Blockly.Arduino.definitions_['one_wire_temp_readTempC']=JST['one_wire_definitions_readTempC']({pin: pin});
				else
				  Blockly.Arduino.definitions_['one_wire_temp_readTempF']=JST['one_wire_definitions_readTempF']({pin: pin});

				if (this.getFieldValue('TYPE')==='C')
				  code += JST['one_wire_temp_readTempC']({});
				else
				  code += JST['one_wire_temp_readTempF']({});
				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_temp_temperature = {
			category: temperature_category,
			subcategory: temperature_digital_subcategory,
			tags: ['temperature','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_temp_temperature'),
			examples: ['ambient_temp_temperature_example.bly'],
			category_colour: temperature_cat_colour,
			colour: temperature_digital_colour,
			keys: ['LANG_TEMP_REQUEST_AND_READ_TEMP_NAME','LANG_TEMP_REQUEST_AND_READ_TEMP_DESCRIPTION','LANG_TEMP_DALLAS_REQUIREMENTS','LANG_TEMP_REQUEST_AND_READ_TEMP_INPUT_PIN','LANG_TEMP_REQUEST_AND_READ_TEMP_DROPDOWN_UNITS','LANG_TEMP_REQUEST_AND_READ_TEMP_OUTPUT','LANG_TEMP_REQUEST_AND_READ_TEMP','LANG_TEMP_BUS_PIN','LANG_TEMP_READ_TEMP_UNIT','LANG_TEMP_REQUEST_AND_READ_TEMP_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_REQUEST_AND_READ_TEMP_NAME'),
			description: Facilino.locales.getKey('LANG_TEMP_REQUEST_AND_READ_TEMP_DESCRIPTION'),
			requirements: Facilino.locales.getKey('LANG_TEMP_DALLAS_REQUIREMENTS'),
			inputs: [Facilino.locales.getKey('LANG_TEMP_REQUEST_AND_READ_TEMP_INPUT_PIN')],
			dropdown: [Facilino.locales.getKey('LANG_TEMP_REQUEST_AND_READ_TEMP_DROPDOWN_UNITS')],
			output: Facilino.locales.getKey('LANG_TEMP_REQUEST_AND_READ_TEMP_OUTPUT'),
			init: function() {
			this.setColour(temperature_digital_colour);
			this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/thermometer.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_REQUEST_AND_READ_TEMP')).appendField(new Blockly.FieldImage("img/blocks/DS18B20.svg",48*options.zoom,48*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_TEMP_BUS_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TEMP_READ_TEMP_UNIT')).appendField(new Blockly.FieldDropdown([['ºC','C'],['ºF','F']]),'TYPE').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,[Number,'Temperature']);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_REQUEST_AND_READ_TEMP_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.ambient_temp_resolution = function() {
				var code = '';
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				var resolution = this.getFieldValue('RESOLUTION');
				Blockly.Arduino.definitions_['dallas_temp']=JST['dallas_temp_definitions_include']({});
				Blockly.Arduino.definitions_['one_wire_temp']=JST['one_wire_temp_definitions_include']({pin : pin});
				Blockly.Arduino.definitions_['declare_var_define_dht_one_wire'+pin]=JST['one_wire_temp_definitions_variables']({pin : pin});
				Blockly.Arduino.definitions_['declare_var_define_dht_dallas'+pin]=JST['dallas_temp_definitions_variables']({pin : pin});
				Blockly.Arduino.setups_['setup_dallas_temp' + pin] = JST['dallas_temp_setups']({pin: pin});
				if (resolution==='9')
					code += 'tempSensor'+pin+'.setResolution(9);\n';
				else if (resolution==='10')
					code += 'tempSensor'+pin+'.setResolution(10);\n';
				else if (resolution==='11')
					code += 'tempSensor'+pin+'.setResolution(11);\n';
				else if (resolution==='12')
					code += 'tempSensor'+pin+'.setResolution(12);\n';
				return code;
		};

		Blockly.Blocks.ambient_temp_resolution = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TEMPERATURE'),
			tags: ['gas','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_temp_resolution'),
			examples: ['ambient_temp_resolution_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE,
			keys: ['LANG_TEMP_RESOLUTION_NAME','LANG_TEMP_RESOLUTION_DESCRIPTION','LANG_TEMP_DALLAS_REQUIREMENTS','LANG_TEMP_RESOLUTION_INPUT_PIN','LANG_TEMP_RESOLUTION_DROPDOWN_BITS','LANG_TEMP_RESOLUTION','LANG_TEMP_BUS_PIN','LANG_TEMP_RESOLUTION_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_RESOLUTION_NAME'),
			description: Facilino.locales.getKey('LANG_TEMP_RESOLUTION_DESCRIPTION'),
			requirements: Facilino.locales.getKey('LANG_TEMP_DALLAS_REQUIREMENTS'),
			inputs: [Facilino.locales.getKey('LANG_TEMP_RESOLUTION_INPUT_PIN')],
			dropdown: [Facilino.locales.getKey('LANG_TEMP_RESOLUTION_DROPDOWN_BITS')],
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE);
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TEMP_RESOLUTION')).appendField(new Blockly.FieldDropdown([
		['9 Bits','9'],
		['10 Bits','10'],
		['11 Bits','11'],
		['12 Bits','12']]),'RESOLUTION').appendField(new Blockly.FieldImage("img/blocks/DS18B20.svg",48*options.zoom,48*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_TEMP_BUS_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_RESOLUTION_TOOLTIP'));
			}
		};

		Blockly.Arduino.ambient_temp_alarm = function() {
			var code = '';
			var handlerCode = '';
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['dallas_temp']=JST['dallas_temp_definitions_include']({});
			Blockly.Arduino.definitions_['one_wire_temp']=JST['one_wire_temp_definitions_include']({pin : pin});
			Blockly.Arduino.definitions_['declare_var_define_dht_one_wire'+pin]=JST['one_wire_temp_definitions_variables']({pin : pin});
			Blockly.Arduino.definitions_['declare_var_define_dht_dallas'+pin]=JST['dallas_temp_definitions_variables']({pin : pin});
			Blockly.Arduino.definitions_['one_wire_definitions_checkTempSensorDeviceAddress'+pin]=JST['one_wire_definitions_checkTempSensorDeviceAddress']({pin : pin});

			var high = Blockly.Arduino.statementToCode(this, 'HIGH');
			var low = Blockly.Arduino.statementToCode(this, 'LOW');
			handlerCode +='float temp;\n';
			//handlerCode +='tempSensor'+pin+'.requestTemperaturesByAddress(deviceAddress);\n';
			handlerCode +='temp=tempSensor'+pin+'.getTempC(deviceAddress);\n';
			handlerCode += '	 \n	  if (temp>=(float)tempSensor'+pin+'.getHighAlarmTemp(deviceAddress)&&checkTempSensorDeviceAddress'+pin+'(deviceAddress,0)) {\n'+high+'	}';
			handlerCode += '	 \n	  if (temp<=(float)tempSensor'+pin+'.getLowAlarmTemp(deviceAddress)&&checkTempSensorDeviceAddress'+pin+'(deviceAddress,0)) {\n'+low+'	}';
			Blockly.Arduino.definitions_['one_wire_temp_alarmHandler'+pin]=JST['one_wire_definitions_alarmHandler']({pin : pin, code: handlerCode});
			Blockly.Arduino.setups_['setup_dallas_temp' + pin] = JST['dallas_temp_setups']({pin: pin});
			Blockly.Arduino.setups_['setup_one_wire_alarm_temp' + pin] = JST['one_wire_temp_alarm_setups']({pin: pin});
			code = 'tempSensor'+pin+'.processAlarms();\n';
			return code;
		};

		Blockly.Blocks.ambient_temp_alarm = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TEMPERATURE'),
			tags: ['temperature','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_temp_alarm'),
			examples: ['ambient_temp_alarm_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE,
			keys: ['LANG_TEMP_ALARM2_NAME','LANG_TEMP_ALARM2_DESCRIPTION','LANG_TEMP_DALLAS_REQUIREMENTS','LANG_TEMP_ALARM2_INPUT_PIN','LANG_TEMP_ALARM2_STATEMENT_HIGH','LANG_TEMP_ALARM2_STATEMENT_LOW','LANG_TEMP_ALARM','LANG_TEMP_BUS_PIN','LANG_TEMP_ALARM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_ALARM2_NAME'),
			description: Facilino.locales.getKey('LANG_TEMP_ALARM2_DESCRIPTION'),
			additional: ['ambient_temp_set_alarm'],
			requirements: Facilino.locales.getKey('LANG_TEMP_DALLAS_REQUIREMENTS'),
			inputs: [Facilino.locales.getKey('LANG_TEMP_ALARM2_INPUT_PIN')],
			statements: [Facilino.locales.getKey('LANG_TEMP_ALARM2_STATEMENT_HIGH'),Facilino.locales.getKey('LANG_TEMP_ALARM2_STATEMENT_LOW')],
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_TEMP_ALARM')).appendField(new Blockly.FieldImage("img/blocks/DS18B20.svg",48*options.zoom,48*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_TEMP_BUS_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('HIGH').appendField(new Blockly.FieldImage("img/blocks/thermometer_high.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('LOW').appendField(new Blockly.FieldImage("img/blocks/thermometer_low.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_TEMP_ALARM_TOOLTIP'));
			}
		};


		Blockly.Arduino.ambient_temp_set_alarm = function() {
			var option = this.getFieldValue('OPTION');
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var value_pin = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['dallas_temp']=JST['dallas_temp_definitions_include']({});
			Blockly.Arduino.definitions_['one_wire_temp']=JST['one_wire_temp_definitions_include']({pin : pin});
			Blockly.Arduino.definitions_['declare_var_define_dht_one_wire'+pin]=JST['one_wire_temp_definitions_variables']({pin : pin});
			Blockly.Arduino.definitions_['declare_var_define_dht_dallas'+pin]=JST['dallas_temp_definitions_variables']({pin : pin});
			Blockly.Arduino.setups_['setup_dallas_temp' + pin] = JST['dallas_temp_setups']({pin: pin});
			var code='';
			if (option==='1'){
				Blockly.Arduino.definitions_['declare_var_define_deviceAddress'+pin] = 'DeviceAddress _deviceAddress'+pin+';\n';
				code+='tempSensor'+pin+'.getAddress(_deviceAddress'+pin+',0);\n';
				code+='tempSensor'+pin+'.setHighAlarmTemp(_deviceAddress'+pin+','+value_pin+');\n';
			}
			if (option==='2'){
				Blockly.Arduino.definitions_['declare_var_define_deviceAddress'+pin] = 'DeviceAddress _deviceAddress'+pin+';\n';
				code+='tempSensor'+pin+'.getAddress(_deviceAddress'+pin+',0);\n';
				code+='tempSensor'+pin+'.setLowAlarmTemp(_deviceAddress'+pin+','+value_pin+');\n';
			}
			return code;
		};

		Blockly.Blocks.ambient_temp_set_alarm = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TEMPERATURE'),
			tags: ['temperature','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_temp_set_alarm'),
			examples: ['ambient_temp_alarm_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE,
			keys: ['LANG_TEMP_ALARM_SET_NAME','LANG_TEMP_ALARM_SET_DESCRIPTION','LANG_TEMP_DALLAS_REQUIREMENTS','LANG_TEMP_ALARM2_DROPDOWN_TYPE','LANG_TEMP_ALARM_SET_INPUT_PIN','LANG_TEMP_ALARM_SET_INPUT_TEMPERATURE','LANG_TEMP_ALARM_SET','LANG_TEMP_ALARM_HIGH','LANG_TEMP_ALARM_LOW','LANG_TEMP_BUS_PIN','LANG_TEMP_CELSIUS','LANG_TEMP_ALARM_SET_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_ALARM_SET_NAME'),
			description: Facilino.locales.getKey('LANG_TEMP_ALARM_SET_DESCRIPTION'),
			additional: ['ambient_temp_alarm'],
			requirements: Facilino.locales.getKey('LANG_TEMP_DALLAS_REQUIREMENTS'),
			dropdown: [Facilino.locales.getKey('LANG_TEMP_ALARM2_DROPDOWN_TYPE')],
			inputs: [Facilino.locales.getKey('LANG_TEMP_ALARM_SET_INPUT_PIN'),Facilino.locales.getKey('LANG_TEMP_ALARM_SET_INPUT_TEMPERATURE')],
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TEMP_ALARM_SET')||'Set').appendField(new Blockly.FieldDropdown([
		[Facilino.locales.getKey('LANG_TEMP_ALARM_HIGH'), '1'],
		[Facilino.locales.getKey('LANG_TEMP_ALARM_LOW'), '2']
		]),'OPTION').appendField(new Blockly.FieldImage('img/blocks/DS18B20.svg', 48*options.zoom, 48*options.zoom));
		this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_TEMP_BUS_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
		//this.appendValueInput('IDX').appendField(Facilino.locales.getKey('LANG_TEMP_IDX')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('VALUE').appendField((Facilino.locales.getKey('LANG_TEMP_CELSIUS')||'Celsius')+' [ºC]').setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
		this.setPreviousStatement(true,'code');
		this.setNextStatement(true,'code');
		this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_TEMP_ALARM_SET_TOOLTIP'));
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

		Blockly.Arduino.ambient_temp_toCelsius = function() {
				var code = '';
				var temp_pin = Blockly.Arduino.valueToCode(this, 'TEMP', Blockly.Arduino.ORDER_ATOMIC);
				Blockly.Arduino.definitions_['dallas_temp']=JST['dallas_temp_definitions_include']({});
				code += 'DallasTemperature::toCelsius('+temp_pin+')';
			return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_temp_toCelsius = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TEMPERATURE'),
			tags: ['temperature','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_temp_toCelsius'),
			examples: ['ambient_temp_conversion_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE,
			keys: ['LANG_TEMP_TO_CELSIUS_NAME','LANG_TEMP_F2C','LANG_TEMP_TO_CELSIUS_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_TO_CELSIUS_NAME'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE);
			this.appendValueInput('TEMP').appendField(new Blockly.FieldImage("img/blocks/thermometer_celsius.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_F2C')).appendField(new Blockly.FieldImage("img/blocks/thermometer_fahrenheit.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Temperature','Variable']);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,[Number,'Temperature']);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_TO_CELSIUS_TOOLTIP'));
			}
		};

		Blockly.Arduino.ambient_temp_toFahrenheit = function() {
				var code = '';
				var temp_pin = Blockly.Arduino.valueToCode(this, 'TEMP', Blockly.Arduino.ORDER_ATOMIC);
				Blockly.Arduino.definitions_['dallas_temp']=JST['dallas_temp_definitions_include']({});
				code += 'DallasTemperature::toFahrenheit('+temp_pin+')';
			return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_temp_toFahrenheit = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TEMPERATURE'),
			tags: ['temperature','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_temp_toFahrenheit'),
			examples: ['ambient_temp_conversion_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE,
			keys: ['LANG_TEMP_TO_FAHRENHEIT_NAME','LANG_TEMP_C2F','LANG_TEMP_TO_FAHRENHEIT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_TO_FAHRENHEIT_NAME'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE);
			this.appendValueInput('TEMP').appendField(new Blockly.FieldImage("img/blocks/thermometer_fahrenheit.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_C2F')).appendField(new Blockly.FieldImage("img/blocks/thermometer_celsius.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Temperature','Variable']);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,[Number,'Temperature']);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_TO_FAHRENHEIT_TOOLTIP'));
			}
		};
		
		Blockly.Arduino.ambient_temp_pressureBMP180 = function() {
				var code = '';
				Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
				Blockly.Arduino.definitions_['bmp']=JST['bmp_definitions_include']({});
				Blockly.Arduino.definitions_['declare_var_define_bmp']='Adafruit_BMP085 bmp;\n';
				Blockly.Arduino.setups_['setup_bmp'] = 'bmp.begin();\n';

				code += 'bmp.readTemperature()'
				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_temp_pressureBMP180 = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TEMPERATURE'),
			tags: ['temperature','barometer','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_temp_pressureBMP180'),
			examples: ['ambient_pressureBMP180_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE,
			keys: ['LANG_TEMP_READ_TEMP_BMP_NAME','LANG_PRESSURE_READ_PRESSURE_BMP','LANG_TEMP_READ_TEMP_BMP_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_READ_TEMP_BMP_NAME'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE);
			this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/thermometer_celsius.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_PRESSURE_READ_PRESSURE_BMP')).appendField(new Blockly.FieldImage("img/blocks/bmp180.svg",63*options.zoom,63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_READ_TEMP_BMP_TOOLTIP'));
			}
		};
		}
	}
	
	var FacilinoTemperature = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoTemperature;
	} else {
		window.FacilinoTemperature = FacilinoTemperature;
	}
}));
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
		
	Blockly.Arduino.ambient_temp_analog = function() {
				var code = '';
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				if (this.getFieldValue('TYPE')==='LM35')
				{
					var factor='0.48828125';
					if (Facilino.profiles['processor']==='ESP32')
					{
						factor='0.08056640625';
					}
					else if (Facilino.profiles['processor']==='ESP8266')
					{
						factor='0.322265625';
					}
					
					if (Blockly.Arduino.definitions_['declare_var_wifi_register']!==undefined)
					{
						Blockly.Arduino.definitions_['define_inout_analogReadWiFi'] = 'int analogReadWiFi(uint8_t pin)\n{\n  if (pin==0 || pin==2 || pin==4 || ((pin>=12)&&(pin<=15)) || ((pin>=25)&&(pin<=27))){\n    WRITE_PERI_REG(SENS_SAR_READ_CTRL2_REG, adc_register);\n    SET_PERI_REG_MASK(SENS_SAR_READ_CTRL2_REG, SENS_SAR2_DATA_INV);\n    int value=analogRead(pin);\n    WRITE_PERI_REG(SENS_SAR_READ_CTRL2_REG, wifi_register);\n    return value;\n}\n  else\n    return analogRead(pin);\n}\n';
						code+=factor+'*((float)('+'analogReadWiFi('+pin+')'+'))';
					}
					else
						code += factor+'*((float)('+JST['inout_analog_read']({'pin': pin})+'))';
				}
				else
				{
					var R1;
					if (this.getFieldValue('TYPE')==='NTC_10K')
						R1='10000';
					else if (this.getFieldValue('TYPE')==='NTC_4K7')
						R1='4700';
					else if (this.getFieldValue('TYPE')==='NTC_2K2')
						R1='2200';
					else
						R1='1000';
					if (Blockly.Arduino.definitions_['declare_var_wifi_register']!==undefined)
					{
						Blockly.Arduino.definitions_['define_inout_analogReadWiFi'] = 'int analogReadWiFi(uint8_t pin)\n{\n  if (pin==0 || pin==2 || pin==4 || ((pin>=12)&&(pin<=15)) || ((pin>=25)&&(pin<=27))){\n    WRITE_PERI_REG(SENS_SAR_READ_CTRL2_REG, adc_register);\n    SET_PERI_REG_MASK(SENS_SAR_READ_CTRL2_REG, SENS_SAR2_DATA_INV);\n    int value=analogRead(pin);\n    WRITE_PERI_REG(SENS_SAR_READ_CTRL2_REG, wifi_register);\n    return value;\n}\n  else\n    return analogRead(pin);\n}\n';
						if (Facilino.profiles['processor']==='ESP32')
							Blockly.Arduino.definitions_['define_inout_analogNTC'] = 'float analogNTC (uint8_t pin, float R1)\n{\n    float T;\n	float logR2;\n    float Vout=3.3*((float)analogReadWiFi(pin)/4095.0);\n	logR2=log(R1*(Vout/(5.0-Vout)));\n     T=(1.0/(0.001129148+0.000234125*logR2+0.0000000876741*logR2*logR2*logR2))-273.15;\n    return T;\n}\n';
						else
							Blockly.Arduino.definitions_['define_inout_analogNTC'] = 'float analogNTC (uint8_t pin, float R1)\n{\n    float T;\n	float logR2;\n    float Vout=5*((float)analogReadWiFi(pin)/1023.0);\n	logR2=log(R1*(Vout/(5.0-Vout)));\n    T=(1.0/(0.001129148+0.000234125*logR2+0.0000000876741*logR2*logR2*logR2))-273.15;\n    return T;\n}\n';
					}
					else
					{
						if (Facilino.profiles['processor']==='ESP32')
							Blockly.Arduino.definitions_['define_inout_analogNTC'] = 'float analogNTC (uint8_t pin, float R1)\n{\n    float T;\n	float logR2;\n    float Vout=3.3*((float)analogRead(pin)/4095.0);\n	logR2=log(R1*(Vout/(5.0-Vout)));\n    T=(1.0/(0.001129148+0.000234125*logR2+0.0000000876741*logR2*logR2*logR2))-273.15;\n    return T;\n}\n';
						else
							Blockly.Arduino.definitions_['define_inout_analogNTC'] = 'float analogNTC (uint8_t pin, float R1)\n{\n    float T;\n	float logR2;\n    float Vout=5*((float)analogRead(pin)/1023.0);\n	logR2=log(R1*(Vout/(5.0-Vout)));\n    T=(1.0/(0.001129148+0.000234125*logR2+0.0000000876741*logR2*logR2*logR2))-273.15;\n    return T;\n}\n';
					}
					code+='('+'analogNTC('+pin+','+R1+')'+')';
				}
				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_temp_analog = {
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
			this.appendValueInput('PIN').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_READ_TEMP')).appendField(new Blockly.FieldDropdown([['LM35','LM35'],['NTC 10K','NTC_10K'],['NTC 4K7','NTC_4K7'],['NTC 2K2','NTC_2K2'],['NTC 1K','NTC_1K']]),'TYPE').appendField(new Blockly.FieldImage("img/blocks/lm35.svg",48*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_PIN')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,[Number,'Temperature']);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_LM35_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="PIN"><shadow type="pin_analog"></shadow></value><field name="TYPE">LM35</field>','<value name="PIN"><shadow type="pin_analog"></shadow></value><field name="TYPE">NTC_10K</field>'];
			}
		};
		
		Blockly.Arduino.ambient_temp_temperatureDHT = function() {
				var code = '';
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				var type = this.getFieldValue('TYPE');
				
				if (this.getInputTargetBlock('PIN').type==='pin_digital')
				{
					Facilino.DHTTemperatureIDs[this.id]={pin: pin, type: type};
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
				}
				else
				{
					if (Facilino.profiles['processor']==='ESP32')
						Blockly.Arduino.definitions_['dht']=JST['esp32_dht_definitions_include']({});
					else
						Blockly.Arduino.definitions_['dht']=JST['dht_definitions_include']({});
					if (Facilino.profiles['processor']==='ESP32')
						code+='_dhts['+pin+']->getTemperature()';
					else
						code+='_dhts['+pin+']->readTemperature()';
						
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
			this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_celsius.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_READ_HUMID')).appendField(new Blockly.FieldDropdown([['DHT11','DHT11'],['DHT21','DHT21'],['DHT22','DHT22']]),'TYPE').appendField(new Blockly.FieldImage("img/blocks/dht11.svg",63*options.zoom,63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_TEMP_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,[Number,'Temperature']);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_digital"></shadow></value>';
			}
		};
		
		Blockly.Arduino.ambient_temp_temperature = function() {
				var code = '';
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				Blockly.Arduino.definitions_['dallas_temp']=JST['dallas_temp_definitions_include']({});
				Blockly.Arduino.definitions_['one_wire_temp']=JST['one_wire_temp_definitions_include']({pin : pin});
				Blockly.Arduino.definitions_['declare_var_define_dht_one_wire'+pin]=JST['one_wire_temp_definitions_variables']({pin : pin});
				Blockly.Arduino.definitions_['declare_var_define_dht_dallas'+pin]=JST['dallas_temp_definitions_variables']({pin : pin});
				Blockly.Arduino.setups_['setup_dallas_temp' + pin] = JST['dallas_temp_setups']({pin: pin,resolution: this.getFieldValue('RESOLUTION')});

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
			this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_REQUEST_AND_READ_TEMP')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/DS18B20.svg",48*options.zoom,48*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_TEMP_BUS_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TEMP_READ_TEMP_UNIT')).appendField(new Blockly.FieldDropdown([['ºC','C'],['ºF','F']]),'TYPE').appendField(Facilino.locales.getKey('LANG_TEMP_RESOLUTION')).appendField(new Blockly.FieldDropdown([['9 Bits','9'],['10 Bits','10'],['11 Bits','11'],['12 Bits','12']]),'RESOLUTION').setAlign(Blockly.ALIGN_RIGHT);			
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,[Number,'Temperature']);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_REQUEST_AND_READ_TEMP_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_digital"></shadow></value>';
			}
		};
		
		Blockly.Arduino.ambient_temp_temperatureHTU = function() {
				var code = '';
				Blockly.Arduino.definitions_['htu21d']='#include <SparkFunHTU21D.h>';
				Blockly.Arduino.definitions_['declare_var_define_htu21d']='HTU21D _htu21d;';
				Blockly.Arduino.setups_['setup_htu21d']='_htu21d.begin();';
				code+='_htu21d.readTemperature()';
				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_temp_temperatureHTU = {
			category: temperature_category,
			subcategory: temperature_digital_subcategory,
			tags: ['temperature_sensor','meteo'],
			helpUrl: Facilino.getHelpUrl('ambient_temp_temperatureDHT'),
			examples: ['ambient_temp_temperatureDHT_example.bly'],
			category_colour: temperature_cat_colour,
			colour: temperature_digital_colour,
			keys: ['LANG_TEMP_READ_TEMP_HTU_NAME','LANG_TEMP_READ_HUMID','LANG_TEMP_PIN','LANG_TEMP_READ_TEMP_HTU_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_READ_TEMP_HTU_NAME'),
			description: Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_DESCRIPTION'),
			requirements: [Facilino.locales.getKey('LANG_TEMP_DHT_REQUIREMENTS')],
			dropdown: [Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_DROPDOWN_MODEL')],
			inputs: [Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_INPUT_PIN')],
			output: [Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_OUTPUT')],
			init: function() {
			this.setColour(temperature_digital_colour);
			this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_celsius.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_READ_HUMID')).appendField('HTU21D').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/htu21.svg",63*options.zoom,63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,[Number,'Temperature']);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_READ_TEMP_HTU_TOOLTIP'));
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
			this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_celsius.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_PRESSURE_READ_PRESSURE_BMP')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/bmp180.svg",63*options.zoom,63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_READ_TEMP_BMP_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.ambient_temp_alarmDHT = function() {
			var code = '';
			var temp = Blockly.Arduino.valueToCode(this, 'TEMPERATURE', Blockly.Arduino.ORDER_NONE);
			var high = Blockly.Arduino.statementToCode(this,'HIGH') || '';
			var low = Blockly.Arduino.statementToCode(this,'LOW') || '';
			var ok = Blockly.Arduino.statementToCode(this,'OK') || '';
			var once = this.getFieldValue('ONCE');
			
			if (once==='TRUE')
			{
				Blockly.Arduino.definitions_['declare_var_define_temp_alarm']='bool _temp_hot=false;\nbool _temp_cold=false;\nbool _temp_ok=false;\n';				
				high='if (!_temp_hot){\n  _temp_hot=true;\n  _temp_cold=false;\n  _temp_ok=false;\n'+Facilino.indentSentences(high)+'\n}\n';
				low='if (!_temp_cold){\n  _temp_cold=true;\n  _temp_hot=false;\n  _temp_ok=false;\n'+Facilino.indentSentences(low)+'\n}\n';
				ok='if (!_temp_ok){\n  _temp_ok=true;\n  _temp_cold=false;\n  _temp_hot=false;\n'+Facilino.indentSentences(ok)+'\n}\n';
			}
			code+='{\n  float _temperature='+temp+';\nif (_temperature>='+this.getFieldValue('HIGH')+'){\n'+high+'}\nelse if(_temperature<='+this.getFieldValue('LOW')+'){\n'+low+'}\nelse{\n'+ok+'}\n}\n';
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
			keys: ['LANG_TEMP_ALARM_NAME','LANG_TEMP_ALARM_DESCRIPTION','LANG_TEMP_ALARM_DHT_DROPDOWN_MODEL','LANG_TEMP_ALARM_DHT_STATEMENT_HIGH','LANG_TEMP_ALARM_DHT_STATEMENT_MEDIUM','LANG_TEMP_ALARM_DHT_STATEMENT_LOW','LANG_TEMP_ALARM_DHT_INPUT_PIN','LANG_TEMP_ALARM_DHT_FIELD_WARN','LANG_TEMP_ALARM_DHT_OUTPUT','LANG_TEMP_ALARM_DHT','LANG_TEMP_BUS_PIN','LANG_TEMP_ONCE','LANG_TEMP_ALARM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEMP_ALARM_NAME'),
			description: Facilino.locales.getKey('LANG_TEMP_ALARM_DESCRIPTION'),
			requirements: [Facilino.locales.getKey('LANG_TEMP_DHT_REQUIREMENTS')],
			dropdown: [Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_DROPDOWN_MODEL')],
			statements: [Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_STATEMENT_HIGH'),Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_STATEMENT_MEDIUM'),Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_STATEMENT_LOW')],
			inputs: [Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_INPUT_PIN')],
			fields: [Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_FIELD_WARN')],
			output: [Facilino.locales.getKey('LANG_TEMP_ALARM_DHT_OUTPUT')],
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_TEMPERATURE);
				this.appendValueInput('TEMPERATURE').setCheck([Number,'Variable']).appendField(Facilino.locales.getKey('LANG_TEMP_ALARM_DHT')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_celsius.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_TEMP_ONCE')).appendField(new Blockly.FieldCheckbox('FALSE'),'ONCE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput().appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_high.png",20*options.zoom,20*options.zoom)).appendField(new Blockly.FieldNumber(30,0,50),'HIGH').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_low.png",20*options.zoom,20*options.zoom)).appendField(new Blockly.FieldNumber(15,0,50),'LOW');
				this.appendStatementInput('HIGH').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_high.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('OK').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_ok.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('LOW').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_low.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_TEMP_ALARM_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return ['<value name="TEMPERATURE"><block type="ambient_temp_analog"><value name="PIN"><shadow type="pin_analog"></shadow></value></block></value>','<value name="TEMPERATURE"><block type="ambient_temp_temperatureDHT"><value name="PIN"><shadow type="pin_digital"></shadow></value></block></value>','<value name="TEMPERATURE"><block type="ambient_temp_temperature"><value name="PIN"><shadow type="pin_digital"></shadow></value></block></value>','<value name="TEMPERATURE"><block type="ambient_temp_temperatureHTU"></block></value>','<value name="TEMPERATURE"><block type="ambient_temp_pressureBMP180"></block></value>'];
			}
		};
		}
		
		if (window.FacilinoAdvanced===true)
		{
		/*Blockly.Arduino.ambient_temp_resolution = function() {
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
		['12 Bits','12']]),'RESOLUTION').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/DS18B20.svg",48*options.zoom,48*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_TEMP_BUS_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_RESOLUTION_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_digital"></shadow></value>';
			}
		};*/

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
			this.appendValueInput('TEMP').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_celsius.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_F2C')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_fahrenheit.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Temperature','Variable']);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,[Number,'Temperature']);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_TO_CELSIUS_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="TEMP"><shadow type="math_number"><field name="NUM">32</field></shadow></value>';
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
			this.appendValueInput('TEMP').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_fahrenheit.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_TEMP_C2F')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/thermometer_celsius.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Temperature','Variable']);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,[Number,'Temperature']);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_TO_FAHRENHEIT_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="TEMP"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
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
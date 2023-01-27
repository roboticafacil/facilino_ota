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
				if (this.getInputTargetBlock('PIN').type==='pin_digital')
				{
					Facilino.DHTHumidityIDs[this.id]={pin: pin, type: type};
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
				}
				else
				{
					if (Facilino.profiles['processor']==='ESP32')
						Blockly.Arduino.definitions_['dht']=JST['esp32_dht_definitions_include']({});
					else
						Blockly.Arduino.definitions_['dht']=JST['dht_definitions_include']({});
					if (Facilino.profiles['processor']==='ESP32')
						code+='_dhts['+pin+']->getHumidity()';
					else
						code+='_dhts['+pin+']->readHumidity()';

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
			keys: ['LANG_HUMID_READ_HUMID_DHT_NAME','LANG_HUMID_READ_HUMID','LANG_HUMID_PIN','LANG_HUMID_READ_HUMID_DHT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_HUMID_READ_HUMID_DHT_NAME'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_HUMIDITY);
			this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/humidity.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_HUMID_READ_HUMID')).appendField(new Blockly.FieldDropdown([['DHT11','DHT11'],['DHT21','DHT21'],['DHT22','DHT22']]),'TYPE').appendField(new Blockly.FieldImage("img/blocks/dht11.svg",63*options.zoom,63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_HUMID_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_HUMID_READ_HUMID_DHT_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_digital"></shadow></value>';
			}
		};
		
		Blockly.Arduino.ambient_humid_humidityHTU = function() {
				var code = '';
				Blockly.Arduino.definitions_['htu21d']='#include <SparkFunHTU21D.h>';
				Blockly.Arduino.definitions_['declare_var_define_htu21d']='HTU21D _htu21d;\n';
				Blockly.Arduino.setups_['setup_htu21d']='_htu21d.begin();';
				code+='_htu21d.readHumidity()';
				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_humid_humidityHTU = {
			category: humidity_category,
			subcategory: humidity_digital_subcategory,
			tags: ['humidity','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_humid_humidityDHT'),
			examples: ['ambient_humid_humidityDHT_example.bly'],
			category_colour: humidity_cat_colour,
			colour: humidity_digital_colour,
			keys: ['LANG_HUMID_READ_HUMID_HTU_NAME','LANG_HUMID_READ_HUMID','LANG_TEMP_READ_TEMP_HTU_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_HUMID_READ_HUMID_HTU_NAME'),
			description: Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_DESCRIPTION'),
			requirements: [Facilino.locales.getKey('LANG_TEMP_DHT_REQUIREMENTS')],
			dropdown: [Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_DROPDOWN_MODEL')],
			inputs: [Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_INPUT_PIN')],
			output: [Facilino.locales.getKey('LANG_TEMP_READ_TEMP_DHT_OUTPUT')],
			init: function() {
			this.setColour(humidity_digital_colour);
			this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/humidity.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_HUMID_READ_HUMID')).appendField('HTU21D').appendField(new Blockly.FieldImage("img/blocks/htu21.svg",63*options.zoom,63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_TEMP_READ_TEMP_HTU_TOOLTIP'));
			}
		};

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.ambient_humid_alarm = function() {
			var code = '';
			var humidity=Blockly.Arduino.valueToCode(this,'HUMIDITY') || '';
			var high = Blockly.Arduino.statementToCode(this,'HIGH') || '';
			var low = Blockly.Arduino.statementToCode(this,'LOW') || '';
			var ok = Blockly.Arduino.statementToCode(this,'OK') || '';
			var once = this.getFieldValue('ONCE');
			if (once==='TRUE')
			{
				Blockly.Arduino.definitions_['declare_var_define_humidity_alarm']='bool _humid_high=false;\nbool _humid_low=false;\nbool _humid_ok=false;\n';				
				high='if (!_humid_high){\n  _humid_high=true;\n  _humid_low=false;\n  _humid_ok=false;\n'+Facilino.indentSentences(high)+'\n}\n';
				low='if (!_humid_low){\n  _humid_low=true;\n  _humid_high=false;\n  _humid_ok=false;\n'+Facilino.indentSentences(low)+'\n}\n';
				ok='if (!_humid_ok){\n  _humid_ok=true;\n  _humid_low=false;\n  _humid_high=false;\n'+Facilino.indentSentences(ok)+'\n}\n';
			}
			code+='{\n  float _humidity='+humidity+';\nif (_humidity>='+this.getFieldValue('HIGH')+'){\n'+high+'}\nelse if(_humidity<='+this.getFieldValue('LOW')+'){\n'+low+'}\nelse{\n'+ok+'}\n}\n';
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
				this.appendValueInput('HUMIDITY').appendField(Facilino.locales.getKey('LANG_HUMID_ALARM')).appendField(new Blockly.FieldImage("img/blocks/humidity.png",32*options.zoom,32*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_HUMID_ONCE')).appendField(new Blockly.FieldCheckbox('FALSE'),'ONCE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput().appendField(new Blockly.FieldImage("img/blocks/humidity_high.png", 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(70,0,100),'HIGH').appendField(new Blockly.FieldImage("img/blocks/humidity_low.png", 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(30,0,100),'LOW');
				this.appendStatementInput('HIGH').appendField(new Blockly.FieldImage("img/blocks/humidity_high.png", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('OK').appendField(new Blockly.FieldImage("img/blocks/humidity_ok.png",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('LOW').appendField(new Blockly.FieldImage("img/blocks/humidity_low.png", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				//this.setOutput(true, Number);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_HUMID_ALARM_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return ['<value name="HUMIDITY"><block type="ambient_humid_humidityDHT"><value name="PIN"><shadow type="pin_digital"></shadow></value></block></value>','<value name="HUMIDITY"><block type="ambient_humid_humidityHTU"></block></value>'];
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
			tags: ['moist','ambient'],
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
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_analog"></shadow></value>';
			}
		};

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.ambient_moist_alarm = function() {
			var code = '';
			var moist=Blockly.Arduino.valueToCode(this,'MOIST') || '';
			var high = Blockly.Arduino.statementToCode(this,'HIGH') || '';
			var low = Blockly.Arduino.statementToCode(this,'LOW') || '';
			var ok = Blockly.Arduino.statementToCode(this,'OK') || '';
			var once = this.getFieldValue('ONCE');
			if (once==='TRUE')
			{
				Blockly.Arduino.definitions_['declare_var_define_moist_alarm']='bool _moist_dried=false;\nbool _moist_humid=false;\nbool _moist_ok=false;\n';				
				high='if (!_moist_dried){\n  _moist_dried=true;\n  _moist_humid=false;\n  _moist_ok=false;\n'+Facilino.indentSentences(high)+'\n}\n';
				low='if (!_moist_humid){\n  _moist_humid=true;\n  _moist_dried=false;\n  _moist_ok=false;\n'+Facilino.indentSentences(low)+'\n}\n';
				ok='if (!_moist_ok){\n  _moist_ok=true;\n  _moist_humid=false;\n  _moist_dried=false;\n'+Facilino.indentSentences(ok)+'\n}\n';
			}
			code+='{\n  float _moist='+moist+';\nif (_moist>='+this.getFieldValue('LOW')+'){\n'+high+'}\nelse if(_moist<='+this.getFieldValue('HIGH')+'){\n'+low+'}\nelse{\n'+ok+'}\n}\n';
			return code;
		};

		Blockly.Blocks.ambient_moist_alarm = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HUMIDITY'),
			tags: ['moist','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_moist_alarm'),
			examples: ['ambient_moist_alarm_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_HUMIDITY,
			keys: ['LANG_MOIST_ALARM_NAME','LANG_MOIST_ALARM','LANG_MOIST_PIN','LANG_MOIST_ALARM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOIST_ALARM_NAME'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_HUMIDITY);
				this.appendValueInput('MOIST').appendField(Facilino.locales.getKey('LANG_MOIST_ALARM')).appendField(new Blockly.FieldImage("img/blocks/sprout.svg",32*options.zoom,32*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_HUMID_ONCE')).appendField(new Blockly.FieldCheckbox('FALSE'),'ONCE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput().appendField(new Blockly.FieldImage("img/blocks/sprout_humid.svg", 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(1000,0,4096),'HIGH').appendField(new Blockly.FieldImage("img/blocks/sprout_dried.svg", 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(2000,0,4096),'LOW');
				this.appendStatementInput('LOW').appendField(new Blockly.FieldImage("img/blocks/sprout_humid.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('OK').appendField(new Blockly.FieldImage("img/blocks/sprout.svg",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('HIGH').appendField(new Blockly.FieldImage("img/blocks/sprout_dried.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				//this.setOutput(true, Number);
		this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_MOIST_ALARM_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="MOIST"><block type="ambient_moist"><value name="PIN"><shadow type="pin_analog"></shadow></value></block></value>';
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
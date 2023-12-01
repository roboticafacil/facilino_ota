(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	Blockly.Arduino.dyor_us = function() {
			var echo_pin = Blockly.Arduino.valueToCode(this, 'RED_PIN', Blockly.Arduino.ORDER_ATOMIC);
			var trigger_pin = Blockly.Arduino.valueToCode(this, 'BLUE_PIN', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			
			if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')){
				Blockly.Arduino.definitions_['include_us'] = JST['dyor_us_definitions_include']({});
				Blockly.Arduino.definitions_['define_us_pulseIn'] = JST['dyor_us_definitions_pulseIn']({});
			}
			Blockly.Arduino.definitions_['define_us_init'] = JST['dyor_us_definitions_us_init']({});
			Blockly.Arduino.definitions_['define_us_distance'] = JST['dyor_us_definitions_distance']({});
			
			if (this.getInputTargetBlock('RED_PIN')!=null)
			{
				if (this.getInputTargetBlock('RED_PIN').type==='pin_digital')
				{
					Blockly.Arduino.setups_['inout_digital_input' + echo_pin] = JST['inout_digital_input']({'pin': echo_pin});
				}
			}
			if (this.getInputTargetBlock('RED_PIN')!=null)
			{
				if (this.getInputTargetBlock('BLUE_PIN').type==='pin_digital')
				{
					Blockly.Arduino.setups_['inout_digital_output' + trigger_pin] = JST['inout_digital_output']({'pin': trigger_pin});
				}
			}
			if ((this.getInputTargetBlock('RED_PIN')!=null)&&(this.getInputTargetBlock('BLUE_PIN')!=null))
			{
				if ((this.getInputTargetBlock('RED_PIN').type==='pin_digital')&&(this.getInputTargetBlock('BLUE_PIN').type==='pin_digital'))
					code += JST['dyor_us']({'trigger_pin': trigger_pin,'echo_pin': echo_pin});
				else
					code += 'distance(trigger_pin,echo_pin)';
			}
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
				if (window.FacilinoAdvanced===true)
				{
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_US')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/hc_sr04.svg', 52*options.zoom, 35*options.zoom));
					this.appendValueInput('RED_PIN').appendField(Facilino.locales.getKey('LANG_US_ECHO_PIN')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/hearing.svg',20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','DigitalPinEcho']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('BLUE_PIN').appendField(Facilino.locales.getKey('LANG_US_TRIGGER_PIN')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/speaking.svg',20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','DigitalPinTrigger']).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
				}
				else
				{
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/ultrasound.svg',36*options.zoom,20*options.zoom)).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/hc_sr04.svg', 52*options.zoom, 35*options.zoom));
					this.appendValueInput('RED_PIN').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/digital_signal_echo.svg',20*options.zoom,20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin','DigitalPinEcho']);
					this.appendValueInput('BLUE_PIN').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/digital_signal_trig.svg',20*options.zoom,20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin','DigitalPinTrigger']);
					this.setInputsInline(true);
				}
				
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_US_TOOLTIP'));
			},
			default_inputs: function ()
			{
				var xml='<value name="RED_PIN"><shadow type="pin_digital"></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="BLUE_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="BLUE_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				return xml;
			}
		};
		
		Blockly.Arduino.distance_VL53L0X = function() {
			var code = '';
			Blockly.Arduino.definitions_['include_lidar'] = '#include <Adafruit_VL53L0X.h>';
			Blockly.Arduino.definitions_['define_lidar_distance'] = 'int getLIDARDistance(){\n  VL53L0X_RangingMeasurementData_t measure;\n  _lox.rangingTest(&measure, false);\n  if (measure.RangeStatus != 4) {\n    return measure.RangeMilliMeter;\n  } else {\n    return 9999;\n  }\n}\n';
			Blockly.Arduino.definitions_['declare_var_lidar_lox'] = 'Adafruit_VL53L0X _lox = Adafruit_VL53L0X();';
			Blockly.Arduino.setups_['setup_lidar'] = '_lox.begin();\n';
			
			

			code += 'getLIDARDistance()';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.distance_VL53L0X = {
			category: Facilino.locales.getKey('LANG_CATEGORY_DISTANCE'),
			//subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ULTRASOUND'),
			tags: ['us','distance'],
			helpUrl: Facilino.getHelpUrl('dyor_us'),
			examples: ['dyor_us_example.bly'],
			category_colour: Facilino.LANG_COLOUR_DISTANCE,
			colour: Facilino.LANG_COLOUR_DISTANCE_ULTRASOUND,
			keys: ['LANG_LIDAR_NAME','LANG_LIDAR','LANG_LIDAR_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LIDAR_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_DISTANCE_ULTRASOUND);
				if (window.FacilinoAdvanced===true)
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_LIDAR')).appendField(new Blockly.FieldImage('img/blocks/VL53L0X.svg', 52*options.zoom, 35*options.zoom));
				else
					this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/laser.svg',24*options.zoom,24*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/VL53L0X.svg', 52*options.zoom, 35*options.zoom));
				this.setInputsInline(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_LIDAR_TOOLTIP'));
			}
		};
		
		/*

	Blockly.Arduino.dyor_us_collision = function() {
			var distance_sensor = Blockly.Arduino.valueToCode(this, 'DISTANCE_SENSOR', Blockly.Arduino.ORDER_ATOMIC);
			var distance = Blockly.Arduino.valueToCode(this, 'DISTANCE', Blockly.Arduino.ORDER_ATOMIC);
			var collision = Blockly.Arduino.statementToCode(this,'COLLISION') || '';
			var not_collision = Blockly.Arduino.statementToCode(this,'NOT_COLLISION') || '';
			var code = '';			
			code+='{\nint _sensor_distance='+distance_sensor+';\nint _distance='+distance+';\nif (_sensor_distance<=_distance){\n'+collision+'\n}\nelse\n{\n'+not_collision+'}\n}\n';
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
				if (window.FacilinoAdvanced===true)
				{
					this.appendValueInput('DISTANCE_SENSOR').appendField(Facilino.locales.getKey('LANG_US_DETECT_COLLISION')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/ultrasound.svg',24*options.zoom,24*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('DISTANCE').appendField(Facilino.locales.getKey('LANG_US_DISTANCE')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('COLLISION').appendField(Facilino.locales.getKey('LANG_US_COLLISION')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/rear-end-collision.svg',24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
					this.appendStatementInput('NOT_COLLISION').appendField(Facilino.locales.getKey('LANG_US_NOT_COLLISION')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/no-collision.svg',24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
				else
				{
					
					this.appendValueInput('DISTANCE_SENSOR').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/ultrasound.svg',24*options.zoom,24*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('DISTANCE').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/distance.svg',24*options.zoom,24*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('COLLISION').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/rear-end-collision.svg',24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
					this.appendStatementInput('NOT_COLLISION').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/no-collision.svg',24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
					
				}
				this.setInputsInline(false);
				//this.setOutput(true, Number);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_US_COLLISION_TOOLTIP'));
			},
			default_inputs: function ()
			{
				var xml='<value name="DISTANCE_SENSOR"><block type="dyor_us"><value name="RED_PIN"><shadow type="pin_digital"></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="BLUE_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][0]+'</field></shadow></value>';
				else
					xml+='<value name="BLUE_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][0]+'</field></shadow></value>';
				xml+='</block></value><value name="DISTANCE"><shadow type="math_number"><field name="NUM">15</field></shadow></value>';
				var xml1='<value name="DISTANCE_SENSOR"><block type="distance_VL53L0X"></block></value><value name="DISTANCE"><shadow type="math_number"><field name="NUM">15</field></shadow></value>';
				return [xml,xml1];
			}
		};	*/		
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
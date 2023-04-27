(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	{
			var robot_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_MOTORS');
			var robot_colour=Facilino.LANG_COLOUR_MOVEMENT_MOTORS;
		
		Blockly.Arduino.movement_servo_move = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			//Facilino.ServosIDs[this.id]=pin;
			if (this.getInputTargetBlock('PIN')!==undefined)
			{
				if (this.getInputTargetBlock('PIN').type==='pin_digital')
				{
					Facilino.ServosIDs[this.id]=pin;
					if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
					{
						Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
						Blockly.Arduino.definitions_['declare_var_servo_'+pin]=JST['servo_definitions_variables']({pin: pin});
					}
					else if (Facilino.profiles['processor']==='ESP32')
					{
						Blockly.Arduino.definitions_['include_servo'] = '#include <ESP32_Servo.h>';
						Blockly.Arduino.definitions_['declare_var_servo_'+pin]=JST['ESP_servo_definitions_variables']({pin: pin});
					}
					else
						Blockly.Arduino.definitions_['declare_var_servo_'+pin]=JST['servo_definitions_variables']({pin: pin});
					Blockly.Arduino.setups_['movement_servo_move_' + pin] = JST['dyor_servo_setups']({'pin': pin});
					code += JST['movement_servo_move']({'pin': pin,'value_degree': value_degree});
				}
				else
				{
					code += '_servos['+pin+']->write('+value_degree+');\n';
				}
			}
			return code;
		};

		Blockly.Blocks.movement_servo_move = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: robot_subcategory,
			tags: ['servo','movement'],
			helpUrl: Facilino.getHelpUrl('movement_servo_move'),
			examples: ['movement_servo_move_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: robot_colour,
			keys: ['LANG_SERVO_MOVE_NAME','LANG_SERVO_MOVE','LANG_SERVO_MOVE_PIN','LANG_DEGREES','LANG_SERVO_MOVE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SERVO_MOVE_NAME'),
			//servo_move initialization
			init: function() {
				this.setColour(robot_colour);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/servo.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				//this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE')).appendField(new Blockly.FieldImage('img/blocks/servo.svg', 52*options.zoom, 63*options.zoom)).appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",24*options.zoom,24*options.zoom)).setCheck(Number);
		this.appendValueInput('DEGREE', Number).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_DEGREES')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/angle.svg', 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_SERVO_MOVE_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><shadow type="pin_digital"></shadow></value><value name="DEGREE"><shadow type="math_number"><field name="NUM">90</field></shadow></value>';
			}
		};
	}
	
	{
		Blockly.Arduino.movement_servo_cont1 = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE) || '';
			var value_speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) || '';
			//Facilino.ServosIDs[this.id]=pin;
			var code = '';
			if (this.getInputTargetBlock('PIN')!==undefined)
			{
				if (this.getInputTargetBlock('PIN').type==='pin_digital')
				{
					Facilino.ServosIDs[this.id]=pin;
					if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
					{
						Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
						Blockly.Arduino.definitions_['declare_var_servo_'+pin]=JST['servo_definitions_variables']({pin: pin});
					}
					else if (Facilino.profiles['processor']==='ESP32')
					{
						Blockly.Arduino.definitions_['include_servo'] = '#include <ESP32_Servo.h>';
						Blockly.Arduino.definitions_['declare_var_servo_'+pin]=JST['ESP_servo_definitions_variables']({pin: pin});
					}

					Blockly.Arduino.setups_['movement_servo_move_' + pin] = JST['dyor_servo_setups']({'pin': pin});
					code += JST['movement_servo_cont1']({'pin': pin,'value_speed': value_speed});
				}
				else
				{
					code += '_servos['+pin+']->write('+value_speed+');\n';
				}
			}
			return code;
		};

		Blockly.Blocks.movement_servo_cont1 = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MOTORS'),
			tags: ['servo','movement'],
			helpUrl: Facilino.getHelpUrl('movement_servo_cont1'),
			examples: ['movement_servo_cont_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_MOTORS,
			keys: ['LANG_SERVO_CONT_NAME','LANG_SERVO_CONT','LANG_SERVO_CONT_PIN','LANG_SPEED','LANG_SERVO_CONT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SERVO_CONT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MOVEMENT_MOTORS);
		this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SERVO_CONT')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/servo_cont.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_SERVO_CONT_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				//this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SERVO_CONT')).appendField(new Blockly.FieldImage('img/blocks/servo_cont.svg', 63*options.zoom, 63*options.zoom)).appendField(Facilino.locales.getKey('LANG_SERVO_CONT_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/pwm_signal.svg",24*options.zoom,24*options.zoom)).setCheck(Number);
				this.appendValueInput('SPEED').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_SPEED')+' (-100~100)').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/speedometer.svg', 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_SERVO_CONT_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><shadow type="pin_digital"></shadow></value><value name="SPEED"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
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
		
		if (window.FacilinoAdvanced===true)
		{
			Blockly.Arduino.movement_servo_attach = function() {
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				var code = '';
				Facilino.ServosIDs[this.id]=pin;
				if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
				{
					Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
					Blockly.Arduino.definitions_['declare_var_servo_'+pin]=JST['servo_definitions_variables']({pin: pin});
				}
				else if (Facilino.profiles['processor']==='ESP32')
				{
					//Blockly.Arduino.definitions_['include_servo'] = '#include <ESP32Servo.h>';
					Blockly.Arduino.definitions_['include_servo'] = '#include <ESP32_Servo.h>';
					Blockly.Arduino.definitions_['declare_var_servo_'+pin]=JST['ESP_servo_definitions_variables']({pin: pin});
				}
				else
					Blockly.Arduino.definitions_['declare_var_servo_'+pin]=JST['servo_definitions_variables']({pin: pin});
				code += '_servo'+pin+'.attach('+pin+','+this.getFieldValue('MIN')+','+this.getFieldValue('MAX')+');\n';
				return code;
			};

			Blockly.Blocks.movement_servo_attach = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: robot_subcategory,
				tags: ['servo','movement'],
				helpUrl: Facilino.getHelpUrl('movement_servo_move'),
				examples: ['movement_servo_move_example.bly'],
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: robot_colour,
				keys: ['LANG_SERVO_ATTACH_NAME','LANG_SERVO_ATTACH','LANG_SERVO_MOVE_PIN','LANG_SERVO_ATTACH_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_SERVO_ATTACH_NAME'),
				//servo_move initialization
				init: function() {
					this.setColour(robot_colour);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SERVO_ATTACH')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/servo.svg', 24*options.zoom, 24*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/servo_cont.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField('us').appendField(new Blockly.FieldNumber(500,400,1500),'MIN').appendField(new Blockly.FieldNumber(2500,1500,2600),'MAX')
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_SERVO_ATTACH_TOOLTIP'));
				},
				default_inputs: function()
				{
					return '<value name="PIN"><shadow type="pin_digital"></shadow></value>';
				}
			};
			
			Blockly.Arduino.movement_servo_detach = function() {
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				var code = '';

				if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
				{
					Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
					Blockly.Arduino.definitions_['declare_var_servo_'+pin]=JST['servo_definitions_variables']({pin: pin});
				}
				else if (Facilino.profiles['processor']==='ESP32')
				{
					Blockly.Arduino.definitions_['include_servo'] = '#include <ESP32Servo.h>';
					Blockly.Arduino.definitions_['declare_var_servo_'+pin]=JST['ESP_servo_definitions_variables']({pin: pin});
				}
				else
					Blockly.Arduino.definitions_['declare_var_servo_'+pin]=JST['servo_definitions_variables']({pin: pin});

				code += '_servo'+pin+'.detach();\n';
				return code;
			};

			Blockly.Blocks.movement_servo_detach = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: robot_subcategory,
				tags: ['servo','movement'],
				helpUrl: Facilino.getHelpUrl('movement_servo_move'),
				examples: ['movement_servo_move_example.bly'],
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: robot_colour,
				keys: ['LANG_SERVO_DETACH_NAME','LANG_SERVO_DETACH','LANG_SERVO_MOVE_PIN','LANG_SERVO_DETACH_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_SERVO_DETACH_NAME'),
				//servo_move initialization
				init: function() {
					this.setColour(robot_colour);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SERVO_DETACH')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/servo.svg', 24*options.zoom, 24*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/servo_cont.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_SERVO_DETACH_TOOLTIP'));
				},
				default_inputs: function()
				{
					return '<value name="PIN"><shadow type="pin_digital"></shadow></value>';
				}
			};
		}

		Blockly.Arduino.dyor_dc_motor1 = function() {
			var pin1 = Blockly.Arduino.valueToCode(this, 'PIN1', Blockly.Arduino.ORDER_ATOMIC) || '';
			var pin2 = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC) || '';
			var value_dir = this.getFieldValue('ROT');
			var value_speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			Blockly.Arduino.setups_['inout_digital_output' + pin1] = JST['inout_digital_output']({'pin': pin1});
			Blockly.Arduino.setups_['inout_digital_output' + pin2] = JST['inout_digital_output']({'pin': pin2});

			code += '  {\n';
			code +='	int _speed = ((((int)('+value_speed+'))*255)/100);\n';
			code +='	if (_speed>0){\n';
			code +='	  analogWrite('+pin1+',_speed);\n';
			code +='	  digitalWrite('+pin2+',0);\n';
			code +='	}\n';
			code +='	else if (_speed<0){\n';
			code +='	   digitalWrite('+pin1+',0);\n';
			code +='	   analogWrite('+pin2+',-_speed);\n';
			code +='	}\n';
			code +='	else{\n';
			code +='	  digitalWrite('+pin1+',1);\n';
			code +='	  digitalWrite('+pin2+',1);\n';
			code +='	}\n';
			code += '  }\n';
			return code;
		};

		Blockly.Blocks.dyor_dc_motor1 = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MOTORS'),
			tags: ['servo','movement'],
			helpUrl: Facilino.getHelpUrl('dyor_dc_motor1'),
			examples: ['dyor_dc_motor_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_MOTORS,
			keys: ['LANG_SERVO_DC_MOTOR_NAME','LANG_DC_MOTOR','LANG_SERVO_CONT_PIN','LANG_SPEED','LANG_SERVO_DC_MOTOR_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SERVO_DC_MOTOR_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MOVEMENT_MOTORS);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_DC_MOTOR')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/engine.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				//this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/drv8833.png', 63*options.zoom, 63*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/add-icon.png',63*options.zoom, 63*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/micro_gear_motor.png', 63*options.zoom, 63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN1').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_SERVO_CONT_PIN')+'1').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/pwm_signal.svg",20*options.zoom,20*options.zoom)).setCheck('PWMPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN2').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_SERVO_CONT_PIN')+'2').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/pwm_signal.svg",20*options.zoom,20*options.zoom)).setCheck('PWMPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('SPEED').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_SPEED')+' (-100~100)').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/speedometer.svg', 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_SERVO_DC_MOTOR_TOOLTIP'));
				},
				default_inputs: function()
				{
					var xml='';
					xml += '<value name="PIN1"><shadow type="pin_pwm"></shadow></value>';
					if (Facilino.profiles.default.pwm.length>1)
						xml+='<value name="PIN2"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[1][1]+'</field></shadow></value>';
					else
						xml+='<value name="PIN2"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[0][1]+'</field></shadow></value>';
					xml +='<value name="SPEED"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
					return xml;
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

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino['stepper_setspeed4'] = function() {
			var pin1 = this.getFieldValue('PIN1');
			var pin2 = this.getFieldValue('PIN2');
			var pin3 = this.getFieldValue('PIN3');
			var pin4 = this.getFieldValue('PIN4');
			var total_steps = this.getFieldValue('TOTAL_STEPS');
			var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
			var stepper_name = '_stepper_'+pin1+'_'+pin2+'_'+pin3+'_'+pin4;
			Blockly.Arduino.definitions_['include_stepper'] = '#include <Stepper.h>';
			Blockly.Arduino.definitions_['declare_var_define'+stepper_name]='Stepper '+stepper_name+'('+total_steps+','+pin1+','+pin2+','+pin3+','+pin4+');\n';
			var code = stepper_name+'.setSpeed('+speed+');\n';
			return code;
		};

		Blockly.Blocks['stepper_setspeed4'] = {
		  category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
		  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MOTORS'),
		  tags: ['stepper','movement'],
		  category_colour: Facilino.LANG_COLOUR_MOVEMENT,
		  colour: Facilino.LANG_COLOUR_MOVEMENT_MOTORS,
		  helpUrl: Facilino.getHelpUrl('stepper_setspeed4'),
		  examples: ['stepper_example.bly'],
		  keys: ['LANG_STEPPER_SET_SPEED_NAME','LANG_STEPPER','LANG_STEPPER_SET_SPEED','LANG_STEPPER_TOTAL_STEPS','LANG_STEPPER_PIN1','LANG_STEPPER_PIN2','LANG_STEPPER_PIN3','LANG_STEPPER_PIN4','LANG_STEPPER_RPM','LANG_STEPPER_SET_SPEED_TOOLTIP'],
		  name: Facilino.locales.getKey('LANG_STEPPER_SET_SPEED_NAME'),
		  init: function() {
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_STEPPER')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/stepper.png', 36*options.zoom, 36*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_STEPPER_TOTAL_STEPS')).appendField(new Blockly.FieldNumber(2048, 0, Infinity, 1),"TOTAL_STEPS").setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_STEPPER_PIN1')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN1").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN2')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN2").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN3')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN3").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN4')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN4").setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput("SPEED").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_STEPPER_SET_SPEED')+' ('+Facilino.locales.getKey('LANG_STEPPER_RPM')+')').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/speedometer.svg', 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']);
			this.setPreviousStatement(true, "code");
			this.setNextStatement(true, "code");
			this.setInputsInline(false);
			this.setColour(Facilino.LANG_COLOUR_MOVEMENT_MOTORS);
			this.setTooltip(Facilino.locales.getKey('LANG_STEPPER_SET_SPEED_TOOLTIP'));
			if (Facilino.profiles.default.digital.length>1)
				this.setFieldValue(Facilino.profiles.default.digital[1][1],'PIN2');
			if (Facilino.profiles.default.digital.length>2)
				this.setFieldValue(Facilino.profiles.default.digital[2][1],'PIN3');
			if (Facilino.profiles.default.digital.length>3)
				this.setFieldValue(Facilino.profiles.default.digital[3][1],'PIN4');
		  },
		  default_inputs: function()
		  {
			  return '<value name="SPEED"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
		  }
		};
		}

		Blockly.Arduino['stepper_steps4'] = function() {
			var pin1 = this.getFieldValue('PIN1');
			var pin2 = this.getFieldValue('PIN2');
			var pin3 = this.getFieldValue('PIN3');
			var pin4 = this.getFieldValue('PIN4');
			var total_steps = this.getFieldValue('TOTAL_STEPS');
			var step = Blockly.Arduino.valueToCode(this, 'STEPS', Blockly.Arduino.ORDER_ATOMIC);
			var stepper_name = '_stepper_'+pin1+'_'+pin2+'_'+pin3+'_'+pin4;
			Blockly.Arduino.definitions_['include_stepper'] = '#include <Stepper.h>';
			Blockly.Arduino.definitions_['declare_var_define'+stepper_name]='Stepper '+stepper_name+'('+total_steps+','+pin1+','+pin2+','+pin3+','+pin4+');\n';
			var code = stepper_name+'.step('+step+');\n';
			return code;
		};

		Blockly.Blocks['stepper_steps4'] = {
		  category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
		  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MOTORS'),
		  tags: ['stepper','movement'],
		  category_colour: Facilino.LANG_COLOUR_MOVEMENT,
		  colour: Facilino.LANG_COLOUR_MOVEMENT_MOTORS,
		  helpUrl: Facilino.getHelpUrl('stepper_steps4'),
		  examples: ['stepper_example.bly'],
		  keys: ['LANG_STEPPER_STEPS_NAME','LANG_STEPPER','LANG_STEPPER_STEPS','LANG_STEPPER_TOTAL_STEPS','LANG_STEPPER_PIN1','LANG_STEPPER_PIN2','LANG_STEPPER_PIN3','LANG_STEPPER_PIN4','LANG_STEPPER_STEPS_TOOLTIP'],
		  name: Facilino.locales.getKey('LANG_STEPPER_STEPS_NAME'),
		  init: function() {
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_STEPPER')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/stepper.png', 36*options.zoom, 36*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_STEPPER_TOTAL_STEPS')).appendField(new Blockly.FieldNumber(2048, 0, Infinity, 1),"TOTAL_STEPS").setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_STEPPER_PIN1')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN1").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN2')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN2").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN3')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN3").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN4')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN4").setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput("STEPS").setCheck(Number).setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_STEPPER_STEPS')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/steps.svg', 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']);
			this.setPreviousStatement(true, "code");
			this.setNextStatement(true, "code");
			this.setInputsInline(false);
			this.setColour(Facilino.LANG_COLOUR_MOVEMENT_MOTORS);
			this.setTooltip(Facilino.locales.getKey('LANG_STEPPER_STEPS_TOOLTIP'));
			if (Facilino.profiles.default.digital.length>1)
				this.setFieldValue(Facilino.profiles.default.digital[1][1],'PIN2');
			if (Facilino.profiles.default.digital.length>2)
				this.setFieldValue(Facilino.profiles.default.digital[2][1],'PIN3');
			if (Facilino.profiles.default.digital.length>3)
				this.setFieldValue(Facilino.profiles.default.digital[3][1],'PIN4');
		  },
		  default_inputs: function()
		  {
			  return '<value name="STEPS"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
		  }
		};
	}
	}
	
	var FacilinoMotor = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoMotor;
	} else {
		window.FacilinoMotor = FacilinoMotor;
	}
}));
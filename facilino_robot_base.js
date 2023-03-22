(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	{
		if (window.FacilinoAdvanced===true)
		{
			var robot_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTBASE');
			var robot_colour=Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE;
		}
		else
		{
			var robot_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOT');
			var robot_colour=Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE;
		}
		
		if (window.FacilinoAdvanced===true)
		{
	Blockly.Arduino.movement_move_base = function() {
		var code = '';
		var left = Blockly.Arduino.valueToCode(this, 'LEFT', Blockly.Arduino.ORDER_NONE);
		var right = Blockly.Arduino.valueToCode(this, 'RIGHT', Blockly.Arduino.ORDER_NONE);
		var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
		var advance = Blockly.Arduino.valueToCode(this, 'ADVANCE', Blockly.Arduino.ORDER_ATOMIC);
		var turn = Blockly.Arduino.valueToCode(this, 'TURN', Blockly.Arduino.ORDER_ATOMIC);
		var attach = this.getFieldValue('ATTACH');
		if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
		{
			Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
			Blockly.Arduino.definitions_['declare_var_servo_'+left]=JST['servo_definitions_variables']({pin: left});
			Blockly.Arduino.definitions_['declare_var_servo_'+right]=JST['servo_definitions_variables']({pin: right});
		}
		else if (Facilino.profiles['processor']==='ESP32')
		{
			Blockly.Arduino.definitions_['include_servo'] = '#include <ESP32_Servo.h>';
			Blockly.Arduino.definitions_['declare_var_servo_'+left]=JST['ESP_servo_definitions_variables']({pin: left});
			Blockly.Arduino.definitions_['declare_var_servo_'+right]=JST['ESP_servo_definitions_variables']({pin: right});
		}

		if (attach==='FALSE'){
			Blockly.Arduino.definitions_['define_move_base_'+left+'_'+right] = JST['move_base_definitions']({left: left, right: right});
			Blockly.Arduino.setups_['movement_servo_move_' + left] = JST['dyor_servo_setups']({'pin': left});
			Blockly.Arduino.setups_['movement_servo_move_' + right] = JST['dyor_servo_setups']({'pin': right});
			code += JST['movement_move_base']({'left': left,'right': right,'speed': speed,'advance': advance,'turn': turn});
		}
		else
		{
			Blockly.Arduino.definitions_['define_move_base_attach_'+left+'_'+right] = JST['move_base_attach_definitions']({left: left, right: right});
			var time = this.getFieldValue('TIME');
			code += JST['movement_move_base_attach']({'left': left,'right': right,'speed': speed,'advance': advance,'turn': turn,'time': time});
		}
		return code;
		};


	Blockly.Blocks.movement_move_base = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTBASE'),
			tags: ['servo','movement'],
			helpUrl: Facilino.getHelpUrl('movement_move_base'),
			examples: ['movement_move_base_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE,
			keys: ['LANG_MOVE_BASE_NAME','LANG_MOVE_BASE','LANG_MOVE_BASE_LEFT','LANG_MOVE_BASE_RIGHT','LANG_SPEED','LANG_ADVANCE','LANG_TURN','LANG_MOVE_BASE_ATTACH','LANG_MOVE_BASE_TIME','LANG_MOVE_BASE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_BASE_NAME'),
			init: function() {
		this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE);
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_BASE')+' (servos)').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/wheeled_robot.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('LEFT').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_LEFT')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('RIGHT').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_RIGHT')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('SPEED').appendField(Facilino.locales.getKey('LANG_SPEED')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/speedometer.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('ADVANCE').appendField(Facilino.locales.getKey('LANG_ADVANCE')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/vertical-resize.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('TURN').appendField(Facilino.locales.getKey('LANG_TURN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/turn.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable','Turn']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendDummyInput('ATTACH').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_ATTACH')).appendField(new Blockly.FieldCheckbox('FALSE'),'ATTACH').setAlign(Blockly.ALIGN_RIGHT);
		this.appendDummyInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_TIME'),'TIME_TEXT').appendField(new Blockly.FieldNumber(1000),'TIME').setAlign(Blockly.ALIGN_RIGHT);
		this.default_time = this.getFieldValue('TIME') ||1000;
		this.setInputsInline(false);
		this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
		this.setTooltip(Facilino.locales.getKey('LANG_MOVE_BASE_TOOLTIP'));
			},
			default_inputs: function()
				{
					var xml='';
					xml += '<value name="LEFT"><shadow type="pin_digital"></shadow></value>';
					if (Facilino.profiles.default.digital.length>1)
						xml+='<value name="RIGHT"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
					else
						xml+='<value name="RIGHT"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
					xml+='<value name="SPEED"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
					xml+='<value name="ADVANCE"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
					xml+='<value name="TURN"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
					return xml;
				},
			onchange: function()
			{
				if (this.getFieldValue('ATTACH')==='FALSE')
				{
					this.removeInput('TIME');
				}
				else
				{
					if (this.getInput('TIME')===null)
						this.appendDummyInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_TIME'),'TIME_TEXT').appendField(new Blockly.FieldNumber(this.default_time),'TIME').setAlign(Blockly.ALIGN_RIGHT);
				}
			}
		};
		}

	Blockly.Arduino.dyor_fblrs = function() {
		var code = '';
		var left = Blockly.Arduino.valueToCode(this, 'LEFT', Blockly.Arduino.ORDER_NONE);
		var right = Blockly.Arduino.valueToCode(this, 'RIGHT', Blockly.Arduino.ORDER_NONE);
		var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
		var option = this.getFieldValue('OPTION');
		var attach = this.getFieldValue('ATTACH') || 'FALSE';
		if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
		{
			Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
			Blockly.Arduino.definitions_['declare_var_servo_'+left]=JST['servo_definitions_variables']({pin: left});
			Blockly.Arduino.definitions_['declare_var_servo_'+right]=JST['servo_definitions_variables']({pin: right});
		}
		else if (Facilino.profiles['processor']==='ESP32')
		{
			Blockly.Arduino.definitions_['include_servo'] = '#include <ESP32Servo.h>';
			Blockly.Arduino.definitions_['declare_var_servo_'+left]=JST['ESP_servo_definitions_variables']({pin: left});
			Blockly.Arduino.definitions_['declare_var_servo_'+right]=JST['ESP_servo_definitions_variables']({pin: right});
		}


		if (attach==='FALSE'){
			Blockly.Arduino.definitions_['define_move_base_'+left+'_'+right] = JST['move_base_definitions']({left: left, right: right});

			Blockly.Arduino.setups_['movement_servo_move_' + left] = JST['dyor_servo_setups']({'pin': left});
			Blockly.Arduino.setups_['movement_servo_move_' + right] = JST['dyor_servo_setups']({'pin': right});

			if (option==='F'){
			code+=JST['movement_move_base']({'left': left,'right': right,'speed': speed,'advance': 100,'turn': 0});
			}
			if (option==='B'){
			code+=JST['movement_move_base']({'left': left,'right': right,'speed': speed,'advance': -100,'turn': 0});
			}
			if (option==='L'){
			code+=JST['movement_move_base']({'left': left,'right': right,'speed': speed,'advance': 0,'turn': 100});
			}
			if (option==='R'){
			code+=JST['movement_move_base']({'left': left,'right': right,'speed': speed,'advance': 0,'turn': -100});
			}
			if (option==='S'){
			code+=JST['movement_move_base']({'left': left,'right': right,'speed': 0,'advance': 0,'turn': 0});
			}

		}
		else
		{
			Blockly.Arduino.definitions_['define_move_base_attach_'+left+'_'+right] = JST['move_base_attach_definitions']({left: left, right: right});
			var time = this.getFieldValue('TIME');
			if (option==='F'){
			code+=JST['movement_move_base_attach']({'left': left,'right': right,'speed': speed,'advance': 100,'turn': 0, 'time': time});
			}
			if (option==='B'){
			code+=JST['movement_move_base_attach']({'left': left,'right': right,'speed': speed,'advance': -100,'turn': 0, 'time': time});
			}
			if (option==='L'){
			code+=JST['movement_move_base_attach']({'left': left,'right': right,'speed': speed,'advance': 0,'turn': 100, 'time': time});
			}
			if (option==='R'){
			code+=JST['movement_move_base_attach']({'left': left,'right': right,'speed': speed,'advance': 0,'turn': -100, 'time': time});
			}
			if (option==='S'){
			code+=JST['movement_move_base_attach']({'left': left,'right': right,'speed': 0,'advance': 0,'turn': 0, 'time': time});
			}
		}

			return code;
		};


	Blockly.Blocks.dyor_fblrs = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: robot_subcategory,
			tags: ['servo','movement'],
			helpUrl: Facilino.getHelpUrl('dyor_fblrs'),
			examples: ['dyor_fblrs_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: robot_colour,
			keys: ['LANG_MOVE_FBLR_NAME','LANG_MOVE_BASE','LANG_MOVE_BASE_LEFT','LANG_MOVE_BASE_RIGHT','LANG_SPEED','LANG_MOVE_FORWARD','LANG_MOVE_BACKWARD','LANG_MOVE_LEFT','LANG_MOVE_RIGHT','LANG_MOVE_STOP','LANG_MOVE_BASE_ATTACH','LANG_MOVE_BASE_TIME','LANG_MOVE_FBLR_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_FBLR_NAME'),
			init: function() {
		this.setColour(robot_colour);
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_BASE')+ ' (servos)').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/wheeled_robot.svg", 32*options.zoom, 32*options.zoom));
		this.appendValueInput('LEFT').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_LEFT')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('RIGHT').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_RIGHT')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('SPEED').appendField(Facilino.locales.getKey('LANG_SPEED')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/speedometer.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_MOVE_FORWARD') || 'Forward', 'F'],
					[Facilino.locales.getKey('LANG_MOVE_BACKWARD') || 'Backward', 'B'],
			[Facilino.locales.getKey('LANG_MOVE_LEFT') || 'Left', 'L'],
			[Facilino.locales.getKey('LANG_MOVE_RIGHT') || 'Right', 'R'],
			[Facilino.locales.getKey('LANG_MOVE_STOP') ||'Stop', 'S' ]]),'OPTION').setAlign(Blockly.ALIGN_RIGHT);
			if (window.FacilinoAdvanced===true)
			{
				this.appendDummyInput('ATTACH').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_ATTACH')).appendField(new Blockly.FieldCheckbox('FALSE'),'ATTACH').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_TIME'),'TIME_TEXT').appendField(new Blockly.FieldNumber(1000),'TIME').setAlign(Blockly.ALIGN_RIGHT);
			}
		this.default_time = this.getFieldValue('TIME') || 1000;
		this.setInputsInline(false);
		this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
		this.setTooltip(Facilino.locales.getKey('LANG_MOVE_FBLR_TOOLTIP'));
			},
			default_inputs: function()
				{
					var xml='';
					xml += '<value name="LEFT"><shadow type="pin_digital"></shadow></value>';
					if (Facilino.profiles.default.digital.length>1)
						xml+='<value name="RIGHT"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
					else
						xml+='<value name="RIGHT"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
					xml+='<value name="SPEED"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
					return xml;
				},
			onchange: function()
			{
				if (window.FacilinoAdvanced===true)
				{
					if (this.getFieldValue('ATTACH')==='FALSE')
					{
						this.removeInput('TIME');
					}
					else
					{
						if (this.getInput('TIME')===null)
							this.appendDummyInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_TIME'),'TIME_TEXT').appendField(new Blockly.FieldNumber(this.default_time),'TIME').setAlign(Blockly.ALIGN_RIGHT);
					}
				}
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{
	Blockly.Arduino.movement_move_base_cc = function() {
		var code = '';
		var pin1 = Blockly.Arduino.valueToCode(this, 'LEFT1', Blockly.Arduino.ORDER_ATOMIC) || '0';
		var pin2 = Blockly.Arduino.valueToCode(this, 'LEFT2', Blockly.Arduino.ORDER_ATOMIC) || '0';
		var pin3 = Blockly.Arduino.valueToCode(this, 'RIGHT1', Blockly.Arduino.ORDER_ATOMIC) || '0';
		var pin4 = Blockly.Arduino.valueToCode(this, 'RIGHT2', Blockly.Arduino.ORDER_ATOMIC) || '0';
		var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) ||'0';
		var advance = Blockly.Arduino.valueToCode(this, 'ADVANCE', Blockly.Arduino.ORDER_ATOMIC) ||'0';
		var turn = Blockly.Arduino.valueToCode(this, 'TURN', Blockly.Arduino.ORDER_ATOMIC) ||'0';
		Blockly.Arduino.definitions_['define_move_base'] = JST['move_base2_definitions']({});
		Blockly.Arduino.setups_['inout_digital_output' + pin1] = JST['inout_digital_output']({'pin': pin1});
		Blockly.Arduino.setups_['inout_digital_output' + pin2] = JST['inout_digital_output']({'pin': pin2});
		Blockly.Arduino.setups_['inout_digital_output' + pin3] = JST['inout_digital_output']({'pin': pin3});
		Blockly.Arduino.setups_['inout_digital_output' + pin4] = JST['inout_digital_output']({'pin': pin4});

		code='move_base2('+pin1+','+pin2+','+pin3+','+pin4+','+speed+','+advance+','+turn+');\n';

		return code;
		};


	Blockly.Blocks.movement_move_base_cc = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTBASE'),
			tags: ['motor','movement'],
			helpUrl: Facilino.getHelpUrl('movement_move_base_cc'),
			examples: ['movement_move_base_cc_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE,
			keys: ['LANG_MOVE_BASE_CC_NAME','LANG_MOVE_BASE','LANG_MOVE_BASE_LEFT','LANG_MOVE_BASE_RIGHT','LANG_SPEED','LANG_ADVANCE','LANG_TURN','LANG_MOVE_BASE_CC_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_BASE_CC_NAME'),
			init: function() {
		this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE);
		this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_BASE')+ ' (CC)').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/wheeled_robot.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('LEFT1').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_LEFT')+' IN1').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/pwm_signal.svg",20*options.zoom,20*options.zoom)).setCheck('PWMPin').setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('LEFT2').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_LEFT')+' IN2').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/pwm_signal.svg",20*options.zoom,20*options.zoom)).setCheck('PWMPin').setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('RIGHT1').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_RIGHT')+' IN3').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/pwm_signal.svg",20*options.zoom,20*options.zoom)).setCheck('PWMPin').setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('RIGHT2').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_RIGHT')+' IN4').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/pwm_signal.svg",20*options.zoom,20*options.zoom)).setCheck('PWMPin').setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('SPEED').appendField(Facilino.locales.getKey('LANG_SPEED')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/speedometer.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('ADVANCE').appendField(Facilino.locales.getKey('LANG_ADVANCE')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/vertical-resize.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('TURN').appendField(Facilino.locales.getKey('LANG_TURN')).appendField(new Blockly.FieldImage("img/blocks/turn.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable','Turn']).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
		this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
		this.setTooltip(Facilino.locales.getKey('LANG_MOVE_BASE_CC_TOOLTIP'));
			},
			default_inputs: function ()
			{
				var xml='';
				xml += '<value name="LEFT1"><shadow type="pin_pwm"></shadow></value>';
				if (Facilino.profiles.default.pwm.length>1)
					xml+='<value name="LEFT2"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="LEFT2"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.pwm.length>2)
					xml+='<value name="RIGHT1"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[2][1]+'</field></shadow></value>';
				else
					xml+='<value name="RIGHT1"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.pwm.length>3)
					xml+='<value name="RIGHT2"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[3][1]+'</field></shadow></value>';
				else
					xml+='<value name="RIGHT2"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[0][1]+'</field></shadow></value>';
				xml +='<value name="SPEED"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
				xml +='<value name="ADVANCE"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
				xml +='<value name="TURN"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				return xml;
			}
		};
		}

	Blockly.Arduino.dyor_fblrs_cc = function() {
		var code = '';
		var pin1 = Blockly.Arduino.valueToCode(this, 'LEFT1', Blockly.Arduino.ORDER_ATOMIC) || '0';
		var pin2 = Blockly.Arduino.valueToCode(this, 'LEFT2', Blockly.Arduino.ORDER_ATOMIC) || '0';
		var pin3 = Blockly.Arduino.valueToCode(this, 'RIGHT1', Blockly.Arduino.ORDER_ATOMIC) || '0';
		var pin4 = Blockly.Arduino.valueToCode(this, 'RIGHT2', Blockly.Arduino.ORDER_ATOMIC) || '0';
		var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC) ||'0';
		var option = this.getFieldValue('OPTION');
		Blockly.Arduino.definitions_['define_move_base'] = JST['move_base2_definitions']({});
		Blockly.Arduino.setups_['inout_digital_output' + pin1] = JST['inout_digital_output']({'pin': pin1});
		Blockly.Arduino.setups_['inout_digital_output' + pin2] = JST['inout_digital_output']({'pin': pin2});
		Blockly.Arduino.setups_['inout_digital_output' + pin3] = JST['inout_digital_output']({'pin': pin3});
		Blockly.Arduino.setups_['inout_digital_output' + pin4] = JST['inout_digital_output']({'pin': pin4});

		if (option==='F'){
			code+='move_base2('+pin1+','+pin2+','+pin3+','+pin4+','+speed+',100,0);\n';
		}
		if (option==='B'){
		  code+='move_base2('+pin1+','+pin2+','+pin3+','+pin4+','+speed+',-100,0);\n';
		}
		if (option==='L'){
		  code+='move_base2('+pin1+','+pin2+','+pin3+','+pin4+','+speed+',0,100);\n';
		}
		if (option==='R'){
		  code+='move_base2('+pin1+','+pin2+','+pin3+','+pin4+','+speed+',0,-100);\n';
		}
		if (option==='S'){
		  code+='move_base2('+pin1+','+pin2+','+pin3+','+pin4+','+speed+',0,0);\n';
		}
			return code;
		};


	Blockly.Blocks.dyor_fblrs_cc = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: robot_subcategory,
			tags: ['motor','movement'],
			helpUrl: Facilino.getHelpUrl('dyor_fblrs_cc'),
			examples: ['dyor_fblrs_cc_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: robot_colour,
			keys: ['LANG_MOVE_FBLR_CC_NAME','LANG_MOVE_BASE','LANG_MOVE_BASE_LEFT','LANG_MOVE_BASE_RIGHT','LANG_SPEED','LANG_MOVE_FORWARD','LANG_MOVE_BACKWARD','LANG_MOVE_LEFT','LANG_MOVE_RIGHT','LANG_MOVE_STOP','LANG_MOVE_FBLR_CC_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_FBLR_CC_NAME'),
			init: function() {
			this.setColour(robot_colour);
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_BASE')+ ' (CC)').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/wheeled_robot.svg", 32*options.zoom, 32*options.zoom));
		this.appendValueInput('LEFT1').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_LEFT')+' IN1').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/pwm_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('LEFT2').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_LEFT')+' IN2').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/pwm_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('RIGHT1').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_RIGHT')+' IN3').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/pwm_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('RIGHT2').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_RIGHT')+' IN4').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/pwm_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('SPEED').appendField(Facilino.locales.getKey('LANG_SPEED')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/speedometer.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_MOVE_FORWARD') || 'Forward', 'F'],
					[Facilino.locales.getKey('LANG_MOVE_BACKWARD') || 'Backward', 'B'],
			[Facilino.locales.getKey('LANG_MOVE_LEFT') || 'Left', 'L'],
			[Facilino.locales.getKey('LANG_MOVE_RIGHT') || 'Right', 'R'],
			[Facilino.locales.getKey('LANG_MOVE_STOP') ||'Stop', 'S' ]]),'OPTION').setAlign(Blockly.ALIGN_RIGHT);
		this.setInputsInline(false);
		this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
		this.setTooltip(Facilino.locales.getKey('LANG_MOVE_FBLR_CC_TOOLTIP'));
			},
			default_inputs: function ()
			{
				var xml='';
				xml += '<value name="LEFT1"><shadow type="pin_pwm"></shadow></value>';
				if (Facilino.profiles.default.pwm.length>1)
					xml+='<value name="LEFT2"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="LEFT2"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.pwm.length>2)
					xml+='<value name="RIGHT1"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[2][1]+'</field></shadow></value>';
				else
					xml+='<value name="RIGHT1"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.pwm.length>3)
					xml+='<value name="RIGHT2"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[3][1]+'</field></shadow></value>';
				else
					xml+='<value name="RIGHT2"><shadow type="pin_pwm"><field name="PIN">'+Facilino.profiles.default.pwm[0][1]+'</field></shadow></value>';
				xml +='<value name="SPEED"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
				return xml;
			}
		};

		Blockly.Arduino['dyor_fblrs_stepper'] = function() {
			var pin1 = this.getFieldValue('PIN1');
			var pin2 = this.getFieldValue('PIN2');
			var pin3 = this.getFieldValue('PIN3');
			var pin4 = this.getFieldValue('PIN4');
			var pin5 = this.getFieldValue('PIN5');
			var pin6 = this.getFieldValue('PIN6');
			var pin7 = this.getFieldValue('PIN7');
			var pin8 = this.getFieldValue('PIN8');
			var total_steps = this.getFieldValue('TOTAL_STEPS');
			var wheel_dia = this.getFieldValue('WHEEL_DIA');
			var speed = Blockly.Arduino.valueToCode(this, 'SPEED', Blockly.Arduino.ORDER_ATOMIC);
			var dist_angle = Blockly.Arduino.valueToCode(this, 'DIST_ANGLE', Blockly.Arduino.ORDER_ATOMIC);
			var stepper_name1 = '_stepper_'+pin1+'_'+pin2+'_'+pin3+'_'+pin4;
			var stepper_name2 = '_stepper_'+pin5+'_'+pin6+'_'+pin7+'_'+pin8;
			Blockly.Arduino.definitions_['include_stepper'] = '#include <Stepper.h>';
			Blockly.Arduino.definitions_['declare_var_define'+stepper_name1]='Stepper '+stepper_name1+'('+total_steps+','+pin1+','+pin2+','+pin3+','+pin4+');\n';
			Blockly.Arduino.definitions_['declare_var_define'+stepper_name2]='Stepper '+stepper_name2+'('+total_steps+','+pin5+','+pin6+','+pin7+','+pin8+');\n';
			var code = stepper_name1+'.setSpeed('+speed+');\n';
			code += stepper_name2+'.setSpeed('+speed+');\n';
			var option = this.getFieldValue('OPTION');
			if (option==='F'){
				code += 'for (int _step=0;_step<((int)(((float)'+dist_angle+'*(float)'+total_steps+')/(3.141516*'+wheel_dia+')));_step++){\n';
				code += '  '+stepper_name1+'.step(1);\n';
				code += '  '+stepper_name2+'.step(-1);\n';
				code += '  yield();\n';
				code += '}\n';
			}
			if (option==='B'){
				code += 'for (int _step=0;_step<((int)(((float)'+dist_angle+'*(float)'+total_steps+')/(3.141516*'+wheel_dia+')));_step++){\n';
				code += '  '+stepper_name1+'.step(-1);\n';
				code += '  '+stepper_name2+'.step(1);\n';
				code += '  yield();\n';
				code += '}\n';
			}
			if (option==='L'){
				code += 'for (int _step=0;_step<((int)(((float)'+dist_angle+'*(float)'+total_steps+')/360.0));_step++){\n';
				code += '  '+stepper_name1+'.step(-1);\n';
				code += '  '+stepper_name2+'.step(-1);\n';
				code += '  yield();\n';
				code += '}\n';
			}
			if (option==='R'){
				code += 'for (int _step=0;_step<((int)(((float)'+dist_angle+'*(float)'+total_steps+')/360.0));_step++){\n';
				code += '  '+stepper_name1+'.step(1);\n';
				code += '  '+stepper_name2+'.step(1);\n';
				code += '  yield();\n';
				code += '}\n';
			}
			return code;
		};


	Blockly.Blocks['dyor_fblrs_stepper'] = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: robot_subcategory,
			tags: ['motor','movement','stepper'],
			helpUrl: Facilino.getHelpUrl('dyor_fblrs_stepper'),
			examples: ['dyor_fblrs_cc_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: robot_colour,
			keys: ['LANG_MOVE_FBLR_STEPPER_NAME','LANG_MOVE_BASE','LANG_STEPPER_TOTAL_STEPS','LANG_STEPPER_WHEEL_DIA','LANG_MOVE_BASE_LEFT','LANG_MOVE_BASE_RIGHT','LANG_STEPPER_PIN1','LANG_STEPPER_PIN2','LANG_STEPPER_PIN3','LANG_STEPPER_PIN4','LANG_STEPPER_PIN5','LANG_STEPPER_PIN6','LANG_STEPPER_PIN7','LANG_STEPPER_PIN8','LANG_STEPPER_SET_SPEED','LANG_STEPPER_RPM','LANG_MOVE_FORWARD','LANG_MOVE_BACKWARD','LANG_MOVE_LEFT','LANG_MOVE_RIGHT','LANG_STEPPER_DISTANCE','LANG_STEPPER_ANGLE','LANG_MOVE_FBLR_STEPPER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_FBLR_STEPPER_NAME'),
			init: function() {
			this.setColour(robot_colour);
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_BASE')+ ' (stepper)').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/wheeled_robot.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_STEPPER_TOTAL_STEPS')).appendField(new Blockly.FieldNumber(2048, 0, Infinity, 1),"TOTAL_STEPS").appendField(Facilino.locales.getKey('LANG_STEPPER_WHEEL_DIA')+' (cm)').appendField(new Blockly.FieldNumber(6, 0, Infinity,0.01),"WHEEL_DIA").setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_MOVE_BASE_LEFT')).appendField(Facilino.locales.getKey('LANG_STEPPER_PIN1')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN1").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN2')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN2").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN3')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN3").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN4')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN4").setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_MOVE_BASE_RIGHT')).appendField(Facilino.locales.getKey('LANG_STEPPER_PIN5')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN5").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN6')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN6").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN7')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN7").appendField(Facilino.locales.getKey('LANG_STEPPER_PIN8')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.digital),"PIN8").setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('SPEED').appendField(Facilino.locales.getKey('LANG_STEPPER_SET_SPEED')+' ('+Facilino.locales.getKey('LANG_STEPPER_RPM')+')').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/speedometer.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_MOVE_FORWARD') || 'Forward', 'F'],
					[Facilino.locales.getKey('LANG_MOVE_BACKWARD') || 'Backward', 'B'],
			[Facilino.locales.getKey('LANG_MOVE_LEFT') || 'Left', 'L'],
			[Facilino.locales.getKey('LANG_MOVE_RIGHT') || 'Right', 'R']]),'OPTION').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
			this.appendValueInput('DIST_ANGLE').appendField(Facilino.locales.getKey('LANG_STEPPER_DISTANCE')+' (cm)','DIST_ANGLE').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
			this.setTooltip(Facilino.locales.getKey('LANG_MOVE_FBLR_STEPPER_TOOLTIP'));
			if (Facilino.profiles.default.digital.length>1)
				this.setFieldValue(Facilino.profiles.default.digital[1][1],'PIN2');
			if (Facilino.profiles.default.digital.length>2)
				this.setFieldValue(Facilino.profiles.default.digital[2][1],'PIN3');
			if (Facilino.profiles.default.digital.length>3)
				this.setFieldValue(Facilino.profiles.default.digital[3][1],'PIN4');
			if (Facilino.profiles.default.digital.length>4)
				this.setFieldValue(Facilino.profiles.default.digital[4][1],'PIN5');
			if (Facilino.profiles.default.digital.length>5)
				this.setFieldValue(Facilino.profiles.default.digital[5][1],'PIN6');
			if (Facilino.profiles.default.digital.length>6)
				this.setFieldValue(Facilino.profiles.default.digital[6][1],'PIN7');
			if (Facilino.profiles.default.digital.length>7)
				this.setFieldValue(Facilino.profiles.default.digital[7][1],'PIN8');
			},
			default_inputs: function()
			{
				return '<value name="SPEED"><shadow type="math_number"><field name="NUM">20</field></shadow></value><value name="DIST_ANGLE"><shadow type="math_number"><field name="NUM">10</field></shadow></value>';
			},
			onchange: function() {
				var option = this.getFieldValue('OPTION');
				if ((option === 'F')||(option === 'B'))
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_STEPPER_DISTANCE')+' (cm)','DIST_ANGLE');
				}
				else
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_STEPPER_ANGLE')+' (º)','DIST_ANGLE');
				}
			}
		};

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino['set_encoders'] = function() {
			var code='';
			var interrupt_left = this.getFieldValue('LEFT');
			var interrupt_right = this.getFieldValue('RIGHT');
			var diametre = this.getFieldValue('WHEEL_DIA');
			var counts = this.getFieldValue('COUNTS');
			var separation = this.getFieldValue('WHEEL_SEP');
			var Blocks=Blockly.getMainWorkspace().getAllBlocks();
			var block_found = Blocks.find(function (block){return (block.type=='get_velocity');});
			var block_found_pos = Blocks.find(function (block){return ((block.type=='set_position')||(block.type=='get_position_x')||(block.type=='get_position_y')||(block.type=='get_orientation')||(block.type=='get_path_length'));});
			Blockly.Arduino.definitions_['declare_var_left_dir'] = 'volatile float _left_dir=0.0;\n';
			Blockly.Arduino.definitions_['declare_var_right_dir'] = 'volatile float _right_dir=0.0;\n';
			Blockly.Arduino.definitions_['declare_var_posx'] = 'volatile float _posx=0;\n';
			Blockly.Arduino.definitions_['declare_var_posy'] = 'volatile float _posy=0;\n';
			Blockly.Arduino.definitions_['declare_var_orith'] = 'volatile float _orith=0;\n';
			Blockly.Arduino.definitions_['declare_var_wheel_inc']='#define _WHEEL_INC ((0.0314159265358979323846264338328*(float)'+diametre+')/(4.0*(float)'+counts+'))\n';
			if ((block_found!==undefined))
				Blockly.Arduino.definitions_['declare_var_wheel_deg']='#define _WHEEL_INC_DEG ((180000000.0/(float)'+counts+'))\n';
			Blockly.Arduino.definitions_['declare_var_wheel_rot']='#define _WHEEL_ROT ((3.14159265358979323846264338328*(float)'+diametre+')/(4.0*(float)'+counts+'*(float)'+separation+'))\n';
			Blockly.Arduino.definitions_['define_isr'+interrupt_left] = 'void _interruptISR'+interrupt_left+'(void){\n';
			if (block_found!==undefined)
			{
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' static unsigned long _left_time_last=0;\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' static float _left_speed[8]={0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' static byte _left_speed_idx=0;\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' unsigned long _left_time_now=micros();\n';
			}
			if (block_found_pos!==undefined)
			{
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' _posx+=_left_dir*(cos(_orith)*_WHEEL_INC);\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' _posy+=_left_dir*(sin(_orith)*_WHEEL_INC);\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' _orith-=_left_dir*_WHEEL_ROT;\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' _path_length+=_left_dir*_WHEEL_INC;\n';
			}
			if (block_found!==undefined)
			{
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' _left_speed[_left_speed_idx%8]=_WHEEL_INC_DEG/((float)(_left_time_now-_left_time_last));\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' float sum=0.0;\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' for (int i=0;i<8;i++)\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' sum+=_left_speed[i];\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' _left_speed_mean=sum/(8*6);\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' _left_speed_idx++;\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_left] += ' _left_time_last=_left_time_now;\n';
			}
			Blockly.Arduino.definitions_['define_isr'+interrupt_left] += '}\n';
			Blockly.Arduino.definitions_['define_isr'+interrupt_right] = 'void _interruptISR'+interrupt_right+'(void){\n';
			if (block_found!==undefined)
			{
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' static unsigned long _right_time_last=0;\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' static float _right_speed[8]={0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0};\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' static byte _right_speed_idx=0;\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' unsigned long _right_time_now=micros();\n';
			}
			if (block_found_pos!==undefined)
			{
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' _posx+=_right_dir*(cos(_orith)*_WHEEL_INC);\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' _posy+=_right_dir*(sin(_orith)*_WHEEL_INC);\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' _orith+=_right_dir*_WHEEL_ROT;\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' _path_length+=_right_dir*_WHEEL_INC;\n';
			}
			if (block_found!==undefined)
			{
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' _right_speed[_right_speed_idx%8]=_WHEEL_INC_DEG/((float)(_right_time_now-_right_time_last));\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' float sum=0.0;\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' for (int i=0;i<8;i++)\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' sum+=_right_speed[i];\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' _right_speed_mean=sum/(8*6);\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' _right_speed_idx++;\n';
				Blockly.Arduino.definitions_['define_isr'+interrupt_right] += ' _right_time_last=_right_time_now;\n';
			}
			Blockly.Arduino.definitions_['define_isr'+interrupt_right] += '}\n';
			Blockly.Arduino.setups_['setup_isr'+interrupt_left] = 'pinMode('+interrupt_left+',INPUT_PULLUP);\n  attachInterrupt(digitalPinToInterrupt('+interrupt_left+'),_interruptISR'+interrupt_left+',CHANGE);\n';
			Blockly.Arduino.setups_['setup_isr'+interrupt_right] = 'pinMode('+interrupt_right+',INPUT_PULLUP);\n  attachInterrupt(digitalPinToInterrupt('+interrupt_right+'),_interruptISR'+interrupt_right+',CHANGE);\n';
			return code;
		};

		Blockly.Blocks['set_encoders'] = {
		  category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
		  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTBASE'),
		  category_colour: Facilino.LANG_COLOUR_MOVEMENT,
		  colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE,
		  helpUrl: Facilino.getHelpUrl('set_encoders'),
		  tags: [],
		  examples: [],
		  keys: ['LANG_MOVE_BASE_SET_ENCODERS_NAME','LANG_MOVE_BASE_SET_ENCODERS','LANG_MOVE_BASE_WHEEL_COUNTS','LANG_MOVE_BASE_WHEEL_DIA','LANG_MOVE_BASE_WHEEL_SEP','LANG_MOVE_BASE_LEFT_ENCODER','LANG_MOVE_BASE_RIGHT_ENCODER','LANG_MOVE_BASE_SET_ENCODERS_TOOLTIP'],
		  name: Facilino.locales.getKey('LANG_MOVE_BASE_SET_ENCODERS_NAME'),
		  init: function() {
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey('LANG_MOVE_BASE_SET_ENCODERS'))
				.appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/encoder.png", 24, 24, null));
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_MOVE_BASE_WHEEL_COUNTS')).appendField(new Blockly.FieldNumber(20, 0, Infinity, 1),"COUNTS").setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_MOVE_BASE_WHEEL_DIA')+' (cm)').appendField(new Blockly.FieldNumber(6.5, 0.01, Infinity,0.01),"WHEEL_DIA").setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_MOVE_BASE_WHEEL_SEP')+' (cm)').appendField(new Blockly.FieldNumber(13.3, 0.01, Infinity,0.01),"WHEEL_SEP").setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey("LANG_MOVE_BASE_LEFT_ENCODER"))
				.appendField(new Blockly.FieldDropdown(Facilino.profiles.default.interrupt), "LEFT");
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey("LANG_MOVE_BASE_RIGHT_ENCODER"))
				.appendField(new Blockly.FieldDropdown(Facilino.profiles.default.interrupt), "RIGHT");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE);
			this.setTooltip(Facilino.locales.getKey("LANG_MOVE_BASE_SET_ENCODERS_TOOLTIP"));
			if (Facilino.profiles.default.digital.length>1)
				this.setFieldValue(Facilino.profiles.default.digital[1][1],'RIGHT');
		  }
		};

		Blockly.Arduino['get_velocity'] = function() {
			var code='';
			if (this.getFieldValue('WHEEL')==='LEFT')
			{
				Blockly.Arduino.definitions_['declare_var_left_speed_mean'] = 'volatile float _left_speed_mean=0.0;\n';
				code = '(_left_speed_mean)';
			}
			else
			{
				Blockly.Arduino.definitions_['declare_var_right_speed_mean'] = 'volatile float _right_speed_mean=0.0;\n';
				code = '(_right_speed_mean)';
			}
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks['get_velocity'] = {
		  category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
		  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTBASE'),
		  category_colour: Facilino.LANG_COLOUR_MOVEMENT,
		  colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE,
		  helpUrl: Facilino.getHelpUrl('get_velocity'),
		  tags: [],
		  examples: [],
		  keys: ['LANG_MOVE_BASE_VELOCITY_NAME','LANG_MOVE_BASE_VELOCITY','LANG_MOVE_BASE_VELOCITY_LEFT','LANG_MOVE_BASE_VELOCITY_RIGHT','LANG_MOVE_BASE_VELOCITY_TOOLTIP'],
		  name: Facilino.locales.getKey('LANG_MOVE_BASE_VELOCITY_NAME'),
		  init: function() {
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey("LANG_MOVE_BASE_VELOCITY")+" (RPM)").appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_MOVE_BASE_VELOCITY_LEFT'),'LEFT'],[Facilino.locales.getKey('LANG_MOVE_BASE_VELOCITY_RIGHT'),'RIGHT']]),'WHEEL')
				.appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/encoder.png", 24, 24, null));
			this.setOutput(true,Number);
			this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE);
			this.setTooltip(Facilino.locales.getKey('LANG_MOVE_BASE_VELOCITY_TOOLTIP'));
		  },
		  onchange: function()
		  {
			  var Blocks=Blockly.getMainWorkspace().getAllBlocks();
			  var block_found = Blocks.find(function (block){return (block.type=='set_encoders');});
			  if (block_found===undefined)
				this.setWarningText('This block instruction requires encoders to measure the velocity');
			  else
				this.setWarningText(null);

		  }
		};

		Blockly.Arduino['set_position'] = function() {
			var code='';
			Blockly.Arduino.definitions_['declare_var_posx'] = 'volatile float _posx=0.0;\n';
			Blockly.Arduino.definitions_['declare_var_posy'] = 'volatile float _posy=0.0;\n';
			Blockly.Arduino.definitions_['declare_var_orith'] = 'volatile float _orith=0.0;\n';
			Blockly.Arduino.definitions_['declare_var_path_length'] = 'volatile float _path_length=0.0;\n';
			code = '_posx=0.01*('+this.getFieldValue('X')+');\n';
			code += '_posy=0.01*('+this.getFieldValue('Y')+');\n';
			code += '_orith=0.01745329251994329576923690768489*('+this.getFieldValue('TH')+');\n';
			code += '_path_length=0.0;\n';
			return code;
		};

		Blockly.Blocks['set_position'] = {
		  category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
		  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTBASE'),
		  category_colour: Facilino.LANG_COLOUR_MOVEMENT,
		  colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE,
		  helpUrl: Facilino.getHelpUrl('set_position'),
		  tags: [],
		  examples: [],
		  keys: ['LANG_MOVE_BASE_SET_POSITION_NAME','LANG_MOVE_BASE_SET_POSITION','LANG_MOVE_BASE_POSITION_X','LANG_MOVE_BASE_POSITION_Y','LANG_MOVE_BASE_ORIENTATION','LANG_MOVE_BASE_SET_POSITION_TOOLTIP'],
		  name: Facilino.locales.getKey('LANG_MOVE_BASE_SET_POSITION_NAME'),
		  init: function() {
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey('LANG_MOVE_BASE_SET_POSITION'))
				.appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/map-placeholder.svg", 24, 24, null));
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey("LANG_MOVE_BASE_POSITION_X")+' (cm)')
				.appendField(new Blockly.FieldTextInput("0"), "X")
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey("LANG_MOVE_BASE_POSITION_Y")+' (cm)')
				.appendField(new Blockly.FieldTextInput("0"), "Y")
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey("LANG_MOVE_BASE_ORIENTATION")+' (º)')
				.appendField(new Blockly.FieldTextInput("0"), "TH");
			this.setPreviousStatement(true, null);
			this.setNextStatement(true, null);
			this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE);
			this.setTooltip(Facilino.locales.getKey("LANG_MOVE_BASE_SET_POSITION_TOOLTIP"));
		  },
		  onchange: function()
		  {
			  var Blocks=Blockly.getMainWorkspace().getAllBlocks();
			  var block_found = Blocks.find(function (block){return (block.type=='set_encoders');});
			  if (block_found===undefined)
				this.setWarningText('This block instruction requires encoders to update the position and orientation');
			  else
				this.setWarningText(null);

		  }
		};

		Blockly.Arduino['get_position_x'] = function() {
			var code='';
			Blockly.Arduino.definitions_['declare_var_posx'] = 'volatile float _posx=0.0;\n';
			code = '(100.0*_posx)';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks['get_position_x'] = {
		  category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
		  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTBASE'),
		  category_colour: Facilino.LANG_COLOUR_MOVEMENT,
		  colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE,
		  helpUrl: Facilino.getHelpUrl('get_position_x'),
		  tags: [],
		  examples: [],
		  keys: ['LANG_MOVE_BASE_POSITION_X_NAME','LANG_MOVE_BASE_POSITION_X','LANG_MOVE_BASE_POSITION_X_TOOLTIP'],
		  name: Facilino.locales.getKey('LANG_MOVE_BASE_POSITION_X_NAME'),
		  init: function() {
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey("LANG_MOVE_BASE_POSITION_X")+" (cm)")
				.appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/map-placeholder.svg", 24, 24, null));
			this.setOutput(true,Number);
			this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE);
			this.setTooltip(Facilino.locales.getKey('LANG_MOVE_BASE_POSITION_X_TOOLTIP'));
		  },
		  onchange: function()
		  {
			  var Blocks=Blockly.getMainWorkspace().getAllBlocks();
			  var block_found = Blocks.find(function (block){return (block.type=='set_encoders');});
			  if (block_found===undefined)
				this.setWarningText('This block instruction requires encoders to update the position');
			  else
				this.setWarningText(null);

		  }
		};

		Blockly.Arduino['get_position_y'] = function() {
			var code='';
			Blockly.Arduino.definitions_['declare_var_posy'] = 'volatile float _posy=0.0;\n';
			code = '(100.0*_posy)';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks['get_position_y'] = {
		  category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
		  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTBASE'),
		  category_colour: Facilino.LANG_COLOUR_MOVEMENT,
		  colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE,
		  helpUrl: Facilino.getHelpUrl('get_position_y'),
		  tags: [],
		  examples: [],
		  keys: ['LANG_MOVE_BASE_POSITION_Y_NAME','LANG_MOVE_BASE_POSITION_Y','LANG_MOVE_BASE_POSITION_Y_TOOLTIP'],
		  name: Facilino.locales.getKey('LANG_MOVE_BASE_POSITION_Y_NAME'),
		  init: function() {
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey("LANG_MOVE_BASE_POSITION_Y")+" (cm)")
				.appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/map-placeholder.svg", 24, 24, null));
			this.setOutput(true,Number);
			this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE);
			this.setTooltip(Facilino.locales.getKey('LANG_MOVE_BASE_POSITION_Y_TOOLTIP'));
		  },
		  onchange: function()
		  {
			  var Blocks=Blockly.getMainWorkspace().getAllBlocks();
			  var block_found = Blocks.find(function (block){return (block.type=='set_encoders');});
			  if (block_found===undefined)
				this.setWarningText('This block instruction requires encoders to update the position');
			  else
				this.setWarningText(null);

		  }
		};

		Blockly.Arduino['get_orientation'] = function() {
			var code='';
			Blockly.Arduino.definitions_['declare_var_orith'] = 'volatile float _orith=0.0;\n';
			code = '(57,295779513082320876798154814105*_orith)';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks['get_orientation'] = {
		  category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
		  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTBASE'),
		  category_colour: Facilino.LANG_COLOUR_MOVEMENT,
		  colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE,
		  helpUrl: Facilino.getHelpUrl('get_orientation'),
		  tags: [],
		  examples: [],
		  keys: ['LANG_MOVE_BASE_POSITION_ORIENTATION_NAME','LANG_MOVE_BASE_ORIENTATION','LANG_MOVE_BASE_POSITION_ORIENTATION_TOOLTIP'],
		  name: Facilino.locales.getKey('LANG_MOVE_BASE_POSITION_ORIENTATION_NAME'),
		  init: function() {
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey("LANG_MOVE_BASE_ORIENTATION")+" (º)")
				.appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/map-placeholder.svg", 24, 24, null));
			this.setOutput(true,Number);
			this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE);
			this.setTooltip(Facilino.locales.getKey('LANG_MOVE_BASE_POSITION_ORIENTATION_TOOLTIP'));
		  },
		  onchange: function()
		  {
			  var Blocks=Blockly.getMainWorkspace().getAllBlocks();
			  var block_found = Blocks.find(function (block){return (block.type=='set_encoders');});
			  if (block_found===undefined)
				this.setWarningText('This block instruction requires encoders to update the orientation');
			  else
				this.setWarningText(null);

		  }
		};

		Blockly.Arduino['get_path_length'] = function() {
			var code='';
			Blockly.Arduino.definitions_['declare_var_path_length'] = 'volatile float _path_length=0.0;\n';
			code = '(100.0*_path_length)';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks['get_path_length'] = {
		  category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
		  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTBASE'),
		  category_colour: Facilino.LANG_COLOUR_MOVEMENT,
		  colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE,
		  helpUrl: Facilino.getHelpUrl('get_path_length'),
		  tags: [],
		  examples: [],
		  keys: ['LANG_MOVE_BASE_PATH_LENGTH_NAME','LANG_MOVE_BASE_PATH_LENGTH','LANG_MOVE_BASE_PATH_LENGTH_TOOLTIP'],
		  name: Facilino.locales.getKey('LANG_MOVE_BASE_PATH_LENGTH_NAME'),
		  init: function() {
			this.appendDummyInput()
				.setAlign(Blockly.ALIGN_RIGHT)
				.appendField(Facilino.locales.getKey("LANG_MOVE_BASE_PATH_LENGTH")+" (cm)")
				.appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/map-placeholder.svg", 24, 24, null));
			this.setOutput(true,Number);
			this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE);
			this.setTooltip(Facilino.locales.getKey('LANG_MOVE_BASE_PATH_LENGTH_TOOLTIP'));
		  },
		  onchange: function()
		  {
			  var Blocks=Blockly.getMainWorkspace().getAllBlocks();
			  var block_found = Blocks.find(function (block){return (block.type=='set_encoders');});
			  if (block_found===undefined)
				this.setWarningText('This block instruction requires encoders to update the path length');
			  else
				this.setWarningText(null);

		  }
		};
		}
	}
	}
	
	var FacilinoRobotBase = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoRobotBase;
	} else {
		window.FacilinoRobotBase = FacilinoRobotBase;
	}
}));
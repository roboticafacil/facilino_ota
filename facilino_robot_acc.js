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
			var robot_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTACC');
			var robot_colour=Facilino.LANG_COLOUR_MOVEMENT_ROBOTACC;
		}
		else
		{
			var robot_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOT');
			var robot_colour=Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE;
		}
		
	Blockly.Arduino.dyor_move_grip = function() {
			var left = Blockly.Arduino.valueToCode(this, 'LEFT', Blockly.Arduino.ORDER_NONE);
			var right = Blockly.Arduino.valueToCode(this, 'RIGHT', Blockly.Arduino.ORDER_NONE);
			var code = '';
			var option = this.getFieldValue('OPTION');
			var attach = this.getFieldValue('ATTACH') || 'FALSE';
			Blockly.Arduino.definitions_['declare_var_define_move_grip'] = JST['movement_move_grip_definitions_variables']({});
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

				Blockly.Arduino.setups_['movement_servo_move_' + left] = JST['dyor_servo_setups']({'pin': left});
				Blockly.Arduino.setups_['movement_servo_move_' + right] = JST['dyor_servo_setups']({'pin': right});

			if (option==='5' || option==='1')
			  code +='_servo'+left+'.write(_left_close);\n';
			if (option==='5' || option==='3')
			  code +='_servo'+right+'.write(_right_close);\n';
			if (option==='6' || option==='2')
			  code +='_servo'+left+'.write(_left_open);\n';
			if (option==='6' || option==='4')
			  code +='_servo'+right+'.write(_right_open);\n';
			}
			else
			{
				var time = this.getFieldValue('TIME');
				if (option==='5' || option==='1')
				  code +='if (!_servo'+left+'.attached())\n	_servo'+left+'.attach('+left+');\n';
				if (option==='5' || option==='3')
				  code +='if (!_servo'+right+'.attached())\n	_servo'+right+'.attach('+right+');\n';
				if (option==='6' || option==='2')
				  code +='if (!_servo'+left+'.attached())\n	_servo'+left+'.attach('+left+');\n';
				if (option==='6' || option==='4')
				  code +='if (!_servo'+right+'.attached())\n	_servo'+right+'.attach('+right+');\n';
				if (option==='5' || option==='1')
				  code +='_servo'+left+'.write(_left_close);\n';
				if (option==='5' || option==='3')
				  code +='_servo'+right+'.write(_right_close);\n';
				if (option==='6' || option==='2')
				  code +='_servo'+left+'.write(_left_open);\n';
				if (option==='6' || option==='4')
				  code +='_servo'+right+'.write(_right_open);\n';
				code +='delay('+time+');\n';
				if (option==='5' || option==='1')
				  code +='  _servo'+left+'.detach();\n';
				if (option==='5' || option==='3')
				  code +='  _servo'+right+'.detach();\n';
				if (option==='6' || option==='2')
				  code +='  _servo'+left+'.detach();\n';
				if (option==='6' || option==='4')
				  code +='  _servo'+right+'.detach();\n';
			}

			return code;
		};

		Blockly.Blocks.dyor_move_grip = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: robot_subcategory,
			tags: ['servo','movement'],
			helpUrl: Facilino.getHelpUrl('dyor_move_grip'),
			examples: ['dyor_move_grip_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: robot_colour,
			keys: ['LANG_MOVE_GRIP_NAME','LANG_SERVO_MOVE_GRIPPER','LANG_MOVE_BASE_LEFT','LANG_MOVE_BASE_RIGHT','LANG_MOVE_LEFT_ARM_GRIP','LANG_MOVE_LEFT_ARM_RELEASE','LANG_MOVE_RIGHT_ARM_GRIP','LANG_MOVE_RIGHT_ARM_RELEASE','LANG_MOVE_GRIP','LANG_MOVE_RELEASE','LANG_MOVE_BASE_ATTACH','LANG_MOVE_BASE_TIME','LANG_MOVE_GRIP_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_GRIP_NAME'),
			//servo_move initialization
			init: function() {
				this.setColour(robot_colour);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_GRIPPER')).appendField(new Blockly.FieldImage('img/blocks/gripper.svg', 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('LEFT').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_MOVE_BASE_LEFT')||'Left').appendField(new Blockly.FieldImage("img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
		this.appendValueInput('RIGHT').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_MOVE_BASE_RIGHT')||'Right').appendField(new Blockly.FieldImage("img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_GRIP') || 'Grip left', '1'],
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_RELEASE') || 'Release left', '2'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_GRIP') || 'Grip right', '3'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_RELEASE') || 'Release right', '4'],
		[Facilino.locales.getKey('LANG_MOVE_GRIP') || 'Grip', '5'],
		[Facilino.locales.getKey('LANG_MOVE_RELEASE') || 'Release', '6']
		]),'OPTION').setAlign(Blockly.ALIGN_RIGHT);
			if (window.FacilinoAdvanced===true)
			{
				this.appendDummyInput('ATTACH').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_ATTACH')).appendField(new Blockly.FieldCheckbox('FALSE'),'ATTACH').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_TIME'),'TIME_TEXT').appendField(new Blockly.FieldNumber(1000),'TIME').setAlign(Blockly.ALIGN_RIGHT);
			}
				this.default_time= this.getFieldValue('TIME') || 1000;
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_MOVE_GRIP_TOOLTIP'));
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
	Blockly.Arduino.dyor_set_grip = function() {
			var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
		var option = this.getFieldValue('OPTION');
		Blockly.Arduino.definitions_['declare_var_define_move_grip'] = JST['movement_move_grip_definitions_variables']({});

		var code='';
		if (option==='1')
		  code +='_left_close='+value+';\n';
		if (option==='3')
		  code +='_right_close='+value+';\n';
		if (option==='2')
		  code +='_left_open='+value+';\n';
		if (option==='4')
		  code +='_right_open='+value+';\n';

			return code;
		};

		Blockly.Blocks.dyor_set_grip = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTACC'),
			tags: ['servo','movement'],
			helpUrl: Facilino.getHelpUrl('dyor_set_grip'),
			examples: ['dyor_move_grip_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTACC,
			keys: ['LANG_SERVO_GRIPPER_MOVE_NAME','LANG_SERVO_MOVE_SET','LANG_MOVE_LEFT_ARM_GRIP','LANG_MOVE_LEFT_ARM_RELEASE','LANG_MOVE_RIGHT_ARM_GRIP','LANG_MOVE_RIGHT_ARM_RELEASE','LANG_SERVO_MOVE_VALUE','LANG_SERVO_GRIPPER_MOVE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SERVO_GRIPPER_MOVE_NAME'),
			//servo_move initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTACC);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_SET')||'Set').appendField(new Blockly.FieldDropdown([
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_GRIP'), '1'],
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_RELEASE'), '2'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_GRIP'), '3'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_RELEASE'), '4']
		]),'OPTION').appendField(new Blockly.FieldImage('img/blocks/gripper.svg', 20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_VALUE')||'Degrees').setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
		this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_SERVO_GRIPPER_MOVE_TOOLTIP'));
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
				}

		/*Blockly.Blocks.dyor_move_arms = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTACC'),
			tags: ['servo','movement'],
			helpUrl: Facilino.getHelpUrl('dyor_move_grip'),
			examples: ['dyor_move_grip_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTACC,
			keys: ['LANG_SERVO_MOVE_SET','LANG_MOVE_LEFT_ARM_GRIP','LANG_MOVE_LEFT_ARM_RELEASE','LANG_MOVE_RIGHT_ARM_GRIP','LANG_MOVE_RIGHT_ARM_RELEASE','LANG_SERVO_MOVE_VALUE','LANG_SERVO_MOVE_TOOLTIP'],
			//servo_move initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTACC);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_SET')||'Set').appendField(new Blockly.FieldDropdown([
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_GRIP'), '1'],
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_RELEASE'), '2'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_GRIP'), '3'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_RELEASE'), '4']
		]),'OPTION').appendField(new Blockly.FieldImage('img/blocks/gripper.svg', 20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_VALUE')||'Degrees').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('ATTACH').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_ATTACH')).appendField(new Blockly.FieldCheckbox('FALSE'),'ATTACH').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_SERVO_MOVE_TOOLTIP'));
			},
			onchange: function()
			{
				if (this.getFieldValue('ATTACH')==='TRUE')
				{
					try{
						if (this.getInput('TIME')===null)
						  this.appendDummyInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_TIME')).appendField(new Blockly.FieldNumber(1000,20),'TIME').setAlign(Blockly.ALIGN_RIGHT);
					}
					catch{
					}
				}
				else
				{
					try{
						this.removeInput('TIME');
					}
					catch{
					}
				}
			}
		};*/

	Blockly.Arduino.dyor_move_arms = function() {
			var left = Blockly.Arduino.valueToCode(this, 'LEFT', Blockly.Arduino.ORDER_NONE);
			var right = Blockly.Arduino.valueToCode(this, 'RIGHT', Blockly.Arduino.ORDER_NONE);
			var option = this.getFieldValue('OPTION');
			var attach = this.getFieldValue('ATTACH') || 'FALSE';
			Blockly.Arduino.definitions_['declare_var_define_move_arms'] = JST['movement_move_arms_definitions_variables']({});
			var code='';

			if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP32'))
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

				Blockly.Arduino.setups_['movement_servo_move_' + left] = JST['dyor_servo_setups']({'pin': left});
				Blockly.Arduino.setups_['movement_servo_move_' + right] = JST['dyor_servo_setups']({'pin': right});

		if (option==='5' || option==='1')
		  code +='_servo'+left+'.write(_left_up);\n';
		if (option==='5' || option==='3')
		  code +='_servo'+right+'.write(_right_up);\n';
		if (option==='6' || option==='2')
		  code +='_servo'+left+'.write(_left_down);\n';
		if (option==='6' || option==='4')
		  code +='_servo'+right+'.write(_right_down);\n';
			}
			else
			{
				var time = this.getFieldValue('TIME');
				if (option==='5' || option==='1')
				  code +='if (!_servo'+left+'.attached())\n	_servo'+left+'.attach('+left+');\n';
				if (option==='5' || option==='3')
				  code +='if (!_servo'+right+'.attached())\n	_servo'+right+'.attach('+right+');\n';
				if (option==='6' || option==='2')
				  code +='if (!_servo'+left+'.attached())\n	_servo'+left+'.attach('+left+');\n';
				if (option==='6' || option==='4')
				  code +='if (!_servo'+right+'.attached())\n	_servo'+right+'.attach('+right+');\n';
				if (option==='5' || option==='1')
				  code +='_servo'+left+'.write(_left_up);\n';
				if (option==='5' || option==='3')
				  code +='_servo'+right+'.write(_right_up);\n';
				if (option==='6' || option==='2')
				  code +='_servo'+left+'.write(_left_down);\n';
				if (option==='6' || option==='4')
				  code +='_servo'+right+'.write(_right_down);\n';
				code +='delay('+time+');\n';
				if (option==='5' || option==='1')
				  code +='  _servo'+left+'.detach();\n';
				if (option==='5' || option==='3')
				  code +='  _servo'+right+'.detach();\n';
				if (option==='6' || option==='2')
				  code +='  _servo'+left+'.detach();\n';
				if (option==='6' || option==='4')
				  code +='  _servo'+right+'.detach();\n';
			}
			return code;
		};

		Blockly.Blocks.dyor_move_arms = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: robot_subcategory,
			tags: ['servo','movement'],
			helpUrl: Facilino.getHelpUrl('dyor_move_arms'),
			examples: ['dyor_move_arms_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: robot_colour,
			keys: ['LANG_MOVE_ARMS_NAME','LANG_SERVO_MOVE_ARMS','LANG_MOVE_BASE_LEFT','LANG_MOVE_BASE_RIGHT','LANG_MOVE_LEFT_ARM_UP','LANG_MOVE_LEFT_ARM_DOWN','LANG_MOVE_RIGHT_ARM_UP','LANG_MOVE_RIGHT_ARM_DOWN','LANG_MOVE_ARMS_UP','LANG_MOVE_ARMS_DOWN','LANG_MOVE_BASE_ATTACH','LANG_MOVE_BASE_TIME','LANG_MOVE_ARMS_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_ARMS_NAME'),
			//servo_move initialization
			init: function() {
				this.setColour(robot_colour);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_ARMS')).appendField(new Blockly.FieldImage('img/blocks/arms.svg', 52*options.zoom, 25*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('LEFT').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_MOVE_BASE_LEFT')||'Left').appendField(new Blockly.FieldImage("img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('RIGHT').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_MOVE_BASE_RIGHT')||'Right').appendField(new Blockly.FieldImage("img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_UP') || 'Left hand up', '1'],
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_DOWN') || 'Left hand down', '2'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_UP') || 'Right hand up', '3'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_DOWN') || 'Right hand dow', '4'],
		[Facilino.locales.getKey('LANG_MOVE_ARMS_UP') || 'Hands up', '5'],
		[Facilino.locales.getKey('LANG_MOVE_ARMS_DOWN') || 'Hands down', '6']
		]),'OPTION').setAlign(Blockly.ALIGN_RIGHT);
				if (window.FacilinoAdvanced===true)
				{
					this.appendDummyInput('ATTACH').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_ATTACH')).appendField(new Blockly.FieldCheckbox('FALSE'),'ATTACH').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_TIME'),'TIME_TEXT').appendField(new Blockly.FieldNumber(1000),'TIME').setAlign(Blockly.ALIGN_RIGHT);
				}
				this.default_time = this.getFieldValue('TIME') || 1000;
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_MOVE_ARMS_TOOLTIP'));
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
	Blockly.Arduino.dyor_set_arms = function() {
			var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ATOMIC);
		var option = this.getFieldValue('OPTION');
		Blockly.Arduino.definitions_['declare_var_define_move_arms'] = JST['movement_move_arms_definitions_variables']({});

		var code='';
		if (option==='1')
		  code +='_left_up='+value+';\n';
		if (option==='3')
		  code +='_right_up='+value+';\n';
		if (option==='2')
		  code +='_left_down='+value+';\n';
		if (option==='4')
		  code +='_right_down='+value+';\n';

			return code;
		};

		Blockly.Blocks.dyor_set_arms = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTACC'),
			tags: ['servo','movement'],
			helpUrl: Facilino.getHelpUrl('dyor_set_arms'),
			examples: ['dyor_move_arms_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTACC,
			keys: ['LANG_SERVO_MOVE_ARMS_NAME','LANG_SERVO_MOVE_SET','LANG_MOVE_LEFT_ARM_UP','LANG_MOVE_LEFT_ARM_DOWN','LANG_MOVE_RIGHT_ARM_UP','LANG_MOVE_RIGHT_ARM_DOWN','LANG_SERVO_MOVE_VALUE','LANG_SERVO_MOVE_ARMS_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SERVO_MOVE_ARMS_NAME'),
			//servo_move initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTACC);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_SET')||'Set').appendField(new Blockly.FieldDropdown([
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_UP'), '1'],
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_DOWN'), '2'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_UP'), '3'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_DOWN'), '4']
		]),'OPTION').appendField(new Blockly.FieldImage('img/blocks/arms.svg', 52*options.zoom, 25*options.zoom)).appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_VALUE')||'Degrees').setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
		this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_SERVO_MOVE_ARMS_TOOLTIP'));
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

		Blockly.Arduino.dyor_attack_defend = function() {
			var pin1 = Blockly.Arduino.valueToCode(this, 'LEFT', Blockly.Arduino.ORDER_NONE);
			var pin2 = Blockly.Arduino.valueToCode(this, 'RIGHT', Blockly.Arduino.ORDER_NONE);
			var value_from1 = this.getFieldValue('FROM1');
			var value_to1 = this.getFieldValue('TO1');
			var value_from2 = this.getFieldValue('FROM2');
			var value_to2 = this.getFieldValue('TO2');
			var value_time = Number(Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC));
			var attach = this.getFieldValue('ATTACH');
			var code = '';
			if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
			{
				Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
				Blockly.Arduino.definitions_['declare_var_servo_'+pin1]=JST['servo_definitions_variables']({pin: pin1});
				Blockly.Arduino.definitions_['declare_var_servo_'+pin2]=JST['servo_definitions_variables']({pin: pin2});
			}
			else if (Facilino.profiles['processor']==='ESP32')
			{
				Blockly.Arduino.definitions_['include_servo'] = '#include <ESP32Servo.h>';
				Blockly.Arduino.definitions_['declare_var_servo_'+pin1]=JST['ESP_servo_definitions_variables']({pin: pin1});
				Blockly.Arduino.definitions_['declare_var_servo_'+pin2]=JST['ESP_servo_definitions_variables']({pin: pin2});
			}

			Blockly.Arduino.definitions_['declare_var_servo_'+pin1]=JST['servo_definitions_variables']({pin: pin1});
			Blockly.Arduino.definitions_['declare_var_servo_'+pin2]=JST['servo_definitions_variables']({pin: pin2});

			if (attach==='FALSE'){
				Blockly.Arduino.setups_['movement_servo_move_' + pin1] = JST['dyor_servo_setups']({'pin': pin1});
				Blockly.Arduino.setups_['movement_servo_move_' + pin2] = JST['dyor_servo_setups']({'pin': pin2});

			code += JST['movement_servo_move']({'pin': pin1,'value_degree': value_from1});
			code += JST['movement_servo_move']({'pin': pin2,'value_degree': value_from2});
			code += 'delay('+value_time+'/2);\n';
			code += JST['movement_servo_move']({'pin': pin1,'value_degree': value_to1});
			code += JST['movement_servo_move']({'pin': pin2,'value_degree': value_to2});
			code += 'delay('+value_time+'/2);\n';
			}
			else
			{
				code +='if (!_servo'+pin1+'.attached())\n	_servo'+pin1+'.attach('+pin1+');\n';
				code +='if (!_servo'+pin2+'.attached())\n	_servo'+pin2+'.attach('+pin2+');\n';
				code +='_servo'+pin1+'.write('+value_from1+');\n';
				code +='_servo'+pin2+'.write('+value_from2+');\n';
				code +='delay('+value_time+'/2);\n';
				code +='_servo'+pin1+'.write('+value_to1+');\n';
				code +='_servo'+pin2+'.write('+value_to2+');\n';
				code +='delay('+value_time+'/2);\n';
				code +='  _servo'+pin1+'.detach();\n';
				code +='  _servo'+pin2+'.detach();\n';
			}
			return code;
		};

		Blockly.Blocks.dyor_attack_defend = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOTACC'),
			tags: ['servo','movement'],
			helpUrl: Facilino.getHelpUrl('dyor_attack_defend'),
			examples: ['dyor_attack_defend.bly'],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTACC,
			keys: ['LANG_SERVO_MOVE_ATTACK_DEFEND_NAME','LANG_SERVO_MOVE_ATTACK_DEFEND','LANG_SERVO_MOVE_ATTACK_DEFEND_SWORD','LANG_SERVO_MOVE_ATTACK_DEFEND_FROM','LANG_SERVO_MOVE_ATTACK_DEFEND_TO','LANG_SERVO_MOVE_ATTACK_DEFEND_SHIELD','LANG_SERVO_MOVE_ATTACK_DEFEND_TIME','LANG_MOVE_BASE_ATTACH','LANG_SERVO_MOVE_ATTACK_DEFEND_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND_NAME'),
			//servo_move initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTACC);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND')||'Attack/Defend').appendField(new Blockly.FieldImage('img/blocks/arms.svg', 52*options.zoom, 25*options.zoom));
				this.appendValueInput('LEFT').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND_SWORD')||'Sword').appendField(new Blockly.FieldImage("img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND_FROM')||'From').appendField(new Blockly.FieldImage('img/blocks/angle.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(90,0,180,1),'FROM1').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND_TO')||'to').appendField(new Blockly.FieldImage('img/blocks/angle.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(45,0,180,1),'TO1').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('RIGHT').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND_SHIELD')||'Shield').appendField(new Blockly.FieldImage("img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND_FROM')||'From').appendField(new Blockly.FieldImage('img/blocks/angle.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(90,0,180,1),'FROM2').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND_TO')||'to').appendField(new Blockly.FieldImage('img/blocks/angle.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(45,0,180,1),'TO2').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('TIME').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND_TIME')||'Time [ms]').appendField(new Blockly.FieldImage("img/blocks/chronometer.svg",24*options.zoom,24*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('ATTACH').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_ATTACH')).appendField(new Blockly.FieldCheckbox('FALSE'),'ATTACH').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND_TOOLTIP'));
			}
		};
		}
	}
	}
	
	var FacilinoRobotAcc = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoRobotAcc;
	} else {
		window.FacilinoRobotAcc = FacilinoRobotAcc;
	}
}));
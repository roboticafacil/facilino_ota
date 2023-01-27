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
		Blockly.Arduino.system_control_pid = function() {
				var code='';
				var input = Blockly.Arduino.valueToCode(this, 'INPUT', Blockly.Arduino.ORDER_ATOMIC);
				var setpoint = Blockly.Arduino.valueToCode(this, 'SETPOINT', Blockly.Arduino.ORDER_ATOMIC);
				var Kp = this.getFieldValue('P');
				var Ki = this.getFieldValue('I');
				var Kd = this.getFieldValue('D');
				var samplingTime = this.getFieldValue('SAMPLING_TIME');
				var name = this.getFieldValue('NAME').replace(/\s+/g, '_');
				//Blockly.Arduino.definitions_['autopid']='#include <AutoPID.h>\n';
				//Blockly.Arduino.definitions_['declare_var_input_'+name] = 'float _input_'+name+'=0.0;\n';
				//Blockly.Arduino.definitions_['declare_var_setpoint_'+name] = 'float _setpoint_'+name+'=0.0;\n';
				//Blockly.Arduino.definitions_['declare_var_output_'+name] = 'float _output_'+name+'=0.0;\n';
				//Blockly.Arduino.definitions_['declare_var_pid_'+name] = 'AutoPID _pid_'+name+'(&_input_'+name+',&_output_'+name+',&_setpoint_'+name+','+Kp+','+Ki+','+Kd+','+dir+');\n';
				Blockly.Arduino.definitions_['define_compute_pid'+name] = JST['compute_pid']({name: name});
				code = '(computePID_'+name+'('+input+','+setpoint+','+samplingTime+','+Kp+','+Ki+','+Kd+'))';
				return [code, Blockly.Arduino.ORDER_ATOMIC];
			};

			Blockly.Blocks.system_control_pid = {
				category: Facilino.locales.getKey('LANG_CATEGORY_SYSTEM'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_SYSTEM_CONTROL'),
				tags: ['system','control'],
				helpUrl: Facilino.getHelpUrl('system_control_pid'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_SYSTEM,
				colour: Facilino.LANG_COLOUR_SYSTEM_CONTROL,
				keys: ['LANG_SYSTEM_CONTROL_PID_CONTROLLER_NAME','LANG_SYSTEM_CONTROL_PID_CONTROLLER','LANG_SYSTEM_CONTROL_PID_NAME','LANG_SYSTEM_CONTROL_PID_SETPOINT','LANG_SYSTEM_CONTROL_PID_INPUT','LANG_SYSTEM_CONTROL_PID_GAINS','LANG_SYSTEM_CONTROL_PID_CONTROLLER_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_CONTROLLER_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_SYSTEM_CONTROL);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/pid_control.png', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_CONTROLLER')).appendField(new Blockly.FieldTextInput('name'),'NAME').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('SETPOINT').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_SETPOINT')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('INPUT').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_INPUT')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/chronometer.svg',24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_SAMPLING_TIME')+' (ms)').appendField(new Blockly.FieldTextInput('100'),'SAMPLING_TIME').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/knob.svg',24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_GAINS')).appendField('P').appendField(new Blockly.FieldTextInput('1'),'P').appendField('I').appendField(new Blockly.FieldTextInput('0'),'I').appendField('D').appendField(new Blockly.FieldTextInput('0'),'D').setAlign(Blockly.ALIGN_RIGHT);
					//this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_OUTPUT')).appendField('min').appendField(new Blockly.FieldTextInput('0'),'MIN').appendField('max').appendField(new Blockly.FieldTextInput('255'),'MAX').setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setOutput(true,Number);
					this.setTooltip(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_CONTROLLER_TOOLTIP'));
				},
				default_inputs: function()
				{
					return '<value name="SETPOINT"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="INPUT"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				}
			};
			
			/*Blockly.Arduino.system_control_onoff = function() {
			var code = '';

			return code;
		};

		Blockly.Blocks.system_control_onoff = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SYSTEM'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_SYSTEM_CONTROL'),
			tags: ['temperature','ambient'],
			helpUrl: Facilino.getHelpUrl('system_control_onoff'),
			examples: ['ambient_temp_alarm_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SYSTEM,
			colour: Facilino.LANG_COLOUR_SYSTEM_CONTROL,
			keys: ['LANG_SYSTEM_CONTROL_ONOFF','LANG_SYSTEM_CONTROL_ONOFF_NAME','LANG_SYSTEM_CONTROL_ONOFF_INPUT','LANG_SYSTEM_CONTROL_ONOFF_CONTROLLER_TOOLTIP'],
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_SYSTEM_CONTROL);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_ONOFF')).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_ONOFF_NAME')).appendField(new Blockly.FieldTextInput('name'),'NAME').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('INPUT').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_ONOFF_INPUT')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg',20*options.zoom,20*options.zoom)).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_ONOFF_HYSTHERESIS')).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_ONOFF_ON')).appendField(new Blockly.FieldNumber(80),'HYSTHERESIS_ON').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_ONOFF_OFF')).appendField(new Blockly.FieldNumber(20),'HYSTHERESIS_OFF').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('ON').appendField(new Blockly.FieldImage("img/blocks/switch_on.svg",24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('OFF').appendField(new Blockly.FieldImage("img/blocks/switch_off.svg",24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_ONOFF_CONTROLLER_TOOLTIP'));
			}
		};*/
		}
	}
	}
	
	var FacilinoController = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoController;
	} else {
		window.FacilinoController = FacilinoController;
	}
}));
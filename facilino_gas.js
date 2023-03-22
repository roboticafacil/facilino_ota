(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	Blockly.Arduino.ambient_gas_analog_read = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';
			code += JST['inout_analog_read']({
				'pin': pin
			});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};
		
		if (window.FacilinoAdvanced===true)
		{
			var gas_category=Facilino.locales.getKey('LANG_CATEGORY_AMBIENT');
			var gas_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_GAS');
			var gas_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_GAS');
			var gas_cat_colour=Facilino.LANG_COLOUR_AMBIENT;
			var gas_analog_colour=Facilino.LANG_COLOUR_AMBIENT_GAS;
			var gas_digital_colour=Facilino.LANG_COLOUR_AMBIENT_GAS;
		}
		else
		{
			var gas_category=Facilino.locales.getKey('LANG_CATEGORY_ADVANCED');
			var gas_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG');
			var gas_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL');
			var gas_cat_colour=Facilino.LANG_COLOUR_ADVANCED;
			var gas_analog_colour=Facilino.LANG_COLOUR_ADVANCED_ANALOG;
			var gas_digital_colour=Facilino.LANG_COLOUR_ADVANCED_DIGITAL;
		}

		Blockly.Blocks.ambient_gas_analog_read = {
			category: gas_category,
			subcategory: gas_analog_subcategory,
			tags: ['gas','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_gas_analog_read'),
			examples: ['ambient_gas_analog_read_example.bly'],
			category_colour: gas_cat_colour,
			colour: gas_analog_colour,
			keys: ['LANG_GAS_ANALOG_READ_NAME','LANG_GAS_ANALOG_READ','LANG_GAS_PIN','LANG_GAS_ANALOG_READ_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_GAS_ANALOG_READ_NAME'),
			init: function() {
			this.setColour(gas_analog_colour);
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_GAS_ANALOG_READ')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/co2.svg",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_GAS_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/analog_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_GAS_ANALOG_READ_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_analog"></shadow></value>';
			}
		};

		Blockly.Arduino.ambient_gas_digital_read = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';
			Blockly.Arduino.setups_['inout_digital_input' + pin] = JST['inout_digital_input']({'pin': pin});
			code += JST['inout_digital_read']({'pin': pin});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.ambient_gas_digital_read = {
			category: gas_category,
			subcategory: gas_digital_subcategory,
			tags: ['gas','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_gas_digital_read'),
			examples: ['ambient_gas_digital_read_example.bly'],
			category_colour: gas_cat_colour,
			colour: gas_digital_colour,
			keys: ['LANG_GAS_DIGITAL_READ_NAME','LANG_GAS_DIGITAL_READ','LANG_GAS_PIN','LANG_GAS_DIGITAL_READ_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_GAS_DIGITAL_READ_NAME'),
			init: function() {
			this.setColour(gas_digital_colour);
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_GAS_DIGITAL_READ')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/co2.svg",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_GAS_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Boolean);
			this.setTooltip(Facilino.locales.getKey('LANG_GAS_DIGITAL_READ_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_digital"></shadow></value>';
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.ambient_gas_calibrate = function() {
				var code = '';
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				Blockly.Arduino.definitions_['define_calibrate_gas_sensor'] = JST['calibrate_gas_sensor']({});
				if (Facilino.profiles['processor']==='ESP32')
					Blockly.Arduino.definitions_['define_resistance_gas_sensor'] = JST['resistance_gas_sensor_ESP32']({});
				else
					Blockly.Arduino.definitions_['define_resistance_gas_sensor'] = JST['resistance_gas_sensor']({});
				var sensor = this.getFieldValue('SENSOR');
				if (sensor==='MQ2')
					code='calibrate_gas_sensor('+pin+',9.83)';
				else if (sensor==='MQ3')
					code='calibrate_gas_sensor('+pin+',61)';
				else if (sensor==='MQ4')
					code='calibrate_gas_sensor('+pin+',4.4)';
				else if (sensor==='MQ5')
					code='calibrate_gas_sensor('+pin+',6.4)';
				else if (sensor==='MQ6')
					code='calibrate_gas_sensor('+pin+',9.83)';
				else if (sensor==='MQ8')
					code='calibrate_gas_sensor('+pin+',70)';
				else if (sensor==='MQ9')
					code='calibrate_gas_sensor('+pin+',9.83)';
				else if (sensor==='MQ135')
					code='calibrate_gas_sensor('+pin+',3.6)';
				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_gas_calibrate = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_GAS'),
			tags: ['gas','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_gas_calibrate'),
			examples: ['ambient_gas_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_GAS,
			keys: ['LANG_GAS_CALIBRATE_NAME','LANG_GAS_CALIBRATE','LANG_GAS_PIN','LANG_GAS_SENSOR','LANG_GAS_CALIBRATE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_GAS_CALIBRATE_NAME'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_GAS);
			this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/resistor.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_GAS_CALIBRATE')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/co2.svg",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_GAS_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/analog_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_GAS_SENSOR')).appendField(new Blockly.FieldDropdown([['MQ2','MQ2'],['MQ3','MQ3'],['MQ4','MQ4'],['MQ5','MQ5'],['MQ6','MQ6'],['MQ8','MQ8'],['MQ9','MQ9'],['MQ135','MQ135']]),'SENSOR').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_GAS_CALIBRATE_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_analog"></shadow></value>';
			}
		};

		Blockly.Arduino.ambient_gas_read_calibrated = function() {
				var code = '';
				var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				var sensor = this.getFieldValue('SENSOR');
				if (sensor ==='MQ2')
					var r0_default = '0.28';
				else
					var r0_default ='';
				var r0 = Blockly.Arduino.valueToCode(this, 'R0', Blockly.Arduino.ORDER_NONE) || r0_default;
				Blockly.Arduino.definitions_['define_calibrated_gas_sensor'] = JST['calibrated_gas_sensor']({});
				if (Facilino.profiles['processor']==='ESP32')
					Blockly.Arduino.definitions_['define_resistance_gas_sensor'] = JST['resistance_gas_sensor_ESP32']({});
				else
					Blockly.Arduino.definitions_['define_resistance_gas_sensor'] = JST['resistance_gas_sensor']({});

				var gas_type = this.getFieldValue('GAS_TYPE');
				code='calibrated_gas_sensor('+pin+',_'+sensor+'_'+gas_type+','+r0+')';
				if (sensor==='MQ2')
				{
					if (gas_type==='H2')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.318063334962762,-0.470608305646543};\n';
					else if (gas_type==='LPG')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.204119982655925,-0.454838058661866};\n';
					else if (gas_type==='CH4')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.477121254719662,-0.375681832141500};\n';
					else if (gas_type==='CO')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.716003343634799,-0.335423996010616};\n';
					else if (gas_type==='ALCOHOL')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.462397997898956,-0.382281405556614};\n';
					else if (gas_type==='SMOKE')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.531478917042255,-0.415195155029891};\n';
					else if (gas_type==='PROPANE')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.230448921378274,-0.461038681105012};\n';

				}
				else if (sensor==='MQ3')
				{
					if (gas_type==='ALCOHOL')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={-1.0,0.361727836017593,-0.660167575429684};\n';
					else if (gas_type==='BENZINE')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={-1.0,0.602059991327962,-0.354982694318741};\n';
					else if (gas_type==='CH4')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={-1.0,1.681241237375587,-0.039590623023812};\n';
					else if (gas_type==='HEXANE')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={-1.0,1.698970004336019,-0.349485002168009};\n';
					else if (gas_type==='LPG')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={-1.0,1.698970004336019,-0.276420984328890};\n';
					else if (gas_type==='CO')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={-1.0,1.698970004336019,-0.247425010840047};\n';
				}
				else if (sensor==='MQ4')
				{
					if (gas_type==='LPG')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.397940008672038,-0.311193421656487};\n';
					else if (gas_type==='CH4')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.255272505103306,-0.365988833197046};\n';
					else if (gas_type==='H2')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.579783596616810,-0.177183820135558};\n';
					else if (gas_type==='CO')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.623249290397900,-0.054015299341032};\n';
					else if (gas_type==='ALCOHOL')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.602059991327962,-0.069312672784473};\n';
					else if (gas_type==='SMOKE')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.591064607026499,-0.113671576226525};\n';
				}
				else if (sensor==='MQ5')
				{
					if (gas_type==='H2')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.255272505103306,-0.280829710649381};\n';
					else if (gas_type==='LPG')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,-0.154901959985743,-0.411408089932221};\n';
					else if (gas_type==='CH4')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,-0.026872146400301,-0.395591361954847};\n';
					else if (gas_type==='CO')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.585460729508501,-0.137305668023437};\n';
					else if (gas_type==='ALCOHOL')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.544068044350276,-0.208206351658474};\n';
				}
				else if (sensor==='MQ6')
				{
					if (gas_type==='LPG')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.311753861055754,-0.424191864594402};\n';
					else if (gas_type==='H2')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.763427993562937,-0.272163720794863};\n';
					else if (gas_type==='CH4')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.397940008672038,-0.387044690312107};\n';
					else if (gas_type==='CO')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.949390006644913,-0.080329052104363};\n';
					else if (gas_type==='ALCOHOL')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.903089986991944,-0.170871839721304};\n';
				}
				else if (sensor==='MQ8')
				{
					if (gas_type==='H2')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.929418925714293,-1.452068560080013};\n';
					else if (gas_type==='LPG')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,1.477121254719662,-0.213763575275574};\n';
					else if (gas_type==='CH4')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,1.740362689494244,-0.163607768757472};\n';
					else if (gas_type==='CO')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,1.812913356642856,-0.124106585034912};\n';
					else if (gas_type==='ALCOHOL')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,1.361727836017593,-0.588591910067779};\n';
				}
				else if (sensor==='MQ9')
				{
					if (gas_type==='LPG')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.315970345456918,-0.473279094054572};\n';
					else if (gas_type==='CO')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.204119982655925,-0.438492194892732};\n';
					else if (gas_type==='CH4')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={2.301029995663981,0.487138375477186,-0.377899747390683};\n';
				}
				else if (sensor==='MQ135')
				{
					if (gas_type==='CO2')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={1.0,0.361727836017593,-0.352519043030659};\n';
					else if (gas_type==='CO')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={1.0,0.454844860008510,-0.262024325986192};\n';
					else if (gas_type==='SMOKE')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={1.0,0.255272505103306,-0.305865360520722};\n';
					else if (gas_type==='NH4')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={1.0,0.406540180433955,-0.404084909575708};\n';
					else if (gas_type==='BENZENE')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={1.0,0.176091259055681,-0.284321872904252};\n';
					else if (gas_type==='NH3')
					  Blockly.Arduino.definitions_['declare_var_'+sensor+'_'+gas_type]='float _'+sensor+'_'+gas_type+'[3]={1.0,0.161368002234975,-0.305865360520722};\n';
				}
				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_gas_read_calibrated = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_GAS'),
			tags: ['gas','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_gas_read_calibrated'),
			examples: ['ambient_gas_example.bly'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_GAS,
			keys: ['LANG_GAS_READ_CALIBRATED_NAME','LANG_GAS_READ_CALIBRATED','LANG_GAS_PIN','LANG_GAS_R0','LANG_GAS_SENSOR','LANG_GAS_TYPE','LANG_GAS_H2','LANG_GAS_ALCOHOL','LANG_GAS_LPG','LANG_GAS_CO2','LANG_GAS_CH4','LANG_GAS_CO','LANG_GAS_ALCOHOL','LANG_GAS_SMOKE','LANG_GAS_PROPANE','LANG_GAS_BENZENE','LANG_GAS_READ_CALIBRATED_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_GAS_READ_CALIBRATED_NAME'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_GAS);
			this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/ppm.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_GAS_READ_CALIBRATED')).appendField(new Blockly.FieldImage("img/blocks/co2.svg",32*options.zoom,32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_GAS_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/analog_signal.svg", 20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('R0').appendField(Facilino.locales.getKey('LANG_GAS_R0')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/resistor.svg", 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_GAS_SENSOR')).appendField(new Blockly.FieldDropdown([['MQ2','MQ2'],['MQ3','MQ3'],['MQ4','MQ4'],['MQ5','MQ5'],['MQ6','MQ6'],['MQ8','MQ8'],['MQ9','MQ9'],['MQ135','MQ135']]),'SENSOR').setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput('GAS_TYPE').appendField(Facilino.locales.getKey('LANG_GAS_TYPE')).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_GAS_H2'),'H2'],[Facilino.locales.getKey('LANG_GAS_LPG'),'LPG'],[Facilino.locales.getKey('LANG_GAS_CH4'),'CH4'],[Facilino.locales.getKey('LANG_GAS_CO'),'CO'],[Facilino.locales.getKey('LANG_GAS_ALCOHOL'),'ALCOHOL'],[Facilino.locales.getKey('LANG_GAS_SMOKE'),'SMOKE'],[Facilino.locales.getKey('LANG_GAS_PROPANE'),'PROPANE']]),'GAS_TYPE').setAlign(Blockly.ALIGN_RIGHT);
			this._sensor=this.getFieldValue('SENSOR');
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_GAS_READ_CALIBRATED_TOOLTIP'));
			},
			onchange: function(){
				if (this.getFieldValue('SENSOR')!==this._sensor)
				{
					this._sensor=this.getFieldValue('SENSOR');
					this.getInput('GAS_TYPE').removeField('GAS_TYPE');
					if (this._sensor=='MQ2')
						this.getInput('GAS_TYPE').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_GAS_H2'),'H2'],[Facilino.locales.getKey('LANG_GAS_LPG'),'LPG'],[Facilino.locales.getKey('LANG_GAS_CH4'),'CH4'],[Facilino.locales.getKey('LANG_GAS_CO'),'CO'],[Facilino.locales.getKey('LANG_GAS_ALCOHOL'),'ALCOHOL'],[Facilino.locales.getKey('LANG_GAS_SMOKE'),'SMOKE'],[Facilino.locales.getKey('LANG_GAS_PROPANE'),'PROPANE']]),'GAS_TYPE');
					else if (this._sensor=='MQ3')
						this.getInput('GAS_TYPE').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_GAS_ALCOHOL'),'ALCOHOL'],[Facilino.locales.getKey('LANG_GAS_BENZINE'),'BENZINE'],[Facilino.locales.getKey('LANG_GAS_CH4'),'CH4'],[Facilino.locales.getKey('LANG_GAS_HEXANE'),'HEXANE'],[Facilino.locales.getKey('LANG_GAS_LPG'),'LPG'],[Facilino.locales.getKey('LANG_GAS_CO'),'CO']]),'GAS_TYPE');
					else if (this._sensor=='MQ4')
						this.getInput('GAS_TYPE').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_GAS_LPG'),'LPG'],[Facilino.locales.getKey('LANG_GAS_CH4'),'CH4'],[Facilino.locales.getKey('LANG_GAS_H2'),'H2'],[Facilino.locales.getKey('LANG_GAS_CO'),'CO'],[Facilino.locales.getKey('LANG_GAS_ALCOHOL'),'ALCOHOL'],[Facilino.locales.getKey('LANG_GAS_SMOKE'),'SMOKE']]),'GAS_TYPE');
					else if (this._sensor=='MQ5')
						this.getInput('GAS_TYPE').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_GAS_H2'),'H2'],[Facilino.locales.getKey('LANG_GAS_LPG'),'LPG'],[Facilino.locales.getKey('LANG_GAS_CH4'),'CH4'],[Facilino.locales.getKey('LANG_GAS_CO'),'CO'],[Facilino.locales.getKey('LANG_GAS_ALCOHOL'),'ALCOHOL']]),'GAS_TYPE');
					else if (this._sensor=='MQ6')
						this.getInput('GAS_TYPE').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_GAS_LPG'),'LPG'],[Facilino.locales.getKey('LANG_GAS_H2'),'H2'],[Facilino.locales.getKey('LANG_GAS_CH4'),'CH4'],[Facilino.locales.getKey('LANG_GAS_CO'),'CO'],[Facilino.locales.getKey('LANG_GAS_ALCOHOL'),'ALCOHOL']]),'GAS_TYPE');
					else if (this._sensor=='MQ8')
						this.getInput('GAS_TYPE').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_GAS_H2'),'H2'],[Facilino.locales.getKey('LANG_GAS_LPG'),'LPG'],[Facilino.locales.getKey('LANG_GAS_CH4'),'CH4'],[Facilino.locales.getKey('LANG_GAS_CO'),'CO'],[Facilino.locales.getKey('LANG_GAS_ALCOHOL'),'ALCOHOL']]),'GAS_TYPE');
					else if (this._sensor=='MQ9')
						this.getInput('GAS_TYPE').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_GAS_LPG'),'LPG'],[Facilino.locales.getKey('LANG_GAS_CO'),'CO'],[Facilino.locales.getKey('LANG_GAS_CH4'),'CH4']]),'GAS_TYPE');
					else if (this._sensor=='MQ135')
						this.getInput('GAS_TYPE').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_GAS_CO2'),'CO2'],[Facilino.locales.getKey('LANG_GAS_CO'),'CO'],[Facilino.locales.getKey('LANG_GAS_SMOKE'),'SMOKE'],[Facilino.locales.getKey('LANG_GAS_NH4'),'NH4'],[Facilino.locales.getKey('LANG_GAS_BENZENE'),'BENZENE'],[Facilino.locales.getKey('LANG_GAS_NH3'),'NH3']]),'GAS_TYPE');
				}
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_analog"></shadow></value><value name="R0"><shadow type="math_number"><field name="NUM">0.28</field></shadow></value>';
			}
		};
		}
	}
	
	var FacilinoGas = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoGas;
	} else {
		window.FacilinoGas = FacilinoGas;
	}
}));
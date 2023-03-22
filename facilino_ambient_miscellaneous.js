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
			var misc_category=Facilino.locales.getKey('LANG_CATEGORY_AMBIENT');
			var misc_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_MISC');
			var misc_cat_colour=Facilino.LANG_COLOUR_AMBIENT;
			var misc_analog_colour=Facilino.LANG_COLOUR_AMBIENT_MISC;
		}
		else
		{
			var misc_category=Facilino.locales.getKey('LANG_CATEGORY_ADVANCED');
			var misc_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG');
			var misc_cat_colour=Facilino.LANG_COLOUR_ADVANCED;
			var misc_analog_colour=Facilino.LANG_COLOUR_ADVANCED_ANALOG;
		}
		
		
		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.ambient_pressure_pressureBMP180 = function() {
				var code = '';
				Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
				Blockly.Arduino.definitions_['bmp']=JST['bmp_definitions_include']({});
				Blockly.Arduino.definitions_['declare_var_define_bmp']='Adafruit_BMP085 bmp;\n';
				Blockly.Arduino.setups_['setup_bmp'] = 'bmp.begin();\n';

				code += 'bmp.readPressure()'
				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_pressure_pressureBMP180 = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MISC'),
			tags: ['barometer','pressure','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_pressure_pressureBMP180'),
			examples: ['ambient_pressureBMP180_example'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_MISC,
			keys: ['LANG_PRESSURE_READ_PRESSURE_BMP_NAME','LANG_PRESSURE_READ_PRESSURE_BMP_DESCRIPTION','LANG_PRESSURE_BMP_REQUIREMENTS','LANG_PRESSURE_READ_PRESSURE_BMP_OUTPUT','LANG_PRESSURE_READ_PRESSURE_BMP','LANG_PRESSURE_READ_PRESSURE_BMP_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PRESSURE_READ_PRESSURE_BMP_NAME'),
			description: Facilino.locales.getKey('LANG_PRESSURE_READ_PRESSURE_BMP_DESCRIPTION'),
			requirements: [Facilino.locales.getKey('LANG_PRESSURE_BMP_REQUIREMENTS')],
			output: Facilino.locales.getKey('LANG_PRESSURE_READ_PRESSURE_BMP_OUTPUT'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_MISC);
			this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/barometer.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_PRESSURE_READ_PRESSURE_BMP')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/bmp180.svg",63*options.zoom,63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_PRESSURE_READ_PRESSURE_BMP_TOOLTIP'));
			}
		};
		
		Blockly.Arduino.ambient_altitude_pressureBMP180 = function() {
				var code = '';
				var pressure = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '101325';
				Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
				Blockly.Arduino.definitions_['bmp']=JST['bmp_definitions_include']({});
				Blockly.Arduino.definitions_['declare_var_define_bmp']='Adafruit_BMP085 bmp;\n';
				Blockly.Arduino.setups_['setup_bmp'] = 'bmp.begin();\n';

				code += 'bmp.readAltitude('+pressure+')';
				return [code,Blockly.Arduino.CODE_ATOMIC];
		};

		Blockly.Blocks.ambient_altitude_pressureBMP180 = {
			category: Facilino.locales.getKey('LANG_CATEGORY_AMBIENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MISC'),
			tags: ['altitude','barometer','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_altitude_pressureBMP180'),
			examples: ['ambient_pressureBMP180_example'],
			category_colour: Facilino.LANG_COLOUR_AMBIENT,
			colour: Facilino.LANG_COLOUR_AMBIENT_MISC,
			keys: ['LANG_PRESSURE_READ_ALTITUDE_BMP','LANG_PRESSURE_READ_ALTITUDE_BMP_DESCRIPTION','LANG_PRESSURE_BMP_REQUIREMENTS','LANG_PRESSURE_BMP_INPUT_PREASURE','LANG_PRESSURE_READ_ALTITUDE_BMP_OUTPUT','LANG_ALTITUDE_READ_ALTITUDE_BMP_SEALEVEL_PRESSURE','LANG_ALTITUDE_READ_ALTITUDE_BMP_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PRESSURE_READ_ALTITUDE_BMP_NAME'),
			description: Facilino.locales.getKey('LANG_PRESSURE_READ_ALTITUDE_BMP_DESCRIPTION'),
			requirements: [Facilino.locales.getKey('LANG_PRESSURE_BMP_REQUIREMENTS')],
			inputs: [Facilino.locales.getKey('LANG_PRESSURE_BMP_INPUT_PREASURE')],
			output: Facilino.locales.getKey('LANG_PRESSURE_READ_ALTITUDE_BMP_OUTPUT'),
			init: function() {
			this.setColour(Facilino.LANG_COLOUR_AMBIENT_MISC);
			this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/altitude.png",32*options.zoom,32*options.zoom)).appendField(Facilino.locales.getKey('LANG_PRESSURE_READ_ALTITUDE_BMP')).appendField(new Blockly.FieldImage("img/blocks/bmp180.svg",63*options.zoom,63*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_ALTITUDE_READ_ALTITUDE_BMP_SEALEVEL_PRESSURE')||'Pa').setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
			this.setInputsInline(false);
			this.setPreviousStatement(false);
			this.setNextStatement(false);
			this.setOutput(true,Number);
			this.setTooltip(Facilino.locales.getKey('LANG_ALTITUDE_READ_ALTITUDE_BMP_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="VALUE"><shadow type="math_number"><field name="NUM">101325</field></shadow></value>';
			}
		};
		}

		Blockly.Arduino.ambient_guva_s12sd = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';

			if (this.getFieldValue('OPTION')==='mWcm2')
			 code += '2.0930232558139534883720930232558*((float)'+JST['inout_analog_read']({'pin': pin})+')';
			else
			  code += '0.048828125*((float)'+JST['inout_analog_read']({'pin': pin})+')';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};


		Blockly.Blocks.ambient_guva_s12sd = {
			category: misc_category,
			subcategory: misc_analog_subcategory,
			tags: ['uv','ambient'],
			helpUrl: Facilino.getHelpUrl('ambient_guva_s12sd'),
			examples: ['ambient_guva_s12sd_example'],
			category_colour: misc_cat_colour,
			colour: misc_analog_colour,
			keys: ['LANG_GUVA_S12SD_NAME','LANG_GUVA_S12SD_DESCRIPTION','LANG_GUVA_S12SD_DROPDOWN_RADIATION','LANG_GUVA_S12SD_INPUT_PIN','LANG_GUVA_S12SD_OUTPUT','LANG_GUVA_S12SD','LANG_GUVA_S12SD_mWcm2','LANG_GUVA_S12SD_INDEX','LANG_GUVA_S12SD_PIN','LANG_GUVA_S12SD_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_GUVA_S12SD_NAME'),
			description: Facilino.locales.getKey('LANG_GUVA_S12SD_DESCRIPTION'),
			dropdown: [Facilino.locales.getKey('LANG_GUVA_S12SD_DROPDOWN_RADIATION')],
			inputs: [Facilino.locales.getKey('LANG_GUVA_S12SD_INPUT_PIN')],
			output: Facilino.locales.getKey('LANG_GUVA_S12SD_OUTPUT'),
			init: function() {
				this.setColour(misc_analog_colour);
				this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/radiation.png",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_GUVA_S12SD')).appendField(new Blockly.FieldDropdown([
		[Facilino.locales.getKey('LANG_GUVA_S12SD_mWcm2'), 'mWcm2'],
		[Facilino.locales.getKey('LANG_GUVA_S12SD_INDEX'), 'index']
		]),'OPTION').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/guva_s12sd.svg', 73*options.zoom, 73*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_GUVA_S12SD_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/analog_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_GUVA_S12SD_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return '<value name="PIN"><shadow type="pin_analog"></shadow></value>';
			}
		};
		}
	}
	
	var FacilinoAmbientMiscellaneous = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoAmbientMiscellaneous;
	} else {
		window.FacilinoAmbientMiscellaneous = FacilinoAmbientMiscellaneous;
	}
}));
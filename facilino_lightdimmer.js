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
	Blockly.Arduino['ac_dimmer_set_brightness'] = function(block) {
			  var brightness = Blockly.Arduino.valueToCode(this,'BRIGHTNESS',Blockly.Arduino.ORDER_ATOMIC) || '0';
			  var input_pin = Blockly.Arduino.valueToCode(this,'PIN',Blockly.Arduino.ORDER_NONE) || '';
			  //Blockly.Arduino.definitions_['define_simpleexpressions_h'] = '#include <SimpleExpressions.h>';
			  Blockly.Arduino.definitions_['define_dimmable_light_h'] = '#include <dimmable_light.h>';
			  //Blockly.Arduino.definitions_['define_avr_power_h'] = '#ifdef __AVR__\n  #include <avr/power.h>\n#endif';
			  Blockly.Arduino.definitions_['declare_var_ac_dimmer_sync']='const int _ac_dimmer_sync ='+this.getFieldValue('ZC_PIN')+';\n';
			  Blockly.Arduino.definitions_['declare_var_ac_dimmer_light'+input_pin]='DimmableLight _ac_light_'+input_pin+'('+input_pin+');\n';
			  Blockly.Arduino.setups_['setup_ac_dimmer_light'] = 'DimmableLight::setSyncPin(_ac_dimmer_sync);\n  DimmableLight::begin();\n';

			  var code='_ac_light_'+input_pin+'.setBrightness(2*'+brightness+');\n' ;
			  return code;
			};

		Blockly.Blocks['ac_dimmer_set_brightness'] = {
		  category: Facilino.locales.getKey('LANG_CATEGORY_LIGHT'),
		  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_DIMMER'),
		  category_colour: Facilino.LANG_COLOUR_LIGHT,
		  colour: Facilino.LANG_COLOUR_LIGHT_DIMMER,
		  helpUrl: Facilino.getHelpUrl('ac_dimmer_set_brightness'),
		  tags: ['ac','dimmer','light'],
		  examples: [],
		  keys: ['LANG_DIMMER_SET_BRIGHTNESS_NAME','LANG_DIMMER_SET_BRIGHTNESS','LANG_DIMMER_ZC_PIN','LANG_DIMMER_THYRISTOR_PIN','LANG_DIMMER_BRIGHTNESS','LANG_DIMMER_SET_BRIGHTNESS_TOOLTIP'],
		  name: Facilino.locales.getKey('LANG_DIMMER_SET_BRIGHTNESS_NAME'),
		  init: function() {
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_DIMMER_SET_BRIGHTNESS')).appendField(new Blockly.FieldImage('img/blocks/dimmer.svg', 80*options.zoom, 24*options.zoom));
			this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_DIMMER_ZC_PIN')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.interrupt),'ZC_PIN').setAlign(Blockly.ALIGN_RIGHT);
			this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_DIMMER_THYRISTOR_PIN')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['PWMPin']);
			this.appendValueInput('BRIGHTNESS').appendField(Facilino.locales.getKey('LANG_DIMMER_BRIGHTNESS')+' [%]').appendField(new Blockly.FieldImage('img/blocks/sun.png', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
			this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
			this.setInputsInline(false);
			this.setColour(Facilino.LANG_COLOUR_LIGHT_DIMMER);
			this.setTooltip(Facilino.locales.getKey('LANG_DIMMER_SET_BRIGHTNESS_TOOLTIP'));
		  },
		  default_inputs: function()
		  {
			return '<value name="PIN"><shadow type="pin_pwm"></shadow></value><value name="BRIGHTNESS"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
		  }
		};
	}
	}
	}
	
	var FacilinoLightDimmer = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoLightDimmer;
	} else {
		window.FacilinoLightDimmer = FacilinoLightDimmer;
	}
}));
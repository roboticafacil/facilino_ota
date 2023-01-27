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
			var mic_category=Facilino.locales.getKey('LANG_CATEGORY_SOUND');
			var mic_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_MIC');
			var mic_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_MIC');
			var mic_cat_colour=Facilino.LANG_COLOUR_SOUND;
			var mic_analog_colour=Facilino.LANG_COLOUR_SOUND_MIC;
			var mic_digital_colour=Facilino.LANG_COLOUR_SOUND_MIC;
		}
		else
		{
			var mic_category=Facilino.locales.getKey('LANG_CATEGORY_ADVANCED');
			var mic_analog_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ANALOG');
			var mic_digital_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_DIGITAL');
			var mic_cat_colour=Facilino.LANG_COLOUR_ADVANCED;
			var mic_analog_colour=Facilino.LANG_COLOUR_ADVANCED_ANALOG;
			var mic_digital_colour=Facilino.LANG_COLOUR_ADVANCED_DIGITAL;
		}
		
			Blockly.Arduino.dyor_mic = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';

			code += JST['inout_analog_read']({'pin': pin});

			//  code=code.substring(0,code.length-1);
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

	Blockly.Blocks.dyor_mic = {
			category: mic_category,
			subcategory: mic_analog_subcategory,
			tags: ['mic','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_mic'),
			examples: ['dyor_mic_example.bly'],
			category_colour: mic_cat_colour,
			colour: mic_analog_colour,
			keys: ['LANG_MIC_NAME','LANG_MIC','LANG_MIC_PIN_AO','LANG_MIC_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MIC_NAME'),
			//infrared initialization
			init: function() {
				this.setColour(mic_analog_colour);
		this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/microphone.png",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MIC')).appendField(new Blockly.FieldImage('img/blocks/mic.svg', 36*options.zoom, 36*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_MIC_PIN_AO')).appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MIC_TOOLTIP'));
			},
		  default_inputs: function()
		  {
			return '<value name="PIN"><shadow type="pin_analog"></shadow></value>';
		  }
		};

	Blockly.Arduino.dyor_mic_digital = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';
			
			code += JST['inout_digital_read']({'pin': pin});

			//  code=code.substring(0,code.length-1);
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};


		Blockly.Blocks.dyor_mic_digital = {
			category: mic_category,
			subcategory: mic_digital_subcategory,
			tags: ['mic','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_mic_digital'),
			examples: ['dyor_mic_digital_example.bly'],
			category_colour: mic_cat_colour,
			colour: mic_digital_colour,
			keys: ['LANG_MIC_DIGITAL_NAME','LANG_MIC','LANG_MIC_PIN_DO','LANG_MIC_DIGITAL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MIC_DIGITAL_NAME'),
			//infrared initialization
			init: function() {
				this.setColour(mic_digital_colour);
		this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/microphone.png",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MIC')).appendField(new Blockly.FieldImage('img/blocks/mic.svg', 36*options.zoom, 36*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_MIC_PIN_DO')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_MIC_DIGITAL_TOOLTIP'));
			},
		  default_inputs: function()
		  {
			return '<value name="PIN"><shadow type="pin_digital"></shadow></value>';
		  }
		};
		
	}
	
	var FacilinoMic = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoMic;
	} else {
		window.FacilinoMic = FacilinoMic;
	}
}));
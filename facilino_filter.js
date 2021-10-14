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
		Blockly.Arduino.system_filter_lowpass = function() {
				var code='';
				var input = Blockly.Arduino.valueToCode(this, 'INPUT', Blockly.Arduino.ORDER_ATOMIC);
				var setpoint = Blockly.Arduino.valueToCode(this, 'SETPOINT', Blockly.Arduino.ORDER_ATOMIC);
				var W = this.getFieldValue('W');
				var samplingTime = this.getFieldValue('SAMPLING_TIME');
				var name = this.getFieldValue('NAME').replace(/\s+/g, '_');
				Blockly.Arduino.definitions_['define_compute_lowpass_filter'+name] = JST['compute_lowpass_filter']({name: name});
				code = '(computeLowPassFilter_'+name+'('+input+','+samplingTime+','+W+'))';
				return [code, Blockly.Arduino.ORDER_ATOMIC];
			};

			Blockly.Blocks.system_filter_lowpass = {
				category: Facilino.locales.getKey('LANG_CATEGORY_SYSTEM'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_SYSTEM_FILTER'),
				tags: ['system','filter'],
				helpUrl: Facilino.getHelpUrl('system_filter_lowpass'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_SYSTEM,
				colour: Facilino.LANG_COLOUR_SYSTEM_FILTER,
				keys: ['LANG_SYSTEM_CONTROL_FILTER_LOWPASS_NAME','LANG_SYSTEM_CONTROL_FILTER_LOWPASS','LANG_SYSTEM_CONTROL_FILTER_NAME','LANG_SYSTEM_CONTROL_FILTER_INPUT','LANG_SYSTEM_CONTROL_FILTER_WEIGHT','LANG_SYSTEM_CONTROL_FILTER_LOWPASS_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_LOWPASS_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_SYSTEM_FILTER);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/funnel.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_LOWPASS'));
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_NAME')).appendField(new Blockly.FieldTextInput('name'),'NAME').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('INPUT').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_INPUT')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg',20*options.zoom,20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/chronometer.svg',24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_SAMPLING_TIME')+' (ms)').appendField(new Blockly.FieldTextInput('100'),'SAMPLING_TIME').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/knob.svg',24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_WEIGHT')+' [0~100%]').appendField(new Blockly.FieldTextInput('50'),'W').setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setOutput(true,Number);
					this.setTooltip(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_LOWPASS_TOOLTIP'));
				}
			};

		Blockly.Arduino.system_filter_highpass = function() {
				var code='';
				var input = Blockly.Arduino.valueToCode(this, 'INPUT', Blockly.Arduino.ORDER_ATOMIC);
				var W = this.getFieldValue('W');
				var samplingTime = this.getFieldValue('SAMPLING_TIME');
				var name = this.getFieldValue('NAME').replace(/\s+/g, '_');
				Blockly.Arduino.definitions_['define_compute_highpass_filter'+name] = JST['compute_highpass_filter']({name: name});
				code = '(computeHighPassFilter_'+name+'('+input+','+samplingTime+','+W+'))';
				return [code, Blockly.Arduino.ORDER_ATOMIC];
			};

			Blockly.Blocks.system_filter_highpass = {
				category: Facilino.locales.getKey('LANG_CATEGORY_SYSTEM'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_SYSTEM_FILTER'),
				tags: ['system','filter'],
				helpUrl: Facilino.getHelpUrl('system_filter_highpass'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_SYSTEM,
				colour: Facilino.LANG_COLOUR_SYSTEM_FILTER,
				keys: ['LANG_SYSTEM_CONTROL_FILTER_HIGHPASS_NAME','LANG_SYSTEM_CONTROL_FILTER_HIGHPASS','LANG_SYSTEM_CONTROL_FILTER_NAME','LANG_SYSTEM_CONTROL_FILTER_INPUT','LANG_SYSTEM_CONTROL_FILTER_WEIGHT','LANG_SYSTEM_CONTROL_FILTER_HIGHPASS_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_HIGHPASS_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_SYSTEM_FILTER);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/funnel.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_HIGHPASS'));
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_NAME')).appendField(new Blockly.FieldTextInput('name'),'NAME').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('INPUT').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_INPUT')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg',20*options.zoom,20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/chronometer.svg',24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_SAMPLING_TIME')+' (ms)').appendField(new Blockly.FieldTextInput('100'),'SAMPLING_TIME').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/knob.svg',24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_WEIGHT')+' [0~100%]').appendField(new Blockly.FieldTextInput('50'),'W').setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setOutput(true,Number);
					this.setTooltip(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_HIGHPASS_TOOLTIP'));
				}
			};

			Blockly.Arduino.system_filter_bandpass = function() {
				var code='';
				var input = Blockly.Arduino.valueToCode(this, 'INPUT', Blockly.Arduino.ORDER_ATOMIC);
				var WLOW = this.getFieldValue('WLOW');
				var WHIGH = this.getFieldValue('WHIGH');
				var samplingTime = this.getFieldValue('SAMPLING_TIME');
				var name = this.getFieldValue('NAME').replace(/\s+/g, '_');
				Blockly.Arduino.definitions_['define_compute_bandpass_filter'+name] = JST['compute_bandpass_filter']({name: name});
				code = '(computeBandPassFilter_'+name+'('+input+','+samplingTime+','+WLOW+','+WHIGH+'))';
				return [code, Blockly.Arduino.ORDER_ATOMIC];
			};

			Blockly.Blocks.system_filter_bandpass = {
				category: Facilino.locales.getKey('LANG_CATEGORY_SYSTEM'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_SYSTEM_FILTER'),
				tags: ['system','filter'],
				helpUrl: Facilino.getHelpUrl('system_filter_bandpass'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_SYSTEM,
				colour: Facilino.LANG_COLOUR_SYSTEM_FILTER,
				keys: ['LANG_SYSTEM_CONTROL_FILTER_BANDPASS_NAME','LANG_SYSTEM_CONTROL_FILTER_BANDPASS','LANG_SYSTEM_CONTROL_FILTER_NAME','LANG_SYSTEM_CONTROL_FILTER_INPUT','LANG_SYSTEM_CONTROL_FILTER_WEIGHT','LANG_SYSTEM_CONTROL_FILTER_WEIGHT_LOW','LANG_SYSTEM_CONTROL_FILTER_WEIGHT_HIGH','LANG_SYSTEM_CONTROL_FILTER_BANDPASS_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_BANDPASS_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_SYSTEM_FILTER);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/funnel.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_BANDPASS'));
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_NAME')).appendField(new Blockly.FieldTextInput('name'),'NAME').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('INPUT').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_INPUT')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg',20*options.zoom,20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/chronometer.svg',24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_SAMPLING_TIME')+' (ms)').appendField(new Blockly.FieldTextInput('100'),'SAMPLING_TIME').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/knob.svg',24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_WEIGHT')+' [0~100%]').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_WEIGHT_LOW')).appendField(new Blockly.FieldTextInput('15'),'WLOW').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_WEIGHT_HIGH')).appendField(new Blockly.FieldTextInput('85'),'WHIGH').setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setOutput(true,Number);
					this.setTooltip(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_BANDPASS_TOOLTIP'));
				}
			};

		Blockly.Arduino.system_filter_bandstop = function() {
				var code='';
				var input = Blockly.Arduino.valueToCode(this, 'INPUT', Blockly.Arduino.ORDER_ATOMIC);
				var WLOW = this.getFieldValue('WLOW');
				var WHIGH = this.getFieldValue('WHIGH');
				var samplingTime = this.getFieldValue('SAMPLING_TIME');
				var name = this.getFieldValue('NAME').replace(/\s+/g, '_');
				Blockly.Arduino.definitions_['define_compute_bandstop_filter'+name] = JST['compute_bandstop_filter']({name: name});
				code = '(computeBandStopFilter_'+name+'('+input+','+samplingTime+','+WLOW+','+WHIGH+'))';
				return [code, Blockly.Arduino.ORDER_ATOMIC];
			};

			Blockly.Blocks.system_filter_bandstop = {
				category: Facilino.locales.getKey('LANG_CATEGORY_SYSTEM'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_SYSTEM_FILTER'),
				tags: ['system','filter'],
				helpUrl: Facilino.getHelpUrl('system_filter_bandstop'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_SYSTEM,
				colour: Facilino.LANG_COLOUR_SYSTEM_FILTER,
				keys: ['LANG_SYSTEM_CONTROL_FILTER_BANDSTOP_NAME','LANG_SYSTEM_CONTROL_FILTER_BANDSTOP','LANG_SYSTEM_CONTROL_FILTER_NAME','LANG_SYSTEM_CONTROL_FILTER_INPUT','LANG_SYSTEM_CONTROL_FILTER_WEIGHT','LANG_SYSTEM_CONTROL_FILTER_WEIGHT_LOW','LANG_SYSTEM_CONTROL_FILTER_WEIGHT_HIGH','LANG_SYSTEM_CONTROL_FILTER_BANDSTOP_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_BANDSTOP_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_SYSTEM_FILTER);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/funnel.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_BANDSTOP'));
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_NAME')).appendField(new Blockly.FieldTextInput('name'),'NAME').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('INPUT').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_INPUT')).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg',20*options.zoom,20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/chronometer.svg',24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_PID_SAMPLING_TIME')+' (ms)').appendField(new Blockly.FieldTextInput('100'),'SAMPLING_TIME').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/knob.svg',24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_WEIGHT')+' [0~100%]').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_WEIGHT_LOW')).appendField(new Blockly.FieldTextInput('35'),'WLOW').appendField(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_WEIGHT_HIGH')).appendField(new Blockly.FieldTextInput('65'),'WHIGH').setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setOutput(true,Number);
					this.setTooltip(Facilino.locales.getKey('LANG_SYSTEM_CONTROL_FILTER_BANDSTOP_TOOLTIP'));
				}
			};
		}
	}
	}
	
	var FacilinoFilter = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoFilter;
	} else {
		window.FacilinoFilter = FacilinoFilter;
	}
}));
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
		Blockly.Arduino.logic_bitwise_operation = function() {
			var code = '';
			var argument0 = Blockly.Arduino.valueToCode(this, 'A', Blockly.Arduino.ORDER_ATOMIC) || '';
			var argument1 = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC) || '';
			code = '(('+argument0+')'+this.getFieldValue('OP')+'('+argument1+'))';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.logic_bitwise_operation = {
			// Logical operations: 'and', 'or'.
			category: Facilino.locales.getKey('LANG_CATEGORY_LOGIC'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BITWISE'),
			helpUrl: Facilino.getHelpUrl('logic_bitwise_operation'),
			examples: [],
			tags: ['logic'],
			category_colour: Facilino.LANG_COLOUR_LOGIC,
			colour: Facilino.LANG_COLOUR_LOGIC_BITWISE,
			keys: ['LANG_LOGIC_BITWISE_OPERATION_NAME','LANG_LOGIC_BITWISE_OPERATION_DESCRIPTION','LANG_LOGIC_BITWISE_OPERATION_INPUT_A','LANG_LOGIC_BITWISE_OPERATION_INPUT_B','LANG_LOGIC_BITWISE_OPERATION_DROPDOWN_OPERATOR','LANG_LOGIC_BITWISE_OPERATION_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LOGIC_BITWISE_OPERATION_NAME'),
			description: Facilino.locales.getKey('LANG_LOGIC_BITWISE_OPERATION_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_LOGIC_BITWISE_OPERATION_INPUT_A'),Facilino.locales.getKey('LANG_LOGIC_BITWISE_OPERATION_INPUT_B')],
			dropdown: [Facilino.locales.getKey('LANG_LOGIC_BITWISE_OPERATION_DROPDOWN_OPERATOR')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LOGIC_BITWISE);
				this.setOutput(true,Number);
				this.appendValueInput('A').setCheck([Number,'Variable']);
				this.appendValueInput('B').setCheck([Number,'Variable']).appendField(new Blockly.FieldDropdown([
					['&', '&'],
					['|', '|'],
					['^', '^']
				]), 'OP');
				this.setInputsInline(true);
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_LOGIC_BITWISE_OPERATION_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<field name="OP">&amp;</field><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<field name="OP">|</field><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<field name="OP">^</field><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>'];
			}
		};

		Blockly.Arduino.logic_bitwise_not = function() {
			var code = '';
			var argument0 = Blockly.Arduino.valueToCode(this, 'A', Blockly.Arduino.ORDER_ATOMIC) || '';
			code = '(~'+argument0+')';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.logic_bitwise_not = {
			// Logical operations: 'and', 'or'.
			category: Facilino.locales.getKey('LANG_CATEGORY_LOGIC'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BITWISE'),
			helpUrl: Facilino.getHelpUrl('logic_bitwise_not'),
			examples: [],
			tags: ['logic'],
			category_colour: Facilino.LANG_COLOUR_LOGIC,
			colour: Facilino.LANG_COLOUR_LOGIC_BITWISE,
			keys: ['LANG_LOGIC_BITWISE_NOT_NAME','LANG_LOGIC_BITWISE_NOT_DESCRIPTION','LANG_LOGIC_BITWISE_NOT_INPUT','LANG_LOGIC_BITWISE_NOT_OUTPUT','LANG_LOGIC_BITWISE_NOT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LOGIC_BITWISE_NOT_NAME'),
			description: Facilino.locales.getKey('LANG_LOGIC_BITWISE_NOT_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_LOGIC_BITWISE_NOT_INPUT')],
			output: Facilino.locales.getKey('LANG_LOGIC_BITWISE_NOT_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LOGIC_BITWISE);
				this.setOutput(true,Number);
				this.appendValueInput('A').appendField('~').setCheck([Number,'Variable']);
				this.setInputsInline(true);
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_LOGIC_BITWISE_NOT_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.logic_shift = function() {
			var code = '';
			var argument0 = Blockly.Arduino.valueToCode(this, 'A', Blockly.Arduino.ORDER_ATOMIC) || '';
			var argument1 = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC) || '';
			code = '(('+argument0+')'+this.getFieldValue('OP')+'('+argument1+'))';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.logic_shift = {
			// Logical operations: 'and', 'or'.
			category: Facilino.locales.getKey('LANG_CATEGORY_LOGIC'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BITWISE'),
			helpUrl: Facilino.getHelpUrl('logic_shift'),
			examples: [],
			tags: ['logic'],
			category_colour: Facilino.LANG_COLOUR_LOGIC,
			colour: Facilino.LANG_COLOUR_LOGIC_BITWISE,
			keys: ['LANG_LOGIC_BITWISE_SHIFT_NAME','LANG_LOGIC_BITWISE_SHIFT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LOGIC_BITWISE_SHIFT_NAME'),
			description: Facilino.locales.getKey('LANG_LOGIC_BITWISE_SHIFT_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_LOGIC_BITWISE_SHIFT_INPUT_A'),Facilino.locales.getKey('LANG_LOGIC_BITWISE_SHIFT_INPUT_B')],
			output: Facilino.locales.getKey('LANG_LOGIC_BITWISE_SHIFT_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LOGIC_BITWISE);
				this.setOutput(true,Number);
				this.appendValueInput('A').setCheck([Number,'Variable']);
				this.appendValueInput('B').setCheck([Number,'Variable']).appendField(new Blockly.FieldDropdown([
					['<<', '<<'],
					['>>', '>>']
				]), 'OP');
				this.setInputsInline(true);
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_LOGIC_BITWISE_SHIFT_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<field name="OP">&lt;&lt;</field><value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">2</field></shadow></value>','<field name="OP">&gt;&gt;</field><value name="A"><shadow type="math_number"><field name="NUM">4</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'];
			}
		};
		
		Blockly.Arduino.logic_combine8= function() {
			var code = '';
			var argument0 = Blockly.Arduino.valueToCode(this, 'A', Blockly.Arduino.ORDER_ATOMIC) || '';
			var argument1 = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC) || '';
			code = '(((0x00FF&((short int)'+argument0+'))<<8)|'+'(0x00FF&((short int)'+argument1+')))';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.logic_combine8 = {
			// Logical operations: 'and', 'or'.
			category: Facilino.locales.getKey('LANG_CATEGORY_LOGIC'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BITWISE'),
			helpUrl: Facilino.getHelpUrl('logic_combine8'),
			examples: ['logic_combine_example'],
			tags: ['logic'],
			category_colour: Facilino.LANG_COLOUR_LOGIC,
			colour: Facilino.LANG_COLOUR_LOGIC_BITWISE,
			keys: ['LANG_LOGIC_BITWISE_COMBINE8_NAME','LANG_LOGIC_BITWISE_COMBINE8_DESCRIPTION','LANG_LOGIC_BITWISE_COMBINE8_INPUTS','LANG_LOGIC_BITWISE_COMBINE8_OUTPUT','LANG_LOGIC_BITWISE_COMBINE8_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE8_NAME'),
			description: Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE8_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE8_INPUTS')],
			output: Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE8_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LOGIC_BITWISE);
				this.setOutput(true,Number);
				this.appendValueInput('A').setCheck([Number,'Variable']);
				this.appendValueInput('B').setCheck([Number,'Variable']).appendField(new Blockly.FieldImage("img/blocks/join8.svg", 48*options.zoom, 20*options.zoom, "*"));
				this.setInputsInline(true);
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE8_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">255</field></shadow></value>';
			}
		};
		
		Blockly.Arduino.logic_combine8x4= function() {
			var code = '';
			var argument0 = Blockly.Arduino.valueToCode(this, 'A', Blockly.Arduino.ORDER_ATOMIC) || '';
			var argument1 = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC) || '';
			var argument2 = Blockly.Arduino.valueToCode(this, 'C', Blockly.Arduino.ORDER_ATOMIC) || '';
			var argument3 = Blockly.Arduino.valueToCode(this, 'D', Blockly.Arduino.ORDER_ATOMIC) || '';
			code = '(((0x0000FFFF&((unsigned long int)'+argument0+'))<<24)|'+'((0x0000FFFF&((unsigned long int)'+argument1+'))<<16)|'+'((0x0000FFFF&((unsigned long int)'+argument2+'))<<8)|'+'(0x0000FFFF&((unsigned long int)'+argument3+')))';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.logic_combine8x4 = {
			// Logical operations: 'and', 'or'.
			category: Facilino.locales.getKey('LANG_CATEGORY_LOGIC'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BITWISE'),
			helpUrl: Facilino.getHelpUrl('logic_combine8x4'),
			examples: [],
			tags: ['logic'],
			category_colour: Facilino.LANG_COLOUR_LOGIC,
			colour: Facilino.LANG_COLOUR_LOGIC_BITWISE,
			keys: ['LANG_LOGIC_BITWISE_COMBINE8x4_NAME','LANG_LOGIC_BITWISE_COMBINE8x4_DESCRIPTION','LANG_LOGIC_BITWISE_COMBINE8x4_INPUTS','LANG_LOGIC_BITWISE_COMBINE8x4_OUTPUT','LANG_LOGIC_BITWISE_COMBINE8x4_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE8x4_NAME'),
			description: Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE8x4_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE8x4_INPUTS')],
			output: Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE8x4_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LOGIC_BITWISE);
				this.setOutput(true,Number);
				this.appendValueInput('A').setCheck([Number,'Variable']);
				this.appendValueInput('B').setCheck([Number,'Variable']).appendField(new Blockly.FieldImage("img/blocks/join8.svg", 48*options.zoom, 20*options.zoom, "*"));
				this.appendValueInput('C').setCheck([Number,'Variable']).appendField(new Blockly.FieldImage("img/blocks/join8.svg", 48*options.zoom, 20*options.zoom, "*"));
				this.appendValueInput('D').setCheck([Number,'Variable']).appendField(new Blockly.FieldImage("img/blocks/join8.svg", 48*options.zoom, 20*options.zoom, "*"));
				this.setInputsInline(true);
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE8x4_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">255</field></shadow></value><value name="C"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="D"><shadow type="math_number"><field name="NUM">128</field></shadow></value>';
			}
		};
		
		Blockly.Arduino.logic_combine16 = function() {
			var code = '';
			var argument0 = Blockly.Arduino.valueToCode(this, 'A', Blockly.Arduino.ORDER_ATOMIC) || '';
			var argument1 = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_ATOMIC) || '';
			code = '(((0x0000FFFF&((unsigned long int)'+argument0+'))<<16)|'+'(0x0000FFFF&((unsigned long int)'+argument1+')))';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.logic_combine16 = {
			// Logical operations: 'and', 'or'.
			category: Facilino.locales.getKey('LANG_CATEGORY_LOGIC'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BITWISE'),
			helpUrl: Facilino.getHelpUrl('logic_combine16'),
			examples: ['logic_operation_example.bly'],
			tags: ['logic'],
			category_colour: Facilino.LANG_COLOUR_LOGIC,
			colour: Facilino.LANG_COLOUR_LOGIC_BITWISE,
			keys: ['LANG_LOGIC_BITWISE_COMBINE16_NAME','LANG_LOGIC_BITWISE_COMBINE16_DESCRIPTION','LANG_LOGIC_BITWISE_COMBINE16_INPUTS','LANG_LOGIC_BITWISE_COMBINE16_OUTPUT','LANG_LOGIC_BITWISE_COMBINE16_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE16_NAME'),
			description: Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE16_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE16_INPUTS')],
			output: Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE16_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LOGIC_BITWISE);
				this.setOutput(true,Number);
				this.appendValueInput('A').setCheck([Number,'Variable']);
				this.appendValueInput('B').setCheck([Number,'Variable']).appendField(new Blockly.FieldImage("img/blocks/join16.svg", 48*options.zoom, 20*options.zoom, "*"));
				this.setInputsInline(true);
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_LOGIC_BITWISE_COMBINE16_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="A"><shadow type="math_number"><field name="NUM">1024</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">512</field></shadow></value>';
			}
		};
		}
		}
	};
		
		
	var FacilinoBitwise = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoBitwise;
	} else {
		window.FacilinoBitwise = FacilinoBitwise;
	}
}));
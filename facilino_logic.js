(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
	
		Blockly.Arduino.logic_boolean = function() {
			// Boolean values true and false.
			var code = (this.getFieldValue('BOOL') === 'TRUE') ? 'true' : 'false';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.logic_boolean = {
			// Boolean data type: true and false.
			category: Facilino.locales.getKey('LANG_CATEGORY_LOGIC'),
			helpUrl: Facilino.getHelpUrl('logic_boolean'),
			examples: ['controls_flow_statements_example1'],
			tags: ['logic'],
			category_colour: Facilino.LANG_COLOUR_LOGIC,
			colour: Facilino.LANG_COLOUR_LOGIC,
			keys: ['LANG_LOGIC_BOOLEAN_TRUE_NAME','LANG_LOGIC_BOOLEAN_TRUE_DESCRIPTION','LANG_LOGIC_BOOLEAN_TRUE_DROPDOWN_VALUE','LANG_LOGIC_BOOLEAN_TRUE_OUTPUT','LANG_LOGIC_BOOLEAN_TRUE','LANG_LOGIC_BOOLEAN_FALSE'],
			name: Facilino.locales.getKey('LANG_LOGIC_BOOLEAN_TRUE_NAME'),
			description: Facilino.locales.getKey('LANG_LOGIC_BOOLEAN_TRUE_DESCRIPTION'),
			dropdown: [Facilino.locales.getKey('LANG_LOGIC_BOOLEAN_TRUE_DROPDOWN_VALUE')],
			output: Facilino.locales.getKey('LANG_LOGIC_BOOLEAN_TRUE_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LOGIC);
				this.setOutput(true,Boolean);
				this.appendDummyInput()
					.appendField(new Blockly.FieldDropdown([
						[Facilino.locales.getKey('LANG_LOGIC_BOOLEAN_TRUE'), 'TRUE'],
						[Facilino.locales.getKey('LANG_LOGIC_BOOLEAN_FALSE'), 'FALSE']
					]), 'BOOL');
				this.setTooltip(Facilino.locales.getKey('LANG_LOGIC_BOOLEAN_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<field name="BOOL">TRUE</field>','<field name="BOOL">FALSE</field>'];
			}
		};
		// Source: src/blocks/logic_compare/logic_compare.js


		Blockly.Arduino.logic_compare = function() {
			// Comparison operator.
			var mode = this.getFieldValue('OP');
			var operator = Blockly.Arduino.logic_compare.OPERATORS[mode];
			var order = (operator === '==' || operator === '!=') ?
				Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
			var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
			var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';
			var code = '';
			code += JST['logic_compare']({'argument0': argument0,'argument1': argument1,'operator': operator});
			return [code, order];
		};

		Blockly.Arduino.logic_compare.OPERATORS = {
			EQ: '==',
			NEQ: '!=',
			LT: '<',
			LTE: '<=',
			GT: '>',
			GTE: '>='
		};


		Blockly.Blocks.logic_compare = {
			// Comparison operator.
			category: Facilino.locales.getKey('LANG_CATEGORY_LOGIC'),
			helpUrl: Facilino.getHelpUrl('logic_compare'),
			examples: ['logic_compare_example'],
			tags: ['logic'],
			category_colour: Facilino.LANG_COLOUR_LOGIC,
			colour: Facilino.LANG_COLOUR_LOGIC,
			keys: ['LANG_LOGIC_COMPARE_NAME','LANG_LOGIC_COMPARE_DESCRIPTION','LANG_LOGIC_COMPARE_DROPDOWN_OPERATOR','LANG_LOGIC_COMPARE_INPUT_A','LANG_LOGIC_COMPARE_INPUT_B','LANG_LOGIC_COMPARE_OUTPUT','LANG_LOGIC_COMPARE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LOGIC_COMPARE_NAME'),
			description: Facilino.locales.getKey('LANG_LOGIC_COMPARE_DESCRIPTION'),
			dropdown: [Facilino.locales.getKey('LANG_LOGIC_COMPARE_DROPDOWN_OPERATOR')],
			inputs: [Facilino.locales.getKey('LANG_LOGIC_COMPARE_INPUT_A'),Facilino.locales.getKey('LANG_LOGIC_COMPARE_INPUT_B')],
			output: Facilino.locales.getKey('LANG_LOGIC_COMPARE_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LOGIC);
				this.setOutput(true,Boolean);
				this.appendValueInput('A').setCheck([Boolean,Number,'Variable','AnalogPin','DigitalPin','PWMPin']);
				this.appendValueInput('B').appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP').setCheck([Boolean,Number,'Variable','AnalogPin','DigitalPin','PWMPin']);
				this.setInputsInline(true);
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_LOGIC_COMPARE_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<field name="OP">EQ</field><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<field name="OP">NEQ</field><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value>','<field name="OP">LT</field><value name="A"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">10</field></shadow></value>','<field name="OP">LTE</field><value name="A"><shadow type="math_number"><field name="NUM">3</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">10</field></shadow></value>','<field name="OP">GT</field><value name="A"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">3</field></shadow></value>','<field name="OP">GTE</field><value name="A"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">3</field></shadow></value>'];
			}
		};

		Blockly.Blocks.logic_compare.OPERATORS = [
			['=', 'EQ'],
			['\u2260', 'NEQ'],
			['<', 'LT'],
			['\u2264', 'LTE'],
			['>', 'GT'],
			['\u2265', 'GTE']
		];

		Blockly.Arduino.logic_operation = function() {
			var code = '';
			// Operations 'and', 'or', 'xor'.
			var operator = (this.getFieldValue('OP') === 'AND') ? '&&' : (this.getFieldValue('OP') === 'OR') ? '||' : '';
			var order = (operator === '&&') ? Blockly.Arduino.ORDER_LOGICAL_AND : (operator === '||') ? Blockly.Arduino.ORDER_LOGICAL_OR : Blockly.Arduino.ORDER_NONE;
			var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
			var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';
			if (this.getFieldValue('OP') === 'XOR')
			{
				code += '((!('+argument0+'))&&('+argument1+')||((!('+argument1+'))&&('+argument0+')))';
			}
			else if (this.getFieldValue('OP') === 'XNOR')
			{
				code += '(('+argument0+')&&('+argument1+')||((!('+argument1+'))&&(!('+argument0+'))))';
			}
			else if (this.getFieldValue('OP') === 'IMPLIES')
			{
				code += '((!('+argument0+'))||('+argument1+'))';
			}
			else
			{
				code += '(' + argument0 + ') ' + operator + ' (' + argument1 + ')';
			}
			return [code, order];
		};

		Blockly.Blocks.logic_operation = {
			// Logical operations: 'and', 'or'.
			category: Facilino.locales.getKey('LANG_CATEGORY_LOGIC'),
			helpUrl: Facilino.getHelpUrl('logic_operation'),
			examples: ['logic_operation_example'],
			tags: ['logic'],
			category_colour: Facilino.LANG_COLOUR_LOGIC,
			colour: Facilino.LANG_COLOUR_LOGIC,
			keys: ['LANG_LOGIC_OPERATION_NAME','LANG_LOGIC_OPERATION_DESCRIPTION','LANG_LOGIC_OPERATION_DROPDOWN_OPERATOR','LANG_LOGIC_OPERATION_INPUT_A','LANG_LOGIC_OPERATION_INPUT_B','LANG_LOGIC_OPERATION_OUTPUT','LANG_LOGIC_OPERATION_AND','LANG_LOGIC_OPERATION_OR','LANG_LOGIC_OPERATION_XOR','LANG_LOGIC_OPERATION_XNOR','LANG_LOGIC_OPERATION_IMPLIES','LANG_LOGIC_OPERATION_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LOGIC_OPERATION_NAME'),
			description: Facilino.locales.getKey('LANG_LOGIC_OPERATION_DESCRIPTION'),
			dropdown: [Facilino.locales.getKey('LANG_LOGIC_OPERATION_DROPDOWN_OPERATOR')],
			inputs: [Facilino.locales.getKey('LANG_LOGIC_OPERATION_INPUT_A'),Facilino.locales.getKey('LANG_LOGIC_OPERATION_INPUT_B')],
			output: Facilino.locales.getKey('LANG_LOGIC_OPERATION_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LOGIC);
				this.setOutput(true,Boolean);
				this.appendValueInput('A').setCheck([Boolean,'Variable']);
				this.appendValueInput('B').setCheck([Boolean,'Variable']).appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_LOGIC_OPERATION_AND') || 'AND', 'AND'],
					[Facilino.locales.getKey('LANG_LOGIC_OPERATION_OR') || 'OR', 'OR'],
					[Facilino.locales.getKey('LANG_LOGIC_OPERATION_XOR') || 'XOR', 'XOR'],
					[Facilino.locales.getKey('LANG_LOGIC_OPERATION_XNOR') || 'XNOR', 'XNOR'],
					[Facilino.locales.getKey('LANG_LOGIC_OPERATION_IMPLIES') || 'IMPLIES', 'IMPLIES']
				]), 'OP');
				this.setInputsInline(true);
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_LOGIC_OPERATION_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<field name="OP">AND</field><value name="A"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><value name="B"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value>','<field name="OP">OR</field><value name="A"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><value name="B"><shadow type="logic_boolean"><field name="BOOL">FALSE</field></shadow></value>','<field name="OP">XOR</field><value name="A"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><value name="B"><shadow type="logic_boolean"><field name="BOOL">FALSE</field></shadow></value>','<field name="OP">XNOR</field><value name="A"><shadow type="logic_boolean"><field name="BOOL">FALSE</field></shadow></value><value name="B"><shadow type="logic_boolean"><field name="BOOL">FALSE</field></shadow></value>','<field name="OP">IMPLIES</field><value name="A"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><value name="B"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value>'];
			}
		};

		Blockly.Arduino.logic_negate = function() {
			// Negation.
			var order = Blockly.Arduino.ORDER_UNARY_PREFIX;
			var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', order) || 'false';
			var code = '';

			code += JST['logic_negate']({'argument0': argument0});
			return [code, order];
		};


		Blockly.Blocks.logic_negate = {
			// Negation.
			category: Facilino.locales.getKey('LANG_CATEGORY_LOGIC'),
			helpUrl: Facilino.getHelpUrl('logic_negate'),
			examples: ['logic_negate_example'],
			tags: ['logic'],
			category_colour: Facilino.LANG_COLOUR_LOGIC,
			colour: Facilino.LANG_COLOUR_LOGIC,
			keys: ['LANG_LOGIC_NEGATE_NAME','LANG_LOGIC_NEGATE_DESCRIPTION','LANG_LOGIC_NEGATE_INPUT','LANG_LOGIC_NEGATE_OUTPUT','LANG_LOGIC_NEGATE_INPUT_NOT','LANG_LOGIC_NEGATE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LOGIC_NEGATE_NAME'),
			description: Facilino.locales.getKey('LANG_LOGIC_NEGATE_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_LOGIC_NEGATE_INPUT')],
			output: Facilino.locales.getKey('LANG_LOGIC_NEGATE_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LOGIC);
				this.setOutput(true,Boolean);
				this.appendValueInput('BOOL').setCheck([Boolean,'Variable']).appendField(Facilino.locales.getKey('LANG_LOGIC_NEGATE_INPUT_NOT'));
				this.setTooltip(Facilino.locales.getKey('LANG_LOGIC_NEGATE_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="BOOL"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value>';
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{

		Blockly.Arduino.logic_to_boolean = function() {
			// Negation.
			var num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.ORDER_NONE);
			var code = '';
			code += '(('+num+')>0? true: false)';
			return [code, Blockly.ORDER_ATOMIC];
		};


		Blockly.Blocks.logic_to_boolean = {
			// Negation.
			category: Facilino.locales.getKey('LANG_CATEGORY_LOGIC'),
			helpUrl: Facilino.getHelpUrl('logic_to_boolean'),
			examples: ['logic_to_boolean_example'],
			tags: ['logic'],
			category_colour: Facilino.LANG_COLOUR_LOGIC,
			colour: Facilino.LANG_COLOUR_LOGIC,
			keys: ['LANG_LOGIC_TO_BOOLEAN_NAME','LANG_LOGIC_TO_BOOLEAN_DESCRIPTION','LANG_LOGIC_TO_BOOLEAN_INPUT_NUMBER','LANG_LOGIC_TO_BOOLEAN_OUTPUT','LANG_LOGIC_TO_BOOLEAN','LANG_LOGIC_TO_BOOLEAN_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LOGIC_TO_BOOLEAN_NAME'),
			description: Facilino.locales.getKey('LANG_LOGIC_TO_BOOLEAN_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_LOGIC_TO_BOOLEAN_INPUT_NUMBER')],
			output: Facilino.locales.getKey('LANG_LOGIC_TO_BOOLEAN_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_LOGIC);
				this.appendValueInput('NUM').setCheck([Number,'Variable']).appendField(Facilino.locales.getKey('LANG_LOGIC_TO_BOOLEAN'));
				this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_LOGIC_TO_BOOLEAN_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="NUM"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value>'];
			}
		};
		}
	};
		
		
	var FacilinoLogic = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoLogic;
	} else {
		window.FacilinoLogic = FacilinoLogic;
	}
}));
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		// Source: src/blocks/math_number/math_number.js

		Blockly.Arduino.math_number = function() {
			// Numeric value.
			var code = window.parseFloat(this.getFieldValue('NUM'));
			// -4.abs() returns -4 in Dart due to strange order of operation choices.
			// -4 is actually an operator and a number.  Reflect this in the order.
			var order = code < 0 ? Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
			return [code, order];
		};

		Blockly.Blocks.math_number = {
			// Numeric value.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('math_number'),
			examples: ['math_number_example'],
			tags: ['math'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_NUMBER_NAME','LANG_MATH_NUMBER_DESCRIPTION','LANG_MATH_NUMBER_FIELD_NUMBER','LANG_MATH_NUMBER_OUTPUT','LANG_MATH_NUMBER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_NUMBER_NAME'),
			description: Facilino.locales.getKey('LANG_MATH_NUMBER_DESCRIPTION'),
			fields: [Facilino.locales.getKey('LANG_MATH_NUMBER_FIELD_NUMBER')],
			output: Facilino.locales.getKey('LANG_MATH_NUMBER_OUTPUT'),
			init: function() {
				this.setColour(this.colour);
				this.appendDummyInput().appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM');
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_NUMBER_TOOLTIP'));
			}
		};

		Blockly.Blocks.math_number.validator = function(text) {
			// Ensure that only a number may be entered.
			// TODO: Handle cases like 'o', 'ten', '1,234', '3,14', etc.
			var n = window.parseFloat(text || 0);
			return window.isNaN(n) ? null : String(n);
		};
		
		Blockly.Arduino.math_arithmetic = function() {
			// Basic arithmetic operators, and power.
			var mode = this.getFieldValue('OP');
			var tuple = Blockly.Arduino.math_arithmetic.OPERATORS[mode];
			var operator = tuple[0];
			var order = tuple[1];
			var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '';
			var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '';
			var code = '';
			if (!operator) {
				code = JST['math_arithmetic_pow']({'argument0': argument0,'argument1': argument1});
				return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
			}
			code += JST['math_arithmetic']({'argument0': argument0,'argument1': argument1,'operator': operator});
			return [code, order];
		};

		Blockly.Arduino.math_arithmetic.OPERATORS = {
			ADD: [' + ', Blockly.Arduino.ORDER_ADDITIVE],
			MINUS: [' - ', Blockly.Arduino.ORDER_ADDITIVE],
			MULTIPLY: [' * ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
			DIVIDE: [' / ', Blockly.Arduino.ORDER_MULTIPLICATIVE],
			POWER: [null, Blockly.Arduino.ORDER_NONE]
		};




		Blockly.Blocks.math_arithmetic = {
			// Basic arithmetic operator.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			helpUrl: Facilino.getHelpUrl('math_arithmetic'),
			examples: ['math_arithmetic_example'],
			tags: ['math'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_ARITHMETIC_NAME','LANG_MATH_ARITHMETIC_DESCRIPTION','LANG_MATH_ARITHMETIC_DROPDOWN_OPERATOR','LANG_MATH_ARITHMETIC_INPUT_A','LANG_MATH_ARITHMETIC_INPUT_B','LANG_MATH_ARITHMETIC_OUTPUT','LANG_MATH_ARITHMETIC_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_ARITHMETIC_NAME'),
			description: Facilino.locales.getKey('LANG_MATH_ARITHMETIC_DESCRIPTION'),
			dropdown: [Facilino.locales.getKey('LANG_MATH_ARITHMETIC_DROPDOWN_OPERATOR')],
			inputs: [Facilino.locales.getKey('LANG_MATH_ARITHMETIC_INPUT_A'),Facilino.locales.getKey('LANG_MATH_ARITHMETIC_INPUT_B')],
			output: Facilino.locales.getKey('LANG_MATH_ARITHMETIC_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.setOutput(true,Number);
				this.appendValueInput('A').setCheck([Number,'Variable']);
				this.appendValueInput('B').setCheck([Number,'Variable']).appendField(new Blockly.FieldDropdown(this.OPERATORS), 'OP');
				this.setInputsInline(true);
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_ARITHMETIC_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				xml+='<value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				return xml;
			},
			default_inputs: function()
			{
				return ['<field name="OP">ADD</field><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<field name="OP">MINUS</field><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<field name="OP">MULTIPLY</field><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value>','<field name="OP">DIVIDE</field><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">1</field></shadow></value>','<field name="OP">POWER</field><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">0</field></shadow></value>'];
			}
			
			
		};

		Blockly.Blocks.math_arithmetic.OPERATORS = [
			['+', 'ADD'],
			['-', 'MINUS'],
			['\u00D7', 'MULTIPLY'],
			['\u00F7', 'DIVIDE'],
			['^', 'POWER']
		];

		Blockly.Arduino.math_modulo = function() {
			var argument0 = Blockly.Arduino.valueToCode(this, 'DIVIDEND',
				Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
			var argument1 = Blockly.Arduino.valueToCode(this, 'DIVISOR',
				Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
			var code = '';
			code += JST['math_modulo']({'argument0': argument0,'argument1': argument1});
			return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
		};

		Blockly.Blocks.math_modulo = {
			// Remainder of a division.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			helpUrl: Facilino.getHelpUrl('math_modulo'),
			examples: ['math_arithmetic_example.bly'],
			tags: ['math'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_MODULO_NAME','LANG_MATH_MODULO_DESCRIPTION','LANG_MATH_MODULO_INPUT_A','LANG_MATH_MODULO_INPUT_B','LANG_MATH_MODULO_OUTPUT','LANG_MATH_MODULO_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_MODULO_NAME'),
			description: Facilino.locales.getKey('LANG_MATH_MODULO_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_MATH_MODULO_INPUT_A'),Facilino.locales.getKey('LANG_MATH_MODULO_INPUT_B')],
			output: Facilino.locales.getKey('LANG_MATH_MODULO_OUTPUT'),
			init: function() {
				this.setColour(this.colour);
				this.setOutput(true,Number);
				this.appendValueInput('DIVIDEND').setCheck([Number,'Variable']);
				this.appendValueInput('DIVISOR').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT).appendField('%');
				this.setInputsInline(true);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_MODULO_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="DIVIDEND"><shadow type="math_number"><field name="NUM">32</field></shadow></value>';
				xml+='<value name="DIVISOR"><shadow type="math_number"><field name="NUM">10</field></shadow></value>';
				return xml;
			}
		};
		
		Blockly.Arduino.base_map = function() {
			var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
			var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);

			var code = '';
			if (Facilino.profiles['processor']==='ESP32')
				code += 'map('+value_num+',0,4095,0,'+value_dmax+')';
			else
				code += 'map('+value_num+',0,1023,0,'+value_dmax+')';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.base_map = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			helpUrl: Facilino.getHelpUrl('base_map'),
			examples: ['base_map_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_BASE_MAP_NAME','LANG_MATH_BASE_MAP_DESCRIPTION','LANG_MATH_BASE_MAP_INPUT_VALUE','LANG_MATH_BASE_MAP_INPUT_MAX','LANG_MATH_BASE_MAP_OUTPUT','LANG_MATH_BASE_MAP','LANG_ADVANCED_MATH_BETWEEN','LANG_MATH_BASE_MAP_BRACKET','LANG_MATH_BASE_MAP_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_BASE_MAP_NAME'),
			description: Facilino.locales.getKey('LANG_MATH_BASE_MAP_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_MATH_BASE_MAP_INPUT_VALUE'),Facilino.locales.getKey('LANG_MATH_BASE_MAP_INPUT_MAX')],
			output: Facilino.locales.getKey('LANG_MATH_BASE_MAP_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('NUM')
					.appendField(Facilino.locales.getKey('LANG_MATH_BASE_MAP'))
					.setCheck([Number,'Variable']);
				this.appendValueInput('DMAX')
					.appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_BETWEEN'))
					.appendField('0')
					.appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_RANDOM_AND'))
					.setCheck([Number,'Variable']);
				this.setInputsInline(true);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_BASE_MAP_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				if (Facilino.profiles['processor']==='ESP32')
					xml+='<value name="NUM"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="DMAX"><shadow type="math_number"><field name="NUM">4095</field></shadow></value>';
				else
					xml+='<value name="NUM"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="DMAX"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>';
				var xml1='';
				if (Facilino.profiles['processor']==='ESP32')
					xml1+='<value name="NUM"><shadow type="variables_get"></shadow></value><value name="DMAX"><shadow type="math_number"><field name="NUM">4095</field></shadow></value>';
				else
					xml1+='<value name="NUM"><shadow type="variables_get"></shadow></value><value name="DMAX"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>';
				
				return [xml,xml1];
			}
		};

		
		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.advanced_map = function() {
			var num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
			var from_min = Blockly.Arduino.valueToCode(this, 'FROM_MIN', Blockly.Arduino.ORDER_NONE);
			var from_max = Blockly.Arduino.valueToCode(this, 'FROM_MAX', Blockly.Arduino.ORDER_NONE);
			var to_min = Blockly.Arduino.valueToCode(this, 'TO_MIN', Blockly.Arduino.ORDER_NONE);
			var to_max = Blockly.Arduino.valueToCode(this, 'TO_MAX', Blockly.Arduino.ORDER_NONE);
			var code = '';
			code += 'map('+num+','+from_min+','+from_max+','+to_min+','+to_max+')';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.advanced_map = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			helpUrl: Facilino.getHelpUrl('advanced_map'),
			examples: ['advanced_map_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_ADVANCED_MAP_NAME','LANG_MATH_ADVANCED_MAP_DESCRIPTION','LANG_MATH_ADVANCED_MAP_INPUT_VALUE','LANG_MATH_ADVANCED_MAP_INPUT_FROM_MIN','LANG_MATH_ADVANCED_MAP_INPUT_FROM_MAX','LANG_MATH_ADVANCED_MAP_INPUT_TO_MIN','LANG_MATH_ADVANCED_MAP_INPUT_TO_MAX','LANG_MATH_ADVANCED_MAP_OUTPUT','LANG_MATH_ADVANCED_MAP_MAP','LANG_MATH_ADVANCED_MAP_FROM','LANG_MATH_ADVANCED_MAP_HYPHEN','LANG_MATH_ADVANCED_MAP_BRACKET','LANG_MATH_ADVANCED_MAP_TO','LANG_MATH_ADVANCED_MAP_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_NAME'),
			description: Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_INPUT_VALUE'),Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_INPUT_FROM_MIN'),Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_INPUT_FROM_MAX'),Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_INPUT_TO_MIN'),Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_INPUT_TO_MAX')],
			output: Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('NUM')
					.appendField(Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_MAP'))
					.setCheck([Number,'Variable']);
				this.appendValueInput('FROM_MIN')
					.appendField(Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_FROM'))
					.setCheck([Number,'Variable']);
				this.appendValueInput('FROM_MAX')
					.appendField(Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_HYPHEN'))
					.setCheck([Number,'Variable']);
				this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_BRACKET'));
				this.appendValueInput('TO_MIN')
					.appendField(Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_TO'))
					.setCheck([Number,'Variable']);
				this.appendValueInput('TO_MAX')
					.appendField(Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_HYPHEN'))
					.setCheck([Number,'Variable']);
				this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_BRACKET'));
				this.setInputsInline(true);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_ADVANCED_MAP_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="NUM"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="FROM_MIN"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				if (Facilino.profiles['processor']==='ESP32')
					xml+='<value name="FROM_MAX"><shadow type="math_number"><field name="NUM">4095</field></shadow></value>';
				else
					xml+='<value name="FROM_MAX"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>';
				xml+='<value name="TO_MIN"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				xml+='<value name="TO_MAX"><shadow type="math_number"><field name="NUM">100</field></shadow></value>';
				var xml1='';
				xml1+='<value name="NUM"><shadow type="variables_get"></shadow></value><value name="FROM_MIN"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				if (Facilino.profiles['processor']==='ESP32')
					xml1+='<value name="FROM_MAX"><shadow type="math_number"><field name="NUM">4095</field></shadow></value>';
				else
					xml1+='<value name="FROM_MAX"><shadow type="math_number"><field name="NUM">1023</field></shadow></value>';
				xml1+='<value name="TO_MIN"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				xml1+='<value name="TO_MAX"><shadow type="math_number"><field name="NUM">100</field></shadow></value>';
				return [xml,xml1];
			}
		};
		}
		
		Blockly.Arduino.math_minmax = function() {
			// Basic arithmetic operators, and power.
			var op = this.getFieldValue('OP');
			var argument0 = Blockly.Arduino.valueToCode(this, 'A', Blockly.Arduino.ORDER_NONE) || '';
			var argument1 = Blockly.Arduino.valueToCode(this, 'B', Blockly.Arduino.ORDER_NONE) || '';
			var code = '';
			code+= op+'('+argument0+','+argument1+')';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_minmax = {
			// Basic arithmetic operator.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			helpUrl: Facilino.getHelpUrl('math_minmax'),
			examples: ['minmax_example.bly'],
			tags: ['math'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_ADVANCED_MATH_MINMAX_NAME','LANG_ADVANCED_MATH_MINMAX_DESCRIPTION','LANG_ADVANCED_MATH_MINMAX_DROPDOWN_OPERATOR','LANG_ADVANCED_MATH_MINMAX_INPUT_A','LANG_ADVANCED_MATH_MINMAX_INPUT_B','LANG_ADVANCED_MATH_MINMAX_OUTPUT','LANG_ADVANCED_MATH_BETWEEN','LANG_ADVANCED_MATH_RANDOM_AND','LANG_MATH_MINMAX_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_MATH_MINMAX_NAME'),
			description: Facilino.locales.getKey('LANG_ADVANCED_MATH_MINMAX_DESCRIPTION'),
			dropdown: [Facilino.locales.getKey('LANG_ADVANCED_MATH_MINMAX_DROPDOWN_OPERATOR')],
			inputs: [Facilino.locales.getKey('LANG_ADVANCED_MATH_MINMAX_INPUT_A'),Facilino.locales.getKey('LANG_ADVANCED_MATH_MINMAX_INPUT_B')],
			ouput: Facilino.locales.getKey('LANG_ADVANCED_MATH_MINMAX_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.setOutput(true,Number);
				this.appendValueInput('A').appendField(new Blockly.FieldDropdown([['min', 'min'],['max', 'max']]), 'OP').appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_BETWEEN')).setCheck([Number,'Variable']);
				this.appendValueInput('B').setCheck([Number,'Variable']).appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_RANDOM_AND'));
				this.setInputsInline(true);
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_MINMAX_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">10</field></shadow></value><field name="OP">min</field>','<value name="A"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">10</field></shadow></value><field name="OP">max</field>'];
			}
		};
		
		Blockly.Arduino.math_random = function() {
			var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
			var value_dmax = Blockly.Arduino.valueToCode(this, 'DMAX', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';

			Blockly.Arduino.definitions_['define_random_bitOut'] = JST['math_random_bitOut']({});
			Blockly.Arduino.definitions_['define_random_seedOut'] = JST['math_random_seedOut']({});

			Blockly.Arduino.setups_['setup_randomseed'] = 'unsigned long seed =seedOut(31);\n  randomSeed(seed);\n';

			code += JST['math_random']({'value_num': value_num,'value_dmax': value_dmax});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_random = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			helpUrl: Facilino.getHelpUrl('math_random'),
			examples: ['math_random_example.bly'],
			tags: ['math'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_ADVANCED_MATH_RANDOM_NAME','LANG_ADVANCED_MATH_RANDOM_DESCRIPTION','LANG_ADVANCED_MATH_RANDOM_INPUT_MIN','LANG_ADVANCED_MATH_RANDOM_INPUT_MAX','LANG_ADVANCED_MATH_RANDOM_OUTPUT','LANG_ADVANCED_MATH_RANDOM','LANG_ADVANCED_MATH_RANDOM_AND','LANG_ADVANCED_MATH_RANDOM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_MATH_RANDOM_NAME'),
			description: Facilino.locales.getKey('LANG_ADVANCED_MATH_RANDOM_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_ADVANCED_MATH_RANDOM_INPUT_MIN'),Facilino.locales.getKey('LANG_ADVANCED_MATH_RANDOM_INPUT_MAX')],
			output: Facilino.locales.getKey('LANG_ADVANCED_MATH_RANDOM_OUTPUT'),
			init: function() {
				this.setColour(this.colour);
				this.appendValueInput('NUM').appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_RANDOM')).setCheck([Number,'Variable']);
				this.appendValueInput('DMAX').appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_RANDOM_AND')).setCheck([Number,'Variable']);
				this.setInputsInline(true);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_MATH_RANDOM_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value>';
				xml+='<value name="DMAX"><shadow type="math_number"><field name="NUM">10</field></shadow></value>';
				return xml;
			}
		};

if (window.FacilinoAdvanced===true)
		{
	Blockly.Arduino.math_to_number = function() {
			var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE);
		var dropdown_cast = this.getFieldValue('CAST') || '';
			var code = '';
			var input = this.getInputTargetBlock('VALUE');
			if (input!==null)
			{
				if (input.type==='text')
				{
					value='String('+value+').c_str()';
				}
				else if (input.type==='variables_get')
				{
					if (Facilino.variables[input.getFieldValue('VAR')][0]==='String')
						value+='.c_str()';
				}
				code +='('+dropdown_cast+')('+value+')';
			}
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_to_number = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			tags: ['math'],
			helpUrl: Facilino.getHelpUrl('math_to_number'),
			examples: ['math_to_number_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_ADVANCED_MATH_CAST_NAME','LANG_ADVANCED_MATH_CAST_DESCRIPTION','LANG_ADVANCED_MATH_CAST_DROPDOWN_TYPES','LANG_ADVANCED_MATH_CAST_INPUT_VALUE','LANG_ADVANCED_MATH_CAST_OUTPUT','LANG_ADVANCED_MATH_CAST','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_INTEGER_SHORT','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_FLOAT'],
			name: Facilino.locales.getKey('LANG_ADVANCED_MATH_CAST_NAME'),
			description: Facilino.locales.getKey('LANG_ADVANCED_MATH_CAST_DESCRIPTION'),
			dropdown: [Facilino.locales.getKey('LANG_ADVANCED_MATH_CAST_DROPDOWN_TYPES')],
			inputs: [Facilino.locales.getKey('LANG_ADVANCED_MATH_CAST_INPUT_VALUE')],
			output: Facilino.locales.getKey('LANG_ADVANCED_MATH_CAST_OUTPUT'),
			init: function() {
				this.setColour(this.colour);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_CAST')).appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_SHORT'), 'short'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
				]), "CAST").setCheck([Number,Boolean,'Variable',String]);
				this.setInputsInline(true);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_MATH_CAST_TOOLTIP'));
			},
			default_inputs: function ()
			{
				return ['<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value><field name="CAST">int</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value><field name="CAST">short</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value><field name="CAST">long</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value><field name="CAST">byte</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value><field name="CAST">float</field>']
			}
		};
		
		Blockly.Arduino.math_single = function() {
			// Math operators with single operand.
			var operator = this.getFieldValue('OP');
			var arg;
			var code = '';

			if (operator === 'NEG') {
				// Negation is a special case given its different operator precedents.
				arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_UNARY_PREFIX) || '';
				if (arg[0] === '-') {
					arg = ' ' + arg;
				}
				code += '-' + arg;
				return [code, Blockly.Arduino.ORDER_UNARY_PREFIX];
			} else if (operator === 'SIN' || operator === 'COS' || operator === 'TAN') {
				arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '';
			} else if (operator === 'LOG10') {
				code = '';
			} else {
				arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE) || '';
			}
			var PI = 3.14159;
			// First, handle cases which generate values that don't need parentheses.
			switch (operator) {
				case 'ABS':
					code += 'abs(' + arg + ')';
					break;
				case 'ROOT':
					code += 'sqrt(' + arg + ')';
					break;
				case 'LN':
					code += 'log(' + arg + ')';
					break;
				case 'EXP':
					code += 'exp(' + arg + ')';
					break;
				case 'POW10':
					code += 'pow(10,' + arg + ')';
					break;
				case 'SIN':
					code += 'sin(' + arg + ' / 180 * ' + PI + ')';
					break;
				case 'COS':
					code += 'cos(' + arg + ' / 180 * ' + PI + ')';
					break;
				case 'TAN':
					code += 'tan(' + arg + ' / 180 * ' + PI + ')';
					break;
			}
			if (code) {
				return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
			}

			// Second, handle cases which generate values that may need parentheses.
			switch (operator) {
				case 'LOG10':
					arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE) || '';
					code += 'log(' + arg + ') / log(10)';
					break;
				case 'ASIN':
					code += 'asin(' + arg + ') / ' + PI + ' * 180';
					break;
				case 'ACOS':
					code += 'acos(' + arg + ') / ' + PI + ' * 180';
					break;
				case 'ATAN':
					code += 'atan(' + arg + ') / ' + PI + ' * 180';
					break;
				default:
					throw 'Unknown math operator: ' + operator;
			}
			return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
		};


		Blockly.Blocks.math_single = {
			// Advanced math operators with single operand.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			helpUrl: Facilino.getHelpUrl('math_single'),
			examples: ['math_single_example.bly'],
			tags: ['math'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_SINGLE_OP_NAME','LANG_MATH_SINGLE_OP_DESCRIPTION','LANG_MATH_SINGLE_OP_DROPDOWN_OPERATION','LANG_MATH_SINGLE_OP_INPUT_NUMBER','LANG_MATH_SINGLE_OP_OUTPUT','LANG_MATH_SINGLE_OP_ROOT','LANG_MATH_SINGLE_OP_ABSOLUTE','LANG_MATH_SINGLE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_SINGLE_OP_NAME'),
			description: Facilino.locales.getKey('LANG_MATH_SINGLE_OP_DESCRIPTION'),
			dropdown: [Facilino.locales.getKey('LANG_MATH_SINGLE_OP_DROPDOWN_OPERATION')],
			inputs: [Facilino.locales.getKey('LANG_MATH_SINGLE_OP_INPUT_NUMBER')],
			output: Facilino.locales.getKey('LANG_MATH_SINGLE_OP_OUTPUT'),
			init: function() {
				this.setColour(this.colour);
				this.setOutput(true,Number);
				this.appendValueInput('NUM')
					.setCheck([Number,'Variable'])
					.appendField(new Blockly.FieldDropdown([
						[Facilino.locales.getKey('LANG_MATH_SINGLE_OP_ROOT') || 'SQR ROOT', 'ROOT'],
						[Facilino.locales.getKey('LANG_MATH_SINGLE_OP_ABSOLUTE') || 'ABS', 'ABS'],
						['-', 'NEG'],
						['ln', 'LN'],
						['log10', 'LOG10'],
						['e^', 'EXP'],
						['10^', 'POW10'],
						['sin','SIN'],
						['cos','COS'],
						['tan','TAN'],
						['asin','ASIN'],
						['acos','ACOS'],
						['atan','ATAN']
					]), 'OP');
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_SINGLE_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<field name="OP">ROOT</field><value name="NUM"><shadow type="math_number"><field name="NUM">9</field></shadow></value>','<field name="OP">ABS</field><value name="NUM"><shadow type="math_number"><field name="NUM">5</field></shadow></value>','<field name="OP">NEG</field><value name="NUM"><shadow type="math_number"><field name="NUM">-3</field></shadow></value>','<field name="OP">LN</field><value name="NUM"><shadow type="math_number"><field name="NUM">2.71828</field></shadow></value>','<field name="OP">LOG10</field><value name="NUM"><shadow type="math_number"><field name="NUM">100</field></shadow></value>','<field name="OP">EXP</field>','<field name="OP">POW10</field>','<field name="OP">SIN</field><value name="NUM"><shadow type="math_number"><field name="NUM">30</field></shadow></value>','<field name="OP">COS</field><value name="NUM"><shadow type="math_number"><field name="NUM">60</field></shadow></value>','<field name="OP">TAN</field><value name="NUM"><shadow type="math_number"><field name="NUM">45</field></shadow></value>','<field name="OP">ASIN</field><value name="NUM"><shadow type="math_number"><field name="NUM">0.5</field></shadow></value>','<field name="OP">ACOS</field><value name="NUM"><shadow type="math_number"><field name="NUM">0.5</field></shadow></value>','<field name="OP">ATAN</field><value name="NUM"><shadow type="math_number"><field name="NUM">0.5</field></shadow></value>'];
			}
		};

		// Source: src/blocks/math_single/math_single.js
		Blockly.Arduino.math_sinusoid = function() {
			var amplitude = Blockly.Arduino.valueToCode(this, 'AMPLITUDE', Blockly.Arduino.ORDER_NONE);
			var freq= Blockly.Arduino.valueToCode(this, 'FREQ', Blockly.Arduino.ORDER_NONE);
			var phase = Blockly.Arduino.valueToCode(this, 'PHASE', Blockly.Arduino.ORDER_NONE);
			var offset = Blockly.Arduino.valueToCode(this, 'OFFSET', Blockly.Arduino.ORDER_NONE);
			var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_NONE);
			var code='('+amplitude+')*sin((6.28318530717959e-06)*(('+freq+')*((float)('+time+')))+0.017453292519943*('+phase+'))+'+'('+offset+')';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_sinusoid = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			tags: ['math'],
			helpUrl: Facilino.getHelpUrl('math_sinusoid'),
			examples: ['math_sinusoid_example.bly'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_ADVANCED_MATH_SINUSOID_NAME','LANG_ADVANCED_MATH_SINUSOID_DESCRIPTION','LANG_ADVANCED_MATH_SINUSOID_INPUT_AMPLITUDE','LANG_ADVANCED_MATH_SINUSOID_INPUT_FREQUENCY','LANG_ADVANCED_MATH_SINUSOID_INPUT_PHASE','LANG_ADVANCED_MATH_SINUSOID_INPUT_MEAN','LANG_ADVANCED_MATH_SINUSOID_INPUT_TIME','LANG_ADVANCED_MATH_SINUSOID_OUTPUT','LANG_ADVANCED_MATH_SINUSOID','LANG_ADVANCED_MATH_SINUSOID_AMPLITUDE','LANG_ADVANCED_MATH_SINUSOID_FREQ','LANG_ADVANCED_MATH_SINUSOID_PHASE','LANG_ADVANCED_MATH_SINUSOID_OFFSET','LANG_ADVANCED_MATH_SINUSOID_TIME','LANG_ADVANCED_MATH_SINUSOID_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_NAME'),
			description: Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_DESCRIPTION'),
			doc_images: ['doc/common/math_sinusoid_matlab.png'],
			inputs: [Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_INPUT_AMPLITUDE'),Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_INPUT_FREQUENCY'),Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_INPUT_PHASE'),Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_INPUT_MEAN'),Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_INPUT_TIME')],
			output: Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_OUTPUT'),
			init: function() {
				this.setColour(this.colour);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID')).setAlign(Blockly.Blocks.ALIGN_RIGHT);
				this.appendValueInput('AMPLITUDE').appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_AMPLITUDE')).setAlign(Blockly.Blocks.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.appendValueInput('FREQ').appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_FREQ')).setAlign(Blockly.Blocks.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.appendValueInput('PHASE').appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_PHASE')).setAlign(Blockly.Blocks.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.appendValueInput('OFFSET').appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_OFFSET')).setAlign(Blockly.Blocks.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.appendValueInput('TIME').appendField(Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_TIME')).setAlign(Blockly.Blocks.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.setInputsInline(true);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_MATH_SINUSOID_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="AMPLITUDE"><shadow type="math_number"><field name="NUM">1</field></shadow></value>';
				xml+='<value name="FREQ"><shadow type="math_number"><field name="NUM">1</field></shadow></value>';
				xml+='<value name="PHASE"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				xml+='<value name="OFFSET"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				xml+='<value name="TIME"><shadow type="base_us"></shadow></value>';
				return xml;
			}
		};
		}
	
	};
		
		
	var FacilinoMaths = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoMaths;
	} else {
		window.FacilinoMaths = FacilinoMaths;
	}
}));
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
	Blockly.Arduino.programming_include = function() {
			var code='';
			var include_code = this.getFieldValue('LIBRARY');
			Blockly.Arduino.definitions_['define_include_'+include_code] = '#include <'+include_code+'.h>\n';
			return code;
		};

		Blockly.Blocks.programming_include = {
			// Do/while loop.
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_PROGRAMMING'),
			helpUrl: Facilino.getHelpUrl('programming_include'),
			examples: ['programming_include_example','programming_execute_example'],
			category_colour: Facilino.LANG_COLOUR_PROGRAMMING,
			colour: Facilino.LANG_COLOUR_PROGRAMMING,
			keys: ['LANG_PROGRAMMING_INCLUDE_LIBRARY_NAME','LANG_PROGRAMMING_INCLUDE_LIBRARY_DESCRIPTION','LANG_PROGRAMMING_INCLUDE_LIBRARY_FIELD_LIBRARY','LANG_CONTROLS_DOWHILE_OPERATOR_DO','LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE','LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL','LANG_CONTROLS_DOWHILE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PROGRAMMING_INCLUDE_LIBRARY_NAME'),
			description: Facilino.locales.getKey('LANG_PROGRAMMING_INCLUDE_LIBRARY_DESCRIPTION'),
			fields: [Facilino.locales.getKey('LANG_PROGRAMMING_INCLUDE_LIBRARY_FIELD_LIBRARY')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_PROGRAMMING);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_PROGRAMMING_INCLUDE_LIBRARY')).appendField(new Blockly.FieldTextInput('library_name'),'LIBRARY');
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setTooltip(Facilino.locales.getKey('LANG_PROGRAMMING_INCLUDE_LIBRARY_TOOLTIP'));
			}
		};
		
		
		
		Blockly.Arduino.programming_execute = function() {
			var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			content = content.replace(/^"/, '');
			content = content.replace(/"$/g, '');
			if (content.match(/^#include /)) {
				var include_code = JST['programming_execute']({'content': content});
				if ('define_include' in Blockly.Arduino.definitions_) {
					Blockly.Arduino.definitions_['define_include'] += include_code;
				} else {
					Blockly.Arduino.definitions_['define_include'] = include_code;
				}
			}
			else if (content.match(/^#define /)) {
				var define_code = JST['programming_execute']({'content': content});
				if ('define_include' in Blockly.Arduino.definitions_) {
					Blockly.Arduino.definitions_['define_include'] += define_code;
				} else {
					Blockly.Arduino.definitions_['define_include'] = define_code;
				}
			} else {
				code += JST['programming_execute']({'content': content});
			}
			return code;
		};

		Blockly.Blocks.programming_execute = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_PROGRAMMING'),
			helpUrl: Facilino.getHelpUrl('programming_execute'),
			examples: ['programming_include_example','programming_execute_example'],
			category_colour: Facilino.LANG_COLOUR_PROGRAMMING,
			colour: Facilino.LANG_COLOUR_PROGRAMMING,
			keys: ['LANG_CONTROLS_EXECUTE_NAME','LANG_CONTROLS_EXECUTE_DESCRIPTION','LANG_CONTROLS_EXECUTE_INPUT_CODE','LANG_CONTROLS_EXECUTE','LANG_CONTROLS_EXECUTE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_EXECUTE_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_EXECUTE_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_EXECUTE_INPUT_CODE')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_PROGRAMMING);
				this.appendValueInput('CONTENT').appendField(Facilino.locales.getKey('LANG_CONTROLS_EXECUTE')).setCheck(String);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_EXECUTE_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="CONTENT"><shadow type="text"><field name="TEXT"></field></shadow></value>';
				return xml;
			}
		};
		}
	}
	}
	
	var FacilinoProgramming = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoProgramming;
	} else {
		window.FacilinoProgramming = FacilinoProgramming;
	}
}));
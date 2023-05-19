(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {

		Blockly.Arduino.text = function() {
			// Text value.
			var code = Blockly.Arduino.quote_(this.getFieldValue('TEXT'));
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.text = {
			// Text value.
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text'),
			examples: ['controls_setupLoop_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_TEXT_NAME','LANG_TEXT_TEXT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_TEXT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendDummyInput()
					.appendField('"')
					.appendField(new Blockly.FieldTextInput(''), 'TEXT')
					.appendField('"');
				this.setOutput(true,String);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_TEXT_TOOLTIP'));
			}
		};

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.character = function() {
			// Text value.
			var code = '\''+this.getFieldValue('TEXT')+'\'';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.character = {
			// Text value.
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('character'),
			examples: ['ontrols_switch_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_CHAR_NAME','LANG_TEXT_CHAR_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_CHAR_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendDummyInput()
					.appendField('\'')
					.appendField(new Blockly.FieldTextInput('',function(t){if (t.length===1) return t; else return null;}), 'TEXT')
					.appendField('\'');
				this.setOutput(true,[Number,String]);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_CHAR_TOOLTIP'));
			}
		};
		// Source: src/blocks/text_append/text_append.js

		Blockly.Arduino.text_append = function() {
			// Append to a variable in place.
			var varName = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_NONE) || '';
			var argument0 = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
			var code = '';
			code += varName + ' += String(' + argument0 + ');\n';
			return code;
		};
		Blockly.Blocks.text_append = {
			// Append to a variable in place.
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_append'),
			examples: ['text_append_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_APPEND_TO_NAME','LANG_TEXT_APPEND_TO','LANG_TEXT_APPEND_APPENDTEXT','LANG_TEXT_APPEND_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_APPEND_TO_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('TEXT').appendField(Facilino.locales.getKey('LANG_TEXT_APPEND_APPENDTEXT')).setCheck([String,'Variable']);
				this.appendValueInput('VAR').appendField(Facilino.locales.getKey('LANG_TEXT_APPEND_TO')).setCheck('Variable');

				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(true);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_APPEND_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="TEXT"><shadow type="text"><field name="TEXT"></field></shadow></value><value name="VAR"><shadow type="variables_get"></shadow></value>';
			},
			getVars: function() {
				return [this.getFieldValue('VAR')];
			},
			renameVar: function(oldName, newName) {
				if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
					this.setTitleValue(newName, 'VAR');
				}
			},
			getVariables: function() {
				var variables = Blockly.Variables.allUsedVariables;
				var dropdown = [];
				if (variables.length > 0) {
					for (var i in variables) {
						dropdown.push([variables[i], variables[i]]);
					}
				} else {
					dropdown.push(['', '']);
				}
				return dropdown;
			}
		};
		
		}
		// Source: src/blocks/text_equalsIgnoreCase/text_equalsIgnoreCase.js

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.text_charAt = function() {
			var string = Blockly.Arduino.valueToCode(this, 'STRING', Blockly.Arduino.ORDER_NONE);
			var input = this.getInputTargetBlock('STRING');
			var code='';
			if (input!==null)
			{
				var pos = Blockly.Arduino.valueToCode(this, 'POS', Blockly.Arduino.ORDER_NONE);
				code = string+'['+pos+']';
			}
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.text_charAt = {
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_charAt'),
			examples: ['text_equalsIgnoreCase_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_CHARAT_NAME','LANG_TEXT_CHARAT','LANG_TEXT_CHARAT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_CHARAT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('STRING').setCheck(['Variable']);
				this.appendValueInput('POS').appendField(Facilino.locales.getKey('LANG_TEXT_CHARAT')).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.setInputsInline(true);

				this.setOutput(true,[Number,String]);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_CHARAT_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="STRING"><shadow type="variables_get"></shadow></value><value name="POS"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.text_equalsIgnoreCase = function() {
			var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
			string1 = string1.replace(/&quot;/g, '"');
			var string2 = Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_NONE);
			string2 = string2.replace(/&quot;/g, '"');
			var code = '';
			code += JST['text_equalsIgnoreCase']({'string1': string1,'string2': string2});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.text_equalsIgnoreCase = {
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_equalsIgnoreCase'),
			examples: ['text_equalsIgnoreCase_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_EQUALSIGNORECASE_NAME','LANG_TEXT_EQUALSIGNORECASE_EQUAL','LANG_TEXT_EQUALSIGNORECASE_QUESTION','LANG_TEXT_EQUALSIGNORECASE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('STRING1').setCheck('Variable');
				this.appendValueInput('STRING2').appendField(Facilino.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_EQUAL')).setAlign(Blockly.ALIGN_RIGHT).setCheck([String,'Variable']);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_QUESTION'));

				this.setInputsInline(true);

				this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_EQUALSIGNORECASE_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="STRING1"><shadow type="variables_get"></shadow></value><value name="STRING2"><shadow type="text"><field name="TEXT"></field></shadow></value>','<value name="STRING1"><shadow type="variables_get"></shadow></value><value name="STRING2"><shadow type="variables_get"></shadow></value>'];
			}
		};
		}
		// Source: src/blocks/text_join/text_join.js

		Blockly.Arduino.text_join = function() {
			// Create a string made up of any number of elements of any type.
			var code = '';
			var a;
			//console.log('this.itemCount_', this.itemCount_);
			if (this.itemCount_ === 0) {
				return ['\'\'', Blockly.Arduino.ORDER_ATOMIC];
			} else if (this.itemCount_ === 1) {
				var argument0 = Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
				code += 'String(' + argument0 + ')';
				return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
			} else {
				var i = (Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_NONE) || '');
				var final_line = 'String(' + i;
				for (var n = 1; n < this.itemCount_; n++) {
					i = (Blockly.Arduino.valueToCode(this, 'ADD' + n, Blockly.Arduino.ORDER_NONE) || '');
					final_line += ') + String(' + i;
				}


				code += final_line + ')';

				return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
			}
		};

		Blockly.Blocks.text_join = {
			// Create a string made up of any number of elements of any type.
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			helpUrl: Facilino.getHelpUrl('text_join'),
			examples: ['text_join_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_JOIN_NAME','LANG_TEXT_JOIN_Field_CREATEWITH','LANG_TEXT_JOIN_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_JOIN_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('ADD0').setCheck([Number,String,'Variable']).appendField(Facilino.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
				this.appendValueInput('ADD1').setCheck([Number,String,'Variable']);
				this.setOutput(true,String);
				this.setMutator(new Blockly.Mutator(['text_create_join_item']));
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_JOIN_TOOLTIP'));
				this.itemCount_ = 2;
			},
			default_inputs: function()
			{
				return ['<value name="ADD0"><shadow type="text"><field name="TEXT"></field></shadow></value><value name="ADD1"><shadow type="text"><field name="TEXT"></field></shadow></value>'];
			},
			mutationToDom: function() {
				var container = document.createElement('mutation');
				container.setAttribute('items', this.itemCount_);
				return container;
			},
			domToMutation: function(xmlElement) {
				for (var x = 2; x < this.itemCount_; x++) {
					this.removeInput('ADD' + x);
				}
				this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
				for (x = 2; x < this.itemCount_; x++) {
					var input = this.appendValueInput('ADD' + x).setCheck([Number,String,'Variable']);
					/*if (x === 0) {
						input.appendField(Facilino.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
					}*/
				}
				/*if (this.itemCount_ === 0) {
					this.appendDummyInput('EMPTY')
						.appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
							'media/quote0.png', 12, 12))
						.appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
							'media/quote1.png', 12, 12));
				}*/
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('text_create_join_container');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 2; x < this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('text_create_join_item');
					itemBlock.initSvg();
					connection.connect(itemBlock.previousConnection);
					connection = itemBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all input blocks and remove all inputs.
				//if (this.itemCount_ === 0) {
				//	this.removeInput('EMPTY');
				//} else {
					for (var x = this.itemCount_ - 1; x >= 2; x--) {
						this.removeInput('ADD' + x);
					}
				//}
				this.itemCount_ = 2;
				// Rebuild the block's inputs.
				var itemBlock = containerBlock.getInputTargetBlock('STACK');
				while (itemBlock) {
					var input = this.appendValueInput('ADD' + this.itemCount_).setCheck([Number,String,'Variable']);
					//if (this.itemCount_ === 0) {
					//	input.appendField(Facilino.locales.getKey('LANG_TEXT_JOIN_Field_CREATEWITH'));
					//}
					// Reconnect any child blocks.
					if (itemBlock.valueConnection_) {
						input.connection.connect(itemBlock.valueConnection_);
					}
					this.itemCount_++;
					itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
				}
				//if (this.itemCount_ === 0) {
				//	this.appendDummyInput('EMPTY')
				//		.appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
				//			'media/quote0.png', 12, 12))
				//		.appendField(new Blockly.FieldImage(Blockly.pathToBlockly +
				//			'media/quote1.png', 12, 12));
				//}
			},
			saveConnections: function(containerBlock) {
				// Store a pointer to any connected child blocks.
				var itemBlock = containerBlock.getInputTargetBlock('STACK');
				var x = 2;
				while (itemBlock) {
					var input = this.getInput('ADD' + x);
					itemBlock.valueConnection_ = input && input.connection.targetConnection;
					x++;
					itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
				}
			}
		};

		Blockly.Blocks.text_create_join_container = {
			// Container.
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_CREATE_JOIN_TITLE_JOIN','LANG_TEXT_CREATE_JOIN_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_TEXT_CREATE_JOIN_TITLE_JOIN'));
				this.appendStatementInput('STACK').setCheck('text_join');
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_CREATE_JOIN_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.text_create_join_item = {
			// Add items.
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM','LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM'));
				this.setPreviousStatement(true,'text_join');
				this.setNextStatement(true,'text_join');
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP'));
				this.contextMenu = false;
			}
		};


		if (window.FacilinoAdvanced===true)
		{

		Blockly.Arduino.text_length = function() {
			// String length.
			var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
			var code = '';
			var input = this.getInputTargetBlock('VALUE');
			if (input!==null)
			{
				if (input.type==='text')
				{
					code+='String('+argument0+')';
				}
				else if (input.type==='variables_get')
				{
					if (Facilino.variables[input.getFieldValue('VAR')][0]==='String')
						code += JST['text_length']({'argument0': argument0});
					else
						code+='String('+argument0+')';
				}
			}

			return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
		};

		Blockly.Blocks.text_length = {
			// String length.
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_length'),
			examples: ['text_length_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_LENGTH_NAME','LANG_TEXT_LENGTH_INPUT_LENGTH','LANG_TEXT_LENGTH_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_LENGTH_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('VALUE').setCheck(['Variable',String]).appendField(Facilino.locales.getKey('LANG_TEXT_LENGTH_INPUT_LENGTH'));
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_LENGTH_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value>';
			}
		};
		// Source: src/blocks/text_substring/text_substring.js
		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.serial_special = function() {
			var code = '';
			code += JST['serial_special']({'char': '\''+this.getFieldValue('CHAR')+'\''});
			return [code, Blockly.Arduino.ORDER_NONE];
		}
		
		Blockly.Blocks.serial_special = {
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('serial_special'),
			tags: ['serial'],
			examples: ['serial_special_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_ADVANCED_SERIAL_SPECIAL_NAME','LANG_ADVANCED_SERIAL_SPECIAL','LANG_ADVANCED_SERIAL_SPECIAL_TAB','LANG_ADVANCED_SERIAL_SPECIAL_CARRIAGE_RETURN','LANG_ADVANCED_SERIAL_SPECIAL_LINE_FEED','LANG_ADVANCED_SERIAL_SPECIAL_QUOTE','LANG_ADVANCED_SERIAL_SPECIAL_DOUBLE_QUOTE','LANG_ADVANCED_SERIAL_SPECIAL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL'))
					.appendField(new Blockly.FieldDropdown([
						[Facilino.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_TAB') || 'TAB', '\\t'],
						[Facilino.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_CARRIAGE_RETURN') || 'CARRIAGE RETURN', '\\r'],
						[Facilino.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_LINE_FEED') || 'LINE FEED', '\\n'],
						[Facilino.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_QUOTE') || 'QUOTE', "\\'"],
						[Facilino.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_DOUBLE_QUOTE') || 'DOUBLE_QUOTE', '\\"']
					]), 'CHAR');
				this.setOutput(true,String);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_SPECIAL_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<field name="CHAR">\\t</field>','<field name="CHAR">\\r</field>','<field name="CHAR">\\n</field>','<field name="CHAR">\\\'</field>','<field name="CHAR">\\"</field>'];
			}
		};
		}

		Blockly.Arduino.text_lower = function() {
			// String length.
			var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
			var code = '';

			code += JST['text_lower']({'argument0': argument0});

			return code;
		};

		Blockly.Blocks.text_lower = {
			// String length.
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_lower'),
			examples: ['text_length_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_LENGTH_LOWER_NAME','LANG_TEXT_LENGTH_INPUT_LOWER','LANG_TEXT_SET','LANG_TEXT_LENGTH_LOWER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_LENGTH_LOWER_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('VALUE').setCheck('Variable').appendField(Facilino.locales.getKey('LANG_TEXT_SET'));
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TEXT_LENGTH_INPUT_LOWER'));
				//this.setOutput(true,String);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_LENGTH_LOWER_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="VALUE"><shadow type="variables_get"></shadow></value>';
			}
		};

		Blockly.Arduino.text_upper = function() {
			// String length.
			var argument0 = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '';
			var code = '';

			code += JST['text_upper']({'argument0': argument0});

			return code;
		};

		Blockly.Blocks.text_upper = {
			// String length.
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_upper'),
			examples: ['text_length_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_LENGTH_UPPER_NAME','LANG_TEXT_LENGTH_INPUT_UPPER','LANG_TEXT_SET','LANG_TEXT_LENGTH_UPPER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_LENGTH_UPPER_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('VALUE').setCheck('Variable').appendField(Facilino.locales.getKey('LANG_TEXT_SET'));
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TEXT_LENGTH_INPUT_UPPER'));
				//this.setOutput(true,String);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_LENGTH_UPPER_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="VALUE"><shadow type="variables_get"></shadow></value>';
			}
		};

		Blockly.Arduino.text_substring = function() {
			var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
			var from = Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_NONE);
			var to = Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_NONE);
			var code = '';
			code += JST['text_substring']({'string1': string1,'from': from,'to': to});

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.text_substring = {
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_substring'),
			examples: ['text_substring_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_SUBSTRING_NAME','LANG_TEXT_SUBSTRING','LANG_TEXT_SUBSTRING_FROM','LANG_TEXT_SUBSTRING_TO','LANG_TEXT_SUBSTRING_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_SUBSTRING_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('STRING1').setCheck('Variable').appendField(Facilino.locales.getKey('LANG_TEXT_SUBSTRING'));

				this.appendValueInput('FROM').appendField(Facilino.locales.getKey('LANG_TEXT_SUBSTRING_FROM'))
					.setCheck([Number,'Variable'])
					.setAlign(Blockly.ALIGN_RIGHT);

				this.appendValueInput('TO')
					.appendField(Facilino.locales.getKey('LANG_TEXT_SUBSTRING_TO'))
					.setCheck([Number,'Variable'])
					.setAlign(Blockly.ALIGN_RIGHT);
				// this.appendDummyInput()
				//	 .appendField(Facilino.locales.getKey('LANG_TEXT_SUBSTRING_QUESTION'));

				this.setInputsInline(true);

				this.setOutput(true,String);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_SUBSTRING_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="STRING1"><shadow type="variables_get"></shadow></value><value name="FROM"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="TO"><shadow type="math_number"><field name="NUM">10</field></shadow></value>';
			}
		};

			Blockly.Arduino.text_search = function() {
			var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
			var string2 = Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_NONE);
			var position = this.getFieldValue('POSITION');
			var code = '';

			if (position==='FIRST')
			{
				code = string2+'.indexOf('+string1+')';
			}
			else
			{
				code = string2+'.lastIndexOf('+string1+')';
			}

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.text_search = {
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_search'),
			examples: ['text_search_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_SEARCH','LANG_TEXT_IN','LANG_TEXT_FIRST','LANG_TEXT_LAST','LANG_TEXT_SEARCH_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_SEARCH_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('STRING1').setCheck([String,'Variable']).appendField(Facilino.locales.getKey('LANG_TEXT_SEARCH'));
				this.appendValueInput('STRING2').setCheck('Variable').appendField(Facilino.locales.getKey('LANG_TEXT_IN'));
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_TEXT_FIRST'),'FIRST'],[Facilino.locales.getKey('LANG_TEXT_LAST'),'LAST']]),'POSITION');
				this.setInputsInline(true);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_SEARCH_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="STRING1"><shadow type="text"><field name="TEXT"></field></shadow></value><value name="STRING2"><shadow type="variables_get"></shadow></value><field name="POSITION">FIRST</field>','<value name="STRING1"><shadow type="text"><field name="TEXT"></field></shadow></value><value name="STRING2"><shadow type="variables_get"></shadow></value><field name="POSITION">LAST</field>'];
			}
		};

		Blockly.Arduino.text_contains = function() {
			var string1 = Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_NONE);
			var string2 = Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_NONE);
			var code = '';
			code = '('+string2+'.indexOf('+string1+')>=0)';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.text_contains = {
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_contains'),
			examples: ['text_contains_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_CONTAINS_NAME','LANG_TEXT_CONTAINS','LANG_TEXT_EXPRESSION','LANG_TEXT_CONTAINS_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_CONTAINS_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TEXT_CONTAINS'));
				this.appendValueInput('STRING2').setCheck('Variable');
				this.appendValueInput('STRING1').setCheck([String,'Variable']).appendField(Facilino.locales.getKey('LANG_TEXT_EXPRESSION'));
				this.appendDummyInput('').appendField('?');
				this.setInputsInline(true);
				this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_CONTAINS_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="STRING2"><shadow type="variables_get"></shadow></value><value name="STRING1"><shadow type="text"><field name="TEXT"></field></shadow></value>';
			}
		};

	Blockly.Arduino.text_to_text = function() {
			var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE);
		var dropdown_cast = this.getFieldValue('CAST') || '';
			var code = '';
			if (dropdown_cast=='char')
				code +='('+dropdown_cast+')('+value+')';
			else
			  code +='String('+value+')';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.text_to_text = {
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_to_text'),
			examples: ['text_to_text_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_CAST_NAME','LANG_TEXT_CAST','LANG_VARIABLES_TYPE_STRING','LANG_VARIABLES_TYPE_CHAR','LANG_TEXT_CAST_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_CAST_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('VALUE')
					.appendField(Facilino.locales.getKey('LANG_TEXT_CAST')).appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_CHAR'),'char']
				]), "CAST").setCheck([Number,'Variable']);
				//this.setInputsInline(true);
				this.setOutput(true,String);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_CAST_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value><field name="CAST">String</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">30</field></shadow></value><field name="CAST">char</field>'];
			}
		};
		
		/*Blockly.Arduino.fill_with = function() {
			var code ='';
			return code;
		};

		Blockly.Blocks.fill_with= {
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_fill_with'),
			examples: ['text_to_csv_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_FILL_WITH_NAME','LANG_TEXT_FILL','LANG_TEXT_FILL_CHAR','LANG_TEXT_FILL_SPACES','LANG_TEXT_FILL_ZEROS','LANG_TEXT_FILL_WIDTH','LANG_TEXT_FILL_LEADING','LANG_TEXT_FILL_TRAILING','LANG_TEXT_FILL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_FILL_WITH_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('VALUE').setCheck([String,'Variable']).appendField(Facilino.locales.getKey('LANG_TEXT_FILL')).appendField(new Blockly.FieldNumber(10,1,20,1),'WIDTH');
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TEXT_FILL_CHAR')).appendField(new Blockly.DropdownField([
					[Facilino.locales.getKey('LANG_TEXT_FILL_SPACES'), "' '"],[Facilino.locales.getKey('LANG_TEXT_FILL_ZEROS'),"'0'"]]),"CHAR").appendField(new Blockly.DropdownField([[Facilino.locales.getKey('LANG_TEXT_FILL_LEADING'), 'true'],[Facilino.locales.getKey('LANG_TEXT_FILL_TRAILING'),'false']]),"POSITION");
				this.setOutput(true,String);
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_FILL_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="VALUE"><shadow type="text"></shadow></value>';
			}
		};*/

		Blockly.Arduino.text_to_csv = function() {
			var value = Blockly.Arduino.valueToCode(this,'VALUE', Blockly.Arduino.ORDER_NONE);
			var array_input = this.getInputTargetBlock('VALUE');
			var l=this.getFieldValue('LENGTH');
			var d=this.getFieldValue('DECIMAL');
			var code ='';
			if (array_input!==null)
			{
				if (array_input.type.includes('math_1DArray_constructor'))
				{
					Blockly.Arduino.definitions_['define_toCSV'+array_input.itemCount_]='String toCSV'+array_input.itemCount_+'(';
					var i=0;
					for (i=0;i<array_input.itemCount_;i++)
					{
						Blockly.Arduino.definitions_['define_toCSV'+array_input.itemCount_]+='float data'+i+',';
					}

					Blockly.Arduino.definitions_['define_toCSV'+array_input.itemCount_]+='int l,int d){\n';
					i=0;
					Blockly.Arduino.definitions_['define_toCSV'+array_input.itemCount_]+='  char c[l+1];\n  String s="";\n  dtostrf(data'+i+',l,d,c);\n  s=String(c);\n';
					for (i=1;i<array_input.itemCount_;i++)
					{
					Blockly.Arduino.definitions_['define_toCSV'+array_input.itemCount_]+='  dtostrf(data'+i+',l,d,c);\n  s+=","+String(c);\n';
					}
					Blockly.Arduino.definitions_['define_toCSV'+array_input.itemCount_]+='  s.replace(" ","");\n  return s;\n}\n';
					code = 'toCSV('+value.substring(1,value.length-1)+','+l+','+d+')';
				}
				else if (array_input.type==='variables_get')
				{
					Blockly.Arduino.definitions_['define_toCSV']='String toCSV(float* data,int data_length,int l,int d){\n  char c[l+1];\n  String s="";\n  dtostrf(data[0],l,d,c);\n  s=String(c);\n  for(int i=1;i<data_length;i++){\n	dtostrf(data[i],l,d,c);\n	s+=","+String(c);\n  }\n  s.replace(" ","");\n  return s;\n}\n';
					code = 'toCSV('+value+','+Facilino.variables[value][3]+','+l+','+d+')';
				}
			}

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.text_to_csv = {
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_to_csv'),
			examples: ['text_to_csv_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_CSV_NAME','LANG_TEXT_FORMAT','LANG_TEXT_CSV','LANG_TEXT_CSV_LENGTH','LANG_TEXT_CSV_DECIMAL','LANG_TEXT_CSV_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TEXT_CSV_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('VALUE').setCheck(['Array','Variable']).appendField(Facilino.locales.getKey('LANG_TEXT_CSV')).appendField(Facilino.locales.getKey('LANG_TEXT_FORMAT')).appendField(new Blockly.FieldNumber(8,1,20,1),'LENGTH').appendField('.').appendField(new Blockly.FieldNumber(2,1,10,1),'DECIMAL');
				this.setOutput(true,String);
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_CSV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="VALUE"><shadow type="math_1DArray_constructor2"></shadow></value>';
			}
		};
		}

		Blockly.Arduino.text_to_number = function() {
			var str = Blockly.Arduino.valueToCode(this, 'STRING', Blockly.Arduino.ORDER_NONE);
			var dropdown_cast = this.getFieldValue('CAST') || '';
			var code = str+'.'+dropdown_cast;
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.text_to_number = {
			category: Facilino.locales.getKey('LANG_CATEGORY_TEXT'),
			tags: ['text'],
			helpUrl: Facilino.getHelpUrl('text_to_number'),
			examples: ['text_to_text_example.bly'],
			category_colour: Facilino.LANG_COLOUR_TEXT,
			colour: Facilino.LANG_COLOUR_TEXT,
			keys: ['LANG_TEXT_NUMBER_CAST_NAME','LANG_TEXT_NUMBER_CAST','LANG_VARIABLES_TYPE_STRING','LANG_VARIABLES_TYPE_CHAR'],
			name: Facilino.locales.getKey('LANG_TEXT_NUMBER_CAST_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_TEXT);
				this.appendValueInput('STRING')
					.appendField(Facilino.locales.getKey('LANG_TEXT_NUMBER_CAST')).appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'toInt()'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'),'toFloat()']
				]), "CAST").setCheck('Variable');
				//this.setInputsInline(true);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_TEXT_NUMBER_CAST_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="STRING"><shadow type="variables_get"></shadow></value><field name="CAST">toInt()</field>','<value name="STRING"><shadow type="variables_get"></shadow></value><field name="CAST">toFloat()</field>'];
			}
		};
	}
	
	var FacilinoText = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoText;
	} else {
		window.FacilinoText = FacilinoText;
	}
}));
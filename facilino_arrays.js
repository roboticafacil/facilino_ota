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
		Blockly.Arduino.math_1DArray_get = function() {
			// Array constructor.
			var input = Blockly.Arduino.valueToCode(this, 'INPUT', Blockly.Arduino.ORDER_NONE);
			var code = '';
			if (input!==null)
			{
				code=input+'['+this.getFieldValue('INDEX')+']';
			}
			return [code,Blockly.Arduino.ORDER_NONE];
			};


		Blockly.Blocks.math_1DArray_get = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('math_1DArray_get'),
			tags: ['variables'],
			examples: ['variables_global_volatile_type_example'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_ARRAY_GET_NAME','LANG_MATH_ARRAY_GET_DESCRIPTION','LANG_MATH_ARRAY_GET_INPUT_ARRAY','LANG_MATH_ARRAY_GET_FIELD_INDEX','LANG_MATH_ARRAY_GET_OUTPUT','LANG_MATH_ARRAY_GET','LANG_MATH_ARRAY_GET_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_ARRAY_GET_NAME'),
			description: Facilino.locales.getKey('LANG_MATH_ARRAY_GET_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_MATH_ARRAY_GET_INPUT_ARRAY')],
			fields: [Facilino.locales.getKey('LANG_MATH_ARRAY_GET_FIELD_INDEX')],
			output: Facilino.locales.getKey('LANG_MATH_ARRAY_GET_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('INPUT').appendField(Facilino.locales.getKey('LANG_MATH_ARRAY_GET')).setAlign(Blockly.ALIGN_RIGHT).setCheck(['Variable','Array']);
				this.appendDummyInput('').appendField('[').appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'INDEX').appendField(']').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(true);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_ARRAY_GET_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml='<value name="INPUT"><shadow type="variables_get"></shadow></value>';
				return xml;
			}
		};

		Blockly.Arduino.math_1DArray_set = function() {
			// Array constructor.
			var input = Blockly.Arduino.valueToCode(this, 'INPUT', Blockly.Arduino.ORDER_NONE);
			var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE);
			var code = '';
			if (input!==null)
			{
				code=input+'['+this.getFieldValue('INDEX')+']='+value+';\n';
			}
			return code;
			};


		Blockly.Blocks.math_1DArray_set = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('math_1DArray_set'),
			tags: ['variables'],
			examples: ['variables_global_volatile_type_example'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_ARRAY_SET_NAME','LANG_MATH_ARRAY_SET_DESCRIPTION','LANG_MATH_ARRAY_SET_INPUT_ARRAY','LANG_MATH_ARRAY_SET_INPUT_NUMBER','LANG_MATH_ARRAY_SET_FIELD_INDEX','LANG_MATH_ARRAY_SET','LANG_MATH_ARRAY_SET_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_ARRAY_SET_NAME'),
			description: Facilino.locales.getKey('LANG_MATH_ARRAY_SET_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_MATH_ARRAY_SET_INPUT_ARRAY'),Facilino.locales.getKey('LANG_MATH_ARRAY_SET_INPUT_NUMBER')],
			fields: [Facilino.locales.getKey('LANG_MATH_ARRAY_SET_FIELD_INDEX')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('INPUT').appendField(Facilino.locales.getKey('LANG_MATH_ARRAY_SET')).setAlign(Blockly.ALIGN_RIGHT).setCheck(['Variable','Array']);
				this.appendValueInput('VALUE').appendField('[').appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'INDEX').appendField(']').appendField('=').setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,Number,'Variable']);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_ARRAY_SET_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml='<value name="INPUT"><shadow type="variables_get"></shadow></value>';
				xml+='<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				return xml;
			}
		};

			Blockly.Arduino.math_1DArray_constructor2 = function() {
			// Array constructor.
			var code='{';
			code+=this.getFieldValue('NUM0')+','+this.getFieldValue('NUM1');
			code+='}';
			return [code,Blockly.Arduino.ORDER_NONE];
			};


		Blockly.Blocks.math_1DArray_constructor2 = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('math_1DArray_constructor2'),
			tags: ['variables'],
			examples: ['variables_global_volatile_type_example'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_VARIABLES_ARRAY2_NAME','LANG_VARIABLES_ARRAY2_DESCRIPTION','LANG_VARIABLES_ARRAY2_INPUT1','LANG_VARIABLES_ARRAY2_INPUT2','LANG_VARIABLES_ARRAY2_OUTPUT','LANG_VARIABLES_ARRAY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_ARRAY2_NAME'),
			description: Facilino.locales.getKey('LANG_VARIABLES_ARRAY2_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_VARIABLES_ARRAY2_INPUT1'),Facilino.locales.getKey('LANG_VARIABLES_ARRAY2_INPUT2')],
			output: Facilino.locales.getKey('LANG_VARIABLES_ARRAY2_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendDummyInput('ITEMS').appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM0').appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM1');
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,'Array');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_TOOLTIP'));
				this.itemCount_ = 2;
			}
		};

		Blockly.Arduino.math_1DArray_constructor3 = function() {
			// Array constructor.
			var code='{';
			code+=this.getFieldValue('NUM0')+','+this.getFieldValue('NUM1')+','+this.getFieldValue('NUM2');
			code+='}';
			return [code,Blockly.Arduino.ORDER_NONE];
			};


		Blockly.Blocks.math_1DArray_constructor3 = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('math_1DArray_constructor3'),
			tags: ['variables'],
			examples: ['variables_global_volatile_type_example'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_VARIABLES_ARRAY3_NAME','LANG_VARIABLES_ARRAY3_DESCRIPTION','LANG_VARIABLES_ARRAY3_INPUT1','LANG_VARIABLES_ARRAY3_INPUT2','LANG_VARIABLES_ARRAY3_INPUT3','LANG_VARIABLES_ARRAY3_OUTPUT','LANG_VARIABLES_ARRAY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_ARRAY3_NAME'),
			description: Facilino.locales.getKey('LANG_VARIABLES_ARRAY3_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_VARIABLES_ARRAY3_INPUT1'),Facilino.locales.getKey('LANG_VARIABLES_ARRAY3_INPUT2'),Facilino.locales.getKey('LANG_VARIABLES_ARRAY3_INPUT3')],
			output: Facilino.locales.getKey('LANG_VARIABLES_ARRAY3_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendDummyInput('ITEMS').appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM0').appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM1').appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM2');
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,'Array');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_TOOLTIP'));
				this.itemCount_ = 3;
			}
		};

		Blockly.Arduino.math_1DArray_constructor4 = function() {
			// Array constructor.
			var code='{';
			code+=this.getFieldValue('NUM0')+','+this.getFieldValue('NUM1')+','+this.getFieldValue('NUM2')+','+this.getFieldValue('NUM3');
			code+='}';
			return [code,Blockly.Arduino.ORDER_NONE];
			};

		Blockly.Blocks.math_1DArray_constructor4 = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('math_1DArray_constructor4'),
			tags: ['variables'],
			examples: ['variables_global_volatile_type_example'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_VARIABLES_ARRAY4_NAME','LANG_VARIABLES_ARRAY4_DESCRIPTION','LANG_VARIABLES_ARRAY4_INPUT1','LANG_VARIABLES_ARRAY4_INPUT2','LANG_VARIABLES_ARRAY4_INPUT3','LANG_VARIABLES_ARRAY4_INPUT4','LANG_VARIABLES_ARRAY4_OUTPUT','LANG_VARIABLES_ARRAY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_ARRAY4_NAME'),
			description: Facilino.locales.getKey('LANG_VARIABLES_ARRAY4_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_VARIABLES_ARRAY4_INPUT1'),Facilino.locales.getKey('LANG_VARIABLES_ARRAY4_INPUT2'),Facilino.locales.getKey('LANG_VARIABLES_ARRAY4_INPUT3'),Facilino.locales.getKey('LANG_VARIABLES_ARRAY4_INPUT4')],
			output: Facilino.locales.getKey('LANG_VARIABLES_ARRAY4_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendDummyInput('ITEMS').appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM0').appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM1').appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM2').appendField(new Blockly.FieldTextInput('0', Blockly.Blocks.math_number.validator), 'NUM3');
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,'Array');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_TOOLTIP'));
				this.itemCount_ = 4;
			}
		};

		Blockly.Arduino.math_1DArray_constructor = function() {
			// Array constructor.
			var code='{';
			if (this.itemCount_>0)
			{
				item = Blockly.Arduino.valueToCode(this, 'ITEM0', Blockly.Arduino.ORDER_NONE);
				code+=item;
				for (var n = 1; n < this.itemCount_; n++) {
					item = Blockly.Arduino.valueToCode(this, 'ITEM'+n, Blockly.Arduino.ORDER_NONE);
					code+=','+item;
				}
			}
			code+='}';
			return [code,Blockly.Arduino.ORDER_NONE];
		};


		Blockly.Blocks.math_1DArray_constructor = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('math_1DArray_constructor'),
			tags: ['variables'],
			examples: ['variables_global_volatile_type_example'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_VARIABLES_ARRAY_NAME','LANG_VARIABLES_ARRAY_DESCRIPTION','LANG_VARIABLES_ARRAY_MUTATOR_DESC','LANG_VARIABLES_ARRAY_INPUT_ELEMENT','LANG_VARIABLES_ARRAY_OUTPUT','LANG_VARIABLES_ARRAY','LANG_VARIABLES_ARRAY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_NAME'),
			description: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DESCRIPTION'),
			mutator_desc: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_MUTATOR_DESC'),
			mutator_container: 'math_1DArray_constructor_constructor',
			mutator_items: ['math_1DArray_constructor_item'],
			inputs: [Facilino.locales.getKey('LANG_VARIABLES_ARRAY_INPUT_ELEMENT')],
			output: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendDummyInput('ITEMS').appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY'));
				this.appendValueInput('ITEM0').setCheck([Number,Boolean,'Variable']);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,'Array');
				this.setMutator(new Blockly.Mutator(['math_1DArray_constructor_item']));
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_TOOLTIP'));
				this.itemCount_ = 1;
			},
			default_inputs: function()
			{
				return ['<value name="ITEM0"><shadow type="math_number"></shadow></value>','<value name="ITEM0"><shadow type="logic_boolean"></shadow></value>','<value name="ITEM0"><shadow type="variables_get"></shadow></value>'];
			},
			mutationToDom: function() {
				if (!this.itemCount_) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.itemCount_) {
					container.setAttribute('item', this.itemCount_);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.itemCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
				for (var x = 1; x < this.itemCount_; x++) {
					this.appendValueInput('ITEM'+x).setCheck([Number,Boolean,'Variable']);
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('math_1DArray_constructor_constructor');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				var itemBlock = workspace.newBlock('math_1DArray_constructor_item');
				itemBlock.initSvg();
				connection.connect(itemBlock.previousConnection);
				connection = itemBlock.nextConnection;
				for (var x = 1; x < this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('math_1DArray_constructor_item');
					itemBlock.initSvg();
					connection.connect(itemBlock.previousConnection);
					connection = itemBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the task input blocks and remove the inputs.
				for (var x = this.itemCount_; x >= 1; x--) {
					this.removeInput('ITEM' + x);
				}
				this.itemCount_ = 1;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				if (clauseBlock)
				{
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
					while (clauseBlock) {
						switch (clauseBlock.type) {
							case 'math_1DArray_constructor_item':
								var itemInput = this.appendValueInput('ITEM' + this.itemCount_).setCheck([Number,Boolean,'Variable']);
								this.itemCount_++;
								// Reconnect any child blocks.
								if (clauseBlock.valueConnection_) {
									itemInput.connection.connect(clauseBlock.valueConnection_);
								}
								break;
							default:
								throw 'Unknown block type.';
						}
						clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
					}
				}
				//this.getInput('ITEMS').removeField('SEP'+(this.itemCount_-1));
				//this.getInput('ITEMS').appendField('}','SEP'+(this.itemCount_-1));
			},
			saveConnections: function(containerBlock) {
				// Store a pointer to any connected child blocks.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				var x = 0;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'math_1DArray_constructor_item':
							var itemInput = this.getInput('ITEM' + x);
							clauseBlock.valueConnection_ = itemInput && itemInput.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			}
		};

		 Blockly.Blocks.math_1DArray_constructor_constructor = {
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_VARIABLES_ARRAY','LANG_VARIABLES_ARRAY_TOOLTIP'],
			// Task.
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('array_item');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_TOOLTIP'));
				this.contextMenu = false;
			},
			onchange: function()
			{
				var clauseBlock = this.getInputTargetBlock('STACK');
				if (clauseBlock===null)
				{
					var blocks=this.workspace.getAllBlocks();
					if (blocks[0].type==='math_1DArray_constructor_constructor')
						blocks[0].getInput('STACK').connection.connect(blocks[1].previousConnection);
				}
			}
		};

		Blockly.Blocks.math_1DArray_constructor_item = {
			colour: Facilino.LANG_COLOUR_MATH,
			// Task item.
			keys: ['LANG_VARIABLES_ARRAY_ITEM'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ITEM')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'array_item');
				this.setNextStatement(true,'array_item');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ITEM'));
				this.contextMenu = false;
			}
		};


		Blockly.Arduino.math_1DArray_decode = function() {
			var x = Blockly.Arduino.valueToCode(this, 'ARRAY', Blockly.Arduino.ORDER_NONE);
			var code='';
			code+='{\n';
			code+='byte* pData=(byte*)('+x+');\n';
			var i=0;
			for (i=0;i<this.itemCount_;i++)
			{
				var item = Blockly.Arduino.valueToCode(this, 'ITEM'+i, Blockly.Arduino.ORDER_NONE);
				if (Facilino.variables.length>0)
				{
					var var_type = Facilino.variables[item][0];
					code+=item+'=('+var_type+')(*(('+var_type+'*)pData));\n';
					if (i<(this.itemCount_-1))
						code+='pData+=sizeof('+var_type+');\n';
				}
			}
			code+='}\n';
			return code;
		};


		Blockly.Blocks.math_1DArray_decode = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('math_1DArray_decode'),
			tags: ['variables'],
			examples: ['variables_global_volatile_type_example'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_VARIABLES_ARRAY_DECODE_NAME','LANG_VARIABLES_ARRAY_DECODE_DESCRIPTION','LANG_VARIABLES_ARRAY_DECODE_MUTATOR_DESC','LANG_VARIABLES_ARRAY_DECODE_INPUT_ARRAY','LANG_VARIABLES_ARRAY_DECODE_INPUT_ITEMS','LANG_VARIABLES_ARRAY_DECODE','LANG_VARIABLES_ARRAY_INTO','LANG_VARIABLES_ARRAY_DECODE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DECODE_NAME'),
			description: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DECODE_DESCRIPTION'),
			mutator_desc: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DECODE_MUTATOR_DESC'),
			mutator_container: 'math_1DArray_decode_decode',
			mutator_items: ['math_1DArray_decode_item'],
			inputs: [Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DECODE_INPUT_ARRAY'),Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DECODE_INPUT_ITEMS')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('ARRAY').appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DECODE')).setCheck(['Variable']);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_INTO'));
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setMutator(new Blockly.Mutator(['math_1DArray_decode_item']));
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DECODE_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				var xml='';
				xml='<value name="ARRAY"><shadow type="variables_get"></shadow></value>';
				return xml;
			},
			mutationToDom: function() {
				if (!this.itemCount_) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.itemCount_) {
					container.setAttribute('item', this.itemCount_);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.itemCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
				for (var x = 0; x < this.itemCount_; x++){
					this.appendValueInput('ITEM'+x).setCheck('Variable');
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('math_1DArray_decode_decode');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 0; x < this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('math_1DArray_decode_item');
					itemBlock.initSvg();
					connection.connect(itemBlock.previousConnection);
					connection = itemBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the task input blocks and remove the inputs.
				for (var x = this.itemCount_-1; x >= 0; x--) {
					this.removeInput('ITEM' + x);
				}
				this.itemCount_ = 0;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'math_1DArray_decode_item':
							var itemInput = this.appendValueInput('ITEM'+this.itemCount_).setCheck('Variable');
							this.itemCount_++;
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								itemInput.connection.connect(clauseBlock.valueConnection_);
							}

							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			},
			saveConnections: function(containerBlock) {
				// Store a pointer to any connected child blocks.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				var x = 0;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'math_1DArray_decode_item':
							var itemInput = this.getInput('ITEM' + x);
							clauseBlock.valueConnection_ = itemInput && itemInput.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			}
		};

		 Blockly.Blocks.math_1DArray_decode_decode = {
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_VARIABLES_ARRAY_DECODE','LANG_VARIABLES_ARRAY_DECODE_TOOLTIP'],
			// Task.
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DECODE')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('array_decode_item');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DECODE_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.math_1DArray_decode_item = {
			colour: Facilino.LANG_COLOUR_MATH,
			// Task item.
			keys: ['LANG_VARIABLES_ARRAY_DECODE_ITEM'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DECODE_ITEM')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'array_decode_item');
				this.setNextStatement(true,'array_decode_item');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_DECODE_ITEM'));
				this.contextMenu = false;
			}
		};

		Blockly.Arduino.math_1DArray_encode = function() {
			var x = Blockly.Arduino.valueToCode(this, 'ARRAY', Blockly.Arduino.ORDER_NONE);
			var code='';
			Blockly.Arduino.definitions_['copyBytes']='void copyBytes(byte* dst, byte* src, int len) {\n	src+=(len-1);\n	for (int i = 0; i < len; i++) {\n		*dst++ = *src--;\n	}\n}\n';
			code+='{\n';
			code+='byte* pData=(byte*)('+x+');\n';
			var i=0;
			for (i=0;i<this.itemCount_;i++)
			{
				var item = Blockly.Arduino.valueToCode(this, 'ITEM'+i, Blockly.Arduino.ORDER_NONE);
				if (Facilino.variables[item]!==undefined)
				{
				var var_type = Facilino.variables[item][0];
				code+='copyBytes(pData,(byte*)&'+item+',sizeof('+var_type+'));\n';
				if (i<(this.itemCount_-1))
					code+='pData+=sizeof('+var_type+');\n';
				}
			}
			code+='}\n';
			return code;
		};


		Blockly.Blocks.math_1DArray_encode = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('math_1DArray_encode'),
			tags: ['variables'],
			examples: ['variables_global_volatile_type_example'],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_VARIABLES_ARRAY_ENCODE','LANG_VARIABLES_ARRAY_ENCODE_DESCRIPTION','LANG_VARIABLES_ARRAY_ENCODE_MUTATOR_DESC','LANG_VARIABLES_ARRAY_ENCODE_INPUT_ARRAY','LANG_VARIABLES_ARRAY_ENCODE_INPUT_ITEMS','LANG_VARIABLES_ARRAY_WITH','LANG_VARIABLES_ARRAY_ENCODE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ENCODE_NAME'),
			description: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ENCODE_DESCRIPTION'),
			mutator_desc: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ENCODE_MUTATOR_DESC'),
			mutator_container: 'math_1DArray_encode_encode',
			mutator_items: ['math_1DArray_encode_item'],
			inputs: [Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ENCODE_INPUT_ARRAY'),Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ENCODE_INPUT_ITEMS')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('ARRAY').appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ENCODE')).setCheck(['Variable']);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_WITH'));
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setMutator(new Blockly.Mutator(['math_1DArray_encode_item']));
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ENCODE_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				var xml='';
				xml='<value name="ARRAY"><shadow type="variables_get"></shadow></value>';
				return xml;
			},
			mutationToDom: function() {
				if (!this.itemCount_) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.itemCount_) {
					container.setAttribute('item', this.itemCount_);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.itemCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
				for (var x = 0; x < this.itemCount_; x++){
					//this.appendValueInput('ITEM'+x).setCheck('Variable');
					this.appendValueInput('ITEM'+x).setCheck('Variable');
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('math_1DArray_encode_encode');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 0; x < this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('math_1DArray_encode_item');
					itemBlock.initSvg();
					connection.connect(itemBlock.previousConnection);
					connection = itemBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the task input blocks and remove the inputs.
				for (var x = this.itemCount_-1; x >= 0; x--) {
					this.removeInput('ITEM' + x);
				}
				this.itemCount_ = 0;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'math_1DArray_encode_item':
							//var itemInput = this.appendValueInput('ITEM'+this.itemCount_).setCheck('Variable');
							var itemInput = this.appendValueInput('ITEM'+this.itemCount_);
							this.itemCount_++;
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								itemInput.connection.connect(clauseBlock.valueConnection_);
							}

							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			},
			saveConnections: function(containerBlock) {
				// Store a pointer to any connected child blocks.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				var x = 0;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'math_1DArray_encode_item':
							var itemInput = this.getInput('ITEM' + x);
							clauseBlock.valueConnection_ = itemInput && itemInput.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			}
		};

		 Blockly.Blocks.math_1DArray_encode_encode = {
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_VARIABLES_ARRAY_ENCODE','LANG_VARIABLES_ARRAY_ENCODE_TOOLTIP'],
			// Task.
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ENCODE')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('array_encode_item');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ENCODE_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.math_1DArray_encode_item = {
			colour: Facilino.LANG_COLOUR_MATH,
			// Task item.
			keys: ['LANG_VARIABLES_ARRAY_ENCODE_ITEM'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ENCODE_ITEM')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'array_encode_item');
				this.setNextStatement(true,'array_encode_item');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_ENCODE_ITEM'));
				this.contextMenu = false;
			}
		};
		}
	}
	}
	
	var FacilinoArrays = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoArrays;
	} else {
		window.FacilinoArrays = FacilinoArrays;
	}
}));
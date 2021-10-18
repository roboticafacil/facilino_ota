(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		Facilino.indentSentences = function(sentences) {
			var splitted_sentences = sentences.split('\n');
			var final_sentences = '';
			for (var i in splitted_sentences) {
				final_sentences += '  ' + splitted_sentences[i] + '\n';
			}
			return final_sentences;
		};
		
	Blockly.Arduino.controls_doWhile = function() {
			// Do while/until loop.
			var argument0 = Blockly.Arduino.valueToCode(this, 'WHILE', Blockly.Arduino.ORDER_NONE) || '';
			argument0 = argument0.replace(/&quot;/g, '"');
			var branch = Blockly.Arduino.statementToCode(this, 'DO');
			branch = branch.replace(/&quot;/g, '"');
			var code = '';
			if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
				branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
				// branch = branch.substring(0, branch.length - 2);
			}
			// branch=branch.replace(/&amp;/g, '');
			if (this.getFieldValue('MODE') === 'UNTIL') {
				if (!argument0.match(/^\w+$/)) {
					argument0 = '(' + argument0 + ')';
				}
				argument0 = '!' + argument0;
			}
			code += JST['controls_doWhile']({
				'argument0': argument0,
				'branch': branch
			});
			return code;
		};

		Blockly.Blocks.controls_doWhile = {
			// Do/while loop.
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_doWhile'),
			examples: ['controls_doWhile_example1','controls_doWhile_example2'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_DOWHILE_OPERATOR_DO_NAME','LANG_CONTROLS_DOWHILE_OPERATOR_DO_DESCRIPTION','LANG_CONTROLS_DOWHILE_OPERATOR_DO_STATEMENTS_DO','LANG_CONTROLS_DOWHILE_OPERATOR_DO','LANG_CONTROLS_DOWHILE_OPERATOR_DO_DROPDOWN_MODE','LANG_CONTROLS_DOWHILE_OPERATOR_DO_INPUT_CONDITION','LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE','LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL','LANG_CONTROLS_DOWHILE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO_DESCRIPTION'),
			statements: [Facilino.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO_STATEMENTS_DO')],
			dropdown: [Facilino.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO_DROPDOWN_MODE')],
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO_INPUT_CONDITION')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO')).setCheck('code');
				this.appendValueInput('WHILE').setCheck(Boolean).appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE'), 'WHILE'],
					[Facilino.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL'), 'UNTIL']
				]), 'MODE').setCheck([Boolean,'Variable']);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_DOWHILE_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.controls_doWhile['subcategory'];
		
		if (window.FacilinoAdvanced===true)
		{
		
		Blockly.Arduino.controls_flow_statements = function() {
			// Flow statements: continue, break.
			switch (this.getFieldValue('FLOW')) {
				case 'BREAK':
					return 'break;\n';
				case 'CONTINUE':
					return 'continue;\n';
			}
			throw 'Unknown flow statement.';
		};

		Blockly.Blocks.controls_flow_statements = {
			// Flow statements: continue, break.
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_flow_statements'),
			examples: ['controls_flow_statements_example1','controls_flow_statements_example2'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK_NAME','LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK_DESCRIPTION','LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK_DROPDOWN_ACTION','LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK','LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE','LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP','LANG_CONTROLS_FLOW_STATEMENTS_WARNING','LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK','LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE'],
			name: Facilino.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK_DESCRIPTION'),
			must: ['controls_for','controls_doWhile','controls_whileUntil'],
			dropdown: [Facilino.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK_DROPDOWN_ACTION')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				var dropdown = new Blockly.FieldDropdown(
					[
						[Facilino.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK') || 'BREAK', 'BREAK'],
						[Facilino.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE') || 'CONTINUE', 'CONTINUE']
					]);
				this.appendDummyInput()
					.appendField(dropdown, 'FLOW')
					.appendField(Facilino.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_INPUT_OFLOOP'));
				this.setPreviousStatement(true,'code');
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK')+' '+Facilino.locales.getKey('LANG_LOGIC_OPERATION_OR')+' '+Facilino.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE'));
			},
			onchange: function() {
				if (!this.workspace) {
					// Block has been deleted.
					return;
				}
				var legal = false;
				// Is the block nested in a control statement?
				var block = this;
				do {
					if (block.type === 'controls_repeat' ||
						block.type === 'controls_forEach' ||
						block.type === 'controls_for' ||
						block.type === 'controls_whileUntil') {
						legal = true;
						break;
					}
					block = block.getSurroundParent();
				} while (block);
				if (legal) {
					this.setWarningText(null);
				} else {
					try {
						this.setWarningText(Facilino.locales.getKey('LANG_CONTROLS_FLOW_STATEMENTS_WARNING'));
					} catch (err) {
						console.log('Captured error: ', err);
					}
				}
			}
		};
		}

		Blockly.Arduino.controls_repeat = function() {
			var argument1 = this.getFieldValue('TO')
			var branch = Blockly.Arduino.statementToCode(this, 'DO');
			if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
				branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
			}
			var code = '';
			code += 'for (int _repeat_iter=1; _repeat_iter<='+argument1+';_repeat_iter++) {\n' + branch + '}\n';
			return code;
		};
		Blockly.Blocks.controls_repeat = {
			// For loop.
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_repeat'),
			examples: ['controls_repeat_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_REPEAT_NAME','LANG_CONTROLS_REPEAT_DESCRIPTION','LANG_CONTROLS_REPEAT_STATEMENTS_DO','LANG_CONTROLS_REPEAT_FIELDS_REPETITIONS','LANG_CONTROLS_REPEAT','LANG_CONTROLS_REPEAT_TIMES','LANG_CONTROLS_REPEAT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_REPEAT_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_REPEAT_DESCRIPTION'),
			statements: [Facilino.locales.getKey('LANG_CONTROLS_REPEAT_STATEMENTS_DO')],
			fields: [Facilino.locales.getKey('LANG_CONTROLS_REPEAT_FIELDS_REPETITIONS')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_REPEAT')).appendField(new Blockly.FieldNumber('4','1','32767'),'TO').appendField(Facilino.locales.getKey('LANG_CONTROLS_REPEAT_TIMES')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_CONTROLS_FOR_INPUT_DO')).setCheck('code');
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(true);
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_REPEAT_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.controls_repeat['subcategory'];


		if (window.FacilinoAdvanced===true)
		{
		// Source: src/blocks/controls_for/controls_for.js
		Blockly.Arduino.controls_for = function() {
			var variable0 = Blockly.Arduino.valueToCode(this, 'VAR', Blockly.Arduino.ORDER_NONE) || '';
			var argument0 = Blockly.Arduino.valueToCode(this, 'FROM', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
			var argument1 = Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
			var branch = Blockly.Arduino.statementToCode(this, 'DO');
			if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
				branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
			}
			var code = '';
			var from_input=this.getInputTargetBlock('FROM');
			var to_input=this.getInputTargetBlock('TO');
			if (from_input&&to_input)
			{
				var from_type=this.getInputTargetBlock('FROM').type;
				var to_type=this.getInputTargetBlock('TO').type;
				//console.log(from_type);
				//console.log(to_type);
				if ((from_type=='variables_get')&&(to_type=='math_number'))
					var up = false;  //We assume that the from input is bigger than the to input
				else if ((from_type=='math_number')&&(to_type=='variables_get'))
					var up = true;  //We assume that the from input is smaller than the from input
				else if ((from_type=='math_number')&&(to_type=='math_number'))
					var up = parseFloat(argument0) <= parseFloat(argument1);
				else
					var up = parseFloat(argument0) <= parseFloat(argument1);
				code += 'for (' + variable0 + ' = ' + argument0 + '; ' + variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' + variable0 + (up ? '++' : '--') + ') {\n' + branch + '}\n';
			}
			return code;
		};
		Blockly.Blocks.controls_for = {
			// For loop.
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_for'),
			examples: ['controls_for_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_FOR_INPUT_WITH_NAME','LANG_CONTROLS_FOR_INPUT_WITH_DESCRIPTION','LANG_CONTROLS_FOR_INPUT_WITH_STATEMENTS_DO','LANG_CONTROLS_FOR_INPUT_WITH_INPUTS_WITH','LANG_CONTROLS_FOR_INPUT_WITH_INPUTS_FROM','LANG_CONTROLS_FOR_INPUT_WITH_INPUTS_TO','LANG_CONTROLS_FOR_INPUT_WITH','LANG_CONTROLS_FOR_INPUT_FROM','LANG_CONTROLS_FOR_INPUT_TO','LANG_CONTROLS_FOR_INPUT_DO'],
			name: Facilino.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH_DESCRIPTION'),
			statements: [Facilino.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH_STATEMENTS_DO')],
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH_INPUTS_WITH'),Facilino.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH_INPUTS_FROM'),Facilino.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH_INPUTS_TO')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendValueInput('VAR').appendField(Facilino.locales.getKey('LANG_CONTROLS_FOR_INPUT_WITH')).setCheck('Variable');
				// .appendField(new Blockly.FieldVariable(' '), 'VAR');
				this.appendValueInput('FROM').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_CONTROLS_FOR_INPUT_FROM'));
				this.appendValueInput('TO').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_CONTROLS_FOR_INPUT_TO'));
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_CONTROLS_FOR_INPUT_DO')).setCheck('code');
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(true);
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_FOR_TOOLTIP'));
			},
			getVars: function() {
				return [this.getFieldValue('VAR')];
			},
			onchange: function() {
				var from_input=this.getInputTargetBlock('FROM');
				var to_input=this.getInputTargetBlock('TO');
				if (from_input&&to_input)
				{
					var from_type=from_input.type;
					var to_type=to_input.type;
					if ((from_type=='variables_get')&&(to_type=='math_number'))
						this.setWarningText(Facilino.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING1'));
					else if ((from_type=='math_number')&&(to_type=='variables_get'))
						this.setWarningText(Facilino.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING2'));
					else if ((from_type=='math_number')&&(to_type=='math_number'))
						this.setWarningText(null);
					else
						this.setWarningText(Facilino.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING3'));
				}
				else
					this.setWarningText(Facilino.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING4'));
			},
			renameVar: function(oldName, newName) {
				if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
					this.setTitleValue(newName, 'VAR');
				}
			},
		};
		}
		// Source: src/blocks/controls_if/controls_if.js
		Blockly.Arduino.controls_if = function() {
			// If/elseif/else condition.
			var n = 0;
			var argument = Blockly.Arduino.valueToCode(this, 'IF' + n, Blockly.Arduino.ORDER_NONE);
			argument = argument.replace(/&quot;/g, '"');
			var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
			var code = '';
			code += JST['controls_if']({'argument': argument,'branch': branch});
			for (n = 1; n <= this.elseifCount_; n++) {
				argument = Blockly.Arduino.valueToCode(this, 'IF' + n, Blockly.Arduino.ORDER_NONE);
				branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
				code += JST['controls_elseif']({'argument': argument,'branch': branch});
			}
			if (this.elseCount_) {
				branch = Blockly.Arduino.statementToCode(this, 'ELSE');
				code += JST['controls_else']({'argument': argument,'branch': branch});
			}
			branch = branch.replace(/&quot;/g, '"');
			code = code.replace(/&quot;/g, '"');

			return code + '\n';
		};

		Blockly.Blocks.controls_if = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_if'),
			examples: ['controls_if_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_IF_MSG_IF_NAME','LANG_CONTROLS_IF_MSG_IF_DESCRIPTION','LANG_CONTROLS_IF_MSG_IF_STATEMENTS_DO','LANG_CONTROLS_IF_MSG_IF_MUTATOR_DESC','LANG_CONTROLS_IF_MSG_IF_INPUTS_CONDITION','LANG_CONTROLS_IF_MSG_IF','LANG_CONTROLS_IF_MSG_THEN','LANG_CONTROLS_IF_TOOLTIP_1','LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF','LANG_CONTROLS_IF_MSG_THEN','LANG_CONTROLS_IF_ELSE_Field_ELSE'],
			name: Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_IF_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_IF_DESCRIPTION'),
			statements: [Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_IF_STATEMENTS_DO')],
			mutator_desc: Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_IF_MUTATOR_DESC'),
			mutator_container: 'controls_if_if',
			mutator_items: ['controls_if_elseif','controls_if_else'],
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_IF_INPUTS_CONDITION')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendValueInput('IF0').setCheck([Boolean,'Variable']).appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_IF'));
				this.appendStatementInput('DO0').appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setMutator(new Blockly.Mutator(['controls_if_elseif',
					'controls_if_else'
				]));
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_IF_TOOLTIP_1'));
				this.elseifCount_ = 0;
				this.elseCount_ = 0;
			},
			mutationToDom: function() {
				if (!this.elseifCount_ && !this.elseCount_) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.elseifCount_) {
					container.setAttribute('elseif', this.elseifCount_);
				}
				if (this.elseCount_) {
					container.setAttribute('else', 1);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.elseifCount_ = window.parseInt(xmlElement.getAttribute('elseif'), 10);
				this.elseCount_ = window.parseInt(xmlElement.getAttribute('else'), 10);
				for (var x = 1; x <= this.elseifCount_; x++) {
					this.appendValueInput('IF' + x).setCheck([Boolean,'Variable']).appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF'));
					this.appendStatementInput('DO' + x).appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
				if (this.elseCount_) {
					this.appendDummyInput('ELSE_LABEL').appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_ELSE_Field_ELSE'));
					this.appendStatementInput('ELSE').appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('controls_if_if');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 1; x <= this.elseifCount_; x++) {
					var elseifBlock = workspace.newBlock('controls_if_elseif');
					elseifBlock.initSvg();
					connection.connect(elseifBlock.previousConnection);
					connection = elseifBlock.nextConnection;
				}
				if (this.elseCount_) {
					var elseBlock = workspace.newBlock('controls_if_else');
					elseBlock.initSvg();
					connection.connect(elseBlock.previousConnection);
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect the else input blocks and remove the inputs.
				if (this.elseCount_) {
					this.removeInput('ELSE_LABEL');
					this.removeInput('ELSE');
				}
				this.elseCount_ = 0;
				// Disconnect all the elseif input blocks and remove the inputs.
				for (var x = this.elseifCount_; x > 0; x--) {
					this.removeInput('IF' + x);
					this.removeInput('DO' + x);
				}
				this.elseifCount_ = 0;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'controls_if_elseif':
							this.elseifCount_++;
							var ifInput = this.appendValueInput('IF' + this.elseifCount_).setCheck([Boolean,'Variable']).appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF'));
							var doInput = this.appendStatementInput('DO' + this.elseifCount_).setCheck('code');
							doInput.appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT);
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								ifInput.connection.connect(clauseBlock.valueConnection_);
							}
							if (clauseBlock.statementConnection_) {
								doInput.connection.connect(clauseBlock.statementConnection_);
							}
							break;
						case 'controls_if_else':
							this.elseCount_++;
							this.appendDummyInput('ELSE_LABEL').appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_ELSE_Field_ELSE'));
							var elseInput = this.appendStatementInput('ELSE').setCheck('code');
							elseInput.appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_THEN'))
								.setAlign(Blockly.ALIGN_RIGHT);
							// Reconnect any child blocks.
							if (clauseBlock.statementConnection_) {
								elseInput.connection.connect(clauseBlock.statementConnection_);
							}
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection &&
						clauseBlock.nextConnection.targetBlock();
				}
			},
			saveConnections: function(containerBlock) {
				// Store a pointer to any connected child blocks.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				var x = 1;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'controls_if_elseif':
							var inputIf = this.getInput('IF' + x);
							var inputDo = this.getInput('DO' + x);
							clauseBlock.valueConnection_ =
								inputIf && inputIf.connection.targetConnection;
							clauseBlock.statementConnection_ =
								inputDo && inputDo.connection.targetConnection;
							x++;
							break;
						case 'controls_if_else':
							inputDo = this.getInput('ELSE');
							clauseBlock.statementConnection_ =
								inputDo && inputDo.connection.targetConnection;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection &&
						clauseBlock.nextConnection.targetBlock();
				}
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.controls_if['subcategory'];

		Blockly.Blocks.controls_if_if = {
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_IF_IF_Field_IF','LANG_CONTROLS_IF_IF_TOOLTIP'],
			// If condition.
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_IF_Field_IF'))
					.setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('if');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_IF_IF_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.controls_if_elseif = {
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF','LANG_CONTROLS_IF_ELSEIF_TOOLTIP'],
			// Else-If condition.
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_ELSEIF_Field_ELSEIF'))
					.setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'if');
				this.setNextStatement(true,'if');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_IF_ELSEIF_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.controls_if_else = {
			// Else condition.
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_IF_ELSE_Field_ELSE','LANG_CONTROLS_IF_ELSE_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_ELSE_Field_ELSE'))
					.setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'if');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_IF_ELSE_TOOLTIP'));
				this.contextMenu = false;
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.controls_switch = function() {
			// switch condition.
			var n = 0;
			var argument = Blockly.Arduino.valueToCode(this, 'IF0',
				Blockly.Arduino.ORDER_NONE) || '';
			var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
			branch = Facilino.indentSentences(branch);
			// branch=branch.replace(/&amp;/g, '');

			var code = '';

			code += 'switch (' + argument + ')\n{';
			for (n = 1; n <= this.switchCount_; n++) {
				argument = Blockly.Arduino.valueToCode(this, 'SWITCH' + n, Blockly.Arduino.ORDER_NONE) || '';
				branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
				branch = Facilino.indentSentences(branch);
				branch = branch.substring(0, branch.length - 1);
				// branch=branch.replace(/&amp;/g, '');

				code += ' \n  case ' + argument + ': \n  {\n' + branch + '  break;\n  }';
			}
			if (this.defaultCount_) {
				branch = Blockly.Arduino.statementToCode(this, 'DEFAULT');
				branch = Facilino.indentSentences(branch);
				branch = branch.substring(0, branch.length - 1);
				// branch=branch.replace(/&amp;/g, '');

				code += '  \n  default:\n  {\n' + branch + '}';
			}
			return code + '\n}\n';
		};


		Blockly.Blocks.controls_switch = {
			// switch condition.
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_switch'),
			examples: ['controls_switch_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_SWITCH_NAME','LANG_CONTROLS_SWITCH_DESCRIPTION','LANG_CONTROLS_SWITCH_STATEMENTS_DO','LANG_CONTROLS_SWITCH_MUTATOR_DESC','LANG_CONTROLS_SWITCH_INPUTS_CONDITION','LANG_CONTROLS_SWITCH','LANG_CONTROLS_SWITCH_CASE','LANG_CONTROLS_IF_MSG_THEN','LANG_CONTROLS_SWITCH_DEFAULT','LANG_CONTROLS_SWITCH_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_SWITCH_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_SWITCH_DESCRIPTION'),
			statements: [Facilino.locales.getKey('LANG_CONTROLS_SWITCH_STATEMENTS_DO')],
			mutator_desc: Facilino.locales.getKey('LANG_CONTROLS_SWITCH_MUTATOR_DESC'),
			mutator_container: 'controls_switch_switch',
			mutator_items: ['controls_switch_case','controls_switch_default'],
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_SWITCH_INPUTS_CONDITION')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendValueInput('IF0').appendField(Facilino.locales.getKey('LANG_CONTROLS_SWITCH')).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setMutator(new Blockly.Mutator(['controls_switch_case', 'controls_switch_default']));
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_SWITCH_TOOLTIP'));
				this.defaultCount_ = 0;
			},
			mutationToDom: function() {
				if (!this.switchCount_ && !this.defaultCount_) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.switchCount_) {
					container.setAttribute('case', this.switchCount_);
				}
				if (this.defaultCount_) {
					container.setAttribute('default', 1);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.switchCount_ = window.parseInt(xmlElement.getAttribute('case'), 10);
				this.defaultCount_ = window.parseInt(xmlElement.getAttribute('default'), 10);
				for (var x = 1; x <= this.switchCount_; x++) {
					this.appendValueInput('SWITCH' + x).setCheck([Number,'Variable']).appendField(Facilino.locales.getKey('LANG_CONTROLS_SWITCH_CASE')).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(true);
					this.appendStatementInput('DO' + x).appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
				if (this.defaultCount_) {
					this.appendStatementInput('DEFAULT').appendField(Facilino.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('controls_switch_switch');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 1; x <= this.switchCount_; x++) {
					var switchBlock = workspace.newBlock('controls_switch_case');
					switchBlock.initSvg();
					connection.connect(switchBlock.previousConnection);
					connection = switchBlock.nextConnection;
				}
				if (this.defaultCount_) {
					var defaultBlock = workspace.newBlock('controls_switch_default');
					defaultBlock.initSvg();
					connection.connect(defaultBlock.previousConnection);
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect the switch blocks and remove the inputs.
				if (this.defaultCount_) {
					this.removeInput('DEFAULT');
				}
				this.defaultCount_ = 0;
				// Disconnect all the switch input blocks and remove the inputs.
				for (var x = this.switchCount_; x > 0; x--) {
					this.removeInput('SWITCH' + x);
					this.removeInput('DO' + x);
				}
				this.switchCount_ = 0;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'controls_switch_case':
							this.switchCount_++;
							var case_lang;
							case_lang = Facilino.locales.getKey('LANG_CONTROLS_SWITCH_CASE');
							var switchInput = this.appendValueInput('SWITCH' + this.switchCount_).setCheck([Number,'Variable']).appendField(case_lang).setAlign(Blockly.ALIGN_RIGHT);
							this.setInputsInline(true);

							var doInput = this.appendStatementInput('DO' + this.switchCount_).setCheck('code');
							doInput.appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_THEN')).setAlign(Blockly.ALIGN_RIGHT);
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								switchInput.connection.connect(clauseBlock.valueConnection_);
							}
							if (clauseBlock.statementConnection_) {
								doInput.connection.connect(clauseBlock.statementConnection_);
							}
							break;
						case 'controls_switch_default':
							this.defaultCount_++;
							var defaultInput = this.appendStatementInput('DEFAULT').setCheck('code');
							defaultInput.appendField(Facilino.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
								.setAlign(Blockly.ALIGN_RIGHT);
							// Reconnect any child blocks.
							if (clauseBlock.statementConnection_) {
								defaultInput.connection.connect(clauseBlock.statementConnection_);
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
				var x = 1;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'controls_switch_case':
							var inputSwitch = this.getInput('SWITCH' + x);
							var inputDo = this.getInput('DO' + x);
							clauseBlock.valueConnection_ =
								inputSwitch && inputSwitch.connection.targetConnection;
							clauseBlock.statementConnection_ =
								inputDo && inputDo.connection.targetConnection;
							x++;
							break;
						case 'controls_switch_default':
							inputDo = this.getInput('DEFAULT');
							clauseBlock.statementConnection_ =
								inputDo && inputDo.connection.targetConnection;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			}
		};


		Blockly.Blocks.controls_switch_switch = {
			// If condition.
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_SWITCH'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_CONTROLS_SWITCH'))
					.setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('code');
				this.setTooltip('Switch');
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.controls_switch_case = {
			// case condition.
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_SWITCH_CASE'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_CONTROLS_SWITCH_CASE'))
					.setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip('Switch case');
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.controls_switch_default = {
			// default condition.
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_SWITCH_DEFAULT'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_CONTROLS_SWITCH_DEFAULT'))
					.setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'switch');
				this.setTooltip('Switch default');
				this.contextMenu = false;
			}
		};
		
		// Source: src/blocks/controls_whileUntil/controls_whileUntil.js
		Blockly.Arduino.controls_whileUntil = function() {
			// Do while/until loop.
			var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL', Blockly.Arduino.ORDER_NONE) || '';
			argument0 = argument0.replace(/&quot;/g, '"');
			var branch = Blockly.Arduino.statementToCode(this, 'DO');
			branch = branch.replace(/&quot;/g, '"');

			var code = '';

			if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
				branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
				// branch = branch.substring(0, branch.length - 2);
			}
			// branch=branch.replace(/&amp;/g, '');

			if (this.getFieldValue('MODE') === 'UNTIL') {
				if (!argument0.match(/^\w+$/)) {
					argument0 = '(' + argument0 + ')';
				}
				argument0 = '!' + argument0;
			}
			code += JST['controls_whileUntil']({
				'argument0': argument0,
				'branch': branch
			});
			return code;
		};
		Blockly.Blocks.controls_whileUntil = {
			// Do while/until loop.
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_whileUntil'),
			examples: ['controls_whileUntil_example','controls_whileUntil1_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE_NAME','LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE_DESCRIPTION','LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE_STATEMENTS_DO','LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE_DROPDOWN_MODE','LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE','LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL','LANG_CONTROLS_DOWHILE_OPERATOR_DO','LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE','LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL'],
			name: Facilino.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE_DESCRIPTION'),
			statements: [Facilino.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE_STATEMENTS_DO')],
			dropdown: [Facilino.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE_DROPDOWN_MODE')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendValueInput('BOOL').setCheck([Boolean,'Variable']).appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_WHILE'), 'WHILE'],
					[Facilino.locales.getKey('LANG_CONTROLS_WHILEUNTIL_OPERATOR_UNTIL'), 'UNTIL']
				]), 'MODE');
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_CONTROLS_DOWHILE_OPERATOR_DO'));
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				// Assign 'this' to a variable for use in the tooltip closure below.
				var thisBlock = this;
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TOOLTIP_WHILE')+' '+Facilino.locales.getKey('LANG_LOGIC_OPERATION_OR')+' '+Facilino.locales.getKey('LANG_CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL'));
			}
		};
		
		}
		
		Blockly.Arduino.base_delay = function() {
			var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			code += 'delay('+delay_time+');\n';
			return code;
		};

		Blockly.Blocks.base_delay = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('base_delay'),
			examples: ['base_delay_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_BASE_DELAY_WAIT_NAME','LANG_CONTROLS_BASE_DELAY_WAIT_DESCRIPTION','LANG_CONTROLS_BASE_DELAY_WAIT_INPUT_TIME','LANG_CONTROLS_BASE_DELAY_WAIT','LANG_CONTROLS_BASE_DELAY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT_DESCRIPTION'),
			warning_msg: ['dyor_task'],
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT_INPUT_TIME')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendValueInput('DELAY_TIME')
					.appendField(Facilino.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT'))
					.setCheck([Number,'Variable']);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_BASE_DELAY_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.base_delay['subcategory'];

		Blockly.Arduino.base_delay_sec = function() {
			var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';

			code += 'delay(1000*'+delay_time+');\n';
			return code;
		};

		Blockly.Blocks.base_delay_sec = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('base_delay_sec'),
			examples: ['base_delay_sec_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_BASE_DELAY_WAIT_SEC_NAME','LANG_CONTROLS_BASE_DELAY_WAIT_SEC_DESCRIPTION','LANG_CONTROLS_BASE_DELAY_WAIT_SEC','LANG_CONTROLS_BASE_DELAY_SEC_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT_SEC_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT_SEC_DESCRIPTION'),
			warning_msg: ['dyor_task'],
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT_SEC_INPUT_TIME')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendValueInput('DELAY_TIME')
					.appendField(Facilino.locales.getKey('LANG_CONTROLS_BASE_DELAY_WAIT_SEC'))
					.setCheck([Number,'Variable']);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_BASE_DELAY_SEC_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.base_delay_sec['subcategory'];

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.base_millis = function() {
			var code = 'millis()';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.base_millis = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('base_millis'),
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			examples: ['base_us_example'],
			keys: ['LANG_CONTROLS_BASE_MILLIS_NAME','LANG_CONTROLS_BASE_MILLIS_DESCRIPTION','LANG_CONTROLS_BASE_MILLIS_OUTPUT','LANG_CONTROLS_BASE_MILLIS','LANG_CONTROLS_BASE_MILLIS_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_BASE_MILLIS_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_BASE_MILLIS_DESCRIPTION'),
			output: Facilino.locales.getKey('LANG_CONTROLS_BASE_MILLIS_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_BASE_MILLIS'));
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_BASE_MILLIS_TOOLTIP'));
			}
		};

		Blockly.Arduino.base_us = function() {
			var code = 'micros()';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.base_us = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('base_us'),
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			examples: ['base_us_example'],
			keys: ['LANG_CONTROLS_BASE_US_NAME','LANG_CONTROLS_BASE_US_DESCRIPTION','LANG_CONTROLS_BASE_US_OUTPUT','LANG_CONTROLS_BASE_US','LANG_CONTROLS_BASE_US_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_BASE_US_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_BASE_US_DESCRIPTION'),
			output: Facilino.locales.getKey('LANG_CONTROLS_BASE_US_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_BASE_US'));
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_BASE_US_TOOLTIP'));
			}
		};

		Blockly.Blocks.dyor_controls_wait = [];

		Blockly.Blocks.controls_every = [];

		Blockly.Blocks.controls_every_container = [];

		Blockly.Blocks.controls_every_item = [];
		
		Blockly.Blocks.controls_alternate = [];

		Blockly.Blocks.controls_alternate_container = [];

		Blockly.Blocks.controls_alternate_item = [];
		
		}
		
		Blockly.Arduino.controls_setupLoop = function() {
			// Add statements to setup.
			var branch = Blockly.Arduino.statementToCode(this, 'SETUP');
			branch = branch.replace(/&quot;/g, '"');
			
			if (window.FacilinoOTA)
			{
				/*if (Blockly.Arduino.setups_['hostname'])
				{
					var otaCODE='ArduinoOTA.setHostname("'+Blockly.Arduino.setups_['hostname']+'");\n  ArduinoOTA.begin();\n';
					branch=otaCODE+branch;
				}
				else
				{
					var otaCODE='ArduinoOTA.begin();\n';
					branch=otaCODE+branch;
				}*/
				Blockly.Arduino.definitions_['declare_var_define_ota_webupdater'] = JST['ota_webupdater_definitions_variables']({});
				var otaCODE='_server.on("/",HTTP_GET,[](AsyncWebServerRequest *request){\n request->send(200,"text/html",serverIndex);\n});\n';
				otaCODE+='  _server.on("/update", HTTP_POST, [&](AsyncWebServerRequest *request) {\n    AsyncWebServerResponse *response = request->beginResponse((Update.hasError())?500:200, "text/plain", (Update.hasError())?"FAIL":"OK");\n    response->addHeader("Connection", "close");\n    response->addHeader("Access-Control-Allow-Origin", "*");\n    request->send(response);\n    yield();\n    delay(1000);\n    yield();\n    ESP.restart();\n  }, [&](AsyncWebServerRequest *request, String filename, size_t index, uint8_t *data, size_t len, bool final) {\n    if (!index) {\n      #if defined(ESP8266)\n        Update.runAsync(true);\n        uint32_t maxSketchSpace = (ESP.getFreeSketchSpace() - 0x1000) & 0xFFFFF000;\n        if (!Update.begin(maxSketchSpace, U_FLASH)){\n      #elif defined(ESP32)\nif        (!Update.begin(UPDATE_SIZE_UNKNOWN, U_FLASH)) {\n      #endif\n        Update.printError(Serial);\n        return request->send(400, "text/plain", "OTA could not begin");\n      }\n    }\n    if(len){\n      if (Update.write(data, len) != len) {\n        return request->send(400, "text/plain", "OTA could not begin");\n      }\n    }\n    if (final) {\n      if (!Update.end(true)) {\n        Update.printError(Serial);\n        return request->send(400, "text/plain", "Could not end OTA");\n      }\n    }\n    else{\n      return;\n    }\n    });\n';
				otaCODE+='  _server.begin();\n';
				branch=otaCODE+branch;
			}
			//if (window.FacilinoOTA)
			//	Blockly.Arduino.definitions_['define_wifi_OTA'] = JST['communications_wifi_ota_def_definitions']({});
			if (Blockly.Arduino.setups_['setup_int0_']) {
			  branch += Blockly.Arduino.setups_['setup_int0_']
			}

			Blockly.Arduino.setups_['X_SETUP'] = JST['controls_setupLoop']({
				'branch': branch
			});

			var content = Blockly.Arduino.statementToCode(this, 'LOOP');
			if (Blockly.Arduino.loops_['loop_thingsboard'])
			{
				content += Blockly.Arduino.loops_['loop_thingsboard']
			}
			
			//if (window.FacilinoOTA)
			//	content +='ArduinoOTA.handle();\n';
			
			content = content.replace(/&quot;/g, '"');
			content = JST['controls_setupLoop']({
				'branch': content
			});
			return content;
		};
		Blockly.Blocks.controls_setupLoop = {
			// Setup statements.
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_setupLoop'),
			examples: ['controls_setupLoop_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_SETUP_LOOP_NAME','LANG_CONTROLS_SETUP_LOOP_DESCRIPTION','LANG_CONTROLS_SETUP_LOOP_STATEMENT_SETUP','LANG_CONTROLS_SETUP_LOOP_STATEMENT_LOOP','LANG_CONTROLS_SETUP_LOOP_SETUP_TITLE','LANG_CONTROLS_SETUP_LOOP_LOOP_TITLE','LANG_CONTROLS_SETUP_LOOP_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_SETUP_LOOP_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_SETUP_LOOP_DESCRIPTION'),
			statements: [Facilino.locales.getKey('LANG_CONTROLS_SETUP_LOOP_STATEMENT_SETUP'),Facilino.locales.getKey('LANG_CONTROLS_SETUP_LOOP_STATEMENT_LOOP')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendStatementInput('SETUP').appendField(Facilino.locales.getKey('LANG_CONTROLS_SETUP_LOOP_SETUP_TITLE')).setCheck('code');
				this.appendStatementInput('LOOP').appendField(Facilino.locales.getKey('LANG_CONTROLS_SETUP_LOOP_LOOP_TITLE')).setCheck('code');
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_SETUP_LOOP_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.controls_setupLoop['subcategory'];
		
		
		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.dyor_controls_wait = function() {
			var value1 = Blockly.Arduino.valueToCode(this, 'VALUE1', Blockly.Arduino.ORDER_ATOMIC);
			var value2 = Blockly.Arduino.valueToCode(this, 'VALUE2', Blockly.Arduino.ORDER_ATOMIC);
			var cond = this.getFieldValue('COND');
			var code = 'while(!(('+value1+')'+cond+'('+value2+')));\n  delay(1);\n';
			return code;
		};

		Blockly.Blocks.dyor_controls_wait = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			tags: ['control'],
			helpUrl: Facilino.getHelpUrl('dyor_controls_wait'),
			examples: ['dyor_controls_wait_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_WAIT_NAME','LANG_CONTROLS_WAIT_DESCRIPTION','LANG_CONTROLS_WAIT_INPUT_VALUE1','LANG_CONTROLS_WAIT_INPUT_VALUE2','LANG_CONTROLS_WAIT','LANG_CONTROLS_VALUE1','LANG_CONTROLS_VALUE2','LANG_CONTROLS_WAIT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_WAIT_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_WAIT_DESCRIPTION'),
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_WAIT_INPUT_VALUE1'),Facilino.locales.getKey('LANG_CONTROLS_WAIT_INPUT_VALUE2')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_WAIT'));
				this.appendValueInput('VALUE1').appendField(Facilino.locales.getKey('LANG_CONTROLS_VALUE1')).setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,Number,'Variable']);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([
					['=', '=='],
					['!=', '!='],
					['<', '<'],
					['<=', '<='],
					['>', '>'],
					['>=', '>=']
				]), 'COND').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('VALUE2').appendField(Facilino.locales.getKey('LANG_CONTROLS_VALUE2')).setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,Number,'Variable']);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_WAIT_TOOLTIP'));
			}
		};


		Blockly.Arduino.controls_every = function() {
		var n = 0;
		var argument;
		var code = '';
		var branch = '';
		if (this.taskCount_>0) {
		  Blockly.Arduino.definitions_['declare_var_currentTimeNoInt']='unsigned long _currentTimeNoInt;\n';
		  code = '_currentTimeNoInt=millis();\n';
		  Blockly.Arduino.definitions_['declare_var_lastUpdateNoInt']='unsigned long _lastUpdateNoInt['+this.taskCount_+'];\n';
		  Blockly.Arduino.setups_['setup_every_'] = 'for (int _myTask=0;_myTask<'+this.taskCount_+';_myTask++)\n  _lastUpdateNoInt[_myTask]=millis();\n';
		  for (n = 0; n < this.taskCount_; n++) {
			//argument = Blockly.Arduino.valueToCode(this, 'TASK' + n, Blockly.Arduino.ORDER_NONE);
			branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
			argument = Blockly.Arduino.valueToCode(this, 'TASK' + n, Blockly.Arduino.ORDER_NONE);
			code+='if ((_currentTimeNoInt-_lastUpdateNoInt['+n+'])>='+argument+') {\n'+branch+'\n  _lastUpdateNoInt['+n+']=_currentTimeNoInt;\n  }\n';
		  }
		}
			code = code.replace(/&quot;/g, '"');
			return code;
		};


		Blockly.Blocks.controls_every = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_every'),
			examples: ['controls_every'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_EVERY_NAME','LANG_CONTROLS_EVERY_DESCRIPTION','LANG_CONTROLS_EVERY_MUTATOR_DESC','LANG_CONTROLS_EVERY_STATEMENT_DO','LANG_CONTROLS_EVERY_INPUT_TIME','LANG_CONTROLS_EVERY','LANG_CONTROLS_EVERY_TOOLTIP','LANG_CONTROLS_EVERY_MS','LANG_CONTROLS_DO'],
			name: Facilino.locales.getKey('LANG_CONTROLS_EVERY_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_EVERY_DESCRIPTION'),
			mutator_desc: Facilino.locales.getKey('LANG_CONTROLS_EVERY_MUTATOR_DESC'),
			mutator_container: 'controls_every_container',
			mutator_items: ['controls_every_item'],
			statements: [Facilino.locales.getKey('LANG_CONTROLS_EVERY_STATEMENT_DO')],
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_EVERY_INPUT_TIME')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
		this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_EVERY')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setMutator(new Blockly.Mutator(['controls_every_item']));
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_EVERY_TOOLTIP'));
				this.taskCount_ = 0;
			},
			isNotDuplicable: true,
			mutationToDom: function() {
				if (!this.taskCount_) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.taskCount_) {
					container.setAttribute('item', this.taskCount_);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.taskCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
				for (var x = 0; x < this.taskCount_; x++) {
					this.appendValueInput('TASK' + x)
						.setCheck(Number)
						.appendField(Facilino.locales.getKey('LANG_CONTROLS_EVERY_ELAPSED')+' (ms)').setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('DO' + x).appendField(Facilino.locales.getKey('LANG_CONTROLS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('controls_every_container');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 0; x < this.taskCount_; x++) {
					var taskBlock = workspace.newBlock('controls_every_item');
					taskBlock.initSvg();
					connection.connect(taskBlock.previousConnection);
					connection = taskBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the task input blocks and remove the inputs.
				for (var x = this.taskCount_-1; x >= 0; x--) {
					this.removeInput('TASK' + x);
					this.removeInput('DO' + x);
				}
				this.taskCount_ = 0;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'controls_every_item':
							var taskInput = this.appendValueInput('TASK' + this.taskCount_)
								.setCheck(Number)
								.appendField(Facilino.locales.getKey('LANG_CONTROLS_EVERY_ELAPSED')+' (ms)').setAlign(Blockly.ALIGN_RIGHT);
							var doInput = this.appendStatementInput('DO' + this.taskCount_);
							doInput.appendField(Facilino.locales.getKey('LANG_CONTROLS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.taskCount_++;
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								taskInput.connection.connect(clauseBlock.valueConnection_);
							}
							if (clauseBlock.statementConnection_) {
								doInput.connection.connect(clauseBlock.statementConnection_);
							}
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection &&
						clauseBlock.nextConnection.targetBlock();
				}
			},
			saveConnections: function(containerBlock) {
				// Store a pointer to any connected child blocks.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				var x = 0;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'controls_every_item':
							var inputTask = this.getInput('TASK' + x);
							var inputDo = this.getInput('DO' + x);
							clauseBlock.valueConnection_ =
								inputTask && inputTask.connection.targetConnection;
							clauseBlock.statementConnection_ =
								inputDo && inputDo.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection &&
						clauseBlock.nextConnection.targetBlock();
				}
			}
		};

		Blockly.Blocks.controls_every_container = {
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_EVERY','LANG_CONTROLS_EVERY_TOOLTIP'],
			// Task.
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_CONTROLS_EVERY'))
					.setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('task');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_EVERY_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.controls_every_item = {
				colour: Facilino.LANG_COLOUR_CONTROL,
				// Task item.
				keys: ['LANG_CONTROLS_EVERY_ELAPSED','LANG_CONTROLS_EVERY_TOOLTIP'],
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_CONTROL);
					this.appendDummyInput()
						.appendField(Facilino.locales.getKey('LANG_CONTROLS_EVERY_ELAPSED'))
						.setAlign(Blockly.ALIGN_RIGHT);
					this.setPreviousStatement(true,'task');
					this.setNextStatement(true,'task');
					this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_EVERY_TOOLTIP'));
					this.contextMenu = false;
				}
			};
			
			
			Blockly.Arduino.controls_alternate = function() {
				var n = 0;
				var code = '';
				var branch = '';
				if (this.taskCount_>0) {
				  Blockly.Arduino.definitions_['declare_var_alternate'+this.NumAlternateCases]='int _alternate_case'+this.NumAlternateCases+'=0;\n';
				  code += 'switch (_alternate_case'+this.NumAlternateCases+')\n{';
				  for (n = 0; n < this.taskCount_; n++) {
					branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
					code += ' \n  case '+n+': \n  {\n' + branch + '  break;\n  }';
				  }
				}
				code+='\n}\n_alternate_case'+this.NumAlternateCases+'=(++_alternate_case'+this.NumAlternateCases+')%'+this.taskCount_+';\n';
					code = code.replace(/&quot;/g, '"');
					return code;
		};
			
		Blockly.Blocks.controls_alternate = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_alternate'),
			examples: ['controls_alternate_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_ALTERNATE_NAME','LANG_CONTROLS_ALTERNATE_DESCRIPTION','LANG_CONTROLS_ALTERNATE_MUTATOR_DESC','LANG_CONTROLS_ALTERNATE_STATEMENT_DO','LANG_CONTROLS_ALTERNATE_TOOLTIP','LANG_CONTROLS_ALTERNATE','LANG_CONTROLS_ALTERNATE_CASE','LANG_CONTROLS_DO'],
			name: Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE_DESCRIPTION'),
			mutator_desc: Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE_MUTATOR_DESC'),
			mutator_container: 'controls_alternate_container',
			mutator_items: ['controls_alternate_item'],
			statements: [Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE_STATEMENT_DO')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setMutator(new Blockly.Mutator(['controls_alternate_item']));
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE_TOOLTIP'));
				Facilino.NumAlternateCases=Facilino.NumAlternateCases+1;
				this.NumAlternateCases=Facilino.NumAlternateCases;
				this.taskCount_ = 0;
			},
			mutationToDom: function() {
				if (!this.taskCount_) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.taskCount_) {
					container.setAttribute('item', this.taskCount_);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.taskCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
				for (var x = 0; x < this.taskCount_; x++) {
					this.appendDummyInput('TASK' + x)
						.appendField(Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE_CASE')+' '+(x+1)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('DO' + x).appendField(Facilino.locales.getKey('LANG_CONTROLS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('controls_alternate_container');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 0; x < this.taskCount_; x++) {
					var taskBlock = workspace.newBlock('controls_alternate_item');
					taskBlock.initSvg();
					connection.connect(taskBlock.previousConnection);
					connection = taskBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the task input blocks and remove the inputs.
				for (var x = this.taskCount_-1; x >= 0; x--) {
					this.removeInput('TASK' + x);
					this.removeInput('DO' + x);
				}
				this.taskCount_ = 0;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'controls_alternate_item':
							var taskInput = this.appendDummyInput('TASK' + this.taskCount_).appendField(Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE_CASE')+' '+(this.taskCount_+1)).setAlign(Blockly.ALIGN_RIGHT);
							var doInput = this.appendStatementInput('DO' + this.taskCount_);
							doInput.appendField(Facilino.locales.getKey('LANG_CONTROLS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
							this.taskCount_++;
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								if (taskInput.connection!==null)
									taskInput.connection.connect(clauseBlock.valueConnection_);
							}
							if (clauseBlock.statementConnection_) {
								if (doInput.connection!==null)
									doInput.connection.connect(clauseBlock.statementConnection_);
							}
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection &&
						clauseBlock.nextConnection.targetBlock();
				}
			},
			saveConnections: function(containerBlock) {
				// Store a pointer to any connected child blocks.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				var x = 0;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'controls_alternate_item':
							var inputTask = this.getInput('TASK' + x);
							var inputDo = this.getInput('DO' + x);
							clauseBlock.valueConnection_ =
								//inputTask && inputTask.connection.targetConnection;
							clauseBlock.statementConnection_ = inputDo && inputDo.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection &&
						clauseBlock.nextConnection.targetBlock();
				}
			}
		};

		Blockly.Blocks.controls_alternate_container = {
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_ALTERNATE','LANG_CONTROLS_ALTERNATE_TOOLTIP'],
			// Task.
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE'))
					.setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('task');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.controls_alternate_item = {
				colour: Facilino.LANG_COLOUR_CONTROL,
				// Task item.
				keys: ['LANG_CONTROLS_ALTERNATE_CASE','LANG_CONTROLS_ALTERNATE_TOOLTIP'],
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_CONTROL);
					this.appendDummyInput()
						.appendField(Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE_CASE'))
						.setAlign(Blockly.ALIGN_RIGHT);
					this.setPreviousStatement(true,'task');
					this.setNextStatement(true,'task');
					this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_ALTERNATE_TOOLTIP'));
					this.contextMenu = false;
				}
			};
			
			Blockly.Arduino.controls_comment = function() {
			// Add statements to setup.
			var code='//'+this.getFieldValue('COMMENT')+'\n';
			return code;
		};
		Blockly.Blocks.controls_comment = {
			// Setup statements.
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_comment'),
			examples: ['comment_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_COMMENT_NAME','LANG_CONTROLS_COMMENT_DESCRIPTION','LANG_CONTROLS_COMMENT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_COMMENT_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_COMMENT_DESCRIPTION'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput('').appendField('//').appendField(new Blockly.FieldTextInput(''),'COMMENT');
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_COMMENT_TOOLTIP'));
			}
		};

		Blockly.Arduino.controls_block = function() {
			// Add statements to setup.
			var code='{\n'+(Blockly.Arduino.statementToCode(this, 'BLOCK')||'')+'}\n';
			return code;
		};
		Blockly.Blocks.controls_block = {
			// Setup statements.
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
			helpUrl: Facilino.getHelpUrl('controls_block'),
			examples: ['comment_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL,
			keys: ['LANG_CONTROLS_BLOCK_NAME','LANG_CONTROLS_BLOCK_DESCRIPTION','LANG_CONTROLS_BLOCK','LANG_CONTROLS_BLOCK_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_BLOCK_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_BLOCK_DESCRIPTION'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_BLOCK'));
				this.appendStatementInput('BLOCK').setCheck('code');
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(null);
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_BLOCK_TOOLTIP'));
			}
		};
			
			if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
		{
			if ((window.FacilinoOTA===false)||(window.FacilinoOTA==null))
			{
			Blockly.Arduino.ESP_deep_sleep = function() {
				var sleep_time = Blockly.Arduino.valueToCode(this, 'SLEEP_TIME', Blockly.Arduino.ORDER_ATOMIC);
				var code = '';
				if (Facilino.profiles['processor']==='ESP32')
					code += 'delay(500);\nesp_sleep_enable_timer_wakeup(1000000*'+sleep_time+');\nesp_deep_sleep_start();\n';
				else if (Facilino.profiles['processor']==='ESP8266')
					code += 'ESP.deepSleep(1000000*'+sleep_time+');\n';
				return code;
			};

			Blockly.Blocks.ESP_deep_sleep = {
				category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_CONTROL'),
				helpUrl: Facilino.getHelpUrl('ESP_deep_sleep'),
				examples: ['deep_sleep_example'],
				category_colour: Facilino.LANG_COLOUR_CONTROL,
				colour: Facilino.LANG_COLOUR_CONTROL,
				keys: ['LANG_CONTROL_ESP_DEEP_SLEEP_NAME','LANG_CONTROL_ESP_DEEP_SLEEP_DESCRIPTION','LANG_CONTROL_ESP_DEEP_SLEEP','LANG_CONTROL_ESP_DEEP_SLEEP_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_CONTROL_ESP_DEEP_SLEEP_NAME'),
				description: Facilino.locales.getKey('LANG_CONTROL_ESP_DEEP_SLEEP_DESCRIPTION'),
				inputs: [Facilino.locales.getKey('LANG_CONTROL_ESP_DEEP_SLEEP_INPUT_TIME')],
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_CONTROL);
					this.appendValueInput('SLEEP_TIME',Number)
						.appendField(Facilino.locales.getKey('LANG_CONTROL_ESP_DEEP_SLEEP'))
						.setCheck(Number);
					this.setInputsInline(true);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(false);
					this.setTooltip(Facilino.locales.getKey('LANG_CONTROL_ESP_DEEP_SLEEP_TOOLTIP'));
				}
			};
			}
		}
		}
	}
	
	var FacilinoControls = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoControls;
	} else {
		window.FacilinoControls = FacilinoControls;
	}
}));
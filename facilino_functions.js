(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	Blockly.Blocks.procedures_defnoreturn = {
		category: Facilino.locales.getKey('LANG_CATEGORY_PROCEDURES'),
		helpUrl: Facilino.getHelpUrl('procedures_defnoreturn'),
		examples: ['procedures_callnoreturn_example'],
		category_colour: Facilino.LANG_COLOUR_PROCEDURES,
		colour: Facilino.LANG_COLOUR_PROCEDURES,
		keys: ['LANG_PROCEDURES_DEFNORETURN_PROCEDURE_NAME','LANG_PROCEDURES_DEFNORETURN_PROCEDURE_DESCRIPTION','LANG_PROCEDURES_DEFNORETURN_PROCEDURE_MUTATOR','LANG_PROCEDURES_DEFNORETURN_PROCEDURE_FIELD_NAME','LANG_PROCEDURES_DEFNORETURN_PROCEDURE_STATEMENTS_DO','LANG_PROCEDURES_DEFNORETURN_PROCEDURE','LANG_PROCEDURES_DEFNORETURN_TOOLTIP','LANG_PROCEDURES_DEFNORETURN_DO'],
		name: Facilino.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE_NAME'),
		description: Facilino.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE_DESCRIPTION'),
		additional: ['procedures_callnoreturn'],
		mutator_desc: Facilino.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE_MUTATOR'),
		mutator_container: 'procedures_mutatorcontainer',
		mutator_items: ['procedures_mutatorarg'],
		fields: [Facilino.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE_FIELD_NAME')],
		statements: [Facilino.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE_STATEMENTS_DO')],
		init: function() {
		this.setColour(Facilino.LANG_COLOUR_PROCEDURES);
		var name = new Blockly.FieldTextInput('',Blockly.Procedures.rename);
		name.setSpellcheck(false);
		this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE')).appendField(name,'NAME').appendField('', 'PARAMS');
		this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
		if ((this.workspace.options.comments || (this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments)) && Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT) {
			this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
		}
		this.setTooltip(Facilino.locales.getKey('LANG_PROCEDURES_DEFNORETURN_TOOLTIP'));
		this.arguments_ = [];
		this.type_arguments_ = [];
		this.setStatements_(true);
		this.setInputsInline(false);
  },
  setStatements_: function(hasStatements) {
	if (this.hasStatements_ === hasStatements) {
	  return;
	}
	if (hasStatements) {
	  this.appendStatementInput('STACK').appendField(Facilino.locales.getKey('LANG_PROCEDURES_DEFNORETURN_DO')).setCheck(['code','function']);
	  if (this.getInput('RETURN')) {
		this.moveInputBefore('STACK', 'RETURN');
	  }
	} else {
	  this.removeInput('STACK', true);
	}
	this.hasStatements_ = hasStatements;
  },
  updateParams_: function() {
	// Check for duplicated arguments.
	var badArg = false;
	var hash = {};
	for (var i = 0; i < this.arguments_.length; i++) {
	  if (hash['arg_' + this.arguments_[i].toLowerCase()]) {
		badArg = true;
		break;
	  }
	  hash['arg_' + this.arguments_[i].toLowerCase()] = true;
	}
	if (badArg) {
	  this.setWarningText('Duplicate argument');
	} else {
	  this.setWarningText(null);
	}
	// Merge the arguments into a human-readable list.
	var params = [];
	for (var i in this.arguments_) {
		try{
		params.push(this.type_arguments_[i] + ' ' + this.arguments_[i]);
		}
		catch(e)
		{
		}
	}
	this.paramString = params.join(', ');
	// The params field is deterministic based on the mutation,
	// no need to fire a change event.
	Blockly.Events.disable();
	try {
	  this.setFieldValue(this.paramString, 'PARAMS');
	} finally {
	  Blockly.Events.enable();
	}
  },
  mutationToDom: function(opt_paramIds) {
	var container = document.createElement('mutation');
	if (opt_paramIds) {
	  container.setAttribute('name', this.getFieldValue('NAME'));
	}
	for (var i = 0; i < this.arguments_.length; i++) {
	  var parameter = document.createElement('arg_name');
	  parameter.setAttribute('name', this.arguments_[i]);
	  if (opt_paramIds && this.paramIds_) {
		parameter.setAttribute('paramId', this.paramIds_[i]);
	  }
	  container.appendChild(parameter);

	  parameter = document.createElement('arg_type');
	  try{
	  parameter.setAttribute('name', this.type_arguments_[i]);
	  if (opt_paramIds && this.paramIds_) {
		parameter.setAttribute('paramId', this.paramIds_[i]);
	  }
	  }
	  catch(e)
	  {
	  }
	  container.appendChild(parameter);
	}

	// Save whether the statement input is visible.
	if (!this.hasStatements_) {
	  container.setAttribute('statements', 'false');
	}
	return container;
  },
  domToMutation: function(xmlElement) {
	this.arguments_ = [];
	for (var i = 0, childNode; childNode = xmlElement.childNodes[i]; i++) {
	  if (childNode.nodeName.toLowerCase() === 'arg_name') {
		this.arguments_.push(childNode.getAttribute('name'));
	  }
	  if (childNode.nodeName.toLowerCase() === 'arg_type') {
		  try{
		this.type_arguments_.push(childNode.getAttribute('name'));
		  }
		  catch(e)
		  {
		  }
	  }
	}
	this.updateParams_();
	Blockly.Procedures.mutateCallers(this);

	// Show or hide the statement input.
	this.setStatements_(xmlElement.getAttribute('statements') !== 'false');
  },
  decompose: function(workspace) {
	var containerBlock = workspace.newBlock('procedures_mutatorcontainer');
	containerBlock.initSvg();

	// Check/uncheck the allow statement box.
	if (this.getInput('RETURN')) {
	  containerBlock.setFieldValue(this.hasStatements_ ? 'TRUE' : 'FALSE',
								   'STATEMENTS');
	} else {
	  containerBlock.getInput('STATEMENT_INPUT').setVisible(false);
	}

	// Parameter list.
	var connection = containerBlock.getInput('STACK').connection;
	for (var i = 0; i < this.arguments_.length; i++) {
	  var paramBlock = workspace.newBlock('procedures_mutatorarg');
	  paramBlock.initSvg();
	  paramBlock.setFieldValue(this.type_arguments_[i], 'TYPE');
	  paramBlock.setFieldValue(this.arguments_[i], 'NAME');
	  // Store the old location.
	  paramBlock.oldLocation = i;
	  connection.connect(paramBlock.previousConnection);
	  connection = paramBlock.nextConnection;
	}
	// Initialize procedure's callers with blank IDs.
	Blockly.Procedures.mutateCallers(this);
	//Blockly.Procedures.mutateCallers(this.getFieldValue('NAME'), this.workspace, this.arguments_, null);
	//Blockly.Procedures.mutateCallers(this.getFieldValue('TYPE'), this.workspace, this.type_arguments_, null);
	return containerBlock;
  },
  compose: function(containerBlock) {
	// Parameter list.
	this.arguments_ = [];
	this.type_arguments_ = [];
	this.paramIds_ = [];
	var paramBlock = containerBlock.getInputTargetBlock('STACK');
	while (paramBlock) {
	  this.arguments_.push(paramBlock.getFieldValue('NAME'));
	  this.type_arguments_.push(paramBlock.getFieldValue('TYPE'));
	  this.paramIds_.push(paramBlock.id);
	  paramBlock = paramBlock.nextConnection &&
		  paramBlock.nextConnection.targetBlock();
	}
	this.updateParams_();
	Blockly.Procedures.mutateCallers(this);

	// Show/hide the statement input.
	var hasStatements = containerBlock.getFieldValue('STATEMENTS');
	if (hasStatements !== null) {
	  hasStatements = hasStatements == 'TRUE';
	  if (this.hasStatements_ != hasStatements) {
		if (hasStatements) {
		  this.setStatements_(true);
		  // Restore the stack, if one was saved.
		  Blockly.Mutator.reconnect(this.statementConnection_, this, 'STACK');
		  this.statementConnection_ = null;
		} else {
		  // Save the stack, then disconnect it.
		  var stackConnection = this.getInput('STACK').connection;
		  this.statementConnection_ = stackConnection.targetConnection;
		  if (this.statementConnection_) {
			var stackBlock = stackConnection.targetBlock();
			stackBlock.unplug();
			stackBlock.bumpNeighbours_();
		  }
		  this.setStatements_(false);
		}
	  }
	}
  },
  getProcedureDef: function() {
	return [this.getFieldValue('NAME'), this.arguments_, false];
  },
  getVars: function() {
	return this.arguments_;
  },
  renameVar: function(oldName, newName) {
	var change = false;
	for (var i = 0; i < this.arguments_.length; i++) {
	  if (Blockly.Names.equals(oldName, this.arguments_[i])) {
		this.arguments_[i] = newName;
		change = true;
	  }
	}
	if (change) {
	  this.updateParams_();
	  // Update the mutator's variables if the mutator is open.
	  if (this.mutator.isVisible()) {
		var blocks = this.mutator.workspace_.getAllBlocks();
		for (var i = 0, block; block = blocks[i]; i++) {
		  if (block.type == 'procedures_mutatorarg' &&
			  Blockly.Names.equals(oldName, block.getFieldValue('NAME'))) {
			block.setFieldValue(newName, 'NAME');
		  }
		}
	  }
	}
  },
  validName: function(name) {
				if (name && name.length > 0) {
					var i = 0;
					while (i < name.length) {
						if (!isNaN(parseFloat(name[i]))) {
							name = name.substring(1, name.length);
						} else {
							break;
						}
					}
					name = name.replace(/([ ])/g, '_');
					name = name.replace(/([áàâä])/g, 'a');
					name = name.replace(/([éèêë])/g, 'e');
					name = name.replace(/([íìîï])/g, 'i');
					name = name.replace(/([óòôö])/g, 'o');
					name = name.replace(/([úùûü])/g, 'u');
					name = name.replace(/([ñ])/g, 'n');
					name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\?\?\ç\`\´\¨\^])/g, '');
					i = 0;
					while (i < name.length) {
						if (!isNaN(parseFloat(name[i]))) {
							name = name.substring(1, name.length);
						} else {
							break;
						}
					}
					for (var j in Blockly.Arduino.RESERVED_WORDS_) {
						this.reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
						if (name === this.reserved_words[j]) {
							this.setWarningText('Reserved word');
							name = '';
							break;
						} else {
							this.setWarningText(null);
						}
					}
				}
				return name;
			},
  callType_: 'procedures_callnoreturn',
  onchange: function() {
				if (this.last_procedure !== this.getFieldValue('NAME')) {
					var name = this.getFieldValue('NAME');
					name = this.validName(name);
					try {
						this.setFieldValue(name, 'NAME');
					} catch (e) {}
					this.last_procedure = name;
				}
			}
};

		Blockly.Blocks['procedures_mutatorcontainer'] = {
		colour: Facilino.LANG_COLOUR_PROCEDURES,
		keys: ['LANG_PROCEDURES_MUTATORCONTAINER_Field'],
		init: function() {
	this.appendDummyInput()
		.appendField(Facilino.locales.getKey('LANG_PROCEDURES_MUTATORCONTAINER_Field'));
		this.appendStatementInput('STACK').setCheck(['code','function']);
	this.appendDummyInput('STATEMENT_INPUT')
		.appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS)
		.appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
	this.setColour(Facilino.LANG_COLOUR_PROCEDURES);
	this.setTooltip('');
	this.contextMenu = false;
  }
};

		Blockly.Blocks['procedures_mutatorarg'] = {
			colour: Facilino.LANG_COLOUR_PROCEDURES,
			keys: ['LANG_PROCEDURES_MUTATORARG_Field'],
  init: function() {
	var field = new Blockly.FieldTextInput('x', this.validator_);
	this.appendDummyInput()
		.appendField(Facilino.locales.getKey('LANG_PROCEDURES_MUTATORARG_Field')).appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_SHORT'), 'short'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_BOOL'), 'bool'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_CHAR'), 'char']
				]), 'TYPE').appendField(field, 'NAME');
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	this.setColour(Facilino.LANG_COLOUR_PROCEDURES);
	this.setTooltip('');
	this.contextMenu = false;

	// Create the default variable when we drag the block in from the flyout.
	// Have to do this after installing the field on the block.
	field.onFinishEditing_ = this.createNewVar_;
	field.onFinishEditing_('x');
  },
  onchange: function() {
	if (this.last_variable !== this.getFieldValue('NAME')) {
		var name = this.getFieldValue('NAME');
		name = this.validName(name);
		try {
			this.setFieldValue(name, 'NAME');
		} catch (e) {}
		this.last_variable = name;
	}
  },
  validName: Blockly.Blocks.procedures_defnoreturn.validName,
  validator_: function(newVar) {
	newVar = newVar.replace(/[\s\xa0]+/g, ' ').replace(/^ | $/g, '');
	return newVar || null;
  },
  createNewVar_: function(newText) {
	var source = this.sourceBlock_;
	if (source && source.workspace && source.workspace.options &&
		source.workspace.options.parentWorkspace) {
	  source.workspace.options.parentWorkspace.createVariable(newText);
	}
  }
};

		 // Source: src/blocks/procedures_defnoreturn/procedures_defnoreturn.js
		// Defining a procedure without a return value uses the same generator as
		// a procedure with a return value.
		Blockly.Arduino.procedures_defnoreturn = function() {
			// Define a procedure with a return value.
			var funcName = this.getFieldValue('NAME');
			var branch = Blockly.Arduino.statementToCode(this, 'STACK');
			branch = branch.replace(/&quot;/g, '"');
			if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
				branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
			}
			// branch=branch.replace(/&amp;/g, '');

			var returnType = 'void';
			var args = this.paramString;
			var code = JST['procedures_defnoreturn']({
				'returnType': returnType,
				'funcName': funcName,
				'args': args,
				'branch': branch,
				'semicolon': ''
			});
			// code=code.replace(/&amp;/g, '');

			code = Blockly.Arduino.scrub_(this, code);
			Blockly.Arduino.definitions_[funcName] = code;
			return null;
		};

		// Source: src/blocks/procedures_defreturn/procedures_defreturn.js
		Blockly.Arduino.procedures_defreturn = function() {
			// Define a procedure with a return value.
			var funcName = this.getFieldValue('NAME');
			var branch = Blockly.Arduino.statementToCode(this, 'STACK');
			branch = branch.replace(/&quot;/g, '"');

			if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
				branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + this.id + '\'') + branch;
			}
			var returnValue = Blockly.Arduino.valueToCode(this, 'RETURN', Blockly.Arduino.ORDER_NONE) || '';
			var code = '';

			returnValue = returnValue.replace(/&quot;/g, '"');
			//var returnType = this.getReturnType();
			if (returnValue) {
				returnValue = '  return ' + returnValue + ';\n';
			}
			var returnType = this.getFieldValue('RETURN_TYPE');
			//console.log(returnType);
			var args = this.paramString;
			code += JST['procedures_defreturn']({'returnType': returnType,'funcName': funcName,'args': args,'branch': branch,'returnValue': returnValue});
			// code=code.replace(/&amp;/g, '');

			code = Blockly.Arduino.scrub_(this, code);
			Blockly.Arduino.definitions_[funcName] = code;
			return null;
		};

		Blockly.Blocks.procedures_defreturn = {
		category: Facilino.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Procedures are handled specially.
		helpUrl: Facilino.getHelpUrl('procedures_defreturn'),
		examples: ['procedures_callreturn_example'],
		category_colour: Facilino.LANG_COLOUR_PROCEDURES,
		colour: Facilino.LANG_COLOUR_PROCEDURES,
		keys: ['LANG_PROCEDURES_DEFRETURN_PROCEDURE_NAME','LANG_PROCEDURES_DEFRETURN_PROCEDURE_DESCRIPTION','LANG_PROCEDURES_DEFRETURN_PROCEDURE_MUTATOR','LANG_PROCEDURES_DEFRETURN_PROCEDURE_FIELD_NAME','LANG_PROCEDURES_DEFRETURN_PROCEDURE_STATEMENTS_DO','LANG_PROCEDURES_DEFRETURN_PROCEDURE','LANG_PROCEDURES_DEFRETURN_RETURN','LANG_PROCEDURES_DEFRETURN_TOOLTIP'],
		name: Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE_NAME'),
		description: Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE_DESCRIPTION'),
		additional: ['procedures_callreturn'],
		mutator_desc: Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE_MUTATOR'),
		mutator_container: 'procedures_mutatorcontainer',
		mutator_items: ['procedures_mutatorarg'],
		fields: [Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE_FIELD_NAME')],
		statements: [Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE_STATEMENTS_DO')],
		init: function() {
			var nameField = new Blockly.FieldTextInput('',Blockly.Procedures.rename);
			nameField.setSpellcheck(false);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE')).appendField(nameField, 'NAME').appendField('', 'PARAMS');
			//this.appendStatementInput('STACK').appendField(Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_DO'));
			this.appendValueInput('RETURN').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_RETURN')).appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_SHORT'), 'short'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_BOOL'), 'bool'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_CHAR'), 'char']
				]), "RETURN_TYPE");
			this.setMutator(new Blockly.Mutator(['procedures_mutatorarg']));
			if ((this.workspace.options.comments ||(this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments)) && Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
			  this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
			}
			this.setColour(Facilino.LANG_COLOUR_PROCEDURES);
			this.setTooltip(Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_TOOLTIP'));
			this.arguments_ = [];
			this.type_arguments_ = [];
			this.setStatements_(true);
			this.statementConnection_ = null;
  },
  isVariable: function(varValue) {
				for (var i in Blockly.Variables.allUsedVariables) {
					if (Blockly.Variables.allUsedVariables[i] === varValue) {
						return true;
					}
				}
				return false;
			},
  setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
  updateParams_: Blockly.Blocks['procedures_defnoreturn'].updateParams_,
  mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
  decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
  compose: Blockly.Blocks['procedures_defnoreturn'].compose,
  getProcedureDef: function() {
	return [this.getFieldValue('NAME'), this.arguments_, true];
  },
  getVars: Blockly.Blocks['procedures_defnoreturn'].getVars,
  renameVar: Blockly.Blocks['procedures_defnoreturn'].renameVar,
  callType_: 'procedures_callreturn'
};

	if (window.FacilinoAdvanced===true)
	{
		Blockly.Arduino.procedures_ifreturn = function() {
			// Conditionally return value from a procedure.
			var condition = Blockly.Arduino.valueToCode(this, 'CONDITION',Blockly.Arduino.ORDER_NONE) || '';
			var code = '';

			code += 'if (' + condition + ') {\n';
			// if (this.hasReturnValue_) {
			var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
			code += '  return (' + value + ');\n';
			// } else {
			//	 code += '  return;\n';
			// }
			code += '}\n';
			return code;
		};



		Blockly.Blocks.procedures_ifreturn = {
			// Conditionally return value from a procedure.
			category: Facilino.locales.getKey('LANG_CATEGORY_PROCEDURES'),
			helpUrl: Facilino.getHelpUrl('procedures_ifreturn'),
			examples: ['procedures_ifreturn_example'],
			category_colour: Facilino.LANG_COLOUR_PROCEDURES,
			colour: Facilino.LANG_COLOUR_PROCEDURES,
			keys: ['LANG_PROCEDURES_IF_RETURN_NAME','LANG_PROCEDURES_IF_RETURN_DESCRIPTION','LANG_PROCEDURES_IF_RETURN_INPUT_IF','LANG_PROCEDURES_IF_RETURN_INPUT_RETURN','LANG_CONTROLS_IF_MSG_IF','LANG_PROCEDURES_DEFRETURN_RETURN','LANG_PROCEDURES_IFRETURN_TOOLTIP','LANG_PROCEDURES_IFRETURN_WARNING'],
			name: Facilino.locales.getKey('LANG_PROCEDURES_IF_RETURN_NAME'),
			description: Facilino.locales.getKey('LANG_PROCEDURES_IF_RETURN_DESCRIPTION'),
			additional: ['procedures_defreturn'],
			inputs: [Facilino.locales.getKey('LANG_PROCEDURES_IF_RETURN_INPUT_IF'),Facilino.locales.getKey('LANG_PROCEDURES_IF_RETURN_INPUT_RETURN')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_PROCEDURES);
				this.appendValueInput('CONDITION').setCheck(Boolean).appendField(Facilino.locales.getKey('LANG_CONTROLS_IF_MSG_IF')).setCheck([Boolean,'VARIABLES']);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_RETURN'));
				this.appendValueInput('VALUE').setCheck([Boolean,Number,String,'Variable']);
				this.setInputsInline(true,'function');
				this.setPreviousStatement(true,'function');
				this.setNextStatement(true);
				this.setTooltip(Facilino.locales.getKey('LANG_PROCEDURES_IFRETURN_TOOLTIP'));
				this.hasReturnValue_ = true;
			},
			mutationToDom: function() {
				// Save whether this block has a return value.
				var container = document.createElement('mutation');
				container.setAttribute('value', Number(this.hasReturnValue_));
				return container;
			},
			domToMutation: function(xmlElement) {
				// Restore whether this block has a return value.
				var value = xmlElement.getAttribute('value');
				this.hasReturnValue_ = (value === 1);
				// if (!this.hasReturnValue_) {
				//	 this.removeInput('VALUE');
				// }
			},
			onchange: function() {
				if (!this.workspace) {
					// Block has been deleted.
					return;
				}
				var legal = false;
				// Is the block nested in a procedure?
				var block = this;
				do {
					if (block.type === 'procedures_defreturn') {
						legal = true;
						break;
					}
					block = block.getSurroundParent();
				} while (block);
				if (legal) {
					// If needed, toggle whether this block has a return value.
					// if (block.type === 'procedures_defnoreturn' && this.hasReturnValue_) {
					//	 this.removeInput('VALUE');
					//	 this.hasReturnValue_ = false;
					// } else if (block.type === 'procedures_defreturn' && !this.hasReturnValue_) {
					//	 this.appendValueInput('VALUE');
					//	 this.hasReturnValue_ = true;
					// }
					this.setWarningText(null);
				} else {
					try {
						this.setWarningText(Facilino.locales.getKey('LANG_PROCEDURES_IFRETURN_WARNING'));
					} catch (err) {
						console.log('Captured error: ', err);
					}
				}
			}
		};

		// Source: src/blocks/procedures_return/procedures_return.js
		Blockly.Arduino.procedures_return = function() {
			// Conditionally return value from a procedure.
			var code = '';
			var value = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE) || '';
			code += '  return (' + value + ');\n';
			return code;
		};



		Blockly.Blocks.procedures_return = {
			// Conditionally return value from a procedure.
			category: Facilino.locales.getKey('LANG_CATEGORY_PROCEDURES'),
			helpUrl: Facilino.getHelpUrl('procedures_return'),
			examples: ['procedures_return_example'],
			category_colour: Facilino.LANG_COLOUR_PROCEDURES,
			colour: Facilino.LANG_COLOUR_PROCEDURES,
			keys: ['LANG_PROCEDURES_RETURN_NAME','LANG_PROCEDURES_RETURN_DESCRIPTION','LANG_PROCEDURES_RETURN_INPUT_RETURN','LANG_PROCEDURES_RETURN','LANG_PROCEDURES_RETURN_TOOLTIP','LANG_PROCEDURES_IFRETURN_WARNING'],
			name: Facilino.locales.getKey('LANG_PROCEDURES_RETURN_NAME'),
			description: Facilino.locales.getKey('LANG_PROCEDURES_RETURN_DESCRIPTION'),
			additional: ['procedures_defreturn'],
			inputs: [Facilino.locales.getKey('LANG_PROCEDURES_RETURN_INPUT_RETURN')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_PROCEDURES);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_PROCEDURES_RETURN'));
				this.appendValueInput('VALUE').setCheck([Number,String,'Variable']);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'function');
				this.setNextStatement(true,'function');
				this.setTooltip(Facilino.locales.getKey('LANG_PROCEDURES_RETURN_TOOLTIP'));
				this.hasReturnValue_ = true;
			},
			mutationToDom: function() {
				// Save whether this block has a return value.
				var container = document.createElement('mutation');
				container.setAttribute('value', Number(this.hasReturnValue_));
				return container;
			},
			domToMutation: function(xmlElement) {
				// Restore whether this block has a return value.
				var value = xmlElement.getAttribute('value');
				this.hasReturnValue_ = (value === 1);
			},
			onchange: function() {
				if (!this.workspace) {
					// Block has been deleted.
					return;
				}
				var legal = false;
				// Is the block nested in a procedure?
				var block = this;
				do {
					if (block.type === 'procedures_defreturn') {
						legal = true;
						break;
					}
					block = block.getSurroundParent();
				} while (block);
				if (legal) {
					this.setWarningText(null);
				} else {
					try {
						this.setWarningText(Facilino.locales.getKey('LANG_PROCEDURES_IFRETURN_WARNING'));
					} catch (err) {
						console.log('Captured error: ', err);
					}
				}
			}
		};
	}
		


		Blockly.Arduino.procedures_callnoreturn = function() {
			// Call a procedure with a return value.
			var funcName = this.getFieldValue('PROCEDURES');
			var args = [];
			var code = '';
			var a;
			try {
				for (var x = 0; x < this.getVariables(funcName).length; x++) {
					args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || '';

				}
			} catch (e) {}
			var funcArgs = args.join(', ');
			code += JST['procedures_callnoreturn']({'funcName': funcName,'funcArgs': funcArgs});
			return code;
		};
		Blockly.Blocks.procedures_callnoreturn = {
			// Variable getter.
			category: Facilino.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('procedures_callnoreturn'),
			examples: ['procedures_callnoreturn_example'],
			category_colour: Facilino.LANG_COLOUR_PROCEDURES,
			colour: Facilino.LANG_COLOUR_PROCEDURES,
			keys: ['LANG_PROCEDURES_CALLNORETURN_NAME','LANG_PROCEDURES_CALLNORETURN_DESCRIPTION','LANG_PROCEDURES_CALLNORETURN_DROPDOWN_FUNCTION','LANG_PROCEDURES_CALLNORETURN_TOOLTIP','LANG_PROCEDURES_DEFNORETURN_PROCEDURE','LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'],
			name: Facilino.locales.getKey('LANG_PROCEDURES_CALLNORETURN_NAME'),
			description: Facilino.locales.getKey('LANG_PROCEDURES_CALLNORETURN_DESCRIPTION'),
			additional: ['procedures_defnoreturn'],
			dropdown: [Facilino.locales.getKey('LANG_PROCEDURES_CALLNORETURN_DROPDOWN_FUNCTION')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_PROCEDURES);
				this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PROCEDURES_CALLNORETURN_TOOLTIP'));
				this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
				this.quarkConnections_ = null;
				this.quarkArguments_ = null;
				this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
				this.setInputsInline(false);
			},
			validName: function(name) {
				if (name && name.length > 0) {
					var i = 0;
					while (i < name.length) {
						if (!isNaN(parseFloat(name[i]))) {
							name = name.substring(1, name.length);
						} else {
							break;
						}
					}
					name = name.replace(/([ ])/g, '_');
					name = name.replace(/([áàâä])/g, 'a');
					name = name.replace(/([éèêë])/g, 'e');
					name = name.replace(/([íìîï])/g, 'i');
					name = name.replace(/([óòôö])/g, 'o');
					name = name.replace(/([úùûü])/g, 'u');
					name = name.replace(/([ñ])/g, 'n');
					name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\?\?\ç\`\´\¨\^])/g, '');
					i = 0;
					while (i < name.length) {
						if (!isNaN(parseFloat(name[i]))) {
							name = name.substring(1, name.length);
						} else {
							break;
						}
					}
				}
				return name;
			},
			getProcedures: function() {
				var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
				var procedures_dropdown = [];
				if (procedures[0].length > 0) {
					for (var i in procedures[0]) {
						var proc_name = procedures[0][i][0];
						proc_name = this.validName(proc_name);
						procedures_dropdown.push([proc_name, proc_name]);
					}
				} else {
					procedures_dropdown.push([Facilino.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE'), Facilino.locales.getKey('LANG_PROCEDURES_DEFNORETURN_PROCEDURE')]);
				}
				return procedures_dropdown;
			},
			maxVariableNumber: function() {
				var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
				var procedures_dropdown = [];
				var max_num = 0;
				if (procedures[0].length > 0 || procedures[1].length > 0) {
					for (var i in procedures[0]) {
						if (procedures[0][i][1].length > max_num) { // if the length of the variable array is larger than the max_num, equal max_num to that number
							max_num = procedures[0][i][1].length;
						}
					}
					return max_num;
				} else {
					procedures_dropdown.push(['', '']);
				}
			},
			getVariables: function(funcName) {
				try {
					var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
					var procedures_dropdown = [];
					if (procedures[0].length > 0) {
						for (var i in procedures[0]) {
							if (procedures[0][i][0] === funcName) {
								return procedures[0][i][1];
							}
						}
					} else {
						procedures_dropdown.push(['', '']);
					}
				} catch (e) {}
			},
			exists: function() {
				var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
				if (procedures[0].length > 0) {
					for (var i in procedures[0]) {
						if (procedures[0][i][0] === this.getFieldValue('PROCEDURES')) {
							return true;
						}
					}
				} else {
					return false;
				}
			},
			onchange: function() {
				if (!this.workspace) {
					// Block has been deleted.
					return;
				}
				if (this.getFieldValue('PROCEDURES') !== this.last_procedure && this.getFieldValue('PROCEDURES')) {
					this.changeVariables();
					this.last_procedure = this.getFieldValue('PROCEDURES');
					this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
				} else if (this.getVariables(this.getFieldValue('PROCEDURES')) !== this.last_variables) {
					this.addVariables();
					this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
					this.last_procedure = this.getFieldValue('PROCEDURES');
				}
				if (!this.exists()) {
					try {
						this.setWarningText(Facilino.locales.getKey('LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'));
					} catch (e) {}
				} else {
					try {
						this.setWarningText(null);
					} catch (e) {}
				}
			},
			addVariables: function() {
				//console.log(this.getFieldValue('PROCEDURES'));
				var func_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
				//console.log(func_variables);
				var var_num = 0;
				if (func_variables && this.getFieldValue('PROCEDURES')!=='') {
					if (!this.last_variables) {
						this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
					}
					if (func_variables.length >= this.last_variables.length) {
						var_num = func_variables.length;
					} else if (this.last_variables) {
						try {
							var_num = this.last_variables.length;
						} catch (e) {}
					}
					for (var x = 0; x < var_num; x++) {
						if (this.getInput('ARG' + x) === null) {
							this.appendValueInput('ARG' + x).appendField(func_variables[x], 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,Number,String,'Variable']);
						} else {
							if (func_variables[x] && this.getFieldValue('ARG_NAME' + x)) {
								this.setFieldValue(func_variables[x], 'ARG_NAME' + x);
							} else {
								this.removeInput('ARG' + x);
							}
						}
					}
					this.arguments_ = func_variables;
				}
			},
			renameProcedure: function(oldName, newName) {
				if (this.last_procedure) {
					//console.log("Hello, I'm here");
					var procedures = this.getProcedures();
					for (var i in procedures) {
						if (Blockly.Names.equals(oldName, procedures[i][0])) {
							//console.log("Hello, I'm here");
							this.setFieldValue(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
							//this.removeInput('DUMMY');
							//this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
							this.addVariables();
						}
					}
					if (this.last_procedure === oldName) {
						this.last_procedure = newName;
					}
					try {
						this.setFieldValue(this.last_procedure, 'PROCEDURES');
					} catch (e) {}
				}
			},
			changeVariables: function() {
				var func_variables = this.getVariables(this.getFieldValue('PROCEDURES')); //get the variables of the actual function
				//console.log(this.getFieldValue('PROCEDURES'));
				//console.log(func_variables);
				for (var i = 0; i < this.maxVariableNumber(); i++) { // remove all the possible variable inputs
					if (this.getInput('ARG' + i) === null) {
						break;
					}
					this.removeInput('ARG' + i);
				}
				for (var variable in func_variables) {
					this.appendValueInput('ARG' + variable).appendField(func_variables[variable]).setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,Number,String,'Variable']);
				}
				this.arguments_ = func_variables;
			},
			mutationToDom: function() {
				// Save the name and arguments (none of which are editable).
				var container = document.createElement('mutation');
				container.setAttribute('name', this.getFieldValue('PROCEDURES'));
				if (typeof this.arguments_ === 'undefined') {
					this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
				}
				if (typeof this.arguments_ === 'undefined') {
					this.arguments_ = [];
				}
				for (var x = 0; x < this.arguments_.length; x++) {
					var parameter = document.createElement('arg');
					parameter.setAttribute('name', this.arguments_[x]);
					container.appendChild(parameter);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.xmlElement = xmlElement;
				// Restore the name and parameters.
				var name = xmlElement.getAttribute('name');
				this.last_procedure = name;
				this.setFieldValue(name, 'PROCEDURES');
				for (var x = 0; x < xmlElement.childNodes.length; x++) {
					this.appendValueInput('ARG' + x).appendField(xmlElement.childNodes[x].getAttribute('name'), 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,Number,String,'Variable']);
				}
			}
		};

		// Source: src/blocks/procedures_callreturn/procedures_callreturn.js
		Blockly.Arduino.procedures_callreturn = function() {
			// Call a procedure with a return value.
			var funcName = this.getFieldValue('PROCEDURES');
			var args = [];
			var a;
			var code = '';
			for (var x = 0; x < this.getVariables(funcName).length; x++) {
				args[x] = Blockly.Arduino.valueToCode(this, 'ARG' + x, Blockly.Arduino.ORDER_NONE) || 'null';
			}
			var funcArgs = args.join(', ');
			code += JST['procedures_callreturn']({'funcName': funcName,'funcArgs': funcArgs});
			//funcName + '(' + args.join(', ') + ')';
			return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
		};
		Blockly.Blocks.procedures_callreturn = {
			// Variable getter.
			category: Facilino.locales.getKey('LANG_CATEGORY_PROCEDURES'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('procedures_callreturn'),
			examples: ['procedures_callreturn_example'],
			category_colour: Facilino.LANG_COLOUR_PROCEDURES,
			colour: Facilino.LANG_COLOUR_PROCEDURES,
			keys: ['LANG_PROCEDURES_CALLRETURN_NAME','LANG_PROCEDURES_CALLRETURN_DESCRIPTION','LANG_PROCEDURES_CALLRETURN_DROPDOWN_FUNCTION','LANG_PROCEDURES_CALLRETURN_TOOLTIP','LANG_PROCEDURES_DEFRETURN_PROCEDURE','LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'],
			name: Facilino.locales.getKey('LANG_PROCEDURES_CALLRETURN_NAME'),
			description: Facilino.locales.getKey('LANG_PROCEDURES_CALLRETURN_DESCRIPTION'),
			additional: ['procedures_defnoreturn'],
			dropdown: [Facilino.locales.getKey('LANG_PROCEDURES_CALLRETURN_DROPDOWN_FUNCTION')],
			output: Facilino.locales.getKey('LANG_PROCEDURES_CALLRETURN_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_PROCEDURES);
				this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
				this.setOutput(true,[Boolean,Number,'Variable']);
				this.setTooltip(Facilino.locales.getKey('LANG_PROCEDURES_CALLRETURN_TOOLTIP'));
				this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
				this.quarkConnections_ = null;
				this.quarkArguments_ = null;
				this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
				//this.setPreviousStatement(true,'code');
				//this.setNextStatement(true,'code');
			},
			validName: function(name) {
				if (name && name.length > 0) {
					var i = 0;
					while (i < name.length) {
						if (!isNaN(parseFloat(name[i]))) {
							name = name.substring(1, name.length);
						} else {
							break;
						}
					}
					name = name.replace(/([ ])/g, '_');
					name = name.replace(/([áàâä])/g, 'a');
					name = name.replace(/([éèêë])/g, 'e');
					name = name.replace(/([íìîï])/g, 'i');
					name = name.replace(/([óòôö])/g, 'o');
					name = name.replace(/([úùûü])/g, 'u');
					name = name.replace(/([ñ])/g, 'n');
					name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\?\?\ç\`\´\¨\^])/g, '');
					i = 0;
					while (i < name.length) {
						if (!isNaN(parseFloat(name[i]))) {
							name = name.substring(1, name.length);
						} else {
							break;
						}
					}
					for (var j in Blockly.Arduino.RESERVED_WORDS_) {
						var reserved_words = Blockly.Arduino.RESERVED_WORDS_.split(',');
						if (name === reserved_words[j]) {
							this.setWarningText('Reserved word');
							name = '';
							break;
						} else {
							this.setWarningText(null);
						}
					}
				}
				return name;
			},
			getProcedures: function() {
				var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
				var procedures_dropdown = [];
				if (procedures[1].length > 0) {
					for (var i in procedures[1]) {
						var proc_name = procedures[1][i][0];
						proc_name = this.validName(proc_name);
						procedures_dropdown.push([proc_name, proc_name]);
					}
				} else {
					procedures_dropdown.push([Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE'), Facilino.locales.getKey('LANG_PROCEDURES_DEFRETURN_PROCEDURE')]);
				}
				return procedures_dropdown;
			},
			maxVariableNumber: function() {
				var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
				var procedures_dropdown = [];
				var max_num = 0;
				if (procedures[1].length > 0) {
					for (var i in procedures[1]) {
						if (procedures[1][i][1].length > max_num) { // if the length of the variable array is larger than the max_num, equal max_num to that number
							max_num = procedures[1][i][1].length;
						}
					}
					return max_num;
				} else {
					procedures_dropdown.push(['', '']);
				}
			},
			getVariables: function(funcName) {
				try {
					var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
					var procedures_dropdown = [];
					if (procedures[1].length > 0) {
						for (var i in procedures[1]) {
							if (procedures[1][i][0] === funcName) {
								return procedures[1][i][1];
							}
						}
					} else {
						procedures_dropdown.push(['', '']);
					}
				} catch (e) {}
			},
			exists: function() {
				var procedures = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
				if (procedures[1].length > 0) {
					for (var i in procedures[1]) {
						if (procedures[1][i][0] === this.getFieldValue('PROCEDURES')) {
							return true;
						}
					}
				} else {
					return false;
				}
			},
			onchange: function() {
				if (!this.workspace) {
					// Block has been deleted.
					return;
				}
				if (this.getFieldValue('PROCEDURES') !== this.last_procedure && this.getFieldValue('PROCEDURES')) {
					this.changeVariables();
					this.last_procedure = this.getFieldValue('PROCEDURES');
					this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
				} else if (this.getVariables(this.getFieldValue('PROCEDURES')) !== this.last_variables) {
					this.addVariables();
					this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
					this.last_procedure = this.getFieldValue('PROCEDURES');
				}
				if (!this.exists()) {
					try {
						this.setWarningText(Facilino.locales.getKey('LANG_PROCEDURES_CALL_WITHOUT_DEFINITION'));
					} catch (e) {}
				} else {
					try {
						this.setWarningText(null);
					} catch (e) {}
				}
			},
			addVariables: function() {
				var func_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
				var var_num = 0;
				if (func_variables && this.getFieldValue('PROCEDURES')!=='') {
					if (!this.last_variables) {
						this.last_variables = this.getVariables(this.getFieldValue('PROCEDURES'));
					}
					if (func_variables.length >= this.last_variables.length) {
						var_num = func_variables.length;
					} else if (this.last_variables) {
						try {
							var_num = this.last_variables.length;
						} catch (e) {}
					}
					for (var x = 0; x < var_num; x++) {
						if (this.getInput('ARG' + x) === null) {
							this.appendValueInput('ARG' + x).appendField(func_variables[x], 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,Number,String,'Variable']);
						} else {
							if (func_variables[x] && this.getFieldValue('ARG_NAME' + x)) {
								this.setFieldValue(func_variables[x], 'ARG_NAME' + x);
							} else {
								this.removeInput('ARG' + x);
							}
						}
					}
					this.arguments_ = func_variables;
				}
			},
			renameProcedure: function(oldName, newName) {
				if (this.last_procedure) {
					var procedures = this.getProcedures();
					for (var i in procedures) {
						if (Blockly.Names.equals(oldName, procedures[i][0])) {
							//this.removeInput('DUMMY');
							//this.appendDummyInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
							this.setFieldValue(new Blockly.FieldDropdown(this.getProcedures()), 'PROCEDURES');
						}
					}
					if (this.last_procedure === oldName) {
						this.last_procedure = newName;
					}
					try {
						this.setFieldValue(this.last_procedure, 'PROCEDURES');
					} catch (e) {}
				}
			},
			changeVariables: function() {
				var func_variables = this.getVariables(this.getFieldValue('PROCEDURES')); //get the variables of the actual function
				for (var i = 0; i < this.maxVariableNumber(); i++) { // remove all the possible variable inputs
					if (this.getInput('ARG' + i) === null) {
						break;
					}
					this.removeInput('ARG' + i);
				}
				for (var variable in func_variables) {
					this.appendValueInput('ARG' + variable).appendField(func_variables[variable]).setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,Number,String,'Variable']);
				}
				this.arguments_ = func_variables;
			},
			mutationToDom: function() {
				// Save the name and arguments (none of which are editable).
				var container = document.createElement('mutation');
				container.setAttribute('name', this.getFieldValue('PROCEDURES'));
				if (typeof this.arguments_ === 'undefined') {
					this.arguments_ = this.getVariables(this.getFieldValue('PROCEDURES'));
				}
				if (typeof this.arguments_ === 'undefined') {
					this.arguments_ = [];
				}
				for (var x = 0; x < this.arguments_.length; x++) {
					var parameter = document.createElement('arg');
					parameter.setAttribute('name', this.arguments_[x]);
					container.appendChild(parameter);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.xmlElement = xmlElement;
				// Restore the name and parameters.
				var name = xmlElement.getAttribute('name');
				this.last_procedure = name;
				this.setFieldValue(name, 'PROCEDURES');
				for (var x = 0; x < xmlElement.childNodes.length; x++) {
					this.appendValueInput('ARG' + x).appendField(xmlElement.childNodes[x].getAttribute('name'), 'ARG_NAME' + x).setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,Number,String,'Variable']);
				}
			}
		}
	};
		
		
	var FacilinoFunctions = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoFunctions;
	} else {
		window.FacilinoFunctions = FacilinoFunctions;
	}
}));
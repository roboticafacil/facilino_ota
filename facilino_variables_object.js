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
			Blockly.Arduino.variables_object_type = function() {
			// Add statements to setup.
			var objName = this.getFieldValue('OBJ_NAME');
			var content='';
			var contentVariables = Blockly.Arduino.statementToCode(this, 'VARIABLES');
			contentVariables = contentVariables.replace(/&quot;/g, '"');
			var contentMethods = Blockly.Arduino.statementToCode(this, 'METHODS');
			contentMethods = contentMethods.replace(/&quot;/g, '"');
			if (objName)
				Blockly.Arduino.definitions_['declare_var' + objName] = 'class _'+objName + '_t {\n  public:\n' + contentVariables + contentMethods + '};\n_'+objName + '_t '+objName+';\n';
			return '';
		};
		Blockly.Blocks.variables_object_type = {
			// Setup statements.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OBJECTS'),
			helpUrl: Facilino.getHelpUrl('variables_object_type'),
			examples: ['variables_object_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_OBJECT_TYPE_NAME','LANG_VARIABLES_OBJECT_TYPE','LANG_VARIABLES_OBJECT_TYPE_VARIABLES','LANG_VARIABLES_OBJECT_TYPE_METHODS','LANG_VARIABLES_OBJECT_TYPE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_OBJECT_TYPE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_VARIABLES_OBJECT_TYPE')).appendField(new Blockly.FieldTextInput(''),'OBJ_NAME');
				this.appendStatementInput('VARIABLES').appendField(Facilino.locales.getKey('LANG_VARIABLES_OBJECT_TYPE_VARIABLES')).setCheck('object_variables');
				this.appendStatementInput('METHODS').appendField(Facilino.locales.getKey('LANG_VARIABLES_OBJECT_TYPE_METHODS')).setCheck('object_methods');
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_OBJECT_TYPE_TOOLTIP'));
			}
		};

		Blockly.Arduino.variables_object_variables_type = function() {
			// Variable setter.
			var varType = this.getFieldValue('VAR_TYPE');
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
			var varName = this.getFieldValue('VAR') || '';
			var code = '';
			code += varType + ' ' + varName + '=' + varValue + ';\n';
			var objName='';
			var pBlock=this;
			while(pBlock!==null)
			{
				if (pBlock.type==='variables_object_type')
					break;
				pBlock=pBlock.getParent();
			}
			if (pBlock.type==='variables_object_type')
			{
				objName=pBlock.getFieldValue('OBJ_NAME');
				varName=objName+'.'+varName;
			}
			Facilino.variables[varName] = [varType, 'local','variable'];

			return code;
		};
		Blockly.Blocks.variables_object_variables_type = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OBJECTS'),
			helpUrl: Facilino.getHelpUrl('variables_object_variables_type'),
			tags: ['variables'],
			examples: ['variables_object_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_OBJECT_TYPE_VARIABLES_NAME','LANG_VARIABLES_VARIABLES_OJBECT','LANG_VARIABLES_LOCAL_TYPE','LANG_VARIABLES_TYPE_STRING','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_INTEGER_SHORT','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_BOOL','LANG_VARIABLES_TYPE_FLOAT','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_VARIABLES_OJBECT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_OBJECT_TYPE_VARIABLES_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_VARIABLES_VARIABLES_OJBECT')).
				appendField(new Blockly.FieldTextInput(''), 'VAR').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_LOCAL_TYPE')).
				appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_STRING'), 'String'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_CHAR'), 'char'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_SHORT'), 'short'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_BOOL'), 'bool'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
				]), "VAR_TYPE").
				appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS')).setCheck([Boolean,Number,String,'Variable','Array']);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'object_variables');
				this.setNextStatement(true,'object_variables');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_VARIABLES_OJBECT_TOOLTIP'));
			},
			getVars: function() {
				var varName = this.getFieldValue('VAR');
				var objName='';
				var pBlock=this;
				while(pBlock!==null)
				{
					if (pBlock.type==='variables_object_type')
						break;
					pBlock=pBlock.getParent();
				}
				if (pBlock.type==='variables_object_type')
				{
					objName=pBlock.getFieldValue('OBJ_NAME');
					varName=objName+'.'+varName;
				}
				return [this.getFieldValue('VAR'),varName];
			},
			renameVar: function(oldName, newName) {
				if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
					this.setFieldValue(newName, 'VAR');
				}
			},
			isVariable: function(varValue) {
				for (var i in Blockly.Variables.allVariables()) {
					if (Blockly.Variables.allVariables()[i] === varValue) {
						return true;
					}
				}
				return false;
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
					name = name.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&\Ç\%\=\~\{\}\¿\¡\"\@\:\;\-\"\·\|\º\ª\¨\'\·\̣\─\ç\`\´\¨\^])/g, '');
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
			onchange: function() {
				if (this.last_variable !== this.getFieldValue('VAR')) {
					var name = this.getFieldValue('VAR');
					name = this.validName(name);
					try {
						this.setFieldValue(name, 'VAR');
					} catch (e) {}
					this.last_variable = name;
				}
			}
		};
		
		Blockly.Arduino.variables_procedures_defnoreturn = function() {
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
				'semicolon': ';'
			});
			return code;
		};
		
		Blockly.Blocks.variables_procedures_defnoreturn = {
		category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'),
		subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OBJECTS'),
		helpUrl: Facilino.getHelpUrl('variables_procedures_defnoreturn'),
		examples: ['variables_object_example.bly'],
		category_colour: Facilino.LANG_COLOUR_VARIABLES,
		colour: Facilino.LANG_COLOUR_VARIABLES,
		keys: ['LANG_VARIABLES_OBJECT_METHOD_NO_RETURN_NAME','LANG_VARIABLES_METHODS_OBJECT','LANG_VARIABLES_METHODS_OBJECT_TOOLTIP','LANG_PROCEDURES_DEFNORETURN_DO'],
		name: Facilino.locales.getKey('LANG_VARIABLES_OBJECT_METHOD_NO_RETURN_NAME'),
		init: function() {
		this.setColour(Facilino.LANG_COLOUR_VARIABLES);
		var name = new Blockly.FieldTextInput('',Blockly.Procedures.rename);
		name.setSpellcheck(false);
		this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_VARIABLES_METHODS_OBJECT')).appendField(name,'NAME').appendField('', 'PARAMS');
		this.setMutator(new Blockly.Mutator(['variables_procedures_mutatorarg']));
		if ((this.workspace.options.comments || (this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments)) && Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT) {
			this.setCommentText(Blockly.Msg.PROCEDURES_DEFNORETURN_COMMENT);
		}
		this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_METHODS_OBJECT_TOOLTIP'));
		this.arguments_ = [];
		this.type_arguments_ = [];
		this.setStatements_(true);
		this.setInputsInline(false);
		this.setPreviousStatement(true,'object_methods');
		this.setNextStatement(true,'object_methods');
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
	var containerBlock = workspace.newBlock('variables_procedures_mutatorcontainer');
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
	  var paramBlock = workspace.newBlock('variables_procedures_mutatorarg');
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
	var procName = this.getFieldValue('NAME');
	var objName='';
	var pBlock=this;
	while(pBlock!==null)
	{
		if (pBlock.type==='variables_object_type')
		{
			objName=pBlock.getFieldValue('OBJ_NAME');
			procName=objName+'.'+procName;
			break;
		}
		pBlock=pBlock.getParent();
	}
	return [procName, this.arguments_, false];
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
		  if (block.type == 'variables_procedures_mutatorarg' &&
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

		Blockly.Blocks['variables_procedures_mutatorcontainer'] = {
		colour: Facilino.LANG_COLOUR_VARIABLES,
		keys: ['LANG_PROCEDURES_MUTATORCONTAINER_Field'],
		init: function() {
	this.appendDummyInput()
		.appendField(Facilino.locales.getKey('LANG_PROCEDURES_MUTATORCONTAINER_Field'));
		this.appendStatementInput('STACK').setCheck(['code','function']);
	this.appendDummyInput('STATEMENT_INPUT')
		.appendField(Blockly.Msg.PROCEDURES_ALLOW_STATEMENTS)
		.appendField(new Blockly.FieldCheckbox('TRUE'), 'STATEMENTS');
	this.setColour(Facilino.LANG_COLOUR_VARIABLES);
	this.setTooltip('');
	this.contextMenu = false;
  }
};
		
		
		Blockly.Blocks['variables_procedures_mutatorarg'] = {
			colour: Facilino.LANG_COLOUR_VARIABLES,
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
			this.setColour(Facilino.LANG_COLOUR_VARIABLES);
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
		  validName: Blockly.Blocks.variables_procedures_defnoreturn.validName,
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


		// Source: src/blocks/procedures_defreturn/procedures_defreturn.js
		Blockly.Arduino.variables_procedures_defreturn = function() {
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
			code += JST['procedures_defreturn']({'returnType': returnType,'funcName': funcName,'args': args,'branch': branch,'returnValue': returnValue, 'semicolon': ';'});
			// code=code.replace(/&amp;/g, '');
			return code;
		};

		Blockly.Blocks.variables_procedures_defreturn = {
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OBJECTS'),
			helpUrl: Facilino.getHelpUrl('variables_procedures_defreturn'),
			examples: ['variables_object_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_OBJECT_METHOD_RETURN_NAME','LANG_VARIABLES_METHODS_OBJECT','LANG_PROCEDURES_DEFRETURN_RETURN','LANG_VARIABLES_METHODS_OBJECT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_OBJECT_METHOD_RETURN_NAME'),
			init: function() {
			var nameField = new Blockly.FieldTextInput('',Blockly.Procedures.rename);
			nameField.setSpellcheck(false);
			this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_VARIABLES_METHODS_OBJECT')).appendField(nameField, 'NAME').appendField('', 'PARAMS');
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
			this.setMutator(new Blockly.Mutator(['variables_procedures_mutatorarg']));
			if ((this.workspace.options.comments ||(this.workspace.options.parentWorkspace && this.workspace.options.parentWorkspace.options.comments)) && Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT) {
			  this.setCommentText(Blockly.Msg.PROCEDURES_DEFRETURN_COMMENT);
			}
			this.setColour(Facilino.LANG_COLOUR_VARIABLES);
			this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_METHODS_OBJECT_TOOLTIP'));
			this.arguments_ = [];
			this.type_arguments_ = [];
			this.setStatements_(true);
			this.statementConnection_ = null;
			this.setPreviousStatement(true,'object_methods');
		this.setNextStatement(true,'object_methods');
  },
  isVariable: function(varValue) {
				for (var i in Blockly.Variables.allUsedVariables) {
					if (Blockly.Variables.allUsedVariables[i] === varValue) {
						return true;
					}
				}
				return false;
			},
  setStatements_: Blockly.Blocks['variables_procedures_defnoreturn'].setStatements_,
  updateParams_: Blockly.Blocks['variables_procedures_defnoreturn'].updateParams_,
  mutationToDom: Blockly.Blocks['variables_procedures_defnoreturn'].mutationToDom,
  domToMutation: Blockly.Blocks['variables_procedures_defnoreturn'].domToMutation,
  decompose: Blockly.Blocks['variables_procedures_defnoreturn'].decompose,
  compose: Blockly.Blocks['variables_procedures_defnoreturn'].compose,
  getProcedureDef: function() {
	  var procName = this.getFieldValue('NAME');
	var objName='';
	var pBlock=this;
	while(pBlock!==null)
	{
		if (pBlock.type==='variables_object_type')
		{
			objName=pBlock.getFieldValue('OBJ_NAME');
			procName=objName+'.'+procName;
			break;
		}
		pBlock=pBlock.getParent();
	}
	return [procName, this.arguments_, true];
  },
  getVars: Blockly.Blocks['variables_procedures_defnoreturn'].getVars,
  renameVar: Blockly.Blocks['variables_procedures_defnoreturn'].renameVar,
  callType_: 'procedures_callreturn'
};

		}
	}
	
	var FacilinoVariablesObject = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoVariablesObject;
	} else {
		window.FacilinoVariablesObject = FacilinoVariablesObject;
	}
}));
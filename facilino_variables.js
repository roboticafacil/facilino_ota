(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	Blockly.Arduino.variables_get = function() {
			// Variable setter.
			var varName = this.getFieldValue('VAR') || '';
			if (Facilino.variables[this.getFieldValue('VAR')] !== undefined) {
				this.var_type = Facilino.variables[this.getFieldValue('VAR')][0];
			}
			return [varName, Blockly.Arduino.ORDER_ATOMIC];
		};
		Blockly.Blocks.variables_get = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('variables_get'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_GET_NAME','LANG_VARIABLES_GET','LANG_VARIABLES_GET_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_GET_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendDummyInput('DUMMY').appendField(Facilino.locales.getKey('LANG_VARIABLES_GET'))
					.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
					//.appendField(new Blockly.FieldVariable(' '), 'VAR');
				this.setOutput(true,'Variable');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_GET_TOOLTIP'));
			},
			getVariables: function() {
				var variables = Blockly.Variables.allVariables();
				var dropdown = [];
				if (variables.length > 0) {
					for (var i in variables) {
						dropdown.push([variables[i], variables[i]]);
					}
				} else {
					dropdown.push(['', '']);
				}
				return dropdown;
			},
			onchange: function() {
				 if (!this.workspace) {
					 // Block has been deleted.
					 return;
				 }
				 this.last_variable=this.getFieldValue('VAR');
				 if (!this.last_variables){
					 //this.last_variables=Blockly.Variables.allVariables();
					 this.last_variables=[];
				 }
				 var variables=Blockly.Variables.allVariables();
				 for (var i=0;i<variables.length;i++){
					 if ((variables[i]!==this.last_variables[i])||(variables.length!==this.last_variables.length)){
						 this.getInput('DUMMY').removeField('VAR');
						 this.getInput('DUMMY').appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR');
						 this.setFieldValue(this.last_variable, 'VAR');
						 this.last_variables=variables;
					 }
				 }
				try {
					if (!this.exists()) {
						this.setWarningText(Facilino.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
					} else {
						if (this.getFieldValue('VAR')==='value')
						{
							var in_get_instruction=false;
							var block =this.getParent();
							while(block!==null)
							{
								//console.log(block);
								if (block.type==='communications_wifi_iot_thingsboard_rpc')
								{
									in_get_instruction=true;
									break;
								}
								else if (block.type==='communications_wifi_iot_amazon_echo')
								{
									in_get_instruction=true;
									break;
								}
								block=block.getParent();
							}
							if (in_get_instruction)
								this.setWarningText(null);
							else
								this.setWarningText(Facilino.locales.getKey('LANG_CONTROLS_REMOTE_GET_WARNING'));
						}
						else
						  this.setWarningText(null);
					}
				} catch (e) {}
			},
			renameVar: function(oldName, newName) {
				if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
					this.setTitleValue(newName, 'VAR');
				}
			},
			exists: function() {
				var variables = Blockly.Variables.allVariables();
				for (var i=0;i<variables.length;i++) {
					if (variables[i] === this.getFieldValue('VAR')) {
						return true;
					}
				}
				return false;
			}
		};

		Blockly.Arduino.variables_set = function() {
			// Variable setter.
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
			var varName = this.getFieldValue('VAR') || '';
			var code = '';
			code += JST['variables_set']({'varName': varName,'varValue': varValue});
			return code;
		};
		Blockly.Blocks.variables_set = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('variables_set'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_SET_NAME','LANG_VARIABLES_SET','LANG_VARIABLES_SET_AS','LANG_VARIABLES_SET_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_SET_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_VARIABLES_SET'))
					.appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR').appendField(Facilino.locales.getKey('LANG_VARIABLES_SET_AS')).setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,Number,String,'Variable']);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_SET_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="VALUE"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value>','<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value>'];
			},
			getVariables: function() {
				var variables = Blockly.Variables.allVariables();
				var dropdown = [];
				if (variables.length > 0) {
					for (var i in variables) {
						dropdown.push([variables[i], variables[i]]);
					}
				} else {
					dropdown.push(['', '']);
				}
				return dropdown;
			},
			onchange: function() {
				if (!this.workspace) {
					// Block has been deleted.
					return;
				}
				this.last_field_value=this.getFieldValue('VAR');
				if (!this.last_variables){
					this.last_variables=Blockly.Variables.allVariables();
				}
				var variables=Blockly.Variables.allVariables();
				for (var i in variables){
					 if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
						 this.getInput('VALUE').removeField('VAR');
						 this.new_field=new Blockly.FieldDropdown(this.getVariables());
						 this.new_field.setValue(this.last_field_value);
						 this.getInput('VALUE').insertFieldAt(1,this.new_field,'VAR');
						 //this.getInput('VALUE').insertFieldAt(1,this.last_field,'VAR');
						 this.last_variables=Blockly.Variables.allVariables();
					 }
				 }
				try {
					if (!this.exists()) {
						this.setWarningText(Facilino.locales.getKey('LANG_VARIABLES_CALL_WITHOUT_DEFINITION'));
					} else {
						this.setWarningText(null);
					}
				} catch (e) {}
			},
			renameVar: function(oldName, newName) {
				if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
					this.setTitleValue(newName, 'VAR');
				}
			},
			exists: function() {
				for (var i in Blockly.Variables.allVariables()) {
					if (Blockly.Variables.allVariables()[i] === this.getFieldValue('VAR')) {
						return true;
					}
				}
				return false;
			}
		};

		// Source: src/blocks/variables_local/variables_local.js
		Blockly.Arduino.variables_local = function() {
			// Variable setter.
			var varType;
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
			var varName = this.getFieldValue('VAR') || '';
			var sufix = '';
			var code = '';
			var isFunction = false;
			for (var i in Blockly.Arduino.definitions_) {
				if (Blockly.Arduino.definitions_[i].search(varValue + ' \\(') >= 0) {
					isFunction = true;
					break;
				}
			}
			if (varValue.search('"') >= 0 || varValue.search('substring\\(') >= 0) {
				varType = 'String';
				code += varType + ' ' + varName + '=' + varValue + ';\n';
			} else if (isFunction) { //varValue.search('\\(') >= 0 && varValue.search('\\)') >= 0) {
				for (i in Blockly.Arduino.definitions_) {
					if (Blockly.Arduino.definitions_[i].search(varValue) >= 0) {
						if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
							if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
								varType = 'int *';
							} else {
								varType = 'int';
							}
						} else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
							varType = 'String';
						} else {
							varType = '';
						}
						code += varType + ' ' + varName + '=' + varValue + ';\n';
					}
				}
			} else if (varValue[0] === '{') {
				varType = 'int *';
				varValue = varValue.replace('{', '');
				varValue = varValue.replace('}', '');
				varValue = varValue.split(',');
				code += varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
				// code += varType + varName + ';\n';
				code += varName + '[0]=' + varValue[0] + ';\n' + varName + '[1]=' + varValue[1] + ';\n' + varName + '[2]=' + varValue[2] + ';\n';
			} else if (this.isVariable(varValue)) {
				varType = Facilino.variables[varValue][0];
				code += varType + ' ' + varName + '=' + varValue + ';\n';
			} else if (varValue.search('readJoystick') >= 0) {
				varType = 'int *';
				code += varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
				code += varName + '=' + varValue + ';\n';
			} else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (!isNaN(parseFloat(varValue))) || (varValue.search('random') >= 0) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('\\+'))) {
				varType = 'int';
				code += varType + ' ' + varName + sufix + '=' + varValue + ';\n';
			} else if ((varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0)) {
				varType = 'int';
				code += varType + ' ' + varName + sufix + '=' + varValue + ';\n';
			}
			else {
				varType = 'unknown';
				code += varType + ' ' + varName + '=' + varValue + ';\n';
			}

			Facilino.variables[varName] = [varType, 'local','variable'];

			return code;
		};
		Blockly.Blocks.variables_local = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('variables_local'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_LOCAL_NAME','LANG_VARIABLES_LOCAL','LANG_VARIABLES_LOCAL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_LOCAL_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_VARIABLES_LOCAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(Facilino.locales.getKey('LANG_VARIABLES_LOCAL_EQUALS')).setCheck([Boolean,Number,String,'Variable','Array']);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.last_variable='';
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value>'];
			},
			getVars: function() {
				return [this.getFieldValue('VAR')];
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
		
		

		// Source: src/blocks/variables_global/variables_global.js
		Blockly.Arduino.variables_global = function() {
			// Variable setter.
			var varType;
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
			var varName = this.getFieldValue('VAR') || '';
			var isFunction = false;
			for (var i in Blockly.Arduino.definitions_) {
				if (Blockly.Arduino.definitions_[i].search(varValue + ' \\(') >= 0) {
					isFunction = true;
					break;
				}
			}
			if (varValue.search('"') >= 0 || varValue.search('substring\\(') >= 0) {
				varType = 'String';
				Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + '=' + varValue + ';';
			} else if (isFunction) { //varValue.search('\\(') >= 0 && varValue.search('\\)') >= 0) {
				for (i in Blockly.Arduino.definitions_) {
					if (Blockly.Arduino.definitions_[i].search(varValue) >= 0) {
						if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'int' || Blockly.Arduino.definitions_[i].substring(0, 3) === '//b') { //bqbat function
							if (Blockly.Arduino.definitions_[i].substring(0, 5) === 'int *' || Blockly.Arduino.definitions_[i].substring(0, 5) === 'int _') {
								varType = 'int *';
							} else {
								varType = 'int';
							}
						} else if (Blockly.Arduino.definitions_[i].substring(0, 3) === 'Str') {
							varType = 'String';
						} else {
							varType = '';
						}
						Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + '=' + varValue + ';\n';
						break;
					}
				}
			} else if (varValue[0] === '{') {
				varType = 'int *';
				varValue = varValue.replace('{', '');
				varValue = varValue.replace('}', '');
				varValue = varValue.split(',');
				Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
				// Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + ';\n';
				Blockly.Arduino.setups_['define_var' + varName] = varName + '[0]=' + varValue[0] + ';\n  ' + varName + '[1]=' + varValue[1] + ';\n  ' + varName + '[2]=' + varValue[2] + ';\n';
			} else if (this.isVariable(varValue)) {
				varType = Facilino.variables[varValue][0];
				Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
				Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
			} else if (varValue.search('readJoystick') >= 0) {
				varType = 'int *';
				Blockly.Arduino.definitions_['declare_var' + varName] = varType + varName + '=' + '(int*)malloc(3*sizeof(int));\n';
				Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
			} else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (!isNaN(parseFloat(varValue)) || (varValue.search('random') >= 0)) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
				varType = 'int';
				if (!isNaN(parseFloat(varValue))) {
					Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + '=' + varValue + ';\n';
				} else if ((varValue.search('analogRead') >= 0) || (varValue.search('digitalRead') >= 0) || (varValue.search('Distanc') >= 0) || (varValue.search('random') >= 0) || (varValue.search('map') >= 0) || varValue.search('\\[') >= 0 || (varValue.search('abs') >= 0) || (varValue.search('sqrt') >= 0) || (varValue.search('log') >= 0) || (varValue.search('log') >= 0) || (varValue.search('exp') >= 0) || (varValue.search('pow') >= 0) || (varValue.search('\\+'))) {
					Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';
					Blockly.Arduino.setups_['define_var' + varName] = varName + '=' + varValue + ';\n';
				}
			} else {
				varType = 'unknown';
				Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + '=' + varValue + ';\n';
			}
			Facilino.variables[varName] = [varType, 'global','variable'];

			return '';
		};
		Blockly.Blocks.variables_global = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('variables_global'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_GLOBAL','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_GLOBAL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS')).setCheck([Boolean,Number,String,'Variable','Array']);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				//this.setPreviousStatement(false);
				//this.setNextStatement(false);
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<value name="VALUE"><shadow type="text"><field name="TEXT"></field></shadow></value>'];
			},
			getVars: Blockly.Blocks.variables_local.getVars,
			renameVar: Blockly.Blocks.variables_local.renameVar,
			isVariable: Blockly.Blocks.variables_local.isVariable,
			validName: Blockly.Blocks.variables_local.validName,
			onchange: Blockly.Blocks.variables_local.onchange
		};


		Blockly.Arduino.variables_local_type = function() {
			// Variable setter.
			var varType = this.getFieldValue('VAR_TYPE');
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
			var varName = this.getFieldValue('VAR') || '';
			var code = '';


			code += varType + ' ' + varName + '=' + varValue + ';\n';

			Facilino.variables[varName] = [varType, 'local','variable'];

			return code;
		};
		Blockly.Blocks.variables_local_type = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('variables_local_type'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_LOCAL_TYPE_NAME','LANG_VARIABLES_LOCAL','LANG_VARIABLES_LOCAL_TYPE','LANG_VARIABLES_TYPE_STRING','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_INTEGER_SHORT','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_BOOL','LANG_VARIABLES_TYPE_FLOAT','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_LOCAL_TOOLTIP2'],
			name: Facilino.locales.getKey('LANG_VARIABLES_LOCAL_TYPE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_VARIABLES_LOCAL')).
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
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP2'));
			},
			default_inputs: function()
			{
				return ['<value name="VALUE"><shadow type="character"><field name="TEXT">c</field></shadow></value><field name="VAR_TYPE">char</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">32767</field></shadow></value><field name="VAR_TYPE">short</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">2147483647</field></shadow></value><field name="VAR_TYPE">long</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">255</field></shadow></value><field name="VAR_TYPE">byte</field>','<value name="VALUE"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><field name="VAR_TYPE">bool</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">1.2</field></shadow></value><field name="VAR_TYPE">float</field>'];
			},
			getVars: Blockly.Blocks.variables_local.getVars,
			renameVar: Blockly.Blocks.variables_local.renameVar,
			isVariable: Blockly.Blocks.variables_local.isVariable,
			validName: Blockly.Blocks.variables_local.validName,
			onchange: Blockly.Blocks.variables_local.onchange
		};


		// Source: src/blocks/variables_global_type/variables_global_type.js
		Blockly.Arduino.variables_global_type = function() {
			// Variable setter.
			var varType = this.getFieldValue('VAR_TYPE');
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
			var varName = this.getFieldValue('VAR') || '';
			var isFunction = false;

			var varName = this.getFieldValue('VAR') || '';
			var code = '';

			Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + '=' + varValue + ';\n';

			Facilino.variables[varName] = [varType, 'global','variable'];

			return '';
		};

		Blockly.Blocks.variables_global_type = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('variables_global_type'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_GLOBAL_TYPE_NAME','LANG_VARIABLES_GLOBAL','LANG_VARIABLES_GLOBAL_TYPE','LANG_VARIABLES_TYPE_STRING','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_INTEGER_SHORT','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_BOOL','LANG_VARIABLES_TYPE_FLOAT','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_GLOBAL_TOOLTIP2'],
			name: Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_TYPE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL')).
				appendField(new Blockly.FieldTextInput(''), 'VAR').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_TYPE')).
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
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP2'));
			},
			default_inputs: function()
			{
				return ['<value name="VALUE"><shadow type="character"><field name="TEXT">c</field></shadow></value><field name="VAR_TYPE">char</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">32767</field></shadow></value><field name="VAR_TYPE">short</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">2147483647</field></shadow></value><field name="VAR_TYPE">long</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">255</field></shadow></value><field name="VAR_TYPE">byte</field>','<value name="VALUE"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><field name="VAR_TYPE">bool</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">1.2</field></shadow></value><field name="VAR_TYPE">float</field>'];
			},
			getVars: function() {
				return [this.getFieldValue('VAR')];
			},
			renameVar: function(oldName, newName) {
				if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
					this.setFieldValue(newName, 'VAR');
				}
			},
			isVariable: Blockly.Blocks.variables_local.isVariable,
			onchange: Blockly.Blocks.variables_local.onchange,
			validName: Blockly.Blocks.variables_local.validName
		};
		
		Blockly.Arduino.variables_local_custom_type = function() {
			var varType = this.getFieldValue('VAR_TYPE');
			var varName = this.getFieldValue('VAR') || '';
			var code = '';
			code += varType + ' ' + varName + ';\n';
			Facilino.variables[varName] = [varType, 'local','variable'];
			return code;
		};
		Blockly.Blocks.variables_local_custom_type = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('variables_local_custom_type'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_LOCAL_CUSTOM_TYPE_NAME','LANG_VARIABLES_LOCAL','LANG_VARIABLES_LOCAL_TOOLTIP3'],
			name: Facilino.locales.getKey('LANG_VARIABLES_LOCAL_CUSTOM_TYPE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_VARIABLES_LOCAL')).
				appendField(new Blockly.FieldTextInput(''), 'VAR').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_LOCAL_TYPE')).
				appendField(new Blockly.FieldTextInput(''), 'VAR_TYPE');
				

				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.varName='';
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP3'));
			},
			getVars: function() {
				if (this.varName!=='')
					return [this.varName];
				else
					return [];
			}
		};
		
		Blockly.Arduino.variables_global_custom_type = function() {
			var varType = this.getFieldValue('VAR_TYPE');
			var varName = this.getFieldValue('VAR') || '';
			var isFunction = false;

			var varName = this.getFieldValue('VAR') || '';
			var code = '';

			Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName + ';\n';

			Facilino.variables[varName] = [varType, 'global','variable'];

			return '';
		};

		Blockly.Blocks.variables_global_custom_type = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('variables_global_custom_type'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_GLOBAL_CUSTOM_TYPE_NAME','LANG_VARIABLES_GLOBAL','LANG_VARIABLES_GLOBAL_TOOLTIP3'],
			name: Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_CUSTOM_TYPE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendDummyInput('').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL')).
				appendField(new Blockly.FieldTextInput(''), 'VAR').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_TYPE')).
				appendField(new Blockly.FieldTextInput(''), 'VAR_TYPE');
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.varName='';
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_TOOLTIP3'));
			},
			getVars: function() {
				if (this.varName!=='')
					return [this.varName];
				else
					return [];
			}
		};

		if (window.FacilinoAdvanced===true)
		{

		Blockly.Arduino.variables_global_volatile_type = function() {
			// Variable setter.
			var varType = this.getFieldValue('VAR_TYPE');
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
			var varName = this.getFieldValue('VAR') || '';
			var isFunction = false;

			var varName = this.getFieldValue('VAR') || '';
			var code = '';

			Blockly.Arduino.definitions_['declare_var' + varName] = 'volatile ' + varType + ' ' + varName + '=' + varValue + ';\n';
			Facilino.variables[varName] = ['volatile ' + varType, 'global','variable'];

			return '';
		};

		Blockly.Blocks.variables_global_volatile_type = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			helpUrl: Facilino.getHelpUrl('variables_global_volatile_type'),
			tags: ['variables'],
			examples: ['variables_global_volatile_type_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_GLOBAL_VOLATILE_TYPE_NAME','LANG_VARIABLES_GLOBAL_VOLATILE','LANG_VARIABLES_GLOBAL_TYPE','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_INTEGER_SHORT','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_BOOL','LANG_VARIABLES_TYPE_FLOAT','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_GLOBAL_VOLATILE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_VOLATILE_TYPE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_VOLATILE')).
				appendField(new Blockly.FieldTextInput(''), 'VAR').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_TYPE')).
				appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_SHORT'), 'short'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_BOOL'), 'bool'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
				]), "VAR_TYPE").
				appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS')).setCheck([Boolean,Number,String,'Variable','Array']);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_VOLATILE_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value><field name="VAR_TYPE">int</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">32767</field></shadow></value><field name="VAR_TYPE">short</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">2147483647</field></shadow></value><field name="VAR_TYPE">long</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">255</field></shadow></value><field name="VAR_TYPE">byte</field>','<value name="VALUE"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value><field name="VAR_TYPE">bool</field>','<value name="VALUE"><shadow type="math_number"><field name="NUM">1.2</field></shadow></value><field name="VAR_TYPE">float</field>'];
			},
			getVars: function() {
				return [this.getFieldValue('VAR')];
			},
			renameVar: function(oldName, newName) {
				if (Blockly.Names.equals(oldName, this.getFieldValue('VAR'))) {
					this.setFieldValue(newName, 'VAR');
				}
			},
			isVariable: Blockly.Blocks.variables_local.isVariable,
			onchange: Blockly.Blocks.variables_local.onchange,
			validName: Blockly.Blocks.variables_local.validName
		};
		}
	}
	
	var FacilinoVariables = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoVariables;
	} else {
		window.FacilinoVariables = FacilinoVariables;
	}
}));
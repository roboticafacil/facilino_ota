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
		Blockly.Arduino.variables_get_1Darray = function() {
			// Variable setter.
			var varName = this.getFieldValue('VAR') || '';
			var index = Blockly.Arduino.valueToCode(this, 'INDEX', Blockly.Arduino.ORDER_NONE);
			if (Facilino.variables[this.getFieldValue('VAR')] !== undefined) {
				this.var_type = Facilino.variables[this.getFieldValue('VAR')][0];
			}
			varName+='['+index+']';
			return [varName, Blockly.Arduino.ORDER_ATOMIC];
		};
		Blockly.Blocks.variables_get_1Darray = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('variables_get_1Darray'),
			tags: ['variables'],
			examples: ['array_example1.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_GET_ARRAY_NAME','LANG_VARIABLES_GET','LANG_VARIABLES_ARRAY_INDEX','LANG_VARIABLES_GET_TOOLTIP','LANG_VARIABLES_CALL_WITHOUT_DEFINITION'],
			name: Facilino.locales.getKey('LANG_VARIABLES_GET_ARRAY_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('INDEX').appendField(Facilino.locales.getKey('LANG_VARIABLES_GET')).appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR').appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_INDEX')).setCheck([Number,'Variable']);
				this.setOutput(true,'Variable');
				this.setInputsInline(true);
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_GET_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="INDEX"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
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
				 this.last_index=this.getFieldValue('INDEX');
				 if (!this.last_variables){
					 //this.last_variables=Blockly.Variables.allVariables();
					 this.last_variables=[];
				 }
				 var variables=Blockly.Variables.allVariables();
				 for (var i=0;i<variables.length;i++){
					 if ((variables[i]!==this.last_variables[i])||(variables.length!==this.last_variables.length)){
						 this.getInput('INDEX').removeField('VAR');
						 this.new_field=new Blockly.FieldDropdown(this.getVariables());
						 this.new_field.setValue(this.last_variable);
						 this.getInput('INDEX').insertFieldAt(1,this.new_field,'VAR');
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
				var variables = Blockly.Variables.allVariables();
				for (var i=0;i<variables.length;i++) {
					if (variables[i] === this.getFieldValue('VAR')) {
						return true;
					}
				}
				return false;
			}
		};

		Blockly.Arduino.variables_set_1Darray = function() {
			// Variable setter.
			var index = Blockly.Arduino.valueToCode(this, 'INDEX', Blockly.Arduino.ORDER_NONE) || '';
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT) || '';
			var varName = this.getFieldValue('VAR') || '';
			var code = '';
			varName+='['+index+']';
			code += JST['variables_set']({
				'varName': varName,
				'varValue': varValue
			});
			return code;
		};
		Blockly.Blocks.variables_set_1Darray = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('variables_set_1Darray'),
			tags: ['variables'],
			examples: ['array_example1.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_SET_ARRAY_NAME','LANG_VARIABLES_SET','LANG_VARIABLES_ARRAY_INDEX','LANG_VARIABLES_SET_AS','LANG_VARIABLES_SET_TOOLTIP','LANG_VARIABLES_CALL_WITHOUT_DEFINITION'],
			name: Facilino.locales.getKey('LANG_VARIABLES_SET_ARRAY_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('INDEX').appendField(Facilino.locales.getKey('LANG_VARIABLES_SET')).appendField(new Blockly.FieldDropdown(this.getVariables()), 'VAR').appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_INDEX')).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_VARIABLES_SET_AS')).setAlign(Blockly.ALIGN_RIGHT).setCheck([Boolean,Number,'Variable']);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_SET_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="INDEX"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="VALUE"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			},
			getVariables: Blockly.Blocks.variables_set.getVariables,
			renameVar: Blockly.Blocks.variables_set.renameVar,
			exists: Blockly.Blocks.variables_set.exists,
			onchange: function() {
				if (!this.workspace) {
					// Block has been deleted.
					return;
				}
				this.last_field_value=this.getFieldValue('VAR');
				//this.last_index_value=this.getFieldValue('INDEX');
				if (!this.last_variables){
					this.last_variables=Blockly.Variables.allVariables();
				}
				var variables=Blockly.Variables.allVariables();
				for (var i in variables){
					 if (Blockly.Variables.allVariables()[i]!==this.last_variables[i]){
						 this.getInput('INDEX').removeField('VAR');
						 //this.getInput('VALUE').removeField('INDEX');
						 this.new_field=new Blockly.FieldDropdown(this.getVariables());
						 this.new_field.setValue(this.last_field_value);
						 //this.new_field2=new Blockly.FieldNumber(0,0);
						 //this.new_field2.setValue(this.last_index_value);
						 this.getInput('INDEX').insertFieldAt(1,this.new_field,'VAR');
						 //this.getInput('VALUE').insertFieldAt(3,this.new_field2,'INDEX');
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
			}
		};
		// Source: src/blocks/variables_local/variables_local.js
		Blockly.Arduino.variables_local_1DArray = function() {
			// Variable setter.
			var varType = 'int';
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE);
			var varName = this.getFieldValue('VAR') || '';
			var array = this.getInputTargetBlock('VALUE');
			var warning = null;
			var count = 0;
			var code = '';
			if (array!==null)
			{
				if (array.type.includes('math_1DArray_constructor'))
				{
					count = array.itemCount_;
					code += varType + ' ' + varName+'['+count+']='+varValue+';\n';
				}
				else if (array.type==='variables_get')
				{
					var variable = Facilino.variables[array.getFieldValue('VAR')];
					if (variable[2]==='1DArray')
					{
						varType=variable[0];
						count=window.parseInt(variable[3]);
						code += varType + ' ' + varName+'['+count+']={'+varValue+'[0]';
						var i;
						for (i=1;i<count;i++)
						{
							code+=','+varValue+'['+i+']';
						}
						code+='};\n';
					}
					else
					{
						warning = 'Incorrect variable assigment';
					}
				}
				else
				{
					console.log(array.type);
				}
				Facilino.variables[varName] = [varType, 'local','1DArray',count,count*4];
				//Facilino.variables['analogRead(' + varName + ')'] = [varType, 'local','1DArray',count,count*4];
				//Facilino.variables['digitalRead(' + varName + ')'] = [varType, 'local','1DArray',count,count*4];
				this.setWarningText(warning);
			}
			return code;
		};
		Blockly.Blocks.variables_local_1DArray = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('variables_local_1DArray'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_ARRAY_LOCAL_NAME','LANG_VARIABLES_ARRAY_LOCAL','LANG_VARIABLES_LOCAL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_LOCAL_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_LOCAL')).appendField(new Blockly.FieldTextInput(''),'VAR').appendField(Facilino.locales.getKey('LANG_VARIABLES_SET_AS')).setCheck(['Variable','Array']);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_LOCAL_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="VALUE"><shadow type="math_1DArray_constructor2"></shadow></value>';
			},
			getVars: Blockly.Blocks.variables_local.getVars,
			renameVar: Blockly.Blocks.variables_local.renameVar,
			isVariable: Blockly.Blocks.variables_local.isVariable,
			validName: Blockly.Blocks.variables_local.validName,
			onchange: Blockly.Blocks.variables_local.onchange
		};

		// Source: src/blocks/variables_local_type/variables_local_type.js
		Blockly.Arduino.variables_local_1DArray_type = function() {
			// Variable setter.
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE);
			var varType = this.getFieldValue('VAR_TYPE');
			var varName = this.getFieldValue('VAR') || '';
			var array = this.getInputTargetBlock('VALUE');
			var code = '';
			if (array!==null)
			{
				var count = array.itemCount_;
				var byte_count=count;
				var warning = null;

				if (array.type.includes('math_1DArray_constructor'))
				{
					count = array.itemCount_;
					if (varType==='int')
					{
						if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560'))
							byte_count=count*2;
						else if ((Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32'))
							byte_count=count*4;
					}
					else if (varType==='short')
						byte_count=count*2;
					else if (varType==='long')
						byte_count=count*4;
					else if (varType==='byte')
						byte_count=count;
					else if (varType==='bool')
						byte_count=count;
					else if (varType==='float')
						byte_count=count*4;
					else
						byte_count=count;
				}
				else if (array.type==='variables_get')
				{
					//variables_local_1DArray
					var variable = Facilino.variables[array.getFieldValue('VAR')];
					if (variable[2]==='1DArray')
					{
						varType=variable[0];
						count=variable[3];
						if (varType==='int')
							if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560'))
								byte_count=count*2;
							else if ((Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32'))
								byte_count=count*4;
						else if (varType==='short')
							byte_count=count*2;
						else if (varType==='long')
							byte_count=count*4;
						else if (varType==='byte')
							byte_count=count;
						else if (varType==='bool')
							byte_count=count;
						else if (varType==='float')
							byte_count=count*4;
						else
							byte_count=count;
					}
					else
					{
						warning = 'Incorrect variable assigment';
					}
				}
				else
				{
					console.log(array.type);
				}
				code += varType + ' ' + varName+'['+array.itemCount_+']='+varValue+';\n';
				Facilino.variables[varName] = [varType, 'local','1DArray',count,byte_count];
				//Facilino.variables['analogRead(' + varName + ')'] = [varType, 'local','1DArray',count,byte_count];
				//Facilino.variables['digitalRead(' + varName + ')'] = [varType, 'local','1DArray',count,byte_count];
				this.setWarningText(warning);
			}
			return code;
		};
		Blockly.Blocks.variables_local_1DArray_type = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('variables_local_1DArray_type'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_ARRAY_LOCAL_TYPE_NAME','LANG_VARIABLES_ARRAY_LOCAL','LANG_VARIABLES_LOCAL_TYPE','LANG_VARIABLES_TYPE_STRING','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_INTEGER_SHORT','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_BOOL','LANG_VARIABLES_TYPE_FLOAT','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_LOCAL_TOOLTIP2'],
			name: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_LOCAL_TYPE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_LOCAL')).
				appendField(new Blockly.FieldTextInput(''), 'VAR').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_LOCAL_TYPE')).
				appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER'), 'int'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_SHORT'), 'short'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_INTEGER_LONG'), 'long'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE'), 'byte'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_BOOL'), 'bool'],
					[Facilino.locales.getKey('LANG_VARIABLES_TYPE_FLOAT'), 'float']
				]), "VAR_TYPE").appendField(Facilino.locales.getKey('LANG_VARIABLES_LOCAL_EQUALS')).setCheck(['Variable','Array']);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_LOCAL_TOOLTIP2'));
			},
			default_inputs: function()
			{
				return ['<value name="VALUE"><shadow type="math_1DArray_constructor2"><field name="NUM0">-32768</field><field name="NUM1">32767</field></shadow></value><field name="VAR_TYPE">short</field>','<value name="VALUE"><shadow type="math_1DArray_constructor2"><field name="NUM0">-2147483648</field><field name="NUM1">2147483647</field></shadow></value><field name="VAR_TYPE">long</field>','<value name="VALUE"><shadow type="math_1DArray_constructor2"><field name="NUM0">0</field><field name="NUM1">255</field></shadow></value><field name="VAR_TYPE">byte</field>','<value name="VALUE"><shadow type="math_1DArray_constructor"></shadow></value><field name="VAR_TYPE">bool</field>','<value name="VALUE"><shadow type="math_1DArray_constructor"></shadow></value><field name="VAR_TYPE">float</field>'];
			},
			getVars: Blockly.Blocks.variables_local.getVars,
			renameVar: Blockly.Blocks.variables_local.renameVar,
			isVariable: Blockly.Blocks.variables_local.isVariable,
			validName: Blockly.Blocks.variables_local.validName,
			onchange: Blockly.Blocks.variables_local.onchange
		};

		Blockly.Arduino.variables_global_1DArray = function() {
			// Variable setter.
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE);
			var varType;
			var varName = this.getFieldValue('VAR') || '';
			var isFunction = false;
			var array = this.getInputTargetBlock('VALUE');
			if (array!==null)
			{
				varType = 'int';
				Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName+'['+array.itemCount_+']='+varValue+';\n';
				Facilino.variables[varName] = [varType, 'global','1DArray'];
				Facilino.variables['analogRead(' + varName + ')'] = [varType, 'global','1DArray',array.itemCount_,array.itemCount_*4];
				Facilino.variables['digitalRead(' + varName + ')'] = [varType, 'global','1DArray',array.itemCount_,array.itemCount_*4];
			}
			return '';
		};

		Blockly.Blocks.variables_global_1DArray = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('variables_global_1DArray'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_ARRAY_GLOBAL_NAME','LANG_VARIABLES_ARRAY_GLOBAL','LANG_VARIABLES_ARRAY_GLOBAL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_GLOBAL_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_GLOBAL')).appendField(new Blockly.FieldTextInput(''), 'VAR').appendField(Facilino.locales.getKey('LANG_VARIABLES_LOCAL_EQUALS')).setCheck(['Variable','Array']);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_GLOBAL_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="VALUE"><shadow type="math_1DArray_constructor2"></shadow></value>';
			},
			getVars: Blockly.Blocks.variables_local.getVars,
			renameVar: Blockly.Blocks.variables_local.renameVar,
			isVariable: Blockly.Blocks.variables_local.isVariable,
			validName: Blockly.Blocks.variables_local.validName,
			onchange: Blockly.Blocks.variables_local.onchange
		};

		Blockly.Arduino.variables_global_1DArray_type = function() {
			// Variable setter.
			var varType = this.getFieldValue('VAR_TYPE');
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_NONE);
			var varName = this.getFieldValue('VAR') || '';
			var isFunction = false;
			var array = this.getInputTargetBlock('VALUE');
			if (array!==null)
			{
				var varName = this.getFieldValue('VAR') || '';
				var code = '';

				Blockly.Arduino.definitions_['declare_var' + varName] = varType + ' ' + varName+'['+array.itemCount_+']='+varValue+';\n';
				var byte_count=array.itemCount_;
				if (varType==='int')
				{
					if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560'))
							byte_count=array.itemCount_*2;
					else if ((Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32'))
						byte_count=array.itemCount_*4;
				}
				else if (varType==='short')
					byte_count=array.itemCount_*2;
				else if (varType==='long')
					byte_count=array.itemCount_*4;
				else if (varType==='byte')
					byte_count=array.itemCount_;
				else if (varType==='bool')
					byte_count=array.itemCount_;
				else if (varType==='float')
					byte_count=array.itemCount_*4;
				else
					byte_count=array.itemCount_;
				Facilino.variables[varName] = [varType, 'global','1DArray',array.itemCount_,byte_count];
				Facilino.variables['analogRead(' + varName + ')'] = [varType, 'global','1DArray',array.itemCount_,byte_count];
				Facilino.variables['digitalRead(' + varName + ')'] = [varType, 'global','1DArray',array.itemCount_,byte_count];
			}
			return '';
		};

		Blockly.Blocks.variables_global_1DArray_type = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('variables_global_1DArray_type'),
			tags: ['variables'],
			examples: ['variables_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_ARRAY_GLOBAL_TYPE_NAME','LANG_VARIABLES_ARRAY_GLOBAL','LANG_VARIABLES_GLOBAL_TYPE','LANG_VARIABLES_TYPE_STRING','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_INTEGER_SHORT','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_BOOL','LANG_VARIABLES_TYPE_FLOAT','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_ARRAY_GLOBAL_TOOLTIP2'],
			name: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_GLOBAL_TYPE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_GLOBAL')).
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
				appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS')).setCheck(['Variable','Array']);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_GLOBAL_TOOLTIP2'));
			},
			default_inputs: function()
			{
				return ['<value name="VALUE"><shadow type="math_1DArray_constructor2"><field name="NUM0">-32768</field><field name="NUM1">32767</field></shadow></value><field name="VAR_TYPE">short</field>','<value name="VALUE"><shadow type="math_1DArray_constructor2"><field name="NUM0">-2147483648</field><field name="NUM1">2147483647</field></shadow></value><field name="VAR_TYPE">long</field>','<value name="VALUE"><shadow type="math_1DArray_constructor2"><field name="NUM0">0</field><field name="NUM1">255</field></shadow></value><field name="VAR_TYPE">byte</field>','<value name="VALUE"><shadow type="math_1DArray_constructor"></shadow></value><field name="VAR_TYPE">bool</field>','<value name="VALUE"><shadow type="math_1DArray_constructor"></shadow></value><field name="VAR_TYPE">float</field>'];
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

		Blockly.Arduino.variables_global_volatile_1DArray_type = function() {
			// Variable setter.
			var varType = this.getFieldValue('VAR_TYPE');
			var varValue = Blockly.Arduino.valueToCode(this, 'VALUE', Blockly.Arduino.ORDER_ASSIGNMENT);
			var varName = this.getFieldValue('VAR') || '';
			var isFunction = false;
			var array = this.getInputTargetBlock('VALUE');

			var varName = this.getFieldValue('VAR') || '';
			var code = '';
			if (array!==null)
			{
				Blockly.Arduino.definitions_['declare_var' + varName] = 'volatile ' + varType + ' ' + varName+'['+array.itemCount_+']='+varValue+';\n';
				var byte_count=array.itemCount_;
				if (varType==='int')
				{
					if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560'))
						byte_count=array.itemCount_*2;
					else if ((Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32'))
						byte_count=array.itemCount_*4;
				}
				else if (varType==='short')
					byte_count=array.itemCount_*2;
				else if (varType==='long')
					byte_count=array.itemCount_*4;
				else if (varType==='byte')
					byte_count=array.itemCount_;
				else if (varType==='bool')
					byte_count=array.itemCount_;
				else if (varType==='float')
					byte_count=array.itemCount_*4;
				else
					byte_count=array.itemCount_;
				Facilino.variables[varName] = ['volatile ' + varType, 'global','1DArray',array.itemCount_,byte_count];
				Facilino.variables['analogRead(' + varName + ')'] = [varType, 'global','1DArray',array.itemCount_,byte_count];
				Facilino.variables['digitalRead(' + varName + ')'] = [varType, 'global','1DArray',array.itemCount_,byte_count];
			}
			return '';
		};

		Blockly.Blocks.variables_global_volatile_1DArray_type = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'), // Variables are handled specially.
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARRAYS'),
			helpUrl: Facilino.getHelpUrl('variables_global_volatile_1DArray_type'),
			tags: ['variables'],
			examples: ['variables_global_volatile_type_example.bly'],
			category_colour: Facilino.LANG_COLOUR_VARIABLES,
			colour: Facilino.LANG_COLOUR_VARIABLES,
			keys: ['LANG_VARIABLES_ARRAY_GLOBAL_VOLATILE_NAME','LANG_VARIABLES_ARRAY_GLOBAL_VOLATILE','LANG_VARIABLES_GLOBAL_TYPE','LANG_VARIABLES_TYPE_INTEGER','LANG_VARIABLES_TYPE_INTEGER_LONG','LANG_VARIABLES_TYPE_INTEGER_SHORT','LANG_VARIABLES_TYPE_BYTE','LANG_VARIABLES_TYPE_BOOL','LANG_VARIABLES_TYPE_FLOAT','LANG_VARIABLES_GLOBAL_EQUALS','LANG_VARIABLES_ARRAY_GLOBAL_VOLATILE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_VARIABLES_ARRAY_GLOBAL_VOLATILE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_VARIABLES);
				this.appendValueInput('VALUE').
				appendField(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_GLOBAL_VOLATILE')).
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
				appendField(Facilino.locales.getKey('LANG_VARIABLES_GLOBAL_EQUALS')).setCheck(['Variable','Array']);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setTooltip(Facilino.locales.getKey('LANG_VARIABLES_ARRAY_GLOBAL_VOLATILE_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="VALUE"><shadow type="math_1DArray_constructor2"><field name="NUM0">0</field><field name="NUM1">0</field></shadow></value><field name="VAR_TYPE">int</field>','<value name="VALUE"><shadow type="math_1DArray_constructor2"><field name="NUM0">-32768</field><field name="NUM1">32767</field></shadow></value><field name="VAR_TYPE">short</field>','<value name="VALUE"><shadow type="math_1DArray_constructor2"><field name="NUM0">-2147483648</field><field name="NUM1">2147483647</field></shadow></value><field name="VAR_TYPE">long</field>','<value name="VALUE"><shadow type="math_1DArray_constructor2"><field name="NUM0">0</field><field name="NUM1">255</field></shadow></value><field name="VAR_TYPE">byte</field>','<value name="VALUE"><shadow type="math_1DArray_constructor"></shadow></value><field name="VAR_TYPE">bool</field>','<value name="VALUE"><shadow type="math_1DArray_constructor"></shadow></value><field name="VAR_TYPE">float</field>'];
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
	
	var FacilinoVariablesArray = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoVariablesArray;
	} else {
		window.FacilinoVariablesArray = FacilinoVariablesArray;
	}
}));
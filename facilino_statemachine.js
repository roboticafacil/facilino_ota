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
		Blockly.Arduino.controls_statemachine = function() {
		   var code='';
			var x=0;
			if (this.stateCount_>0){
			  var init_states='{';
			  var false_states='{';
			  for (var x=0;x<(this.stateCount_-1);x++)
			  {
				init_states+=this.stateType_[x]+',';
				false_states+='false,';
			  }
			  init_states+=this.stateType_[this.stateCount_-1]+'}';
			  false_states+='false}';
			  Blockly.Arduino.definitions_['declare_var_state'] = 'bool _states['+this.stateCount_+']='+init_states+';\n';
			  Blockly.Arduino.definitions_['declare_var_condA'] = 'bool _condA['+this.stateCount_+']='+false_states+';\n';
			  Blockly.Arduino.definitions_['declare_var_condD'] = 'bool _condD['+this.stateCount_+']='+false_states+';\n';
			  code+='bool _next_states['+this.stateCount_+'];\n';
			  code+='int _stateCounter;\n';
			  code+='for (_stateCounter=0;_stateCounter<'+this.stateCount_+';_stateCounter++)\n';
			  code+='  _next_states[_stateCounter]=_condA[_stateCounter]|(!_condD[_stateCounter])&_states[_stateCounter];\n';
			  code+='for (_stateCounter=0;_stateCounter<'+this.stateCount_+';_stateCounter++){\n';
			  code+='  _states[_stateCounter]=_next_states[_stateCounter];\n';
			  code+='  _condA[_stateCounter]=false;\n';
			  code+='  _condD[_stateCounter]=false;\n';
			  code+='}\n';
			  for (x = 0; x < this.stateCount_; x++) {
					argument = Blockly.Arduino.statementToCode(this, 'DO' + x);
					code+='if (_states['+x+']){\n  '+argument+'\n}\n';
			  }
			}
			return code;
		};

	Blockly.Blocks.controls_statemachine = {
			// Setup statements.
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_STATEMACHINE'),
			helpUrl: Facilino.getHelpUrl('controls_statemachine'),
			examples: ['controls_statemachine_example1','controls_statemachine_example2','controls_statemachine_example3','controls_statemachine_example4'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL_STATEMACHINE,
			keys: ['LANG_CONTROLS_STATE_MACHINE_NAME','LANG_CONTROLS_STATE_MACHINE_DESCRIPTION','LANG_CONTROLS_STATE_MACHINE_MUTATOR_DESCRIPTION','LANG_CONTROLS_STATE_MACHINE_STATEMENT_STATE','LANG_CONTROLS_STATE_MACHINE_TITLE','LANG_CONTROLS_STATE_MACHINE_TOOLTIP','LANG_CONTROLS_STATE_MACHINE_STATE','LANG_CONTROLS_STATE_MACHINE_INITIAL_STATE','LANG_CONTROLS_DO'],
			name: Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_DESCRIPTION'),
			additional: ['controls_statemachine_transition_state_end','controls_statemachine_transition_state','controls_statemachine_transition_to','controls_statemachine_transition_from'],
			mutator_desc: Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_MUTATOR_DESCRIPTION'),
			mutator_container: 'controls_statemachine_ss',
			mutator_items: ['controls_statemachine_initial_state','controls_statemachine_state'],
			statements: [Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_STATEMENT_STATE')],
			init:  function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL_STATEMACHINE);
		this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_TITLE')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setMutator(new Blockly.Mutator(['controls_statemachine_initial_state','controls_statemachine_state']));
		this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_TOOLTIP'));
				this.stateCount_ = 0;
				this.stateType_ = [];
			},
			isNotDuplicable: true,
			mutationToDom: function() {
				if (!this.stateCount_) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.stateCount_) {
					container.setAttribute('state', this.stateCount_);
				}
				if (this.stateType_) {
					for (var x = 0; x < +this.stateCount_; x++){
						container.setAttribute('type'+x, this.stateType_[x]);
					}
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.stateCount_ = window.parseInt(xmlElement.getAttribute('state'), 10);
				for (var x = 0; x < +this.stateCount_; x++) {
					this.stateType_.push(xmlElement.getAttribute('type'+x));
					if (this.stateType_[x]=='false')
					  this.appendDummyInput('STATE' + x).appendField(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_STATE')+' '+x).setAlign(Blockly.ALIGN_RIGHT);
					else
					  this.appendDummyInput('STATE' + x).appendField(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_INITIAL_STATE')+' '+x).setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('DO' + x).appendField(Facilino.locales.getKey('LANG_CONTROLS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
				Facilino.NumStates=this.stateCount_;
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('controls_statemachine_ss');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 0; x < this.stateCount_; x++) {
					if (this.stateType_[x]=='false')
						  var stateBlock = workspace.newBlock('controls_statemachine_state');
					  else
						  var stateBlock = workspace.newBlock('controls_statemachine_initial_state');
					  stateBlock.initSvg();
					  connection.connect(stateBlock.previousConnection);
					  connection = stateBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect and remove all the state input blocks.
				for (var x = (this.stateCount_)-1; x >= 0; x--) {
					this.removeInput('STATE' + x);
					this.removeInput('DO' + x);
					delete this.stateType_[x];
				}
				//this.transitionCount_ = 0;
				this.stateCount_ = 0;
				this.stateType_= [];
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'controls_statemachine_state':
							var stateInput = this.appendDummyInput('STATE' + this.stateCount_).appendField(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_STATE')+' '+this.stateCount_).setAlign(Blockly.ALIGN_RIGHT);
							var doInput = this.appendStatementInput('DO' + this.stateCount_);
							doInput.appendField(Facilino.locales.getKey('LANG_CONTROLS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
							this.stateCount_++;
							this.stateType_.push('false');
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								stateInput.connection.connect(clauseBlock.valueConnection_);
							}
							if (clauseBlock.statementConnection_) {
								doInput.connection.connect(clauseBlock.statementConnection_);
							}
							break;
						case 'controls_statemachine_initial_state':
							var stateInput = this.appendDummyInput('STATE' + this.stateCount_).appendField(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_INITIAL_STATE')+' '+this.stateCount_).setAlign(Blockly.ALIGN_RIGHT);
							var doInput = this.appendStatementInput('DO' + this.stateCount_);
							doInput.appendField(Facilino.locales.getKey('LANG_CONTROLS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
							this.stateCount_++;
							this.stateType_.push('true');
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								stateInput.connection.connect(clauseBlock.valueConnection_);
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
				Facilino.NumStates= this.stateCount_;
			},
			saveConnections: function(containerBlock) {
				// Store a pointer to any connected child blocks.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				var x = 0;
				//var y = 0;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'controls_statemachine_state':
							var inputState = this.getInput('STATE' + x);
							var inputDo = this.getInput('DO' + x);
							//clauseBlock.valueConnection_ =
							//	inputState && inputState.connection.targetConnection;
							clauseBlock.statementConnection_ =
								inputDo && inputDo.connection.targetConnection;
							x++;
							break;
						case 'controls_statemachine_initial_state':
							var inputState = this.getInput('STATE' + x);
							var inputDo = this.getInput('DO' + x);
							//clauseBlock.valueConnection_ =
							//	inputState && inputState.connection.targetConnection;
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

		Blockly.Blocks.controls_statemachine_ss = {
			// App
			colour: Facilino.LANG_COLOUR_CONTROL_STATEMACHINE,
			keys: ['LANG_CONTROLS_STATE_MACHINE_STATEMACHINE','LANG_CONTROLS_STATE_MACHINE_STATE_TOOLTIP'],
			
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL_STATEMACHINE);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_STATEMACHINE')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('state');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_STATE_TOOLTIP'));
				this.contextMenu = false;
			}
		};

	 Blockly.Blocks.controls_statemachine_initial_state = {
			colour: Facilino.LANG_COLOUR_CONTROL_STATEMACHINE,
			keys: ['LANG_CONTROLS_STATE_MACHINE_INITIAL_STATE','LANG_CONTROLS_STATE_MACHINE_STATE_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL_STATEMACHINE);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_INITIAL_STATE')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'state');
				this.setNextStatement(true,'state');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_STATE_TOOLTIP'));
		this.contextMenu = false;
			}
		};

	Blockly.Blocks.controls_statemachine_state = {
			colour: Facilino.LANG_COLOUR_CONTROL_STATEMACHINE,
			keys: ['LANG_CONTROLS_STATE_MACHINE_STATE','LANG_CONTROLS_STATE_MACHINE_STATE_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL_STATEMACHINE);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_STATE')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'state');
				this.setNextStatement(true,'state');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_STATE_TOOLTIP'));
		this.contextMenu = false;
			}
		};

		Blockly.Arduino.controls_statemachine_transition_state_end = function () {
		var code= this.getFieldValue('TRANSITION_STATE');
			return [code, Blockly.Arduino.ORDER_NONE];
		};

		Blockly.Blocks.controls_statemachine_transition_state_end = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_STATEMACHINE'),
			helpUrl: Facilino.getHelpUrl('controls_statemachine_transition_state_end'),
			examples: ['controls_statemachine_example1','controls_statemachine_example2','controls_statemachine_example3','controls_statemachine_example4'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL_STATEMACHINE,
			keys: ['LANG_CONTROLS_STATE_NAME','LANG_CONTROLS_STATE_DESCRIPTION','LANG_CONTROLS_STATE_DROPDOWN_STATE','LANG_CONTROLS_TRANSITION_STATE','LANG_CONTROLS_STATE_MACHINE_STATE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_STATE_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_STATE_DESCRIPTION'),
			additional: ['controls_statemachine','controls_statemachine_transition_state','controls_statemachine_transition_to','controls_statemachine_transition_from'],
			dropdown: [Facilino.locales.getKey('LANG_CONTROLS_STATE_DROPDOWN_STATE')],
			init:  function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL_STATEMACHINE);
				this.appendDummyInput('TRANSITION_STATE').appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_STATE')).appendField(new Blockly.FieldDropdown(this.getStates()), 'TRANSITION_STATE');
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setInputsInline(true);
				this.setOutput(true,'State');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_STATE_TOOLTIP'));
				this.last_state=-1;
			},
			getStates: function() {
				var states = [['','']];
				for (var x=0;x<Facilino.NumStates;x++)
				{
					var state = [x.toString(),x.toString()];
					states.push(state);
				}
				return states;
			},
			onchange: function() {
				if (!this.workspace) {
					 // Block has been deleted.
					 return;
				 }
				 force_update=0;
				 if (this.last_state!==this.getFieldValue('TRANSITION_STATE'))
					 force_update=1;
				 this.last_state=this.getFieldValue('TRANSITION_STATE');
				 if (!this.last_states){
					 this.last_states=Facilino.getStates();
				 }
				 var states=Facilino.getStates();
				 for (var i in states){
					 if (Facilino.getStates()[i]!==this.last_states[i]||force_update){
						 try{
							 this.removeInput('TRANSITION_STATE');
						 }catch(e){}
						 this.appendDummyInput('TRANSITION_STATE').appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_STATE')).appendField(new Blockly.FieldDropdown(this.getStates()), 'TRANSITION_STATE');
						 this.setFieldValue(this.last_state, 'TRANSITION_STATE');
						 this.last_states=Facilino.getStates();
					 }
				 }
			}
		};

		Blockly.Arduino.controls_statemachine_transition_state = function () {
			var code= Blockly.Arduino.valueToCode(this,'TRANSITION_INPUT',Blockly.Arduino.ORDER_NONE)+','+this.getFieldValue('TRANSITION_STATE');//+'}';
			return [code, Blockly.Arduino.ORDER_NONE];
		};

		Blockly.Blocks.controls_statemachine_transition_state = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_STATEMACHINE'),
			helpUrl: Facilino.getHelpUrl('controls_statemachine_transition_state'),
			examples: ['controls_statemachine_example2'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL_STATEMACHINE,
			keys: ['LANG_CONTROLS_STATE_CONC_NAME','LANG_CONTROLS_STATE_CONC_DESCRIPTION','LANG_CONTROLS_STATE_CONC_INPUT_EXPRESSION','LANG_CONTROLS_STATE_CONC_DROPDOWN_STATE','LANG_CONTROLS_TRANSITION_AND','LANG_CONTROLS_TRANSITION_STATE','LANG_CONTROLS_STATE_MACHINE_STATE_AND_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_STATE_CONC_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_STATE_CONC_DESCRIPTION'),
			additional: ['controls_statemachine','controls_statemachine_transition_state_end','controls_statemachine_transition_to','controls_statemachine_transition_from'],
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_STATE_CONC_INPUT_EXPRESSION')],
			dropdown: [Facilino.locales.getKey('LANG_CONTROLS_STATE_CONC_DROPDOWN_STATE')],
			init:  function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL_STATEMACHINE);
				this.appendValueInput('TRANSITION_INPUT').setCheck('State').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('TRANSITION_STATE').appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_AND')+' '+Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_STATE')).appendField(new Blockly.FieldDropdown(this.getStates()), 'TRANSITION_STATE');
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setInputsInline(true);
				this.setOutput(true,'State');
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_STATE_AND_TOOLTIP'));
				this.last_state=-1;
			},
			getStates: function() {
				var states = [['','']];
				for (var x=0;x<Facilino.NumStates;x++)
				{
					var state = [x.toString(),x.toString()];
					states.push(state);
				}
				return states;
			},
			onchange: function() {
				if (!this.workspace) {
					 // Block has been deleted.
					 return;
				 }
				 force_update=0;
				 if (this.last_state!==this.getFieldValue('TRANSITION_STATE'))
					 force_update=1;
				 this.last_state=this.getFieldValue('TRANSITION_STATE');
				 if (!this.last_states){
					 this.last_states=Facilino.getStates();
				 }
				 var states=Facilino.getStates();
				 for (var i in states){
					 if (Facilino.getStates()[i]!==this.last_states[i]||force_update){
						 try{
							 this.removeInput('TRANSITION_STATE');
						 }catch(e){}
						 this.appendDummyInput('TRANSITION_STATE').appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_AND')+' '+Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_STATE')).appendField(new Blockly.FieldDropdown(this.getStates()), 'TRANSITION_STATE');
						 this.setFieldValue(this.last_state, 'TRANSITION_STATE');
						 this.last_states=Facilino.getStates();
					 }
				 }
			}
		};

		Blockly.Arduino.controls_statemachine_transition_to = function() {
			var code='';
			var cond = Blockly.Arduino.valueToCode(this, 'TRANSITION_COND', Blockly.Arduino.ORDER_ATOMIC);
			var str = Blockly.Arduino.valueToCode(this,'TRANSITION_TO', Blockly.Arduino.ORDER_NONE);
			var states = str.split(",");
			var numStates = states.length;
			var codeD='';
			for (var i = 0; i < numStates; i++) {
				code+='_condA['+states[i]+']|=_states['+this.getFieldValue('TRANSITION_FROM')+']&('+cond+');\n';
				codeD+='|_states['+states[i]+']|_condA['+states[i]+']';
			}
			code+='_condD['+this.getFieldValue('TRANSITION_FROM')+']|='+codeD.substring(1)+';\n';
			return code;
		};

		Blockly.Blocks.controls_statemachine_transition_to = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_STATEMACHINE'),
			helpUrl: Facilino.getHelpUrl('controls_statemachine_transition_to'),
			examples: ['controls_statemachine_example1','controls_statemachine_example2','controls_statemachine_example3','controls_statemachine_example4'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL_STATEMACHINE,
			keys: ['LANG_CONTROLS_TRANSITION_COND_TO_FROM_NAME','LANG_CONTROLS_TRANSITION_COND_TO_FROM_DESCRIPTION','LANG_CONTROLS_TRANSITION_COND_TO_FROM_INPUT_CONDITION','LANG_CONTROLS_TRANSITION_COND_TO_FROM_INPUT_STATE','LANG_CONTROLS_TRANSITION_COND_TO_FROM_DROPDOWN_STATE','LANG_CONTROLS_TRANSITION_COND','LANG_CONTROLS_TRANSITION_TO_STATE','LANG_CONTROLS_TRANSITION_FROM_STATE','LANG_CONTROLS_TRANSITION_STATE','LANG_CONTROLS_STATE_MACHINE_TRANSITION_TO_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND_TO_FROM_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND_TO_FROM_DESCRIPTION'),
			additional: ['controls_statemachine','controls_statemachine_transition_state_end','controls_statemachine_transition_state','controls_statemachine_transition_from'],
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND_TO_FROM_INPUT_CONDITION'),Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND_TO_FROM_INPUT_STATE')],
			dropdown: [Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND_TO_FROM_DROPDOWN_STATE')],
			init:  function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL_STATEMACHINE);
				this.appendValueInput('TRANSITION_COND').setCheck([Boolean,'Variable']).appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('TRANSITION_TO').setCheck('State').appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_TO_STATE')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('TRANSITION_FROM').appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_FROM_STATE')+' '+Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_STATE')).appendField(new Blockly.FieldDropdown(this.getStates()), 'TRANSITION_FROM');
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(true);
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_TRANSITION_TO_TOOLTIP'));
				this.last_from_state=-1;
				this.last_to_state=-1;
			},
			getStates: function() {
				var states = [['','']];
				for (var x=0;x<Facilino.NumStates;x++)
				{
					var state = [x.toString(),x.toString()];
					states.push(state);
				}
				return states;
			},
			onchange: function() {
				if (!this.workspace) {
					 // Block has been deleted.
					 return;
				 }
				 force_update=0;
				 if (this.last_from_state!==this.getFieldValue('TRANSITION_FROM'))
					 force_update=1;
				 this.last_from_state=this.getFieldValue('TRANSITION_FROM');
				 if (!this.last_states){
					 this.last_states=Facilino.getStates();
				 }
				 var states=Facilino.getStates();
				 for (var i in states){
					 if (Facilino.getStates()[i]!==this.last_states[i]||force_update){
						 try{
							 this.removeInput('TRANSITION_FROM');
						 }catch(e){}
						 this.appendDummyInput('TRANSITION_FROM').appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_FROM_STATE')+' '+Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_STATE')).appendField(new Blockly.FieldDropdown(this.getStates()), 'TRANSITION_FROM');
						 this.setFieldValue(this.last_from_state, 'TRANSITION_FROM');
						 this.last_states=Facilino.getStates();
					 }
				 }
			}
		};

		Blockly.Arduino.controls_statemachine_transition_from = function() {
			var code='';
			var cond = Blockly.Arduino.valueToCode(this, 'TRANSITION_COND', Blockly.Arduino.ORDER_ATOMIC);
			var str = Blockly.Arduino.valueToCode(this,'TRANSITION_FROM', Blockly.Arduino.ORDER_NONE);
			var states = str.split(",");
			var numStates = states.length;
			var codeA='';
			var codeD='';
			for (var i = 0; i < numStates; i++) {
				codeA+='_states['+states[i]+']&';
				codeD+='_condD['+states[i]+']=_states['+this.getFieldValue('TRANSITION_TO')+'|_condA['+this.getFieldValue('TRANSITION_TO')+'];\n';
			}
			code+='_condA['+this.getFieldValue('TRANSITION_TO')+']|='+codeA+'('+cond+');\n';
			code+=codeD;
			return code;
		};

		Blockly.Blocks.controls_statemachine_transition_from = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_STATEMACHINE'),
			helpUrl: Facilino.getHelpUrl('controls_statemachine_transition_from'),
			examples: ['controls_statemachine_example2'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL_STATEMACHINE,
			keys: ['LANG_CONTROLS_TRANSITION_COND_FROM_TO_NAME','LANG_CONTROLS_TRANSITION_COND_FROM_TO_DESCRIPTION','LANG_CONTROLS_TRANSITION_COND_FROM_TO_INPUT_CONDITION','LANG_CONTROLS_TRANSITION_COND_FROM_TO_INPUT_STATE','LANG_CONTROLS_TRANSITION_COND_FROM_TO_DROPDOWN_STATE','LANG_CONTROLS_TRANSITION_COND','LANG_CONTROLS_TRANSITION_FROM_STATE','LANG_CONTROLS_TRANSITION_TO_STATE','LANG_CONTROLS_TRANSITION_STATE','LANG_CONTROLS_STATE_MACHINE_TRANSITION_FROM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND_FROM_TO_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND_FROM_TO_DESCRIPTION'),
			additional: ['controls_statemachine','controls_statemachine_transition_state_end','controls_statemachine_transition_state','controls_statemachine_transition_to'],
			inputs: [Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND_FROM_TO_INPUT_CONDITION'),Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND_FROM_TO_INPUT_STATE')],
			dropdown: [Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND_FROM_TO_DROPDOWN_STATE')],
			init:  function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL_STATEMACHINE);
				this.appendValueInput('TRANSITION_COND').setCheck([Boolean,'Variable']).appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_COND')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('TRANSITION_FROM').setCheck('State').appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_FROM_STATE')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('TRANSITION_TO').appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_TO_STATE')+' '+Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_STATE')).appendField(new Blockly.FieldDropdown(this.getStates()), 'TRANSITION_TO');
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(true);
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_STATE_MACHINE_TRANSITION_FROM_TOOLTIP'));
				this.last_from_state=-1;
				this.last_to_state=-1;
			},
			getStates: function() {
				var states = [['','']];
				for (var x=0;x<Facilino.NumStates;x++)
				{
					var state = [x.toString(),x.toString()];
					states.push(state);
				}
				return states;
			},
			onchange: function() {
				if (!this.workspace) {
					 // Block has been deleted.
					 return;
				 }
				 force_update=0;
				 if (this.last_to_state!==this.getFieldValue('TRANSITION_TO'))
					 force_update=1;
				 this.last_to_state=this.getFieldValue('TRANSITION_TO');
				 if (!this.last_states){
					 this.last_states=Facilino.getStates();
				 }
				 var states=Facilino.getStates();
				 for (var i in states){
					 if (Facilino.getStates()[i]!==this.last_states[i]||force_update){
						 try{
							 this.removeInput('TRANSITION_TO');
						 }catch(e){}
						 this.appendDummyInput('TRANSITION_TO').appendField(Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_TO_STATE')+' '+Facilino.locales.getKey('LANG_CONTROLS_TRANSITION_STATE')).appendField(new Blockly.FieldDropdown(this.getStates()), 'TRANSITION_TO');
						 this.setFieldValue(this.last_to_state, 'TRANSITION_TO');
						 this.last_states=Facilino.getStates();
					 }
				 }
			}
		};
		}
	}
	}
	
	var FacilinoStateMachine = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoStateMachine;
	} else {
		window.FacilinoStateMachine = FacilinoStateMachine;
	}
}));
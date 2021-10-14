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
		if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32'))
		{
			Blockly.Arduino.dyor_task = function() {
				var n = 0;
				var argument;
				var code = '';
				var branch = '';

				if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560'))
				{
					Blockly.Arduino.definitions_['define_task'] = 'SIGNAL (TIMER0_COMPA_vect){\n _currentTime=millis(); \n ';
					if (Blockly.Arduino.play_melody!=='')
						Blockly.Arduino.definitions_['define_task'] += Blockly.Arduino.play_melody;
					if (Blockly.Arduino.play_led_matrix_stream!=='')
						Blockly.Arduino.definitions_['define_task'] += Blockly.Arduino.play_led_matrix_stream;
					if (Blockly.Arduino.play_RGBstream!=='')
						Blockly.Arduino.definitions_['define_task'] += Blockly.Arduino.play_RGBstream;
				}
				else if (Facilino.profiles['processor']==='ESP8266')
				{
					Blockly.Arduino.definitions_['define_task'] = 'void taskInterrupt(){\n _currentTime=millis();  \n';
				}
				else if (Facilino.profiles['processor']==='ESP32')
				{
					Blockly.Arduino.definitions_['define_task'] = 'void IRAM_ATTR timer0Interrupt(){\n _currentTime=millis(); \n ';
				}
				Blockly.Arduino.definitions_['declare_var_currentTime']='unsigned long _currentTime;\n';
				Blockly.Arduino.definitions_['define_task'] += Blockly.Arduino.statementToCode(this, 'DO');
				if (this.taskCount_>0) {
				  Blockly.Arduino.definitions_['declare_var_lastUpdate']='unsigned long _lastUpdate['+this.taskCount_+'];\n';
				  Blockly.Arduino.setups_['setup_int0_'] = '//code for configuring int0\n for (int _myTask=0;_myTask<'+this.taskCount_+';_myTask++)\n  _lastUpdate[_myTask]=millis();\n';
				  if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560'))
					Blockly.Arduino.setups_['setup_int0_enable']='OCR0A=0xAF;\n  TIMSK0 |= _BV(OCIE0A);\n';
				  else if (Facilino.profiles['processor']==='ESP8266')
				  {
					  Blockly.Arduino.definitions_['define_ticker'] = '#include <Ticker.h>\n';
					  Blockly.Arduino.definitions_['declare_var_timer0']='Ticker _tasks;\n';
					  Blockly.Arduino.setups_['setup_int0_']+='_tasks.attach(0.01, taskInterrupt);\n';
				  }
				  else if (Facilino.profiles['processor']==='ESP32')
				  {
					Blockly.Arduino.definitions_['declare_var_timer0']='hw_timer_t * timer0 = NULL;\n';
					Blockly.Arduino.definitions_['declare_var_timer0Mux']='portMUX_TYPE timer0Mux = portMUX_INITIALIZER_UNLOCKED;\n';
					Blockly.Arduino.setups_['setup_int0_']+='timer0 = timerBegin(0, 80, true);\n  timerAttachInterrupt(timer0, &timer0Interrupt, true);\n  timerAlarmWrite(timer0,1000, true);\n  timerAlarmEnable(timer0);\n';
				  }
				  for (n = 0; n < this.taskCount_; n++) {
					//argument = Blockly.Arduino.valueToCode(this, 'TASK' + n, Blockly.Arduino.ORDER_NONE);
					branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
					// branch=branch.replace(/&amp;/g, '');
					if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
						Blockly.Arduino.definitions_['define_task'+n] = JST['task_definitions']({'task_number': n,'branch': branch});
					else if (Facilino.profiles['processor']==='ESP32')
					{
						Blockly.Arduino.definitions_['define_task'+n] = JST['task_definitions_ESP32']({'task_number': n,'branch': branch});
					}
				  }
				  for (n = 0; n < this.taskCount_; n++) {
					argument = Blockly.Arduino.valueToCode(this, 'TASK' + n, Blockly.Arduino.ORDER_NONE);
					Blockly.Arduino.definitions_['define_task']+='if ((_currentTime-_lastUpdate['+n+'])>='+argument+') {\n  task'+n+'();\n  _lastUpdate['+n+']=_currentTime;\n  }\n';
				  }
				}

				Blockly.Arduino.definitions_['define_task'] += '}\n';

				branch = branch.replace(/&quot;/g, '"');
				code = code.replace(/&quot;/g, '"');

				return code;
			};


			Blockly.Blocks.dyor_task = {
				category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_INTERRUPTS'),
				helpUrl: Facilino.getHelpUrl('dyor_task'),
				examples: ['dyor_task_example.bly'],
				category_colour: Facilino.LANG_COLOUR_CONTROL,
				colour: Facilino.LANG_COLOUR_CONTROL_INTERRUPTS,
				keys: ['LANG_CONTROLS_TASKS_NAME','LANG_CONTROLS_TASKS_DESCRIPTION','LANG_CONTROLS_TASKS_MUTATOR_DESC','LANG_CONTROLS_TASKS_STATEMENT_ALWAYS','LANG_CONTROLS_TASKS_STATEMENT_TASK','LANG_CONTROLS_TASK_MS','LANG_CONTROLS_ALWAYS_DO','LANG_CONTROLS_TASKS_TOOLTIP','LANG_CONTROLS_TASK','LANG_CONTROLS_DO'],
				name: Facilino.locales.getKey('LANG_CONTROLS_TASKS_NAME'),
				description: Facilino.locales.getKey('LANG_CONTROLS_TASKS_DESCRIPTION'),
				mutator_desc: Facilino.locales.getKey('LANG_CONTROLS_TASKS_MUTATOR_DESC'),
				mutator_container: 'dyor_task_task',
				mutator_items: ['dyor_task_item'],
				statements: [Facilino.locales.getKey('LANG_CONTROLS_TASKS_STATEMENT_ALWAYS'),Facilino.locales.getKey('LANG_CONTROLS_TASKS_STATEMENT_TASK')],
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_CONTROL_INTERRUPTS);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_TASK_MS')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_CONTROLS_ALWAYS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
					this.setPreviousStatement(false);
					this.setNextStatement(false);
					this.setMutator(new Blockly.Mutator(['dyor_task_item']));
					this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_TASKS_TOOLTIP'));
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
						this.appendValueInput('TASK' + x).setCheck(Number).appendField(Facilino.locales.getKey('LANG_CONTROLS_TASK')+x+' (ms)').setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO' + x).appendField(Facilino.locales.getKey('LANG_CONTROLS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
					}
				},
				decompose: function(workspace) {
					var containerBlock = workspace.newBlock('dyor_task_task');
					containerBlock.initSvg();
					var connection = containerBlock.getInput('STACK').connection;
					for (var x = 0; x < this.taskCount_; x++) {
						var taskBlock = workspace.newBlock('dyor_task_item');
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
							case 'dyor_task_item':
								var taskInput = this.appendValueInput('TASK' + this.taskCount_).setCheck(Number).appendField(Facilino.locales.getKey('LANG_CONTROLS_TASK')+this.taskCount_+' (ms)').setAlign(Blockly.ALIGN_RIGHT);
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
							case 'dyor_task_item':
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

			Blockly.Blocks.dyor_task_task = {
				colour: Facilino.LANG_COLOUR_CONTROL_INTERRUPTS,
				keys: ['LANG_CONTROLS_TASK_PERIODIC','LANG_CONTROLS_TASKS_TOOLTIP'],
				// Task.
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_CONTROL_INTERRUPTS);
					this.appendDummyInput()
						.appendField(Facilino.locales.getKey('LANG_CONTROLS_TASK_PERIODIC'))
						.setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('STACK').setCheck('task');
					this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_TASKS_TOOLTIP'));
					this.contextMenu = false;
				}
			};

		Blockly.Blocks.dyor_task_item = {
				colour: Facilino.LANG_COLOUR_CONTROL_INTERRUPTS,
				// Task item.
				keys: ['LANG_CONTROLS_TASK','LANG_CONTROLS_TASK_TOOLTIP'],
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_CONTROL_INTERRUPTS);
					this.appendDummyInput()
						.appendField(Facilino.locales.getKey('LANG_CONTROLS_TASK'))
						.setAlign(Blockly.ALIGN_RIGHT);
					this.setPreviousStatement(true,'task');
					this.setNextStatement(true,'task');
					this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_TASK_TOOLTIP'));
					this.contextMenu = false;
				}
			};

		Blockly.Arduino.attachInterrupt = function() {
			var code='';
			var interrupt = this.getFieldValue('PIN');
			var mode = this.getFieldValue('MODE');
			var branch = Blockly.Arduino.statementToCode(this, 'DO');
			var comp_flag='';
			if (Facilino.profiles['processor']==='ESP32')
				comp_flag='IRAM_ATTR ';
			Blockly.Arduino.definitions_['define_isr'+interrupt] = 'void '+comp_flag+'_interruptISR'+interrupt+'(void){\n';
			Blockly.Arduino.definitions_['define_isr'+interrupt] += branch;
			Blockly.Arduino.definitions_['define_isr'+interrupt] += '}\n';
			Blockly.Arduino.setups_['setup_isr'+interrupt] = 'pinMode('+interrupt+',INPUT_PULLUP);\n  attachInterrupt(digitalPinToInterrupt('+interrupt+'),_interruptISR'+interrupt+','+mode+');\n';
			branch = branch.replace(/&quot;/g, '"');
			code = code.replace(/&quot;/g, '"');
			return code;
		};

		Blockly.Blocks.attachInterrupt = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_INTERRUPTS'),
			helpUrl: Facilino.getHelpUrl('attachInterrupt'),
			examples: ['dyor_31_in_1_relay_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL_INTERRUPTS,
			keys: ['LANG_CONTROLS_ATTACH_INTERRUPT_NAME','LANG_CONTROLS_ATTACH_INTERRUPT_DESCRIPTION','LANG_CONTROLS_ATTACH_INTERRUPT_DROPDOWN_PIN','LANG_CONTROLS_ATTACH_INTERRUPT_DROPDOWN_MODE','LANG_CONTROLS_ATTACH_INTERRUPT_STATEMENT_DO','LANG_CONTROLS_INTERRUPT','LANG_CONTROLS_INTERRUPT_PIN','LANG_CONTROLS_INTERRUPT_MODE','LANG_CONTROLS_INTERRUPT_LOW','LANG_CONTROLS_INTERRUPT_CHANGE','LANG_CONTROLS_INTERRUPT_RISING','LANG_CONTROLS_INTERRUPT_FALLING','LANG_CONTROLS_DO','LANG_CONTROLS_ATTACH_INTERRUPT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_DESCRIPTION'),
			warning_msg: ['controls_counterInterrupt','controls_numberOfInterrupts'],
			dropdown: [Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_DROPDOWN_PIN'),Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_DROPDOWN_MODE')],
			statements: [Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_STATEMENT_DO')],
			init:  function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL_INTERRUPTS);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT')).appendField(Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_PIN')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.interrupt), 'PIN').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_MODE')).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_LOW'),'LOW'],[Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_CHANGE'),'CHANGE'],[Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_RISING'),'RISING'],[Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_FALLING'),'FALLING']]), 'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_CONTROLS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_TOOLTIP'));
			},
			isNotDuplicable: true
		};

		Blockly.Arduino.controls_counterInterrupt = function() {
			var code='';
			var interrupt = this.getFieldValue('PIN');
			var mode = this.getFieldValue('MODE');
			var comp_flag='';
			if (Facilino.profiles['processor']==='ESP32')
				comp_flag='IRAM_ATTR ';
			Blockly.Arduino.definitions_['declare_var_interruptCounter'+interrupt] = 'volatile long _interruptCounter' + interrupt + '=0;\n';
			Blockly.Arduino.definitions_['declare_var_old_interruptCounter'+interrupt] = 'volatile long _old_interruptCounter' + interrupt + '=0;\n';
			Blockly.Arduino.definitions_['define_isr'+interrupt] = 'void '+comp_flag+'_interruptISR'+interrupt+'(void){\n';
			Blockly.Arduino.definitions_['define_isr'+interrupt] += '_interruptCounter'+interrupt+'++;\n';
			Blockly.Arduino.definitions_['define_isr'+interrupt] += '}\n';
			Blockly.Arduino.setups_['setup_isr'+interrupt] = 'pinMode('+interrupt+',INPUT_PULLUP);\n  attachInterrupt(digitalPinToInterrupt('+interrupt+'),_interruptISR'+interrupt+','+mode+');\n';
			code+='if(_interruptCounter'+interrupt+'>_old_interruptCounter'+interrupt+'){\n';
			code+='  _old_interruptCounter'+interrupt+'=_interruptCounter'+interrupt+';\n';
			code+=Blockly.Arduino.statementToCode(this, 'DO');
			code+='}\n';
			return code;
		};

		Blockly.Blocks.controls_counterInterrupt = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_INTERRUPTS'),
			helpUrl: Facilino.getHelpUrl('controls_counterInterrupt'),
			examples: ['LED_race_console'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL_INTERRUPTS,
			keys: ['LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER_NAME','LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER_DESCRIPTION','LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER_STATEMENT_DO','LANG_CONTROLS_INTERRUPT_COUNTER','LANG_CONTROLS_INTERRUPT_PIN','LANG_CONTROLS_INTERRUPT_MODE','LANG_CONTROLS_INTERRUPT_CHANGE','LANG_CONTROLS_INTERRUPT_RISING','LANG_CONTROLS_INTERRUPT_FALLING','LANG_CONTROLS_DO','LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER_DESCRIPTION'),
			warning_msg: ['attachInterrupt','controls_numberOfInterrupts'],
			statements: [Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER_STATEMENT_DO')],
			init:  function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL_INTERRUPTS);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_COUNTER')).appendField(Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_PIN')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.interrupt), 'PIN').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_MODE')).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_CHANGE'),'CHANGE'],[Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_RISING'),'RISING'],[Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_FALLING'),'FALLING']]), 'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_CONTROLS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER_TOOLTIP'));
			}
		};

		Blockly.Arduino.controls_numberOfInterrupts = function() {
			var code='';
			var interrupt = this.getFieldValue('PIN');
			var mode = this.getFieldValue('MODE');
			Blockly.Arduino.definitions_['declare_var_interruptCounter'+interrupt] = 'volatile long _interruptCounter' + interrupt + '=0;\n';
			Blockly.Arduino.definitions_['define_isr'+interrupt] = 'void _interruptISR'+interrupt+'(void){\n';
			Blockly.Arduino.definitions_['define_isr'+interrupt] += '_interruptCounter'+interrupt+'++;\n';
			Blockly.Arduino.definitions_['define_isr'+interrupt] += '}\n';
			Blockly.Arduino.setups_['setup_isr'+interrupt] = 'pinMode('+interrupt+',INPUT_PULLUP);\n  attachInterrupt(digitalPinToInterrupt('+interrupt+'),_interruptISR'+interrupt+','+mode+');\n';
			code+='_interruptCounter'+ interrupt;
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.controls_numberOfInterrupts = {
			category: Facilino.locales.getKey('LANG_CATEGORY_CONTROLS'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_INTERRUPTS'),
			helpUrl: Facilino.getHelpUrl('controls_numberOfInterrupts'),
			examples: ['dyor_31_in_1_relay_example'],
			category_colour: Facilino.LANG_COLOUR_CONTROL,
			colour: Facilino.LANG_COLOUR_CONTROL_INTERRUPTS,
			keys: ['LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER2_NAME','LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER2_DESCRIPTION','LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER2_DROPDOWN_PIN','LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER2_DROPDOWN_MODE','LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER2_OUTPUT','LANG_CONTROLS_INTERRUPT_COUNTER','LANG_CONTROLS_INTERRUPT_PIN','LANG_CONTROLS_INTERRUPT_MODE','LANG_CONTROLS_INTERRUPT_CHANGE','LANG_CONTROLS_INTERRUPT_RISING','LANG_CONTROLS_INTERRUPT_FALLING','LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER_TOOLTIP2'],
			name: Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER2_NAME'),
			description: Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER2_DESCRIPTION'),
			warning_msg: ['attachInterrupt','controls_counterInterrupt'],
			dropdown: [Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER2_DROPDOWN_PIN'),Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER2_DROPDOWN_MODE')],
			output: Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER2_OUTPUT'),
			init:  function() {
				this.setColour(Facilino.LANG_COLOUR_CONTROL_INTERRUPTS);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_COUNTER')).appendField(Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_PIN')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.interrupt), 'PIN').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_MODE')).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_CHANGE'),'CHANGE'],[Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_RISING'),'RISING'],[Facilino.locales.getKey('LANG_CONTROLS_INTERRUPT_FALLING'),'FALLING']]), 'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_CONTROLS_ATTACH_INTERRUPT_COUNTER_TOOLTIP2'));
			}
		};
				}

		}
	}
	
	}
	
	var FacilinoInterrupts = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoInterrupts;
	} else {
		window.FacilinoInterrupts = FacilinoInterrupts;
	}
}));
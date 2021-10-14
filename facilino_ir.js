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
		
	Blockly.Arduino.ir_available = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
			{
				Blockly.Arduino.definitions_['Arduino_h']='#include <Arduino.h>';
				Blockly.Arduino.definitions_['IRRemoteES8266_h']='#include <IRremoteESP8266.h>';
				Blockly.Arduino.definitions_['IRrecv_h']='#include <IRrecv.h>';
			}
			else
				Blockly.Arduino.definitions_['IRRemote']='#include <IRremote.h>';
			Blockly.Arduino.setups_['setup_IRRemote_' + pin]='irrecv_'+pin+'.enableIRIn();\n';
			Blockly.Arduino.definitions_['declare_var_define_ir'+pin] = 'IRrecv irrecv_'+pin+'('+pin+');\ndecode_results _ir_results_'+pin+';\n';
			var code = 'if (irrecv_'+pin+'.decode(&_ir_results_'+pin+')) {\n	if (_ir_results_'+pin+'.decode_type>0)\n	{\n';
			branch = Blockly.Arduino.statementToCode(this,'DO');
			//branch = branch.replace(/&quot;/g, '"');
			branch = indentSentences(branch);
			branch = branch.substring(0, branch.length - 4);
			code+=indentSentences(branch)+'	}\n	irrecv_'+pin+'.resume();\n  }\n';
			return code;
		};

		Blockly.Blocks.ir_available = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IR'),
			helpUrl: Facilino.getHelpUrl('ir_available'),
			tags: ['serial','communication'],
			examples: ['serial_available_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_IR,
			keys: ['LANG_IR_AVAILABLE_NAME','LANG_ADVANCED_SERIAL_AVAILABLE','LANG_IR_DO','LANG_IR_AVAILABLE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_IR_AVAILABLE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IR);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_IR_AVAILABLE')).appendField(new Blockly.FieldImage('img/blocks/remote-control.svg', 52*options.zoom, 24*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_IR_COMMAND_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO')
					.appendField(Facilino.locales.getKey('LANG_IR_DO'));
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_IR_AVAILABLE_TOOLTIP'));
			}
		};

		Blockly.Arduino.ir_read_code = function() {
			var code='';
			var block=this;
			var ok=false;
			while(block.getParent()!==null)
			{
				if (block.getParent().type==='ir_available')
				{
					ok=true;
					break;
				}
				block=block.getParent();
			};
			if (ok)
				this.setWarningText(null);
			else
			{
				this.setWarningText('This instruction should be used inside the IR available instruction. Otherwise, it will return the last available value.');
				return [code,Blockly.Arduino.ORDER_ATOMIC];
			}
			if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
			{
				Blockly.Arduino.definitions_['Arduino_h']='#include <Arduino.h>';
				Blockly.Arduino.definitions_['IRRemoteES8266_h']='#include <IRremoteESP8266.h>';
				Blockly.Arduino.definitions_['IRrecv_h']='#include <IRrecv.h>';
			}
			else
				Blockly.Arduino.definitions_['IRRemote']='#include <IRremote.h>';
			var pin = Blockly.Arduino.valueToCode(block.getParent(), 'PIN', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.setups_['setup_IRRemote_' + pin]='irrecv_'+pin+'.enableIRIn();\n';
			Blockly.Arduino.definitions_['declare_var_define_ir'+pin] = 'IRrecv irrecv_'+pin+'('+pin+');\ndecode_results _ir_results_'+pin+';\n';

			code += '(int)(_ir_results_'+pin+'.value&(~(0xFFFFFFFF<<(_ir_results_'+pin+'.bits-1))))';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.ir_read_code = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IR'),
			helpUrl: Facilino.getHelpUrl('ir_read_code'),
			tags: ['serial','communication'],
			examples: ['logic_operation_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_IR,
			keys: ['LANG_IR_READ_CODE_NAME','LANG_IR_READ_CODE','LANG_IR_READ_CODE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_IR_READ_CODE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IR);
				this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_IR_READ_CODE')).appendField(new Blockly.FieldImage('img/blocks/remote-control.svg', 52*options.zoom, 24*options.zoom));
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_IR_READ_CODE_TOOLTIP'));
			}
		};

		Blockly.Arduino.communications_ir_command = function() {
			var n = 1;
			var argument;
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
			{
				Blockly.Arduino.definitions_['Arduino_h']='#include <Arduino.h>';
				Blockly.Arduino.definitions_['IRRemoteES8266_h']='#include <IRremoteESP8266.h>';
				Blockly.Arduino.definitions_['IRrecv_h']='#include <IRrecv.h>';
			}
			else
				Blockly.Arduino.definitions_['IRRemote']='#include <IRremote.h>';
			Blockly.Arduino.setups_['setup_IRRemote_' + pin]='irrecv_'+pin+'.enableIRIn();\n';
			Blockly.Arduino.definitions_['declare_var_define_ir'+pin] = 'IRrecv irrecv_'+pin+'('+pin+');\ndecode_results _ir_results_'+pin+';\n';
			var code = 'if (irrecv_'+pin+'.decode(&_ir_results_'+pin+')) {\n	if (_ir_results_'+pin+'.decode_type>0)\n	{\n	  int code =_ir_results_'+pin+'.value&(~(0xFFFFFFFF<<(_ir_results_'+pin+'.bits-1)));\n	  switch(code){\n';
			for (n = 1; n <= this.itemCount_; n++) {
			  //argument = Blockly.Arduino.valueToCode(this, 'DATA' + n, Blockly.Arduino.ORDER_NONE);
			  argument = this.getFieldValue('DATA'+n);
			  branch = Blockly.Arduino.statementToCode(this, 'ITEM' + n);
			  branch = indentSentences(indentSentences(indentSentences(branch)));
			  branch = branch.substring(0, branch.length - 9);
			  code+='	  case '+argument+':\n'+branch+'  break;\n'
			}
			code+='	  }\n	}\n	irrecv_'+pin+'.resume();\n  }\n';
			return code;
		};

		Blockly.Blocks.communications_ir_command = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IR'),
			tags: ['bluetooth'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_app'),
			examples: ['dyor_bluetooth_app_example.bly','dyor_bluetooth_app_example2.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_IR,
			keys: ['LANG_IR_COMMAND_NAME','LANG_IR_COMMAND','LANG_IR_COMMAND_PIN','LANG_IR_COMMAND_TOOLTIP','LANG_IR_COMMAND_CODE_RECV','LANG_IR_COMMAND_CODE','LANG_IR_DO'],
			name: Facilino.locales.getKey('LANG_IR_COMMAND_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IR);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_IR_COMMAND')).appendField(new Blockly.FieldImage('img/blocks/remote-control.svg', 52*options.zoom, 24*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_IR_COMMAND_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 20*options.zoom, 20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.setMutator(new Blockly.Mutator(['communications_ir_command_item']));
				this.itemCount_ = 0;
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_IR_COMMAND_TOOLTIP'));
			},
			isNotDuplicable: true,
		mutationToDom: function() {
				if (!this.itemCount_ ) {
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
				for (var x = 1; x <= this.itemCount_; x++) {
					this.appendDummyInput('DATA' + x).appendField(Facilino.locales.getKey('LANG_IR_COMMAND_CODE_RECV')).appendField(new Blockly.FieldNumber(0),'DATA' + x).setAlign(Blockly.ALIGN_RIGHT);
					//this.setFieldValue(xx,'DATA'+x);
					this.appendStatementInput('ITEM' + x).appendField(Facilino.locales.getKey('LANG_IR_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
					this.setInputsInline(false);
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('communications_ir_command_stack');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 1; x <= this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('communications_ir_command_item');
					itemBlock.initSvg();
					connection.connect(itemBlock.previousConnection);
					connection = itemBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the items input blocks and remove the inputs.
				for (var x = this.itemCount_; x > 0; x--) {
					this.removeInput('DATA' + x);
					this.removeInput('ITEM' + x);
				}
				this.itemCount_ = 0;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'communications_ir_command_item':
							this.itemCount_++;
							this.setInputsInline(false);
							//.appendField(new Blockly.FieldImage("img/blocks/smartphoneC.svg", 20*options.zoom, 20*options.zoom))
							var dataInput = this.appendDummyInput('DATA' + this.itemCount_).appendField(Facilino.locales.getKey('LANG_IR_COMMAND_CODE_RECV')).appendField(new Blockly.FieldNumber(0),'DATA' + this.itemCount_).setAlign(Blockly.ALIGN_RIGHT);
							var itemInput = this.appendStatementInput('ITEM' + this.itemCount_).appendField(Facilino.locales.getKey('LANG_IR_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
							// Reconnect any child blocks.
							//if (clauseBlock.valueConnection_) {
							//	dataInput.connection.connect(clauseBlock.valueConnection_);
							//}
							if (clauseBlock.statementConnection_) {
								itemInput.connection.connect(clauseBlock.statementConnection_);
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
						case 'communications_ir_command_item':
							//var inputData = this.getInput('DATA' + x);
							var inputItem = this.getInput('ITEM' + x);
							//clauseBlock.valueConnection_ =
							//	inputData && inputData.connection.targetConnection;
							clauseBlock.statementConnection_ =
								inputItem && inputItem.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			}
		};

	Blockly.Blocks.communications_ir_command_stack = {
			// App
			colour: Facilino.LANG_COLOUR_COMMUNICATION_IR,
			keys: ['LANG_IR_COMMAND_DECODE','LANG_IR_COMMAND_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IR);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_IR_COMMAND_DECODE')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('ir_item');
				this.setTooltip(Facilino.locales.getKey('LANG_IR_COMMAND_TOOLTIP'));
				this.contextMenu = false;
			}
		};

	Blockly.Blocks.communications_ir_command_item = {
			colour: Facilino.LANG_COLOUR_COMMUNICATION_IR,
			keys: ['LANG_IR_COMMAND_CODE','LANG_IR_COMMAND_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IR);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_IR_COMMAND_CODE')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'ir_item');
				this.setNextStatement(true,'ir_item');
				this.setTooltip(Facilino.locales.getKey('LANG_IR_COMMAND_TOOLTIP'));
		this.contextMenu = false;
			}
		};
	
	}
	
	var FacilinoIR = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoIR;
	} else {
		window.FacilinoIR = FacilinoIR;
	}
}));
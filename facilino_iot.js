(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	if ((Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
			{
				if (window.FacilinoAdvanced===true)
				{
				Blockly.Arduino.communications_wifi_iot_thingsboard_setup = function() {
					var device_name = Blockly.Arduino.valueToCode(this, 'DEVICE_NAME', Blockly.Arduino.ORDER_NONE) ||'""';
					var token = Blockly.Arduino.valueToCode(this, 'TOKEN', Blockly.Arduino.ORDER_NONE) ||'""';
					var code = '';
					Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';
					Blockly.Arduino.definitions_['declare_var_token'] = 'String _token='+token+';\n';
					if (Facilino.profiles['processor']==='ESP8266')
					{
						Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
					}
					else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
					{
						Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
					}
					Blockly.Arduino.definitions_['define_thingsboard'] = '#include <ThingsBoard.h>';
					Blockly.Arduino.definitions_['declare_var_thingsboardclient']='ThingsBoard _tb(_client);\n';
					Blockly.Arduino.setups_['setup_thingsboard_connect']='  _tb.connect("thingsboard.cloud",_token.c_str());\n  if (_wifi_status&_tb.connected())\n	Serial.println("Connected to Thingsboard!");\n';
					Blockly.Arduino.loops_['loop_thingsboard']='_tb.loop();\n';
					return code;
				}

				Blockly.Blocks.communications_wifi_iot_thingsboard_setup = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
					tags: ['wifi','esp8266','communications'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_iot_thingsboard_setup'),
					examples: [''],
					category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					keys: ['LANG_WIFI_IOT_THINGSBOARD_SETUP_NAME','LANG_WIFI_IOT_THINGSBOARD_SETUP','LANG_WIFI_ESP8266_TOKEN','LANG_WIFI_ESP8266_DEVICE_NAME','LANG_WIFI_IOT_THINGSBOARD_SETUP_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_SETUP_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_SETUP')).appendField(new Blockly.FieldImage('img/blocks/thingsboard.svg', 20*options.zoom, 20*options.zoom));
						//this.appendValueInput('DEVICE_NAME').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEVICE_NAME')).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('TOKEN').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_TOKEN')).setAlign(Blockly.ALIGN_RIGHT);
						this.setInputsInline(false);
						this.setPreviousStatement(true,'code');
						this.setNextStatement(true,'code');
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_SETUP_TOOLTIP'));
					},
					isNotDuplicable: true
				};

				Blockly.Arduino.communications_wifi_iot_thingsboard_isconnected = function() {
					var code='';
					Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';
					if (Facilino.profiles['processor']==='ESP8266')
					{
						Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
					}
					else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
					{
						Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
					}
					Blockly.Arduino.definitions_['define_thingsboard'] = '#include <ThingsBoard.h>';
					Blockly.Arduino.definitions_['declare_var_thingsboardclient']='ThingsBoard _tb(_client);\n';
					code ='_tb.connected()';
					return [code,Blockly.Arduino.ORDER_ATOMIC];
				}


				Blockly.Blocks.communications_wifi_iot_thingsboard_isconnected = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
					tags: ['wifi','esp8266','communications'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_iot_thingsboard_isconnected'),
					examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
					category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					keys: ['LANG_WIFI_ESP8266_ISCONNECTED_NAME','LANG_WIFI_ESP8266_ISCONNECTED','LANG_WIFI_ESP8266_ISCONNECTED_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_ESP8266_ISCONNECTED_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_ISCONNECTED')).appendField(new Blockly.FieldImage('img/blocks/thingsboard.svg', 20*options.zoom, 20*options.zoom));
						this.setInputsInline(false);
						this.setPreviousStatement(false);
						this.setNextStatement(false);
						this.setOutput(true,Boolean);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_ISCONNECTED_TOOLTIP'));
					}
				};

				Blockly.Arduino.communications_wifi_iot_thingsboard_reconnect = function() {
					var code='';
					Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';
					if (Facilino.profiles['processor']==='ESP8266')
					{
						Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
					}
					else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
					{
						Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
					}
					Blockly.Arduino.definitions_['define_thingsboard'] = '#include <ThingsBoard.h>';
					Blockly.Arduino.definitions_['declare_var_thingsboardclient']='ThingsBoard _tb(_client);\n';
					code+='if (_wifi_status)\n  Serial.println("Reconnecting to Thingsboard");\n  _tb.connect("demo.thingsboard.io",_token.c_str());\n  if (_wifi_status&_tb.connected())\n	Serial.println("Connected to Thingsboard!");\n'
					return code;
				}

				Blockly.Blocks.communications_wifi_iot_thingsboard_reconnect = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
					tags: ['wifi','esp8266','communications'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_iot_thingsboard_setup'),
					examples: [''],
					category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					keys: ['LANG_WIFI_IOT_THINGSBOARD_RECONNECT_NAME','LANG_WIFI_IOT_THINGSBOARD_SETUP','LANG_WIFI_ESP8266_TOKEN','LANG_WIFI_ESP8266_DEVICE_NAME','LANG_WIFI_IOT_THINGSBOARD_RECONNECT_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RECONNECT_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RECONNECT')).appendField(new Blockly.FieldImage('img/blocks/thingsboard.svg', 20*options.zoom, 20*options.zoom));
						this.setInputsInline(false);
						this.setPreviousStatement(true,'code');
						this.setNextStatement(true,'code');
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RECONNECT_TOOLTIP'));
					}
				};

				Blockly.Arduino.communications_wifi_iot_thingsboard_rpc = function() {
					var gpio = Blockly.Arduino.valueToCode(this, 'GPIO', Blockly.Arduino.ORDER_NONE) ||'""';
					var code = '';
					var knobs=[];
					var switches=[];
					for (var i=0;i<this.itemCount_;i++)
					{
						if (this.type_[i]==='communications_wifi_iot_thingsboard_rpc_switch')
							switches.push(i);
						else if (this.type_[i]==='communications_wifi_iot_thingsboard_rpc_knob')
							knobs.push(i);
					}
					var switchesCount = switches.length;
					var knobsCount = knobs.length;
					if (Facilino.profiles['processor']==='ESP8266')
					{
						Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
					}
					else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
					{
						Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
					}

					Blockly.Arduino.definitions_['define_thingsboard'] = '#include <ThingsBoard.h>';
					Blockly.Arduino.definitions_['declare_var_thingsboardclient']='ThingsBoard _tb(_client);\n';
					Blockly.Arduino.definitions_['declare_morevar_thingsboard_callback']='RPC_Callback _tb_callbacks[] = {';

					code +='_tb.RPC_Subscribe(_tb_callbacks,'+this.itemCount_+');\n';
					for (var i=0;i<this.itemCount_;i++)
					{
						if (switchesCount>0)
						{
							for (var i=0;i<switchesCount;i++)
							{
								if (this.type_[switches[i]]==='communications_wifi_iot_thingsboard_rpc_switch')
								{
									Blockly.Arduino.definitions_['declare_morevar_thingsboard_callback']+='{"'+this.method_[switches[i]]+'",on_message_'+this.method_[switches[i]]+'},';
									Blockly.Arduino.definitions_['define_on_message_'+this.method_[switches[i]]] = 'RPC_Response on_message_'+this.method_[switches[i]]+'(const RPC_Data &data){\n  bool _remote_value=data;\n'+Blockly.Arduino.statementToCode(this,'RPC_STACK'+switches[i])+'  return RPC_Response(NULL, data);\n}\n';



								}
							}
						}
						if (knobsCount>0)
						{
							for (var i=0;i<knobsCount;i++)
							{
								if (this.type_[knobs[i]]==='communications_wifi_iot_thingsboard_rpc_knob')
								{
									Blockly.Arduino.definitions_['declare_morevar_thingsboard_callback']+='{"'+this.method_[knobs[i]]+'",on_message_'+this.method_[knobs[i]]+'},';
									Blockly.Arduino.definitions_['define_on_message_'+this.method_[knobs[i]]] = 'RPC_Response on_message_'+this.method_[knobs[i]]+'(const RPC_Data &data){\n  float _remote_value=data;\n'+Blockly.Arduino.statementToCode(this,'RPC_STACK'+knobs[i])+'  return RPC_Response(NULL, data);\n}\n';
								}
							}
						}
					}
					Blockly.Arduino.definitions_['declare_morevar_thingsboard_callback']+='};\n';
					return code;
				}

				Blockly.Blocks.communications_wifi_iot_thingsboard_rpc = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
					tags: ['wifi','esp8266','communications'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_iot_thingsboard_rpc'),
					examples: [''],
					category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					keys: ['LANG_WIFI_IOT_THINGSBOARD_RPC_NAME','LANG_WIFI_IOT_THINGSBOARD_RPC','LANG_WIFI_IOT_THINGSBOARD_RPC_SWITCH','LANG_WIFI_IOT_THINGSBOARD_RPC_KNOB','LANG_WIFI_IOT_THINGSBOARD_RPC_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC')).appendField(new Blockly.FieldImage('img/blocks/thingsboard.svg', 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.setMutator(new Blockly.Mutator(['communications_wifi_iot_thingsboard_rpc_switch','communications_wifi_iot_thingsboard_rpc_knob']));
						this.setInputsInline(false);
						this.setPreviousStatement(true,'code');
						this.setNextStatement(true,'code');
						this.itemCount_=0;
						this.method_=[];
						this.type_=[];
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_TOOLTIP'));
					},
					isNotDuplicable: true,
					mutationToDom: function() {
						if (!this.itemCount_) {
							return null;
						}
						var container = document.createElement('mutation');
						if (this.itemCount_) {
							container.setAttribute('item', this.itemCount_);
						}
						if (this.itemCount_) {
							for (var x = 0; x < this.itemCount_; x++){
								container.setAttribute('method'+x, this.method_[x]);
							}
						}
						if (this.itemCount_) {
							for (var x = 0; x < this.itemCount_; x++){
								container.setAttribute('type'+x, this.type_[x]);
							}
						}
						return container;
					},
					domToMutation: function(xmlElement) {
						this.itemCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
						for (var x = 0; x < this.itemCount_; x++) {
							this.method_.push(xmlElement.getAttribute('method'+x));
							this.type_.push(xmlElement.getAttribute('type'+x));
							if (xmlElement.getAttribute('type'+x)==='communications_wifi_iot_thingsboard_rpc_switch')
							{
								this.appendDummyInput('RPC'+x).appendField(new Blockly.FieldImage('img/blocks/telemetry_in.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_SWITCH')).appendField(new Blockly.FieldTextInput(''),'METHOD'+x).setAlign(Blockly.ALIGN_LEFT);
								this.appendStatementInput('RPC_STACK'+x);
							}
							else if (xmlElement.getAttribute('type'+x)==='communications_wifi_iot_thingsboard_rpc_knob')
							{
								this.appendDummyInput('RPC'+x).appendField(new Blockly.FieldImage('img/blocks/telemetry_in.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_KNOB')).appendField(new Blockly.FieldTextInput(''),'METHOD'+x).setAlign(Blockly.ALIGN_LEFT);
								this.appendStatementInput('RPC_STACK'+x);
							}
						}
					},
					decompose: function(workspace) {
						var containerBlock = workspace.newBlock('communications_wifi_iot_thingsboard_rpc_stack');
						containerBlock.initSvg();
						var connection = containerBlock.getInput('STACK').connection;
						for (var x = 0; x < this.itemCount_; x++) {
							var taskBlock = workspace.newBlock(this.type_[x]);
							taskBlock.initSvg();
							connection.connect(taskBlock.previousConnection);
							connection = taskBlock.nextConnection;
						}
						return containerBlock;
					},
					compose: function(containerBlock) {
						// Disconnect all the task input blocks and remove the inputs.
						for (var x = this.itemCount_-1; x >= 0; x--) {
							this.removeInput('RPC'+x);
							this.removeInput('RPC_STACK'+x);
						}
						this.itemCount_ = 0;
						// Rebuild the block's optional inputs.
						var clauseBlock = containerBlock.getInputTargetBlock('STACK');
						while (clauseBlock) {
							switch (clauseBlock.type) {
								case 'communications_wifi_iot_thingsboard_rpc_switch':
									if (clauseBlock.valueField_===undefined)
										clauseBlock.valueField_='setValue';
									this.appendDummyInput('RPC'+this.itemCount_).appendField(new Blockly.FieldImage('img/blocks/telemetry_in.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_SWITCH')).appendField(new Blockly.FieldTextInput(clauseBlock.valueField_),'METHOD'+this.itemCount_).setAlign(Blockly.ALIGN_LEFT);
									//
									var telemetryInput = this.appendStatementInput('RPC_STACK'+this.itemCount_);
									this.type_[this.itemCount_]=clauseBlock.type;
									this.itemCount_++;
									// Reconnect any child blocks.
									if (clauseBlock.valueConnection_) {
										telemetryInput.connection.connect(clauseBlock.valueConnection_);
									}
									break;
								case 'communications_wifi_iot_thingsboard_rpc_knob':
									if (clauseBlock.valueField_===undefined)
										clauseBlock.valueField_='setValue';
									this.appendDummyInput('RPC'+this.itemCount_).appendField(new Blockly.FieldImage('img/blocks/telemetry_in.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_KNOB')).appendField(new Blockly.FieldTextInput(clauseBlock.valueField_),'METHOD'+this.itemCount_).setAlign(Blockly.ALIGN_LEFT);
									//
									var telemetryInput = this.appendStatementInput('RPC_STACK'+this.itemCount_);
									this.type_[this.itemCount_]=clauseBlock.type;
									this.itemCount_++;
									// Reconnect any child blocks.
									if (clauseBlock.valueConnection_) {
										telemetryInput.connection.connect(clauseBlock.valueConnection_);
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
								case 'communications_wifi_iot_thingsboard_rpc_switch':
									var input = this.getInput('RPC_STACK' + x);
									clauseBlock.valueConnection_ = input && input.connection.targetConnection;
									clauseBlock.valueField_ = this.getFieldValue('METHOD'+x);
									x++;
									break;
								case 'communications_wifi_iot_thingsboard_rpc_knob':
									var input = this.getInput('RPC_STACK' + x);
									clauseBlock.valueConnection_ = input && input.connection.targetConnection;
									clauseBlock.valueField_ = this.getFieldValue('METHOD'+x);
									x++;
									break;
								default:
									throw 'Unknown block type.';
							}
							clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
						}
					},
					onchange: function() {
						function hasNoDuplicates(arr){
							return arr.every(function(val){
							return arr.indexOf(val) === arr.lastIndexOf(val)
							});
						}
						this.method_=[];
						for (var x = 0; x < this.itemCount_; x++) {
							this.method_.push(this.getFieldValue('METHOD'+x));
						}
						if (hasNoDuplicates(this.method_))
							this.setWarningText(null);
						else
							this.setWarningText('Duplicate method names!');
					}
				};

				Blockly.Blocks.communications_wifi_iot_thingsboard_rpc_stack = {
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					keys: ['LANG_WIFI_IOT_THINGSBOARD_RPC_RPC','LANG_WIFI_IOT_THINGSBOARD_RPC_TOOLTIP'],
					// Task.
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput()
							.appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_RPC'))
							.setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('STACK').setCheck('item');
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_TOOLTIP'));
						this.contextMenu = false;
					}
				};

				Blockly.Blocks.communications_wifi_iot_thingsboard_rpc_switch = {
						colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
						// Task item.
						keys: ['LANG_WIFI_IOT_THINGSBOARD_RPC_SWITCH','LANG_WIFI_IOT_THINGSBOARD_RPC_ITEM_TOOLTIP'],
						init: function() {
							this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
							this.appendDummyInput()
								.appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_SWITCH'))
								.setAlign(Blockly.ALIGN_RIGHT);
							this.setPreviousStatement(true,'item');
							this.setNextStatement(true,'item');
							this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_ITEM_TOOLTIP'));
							this.contextMenu = false;
						}
				};

				Blockly.Blocks.communications_wifi_iot_thingsboard_rpc_knob = {
						colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
						// Task item.
						keys: ['LANG_WIFI_IOT_THINGSBOARD_RPC_KNOB','LANG_WIFI_IOT_THINGSBOARD_RPC_ITEM_TOOLTIP'],
						init: function() {
							this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
							this.appendDummyInput()
								.appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_KNOB'))
								.setAlign(Blockly.ALIGN_RIGHT);
							this.setPreviousStatement(true,'item');
							this.setNextStatement(true,'item');
							this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_ITEM_TOOLTIP'));
							this.contextMenu = false;
						}
				};

				Blockly.Arduino.communications_wifi_iot_thingsboard_rpc_value = function() {
					var gpio = Blockly.Arduino.valueToCode(this, 'GPIO', Blockly.Arduino.ORDER_NONE) ||'""';
					var code = '_remote_value';
					return [code,Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_iot_thingsboard_rpc_value = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
					tags: ['wifi','esp8266','communications'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_iot_thingsboard_rpc_value'),
					examples: [''],
					category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					keys: ['LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE_NAME','LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE','LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE_TOOLTIP','LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE_WARN'],
					name: Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE')).appendField(new Blockly.FieldImage('img/blocks/telemetry_in.svg',20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.setInputsInline(false);
						this.setPreviousStatement(false);
						this.setNextStatement(false);
						this.setOutput(true,[Boolean,Number]);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE_TOOLTIP'));
						this.setWarningText(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE_WARN'));
					}
				};

				Blockly.Arduino.communications_wifi_iot_thingsboard_send= function() {
					var code ='';
					if (Facilino.profiles['processor']==='ESP8266')
					{
						Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
					}
					else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
					{
						Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
					}

					Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';
					Blockly.Arduino.definitions_['define_thingsboard'] = '#include <ThingsBoard.h>';
					Blockly.Arduino.definitions_['declare_var_thingsboardclient']='ThingsBoard _tb(_client);\n';

					var attribute=[];
					var telemetry=[];
					for (var i=0;i<this.itemCount_;i++)
					{
						if (this.type_[i]==='communications_wifi_iot_thingsboard_telemetry_item')
							telemetry.push(i);
						else if (this.type_[i]==='communications_wifi_iot_thingsboard_attribute_item')
							attribute.push(i);
					}
					var telemetryCount = telemetry.length;
					var attributeCount = attribute.length;
					if (telemetry.length>0)
					{
						for (var i=0;i<telemetryCount;i++)
						{
							if (this.type_[telemetry[i]]==='communications_wifi_iot_thingsboard_telemetry_item')
							{
								var input = this.getInputTargetBlock('ITEM'+telemetry[i]);
								if (input)
								{
									if (input.outputConnection.check_)
									{
										if (input.type==='variables_get')
										{
											if (Facilino.variables[input.last_variable][0]==='bool')
											{
												code+='_tb.sendTelemetryBool("'+this.getFieldValue('KEY'+telemetry[i])+'",'+Blockly.Arduino.valueToCode(this, 'ITEM'+telemetry[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
											}
											else if (Facilino.variables[input.last_variable][0]==='float')
											{
												code+='_tb.sendTelemetryFloat("'+this.getFieldValue('KEY'+telemetry[i])+'",'+Blockly.Arduino.valueToCode(this, 'ITEM'+telemetry[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
											}
											else if (Facilino.variables[input.last_variable][0]==='int' || Facilino.variables[input.last_variable][0]==='short' || Facilino.variables[input.last_variable][0]==='long' || Facilino.variables[input.last_variable][0]==='byte')
											{
												code+='_tb.sendTelemetryFloat("'+this.getFieldValue('KEY'+telemetry[i])+'",(float)'+Blockly.Arduino.valueToCode(this, 'ITEM'+telemetry[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
											}
										}
										else
										{
											if (input.outputConnection.check_[0]==='Number')
											{
												code+='_tb.sendTelemetryFloat("'+this.getFieldValue('KEY'+telemetry[i])+'",'+Blockly.Arduino.valueToCode(this, 'ITEM'+telemetry[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
											}
											else if (input.outputConnection.check_[0]==='Boolean')
											{
												code+='_tb.sendTelemetryBool("'+this.getFieldValue('KEY'+telemetry[i])+'",'+Blockly.Arduino.valueToCode(this, 'ITEM'+telemetry[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
											}
										}
									}
									else
									{
										code+='_tb.sendTelemetryFloat("'+this.getFieldValue('KEY'+telemetry[i])+'",(float)'+Blockly.Arduino.valueToCode(this, 'ITEM'+telemetry[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
									}
								}
							}
						}
					}
					if (attributeCount>0)
					{
						for (var i=0;i<attributeCount;i++)
						{
							if (this.type_[attribute[i]]==='communications_wifi_iot_thingsboard_attribute_item')
							{
								var input = this.getInputTargetBlock('ITEM'+attribute[i]);
								if (input)
								{
									if (input.outputConnection.check_)
									{
										if (input.type==='variables_get')
										{
											if (Facilino.variables[input.last_variable][0]==='bool')
											{
												code+='_tb.sendAttributeBool("'+this.getFieldValue('KEY'+telemetry[i])+'",'+Blockly.Arduino.valueToCode(this, 'ITEM'+telemetry[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
											}
											else if (Facilino.variables[input.last_variable][0]==='float')
											{
												code+='_tb.sendAttributeFloat("'+this.getFieldValue('KEY'+telemetry[i])+'",'+Blockly.Arduino.valueToCode(this, 'ITEM'+telemetry[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
											}
											else if (Facilino.variables[input.last_variable][0]==='int' || Facilino.variables[input.last_variable][0]==='short' || Facilino.variables[input.last_variable][0]==='long' || Facilino.variables[input.last_variable][0]==='byte')
											{
												code+='_tb.sendAttributeFloat("'+this.getFieldValue('KEY'+telemetry[i])+'",(float)'+Blockly.Arduino.valueToCode(this, 'ITEM'+telemetry[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
											}
										}
										else
										{
											if (input.outputConnection.check_[0]==='Number')
											{
												code+='_tb.sendAttributeFloat("'+this.getFieldValue('KEY'+attribute[i])+'",'+Blockly.Arduino.valueToCode(this, 'ITEM'+attribute[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
											}
											else if (input.outputConnection.check_[0]==='Boolean')
											{
												code+='_tb.sendAttributeBool("'+this.getFieldValue('KEY'+attribute[i])+'",'+Blockly.Arduino.valueToCode(this, 'ITEM'+attribute[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
											}
										}
									}
									else
									{
										code+='_tb.sendAttributeFloat("'+this.getFieldValue('KEY'+attribute[i])+'",(float)'+Blockly.Arduino.valueToCode(this, 'ITEM'+attribute[i],Blockly.Arduino.ORDER_ATOMIC)+');\n';
									}
								}
							}
						}
					}
					return code;
				}

				Blockly.Blocks.communications_wifi_iot_thingsboard_send = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
					tags: ['wifi','esp8266'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_iot_thingsboard_send'),
					examples: [''],
					category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					keys: ['LANG_WIFI_IOT_THINGSBOARD_SEND_NAME','LANG_WIFI_IOT_THINGSBOARD_SEND','LANG_WIFI_IOT_THINGSBOARD_TELEMETRY','LANG_WIFI_IOT_THINGSBOARD_SEND_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_SEND_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_SEND')).appendField(new Blockly.FieldImage('img/blocks/thingsboard.svg',20*options.zoom, 20*options.zoom));
						this.setMutator(new Blockly.Mutator(['communications_wifi_iot_thingsboard_telemetry_item','communications_wifi_iot_thingsboard_attribute_item']));
						this.setInputsInline(false);
						this.setPreviousStatement(true,'code');
						this.setNextStatement(true,'code');
						this.setOutput(false);
						this.itemCount_ = 0;
						this.key_ = [];
						this.type_ = [];
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_DEVICEHUB_SEND_TOOLTIP'));
					},
					getVars: function() {
						return ['value'];
					},
					mutationToDom: function() {
						if (!this.itemCount_) {
							return null;
						}
						var container = document.createElement('mutation');
						if (this.itemCount_) {
							container.setAttribute('item', this.itemCount_);
						}

						if (this.itemCount_) {
							for (var x = 0; x < +this.itemCount_; x++){
								container.setAttribute('type'+x, this.type_[x]);
							}
						}

						if (this.itemCount_) {
							for (var x = 0; x < +this.itemCount_; x++){
								container.setAttribute('key'+x, this.key_[x]);
							}
						}
						return container;
					},
					domToMutation: function(xmlElement) {
						this.itemCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
						for (var x = 0; x < this.itemCount_; x++) {
							this.key_.push(xmlElement.getAttribute('key'+x));
							this.type_.push(xmlElement.getAttribute('type'+x));
							if (xmlElement.getAttribute('type'+x)==='communications_wifi_iot_thingsboard_telemetry_item')
							{
								var telemetryKeyInput = this.appendValueInput('ITEM'+x).setCheck([Number,'Variable']).appendField(new Blockly.FieldImage('img/blocks/telemetry_out.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_TELEMETRY')).appendField(new Blockly.FieldTextInput(''),'KEY'+x).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_VALUE')).setAlign(Blockly.ALIGN_RIGHT);
							}
							else if (xmlElement.getAttribute('type'+x)==='communications_wifi_iot_thingsboard_attribute_item')
							{
								this.appendValueInput('ITEM'+x).setCheck([Boolean,'Variable']).appendField(new Blockly.FieldImage('img/blocks/telemetry_out.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_ATTRIBUTE_ITEM')).appendField(new Blockly.FieldTextInput(''),'KEY'+x).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_VALUE')).setAlign(Blockly.ALIGN_RIGHT);
							}
						}
					},
					decompose: function(workspace) {
						var containerBlock = workspace.newBlock('communications_wifi_iot_thingsboard_send_stack');
						containerBlock.initSvg();
						var connection = containerBlock.getInput('STACK').connection;
						for (var x = 0; x < this.itemCount_; x++) {
							var taskBlock = workspace.newBlock(this.type_[x]);
							taskBlock.initSvg();
							connection.connect(taskBlock.previousConnection);
							connection = taskBlock.nextConnection;
						}
						return containerBlock;
					},
					compose: function(containerBlock) {
						// Disconnect all the task input blocks and remove the inputs.
						for (var x = this.itemCount_-1; x >= 0; x--) {
							this.removeInput('ITEM'+x);
						}
						this.itemCount_ = 0;
						// Rebuild the block's optional inputs.
						var clauseBlock = containerBlock.getInputTargetBlock('STACK');
						while (clauseBlock) {
							switch (clauseBlock.type) {
								case 'communications_wifi_iot_thingsboard_telemetry_item':
									if (clauseBlock.valueField_===undefined)
										clauseBlock.valueField_='key_name';
									var telemetryInput = this.appendValueInput('ITEM'+this.itemCount_).setCheck([Number,'Variable']).appendField(new Blockly.FieldImage('img/blocks/telemetry_out.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_TELEMETRY')).appendField(new Blockly.FieldTextInput(clauseBlock.valueField_),'KEY'+this.itemCount_).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_VALUE')).setAlign(Blockly.ALIGN_RIGHT);
									this.type_[this.itemCount_]=clauseBlock.type;
									this.itemCount_++;
									// Reconnect any child blocks.
									if (clauseBlock.valueConnection_) {
										telemetryInput.connection.connect(clauseBlock.valueConnection_);
									}
									break;
								case 'communications_wifi_iot_thingsboard_attribute_item':
									if (clauseBlock.valueField_===undefined)
										clauseBlock.valueField_='attribute_name';
									var telemetryInput = this.appendValueInput('ITEM'+this.itemCount_).setCheck([Boolean,'Variable']).appendField(new Blockly.FieldImage('img/blocks/telemetry_out.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_ATTRIBUTE_ITEM')).appendField(new Blockly.FieldTextInput(clauseBlock.valueField_),'KEY'+this.itemCount_).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_VALUE')).setAlign(Blockly.ALIGN_RIGHT);
									this.type_[this.itemCount_]=clauseBlock.type;
									this.itemCount_++;
									// Reconnect any child blocks.
									if (clauseBlock.valueConnection_) {
										telemetryInput.connection.connect(clauseBlock.valueConnection_);
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
								case 'communications_wifi_iot_thingsboard_telemetry_item':
									var input = this.getInput('ITEM' + x);
									clauseBlock.valueConnection_ = input && input.connection.targetConnection;
									clauseBlock.valueField_ = this.getFieldValue('KEY'+x);
									x++;
									break;
								case 'communications_wifi_iot_thingsboard_attribute_item':
									var input = this.getInput('ITEM' + x);
									clauseBlock.valueConnection_ = input && input.connection.targetConnection;
									clauseBlock.valueField_ = this.getFieldValue('KEY'+x);
									x++;
									break;
								default:
									throw 'Unknown block type.';
							}
							clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
						}
					}
				};

				Blockly.Blocks.communications_wifi_iot_thingsboard_send_stack = {
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					keys: ['LANG_WIFI_IOT_THINGSBOARD_TELEMETRY_DATA','LANG_WIFI_IOT_THINGSBOARD_TELEMETRY_DATA_TOOLTIP'],
					// Task.
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput()
							.appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_TELEMETRY_DATA'))
							.setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('STACK').setCheck('item');
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_TELEMETRY_DATA_TOOLTIP'));
						this.contextMenu = false;
					}
				};

				Blockly.Blocks.communications_wifi_iot_thingsboard_telemetry_item = {
						colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
						// Task item.
						keys: ['LANG_WIFI_IOT_THINGSBOARD_TELEMETRY','LANG_WIFI_IOT_THINGSBOARD_TELEMETRY_TOOLTIP'],
						init: function() {
							this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
							this.appendDummyInput()
								.appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_TELEMETRY'))
								.setAlign(Blockly.ALIGN_RIGHT);
							this.setPreviousStatement(true,'item');
							this.setNextStatement(true,'item');
							this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_TELEMETRY_TOOLTIP'));
							this.contextMenu = false;
						}
				};

				Blockly.Blocks.communications_wifi_iot_thingsboard_attribute_item = {
						colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
						// Task item.
						keys: ['LANG_WIFI_IOT_THINGSBOARD_ATTRIBUTE_ITEM','LANG_WIFI_IOT_THINGSBOARD_ATTRIBUTE_ITEM_TOOLTIP'],
						init: function() {
							this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
							this.appendDummyInput()
								.appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_ATTRIBUTE_ITEM'))
								.setAlign(Blockly.ALIGN_RIGHT);
							this.setPreviousStatement(true,'item');
							this.setNextStatement(true,'item');
							this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_ATTRIBUTE_ITEM_TOOLTIP'));
							this.contextMenu = false;
						}
				};

			Blockly.Arduino.communications_wifi_iot_amazon_echo = function() {
				var code = '';
				if (Facilino.profiles['processor']==='ESP8266')
				{
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
				}
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
				{
					Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				}

				Blockly.Arduino.definitions_['define_fauxmo'] = '#include <fauxmoESP.h>';
				Blockly.Arduino.definitions_['declare_var_fauxmo']='fauxmoESP _fauxmo;\n';
				Blockly.Arduino.setups_['setup_fauxmo']='_fauxmo.createServer(true);\n  _fauxmo.setPort(80);\n  _fauxmo.enable(true);\n';
				
				//code+=Blockly.Arduino.statementToCode(this,'STACK');
				
				var clauseBlock = this.getInputTargetBlock('STACK');
				while(clauseBlock)
				{
					Blockly.Arduino.setups_['setup_fauxmo']+='  _fauxmo.addDevice("'+clauseBlock.getFieldValue('DEVICE_NAME')+'");\n';
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
				Blockly.Arduino.setups_['setup_fauxmo']+='_fauxmo.onSetState([](unsigned char device_id, const char * device_name, bool state, unsigned char value) {\n';
				clauseBlock = this.getInputTargetBlock('STACK');
				while(clauseBlock)
				{
					Blockly.Arduino.setups_['setup_fauxmo']+='if ((strcmp(device_name,"'+clauseBlock.getFieldValue('DEVICE_NAME')+'")==0)){\n'+Blockly.Arduino.statementToCode(clauseBlock,'DEVICE_STACK')+'}\n';
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
				Blockly.Arduino.setups_['setup_fauxmo']+='});';
				/*for (var i=0;i<this.itemCount_;i++)
				{
					Blockly.Arduino.setups_['setup_fauxmo']+='  _fauxmo.addDevice("'+this.getFieldValue('DEVICE_NAME'+i)+'");\n';
				}
				Blockly.Arduino.setups_['setup_fauxmo']+='_fauxmo.onSetState([](unsigned char device_id, const char * device_name, bool state, unsigned char value) {\n';
				for (var i=0;i<this.itemCount_;i++)
				{
					Blockly.Arduino.setups_['setup_fauxmo']+='if ((strcmp(device_name,"'+this.getFieldValue('DEVICE_NAME'+i)+'")==0)){\n'+Blockly.Arduino.statementToCode(this,'DEVICE_STACK'+i)+'}\n';
				}
				Blockly.Arduino.setups_['setup_fauxmo']+='});';*/
				return code;
			}

			Blockly.Blocks.communications_wifi_iot_amazon_echo = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_iot_amazon_echo'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
				keys: ['LANG_WIFI_IOT_AMAZON_ECHO_NAME','LANG_WIFI_IOT_AMAZON_ECHO','LANG_WIFI_IOT_AMAZON_ECHO_DIGITAL_DEVICE','LANG_AMAZON_STATE','LANG_WIFI_IOT_AMAZON_ECHO_ANALOG_DEVICE','LANG_AMAZON_VALUE','LANG_WIFI_IOT_AMAZON_ECHO_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO')).appendField(new Blockly.FieldImage('img/blocks/amazon_echo.svg', 20*options.zoom, 30*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					//this.setMutator(new Blockly.Mutator(['communications_wifi_iot_amazon_echo_set_digital','communications_wifi_iot_amazon_echo_set_analog']));
					this.appendStatementInput('STACK').setCheck('echo_item');
					this.setInputsInline(false);
					this.setPreviousStatement(false);
					this.setNextStatement(false);
					//this.itemCount_=0;
					//this.name_=[];
					//this.type_=[];
					//this.variables=[];
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_TOOLTIP'));
					//this.disableAutomaticConnection=false;
				},
				isNotDuplicable: true,
				/*mutationToDom: function() {
					if (!this.itemCount_) {
						return null;
					}
					var container = document.createElement('mutation');
					if (this.itemCount_) {
						container.setAttribute('item', this.itemCount_);
					}
					if (this.itemCount_) {
						for (var x = 0; x < this.itemCount_; x++){
							container.setAttribute('device_name'+x, this.name_[x]);
						}
					}
					if (this.itemCount_) {
						for (var x = 0; x < this.itemCount_; x++){
							container.setAttribute('type'+x, this.type_[x]);
						}
					}
					return container;
				},
				domToMutation: function(xmlElement) {
					this.itemCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
					for (var x = 0; x < this.itemCount_; x++) {
						this.name_.push(xmlElement.getAttribute('device_name'+x));
						this.type_.push(xmlElement.getAttribute('type'+x));
						if (xmlElement.getAttribute('type'+x)==='communications_wifi_iot_amazon_echo_set_digital')
						{
							this.appendDummyInput('DEVICE'+x).appendField(new Blockly.FieldImage('img/blocks/home_automation.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_DIGITAL_DEVICE')).appendField(new Blockly.FieldTextInput(''),'DEVICE_NAME'+x).setAlign(Blockly.ALIGN_LEFT);
							this.appendValueInput('STATE'+x).appendField(Facilino.locales.getKey('LANG_AMAZON_STATE')).setCheck(Number);
							this.appendStatementInput('DEVICE_STACK'+x);
						}
						if (xmlElement.getAttribute('type'+x)==='communications_wifi_iot_amazon_echo_set_analog')
						{
							this.appendDummyInput('DEVICE'+x).appendField(new Blockly.FieldImage('img/blocks/home_automation.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_ANALOG_DEVICE')).appendField(new Blockly.FieldTextInput(''),'DEVICE_NAME'+x).setAlign(Blockly.ALIGN_LEFT);
							this.appendValueInput('STATE'+x).appendField(Facilino.locales.getKey('LANG_AMAZON_VALUE')).setCheck(Boolean);
							this.appendStatementInput('DEVICE_STACK'+x);
						}
					}
				},
				decompose: function(workspace) {
					var containerBlock = workspace.newBlock('communications_wifi_iot_amazon_echo_stack');
					containerBlock.initSvg();
					var connection = containerBlock.getInput('STACK').connection;
					this.disableAutomaticConnection=true;
					for (var x = 0; x < this.itemCount_; x++) {
						var taskBlock = workspace.newBlock(this.type_[x]);
						taskBlock.initSvg();
						connection.connect(taskBlock.previousConnection);
						connection = taskBlock.nextConnection;
					}
					this.disableAutomaticConnection=false;
					return containerBlock;
				},
				compose: function(containerBlock) {
					// Disconnect all the task input blocks and remove the inputs.
					for (var x = this.itemCount_-1; x >= 0; x--) {
						this.removeInput('DEVICE'+x);
						this.removeInput('STATE'+x);
						this.removeInput('DEVICE_STACK'+x);
					}
					this.itemCount_ = 0;
					// Rebuild the block's optional inputs.
					var clauseBlock = containerBlock.getInputTargetBlock('STACK');
					while (clauseBlock) {
						switch (clauseBlock.type) {
							case 'communications_wifi_iot_amazon_echo_set_digital':
								if (clauseBlock.valueField_===undefined)
									clauseBlock.valueField_='device_name';
								this.appendDummyInput('DEVICE'+this.itemCount_).appendField(new Blockly.FieldImage('img/blocks/home_automation.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_DIGITAL_DEVICE')).appendField(new Blockly.FieldTextInput(clauseBlock.valueField_),'DEVICE_NAME'+this.itemCount_).setAlign(Blockly.ALIGN_LEFT);
								this.appendValueInput('STATE'+this.itemCount_).appendField(Facilino.locales.getKey('LANG_AMAZON_STATE')).setCheck(Boolean);
								var telemetryInput = this.appendStatementInput('DEVICE_STACK'+this.itemCount_);
								this.type_[this.itemCount_]=clauseBlock.type;
								
								if (this.disableAutomaticConnection===true)
								{
									var valueBlock = Blockly.mainWorkspace.newBlock('communications_wifi_iot_amazon_echo_state');
									valueBlock.initSvg();
									valueBlock.render();
									this.getInput('STATE'+this.itemCount_).connection.connect(valueBlock.outputConnection);
								}
								
								this.itemCount_++;
								// Reconnect any child blocks.
								if (clauseBlock.valueConnection_) {
									telemetryInput.connection.connect(clauseBlock.valueConnection_);
								}
								break;
							case 'communications_wifi_iot_amazon_echo_set_analog':
								if (clauseBlock.valueField_===undefined)
									clauseBlock.valueField_='device_name';
								this.appendDummyInput('DEVICE'+this.itemCount_).appendField(new Blockly.FieldImage('img/blocks/home_automation.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_ANALOG_DEVICE')).appendField(new Blockly.FieldTextInput(clauseBlock.valueField_),'DEVICE_NAME'+this.itemCount_).setAlign(Blockly.ALIGN_LEFT);
								this.appendValueInput('STATE'+this.itemCount_).appendField(Facilino.locales.getKey('LANG_AMAZON_VALUE')).setCheck(Number);
								var telemetryInput = this.appendStatementInput('DEVICE_STACK'+this.itemCount_);
								this.type_[this.itemCount_]=clauseBlock.type;
								
								console.log(this.getInputTargetBlock('STATE'+this.itemCount_));
								//if (this.getInputTargetBlock('STATE'+this.itemCount_)===null)
								//{
								//	
								//	var valueBlock = Blockly.mainWorkspace.newBlock('communications_wifi_iot_amazon_echo_value');
								//	valueBlock.initSvg();
								//	valueBlock.render();
								//	this.getInput('STATE'+this.itemCount_).connection.connect(valueBlock.outputConnection);
								//}
								
								this.itemCount_++;
								// Reconnect any child blocks.
								if (clauseBlock.valueConnection_) {
									telemetryInput.connection.connect(clauseBlock.valueConnection_);
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
							case 'communications_wifi_iot_amazon_echo_set_digital':
								var input = this.getInput('DEVICE_STACK' + x);
								clauseBlock.valueConnection_ = input && input.connection.targetConnection;
								clauseBlock.valueField_ = this.getFieldValue('DEVICE_NAME'+x);
								x++;
								break;
							case 'communications_wifi_iot_amazon_echo_set_analog':
								var input = this.getInput('DEVICE_STACK' + x);
								clauseBlock.valueConnection_ = input && input.connection.targetConnection;
								clauseBlock.valueField_ = this.getFieldValue('DEVICE_NAME'+x);
								x++;
								break;
							default:
								throw 'Unknown block type.';
						}
						clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
					}
				},
				getVars: function() {
					return this.variables;
				},
				onchange: function() {
					function hasNoDuplicates(arr){
						return arr.every(function(val){
						return arr.indexOf(val) === arr.lastIndexOf(val)
						});
					}
					this.name_=[];
					for (var x = 0; x < this.itemCount_; x++) {
						this.name_.push(this.getFieldValue('DEVICE_NAME'+x));
					}
					if (hasNoDuplicates(this.name_))
						this.setWarningText(null);
					else
						this.setWarningText('Duplicate device names!');
					this.variables = [];
					for (var x = 0; x < this.itemCount_; x++)
					{
						if (this.type_[x]==='communications_wifi_iot_amazon_echo_set_digital')
						{
							//this.variables.push('state');
							//try{ this.getInput('STATE'+x).removeField('VARIABLES') } catch (e) {}
							//this.getInput('STATE'+x).appendField(new Blockly.FieldDropdown([['state']]),'VARIABLES');
						}
						else if (this.type_[x]==='communications_wifi_iot_amazon_echo_set_analog')
						{
							//this.variables.push('value');
							//try{ this.getInput('STATE'+x).removeField('VARIABLES') } catch (e) {}
							//this.getInput('STATE'+x).appendField(new Blockly.FieldDropdown([['value']]),'VARIABLES');
						}
					}
					var uniqueVariables = [];
					$.each(this.variables, function(i, el){
						if($.inArray(el, uniqueVariables) === -1) uniqueVariables.push(el);
					});
					this.variables = uniqueVariables;
				}*/
			};

			/*Blockly.Blocks.communications_wifi_iot_amazon_echo_stack = {
				colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
				keys: ['LANG_WIFI_IOT_AMAZON_ECHO','LANG_WIFI_IOT_AMAZON_ECHO_TOOLTIP'],
				// Task.
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
					this.appendDummyInput()
						.appendField(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO'))
						.setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('STACK').setCheck('item');
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_TOOLTIP'));
					this.contextMenu = false;
				}
			};*/
			
			Blockly.Arduino.communications_wifi_iot_amazon_echo_digital = function()
				{
					var code='';
					return code;
				}
				
				
				Blockly.Blocks.communications_wifi_iot_amazon_echo_digital = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_bool'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					keys: ['LANG_WIFI_API_REST_MESSAGE_BOOL_READ_NAME','LANG_WIFI_API_REST_MESSAGE_BOOL_READ','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_BOOL_READ_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput('DEVICE').appendField(new Blockly.FieldImage('img/blocks/home_automation.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_DIGITAL_DEVICE')).appendField(new Blockly.FieldTextInput('name'),'DEVICE_NAME').setAlign(Blockly.ALIGN_LEFT);
						this.appendValueInput('STATE').appendField(Facilino.locales.getKey('LANG_AMAZON_STATE')).setAlign(Blockly.ALIGN_RIGHT).setCheck(Boolean);
						this.appendStatementInput('DEVICE_STACK').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');						
						this.setPreviousStatement(true,'echo_item');
						this.setNextStatement(true,'echo_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_TOOLTIP'));
					},
					default_inputs: function()
					{
						return '<value name="STATE"><block type="communications_wifi_iot_amazon_echo_state"></block></value>';
					},
					onchange: function() {
						if (this.getInputTargetBlock('STATE')===null)
						{
							var valueBlock = Blockly.mainWorkspace.newBlock('communications_wifi_iot_amazon_echo_state');
							valueBlock.initSvg();
							valueBlock.render();
							this.getInput('STATE').connection.connect(valueBlock.outputConnection);
						}
					}
				};
				
				Blockly.Arduino.communications_wifi_iot_amazon_echo_analog = function()
				{					
					var code='';
					/*var branch_code='';
					var branch_end_code='';
					var argument_code='';
					Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
					Blockly.Arduino.definitions_['declare_var_ints_map'] = 'std::map<int,int> _ints={};\n';
			
					argument_code='_http_header.indexOf("GET /Integer/")>=0';
					branch_code+='	int index;\n';
					branch_code+='	int value;\n';
					branch_code+='  _resp["status"]="OK";\n';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	index=_http_header.substring(13,q).toInt();\n';
					branch_code+='	value=_http_header.substring(q+7,idx_end).toInt();\n';
					branch_code+='  _ints[index]=value;\n';
					branch_code+='}\n';
					branch_code+='else{\n';
					//Get bool variable and build response
					branch_code+='  index=_http_header.substring(13,idx_end).toInt();\n';
					branch_code+='  value=_ints[index];\n';
					branch_code+='  _resp["index"]=index;\n';
					branch_code+='  _resp["value"]=value;\n';
					branch_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+Blockly.Arduino.statementToCode(this,'DO')+'	}\n';*/
					return code;
				}
				
				
				
				Blockly.Blocks.communications_wifi_iot_amazon_echo_analog = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_integer'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					keys: ['LANG_WIFI_API_REST_MESSAGE_INTEGER_NAME','LANG_WIFI_API_REST_MESSAGE_INTEGER','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_INTEGER_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput('DEVICE').appendField(new Blockly.FieldImage('img/blocks/home_automation.svg',20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_ANALOG_DEVICE')).appendField(new Blockly.FieldTextInput('name'),'DEVICE_NAME').setAlign(Blockly.ALIGN_LEFT);
						this.appendValueInput('VALUE').appendField(Facilino.locales.getKey('LANG_AMAZON_VALUE')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DEVICE_STACK').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');							
						this.setPreviousStatement(true,'echo_item');
						this.setNextStatement(true,'echo_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						return '<value name="VALUE"><block type="communications_wifi_iot_amazon_echo_value"></block></value>';
					},
					onchange: function() {
						if (this.getInputTargetBlock('VALUE')===null)
						{
							var valueBlock = Blockly.mainWorkspace.newBlock('communications_wifi_iot_amazon_echo_value');
							valueBlock.initSvg();
							valueBlock.render();
							this.getInput('VALUE').connection.connect(valueBlock.outputConnection);
						}
					}
				};
			
			
			

			/*Blockly.Blocks.communications_wifi_iot_amazon_echo_set_digital = {
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					// Task item.
					keys: ['LANG_WIFI_IOT_AMAZON_ECHO_DIGITAL_DEVICE','LANG_WIFI_IOT_AMAZON_ECHO_DIGITAL_DEVICE_TOOLTIP'],
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput()
							.appendField(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_DIGITAL_DEVICE'))
							.setAlign(Blockly.ALIGN_RIGHT);
						this.setPreviousStatement(true,'item');
						this.setNextStatement(true,'item');
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_DIGITAL_DEVICE_TOOLTIP'));
						this.contextMenu = false;
					}
			};

			Blockly.Blocks.communications_wifi_iot_amazon_echo_set_analog = {
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					// Task item.
					keys: ['LANG_WIFI_IOT_AMAZON_ECHO_ANALOG_DEVICE','LANG_WIFI_IOT_AMAZON_ECHO_ANALOG_DEVICE_TOOLTIP'],
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput()
							.appendField(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_ANALOG_DEVICE'))
							.setAlign(Blockly.ALIGN_RIGHT);
						this.setPreviousStatement(true,'item');
						this.setNextStatement(true,'item');
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_ANALOG_DEVICE_TOOLTIP'));
						this.contextMenu = false;
					}
			};*/
			
			Blockly.Arduino.communications_wifi_iot_amazon_echo_state = function() {
					var code = 'state';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

			Blockly.Blocks.communications_wifi_iot_amazon_echo_state = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
					tags: ['bluetooth','communication'],
					helpUrl: '',
					examples: [],
					category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
					colour: Facilino.LANG_COLOUR_VARIABLES,
					keys: [],
					name: '',
					toolbox_hidden: true,
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_VARIABLES);
						this.appendDummyInput('').appendField('state').setAlign(Blockly.ALIGN_RIGHT);
						this.setOutput(true,Boolean);
						this.contextMenu = false;
					}
			};
			
			Blockly.Arduino.communications_wifi_iot_amazon_echo_value = function() {
					var code = 'value';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}
				
				Blockly.Blocks.communications_wifi_iot_amazon_echo_value = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
						tags: ['bluetooth','communication'],
						helpUrl: '',
						examples: [],
						category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
						colour: Facilino.LANG_COLOUR_VARIABLES,
						keys: [],
						name: '',
						toolbox_hidden: true,
						init: function() {
							this.setColour(Facilino.LANG_COLOUR_VARIABLES);
							this.appendDummyInput('').appendField('value').setAlign(Blockly.ALIGN_RIGHT);
							this.setOutput(true,Number);
							this.contextMenu = false;
						}
				};

			Blockly.Arduino.communications_wifi_iot_amazon_echo_update = function() {
					var code='';
					if (Facilino.profiles['processor']==='ESP8266')
					{
						Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
					}
					else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
					{
						Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
					}

					Blockly.Arduino.definitions_['define_fauxmo'] = '#include <fauxmoESP.h>';
					Blockly.Arduino.definitions_['declare_var_fauxmo']='fauxmoESP _fauxmo;\n';
					code+='_fauxmo.handle();\n';
					return code;
				}

				Blockly.Blocks.communications_wifi_iot_amazon_echo_update = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
					tags: ['wifi','esp8266','communications','amazon','echo'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_iot_amazon_echo_update'),
					examples: [''],
					category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
					colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
					keys: ['LANG_WIFI_IOT_AMAZON_ECHO_UPDATE_NAME','LANG_WIFI_IOT_AMAZON_UPDATE','LANG_WIFI_IOT_AMAZON_ECHO_UPDATE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_UPDATE_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_UPDATE')).appendField(new Blockly.FieldImage('img/blocks/amazon_echo.svg', 20*options.zoom, 30*options.zoom));
						this.setInputsInline(false);
						this.setPreviousStatement(true,'code');
						this.setNextStatement(true,'code');
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_AMAZON_ECHO_UPDATE_TOOLTIP'));
					}
				};


			/*Blockly.Arduino.communications_wifi_iot_thingsboard_rpc_value = function() {
				var gpio = Blockly.Arduino.valueToCode(this, 'GPIO', Blockly.Arduino.ORDER_NONE) ||'""';
				var code = '_remote_value';
				return [code,Blockly.Arduino.ORDER_ATOMIC];
			}

			Blockly.Blocks.communications_wifi_iot_thingsboard_rpc_value = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_iot_thingsboard_rpc_value'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
				keys: ['LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE','LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE_TOOLTIP','LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE_WARN'],
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE')).appendField(new Blockly.FieldImage('img/blocks/telemetry_in.svg',20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(false);
					this.setNextStatement(false);
					this.setOutput(true,[Boolean,Number]);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE_TOOLTIP'));
					this.setWarningText(Facilino.locales.getKey('LANG_WIFI_IOT_THINGSBOARD_RPC_VALUE_WARN'));
				}
			};*/

			/*Blockly.Arduino.communications_wifi_iot_setup_mail= function() {
				var login = Blockly.Arduino.valueToCode(this, 'LOGIN', Blockly.Arduino.ORDER_NONE);
				var password = Blockly.Arduino.valueToCode(this, 'PASSWORD', Blockly.Arduino.ORDER_NONE);
				login=login.substr(1);
				login=login.substr(0,login.length-1);
				password=password.substr(1);
				password=password.substr(0,password.length-1);
				if (Facilino.profiles['processor']==='ESP8266')
						Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
					else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
						Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				Blockly.Arduino.definitions_['define_wifisecure'] = '#include <WiFiClientSecure.h>\n';
				Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClientSecure _client;\n';

				Blockly.Arduino.definitions_['declare_var_GMail_login'] = 'const char* _GMailLogin = "'+btoa(login)+'";\n';
				Blockly.Arduino.definitions_['declare_var_GMail_password'] = 'const char* _GMailPassword = "'+btoa(password)+'";\n';
				Blockly.Arduino.definitions_['declare_var_GMail_from'] = 'const char* _GMailFrom = "'+login+'";\n';
				var code='';
				return code;
			}

			Blockly.Blocks.communications_wifi_iot_setup_mail = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
				tags: ['wifi','esp8266'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_iot_setup_mail'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
				keys: ['LANG_WIFI_IOT_SETUP_MAIL_NAME','LANG_WIFI_IOT_SETUP_MAIL','LANG_WIFI_IOT_SEND_MAIL_LOGIN','LANG_WIFI_IOT_SEND_MAIL_PASSWORD','LANG_WIFI_IOT_SETUP_MAIL_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_IOT_SETUP_MAIL_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_SETUP_MAIL')).appendField(new Blockly.FieldImage('img/blocks/gmail-logo.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('LOGIN').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_SEND_MAIL_LOGIN')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PASSWORD').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_SEND_MAIL_PASSWORD')).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_SETUP_MAIL_TOOLTIP'));
				},
				isNotDuplicable: true
			};


			Blockly.Arduino.communications_wifi_iot_send_mail= function() {
				var to = Blockly.Arduino.valueToCode(this, 'TO', Blockly.Arduino.ORDER_NONE);
				var subject = Blockly.Arduino.valueToCode(this, 'SUBJECT', Blockly.Arduino.ORDER_NONE);
				var message = Blockly.Arduino.valueToCode(this, 'MESSAGE', Blockly.Arduino.ORDER_NONE);
				var code = 'GMailSend('+to+','+subject+','+message+');\n';
				Blockly.Arduino.definitions_['define_GMailWaitSMTPResponse']='bool GMailWaitSMTPResponse(const String &resp)\n{\n  uint16_t timeOut=10000;\n  uint32_t ts = millis();\n  String _serverResponse;\n  while (!_client.available())\n  {\n	if(millis() > (ts + timeOut)) {\n	  return false;\n	}\n  }\n  _serverResponse = _client.readStringUntil(\'\\n\');\n  if (resp && _serverResponse.indexOf(resp) == -1) return false;\n  return true;\n}\n';
				Blockly.Arduino.definitions_['define_GMailSend']='void GMailSend(const String &to, const String &subject, const String &message)\n{\n  if(!_client.connect("smtp.gmail.com",465)) {\n	 return;\n  }\n  if(!GMailWaitSMTPResponse("220")){\n	return;\n  }\n  _client.println("HELO friend");\n  if(!GMailWaitSMTPResponse("250")){\n	return;\n  }\n  _client.println("AUTH LOGIN");\n  GMailWaitSMTPResponse("234");\n  _client.println(_GMailLogin);\n  GMailWaitSMTPResponse("234");\n  _client.println(_GMailPassword);\n  if (!GMailWaitSMTPResponse("235")) {\n	return;\n  }\n  String mailFrom = "MAIL FROM: <" + String(_GMailFrom) + \'>\';\n  _client.println(mailFrom);\n  GMailWaitSMTPResponse("");\n  String rcpt = "RCPT TO: <" + to + \'>\';\n  _client.println(rcpt);\n  GMailWaitSMTPResponse("");\n  _client.println("DATA");\n  if(!GMailWaitSMTPResponse("354")) {\n	return;\n  }\n  _client.println("From: <" + String(_GMailFrom) + \'>\');\n  _client.println("To: <" + to + \'>\');\n	_client.print("Subject: ");\n  _client.println(subject);\n	_client.println("Mime-Version: 1.0");\n  _client.println("Content-Type: text/html; charset=\\"UTF-8\\"");\n  _client.println("Content-Transfer-Encoding: 7bit");\n  _client.println();\n  String body = "<!DOCTYPE html><html lang=\\"en\\">" + message + "</html>";\n  _client.println(body);\n  _client.println(".");\n  if (!GMailWaitSMTPResponse("250")) {\n	return;\n  }\n  _client.println("QUIT");\n  if (!GMailWaitSMTPResponse("221")) {\n	return;\n  }\n}\n';
				return code;
			}

			Blockly.Blocks.communications_wifi_iot_send_mail = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
				tags: ['wifi','esp8266'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_iot_send_mail'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
				keys: ['LANG_WIFI_IOT_SEND_MAIL_NAME','LANG_WIFI_IOT_SEND_MAIL','LANG_WIFI_IOT_SEND_MAIL_TO','LANG_WIFI_IOT_SEND_MAIL_SUBJECT','LANG_WIFI_IOT_SEND_MAIL_MESSAGE','LANG_WIFI_IOT_SEND_MAIL_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_IOT_SEND_MAIL_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_SEND_MAIL')).appendField(new Blockly.FieldImage('img/blocks/gmail-logo.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('TO').setCheck([String,'Variable']).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_SEND_MAIL_TO')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('SUBJECT').setCheck([String,'Variable']).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_SEND_MAIL_SUBJECT')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('MESSAGE').setCheck([String,'Variable']).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_SEND_MAIL_MESSAGE')).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_SEND_MAIL_TOOLTIP'));
				}
			};*/

			Blockly.Arduino.communications_wifi_iot_gsheets_setup = function() {
				var code = '';
				var gscripts = Blockly.Arduino.valueToCode(this, 'SCRIPTS_ID', Blockly.Arduino.ORDER_NONE);
				gscripts=gscripts.substr(1,gscripts.length-2);
				if (Facilino.profiles['processor']==='ESP8266')
						Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
					else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
						Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				Blockly.Arduino.definitions_['define_httpsredirect'] = '#include <HTTPSRedirect.h>\n';
				Blockly.Arduino.definitions_['declare_var_wifi_httpsredirect'] = 'HTTPSRedirect _clientHTTPS;\n';
				Blockly.Arduino.definitions_['declare_var_gscripts_url'] = 'const char *url = "/macros/s/'+gscripts+'/exec";\n';
				Blockly.Arduino.definitions_['declare_var_host'] = 'const char* host = "script.google.com";\n';
				code ='_clientHTTPS.setPrintResponseBody(false);\n  _clientHTTPS.setContentTypeHeader("application/json");\n  if (!_clientHTTPS.connect("accounts.google.com", 443)) {\n	return;\n  }\n';
				return code;
			}

			Blockly.Blocks.communications_wifi_iot_gsheets_setup = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_iot_gsheets_setup'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
				keys: ['LANG_WIFI_IOT_GSHEETS_SETUP_NAME','LANG_WIFI_IOT_GSHEETS_SETUP','LANG_WIFI_IOT_GSCRIPTS_ID','LANG_WIFI_ESP8266_CERT','LANG_WIFI_IOT_GSHEETS_SETUP_TOOPTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_SETUP_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_SETUP')).appendField(new Blockly.FieldImage('img/blocks/google-sheets.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('SCRIPTS_ID').setCheck([String,'Variable']).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_GSCRIPTS_ID')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_CERT')).appendField(new Blockly.FieldCheckbox('FALSE'),'CERT').setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_SETUP_TOOPTIP'));
				},
				isNotDuplicable: true
			};

			/*Blockly.Arduino.communications_wifi_iot_gsheets_update= function() {
				var code='';
				return code;
			}

			Blockly.Blocks.communications_wifi_iot_gsheets_update = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
				tags: ['wifi','esp8266'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_iot_gsheets_update'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
				keys: ['LANG_WIFI_IOT_GSHEETS_UPDATE','LANG_WIFI_IOT_GSHEETS_ID','LANG_WIFI_IOT_GSHEETS_ACCESS_TOKEN','LANG_WIFI_IOT_GSHEETS_RANGE','LANG_WIFI_IOT_GSHEETS_VALUE','LANG_WIFI_IOT_GSHEETS_UPDATE_TOOLTIP'],
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_UPDATE')).appendField(new Blockly.FieldImage('img/blocks/google-sheets.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('ID').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_ID')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('ACCESS_TOKEN').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_ACCESS_TOKEN')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('RANGE').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_RANGE')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('VALUE').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_VALUE')).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_UPDATE_TOOLTIP'));
				}
			};*/

			Blockly.Arduino.communications_wifi_iot_gsheets_append= function() {
				var sheetname = Blockly.Arduino.valueToCode(this, 'SHEETNAME', Blockly.Arduino.ORDER_NONE);
				var code='';
				var input = this.getInputTargetBlock('VALUES');
				if (input!==null)
				{
					if (input.type==='math_1DArray_constructor')
					{
						if (input.itemCount_>0)
						{
							code='{\n  float data['+input.itemCount_+']={'+Blockly.Arduino.valueToCode(input,'ITEM0', Blockly.Arduino.ORDER_NONE);
							for (var i=1;i<input.itemCount_;i++)
							{
								code+=','+Blockly.Arduino.valueToCode(input,'ITEM'+i, Blockly.Arduino.ORDER_NONE);
							}
							code+='};\n'
							code+='  GSheets_appendData('+sheetname+',data,'+input.itemCount_+');\n}\n';
						}
					}
					else if (input.type==='variables_get')
					{
						var value = Blockly.Arduino.valueToCode(this, 'VALUES', Blockly.Arduino.ORDER_NONE);
						if (Facilino.variables[value][2]==='variable')
						  code+='GSheets_appendData('+sheetname+',&'+value+',0);\n';
						else if (Facilino.variables[value][2]==='1DArray')
						  code+='GSheets_appendData('+sheetname+','+value+','+Facilino.variables[value][3]+');\n';
					}
					else
					{
						var value = Blockly.Arduino.valueToCode(this, 'VALUES', Blockly.Arduino.ORDER_NONE);
						code+='{\n  float data='+value+';\n';
						code+='  GSheets_appendData('+sheetname+',&data,0);\n}\n';
					}
				}
				Blockly.Arduino.definitions_['define_GSheets_appendData']='void GSheets_appendData(String sheetname, const float data[], int dataLength){\n  const char* payload_close = "\\"}";\n  String payload = "{\\"command\\": \\"appendRow\\", \\"sheet_name\\": ";\n  payload+="\\""+sheetname+"\", \\"values\\": \\"";\n  payload+=data[0];\n  for (int i=1;i<dataLength;i++)\n	payload+= "," + String(data[i]);\n  payload+=payload_close;\n  _clientHTTPS.POST(url, host, payload,false);\n}\n';
				return code;
			}

			Blockly.Blocks.communications_wifi_iot_gsheets_append = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_IOT'),
				tags: ['wifi','esp8266'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_iot_gsheets_append'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_IOT,
				keys: ['LANG_WIFI_IOT_GSHEETS_APPEND_NAME','LANG_WIFI_IOT_GSHEETS_APPEND','LANG_WIFI_IOT_GSHEETS_SHEETNAME','LANG_WIFI_IOT_GSHEETS_VALUES','LANG_WIFI_IOT_GSHEETS_APPEND_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_APPEND_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_IOT);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_APPEND')).appendField(new Blockly.FieldImage('img/blocks/google-sheets.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('SHEETNAME').setCheck([String,'Variable']).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_SHEETNAME')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('VALUES').setCheck([Number,'Variable']).appendField(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_VALUES')).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_IOT_GSHEETS_APPEND_TOOLTIP'));
				}
			};
				}
		}
	
	}
	
	var FacilinoIoT = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoIoT;
	} else {
		window.FacilinoIoT = FacilinoIoT;
	}
}));
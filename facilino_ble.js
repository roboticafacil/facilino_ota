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
	if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
		{
			Blockly.Arduino.ble_device_server = function() {
				var code = '';
				var device_name = this.getFieldValue('NAME');
				Blockly.Arduino.definitions_['BLEDevice'] = '#include <BLEDevice.h>';
				Blockly.Arduino.definitions_['BLEUtils'] = '#include <BLEUtils.h>';
				Blockly.Arduino.definitions_['BLEServer'] = '#include <BLEServer.h>';
				Blockly.Arduino.definitions_['BLE2902']='#include <BLE2902.h>';

				Blockly.Arduino.setups_['setup_ble_device_init']='BLEDevice::init("'+device_name+'");\n';
				Blockly.Arduino.setups_['setup_ble_create_server']='BLEServer *pServer = BLEDevice::createServer();\n';
				Blockly.Arduino.setups_['setup_ble_create_server']+='  pServer->setCallbacks(new MyBLEServerCallbacks());\n';
				var connect_code = Blockly.Arduino.statementToCode(this,'CONNECT') || "\n";
				var disconnect_code = Blockly.Arduino.statementToCode(this,'DISCONNECT') || "\n";
				Blockly.Arduino.definitions_['define_class_ble_server_callbacks']='class MyBLEServerCallbacks: public BLEServerCallbacks {\n  void onConnect(BLEServer* pServer) {\n	'+connect_code+'  };\n  void onDisconnect(BLEServer* pServer) {\n	'+disconnect_code+'  };\n};\n';
				var i=0;
				for (i=0;i<this.servCount_;i++)
				{
					var service_input=this.getInputTargetBlock('SERVICE'+i);
					if (service_input!==null)
					{
						var service_uuid = service_input.getFieldValue('SERVICE_UUID');
						Blockly.Arduino.setups_['setup_ble_create_service'+service_uuid]='BLEService *pService = pServer->createService("'+service_uuid+'");\n';
						var j=0;
						for (j=0;j<service_input.charCount_;j++)
						{
							var characteristic_input=service_input.getInputTargetBlock('CHARACTERISTIC'+j);
							if (characteristic_input!==null)
							{
								var characteristic_name = characteristic_input.getFieldValue('CHARACTERISTIC_NAME');
								var characteristic_uuid = characteristic_input.getFieldValue('CHARACTERISTIC_UUID');
								var characteristic_var = 'pChar_'+characteristic_name;
								Blockly.Arduino.definitions_['declare_var_ble_characteristic'+characteristic_name]='BLECharacteristic *'+characteristic_var+';\n';
								var options_str='';
								options_str='BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_NOTIFY';
								/*if (characteristic_input.getFieldValue('READ')==='TRUE')
								{
									if (characteristic_input.getFieldValue('WRITE')==='TRUE')
									{
										if (characteristic_input.getFieldValue('NOTIFIES')==='TRUE')
											options_str='BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_NOTIFY';
										else
											options_str='BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_WRITE';
									}
									else if (characteristic_input.getFieldValue('NOTIFIES')==='TRUE')
									{
										options_str='BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY';
									}
									else
									{
										options_str='BLECharacteristic::PROPERTY_READ ';
									}
									characteristic_input.setWarningText(null);
								}
								else if (characteristic_input.getFieldValue('WRITE')==='TRUE')
								{
									if (characteristic_input.getFieldValue('NOTIFIES')==='TRUE')
										options_str='BLECharacteristic::PROPERTY_WRITE | BLECharacteristic::PROPERTY_NOTIFY';
									else
										options_str='BLECharacteristic::PROPERTY_WRITE';
									characteristic_input.setWarningText(null);
								}
								else if (characteristic_input.getFieldValue('NOTIFIES')==='TRUE')
								{
									options_str='BLECharacteristic::PROPERTY_NOTIFY';
									characteristic_input.setWarningText(null);
								}
								else
								{
									characteristic_input.setWarningText('At least one option should be selected');
								}*/
								Blockly.Arduino.setups_['setup_ble_create_characteristic'+characteristic_name]=characteristic_var+'=pService->createCharacteristic("'+characteristic_uuid+'",'+options_str+');\n';
								//if (characteristic_input.getFieldValue('WRITE')==='TRUE')
								{
									Blockly.Arduino.setups_['setup_ble_create_characteristic'+characteristic_name]+=characteristic_var+'->setCallbacks(new CharacteristicCallbacks_'+characteristic_name+'());\n';
									var write_code = Blockly.Arduino.statementToCode(characteristic_input,'CALLBACK') || "\n";
									//var write_code = Blockly.Arduino.valueToCode(characteristic_input,'CALLBACK') || "";
									Blockly.Arduino.definitions_['define_class_ble_characteristic_callbacks'+characteristic_name]='class CharacteristicCallbacks_'+characteristic_name+': public BLECharacteristicCallbacks {\n  void onWrite(BLECharacteristic *pCharacteristic) {\n	'+write_code+'\n };\n};\n';
								}
								Blockly.Arduino.setups_['setup_ble_create_characteristic'+characteristic_name]+=characteristic_var+'->addDescriptor(new BLE2902());\n';
							}
						}
						Blockly.Arduino.setups_['setup_ble_start_service'+service_uuid]='pService->start();\n';
					}
					//
				}
				Blockly.Arduino.setups_['setup_ble_advertise_server']='BLEAdvertising *pAdvertising = pServer->getAdvertising();\n  BLEAdvertisementData adv;\n  adv.setName("'+device_name+'");\n  pAdvertising->setAdvertisementData(adv);\n  pAdvertising->start();\n';
				return code;
			};

			Blockly.Blocks.ble_device_server = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
				subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLE'),
				tags: ['ble','bluetooth','server'],
				helpUrl: Facilino.getHelpUrl('ble_device_server'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
				keys: ['LANG_BLE_SERVER_SETUP_NAME','LANG_BLE_SERVER_SETUP','LANG_BLE_NAME','LANG_BLE_SERVER_UUID','LANG_BLE_SERVER_ON_CONNECT','LANG_BLE_SERVER_ON_DISCONNECT','LANG_BLE_SERVER_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_BLE_SERVER_SETUP_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLE_SERVER_SETUP')).appendField(Facilino.locales.getKey('LANG_BLE_NAME')).appendField(new Blockly.FieldTextInput('MyDevice'),'NAME').appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					//this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLE_DEVICE_MANUFACTURER')).appendField(new Blockly.FieldTextInput('MyCompany'),'MANUFACTURER').setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('CONNECT').appendField(Facilino.locales.getKey('LANG_BLE_SERVER_ON_CONNECT'));
					this.appendStatementInput('DISCONNECT').appendField(Facilino.locales.getKey('LANG_BLE_SERVER_ON_DISCONNECT'));
					this.appendValueInput('SERVICE0').appendField(Facilino.locales.getKey('LANG_BLE_SERVICE')).setCheck('ble_service').appendField(new Blockly.FieldImage('img/blocks/bubble-chat.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.setOutput(false);
					this.setMutator(new Blockly.Mutator(['ble_service_item']));
					this.setPreviousStatement(false);
					this.setInputsInline(false);
					this.setNextStatement(false);
					this.setTooltip(Facilino.locales.getKey('LANG_BLE_SERVER_TOOLTIP'));
					this.servCount_ = 1;
				},
				default_inputs: function ()
				{
					return '<value name="SERVICE0"><block type="ble_service"><value name="CHARACTERISTIC0"><block type="ble_characteristic"></block></value></block></value>';
				},
				isNotDuplicable: true,
				mutationToDom: function() {
					if (!this.servCount_) {
						return null;
					}
					var container = document.createElement('mutation');
					if (this.servCount_) {
						container.setAttribute('item', this.servCount_);
					}
					return container;
				},
				domToMutation: function(xmlElement) {
					this.servCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
					for (var x = 1; x < this.servCount_; x++) {
						this.appendValueInput('SERVICE'+x).appendField(Facilino.locales.getKey('LANG_BLE_SERVICE')).setCheck('ble_service').appendField(new Blockly.FieldImage('img/blocks/bubble-chat.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					}
				},
				decompose: function(workspace) {
					var containerBlock = workspace.newBlock('ble_service_stack');
					containerBlock.initSvg();
					var connection = containerBlock.getInput('STACK').connection;
					for (var x = 1; x < this.servCount_; x++) {
						var taskBlock = workspace.newBlock('ble_service_item');
						taskBlock.initSvg();
						connection.connect(taskBlock.previousConnection);
						connection = taskBlock.nextConnection;
					}
					return containerBlock;
				},
				compose: function(containerBlock) {
					// Disconnect all the task input blocks and remove the inputs.
					for (var x = this.servCount_-1; x >= 1; x--) {
						this.removeInput('SERVICE' + x);
					}
					this.servCount_ = 1;
					// Rebuild the block's optional inputs.
					var clauseBlock = containerBlock.getInputTargetBlock('STACK');
					while (clauseBlock) {
						switch (clauseBlock.type) {
							case 'ble_service_item':
								var input = this.appendValueInput('SERVICE'+this.servCount_).appendField(Facilino.locales.getKey('LANG_BLE_SERVICE')).appendField(new Blockly.FieldImage('img/blocks/bubble-chat.svg', 24*options.zoom, 24*options.zoom)).setCheck('ble_service').setAlign(Blockly.ALIGN_RIGHT);
								this.servCount_++;
								// Reconnect any child blocks.
								if (clauseBlock.valueConnection_) {
									input.connection.connect(clauseBlock.valueConnection_);
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
							case 'ble_service_item':
								var input = this.getInput('SERVICE' + x);
								clauseBlock.valueConnection_ = input && input.connection.targetConnection;
								x++;
								break;
							default:
								throw 'Unknown block type.';
						}
						clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
					}
				},
				isNotDuplicable: true
			};

			Blockly.Blocks.ble_service_stack = {
				colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
				keys: ['LANG_BLE_DEVICE','LANG_BLE_SERVER_TOOLTIP'],
				// Task.
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
					this.appendDummyInput()
						.appendField(Facilino.locales.getKey('LANG_BLE_DEVICE'))
						.setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('STACK').setCheck('ble_service_item');
					this.setTooltip(Facilino.locales.getKey('LANG_BLE_SERVER_TOOLTIP'));
					this.contextMenu = false;
				}
			};

			Blockly.Blocks.ble_service_item = {
					colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
					// Task item.
					keys: ['LANG_BLE_SERVICE','LANG_BLE_SERVER_TOOLTIP'],
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
						this.appendDummyInput()
							.appendField(Facilino.locales.getKey('LANG_BLE_SERVICE'))
							.setAlign(Blockly.ALIGN_RIGHT);
						this.setPreviousStatement(true,'ble_service_item');
						this.setNextStatement(true,'ble_service_item');
						this.setTooltip(Facilino.locales.getKey('LANG_BLE_SERVER_TOOLTIP'));
						this.contextMenu = false;
					}
			};

			Blockly.Arduino.ble_service = function() {
				var code = '';
				return [code,Blockly.Arduino.ORDER_ATOMIC];
			}

			Blockly.Blocks.ble_service = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
				subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLE'),
				tags: ['ble','bluetooth','service'],
				helpUrl: Facilino.getHelpUrl('ble_service'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
				keys: ['LANG_BLE_SERVICE_NAME','LANG_BLE_SERVICE','LANG_BLE_UUID','LANG_BLE_CHARACTERISTIC','LANG_BLE_SERVICE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_BLE_SERVICE_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/bubble-chat.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_BLE_SERVICE')).appendField(Facilino.locales.getKey('LANG_BLE_NAME')).appendField(new Blockly.FieldTextInput('MyService'),'SERVICE_NAME');
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLE_UUID')).appendField(new Blockly.FieldTextInput('9a205495-11b9-4015-be1b-3ea39e788298'),'SERVICE_UUID').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('CHARACTERISTIC0').appendField(Facilino.locales.getKey('LANG_BLE_CHARACTERISTIC')).setCheck('ble_characteristic').appendField(new Blockly.FieldImage('img/blocks/conversation.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.setMutator(new Blockly.Mutator(['ble_characteristic_item']));
					this.setPreviousStatement(false);
					this.setInputsInline(false);
					this.setNextStatement(false);
					this.setOutput(true,'ble_service');
					this.setTooltip(Facilino.locales.getKey('LANG_BLE_SERVICE_TOOLTIP'));
					this.charCount_ = 1;
				},
				default_inputs: function()
				{
					return '<value name="CHARACTERISTIC0"><block type="ble_characteristic"></block></value>';
				},
				mutationToDom: function() {
					if (!this.charCount_) {
						return null;
					}
					var container = document.createElement('mutation');
					if (this.charCount_) {
						container.setAttribute('item', this.charCount_);
					}
					return container;
				},
				domToMutation: function(xmlElement) {
					this.charCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
					for (var x = 1; x < this.charCount_; x++) {
						this.appendValueInput('CHARACTERISTIC'+x).appendField(Facilino.locales.getKey('LANG_BLE_CHARACTERISTIC')).setCheck('ble_characteristic').appendField(new Blockly.FieldImage('img/blocks/conversation.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					}
				},
				decompose: function(workspace) {
					var containerBlock = workspace.newBlock('ble_characteristic_stack');
					containerBlock.initSvg();
					var connection = containerBlock.getInput('STACK').connection;
					for (var x = 1; x < this.charCount_; x++) {
						var taskBlock = workspace.newBlock('ble_characteristic_item');
						taskBlock.initSvg();
						connection.connect(taskBlock.previousConnection);
						connection = taskBlock.nextConnection;
					}
					return containerBlock;
				},
				compose: function(containerBlock) {
					// Disconnect all the task input blocks and remove the inputs.
					for (var x = this.charCount_-1; x >= 1; x--) {
						this.removeInput('CHARACTERISTIC' + x);
					}
					this.charCount_ = 1;
					// Rebuild the block's optional inputs.
					var clauseBlock = containerBlock.getInputTargetBlock('STACK');
					while (clauseBlock) {
						switch (clauseBlock.type) {
							case 'ble_characteristic_item':
								var input = this.appendValueInput('CHARACTERISTIC'+this.charCount_).appendField(Facilino.locales.getKey('LANG_BLE_CHARACTERISTIC')).appendField(new Blockly.FieldImage('img/blocks/conversation.svg', 24*options.zoom, 24*options.zoom)).setCheck('ble_characteristic').setAlign(Blockly.ALIGN_RIGHT);
								this.charCount_++;
								// Reconnect any child blocks.
								if (clauseBlock.valueConnection_) {
									input.connection.connect(clauseBlock.valueConnection_);
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
							case 'ble_characteristic_item':
								var input = this.getInput('CHARACTERISTIC' + x);
								clauseBlock.valueConnection_ = input && input.connection.targetConnection;
								x++;
								break;
							default:
								throw 'Unknown block type.';
						}
						clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
					}
				}
			};

			/*Blockly.Arduino.ble_standard_service = function() {
				var code = '';
				if (this.getFieldValue('NAME')==='DEV_INFO')
				{
					code+='180A';
				}
				else if (this.getFieldValue('NAME')==='IO')
				{
					code+='1815';
				}
				else if (this.getFieldValue('NAME')==='SSE')
				{
					code+='181A';
				}
				else if (this.getFieldValue('NAME')==='BATT')
				{
					code+='180F';
				}
				return [code,Blockly.Arduino.ORDER_ATOMIC];
			}

			Blockly.Blocks.ble_standard_service = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
				subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLE'),
				tags: ['ble','bluetooth','service'],
				helpUrl: Facilino.getHelpUrl('ble_standard_service'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
				keys: ['LANG_BLE_SERVICE','LANG_BLE_UUID','LANG_BLE_CHARACTERISTIC','LANG_BLE_SERVICE_TOOLTIP'],
				//bq_button initialization
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/bubble-chat.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_BLE_SERVICE')).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_BLE_DEV_INFO_SERVICE'),'DEV_INFO'],[Facilino.locales.getKey('LANG_BLE_IO_SERVICE'),'IO'],[Facilino.locales.getKey('LANG_BLE_SSE_SERVICE'),'SSE'],[Facilino.locales.getKey('LANG_BLE_BATT_SERVICE'),'BATT']]),'NAME');
					this.setMutator(new Blockly.Mutator(['ble_characteristic_item']));
					this.setPreviousStatement(false);
					this.setInputsInline(false);
					this.setNextStatement(false);
					this.setOutput(true,'ble_service');
					this.setTooltip(Facilino.locales.getKey('LANG_BLE_SERVICE_TOOLTIP'));
					this.charCount_ = 0;
				},
				mutationToDom: function() {
					if (!this.charCount_) {
						return null;
					}
					var container = document.createElement('mutation');
					if (this.charCount_) {
						container.setAttribute('item', this.charCount_);
					}
					return container;
				},
				domToMutation: function(xmlElement) {
					this.charCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
					for (var x = 0; x < this.charCount_; x++) {
						this.appendValueInput('CHARACTERISTIC'+x).appendField(Facilino.locales.getKey('LANG_BLE_CHARACTERISTIC')).setCheck('ble_characteristic').appendField(new Blockly.FieldImage('img/blocks/conversation.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					}
				},
				decompose: function(workspace) {
					var containerBlock = workspace.newBlock('ble_characteristic_stack');
					containerBlock.initSvg();
					var connection = containerBlock.getInput('STACK').connection;
					for (var x = 0; x < this.charCount_; x++) {
						var taskBlock = workspace.newBlock('ble_characteristic_item');
						taskBlock.initSvg();
						connection.connect(taskBlock.previousConnection);
						connection = taskBlock.nextConnection;
					}
					return containerBlock;
				},
				compose: function(containerBlock) {
					// Disconnect all the task input blocks and remove the inputs.
					for (var x = this.charCount_-1; x >= 0; x--) {
						this.removeInput('CHARACTERISTIC' + x);
					}
					this.charCount_ = 0;
					// Rebuild the block's optional inputs.
					var clauseBlock = containerBlock.getInputTargetBlock('STACK');
					while (clauseBlock) {
						switch (clauseBlock.type) {
							case 'ble_characteristic_item':
								var input = this.appendValueInput('CHARACTERISTIC'+this.charCount_).appendField(Facilino.locales.getKey('LANG_BLE_CHARACTERISTIC')).appendField(new Blockly.FieldImage('img/blocks/conversation.svg', 24*options.zoom, 24*options.zoom)).setCheck('ble_characteristic').setAlign(Blockly.ALIGN_RIGHT);
								this.charCount_++;
								// Reconnect any child blocks.
								if (clauseBlock.valueConnection_) {
									input.connection.connect(clauseBlock.valueConnection_);
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
							case 'ble_characteristic_item':
								var input = this.getInput('CHARACTERISTIC' + x);
								clauseBlock.valueConnection_ = input && input.connection.targetConnection;
								x++;
								break;
							default:
								throw 'Unknown block type.';
						}
						clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
					}
				}
			}*/

			Blockly.Blocks.ble_characteristic_stack = {
				colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
				keys: ['LANG_BLE_SERVICE','LANG_BLE_SERVICE_TOOLTIP'],
				// Task.
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
					this.appendDummyInput()
						.appendField(Facilino.locales.getKey('LANG_BLE_SERVICE'))
						.setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('STACK').setCheck('ble_characteristic_item');
					this.setTooltip(Facilino.locales.getKey('LANG_BLE_SERVICE_TOOLTIP'));
					this.contextMenu = false;
				}
			};

			Blockly.Blocks.ble_characteristic_item = {
					colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
					// Task item.
					keys: ['LANG_BLE_CHARACTERISTIC','LANG_BLE_SERVICE_TOOLTIP'],
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
						this.appendDummyInput()
							.appendField(Facilino.locales.getKey('LANG_BLE_CHARACTERISTIC'))
							.setAlign(Blockly.ALIGN_RIGHT);
						this.setPreviousStatement(true,'ble_characteristic_item');
						this.setNextStatement(true,'ble_characteristic_item');
						this.setTooltip(Facilino.locales.getKey('LANG_BLE_SERVICE_TOOLTIP'));
						this.contextMenu = false;
					}
			};

			Blockly.Arduino.ble_characteristic = function() {
				var code = '';
				return [code,Blockly.Arduino.ORDER_ATOMIC];
			}

			Blockly.Blocks.ble_characteristic = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
				subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLE'),
				tags: ['ble','bluetooth','characteristic'],
				helpUrl: Facilino.getHelpUrl('ble_characteristic'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
				keys: ['LANG_BLE_CHARACTERISTIC_NAME','LANG_BLE_CHARACTERISTIC','LANG_BLE_NAME','LANG_BLE_UUID','LANG_BLE_READ','LANG_BLE_WRITE','LANG_BLE_NOTIFIES','LANG_BLE_INITIAL_VALUE','LANG_BLE_CALLBACK','LANG_BLE_CHARACTERISTIC_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_BLE_CHARACTERISTIC_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/conversation.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_BLE_CHARACTERISTIC')).appendField(Facilino.locales.getKey('LANG_BLE_NAME')).appendField(new Blockly.FieldTextInput('MyCharacteristic'),'CHARACTERISTIC_NAME');
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLE_UUID')).appendField(new Blockly.FieldTextInput('a4c2745f-1adc-4eb0-b376-b52b8ebfff28'),'CHARACTERISTIC_UUID').setAlign(Blockly.ALIGN_RIGHT);
					//this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLE_READ')).appendField(new Blockly.FieldCheckbox('TRUE'),'READ').appendField(Facilino.locales.getKey('LANG_BLE_WRITE')).appendField(new Blockly.FieldCheckbox('FALSE'),'WRITE').appendField(Facilino.locales.getKey('LANG_BLE_NOTIFIES')).appendField(new Blockly.FieldCheckbox('FALSE'),'NOTIFIES').setAlign(Blockly.ALIGN_RIGHT);
					this.appendStatementInput('CALLBACK').appendField(Facilino.locales.getKey('LANG_BLE_CALLBACK')).setCheck('code');
					this.setPreviousStatement(false);
					this.setInputsInline(false);
					this.setNextStatement(false);
					this.setOutput(true,'ble_characteristic');
					this.setTooltip(Facilino.locales.getKey('LANG_BLE_CHARACTERISTIC_TOOLTIP'));
					this.has_callback=false;
				},
				onchange: function(){
					var char_name = this.getFieldValue('CHARACTERISTIC_NAME');
					if (char_name!=="")
					{
						if (char_name!=="MyCharacteristic")
						{	Facilino.BLE_characteristics[this.id]=char_name;
							//if (this.getFieldValue('NOTIFY')==='TRUE')
							//	Facilino.BLE_notify_characteristics[this.id]=char_name;
							//else
							//	delete Facilino.BLE_notify_characteristics[this.id];
						}
					}
				}
			};
			/*
			e.getAllBlocks();
			for (var o = [], t = [], n = 0; n < e.length; n++)
        if (e[n].getProcedureDef) {
            var r = e[n].getProcedureDef();
            r && (r[2] ? o.push(r) : t.push(r))
        }*/
		

			/*Blockly.Arduino.ble_standard_characteristic = function() {
				var code = '';
				if (this.getFieldValue('CHARACTERISTIC_NAME')==='TEMPERATURE')
				{
					code+='2A6E';
				}
				else if (this.getFieldValue('CHARACTERISTIC_NAME')==='HUMIDITY')
				{
					code+='2A6F';
				}
				else if (this.getFieldValue('CHARACTERISTIC_NAME')==='PRESSURE')
				{
					code+='2A6D';
				}
				else if (this.getFieldValue('CHARACTERISTIC_NAME')==='ELEVATION')
				{
					code+='2A6C';
				}
				else if (this.getFieldValue('CHARACTERISTIC_NAME')==='UV_INDEX')
				{
					code+='2A76';
				}
				else if (this.getFieldValue('CHARACTERISTIC_NAME')==='IRRADIANCE')
				{
					code+='2A77';
				}
				else if (this.getFieldValue('CHARACTERISTIC_NAME')==='RAINFALL')
				{
					code+='2A78';
				}
				return [code,Blockly.Arduino.ORDER_ATOMIC];
			}

			Blockly.Blocks.ble_standard_characteristic = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
				subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLE'),
				tags: ['ble','bluetooth','characteristic'],
				helpUrl: Facilino.getHelpUrl('ble_standard_characteristic'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
				keys: ['LANG_BLE_CHARACTERISTIC','LANG_BLE_NAME','LANG_BLE_UUID','LANG_BLE_READ','LANG_BLE_WRITE','LANG_BLE_NOTIFIES','LANG_BLE_INITIAL_VALUE','LANG_BLE_CALLBACK','LANG_BLE_CHARACTERISTIC_TOOLTIP'],
				//bq_button initialization
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/conversation.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_BLE_CHARACTERISTIC')).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_BLE_SSE_TEMPERATURE'),'TEMPERATURE'],[Facilino.locales.getKey('LANG_BLE_SSE_HUMIDITY'),'HUMIDITY'],[Facilino.locales.getKey('LANG_BLE_SSE_PRESSURE'),'PRESSURE'],[Facilino.locales.getKey('LANG_BLE_SSE_ELEVATION'),'ELEVATION'],[Facilino.locales.getKey('LANG_BLE_SSE_UV_INDEX'),'UV_INDEX'],[Facilino.locales.getKey('LANG_BLE_SSE_IRRADIANCE'),'IRRADIANCE'],[Facilino.locales.getKey('LANG_BLE_SSE_RAINFALL'),'RAINFALL']]),'CHARACTERISTIC_NAME');
					this.setPreviousStatement(false);
					this.setInputsInline(false);
					this.setNextStatement(false);
					this.setOutput(true,'ble_characteristic');
					this.setTooltip(Facilino.locales.getKey('LANG_BLE_CHARACTERISTIC_TOOLTIP'));
					this.has_callback=false;
				},
				mutationToDom: function() {
					var container = document.createElement('mutation');
					container.setAttribute('has_callback', this.has_callback);
					return container;
				},
				domToMutation: function(xmlElement) {
					this.has_callback=xmlElement.getAttribute('has_callback');
					if (this.has_callback)
					{
						this.appendStatementInput('CALLBACK').appendField(Facilino.locales.getKey('LANG_BLE_CALLBACK')).setCheck('code');
					}
				},
				onchange: function(){
					var char_name = this.getFieldValue('CHARACTERISTIC_NAME');
					if (char_name!=="")
					{
						Facilino.BLE_characteristics[this.id]=char_name;
						if (this.getFieldValue('NOTIFY')==='TRUE')
							Facilino.BLE_notify_characteristics[this.id]=char_name;
						else
							delete Facilino.BLE_notify_characteristics[this.id];
					}
					var write = this.getFieldValue('WRITE');
					if (write==='TRUE')
					{
						if (!this.has_callback)
						{
							this.appendStatementInput('CALLBACK').appendField(Facilino.locales.getKey('LANG_BLE_CALLBACK')).setCheck('code');
							//this.getInput('CALLBACK').setVisible(true);
							this.has_callback=true;
						}
					}
					else
					{
						if (this.has_callback)
						{
							this.removeInput('CALLBACK');
							//this.getInput('CALLBACK').setVisible(false);
							this.has_callback=false;
						}
					}
				}
			};*/
			
			/*Blockly.Arduino.ble_characteristic_value = function() {
				var code = 'String(pChar_'+this.getFieldValue('NAME')+'->getValue().c_str())';
				return [code, Blockly.Arduino.ORDER_ATOMIC];
			}

			Blockly.Blocks.ble_characteristic_value = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
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
						this.appendDummyInput('').appendField('value','NAME').setAlign(Blockly.ALIGN_RIGHT);
						this.setOutput(true,String);
						this.contextMenu = false;
					}
			};*/

			Blockly.Arduino.ble_get_characteristic = function() {
				var code = '';
				code='String(pChar_'+this.getFieldValue('CHARACTERISTIC')+'->getValue().c_str())';
				return [code,Blockly.Arduino.ORDER_ATOMIC];
			}

			Blockly.Blocks.ble_get_characteristic = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
				subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLE'),
				tags: ['ble','bluetooth','characteristic'],
				helpUrl: Facilino.getHelpUrl('ble_get_characteristic'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
				keys: ['LANG_BLE_GET_NAME','LANG_BLE_GET','LANG_BLE_VALUE','LANG_BLE_SET_CHARACTERISTIC_VALUE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_BLE_GET_NAME'),
				init:  function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput('VALUE').appendField(new Blockly.FieldDropdown(this.getCharacteristics()), 'CHARACTERISTIC').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setInputsInline(false);
				this.setOutput(true,String);
				this.setTooltip(Facilino.locales.getKey('LANG_BLE_GET_CHARACTERISTIC_VALUE_TOOLTIP'));
				this.last_characteristic="";
				this.first_time=true;
				},
				getCharacteristics: function() {
					var characteristics = [];
					if (Object.keys(Facilino.BLE_characteristics).length>0)
					{
						Object.keys(Facilino.BLE_characteristics).forEach(function (key) {
							characteristics.push([Facilino.BLE_characteristics[key],Facilino.BLE_characteristics[key]]);
						});
					}
					else
					{
						characteristics.push(['','']);
					}
					return characteristics;
				},
				onchange: function() {
					var fieldOptions=this.getField('CHARACTERISTIC').getOptions();
					 var update=false;
					 var characteristics = Object.keys(Facilino.BLE_characteristics);
					 if (characteristics.length!==fieldOptions.length)
					 {
						 update=true;
					 }
					 if (update || this.first_time )
					 {
						var currentValue=this.getFieldValue('CHARACTERISTIC');
						var input = this.getInput('VALUE');
						input.removeField('CHARACTERISTIC');
						input.insertFieldAt(0,new Blockly.FieldDropdown(this.getCharacteristics()), 'CHARACTERISTIC');
						var found=false;
						this.getField('CHARACTERISTIC').getOptions().forEach(function(el1) {
							 if (el1[1]===currentValue)
							 {
								 found=true;
							 }
						 });
						 if (found)
							 this.getField('CHARACTERISTIC').setValue(currentValue);
						 this.setWarningText(null);
						 this.first_time=false;
					 }
				}
			}

			Blockly.Arduino.ble_set_characteristic = function() {
				var code = '';
				var input_block = this.getInputTargetBlock('VALUE');
				if (input_block!==null)
				{
					var char_code=this.getFieldValue('CHARACTERISTIC');
					var input_code=Blockly.Arduino.valueToCode(this,'VALUE',Blockly.Arduino.ORDER_NONE);
					if (input_block.type==='variables_get')
					{
						if (Facilino.variables[input_block.getFieldValue('VAR')][2]==='1DArray')
						{
								var byte_count=Facilino.variables[input_block.getFieldValue('VAR')][4];
								input_code='&'+input_code+','+byte_count;
								code='pChar_'+char_code+'->setValue('+input_code+');\n';
						}
						else if (Facilino.variables[input_block.getFieldValue('VAR')][2]==='variable')
						{
								if (Facilino.variables[input_block.getFieldValue('VAR')][0]==='String')
								{
									code='pChar_'+char_code+'->setValue('+input_code+'.c_str());\n';
								}
								else
								{
									code='pChar_'+char_code+'->setValue('+input_code+');\n';
								}
						}
					}
					else if ((input_block.type==='math_1DArray_constructor2')||(input_block.type==='math_1DArray_constructor3')||(input_block.type==='math_1DArray_constructor4')||(input_block.type==='math_1DArray_constructor'))
					{
						code+='{\n'
						code+='uint8_t myValue['+input_block.itemCount_+']='+input_code+';\n';
						code+='pChar_'+char_code+'->setValue(myValue,'+(input_block.itemCount_)+');\n';
						code+='}\n';
					}
					else
					{
						code='pChar_'+char_code+'->setValue('+input_code+');\n';
					}

				}
				return code;
			}

			Blockly.Blocks.ble_set_characteristic = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
				subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLE'),
				tags: ['ble','bluetooth','characteristic'],
				helpUrl: Facilino.getHelpUrl('ble_set_characteristic'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
				keys: ['LANG_BLE_SET_NAME','LANG_BLE_SET','LANG_BLE_VALUE','LANG_BLE_SET_CHARACTERISTIC_VALUE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_BLE_SET_NAME'),
				init:  function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendValueInput('VALUE').appendField(new Blockly.FieldDropdown(this.getCharacteristics()),'CHARACTERISTIC').appendField('=').setCheck([String,'Variable','Array']).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(true);
				this.setTooltip(Facilino.locales.getKey('LANG_BLE_SET_CHARACTERISTIC_VALUE_TOOLTIP'));
				this.last_characteristic="";
				this.first_time=true;
				},
				getCharacteristics: function() {
					var characteristics = [];
					if (Object.keys(Facilino.BLE_characteristics).length>0)
					{
						Object.keys(Facilino.BLE_characteristics).forEach(function (key) {
							characteristics.push([Facilino.BLE_characteristics[key],Facilino.BLE_characteristics[key]]);
						});
					}
					else
					{
						characteristics.push(['','']);
					}
					return characteristics;
				},
				onchange: function() {
					var fieldOptions=this.getField('CHARACTERISTIC').getOptions();
					 var update=false;
					 var characteristics = Object.keys(Facilino.BLE_characteristics);
					 if (characteristics.length!==fieldOptions.length)
					 {
						 update=true;
					 }
					 if (update || this.first_time )
					 {
						var currentValue=this.getFieldValue('CHARACTERISTIC');
						var input = this.getInput('VALUE');
						input.removeField('CHARACTERISTIC');
						input.insertFieldAt(0,new Blockly.FieldDropdown(this.getCharacteristics()), 'CHARACTERISTIC');
						var found=false;
						this.getField('CHARACTERISTIC').getOptions().forEach(function(el1) {
							 if (el1[1]===currentValue)
							 {
								 found=true;
							 }
						 });
						 if (found)
							 this.getField('CHARACTERISTIC').setValue(currentValue);
						 this.setWarningText(null);
						 this.first_time=false;
					 }
				}
			}

			Blockly.Arduino.ble_notify_characteristic = function() {
				var code = '';
				code='pChar_'+this.getFieldValue('CHARACTERISTIC')+'->notify();\n';
				return code;
			}

			Blockly.Blocks.ble_notify_characteristic = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
				subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLE'),
				tags: ['ble','bluetooth','characteristic'],
				helpUrl: Facilino.getHelpUrl('ble_notify_characteristic'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
				keys: ['LANG_BLE_NOTIFY_NAME','LANG_BLE_NOTIFY','LANG_BLE_NOTIFY_CHARACTERISTIC_VALUE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_BLE_NOTIFY_NAME'),
				init:  function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
					this.appendDummyInput('VALUE').appendField(Facilino.locales.getKey('LANG_BLE_NOTIFY')).appendField(new Blockly.FieldDropdown(this.getCharacteristics()), 'CHARACTERISTIC').setAlign(Blockly.ALIGN_RIGHT);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setInputsInline(false);
					this.setTooltip(Facilino.locales.getKey('LANG_BLE_NOTIFY_CHARACTERISTIC_VALUE_TOOLTIP'));
					this.first_time=true;
				},
				getCharacteristics: function() {
					var characteristics = [];
					if (Object.keys(Facilino.BLE_characteristics).length>0)
					{
						Object.keys(Facilino.BLE_characteristics).forEach(function (key) {
							characteristics.push([Facilino.BLE_characteristics[key],Facilino.BLE_characteristics[key]]);
						});
					}
					else
					{
						characteristics.push(['','']);
					}
					return characteristics;
				},
				onchange: function() {
					var fieldOptions=this.getField('CHARACTERISTIC').getOptions();
					 var update=false;
					 var characteristics = Object.keys(Facilino.BLE_characteristics);
					 if (characteristics.length!==fieldOptions.length)
					 {
						 update=true;
					 }
					 if (update || this.first_time )
					 {
						var currentValue=this.getFieldValue('CHARACTERISTIC');
						var input = this.getInput('VALUE');
						input.removeField('CHARACTERISTIC');
						input.insertFieldAt(1,new Blockly.FieldDropdown(this.getCharacteristics()), 'CHARACTERISTIC');
						var found=false;
						this.getField('CHARACTERISTIC').getOptions().forEach(function(el1) {
							 if (el1[1]===currentValue)
							 {
								 found=true;
							 }
						 });
						 if (found)
							 this.getField('CHARACTERISTIC').setValue(currentValue);
						 this.setWarningText(null);
						 this.first_time=false;
					 }
				}
			}
		}
		}
		}
	}
	
	var FacilinoBLE = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoBLE;
	} else {
		window.FacilinoBLE = FacilinoBLE;
	}
}));
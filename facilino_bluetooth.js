(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		{
		
		
	Blockly.Arduino.dyor_bluetooth_def = function() {

			if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ESP8266'))
			{
				var rx, tx;
				rx = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				tx = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_NONE);
				var baud_rate = Blockly.Arduino.valueToCode(this, 'BAUD_RATE', Blockly.Arduino.ORDER_ATOMIC);
				Blockly.Arduino.definitions_['declare_var_BluetoothSerial'] = 'SoftwareSerial _bt_device(' + rx + ',' + tx + ');\n';
				Blockly.Arduino.definitions_['define_softwareserial'] = JST['softwareserial_def_definitions']({});

				Blockly.Arduino.setups_['setup_bluetoothserial'] = JST['communications_softwareserial_def_setups']({'device': '_bt_device','baud_rate': baud_rate,'rx': rx, 'tx': tx});
			}
			else if ((Facilino.profiles['processor']==='ATmega2560'))
			{

				var baud_rate = Blockly.Arduino.valueToCode(this, 'BAUD_RATE', Blockly.Arduino.ORDER_ATOMIC);
				var port=this.getFieldValue('PORT');
				Blockly.Arduino.definitions_['declare_var_define_serial'+port] = '#define _bt_device Serial'+port+'\n';
				Blockly.Arduino.setups_['setup_serial_'+port] = '_bt_device.begin('+baud_rate+');\n';
			}
			else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
			{
				var device_name = Blockly.Arduino.valueToCode(this, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '"ESP32"';
				Blockly.Arduino.definitions_['declare_var_BluetoothSerial']= 'BluetoothSerial _bt_device;\n';
				Blockly.Arduino.definitions_['define_bluetoothserial'] = JST['bluetoothserial_def_definitions']({});
				Blockly.Arduino.definitions_['define_sens_reg'] ='#include "soc/sens_reg.h"';
				Blockly.Arduino.definitions_['declare_var_adc_register'] = 'uint32_t adc_register;\n';
				Blockly.Arduino.definitions_['declare_var_wifi_register'] = 'uint32_t wifi_register;\n';
				Blockly.Arduino.setups_['inout_analog_workaround_adc'] = 'adc_register = READ_PERI_REG(SENS_SAR_READ_CTRL2_REG);\n';
				Blockly.Arduino.setups_['setup_bluetoothserial_'] = JST['bluetoothserial_bt_device_def_setups']({'name': device_name});
				Blockly.Arduino.setups_['inout_analog_workaround_wifi'] = 'wifi_register = READ_PERI_REG(SENS_SAR_READ_CTRL2_REG);\n';
			}
			return '';
		};


		Blockly.Blocks.dyor_bluetooth_def = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_def'),
			examples: ['controls_switch_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_DEF_NAME_NAME','LANG_BLUETOOTH_DEF','LANG_BLUETOOTH_DEF_BAUD_RATE','LANG_BLUETOOTH_DEF_PIN1','LANG_BLUETOOTH_DEF_PIN2','LANG_BLUETOOTH_DEF_PORT','LANG_BLUETOOTH_DEF_NAME','LANG_BLUETOOTH_DEF_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_DEF_NAME_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ESP8266') )
				{
					this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PIN').setCheck('DigitalPin').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_PIN1')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin',Number]);
					this.appendValueInput('PIN2').setCheck('DigitalPin').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_PIN2')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin',Number]);
				}
				else if ((Facilino.profiles['processor']==='ATmega2560'))
				{
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_PORT')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.serial_ports),'PORT').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);

				}
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
				{
					this.appendValueInput('NAME').setCheck(String).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_NAME')).setAlign(Blockly.ALIGN_RIGHT);
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_TOOLTIP'));
			},
			default_inputs: function()
			{
				if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ESP8266') )
				{
					var xml='';
					xml +='<value name="BAUD_RATE"><shadow type="math_number"><field name="NUM">9600</field></shadow></value>';
					xml+='<value name="PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
					if (Facilino.profiles.default.digital.length>1)
						xml+='<value name="PIN2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
					else
						xml+='<value name="PIN2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
					return xml;
				}
				else if ((Facilino.profiles['processor']==='ATmega2560'))
				{
					return '<value name="BAUD_RATE"><shadow type="math_number"><field name="NUM">9600</field></shadow></value>';
				}
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
				{
					return '<value name="NAME"><shadow type="text"><field name="TEXT"></field></shadow></value>';
				}
			},
			isNotDuplicable: true
		};

		if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560'))
		{
			Blockly.Arduino.dyor_bluetooth_name = function() {
			var name = Blockly.Arduino.valueToCode(this, 'NAME', Blockly.Arduino.ORDER_NONE);
			if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4'))
			{
				var rx, tx;
				rx = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
				tx = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_NONE);
				var baud_rate = Blockly.Arduino.valueToCode(this, 'BAUD_RATE', Blockly.Arduino.ORDER_ATOMIC);
				Blockly.Arduino.definitions_['declare_var_BluetoothSerial'] = 'SoftwareSerial _bt_device(' + rx + ',' + tx + ');\n';
				Blockly.Arduino.definitions_['define_softwareserial'] = JST['softwareserial_def_definitions']({});

				Blockly.Arduino.setups_['setup_bluetoothserial'] = JST['communications_softwareserial_def_setups']({'device': '_bt_device','baud_rate': baud_rate,'rx': rx, 'tx': tx});
				Blockly.Arduino.setups_['setup_bluetoothserial_name'] = JST['dyor_bluetooth_name_setups']({'name': name});
			}
			else if ((Facilino.profiles['processor']==='ATmega2560'))
			{

				var baud_rate = Blockly.Arduino.valueToCode(this, 'BAUD_RATE', Blockly.Arduino.ORDER_ATOMIC);
				var port=this.getFieldValue('PORT');
				Blockly.Arduino.definitions_['declare_var_BluetoothSerial'] = '#define _bt_device Serial'+port+'\n';
				Blockly.Arduino.setups_['define_softwareserial'] = '_bt_device.begin('+baud_rate+');\n';
				Blockly.Arduino.setups_['setup_bluetoothserial_name'] = JST['dyor_bluetooth_name_setups']({'name': name});
			}
			return '';
			};

			Blockly.Blocks.dyor_bluetooth_name = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
				tags: ['bluetooth','communication'],
				helpUrl: Facilino.getHelpUrl('dyor_bluetooth_name'),
				examples: ['dyor_bluetooth_name_example.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
				keys: ['LANG_BLUETOOTH_DEF_CONF_NAME_NAME','LANG_BLUETOOTH_DEF_CONF_NAME','LANG_BLUETOOTH_DEF_BAUD_RATE','LANG_BLUETOOTH_DEF_PIN1','LANG_BLUETOOTH_DEF_PIN2','LANG_BLUETOOTH_DEF_NAME','LANG_BLUETOOTH_NAME_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_BLUETOOTH_DEF_CONF_NAME_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_CONF_NAME')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
					if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4'))
					{
						this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').setCheck('DigitalPin').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_PIN1')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN2').setCheck('DigitalPin').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_PIN2')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					}
					else if ((Facilino.profiles['processor']==='ATmega2560'))
					{
						this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_PORT')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.serial_ports),'PORT').setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);

					}
					this.appendValueInput('NAME').setCheck(String).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_NAME')).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_NAME_TOOLTIP'));
				},
				default_inputs: function()
				{
					if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ESP8266') )
					{
						var xml='';
						xml +='<value name="BAUD_RATE"><shadow type="math_number"><field name="NUM">9600</field></shadow></value>';
						xml+='<value name="PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
						if (Facilino.profiles.default.digital.length>1)
							xml+='<value name="PIN2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
						else
							xml+='<value name="PIN2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
						xml+='<value name="NAME"><shadow type="text"><field>My BT device</field name="TEXT"></shadow></value>';
						return xml;
					}
					else if ((Facilino.profiles['processor']==='ATmega2560'))
					{
						return '<value name="BAUD_RATE"><shadow type="math_number"><field name="NUM">9600</field></shadow></value><value name="NAME"><shadow type="text"><field name="TEXT">My BT device</field></shadow></value>';
					}
				},
				isNotDuplicable: true
			};
		}

	Blockly.Arduino.dyor_bluetooth_app = function() {
			// Bluetooth if's conditions.
			var n = 1;
			var argument, branch, loop, loop_code,case2_argument,case2_code;
			Blockly.Arduino.definitions_['declare_var_define_bt_pos'] = JST['dyor_bt_command_definitions_variables']({});
			var code = 'if (_bt_device.available()>0  || _bt_cmd>0)\n{\n';
		code += '  int cmd=_bt_device.read();\n';
		code += '  if (cmd==0)\n	_bt_cmd=0;\n';
		for (n = 1; n <= this.itemCount_; n++) {
			//argument = Blockly.Arduino.valueToCode(this, 'DATA' + n, Blockly.Arduino.ORDER_NONE);
			argument = this.getFieldValue('DATA'+n);
			loop = this.getFieldValue('LOOP'+n);
			branch = Blockly.Arduino.statementToCode(this, 'ITEM' + n);
			branch = Facilino.indentSentences(branch);
			branch = branch.substring(0, branch.length - 1);
			if (loop=='TRUE')
			   loop_code='	_bt_cmd='+argument+';\n';
			else
			   loop_code='';
			code += '	 \n  if ((cmd=='+argument+')||(_bt_cmd=='+argument+')){\n	'+loop_code+branch+'  }';
		}
		return code+'}\n';
		};

		Blockly.Blocks.dyor_bluetooth_app = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_app'),
			examples: ['dyor_bluetooth_app_example.bly','dyor_bluetooth_app_example2.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_APP_NAME','LANG_BLUETOOTH_APP','LANG_BLUETOOTH_APP_TOOLTIP','LANG_BLUETOOTH_APP_DATA','LANG_BLUETOOTH_APP_ITEM_LOOP','LANG_BLUETOOTH_APP_ITEM','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_APP_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
		this.setMutator(new Blockly.Mutator(['dyor_bluetooth_app_item']));
		this.itemCount_ = 0;
		this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_APP_TOOLTIP'));
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
			this.appendDummyInput('DATA' + x).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP_DATA')).appendField(new Blockly.FieldImage("img/blocks/smartphoneC.svg", 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(0,1,255),'DATA'+x).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP_ITEM_LOOP')).appendField(new Blockly.FieldCheckbox('FALSE'), 'LOOP'+x).setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.appendStatementInput('ITEM' + x).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('dyor_bluetooth_app_app');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 1; x <= this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('dyor_bluetooth_app_item');
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
						case 'dyor_bluetooth_app_item':
							this.itemCount_++;
							this.setInputsInline(false);
							var dataInput = this.appendDummyInput('DATA' + this.itemCount_).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP_ITEM')).appendField(new Blockly.FieldImage("img/blocks/smartphoneC.svg", 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(0,1,255),'DATA'+this.itemCount_).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP_ITEM_LOOP')).appendField(new Blockly.FieldCheckbox('FALSE'), 'LOOP'+this.itemCount_).setAlign(Blockly.ALIGN_RIGHT);
							var itemInput = this.appendStatementInput('ITEM' + this.itemCount_).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								dataInput.connection.connect(clauseBlock.valueConnection_);
							}
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
						case 'dyor_bluetooth_app_item':
							//var inputData = this.getInput('DATA' + x);
				//var loop = this.getFieldValue('LOOP' + x);
							var inputItem = this.getInput('ITEM' + x);
							//clauseBlock.valueConnection_ = inputData && inputData.connection.targetConnection;
							clauseBlock.statementConnection_ = inputItem && inputItem.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			}
		};

	/*Blockly.Arduino.dyor_bluetooth_command = function() {
		var code = this.getFieldValue('DATA');
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}



	Blockly.Blocks.dyor_bluetooth_command = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_command'),
			examples: ['dyor_bluetooth_app_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_PREDEFINED_COMMAND_NAME','LANG_BLUETOOTH_BREAKLOOP','LANG_LED_MATRIX_ANGRY','LANG_LED_MATRIX_HAPPY','LANG_LED_MATRIX_SAD','LANG_LED_MATRIX_HEART','LANG_LED_MATRIX_STUNNED','LANG_PIEZO_BUZZER_DO','LANG_PIEZO_BUZZER_RE','LANG_PIEZO_BUZZER_MI','LANG_PIEZO_BUZZER_FA','LANG_PIEZO_BUZZER_SOL','LANG_PIEZO_BUZZER_LA','LANG_PIEZO_BUZZER_SI','LANG_MOVE_FORWARD','LANG_MOVE_BACKWARD','LANG_MOVE_RIGHT','LANG_MOVE_LEFT','LANG_MOVE_STOP','LANG_MOVE_LEFT_ARM_GRIP','LANG_MOVE_LEFT_ARM_RELEASE','LANG_MOVE_RIGHT_ARM_GRIP','LANG_MOVE_RIGHT_ARM_RELEASE','LANG_MOVE_GRIP','LANG_MOVE_RELEASE','LANG_OBSTACLE','LANG_LINE_FOLLOWING','LANG_BLACK','LANG_WHITE','LANG_MOVE_LEFT_ARM_UP','LANG_MOVE_LEFT_ARM_DOWN','LANG_MOVE_ARMS_UP','LANG_MOVE_ARMS_DOWN','LANG_BLUETOOTH_COMMAND_PREDEF_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_PREDEFINED_COMMAND_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/smartphoneC.svg", 20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP_DATA')).appendField(new Blockly.FieldDropdown([
		[Facilino.locales.getKey('LANG_BLUETOOTH_BREAKLOOP')||'BREAK LOOP','0'],
		[Facilino.locales.getKey('LANG_LED_MATRIX_ANGRY')||'ANGRY','1'],
		[Facilino.locales.getKey('LANG_LED_MATRIX_HAPPY')||'HAPPY','2'],
		[Facilino.locales.getKey('LANG_LED_MATRIX_SAD')||'SAD','3'],
		[Facilino.locales.getKey('LANG_LED_MATRIX_HEART')||'LOVE','4'],
		[Facilino.locales.getKey('LANG_LED_MATRIX_STUNNED')||'STUNNED','5'],
		[Facilino.locales.getKey('LANG_PIEZO_BUZZER_DO') ||'C4','11'],
		[Facilino.locales.getKey('LANG_PIEZO_BUZZER_RE') ||'D4','12'],
		[Facilino.locales.getKey('LANG_PIEZO_BUZZER_MI') ||'E4','13'],
		[Facilino.locales.getKey('LANG_PIEZO_BUZZER_FA') ||'F4','14'],
		[Facilino.locales.getKey('LANG_PIEZO_BUZZER_SOL')||'G4','15'],
		[Facilino.locales.getKey('LANG_PIEZO_BUZZER_LA') || 'A4','16'],
		[Facilino.locales.getKey('LANG_PIEZO_BUZZER_SI') || 'B4','17'],
		[Facilino.locales.getKey('LANG_MOVE_FORWARD') || 'FORWARD','21'],
		[Facilino.locales.getKey('LANG_MOVE_BACKWARD') ||'BACKWARD','22'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT') || 'RIGHT','23'],
		[Facilino.locales.getKey('LANG_MOVE_LEFT') || 'LEFT','24'],
		[Facilino.locales.getKey('LANG_MOVE_STOP') || 'STOP','25'],
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_GRIP') || 'LEFT GRIP','31'],
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_RELEASE') || 'LEFT RELEASE','32'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_GRIP') || 'RIGHT GRIP','33'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_RELEASE') || 'RIGHT RELEASE','34'],
		[Facilino.locales.getKey('LANG_MOVE_GRIP') || 'GRIP','35'],
		[Facilino.locales.getKey('LANG_MOVE_RELEASE') || 'RELEASE','36'],
		[Facilino.locales.getKey('LANG_OBSTACLE') || 'OBSTACLE','41'],
		[Facilino.locales.getKey('LANG_LINE_FOLLOWING') || 'LINE FOLLOWING','42'],
		[Facilino.locales.getKey('LANG_BLACK') || 'BLACK','43'],
		[Facilino.locales.getKey('LANG_WHITE') || 'WHITE','44'],
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_UP') || 'LEFT HAND UP','51'],
		[Facilino.locales.getKey('LANG_MOVE_LEFT_ARM_DOWN') || 'LEFT HAND DOWN','52'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_UP') || 'RIGHT HAND UP','53'],
		[Facilino.locales.getKey('LANG_MOVE_RIGHT_ARM_DOWN') || 'RIGHT HAND DOWN','54'],
		[Facilino.locales.getKey('LANG_MOVE_ARMS_UP') || 'HANDS UP','55'],
		[Facilino.locales.getKey('LANG_MOVE_ARMS_DOWN') || 'HANDS DOWN','56'],
		]),'DATA').setAlign(Blockly.ALIGN_RIGHT);
		this.setOutput(true,'Data');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND_PREDEF_TOOLTIP'));
			}
	};*/

	Blockly.Blocks.dyor_bluetooth_app_app = {
			// App
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV','LANG_BLUETOOTH_APP_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('bt_item');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_APP_TOOLTIP'));
				this.contextMenu = false;
			}
		};

	Blockly.Blocks.dyor_bluetooth_app_item = {
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_APP_ITEM','LANG_BLUETOOTH_COMMAND_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP_ITEM')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'bt_item');
				this.setNextStatement(true,'bt_item');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND_TOOLTIP'));
		this.contextMenu = false;
			}
		};
		
		if (window.FacilinoAdvanced===true)
			{
				
					Blockly.Arduino.dyor_bluetooth_command_num = function() {
		var code = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
		return [code, Blockly.Arduino.ORDER_ATOMIC];
					}


	/*Blockly.Blocks.dyor_bluetooth_command_num = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_command_num'),
			examples: ['dyor_bluetooth_app_example2.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_NUM_COMMAND_NAME','LANG_BLUETOOTH_APP_DATA','LANG_BLUETOOTH_COMMAND_NUM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_NUM_COMMAND_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendValueInput('DATA').appendField(new Blockly.FieldImage("img/blocks/smartphoneC.svg", 20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP_DATA')).setAlign(Blockly.ALIGN_RIGHT).setCheck(Number);
		this.setInputsInline(true);
		this.setOutput(true,'Data');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND_NUM_TOOLTIP'));
			}
	};

	Blockly.Blocks.dyor_bluetooth_telegram_item = {
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_TELEGRAM_ITEM','LANG_BLUETOOTH_TELEGRAM_ITEM_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_ITEM')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'bt_item');
				this.setNextStatement(true,'bt_item');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_ITEM_TOOLTIP'));
		this.contextMenu = false;
			}
		};*/

if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
{

	Blockly.Arduino.dyor_bluetooth_recv_telegram = function() {
			// Bluetooth if's conditions.
			var n = 0;
			var argument, branch, loop, loop_code,case2_argument,case2_code;
			Blockly.Arduino.definitions_['declare_var_define_bt_pos'] = JST['dyor_bt_telegram_definitions_variables']({});
			var code = 'if (_bt_device.available()>0)\n{\n';
			code += '  unsigned char c;\n  _bt_device.readBytes(&c,1);\n';
		code += '  if ((c==\'@\')&&(_bt_pos==0)) {\n	_bt_pos++;\n';
			code += '  } else if (_bt_pos==1) {\n	_bt_pos++;\n	_bt_cmd=c;\n';
		code += '  } else if (_bt_pos==2) {\n	_bt_pos++;\n	_bt_length=c;\n';
			code += '  } else if ((_bt_pos>=3)&&(_bt_pos<=(_bt_length+2))) {\n	_bt_data[_bt_pos-3]=c;\n	_bt_pos++;\n';
		code += '  } else if ((_bt_pos==(_bt_length+3))&&(c==\'*\')){\n';
		if (this.getFieldValue('DigitalRead')==='TRUE')
		{
			code+='\n	  if (_bt_cmd==0x00)//Digital read\n';
			code += '	  {\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '	  _bt_device.write(\'@\');\n';
			code += '	  _bt_device.write((byte)0x01);\n';
			code += '	  _bt_device.write((byte)2);\n';
			code += '	  _bt_device.write((byte)pin);\n';
			code += '	  _bt_device.write((byte)(digitalRead(pin)));\n';
			code += '	  _bt_device.write(\'*\');\n	  }\n';
		}
		if (this.getFieldValue('DigitalWrite')==='TRUE')
		{
			code+='\n	  if (_bt_cmd==0x02)//Digital write\n';
			code += '	  {\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '     bool value = _bt_data[1]==1? HIGH: LOW;\n';
			code += '     digitalWrite(pin,value);\n';
			code += '\n	  }\n';
		}
		if (this.getFieldValue('AnalogRead')==='TRUE')
		{
			code+='\n	  if (_bt_cmd==0x03)//Analog read\n';
			code += '	  {\n';
			code += '	  int pin = _bt_data[0];\n';
			
			code += '_bt_device.write(\'@\');\n';
			code += '_bt_device.write((byte)0x04);\n';
			code +='_bt_device.write((byte)3);\n';
			code +='_bt_device.write((byte)pin);\n';
			
			if (Blockly.Arduino.setups_['inout_analog_workaround_adc']!==undefined)
			{
				code+='    WRITE_PERI_REG(SENS_SAR_READ_CTRL2_REG, adc_register);\n';
				code+='    SET_PERI_REG_MASK(SENS_SAR_READ_CTRL2_REG, SENS_SAR2_DATA_INV);\n';
				code+='    short int _value=(analogRead(pin));\n';
				code+='    WRITE_PERI_REG(SENS_SAR_READ_CTRL2_REG, wifi_register);\n';
			}
			else
			{
				code+='    short int _value=(analogRead(pin));\n';
			}
			code +='_bt_device.write((byte)((_value&0xFF00)>>8));\n';
			code +='_bt_device.write((byte)(_value&0x00FF));\n';
			code +='_bt_device.write(\'*\');\n	  }\n';
		}
		if (this.getFieldValue('AnalogWrite')==='TRUE')
		{
			code+='\n	  if (_bt_cmd==0x05)//Analog write\n';
			code += '	  {\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '     int value = ((((int)_bt_data[1])<<8)&0xFF00)|(((int)_bt_data[2])&0x00FF);\n';
			if (Facilino.profiles['processor']==='ESP32')
			{
				code += '     ledcWrite(_channels[pin],value);\n';
			}
			else
				code += '     analogWrite(pin,value);\n';
			code += '\n	  }\n';
		}
		/*if (this.getFieldValue('Servo')==='TRUE')
		{
			code+='\n	  if (_bt_cmd==0x10)//Servo\n';
			code += '	  {\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '     byte value = _bt_data[1];\n';
			code += '	  _servos[pin]->write(value);\n';
			code += '\n	  }\n';
		}
		if (this.getFieldValue('Servo360')==='TRUE')
		{
			code+='\n	  if (_bt_cmd==0x11)//Servo 360\n';
			code += '	  {\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '     byte value = _bt_data[1];\n';
			code += '	  _servos[pin]->write(value);\n';
			code += '\n	  }\n';
		}
		if (this.getFieldValue('Sonar')==='TRUE')
		{
			if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')){
				Blockly.Arduino.definitions_['include_us'] = JST['dyor_us_definitions_include']({});
				Blockly.Arduino.definitions_['define_us_pulseIn'] = JST['dyor_us_definitions_pulseIn']({});
			}
			Blockly.Arduino.definitions_['define_us_init'] = JST['dyor_us_definitions_us_init']({});
			Blockly.Arduino.definitions_['define_us_distance'] = JST['dyor_us_definitions_distance']({});
			
			code+='\n	  if (_bt_cmd==0x12)//Sonar\n';
			code += '	  {\n';
			code += '	  int ECHO_pin = _bt_data[0];\n';
			code += '     int TRIGGER_pin = _bt_data[1];\n';
			code += '	  _bt_device.write(\'@\');\n';
			code += '	  _bt_device.write((byte)0x13);\n';
			code += '	  _bt_device.write((byte)4);\n';
			code += '	  _bt_device.write((byte)ECHO_pin);\n';
			code += '	  _bt_device.write((byte)TRIGGER_pin);\n';
			code += '     short int _value=distance(TRIGGER_pin,ECHO_pin);\n';
			code += '	  _bt_device.write((byte)((_value&0xFF00)>>8));\n';
			code += '	  _bt_device.write((byte)(_value&0x00FF));\n';
			code += '	  _bt_device.write(\'*\');\n	  }\n';
			
		}*/
		/*if (this.getFieldValue('Buzzer')==='TRUE')
		{
			if (Facilino.profiles['processor']==='ESP32')
			{
				Blockly.Arduino.definitions_['define_adv_buzzer_tone']='void _tone(int channel, float noteFrequency, long noteDuration, int silentDuration){\nledcWriteTone(channel, noteFrequency);\n  delay(noteDuration);\n  ledcWrite(channel, 0);\n  delay(silentDuration);\n}\n';
			}
			else
			{
				Blockly.Arduino.definitions_['define_adv_buzzer_tone']='void _tone(int buzzerPin, float noteFrequency, long noteDuration, int silentDuration){\n  tone(buzzerPin, noteFrequency, noteDuration);\n  delay(noteDuration);\n  delay(silentDuration);\n}\n';
			}
			code+='\n	  if (_bt_cmd==0x20)//Buzzer\n';
			code += '	  {\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '	  int frequency = ((((int)_bt_data[1])<<8)|(_bt_data[2]));\n';
			code += '	  int duration = ((((int)_bt_data[3])<<8)|(_bt_data[4]));\n';
			code += '     _tone(_channels[pin],frequency,duration);\n';
			code += '\n	  }\n';
		}*/
		
		code += Blockly.Arduino.statementToCode(this,'TELEGRAMS');
		/*if ((argument==='0')||(argument==='2')||(argument==='3')||(argument==='5')||(argument==='10')||(argument==='11')||(argument==='20')||(argument==='21')||((argument==='22'))||(argument==='60')||(argument==='61')||(argument==='62'))
			branch += '	  int pin = _bt_data[0];\n';
		if (argument==='2')
			branch += '	  boolean value = _bt_data[1]==1? HIGH: LOW;\n';
		if ((argument==='10')||(argument==='11'))
			branch += '	  byte value = _bt_data[1];\n';
		if (argument==='5')
			branch += '	  int value = ((((int)_bt_data[1])<<8)&0xFF00)|(((int)_bt_data[2])&0x00FF);\n';
		if ((argument==='12'))
		{
			branch += '	  int ECHO_pin = _bt_data[0];\n';
			branch += '	  int TRIGGER_pin = _bt_data[1];\n';
		}
		if ((argument==='20'))
		{
			branch += '	  int frequency = ((((int)_bt_data[1])<<8)|(_bt_data[2]));\n';
			branch += '	  int duration = ((((int)_bt_data[3])<<8)|(_bt_data[4]));\n';
		}
		if ((argument==='21'))
		{
			branch += '	  uint16_t *melody = (uint16_t*)&_bt_data[1];\n';
			branch += '	  int melody_length = _bt_length-1;\n';
		}
		if ((argument==='50'))
		{
			branch += '	  int pin_clk = _bt_data[0];\n';
			branch += '	  int pin_din = _bt_data[1];\n';
			branch += '	  int pin_cs = _bt_data[2];\n';
			branch += '	  int expr=_bt_data[3];  //PENDING!! \n';
		}
		if ((argument==='51'))
		{
			branch += '	  int pin_clk = _bt_data[0];\n';
			branch += '	  int pin_din = _bt_data[1];\n';
			branch += '	  int pin_cs = _bt_data[2];\n';
			branch += '	  int number=_bt_data[3];\n';
		}
		if ((argument==='60'))
		{
			branch += '	  int colors[150];  //PENDING!! \n';
		}
		if ((argument==='61'))
		{
			branch += '	  int number=_bt_data[1];\n';
		}
		if ((argument==='62'))
		{
			branch += '	  int brightness=_bt_data[1];\n';
		}
		if ((argument==='80'))
		{
			branch += '	  int index = _bt_data[0];\n';
			branch += '	  bool value = (_bt_data[0]==1)?true:false;\n';
		}
		if ((argument==='81')||(argument==='84')||(argument==='87'))
		{
			branch += '	  int index = _bt_data[0];\n';
		}
		if ((argument==='83'))
		{
			branch += '	  int index = _bt_data[0];\n';
			branch += '	  long value = ((((long)_bt_data[1])<<24)|(((long)_bt_data[2])<<16)|(((long)_bt_data[3])<<8)|(_bt_data[4]));\n';
		}
		if ((argument==='86'))
		{
			branch += '	  int index = _bt_data[0];\n';
			branch += '	  long value_temp = ((((long)_bt_data[1])<<24)|(((long)_bt_data[2])<<16)|(((long)_bt_data[3])<<8)|(_bt_data[4]));\n';
			branch += '	  float *value_ptr = (float*)&value_temp;\n';
			branch += '	  float value=*value_ptr;\n';
		}
		  branch += Blockly.Arduino.statementToCode(this, 'ITEM' + n);
			branch = Facilino.indentSentences(branch);
			branch = branch.substring(0, branch.length - 1);
		  code += '	 \n	  if (_bt_cmd==0x'+argument+') {\n'+branch+'	  }';
		}*/
		code += '\n	_bt_pos=0;\n	_bt_length=0;\n}  else{\n	 _bt_pos=0;\n	_bt_length=0;\n';

			code += '  }\n';

			return code+'}\n';
		};

		Blockly.Blocks.dyor_bluetooth_recv_telegram = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				//this.setMutator(new Blockly.Mutator(['dyor_bluetooth_telegram_item','dyor_bluetooth_telegram_digital_read_item']));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DIGITAL_READ')).appendField(new Blockly.FieldCheckbox(false),'DigitalRead').appendField(' ').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DIGITAL_WRITE')).appendField(new Blockly.FieldCheckbox(false),'DigitalWrite');
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_ANALOG_READ')).appendField(new Blockly.FieldCheckbox(false),'AnalogRead').appendField(' ').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_ANALOG_WRITE')).appendField(new Blockly.FieldCheckbox(false),'AnalogWrite');
				/*this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_SERVO')).appendField(new Blockly.FieldCheckbox(false),'Servo').appendField(' ').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_SERVO360')).appendField(new Blockly.FieldCheckbox(false),'Servo360');
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_SONAR_READ')).appendField(new Blockly.FieldCheckbox(false),'Sonar');
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_BUZZER_TONE')).appendField(new Blockly.FieldCheckbox(false),'Buzzer');
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DHT')).appendField(new Blockly.FieldCheckbox(false),'DHT');*/
				/*
				[Facilino.locales.getKey('LANG_BLUETOOTH_TCRT5000_READ')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_REQUEST')||'TCRT5000','14'],
				//[Facilino.locales.getKey('LANG_BLUETOOTH_GAS_READ')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_REQUEST')||'Gas','16'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_BUZZER_TONE')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'Buzzer Tone','20'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_BUZZER_MELODY')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'Buzzer Melody','21'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_DHT')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_REQUEST')+')'||'DHT','22'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_LED_MATRIX')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'LED Matrix','50'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_LED_MATRIX')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_PREDEFINED')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'LED Matrix Predefined','51'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_RGB_LED_STRIP')||'RGB LED Strip','60'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_RGB_LED_STRIP')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_PREDEFINED')||'RGB LED Strip Predefined','61'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_RGB_LED_STRIP')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_BRIGHTNESS')||'RGB LED Strip Brightness','62']
				*/
				this.appendStatementInput('TELEGRAMS').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_TYPE')).setCheck('TELEGRAM_CODE');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			isNotDuplicable: true
			}
			
		/*Blockly.Arduino.dyor_bluetooth_send_telegram = function() {
		var code='{\n';
		var inp1 = Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '0';
		var inp2 = this.getInputTargetBlock('INP2');
		var in2 = Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC)
		
		code += '_bt_device.write(\'@\');\n';//this.getFieldValue('TELEGRAM');
		//@ cmd length data *
		code += '_bt_device.write((byte)0x'+this.getFieldValue('TELEGRAM')+');\n';
		if (inp2!==null)
		{
			if ((this.getFieldValue('TELEGRAM')==='1')||(this.getFieldValue('TELEGRAM')==='9'))
			{
				code +='_bt_device.write((byte)2);\n';
				code +='_bt_device.write((byte)'+inp1+');\n';
				
				if (inp2.type==='variables_get')
				{
					if (Facilino.variables[in2]!==undefined)
						{
							//console.log(Facilino.variables[in2][2]);
						if (Facilino.variables[in2][2]==='variable')
						{
							code +='_bt_device.write((byte)'+in2+');\n';
						}
						else if (Facilino.variables[in2][2]==='1DArray')
						{
							code +='_bt_device.write((byte)'+in2+'[0]);\n';
						}
					}
				}
				else
					code +='_bt_device.write((byte)'+in2+');\n';
			}
			else if ((this.getFieldValue('TELEGRAM')==='4') || (this.getFieldValue('TELEGRAM')==='13'))
			{
				code +='_bt_device.write((byte)3);\n';
				code +='_bt_device.write((byte)'+inp1+');\n';
				if (inp2.type==='variables_get')
				{
					if (Facilino.variables[in2]!==undefined)
					{
						if (Facilino.variables[in2][2]==='variable')
						{
							code +='_bt_device.write((byte)(('+in2+'&0xFF00)>>8));\n';
							code +='_bt_device.write((byte)('+in2+'&0x00FF));\n';
						}
						else if (Facilino.variables[in2][2]==='1DArray')
						{
							code +='_bt_device.write((byte)'+in2+'[1]);\n';
							code +='_bt_device.write((byte)'+in2+'[0]);\n';
						}
					}
				}
				else
				{
					code +='short int _value='+in2+';\n';
					code +='_bt_device.write((byte)((_value&0xFF00)>>8));\n';
					code +='_bt_device.write((byte)(_value&0x00FF));\n';
				}
			}
			else if ((this.getFieldValue('TELEGRAM')==='15')|| (this.getFieldValue('TELEGRAM')==='17'))
			{
				code +='_bt_device.write((byte)5);\n';
				code +='_bt_device.write((byte)'+inp1+');\n';
				code +='_bt_device.write((byte)'+inp1+');\n';
				if (inp2.type==='variables_get')
				{
					if (Facilino.variables[in2]!==undefined)
					{
						if (Facilino.variables[in2][2]==='variable')
						{
							code +='_bt_device.write((byte)(('+in2+'&0xFF00)>>8));\n';
							code +='_bt_device.write((byte)('+in2+'&0x00FF));\n';
						}
						else if (Facilino.variables[in2][2]==='1DArray')
						{
							code +='_bt_device.write((byte)'+in2+'[1]);\n';
							code +='_bt_device.write((byte)'+in2+'[0]);\n';
						}
					}
				}
				else
				{
					code +='short int _value='+in2+';\n';
					code +='_bt_device.write((byte)((_value&0xFF00)>>8));\n';
					code +='_bt_device.write((byte)(_value&0x00FF));\n';
				}
			}
			else if (this.getFieldValue('TELEGRAM')==='23')
			{
				code +='_bt_device.write((byte)5);\n';
				code +='_bt_device.write((byte)'+inp1+');\n';
				
				if (inp2.type==='variables_get')
				{
					if (Facilino.variables[in2]!==undefined)
					{
						if (Facilino.variables[in2][2]==='variable')
						{
							code +='_bt_device.write((byte)(('+in2+'&0x0000FF00)>>8));\n';
							code +='_bt_device.write((byte)('+in2+'&0x000000FF));\n';
							code +='_bt_device.write((byte)(('+in2+'&0xFF000000)>>24));\n';
							code +='_bt_device.write((byte)(('+in2+'&0x00FF0000)>>16));\n';
						}
						else if (Facilino.variables[in2][2]==='1DArray')
						{
							code +='_bt_device.write((byte)'+in2+'[1]);\n';
							code +='_bt_device.write((byte)'+in2+'[0]);\n';
							code +='_bt_device.write((byte)'+in2+'[3]);\n';
							code +='_bt_device.write((byte)'+in2+'[2]);\n';
						}
					}
				}
				else
				{
					code +='short int _value='+in2+';\n';
					code +='_bt_device.write((byte)((_value&0x0000FF00)>>8));\n';
					code +='_bt_device.write((byte)(_value&0x000000FF));\n';
					code +='_bt_device.write((byte)((_value&0xFF000000)>>24));\n';
					code +='_bt_device.write((byte)((_value&0x00FF0000)>>16));\n';
				}
			}
		}
		code +='_bt_device.write(\'*\');\n}\n';
		return code;
	}

	Blockly.Blocks.dyor_bluetooth_send_telegram = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_send_telegram'),
			examples: ['dyor_bluetooth_send_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_TELEGRAM_SEND_NAME','LANG_BLUETOOTH_DIGITAL_READ','LANG_BLUETOOTH_ANALOG_READ','LANG_BLUETOOTH_SONAR_READ','LANG_BLUETOOTH_TCRT5000_READ','LANG_BLUETOOTH_SEND_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_TELEGRAM_SEND_TOOLTIP','LANG_BLUETOOTH_PIN','LANG_BLUETOOTH_VALUE','LANG_BLUETOOTH_SENSOR','LANG_BLUETOOTH_DISTANCE','LANG_BLUETOOTH_TEXT1','LANG_BLUETOOTH_SENSOR','LANG_BLUETOOTH_R','LANG_BLUETOOTH_G','LANG_BLUETOOTH_B','LANG_BLUETOOTH_DHT'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_SEND_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				var telegram = new Blockly.FieldDropdown([
				[Facilino.locales.getKey('LANG_BLUETOOTH_DIGITAL_READ')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')+')'||'Digital Input','1'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_ANALOG_READ')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')+')'||'Analog Input','4'],
				//[Facilino.locales.getKey('LANG_BLUETOOTH_PUSHBUTTON')||'Push Button','9'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_SONAR_READ')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')+')'||'Sonar','13'],
				//[Facilino.locales.getKey('LANG_BLUETOOTH_TCRT5000_READ')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')||'TCRT5000','15'],
				//[Facilino.locales.getKey('LANG_BLUETOOTH_GAS_READ')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')||'Gas','17'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_DHT')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')+')'||'DHT','23']
				]);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_SEND_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_TYPE')).appendField(telegram,'TELEGRAM').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('INP1').setCheck(['DigitalPin','AnalogPin','PWMPin']).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_PIN'),'INP1_FIELD').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('INP2').setCheck([Number,'Variable']).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).appendField('(1 '+Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE')+')','BYTES').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_SEND_TOOLTIP'));
			},
			onchange: function()
			{
				if (this.getFieldValue('TELEGRAM')==='1')
				{
					this.setFieldValue('(1 '+Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE')+')','BYTES');
				}
				else if (this.getFieldValue('TELEGRAM')==='4' || this.getFieldValue('TELEGRAM')==='13' || this.getFieldValue('TELEGRAM')==='15')
				{
					this.setFieldValue('(2 '+Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE')+'s)','BYTES');
				}
				else if (this.getFieldValue('TELEGRAM')==='23')
				{
					this.setFieldValue('(4 '+Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE')+'s)','BYTES');
				}
			}
	};*/
			
		/*Blockly.Arduino.dyor_bluetooth_recv_telegram_digital_read = function() {
			// Bluetooth if's conditions.
			var code='';
			code+='\n	  if (_bt_cmd==0x00)\n';
			code += '{\n';
			code += '	  int pin = _bt_data[0];\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			
			code += '_bt_device.write(\'@\');\n';
			code += '_bt_device.write((byte)0x01);\n';
			code +='_bt_device.write((byte)2);\n';
			code +='_bt_device.write((byte)pin);\n';
			code +='_bt_device.write((byte)('+Blockly.Arduino.valueToCode(this,'RESP', Blockly.Arduino.ORDER_ATOMIC)+'));\n';
			code +='_bt_device.write(\'*\');\n}\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_digital_read = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DIGITAL_READ'));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendValueInput('RESP').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')).setCheck(Boolean).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('PIN').connection.connect(pinBlock.outputConnection);
					
				}
			}
		};
			
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_digital_write = function() {
			// Bluetooth if's conditions.
			var code='';
			code+='\n	  if (_bt_cmd==0x02)\n';
			code += '{\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '     bool value = _bt_data[1]==1? HIGH: LOW;\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n}\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_digital_write = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DIGITAL_WRITE'));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('VALUE').setCheck(Boolean).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value><value name="VALUE"><block type="dyor_bluetooth_telegram_item_boolean_value"></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('PIN').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('VALUE')===null)
				{
					var valueBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_boolean_value');
					valueBlock.initSvg();
					valueBlock.render();
					this.getInput('VALUE').connection.connect(valueBlock.outputConnection);
				}
			}
		};
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_analog_read = function() {
			var code='';
			code+='\n	  if (_bt_cmd==0x03)\n';
			code += '{\n';
			code += '	  int pin = _bt_data[0];\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			
			code += '_bt_device.write(\'@\');\n';
			code += '_bt_device.write((byte)0x04);\n';
			code +='_bt_device.write((byte)3);\n';
			code +='_bt_device.write((byte)pin);\n';
			code +='short int _value=('+Blockly.Arduino.valueToCode(this,'RESP', Blockly.Arduino.ORDER_ATOMIC)+');\n';
			code +='_bt_device.write((byte)((_value&0xFF00)>>8));\n';
			code +='_bt_device.write((byte)(_value&0x00FF));\n';
			code +='_bt_device.write(\'*\');\n}\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_analog_read = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_ANALOG_READ'));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('AnalogPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendValueInput('RESP').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><block type="dyor_bluetooth_telegram_item_analog_pin"></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_analog_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('PIN').connection.connect(pinBlock.outputConnection);
					
				}
			}
		};
			
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_analog_write = function() {
			// Bluetooth if's conditions.
			var code='';
			code+='\n	  if (_bt_cmd==0x05)\n';
			code += '{\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '     int value = ((((int)_bt_data[1])<<8)&0xFF00)|(((int)_bt_data[2])&0x00FF);\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n}\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_analog_write = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_ANALOG_WRITE'));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('PWMPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('VALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><block type="dyor_bluetooth_telegram_item_pwm_pin"></block></value><value name="VALUE"><block type="dyor_bluetooth_telegram_item_number_value"></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_pwm_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('PIN').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('VALUE')===null)
				{
					var valueBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_number_value');
					valueBlock.initSvg();
					valueBlock.render();
					this.getInput('VALUE').connection.connect(valueBlock.outputConnection);
				}
			}
		};*/
		
		
				
		Blockly.Arduino.dyor_bluetooth_recv_telegram_boolean = function() {
			// Bluetooth if's conditions.
			Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
			var booleans_map = 'std::map<int,bool> _booleans={{0,false}';
			for (var idx=1;idx<this.getFieldValue('BOOLEAN_NUM');idx++)
			{
				booleans_map+=',{'+idx+',false}';
			}
			booleans_map+='};\n';
			Blockly.Arduino.definitions_['declare_var_booleans_map'] = booleans_map;

			var code='';
			
			code+='\n	  if (_bt_cmd==0x80)\n';
			code += '{\n';
			code += '	  int index = _bt_data[0];\n';
			code += '     bool value = _bt_data[1];\n';
			code += '     _booleans[index]=value;\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n}\n';
			code += 'else if (_bt_cmd==0x81)\n';
			code += '{\n';
			code += '     int index = _bt_data[0];\n';
			code += '     _bt_device.write(\'@\');\n';
			code += '     _bt_device.write((byte)0x82);\n';
			code += '     _bt_device.write((byte)2);\n';
			code += '     _bt_device.write((byte)index);\n';
			code += '     _bt_device.write((byte)(_booleans[index]));\n';
			code += '     _bt_device.write(\'*\');';
			code += '\n}\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_boolean = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField('Boolean #').appendField(new Blockly.FieldNumber(0,1),'BOOLEAN_NUM');
				this.appendValueInput('BOOLEAN_INDEX').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('BOOLEAN_VALUE').setCheck(Boolean).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="BOOLEAN_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="BOOLEAN_INDEX"><block type="dyor_bluetooth_telegram_item_index"></block></value><value name="BOOLEAN_VALUE"><block type="dyor_bluetooth_telegram_item_boolean_value"></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('BOOLEAN_INDEX')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_index');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('BOOLEAN_INDEX').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('BOOLEAN_VALUE')===null)
				{
					var valueBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_boolean_value');
					valueBlock.initSvg();
					valueBlock.render();
					this.getInput('BOOLEAN_VALUE').connection.connect(valueBlock.outputConnection);
				}
			}
		};	
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_int = function() {
			// Bluetooth if's conditions.
			Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
			var ints_map = 'std::map<int,int> _ints={{0,0}';
			for (var idx=1;idx<this.getFieldValue('INT_NUM');idx++)
			{
				ints_map+=',{'+idx+',0}';
			}
			ints_map+='};\n';
			Blockly.Arduino.definitions_['declare_var_ints_map'] = ints_map;

			var code='';
			
			code+='\n	  if (_bt_cmd==0x83)\n';
			code += '{\n';
			code += '	  int index = _bt_data[0];\n';
			code += '     int value = ((((int)_bt_data[1])<<8)|(_bt_data[2]));\n';
			code += '     _ints[index]=value;\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n}\n';
			code += 'else if (_bt_cmd==0x84)\n';
			code += '{\n';
			code += '     int index = _bt_data[0];\n';
			code += '     _bt_device.write(\'@\');\n';
			code += '     _bt_device.write((byte)0x85);\n';
			code += '     _bt_device.write((byte)3);\n';
			code += '     _bt_device.write((byte)index);\n';
			code += '     _bt_device.write((byte)((_ints[index]&0xFF00)>>8));\n';
			code += '     _bt_device.write((byte)(_ints[index]&0x00FF));\n';
			code += '     _bt_device.write(\'*\');';
			code += '\n}\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_int = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField('Int #').appendField(new Blockly.FieldNumber(0,1),'INT_NUM');
				this.appendValueInput('INT_INDEX').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('INT_VALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="INT_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="INT_INDEX"><block type="dyor_bluetooth_telegram_item_index"></block></value><value name="INT_VALUE"><block type="dyor_bluetooth_telegram_item_number_value"></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('INT_INDEX')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_index');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('INT_INDEX').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('INT_VALUE')===null)
				{
					var valueBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_number_value');
					valueBlock.initSvg();
					valueBlock.render();
					this.getInput('INT_VALUE').connection.connect(valueBlock.outputConnection);
				}
			}
		};
		
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_float = function() {
			// Bluetooth if's conditions.
			Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
			var floats_map = 'std::map<int,float> _floats={{0,0.0}';
			for (var idx=1;idx<this.getFieldValue('FLOAT_NUM');idx++)
			{
				floats_map+=',{'+idx+',0.0}';
			}
			floats_map+='};\n';
			Blockly.Arduino.definitions_['declare_var_floats_map'] = floats_map;

			var code='';
			
			code+='\n	  if (_bt_cmd==0x86)\n';
			code += '{\n';
			code += '	  int index = _bt_data[0];\n';
			code += '     long value_temp = ((((long)_bt_data[1])<<24)|(((long)_bt_data[2])<<16)|(((long)_bt_data[3])<<8)|(_bt_data[4]));\n';
			code += '	  float *value_ptr = (float*)&value_temp;\n';
			code += '	  float value=*value_ptr;\n';			
			code += '     _floats[index]=value;\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n}\n';
			code += 'else if (_bt_cmd==0x87)\n';
			code += '{\n';
			code += '     int index = _bt_data[0];\n';
			code += '     _bt_device.write(\'@\');\n';
			code += '     _bt_device.write((byte)0x88);\n';
			code += '     _bt_device.write((byte)5);\n';
			code += '     _bt_device.write((byte)index);\n';
			code += '     long* value_ptr = (long *)&_floats[index];\n';
			code += '     long value_tmp = *value_ptr;\n';
			code += '     _bt_device.write((byte)((value_tmp&0xFF000000)>>24));\n';
			code += '     _bt_device.write((byte)((value_tmp&0x00FF0000)>>16));\n';
			code += '     _bt_device.write((byte)((value_tmp&0x0000FF00)>>8));\n';
			code += '     _bt_device.write((byte)((value_tmp&0x000000FF)));\n';
			code += '     _bt_device.write(\'*\');';
			code += '\n}\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_float = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField('Float #').appendField(new Blockly.FieldNumber(0,1),'FLOAT_NUM');
				this.appendValueInput('FLOAT_INDEX').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('FLOAT_VALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="FLOAT_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="FLOAT_INDEX"><block type="dyor_bluetooth_telegram_item_index"></block></value><value name="FLOAT_VALUE"><block type="dyor_bluetooth_telegram_item_number_value"></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('FLOAT_INDEX')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_index');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('FLOAT_INDEX').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('FLOAT_VALUE')===null)
				{
					var valueBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_number_value');
					valueBlock.initSvg();
					valueBlock.render();
					this.getInput('FLOAT_VALUE').connection.connect(valueBlock.outputConnection);
				}
			}
		};	
		
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_string = function() {
			// Bluetooth if's conditions.
			Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
			var strings_map = 'std::map<int,std::string> _strings={{0,std::string("")}';
			for (var idx=1;idx<this.getFieldValue('STRING_NUM');idx++)
			{
				strings_map+=',{'+idx+',std::string("")}';
			}
			strings_map+='};\n';
			Blockly.Arduino.definitions_['declare_var_string_map'] = strings_map;

			var code='';
			
			code+='\n	  if (_bt_cmd==0x89)\n';
			code += '{\n';
			code += '	  int index = _bt_data[0];\n';
			code += '     _strings[index]=std::string((char*)(&_bt_data[1]));\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n}\n';
			code += 'else if (_bt_cmd==0x8A)\n';
			code += '{\n';
			code += '     int index = _bt_data[0];\n';
			code += '     _bt_device.write(\'@\');\n';
			code += '     _bt_device.write((byte)0x8B);\n';
			code += '     _bt_device.write((byte)(_strings[index].size()+1));\n';
			code += '     _bt_device.write((byte)index);\n';
			code += '     const char* p  = _strings[index].c_str();\n';
			code += '     for (int _i=0;_i<_strings[index].size();_i++){_bt_device.write((byte)p[_i]);\n}\n';
			code += '     _bt_device.write(\'*\');';
			code += '\n}\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_string = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField('String #').appendField(new Blockly.FieldNumber(0,1),'STRING_NUM');
				this.appendValueInput('STRING_INDEX').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('STRING_VALUE').setCheck(String).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="STRING_NUM"><shadow type="math_number"><field name="NUM">1</field></shadow></value><value name="STRING_INDEX"><block type="dyor_bluetooth_telegram_item_index"></block></value><value name="STRING_VALUE"><block type="dyor_bluetooth_telegram_item_string_value"></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('STRING_INDEX')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_index');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('STRING_INDEX').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('STRING_VALUE')===null)
				{
					var valueBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_string_value');
					valueBlock.initSvg();
					valueBlock.render();
					this.getInput('STRING_VALUE').connection.connect(valueBlock.outputConnection);
				}
			}
		};
			
		Blockly.Arduino.dyor_bluetooth_recv_telegram_servo_write = function() {
			// Bluetooth if's conditions.
			
			var unique = [];
			this.uniqueVariables = [];
			$.each(Object.values(Facilino.ServosIDs), function(i, el){
				if($.inArray(el, unique) === -1) unique.push(el);
			});
			Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
			var servos_map = 'std::map<int,Servo*> _servos={';
			unique.forEach(function (element,index){if (index===0) {servos_map+='{'+element+',&_servo'+element+'}';}else{servos_map+=',{'+element+',&_servo'+element+'}';}});
			servos_map +='};\n';
			Blockly.Arduino.definitions_['declare_var_servos_map'] = servos_map;
			
			var code='';
			
			code+='\n	  if (_bt_cmd==0x'+this.getFieldValue('TYPE')+')  //Servo \n';
			code += '{\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '     byte value = _bt_data[1];\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n}\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_servo_write = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_BLUETOOTH_SERVO')||'Servo','10'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_SERVO360')||'Servo 360º','11']]),'TYPE');
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('VALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value><value name="VALUE"><block type="dyor_bluetooth_telegram_item_number_value"></block></value><value name="DO"><block type="movement_servo_move"><value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value><value name="DEGREE"><block type="dyor_bluetooth_telegram_item_number_value"></block></value></block></value>','<field name="TYPE">11</field><value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value><value name="VALUE"><block type="dyor_bluetooth_telegram_item_number_value"></block></value><value name="DO"><block type="movement_servo_cont1"><value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value><value name="SPEED"><block type="dyor_bluetooth_telegram_item_number_value"></block></value></block></value>'];
			},
			onchange: function() {
				if (this.getInputTargetBlock('PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('PIN').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('VALUE')===null)
				{
					var valueBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_number_value');
					valueBlock.initSvg();
					valueBlock.render();
					this.getInput('VALUE').connection.connect(valueBlock.outputConnection);
				}
			}
		};
		
		/*Blockly.Arduino.dyor_bluetooth_recv_telegram_servo360_write = function() {
			// Bluetooth if's conditions.
			var unique = [];
			this.uniqueVariables = [];
			$.each(Object.values(Facilino.ServosIDs), function(i, el){
				if($.inArray(el, unique) === -1) unique.push(el);
			});
			Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
			var servos_map = 'std::map<int,Servo*> _servos={';
			unique.forEach(function (element,index){if (index===0) {servos_map+='{'+element+',&_servo'+element+'}';}else{servos_map+=',{'+element+',&_servo'+element+'}';}});
			servos_map +='};\n';
			Blockly.Arduino.definitions_['declare_var_servos_map'] = servos_map;
			
			var code='';
			code+='\n	  if (_bt_cmd==0x11)\n';
			code += '{\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '     byte value = _bt_data[1];\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n}\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_servo360_write = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_SERVO360'));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('VALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value><value name="VALUE"><block type="dyor_bluetooth_telegram_item_number_value"></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('PIN').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('VALUE')===null)
				{
					var valueBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_number_value');
					valueBlock.initSvg();
					valueBlock.render();
					this.getInput('VALUE').connection.connect(valueBlock.outputConnection);
				}
			}
		};*/
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_sonar = function() {
			// Bluetooth if's conditions.
			var code='';
			code+='\n	  if (_bt_cmd==0x12)//Sonar\n';
			code += '	  {\n';
			code += '	  int ECHO_pin = _bt_data[0];\n';
			code += '     int TRIGGER_pin = _bt_data[1];\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '	  _bt_device.write(\'@\');\n';
			code += '	  _bt_device.write((byte)0x13);\n';
			code += '	  _bt_device.write((byte)4);\n';
			code += '	  _bt_device.write((byte)ECHO_pin);\n';
			code += '	  _bt_device.write((byte)TRIGGER_pin);\n';
			
			code += '     short int _value='+Blockly.Arduino.valueToCode(this,'RESP', Blockly.Arduino.ORDER_ATOMIC)+';\n';
			code += '	  _bt_device.write((byte)((_value&0xFF00)>>8));\n';
			code += '	  _bt_device.write((byte)(_value&0x00FF));\n';
			code += '	  _bt_device.write(\'*\');\n	  }\n';	
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_sonar = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_SONAR_READ'));
				this.appendValueInput('ECHO_PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('TRIGGER_PIN').setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendValueInput('RESP').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="ECHO_PIN"><block type="dyor_bluetooth_telegram_item_digital_echo_pin"></block></value><value name="TRIGGER_PIN"><block type="dyor_bluetooth_telegram_item_digital_trigger_pin"></block></value><value name="RESP"><block type="dyor_us"><value name="RED PIN"><block type="dyor_bluetooth_telegram_item_digital_echo_pin"></block></value><value name="BLUE PIN"><block type="dyor_bluetooth_telegram_item_digital_trigger_pin"></block></value></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('ECHO_PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_echo_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('ECHO_PIN').connection.connect(pinBlock.outputConnection);
				}
				if (this.getInputTargetBlock('TRIGGER_PIN')===null)
				{
					var pinBlock2 = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_trigger_pin');
					pinBlock2.initSvg();
					pinBlock2.render();
					this.getInput('TRIGGER_PIN').connection.connect(pinBlock2.outputConnection);
					
				}
			}
		};
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_buzzer = function() {
			// Bluetooth if's conditions.
			var code='';
			code+='\n	  if (_bt_cmd==0x20)//Buzzer\n';
			code += '	  {\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '	  int frequency = ((((int)_bt_data[1])<<8)|(_bt_data[2]));\n';
			code += '	  int duration = ((((int)_bt_data[3])<<8)|(_bt_data[4]));\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n	  }\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_buzzer = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_BUZZER_TONE'));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('PWMPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('FREQ').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('DURATION').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><block type="dyor_bluetooth_telegram_item_pwm_pin"></block></value><value name="FREQ"><block type="dyor_bluetooth_telegram_item_frequency_value"></block></value><value name="DURATION"><block type="dyor_bluetooth_telegram_item_duration_value"></block></value><value name="DO"><block type="zum_piezo_buzzerav"><value name="PIN"><block type="dyor_bluetooth_telegram_item_pwm_pin"></block></value><value name="TONE"><block type="dyor_bluetooth_telegram_item_frequency_value"></block></value><value name="DURA"><block type="dyor_bluetooth_telegram_item_duration_value"></block></value></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_pwm_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('PIN').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('FREQ')===null)
				{
					var valueBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_frequency_value');
					valueBlock.initSvg();
					valueBlock.render();
					this.getInput('FREQ').connection.connect(valueBlock.outputConnection);
				}
				if (this.getInputTargetBlock('DURATION')===null)
				{
					var valueBlock2 = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_duration_value');
					valueBlock2.initSvg();
					valueBlock2.render();
					this.getInput('DURATION').connection.connect(valueBlock2.outputConnection);
				}
			}
		};
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_buzzer_melody = function() {
			// Bluetooth if's conditions.
			var code='';			
			code+='\n	  if (_bt_cmd==0x21)//Buzzer melody\n';
			code += '	  {\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '	  uint16_t* melody = (uint16_t*)&_bt_data[1];\n';
			code += '     int melody_length=_bt_length;\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n	  }\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_buzzer_melody = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_BUZZER_MELODY'));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('PWMPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('MELODY').setCheck('Melody').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><block type="dyor_bluetooth_telegram_item_pwm_pin"></block></value><value name="MELODY"><block type="dyor_bluetooth_telegram_item_melody"></block></value><value name="DO"><block type="dyor_piezo_buzzer_melody"><value name="PIN"><block type="dyor_bluetooth_telegram_item_pwm_pin"></block></value><value name="MELODY"><block type="dyor_bluetooth_telegram_item_melody"></block></value></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_pwm_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('PIN').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('MELODY')===null)
				{
					var valueBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_melody');
					valueBlock.initSvg();
					valueBlock.render();
					this.getInput('MELODY').connection.connect(valueBlock.outputConnection);
				}
			}
		};
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_dht_temperature = function() {
			// Bluetooth if's conditions.
			var code='';
			
			
			
			
			
			if (this.getInputTargetBlock('RESP')!==null)
			{
				if (this.getInputTargetBlock('RESP').type==='ambient_temp_temperatureDHT')
				{
					var unique = [];
					$.each(Object.values(Facilino.DHTTemperatureIDs), function(i, el){
						if($.inArray(el, unique) === -1) unique.push(el);
					});
					$.each(Object.values(Facilino.DHTHumidityIDs), function(i, el){
						if($.inArray(el, unique) === -1) unique.push(el);
					});
					Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
					var dht_map = 'std::map<int,DHTesp*> _dhts={';
					unique.forEach(function (element,index){if (index===0) {dht_map+='{'+element.pin+',&sensor'+element.type+'_'+element.pin+'}';}else{dht_map+=',{'+element.pin+',&sensor'+element.type+'_'+element.pin+'}';}});
					dht_map +='};\n';
					Blockly.Arduino.definitions_['declare_var_dht_map'] = dht_map;
				}
				code+='\n	  if (_bt_cmd==0x22)//DHT Temperature\n';
				code += '	  {\n';
				code += '	  int pin = _bt_data[0];\n';
				code += Blockly.Arduino.statementToCode(this,'DO');
				code += '	  _bt_device.write(\'@\');\n';
				code += '	  _bt_device.write((byte)0x23);\n';
				code += '	  _bt_device.write((byte)3);\n';
				code += '	  _bt_device.write((byte)pin);\n';
				code += '     short int _temp_value='+Blockly.Arduino.valueToCode(this,'RESP', Blockly.Arduino.ORDER_ATOMIC)+';\n';
				code += '	  _bt_device.write((byte)((_temp_value&0xFF00)>>8));\n';
				code += '	  _bt_device.write((byte)(_temp_value&0x00FF));\n';
				code += '	  _bt_device.write(\'*\');\n	  }\n';	
			}
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_dht_temperature = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_TEMP_READ_HUMID','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO','LANG_BLUETOOTH_RESPONSE'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DHT')).appendField(Facilino.locales.getKey('LANG_TEMP_READ_HUMID'));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendValueInput('RESP').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value><value name="RESP"><block type="ambient_temp_temperatureDHT"><value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('PIN').connection.connect(pinBlock.outputConnection);
				}
			}
		};
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_dht_humidity = function() {
			// Bluetooth if's conditions.
			var code='';
			code+='\n	  if (_bt_cmd==0x24)//DHT humidity\n';
			code += '	  {\n';
			code += '	  int pin = _bt_data[0];\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '	  _bt_device.write(\'@\');\n';
			code += '	  _bt_device.write((byte)0x25);\n';
			code += '	  _bt_device.write((byte)3);\n';
			code += '	  _bt_device.write((byte)pin);\n';
			code += '     short int _humid_value='+Blockly.Arduino.valueToCode(this,'RESP_HUMID', Blockly.Arduino.ORDER_ATOMIC)+';\n';
			code += '	  _bt_device.write((byte)((_humid_value&0xFF00)>>8));\n';
			code += '	  _bt_device.write((byte)(_humid_value&0x00FF));\n';
			code += '	  _bt_device.write(\'*\');\n	  }\n';	
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_dht_humidity = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_HUMID_READ_HUMID','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO','LANG_BLUETOOTH_RESPONSE'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DHT')).appendField(Facilino.locales.getKey('LANG_HUMID_READ_HUMID'));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendValueInput('RESP').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value><value name="RESP"><block type="ambient_humid_humidityDHT"><value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('PIN').connection.connect(pinBlock.outputConnection);
				}
			}
		};
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_8x8matrix_predef = function() {
			// Bluetooth if's conditions.
			var code='';
			code+='\n	  if (_bt_cmd==0x51)//8x8 Matrix \n';
			code += '	  {\n';
			code += '	  int clk_pin = _bt_data[0];\n';
			code += '	  int din_pin = _bt_data[1];\n';
			code += '	  int cs_pin = _bt_data[2];\n';
			code += '	  int value = _bt_data[3];\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n	  }\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_8x8matrix_predef = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_LED_MATRIX'));
				this.appendValueInput('CLK_PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('DIN_PIN').setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('CS_PIN').setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('EXPRESSION').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="CLK_PIN"><block type="dyor_bluetooth_telegram_item_digital_clk_pin"></block></value><value name="DIN_PIN"><block type="dyor_bluetooth_telegram_item_digital_din_pin"></block></value><value name="CS_PIN"><block type="dyor_bluetooth_telegram_item_digital_cs_pin"></block></value><value name="EXPRESSION"><block type="dyor_bluetooth_telegram_item_number_value"></block></value><value name="DO"><block type="controls_if"><value name="IF0"><block type="logic_compare"><value name="A"><block type="dyor_bluetooth_telegram_item_number_value"></block></value><value name="B"><block type="math_number"></block></value></block></value><value name="DO0"><block type="dyor_generic_expression1"><value name="CLK_PIN"><block type="dyor_bluetooth_telegram_item_digital_clk_pin"></block></value><value name="DIN_PIN"><block type="dyor_bluetooth_telegram_item_digital_din_pin"></block></value><value name="CS_PIN"><block type="dyor_bluetooth_telegram_item_digital_cs_pin"></block></value><value name="EXPRESSION"><block type="dyor_drawing1"></block></value></block></value></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('CLK_PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_clk_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('CLK_PIN').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('DIN_PIN')===null)
				{
					var pinBlock2 = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_din_pin');
					pinBlock2.initSvg();
					pinBlock2.render();
					this.getInput('DIN_PIN').connection.connect(pinBlock2.outputConnection);
				}
				if (this.getInputTargetBlock('CS_PIN')===null)
				{
					var pinBlock3 = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_cs_pin');
					pinBlock3.initSvg();
					pinBlock3.render();
					this.getInput('CS_PIN').connection.connect(pinBlock3.outputConnection);
				}
				if (this.getInputTargetBlock('EXPRESSION')===null)
				{
					var valueBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_number_value');
					valueBlock.initSvg();
					valueBlock.render();
					this.getInput('EXPRESSION').connection.connect(valueBlock.outputConnection);
				}
			}
		};
		
		
		Blockly.Arduino.dyor_bluetooth_recv_telegram_led_strip_number = function() {
			// Bluetooth if's conditions.
			var code='';
			
			var unique = [];
			this.uniqueVariables = [];
			$.each(Object.values(Facilino.RGBLEDStripIDs), function(i, el){
				if($.inArray(el, unique) === -1) unique.push(el);
			});
			Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
			var rgb_led_strip_map = 'std::map<int,Adafruit_NeoPixel*> _rgb_led_strips={';
			unique.forEach(function (element,index){if (index===0) {rgb_led_strip_map+='{'+element+',&_led_strip_'+element+'}';}else{rgb_led_strip_map+=',{'+element+',&_led_strip_'+element+'}';}});
			rgb_led_strip_map +='};\n';
			Blockly.Arduino.definitions_['declare_var_rgb_led_strip_map'] = rgb_led_strip_map;
			
			code+='\n	  if (_bt_cmd==0x61)//LED strip expression \n';
			code += '	  {\n';
			code += '	  int pin = _bt_data[0];\n';
			code += '	  int value = _bt_data[1];\n';
			code += Blockly.Arduino.statementToCode(this,'DO');
			code += '\n	  }\n';
			return code;
		};
		
		Blockly.Blocks.dyor_bluetooth_recv_telegram_led_strip_number = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_recv_telegram'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECV_TELEGRAM_NAME','LANG_BLUETOOTH_RECV_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_DATA','LANG_BLUETOOTH_DO'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				//this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECV_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RGB_LED_STRIP'));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('VALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'TELEGRAM_CODE');
				this.setNextStatement(true,'TELEGRAM_CODE');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value><value name="VALUE"><block type="dyor_bluetooth_telegram_item_number_value"></block></value><value name="DO"><block type="controls_if"><value name="IF0"><block type="logic_compare"><value name="A"><block type="dyor_bluetooth_telegram_item_number_value"></block></value><value name="B"><block type="math_number"></block></value></block></value><value name="DO0"><block type="led_strip_generic"><value name="PIN"><block type="dyor_bluetooth_telegram_item_digital_pin"></block></value><value name="EXPRESSION"><block type="led_strip_customized"></block></value></block></value></block></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('PIN')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_digital_pin');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('PIN').connection.connect(pinBlock.outputConnection);
					
				}
				if (this.getInputTargetBlock('VALUE')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_number_value');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('VALUE').connection.connect(pinBlock.outputConnection);
					
				}
			}
		};

	/*Blockly.Arduino.dyor_bluetooth_telegram_type = function() {
		var code = this.getFieldValue('TELEGRAM');
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_type = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_telegram_type'),
			examples: ['dyor_bluetooth_recv_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_TELEGRAM_NAME','LANG_BLUETOOTH_TELEGRAM','LANG_BLUETOOTH_DIGITAL_READ','LANG_BLUETOOTH_DIGITAL_WRITE','LANG_BLUETOOTH_ANALOG_READ','LANG_BLUETOOTH_ANALOG_WRITE','LANG_BLUETOOTH_SERVO','LANG_BLUETOOTH_SONAR_READ','LANG_BLUETOOTH_TCRT5000_READ','LANG_BLUETOOTH_BUZZER_TONE','LANG_BLUETOOTH_BUZZER_MELODY','LANG_BLUETOOTH_DHT','LANG_BLUETOOTH_TELEGRAM_PREDEF_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/smartphoneT.svg", 20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM')).appendField(new Blockly.FieldDropdown([
				[Facilino.locales.getKey('LANG_BLUETOOTH_DIGITAL_READ')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_REQUEST')+')'||'Digital Read Request','0'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_DIGITAL_WRITE')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'Digital Write','2'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_ANALOG_READ')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_REQUEST')+')'||'Analog Read Request','3'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_ANALOG_WRITE')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'Analog Write','5'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_SERVO')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'Servo','10'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_SERVO360')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'Servo 360º','11'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_SONAR_READ')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_REQUEST')+')'||'Sonar','12'],
				//[Facilino.locales.getKey('LANG_BLUETOOTH_TCRT5000_READ')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_REQUEST')||'TCRT5000','14'],
				//[Facilino.locales.getKey('LANG_BLUETOOTH_GAS_READ')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_REQUEST')||'Gas','16'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_BUZZER_TONE')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'Buzzer Tone','20'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_BUZZER_MELODY')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'Buzzer Melody','21'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_DHT')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_REQUEST')+')'||'DHT','22'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_LED_MATRIX')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'LED Matrix','50'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_LED_MATRIX')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_PREDEFINED')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_COMMAND')+')'||'LED Matrix Predefined','51'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_RGB_LED_STRIP')||'RGB LED Strip','60'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_RGB_LED_STRIP')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_PREDEFINED')||'RGB LED Strip Predefined','61'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_RGB_LED_STRIP')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_BRIGHTNESS')||'RGB LED Strip Brightness','62']
				
				]),'TELEGRAM').setAlign(Blockly.ALIGN_RIGHT);
			this.setInputsInline(false);
			this.setOutput(true,'TelegramType');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_PREDEF_TOOLTIP'));
		}
	};*/
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_digital_pin = function() {
		var code = 'pin';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_digital_pin = {
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
				this.appendDummyInput('').appendField('pin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,['DigitalPin',Number]);
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_digital_echo_pin = function() {
		var code = 'echo_pin';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_digital_echo_pin = {
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
				this.appendDummyInput('').appendField('ECHO pin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,['DigitalPin',Number]);
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_digital_trigger_pin = function() {
		var code = 'trigger_pin';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_digital_trigger_pin = {
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
				this.appendDummyInput('').appendField('TRIGGER pin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,['DigitalPin',Number]);
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_digital_clk_pin = function() {
		var code = 'clk_pin';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_digital_clk_pin = {
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
				this.appendDummyInput('').appendField('CLK pin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,'DigitalPin');
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_digital_din_pin = function() {
		var code = 'din_pin';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_digital_din_pin = {
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
				this.appendDummyInput('').appendField('DIN pin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,'DigitalPin');
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_digital_cs_pin = function() {
		var code = 'cs_pin';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_digital_cs_pin = {
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
				this.appendDummyInput('').appendField('CS pin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,'DigitalPin');
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_analog_pin = function() {
		var code = 'pin';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_analog_pin = {
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
				this.appendDummyInput('').appendField('pin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,'AnalogPin');
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_pwm_pin = function() {
		var code = 'pin';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_pwm_pin = {
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
				this.appendDummyInput('').appendField('pin').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,'PWMPin');
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_boolean_value = function() {
		var code = 'value';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_boolean_value = {
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
				this.appendDummyInput('').appendField('value').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Boolean);
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_number_value = function() {
		var code = 'value';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}
	
	Blockly.Blocks.dyor_bluetooth_telegram_item_number_value = {
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
				this.appendDummyInput('').appendField('value').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_frequency_value = function() {
		var code = 'frequency';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_frequency_value = {
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
				this.appendDummyInput('').appendField('frequency').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_duration_value = function() {
		var code = 'duration';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_duration_value = {
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
				this.appendDummyInput('').appendField('duration').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_melody = function() {
		var code = 'melody';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}
	
	Blockly.Blocks.dyor_bluetooth_telegram_item_melody = {
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
				this.appendDummyInput('').appendField('melody').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,'Melody');
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_expression = function() {
		var code = '_bt_data[3],_bt_data[4],_bt_data[5],_bt_data[6],_bt_data[7],_bt_data[8],_bt_data[9],_bt_data[10]';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}
	
	Blockly.Blocks.dyor_bluetooth_telegram_item_expression = {
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
				this.appendDummyInput('').appendField('expression').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,'Expression');
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_index = function() {
		var code = 'index';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_index = {
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
				this.appendDummyInput('').appendField('index').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.contextMenu = false;
			}
	};
	
	Blockly.Arduino.dyor_bluetooth_telegram_item_string_value = function() {
		var code = '_strings[index].c_str()';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

	Blockly.Blocks.dyor_bluetooth_telegram_item_string_value = {
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
				this.appendDummyInput('').appendField('string').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,String);
				this.contextMenu = false;
			}
	};

	/*Blockly.Arduino.dyor_bluetooth_send_telegram = function() {
		var code='{\n';
		var inp1 = Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '0';
		var inp2 = this.getInputTargetBlock('INP2');
		var in2 = Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC)
		
		code += '_bt_device.write(\'@\');\n';//this.getFieldValue('TELEGRAM');
		//@ cmd length data *
		code += '_bt_device.write((byte)0x'+this.getFieldValue('TELEGRAM')+');\n';
		if (inp2!==null)
		{
			if ((this.getFieldValue('TELEGRAM')==='1')||(this.getFieldValue('TELEGRAM')==='9'))
			{
				code +='_bt_device.write((byte)2);\n';
				code +='_bt_device.write((byte)'+inp1+');\n';
				
				if (inp2.type==='variables_get')
				{
					if (Facilino.variables[in2]!==undefined)
						{
							//console.log(Facilino.variables[in2][2]);
						if (Facilino.variables[in2][2]==='variable')
						{
							code +='_bt_device.write((byte)'+in2+');\n';
						}
						else if (Facilino.variables[in2][2]==='1DArray')
						{
							code +='_bt_device.write((byte)'+in2+'[0]);\n';
						}
					}
				}
				else
					code +='_bt_device.write((byte)'+in2+');\n';
			}
			else if ((this.getFieldValue('TELEGRAM')==='4') || (this.getFieldValue('TELEGRAM')==='13'))
			{
				code +='_bt_device.write((byte)3);\n';
				code +='_bt_device.write((byte)'+inp1+');\n';
				if (inp2.type==='variables_get')
				{
					if (Facilino.variables[in2]!==undefined)
					{
						if (Facilino.variables[in2][2]==='variable')
						{
							code +='_bt_device.write((byte)(('+in2+'&0xFF00)>>8));\n';
							code +='_bt_device.write((byte)('+in2+'&0x00FF));\n';
						}
						else if (Facilino.variables[in2][2]==='1DArray')
						{
							code +='_bt_device.write((byte)'+in2+'[1]);\n';
							code +='_bt_device.write((byte)'+in2+'[0]);\n';
						}
					}
				}
				else
				{
					code +='short int _value='+in2+';\n';
					code +='_bt_device.write((byte)((_value&0xFF00)>>8));\n';
					code +='_bt_device.write((byte)(_value&0x00FF));\n';
				}
			}
			else if ((this.getFieldValue('TELEGRAM')==='15')|| (this.getFieldValue('TELEGRAM')==='17'))
			{
				code +='_bt_device.write((byte)5);\n';
				code +='_bt_device.write((byte)'+inp1+');\n';
				code +='_bt_device.write((byte)'+inp1+');\n';
				if (inp2.type==='variables_get')
				{
					if (Facilino.variables[in2]!==undefined)
					{
						if (Facilino.variables[in2][2]==='variable')
						{
							code +='_bt_device.write((byte)(('+in2+'&0xFF00)>>8));\n';
							code +='_bt_device.write((byte)('+in2+'&0x00FF));\n';
						}
						else if (Facilino.variables[in2][2]==='1DArray')
						{
							code +='_bt_device.write((byte)'+in2+'[1]);\n';
							code +='_bt_device.write((byte)'+in2+'[0]);\n';
						}
					}
				}
				else
				{
					code +='short int _value='+in2+';\n';
					code +='_bt_device.write((byte)((_value&0xFF00)>>8));\n';
					code +='_bt_device.write((byte)(_value&0x00FF));\n';
				}
			}
			else if (this.getFieldValue('TELEGRAM')==='23')
			{
				code +='_bt_device.write((byte)5);\n';
				code +='_bt_device.write((byte)'+inp1+');\n';
				
				if (inp2.type==='variables_get')
				{
					if (Facilino.variables[in2]!==undefined)
					{
						if (Facilino.variables[in2][2]==='variable')
						{
							code +='_bt_device.write((byte)(('+in2+'&0x0000FF00)>>8));\n';
							code +='_bt_device.write((byte)('+in2+'&0x000000FF));\n';
							code +='_bt_device.write((byte)(('+in2+'&0xFF000000)>>24));\n';
							code +='_bt_device.write((byte)(('+in2+'&0x00FF0000)>>16));\n';
						}
						else if (Facilino.variables[in2][2]==='1DArray')
						{
							code +='_bt_device.write((byte)'+in2+'[1]);\n';
							code +='_bt_device.write((byte)'+in2+'[0]);\n';
							code +='_bt_device.write((byte)'+in2+'[3]);\n';
							code +='_bt_device.write((byte)'+in2+'[2]);\n';
						}
					}
				}
				else
				{
					code +='short int _value='+in2+';\n';
					code +='_bt_device.write((byte)((_value&0x0000FF00)>>8));\n';
					code +='_bt_device.write((byte)(_value&0x000000FF));\n';
					code +='_bt_device.write((byte)((_value&0xFF000000)>>24));\n';
					code +='_bt_device.write((byte)((_value&0x00FF0000)>>16));\n';
				}
			}
		}
		code +='_bt_device.write(\'*\');\n}\n';
		return code;
	}

	Blockly.Blocks.dyor_bluetooth_send_telegram = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_send_telegram'),
			examples: ['dyor_bluetooth_send_telegram_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_TELEGRAM_SEND_NAME','LANG_BLUETOOTH_DIGITAL_READ','LANG_BLUETOOTH_ANALOG_READ','LANG_BLUETOOTH_SONAR_READ','LANG_BLUETOOTH_TCRT5000_READ','LANG_BLUETOOTH_SEND_TELEGRAM','LANG_BLUETOOTH_TELEGRAM_TYPE','LANG_BLUETOOTH_TELEGRAM_SEND_TOOLTIP','LANG_BLUETOOTH_PIN','LANG_BLUETOOTH_VALUE','LANG_BLUETOOTH_SENSOR','LANG_BLUETOOTH_DISTANCE','LANG_BLUETOOTH_TEXT1','LANG_BLUETOOTH_SENSOR','LANG_BLUETOOTH_R','LANG_BLUETOOTH_G','LANG_BLUETOOTH_B','LANG_BLUETOOTH_DHT'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_SEND_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				var telegram = new Blockly.FieldDropdown([
				[Facilino.locales.getKey('LANG_BLUETOOTH_DIGITAL_READ')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')+')'||'Digital Input','1'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_ANALOG_READ')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')+')'||'Analog Input','4'],
				//[Facilino.locales.getKey('LANG_BLUETOOTH_PUSHBUTTON')||'Push Button','9'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_SONAR_READ')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')+')'||'Sonar','13'],
				//[Facilino.locales.getKey('LANG_BLUETOOTH_TCRT5000_READ')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')||'TCRT5000','15'],
				//[Facilino.locales.getKey('LANG_BLUETOOTH_GAS_READ')+' '+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')||'Gas','17'],
				[Facilino.locales.getKey('LANG_BLUETOOTH_DHT')+' ('+Facilino.locales.getKey('LANG_BLUETOOTH_RESPONSE')+')'||'DHT','23']
				]);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_BLUETOOTH_SEND_TELEGRAM')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_TYPE')).appendField(telegram,'TELEGRAM').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('INP1').setCheck(['DigitalPin','AnalogPin','PWMPin']).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_PIN'),'INP1_FIELD').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('INP2').setCheck([Number,'Variable']).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA')).appendField('(1 '+Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE')+')','BYTES').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_SEND_TOOLTIP'));
			},
			onchange: function()
			{
				if (this.getFieldValue('TELEGRAM')==='1')
				{
					this.setFieldValue('(1 '+Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE')+')','BYTES');
				}
				else if (this.getFieldValue('TELEGRAM')==='4' || this.getFieldValue('TELEGRAM')==='13' || this.getFieldValue('TELEGRAM')==='15')
				{
					this.setFieldValue('(2 '+Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE')+'s)','BYTES');
				}
				else if (this.getFieldValue('TELEGRAM')==='23')
				{
					this.setFieldValue('(4 '+Facilino.locales.getKey('LANG_VARIABLES_TYPE_BYTE')+'s)','BYTES');
				}
			}
	};*/
	
}

	// Source: src/blocks/bq_bluetooth_receive/dyor_bluetooth_receive.js
		Blockly.Arduino.dyor_bluetooth_receive = function() {
			var code = JST['dyor_bluetooth_receive']({});
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};
		Blockly.Blocks.dyor_bluetooth_receive = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_receive'),
			examples: ['dyor_bluetooth_loopback_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_RECEIVE_NAME','LANG_BLUETOOTH_RECEIVE','LANG_BLUETOOTH_RECEIVE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_RECEIVE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_BLUETOOTH_RECEIVE')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));

				this.setInputsInline(false);


				this.setOutput(true,[Number,String]);
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_RECEIVE_TOOLTIP'));
			}
		};

		// Source: src/blocks/bq_bluetooth_send/dyor_bluetooth_send.js
		Blockly.Arduino.dyor_bluetooth_send = function() {
			var statement_send = Blockly.Arduino.valueToCode(this, 'SNT', Blockly.Arduino.ORDER_ATOMIC) || '';
			var code = '';
			code += JST['dyor_bluetooth_send']({'statement_send': statement_send});
			return code;
		};

		Blockly.Blocks.dyor_bluetooth_send = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			tags: ['bluetooth','communication'],
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_send'),
			examples: ['dyor_bluetooth_loopback_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_SEND_SEND_NAME','LANG_BLUETOOTH_SEND','LANG_BLUETOOTH_SEND_SEND','LANG_BLUETOOTH_SEND_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_SEND_SEND_NAME'),
			//bq_bluetooth_send initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_BLUETOOTH_SEND')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendValueInput('SNT').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_SEND_SEND')).setCheck([Number,'Variable']);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_SEND_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="SNT"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			},
			onchange: function() {
				if (this.getInputTargetBlock('SNT')===null)
				{
					var pinBlock = Blockly.mainWorkspace.newBlock('dyor_bluetooth_telegram_item_number_value');
					pinBlock.initSvg();
					pinBlock.render();
					this.getInput('SNT').connection.connect(pinBlock.outputConnection);
					
				}
			}
		};

		Blockly.Arduino.dyor_bluetooth_available = function() {
			var branch = Blockly.Arduino.statementToCode(this, 'DO');
			branch = branch.replace(/&quot;/g, '"');
			var code = JST['dyor_bluetooth_available']({'branch': branch});
			return code;
		};

		Blockly.Blocks.dyor_bluetooth_available = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BLUETOOTH'),
			helpUrl: Facilino.getHelpUrl('dyor_bluetooth_available'),
			examples: ['dyor_bluetooth_loopback_example.bly'],
			tags: ['bluetooth','communication'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH,
			keys: ['LANG_BLUETOOTH_SERIAL_AVAILABLE_NAME','LANG_BLUETOOTH_SERIAL_AVAILABLE','LANG_CONTROLS_REPEAT_INPUT_DO','LANG_BLUETOOTH_SERIAL_AVAILABLE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BLUETOOTH_SERIAL_AVAILABLE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_BLUETOOTH);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_BLUETOOTH_SERIAL_AVAILABLE')).appendField(new Blockly.FieldImage('img/blocks/bluetooth.svg', 52*options.zoom, 24*options.zoom));
				this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_CONTROLS_REPEAT_INPUT_DO')).setCheck('code');
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_SERIAL_AVAILABLE_TOOLTIP'));
			}
		};
		}
	}
	}
	
	var FacilinoBluetooth = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoBluetooth;
	} else {
		window.FacilinoBluetooth = FacilinoBluetooth;
	}
}));
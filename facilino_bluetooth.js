(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		{
		Facilino.indentSentences = function(sentences) {
			var splitted_sentences = sentences.split('\n');
			var final_sentences = '';
			for (var i in splitted_sentences) {
				final_sentences += '  ' + splitted_sentences[i] + '\n';
			}
			return final_sentences;
		};
		
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
			else if (Facilino.profiles['processor']==='ATmega2560')
			{

				var baud_rate = Blockly.Arduino.valueToCode(this, 'BAUD_RATE', Blockly.Arduino.ORDER_ATOMIC);
				var port=this.getFieldValue('PORT');
				Blockly.Arduino.definitions_['declare_var_define_serial'+port] = '#define _bt_device Serial'+port+'\n';
				Blockly.Arduino.setups_['setup_serial_'+port] = '_bt_device.begin('+baud_rate+');\n';
			}
			else if ((Facilino.profiles['processor']==='ESP32'))
			{
				var device_name = Blockly.Arduino.valueToCode(this, 'NAME', Blockly.Arduino.ORDER_ATOMIC) || '"ESP32"';
				Blockly.Arduino.definitions_['declare_var_BluetoothSerial']= 'BluetoothSerial _bt_device;\n';
				Blockly.Arduino.definitions_['define_bluetoothserial'] = JST['bluetoothserial_def_definitions']({});
				Blockly.Arduino.setups_['setup_bluetoothserial_'] = JST['bluetoothserial_bt_device_def_setups']({'name': device_name});
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
				else if (Facilino.profiles['processor']==='ATmega2560')
				{
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_PORT')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.serial_ports),'PORT').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);

				}
				else if ((Facilino.profiles['processor']==='ESP32'))
				{
					this.appendValueInput('NAME').setCheck(String).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_NAME')).setAlign(Blockly.ALIGN_RIGHT);
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_TOOLTIP'));
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
			else if (Facilino.profiles['processor']==='ATmega2560')
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
					else if (Facilino.profiles['processor']==='ATmega2560')
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
		//code += '  if (cmd==0)\n	_bt_cmd=0;\n';
		for (n = 1; n <= this.itemCount_; n++) {
			argument = Blockly.Arduino.valueToCode(this, 'DATA' + n, Blockly.Arduino.ORDER_NONE);
			loop = this.getFieldValue('LOOP'+n);
			branch = Blockly.Arduino.statementToCode(this, 'ITEM' + n);
			branch = indentSentences(branch);
			branch = branch.substring(0, branch.length - 1);
			if (loop=='TRUE')
			   loop_code='	_bt_cmd='+argument+';\n';
			else
			   loop_code='';
			if (argument=='0')
				code += '	 \n  if (cmd=='+argument+'){\n	_bt_cmd=0;\n'+branch+'  }';
			else
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
			this.appendValueInput('DATA' + x).setCheck([Number,'Data']).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP_DATA')).setAlign(Blockly.ALIGN_RIGHT);
			this.appendDummyInput('LOOP' + x).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP_ITEM_LOOP')).appendField(new Blockly.FieldCheckbox('FALSE'), 'LOOP'+x).setAlign(Blockly.ALIGN_RIGHT);
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
					this.removeInput('LOOP' + x);
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
							var dataInput = this.appendValueInput('DATA' + this.itemCount_).setCheck([Number,'Data']).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP_ITEM')).appendField(new Blockly.FieldImage("img/blocks/smartphoneC.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
							var loopInput = this.appendDummyInput('LOOP' + this.itemCount_).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_APP_ITEM_LOOP')).appendField(new Blockly.FieldCheckbox('FALSE'), 'LOOP'+this.itemCount_).setAlign(Blockly.ALIGN_RIGHT);
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
							var inputData = this.getInput('DATA' + x);
				//var loop = this.getFieldValue('LOOP' + x);
							var inputItem = this.getInput('ITEM' + x);
							clauseBlock.valueConnection_ =
								inputData && inputData.connection.targetConnection;
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

	Blockly.Arduino.dyor_bluetooth_command = function() {
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
	};

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


	Blockly.Blocks.dyor_bluetooth_command_num = {
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
		};


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
		var duplicate=false;
		var arguments =[];
		for (n = 0; n < this.itemCount_; n++) {
			argument = Blockly.Arduino.valueToCode(this, 'TELEGRAM' + n, Blockly.Arduino.ORDER_NONE);
			arguments.push(argument);
		}
		//var unique = arguments.filter((v, i, a) => a.indexOf(v) === i);
		var unique = [];
		this.uniqueVariables = [];
		$.each(arguments, function(i, el){
			if($.inArray(el, unique) === -1) unique.push(el);
		});

		if (unique.length!==arguments.length)
			this.setWarningText('Duplicated telegram!');
		else
			this.setWarningText(null);

		for (n = 0; n < unique.length; n++) {
		  argument = unique[n];
		  branch = '';
		if ((argument==='0')||(argument==='2')||(argument==='3')||(argument==='5')||(argument==='10')||(argument==='11')||(argument==='20')||(argument==='21')||((argument==='22'))||(argument==='60')||(argument==='61')||(argument==='62'))
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
			branch = indentSentences(branch);
			branch = branch.substring(0, branch.length - 1);
		  code += '	 \n	  if (_bt_cmd==0x'+argument+') {\n'+branch+'	  }';
		}
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
				this.setMutator(new Blockly.Mutator(['dyor_bluetooth_telegram_item']));
				this.itemCount_ = 0;
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.variables = [];
				this.setTooltip(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_RECV_TOOLTIP'));
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
				for (var x = 0; x < this.itemCount_; x++) {
					this.appendValueInput('TELEGRAM' + x).setCheck('TelegramType').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_TYPE')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('DATA'+x).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA'));
					this.appendStatementInput('ITEM' + x).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('dyor_bluetooth_app_app');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 0; x < this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('dyor_bluetooth_telegram_item');
					//var itemBlock = workspace.newBlock('dyor_bluetooth_telegram_digital_read_item');
					itemBlock.initSvg();
					connection.connect(itemBlock.previousConnection);
					connection = itemBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the items input blocks and remove the inputs.
		for (var x = (this.itemCount_-1); x >= 0; x--) {
					this.removeInput('TELEGRAM' + x);
					this.removeInput('DATA'+x);
					this.removeInput('ITEM' + x);
				}
				this.itemCount_ = 0;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'dyor_bluetooth_telegram_item':
							this.setInputsInline(false);
							var dataInput = this.appendValueInput('TELEGRAM' + this.itemCount_).setCheck('TelegramType').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_TELEGRAM_TYPE')).appendField(new Blockly.FieldImage("img/blocks/smartphoneT.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
							if (clauseBlock.valueConnection_) {
								dataInput.connection.connect(clauseBlock.valueConnection_);
							}
							this.appendDummyInput('DATA'+this.itemCount_).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DATA'));
							var itemInput = this.appendStatementInput('ITEM' + this.itemCount_).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
							// Reconnect any child blocks.

							if (clauseBlock.statementConnection_) {
								itemInput.connection.connect(clauseBlock.statementConnection_);
							}
							this.itemCount_++;
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
						case 'dyor_bluetooth_telegram_item':
							var inputData = this.getInput('TELEGRAM' + x);
							var inputItem = this.getInput('ITEM' + x);
							clauseBlock.valueConnection_ =
								inputData && inputData.connection.targetConnection;
							clauseBlock.statementConnection_ =
								inputItem && inputItem.connection.targetConnection;
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
				this.variables = [];
				for (var x = 0; x < this.itemCount_; x++)
				{
					var input = this.getInputTargetBlock('TELEGRAM' + x);
					if (input){
						var telegram = input.getFieldValue('TELEGRAM');
						if ((telegram==='0')||(telegram==='3'))
						{
							this.variables.push('pin');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['pin']]),'VARIABLES');
						}
						else if ((telegram==='2')||(telegram==='5')||(telegram==='10')||(telegram==='11'))
						{
							this.variables.push('pin');
							this.variables.push('value');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['pin'],['value']]),'VARIABLES');
						}
						else if ((telegram==='12'))
						{
							this.variables.push('ECHO_pin');
							this.variables.push('TRIGGER_pin');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['ECHO_pin'],['TRIGGER_pin']]),'VARIABLES');
						}
						/*else if ((telegram==='14')||(telegram==='16'))
						{
							this.variables.push('analog_pin');
							this.variables.push('digital_pin');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['analog_pin'],['digital_pin']]),'VARIABLES');
						}*/
						else if ((telegram==='20'))
						{
							this.variables.push('pin');
							this.variables.push('frequency');
							this.variables.push('duration');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['pin'],['frequency'],['duration']]),'VARIABLES');
						}
						else if ((telegram==='21'))
						{
							this.variables.push('pin');
							this.variables.push('melody');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['pin'],['melody']]),'VARIABLES');
						}
						else if ((telegram==='22'))
						{
							this.variables.push('pin');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['pin']]),'VARIABLES');
						}
						else if ((telegram==='50'))
						{
							this.variables.push('pin_clk');
							this.variables.push('pin_din');
							this.variables.push('pin_cs');
							this.variables.push('expr');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['pin'],['pin_clk'],['pin_cs'],['expr']]),'VARIABLES');
						}
						else if ((telegram==='51'))
						{
							this.variables.push('pin_clk');
							this.variables.push('pin_din');
							this.variables.push('pin_cs');
							this.variables.push('number');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['pin'],['pin_clk'],['pin_cs'],['number']]),'VARIABLES');
						}
						else if ((telegram==='60'))
						{
							this.variables.push('pin');
							this.variables.push('colors');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['pin'],['colors']]),'VARIABLES');
						}
						else if ((telegram==='61'))
						{
							this.variables.push('pin');
							this.variables.push('number');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['pin'],['number']]),'VARIABLES');
						}
						else if ((telegram==='62'))
						{
							this.variables.push('pin');
							this.variables.push('brightness');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['pin'],['brightness']]),'VARIABLES');
						}
						else if ((telegram==='80')||(telegram==='83')||(telegram==='86'))
						{
							this.variables.push('index');
							this.variables.push('value');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['index'],['value']]),'VARIABLES');
						}
						else if ((telegram==='81')||(telegram==='84')||(telegram==='87'))
						{
							this.variables.push('index');
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['index']]),'VARIABLES');
						}
						else
						{
							try{ this.getInput('DATA'+x).removeField('VARIABLES') } catch (e) {}
							this.getInput('DATA'+x).appendField(new Blockly.FieldDropdown([['']]),'VARIABLES');
						}
					}
				}
				//this.variables = this.variables.filter((v, i, a) => a.indexOf(v) === i);
				var uniqueVariables = [];
				$.each(this.variables, function(i, el){
					if($.inArray(el, uniqueVariables) === -1) uniqueVariables.push(el);
				});
				this.variables = uniqueVariables;
				//console.log(this.variables);
			}
		};

	Blockly.Arduino.dyor_bluetooth_telegram_type = function() {
		var code = this.getFieldValue('TELEGRAM');
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	}

,	Blockly.Blocks.dyor_bluetooth_telegram_type = {
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
	};

	Blockly.Arduino.dyor_bluetooth_send_telegram = function() {
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
			/*else if ((this.getFieldValue('TELEGRAM')==='15')|| (this.getFieldValue('TELEGRAM')==='17'))
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
			}*/
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
	};

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
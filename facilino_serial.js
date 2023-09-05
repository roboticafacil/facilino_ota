(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		Blockly.Arduino.serial_available = function() {
			var branch = Blockly.Arduino.statementToCode(this, 'DO');
			branch = branch.replace(/&quot;/g, '"');
			// branch=branch.replace(/&amp;/g, '');
			Blockly.Arduino.setups_['setup_serial'] = JST['serial_setups']({'bitrate': Facilino.profiles.default.serial});
			if (Facilino.profiles['processor']==='ATmega32U4')
				Blockly.Arduino.setups_['setup_serial_while'] = 'while(!Serial);\n';
			var code = JST['serial_available']({
				'branch': branch
			});
			return code;
		};

		Blockly.Blocks.serial_available = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			helpUrl: Facilino.getHelpUrl('serial_available'),
			tags: ['serial','communication'],
			examples: ['serial_available_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_AVAILABLE_NAME','LANG_ADVANCED_SERIAL_AVAILABLE','LANG_CONTROLS_REPEAT_INPUT_DO','LANG_ADVANCED_SERIAL_AVAILABLE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_USB);
				if (window.FacilinoAdvanced===true)
				{
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
					this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_CONTROLS_REPEAT_INPUT_DO'));
				}
				else
				{
					this.appendDummyInput().appendField(new Blockly.FieldImage('img/blocks/usb.svg',24*options.zoom, 24*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/inbox.svg',20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/available.svg',20*options.zoom, 20*options.zoom));
					this.appendStatementInput('DO').appendField(new Blockly.FieldImage('img/blocks/do.svg', 16*options.zoom, 16*options.zoom));
				}
				
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_TOOLTIP'));
				if (window.FacilinoOTA===true)
					this.setWarningText(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_WARNING'));
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.serial_available['subcategory'];
		
		if (window.FacilinoAdvanced===true)
		{

		// Source: src/blocks/serial_print/serial_print.js
		Blockly.Arduino.serial_print = function() {
			var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			Blockly.Arduino.setups_['setup_serial'] = JST['serial_setups']({'bitrate': Facilino.profiles.default.serial});
			if (Facilino.profiles['processor']==='ATmega32U4')
				Blockly.Arduino.setups_['setup_serial_while'] = 'while(!Serial);\n';
			code += 'Serial.print(' + content+');\n';
			return code;
		};

		Blockly.Blocks.serial_print = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			helpUrl: Facilino.getHelpUrl('serial_print'),
			tags: ['serial','communication'],
			examples: ['serial_print_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_PRINT_NAME','LANG_ADVANCED_SERIAL_PRINT','LANG_ADVANCED_SERIAL_PRINT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PRINT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_USB);
				this.appendValueInput('CONTENT').appendField(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PRINT')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom)).setCheck([String,Number,Boolean,'Variable']);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PRINT_TOOLTIP'));
				if (window.FacilinoOTA===true)
					this.setWarningText(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_WARNING'));
			},
			default_inputs: function()
			{
				return ['<value name="CONTENT"><shadow type="text"><field name="TEXT"></field></shadow></value>','<value name="CONTENT"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<value name="CONTENT"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value>'];
			}
		};
		
		}
		
		
		// Source: src/blocks/serial_println/serial_println.js
		Blockly.Arduino.serial_println = function() {
			var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			Blockly.Arduino.setups_['setup_serial'] = JST['serial_setups']({'bitrate': Facilino.profiles.default.serial});
			if (Facilino.profiles['processor']==='ATmega32U4')
				Blockly.Arduino.setups_['setup_serial_while'] = 'while(!Serial);\n';
			if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
			{
				/*if (this.getInputTargetBlock('CONTENT').type==='ir_read_code')
				{
					Blockly.Arduino.definitions_['IRutils_h']='#include <IRutils.h>';
					code+='serialPrintUint64('+content+',HEX);\n';
				}
				else*/
					code += 'Serial.println(' + content+');\n';
			}
			else
				code += 'Serial.println(' + content+');\n';
			return code;
		};

		Blockly.Blocks.serial_println = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			helpUrl: Facilino.getHelpUrl('serial_println'),
			tags: ['serial','communication'],
			examples: ['serial_print_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_PRINTLN_NAME','LANG_ADVANCED_SERIAL_PRINTLN','LANG_ADVANCED_SERIAL_PRINTLN_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PRINTLN_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_USB);
				if (window.FacilinoAdvanced===true)
				{
					this.appendValueInput('CONTENT').appendField(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PRINTLN')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom)).setCheck([String,Number,Boolean,'Variable']);
				}
				else
				{
					this.appendValueInput('CONTENT').appendField(new Blockly.FieldImage('img/blocks/usb.svg',24*options.zoom, 24*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/printer.svg',20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/text.svg',20*options.zoom, 20*options.zoom)).setCheck([String,Number,Boolean,'Variable']);
				}
				
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PRINTLN_TOOLTIP'));
				if (window.FacilinoOTA===true)
					this.setWarningText(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_WARNING'));
			},
			default_inputs: function()
			{
				return ['<value name="CONTENT"><shadow type="text"><field name="TEXT"></field></shadow></value>','<value name="CONTENT"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<value name="CONTENT"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value>'];
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.serial_println['subcategory'];

		Blockly.Arduino.serial_plot = function() {
			var content = Blockly.Arduino.valueToCode(this, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			Blockly.Arduino.setups_['setup_serial'] = JST['serial_setups']({'bitrate': Facilino.profiles.default.serial});
			if (Facilino.profiles['processor']==='ATmega32U4')
				Blockly.Arduino.setups_['setup_serial_while'] = 'while(!Serial);\n';
			code += 'Serial.println(' + content+');\n';
			return code;
		};

		Blockly.Blocks.serial_plot = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			helpUrl: Facilino.getHelpUrl('serial_plot'),
			tags: ['serial','communication'],
			examples: ['serial_print_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_PLOT_NAME','LANG_ADVANCED_SERIAL_PLOT','LANG_ADVANCED_SERIAL_PLOT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PLOT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_USB);
				if (window.FacilinoAdvanced===true)
				{
					this.appendValueInput('CONTENT').setCheck([Boolean,Number,'Variable']).appendField(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PLOT')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
				}
				else
				{
					this.appendValueInput('CONTENT').appendField(new Blockly.FieldImage('img/blocks/usb.svg',24*options.zoom, 24*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/printer.svg',20*options.zoom, 20*options.zoom)).setCheck([Boolean,Number,'Variable']).appendField(new Blockly.FieldImage('img/blocks/analog_signal.svg',20*options.zoom,20*options.zoom));
				}
				
				
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PLOT_TOOLTIP'));
				if (window.FacilinoOTA===true)
					this.setWarningText(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_WARNING'));
			},
			default_inputs: function()
			{
				return ['<value name="CONTENT"><shadow type="math_number"><field name="NUM">0</field></shadow></value>','<value name="CONTENT"><shadow type="logic_boolean"><field name="BOOL">TRUE</field></shadow></value>'];
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.serial_plot['subcategory'];
		
		if (window.FacilinoAdvanced===true)
			{

		Blockly.Arduino.plot_join = function() {
			// Create a string made up of any number of elements of any type.
			var code = '';
			Blockly.Arduino.setups_['setup_serial'] = JST['serial_setups']({'bitrate': Facilino.profiles.default.serial});
			if (Facilino.profiles['processor']==='ATmega32U4')
				Blockly.Arduino.setups_['setup_serial_while'] = 'while(!Serial);\n';
			//console.log('this.itemCount_', this.itemCount_);
			if (this.itemCount_ === 0) {
				return ['\'\'', Blockly.Arduino.ORDER_ATOMIC];
			} else if (this.itemCount_ === 1) {
				var argument0 = Blockly.Arduino.valueToCode(this, 'ADD0', Blockly.Arduino.ORDER_ATOMIC) || '';
				code += 'Serial.println(' + argument0+');\n';
				return code;
			} else {
				for (var n = 0; n < (this.itemCount_-1); n++) {
					argumenti = (Blockly.Arduino.valueToCode(this, 'ADD' + n, Blockly.Arduino.ORDER_ATOMIC) || '');
					code += 'Serial.print(' + argumenti+');\n';
					code += 'Serial.print(",");\n';
					//console.log('iteration', n, '\ncode: ', code, '\nfinal_line: ', final_line, '\nb', i);
				}
				argumentn = (Blockly.Arduino.valueToCode(this, 'ADD' + (this.itemCount_-1), Blockly.Arduino.ORDER_ATOMIC) || '');
				code += 'Serial.println(' + argumentn+');\n';


				return code;
			}
		};

		Blockly.Blocks.plot_join = {
			// Create a string made up of any number of elements of any type.
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			helpUrl: Facilino.getHelpUrl('plot_join'),
			examples: ['plot_join_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION,
			keys: ['LANG_PLOT_JOIN_NAME','LANG_PLOT_JOIN_Field_CREATEWITH','LANG_PLOT_JOIN_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PLOT_JOIN_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION);
				this.appendValueInput('ADD0').appendField(Facilino.locales.getKey('LANG_PLOT_JOIN_Field_CREATEWITH')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom)).setCheck([Boolean,Number,'Variable']);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');;
				this.appendValueInput('ADD1').setCheck([Number,Boolean,'Variable']);
				this.setMutator(new Blockly.Mutator(['plot_create_join_item']));
				this.setTooltip(Facilino.locales.getKey('LANG_PLOT_JOIN_TOOLTIP'));
				if (window.FacilinoOTA===true)
					this.setWarningText(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_WARNING'));
				this.itemCount_ = 2;
			},
			default_inputs: function()
			{
				return '<value name="ADD0"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="ADD1"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			},
			mutationToDom: function() {
				var container = document.createElement('mutation');
				container.setAttribute('items', this.itemCount_);
				return container;
			},
			domToMutation: function(xmlElement) {
				for (var x = 0; x < this.itemCount_; x++) {
					this.removeInput('ADD' + x);
				}
				this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
				for (x = 0; x < this.itemCount_; x++) {
					var input = this.appendValueInput('ADD' + x).setCheck([Number,Boolean,'Variable']);
					if (x === 0) {
						input.appendField(Facilino.locales.getKey('LANG_PLOT_JOIN_Field_CREATEWITH')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
					}
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('plot_create_join_container');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 0; x < this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('plot_create_join_item');
					itemBlock.initSvg();
					connection.connect(itemBlock.previousConnection);
					connection = itemBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all input blocks and remove all inputs.
				if (this.itemCount_ === 0) {
					this.removeInput('EMPTY');
				} else {
					for (var x = this.itemCount_ - 1; x >= 0; x--) {
						this.removeInput('ADD' + x);
					}
				}
				this.itemCount_ = 0;
				// Rebuild the block's inputs.
				var itemBlock = containerBlock.getInputTargetBlock('STACK');
				while (itemBlock) {
					var input = this.appendValueInput('ADD' + this.itemCount_).setCheck([Number,Boolean,'Variable']);
					if (this.itemCount_ === 0) {
						input.appendField(Facilino.locales.getKey('LANG_PLOT_JOIN_Field_CREATEWITH')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
					}
					// Reconnect any child blocks.
					if (itemBlock.valueConnection_) {
						input.connection.connect(itemBlock.valueConnection_);
					}
					this.itemCount_++;
					itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
				}
			},
			saveConnections: function(containerBlock) {
				// Store a pointer to any connected child blocks.
				var itemBlock = containerBlock.getInputTargetBlock('STACK');
				var x = 0;
				while (itemBlock) {
					var input = this.getInput('ADD' + x);
					itemBlock.valueConnection_ = input && input.connection.targetConnection;
					x++;
					itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
				}
			}
		};

		Blockly.Blocks.plot_create_join_container = {
			// Container.
			colour: Facilino.LANG_COLOUR_COMMUNICATION,
			keys: ['LANG_PLOT_CREATE_JOIN_TITLE_JOIN','LANG_PLOT_CREATE_JOIN_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_PLOT_CREATE_JOIN_TITLE_JOIN'));
				this.appendStatementInput('STACK').setCheck('plot_join');
				this.setTooltip(Facilino.locales.getKey('LANG_PLOT_CREATE_JOIN_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.plot_create_join_item = {
			// Add items.
			colour: Facilino.LANG_COLOUR_COMMUNICATION,
			keys: ['LANG_PLOT_CREATE_JOIN_ITEM_TITLE_ITEM','LANG_PLOT_CREATE_JOIN_ITEM_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_PLOT_CREATE_JOIN_ITEM_TITLE_ITEM'));
				this.setPreviousStatement(true,'plot_join');
				this.setNextStatement(true,'plot_join');
				this.setTooltip(Facilino.locales.getKey('LANG_PLOT_CREATE_JOIN_ITEM_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		}

		// Source: src/blocks/serial_parseint/serial_parseint.js

		Blockly.Arduino.serial_parseint = function() {
			Blockly.Arduino.setups_['setup_serial'] = JST['serial_setups']({'bitrate': Facilino.profiles.default.serial});
			if (Facilino.profiles['processor']==='ATmega32U4')
				Blockly.Arduino.setups_['setup_serial_while'] = 'while(!Serial);\n';
			var code = 'Serial.parseInt()';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.serial_parseint = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			helpUrl: Facilino.getHelpUrl('serial_parseint'),
			tags: ['serial','communication'],
			examples: ['logic_operation_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_PARSEINT_NAME','LANG_ADVANCED_SERIAL_PARSEINT','LANG_ADVANCED_SERIAL_PARSEINT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PARSEINT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_USB);
				if (window.FacilinoAdvanced===true)
				{
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PARSEINT')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
				}
				else
				{
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/usb.svg',24*options.zoom, 24*options.zoom)).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/read.svg',20*options.zoom,20*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/numbers.svg',20*options.zoom, 20*options.zoom));
				}
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PARSEINT_TOOLTIP'));
				if (window.FacilinoOTA===true)
					this.setWarningText(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_WARNING'));
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.serial_parseint['subcategory'];

		if (window.FacilinoAdvanced===true)
			{
		Blockly.Arduino.serial_parsefloat = function() {
			Blockly.Arduino.setups_['setup_serial'] = JST['serial_setups']({'bitrate': Facilino.profiles.default.serial});
			if (Facilino.profiles['processor']==='ATmega32U4')
				Blockly.Arduino.setups_['setup_serial_while'] = 'while(!Serial);\n';
			var code = 'Serial.parseFloat()';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.serial_parsefloat = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			helpUrl: Facilino.getHelpUrl('serial_parsefloat'),
			tags: ['serial','communication'],
			examples: ['logic_operation_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_PARSEFLOAT_NAME','LANG_ADVANCED_SERIAL_PARSEFLOAT','LANG_ADVANCED_SERIAL_PARSEFLOAT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PARSEFLOAT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_USB);
				this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PARSEFLOAT')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_PARSEFLOAT_TOOLTIP'));
				if (window.FacilinoOTA===true)
					this.setWarningText(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_WARNING'));
			}
		};
		
		
		// Source: src/blocks/serial_read/serial_read.js
		

		Blockly.Arduino.serial_read = function() {

			Blockly.Arduino.setups_['setup_serial'] = JST['serial_setups']({'bitrate': Facilino.profiles.default.serial});
			if (Facilino.profiles['processor']==='ATmega32U4')
				Blockly.Arduino.setups_['setup_serial_while'] = 'while(!Serial);\n';
			var code = 'Serial.read()';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.serial_read = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			helpUrl: Facilino.getHelpUrl('serial_read'),
			examples: ['serial_read_example.bly'],
			tags: ['serial','communication'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_READ_NAME','LANG_ADVANCED_SERIAL_READ','LANG_ADVANCED_SERIAL_READ_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_SERIAL_READ_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_USB);
				this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_READ')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_READ_TOOLTIP'));
				if (window.FacilinoOTA===true)
					this.setWarningText(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_WARNING'));
			}
		};
		
		}

		// Source: src/blocks/serial_readstring/serial_readstring.js

		Blockly.Arduino.serial_readstring = function() {

			Blockly.Arduino.setups_['setup_serial'] = JST['serial_setups']({'bitrate': Facilino.profiles.default.serial});
			var code = 'Serial.readString()';

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.serial_readstring = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			tags: ['serial','communication'],
			helpUrl: Facilino.getHelpUrl('serial_readstring'),
			examples: ['serial_readstring_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_READSTRING_NAME','LANG_ADVANCED_SERIAL_READSTRING','LANG_ADVANCED_SERIAL_READSTRING_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_USB);
				if (window.FacilinoAdvanced===true)
				{
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
				}
				else
				{
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/usb.svg',24*options.zoom, 24*options.zoom)).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/read.svg',20*options.zoom,20*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/text.svg',20*options.zoom, 20*options.zoom));
				}
				this.setOutput(true,String);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_READSTRING_TOOLTIP'));
				if (window.FacilinoOTA===true)
					this.setWarningText(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_WARNING'));
			}
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.serial_readstring['subcategory'];

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Blocks.serial_write = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			helpUrl: Facilino.getHelpUrl('serial_write'),
			tags: ['serial','communication'],
			examples: ['serial_print_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_SERIAL_WRITE_NAME','LANG_ADVANCED_SERIAL_WRITE','LANG_ADVANCED_SERIAL_WRITE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_SERIAL_WRITE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_USB);
				this.appendValueInput('DATA',[String,'Array','Variable']).appendField(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_WRITE')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom));
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_WRITE_TOOLTIP'));
				if (window.FacilinoOTA===true)
					this.setWarningText(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_WARNING'));
			},
			default_inputs: function()
			{
				return ['<value name="DATA"><shadow type="text"><field name="TEXT"></field></shadow></value>','<value name="DATA"><shadow type="math_1DArray_constructor2"></shadow></value>','<value name="DATA"><shadow type="variables_get"></shadow></value>'];
			}
		};
		// Source: src/blocks/serial_println/serial_println.js
		Blockly.Arduino.serial_write = function() {
			var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			Blockly.Arduino.setups_['setup_serial'] = JST['serial_setups']({'bitrate': Facilino.profiles.default.serial});
			if (Facilino.profiles['processor']==='ATmega32U4')
				Blockly.Arduino.setups_['setup_serial_while'] = 'while(!Serial);\n';
			var data_block = this.getInputTargetBlock('DATA');
			if (data_block!==null)
			{
				if (data_block.type==='variables_get')
				{
				  if (Facilino.variables[data][2]==='variable')
				  {
					  if ((Facilino.variables[data][0]==='byte')||(Facilino.variables[data][0]==='char'))
						code+='Serial.write((byte*)&'+data+',sizeof(byte));\n ';
					  else if (Facilino.variables[data][0]==='short')
						code+='Serial.write((byte*)&'+data+',sizeof(short));\n ';
					  else if (Facilino.variables[data][0]==='int')
						code+='Serial.write((byte*)&'+data+',sizeof(int));\n ';
					  else if (Facilino.variables[data][0]==='long')
						code+='Serial.write((byte*)&'+data+',sizeof(long));\n ';
					  else if (Facilino.variables[data][0]==='float')
						code+='Serial.write((byte*)&'+data+',sizeof(float));\n ';
				  }
				  else if (Facilino.variables[data][2]==='1DArray')
				  {
					  if ((Facilino.variables[data][0]==='byte')||(Facilino.variables[data][0]==='char'))
						code+='Serial.write((byte*)&'+data+','+Facilino.variables[data][3]+');\n ';
					  else if (Facilino.variables[data][0]==='short')
						code+='Serial.write((byte*)&'+data+',sizeof(short)*'+Facilino.variables[data][3]+');\n ';
					  else if (Facilino.variables[data][0]==='int')
						code+='Serial.write((byte*)&'+data+',sizeof(int)*'+Facilino.variables[data][3]+');\n ';
					  else if (Facilino.variables[data][0]==='long')
						code+='Serial.write((byte*)&'+data+',sizeof(long)*'+Facilino.variables[data][3]+');\n ';
					  else if (Facilino.variables[data][0]==='float')
						code+='Serial.write((byte*)&'+data+',sizeof(float)*'+Facilino.variables[data][3]+');\n ';
				  }
				  this.setWarningText(null);
				}
				else
				{
				  code+='Serial.write('+data+');\n';
				  //this.setWarningText('Expected variable');
				}
			}
			return code;
		};

	// Source: src/blocks/advanced_conversion/advanced_conversion.js

		Blockly.Arduino.advanced_conversion = function() {
			var value_num = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE);
			var code = '';
			var convertion = this.getFieldValue('CONV');
			code += value_num+','+convertion;

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.advanced_conversion = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			tags: ['serial','communication'],
			helpUrl: Facilino.getHelpUrl('advanced_conversion'),
			examples: ['advanced_conversion_example.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_USB,
			keys: ['LANG_ADVANCED_CONVERSION_NAME','LANG_ADVANCED_CONVERSION_CONVERT','LANG_ADVANCED_CONVERSION_DECIMAL','LANG_ADVANCED_CONVERSION_HEXADECIMAL','LANG_ADVANCED_CONVERSION_OCTAL','LANG_ADVANCED_CONVERSION_BINARY','LANG_ADVANCED_CONVERSION_VALUE','LANG_ADVANCED_CONVERSION_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_CONVERSION_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_USB);
				this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_ADVANCED_CONVERSION_CONVERT'))
					.appendField(new Blockly.FieldDropdown([
						[Facilino.locales.getKey('LANG_ADVANCED_CONVERSION_DECIMAL') || 'DEC', 'DEC'],
						[Facilino.locales.getKey('LANG_ADVANCED_CONVERSION_HEXADECIMAL') || 'HEX', 'HEX'],
						[Facilino.locales.getKey('LANG_ADVANCED_CONVERSION_OCTAL') || 'OCT', 'OCT'],
						[Facilino.locales.getKey('LANG_ADVANCED_CONVERSION_BINARY') || 'BIN', 'BIN']
					]), 'CONV');
				this.appendValueInput('NUM')
					.appendField(Facilino.locales.getKey('LANG_ADVANCED_CONVERSION_VALUE'))
					.setAlign(Blockly.ALIGN_RIGHT)
					.setCheck([Number,'Variable']);
				this.setOutput(true,String);
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_CONVERSION_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="NUM"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};
		Blockly.Arduino.serial_timeout = function() {
			var timeout = Blockly.Arduino.valueToCode(this, 'TIMEOUT', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			Blockly.Arduino.setups_['setup_serial_timeout'] = 'Serial.setTimeout('+timeout+');\n';
			return code;
		};

		Blockly.Blocks.serial_timeout = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_USB'),
			tags: ['serial','communication'],
			helpUrl: Facilino.getHelpUrl('serial_timeout'),
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_COMMUNICATION_USB,
			tags: ['serial'],
			examples: ['serial_read_example.bly'],
			keys: ['LANG_ADVANCED_SERIAL_TIMEOUT_NAME','LANG_ADVANCED_SERIAL_TIMEOUT','LANG_ADVANCED_SERIAL_TIMEOUT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ADVANCED_SERIAL_TIMEOUT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_USB);
				this.appendValueInput('TIMEOUT').appendField(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_TIMEOUT')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/usb.svg', 52*options.zoom, 24*options.zoom)).setCheck([Number,'Variable']);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_TIMEOUT_TOOLTIP'));
				if (window.FacilinoOTA===true)
					this.setWarningText(Facilino.locales.getKey('LANG_ADVANCED_SERIAL_AVAILABLE_WARNING'));
			},
			default_inputs: function()
			{
				return '<value name="TIMEOUT"><shadow type="math_number"><field name="NUM">1000</field></shadow></value>';
			}
		};
			}
	}
	
	var FacilinoSerial = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoSerial;
	} else {
		window.FacilinoSerial = FacilinoSerial;
	}
}));
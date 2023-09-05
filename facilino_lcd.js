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
	Blockly.Arduino.lcd_def = function() {
			Blockly.Arduino.definitions_['define_wire'] = '#include <Wire.h>';
			Blockly.Arduino.definitions_['define_liquid_crystals'] = '#include <LiquidCrystal.h>';
			Blockly.Arduino.definitions_['declare_var_LCD'] = 'LiquidCrystal _lcd('+this.getFieldValue('LCD_1')+','+this.getFieldValue('LCD_2')+','+this.getFieldValue('LCD_3')+','+this.getFieldValue('LCD_4')+','+this.getFieldValue('LCD_5')+','+this.getFieldValue('LCD_6')+');\n';
			Blockly.Arduino.setups_['setup_lcd'] = '_lcd.begin(16, 2);\n  _lcd.clear();\n';
			return '';
		};

		Blockly.Blocks.lcd_def = {

			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LCD'),
			tags: ['lcd','screen'],
			helpUrl: Facilino.getHelpUrl('lcd_def'),
			examples: ['lcd_def_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LCD,
			keys: ['LANG_LCD_DEF_NAME','LANG_LCD_DEF','LANG_LCD_PINS','LANG_LCD_DEF_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LCD_DEF_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LCD);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_LCD_DEF')).appendField('RS').appendField(new Blockly.FieldDropdown(Facilino.profiles['default'].digital),'LCD_1')
					.appendField('EN').appendField(new Blockly.FieldDropdown(Facilino.profiles['default'].digital),'LCD_2').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_LCD_PINS'))
					.appendField(new Blockly.FieldDropdown(Facilino.profiles['default'].digital),'LCD_3')
					.appendField(new Blockly.FieldDropdown(Facilino.profiles['default'].digital),'LCD_4')
					.appendField(new Blockly.FieldDropdown(Facilino.profiles['default'].digital),'LCD_5')
					.appendField(new Blockly.FieldDropdown(Facilino.profiles['default'].digital),'LCD_6').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_LCD_DEF_TOOLTIP'));
				this.setFieldValue(Facilino.profiles['default'].digital[0][1],'LCD_1');
				this.setFieldValue(Facilino.profiles['default'].digital[1][1],'LCD_2');
				this.setFieldValue(Facilino.profiles['default'].digital[2][1],'LCD_3');
				this.setFieldValue(Facilino.profiles['default'].digital[3][1],'LCD_4');
				this.setFieldValue(Facilino.profiles['default'].digital[4][1],'LCD_5');
				this.setFieldValue(Facilino.profiles['default'].digital[5][1],'LCD_6');
			},
			isNotDuplicable: true
		};
	}

		Blockly.Arduino.lcd_def1 = function() {
			Blockly.Arduino.definitions_['define_liquid_crystals1'] = '#include <LiquidCrystal_I2C.h>';
			Blockly.Arduino.definitions_['declare_var_LCD'] = 'LiquidCrystal_I2C _lcd(0x27,16,2);\n';
			Blockly.Arduino.setups_['setup_lcd'] = '_lcd.init();\n  _lcd.clear();\n';
			return '';
		};

		Blockly.Blocks.lcd_def1 = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LCD'),
			tags: ['lcd','screen'],
			helpUrl: Facilino.getHelpUrl('lcd_def1'),
			examples: ['lcd_def1_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LCD,
			keys: ['LANG_LCD_DEF1_NAME','LANG_LCD_DEF1','LANG_LCD_DEF_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LCD_DEF1_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LCD);
				if (window.FacilinoAdvanced===true)
				{
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_LCD_DEF1')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));
				}
				else
				{
					this.appendDummyInput().appendField(new Blockly.FieldImage('img/blocks/setup.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_LCD_DEF1_TOOLTIP'));
			},
			isNotDuplicable: true
		};

		Blockly.Arduino.lcd_clear = function() {
			var code = '_lcd.clear();\n';
			return code;
		};

		Blockly.Blocks.lcd_clear = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LCD'),
			tags: ['lcd','screen'],
			helpUrl: Facilino.getHelpUrl('lcd_clear'),
			examples: ['lcd_clear_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LCD,
			keys: ['LANG_LCD_CLEAR_NAME','LANG_LCD_CLEAR','LANG_LCD_CLEAR_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LCD_CLEAR_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LCD);
				if (window.FacilinoAdvanced===true)
				{
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_LCD_CLEAR')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));
				}
				else
				{
					this.appendDummyInput().appendField(new Blockly.FieldImage('img/blocks/eraser.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));					
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_LCD_CLEAR_TOOLTIP'));
			},
			onchange: function()
			  {
				  var Blocks=Blockly.getMainWorkspace().getAllBlocks();
				  var block_found = Blocks.find(function (block){return (block.type=='lcd_def' || block.type=='lcd_def1');});
				  if (block_found===undefined)
					this.setWarningText('This block instruction requires to define the LCD pin connections');
				  else
					this.setWarningText(null);

			  }
		};

		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.lcd_cursor = function() {
			var xcoor = Blockly.Arduino.valueToCode(this, 'XCOOR', Blockly.Arduino.ORDER_ATOMIC);
			var ycoor = Blockly.Arduino.valueToCode(this, 'YCOOR', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			code += '_lcd.setCursor('+ycoor+','+xcoor+');\n';
			return code;
		};

		Blockly.Blocks.lcd_cursor = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
				  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LCD'),
			tags: ['lcd','screen'],
			helpUrl: Facilino.getHelpUrl('lcd_cursor'),
				  category_colour: Facilino.LANG_COLOUR_SCREEN,
				  colour: Facilino.LANG_COLOUR_SCREEN_LCD,
			  keys: ['LANG_LCD_CURSOR_NAME','LANG_LCD_CURSOR','LANG_LCD_ROW','LANG_LCD_COLUMN','LANG_LCD_CURSOR_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LCD_CURSOR_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LCD);
				this.appendValueInput('XCOOR').appendField(Facilino.locales.getKey('LANG_LCD_CURSOR')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_LCD_ROW')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('YCOOR').appendField(Facilino.locales.getKey('LANG_LCD_COLUMN')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_LCD_CURSOR_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="XCOOR"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				xml+='<value name="YCOOR"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
				return xml;
			}
		};
		}


		Blockly.Arduino.lcd_print = function() {
			var val = Blockly.Arduino.valueToCode(this, 'VAL', Blockly.Arduino.ORDER_ATOMIC);
			//var row = Blockly.Arduino.valueToCode(this, 'XCOOR', Blockly.Arduino.ORDER_ATOMIC);
			var row = this.getFieldValue('ROW');
			var code = '';
			code += '_lcd.setCursor(0,'+row+');\n';
			code += '_lcd.print(' +val+');\n';
			code = code.replace(/&quot;/g, '"');
			return code;
		};

		Blockly.Blocks.lcd_print = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LCD'),
			tags: ['lcd','screen'],
			helpUrl: Facilino.getHelpUrl('lcd_print'),
			examples: ['lcd_print_example1.bly','lcd_print_example2.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LCD,
			keys: ['LANG_LCD_PRINT_NAME','LANG_LCD_PRINT','LANG_LCD_ROW','LANG_LCD_PRINT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LCD_PRINT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LCD);
				if (window.FacilinoAdvanced===true)
				{
					this.appendValueInput('VAL').appendField(Facilino.locales.getKey('LANG_LCD_PRINT')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom)).setCheck([String,'Variable']);
					//this.appendValueInput('XCOOR').appendField(Facilino.locales.getKey('LANG_LCD_ROW')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_LCD_ROW')).appendField(new Blockly.FieldDropdown([['1st','0'],['2nd','1']]),'ROW').setAlign(Blockly.ALIGN_RIGHT);
				}
				else
				{
					this.appendValueInput('VAL').appendField(new Blockly.FieldImage('img/blocks/printer.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom)).setCheck([String,'Variable']);
					//this.appendValueInput('XCOOR').appendField(Facilino.locales.getKey('LANG_LCD_ROW')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/row.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldDropdown([['1st','0'],['2nd','1']]),'ROW').setAlign(Blockly.ALIGN_RIGHT);
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_LCD_PRINT_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="VAL"><shadow type="text"><field name="text">0</field></shadow></value>';
				return xml;
			}
		};

		Blockly.Blocks.lcd_scroll = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LCD'),
			tags: ['lcd','screen'],
			helpUrl: Facilino.getHelpUrl('lcd_scroll'),
			examples: [],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LCD,
			keys: ['LANG_LCD_SCROLL','LANG_LCD_PRINT_POSITION','LANG_LCD_SCROLL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LCD_SCROLL_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LCD);
				if (window.FacilinoAdvanced===true)
				{
					this.appendValueInput('VAL').appendField(Facilino.locales.getKey('LANG_LCD_SCROLL')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom)).setCheck([String,'Variable']);
					this.appendValueInput('DELAY_TIME').appendField(Facilino.locales.getKey('LANG_LCD_DELAY_TIME')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_LCD_ROW')).appendField(new Blockly.FieldDropdown([['1st','0'],['2nd','1']]),'ROW').setAlign(Blockly.ALIGN_RIGHT);
				}
				else
				{
					this.appendValueInput('VAL').appendField(new Blockly.FieldImage('img/blocks/printer.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/scroll.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom)).setCheck([String,'Variable']);
					this.appendValueInput('DELAY_TIME').appendField(new Blockly.FieldImage('img/blocks/clock.svg', 20*options.zoom, 20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/row.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldDropdown([['1st','0'],['2nd','1']]),'ROW').setAlign(Blockly.ALIGN_RIGHT);						
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_LCD_SCROLL_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="VAL"><shadow type="text"><field name="text">0</field></shadow></value>';
				xml+='<value name="DELAY_TIME"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
				return xml;
			},
			onchange: function() {
				var Blocks=Blockly.getMainWorkspace().getAllBlocks();
				  var block_found = Blocks.find(function (block){return (block.type=='lcd_def' || block.type=='lcd_def1');});
				  if (block_found===undefined)
					this.setWarningText('This block instruction requires to define the LCD pin connections');
				  else
					this.setWarningText(null);
			}
		};

		Blockly.Arduino.lcd_scroll = function() {
			var val = Blockly.Arduino.valueToCode(this, 'VAL', Blockly.Arduino.ORDER_ATOMIC);
			var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
			var xcoor = this.getFieldValue('ROW');
			var code = '';
			Blockly.Arduino.definitions_['define_lcd_scroll'] = 'void scrollText(int row, String message, int delayTime, int lcdColumns) {\n  for (int i=0; i < lcdColumns; i++) {\n	message = " " + message;\n   }\n   message = message + " ";\n  for (int pos = 0; pos < message.length(); pos++) {\n	_lcd.setCursor(0, row);\n	_lcd.print(message.substring(pos, pos + lcdColumns));\n	delay(delayTime);\n  }\n}\n';
			code += 'scrollText('+xcoor+','+val+','+delay_time+',16);\n';
			code = code.replace(/&quot;/g, '"');
			return code;
		};

		/*Blockly.Blocks.lcd_print = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LCD'),
			tags: ['lcd','screen'],
			helpUrl: Facilino.getHelpUrl('lcd_print'),
			examples: ['lcd_print_example1.bly','lcd_print_example2.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LCD,
			keys: ['LANG_LCD_PRINT','LANG_LCD_PRINT_POSITION','LANG_LCD_PRINT_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LCD);
				this.appendValueInput('VAL').appendField(Facilino.locales.getKey('LANG_LCD_PRINT')).appendField(new Blockly.FieldImage('img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));
				// .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 52*options.zoom, 20*options.zoom));
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_LCD_PRINT_POSITION')).appendField(new Blockly.FieldCheckbox('FALSE'), 'POS').setAlign(Blockly.ALIGN_RIGHT);
				this.last_pos = this.getFieldValue('POS');
				this.getPosition();
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_LCD_PRINT_TOOLTIP'));
			},
			getPosition: function() {
				console.log('getPosition()');
				try {
					this.removeInput('XCOOR');
					this.removeInput('YCOOR');
				} catch (e) {}
				if (this.getFieldValue('POS') === 'TRUE') {
					this.appendValueInput('XCOOR').appendField('row').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('YCOOR').appendField('column').setAlign(Blockly.ALIGN_RIGHT);
				}
			},
			onchange: function() {
				if (this.getFieldValue('POS') !== this.last_pos) {
					this.getPosition();
					this.last_pos = this.getFieldValue('POS');
				}
				var Blocks=Blockly.getMainWorkspace().getAllBlocks();
				  var block_found = Blocks.find(function (block){return (block.type=='lcd_def' || block.type=='lcd_def1');});
				  if (block_found===undefined)
					this.setWarningText('This block instruction requires to define the LCD pin connections');
				  else
					this.setWarningText(null);
			},
			mutationToDom: function() {
				var container = document.createElement('mutation');
				if (this.getFieldValue('POS') === 'TRUE') {
					container.setAttribute('fixed', true);
				} else if (this.getFieldValue('POS') === 'FALSE') {
					container.setAttribute('fixed', false);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.setFieldValue(xmlElement.getAttribute('fixed'), 'POS');
				if (this.getFieldValue('POS') === 'TRUE') {
					this.appendValueInput('XCOOR').appendField('row').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('YCOOR').appendField('column').setAlign(Blockly.ALIGN_RIGHT);
				}
			}
		};*/
		// Source: src/blocks/lcd_setBacklight/lcd_setBacklight.js


		Blockly.Arduino.lcd_setBacklight = function() {
			var state = this.getFieldValue('STATE');
			var code = '_lcd.setBacklight(' +state+');\n';
			return code;
		};

		Blockly.Blocks.lcd_setBacklight = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_LCD'),
			helpUrl: Facilino.getHelpUrl('lcd_setBacklight'),
			tags: ['lcd','screen'],
			examples: ['lcd_setBacklight_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LCD,
			keys: ['LANG_LCD_SETBACKLIGHT','LANG_LCD_SETBACKLIGHT_CLOSE','LANG_LCD_SETBACKLIGHT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LCD_SETBACKLIGHT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LCD);
				if (window.FacilinoAdvanced===true)
				{
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_LCD_SETBACKLIGHT'),'LIGHT').appendField(new Blockly.FieldDropdown([
						['LOW', 'LOW'],
						['HIGH', 'HIGH']
					]), 'STATE').appendField(Facilino.locales.getKey('LANG_LCD_SETBACKLIGHT_CLOSE')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));
				}
				else
				{
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/light-bulb.svg', 20*options.zoom, 20*options.zoom),'LIGHT').appendField(new Blockly.FieldDropdown([
						['LOW', 'LOW'],
						['HIGH', 'HIGH']
					]), 'STATE').appendField(Facilino.locales.getKey('LANG_LCD_SETBACKLIGHT_CLOSE')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/lcd.svg', 52*options.zoom, 24*options.zoom));
				}
				// .appendField(new Blockly.FieldImage('img/blocks/bqmod03.png', 52*options.zoom, 20*options.zoom));
				this.setInputsInline(false);

				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_LCD_SETBACKLIGHT_TOOLTIP'));
			},
			onchange: function()
			  {
				  var Blocks=Blockly.getMainWorkspace().getAllBlocks();
				  var block_found = Blocks.find(function (block){return (block.type=='lcd_def' || block.type=='lcd_def1');});
				  if (block_found===undefined)
					this.setWarningText('This block instruction requires to define the LCD pin connections');
				  else
					this.setWarningText(null);
				  if (window.FacilinoAdvanced===false)
				  {
					  if (this.getFieldValue('STATE')==='LOW')
					  {
						  this.setFieldValue('img/blocks/light-bulb.svg','LIGHT');
					  }
					  else
					  {
						  this.setFieldValue('img/blocks/bright-light-bulb.svg','LIGHT');
					  }
				  }

			  }
		};
	
	};
		
		
	var FacilinoLCD = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoLCD;
	} else {
		window.FacilinoLCD = FacilinoLCD;
	}
}));
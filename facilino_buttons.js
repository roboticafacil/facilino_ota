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
		Blockly.Arduino.button = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';

			if (Facilino.isVariable(pin)) {
				code += 'pinMode(' +pin+',INPUT);\n';
			} else {
				Blockly.Arduino.setups_['setup_button_' + pin] = 'pinMode(' +pin+',INPUT);\n';
			}
			code += 'digitalRead(' +pin+')';
			// console.log('code',code);
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.button = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUTTON'),
			tags: ['input','output','button'],
			helpUrl: Facilino.getHelpUrl('button'),
			examples: ['button_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_BUTTON,
			keys: ['LANG_BQ_BUTTON_NAME','LANG_BQ_BUTTON','LANG_BQ_BUTTON_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BQ_BUTTON_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUTTON);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BQ_BUTTON')).appendField(new Blockly.FieldImage('img/blocks/pushbutton.png', 52*options.zoom, 24*options.zoom)).setCheck(['DigitalPin',Number]).appendField(Facilino.locales.getKey('LANG_BQ_BUTTON_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_BQ_BUTTON_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="PIN"><shadow type="pin_digital"></shadow></value>';
				return xml;
			}
		};

		Blockly.Arduino.button_case = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';

		if (Facilino.isVariable(pin)) {
				code += 'pinMode(' +pin+',INPUT);\n';
			} else {
				Blockly.Arduino.setups_['setup_button_' + pin] = 'pinMode(' +pin+',INPUT);\n';
			}

		var code_pressed = '';
		var code_not_pressed = '';
		code_pressed += Blockly.Arduino.statementToCode(this, 'PRESSED');
			code_not_pressed += Blockly.Arduino.statementToCode(this, 'NOT_PRESSED');

		code_pressed = code_pressed.replace(/&quot;/g, '"');
			code_not_pressed = code_not_pressed.replace(/&quot;/g, '"');

			code += 'if ('+'digitalRead(' +pin+')==LOW){\n'+code_pressed+'\n}\nelse{\n'+code_not_pressed+'\n}\n';
			// console.log('code',code);
			return code;
		};
		Blockly.Blocks.button_case = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUTTON'),
			tags: ['input','output','button'],
			helpUrl: Facilino.getHelpUrl('button_case'),
			examples: ['button_case_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_BUTTON,
			keys: ['LANG_BQ_BUTTON_CASE_NAME','LANG_BQ_BUTTON','LANG_BQ_BUTTON_PIN','LANG_BUTTON_PRESSED','LANG_BUTTON_NOT_PRESSED','LANG_BQ_BUTTON_CASE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BQ_BUTTON_CASE_NAME'),
			//bq_button initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUTTON);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BQ_BUTTON')).appendField(new Blockly.FieldImage('img/blocks/pushbutton.png', 52*options.zoom, 24*options.zoom)).setCheck(['DigitalPin',Number]).appendField(Facilino.locales.getKey('LANG_BQ_BUTTON_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.setOutput(false);
		this.appendStatementInput('PRESSED')
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField(Facilino.locales.getKey('LANG_BUTTON_PRESSED'));
				this.appendStatementInput('NOT_PRESSED')
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField(Facilino.locales.getKey('LANG_BUTTON_NOT_PRESSED'));
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_BQ_BUTTON_CASE_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="PIN"><shadow type="pin_digital"></shadow></value>';
				return xml;
			}
		};

		Blockly.Arduino.button_long_short = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';

			if (Facilino.isVariable(pin)) {
					code += 'pinMode(' +pin+',INPUT);\n';
			} else {
					Blockly.Arduino.setups_['setup_button_' + pin] = 'pinMode(' +pin+',INPUT);\n';
			}

			Blockly.Arduino.definitions_['declare_var_button_active_'+pin]='boolean _buttonActive_'+pin+'=false;\n';
			Blockly.Arduino.definitions_['declare_var_long_press_active_'+pin]='boolean _longPressActive_'+pin+'=false;\n';
			Blockly.Arduino.definitions_['declare_var_button_timer_'+pin]='long _buttonTimer_'+pin+'=0;\n';
			var code_long_pressed = '';
			var code_short_pressed = '';
			code_long_pressed += Blockly.Arduino.statementToCode(this, 'LONG_PRESSED');
			code_short_pressed += Blockly.Arduino.statementToCode(this, 'SHORT_PRESSED');

			code_long_pressed = code_long_pressed.replace(/&quot;/g, '"');
			code_short_pressed = code_short_pressed.replace(/&quot;/g, '"');

			var block =this.getParent();
			var in_interrupt_instruction=false;
			while(block!==null)
			{
				if (block.type==='attachInterrupt')
				{
					in_interrupt_instruction=true;
					break;
				}
				block=block.getParent();
			}
			if (in_interrupt_instruction===true)
			{
				if (Facilino.profiles['processor']==='ESP32')
				{
					Blockly.Arduino.definitions_['declare_var_ui_timer_'+pin]='hw_timer_t* _uiTimer_'+pin+'=NULL;\n';
					Blockly.Arduino.setups_['setup_button_timer_' + pin] = '_uiTimer_'+pin+'=timerBegin(1,80,true);\n  timerAttachInterrupt(_uiTimer_'+pin+',&_uiTimerInterrupt_'+pin+', true);\n  timerAlarmWrite(_uiTimer_'+pin+',('+this.getFieldValue('TIME')+')*1000,true);\n  timerAlarmEnable(_uiTimer_'+pin+');\n  timerStop(_uiTimer_'+pin+');\n';
					Blockly.Arduino.definitions_['define_isr_timer_'+pin]='void IRAM_ATTR _uiTimerInterrupt_'+pin+'(){\n  if (_buttonActive_'+pin+'==true){\n  _longPressActive_'+pin+'=true;\n'+code_long_pressed+' }\n timerStop(_uiTimer_'+pin+');\n }\n';
					code+='if (digitalRead('+pin+')==LOW) {\n	if (_buttonActive_'+pin+'==false) {\n	  _buttonActive_'+pin+'=true;\n	  timerStart(_uiTimer_'+pin+');\n	  _buttonTimer_'+pin+'=millis();\n	}\n	}\n	else {\n	if (_buttonActive_'+pin+'== true){\n	  if (_longPressActive_'+pin+'==true){\n	  _longPressActive_'+pin+'=false;\n	}\n	 else  if ((millis()-_buttonTimer_'+pin+')>100){\n'+code_short_pressed+'\n	}\n	}\n	_buttonActive_'+pin+'=false;\n	}\n';
				}
				else
				{
					code+='if (digitalRead('+pin+')==LOW) {\n	if (_buttonActive_'+pin+'==false) {\n	  _buttonActive_'+pin+'=true;\n	  _buttonTimer_'+pin+'=millis();\n	}\n	else {\n	if (_buttonActive_'+pin+'== true){\n	  if ((millis()-_buttonTimer_'+pin+')>'+this.getFieldValue('TIME')+'){\n'+code_long_pressed+'\n	}\n	  else  if ((millis()-_buttonTimer_'+pin+')>100){\n'+code_short_pressed+'\n	}\n	_buttonActive_'+pin+'=false;\n	}\n  }\n';
				}
			}
			else
			{
				code+='if (digitalRead('+pin+')==LOW) {\n	if (_buttonActive_'+pin+'==false) {\n	  _buttonActive_'+pin+'=true;\n	  _buttonTimer_'+pin+'=millis();\n	}\n	if (((millis()-_buttonTimer_'+pin+'>'+this.getFieldValue('TIME')+'))&&(_longPressActive_'+pin+'==false)){\n	  _longPressActive_'+pin+'=true;\n'+code_long_pressed+'\n}\n  }\n else {\n	if (_buttonActive_'+pin+'== true){\n	  if (_longPressActive_'+pin+'==true){\n		_longPressActive_'+pin+'=false;\n	  }\n else  if ((millis()-_buttonTimer_'+pin+')>100){\n'+code_short_pressed+'\n}\n	  _buttonActive_'+pin+'=false;\n	}\n  }\n';
			}





			return code;
		};
		Blockly.Blocks.button_long_short = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUTTON'),
			tags: ['input','output','button'],
			helpUrl: Facilino.getHelpUrl('button_long_short'),
			examples: ['button_case_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_BUTTON,
			keys: ['LANG_BQ_BUTTON_LONG_SHORT_NAME','LANG_BQ_BUTTON','LANG_BQ_BUTTON_PIN','LANG_BUTTON_LONG_PRESSED','LANG_BUTTON_SHORT_PRESSED','LANG_BQ_BUTTON_LONG_SHORT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_BQ_BUTTON_LONG_SHORT_NAME'),
			//bq_button initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUTTON);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_BQ_BUTTON')).appendField(new Blockly.FieldImage('img/blocks/pushbutton.png', 52*options.zoom, 24*options.zoom)).setCheck(['DigitalPin',Number]).appendField(Facilino.locales.getKey('LANG_BQ_BUTTON_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BQ_BUTTON_TIME')).appendField(new Blockly.FieldNumber('1000','200','5000'),'TIME').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(false);
		this.appendStatementInput('LONG_PRESSED')
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField(Facilino.locales.getKey('LANG_BUTTON_LONG_PRESSED'));
				this.appendStatementInput('SHORT_PRESSED')
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField(Facilino.locales.getKey('LANG_BUTTON_SHORT_PRESSED'));
				this.setPreviousStatement(true,'code');
				this.setInputsInline(false);
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_BQ_BUTTON_LONG_SHORT_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="PIN"><shadow type="pin_digital"></shadow></value>';
				return xml;
			}
		};


		Blockly.Arduino.zum_button = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
			var code = '';


			pullup='INPUT_PULLUP';


			if (Facilino.isVariable(pin)) {
				code += 'pinMode(' +pin+',INPUT_PULLUP);\n';
			} else {
				Blockly.Arduino.setups_['setup_button_' + pin] = 'pinMode(' +pin+',INPUT_PULLUP);\n';
			}
			code += 'digitalRead(' +pin+')'
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.zum_button = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUTTON'),
			tags: ['input','output','button'],
			helpUrl: Facilino.getHelpUrl('zum_button'),
			examples: ['zum_button_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_BUTTON,
			keys: ['LANG_ZUM_BUTTON','LANG_ZUM_BUTTON_PIN','LANG_ZUM_BUTTON_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_ZUM_BUTTON_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUTTON);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_ZUM_BUTTON')).appendField(Facilino.locales.getKey('LANG_ZUM_BUTTON_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setCheck(['DigitalPin',Number]);
		this.appendDummyInput().appendField('pull-up?').appendField(new Blockly.FieldCheckbox('FALSE'), 'PULLUP').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_ZUM_BUTTON_TOOLTIP'));
				this.setInputsInline(false);
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="PIN"><shadow type="pin_digital"></shadow></value>';
				return xml;
			}
		};
		
		Blockly.Arduino.two_buttons_ui = function() {
			var select_pin = Blockly.Arduino.valueToCode(this, 'PIN_SELECT', Blockly.Arduino.ORDER_NONE);
			var cancel_pin = Blockly.Arduino.valueToCode(this, 'PIN_CANCEL', Blockly.Arduino.ORDER_NONE);
			var code = '';

			Blockly.Arduino.setups_['inout_digital_input' + select_pin] = JST['inout_digital_input']({'pin': select_pin});
			Blockly.Arduino.setups_['inout_digital_input' + cancel_pin] = JST['inout_digital_input']({'pin': cancel_pin});

			Blockly.Arduino.definitions_['declare_var_button_active_'+select_pin]='boolean _buttonActive_'+select_pin+'=false;\n';
			Blockly.Arduino.definitions_['declare_var_long_press_active_'+select_pin]='boolean _longPressActive_'+select_pin+'=false;\n';
			Blockly.Arduino.definitions_['declare_var_button_timer_'+select_pin]='long _buttonTimer_'+select_pin+'=0;\n';

			Blockly.Arduino.definitions_['declare_var_button_active_'+cancel_pin]='boolean _buttonActive_'+cancel_pin+'=false;\n';
			Blockly.Arduino.definitions_['declare_var_button_timer_'+cancel_pin]='long _buttonTimer_'+cancel_pin+'=0;\n';

			Blockly.Arduino.definitions_['declare_var_button_updateUI_'+select_pin+'_'+cancel_pin]='boolean _updateUI_'+select_pin+'_'+cancel_pin+'=true;\n';
			Blockly.Arduino.definitions_['declare_var_button_acceptUI_'+select_pin+'_'+cancel_pin]='boolean _acceptUI_'+select_pin+'_'+cancel_pin+'=false;\n';
			Blockly.Arduino.definitions_['declare_var_button_menu_level_'+select_pin+'_'+cancel_pin]='int _menu_level_'+select_pin+'_'+cancel_pin+'=0;\n';
			Blockly.Arduino.definitions_['declare_var_button_menu_'+select_pin+'_'+cancel_pin]='int _menu_'+select_pin+'_'+cancel_pin+'=-1;\n';
			Blockly.Arduino.definitions_['declare_var_button_option_'+select_pin+'_'+cancel_pin]='int _option_'+select_pin+'_'+cancel_pin+'=-1;\n';
			Blockly.Arduino.definitions_['declare_var_button_max_menus_'+select_pin+'_'+cancel_pin]='int _max_menus_'+select_pin+'_'+cancel_pin+'='+this.menuCount_+';\n';
			Blockly.Arduino.definitions_['declare_var_current_time_'+select_pin+'_'+cancel_pin]='long _currentTime_'+select_pin+'_'+cancel_pin+'=0;\n';
						Blockly.Arduino.definitions_['declare_var_refresh_time_'+select_pin+'_'+cancel_pin]='int _refreshTime_'+select_pin+'_'+cancel_pin+'='+this.getFieldValue('TIME')+';\n';
			//Compute max options array
			var opt_array='';
			var i=0;
			for (i=0;i<this.menuCount_;i++)
			{
				var option=this.getInputTargetBlock('MENU'+i);
				if (option)
					opt_array+=option.optionCount_+',';
				else
					opt_array+=',';
			}
			opt_array=opt_array.substr(0,opt_array.length-1);
			Blockly.Arduino.definitions_['declare_var_button_max_options_'+select_pin+'_'+cancel_pin]='int _max_options_'+select_pin+'_'+cancel_pin+'['+this.menuCount_+']={'+opt_array+'};\n';

			code+='_currentTime_'+select_pin+'_'+cancel_pin+'=millis();\n';
			code+='if (digitalRead('+select_pin+')==LOW) {\n	  if (_buttonActive_'+select_pin+'==false) {\n		_buttonActive_'+select_pin+'=true;\n		_buttonTimer_'+select_pin+'=_currentTime_'+select_pin+'_'+cancel_pin+';\n	  }\n	  if (((_currentTime_'+select_pin+'_'+cancel_pin+'-_buttonTimer_'+select_pin+')>1000)&&(_longPressActive_'+select_pin+'==false)){\n		_longPressActive_'+select_pin+'=true;\n		if (_menu_level_'+select_pin+'_'+cancel_pin+'==1)\n		{\n		  _menu_level_'+select_pin+'_'+cancel_pin+'=2;\n		  _option_'+select_pin+'_'+cancel_pin+'=0;\n		  _updateUI_'+select_pin+'_'+cancel_pin+'=true;\n		}\n		else if (_menu_level_'+select_pin+'_'+cancel_pin+'==2)\n		{\n		  _updateUI_'+select_pin+'_'+cancel_pin+'=true;\n		  _acceptUI_'+select_pin+'_'+cancel_pin+'=true;\n		}\n	  }\n   }\n   else {\n	  if (_buttonActive_'+select_pin+'== true){\n		if (_longPressActive_'+select_pin+'==true){\n		  _longPressActive_'+select_pin+'=false;\n		}\n		else  if ((_currentTime_'+select_pin+'_'+cancel_pin+'-_buttonTimer_'+select_pin+')>100){\n		  if (_menu_level_'+select_pin+'_'+cancel_pin+'==0)\n		  {\n			_menu_'+select_pin+'_'+cancel_pin+'=0;\n			_option_'+select_pin+'_'+cancel_pin+'=-1;\n			_menu_level_'+select_pin+'_'+cancel_pin+'++;\n			_updateUI_'+select_pin+'_'+cancel_pin+'=true;\n		  }\n		  else if (_menu_level_'+select_pin+'_'+cancel_pin+'==1)\n		  {\n			_menu_'+select_pin+'_'+cancel_pin+'++;\n			if (_menu_'+select_pin+'_'+cancel_pin+'==_max_menus_'+select_pin+'_'+cancel_pin+')\n			  _menu_'+select_pin+'_'+cancel_pin+'=0;\n			_updateUI_'+select_pin+'_'+cancel_pin+'=true;\n		  }\n		  else if (_menu_level_'+select_pin+'_'+cancel_pin+'==2)\n		  {\n			_option_'+select_pin+'_'+cancel_pin+'++;\n			if (_option_'+select_pin+'_'+cancel_pin+'==_max_options_'+select_pin+'_'+cancel_pin+'[_menu_'+select_pin+'_'+cancel_pin+'])\n			  _option_'+select_pin+'_'+cancel_pin+'=0;\n			_updateUI_'+select_pin+'_'+cancel_pin+'=true;\n		  }\n		}\n		_buttonActive_'+select_pin+'=false;\n	  }\n   }\n';
			code+='   if (digitalRead('+cancel_pin+')==LOW) {\n	  if (_buttonActive_'+cancel_pin+'==false) {\n		_buttonActive_'+cancel_pin+'=true;\n		_buttonTimer_'+cancel_pin+'=_currentTime_'+select_pin+'_'+cancel_pin+';\n	  }\n   }\n   else {\n	  \n	if ((_menu_level_'+select_pin+'_'+cancel_pin+'==0)&&(_refreshTime_'+select_pin+'_'+cancel_pin+'>0)&&((_currentTime_'+select_pin+'_'+cancel_pin+'-_buttonTimer_'+cancel_pin+')>_refreshTime_'+select_pin+'_'+cancel_pin+'))\n	  {\n		_updateUI_'+select_pin+'_'+cancel_pin+'=true;\n		_buttonTimer_'+cancel_pin+'=_currentTime_'+select_pin+'_'+cancel_pin+';\n	  }\n	  if (_buttonActive_'+cancel_pin+'== true){\n		if ((_currentTime_'+select_pin+'_'+cancel_pin+'-_buttonTimer_'+cancel_pin+')>100){\n		  if (_menu_level_'+select_pin+'_'+cancel_pin+'==1)\n		  {\n			_menu_level_'+select_pin+'_'+cancel_pin+'=0;\n			_menu_'+select_pin+'_'+cancel_pin+'=-1;\n			_option_'+select_pin+'_'+cancel_pin+'=-1;\n			_updateUI_'+select_pin+'_'+cancel_pin+'=true;\n		  }\n		  else if (_menu_level_'+select_pin+'_'+cancel_pin+'==2)\n		  {\n			_menu_level_'+select_pin+'_'+cancel_pin+'=1;\n			_option_'+select_pin+'_'+cancel_pin+'=-1;\n			_updateUI_'+select_pin+'_'+cancel_pin+'=true;\n		  }\n		  else\n		  {\n			_menu_'+select_pin+'_'+cancel_pin+'=-1;\n			_option_'+select_pin+'_'+cancel_pin+'=-1;\n			_updateUI_'+select_pin+'_'+cancel_pin+'=true;\n		  }\n		}\n		_buttonActive_'+cancel_pin+'=false;\n	  }\n	}\n';
			code+='if (_updateUI_'+select_pin+'_'+cancel_pin+'==true)\n			{\n			  _updateUI_'+select_pin+'_'+cancel_pin+'=false;\n			  if ((_menu_'+select_pin+'_'+cancel_pin+'==-1)&&(_option_'+select_pin+'_'+cancel_pin+'==-1))\n			  {'+Blockly.Arduino.statementToCode(this, 'GENERAL')+'\n			  }\n';
			var i=0;
			for (i=0;i<this.menuCount_;i++)
			{
				code+='		else if ((_menu_'+select_pin+'_'+cancel_pin+'=='+i+')&&(_option_'+select_pin+'_'+cancel_pin+'==-1))\n		{\n		'+Blockly.Arduino.statementToCode(this,'MENU_HIGHLIGHTED'+i)+'\n		}\n';
				var optionInput = this.getInputTargetBlock('MENU'+i);
				if (optionInput)
				{
					var j=0;
					for (j=0;j<optionInput.optionCount_;j++)
					{
						code+='		else if ((_menu_'+select_pin+'_'+cancel_pin+'=='+i+')&&(_option_'+select_pin+'_'+cancel_pin+'=='+j+'))\n		{\n		  if (_acceptUI_'+select_pin+'_'+cancel_pin+'==true)\n		  {\n		  '+Blockly.Arduino.statementToCode(optionInput,'OPTION_SELECTED'+j)+'\n		  }\n		  else\n		  {\n		  '+Blockly.Arduino.statementToCode(optionInput,'OPTION_HIGHLIGHTED'+j)+'\n		  }\n		}\n';
					}
				}
			}
			code+='		_acceptUI_'+select_pin+'_'+cancel_pin+'=false;\n			}\n';

			return code;
		};
		Blockly.Blocks.two_buttons_ui = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUTTON'),
			tags: ['input','output','button'],
			helpUrl: Facilino.getHelpUrl('two_buttons_ui'),
			examples: ['button_case_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_TWO_BUTTONS_UI','LANG_TWO_BUTTONS_UI_SELECT','LANG_TWO_BUTTONS_UI_CANCEL','LANG_BQ_BUTTON_TIME','LANG_TWO_BUTTONS_UI_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_NAME'),
			//bq_button initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
				this.appendValueInput('PIN_SELECT').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI')).appendField(new Blockly.FieldImage('img/blocks/list.svg', 24*options.zoom, 24*options.zoom)).setCheck(['DigitalPin',Number]).appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_SELECT')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.appendValueInput('PIN_CANCEL').setCheck(['DigitalPin',Number]).appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_CANCEL')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_TIME')).appendField(new Blockly.FieldNumber('5000','0'),'TIME').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('GENERAL').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_GENERAL'));
				this.appendStatementInput('MENU_HIGHLIGHTED0').setCheck('code').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_MENU')+'0 '+Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_HIGHLIGHTED')).appendField(new Blockly.FieldImage('img/blocks/list_selected.svg', 24*options.zoom, 24*options.zoom));
				this.appendValueInput('MENU0').setCheck('menu_options').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTIONS')).appendField(new Blockly.FieldImage('img/blocks/option_list.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(false);
				this.setMutator(new Blockly.Mutator(['two_buttons_ui_item']));
				this.setPreviousStatement(true,'code');
				this.setInputsInline(false);
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_TOOLTIP'));
				this.menuCount_ = 1;
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="PIN_SELECT"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="PIN_CANCEL"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="PIN_CANCEL"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				xml+='<value name="MENU0"><shadow type="two_buttons_ui_option"></shadow></value>';
				return xml;
			},
			isNotDuplicable: true,
			mutationToDom: function() {
				if (!this.menuCount_) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.menuCount_) {
					container.setAttribute('item', this.menuCount_);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.menuCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
				for (var x = 1; x < this.menuCount_; x++) {
					this.appendStatementInput('MENU_HIGHLIGHTED'+x).setCheck('code').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_MENU')+x+' '+Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_HIGHLIGHTED')).appendField(new Blockly.FieldImage('img/blocks/list_selected.svg', 24*options.zoom, 24*options.zoom));
					this.appendValueInput('MENU' + x).setCheck('menu_options').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTIONS')).appendField(new Blockly.FieldImage('img/blocks/option_list.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					//this.appendStatementInput('DO' + x).appendField(Facilino.locales.getKey('LANG_CONTROLS_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('two_buttons_ui_stack');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 1; x < this.menuCount_; x++) {
					var taskBlock = workspace.newBlock('two_buttons_ui_item');
					taskBlock.initSvg();
					connection.connect(taskBlock.previousConnection);
					connection = taskBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the task input blocks and remove the inputs.
				for (var x = this.menuCount_-1; x >= 1; x--) {
					this.removeInput('MENU_HIGHLIGHTED'+x);
					this.removeInput('MENU' + x);
					//this.removeInput('DO' + x);
				}
				this.menuCount_ = 1;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'two_buttons_ui_item':
							var menuStack = this.appendStatementInput('MENU_HIGHLIGHTED'+this.menuCount_).setCheck('code').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_MENU')+this.menuCount_+' '+Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_HIGHLIGHTED')).appendField(new Blockly.FieldImage('img/blocks/list_selected.svg', 24*options.zoom, 24*options.zoom));
							var menuInput = this.appendValueInput('MENU'+this.menuCount_).setCheck('menu_options').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTIONS')).appendField(new Blockly.FieldImage('img/blocks/option_list.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
							this.menuCount_++;
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								menuInput.connection.connect(clauseBlock.valueConnection_);
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
				var x = 1;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'two_buttons_ui_item':
							var inputMenu = this.getInput('MENU' + x);
							clauseBlock.valueConnection_ = inputMenu && inputMenu.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			}
		};

		Blockly.Blocks.two_buttons_ui_stack = {
			colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_TWO_BUTTONS_UI','LANG_TWO_BUTTONS_UI_TOOLTIP'],
			// Task.
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI'))
					.setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('menu');
				this.setTooltip(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.two_buttons_ui_item = {
				colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
				// Task item.
				keys: ['LANG_TWO_BUTTONS_UI_MENU','LANG_TWO_BUTTONS_UI_MENU_TOOLTIP'],
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
					this.appendDummyInput()
						.appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_MENU'))
						.setAlign(Blockly.ALIGN_RIGHT);
					this.setPreviousStatement(true,'menu');
					this.setNextStatement(true,'menu');
					this.setTooltip(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_MENU_TOOLTIP'));
					this.contextMenu = false;
				}
		};

		Blockly.Arduino.two_buttons_ui_option = function() {
			var code = '';
			return code;
		};
		Blockly.Blocks.two_buttons_ui_option = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUTTON'),
			tags: ['input','output','button'],
			helpUrl: Facilino.getHelpUrl('two_buttons_ui_option'),
			examples: ['button_case_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_TWO_BUTTONS_UI_OPTION_NAME','LANG_TWO_BUTTONS_UI_OPTION_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTION_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
				this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/option_list.svg', 24*options.zoom, 24*options.zoom)).appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTIONS')).setAlign(Blockly.ALIGN_RIGHT);
				this.setMutator(new Blockly.Mutator(['two_buttons_ui_option_item']));
				this.appendStatementInput('OPTION_HIGHLIGHTED0').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTION')+'0 '+Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_HIGHLIGHTED')).appendField(new Blockly.FieldImage('img/blocks/option_list_highlighted.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				this.appendStatementInput('OPTION_SELECTED0').setCheck('code').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTION')+'0 '+Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_SELECTED')).appendField(new Blockly.FieldImage('img/blocks/option_list_selected.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(false,null);
				this.setInputsInline(false);
				this.setNextStatement(false,null);
				this.setTooltip(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTION_TOOLTIP'));
				this.setOutput(true,'menu_options');
				this.optionCount_ = 1;
			},
			mutationToDom: function() {
				if (!this.optionCount_) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.optionCount_) {
					container.setAttribute('item', this.optionCount_);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.optionCount_ = window.parseInt(xmlElement.getAttribute('item'), 10);
				for (var x = 1; x < this.optionCount_; x++) {
					this.appendStatementInput('OPTION_HIGHLIGHTED' + x).appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTION')+x+' '+Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_HIGHLIGHTED')).appendField(new Blockly.FieldImage('img/blocks/option_list_highlighted.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
					this.appendStatementInput('OPTION_SELECTED'+x).setCheck('code').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTION')+x+' '+Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_SELECTED')).appendField(new Blockly.FieldImage('img/blocks/option_list_selected.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('two_buttons_ui_option_stack');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 1; x < this.optionCount_; x++) {
					var taskBlock = workspace.newBlock('two_buttons_ui_option_item');
					taskBlock.initSvg();
					connection.connect(taskBlock.previousConnection);
					connection = taskBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the task input blocks and remove the inputs.
				for (var x = this.optionCount_-1; x >= 1; x--) {
					this.removeInput('OPTION_HIGHLIGHTED' + x);
					this.removeInput('OPTION_SELECTED'+x);
				}
				this.optionCount_ = 1;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'two_buttons_ui_option_item':
							var option = this.appendStatementInput('OPTION_HIGHLIGHTED'+this.optionCount_).setCheck('code').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTION')+this.optionCount_+' '+Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_HIGHLIGHTED')).appendField(new Blockly.FieldImage('img/blocks/option_list_highlighted.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
							var optionSelected = this.appendStatementInput('OPTION_SELECTED'+this.optionCount_).setCheck('code').appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTION')+this.optionCount_+' '+Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_SELECTED')).appendField(new Blockly.FieldImage('img/blocks/option_list_selected.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
							this.optionCount_++;
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								optionSelected.connection.connect(clauseBlock.valueConnection_);
								option.connection.connect(clauseBlock.valueConnection_);
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
						case 'two_buttons_ui_option_item':
							var inputOption = this.getInput('OPTION' + x);
							clauseBlock.valueConnection_ = inputOption && inputOption.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			}
		};

		Blockly.Blocks.two_buttons_ui_option_stack = {
			colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
			keys: ['LANG_TWO_BUTTONS_UI_MENU','LANG_TWO_BUTTONS_UI_OPTION_TOOLTIP'],
			// Task.
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
				this.appendDummyInput()
					.appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_MENU'))
					.setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('option');
				this.setTooltip(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTION_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.two_buttons_ui_option_item = {
				colour: Facilino.LANG_COLOUR_ADVANCED_DIGITAL,
				// Task item.
				keys: ['LANG_TWO_BUTTONS_UI_OPTION','LANG_TWO_BUTTONS_UI_OPTION_TOOLTIP'],
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_ADVANCED_DIGITAL);
					this.appendDummyInput()
						.appendField(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTION'))
						.setAlign(Blockly.ALIGN_RIGHT);
					this.setPreviousStatement(true,'option');
					this.setNextStatement(true,'option');
					this.setTooltip(Facilino.locales.getKey('LANG_TWO_BUTTONS_UI_OPTION_TOOLTIP'));
					this.contextMenu = false;
				}
		};
		
		}
	
	};
		
		
	var FacilinoButtons = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoButtons;
	} else {
		window.FacilinoButtons = FacilinoButtons;
	}
}));
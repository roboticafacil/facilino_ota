(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
	Blockly.Arduino.dyor_generic_expression1 = function() {
		var din_pin = Blockly.Arduino.valueToCode(this, 'DIN_PIN', Blockly.Arduino.ORDER_NONE)|| '0';
		var cs_pin = Blockly.Arduino.valueToCode(this, 'CS_PIN', Blockly.Arduino.ORDER_NONE) ||'0';
		var clk_pin = Blockly.Arduino.valueToCode(this, 'CLK_PIN', Blockly.Arduino.ORDER_NONE)|| '0';
		var expr_str = Blockly.Arduino.valueToCode(this, 'EXPRESSION', Blockly.Arduino.ORDER_NONE);
		var dropdown_configuration = this.getFieldValue('CONFIGURATION') || '';
		var code = '';
		if ((this.getInputTargetBlock('CS_PIN')!==null)&&(this.getInputTargetBlock('DIN_PIN')!==null)&&(this.getInputTargetBlock('CLK_PIN')!==null))
		{
			
			Blockly.Arduino.definitions_['define_LEDMatrix_init'] = JST['LEDMatrix_init_definitions']({});
			Blockly.Arduino.definitions_['define_writeRow'] = JST['writeRow_definitions']({});
			Blockly.Arduino.definitions_['define_maxAll'] = JST['maxAll_definitions']({});
			Blockly.Arduino.definitions_['define_putByte'] = JST['putByte_definitions']({});
			Blockly.Arduino.definitions_['define_expression'] = JST['expression_definitions']({});
			if ((this.getInputTargetBlock('CS_PIN').type==='pin_digital')&&(this.getInputTargetBlock('DIN_PIN').type==='pin_digital')&&(this.getInputTargetBlock('CLK_PIN').type==='pin_digital'))
			{
				Blockly.Arduino.setups_['inout_digital_output' + cs_pin ] = JST['inout_digital_output']({'pin': cs_pin});
				Blockly.Arduino.setups_['inout_digital_output' + din_pin] = JST['inout_digital_output']({'pin': din_pin});
				Blockly.Arduino.setups_['inout_digital_output' + clk_pin] = JST['inout_digital_output']({'pin': clk_pin});
				Blockly.Arduino.setups_['setup_LEDMatrix_' + cs_pin + din_pin + clk_pin] = JST['led_matrix_maxAll']({'cs_pin' : cs_pin,'din_pin' : din_pin,'clk_pin': clk_pin});
			}
		}
		var expr ='0';
		var row = expr_str.split(',');
		var col = [];
		if (dropdown_configuration==='V1')
		{
			expr = row[7] + ',' + row[6] + ','+ row[5] + ','+ row[4] + ','+ row[3] + ','+ row[2] + ','+ row[1] + ','+ row[0];
		}
		else if (dropdown_configuration==='H' || dropdown_configuration==='TRUE')
		{
			col[0] = ((row[0]%2)<1? 0 : 128) + ((row[1]%2)<1? 0 : 64) + ((row[2]%2)<1? 0 : 32) + ((row[3]%2)<1? 0 : 16) + ((row[4]%2)<1? 0 : 8) + ((row[5]%2)<1? 0 : 4) + ((row[6]%2)<1? 0 : 2) + ((row[7]%2)<1? 0 : 1);
			col[1] = ((row[0]%4)<2? 0 : 128) + ((row[1]%4)<2? 0 : 64) + ((row[2]%4)<2? 0 : 32) + ((row[3]%4)<2? 0 : 16) + ((row[4]%4)<2? 0 : 8) + ((row[5]%4)<2? 0 : 4) + ((row[6]%4)<2? 0 : 2) + ((row[7]%4)<2? 0 : 1);
			col[2] = ((row[0]%8)<4? 0 : 128) + ((row[1]%8)<4? 0 : 64) + ((row[2]%8)<4? 0 : 32) + ((row[3]%8)<4? 0 : 16) + ((row[4]%8)<4? 0 : 8) + ((row[5]%8)<4? 0 : 4) + ((row[6]%8)<4? 0 : 2) + ((row[7]%8)<4? 0 : 1);
			col[3] = ((row[0]%16)<8? 0 : 128) + ((row[1]%16)<8? 0 : 64) + ((row[2]%16)<8? 0 : 32) + ((row[3]%16)<8? 0 : 16) + ((row[4]%16)<8? 0 : 8) + ((row[5]%16)<8? 0 : 4) + ((row[6]%16)<8? 0 : 2) + ((row[7]%16)<8? 0 : 1);
			col[4] = ((row[0]%32)<16? 0 : 128) + ((row[1]%32)<16? 0 : 64) + ((row[2]%32)<16? 0 : 32) + ((row[3]%32)<16? 0 : 16) + ((row[4]%32)<16? 0 : 8) + ((row[5]%32)<16? 0 : 4) + ((row[6]%32)<16? 0 : 2) + ((row[7]%32)<16? 0 : 1);
			col[5] = ((row[0]%64)<32? 0 : 128) + ((row[1]%64)<32? 0 : 64) + ((row[2]%64)<32? 0 : 32) + ((row[3]%64)<32? 0 : 16) + ((row[4]%64)<32? 0 : 8) + ((row[5]%64)<32? 0 : 4) + ((row[6]%64)<32? 0 : 2) + ((row[7]%64)<32? 0 : 1);
			col[6] = ((row[0]%128)<64? 0 : 128) + ((row[1]%128)<64? 0 : 64) + ((row[2]%128)<64? 0 : 32) + ((row[3]%128)<64? 0 : 16) + ((row[4]%128)<64? 0 : 8) + ((row[5]%128)<64? 0 : 4) + ((row[6]%128)<64? 0 : 2) + ((row[7]%128)<64? 0 : 1);
			col[7] = (row[0]<128? 0 : 128) + (row[1]<128? 0 : 64) + (row[2]<128? 0 : 32) + (row[3]<128? 0 : 16) + (row[4]<128? 0 : 8) + (row[5]<128? 0 : 4) + (row[6]<128? 0 : 2) + (row[7]<128? 0 : 1);
			expr = col[7] + ',' + col[6] + ','+ col[5] + ','+ col[4] + ','+ col[3] + ','+ col[2] + ','+ col[1] + ','+ col[0];
		}
		else if (dropdown_configuration==='V' || dropdown_configuration==='FALSE') {
			row[0] = ((row[0]%2)<1? 0 : 128) + ((row[0]%4)<2? 0 : 64) + ((row[0]%8)<4? 0 : 32) + ((row[0]%16)<8? 0 : 16) + ((row[0]%32)<16? 0 : 8) + ((row[0]%64)<32? 0 : 4) + ((row[0]%128)<64? 0 : 2) + (row[0]<128? 0 : 1);
			row[1] = ((row[1]%2)<1? 0 : 128) + ((row[1]%4)<2? 0 : 64) + ((row[1]%8)<4? 0 : 32) + ((row[1]%16)<8? 0 : 16) + ((row[1]%32)<16? 0 : 8) + ((row[1]%64)<32? 0 : 4) + ((row[1]%128)<64? 0 : 2) + (row[1]<128? 0 : 1);
			row[2] = ((row[2]%2)<1? 0 : 128) + ((row[2]%4)<2? 0 : 64) + ((row[2]%8)<4? 0 : 32) + ((row[2]%16)<8? 0 : 16) + ((row[2]%32)<16? 0 : 8) + ((row[2]%64)<32? 0 : 4) + ((row[2]%128)<64? 0 : 2) + (row[2]<128? 0 : 1);
			row[3] = ((row[3]%2)<1? 0 : 128) + ((row[3]%4)<2? 0 : 64) + ((row[3]%8)<4? 0 : 32) + ((row[3]%16)<8? 0 : 16) + ((row[3]%32)<16? 0 : 8) + ((row[3]%64)<32? 0 : 4) + ((row[3]%128)<64? 0 : 2) + (row[3]<128? 0 : 1);
			row[4] = ((row[4]%2)<1? 0 : 128) + ((row[4]%4)<2? 0 : 64) + ((row[4]%8)<4? 0 : 32) + ((row[4]%16)<8? 0 : 16) + ((row[4]%32)<16? 0 : 8) + ((row[4]%64)<32? 0 : 4) + ((row[4]%128)<64? 0 : 2) + (row[4]<128? 0 : 1);
			row[5] = ((row[5]%2)<1? 0 : 128) + ((row[5]%4)<2? 0 : 64) + ((row[5]%8)<4? 0 : 32) + ((row[5]%16)<8? 0 : 16) + ((row[5]%32)<16? 0 : 8) + ((row[5]%64)<32? 0 : 4) + ((row[5]%128)<64? 0 : 2) + (row[5]<128? 0 : 1);
			row[6] = ((row[6]%2)<1? 0 : 128) + ((row[6]%4)<2? 0 : 64) + ((row[6]%8)<4? 0 : 32) + ((row[6]%16)<8? 0 : 16) + ((row[6]%32)<16? 0 : 8) + ((row[6]%64)<32? 0 : 4) + ((row[6]%128)<64? 0 : 2) + (row[6]<128? 0 : 1);
			row[7] = ((row[7]%2)<1? 0 : 128) + ((row[7]%4)<2? 0 : 64) + ((row[7]%8)<4? 0 : 32) + ((row[7]%16)<8? 0 : 16) + ((row[7]%32)<16? 0 : 8) + ((row[7]%64)<32? 0 : 4) + ((row[7]%128)<64? 0 : 2) + (row[7]<128? 0 : 1);
			expr = row[0] + ',' + row[1] + ','+ row[2] + ','+ row[3] + ','+ row[4] + ','+ row[5] + ','+ row[6] + ','+ row[7];
		}
		else if (dropdown_configuration==='H1')
		{
			col[0] = ((row[0]%2)<1? 0 : 1) + ((row[1]%2)<1? 0 : 2) + ((row[2]%2)<1? 0 : 4) + ((row[3]%2)<1? 0 : 8) + ((row[4]%2)<1? 0 : 16) + ((row[5]%2)<1? 0 : 32) + ((row[6]%2)<1? 0 : 64) + ((row[7]%2)<1? 0 : 128);
			col[1] = ((row[0]%4)<2? 0 : 1) + ((row[1]%4)<2? 0 : 2) + ((row[2]%4)<2? 0 : 4) + ((row[3]%4)<2? 0 : 8) + ((row[4]%4)<2? 0 : 16) + ((row[5]%4)<2? 0 : 32) + ((row[6]%4)<2? 0 : 64) + ((row[7]%4)<2? 0 : 128);
			col[2] = ((row[0]%8)<4? 0 : 1) + ((row[1]%8)<4? 0 : 2) + ((row[2]%8)<4? 0 : 4) + ((row[3]%8)<4? 0 : 8) + ((row[4]%8)<4? 0 : 16) + ((row[5]%8)<4? 0 : 32) + ((row[6]%8)<4? 0 : 64) + ((row[7]%8)<4? 0 : 128);
			col[3] = ((row[0]%16)<8? 0 : 1) + ((row[1]%16)<8? 0 : 2) + ((row[2]%16)<8? 0 : 4) + ((row[3]%16)<8? 0 : 8) + ((row[4]%16)<8? 0 : 16) + ((row[5]%16)<8? 0 : 32) + ((row[6]%16)<8? 0 : 64) + ((row[7]%16)<8? 0 : 128);
			col[4] = ((row[0]%32)<16? 0 : 1) + ((row[1]%32)<16? 0 : 2) + ((row[2]%32)<16? 0 : 4) + ((row[3]%32)<16? 0 : 8) + ((row[4]%32)<16? 0 : 16) + ((row[5]%32)<16? 0 : 32) + ((row[6]%32)<16? 0 : 64) + ((row[7]%32)<16? 0 : 128);
			col[5] = ((row[0]%64)<32? 0 : 1) + ((row[1]%64)<32? 0 : 2) + ((row[2]%64)<32? 0 : 4) + ((row[3]%64)<32? 0 : 8) + ((row[4]%64)<32? 0 : 16) + ((row[5]%64)<32? 0 : 32) + ((row[6]%64)<32? 0 : 64) + ((row[7]%64)<32? 0 : 128);
			col[6] = ((row[0]%128)<64? 0 : 1) + ((row[1]%128)<64? 0 : 2) + ((row[2]%128)<64? 0 : 4) + ((row[3]%128)<64? 0 : 8) + ((row[4]%128)<64? 0 : 16) + ((row[5]%128)<64? 0 : 32) + ((row[6]%128)<64? 0 : 64) + ((row[7]%128)<64? 0 : 128);
			col[7] = (row[0]<128? 0 : 1) + (row[1]<128? 0 : 2) + (row[2]<128? 0 : 4) + (row[3]<128? 0 : 8) + (row[4]<128? 0 : 16) + (row[5]<128? 0 : 32) + (row[6]<128? 0 : 64) + (row[7]<128? 0 : 128);
			expr = col[0] + ',' + col[1] + ','+ col[2] + ','+ col[3] + ','+ col[4] + ','+ col[5] + ','+ col[6] + ','+ col[7];
		}

		code += 'expression('+cs_pin+','+din_pin+','+clk_pin+','+expr + ');\n';
		return code;
		};


	Blockly.Blocks.dyor_generic_expression1 = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MAX7219'),
			tags: ['led_matrix','screen'],
			helpUrl: Facilino.getHelpUrl('dyor_generic_expression1'),
			examples: ['dyor_generic_expression_example.bly','dyor_generic_expression_icons_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LEDMATRIX,
			keys: ['LANG_LED_MATRIX_NAME','LANG_LED_MATRIX','LANG_LED_MATRIX_CS_PIN','LANG_LED_MATRIX_DIN_PIN','LANG_LED_MATRIX_CLK_PIN','LANG_LED_MATRIX_VERTICAL','LANG_LED_MATRIX_HORIZONTAL','LANG_LED_MATRIX_VERTICAL_180','LANG_LED_MATRIX_HORIZONTAL_180','LANG_LED_MATRIX_GENERIC_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LED_MATRIX_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDMATRIX);
				if (window.FacilinoAdvanced===true)
				{
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_LED_MATRIX')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/LED_matrix.svg', 57*options.zoom, 33*options.zoom));
					this.appendValueInput('DIN_PIN').appendField(Facilino.locales.getKey('LANG_LED_MATRIX_DIN_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('CS_PIN').appendField(Facilino.locales.getKey('LANG_LED_MATRIX_CS_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('CLK_PIN').appendField(Facilino.locales.getKey('LANG_LED_MATRIX_CLK_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(new Blockly.FieldDropdown([
						[Facilino.locales.getKey('LANG_LED_MATRIX_VERTICAL'), 'V'],
				[Facilino.locales.getKey('LANG_LED_MATRIX_HORIZONTAL'), 'H'] ,
				[Facilino.locales.getKey('LANG_LED_MATRIX_VERTICAL_180'), 'V1'],
				[Facilino.locales.getKey('LANG_LED_MATRIX_HORIZONTAL_180'), 'H1']
					]), "CONFIGURATION").setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('EXPRESSION').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/dot-matrix.png", 24*options.zoom, 24*options.zoom, "*")).setCheck('Expression').setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
				}
				else
				{
					
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/LED_matrix.svg',36*options.zoom, 20*options.zoom));
					this.appendValueInput('DIN_PIN').appendField(new Blockly.FieldImage('img/blocks/digital_signal_din.svg',20*options.zoom,20*options.zoom));
					this.appendValueInput('CS_PIN').appendField(new Blockly.FieldImage('img/blocks/digital_signal_cs.svg',20*options.zoom,20*options.zoom));
					this.appendValueInput('CLK_PIN').appendField(new Blockly.FieldImage('img/blocks/pwm_signal_clk.svg',20*options.zoom,20*options.zoom));
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/rotate.svg',20*options.zoom,20*options.zoom)).appendField(new Blockly.FieldCheckbox('FALSE'),"CONFIGURATION");
					this.appendValueInput('EXPRESSION').appendField(new Blockly.FieldImage("img/blocks/dot-matrix.svg", 20*options.zoom, 20*options.zoom, "*")).setCheck('Expression').setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(true);
				}
				
		this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_LED_MATRIX_GENERIC_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="DIN_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="CS_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="CS_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>2)
					xml+='<value name="CLK_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[2][1]+'</field></shadow></value>';
				else
					xml+='<value name="CLK_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>3)
					xml+='<value name="EXPRESSION"><shadow type="dyor_drawing1"></shadow></value>';
				else
					xml+='<value name="EXPRESSION"><shadow type="dyor_drawing1"></shadow></value>';
				return xml;
			}
		};

	if (window.FacilinoAdvanced===true)
		{
	Blockly.Arduino.dyor_drawing_stream = function() {
		var din_pin = Blockly.Arduino.valueToCode(this, 'DIN_PIN', Blockly.Arduino.ORDER_NONE);
		var cs_pin = Blockly.Arduino.valueToCode(this, 'CS_PIN', Blockly.Arduino.ORDER_NONE);
		var clk_pin = Blockly.Arduino.valueToCode(this, 'CLK_PIN', Blockly.Arduino.ORDER_NONE);
		var smooth_shift = this.getFieldValue('SHIFT');
		var background = this.getFieldValue('BACKGROUND');
		var delay = Blockly.Arduino.valueToCode(this, 'DELAY', Blockly.Arduino.ORDER_ATOMIC);
		var message = '';
		var input = this.getInputTargetBlock('STREAM');
		var row1,row2,row3,row4,row5,row6,row7,row8;
		var col1,col2,col3,col4,col5,col6,col7,col8;
		var code = '';
		if ((this.getInputTargetBlock('CS_PIN')!==null)&&(this.getInputTargetBlock('DIN_PIN')!==null)&&(this.getInputTargetBlock('CLK_PIN')!==null))
		{
			if ((this.getInputTargetBlock('CS_PIN').type==='pin_digital')&&(this.getInputTargetBlock('DIN_PIN').type==='pin_digital')&&(this.getInputTargetBlock('CLK_PIN').type==='pin_digital'))
			{
				Blockly.Arduino.definitions_['define_LEDMatrix_init'] = JST['LEDMatrix_init_definitions']({});
				Blockly.Arduino.definitions_['define_writeRow'] = JST['writeRow_definitions']({});
				Blockly.Arduino.definitions_['define_maxAll'] = JST['maxAll_definitions']({});
				Blockly.Arduino.definitions_['define_putByte'] = JST['putByte_definitions']({});
				Blockly.Arduino.definitions_['define_expression'] = JST['expression_definitions']({});

				Blockly.Arduino.setups_['inout_digital_output' + cs_pin] = JST['inout_digital_output']({'pin': cs_pin});
				Blockly.Arduino.setups_['inout_digital_output' + din_pin] = JST['inout_digital_output']({'pin': din_pin});
				Blockly.Arduino.setups_['inout_digital_output' + clk_pin] = JST['inout_digital_output']({'pin': clk_pin});
				Blockly.Arduino.setups_['setup_LEDMatrix_' + cs_pin + din_pin + clk_pin] = JST['led_matrix_maxAll']({'cs_pin' : cs_pin,'din_pin' : din_pin,'clk_pin': clk_pin});
			}
		}
		
		if (input!=null)
		{
			message = Blockly.Arduino.valueToCode(this, 'STREAM', Blockly.Arduino.ORDER_ATOMIC);
			if (input.type=='dyor_drawing_text')
			{
				message = Blockly.Arduino.valueToCode(this, 'STREAM', Blockly.Arduino.ORDER_ATOMIC);
			}
			else if (input.type=='dyor_drawing_icons1')
			{
				while (input)
				{
					var str = input.getFieldValue('IMAGE');
					row1=parseInt(str.substr(0,2) || '00',16);
					row2=parseInt(str.substr(2,2) || '00',16);
					row3=parseInt(str.substr(4,2) || '00',16);
					row4=parseInt(str.substr(6,2) || '00',16);
					row5=parseInt(str.substr(8,2) || '00',16);
					row6=parseInt(str.substr(10,2) || '00',16);
					row7=parseInt(str.substr(12,2) || '00',16);
					row8=parseInt(str.substr(14,2) || '00',16);
					col1 = ((row1%2)<1? 0 : 1) + ((row2%2)<1? 0 : 2) + ((row3%2)<1? 0 : 4) + ((row4%2)<1? 0 : 8) + ((row5%2)<1? 0 : 16) + ((row6%2)<1? 0 : 32) + ((row7%2)<1? 0 : 64) + ((row8%2)<1? 0 : 128);
					col2 = ((row1%4)<2? 0 : 1) + ((row2%4)<2? 0 : 2) + ((row3%4)<2? 0 : 4) + ((row4%4)<2? 0 : 8) + ((row5%4)<2? 0 : 16) + ((row6%4)<2? 0 : 32) + ((row7%4)<2? 0 : 64) + ((row8%4)<2? 0 : 128);
					col3 = ((row1%8)<4? 0 : 1) + ((row2%8)<4? 0 : 2) + ((row3%8)<4? 0 : 4) + ((row4%8)<4? 0 : 8) + ((row5%8)<4? 0 : 16) + ((row6%8)<4? 0 : 32) + ((row7%8)<4? 0 : 64) + ((row8%8)<4? 0 : 128);
					col4 = ((row1%16)<8? 0 : 1) + ((row2%16)<8? 0 : 2) + ((row3%16)<8? 0 : 4) + ((row4%16)<8? 0 : 8) + ((row5%16)<8? 0 : 16) + ((row6%16)<8? 0 : 32) + ((row7%16)<8? 0 : 64) + ((row8%16)<8? 0 : 128);
					col5 = ((row1%32)<16? 0 : 1) + ((row2%32)<16? 0 : 2) + ((row3%32)<16? 0 : 4) + ((row4%32)<16? 0 : 8) + ((row5%32)<16? 0 : 16) + ((row6%32)<16? 0 : 32) + ((row7%32)<16? 0 : 64) + ((row8%32)<16? 0 : 128);
					col6 = ((row1%64)<32? 0 : 1) + ((row2%64)<32? 0 : 2) + ((row3%64)<32? 0 : 4) + ((row4%64)<32? 0 : 8) + ((row5%64)<32? 0 : 16) + ((row6%64)<32? 0 : 32) + ((row7%64)<32? 0 : 64) + ((row8%64)<32? 0 : 128);
					col7 = ((row1%128)<64? 0 : 1) + ((row2%128)<64? 0 : 2) + ((row3%128)<64? 0 : 4) + ((row4%128)<64? 0 : 8) + ((row5%128)<64? 0 : 16) + ((row6%128)<64? 0 : 32) + ((row7%128)<64? 0 : 64) + ((row8%128)<64? 0 : 128);
					col8 = (row1<128? 0 : 1) + (row2<128? 0 : 2) + (row3<128? 0 : 4) + (row4<128? 0 : 8) + (row5<128? 0 : 16) + (row6<128? 0 : 32) + (row7<128? 0 : 64) + (row8<128? 0 : 128);
					col1 = Facilino.pad(col1.toString(16),0,2);
					col2 = Facilino.pad(col2.toString(16),0,2);
					col3 = Facilino.pad(col3.toString(16),0,2);
					col4 = Facilino.pad(col4.toString(16),0,2);
					col5 = Facilino.pad(col5.toString(16),0,2);
					col6 = Facilino.pad(col6.toString(16),0,2);
					col7 = Facilino.pad(col7.toString(16),0,2);
					col8 = Facilino.pad(col8.toString(16),0,2);
					str = col1+col2+col3+col4+col5+col6+col7+col8;
					if (str=='0000000000000000')
						str='0000';
					message += str;
					input = input.getInputTargetBlock('STREAM');
				}
			}
			var expr='';
			var dropdown_configuration = this.getFieldValue('CONFIGURATION') || '';
			//if (background==='TRUE')
			//{
				var stream='{';
			//}
			while(message!=='')
			{
				row1=parseInt(message.substr(0,2) || '00',16);
				row2=parseInt(message.substr(2,2) || '00',16);
				row3=parseInt(message.substr(4,2) || '00',16);
				row4=parseInt(message.substr(6,2) || '00',16);
				row5=parseInt(message.substr(8,2) || '00',16);
				row6=parseInt(message.substr(10,2) || '00',16);
				row7=parseInt(message.substr(12,2) || '00',16);
				row8=parseInt(message.substr(14,2) || '00',16);
				if (dropdown_configuration=='V1')
				{
					expr = row1 + ',' + row2 + ','+ row3 + ','+ row4 + ','+ row5 + ','+ row6 + ','+ row7 + ','+ row8;
				}
				else if (dropdown_configuration=='H')
				{
					col1 = ((row1%2)<1? 0 : 128) + ((row2%2)<1? 0 : 64) + ((row3%2)<1? 0 : 32) + ((row4%2)<1? 0 : 16) + ((row5%2)<1? 0 : 8) + ((row6%2)<1? 0 : 4) + ((row7%2)<1? 0 : 2) + ((row8%2)<1? 0 : 1);
					col2 = ((row1%4)<2? 0 : 128) + ((row2%4)<2? 0 : 64) + ((row3%4)<2? 0 : 32) + ((row4%4)<2? 0 : 16) + ((row5%4)<2? 0 : 8) + ((row6%4)<2? 0 : 4) + ((row7%4)<2? 0 : 2) + ((row8%4)<2? 0 : 1);
					col3 = ((row1%8)<4? 0 : 128) + ((row2%8)<4? 0 : 64) + ((row3%8)<4? 0 : 32) + ((row4%8)<4? 0 : 16) + ((row5%8)<4? 0 : 8) + ((row6%8)<4? 0 : 4) + ((row7%8)<4? 0 : 2) + ((row8%8)<4? 0 : 1);
					col4 = ((row1%16)<8? 0 : 128) + ((row2%16)<8? 0 : 64) + ((row3%16)<8? 0 : 32) + ((row4%16)<8? 0 : 16) + ((row5%16)<8? 0 : 8) + ((row6%16)<8? 0 : 4) + ((row7%16)<8? 0 : 2) + ((row8%16)<8? 0 : 1);
					col5 = ((row1%32)<16? 0 : 128) + ((row2%32)<16? 0 : 64) + ((row3%32)<16? 0 : 32) + ((row4%32)<16? 0 : 16) + ((row5%32)<16? 0 : 8) + ((row6%32)<16? 0 : 4) + ((row7%32)<16? 0 : 2) + ((row8%32)<16? 0 : 1);
					col6 = ((row1%64)<32? 0 : 128) + ((row2%64)<32? 0 : 64) + ((row3%64)<32? 0 : 32) + ((row4%64)<32? 0 : 16) + ((row5%64)<32? 0 : 8) + ((row6%64)<32? 0 : 4) + ((row7%64)<32? 0 : 2) + ((row8%64)<32? 0 : 1);
					col7 = ((row1%128)<64? 0 : 128) + ((row2%128)<64? 0 : 64) + ((row3%128)<64? 0 : 32) + ((row4%128)<64? 0 : 16) + ((row5%128)<64? 0 : 8) + ((row6%128)<64? 0 : 4) + ((row7%128)<64? 0 : 2) + ((row8%128)<64? 0 : 1);
					col8 = (row1<128? 0 : 128) + (row2<128? 0 : 64) + (row3<128? 0 : 32) + (row4<128? 0 : 16) + (row5<128? 0 : 8) + (row6<128? 0 : 4) + (row7<128? 0 : 2) + (row8<128? 0 : 1);
					expr = col8 + ',' + col7 + ','+ col6 + ','+ col5 + ','+ col4 + ','+ col3 + ','+ col2 + ','+ col1;
				}
				else if (dropdown_configuration=='V') {
					row1 = ((row1%2)<1? 0 : 128) + ((row1%4)<2? 0 : 64) + ((row1%8)<4? 0 : 32) + ((row1%16)<8? 0 : 16) + ((row1%32)<16? 0 : 8) + ((row1%64)<32? 0 : 4) + ((row1%128)<64? 0 : 2) + (row1<128? 0 : 1);
					row2 = ((row2%2)<1? 0 : 128) + ((row2%4)<2? 0 : 64) + ((row2%8)<4? 0 : 32) + ((row2%16)<8? 0 : 16) + ((row2%32)<16? 0 : 8) + ((row2%64)<32? 0 : 4) + ((row2%128)<64? 0 : 2) + (row2<128? 0 : 1);
					row3 = ((row3%2)<1? 0 : 128) + ((row3%4)<2? 0 : 64) + ((row3%8)<4? 0 : 32) + ((row3%16)<8? 0 : 16) + ((row3%32)<16? 0 : 8) + ((row3%64)<32? 0 : 4) + ((row3%128)<64? 0 : 2) + (row3<128? 0 : 1);
					row4 = ((row4%2)<1? 0 : 128) + ((row4%4)<2? 0 : 64) + ((row4%8)<4? 0 : 32) + ((row4%16)<8? 0 : 16) + ((row4%32)<16? 0 : 8) + ((row4%64)<32? 0 : 4) + ((row4%128)<64? 0 : 2) + (row4<128? 0 : 1);
					row5 = ((row5%2)<1? 0 : 128) + ((row5%4)<2? 0 : 64) + ((row5%8)<4? 0 : 32) + ((row5%16)<8? 0 : 16) + ((row5%32)<16? 0 : 8) + ((row5%64)<32? 0 : 4) + ((row5%128)<64? 0 : 2) + (row5<128? 0 : 1);
					row6 = ((row6%2)<1? 0 : 128) + ((row6%4)<2? 0 : 64) + ((row6%8)<4? 0 : 32) + ((row6%16)<8? 0 : 16) + ((row6%32)<16? 0 : 8) + ((row6%64)<32? 0 : 4) + ((row6%128)<64? 0 : 2) + (row6<128? 0 : 1);
					row7 = ((row7%2)<1? 0 : 128) + ((row7%4)<2? 0 : 64) + ((row7%8)<4? 0 : 32) + ((row7%16)<8? 0 : 16) + ((row7%32)<16? 0 : 8) + ((row7%64)<32? 0 : 4) + ((row7%128)<64? 0 : 2) + (row7<128? 0 : 1);
					row8 = ((row8%2)<1? 0 : 128) + ((row8%4)<2? 0 : 64) + ((row8%8)<4? 0 : 32) + ((row8%16)<8? 0 : 16) + ((row8%32)<16? 0 : 8) + ((row8%64)<32? 0 : 4) + ((row8%128)<64? 0 : 2) + (row8<128? 0 : 1);
					expr = row1 + ',' + row2 + ','+ row3 + ','+ row4 + ','+ row5 + ','+ row6 + ','+ row7 + ','+ row8;
				}
				else if (dropdown_configuration=='H1')
				{
					col1 = ((row1%2)<1? 0 : 1) + ((row2%2)<1? 0 : 2) + ((row3%2)<1? 0 : 4) + ((row4%2)<1? 0 : 8) + ((row5%2)<1? 0 : 16) + ((row6%2)<1? 0 : 32) + ((row7%2)<1? 0 : 64) + ((row8%2)<1? 0 : 128);
					col2 = ((row1%4)<2? 0 : 1) + ((row2%4)<2? 0 : 2) + ((row3%4)<2? 0 : 4) + ((row4%4)<2? 0 : 8) + ((row5%4)<2? 0 : 16) + ((row6%4)<2? 0 : 32) + ((row7%4)<2? 0 : 64) + ((row8%4)<2? 0 : 128);
					col3 = ((row1%8)<4? 0 : 1) + ((row2%8)<4? 0 : 2) + ((row3%8)<4? 0 : 4) + ((row4%8)<4? 0 : 8) + ((row5%8)<4? 0 : 16) + ((row6%8)<4? 0 : 32) + ((row7%8)<4? 0 : 64) + ((row8%8)<4? 0 : 128);
					col4 = ((row1%16)<8? 0 : 1) + ((row2%16)<8? 0 : 2) + ((row3%16)<8? 0 : 4) + ((row4%16)<8? 0 : 8) + ((row5%16)<8? 0 : 16) + ((row6%16)<8? 0 : 32) + ((row7%16)<8? 0 : 64) + ((row8%16)<8? 0 : 128);
					col5 = ((row1%32)<16? 0 : 1) + ((row2%32)<16? 0 : 2) + ((row3%32)<16? 0 : 4) + ((row4%32)<16? 0 : 8) + ((row5%32)<16? 0 : 16) + ((row6%32)<16? 0 : 32) + ((row7%32)<16? 0 : 64) + ((row8%32)<16? 0 : 128);
					col6 = ((row1%64)<32? 0 : 1) + ((row2%64)<32? 0 : 2) + ((row3%64)<32? 0 : 4) + ((row4%64)<32? 0 : 8) + ((row5%64)<32? 0 : 16) + ((row6%64)<32? 0 : 32) + ((row7%64)<32? 0 : 64) + ((row8%64)<32? 0 : 128);
					col7 = ((row1%128)<64? 0 : 1) + ((row2%128)<64? 0 : 2) + ((row3%128)<64? 0 : 4) + ((row4%128)<64? 0 : 8) + ((row5%128)<64? 0 : 16) + ((row6%128)<64? 0 : 32) + ((row7%128)<64? 0 : 64) + ((row8%128)<64? 0 : 128);
					col8 = (row1<128? 0 : 1) + (row2<128? 0 : 2) + (row3<128? 0 : 4) + (row4<128? 0 : 8) + (row5<128? 0 : 16) + (row6<128? 0 : 32) + (row7<128? 0 : 64) + (row8<128? 0 : 128);
					expr = col1 + ',' + col2 + ','+ col3 + ','+ col4 + ','+ col5 + ','+ col6 + ','+ col7 + ','+ col8;
				}
				//if (smooth_shift==='TRUE')
				//	message=message.substr(2);
				//else
				message=message.substr(16);
				//if (background==='TRUE')
				//{
					stream+='{'+expr+'},';
				//}
				//else
				//{
				//	code += 'expression('+((__t = (cs_pin)) == null ? '' : __t) +',' +((__t = (din_pin)) == null ? '' : __t) +',' +((__t = (clk_pin)) == null ? '' : __t) +',' + expr + ');\n';
				//	code += 'delay('+delay+');\n';
				//}
			}
			if (smooth_shift==='TRUE')
			{
				expr='0,0,0,0,0,0,0,0';
				//if (background==='TRUE')
					stream+='{'+expr+'}};'
				//else
				//{
				//	code += 'expression('+((__t = (cs_pin)) == null ? '' : __t) +',' +((__t = (din_pin)) == null ? '' : __t) +',' +((__t = (clk_pin)) == null ? '' : __t) +',' + expr + ');\n';
				//	code += 'delay('+delay+');\n';
				//}
			}
			else
			{
				//if (background==='TRUE')
					stream=stream.substr(0,stream.length-1)+'};';
			}
			var stream_name='_stream'+this.NumLEDMatrixStreams;
			Blockly.Arduino.definitions_['declare_var'+stream_name]='const uint8_t '+stream_name+'[][8]='+stream+'\n';
			if (background==='TRUE')
			{
				Blockly.Arduino.definitions_['define_prepare_led_matrix_stream'] = JST['dyor_led_matrix_definitions_prepare_stream']({});
				Blockly.Arduino.definitions_['declare_var_current_led_matrix_stream_ptr']='volatile uint8_t* _current_led_matrix_stream_ptr[8];\n';
				Blockly.Arduino.definitions_['declare_var_led_matrix_stream_CS_pin']='volatile int _led_matrix_stream_CS_pin=0;\n';
				Blockly.Arduino.definitions_['declare_var_led_matrix_stream_DIN_pin']='volatile int _led_matrix_stream_DIN_pin=0;\n';
				Blockly.Arduino.definitions_['declare_var_led_matrix_stream_CLK_pin']='volatile int _led_matrix_stream_CLK_pin=0;\n';
				Blockly.Arduino.definitions_['declare_var_led_matrix_stream_counter']='volatile int _led_matrix_stream_counter=0;\n';
				Blockly.Arduino.definitions_['declare_var_led_matrix_stream_length']='volatile int _led_matrix_stream_length=0;\n';
				Blockly.Arduino.definitions_['declare_var_led_matrix_stream_status']='volatile uint8_t _led_matrix_stream_status=-1;\n';
				Blockly.Arduino.definitions_['declare_var_led_matrix_stream_next']='volatile uint8_t _led_matrix_stream_next=8;\n';
				Blockly.Arduino.definitions_['declare_var_led_matrix_stream_duration']='volatile int _led_matrix_stream_duration=0;\n';
				Blockly.Arduino.definitions_['declare_var_led_matrix_stream_forward_dir']='volatile bool _led_matrix_stream_forward_dir=true;\n';
				Blockly.Arduino.definitions_['declare_var_led_matrix_stream_next_time']='volatile unsigned long _led_matrix_stream_next_time=0;\n';

				Blockly.Arduino.definitions_['define_play_led_matrix_stream_interrupt'] = JST['dyor_led_matrix_definitions_play_stream_interrupt']({});
				Blockly.Arduino.play_led_matrix_stream = 'playLEDMatrixStreamInterrupt();\n';
				//Blockly.Arduino.definitions_['define_backgroundtask'] = 'SIGNAL (TIMER1_COMPA_vect){\n';
				var Blocks=Blockly.getMainWorkspace().getAllBlocks();
				var block_found = Blocks.find(function (block){return (block.type=='dyor_task');});
				if (block_found===undefined)
				{
					Blockly.Arduino.definitions_['define_task'] = 'SIGNAL (TIMER0_COMPA_vect){\n';
					Blockly.Arduino.definitions_['declare_var_currentTime']='unsigned long _currentTime;\n';
					Blockly.Arduino.definitions_['define_task'] += Blockly.Arduino.play_melody;
					Blockly.Arduino.definitions_['define_task'] += Blockly.Arduino.play_led_matrix_stream;
					Blockly.Arduino.definitions_['define_task'] += Blockly.Arduino.play_RGBstream;
					//Check if other "tasks must be executed too such as LED Matrix, servos, etc... whatever we might need in the future...
					Blockly.Arduino.setups_['setup_int0_enable']='OCR0A=0xAF;\n  TIMSK0 |= _BV(OCIE0A);\n';
					//Blockly.Arduino.setups_['setup_int1_enable']='OCR1A = 0x1F40;\n  TCCR1B |= (1 << WGM12);\n  TCCR1B |= (1 << CS11);\n  TIMSK1 |= (1 << OCIE1A);\n';
					Blockly.Arduino.definitions_['define_task'] += '}\n';
				}
				if (smooth_shift==='TRUE')
					if ((input.type==='dyor_drawing_text')&&(dropdown_configuration=='V1'))
					{
						code += JST['dyor_led_matrix_prepare_stream']({
						'pinCS': cs_pin,
						'pinDIN': din_pin,
						'pinCLK': clk_pin,
						'stream': stream_name,
						'next' : 1,
						'duration' : delay,
						'dir' : 'false'
					});
					}
					else
					{
					code += JST['dyor_led_matrix_prepare_stream']({
						'pinCS': cs_pin,
						'pinDIN': din_pin,
						'pinCLK': clk_pin,
						'stream': stream_name,
						'next' : 1,
						'duration' : delay,
						'dir' : 'true'
					});
					}
				else
					code += JST['dyor_led_matrix_prepare_stream']({
						'pinCS': cs_pin,
						'pinDIN': din_pin,
						'pinCLK': clk_pin,
						'stream': stream_name,
						'next' : 8,
						'duration' : delay,
						'dir': 'true'
					});
			}
			else
			{
				Blockly.Arduino.definitions_['define_play_led_matrix_stream'] = JST['dyor_led_matrix_definitions_play_stream']({});
				Blockly.Arduino.play_led_matrix_stream='';
				if (smooth_shift==='TRUE')
				{
					if ((input.type==='dyor_drawing_text')&&(dropdown_configuration=='V1'))
					{
						code += JST['dyor_led_matrix_play_stream']({
						'pinCS': cs_pin,
						'pinDIN': din_pin,
						'pinCLK': clk_pin,
						'stream': stream_name,
						'next' : 1,
						'duration' : delay,
						'dir': 'false'

					});
					}
					else
					{
					code += JST['dyor_led_matrix_play_stream']({
						'pinCS': cs_pin,
						'pinDIN': din_pin,
						'pinCLK': clk_pin,
						'stream': stream_name,
						'next' : 1,
						'duration' : delay,
						'dir': 'true'

					});
					}
				}
				else
				{
					code += JST['dyor_led_matrix_play_stream']({
						'pinCS': cs_pin,
						'pinDIN': din_pin,
						'pinCLK': clk_pin,
						'stream': stream_name,
						'next' : 8,
						'duration' : delay,
						'dir': 'true'
					});
				}
			}
		}
		return code;
	};

	Blockly.Blocks.dyor_drawing_stream = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MAX7219'),
			tags: ['led_matrix','screen'],
			helpUrl: Facilino.getHelpUrl('dyor_drawing_stream'),
			examples: ['dyor_generic_expression_stream_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LEDMATRIX,
			keys: ['LANG_LED_MATRIX_DRAWING_STREAM_NAME','LANG_LED_MATRIX','LANG_LED_MATRIX_CS_PIN','LANG_LED_MATRIX_DIN_PIN','LANG_LED_MATRIX_CLK_PIN','LANG_LED_MATRIX_VERTICAL','LANG_LED_MATRIX_HORIZONTAL','LANG_LED_MATRIX_VERTICAL_180','LANG_LED_MATRIX_HORIZONTAL_180','LANG_LED_MATRIX_DELAY_WAIT','LANG_LED_MATRIX_DELAY_SHIFT','LANG_LED_MATRIX_WAIT','LANG_LED_MATRIX_DRAWING_STREAM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_STREAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDMATRIX);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_LED_MATRIX')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/LED_matrix.svg', 57*options.zoom, 33*options.zoom));
				this.appendValueInput('DIN_PIN').appendField(Facilino.locales.getKey('LANG_LED_MATRIX_DIN_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('CS_PIN').appendField(Facilino.locales.getKey('LANG_LED_MATRIX_CS_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('CLK_PIN').appendField(Facilino.locales.getKey('LANG_LED_MATRIX_CLK_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_LED_MATRIX_VERTICAL'), 'V'],
			[Facilino.locales.getKey('LANG_LED_MATRIX_HORIZONTAL'), 'H'] ,
			[Facilino.locales.getKey('LANG_LED_MATRIX_VERTICAL_180'), 'V1'],
			[Facilino.locales.getKey('LANG_LED_MATRIX_HORIZONTAL_180'), 'H1']
				]), "CONFIGURATION").setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('STREAM').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/dot-matrix_stream.png", 48*options.zoom, 24*options.zoom, "*")).setCheck('StreamExpression').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('DELAY').appendField(Facilino.locales.getKey('LANG_LED_MATRIX_DELAY_WAIT')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_LED_MATRIX_DELAY_SHIFT')).appendField(new Blockly.FieldCheckbox('TRUE'),'SHIFT').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_LED_MATRIX_WAIT')).appendField(new Blockly.FieldCheckbox('FALSE'),'BACKGROUND').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
			this.setNextStatement(true,'code');
				Facilino.NumLEDMatrixStreams=Facilino.NumLEDMatrixStreams+1;
				this.NumLEDMatrixStreams=Facilino.NumLEDMatrixStreams;
		//this.setOutput(true,'Expression');
			this.setTooltip(Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_STREAM_TOOLTIP'));
			},
			default_inputs: function()
			{
				b=[];
				var xml='';
				xml+='<value name="DIN_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="CS_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="CS_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>2)
					xml+='<value name="CLK_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[2][1]+'</field></shadow></value>';
				else
					xml+='<value name="CLK_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>3)
					xml+='<value name="EXPRESSION"><shadow type="dyor_drawing1"></shadow></value>';
				else
					xml+='<value name="EXPRESSION"><shadow type="dyor_drawing1"></shadow></value>';
				xml+='<value name="STREAM"><shadow type="dyor_drawing_text"></shadow></value>';
				xml+='<value name="DELAY"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
				b.push(xml);
				xml='';
				xml+='<value name="DIN_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="CS_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="CS_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>2)
					xml+='<value name="CLK_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[2][1]+'</field></shadow></value>';
				else
					xml+='<value name="CLK_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>3)
					xml+='<value name="EXPRESSION"><shadow type="dyor_drawing1"></shadow></value>';
				else
					xml+='<value name="EXPRESSION"><shadow type="dyor_drawing1"></shadow></value>';
				xml+='<value name="STREAM"><shadow type="dyor_drawing_sequentially"><value name="DATA1"><shadow type="dyor_drawing1"></shadow></value><value name="DATA2"><shadow type="dyor_drawing1"></shadow></value></shadow></value>';
				xml+='<value name="DELAY"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
				b.push(xml);
				return b;
			}
		};
		
		}
		
		Blockly.Arduino.dyor_drawing1 = function() {
		var code = '';
		var data = [];
		for (i=0;i<8;i++)
		{
			data[i]=0;
			for (j=0;j<8;j++)
			{
				var field_name = 'COL'+(j)+(i);
				if (this.getFieldValue(field_name)==='#ff0000')
					data[i]+=Math.pow(2,(7-j));
			}
		}
		code = data[0]+','+data[1]+','+data[2]+','+data[3]+','+data[4]+','+data[5]+','+data[6]+','+data[7];
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	};

	Blockly.Blocks.dyor_drawing1 = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MAX7219'),
			tags: ['led_matrix','screen'],
			helpUrl: Facilino.getHelpUrl('dyor_drawing1'),
			examples: ['dyor_generic_expression_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LEDMATRIX,
			keys: ['LANG_LED_MATRIX_DRAWING_NAME','LANG_LED_MATRIX_DRAWING_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDMATRIX);
				var colours = [];
				for (i=0;i<8;i++)
				{
					for (j=0;j<8;j++)
					{
						var col_num=''+i+j;
						colours[col_num]=new Blockly.FieldColour('#000000');
						colours[col_num].setColours(['#000000','#FF0000']).setColumns(2);
					}
				}
				this.appendDummyInput('').appendField(' ').appendField(colours['00'],'COL00').appendField(colours['01'],'COL01').appendField(colours['02'],'COL02').appendField(colours['03'],'COL03').appendField(colours['04'],'COL04').appendField(colours['05'],'COL05').appendField(colours['06'],'COL06').appendField(colours['07'],'COL07').setAlign(Blockly.ALIGN_RIGHT);

				this.appendDummyInput('').appendField(colours['10'],'COL10').appendField(colours['11'],'COL11').appendField(colours['12'],'COL12').appendField(colours['13'],'COL13').appendField(colours['14'],'COL14').appendField(colours['15'],'COL15').appendField(colours['16'],'COL16').appendField(colours['17'],'COL17').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(colours['20'],'COL20').appendField(colours['21'],'COL21').appendField(colours['22'],'COL22').appendField(colours['23'],'COL23').appendField(colours['24'],'COL24').appendField(colours['25'],'COL25').appendField(colours['26'],'COL26').appendField(colours['27'],'COL27').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(colours['30'],'COL30').appendField(colours['31'],'COL31').appendField(colours['32'],'COL32').appendField(colours['33'],'COL33').appendField(colours['34'],'COL34').appendField(colours['35'],'COL35').appendField(colours['36'],'COL36').appendField(colours['37'],'COL37').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(colours['40'],'COL40').appendField(colours['41'],'COL41').appendField(colours['42'],'COL42').appendField(colours['43'],'COL43').appendField(colours['44'],'COL44').appendField(colours['45'],'COL45').appendField(colours['46'],'COL46').appendField(colours['47'],'COL47').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(colours['50'],'COL50').appendField(colours['51'],'COL51').appendField(colours['52'],'COL52').appendField(colours['53'],'COL53').appendField(colours['54'],'COL54').appendField(colours['55'],'COL55').appendField(colours['56'],'COL56').appendField(colours['57'],'COL57').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(colours['60'],'COL60').appendField(colours['61'],'COL61').appendField(colours['62'],'COL62').appendField(colours['63'],'COL63').appendField(colours['64'],'COL64').appendField(colours['65'],'COL65').appendField(colours['66'],'COL66').appendField(colours['67'],'COL67').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(colours['70'],'COL70').appendField(colours['71'],'COL71').appendField(colours['72'],'COL72').appendField(colours['73'],'COL73').appendField(colours['74'],'COL74').appendField(colours['75'],'COL75').appendField(colours['76'],'COL76').appendField(colours['77'],'COL77').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setOutput(true,'Expression');
			this.setTooltip(Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{
			Blockly.Arduino.dyor_drawing_text = function() {
			// Text value.
			var text_to_show = Blockly.Arduino.quote_(this.getFieldValue('TEXT'));
			var dictionary = { 'sp':'0000000000000000',0: '3c66666e76663c00',1: '7e1818181c181800',2: '7e060c3060663c00',3:'3c66603860663c00',4:'30307e3234383000',5:'3c6660603e067e00',6:'3c66663e06663c00',7:'1818183030667e00',8:'3c66663c66663c00',9:'3c66607c66663c00',A:'66667e7e66667e3c',B:'3e7e663e3e667e3e',C:'3c7e060606067e3c',D:'1e7e666666663e1e',E:'7e7e061e1e067e7e',F:'0606061e1e067e7e',G:'3c7e667636067e3c',H:'6666667e7e666666',I:'7e7e181818187e7e',J:'1c3e363030307c7c',K:'66361e0e0e1e3666',L:'7e7e060606060606',M:'666666667e7e6642',N:'6676767e7e6e6e66',O:'3c7e666666667e3c',P:'0606063e7e667e3e',Q:'703c7e6666667e3c',R:'66361e3e7e667e3e',S:'3c7e60381c067e3c',T:'1818181818187e7e',U:'3c7e666666666666',V:'183c3c6666666666',W:'143e7f6b63636363',X:'66663c18183c6666',Y:'181818183c3c6666',Z:'7e7e061c38607e7e',a:'7c667c603c000000',b:'3e66663e06060600',c:'3c6606663c000000',d:'7c66667c60606000',e:'3c067e663c000000',f:'0c0c3e0c0c6c3800',g:'3c607c66667c0000',h:'6666663e06060600',i:'3c18181800180000',j:'1c36363030003000',k:'66361e3666060600',l:'1818181818181800',m:'d6d6feeec6000000',n:'6666667e3e000000',o:'3c6666663c000000',p:'06063e66663e0000',q:'f0b03c36363c0000',r:'060666663e000000',s:'3e403c027c000000',t:'3818187e18180000',u:'7c66666666000000',v:'183c666600000000',w:'7cd6d6d6c6000000',x:'663c183c66000000',y:'3c607c6666000000',z:'3c0c18303c000000','+':'0010107c10100000','-':'0000003c00000000','*':'006c38fe386c0000','/':'00060c1830600000','%':'60660c1830660600','=':'00003c003c000000','~':'000000365c000000','^':'0000008244281000','<':'6030180c18306000','>':'060c1830180c0600','(':'6030181818306000',')':'060c1818180c0600','[':'7818181818187800',']':'1e18181818181e00','{':'7018180c18187000','}':'0e18183018180e00','.':'0606000000000000',':':'0018180018180000',';':'0c18180018180000',',':'060c0c0c00000000','!':'180018183c3c1800','?':'1800183860663c00','@':'003c421a3a221c00','&':'fc66a6143c663c00','$':'103c403804781000','#':'6c6cfe6cfe6c6c00','"':'00000000286c6c00','\\':'006030180c060000','`':'0000000060303000','´':'0000000c18181800'};
			var code ='';
			var row1,row2,row3,row4,row5,row6,row7,row8;
			var col1,col2,col3,col4,col5,col6,col7,col8;
			text_to_show=text_to_show.substr(1);
			text_to_show=text_to_show.substr(0,text_to_show.length-1);
			while (text_to_show!='')
			{
				var _char = text_to_show.substr(0,1);
				if (_char==' ')
				{
					str=dictionary['sp'];
				}
				else
					str=dictionary[_char];
				if (str==null)
				{
					text_to_show=text_to_show.substr(1);
					continue;
				}
				row1=parseInt(str.substr(0,2) || '00',16);
				row2=parseInt(str.substr(2,2) || '00',16);
				row3=parseInt(str.substr(4,2) || '00',16);
				row4=parseInt(str.substr(6,2) || '00',16);
				row5=parseInt(str.substr(8,2) || '00',16);
				row6=parseInt(str.substr(10,2) || '00',16);
				row7=parseInt(str.substr(12,2) || '00',16);
				row8=parseInt(str.substr(14,2) || '00',16);
				col1 = ((row1%2)<1? 0 : 1) + ((row2%2)<1? 0 : 2) + ((row3%2)<1? 0 : 4) + ((row4%2)<1? 0 : 8) + ((row5%2)<1? 0 : 16) + ((row6%2)<1? 0 : 32) + ((row7%2)<1? 0 : 64) + ((row8%2)<1? 0 : 128);
				col2 = ((row1%4)<2? 0 : 1) + ((row2%4)<2? 0 : 2) + ((row3%4)<2? 0 : 4) + ((row4%4)<2? 0 : 8) + ((row5%4)<2? 0 : 16) + ((row6%4)<2? 0 : 32) + ((row7%4)<2? 0 : 64) + ((row8%4)<2? 0 : 128);
				col3 = ((row1%8)<4? 0 : 1) + ((row2%8)<4? 0 : 2) + ((row3%8)<4? 0 : 4) + ((row4%8)<4? 0 : 8) + ((row5%8)<4? 0 : 16) + ((row6%8)<4? 0 : 32) + ((row7%8)<4? 0 : 64) + ((row8%8)<4? 0 : 128);
				col4 = ((row1%16)<8? 0 : 1) + ((row2%16)<8? 0 : 2) + ((row3%16)<8? 0 : 4) + ((row4%16)<8? 0 : 8) + ((row5%16)<8? 0 : 16) + ((row6%16)<8? 0 : 32) + ((row7%16)<8? 0 : 64) + ((row8%16)<8? 0 : 128);
				col5 = ((row1%32)<16? 0 : 1) + ((row2%32)<16? 0 : 2) + ((row3%32)<16? 0 : 4) + ((row4%32)<16? 0 : 8) + ((row5%32)<16? 0 : 16) + ((row6%32)<16? 0 : 32) + ((row7%32)<16? 0 : 64) + ((row8%32)<16? 0 : 128);
				col6 = ((row1%64)<32? 0 : 1) + ((row2%64)<32? 0 : 2) + ((row3%64)<32? 0 : 4) + ((row4%64)<32? 0 : 8) + ((row5%64)<32? 0 : 16) + ((row6%64)<32? 0 : 32) + ((row7%64)<32? 0 : 64) + ((row8%64)<32? 0 : 128);
				col7 = ((row1%128)<64? 0 : 1) + ((row2%128)<64? 0 : 2) + ((row3%128)<64? 0 : 4) + ((row4%128)<64? 0 : 8) + ((row5%128)<64? 0 : 16) + ((row6%128)<64? 0 : 32) + ((row7%128)<64? 0 : 64) + ((row8%128)<64? 0 : 128);
				col8 = (row1<128? 0 : 1) + (row2<128? 0 : 2) + (row3<128? 0 : 4) + (row4<128? 0 : 8) + (row5<128? 0 : 16) + (row6<128? 0 : 32) + (row7<128? 0 : 64) + (row8<128? 0 : 128);
				col1 = Facilino.pad(col1.toString(16),0,2);
				col2 = Facilino.pad(col2.toString(16),0,2);
				col3 = Facilino.pad(col3.toString(16),0,2);
				col4 = Facilino.pad(col4.toString(16),0,2);
				col5 = Facilino.pad(col5.toString(16),0,2);
				col6 = Facilino.pad(col6.toString(16),0,2);
				col7 = Facilino.pad(col7.toString(16),0,2);
				col8 = Facilino.pad(col8.toString(16),0,2);
				str = col1+col2+col3+col4+col5+col6+col7+col8;
				//if (str=='0000000000000000')
				//	str='0000';
				code += str;
				text_to_show=text_to_show.substr(1);
			}
			//console.log(code);
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.dyor_drawing_text = {
			// Text value.
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MAX7219'),
			tags: ['led_matrix','screen'],
			helpUrl: Facilino.getHelpUrl('dyor_drawing_text'),
			examples: ['dyor_generic_expression_stream_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LEDMATRIX,
			keys: ['LANG_LED_MATRIX_STREAM_NAME','LANG_LED_MATRIX_STREAM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LED_MATRIX_STREAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDMATRIX);
				this.appendDummyInput()
					.appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/dot-matrix_stream.png", 48*options.zoom, 24*options.zoom, "*"))
					.appendField(new Blockly.FieldTextInput(''), 'TEXT');
				this.setOutput(true,'StreamExpression');
				this.setTooltip(Facilino.locales.getKey('LANG_LED_MATRIX_STREAM_TOOLTIP'));
			}
		};

		Blockly.Arduino.dyor_drawing_sequentially = function() {
		var code = '';
		var i=1;
		var padding=2;
		for (i=1;i<=this.itemCount_;i++)
		{
			var expr= Blockly.Arduino.valueToCode(this, 'DATA'+i, Blockly.Arduino.ORDER_ATOMIC);
			var row = expr.split(',');
			var tmp_code='';
			for (j=0;j<row.length;j++)
			{
				var hex = Number(row[j]).toString(16);
				while (hex.length < padding) {
					hex = "0" + hex;
				}
				tmp_code+=hex.toString(16);
			}
			code+=tmp_code;
		}
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	};

	Blockly.Blocks.dyor_drawing_sequentially = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MAX7219'),
			tags: ['led_matrix','screen'],
			helpUrl: Facilino.getHelpUrl('dyor_drawing_sequentially'),
			examples: ['dyor_generic_expression_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LEDMATRIX,
			keys: ['LANG_LED_MATRIX_DRAWING_SEQUENTIALLY_NAME','LANG_LED_MATRIX_DRAWING_SEQUENTIALLY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SEQUENTIALLY_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDMATRIX);
				this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/dot-matrix_stream.png", 48*options.zoom, 24*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('DATA1').setCheck('Data').setCheck('Expression').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('DATA2').setCheck('Data').setCheck('Expression').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(true);
				this.setMutator(new Blockly.Mutator(['dyor_drawing_sequentially_item']));
				this.itemCount_ = 2;
				this.setInputsInline(true);
				this.setOutput(true,'StreamExpression');
			this.setTooltip(Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SEQUENTIALLY_TOOLTIP'));
			},
			default_inputs: function()
			{
				return '<value name="DATA1"><shadow type="dyor_drawing1"></shadow></value><value name="DATA2"><shadow type="dyor_drawing1"></shadow></value>';
			},
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
				for (var x = 3; x <= this.itemCount_; x++) {
					this.appendValueInput('DATA' + x).setCheck('Data').setCheck('Expression').setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(true);
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('dyor_drawing_sequentially_mutator');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 3; x <= this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('dyor_drawing_sequentially_item');
					itemBlock.initSvg();
					connection.connect(itemBlock.previousConnection);
					connection = itemBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the items input blocks and remove the inputs.
				for (var x = this.itemCount_; x > 2; x--) {
					this.removeInput('DATA' + x);
				}
				this.itemCount_ = 2;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'dyor_drawing_sequentially_item':
							this.itemCount_++;
							this.setInputsInline(true);
							var dataInput = this.appendValueInput('DATA' + this.itemCount_).setCheck('Expression').setAlign(Blockly.ALIGN_RIGHT);
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
				var x = 3;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'dyor_drawing_sequentially_item':
							var inputData = this.getInput('DATA' + x);
							clauseBlock.valueConnection_ =
								inputData && inputData.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			}
		};

		Blockly.Blocks.dyor_drawing_sequentially_mutator = {
			// App
			colour: Facilino.LANG_COLOUR_SCREEN_LEDMATRIX,
			keys: ['LANG_LED_MATRIX_DRAWING_SEQUENTIALLY_MUTATOR_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDMATRIX);
				this.appendDummyInput().appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/dot-matrix_stream.png", 48*options.zoom, 48*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('drawing_item');
				this.setTooltip(Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SEQUENTIALLY_MUTATOR_TOOLTIP'));
				this.contextMenu = false;
			}
		};

	Blockly.Blocks.dyor_drawing_sequentially_item = {
			colour: Facilino.LANG_COLOUR_SCREEN_LEDMATRIX,
			keys: ['LANG_LED_MATRIX_DRAWING_SEQUENTIALLY_ITEM_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDMATRIX);
				this.appendDummyInput().appendField(new Blockly.FieldImage("img/blocks/dot-matrix.png", 24*options.zoom, 24*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'drawing_item');
				this.setNextStatement(true,'drawing_item');
				this.setTooltip(Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SEQUENTIALLY_ITEM_TOOLTIP'));
		this.contextMenu = false;
			}
		};
		}
		
		Blockly.Arduino.dyor_predef_expression1 = function() {
			//var cs_pin = Blockly.Arduino.valueToCode(this, 'CS_PIN', Blockly.Arduino.ORDER_ATOMIC);
			//var din_pin = Blockly.Arduino.valueToCode(this, 'DIN_PIN', Blockly.Arduino.ORDER_ATOMIC);
			//var clk_pin = Blockly.Arduino.valueToCode(this, 'CLK_PIN', Blockly.Arduino.ORDER_ATOMIC);
			//var dropdown_configuration = this.getFieldValue('CONFIGURATION') || '';
			var dropdown_expr = this.getFieldValue('EXPRESSION');
			var code = '';
			if (dropdown_expr==='1')
				code = '64,34,36,8,8,36,34,64';
			else if (dropdown_expr==='2')
				code = '48,24,12,12,12,12,24,48';
			else if (dropdown_expr==='3')
				code = '12,24,48,48,48,48,24,12';
			else if (dropdown_expr==='4')
				code = '48,120,124,62,62,124,120,48';
			else if (dropdown_expr==='5')
				code = '0,0,0,24,24,0,0,0';
			else if (dropdown_expr==='6')
				code = '60,102,195,153,153,195,102,60';
			else if (dropdown_expr==='7')
				code = '0,44,43,254,170,168,128,64';
			else if (dropdown_expr==='8')
				code = '32,96,48,248,248,48,96,32';
			else if (dropdown_expr==='9')
				code = '124,242,18,45,45,18,242,124';
			else if (dropdown_expr==='10')
				code = '60,78,207,255,255,255,86,20';
			else if (dropdown_expr==='11')
				code = '2,7,6,8,16,32,64,128';
			else if (dropdown_expr==='12')
				code = '112,60,30,56,56,30,60,112';
			else if (dropdown_expr==='13')
				code = '24,27,62,252,252,62,27,24';
			else if (dropdown_expr==='14')
				code = '224,231,230,30,30,230,231,224';
			else if (dropdown_expr==='15')
				code = '19,31,14,30,59,112,224,192';
			else if (dropdown_expr==='16')
				code = '24,60,66,153,153,66,60,24';
			else if (dropdown_expr==='17')
				code = '21,213,46,255,255,46,213,21';
			else if (dropdown_expr==='18')
				code = '28,42,73,85,73,42,28,0';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.dyor_predef_expression1 = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MAX7219'),
			tags: ['led_matrix','screen'],
			helpUrl: Facilino.getHelpUrl('dyor_predef_expression1'),
			examples: ['dyor_predef_expression_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LEDMATRIX,
			keys: ['LANG_LED_MATRIX_ANGRY','LANG_LED_MATRIX_HAPPY','LANG_LED_MATRIX_SAD','LANG_LED_MATRIX_HEART','LANG_LED_MATRIX_STUNNED','LANG_LED_MATRIX_DRAGONBALL','LANG_LED_MATRIX_TURTLE_SCHOOL','LANG_LED_MATRIX_BAT','LANG_LED_MATRIX_MASK','LANG_LED_MATRIX_DEATH_STAR','LANG_LED_MATRIX_LIGHT_SABER','LANG_LED_MATRIX_WONDER_WOMAN','LANG_LED_MATRIX_STAR','LANG_LED_MATRIX_CREEPER','LANG_LED_MATRIX_SWORD','LANG_LED_MATRIX_MINION_EYE','LANG_LED_MATRIX_POKEBALL','LANG_LED_MATRIX_SPIDER','LANG_LED_MATRIX_PREDEF_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LED_MATRIX_PREDEF_NAME'),
			expressions: [[Facilino.locales.getKey('LANG_LED_MATRIX_ANGRY') || 'ANGRY', '1'],[Facilino.locales.getKey('LANG_LED_MATRIX_HAPPY') || 'HAPPY', '2'],[Facilino.locales.getKey('LANG_LED_MATRIX_SAD') || 'SAD', '3'],[Facilino.locales.getKey('LANG_LED_MATRIX_HEART') || 'HEART', '4'],[Facilino.locales.getKey('LANG_LED_MATRIX_STUNNED') || 'STUNNED', '5'],[Facilino.locales.getKey('LANG_LED_MATRIX_DRAGONBALL') || 'Dragonball', '6'],[Facilino.locales.getKey('LANG_LED_MATRIX_TURTLE_SCHOOL') || 'Turtle School', '7'],[Facilino.locales.getKey('LANG_LED_MATRIX_BAT') || 'Bat', '8'],[Facilino.locales.getKey('LANG_LED_MATRIX_MASK') || 'BatMask', '9'],[Facilino.locales.getKey('LANG_LED_MATRIX_DEATH_STAR') || 'Death Star', '10'],[Facilino.locales.getKey('LANG_LED_MATRIX_LIGHT_SABER') || 'Light saber', '11'],[Facilino.locales.getKey('LANG_LED_MATRIX_WONDER_WOMAN') || 'Wonder Woman', '12'],[Facilino.locales.getKey('LANG_LED_MATRIX_STAR') || 'Star', '13'],[Facilino.locales.getKey('LANG_LED_MATRIX_CREEPER') || 'Creeper', '14'],[Facilino.locales.getKey('LANG_LED_MATRIX_SWORD') || 'Sword', '15'],[Facilino.locales.getKey('LANG_LED_MATRIX_MINION_EYE') || 'Minion Eye', '16'],[Facilino.locales.getKey('LANG_LED_MATRIX_SPIDER') || 'Spider', '17'],[Facilino.locales.getKey('LANG_LED_MATRIX_POKEBALL') || 'Pokeball', '18']],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDMATRIX);
				this.expr = new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_LED_MATRIX_ANGRY') || 'ANGRY', '1'],[Facilino.locales.getKey('LANG_LED_MATRIX_HAPPY') || 'HAPPY', '2'],[Facilino.locales.getKey('LANG_LED_MATRIX_SAD') || 'SAD', '3'],[Facilino.locales.getKey('LANG_LED_MATRIX_HEART') || 'HEART', '4'],[Facilino.locales.getKey('LANG_LED_MATRIX_STUNNED') || 'STUNNED', '5'],[Facilino.locales.getKey('LANG_LED_MATRIX_DRAGONBALL') || 'Dragonball', '6'],[Facilino.locales.getKey('LANG_LED_MATRIX_TURTLE_SCHOOL') || 'Turtle School', '7'],[Facilino.locales.getKey('LANG_LED_MATRIX_BAT') || 'Bat', '8'],[Facilino.locales.getKey('LANG_LED_MATRIX_MASK') || 'BatMask', '9'],[Facilino.locales.getKey('LANG_LED_MATRIX_DEATH_STAR') || 'Death Star', '10'],[Facilino.locales.getKey('LANG_LED_MATRIX_LIGHT_SABER') || 'Light saber', '11'],[Facilino.locales.getKey('LANG_LED_MATRIX_WONDER_WOMAN') || 'Wonder Woman', '12'],[Facilino.locales.getKey('LANG_LED_MATRIX_STAR') || 'Star', '13'],[Facilino.locales.getKey('LANG_LED_MATRIX_CREEPER') || 'Creeper', '14'],[Facilino.locales.getKey('LANG_LED_MATRIX_SWORD') || 'Sword', '15'],[Facilino.locales.getKey('LANG_LED_MATRIX_MINION_EYE') || 'Minion Eye', '16'],[Facilino.locales.getKey('LANG_LED_MATRIX_SPIDER') || 'Spider', '17'],[Facilino.locales.getKey('LANG_LED_MATRIX_POKEBALL') || 'Pokeball', '18']]);
				this.appendDummyInput('EXPR_INPUT').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/dot-matrix.png", 24*options.zoom, 24*options.zoom, "*")).appendField(this.expr, 'EXPRESSION').appendField(new Blockly.FieldImage('img/blocks/angry.png', 20*options.zoom, 20*options.zoom),'EXPR').setAlign(Blockly.ALIGN_RIGHT);
				this.checkExpr();
				this.last_expr = this.getFieldValue('EXPRESSION');
		//this.appendDummyInput('EXPR').appendField(new Blockly.FieldImage('img/blocks/angry.png', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/happy.png', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/dissapointment.png', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/love.png', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/shocked.png', 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setOutput(true,'Expression');
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setTooltip(Facilino.locales.getKey('LANG_LED_MATRIX_PREDEF_TOOLTIP'));
			},
			default_inputs: function()
			{
				var expr_blocks=[];
				Blockly.Blocks.dyor_predef_expression1.expressions.forEach((element,index) =>{ expr_blocks.push('<field name="EXPRESSION">'+element[1]+'</field>');});
				return expr_blocks;
			},
		checkExpr: function() {
		var _expr = this.getFieldValue('EXPRESSION');
				if ( _expr === '1') {
					this.setFieldValue(Facilino.path+'img/blocks/angry.png','EXPR');
				} else if ( _expr === '2') {
					this.setFieldValue(Facilino.path+'img/blocks/happy.png','EXPR');
				} else if ( _expr === '3') {
					this.setFieldValue(Facilino.path+'img/blocks/dissapointment.png','EXPR');
				}
				else if ( _expr === '4') {
					this.setFieldValue(Facilino.path+'img/blocks/love.png','EXPR');
				}
				else if ( _expr === '5') {
					this.setFieldValue(Facilino.path+'img/blocks/shocked.png','EXPR');
				}
				else if ( _expr === '6') {
					this.setFieldValue(Facilino.path+'img/blocks/Dragonball.svg','EXPR');
				}
				else if ( _expr === '7') {
					this.setFieldValue(Facilino.path+'img/blocks/Turtle_School_Symbol.svg','EXPR');
				}
				else if ( _expr === '8') {
					this.setFieldValue(Facilino.path+'img/blocks/batman-logo.svg','EXPR');
				}
				else if ( _expr === '9') {
					this.setFieldValue(Facilino.path+'img/blocks/batman-mask.svg','EXPR');
				}
				else if ( _expr === '10') {
					this.setFieldValue(Facilino.path+'img/blocks/death-star.svg','EXPR');
				}
				else if ( _expr === '11') {
					this.setFieldValue(Facilino.path+'img/blocks/light-saber.svg','EXPR');
				}
				else if ( _expr === '12') {
					this.setFieldValue(Facilino.path+'img/blocks/wonder-woman.svg','EXPR');
				}
				else if ( _expr === '13') {
					this.setFieldValue(Facilino.path+'img/blocks/star.svg','EXPR');
				}
				else if ( _expr === '14') {
					this.setFieldValue(Facilino.path+'img/blocks/minecraft.svg','EXPR');
				}
				else if ( _expr === '15') {
					this.setFieldValue(Facilino.path+'img/blocks/sword.png','EXPR');
				}
				else if ( _expr === '16') {
					this.setFieldValue(Facilino.path+'img/blocks/minion.svg','EXPR');
				}
				else if ( _expr === '17') {
					this.setFieldValue(Facilino.path+'img/blocks/spiderman.svg','EXPR');
				}
				else if ( _expr === '18') {
					this.setFieldValue(Facilino.path+'img/blocks/pokeball.svg','EXPR');
				}
			},
			onchange: function() {
				if (this.getFieldValue('EXPRESSION') !== this.last_expr) {
					this.checkExpr();
					this.last_expr = this.getFieldValue('EXPRESSION');
				}
			}
		};

		Blockly.Arduino.dyor_drawing_icons1 = function() {
		var str = this.getFieldValue('ICON');
		//var dropdown_configuration = this.getFieldValue('CONFIGURATION') || '';
		var row1,row2,row3,row4,row5,row6,row7,row8;
		var col1,col2,col3,col4,col5,col6,col7,col8;
		var code='';
		row1=parseInt(str.substr(0,2) || '00',16);
		row2=parseInt(str.substr(2,2) || '00',16);
		row3=parseInt(str.substr(4,2) || '00',16);
		row4=parseInt(str.substr(6,2) || '00',16);
		row5=parseInt(str.substr(8,2) || '00',16);
		row6=parseInt(str.substr(10,2) || '00',16);
		row7=parseInt(str.substr(12,2) || '00',16);
		row8=parseInt(str.substr(14,2) || '00',16);
		col1 = ((row1%2)<1? 0 : 1) + ((row2%2)<1? 0 : 2) + ((row3%2)<1? 0 : 4) + ((row4%2)<1? 0 : 8) + ((row5%2)<1? 0 : 16) + ((row6%2)<1? 0 : 32) + ((row7%2)<1? 0 : 64) + ((row8%2)<1? 0 : 128);
		col2 = ((row1%4)<2? 0 : 1) + ((row2%4)<2? 0 : 2) + ((row3%4)<2? 0 : 4) + ((row4%4)<2? 0 : 8) + ((row5%4)<2? 0 : 16) + ((row6%4)<2? 0 : 32) + ((row7%4)<2? 0 : 64) + ((row8%4)<2? 0 : 128);
		col3 = ((row1%8)<4? 0 : 1) + ((row2%8)<4? 0 : 2) + ((row3%8)<4? 0 : 4) + ((row4%8)<4? 0 : 8) + ((row5%8)<4? 0 : 16) + ((row6%8)<4? 0 : 32) + ((row7%8)<4? 0 : 64) + ((row8%8)<4? 0 : 128);
		col4 = ((row1%16)<8? 0 : 1) + ((row2%16)<8? 0 : 2) + ((row3%16)<8? 0 : 4) + ((row4%16)<8? 0 : 8) + ((row5%16)<8? 0 : 16) + ((row6%16)<8? 0 : 32) + ((row7%16)<8? 0 : 64) + ((row8%16)<8? 0 : 128);
		col5 = ((row1%32)<16? 0 : 1) + ((row2%32)<16? 0 : 2) + ((row3%32)<16? 0 : 4) + ((row4%32)<16? 0 : 8) + ((row5%32)<16? 0 : 16) + ((row6%32)<16? 0 : 32) + ((row7%32)<16? 0 : 64) + ((row8%32)<16? 0 : 128);
		col6 = ((row1%64)<32? 0 : 1) + ((row2%64)<32? 0 : 2) + ((row3%64)<32? 0 : 4) + ((row4%64)<32? 0 : 8) + ((row5%64)<32? 0 : 16) + ((row6%64)<32? 0 : 32) + ((row7%64)<32? 0 : 64) + ((row8%64)<32? 0 : 128);
		col7 = ((row1%128)<64? 0 : 1) + ((row2%128)<64? 0 : 2) + ((row3%128)<64? 0 : 4) + ((row4%128)<64? 0 : 8) + ((row5%128)<64? 0 : 16) + ((row6%128)<64? 0 : 32) + ((row7%128)<64? 0 : 64) + ((row8%128)<64? 0 : 128);
		col8 = (row1<128? 0 : 1) + (row2<128? 0 : 2) + (row3<128? 0 : 4) + (row4<128? 0 : 8) + (row5<128? 0 : 16) + (row6<128? 0 : 32) + (row7<128? 0 : 64) + (row8<128? 0 : 128);
		col1 = Facilino.pad(col1.toString(16),0,2);
		col2 = Facilino.pad(col2.toString(16),0,2);
		col3 = Facilino.pad(col3.toString(16),0,2);
		col4 = Facilino.pad(col4.toString(16),0,2);
		col5 = Facilino.pad(col5.toString(16),0,2);
		col6 = Facilino.pad(col6.toString(16),0,2);
		col7 = Facilino.pad(col7.toString(16),0,2);
		col8 = Facilino.pad(col8.toString(16),0,2);
		str = col1+col2+col3+col4+col5+col6+col7+col8;
		row1=parseInt(str.substr(0,2) || '00',16);
		row2=parseInt(str.substr(2,2) || '00',16);
		row3=parseInt(str.substr(4,2) || '00',16);
		row4=parseInt(str.substr(6,2) || '00',16);
		row5=parseInt(str.substr(8,2) || '00',16);
		row6=parseInt(str.substr(10,2) || '00',16);
		row7=parseInt(str.substr(12,2) || '00',16);
		row8=parseInt(str.substr(14,2) || '00',16);
		code = row1 + ',' + row2 + ','+ row3 + ','+ row4 + ','+ row5 + ','+ row6 + ','+ row7 + ','+ row8;

		return [code, Blockly.Arduino.ORDER_ATOMIC];
	};

	Blockly.Blocks.dyor_drawing_icons1 = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MAX7219'),
			tags: ['led_matrix','screen'],
			helpUrl: Facilino.getHelpUrl('dyor_drawing_icons1'),
			examples: ['dyor_generic_expression_icons_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LEDMATRIX,
			keys: ['LANG_LED_MATRIX_DRAWING_ICONS_NAME','LANG_LED_MATRIX_DRAWING_NO_CONNECTION','LANG_LED_MATRIX_DRAWING_POOR_CONNECTION','LANG_LED_MATRIX_DRAWING_GOOD_CONNECTION','LANG_LED_MATRIX_DRAWING_EXCELLECT_CONNECTION','LANG_LED_MATRIX_DRAWING_NO_BATTERY','LANG_LED_MATRIX_DRAWING_LOW_BATTERY','LANG_LED_MATRIX_DRAWING_MEDIUM_BATTERY','LANG_LED_MATRIX_DRAWING_FULL_BATTERY','LANG_LED_MATRIX_DRAWING_CORRECT','LANG_LED_MATRIX_DRAWING_WRONG','LANG_LED_MATRIX_DRAWING_ARROW_UP','LANG_LED_MATRIX_DRAWING_ARROW_DOWN','LANG_LED_MATRIX_DRAWING_ARROW_RIGHT','LANG_LED_MATRIX_DRAWING_ARROW_LEFT','LANG_LED_MATRIX_DRAWING_TRIANGLE_UP','LANG_LED_MATRIX_DRAWING_TRIANGLE_DOWN','LANG_LED_MATRIX_DRAWING_TRIANGLE_RIGHT','LANG_LED_MATRIX_DRAWING_TRIANGLE_LEFT','LANG_LED_MATRIX_DRAWING_SMILE','LANG_LED_MATRIX_DRAWING_DIAMOND','LANG_LED_MATRIX_DRAWING_CROSS','LANG_LED_MATRIX_DRAWING_SPADE','LANG_LED_MATRIX_DRAWING_CIRCLE_FULL','LANG_LED_MATRIX_DRAWING_CIRCLE','LANG_LED_MATRIX_DRAWING_MALE','LANG_LED_MATRIX_DRAWING_FEMALE','LANG_LED_MATRIX_DRAWING_NOTE','LANG_LED_MATRIX_DRAWING_NOTES','LANG_LED_MATRIX_DRAWING_SNOW','LANG_LED_MATRIX_DRAWING_ARROW_UP_DOWN','LANG_LED_MATRIX_DRAWING_ARROW_LEFT_RIGHT','LANG_LED_MATRIX_DRAWING_ICONS_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ICONS_NAME'),
			expressions: [
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NO_CONNECTION'),'0100000000000000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_POOR_CONNECTION'),'0504040000000000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_GOOD_CONNECTION'),'1514141010000000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_EXCELLECT_CONNECTION'),'5554545050404000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NO_BATTERY'),'3f21212121212121'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_LOW_BATTERY'),'3f212d2121212121'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_MEDIUM_BATTERY'),'3f212d212d212121'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_FULL_BATTERY'),'3f212d212d212d21'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CORRECT'),'00040a1120408000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_WRONG'),'0042241818244200'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_UP'),'383838fe7c381000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_DOWN'),'10387cfe38383800'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_RIGHT'),'10307efe7e301000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_LEFT'),'1018fcfefc181000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_UP'),'fefe7c7c38381000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_DOWN'),'1038387c7cfefe00'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_RIGHT'),'061e7efe7e1e0600'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_LEFT'),'c0f0fcfefcf0c000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SMILE'),'7c92aa82aa827c00'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_DIAMOND'),'183c7effff7e3c18'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CROSS'),'3c185aff5a183c18'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SPADE'),'38107cfe7c381000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CIRCLE_FULL'),'3c7effffffff7e3c'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CIRCLE'),'3c4281818181423c'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_MALE'),'0c12129ca0c0f000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_FEMALE'),'081c08081c22221c'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NOTE'),'060e0c0808281800'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NOTES'),'066eecc88898f000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SNOW'),'105438ee38541000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_UP_DOWN'),'1038541054381000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_LEFT_RIGHT'),'002844fe44280000']
				],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDMATRIX);
				this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/dot-matrix.png", 24*options.zoom, 24*options.zoom, "*")).appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NO_CONNECTION'),'0100000000000000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_POOR_CONNECTION'),'0504040000000000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_GOOD_CONNECTION'),'1514141010000000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_EXCELLECT_CONNECTION'),'5554545050404000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NO_BATTERY'),'3f21212121212121'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_LOW_BATTERY'),'3f212d2121212121'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_MEDIUM_BATTERY'),'3f212d212d212121'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_FULL_BATTERY'),'3f212d212d212d21'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CORRECT'),'00040a1120408000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_WRONG'),'0042241818244200'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_UP'),'383838fe7c381000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_DOWN'),'10387cfe38383800'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_RIGHT'),'10307efe7e301000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_LEFT'),'1018fcfefc181000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_UP'),'fefe7c7c38381000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_DOWN'),'1038387c7cfefe00'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_RIGHT'),'061e7efe7e1e0600'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_LEFT'),'c0f0fcfefcf0c000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SMILE'),'7c92aa82aa827c00'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_DIAMOND'),'183c7effff7e3c18'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CROSS'),'3c185aff5a183c18'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SPADE'),'38107cfe7c381000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CIRCLE_FULL'),'3c7effffffff7e3c'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CIRCLE'),'3c4281818181423c'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_MALE'),'0c12129ca0c0f000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_FEMALE'),'081c08081c22221c'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NOTE'),'060e0c0808281800'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NOTES'),'066eecc88898f000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SNOW'),'105438ee38541000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_UP_DOWN'),'1038541054381000'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_LEFT_RIGHT'),'002844fe44280000']
				]), 'ICON').setAlign(Blockly.ALIGN_RIGHT);
				//this.appendValueInput('NEXT').setCheck('Expression').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
		this.setOutput(true,'Expression');
			this.setTooltip(Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ICONS_TOOLTIP'));
			},
			default_inputs: function()
			{
				var expr_blocks=[];
				Blockly.Blocks.dyor_drawing_icons1.expressions.forEach((element,index) =>{ expr_blocks.push('<field name="ICON">'+element[1]+'</field>');});
				return expr_blocks;
			}
		};
	
	};
		
		
	var FacilinoLEDMatrix = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoLEDMatrix;
	} else {
		window.FacilinoLEDMatrix = FacilinoLEDMatrix;
	}
}));
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		Blockly.Arduino.tft_160x128_def = function() {
			var cs, rst, dc;
			cs = Blockly.Arduino.valueToCode(this, 'CS_PIN', Blockly.Arduino.ORDER_NONE);
			rst = Blockly.Arduino.valueToCode(this, 'RST_PIN', Blockly.Arduino.ORDER_NONE);
			dc = Blockly.Arduino.valueToCode(this, 'DC_PIN', Blockly.Arduino.ORDER_NONE);
			//mosi = Blockly.Arduino.valueToCode(this, 'MOSI_PIN', Blockly.Arduino.ORDER_NONE);
			//clk = Blockly.Arduino.valueToCode(this, 'CLK_PIN', Blockly.Arduino.ORDER_NONE);
			var dropdown_configuration = this.getFieldValue('CONFIGURATION') || '0';
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>';
			Blockly.Arduino.definitions_['define_adafruit_st7735'] ='#include <Adafruit_ST7735.h>';
			Blockly.Arduino.definitions_['declare_var_tft']= 'Adafruit_ST7735 _tft=Adafruit_ST7735('+cs+','+dc+','+rst+');\n';
			Blockly.Arduino.setups_['setup_tft_'] = '_tft.initR(INITR_BLACKTAB);\n  _tft.fillScreen(ST77XX_BLACK);\n_tft.setRotation('+dropdown_configuration+');\n';			
			return '';
		};

		Blockly.Blocks.tft_160x128_def = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TFT'),
			tags: ['tft','screen'],
			helpUrl: Facilino.getHelpUrl('tft_160x128_def'),
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			keys: ['LANG_TFT_DEF_NAME','LANG_TFT_DEF_CS_PIN','LANG_TFT_DEF_RST_PIN','LANG_TFT_DEF_DC_PIN','LANG_TFT_DEF_MOSI_PIN','LANG_TFT_VERTICAL','LANG_TFT_HORIZONTAL','LANG_TFT_VERTICAL_180','LANG_TFT_HORIZONTAL_180'],//,'LANG_TFT_DEF_CLK_PIN','LANG_TFT_DEF_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_TFT_DEF_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_TFT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_DEF_NAME')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tft_screen.svg',104*options.zoom,48*options.zoom));
				this.appendValueInput('CS_PIN').appendField(Facilino.locales.getKey('LANG_TFT_DEF_CS_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin',Number]);
				this.appendValueInput('RST_PIN').appendField(Facilino.locales.getKey('LANG_TFT_DEF_RST_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin',Number]);
				this.appendValueInput('DC_PIN').appendField(Facilino.locales.getKey('LANG_TFT_DEF_DC_PIN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin',Number]);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([
						[Facilino.locales.getKey('LANG_TFT_VERTICAL'), '0'],
				[Facilino.locales.getKey('LANG_TFT_HORIZONTAL'), '1'] ,
				[Facilino.locales.getKey('LANG_TFT_VERTICAL_180'), '2'],
				[Facilino.locales.getKey('LANG_TFT_HORIZONTAL_180'), '3']]), "CONFIGURATION").setAlign(Blockly.ALIGN_RIGHT);				
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_TFT_DEF_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="CS_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="RST_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="RST_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>2)
					xml+='<value name="DC_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[2][1]+'</field></shadow></value>';
				else
					xml+='<value name="DC_PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				return xml;					
			},
			isNotDuplicable: true
		};
		
		Blockly.Arduino.tft_160x128_fill_screen = function()
		{
			var code='';
			var input_color = this.getFieldValue('COLOR');
			
			var color_rgb=Facilino.rgb565(input_color);
			code+='_tft.fillScreen('+color_rgb+');\n';
			return code;
		};

			Blockly.Blocks.tft_160x128_fill_screen = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TFT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  helpUrl: Facilino.getHelpUrl('tft_160x128_fill_screen'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_TFT_FILL_SCREEN_NAME','LANG_TFT_FILL_SCREEN','LANG_TFT_COLOR','LANG_TFT_FILL_SCREEN_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_TFT_DRAW_PIXEL_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_FILL_SCREEN')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tft_screen.svg',52*options.zoom,24*options.zoom));
				var colour = new Blockly.FieldColour('#000000');
				colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).
				setColumns(4);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_COLOR')).appendField(colour,'COLOR').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setOutput(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_TFT);
				this.setTooltip(Facilino.locales.getKey('LANG_TFT_FILL_SCREEN_TOOLTIP'));
			  }
		};
		
		
		Blockly.Arduino.tft_160x128_set_text = function()
		{
			var code='';
			var text= Blockly.Arduino.valueToCode(this,'TEXT', Blockly.Arduino.ORDER_ATOMIC);
			var x= Blockly.Arduino.valueToCode(this,'X', Blockly.Arduino.ORDER_ATOMIC);
			var y= Blockly.Arduino.valueToCode(this,'Y', Blockly.Arduino.ORDER_ATOMIC);
			var s= this.getFieldValue('SIZE');
			var input_color = this.getFieldValue('COLOR');
			var wrap = this.getFieldValue('WRAP');
			
			var color_rgb=Facilino.rgb565(input_color);
			code+='_tft.setCursor('+x+','+y+');\n';
			code+='_tft.setTextColor('+color_rgb+');\n';
			if (wrap==='TRUE')
			{
				code+='_tft.setTextWrap(true);\n';
			}
			else
			{
				code+='_tft.setTextWrap(false);\n';
			}
			code+='_tft.setTextSize('+s+');\n';			
			code+='_tft.print('+text+');\n';
			return code;
		};

			Blockly.Blocks.tft_160x128_set_text = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TFT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  helpUrl: Facilino.getHelpUrl('tft_160x128_set_text'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_TFT_SET_TEXT_NAME','LANG_TFT_SET_TEXT','LANG_TFT_TEXT','LANG_TFT_SET_COORDINATE_X','LANG_TFT_SET_COORDINATE_Y','LANG_TFT_SET_TEXT_SIZE','LANG_TFT_COLOR','LANG_TFT_WRAP','LANG_TFT_SET_TEXT_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_TFT_SET_TEXT_NAME'),
			  init: function() {
				this.appendValueInput('TEXT').appendField(Facilino.locales.getKey('LANG_TFT_SET_TEXT')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tft_screen.svg',52*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_TFT_TEXT')).setCheck([String,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('X').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_SET_TEXT_SIZE')).appendField(new Blockly.FieldDropdown([['1','1'],['2','2'],['3','3']]),'SIZE').setAlign(Blockly.ALIGN_RIGHT);
				var colour = new Blockly.FieldColour('#000000');
				colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).
				setColumns(4);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_COLOR')).appendField(colour,'COLOR').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_WRAP')).appendField(new Blockly.FieldCheckbox('FALSE'),'WRAP').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setOutput(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_TFT);
				this.setTooltip(Facilino.locales.getKey('LANG_TFT_SET_TEXT_TOOLTIP'));
			  },
			  default_inputs: function()
			  {
				  return '<value name="TEXT"><shadow type="text"><field name="TEXT"></field></shadow></value><value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			  }
		};
		
		Blockly.Arduino.tft_160x128_draw_pixel = function()
		{
			var code='';
			var x= Blockly.Arduino.valueToCode(this,'X', Blockly.Arduino.ORDER_ATOMIC);
			var y= Blockly.Arduino.valueToCode(this,'Y', Blockly.Arduino.ORDER_ATOMIC);
			var input_color = this.getFieldValue('COLOR');
			
			var color_rgb=Facilino.rgb565(input_color);
			code+='_tft.drawPixel('+x+','+y+','+color_rgb+');\n';
			return code;
		};

			Blockly.Blocks.tft_160x128_draw_pixel = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TFT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  helpUrl: Facilino.getHelpUrl('tft_160x128_draw_pixel'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_TFT_DRAW_PIXEL_NAME','LANG_TFT_DRAW_PIXEL','LANG_TFT_SET_COORDINATE_X','LANG_TFT_SET_COORDINATE_Y','LANG_TFT_COLOR','LANG_TFT_DRAW_PIXEL_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_TFT_DRAW_PIXEL_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_DRAW_PIXEL')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tft_screen.svg',52*options.zoom,24*options.zoom));
				this.appendValueInput('X').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				var colour = new Blockly.FieldColour('#000000');
				colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).
				setColumns(4);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_COLOR')).appendField(colour,'COLOR').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(true);
				this.setOutput(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_TFT);
				this.setTooltip(Facilino.locales.getKey('LANG_TFT_DRAW_PIXEL_TOOLTIP'));
			  },
			  default_inputs: function()
			  {
				  return '<value name="X"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			  }
		};
		
		Blockly.Arduino.tft_160x128_draw_line = function()
		{
			var code='';
			var x0= Blockly.Arduino.valueToCode(this,'X0', Blockly.Arduino.ORDER_ATOMIC);
			var y0= Blockly.Arduino.valueToCode(this,'Y0', Blockly.Arduino.ORDER_ATOMIC);
			var x1= Blockly.Arduino.valueToCode(this,'X1', Blockly.Arduino.ORDER_ATOMIC);
			var y1= Blockly.Arduino.valueToCode(this,'Y1', Blockly.Arduino.ORDER_ATOMIC);
			var input_color = this.getFieldValue('COLOR');
			var color_rgb=Facilino.rgb565(input_color);
			code+='_tft.drawLine('+x0+','+y0+','+x1+','+y1+','+color_rgb+');\n';
			return code;
		};

		Blockly.Blocks.tft_160x128_draw_line = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TFT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  helpUrl: Facilino.getHelpUrl('tft_160x128_draw_line'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_TFT_LINE_NAME','LANG_TFT_LINE','LANG_TFT_SET_COORDINATE_X','LANG_TFT_SET_COORDINATE_Y','LANG_TFT_COLOR','LANG_TFT_LINE_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_TFT_LINE_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_LINE')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tft_screen.svg',52*options.zoom,24*options.zoom));
				this.appendValueInput('X0').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y0').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('X1').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_X')+'1').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y1').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_Y')+'1').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				var colour = new Blockly.FieldColour('#000000');
				colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).
				setColumns(4);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_COLOR')).appendField(colour,'COLOR').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_TFT);
				this.setTooltip(Facilino.locales.getKey('LANG_TFT_LINE_TOOLTIP'));
			  },
			  default_inputs: function()
			  {
				  return '<value name="X0"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y0"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="X1"><shadow type="math_number"><field name="NUM">159</field></shadow></value><value name="Y1"><shadow type="math_number"><field name="NUM">127</field></shadow></value>';
			  }
		};
		
		Blockly.Arduino.tft_160x128_draw_rect = function()
		{
			var code='';
			var x0= Blockly.Arduino.valueToCode(this,'X0', Blockly.Arduino.ORDER_ATOMIC);
			var y0= Blockly.Arduino.valueToCode(this,'Y0', Blockly.Arduino.ORDER_ATOMIC);
			var w= Blockly.Arduino.valueToCode(this,'W', Blockly.Arduino.ORDER_ATOMIC);
			var h= Blockly.Arduino.valueToCode(this,'H', Blockly.Arduino.ORDER_ATOMIC);
			var input_color = this.getFieldValue('COLOR');
			var fill = this.getFieldValue('FILL');
			var color_rgb=Facilino.rgb565(input_color);
			if (fill==='FALSE')
			{
				code+='_tft.drawRect('+x0+','+y0+','+w+','+h+','+color_rgb+');\n';
			}
			else
			{
				code+='_tft.fillRect('+x0+','+y0+','+w+','+h+','+color_rgb+');\n';
			}
			return code;
		};

		Blockly.Blocks.tft_160x128_draw_rect = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TFT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  helpUrl: Facilino.getHelpUrl('tft_160x128_draw_rect'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_TFT_RECT_NAME','LANG_TFT_RECT','LANG_TFT_FILL','LANG_TFT_SET_COORDINATE_X','LANG_TFT_SET_COORDINATE_Y','LANG_TFT_SET_COORDINATE_WIDTH','LANG_TFT_SET_COORDINATE_HEIGHT','LANG_TFT_COLOR','LANG_TFT_RECT_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_TFT_RECT_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_RECT')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tft_screen.svg',52*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_TFT_FILL')).appendField(new Blockly.FieldCheckbox('FALSE'),'FILL');
				this.appendValueInput('X0').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y0').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('W').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_WIDTH')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('H').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_HEIGHT')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				var colour = new Blockly.FieldColour('#000000');
				colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).
				setColumns(4);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_COLOR')).appendField(colour,'COLOR').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_TFT);
				this.setTooltip(Facilino.locales.getKey('LANG_TFT_RECT_TOOLTIP'));
			  },
			  default_inputs: function()
			  {
				  return '<value name="X0"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y0"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="W"><shadow type="math_number"><field name="NUM">160</field></shadow></value><value name="H"><shadow type="math_number"><field name="NUM">128</field></shadow></value>';
			  }
		};
		
		Blockly.Arduino.tft_160x128_draw_circle = function()
		{
			var code='';
			var x0= Blockly.Arduino.valueToCode(this,'X0', Blockly.Arduino.ORDER_ATOMIC);
			var y0= Blockly.Arduino.valueToCode(this,'Y0', Blockly.Arduino.ORDER_ATOMIC);
			var r= Blockly.Arduino.valueToCode(this,'R', Blockly.Arduino.ORDER_ATOMIC);
			var input_color = this.getFieldValue('COLOR');
			var fill = this.getFieldValue('FILL');
			var color_rgb=Facilino.rgb565(input_color);
			if (fill==='FALSE')
			{
				code+='_tft.drawCircle('+x0+','+y0+','+r+','+color_rgb+');\n';
			}
			else
			{
				code+='_tft.fillCircle('+x0+','+y0+','+r+','+color_rgb+');\n';
			}
			return code;
		};

		Blockly.Blocks.tft_160x128_draw_circle = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TFT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  helpUrl: Facilino.getHelpUrl('tft_160x128_draw_circle'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_TFT_CIRCLE_NAME','LANG_TFT_CIRCLE','LANG_TFT_FILL','LANG_TFT_SET_COORDINATE_X','LANG_TFT_SET_COORDINATE_Y','LANG_TFT_RADIUS','LANG_TFT_COLOR','LANG_TFT_CIRCLE_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_TFT_CIRCLE_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_CIRCLE')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tft_screen.svg',52*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_TFT_FILL')).appendField(new Blockly.FieldCheckbox('FALSE'),'FILL');
				this.appendValueInput('X0').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y0').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('R').appendField(Facilino.locales.getKey('LANG_TFT_RADIUS')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				var colour = new Blockly.FieldColour('#000000');
				colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).
				setColumns(4);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_COLOR')).appendField(colour,'COLOR').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_TFT);
				this.setTooltip(Facilino.locales.getKey('LANG_TFT_CIRCLE_TOOLTIP'));
			  },
			  default_inputs: function()
			  {
				  return '<value name="X0"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y0"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="R"><shadow type="math_number"><field name="NUM">20</field></shadow></value>';
			  }
		};
		
		Blockly.Arduino.tft_160x128_draw_triangle = function()
		{
			var code='';
			var x0= Blockly.Arduino.valueToCode(this,'X0', Blockly.Arduino.ORDER_ATOMIC);
			var y0= Blockly.Arduino.valueToCode(this,'Y0', Blockly.Arduino.ORDER_ATOMIC);
			var x1= Blockly.Arduino.valueToCode(this,'X1', Blockly.Arduino.ORDER_ATOMIC);
			var y1= Blockly.Arduino.valueToCode(this,'Y1', Blockly.Arduino.ORDER_ATOMIC);
			var x2= Blockly.Arduino.valueToCode(this,'X2', Blockly.Arduino.ORDER_ATOMIC);
			var y2= Blockly.Arduino.valueToCode(this,'Y2', Blockly.Arduino.ORDER_ATOMIC);
			var input_color = this.getFieldValue('COLOR');
			var fill = this.getFieldValue('FILL');
			var color_rgb=Facilino.rgb565(input_color);
			if (fill==='FALSE')
			{
				code+='_tft.drawTriangle('+x0+','+y0+','+x1+','+y1+','+x2+','+y2+','+color_rgb+');\n';
			}
			else
			{
				code+='_tft.fillTriangle('+x0+','+y0+','+x1+','+y1+','+x2+','+y2+','+color_rgb+');\n';
			}
			return code;
		};

		Blockly.Blocks.tft_160x128_draw_triangle = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TFT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  helpUrl: Facilino.getHelpUrl('tft_160x128_draw_triangle'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_TFT_TRIANGLE_NAME','LANG_TFT_TRIANGLE','LANG_TFT_FILL','LANG_TFT_SET_COORDINATE_X','LANG_TFT_SET_COORDINATE_Y','LANG_TFT_COLOR','LANG_TFT_TRIANGLE_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_TFT_TRIANGLE_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_TRIANGLE')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tft_screen.svg',52*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_TFT_FILL')).appendField(new Blockly.FieldCheckbox('FALSE'),'FILL');
				this.appendValueInput('X0').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y0').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('X1').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_X')+'1').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y1').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_Y')+'1').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('X2').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_X')+'2').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y2').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_Y')+'2').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				var colour = new Blockly.FieldColour('#000000');
				colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).
				setColumns(4);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_COLOR')).appendField(colour,'COLOR').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_TFT);
				this.setTooltip(Facilino.locales.getKey('LANG_TFT_TRIANGLE_TOOLTIP'));
			  },
			  default_inputs: function()
			  {
				  return '<value name="X0"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y0"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="X1"><shadow type="math_number"><field name="NUM">127</field></shadow></value><value name="Y1"><shadow type="math_number"><field name="NUM">80</field></shadow></value><value name="X2"><shadow type="math_number"><field name="NUM">64</field></shadow></value><value name="Y2"><shadow type="math_number"><field name="NUM">159</field></shadow></value>';
			  }
		};
		
		Blockly.Arduino.tft_160x128_draw_icon = function()
		{
			var code='';
			var x0= Blockly.Arduino.valueToCode(this,'X0', Blockly.Arduino.ORDER_ATOMIC);
			var y0= Blockly.Arduino.valueToCode(this,'Y0', Blockly.Arduino.ORDER_ATOMIC);
			var image= Blockly.Arduino.valueToCode(this,'IMAGE', Blockly.Arduino.ORDER_ATOMIC);
			var block = this.getInputTargetBlock('IMAGE');
			var input_color = this.getFieldValue('COLOR');
			var color_rgb=Facilino.rgb565(input_color);
			var image_name = '';
			if (block!==null)
			{
				if (block.type==='tft_160x128_icon')
					image_name = this.getInputTargetBlock('IMAGE').getFieldValue('ICON').toLowerCase();
				else if (block.type==='tft_160x128_image_browse')
				{
					image_name = 'custom'+block.NumImages;
					var image_data = JSON.parse(block.data);
					if ((image_data.width!==16)&&(image_data.height!==16))
						this.setWarningText('Incorrect image size');
					else
						this.setWarningText(null);
				}
			}
			if (image_name!=='')
				Blockly.Arduino.definitions_['declare_var_display_'+image_name]='const unsigned char _display_'+image_name+'[] PROGMEM = {'+image+'};\n';
			
			code+='_tft.drawBitmap('+x0+','+y0+',_display_'+image_name+',16,16,'+color_rgb+');\n';			
			return code;
		};

		Blockly.Blocks.tft_160x128_draw_icon = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TFT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  helpUrl: Facilino.getHelpUrl('tft_160x128_draw_triangle'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_TFT_ICON_NAME','LANG_TFT_ICON','LANG_TFT_SET_COORDINATE_X','LANG_TFT_SET_COORDINATE_Y','LANG_TFT_COLOR','LANG_TFT_ICON_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_TFT_ICON_NAME'),
			  init: function() {
				this.appendValueInput('IMAGE').appendField(Facilino.locales.getKey('LANG_TFT_ICON')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tft_screen.svg',52*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('X0').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y0').appendField(Facilino.locales.getKey('LANG_TFT_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				var colour = new Blockly.FieldColour('#000000');
				colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).
				setColumns(4);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_TFT_COLOR')).appendField(colour,'COLOR').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_TFT);
				this.setTooltip(Facilino.locales.getKey('LANG_TFT_ICON_TOOLTIP'));
			  },
			  default_inputs: function()
			  {
				  return '<value name="IMAGE"><shadow type="tft_160x128_icon"></shadow></value><value name="X0"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="Y0"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			  }
		};
		
		
		Blockly.Arduino.tft_160x128_icon = function()
		{
			var str = this.getFieldValue('ICON');
			var data='';
			if (str==='HOME')
				data='07E00FF01FF83FFC7FFEFFFFC003C003C003CFF3CFF3CC33CC33CC33FC3FFC3F';
			else if (str==='ARROWUP')
				data='018003C007E00FF01E783C3C781EFC3FFC3F7C3E1C381C381C381FF81FF80FF0';
			else if (str==='ARROWDOWN')
				data='0FF01FF81FF81C381C381C387C3EFC3FFC3F781E3C3C1E780FF007E003C00180';
			else if (str==='ARROWLEFT')
				data='018003C007C00FFE1FFF3DFF7807F007F00778073DFF1FFF0FFE07C003C00180';
			else if (str==='ARROWRIGHT')
				data='018003C003E07FF0FFF8FFBCE01EE00FE00FE01EFFBCFFF87FF003E003C00180';
			else if (str==='BAT0')
				data='0000000000003FF87FFCFFFEE006E007E007E006FFFE7FFC3FF8000000000000';
			else if (str==='BAT1')
				data='0000000000003FF87FFCFFFEEC06EC07EC07EC06FFFE7FFC3FF8000000000000';
			else if (str==='BAT2')
				data='0000000000003FF87FFCFFFEED86ED87ED87ED86FFFE7FFC3FF8000000000000';
			else if (str==='BAT3')
				data='0000000000003FF87FFCFFFEEDB6EDB7EDB7EDB6FFFE7FFC3FF8000000000000';
			else if (str==='BAT4')
				data='0000000000003FF87FFCFFFEE006E067E7F7E306FFFE7FFC3FF8000000000000';
			else if (str==='BLUETOOTH')
				data='0000018001C0016009300D30076003C0018003C007600D300930016001C00180';
			else if (str==='BULB')
				data='000003E004100808100410041004100410040808041003E0022003E0022003E0';
			else if (str==='BULBON')
				data='000023E214140808100410041004100410040808141423E2022003E0022003E0';
			else if (str==='BULBOFF')
				data='000003E007F00FF81FFC1FFC1FFC1FFC1FFC0FF8041003E0022003E0022003E0';
			else if (str==='BULLET')
				data='000000000000000003800FE00FE01FF01FF01FF00FE00FE00380000000000000';
			else if (str==='CANCEL')
				data='00000000380E3C1E3E3E1F7C0FF807F003E007F00FF81F7C3E3E3C1E380E0000';
			else if (str==='CHECK')
				data='00000000000000000007000F001F703E787C7CF81FF00FE007C0038000000000';
			else if (str==='FILL1')
				data='00000000000000000000000000000000000000000000000000007FFE7FFE7FFE';
			else if (str==='FILL2')
				data='0000000000000000000000000000000000007FFE7FFE7FFE00007FFE7FFE7FFE';
			else if (str==='FILL3')
				data='000000000000000000007FFE7FFE7FFE00007FFE7FFE7FFE00007FFE7FFE7FFE';
			else if (str==='FILL4')
				data='00007FFE7FFE7FFE00007FFE7FFE7FFE00007FFE7FFE7FFE00007FFE7FFE7FFE';
			else if (str==='SPEAK')
				data='3FFC7FFEFFFFF00FE007E007E007E007E007E007F00FF1FE7BFC3FF81E000C00';
			else if (str==='HEART')
				data='000000003C787EFCFFFEFFFEFFFEFFFE7FFC7FFC3FF81FF00FE007C003800100';
			else if (str==='NOCONN')
				data='000003E00FF81FFC3E3E387E70FF71F773C777873F0E3E1E1FFC0FF803E00000';
			else if (str==='TOOL')
				data='0000006000E001C001C001E603FE07FC0FF81FC03F807F00FE00FC00F8007000';
			else if (str==='PLUG')
				data='00000000000006600660066006603FFC3FFC3FFC3FFC1FF80FF007E000000000';
			else if (str==='POWER_BUTTON')
				data='000001C00DD81DDC3DDE39CE71C771C771C77007380E3E1E1FFC0FF803E00000';
			else if (str==='WALL_PLUG')
				data='0000FFFF8001BFFDA005A005A005A005A665A665A005A005A005BFFD8001FFFF';
			else if (str==='WIFI1')
				data='000007E01FF83FFC700E67E60FF0181803C007E0042001800180000000000000';
			else if (str==='WIFI2')
				data='0000000000000000000007E00FF0181803C007E0042001800180000000000000';
			else if (str==='CLOCK')
				data='0000000003E007F00C18180C3006300630FE30863086188C0C1807F003E00000';
			else if (str==='TIMER')
				data='0000000003E007F00C98183C307630E639CE30863006180C0C9807F003E00000';
			else if (str==='WATERTAP')
				data='018007E001800FF0FFFEFFFFFFFFFFFF000F000F0000000C000C0000000C000C';
			else if (str==='HUMIDITY')
				data='0000018003C007E00E700C301C381818381C381C381C1C381FF80FF003C00000';
			else if (str==='HUMIDITY2')
				data='0000018003C007E00FF00FF01FF81FD83F9C3F9C3F1C1E381FF80FF003C00000';
			else if (str==='GAS_LEAK')
				data='018007E007E00FF00FF007E0018001800000DE7BDE7BDFFBDFFBDFFBDFFB0000';
			else if (str==='FAN')
				data='00C001E001E003C003C06180F818FDBE7DBF181F018603C003C0078007800300';
			else if (str==='FLAME')
				data='006000C001C001C003E00BE00BF01FF81FF83FFC3FFC3FFC1FF80FF007E00180';
			else if (str==='RADIATOR')
				data='09241248124800002DB42DB42DB4EDB7EDB72DB42DB42DB42DB42DB42DB42DB4';
			else if (str==='SUN')
				data='000020821084080801C007F007F00FF86FFB0FF807F007F011C4200240810080';
			else if (str==='TEMPERATURE')
				data='01C003E0072007E0072007E0072007E007200FF01FF81FF81FF81FF80FF007E0';
			else if (str==='NONINVERTED')
				data='00007FFE7FFE5FFE4FFE47FE43FE41FE40FE407E403E401E400E40067FFE0000';
			else if (str==='INVERTED')
				data='00007FFE6002700278027C027E027F027F827FC27FE27FF27FFA7FFE7FFE0000';
			else if (str==='LOCKCLOSED')
				data='3FFC3FFC381C381C381C7FFE7FFE7FFE7FFE7E7E7E7E7E7E7E7E7FFE7FFE0000';
			else if (str==='LOCKOPEN')
				data='3FFC3FFC381C380038007FFE7FFE7FFE7FFE7E7E7E7E7E7E7E7E7FFE7FFE0000';
			else if (str==='PERSON')
				data='07E00FF00FF01FF81FF81FF81FF80FF00FF007E007E03FFC7FFEFFFFFFFFFFFF';
			else if (str==='WINDOW')
				data='7FFF7FFF618F619B61B37FB37FB361B361B361B361B361B361B361B37FFF7FFF';
			else if (str==='DOOR')
				data='000000000FF80FF80BF808F808380838083808B808B8083808380C38032000E0';
			else if (str==='FACE')
				data='000001C00FF81DD8180C10042FFA7F7F677B6773208210200BE8041003E00000';
			else if (str==='SIREN')
				data='80814082208413E807F00FF80FB81F9C1F9C1F8C3F8E3F8E7FFF7FFF7FFF0000';
			else if (str==='WARNING')
				data='008001C001C003E00360077006300EB80C981C9C188C380E30867FFF7FFF0000';
			else if (str==='PLUS')
				data='00000000000001800180018001801FF81FF80180018001800180000000000000';
			else if (str==='MINUS')
				data='00000000000000000000000000001FF81FF80000000000000000000000000000';
			else if (str==='MOBILE')
				data='0000003000300FF80FF80C180C180C180C180FF80FF80FF80FF80FF80FF80FF8';
			else if (str==='SIGNAL1')
				data='00000000000000000000000000000000000000000000000000004000C000C000';
			else if (str==='SIGNAL2')
				data='00000000000000000000000000000000000004000C001C001C005C00DC00DC00';
			else if (str==='SIGNAL3')
				data='00000000000000000000004000C001C001C005C00DC01DC01DC05DC0DDC0DDC0';
			else if (str==='SIGNAL4')
				data='00000004000C001C001C005C00DC01DC01DC05DC0DDC1DDC1DDC5DDCDDDCDDDC';
			//var dropdown_configuration = this.getFieldValue('CONFIGURATION') || '';
			var row1,row2,row3,row4,row5,row6,row7,row8;
			var col1,col2,col3,col4,col5,col6,col7,col8;
			var code='';
			var pos_ini=0;
			for (var i=0;i<32;i++)
			{
				code+='0x'+data.substr(pos_ini,2)+',';
				pos_ini+=2;
			}
			code=code.substr(0,code.length-1);
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

			Blockly.Blocks.tft_160x128_icon = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_TFT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  colour: Facilino.LANG_COLOUR_SCREEN_TFT,
			  helpUrl: Facilino.getHelpUrl('tft_160x128_icon'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_TFT_ICON_NAME','LANG_TFT_ICON','LANG_TFT_ICON_OUTPUT','LANG_TFT_ICON_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_TFT_ICON_NAME'),
			  output: Facilino.locales.getKey('LANG_TFT_ICON_OUTPUT'),
			  icons: [
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_HOME'),'HOME'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_ARROW_UP'),'ARROWUP'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_ARROW_DOWN'),'ARROWDOWN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_ARROW_LEFT'),'ARROWLEFT'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_ARROW_RIGHT'),'ARROWRIGHT'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BAT0'),'BAT0'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BAT1'),'BAT1'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BAT2'),'BAT2'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BAT3'),'BAT3'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BAT4'),'BAT4'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BLUETOOTH'),'BLUETOOTH'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BULB'),'BULB'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BULB_ON'),'BULBON'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BULB_OFF'),'BULBOFF'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BULLET'),'BULLET'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_CANCEL'),'CANCEL'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_CHECK'),'CHECK'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FILL1'),'FILL1'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FILL2'),'FILL2'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FILL3'),'FILL3'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FILL4'),'FILL4'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SPEAK'),'SPEAK'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_HEART'),'HEART'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_NOCONN'),'NOCONN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_TOOL'),'TOOL'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_PLUG'),'PLUG'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_POWER_BUTTON'),'POWER_BUTTON'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WALL_PLUG'),'WALL_PLUG'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WIFI1'),'WIFI1'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WIFI2'),'WIFI2'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_CLOCK'),'CLOCK'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_TIMER'),'TIMER'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WATER_TAP'),'WATERTAP'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_HUMIDITY'),'HUMIDITY'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_HUMIDITY2'),'HUMIDITY2'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_GAS_LEAK'),'GAS_LEAK'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FAN'),'FAN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FLAME'),'FLAME'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_RADIATOR'),'RADIATOR'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SUN'),'SUN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_TEMPERATURE'),'TEMPERATURE'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_NON_INVERTED'),'NONINVERTED'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_INVERTED'),'INVERTED'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_LOCK_CLOSED'),'LOCKCLOSED'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_LOCK_OPEN'),'LOCKOPEN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_PERSON'),'PERSON'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WINDOW'),'WINDOW'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_DOOR'),'DOOR'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FACE'),'FACE'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SIREN'),'SIREN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WARNING'),'WARNING'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_PLUS'),'PLUS'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_MINUS'),'MINUS'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_MOBILE'),'MOBILE'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SIGNAL')+'1','SIGNAL1'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SIGNAL')+'2','SIGNAL2'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SIGNAL')+'3','SIGNAL3'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SIGNAL')+'4','SIGNAL4']],
			  init: function() {
				this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/tft_screen.svg',52*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_TFT_ICON')).appendField(new Blockly.FieldDropdown([
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_HOME'),'HOME'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_ARROW_UP'),'ARROWUP'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_ARROW_DOWN'),'ARROWDOWN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_ARROW_LEFT'),'ARROWLEFT'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_ARROW_RIGHT'),'ARROWRIGHT'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BAT0'),'BAT0'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BAT1'),'BAT1'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BAT2'),'BAT2'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BAT3'),'BAT3'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BAT4'),'BAT4'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BLUETOOTH'),'BLUETOOTH'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BULB'),'BULB'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BULB_ON'),'BULBON'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BULB_OFF'),'BULBOFF'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_BULLET'),'BULLET'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_CANCEL'),'CANCEL'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_CHECK'),'CHECK'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FILL1'),'FILL1'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FILL2'),'FILL2'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FILL3'),'FILL3'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FILL4'),'FILL4'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SPEAK'),'SPEAK'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_HEART'),'HEART'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_NOCONN'),'NOCONN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_TOOL'),'TOOL'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_PLUG'),'PLUG'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_POWER_BUTTON'),'POWER_BUTTON'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WALL_PLUG'),'WALL_PLUG'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WIFI1'),'WIFI1'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WIFI2'),'WIFI2'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_CLOCK'),'CLOCK'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_TIMER'),'TIMER'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WATER_TAP'),'WATERTAP'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_HUMIDITY'),'HUMIDITY'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_HUMIDITY2'),'HUMIDITY2'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_GAS_LEAK'),'GAS_LEAK'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FAN'),'FAN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FLAME'),'FLAME'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_RADIATOR'),'RADIATOR'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SUN'),'SUN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_TEMPERATURE'),'TEMPERATURE'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_NON_INVERTED'),'NONINVERTED'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_INVERTED'),'INVERTED'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_LOCK_CLOSED'),'LOCKCLOSED'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_LOCK_OPEN'),'LOCKOPEN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_PERSON'),'PERSON'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WINDOW'),'WINDOW'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_DOOR'),'DOOR'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_FACE'),'FACE'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SIREN'),'SIREN'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_WARNING'),'WARNING'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_PLUS'),'PLUS'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_MINUS'),'MINUS'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_MOBILE'),'MOBILE'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SIGNAL')+'1','SIGNAL1'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SIGNAL')+'2','SIGNAL2'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SIGNAL')+'3','SIGNAL3'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_SIGNAL')+'4','SIGNAL4']]),'ICON').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(false,null);
				this.setNextStatement(false,null);
				this.setOutput(true,'tft_icon');
				this.setColour(Facilino.LANG_COLOUR_SCREEN_TFT);
				this.setTooltip(Facilino.locales.getKey('LANG_TFT_ICON_TOOLTIP'));
			  },
			default_inputs: function()
			{
				var icons_blocks=[];
				Blockly.Blocks.tft_160x128_icon.icons.forEach((element,index) =>{ icons_blocks.push('<field name="ICON">'+element[1]+'</field>');});
				return icons_blocks;
			}
		};
		
	};
		
	var FacilinoTFT	= {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoTFT;
	} else {
		window.FacilinoTFT = FacilinoTFT;
	}
}));
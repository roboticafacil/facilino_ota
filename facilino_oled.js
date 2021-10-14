(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	
	Blockly.Arduino.oled_128x32_set_text = function()
		{
			var code='';
			var text= Blockly.Arduino.valueToCode(this,'TEXT', Blockly.Arduino.ORDER_ATOMIC);
			var x= Blockly.Arduino.valueToCode(this,'X', Blockly.Arduino.ORDER_ATOMIC);
			var y= Blockly.Arduino.valueToCode(this,'Y', Blockly.Arduino.ORDER_ATOMIC);
			var s= this.getFieldValue('SIZE');
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.definitions_['define_set_text']='void setText(String msg, int16_t x, int16_t y, uint8_t s){\n  int16_t x1;\n  int16_t y1;\n  uint16_t w;\n  uint16_t h;\n  oled_display.setTextSize(s);\n  oled_display.getTextBounds(msg.c_str(),x,y,&x1,&y1,&w,&h);\n  oled_display.fillRect(x,y,w,h,BLACK);\n  oled_display.setCursor(x,y);\n  oled_display.print(msg);\n  oled_display.display();\n  delay(1);\n}\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			code='setText('+text+','+x+','+y+','+s+');\n';
			return code;
		};

			Blockly.Blocks.oled_128x32_set_text = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_set_text'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_SET_TEXT_NAME','LANG_OLED_SET_TEXT','LANG_OLED_SET_TEXT_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_SET_TEXT_NAME'),
			  init: function() {
				this.appendValueInput('TEXT').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_SET_TEXT')).setCheck([String,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('X').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_OLED_SET_TEXT_SIZE')).appendField(new Blockly.FieldDropdown([['1','1'],['2','2'],['3','3']]),'SIZE').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setOutput(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_SET_TEXT_TOOLTIP'));
			  }
		};

		Blockly.Arduino.oled_128x32_set_image = function()
		{
			var code='';
			var image= Blockly.Arduino.valueToCode(this,'IMAGE', Blockly.Arduino.ORDER_ATOMIC);
			var x= Blockly.Arduino.valueToCode(this,'X', Blockly.Arduino.ORDER_ATOMIC);
			var y= Blockly.Arduino.valueToCode(this,'Y', Blockly.Arduino.ORDER_ATOMIC);
			var block = this.getInputTargetBlock('IMAGE');
			var image_name ='';
			var image_width = 128;
			var image_height = 32;
			if (block!==null)
			{
				if (block.type==='oled_128x32_image_browse')
				{

					var image_data = JSON.parse(block.data);
					if (image_data!==null)
					{
						image_name = image_data.name;
						image_width = image_data.width;
						image_height = image_data.height;
					}
					else
					{
						image_width=0;
						image_height=0;
					}
				}
				else if (block.type==='oled_128x32_main_image')
				{
					image_name = this.getInputTargetBlock('IMAGE').getFieldValue('ICON').toLowerCase();
					image_width = 96;
					image_height = 16;
				}
				else if (block.type==='oled_128x32_small_icon')
				{
					image_name = this.getInputTargetBlock('IMAGE').getFieldValue('ICON').toLowerCase();
					image_width = 8;
					image_height = 8;
				}
				else if (block.type==='oled_128x32_large_icon')
				{
					image_name = this.getInputTargetBlock('IMAGE').getFieldValue('ICON').toLowerCase();
					image_width = 16;
					image_height = 16
				}
			}
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			if (image_name!=='')
				Blockly.Arduino.definitions_['declare_var_oled_display_'+image_name]='const unsigned char _oled_display_'+image_name+'[] PROGMEM = {'+image+'};\n';
			if (block!==null)
			{
				if (block.type==='oled_128x32_image_empty')
				{
					Blockly.Arduino.definitions_['define_clear_oled']='void clearOLED(int16_t x, int16_t y, int16_t w, int16_t h){\n  oled_display.fillRect(x,y,w,h,BLACK);\n  oled_display.display();\n  delay(1);\n}\n';
					code='clearOLED('+x+','+y+',128,32);\n';
				}
				else
				{
					Blockly.Arduino.definitions_['define_set_image']='void setImage(const unsigned char *icon, int16_t x, int16_t y, int16_t w, int16_t h){\n  oled_display.fillRect(x,y,w,h,BLACK);\n  oled_display.drawBitmap(x,y,icon,w,h,WHITE,BLACK);\n  oled_display.display();\n  delay(1);\n}\n';
					code='setImage(_oled_display_'+image_name+','+x+','+y+','+image_width+','+image_height+');\n';
				}
			}
			return code;
		};

		Blockly.Blocks.oled_128x32_set_image = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_set_image'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_SET_IMAGE_NAME','LANG_OLED_SET_IMAGE','LANG_OLED_SET_COORDINATE_X','LANG_OLED_SET_COORDINATE_Y','LANG_OLED_SET_IMAGE_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_SET_IMAGE_NAME'),
			  init: function() {
				this.appendValueInput('IMAGE').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_SET_IMAGE')).setCheck(['oled_small_icon','oled_large_icon','oled_central_image','oled_custom_image','oled_empty_image']).appendField(new Blockly.FieldImage("img/blocks/oled_image.svg", 40*options.zoom, 22*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('X').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_SET_IMAGE_TOOLTIP'));
			  }
		};

		Blockly.Arduino.oled_128x32_clear = function()
		{
			var code='';
			var x= Blockly.Arduino.valueToCode(this,'X', Blockly.Arduino.ORDER_ATOMIC);
			var y= Blockly.Arduino.valueToCode(this,'Y', Blockly.Arduino.ORDER_ATOMIC);
			var w= Blockly.Arduino.valueToCode(this,'W', Blockly.Arduino.ORDER_ATOMIC);
			var h= Blockly.Arduino.valueToCode(this,'H', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			Blockly.Arduino.definitions_['define_clear_oled']='void clearOLED(int16_t x, int16_t y, int16_t w, int16_t h){\n  oled_display.fillRect(x,y,w,h,BLACK);\n  oled_display.display();\n  delay(1);\n}\n';
			code='clearOLED('+x+','+y+','+w+','+h+');\n';
			return code;
		};

		Blockly.Blocks.oled_128x32_clear = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_clear'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_CLEAR_NAME','LANG_OLED_CLEAR','LANG_OLED_SET_COORDINATE_X','LANG_OLED_SET_COORDINATE_Y','LANG_OLED_SET_COORDINATE_WIDTH','LANG_OLED_SET_COORDINATE_HEIGHT','LANG_OLED_CLEAR_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_CLEAR_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_CLEAR'))
				this.appendValueInput('X').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('W').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_WIDTH')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('H').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_HEIGHT')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_CLEAR_TOOLTIP'));
			  }
		};
		
		if (window.FacilinoAdvanced===true)
		{

		Blockly.Arduino.oled_128x32_set_header_text = function()
		{
			var code='';
			var text= Blockly.Arduino.valueToCode(this,'TEXT', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.definitions_['define_set_header_text']='void setHeaderText(String msg){\n  int16_t x;\n  int16_t y;\n  uint16_t w;\n  uint16_t h;\n  oled_display.setTextSize(1);\n  oled_display.getTextBounds(msg.c_str(),0,0,&x,&y,&w,&h);\n  if (w>110){\n	String msg2;\n	uint8_t i=0;\n	for (i=0;i<=(msg.length()-18);i++)\n	{\n	  msg2=msg.substring(i,18+i);\n	  oled_display.fillRect(8,0,112,8,BLACK);\n	  oled_display.setCursor(8,0);\n	  oled_display.print(msg2);\n	  oled_display.display();\n	  delay(100);\n	  if (i==0)\n		delay(300);\n	}\n  }\n  else\n  {\n	oled_display.fillRect(8,0,112,8,BLACK);\n	x=(128-w)/2;\n	oled_display.setCursor(x,0);\n	oled_display.print(msg);\n	oled_display.display();\n	delay(1);\n  }\n}\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			code='setHeaderText('+text+');\n';
			return code;
		};

			Blockly.Blocks.oled_128x32_set_header_text = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED_LAYOUT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_set_header_text'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_SET_HEADER_TEXT_NAME','LANG_OLED_SET_HEADER_TEXT','LANG_OLED_SET_HEADER_TEXT_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_SET_HEADER_TEXT_NAME'),
			  init: function() {
				this.appendValueInput('TEXT').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_SET_HEADER_TEXT')).setCheck([String,'Variable']).appendField(new Blockly.FieldImage("img/blocks/oled_header_text.svg", 40*options.zoom, 22*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_SET_HEADER_TEXT_TOOLTIP'));
			  }
		};

		Blockly.Arduino.oled_128x32_set_main_text = function()
		{
			var code='';
			var text= Blockly.Arduino.valueToCode(this,'TEXT', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.definitions_['define_set_main_text']='void setMainText(String msg){\n  oled_display.setTextSize(2);\n  int16_t x;\n  int16_t y;\n  uint16_t w;\n  uint16_t h;\n  oled_display.fillRect(16,8,96,16,BLACK);\n  oled_display.getTextBounds(msg.c_str(),0,0,&x,&y,&w,&h);\n  if (w>94)\n  {\n	msg=msg.substring(0,8);\n	oled_display.getTextBounds(msg.c_str(),0,0,&x,&y,&w,&h);\n  }\n  x=(128-w)/2;\n  oled_display.setCursor(x,9);\n  oled_display.print(msg);\n  oled_display.display();\n  delay(1);\n}\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			code='setMainText('+text+');\n';
			return code;
		};

			Blockly.Blocks.oled_128x32_set_main_text = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED_LAYOUT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_set_main_text'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_SET_MAIN_TEXT_NAME','LANG_OLED_SET_MAIN_TEXT','LANG_OLED_SET_MAIN_TEXT_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_SET_MAIN_TEXT_NAME'),
			  init: function() {
				this.appendValueInput('TEXT').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_SET_MAIN_TEXT')).appendField(new Blockly.FieldImage("img/blocks/oled_main_text.svg", 40*options.zoom, 22*options.zoom, "*")).setCheck([String,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_SET_MAIN_TEXT_TOOLTIP'));
			  }
		};

		Blockly.Arduino.oled_128x32_set_footer_text = function()
		{
			var code='';
			var text= Blockly.Arduino.valueToCode(this,'TEXT', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.definitions_['define_set_footer_text']='void setFooterText(String msg){\n  int16_t x;\n  int16_t y;\n  uint16_t w;\n  uint16_t h;\n  int16_t pos=8;\n  oled_display.setTextSize(1);\n  oled_display.getTextBounds(msg.c_str(),0,0,&x,&y,&w,&h);\n  if (w>110)\n  {\n	String msg2;\n	uint8_t i=0;\n	for (i=0;i<=(msg.length()-18);i++)\n	{\n	  msg2=msg.substring(i,18+i);\n	  oled_display.fillRect(8,24,112,8,BLACK);\n	  oled_display.setCursor(8,24);\n	  oled_display.print(msg2);\n	  oled_display.display();\n	  delay(100);\n	  if (i==0)\n		delay(300);\n	}\n  }\n  else\n  {\n	x=(128-w)/2;\n	oled_display.fillRect(8,24,112,8,BLACK);\n	oled_display.setCursor(x,24);\n	oled_display.print(msg);\n	oled_display.display();\n	delay(1);  }\n}\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			code='setFooterText('+text+');\n';
			return code;
		};

			Blockly.Blocks.oled_128x32_set_footer_text = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED_LAYOUT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_set_footer_text'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_SET_FOOTER_TEXT_NAME','LANG_OLED_SET_FOOTER_TEXT','LANG_OLED_SET_FOOTER_TEXT_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_SET_FOOTER_TEXT_NAME'),
			  init: function() {
				this.appendValueInput('TEXT').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_SET_FOOTER_TEXT')).setCheck([String,'Variable']).appendField(new Blockly.FieldImage("img/blocks/oled_footer_text.svg", 40*options.zoom, 22*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_SET_FOOTER_TEXT_TOOLTIP'));
			  }
		};


		Blockly.Arduino.oled_128x32_set_small_icon = function()
		{
			var code='';
			var image= Blockly.Arduino.valueToCode(this,'IMAGE', Blockly.Arduino.ORDER_ATOMIC);
			var block = this.getInputTargetBlock('IMAGE');
			var image_name = '';
			if (block!==null)
			{
				if (block.type==='oled_128x32_small_icon')
					image_name = this.getInputTargetBlock('IMAGE').getFieldValue('ICON').toLowerCase();
				else if (block.type==='oled_128x32_image_browse')
				{
					image_name = 'custom'+block.NumImages;
					var image_data = JSON.parse(block.data);
					if ((image_data.width!==8)&&(image_data.height!==8))
						this.setWarningText('Incorrect image size');
					else
						this.setWarningText(null);
				}
			}
			var icon = this.getFieldValue('ICON');
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			if (image_name!=='')
				Blockly.Arduino.definitions_['declare_var_oled_display_'+image_name]='const unsigned char _oled_display_'+image_name+'[] PROGMEM = {'+image+'};\n';
			if (block!==null)
			{
				if(block.type==='oled_128x32_image_empty')
				{
					Blockly.Arduino.definitions_['define_clear_oled']='void clearOLED(int16_t x, int16_t y, int16_t w, int16_t h){\n  oled_display.fillRect(x,y,w,h,BLACK);\n  oled_display.display();\n  delay(1);\n}\n';
					if (icon==='TOP_LEFT')
						code='clearOLED(0,0,8,8);\n';
					else if (icon==='TOP_RIGHT')
						code='clearOLED(120,0,8,8);\n';
					else if (icon==='BOTTOM_LEFT')
						code='clearOLED(0,24,8,8);\n';
					else if (icon==='BOTTOM_RIGHT')
						code='clearOLED(120,24,8,8);\n';
				}
				else
				{
					if (icon==='TOP_LEFT')
					{
					  Blockly.Arduino.definitions_['define_set_top_left_icon']='void setTopLeftIcon(const unsigned char *icon){\n  oled_display.fillRect(0,0,8,8,BLACK);\n  oled_display.drawBitmap(0,0,icon,8,8,WHITE);\n  oled_display.display();\n  delay(1);\n}\n';
					  code='setTopLeftIcon(_oled_display_'+image_name+');\n';
					}
					else if (icon==='TOP_RIGHT')
					{
						Blockly.Arduino.definitions_['define_set_top_right_icon']='void setTopRightIcon(const unsigned char *icon){\n  oled_display.fillRect(120,0,8,8,BLACK);\n  oled_display.drawBitmap(120,0,icon,8,8,WHITE);\n  oled_display.display();\n  delay(1);\n}\n';
						code='setTopRightIcon(_oled_display_'+image_name+');\n';
					}
					else if (icon==='BOTTOM_LEFT')
					{
						Blockly.Arduino.definitions_['define_set_bottom_left_icon']='void setBottomLeftIcon(const unsigned char *icon){\n  oled_display.fillRect(0,24,8,8,BLACK);\n  oled_display.drawBitmap(0,24,icon,8,8,WHITE);\n  oled_display.display();\n  delay(1);\n}\n';
						code='setBottomLeftIcon(_oled_display_'+image_name+');\n';
					}
					else if (icon==='BOTTOM_RIGHT')
					{
						Blockly.Arduino.definitions_['define_set_bottom_right_icon']='void setBottomRightIcon(const unsigned char *icon){\n  oled_display.fillRect(120,24,8,8,BLACK);\n  oled_display.drawBitmap(120,24,icon,8,8,WHITE);\n  oled_display.display();\n  delay(1);\n}\n';
						code='setBottomRightIcon(_oled_display_'+image_name+');\n';
					}
				}
			}
			return code;
		};

			Blockly.Blocks.oled_128x32_set_small_icon = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED_LAYOUT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_set_small_icon'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_SET_SMALL_ICON_NAME','LANG_OLED_SET_SMALL_ICON','LANG_OLED_SMALL_ICON_TOP_LEFT','LANG_OLED_SMALL_ICON_TOP_RIGHT','LANG_OLED_SMALL_ICON_BOTTOM_LEFT','LANG_OLED_SMALL_ICON_BOTTOM_RIGHT','LANG_OLED_SET_SMALL_ICON_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_SET_SMALL_ICON_NAME'),
			  init: function() {
				this.appendValueInput('IMAGE').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_SET_SMALL_ICON')).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_OLED_SMALL_ICON_TOP_LEFT'),'TOP_LEFT'],
				[Facilino.locales.getKey('LANG_OLED_SMALL_ICON_TOP_RIGHT'),'TOP_RIGHT'],
				[Facilino.locales.getKey('LANG_OLED_SMALL_ICON_BOTTOM_LEFT'),'BOTTOM_LEFT'],
				[Facilino.locales.getKey('LANG_OLED_SMALL_ICON_BOTTOM_RIGHT'),'BOTTOM_RIGHT']]),'ICON').setCheck(['oled_small_icon','oled_custom_image','oled_empty_image']).appendField(new Blockly.FieldImage("img/blocks/oled_small_icons.svg", 40*options.zoom, 22*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_SET_SMALL_ICON_TOOLTIP'));
			  }
		};

		Blockly.Arduino.oled_128x32_set_large_icon = function()
		{
			var code='';
			var image= Blockly.Arduino.valueToCode(this,'IMAGE', Blockly.Arduino.ORDER_ATOMIC);
			var block = this.getInputTargetBlock('IMAGE');
			var image_name = '';
			if (block!==null)
			{
				if (block.type==='oled_128x32_large_icon')
					image_name = this.getInputTargetBlock('IMAGE').getFieldValue('ICON').toLowerCase();
				else if (block.type==='oled_128x32_image_browse')
				{
					image_name = 'custom'+block.NumImages;
					var image_data = JSON.parse(block.data);
					if ((image_data.width!==16)&&(image_data.height!==16))
						this.setWarningText('Incorrect image size');
					else
						this.setWarningText(null);
				}
			}
			var icon = this.getFieldValue('ICON');
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			if (image_name!=='')
				Blockly.Arduino.definitions_['declare_var_oled_display_'+image_name]='const unsigned char _oled_display_'+image_name+'[] PROGMEM = {'+image+'};\n';
			if (block!==null)
			{
				if (block.type==='oled_128x32_image_empty')
				{
					Blockly.Arduino.definitions_['define_clear_oled']='void clearOLED(int16_t x, int16_t y, int16_t w, int16_t h){\n  oled_display.fillRect(x,y,w,h,BLACK);\n  oled_display.display();\n  delay(1);\n}\n';
					if (icon==='LEFT')
						code='clearOLED(0,8,16,16);\n';
					else if (icon==='RIGHT')
						code='clearOLED(112,8,16,16);\n';
				}
				else
				{
					if (icon==='LEFT')
					{
					  Blockly.Arduino.definitions_['define_set_left_icon']='void setLeftIcon(const unsigned char *icon){\n  oled_display.fillRect(0,8,16,16,BLACK);\n  oled_display.drawBitmap(0,8,icon,16,16,WHITE,BLACK);\n  oled_display.display();\n  delay(1);\n}\n';
					  code='setLeftIcon(_oled_display_'+image_name+');\n';
					}
					else if (icon==='RIGHT')
					{
						Blockly.Arduino.definitions_['define_set_right_icon']='void setRightIcon(const unsigned char *icon){\n  oled_display.fillRect(112,8,16,16,BLACK);\n  oled_display.drawBitmap(112,8,icon,16,16,WHITE,BLACK);\n  oled_display.display();\n  delay(1);\n}\n';
						code='setRightIcon(_oled_display_'+image_name+');\n';
					}
				}
			}
			return code;
		};

			Blockly.Blocks.oled_128x32_set_large_icon = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED_LAYOUT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_set_large_icon'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_SET_LARGE_ICON_NAME','LANG_OLED_SET_LARGE_ICON','LANG_OLED_LARGE_ICON_LEFT','LANG_OLED_LARGE_ICON_RIGHT','LANG_OLED_SET_LARGE_ICON_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_SET_LARGE_ICON_NAME'),
			  init: function() {
				this.appendValueInput('IMAGE').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_SET_LARGE_ICON')).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_LEFT'),'LEFT'],
				[Facilino.locales.getKey('LANG_OLED_LARGE_ICON_RIGHT'),'RIGHT']]),'ICON').setCheck(['oled_large_icon','oled_custom_image','oled_empty_image']).appendField(new Blockly.FieldImage("img/blocks/oled_large_icons.svg", 40*options.zoom, 22*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_SET_LARGE_ICON_TOOLTIP'));
			  }
		};

		Blockly.Arduino.oled_128x32_set_main_image = function()
		{
			var code='';
			var image= Blockly.Arduino.valueToCode(this,'IMAGE', Blockly.Arduino.ORDER_ATOMIC);
			var block = this.getInputTargetBlock('IMAGE');
			var image_name = '';
			if (block!==null)
			{
				if (block.type==='oled_128x32_main_image')
					image_name = this.getInputTargetBlock('IMAGE').getFieldValue('ICON').toLowerCase();
				else if (block.type==='oled_128x32_image_browse')
				{
					image_name = 'custom'+block.NumImages;
					var image_data = JSON.parse(block.data);
					if ((image_data.width!==96)&&(image_data.height!==16))
						this.setWarningText('Incorrect image size');
					else
						this.setWarningText(null);
				}
			}
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			if (image_name!=='')
				Blockly.Arduino.definitions_['declare_var_oled_display_'+image_name]='const unsigned char _oled_display_'+image_name+'[] PROGMEM = {'+image+'};\n';
			if (block!==null)
			{
				if (block.type==='oled_128x32_image_empty')
				{
					Blockly.Arduino.definitions_['define_clear_oled']='void clearOLED(int16_t x, int16_t y, int16_t w, int16_t h){\n  oled_display.fillRect(x,y,w,h,BLACK);\n  oled_display.display();\n  delay(1);\n}\n';
					code='clearOLED(16,8,96,16);\n';
				}
				else
				{
					Blockly.Arduino.definitions_['define_set_main_image']='void setMainImage(const unsigned char *icon){\n  oled_display.fillRect(16,8,96,16,BLACK);\n  oled_display.drawBitmap(16,8,icon,96,16,WHITE,BLACK);\n  oled_display.display();\n  delay(1);\n}\n';
					code='setMainImage(_oled_display_'+image_name+');\n';
				}
			}
			return code;
		};



		Blockly.Blocks.oled_128x32_set_main_image = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED_LAYOUT'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_set_main_image'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_SET_MAIN_IMAGE_NAME','LANG_OLED_SET_MAIN_IMAGE','LANG_OLED_SET_MAIN_IMAGE_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_SET_MAIN_IMAGE_NAME'),
			  init: function() {
				this.appendValueInput('IMAGE').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_SET_MAIN_IMAGE')).setCheck(['oled_central_image','oled_custom_image','oled_empty_image']).appendField(new Blockly.FieldImage("img/blocks/oled_main_image.svg", 40*options.zoom, 22*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_SET_MAIN_IMAGE_TOOLTIP'));
			  }
		};
		
		}

		Blockly.Arduino.oled_128x32_small_icon = function()
		{
			var str = this.getFieldValue('ICON');
			var data='';
			if (str==='NO_CONN')
				data='0100000000000000';
			else if (str==='POOR_CONN')
				data='0504040000000000';
			else if (str==='GOOD_CONN')
				data='1514141010000000';
			else if (str==='EXCEL_CONN')
				data='5554545050404000';
			else if (str==='NO_BATT')
				data='3f21212121212121';
			else if (str==='LOW_BATT')
				data='3f212d2121212121';
			else if (str==='MEDIUM_BATT')
				data='3f212d212d212121';
			else if (str==='FULL_BATT')
				data='3f212d212d212d21';
			else if (str==='CORRECT')
				data='00040a1120408000';
			else if (str==='WRONG')
				data='0042241818244200';
			else if (str==='ARROW_UP')
				data='383838fe7c381000';
			else if (str==='ARROW_DOWN')
				data='10387cfe38383800';
			else if (str==='ARROW_RIGHT')
				data='10307efe7e301000';
			else if (str==='ARROW_LEFT')
				data='1018fcfefc181000';
			else if (str==='TRIAG_UP')
				data='fefe7c7c38381000';
			else if (str==='TRIAG_DOWN')
				data='1038387c7cfefe00';
			else if (str==='TRIAG_RIGHT')
				data='061e7efe7e1e0600';
			else if (str==='TRIAG_LEFT')
				data='c0f0fcfefcf0c000';
			else if (str==='SMILE')
				data='7c92aa82aa827c00';
			else if (str==='DIAMOND')
				data='183c7effff7e3c18';
			else if (str==='CROSS')
				data='3c185aff5a183c18';
			else if (str==='SPADE')
				data='38107cfe7c381000';
			else if (str==='CIRCLE_FULL')
				data='3c7effffffff7e3c';
			else if (str==='CIRCLE')
				data='3c4281818181423c';
			else if (str==='MALE')
				data='0c12129ca0c0f000';
			else if (str==='FEMALE')
				data='081c08081c22221c';
			else if (str==='NOTE')
				data='060e0c0808281800';
			else if (str==='NOTES')
				data='066eecc88898f000';
			else if (str==='SNOW')
				data='105438ee38541000';
			else if (str==='ARROW_UP_DOWN')
				data='1038541054381000';
			else if (str==='ARROW_LEFT_RIGHT')
				data='002844fe44280000';
			//var dropdown_configuration = this.getFieldValue('CONFIGURATION') || '';
			var row1,row2,row3,row4,row5,row6,row7,row8;
			var col1,col2,col3,col4,col5,col6,col7,col8;
			var code='';
			row1=parseInt(data.substr(0,2) || '00',16);
			row2=parseInt(data.substr(2,2) || '00',16);
			row3=parseInt(data.substr(4,2) || '00',16);
			row4=parseInt(data.substr(6,2) || '00',16);
			row5=parseInt(data.substr(8,2) || '00',16);
			row6=parseInt(data.substr(10,2) || '00',16);
			row7=parseInt(data.substr(12,2) || '00',16);
			row8=parseInt(data.substr(14,2) || '00',16);
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
			data = col1+col2+col3+col4+col5+col6+col7+col8;
			row1=parseInt(data.substr(0,2) || '00',16);
			row2=parseInt(data.substr(2,2) || '00',16);
			row3=parseInt(data.substr(4,2) || '00',16);
			row4=parseInt(data.substr(6,2) || '00',16);
			row5=parseInt(data.substr(8,2) || '00',16);
			row6=parseInt(data.substr(10,2) || '00',16);
			row7=parseInt(data.substr(12,2) || '00',16);
			row8=parseInt(data.substr(14,2) || '00',16);
			code = row1 + ',' + row2 + ','+ row3 + ','+ row4 + ','+ row5 + ','+ row6 + ','+ row7 + ','+ row8;
			var row = code.split(',');
			var col = [];
			col[0] = ((row[0]%2)<1? 0 : 128) + ((row[1]%2)<1? 0 : 64) + ((row[2]%2)<1? 0 : 32) + ((row[3]%2)<1? 0 : 16) + ((row[4]%2)<1? 0 : 8) + ((row[5]%2)<1? 0 : 4) + ((row[6]%2)<1? 0 : 2) + ((row[7]%2)<1? 0 : 1);
			col[1] = ((row[0]%4)<2? 0 : 128) + ((row[1]%4)<2? 0 : 64) + ((row[2]%4)<2? 0 : 32) + ((row[3]%4)<2? 0 : 16) + ((row[4]%4)<2? 0 : 8) + ((row[5]%4)<2? 0 : 4) + ((row[6]%4)<2? 0 : 2) + ((row[7]%4)<2? 0 : 1);
			col[2] = ((row[0]%8)<4? 0 : 128) + ((row[1]%8)<4? 0 : 64) + ((row[2]%8)<4? 0 : 32) + ((row[3]%8)<4? 0 : 16) + ((row[4]%8)<4? 0 : 8) + ((row[5]%8)<4? 0 : 4) + ((row[6]%8)<4? 0 : 2) + ((row[7]%8)<4? 0 : 1);
			col[3] = ((row[0]%16)<8? 0 : 128) + ((row[1]%16)<8? 0 : 64) + ((row[2]%16)<8? 0 : 32) + ((row[3]%16)<8? 0 : 16) + ((row[4]%16)<8? 0 : 8) + ((row[5]%16)<8? 0 : 4) + ((row[6]%16)<8? 0 : 2) + ((row[7]%16)<8? 0 : 1);
			col[4] = ((row[0]%32)<16? 0 : 128) + ((row[1]%32)<16? 0 : 64) + ((row[2]%32)<16? 0 : 32) + ((row[3]%32)<16? 0 : 16) + ((row[4]%32)<16? 0 : 8) + ((row[5]%32)<16? 0 : 4) + ((row[6]%32)<16? 0 : 2) + ((row[7]%32)<16? 0 : 1);
			col[5] = ((row[0]%64)<32? 0 : 128) + ((row[1]%64)<32? 0 : 64) + ((row[2]%64)<32? 0 : 32) + ((row[3]%64)<32? 0 : 16) + ((row[4]%64)<32? 0 : 8) + ((row[5]%64)<32? 0 : 4) + ((row[6]%64)<32? 0 : 2) + ((row[7]%64)<32? 0 : 1);
			col[6] = ((row[0]%128)<64? 0 : 128) + ((row[1]%128)<64? 0 : 64) + ((row[2]%128)<64? 0 : 32) + ((row[3]%128)<64? 0 : 16) + ((row[4]%128)<64? 0 : 8) + ((row[5]%128)<64? 0 : 4) + ((row[6]%128)<64? 0 : 2) + ((row[7]%128)<64? 0 : 1);
			col[7] = (row[0]<128? 0 : 128) + (row[1]<128? 0 : 64) + (row[2]<128? 0 : 32) + (row[3]<128? 0 : 16) + (row[4]<128? 0 : 8) + (row[5]<128? 0 : 4) + (row[6]<128? 0 : 2) + (row[7]<128? 0 : 1);
			code = col[7] + ',' + col[6] + ','+ col[5] + ','+ col[4] + ','+ col[3] + ','+ col[2] + ','+ col[1] + ','+ col[0];

			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

			Blockly.Blocks.oled_128x32_small_icon = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_small_icon'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_SMALL_ICON_NAME','LANG_OLED_SMALL_ICON','LANG_LED_MATRIX_DRAWING_NO_CONNECTION','LANG_LED_MATRIX_DRAWING_POOR_CONNECTION','LANG_LED_MATRIX_DRAWING_GOOD_CONNECTION','LANG_LED_MATRIX_DRAWING_EXCELLECT_CONNECTION','LANG_LED_MATRIX_DRAWING_NO_BATTERY','LANG_LED_MATRIX_DRAWING_LOW_BATTERY','LANG_LED_MATRIX_DRAWING_MEDIUM_BATTERY','LANG_LED_MATRIX_DRAWING_FULL_BATTERY','LANG_LED_MATRIX_DRAWING_CORRECT','LANG_LED_MATRIX_DRAWING_WRONG','LANG_LED_MATRIX_DRAWING_ARROW_UP','LANG_LED_MATRIX_DRAWING_ARROW_DOWN','LANG_LED_MATRIX_DRAWING_ARROW_RIGHT','LANG_LED_MATRIX_DRAWING_ARROW_LEFT','LANG_LED_MATRIX_DRAWING_TRIANGLE_UP','LANG_LED_MATRIX_DRAWING_TRIANGLE_DOWN','LANG_LED_MATRIX_DRAWING_TRIANGLE_RIGHT','LANG_LED_MATRIX_DRAWING_TRIANGLE_LEFT','LANG_LED_MATRIX_DRAWING_SMILE','LANG_LED_MATRIX_DRAWING_DIAMOND','LANG_LED_MATRIX_DRAWING_CROSS','LANG_LED_MATRIX_DRAWING_SPADE','LANG_LED_MATRIX_DRAWING_CIRCLE_FULL','LANG_LED_MATRIX_DRAWING_CIRCLE','LANG_LED_MATRIX_DRAWING_MALE','LANG_LED_MATRIX_DRAWING_FEMALE','LANG_LED_MATRIX_DRAWING_NOTE','LANG_LED_MATRIX_DRAWING_NOTES','LANG_LED_MATRIX_DRAWING_SNOW','LANG_LED_MATRIX_DRAWING_ARROW_UP_DOWN','LANG_LED_MATRIX_DRAWING_ARROW_LEFT_RIGHT','LANG_OLED_SMALL_ICON_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_SMALL_ICON_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/oled_image.svg", 22*options.zoom, 22*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_SMALL_ICON')).appendField(new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NO_CONNECTION'),'NO_CONN'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_POOR_CONNECTION'),'POOR_CONN'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_GOOD_CONNECTION'),'GOOD_CONN'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_EXCELLECT_CONNECTION'),'EXCEL_CONN'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NO_BATTERY'),'NO_BATT'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_LOW_BATTERY'),'LOW_BATT'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_MEDIUM_BATTERY'),'MEDIUM_BATT'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_FULL_BATTERY'),'FULL_BATT'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CORRECT'),'CORRECT'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_WRONG'),'WRONG'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_UP'),'ARROW_UP'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_DOWN'),'ARROW_DOWN'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_RIGHT'),'ARROW_RIGHT'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_LEFT'),'ARROW_LEFT'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_UP'),'TRIAG_UP'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_DOWN'),'TRIAG_DOWN'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_RIGHT'),'TRIAG_RIGHT'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_TRIANGLE_LEFT'),'TRIAG_LEFT'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SMILE'),'SMILE'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_DIAMOND'),'DIAMOND'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CROSS'),'CROSS'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SPADE'),'SPADE'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CIRCLE_FULL'),'CIRCLE_FULL'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_CIRCLE'),'CIRCLE'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_MALE'),'MALE'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_FEMALE'),'FEMALE'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NOTE'),'NOTE'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_NOTES'),'NOTES'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_SNOW'),'SNOW'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_UP_DOWN'),'ARROW_UP_DOWN'],
					[Facilino.locales.getKey('LANG_LED_MATRIX_DRAWING_ARROW_LEFT_RIGHT'),'ARROW_LEFT_RIGHT']]),'ICON').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,'oled_small_icon');
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_SMALL_ICON_TOOLTIP'));
			  }
		};

		Blockly.Arduino.oled_128x32_large_icon = function()
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

			Blockly.Blocks.oled_128x32_large_icon = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_large_icon'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_LARGE_ICON_NAME','LANG_OLED_LARGE_ICON','LANG_OLED_LARGE_ICON_HOME','LANG_OLED_LARGE_ICON_ARROW_UP','LANG_OLED_LARGE_ICON_ARROW_DOWN','LANG_OLED_LARGE_ICON_ARROW_LEFT','LANG_OLED_LARGE_ICON_ARROW_RIGHT','LANG_OLED_LARGE_ICON_BAT0','LANG_OLED_LARGE_ICON_BAT1','LANG_OLED_LARGE_ICON_BAT2','LANG_OLED_LARGE_ICON_BAT3','LANG_OLED_LARGE_ICON_BAT4','LANG_OLED_LARGE_ICON_BLUETOOTH','LANG_OLED_LARGE_ICON_BULB','LANG_OLED_LARGE_ICON_BULB_ON','LANG_OLED_LARGE_ICON_BULB_OFF','LANG_OLED_LARGE_ICON_BULLET','LANG_OLED_LARGE_ICON_CANCEL','LANG_OLED_LARGE_ICON_CHECK','LANG_OLED_LARGE_ICON_FILL1','LANG_OLED_LARGE_ICON_FILL2','LANG_OLED_LARGE_ICON_FILL3','LANG_OLED_LARGE_ICON_FILL4','LANG_OLED_LARGE_ICON_SPEAK','LANG_OLED_LARGE_ICON_HEART','LANG_OLED_LARGE_ICON_NOCONN','LANG_OLED_LARGE_ICON_TOOL','LANG_OLED_LARGE_ICON_PLUG','LANG_OLED_LARGE_ICON_POWER_BUTTON','LANG_OLED_LARGE_ICON_WALL_PLUG','LANG_OLED_LARGE_ICON_WIFI1','LANG_OLED_LARGE_ICON_WIFI2','LANG_OLED_LARGE_ICON_CLOCK','LANG_OLED_LARGE_ICON_TIMER','LANG_OLED_LARGE_ICON_WATER_TAP','LANG_OLED_LARGE_ICON_HUMIDITY','LANG_OLED_LARGE_ICON_HUMIDITY2','LANG_OLED_LARGE_ICON_SUN','LANG_OLED_LARGE_ICON_TEMPERATURE','LANG_OLED_LARGE_ICON_NON_INVERTED','LANG_OLED_LARGE_ICON_INVERTED','LANG_OLED_LARGE_ICON_LOCK_CLOSED','LANG_OLED_LARGE_ICON_LOCK_OPEN','LANG_OLED_LARGE_ICON_PERSON','LANG_OLED_LARGE_ICON_WINDOW','LANG_OLED_LARGE_ICON_DOOR','LANG_OLED_LARGE_ICON_FACE','LANG_OLED_LARGE_ICON_SIREN','LANG_OLED_LARGE_ICON_WARNING','LANG_OLED_LARGE_ICON_PLUS','LANG_OLED_LARGE_ICON_MINUS','LANG_OLED_LARGE_ICON_MOBILE','LANG_OLED_LARGE_ICON_SIGNAL','LANG_OLED_LARGE_ICON_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_LARGE_ICON_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/oled_image.svg", 22*options.zoom, 22*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_LARGE_ICON')).appendField(new Blockly.FieldDropdown([
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
				this.setOutput(true,'oled_large_icon');
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_LARGE_ICON_TOOLTIP'));
			  }
		};


		Blockly.Arduino.oled_128x32_main_image = function()
		{
			var str = this.getFieldValue('ICON');
			var data ='';
			if (str==='BORED')
				data='0000000FFFFFFFFFF0000000000001FFFFFFFFFFFF80000000001FFFFFFFFFFFFFF8000000007FFFFFFFFFFFFFFE00000001FFFF00000000FFFF80000007FFE00000000007FFE000000FFF000000000000FFF000003FF80000000000001FF800003FF00000000000000FFC00007FC000000000000003FE0000FF8000000000000001FF0000FF8000000000000001FF0000FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF00';
			else if (str==='CALM')
				data='000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007FFFFFFFFFFFFFFFFFFE0000FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF00007FFFFFFFFFFFFFFFFFFE00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000';
			else if (str==='CONFUSED')
				data='000001FFFF8000000000000000001FFFFFF80000000000000000FFFFFFFE0000000018000003FFFFFFFF80000000FF00001FFFFFFFFFE0000001FF00003FFFFFFFFFF8000003FF0000FFFFC003FFFC000007FF0000FFFC00007FFF00001FFF0000FFF000000FFFC0007FFE0000FF80000007FFF003FFF800007E00000001FFFFFFFFF000000000000000FFFFFFFFC0000000000000003FFFFFFF80000000000000000FFFFFFE000000000000000003FFFFF00000000000000000007FFF800000';
			else if (str==='COOL')
				data='00000000000000000003FF000000000000000000000FFF000000000000000000001FFF000000000000000000003FFF00000000000000000000FFFE00000000000000000001FFF800000000000000000007FFF00000000000000000003FFFE0000000000000000001FFFF8000000E00000000000FFFFE000000FFFE00000003FFFFF8000000FFFFFFFFFFFFFFFFC0000000FFFFFFFFFFFFFFFE000000007FFFFFFFFFFFFFF00000000007FFFFFFFFFFFE00000000000007FFFFFFFF8000000000';
			else if (str==='CRYING')
				data='0000000007FFFFE0000000000000000FFFFFFFFFF0000000000001FFFFFFFFFFFF00000000000FFF80000001FFE0000000007FF0000000000FFC00000001FF800000000001FF00000003FC0000000000007FC000000FF0007FFFFFFC001FE000001FC01FFFFFFFFFF007F800003F83FFFC00001FFF83F800007FBFFE000000003FFBFC00007FFFC00000000001FFFC0000FFFF800000000000FFFE0000FFFFFFFFFFFFFFFFFFFE0000FFFFFFFFFFFFFFFFFFFE00000000000000000000000000';
			else if (str==='KISS')
				data='00000000000F80000000000000000000000FE0000000000000000000000FE00000000000000000000003F00000000000000000000000F00000000000000000000001F00000000000000000000003E00000000000000000000007E00000000000000000000007C00000000000000000000003C00000000000000000000003E00000000000000000000001E00000000000000000000003E0000000000000000000000FE0000000000000000000000FC0000000000000000000000F800000000000';
			else if (str==='KISS1')
				data='00000000000F80000000000000000000000FE0000000000000000000000FE7FE00000000000000000003FFFF00000000000000000000FFFF80000000000000000001FFFF80000000000000000003EF6780000000000000000007EF0F80000000000000000007CF8F80000000000000000003C7DF00000000000000000003E7FE00000000000000000001E3FE00000000000000000003E1FC0000000000000000000FE0F80000000000000000000FC0600000000000000000000F800000000000';
			else if (str==='KISS2')
				data='00000000000F80000000000000000000000FE0000000000000000000000FE7FE0FFC0000000000000003FFFF1FFE0000000000000000FFFF9FFF0000000000000001FFFF9FFF0000000000000003EF679ECF0000000000000007EF0F9E1F0000000000000007CF8F9F1F0000000000000003C7DF0FBE0000000000000003E7FE0FFC0000000000000001E3FE07FC0000000000000003E1FC03F8000000000000000FE0F801F0000000000000000FC06000C0000000000000000F800000000000';
			else if (str==='KISS3')
				data='00000000000F80000000000000000000000FE0000000000000000000000FE7FE0FFC1FF8000000000003FFFF1FFE3FFC000000000000FFFF9FFF3FFE000000000001FFFF9FFF3FFE000000000003EF679ECF3D9E000000000007EF0F9E1F3C3E000000000007CF8F9F1F3E3E000000000003C7DF0FBE1F7C000000000003E7FE0FFC1FF8000000000001E3FE07FC0FF8000000000003E1FC03F807F000000000000FE0F801F003E000000000000FC06000C0018000000000000F800000000000';
			else if (str==='MUSTACHE')
				data='000000000FFFFFF000000000000000007FFFFFFE0000000000000000FFFFFFFF0000000000000003FFFFFFFF8000000000000007FF0FF0FFE00000000000000FF803803FF00000000000001FF003C00FF8000000000001FFE007E007FF800000000001FFC00FF003FF800000000001FF003FF800FF800000000001FF807FFE01FF800000000000FFE1FFFF87FF0000000000007FFFFFFFFFFE0000000000001FFFFE7FFFF800000000000007FFF81FFFE000000000000001FFE007FF80000000';
			else if (str==='MUTE')
				data='0000000007C003E0000000000000000007F00FE0000000000000000007F81FE0000000000000000007FE7FE0000000000000000003FFFFC0000000000000000001FFFF800000000000000000007FFE000000000000000000003FFC000000000000000000003FFC000000000000000000007FFE00000000000000000001FFFF80000000000000000003FFFFC0000000000000000007FE7FE0000000000000000007F81FE0000000000000000007F00FE0000000000000000007C003E000000000';
			else if (str==='NERVOUS')
				data='000007F00007F00007F0000000000FF8001FF8000FF8000000003FFE003FFC003FFE000000007FFF007FFF00FFFF00000001FFFFC1FFFF81FFFF80000003FFFFE3FFFFE7FFFFE000000FFFFFFFFFFFFFFFFFF000001FFFFFFFFFFFFFFFFFF800003FFFFFFFFFFFFFFFFFFC0000FFFFFFFFFFFFFFFFFFFF0000FFFE3FFFFE7FFFFE7FFF0000FFFC1FFFFC1FFFF81FFF0000FFF007FFF00FFFF00FFF0000FFE003FFE007FFC007FF0000FF8000FFC001FF8001FF00007F00007F0000FE0000FE00';
			else if (str==='BAD')
				data='0000000001FFFFFFFFE00000000000007FFFFFFFFFFFE0000000000FFFFFFFFFFFFFFE000000007FFFFFFFFFFFFFFF00000003FFFFFFFFFFFFFFFF0000001FFFFFC00000007FFF0000007FFFF0000000000070000001FFFF80000000000000000007FFFC0000000000000000000FFFE00000000000000000001FFF800000000000000000007FFF00000000000000000000FFFC00000000000000000000FFF800000000000000000000FFF000000000000000000000FFC0000000000000000000';
			else if (str==='SAD')
				data='00000007FFFFFFFFE0000000000000FFFFFFFFFFFF000000000007FFFFFFFFFFFFF0000000003FFFFFFFFFFFFFFC00000000FFFE000000007FFF00000003FFE00000000007FFC000000FFF800000000000FFF000001FFC0000000000003FF800003FF80000000000000FFC00007FE000000000000007FE00007FC000000000000003FF0000FF8000000000000001FF0000FF0000000000000000FF0000FF0000000000000000FF0000FF0000000000000000FF0000FF00000000000000007F00';
			else if (str==='SHOUTING')
				data='0000000000FFFF00000000000000000007FFFFE000000000000000001FFE7FF800000000000000003FC003FC00000000000000007E00007E0000000000000000FC00003F0000000000000000F800001F0000000000000000F800001F0000000000000000F800001F0000000000000000F81FFE1F0000000000000000FDFFFFFF00000000000000007FFFFFFE00000000000000003FF003FC00000000000000001FFF7FF8000000000000000007FFFFE0000000000000000000FFFF0000000000';
			else if (str==='SICK')
				data='000000003C00003C00000000000000003E00007C00000000000000003E00007C00000000000000003F1FF0FC00000000000000001F7FFEF800000000000000001FFFFFF800000000000000000FFFFFF000000000000000000FFFFFF000000000000000000FF00FF000000000000000000FC003F000000000000000000F8001F000000000000000001F0000F800000000000000003F0000FC00000000000000003F0000FC00000000000000003E00007C00000000000000003C00003C00000000';
			else if (str==='SMILE')
				data='00FF8000000000000000FE0000FFC000000000000003FF0000FFC000000000000003FF0000FFC000000000000003FF0000FFE000000000000007FF0000FFF000000000000007FF00007FF80000000000001FFE00003FFE0000000000003FFE00001FFF800000000000FFFC00000FFFE00000000007FFF8000007FFFF000000007FFFE0000001FFFFFFFFFFFFFFFF800000007FFFFFFFFFFFFFFE000000000FFFFFFFFFFFFFF80000000000FFFFFFFFFFFF8000000000000FFFFFFFFFF0000000';
			else if (str==='SMILE_TEETH')
				data='003FFFFFFFFFFFFFFFFFFC0000FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF00007C00001E00001E00003E00007E00001E00001E00007E00003F00001E00001E0000FC00003FFFFFFFFFFFFFFFFFFC00001FDFFFF3FFFFF3FFFBF8000007C000000000000007E0000003F80000000000003FC0000000FF800000000001FF000000003FF0000000000FFC000000000FFFC0000003FFF00000000000FFFFFFFFFFFF0000000000000FFFFFFFFFF0000000000000001FFFFFF800000000';
			else if (str==='TONGUE')
				data='00FF8000000000000001FF0000FF8000000000000001FF0000FFC000000000000003FF0000FFE000000000000007FF00007FFC0000000000003FFE00001FFF800000000001FFF8000007FFFE000000007FFFE0000000FFFFFFFFFFFFFFFF000000000FFFFFFFFFFFFFFFC0000000003FFFFFFFFFFFFFF00000000000000003FFC07FFC0000000000000000FFF81FFE00000000000000003FFE07FE00000000000000000FFFFFFE000000000000000003FFFFFC0000000000000000007FFFF000';
			else if (str==='WIDE_SMILE')
				data='00FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFFFFFFFFFF0000FF8000000000000001FF0000FFC000000000000003FF00007FE000000000000007FE00003FF00000000000000FFC00001FFC0000000000003FF800000FFF800000000001FFF0000003FFF0000000000FFFC0000000FFFF80000001FFFF000000003FFFFFFFFFFFFFFC000000000FFFFFFFFFFFFFF00000000000FFFFFFFFFFFF00000000000007FFFFFFFFE0000000';
			//var dropdown_configuration = this.getFieldValue('CONFIGURATION') || '';
			var row1,row2,row3,row4,row5,row6,row7,row8;
			var col1,col2,col3,col4,col5,col6,col7,col8;
			var code='';
			var pos_ini=0;
			for (var i=0;i<192;i++)
			{
				code+='0x'+data.substr(pos_ini,2)+',';
				pos_ini+=2;
			}
			code=code.substr(0,code.length-1);
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

			Blockly.Blocks.oled_128x32_main_image = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_main_image'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_MAIN_IMAGE_NAME','LANG_OLED_96x16_IMAGE','LANG_OLED_CENTRAL_ICON_BORED','LANG_OLED_CENTRAL_ICON_CALM','LANG_OLED_CENTRAL_ICON_CONFUSED','LANG_OLED_CENTRAL_ICON_COOL','LANG_OLED_CENTRAL_ICON_CRYING','LANG_OLED_CENTRAL_ICON_KISS','LANG_OLED_CENTRAL_ICON_KISS','LANG_OLED_CENTRAL_ICON_MUSTACHE','LANG_OLED_CENTRAL_ICON_MUTE','LANG_OLED_CENTRAL_ICON_NERVOUS','LANG_OLED_CENTRAL_ICON_BAD','LANG_OLED_CENTRAL_ICON_SAD','LANG_OLED_CENTRAL_ICON_SHOUTING','LANG_OLED_CENTRAL_ICON_SICK','LANG_OLED_CENTRAL_ICON_SMILE','LANG_OLED_CENTRAL_ICON_SMILE_TEETH','LANG_OLED_CENTRAL_ICON_TONGUE','LANG_OLED_CENTRAL_ICON_WIDE_SMILE','LANG_OLED_MAIN_IMAGE_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_MAIN_IMAGE_NAME'),
			  init: function(){
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/oled_image.svg", 22*options.zoom, 22*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_96x16_IMAGE')).appendField(new Blockly.FieldDropdown([
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_BORED'),'BORED'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_CALM'),'CALM'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_CONFUSED'),'CONFUSED'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_COOL'),'COOL'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_CRYING'),'CRYING'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_KISS'),'KISS'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_KISS')+'1','KISS1'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_KISS')+'2','KISS2'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_KISS')+'3','KISS3'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_MUSTACHE'),'MUSTACHE'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_MUTE'),'MUTE'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_NERVOUS'),'NERVOUS'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_BAD'),'BAD'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_SAD'),'SAD'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_SHOUTING'),'SHOUTING'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_SICK'),'SICK'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_SMILE'),'SMILE'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_SMILE_TEETH'),'SMILE_TEETH'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_TONGUE'),'TONGUE'],
				[Facilino.locales.getKey('LANG_OLED_CENTRAL_ICON_WIDE_SMILE'),'WIDE_SMILE']]),'ICON').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,'oled_central_image');
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_MAIN_IMAGE_TOOLTIP'));
			  }
		};

			if (window.FacilinoAdvanced===true)
			{

			Blockly.Arduino.oled_128x32_image_browse = function() {
					var code = '';
					//console.log(this.data);
					if (this.data!==null)
					{
						var image = JSON.parse(this.data);
						code=image.data;
					}
					return [code, Blockly.Arduino.ORDER_ATOMIC];
			};

			Blockly.Blocks.oled_128x32_image_browse = {
				category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
				tags: ['oled','screen'],
				helpUrl: Facilino.getHelpUrl('oled_128x32_image_browse'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
				colour: Facilino.LANG_COLOUR_SCREEN_OLED,
				keys: ['LANG_OLED_IMAGE_BROWSE_NAME','LANG_OLED_IMAGE_BROWSE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_OLED_IMAGE_BROWSE_NAME'),
				init: function() {
					this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/oled_image.svg", 22*options.zoom, 22*options.zoom, "*")).appendField(new Blockly.FieldTextInput('image_name'),'IMAGE_NAME').appendField(new Blockly.FieldButton('Browse...',null),'IMAGE').setAlign(Blockly.ALIGN_RIGHT);
					this.setOutput(true,'oled_custom_image');
					this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
					Facilino.NumImages=Facilino.NumImages+1;
					this.NumImages=Facilino.NumImages;
					//this.setFieldValue('Image'+this.NumImages,'IMAGE_LABEL');
					this.setTooltip(Facilino.locales.getKey('LANG_OLED_IMAGE_BROWSE_TOOLTIP'));
				},
				onchange: function()
				{
					if (this.data!==null){
						var image = JSON.parse(this.data);
						if (image.name!==undefined)
						{
							image.name=this.getFieldValue('IMAGE_NAME');
							this.data=JSON.stringify(image);
							this.setWarningText(null);
						}
						else
							this.setWarningText('No image selected!');
					}
					else
						this.setWarningText('No image selected!');
				}
			};
			
			}

			Blockly.Arduino.oled_128x32_image_empty = function() {
					var code = '';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
			};

			Blockly.Blocks.oled_128x32_image_empty = {
				category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
				tags: ['oled','screen'],
				helpUrl: Facilino.getHelpUrl('oled_128x32_image_empty'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
				colour: Facilino.LANG_COLOUR_SCREEN_OLED,
				keys: ['LANG_OLED_EMPTY_IMAGE_NAME','LANG_OLED_EMPTY','LANG_OLED_EMPTY_IMAGE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_OLED_EMPTY_IMAGE_NAME'),
				init: function() {
					this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/oled_image.svg", 22*options.zoom, 22*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_EMPTY')).setAlign(Blockly.ALIGN_RIGHT);
					this.setPreviousStatement(false,null);
					this.setNextStatement(false,null);
					this.setOutput(true,'oled_empty_image');
					this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
					Facilino.NumImages=Facilino.NumImages+1;
					this.NumImages=Facilino.NumImages;
					//this.setFieldValue('Image'+this.NumImages,'IMAGE_LABEL');
					this.setTooltip(Facilino.locales.getKey('LANG_OLED_EMPTY_IMAGE_TOOLTIP'));
				}
			};

		
			Blockly.Arduino.oled_128x32_draw_line = function()
		{
			var code='';
			var x0= Blockly.Arduino.valueToCode(this,'X0', Blockly.Arduino.ORDER_ATOMIC);
			var y0= Blockly.Arduino.valueToCode(this,'Y0', Blockly.Arduino.ORDER_ATOMIC);
			var x1= Blockly.Arduino.valueToCode(this,'X1', Blockly.Arduino.ORDER_ATOMIC);
			var y1= Blockly.Arduino.valueToCode(this,'Y1', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			Blockly.Arduino.definitions_['define_line_oled']='void lineOLED(int16_t x0, int16_t y0, int16_t x1, int16_t y1){\n  oled_display.drawLine(x0,y0,x1,y1,WHITE);\n  oled_display.display();\n  delay(1);\n}\n';
			code='lineOLED('+x0+','+y0+','+x1+','+y1+');\n';
			return code;
		};

		Blockly.Blocks.oled_128x32_draw_line = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_GEOMETRY'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_draw_line'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_LINE_NAME','LANG_OLED_LINE','LANG_OLED_SET_COORDINATE_X','LANG_OLED_SET_COORDINATE_Y','LANG_OLED_LINE_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_LINE_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_LINE'))
				this.appendValueInput('X0').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y0').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('X1').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_X')+'1').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y1').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_Y')+'1').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_LINE_TOOLTIP'));
			  }
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.oled_128x32_draw_line['subsubcategory'];

		Blockly.Arduino.oled_128x32_draw_rect = function()
		{
			var code='';
			var x0= Blockly.Arduino.valueToCode(this,'X0', Blockly.Arduino.ORDER_ATOMIC);
			var y0= Blockly.Arduino.valueToCode(this,'Y0', Blockly.Arduino.ORDER_ATOMIC);
			var w= Blockly.Arduino.valueToCode(this,'W', Blockly.Arduino.ORDER_ATOMIC);
			var h= Blockly.Arduino.valueToCode(this,'H', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			Blockly.Arduino.definitions_['define_rect_oled']='void rectOLED(int16_t x0, int16_t y0, int16_t w, int16_t h, bool fill){\n  if (fill)\n	oled_display.fillRect(x0,y0,w,h,WHITE);\n  else\n	oled_display.drawRect(x0,y0,w,h,WHITE);\n  oled_display.display();\n  delay(1);\n}\n';
			if (this.getFieldValue('FILL')==='FALSE')
			  code='rectOLED('+x0+','+y0+','+w+','+h+',false);\n';
			else
			  code='rectOLED('+x0+','+y0+','+w+','+h+',true);\n';
			return code;
		};

		Blockly.Blocks.oled_128x32_draw_rect = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_GEOMETRY'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_draw_rect'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_RECT_NAME','LANG_OLED_RECT','LANG_OLED_FILL','LANG_OLED_SET_COORDINATE_X','LANG_OLED_SET_COORDINATE_Y','LANG_OLED_SET_COORDINATE_WIDTH','LANG_OLED_SET_COORDINATE_HEIGHT','LANG_OLED_RECT_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_RECT_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_RECT')).appendField(Facilino.locales.getKey('LANG_OLED_FILL')).appendField(new Blockly.FieldCheckbox('FALSE'),'FILL');
				this.appendValueInput('X0').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y0').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('W').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_WIDTH')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('H').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_HEIGHT')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_RECT_TOOLTIP'));
			  }
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.oled_128x32_draw_rect['subsubcategory'];

		Blockly.Arduino.oled_128x32_draw_circle = function()
		{
			var code='';
			var x0= Blockly.Arduino.valueToCode(this,'X0', Blockly.Arduino.ORDER_ATOMIC);
			var y0= Blockly.Arduino.valueToCode(this,'Y0', Blockly.Arduino.ORDER_ATOMIC);
			var r= Blockly.Arduino.valueToCode(this,'R', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			Blockly.Arduino.definitions_['define_circle_oled']='void circleOLED(int16_t x0, int16_t y0, int16_t r, bool fill){\n  if (fill)\n	oled_display.fillCircle(x0,y0,r,WHITE);\n  else\n	oled_display.drawCircle(x0,y0,r,WHITE);\n  oled_display.display();\n  delay(1);\n}\n';
			if (this.getFieldValue('FILL')==='FALSE')
			  code='circleOLED('+x0+','+y0+','+r+',false);\n';
			else
			  code='circleOLED('+x0+','+y0+','+r+',true);\n';
			return code;
		};

		Blockly.Blocks.oled_128x32_draw_circle = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_GEOMETRY'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_draw_circle'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_CIRCLE_NAME','LANG_OLED_CIRCLE','LANG_OLED_FILL','LANG_OLED_SET_COORDINATE_X','LANG_OLED_SET_COORDINATE_Y','LANG_OLED_SET_RADIUS','LANG_OLED_CIRCLE_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_CIRCLE_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_CIRCLE')).appendField(Facilino.locales.getKey('LANG_OLED_FILL')).appendField(new Blockly.FieldCheckbox('FALSE'),'FILL');
				this.appendValueInput('X0').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y0').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('R').appendField(Facilino.locales.getKey('LANG_OLED_SET_RADIUS')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_CIRCLE_TOOLTIP'));
			  }
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.oled_128x32_draw_circle['subsubcategory'];

		Blockly.Arduino.oled_128x32_draw_triangle = function()
		{
			var code='';
			var x0= Blockly.Arduino.valueToCode(this,'X0', Blockly.Arduino.ORDER_ATOMIC);
			var y0= Blockly.Arduino.valueToCode(this,'Y0', Blockly.Arduino.ORDER_ATOMIC);
			var x1= Blockly.Arduino.valueToCode(this,'X1', Blockly.Arduino.ORDER_ATOMIC);
			var y1= Blockly.Arduino.valueToCode(this,'Y1', Blockly.Arduino.ORDER_ATOMIC);
			var x2= Blockly.Arduino.valueToCode(this,'X2', Blockly.Arduino.ORDER_ATOMIC);
			var y2= Blockly.Arduino.valueToCode(this,'Y2', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			Blockly.Arduino.definitions_['adafruit_gfx']='#include <Adafruit_GFX.h>';
			Blockly.Arduino.definitions_['adafruit_ssd1306']='#include <Adafruit_SSD1306.h>';
			Blockly.Arduino.definitions_['declare_var_oled_display']='Adafruit_SSD1306 oled_display(4);\n';
			Blockly.Arduino.setups_['setup_oled_display']='oled_display.begin(SSD1306_SWITCHCAPVCC, 0x3C);\n  oled_display.clearDisplay();\n  oled_display.setTextColor(WHITE);\n  oled_display.display();\n  delay(1);\n';
			Blockly.Arduino.definitions_['define_triangle_oled']='void triangleOLED(int16_t x0, int16_t y0, int16_t x1, int16_t y1, int16_t x2, int16_t y2, bool fill){\n  if (fill)\n	oled_display.fillTriangle(x0,y0,x1,y1,x2,y2,WHITE);\n  else\n	oled_display.drawTriangle(x0,y0,x1,y1,x2,y2,WHITE);\n  oled_display.display();\n  delay(1);\n}\n';
			if (this.getFieldValue('FILL')==='FALSE')
			  code='triangleOLED('+x0+','+y0+','+x1+','+y1+','+x2+','+y2+',false);\n';
			else
			  code='triangleOLED('+x0+','+y0+','+x1+','+y1+','+x2+','+y2+',true);\n';
			return code;
		};

		Blockly.Blocks.oled_128x32_draw_triangle = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_OLED'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_GEOMETRY'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  colour: Facilino.LANG_COLOUR_SCREEN_OLED,
			  helpUrl: Facilino.getHelpUrl('oled_128x32_draw_triangle'),
			  tags: [],
			  examples: [],
			  keys: ['LANG_OLED_TRIANGLE_NAME','LANG_OLED_TRIANGLE','LANG_OLED_FILL','LANG_OLED_SET_COORDINATE_X','LANG_OLED_SET_COORDINATE_Y','LANG_OLED_TRIANGLE_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_OLED_TRIANGLE_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/oled.svg", 24*options.zoom, 24*options.zoom, "*")).appendField(Facilino.locales.getKey('LANG_OLED_TRIANGLE')).appendField(Facilino.locales.getKey('LANG_OLED_FILL')).appendField(new Blockly.FieldCheckbox('FALSE'),'FILL');
				this.appendValueInput('X0').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_X')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y0').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_Y')+'0').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('X1').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_X')+'1').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y1').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_Y')+'1').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('X2').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_X')+'2').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y2').appendField(Facilino.locales.getKey('LANG_OLED_SET_COORDINATE_Y')+'2').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_OLED);
				this.setTooltip(Facilino.locales.getKey('LANG_OLED_TRIANGLE_TOOLTIP'));
			  }
		};
		
		if (window.FacilinoAdvanced===false)
			delete Blockly.Blocks.oled_128x32_draw_triangle['subsubcategory'];
		
	
	};
		
		
	var FacilinoOLED = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoOLED;
	} else {
		window.FacilinoOLED = FacilinoOLED;
	}
}));
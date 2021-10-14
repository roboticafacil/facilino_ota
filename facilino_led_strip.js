(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
	
			Blockly.Arduino['led_strip_all_pixels'] = function(block) {
			  var code='';
			  return [code,Blockly.Arduino.ORDER_NONE];
			};

			Blockly.Blocks['led_strip_all_pixels'] = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_WS2812'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN,
			  colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			  helpUrl: Facilino.getHelpUrl('led_strip_all_pixels'),
			  tags: ['led_strip','RGB','LED'],
			  examples: [],
			  keys: ['LANG_SIMPLEEXPRESSIONS_LED_STRIP_ALL_PIXELS_NAME','LANG_SIMPLEEXPRESSIONS_ALL_PIXELS','LANG_SIMPLEEXPRESSIONS_LED_STRIP_ALL_PIXELS_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_ALL_PIXELS_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/led_pixel.svg', 18*options.zoom, 18*options.zoom)).appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_ALL_PIXELS')).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,'ALL_PIXELS');
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.setTooltip(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_ALL_PIXELS_TOOLTIP'));
			  }
			};
				
			Blockly.Arduino['led_strip'] = function(block) {
			  var pixel = Blockly.Arduino.valueToCode(this,'PIXEL',Blockly.Arduino.ORDER_ATOMIC) || '0';
			  var input_color = this.getFieldValue('COLOR');
			  var input_pin = Blockly.Arduino.valueToCode(this,'PIN',Blockly.Arduino.ORDER_NONE) || '';
			  var pixels = this.getFieldValue('PIXELS');
			  //Blockly.Arduino.definitions_['define_simpleexpressions_h'] = '#include <SimpleExpressions.h>';
			  Blockly.Arduino.definitions_['define_neopixel_h'] = '#include <Adafruit_NeoPixel.h>';
			  Blockly.Arduino.definitions_['define_avr_power_h'] = '#ifdef __AVR__\n  #include <avr/power.h>\n#endif';
			  Blockly.Arduino.definitions_['declare_var_led_strip_'+input_pin]='Adafruit_NeoPixel _led_strip_'+input_pin+'('+pixels+','+input_pin+', NEO_GRB + NEO_KHZ800);\n';

			  Blockly.Arduino.setups_['setup_simpleexpressions_led_strip'+input_pin] = '_led_strip_'+input_pin+'.begin();\n  clearpixels_'+input_pin+'();\n  _led_strip_'+input_pin+'.setBrightness(map(10,0,100,0,255));\n';

			  Blockly.Arduino.definitions_['define_clearpixels'+input_pin]='void clearpixels_'+input_pin+'()\n{\n  uint16_t n=_led_strip_'+input_pin+'.numPixels();\n  for(uint16_t i = 0; i < n; i++) {\n	_led_strip_'+input_pin+'.setPixelColor(i, 0);\n  }\n  delay(1);\n}\n';
			  Blockly.Arduino.definitions_['define_writepixel'+input_pin]='void writepixel_'+input_pin+'(uint16_t pixel, int r, int g, int b)\n{ _led_strip_'+input_pin+'.setPixelColor(pixel, _led_strip_'+input_pin+'.Color(r, g, b));\n  _led_strip_'+input_pin+'.show();\n}\n';

			  var color_rgb=Facilino.hexToRgb(input_color);
			  block = this.getInputTargetBlock('PIXEL');
			  var code='';
			  if (block!=null)
			  {
				if (block.type==='led_strip_all_pixels')
				{
					code+='for (int i=0;i<'+pixels+';i++){\n';
					code+='  writepixel_'+input_pin+'(i,'+color_rgb.r +','+color_rgb.g+','+color_rgb.b+');\n';
					code+='}\n';
				}
				else
					code='writepixel_'+input_pin+'('+pixel+','+color_rgb.r +','+color_rgb.g+','+color_rgb.b+');\n' ;
			  }
			  return code;
			};


			Blockly.Blocks['led_strip'] = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_WS2812'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN,
			  colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			  helpUrl: Facilino.getHelpUrl('led_strip'),
			  tags: ['led_strip','RGB','LED'],
			  examples: [],
			  keys: ['LANG_SIMPLEEXPRESSIONS_LED_STRIP_NAME','LANG_SIMPLEEXPRESSIONS_LED_STRIP','LANG_SIMPLEEXPRESSIONS_PIN','LANG_SIMPLEEXPRESSIONS_PIXELS','LANG_SIMPLEEXPRESSIONS_PIXEL','LANG_SIMPLEEXPRESSIONS_COLOR','LANG_SIMPLEEXPRESSIONS_LED_STRIP_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP')).appendField(new Blockly.FieldImage('img/blocks/led_strip.svg',22*options.zoom,22*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIXELS')).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldImage('img/blocks/led_pixels.svg',22*options.zoom,22*options.zoom)).appendField(new Blockly.FieldNumber(150,0),'PIXELS');
				this.appendValueInput('PIXEL').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIXEL')).appendField(new Blockly.FieldImage('img/blocks/led_pixel.svg', 18*options.zoom, 18*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable','ALL_PIXELS']);
				var colour = new Blockly.FieldColour('#000000');
				colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).setColumns(4);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_COLOR')).appendField(colour,'COLOR').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.setTooltip(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_TOOLTIP'));
			  }
			};
			
			if (window.FacilinoAdvanced===true)
			{
			Blockly.Arduino['led_strip_hue'] = function(block) {
			  var hue = Blockly.Arduino.valueToCode(this,'HUE',Blockly.Arduino.ORDER_ATOMIC) || '0';
			  var pixel = Blockly.Arduino.valueToCode(this,'PIXEL',Blockly.Arduino.ORDER_ATOMIC) || '0';
			  var input_pin = Blockly.Arduino.valueToCode(this,'PIN',Blockly.Arduino.ORDER_NONE) || '';
			  var pixels = this.getFieldValue('PIXELS');
			  //Blockly.Arduino.definitions_['define_simpleexpressions_h'] = '#include <SimpleExpressions.h>';
			  Blockly.Arduino.definitions_['define_neopixel_h'] = '#include <Adafruit_NeoPixel.h>';
			  Blockly.Arduino.definitions_['define_avr_power_h'] = '#ifdef __AVR__\n  #include <avr/power.h>\n#endif';
			  Blockly.Arduino.definitions_['declare_var_led_strip_'+input_pin]='Adafruit_NeoPixel _led_strip_'+input_pin+'('+pixels+','+input_pin+', NEO_GRB + NEO_KHZ800);\n';

			  Blockly.Arduino.setups_['setup_simpleexpressions_led_strip'+input_pin] = '_led_strip_'+input_pin+'.begin();\n  clearpixels_'+input_pin+'();\n  _led_strip_'+input_pin+'.setBrightness(map(10,0,100,0,255));\n';

			  Blockly.Arduino.definitions_['define_clearpixels'+input_pin]='void clearpixels_'+input_pin+'()\n{\n  uint16_t n=_led_strip_'+input_pin+'.numPixels();\n  for(uint16_t i = 0; i < n; i++) {\n	_led_strip_'+input_pin+'.setPixelColor(i, 0);\n  }\n  delay(1);\n}\n';
			  Blockly.Arduino.definitions_['define_writepixel'+input_pin]='void writepixel_'+input_pin+'(uint16_t pixel, int r, int g, int b)\n{ _led_strip_'+input_pin+'.setPixelColor(pixel, _led_strip_'+input_pin+'.Color(r, g, b));\n  _led_strip_'+input_pin+'.show();\n}\n';

			  var code='{\n';
			  code +='    uint32_t  _color=Adafruit_NeoPixel::ColorHSV('+hue+',255,255);\n';
			  block = this.getInputTargetBlock('PIXEL');
			  if (block!=null)
			  {
				if (block.type==='led_strip_all_pixels')
				{
					code+='    for (int i=0;i<'+pixels+';i++){\n';
					code+='      writepixel_'+input_pin+'(i,(_color>>16)&0x000000FF,(_color>>8)&0x000000FF,_color&0x000000FF);\n';
					code+='    }\n';
				}
				else
					code+='    writepixel_'+input_pin+'('+pixel+',(_color>>16)&0x000000FF,(_color>>8)&0x000000FF,_color&0x000000FF);\n';
			  }
			  code+='}\n';
			  return code;
			};


			Blockly.Blocks['led_strip_hue'] = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_WS2812'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN,
			  colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			  helpUrl: Facilino.getHelpUrl('led_strip_hue'),
			  tags: ['led_strip','RGB','LED'],
			  examples: [],
			  keys: ['LANG_SIMPLEEXPRESSIONS_LED_STRIP_HUE_NAME','LANG_SIMPLEEXPRESSIONS_LED_STRIP','LANG_SIMPLEEXPRESSIONS_PIN','LANG_SIMPLEEXPRESSIONS_PIXEL','LANG_SIMPLEEXPRESSIONS_PIXELS','LANG_SIMPLEEXPRESSIONS_HUE','LANG_SIMPLEEXPRESSIONS_LED_STRIP_HUE_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_HUE_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP')).appendField(new Blockly.FieldImage('img/blocks/led_strip.svg',22*options.zoom,22*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIXELS')).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldImage('img/blocks/led_pixels.svg',22*options.zoom,22*options.zoom)).appendField(new Blockly.FieldNumber(150,0),'PIXELS');
				this.appendValueInput('PIXEL').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIXEL')).appendField(new Blockly.FieldImage('img/blocks/led_pixel.svg', 18*options.zoom, 18*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable','ALL_PIXELS']);
				this.appendValueInput('HUE').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_HUE')).appendField(new Blockly.FieldImage('img/blocks/color-circle.svg',22*options.zoom,22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.setTooltip(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_HUE_TOOLTIP'));
			  }
			};
			
			Blockly.Arduino['led_strip_gradient'] = function(block) {
			  var initial_hue = Blockly.Arduino.valueToCode(this,'INITIAL_HUE',Blockly.Arduino.ORDER_ATOMIC) || '0';
			  var final_hue = Blockly.Arduino.valueToCode(this,'FINAL_HUE',Blockly.Arduino.ORDER_ATOMIC) || '65535';
			  var input_pin = Blockly.Arduino.valueToCode(this,'PIN',Blockly.Arduino.ORDER_NONE) || '';
			  var pixels = this.getFieldValue('PIXELS');
			  var tornado = this.getFieldValue('TORNADO');
			  //Blockly.Arduino.definitions_['define_simpleexpressions_h'] = '#include <SimpleExpressions.h>';
			  Blockly.Arduino.definitions_['define_neopixel_h'] = '#include <Adafruit_NeoPixel.h>';
			  Blockly.Arduino.definitions_['define_avr_power_h'] = '#ifdef __AVR__\n  #include <avr/power.h>\n#endif';
			  Blockly.Arduino.definitions_['declare_var_led_strip_'+input_pin]='Adafruit_NeoPixel _led_strip_'+input_pin+'('+pixels+','+input_pin+', NEO_GRB + NEO_KHZ800);\n';

			  Blockly.Arduino.setups_['setup_simpleexpressions_led_strip'+input_pin] = '_led_strip_'+input_pin+'.begin();\n  clearpixels_'+input_pin+'();\n  _led_strip_'+input_pin+'.setBrightness(map(10,0,100,0,255));\n';

			  Blockly.Arduino.definitions_['define_clearpixels'+input_pin]='void clearpixels_'+input_pin+'()\n{\n  uint16_t n=_led_strip_'+input_pin+'.numPixels();\n  for(uint16_t i = 0; i < n; i++) {\n	_led_strip_'+input_pin+'.setPixelColor(i, 0);\n  }\n  delay(1);\n}\n';
			  Blockly.Arduino.definitions_['define_writepixel'+input_pin]='void writepixel_'+input_pin+'(uint16_t pixel, int r, int g, int b)\n{ _led_strip_'+input_pin+'.setPixelColor(pixel, _led_strip_'+input_pin+'.Color(r, g, b));\n  _led_strip_'+input_pin+'.show();\n}\n';

			  var code='{\n';
			  var from_input=this.getInputTargetBlock('INITIAL_HUE');
			  var to_input=this.getInputTargetBlock('FINAL_HUE');
			  
			  if (from_input&&to_input)
			  {
				var from_type=this.getInputTargetBlock('INITIAL_HUE').type;
				var to_type=this.getInputTargetBlock('FINAL_HUE').type;
				if ((from_type=='variables_get')&&(to_type=='math_number'))
				{
					var up = false;  //We assume that the from input is bigger than the to input
				}
				else if ((from_type=='math_number')&&(to_type=='variables_get'))
					var up = true;  //We assume that the from input is smaller than the from input
				else if ((from_type=='math_number')&&(to_type=='math_number'))
					var up = parseFloat(initial_hue) <= parseFloat(final_hue);
				else
					var up = parseFloat(initial_hue) <= parseFloat(final_hue);
				code +='    int _hue_inc=('+(up ? (final_hue+'-'+initial_hue) : (initial_hue+'-'+final_hue))+')/'+pixels+';\n';
				code +='    int _hue='+initial_hue+';\n';
				code +='    for (int i=0;i<'+pixels+';i++){\n';
				code +='      uint32_t  _color=Adafruit_NeoPixel::ColorHSV(_hue,255,255);\n';
				console.log(tornado);
				if (tornado==='TRUE')
						code+='      delay(10);\n';
				code +='      _hue' + (up ? '+=_hue_inc' : '-=_hue_inc')+';\n';
				code +='      writepixel_'+input_pin+'(i,(_color>>16)&0x000000FF,(_color>>8)&0x000000FF,_color&0x000000FF);\n';
				code+='    }\n';
			  }
			  code+='}\n';
			  return code;
			};


			Blockly.Blocks['led_strip_gradient'] = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_WS2812'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN,
			  colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			  helpUrl: Facilino.getHelpUrl('led_strip_gradient'),
			  tags: ['led_strip','RGB','LED'],
			  examples: [],
			  keys: ['LANG_SIMPLEEXPRESSIONS_LED_STRIP_GRADIENT_NAME','LANG_SIMPLEEXPRESSIONS_LED_STRIP','LANG_SIMPLEEXPRESSIONS_PIN','LANG_SIMPLEEXPRESSIONS_PIXEL','LANG_SIMPLEEXPRESSIONS_PIXELS','LANG_SIMPLEEXPRESSIONS_INITIAL_HUE','LANG_SIMPLEEXPRESSIONS_FINAL_HUE','LANG_SIMPLEEXPRESSIONS_LED_STRIP_GRADIENT_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_GRADIENT_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP')).appendField(new Blockly.FieldImage('img/blocks/led_strip.svg',22*options.zoom,22*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIXELS')).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldImage('img/blocks/led_pixels.svg',22*options.zoom,22*options.zoom)).appendField(new Blockly.FieldNumber(150,0),'PIXELS');
				this.appendValueInput('INITIAL_HUE').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_INITIAL_HUE')).appendField(new Blockly.FieldImage('img/blocks/color-circle.svg',22*options.zoom,22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.appendValueInput('FINAL_HUE').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_FINAL_HUE')).appendField(new Blockly.FieldImage('img/blocks/color-circle.svg',22*options.zoom,22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/tornado.svg',22*options.zoom,22*options.zoom)).appendField(new Blockly.FieldCheckbox('FALSE'),'TORNADO').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.setTooltip(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_GRADIENT_TOOLTIP'));
			  },
			  onchange: function() {
				var from_input=this.getInputTargetBlock('INITIAL_HUE');
				var to_input=this.getInputTargetBlock('FINAL_HUE');
				if (from_input&&to_input)
				{
					var from_type=from_input.type;
					var to_type=to_input.type;
					if ((from_type=='variables_get')&&(to_type=='math_number'))
						this.setWarningText(Facilino.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING1'));
					else if ((from_type=='math_number')&&(to_type=='variables_get'))
						this.setWarningText(Facilino.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING2'));
					else if ((from_type=='math_number')&&(to_type=='math_number'))
						this.setWarningText(null);
					else
						this.setWarningText(Facilino.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING3'));
				}
				else
					this.setWarningText(Facilino.locales.getKey('LANG_CONTROLS_FOR_LOOP_WARNING4'));
			}
			};
			}

			Blockly.Arduino['led_strip2'] = function(block) {
			  //var pixels = Blockly.Arduino.valueToCode(this,'PIXELS',Blockly.Arduino.ORDER_ATOMIC) || '';
			  var pixels = this.getFieldValue('PIXELS');
			  var input_pin = Blockly.Arduino.valueToCode(this,'PIN',Blockly.Arduino.ORDER_NONE) || '';
			  Blockly.Arduino.definitions_['define_neopixel_h'] = '#include <Adafruit_NeoPixel.h>';
			  Blockly.Arduino.definitions_['define_avr_power_h'] = '#ifdef __AVR__\n  #include <avr/power.h>\n#endif';
			  Blockly.Arduino.definitions_['declare_var_led_strip_'+input_pin]='Adafruit_NeoPixel _led_strip_'+input_pin+'('+pixels+','+input_pin+', NEO_GRB + NEO_KHZ800);\n';

			  Blockly.Arduino.setups_['setup_simpleexpressions_led_strip'+input_pin] = '_led_strip_'+input_pin+'.begin();\n  clearpixels_'+input_pin+'();\n  _led_strip_'+input_pin+'.setBrightness(map(10,0,100,0,255));\n';

			  Blockly.Arduino.definitions_['define_clearpixels'+input_pin]='void clearpixels_'+input_pin+'()\n{\n  uint16_t n=_led_strip_'+input_pin+'.numPixels();\n  for(uint16_t i = 0; i < n; i++) {\n	_led_strip_'+input_pin+'.setPixelColor(i, 0);\n  }\n  delay(1);\n}\n';
			  Blockly.Arduino.definitions_['define_writepixel'+input_pin]='void writepixel_'+input_pin+'(uint16_t pixel, int r, int g, int b)\n{ _led_strip_'+input_pin+'.setPixelColor(pixel, _led_strip_'+input_pin+'.Color(r, g, b));\n  _led_strip_'+input_pin+'.show();\n}\n';
			  var code ='';

			  try{
				for (var i=0;i<pixels;i++)
				  {
					  var input_color = this.getFieldValue('COLOR'+i);
					  var color_rgb=Facilino.hexToRgb(input_color);
					  code+='writepixel_'+input_pin+'('+i+','+color_rgb.r +','+color_rgb.g+','+color_rgb.b+');\n';
				  }
			  }
			  catch(e)
			  {}
			  return code;
			};

			Blockly.Blocks['led_strip2'] = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_WS2812'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN,
			  colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			  helpUrl: Facilino.getHelpUrl('led_strip2'),
			  tags: ['led_strip','RGB','LED'],
			  examples: [],
			  keys: ['LANG_SIMPLEEXPRESSIONS_LED_STRIP','LANG_SIMPLEEXPRESSIONS_PIN','LANG_SIMPLEEXPRESSIONS_PIXELS','LANG_SIMPLEEXPRESSIONS_LED_STRIP2_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP2_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP')).appendField(new Blockly.FieldImage('img/blocks/led_strip.svg',22*options.zoom,22*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.appendDummyInput('COLORS').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIXELS')).appendField(new Blockly.FieldImage('img/blocks/led_pixels.svg',22*options.zoom,22*options.zoom)).appendField(new Blockly.FieldNumber(0,0),'PIXELS').setAlign(Blockly.ALIGN_RIGHT);

				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(true);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.setTooltip(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP2_TOOLTIP'));
				this.numPixels=0;
			},
			mutationToDom: function() {
				if (!this.numPixels ) {
					return null;
				}
				var container = document.createElement('mutation');
				if (this.numPixels) {
					container.setAttribute('item', this.numPixels);
				}
				return container;
			},
			domToMutation: function(xmlElement) {
				this.numPixels = window.parseInt(xmlElement.getAttribute('item'), 10);
				for (var i=0;i<this.numPixels;i++)
				{
				  var colour = new Blockly.FieldColour('#000000');
				  colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).setColumns(4);
				  this.getInput('COLORS').appendField(colour,'COLOR'+i).setAlign(Blockly.ALIGN_RIGHT);
				}
			},
			  onchange: function() {
				  if (this.getFieldValue('PIXELS')!==this.numPixels)
				  {
					  if (this.numPixels>this.getFieldValue('PIXELS'))
					  {
						  for (var i=this.numPixels-1;i>=this.getFieldValue('PIXELS');i--)
						  {
							  try{
								  this.getInput('COLORS').removeField('COLOR'+i);
							  }
							  catch(e)
							  {
								  console.log(e);
							  }
						  }

					  }
					  else
					  {
						  for (var i=this.numPixels;i<this.getFieldValue('PIXELS');i++)
						  {
							  var colour = new Blockly.FieldColour('#000000');
							  colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).setColumns(4);
							  this.getInput('COLORS').appendField(colour,'COLOR'+i).setAlign(Blockly.ALIGN_RIGHT);
						  }
					  }
					  this.numPixels=this.getFieldValue('PIXELS');
				  }
			  }
			};
			
			Blockly.Arduino['led_strip_brightness'] = function(block) {
			  var brightness = Blockly.Arduino.valueToCode(this,'BRIGHTNESS',Blockly.Arduino.ORDER_ATOMIC) || '';
			  var input_pin = Blockly.Arduino.valueToCode(this,'PIN',Blockly.Arduino.ORDER_NONE) || '';
			  //Blockly.Arduino.definitions_['define_simpleexpressions_h'] = '#include <SimpleExpressions.h>';
			  Blockly.Arduino.definitions_['define_neopixel_h'] = '#include <Adafruit_NeoPixel.h>';
			  Blockly.Arduino.definitions_['define_avr_power_h'] = '#ifdef __AVR__\n  #include <avr/power.h>\n#endif';
			  Blockly.Arduino.definitions_['declare_var_led_strip_'+input_pin]='Adafruit_NeoPixel _led_strip_'+input_pin+'(7,'+input_pin+', NEO_GRB + NEO_KHZ800);\n';

			  Blockly.Arduino.setups_['setup_simpleexpressions_led_strip'+input_pin] = '_led_strip_'+input_pin+'.begin();\n  clearpixels_'+input_pin+'();\n  _led_strip_'+input_pin+'.setBrightness(map(10,0,100,0,255));\n';

			  var code='_led_strip_'+input_pin+'.setBrightness(map('+brightness+',0,100,0,255));\n' ;
			  return code;
			};

			Blockly.Blocks['led_strip_brightness'] = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_WS2812'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN,
			  colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			  helpUrl: Facilino.getHelpUrl('led_strip_brightness'),
			  tags: ['led_strip','RGB','LED'],
			  examples: [],
			  keys: ['LANG_SIMPLEEXPRESSIONS_LED_STRIP_BRIGHTNESS_NAME','LANG_SIMPLEEXPRESSIONS_LED_STRIP_BRIGHTNESS','LANG_SIMPLEEXPRESSIONS_PIN','LANG_SIMPLEEXPRESSIONS_BRIGHTNESS','LANG_SIMPLEEXPRESSIONS_LED_STRIP_BRIGHTNESS_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_BRIGHTNESS_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_BRIGHTNESS')).appendField(new Blockly.FieldImage('img/blocks/led_strip.svg', 40*options.zoom, 22*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.appendValueInput('BRIGHTNESS').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_BRIGHTNESS')+' [%]').appendField(new Blockly.FieldImage('img/blocks/sun.png', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.setTooltip(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_BRIGHTNESS_TOOLTIP'));
			  }
			};
			
			if (window.FacilinoAdvanced===true)
			{
			Blockly.Arduino['led_strip_generic'] = function(block) {
			  var input_expression = Blockly.Arduino.valueToCode(this,'EXPRESSION',Blockly.Arduino.ORDER_NONE) || '';
			  var input_pin = Blockly.Arduino.valueToCode(this,'PIN',Blockly.Arduino.ORDER_NONE) || '';
			  Blockly.Arduino.definitions_['define_neopixel_h'] = '#include <Adafruit_NeoPixel.h>';
			  Blockly.Arduino.definitions_['define_avr_power_h'] = '#ifdef __AVR__\n  #include <avr/power.h>\n#endif';
			  Blockly.Arduino.definitions_['declare_var_led_strip_'+input_pin]='Adafruit_NeoPixel _led_strip_'+input_pin+'(7,'+input_pin+', NEO_GRB + NEO_KHZ800);\n';

			  Blockly.Arduino.setups_['setup_simpleexpressions_led_strip'+input_pin] = '_led_strip_'+input_pin+'.begin();\n  clearpixels_'+input_pin+'();\n  _led_strip_'+input_pin+'.setBrightness(map(10,0,100,0,255));\n';

			  Blockly.Arduino.definitions_['define_clearpixels'+input_pin]='void clearpixels_'+input_pin+'()\n{\n  uint16_t n=_led_strip_'+input_pin+'.numPixels();\n  for(uint16_t i = 0; i < n; i++) {\n	_led_strip_'+input_pin+'.setPixelColor(i, 0);\n  }\n  delay(1);\n}\n';
			  Blockly.Arduino.definitions_['define_writepixels'+input_pin]=' void writepixels_'+input_pin+'(uint32_t data0,uint32_t data1,uint32_t data2,uint32_t data3,uint32_t data4,uint32_t data5,uint32_t data6){\n  _led_strip_'+input_pin+'.setPixelColor(0, _led_strip_'+input_pin+'.Color((data0>>16)&0x0000ff,(data0>>8)&0x0000ff,data0&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(1, _led_strip_'+input_pin+'.Color((data1>>16)&0x0000ff,(data1>>8)&0x0000ff,data1&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(2, _led_strip_'+input_pin+'.Color((data2>>16)&0x0000ff,(data2>>8)&0x0000ff,data2&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(3, _led_strip_'+input_pin+'.Color((data3>>16)&0x0000ff,(data3>>8)&0x0000ff,data3&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(4, _led_strip_'+input_pin+'.Color((data4>>16)&0x0000ff,(data4>>8)&0x0000ff,data4&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(5, _led_strip_'+input_pin+'.Color((data5>>16)&0x0000ff,(data5>>8)&0x0000ff,data5&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(6, _led_strip_'+input_pin+'.Color((data6>>16)&0x0000ff,(data6>>8)&0x0000ff,data6&0x0000ff));\n  _led_strip_'+input_pin+'.show();}\n';

			  var code='writepixels_'+input_pin+'('+input_expression+');\n' ;
			  return code;
			};

			Blockly.Blocks['led_strip_generic'] = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_WS2812'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN,
			  colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			  helpUrl: Facilino.getHelpUrl('led_strip_generic'),
			  tags: ['led_strip','RGB','LED'],
			  examples: [],
			  keys: ['LANG_SIMPLEEXPRESSIONS_SHOW_MOUTH','LANG_SIMPLEEXPRESSIONS_PIN','LANG_SIMPLEEXPRESSIONS_EXPRESSION','LANG_SIMPLEEXPRESSIONS_LED_STRIP_GENERIC_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_GENERIC_NAME'),
			  init: function() {
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_SHOW_MOUTH')).appendField(new Blockly.FieldImage('img/blocks/round_led_strip.svg', 24*options.zoom, 24*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.appendValueInput('EXPRESSION').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_EXPRESSION')).appendField(new Blockly.FieldImage('img/blocks/dot-strip.png', 24*options.zoom, 24*options.zoom)).setCheck('RGB_LEDs_EXPRESSION').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.setTooltip(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_GENERIC_TOOLTIP'));
			  }
			};

			Blockly.Arduino['led_strip_predefined'] = function(block) {
			  var code='';
			  var expression = Number(this.getFieldValue('EXPRESSION'));
			  var input_color = this.getFieldValue('COLOR');
			  input_color=input_color.replace('#','0x');
			  for(var i = 0; i < 7; i++)
			  {
				if (((expression >> i) & 1)===1)
				  code+=input_color+',';
				else
				  code+='0x000000'+',';
			  }
			  code=code.substr(0,code.length-1);
			  return [code,Blockly.Arduino.ORDER_ATOMIC];
			};

			Blockly.Blocks['led_strip_predefined'] = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_WS2812'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN,
			  colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			  helpUrl: Facilino.getHelpUrl('led_strip_predefined'),
			  tags: ['led_strip','RGB','LED'],
			  examples: [],
			  keys: ['LANG_SIMPLEEXPRESSIONS_LED_STRIP_PREDEFINED_NAME','LANG_SIMPLEEXPRESSIONS_LED_STRIP_PREDEFINED_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_PREDEFINED_NAME'),
			  init: function() {
				var colour = new Blockly.FieldColour('#000000');
				colour.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).setColumns(4);
				this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/dot-strip.png', 24*options.zoom, 24*options.zoom)).appendField(new Blockly.FieldDropdown([['Zeros','0'],['Happy Small','12'],['Happy Full','30'],['Sad Small','96'],['Sad Full','114'],['Neutral','19'],['Circle','126'],['Center','1'],['Hook','89'],['Upsidedown Hook','53'],['Kooh','39'],['Upsidedown Kooh','75'],['Cross','109'],['Rect','108'],['Left Arrow','59'],['Right Arrow','87'],['Left Half','56'],['Right Half','70']]),'EXPRESSION').appendField(colour,'COLOR').setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,'RGB_LEDs_EXPRESSION');
				this.setInputsInline(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.setTooltip(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_PREDEFINED_TOOLTIP'));
			  }
			};

			Blockly.Arduino['led_strip_customized'] = function(block) {
			  var code='';
			  for (var i=0;i<7;i++)
			  {
				var input_color = this.getFieldValue('COLOR'+i);
				code+=input_color.replace('#','0x')+',';
			  }
			  code=code.substr(0,code.length-1);
			  return [code,Blockly.Arduino.ORDER_ATOMIC];
			};

			Blockly.Blocks['led_strip_customized'] = {
			  category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			  subcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_WS2812'),
			  category_colour: Facilino.LANG_COLOUR_SCREEN,
			  colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			  helpUrl: Facilino.getHelpUrl('led_strip_customized'),
			  tags: ['led_strip','RGB','LED'],
			  examples: [],
			  keys: ['LANG_SIMPLEEXPRESSIONS_LED_STRIP_CUSTOMIZED_NAME','LANG_SIMPLEEXPRESSIONS_LED_STRIP_CUSTOMIZED_TOOLTIP'],
			  name: Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_CUSTOMIZED_NAME'),
			  init: function() {
				var colour0 = new Blockly.FieldColour('#000000');
				colour0.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).setColumns(4);
				var colour1 = new Blockly.FieldColour('#000000');
				colour1.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).setColumns(4);
				var colour2 = new Blockly.FieldColour('#000000');
				colour2.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).setColumns(4);
				var colour3 = new Blockly.FieldColour('#000000');
				colour3.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).setColumns(4);
				var colour4 = new Blockly.FieldColour('#000000');
				colour4.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).setColumns(4);
				var colour5 = new Blockly.FieldColour('#000000');
				colour5.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).setColumns(4);
				var colour6 = new Blockly.FieldColour('#000000');
				colour6.setColours(['#000000','#808080','#C0C0C0','#FFFFFF','#800000','#FF0000','#808000','#FFFF00','#008000','#00FF00','#008080','#00FFFF','#000080','#0000FF','#800080','#FF00FF']).setColumns(4);
				this.appendDummyInput('').appendField(' ').appendField(colour5,'COLOR5').appendField(colour6,'COLOR6');
				this.appendDummyInput('').appendField(colour4,'COLOR4').appendField(colour0,'COLOR0').appendField(colour1,'COLOR1');
				this.appendDummyInput('').appendField(' ').appendField(colour3,'COLOR3').appendField(colour2,'COLOR2');
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,'RGB_LEDs_EXPRESSION');
				this.setInputsInline(false);
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.setTooltip(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_CUSTOMIZED_TOOLTIP'));
			  }
			};

			Blockly.Arduino['led_strip_stream'] = function(block) {
			  var input_expression = Blockly.Arduino.valueToCode(this,'STREAM',Blockly.Arduino.ORDER_NONE) || '';
			  var input_pin = Blockly.Arduino.valueToCode(this,'PIN',Blockly.Arduino.ORDER_NONE) || '';
			  var delay = Blockly.Arduino.valueToCode(this,'DELAY',Blockly.Arduino.ORDER_NONE) || '';
			  var background = this.getFieldValue('BACKGROUND');
			  var code='';
			  Blockly.Arduino.definitions_['define_neopixel_h'] = '#include <Adafruit_NeoPixel.h>';
			  Blockly.Arduino.definitions_['define_avr_power_h'] = '#ifdef __AVR__\n  #include <avr/power.h>\n#endif';
			  Blockly.Arduino.definitions_['declare_var_led_strip_'+input_pin]='Adafruit_NeoPixel _led_strip_'+input_pin+'(7,'+input_pin+', NEO_GRB + NEO_KHZ800);\n';

			  Blockly.Arduino.setups_['setup_simpleexpressions_led_strip'+input_pin] = '_led_strip_'+input_pin+'.begin();\n  clearpixels_'+input_pin+'();\n  _led_strip_'+input_pin+'.setBrightness(map(10,0,100,0,255));\n';

			  Blockly.Arduino.definitions_['define_clearpixels'+input_pin]='void clearpixels_'+input_pin+'()\n{\n  uint16_t n=_led_strip_'+input_pin+'.numPixels();\n  for(uint16_t i = 0; i < n; i++) {\n	_led_strip_'+input_pin+'.setPixelColor(i, 0);\n  }\n  delay(1);\n}\n';
			  Blockly.Arduino.definitions_['define_writepixels'+input_pin]=' void writepixels_'+input_pin+'(uint32_t data0,uint32_t data1,uint32_t data2,uint32_t data3,uint32_t data4,uint32_t data5,uint32_t data6){\n  _led_strip_'+input_pin+'.setPixelColor(0, _led_strip_'+input_pin+'.Color((data0>>16)&0x0000ff,(data0>>8)&0x0000ff,data0&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(1, _led_strip_'+input_pin+'.Color((data1>>16)&0x0000ff,(data1>>8)&0x0000ff,data1&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(2, _led_strip_'+input_pin+'.Color((data2>>16)&0x0000ff,(data2>>8)&0x0000ff,data2&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(3, _led_strip_'+input_pin+'.Color((data3>>16)&0x0000ff,(data3>>8)&0x0000ff,data3&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(4, _led_strip_'+input_pin+'.Color((data4>>16)&0x0000ff,(data4>>8)&0x0000ff,data4&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(5, _led_strip_'+input_pin+'.Color((data5>>16)&0x0000ff,(data5>>8)&0x0000ff,data5&0x0000ff));\n  _led_strip_'+input_pin+'.setPixelColor(6, _led_strip_'+input_pin+'.Color((data6>>16)&0x0000ff,(data6>>8)&0x0000ff,data6&0x0000ff));\n  _led_strip_'+input_pin+'.show();}\n';
			  var stream='{'+input_expression+'};';
			  var stream_name='_RGBstream'+this.NumRGBLEDStripStreams;
			  Blockly.Arduino.definitions_['declare_var'+stream_name]='const uint32_t '+stream_name+'[][7] PROGMEM ='+stream+'\n';

			  if (background==='TRUE')
				{
					Blockly.Arduino.definitions_['define_prepare_RGBstream'] = JST['dyor_definitions_prepare_RGBstream']({'pin': input_pin});
					Blockly.Arduino.definitions_['declare_var_current_RGBstream_'+input_pin+'_ptr']='volatile uint32_t* _current_RGBstream_'+input_pin+'_ptr;\n';
					Blockly.Arduino.definitions_['declare_var_RGBstream_'+input_pin+'_pin']='volatile int _RGBstream_'+input_pin+'_pin=0;\n';
					Blockly.Arduino.definitions_['declare_var_RGBstream_'+input_pin+'_counter']='volatile int _RGBstream_'+input_pin+'_counter=0;\n';
					Blockly.Arduino.definitions_['declare_var_RGBstream_'+input_pin+'_length']='volatile int _RGBstream_'+input_pin+'_length=0;\n';
					Blockly.Arduino.definitions_['declare_var_RGBstream_'+input_pin+'_status']='volatile uint8_t _RGBstream_'+input_pin+'_status=-1;\n';
					Blockly.Arduino.definitions_['declare_var_RGBstream_'+input_pin+'_duration']='volatile int _RGBstream_'+input_pin+'_duration=0;\n';
					Blockly.Arduino.definitions_['declare_var_RGBstream_'+input_pin+'_next_time']='volatile unsigned long _RGBstream_'+input_pin+'_next_time=0;\n';

					Blockly.Arduino.definitions_['define_play_RGBstream_interrupt'] = JST['dyor_definitions_play_RGBstream_interrupt']({'pin': input_pin});
					Blockly.Arduino.play_RGBstream = 'playRGBStreamInterrupt_'+input_pin+'();\n';
					//Blockly.Arduino.definitions_['define_backgroundtask'] = 'SIGNAL (TIMER1_COMPA_vect){\n _currentTime=millis(); \n ';
					/*Blockly.Arduino.definitions_['define_backgroundtask'] = 'SIGNAL (TIMER0_COMPA_vect){\n ';
					Blockly.Arduino.definitions_['declare_var_currentTime']='unsigned long _currentTime;\n';
					Blockly.Arduino.definitions_['define_backgroundtask'] += Blockly.Arduino.play_melody;
					Blockly.Arduino.definitions_['define_backgroundtask'] += Blockly.Arduino.play_led_matrix_stream;
					Blockly.Arduino.definitions_['define_backgroundtask'] += Blockly.Arduino.play_RGBstream;
					//Check if other "tasks must be executed too such as LED Matrix, servos, etc... whatever we might need in the future...
					Blockly.Arduino.setups_['setup_int0_enable']='OCR0A=0xAF;\n  TIMSK0 |= _BV(OCIE0A);\n';
					//Blockly.Arduino.setups_['setup_int1_enable']='OCR1A = 0x1F40;\n  TCCR1B |= (1 << WGM12);\n  TCCR1B |= (1 << CS11);\n  TIMSK1 |= (1 << OCIE1A);\n';
					Blockly.Arduino.definitions_['define_backgroundtask'] += '}\n';*/

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

					code += JST['dyor_prepare_RGBstream']({
							'pin': input_pin,
							'stream': stream_name,
							'duration' : delay
						});
				}
				else
				{
					Blockly.Arduino.definitions_['define_play_RGBstream_'+input_pin] = JST['dyor_definitions_play_RGBstream']({'pin': input_pin});
					Blockly.Arduino.play_RGBstream='';
					code += JST['dyor_play_RGBstream']({
							'pin': input_pin,
							'stream': stream_name,
							'duration' : delay
						});
				}

//var code='writepixels_'+input_pin+'('+input_expression+');\n' ;
			  return code;
			};

			Blockly.Blocks['led_strip_stream'] = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_WS2812'),
			helpUrl: Facilino.getHelpUrl('led_strip_stream'),
			tags: ['led_strip','RGB','LED'],
			examples: [],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			  colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			keys: ['LANG_SIMPLEEXPRESSIONS_LED_STRIP_STREAM_NAME','LANG_SIMPLEEXPRESSIONS_SHOW_MOUTH','LANG_SIMPLEEXPRESSIONS_PIN','LANG_SIMPLEEXPRESSIONS_EXPRESSION','LANG_SIMPLEEXPRESSIONS_DELAY_WAIT','LANG_SIMPLEEXPRESSIONS_WAIT','LANG_SIMPLEEXPRESSIONS_LED_STRIP_STREAM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_STREAM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_SHOW_MOUTH')).appendField(new Blockly.FieldImage('img/blocks/round_led_strip.svg', 24*options.zoom, 24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.appendValueInput('STREAM').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_EXPRESSION')).appendField(new Blockly.FieldImage('img/blocks/dot-strip_stream.png', 48*options.zoom, 24*options.zoom)).setCheck('RGB_LEDs_EXPRESSION').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('DELAY').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_DELAY_WAIT')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_WAIT')).appendField(new Blockly.FieldCheckbox('FALSE'),'BACKGROUND').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				Facilino.NumRGBLEDStripStreams=Facilino.NumRGBLEDStripStreams+1;
				this.NumRGBLEDStripStreams=Facilino.NumRGBLEDStripStreams;
				//this.setOutput(true,'Expression');
				this.setTooltip(Facilino.locales.getKey('LANG_SIMPLEEXPRESSIONS_LED_STRIP_STREAM_TOOLTIP'));
				}
			};

			Blockly.Arduino.led_strip_sequentially = function() {
		var code = '';
		var i=1;
		for (i=1;i<=this.itemCount_;i++)
		{
			var expr= Blockly.Arduino.valueToCode(this, 'DATA'+i, Blockly.Arduino.ORDER_ATOMIC);
			code+='{'+expr+'},';
		}
		code=code.substr(0,code.length-1);
		return [code, Blockly.Arduino.ORDER_ATOMIC];
	};

	Blockly.Blocks.led_strip_sequentially = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SCREEN'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_WS2812'),
			tags: ['led_strip','RGB','LED'],
			helpUrl: Facilino.getHelpUrl('led_strip_sequentially'),
			examples: [],
			category_colour: Facilino.LANG_COLOUR_SCREEN,
			colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			keys: ['LANG_LED_STRIP_SEQUENTIALLY_NAME','LANG_LED_STRIP_SEQUENTIALLY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_LED_STRIP_SEQUENTIALLY_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.appendDummyInput('').appendField(new Blockly.FieldImage("img/blocks/dot-strip_stream.png", 48*options.zoom, 24*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.setMutator(new Blockly.Mutator(['led_strip_sequentially_item']));
				this.itemCount_ = 0;
				this.setInputsInline(true);
				this.setOutput(true,'RGB_LEDs_EXPRESSION');
			this.setTooltip(Facilino.locales.getKey('LANG_LED_STRIP_SEQUENTIALLY_TOOLTIP'));
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
				for (var x = 1; x <= this.itemCount_; x++) {
					this.appendValueInput('DATA' + x).setCheck('Data').setCheck('RGB_LEDs_EXPRESSION').setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(true);
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('led_strip_sequentially_mutator');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				for (var x = 1; x <= this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('led_strip_sequentially_item');
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
				}
				this.itemCount_ = 0;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'led_strip_sequentially_item':
							this.itemCount_++;
							this.setInputsInline(true);
							var dataInput = this.appendValueInput('DATA' + this.itemCount_).setCheck('RGB_LEDs_EXPRESSION').setAlign(Blockly.ALIGN_RIGHT);
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
						case 'led_strip_sequentially_item':
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

		Blockly.Blocks.led_strip_sequentially_mutator = {
			// App
			colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			keys: ['LANG_LED_STRIP_SEQUENTIALLY_MUTATOR_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.appendDummyInput().appendField(new Blockly.FieldImage("img/blocks/dot-strip_stream.png", 48*options.zoom, 48*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('led_strip_item');
				this.setTooltip(Facilino.locales.getKey('LANG_LED_STRIP_SEQUENTIALLY_MUTATOR_TOOLTIP'));
				this.contextMenu = false;
			}
		};

		Blockly.Blocks.led_strip_sequentially_item = {
			colour: Facilino.LANG_COLOUR_SCREEN_LEDSTRIP,
			keys: ['LANG_LED_STRIP_SEQUENTIALLY_ITEM_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SCREEN_LEDSTRIP);
				this.appendDummyInput().appendField(new Blockly.FieldImage("img/blocks/dot-strip.png", 24*options.zoom, 24*options.zoom, "*")).setAlign(Blockly.ALIGN_RIGHT);
				this.setPreviousStatement(true,'led_strip_item');
				this.setNextStatement(true,'led_strip_item');
				this.setTooltip(Facilino.locales.getKey('LANG_LED_STRIP_SEQUENTIALLY_ITEM_TOOLTIP'));
		this.contextMenu = false;
			}
		};
			}
	
	};
		
		
	var FacilinoLEDStrip = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoLEDStrip;
	} else {
		window.FacilinoLEDStrip = FacilinoLEDStrip;
	}
}));
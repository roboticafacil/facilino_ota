(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		Facilino.indentSentences = function(sentences) {
			var splitted_sentences = sentences.split('\n');
			var final_sentences = '';
			for (var i in splitted_sentences) {
				final_sentences += '  ' + splitted_sentences[i] + '\n';
			}
			return final_sentences;
		};
		
		if (window.FacilinoAdvanced===true)
		{
		if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
		{
			Blockly.Arduino.communications_wifi_API_REST_receive = function()
				{
					var code = '';
					Blockly.Arduino.definitions_['declare_var_wifi_server'] = 'WiFiServer _server(80);\n';
					Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';
					Blockly.Arduino.definitions_['declare_var_http_header']= 'String _http_header;\n';
					Blockly.Arduino.setups_['setup_wifi_server'] = '_server.begin();\n';
					code+='_client = _server.available();\n';
					code+='	if (_client) {\n'; 
					code+='		String currentLine = "";\n';
					code+='		while (_client.connected()) {\n';
					code+='			if (_client.available()) {\n';
					code+='				char c = _client.read();\n';
					code+='				_http_header += c;\n';
					code+='				if (c == \'\\n\') {\n';
					code+='					if (currentLine.length() == 0) {\n';
					code+='						_client.println("HTTP/1.1 200 OK");\n';
					code+='						_client.println("Content-type:text/html");\n';
					code+='						_client.println("Connection: close");\n';
					code+='						_client.println();\n';
					code+='						int idx_end=_http_header.indexOf("HTTP")-1;\n';
					code+='						String resp="{}";\n';
					
					code+=Blockly.Arduino.statementToCode(this,'STACK');
					

					var argument;
					for (n = 0; n < this.itemCount_; n++) {
						argument = this.type_[n];
						var branch_code='';
						var branch_end_code='';
						var argument_code='';
						if (argument==='communications_wifi_API_REST_digital_write')
						{
							argument_code='_http_header.indexOf("GET /DigitalWrite/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n'
							branch_code+='if (q>=0){\n';
							branch_code+='	int pin=_http_header.substring(17,q-1).toInt();\n';
							branch_code+='	bool value=(_http_header.substring(q+7,idx_end).toInt()==1)? true: false;\n';
							branch_end_code+='_client.println(resp);\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_analog_read')
						{
							argument_code='_http_header.indexOf("GET /AnalogRead/")>=0';
							branch_code+='int pin=_http_header.substring(16,idx_end).toInt();\n';
							branch_end_code+='_client.println(resp);\n';
						}
						if (argument==='communications_wifi_API_REST_analog_write')
						{
							argument_code='_http_header.indexOf("GET /AnalogWrite/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n'
							branch_code+='if (q>=0){\n';
							branch_code+='	int pin=_http_header.substring(17,q-1).toInt();\n';
							branch_code+='	int value=_http_header.substring(q+7,idx_end).toInt();\n';
							branch_end_code+='_client.println(resp);\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_servo')
						{
							argument_code='_http_header.indexOf("GET /Servo/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n'
							branch_code+='if (q>=0){\n';
							branch_code+='	int pin=_http_header.substring(11,q-1).toInt();\n';
							branch_code+='	int value=_http_header.substring(q+7,idx_end).toInt();\n';
							branch_end_code+='_client.println(resp);\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_servo_cont')
						{
							argument_code='_http_header.indexOf("GET /ServoCont/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n'
							branch_code+='if (q>=0){\n';
							branch_code+='	int pin=_http_header.substring(15,q-1).toInt();\n';
							branch_code+='	int value=_http_header.substring(q+5,idx_end).toInt();\n';
							branch_end_code+='_client.println(resp);\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_sonar')
						{
							argument_code='_http_header.indexOf("GET /Sonar/")>=0';
							branch_code+='String pins=_http_header.substring(11,idx_end);\n';
							branch_code+='int q_trigger=pins.indexOf("_");\n';
							branch_code+='if (q_trigger>=0){\n';
							branch_code+='	int pin_echo=pins.substring(0,q_trigger).toInt();\n';
							branch_code+='	int pin_trigger=pins.substring(q_trigger+1).toInt();\n';
							branch_end_code+='_client.println(resp);\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_buzzer')
						{
							argument_code='_http_header.indexOf("GET /Buzzer/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n';
							branch_code+='if (q>=0){\n';
							branch_code+='	int pin=_http_header.substring(12,q).toInt();\n';
							branch_code+='	int q_freq=_http_header.indexOf("?freq=");\n';
							branch_code+='	int q_dur=_http_header.indexOf("&dur=");\n';
							branch_code+='	if ((q_freq>=0)&&(q_dur>=0)){\n';
							branch_code+='		int value_freq=_http_header.substring(q_freq+6,q_dur-1).toInt();\n';
							branch_code+='		int value_dur=_http_header.substring(q_dur+5,idx_end).toInt();\n';
							branch_end_code+='	_client.println(resp);\n';
							branch_end_code+='	}\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_buzzer')
						{
							argument_code='_http_header.indexOf("GET /Buzzer/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n';
							branch_code+='if (q>=0){\n';
							branch_code+='	int pin=_http_header.substring(12,q).toInt();\n';
							branch_code+='	int q_melody=_http_header.indexOf("?melody=");\n';
							branch_code+='	if (q_melody>=0){\n';
							branch_code+='		String melody=_http_header.substring(q_melody+8,idx_end);\n';
							branch_end_code+='	_client.println(resp);\n';
							branch_end_code+='	}\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_dht')
						{
							argument_code='_http_header.indexOf("GET /DHT/")>=0';
							branch_code+='int pin=_http_header.substring(9,idx_end).toInt();\n';
							branch_end_code+='_client.println(resp);\n';
						}
						if (argument==='communications_wifi_API_REST_led_matrix')
						{
							argument_code='_http_header.indexOf("GET /LEDMatrix8x8/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n';
							branch_code+='if (q>=0){\n';
							branch_code+='	String pins=_http_header.substring(18,q);\n';
							branch_code+='	int pin_clk=-1;\n';
							branch_code+='	int pin_din=-1;\n';
							branch_code+='	int pin_cs=-1;\n';
							branch_code+='	int q_clk=pins.indexOf("_");\n';
							branch_code+='	int q_din=-1;\n';
							branch_code+='	if (q_clk>=0){\n';
							branch_code+='		pin_clk=pins.substring(0,q_clk).toInt();\n';
							branch_code+='		pins=pins.substring(q_clk+1);\n';
							branch_code+='		q_din=pins.indexOf("_");\n';
							branch_code+='		if (q_din>=0){\n';
							branch_code+='			pin_din=pins.substring(0,q_din).toInt();\n';
							branch_code+='			pin_cs=pins.substring(q_din+1).toInt();\n';
							branch_code+='			int q_c1=_http_header.indexOf("?c1=");\n';
							branch_code+='			int q_c2=_http_header.indexOf("&c2=");\n';
							branch_code+='			int q_c3=_http_header.indexOf("&c3=");\n';
							branch_code+='			int q_c4=_http_header.indexOf("&c4=");\n';
							branch_code+='			int q_c5=_http_header.indexOf("&c5=");\n';
							branch_code+='			int q_c6=_http_header.indexOf("&c6=");\n';
							branch_code+='			int q_c7=_http_header.indexOf("&c7=");\n';
							branch_code+='			int q_c8=_http_header.indexOf("&c8=");\n';
							branch_code+='			if ((q_c1>=0)&&(q_c2>=0)&&(q_c3>=0)&&(q_c4>=0)&&(q_c5>=0)&&(q_c6>=0)&&(q_c7>=0)&&(q_c8>=0)){\n';
							branch_code+='				int value1=_http_header.substring(q_c1+4,q_c2).toInt();\n';
							branch_code+='				int value2=_http_header.substring(q_c2+1,q_c3).toInt();\n';
							branch_code+='				int value3=_http_header.substring(q_c3+1,q_c4).toInt();\n';
							branch_code+='				int value4=_http_header.substring(q_c4+1,q_c5).toInt();\n';
							branch_code+='				int value5=_http_header.substring(q_c5+1,q_c6).toInt();\n';
							branch_code+='				int value6=_http_header.substring(q_c6+1,q_c7).toInt();\n';
							branch_code+='				int value7=_http_header.substring(q_c7+1,q_c8).toInt();\n';
							branch_code+='				int value8=_http_header.substring(q_c8+1,idx_end).toInt();\n';
							branch_end_code+='			_client.println(resp);\n';
							branch_end_code+='			}\n';
							branch_end_code+='		}\n';
							branch_end_code+='	}\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_led_matrix')
						{
							argument_code='_http_header.indexOf("GET /LEDMatrix8x8/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n';
							branch_code+='if (q>=0){\n';
							branch_code+='	String pins=_http_header.substring(18,q);\n';
							branch_code+='	int pin_clk=-1;\n';
							branch_code+='	int pin_din=-1;\n';
							branch_code+='	int pin_cs=-1;\n';
							branch_code+='	int q_clk=pins.indexOf("_");\n';
							branch_code+='	int q_din=-1;\n';
							branch_code+='	if (q_clk>=0){\n';
							branch_code+='		pin_clk=pins.substring(0,q_clk).toInt();\n';
							branch_code+='		pins=pins.substring(q_clk+1);\n';
							branch_code+='		q_din=pins.indexOf("_");\n';
							branch_code+='		if (q_din>=0){\n';
							branch_code+='			pin_din=pins.substring(0,q_din).toInt();\n';
							branch_code+='			pin_cs=pins.substring(q_din+1).toInt();\n';
							branch_code+='			int q_number=_http_header.indexOf("?number=");\n';
							branch_code+='			if (q_number>=0){\n';
							branch_code+='				int number=_http_header.substring(q_number+8,idx_end).toInt();\n';
							branch_end_code+='			_client.println(resp);\n';
							branch_end_code+='			}\n';
							branch_end_code+='		}\n';
							branch_end_code+='	}\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_led_strip')
						{
							argument_code='_http_header.indexOf("GET /RGB_LEDStrip/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n';
							branch_code+='if (q>=0){\n';
							branch_code+='	int pin=_http_header.substring(18,q).toInt();\n';
							branch_code+='	int q_colors=_http_header.indexOf("?colors=");\n';
							branch_code+='	if (q_colors>=0){\n';
							branch_code+='		String str=_http_header.substring(q_colors+8,idx_end);\n';
							branch_code+='		int q_comma = str.indexOf(',');\n';
							branch_code+='		int counter=0;\n';
							branch_code+='		while(q_comma>=0){\n';
							branch_code+='			unsigned long value = 0x00FFFFFF & atol(str.substring(0,q_comma).c_str());\n';
							branch_code+='			str = str.substring(q_comma+1);\n';
							branch_code+='			colors[counter]=value;\n';
							branch_code+='			counter++;\n';
							branch_code+='			q_comma = str.indexOf(',');\n';
							branch_code+='		}\n';
							branch_code+='		colors[counter]= 0x00FFFFFF & atol(str.c_str());\n';
							branch_code+='		counter++;\n';
							branch_end_code+='			_client.println(resp);\n';
							branch_end_code+='	}\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_led_strip')
						{
							argument_code='_http_header.indexOf("GET /RGB_LEDStrip/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n';
							branch_code+='if (q>=0){\n';
							branch_code+='	int pin=_http_header.substring(18,q).toInt();\n';
							branch_code+='	int q_number=_http_header.indexOf("?number=");\n';
							branch_code+='	if (q_number>=0){\n';
							branch_code+='		int number=_http_header.substring(q_number+8,idx_end).toInt();\n';
							branch_end_code+='		_client.println(resp);\n';
							branch_end_code+='	}\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_led_strip')
						{
							argument_code='_http_header.indexOf("GET /RGB_LEDStrip/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n';
							branch_code+='if (q>=0){\n';
							branch_code+='	int pin=_http_header.substring(18,q).toInt();\n';
							branch_code+='	int q_brightness=_http_header.indexOf("?brightness=");\n';
							branch_code+='	if (q_brightness>=0){\n';
							branch_code+='		int value_brightness=_http_header.substring(q_brightness+12,idx_end).toInt();\n';
							branch_end_code+='		_client.println(resp);\n';
							branch_end_code+='	}\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_bool')
						{
							argument_code='_http_header.indexOf("GET /BooleanVariable/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n';
							branch_code+='if (q>=0){\n';
							branch_code+='	int index=_http_header.substring(21,q-1).toInt();\n';
							branch_code+='	bool value=_http_header.substring(q+7,idx_end).toInt()==1 ? true: false;\n';
							branch_end_code+='	_client.println(resp);\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_bool')
						{
							argument_code='_http_header.indexOf("GET /BooleanVariable/")>=0';
							branch_code+='int index=_http_header.substring(21,idx_end).toInt();\n';
							branch_end_code+='_client.println(resp);\n';
						}
						if (argument==='communications_wifi_API_REST_integer')
						{
							argument_code='_http_header.indexOf("GET /IntegerVariable/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n';
							branch_code+='if (q>=0){\n';
							branch_code+='	int index=_http_header.substring(21,q-1).toInt();\n';
							branch_code+='	int value=_http_header.substring(q+7,idx_end).toInt();\n';
							branch_end_code+='	_client.println(resp);\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_integer')
						{
							argument_code='_http_header.indexOf("GET /IntegerVariable/")>=0';
							branch_code+='int index=_http_header.substring(21,idx_end).toInt();\n';
							branch_end_code+='_client.println(resp);\n';
						}
						if (argument==='communications_wifi_API_REST_float')
						{
							argument_code='_http_header.indexOf("GET /FloatVariable/")>=0';
							branch_code+='int q=_http_header.indexOf("?");\n';
							branch_code+='if (q>=0){\n';
							branch_code+='	int index=_http_header.substring(19,q-1).toInt();\n';
							branch_code+='	float value=_http_header.substring(q+7,idx_end).toFloat();\n';
							branch_end_code+='	_client.println(resp);\n';
							branch_end_code+='}\n';
						}
						if (argument==='communications_wifi_API_REST_float')
						{
							argument_code='_http_header.indexOf("GET /FloatVariable/")>=0';
							branch_code+='int index=_http_header.substring(19,idx_end).toInt();\n';
							branch_end_code+='_client.println(resp);\n';
						}
						//branch_code+= Blockly.Arduino.statementToCode(this, 'DO' + n);
						branch_code= indentSentences(branch_code);
						branch_code= branch_code.substring(0, branch_code.length - 1);
						code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';

					}
					
					code+='            _client.println();\n';
					code+='            break; // Break out of the while loop\n';
					code+='          } else {\n';
					code+='            currentLine = "";\n';
					code+='          }\n';
					code+='        } else if (c != \'\\r\') {\n';
					code+='           currentLine += c;\n';
					code+='        }\n';
					code+='      }\n';
					code+='    }\n';
					code+='    _http_header = "";\n';
					code+='    _client.stop();\n';
					code+='  }\n'
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_receive = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_receive'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_NAME','LANG_WIFI_API_REST','LANG_WIFI_API_REST_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST')).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldImage('img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
						this.appendStatementInput('STACK').setCheck('api_rest_item');
						this.setPreviousStatement(true,'code');
						this.setNextStatement(true,'code');
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_TOOLTIP'));
						//this.contextMenu = false;
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_digital_read = function()
				{
					var pin = Blockly.Arduino.valueToCode(this,'PIN', Blockly.Arduino.ORDER_NONE);
					var code='';
					Blockly.Arduino.setups_['inout_digital_input' + pin] = JST['inout_digital_input']({'pin': pin});
					code += JST['inout_digital_read']({'pin': pin});
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /DigitalRead/")>=0';
					branch_code+='int pin=_http_header.substring(17,idx_end).toInt();\n';
					branch_end_code+='_client.println(resp);\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_digital_read = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_digital_read'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_DIGITAL_READ_NAME','LANG_WIFI_API_REST_MESSAGE_DIGITAL_READ','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DIGITAL_READ_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DIGITAL_READ')).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin').appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom)); //.setCheck([Boolean,'Variable']);
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_digital_write = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /DigitalWrite/")>=0';
					branch_code+='int q=_http_header.indexOf("?");\n'
					branch_code+='if (q>=0){\n';
					branch_code+='	int pin=_http_header.substring(17,q-1).toInt();\n';
					branch_code+='	bool value=(_http_header.substring(q+7,idx_end).toInt()==1)? true: false;\n';
					branch_end_code+='_client.println(resp);\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_digital_write = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_digital_write'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_DIGITAL_WRITE_NAME','LANG_WIFI_API_REST_MESSAGE_DIGITAL_WRITE','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DIGITAL_WRITE_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DIGITAL_WRITE')).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin').appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom)); //.setCheck([Boolean,'Variable']);
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_analog_read = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /AnalogRead/")>=0';
					branch_code+='int pin=_http_header.substring(16,idx_end).toInt();\n';
					branch_end_code+='_client.println(resp);\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				
				Blockly.Blocks.communications_wifi_API_REST_analog_read = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_analog_read'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_ANALOG_READ_NAME','LANG_WIFI_API_REST_MESSAGE_ANALOG_READ','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_ANALOG_READ_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_ANALOG_READ')).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('AnalogPin').appendField(new Blockly.FieldImage("img/blocks/analog_signal.svg",20*options.zoom, 20*options.zoom));
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_analog_write = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /AnalogWrite/")>=0';
					branch_code+='int q=_http_header.indexOf("?");\n'
					branch_code+='if (q>=0){\n';
					branch_code+='	int pin=_http_header.substring(17,q-1).toInt();\n';
					branch_code+='	int value=_http_header.substring(q+7,idx_end).toInt();\n';
					branch_end_code+='_client.println(resp);\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_analog_write = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_analog_write'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_ANALOG_WRITE_NAME','LANG_WIFI_API_REST_MESSAGE_ANALOG_WRITE','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_ANALOG_WRITE_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_ANALOG_WRITE')).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('PWMPin').appendField(new Blockly.FieldImage("img/blocks/pwm_signal.svg",20*options.zoom, 20*options.zoom));
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_servo = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /Servo/")>=0';
					branch_code+='int q=_http_header.indexOf("?");\n'
					branch_code+='if (q>=0){\n';
					branch_code+='	int pin=_http_header.substring(11,q-1).toInt();\n';
					branch_code+='	int value=_http_header.substring(q+7,idx_end).toInt();\n';
					branch_end_code+='_client.println(resp);\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_servo = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_servo'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_SERVO_NAME','LANG_WIFI_API_REST_MESSAGE_SERVO','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_SERVO_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_SERVO')).appendField(new Blockly.FieldImage('img/blocks/servo.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).setAlign(Blockly.ALIGN_RIGHT).setCheck(['PWMPin','DigitalPin']).appendField(new Blockly.FieldImage("img/blocks/servo_signal.svg",20*options.zoom, 20*options.zoom));
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_servo_cont = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /ServoCont/")>=0';
					branch_code+='int q=_http_header.indexOf("?");\n'
					branch_code+='if (q>=0){\n';
					branch_code+='	int pin=_http_header.substring(15,q-1).toInt();\n';
					branch_code+='	int value=_http_header.substring(q+5,idx_end).toInt();\n';
					branch_end_code+='_client.println(resp);\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_servo_cont = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_servo_cont'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_SERVO_CONT_NAME','LANG_WIFI_API_REST_MESSAGE_SERVO_CONT','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_SERVO_CONT_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_SERVO_CONT')).appendField(new Blockly.FieldImage('img/blocks/servo_cont.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).setAlign(Blockly.ALIGN_RIGHT).setCheck(['PWMPin','DigitalPin']).appendField(new Blockly.FieldImage("img/blocks/servo_signal.svg",20*options.zoom, 20*options.zoom));
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_sonar = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /Sonar/")>=0';
					branch_code+='String pins=_http_header.substring(11,idx_end);\n';
					branch_code+='int q_trigger=pins.indexOf("_");\n';
					branch_code+='if (q_trigger>=0){\n';
					branch_code+='	int pin_echo=pins.substring(0,q_trigger).toInt();\n';
					branch_code+='	int pin_trigger=pins.substring(q_trigger+1).toInt();\n';
					branch_end_code+='_client.println(resp);\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_sonar = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_sonar'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_SONAR_NAME','LANG_WIFI_API_REST_MESSAGE_SONAR','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_SONAR_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_SONAR')).appendField(new Blockly.FieldImage('img/blocks/hc_sr04.svg', 34*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_US_ECHO_PIN')).appendField(new Blockly.FieldImage('img/blocks/hearing.svg',20*options.zoom,20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
						this.appendValueInput('PINx'+this.itemCount_).appendField(Facilino.locales.getKey('LANG_US_TRIGGER_PIN')).appendField(new Blockly.FieldImage('img/blocks/speaking.svg',20*options.zoom,20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_buzzer = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /Buzzer/")>=0';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	int pin=_http_header.substring(12,q).toInt();\n';
					branch_code+='	int q_freq=_http_header.indexOf("?freq=");\n';
					branch_code+='	int q_dur=_http_header.indexOf("&dur=");\n';
					branch_code+='	if ((q_freq>=0)&&(q_dur>=0)){\n';
					branch_code+='		int value_freq=_http_header.substring(q_freq+6,q_dur-1).toInt();\n';
					branch_code+='		int value_dur=_http_header.substring(q_dur+5,idx_end).toInt();\n';
					branch_end_code+='	_client.println(resp);\n';
					branch_end_code+='	}\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					argument_code='_http_header.indexOf("GET /Buzzer/")>=0';
					branch_code='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	int pin=_http_header.substring(12,q).toInt();\n';
					branch_code+='	int q_melody=_http_header.indexOf("?melody=");\n';
					branch_code+='	if (q_melody>=0){\n';
					branch_code+='		String melody=_http_header.substring(q_melody+8,idx_end);\n';
					branch_end_code='	_client.println(resp);\n';
					branch_end_code+='	}\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_buzzer = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_buzzer'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_BUZZER_NAME','LANG_WIFI_API_REST_MESSAGE_BUZZER','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_BUZZER_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_BUZZER')).appendField(new Blockly.FieldImage('img/blocks/buzzer.svg', 34*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).setAlign(Blockly.ALIGN_RIGHT).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin','PWMPin']).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom));
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_dht = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /DHT/")>=0';
					branch_code+='int pin=_http_header.substring(9,idx_end).toInt();\n';
					branch_end_code+='_client.println(resp);\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_dht = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_dht'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_DHT_NAME','LANG_WIFI_API_REST_MESSAGE_DHT','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DHT_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DHT')).appendField(new Blockly.FieldImage("img/blocks/dht11.svg",22*options.zoom,22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin').appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom));
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_led_matrix = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /LEDMatrix8x8/")>=0';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	String pins=_http_header.substring(18,q);\n';
					branch_code+='	int pin_clk=-1;\n';
					branch_code+='	int pin_din=-1;\n';
					branch_code+='	int pin_cs=-1;\n';
					branch_code+='	int q_clk=pins.indexOf("_");\n';
					branch_code+='	int q_din=-1;\n';
					branch_code+='	if (q_clk>=0){\n';
					branch_code+='		pin_clk=pins.substring(0,q_clk).toInt();\n';
					branch_code+='		pins=pins.substring(q_clk+1);\n';
					branch_code+='		q_din=pins.indexOf("_");\n';
					branch_code+='		if (q_din>=0){\n';
					branch_code+='			pin_din=pins.substring(0,q_din).toInt();\n';
					branch_code+='			pin_cs=pins.substring(q_din+1).toInt();\n';
					branch_code+='			int q_c1=_http_header.indexOf("?c1=");\n';
					branch_code+='			int q_c2=_http_header.indexOf("&c2=");\n';
					branch_code+='			int q_c3=_http_header.indexOf("&c3=");\n';
					branch_code+='			int q_c4=_http_header.indexOf("&c4=");\n';
					branch_code+='			int q_c5=_http_header.indexOf("&c5=");\n';
					branch_code+='			int q_c6=_http_header.indexOf("&c6=");\n';
					branch_code+='			int q_c7=_http_header.indexOf("&c7=");\n';
					branch_code+='			int q_c8=_http_header.indexOf("&c8=");\n';
					branch_code+='			if ((q_c1>=0)&&(q_c2>=0)&&(q_c3>=0)&&(q_c4>=0)&&(q_c5>=0)&&(q_c6>=0)&&(q_c7>=0)&&(q_c8>=0)){\n';
					branch_code+='				int value1=_http_header.substring(q_c1+4,q_c2).toInt();\n';
					branch_code+='				int value2=_http_header.substring(q_c2+1,q_c3).toInt();\n';
					branch_code+='				int value3=_http_header.substring(q_c3+1,q_c4).toInt();\n';
					branch_code+='				int value4=_http_header.substring(q_c4+1,q_c5).toInt();\n';
					branch_code+='				int value5=_http_header.substring(q_c5+1,q_c6).toInt();\n';
					branch_code+='				int value6=_http_header.substring(q_c6+1,q_c7).toInt();\n';
					branch_code+='				int value7=_http_header.substring(q_c7+1,q_c8).toInt();\n';
					branch_code+='				int value8=_http_header.substring(q_c8+1,idx_end).toInt();\n';
					branch_end_code+='			_client.println(resp);\n';
					branch_end_code+='			}\n';
					branch_end_code+='		}\n';
					branch_end_code+='	}\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					argument_code='_http_header.indexOf("GET /LEDMatrix8x8/")>=0';
					branch_code='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	String pins=_http_header.substring(18,q);\n';
					branch_code+='	int pin_clk=-1;\n';
					branch_code+='	int pin_din=-1;\n';
					branch_code+='	int pin_cs=-1;\n';
					branch_code+='	int q_clk=pins.indexOf("_");\n';
					branch_code+='	int q_din=-1;\n';
					branch_code+='	if (q_clk>=0){\n';
					branch_code+='		pin_clk=pins.substring(0,q_clk).toInt();\n';
					branch_code+='		pins=pins.substring(q_clk+1);\n';
					branch_code+='		q_din=pins.indexOf("_");\n';
					branch_code+='		if (q_din>=0){\n';
					branch_code+='			pin_din=pins.substring(0,q_din).toInt();\n';
					branch_code+='			pin_cs=pins.substring(q_din+1).toInt();\n';
					branch_code+='			int q_number=_http_header.indexOf("?number=");\n';
					branch_code+='			if (q_number>=0){\n';
					branch_code+='				int number=_http_header.substring(q_number+8,idx_end).toInt();\n';
					branch_end_code='			_client.println(resp);\n';
					branch_end_code+='			}\n';
					branch_end_code+='		}\n';
					branch_end_code+='	}\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_led_matrix = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_led_matrix'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_LED_MATRIX_NAME','LANG_WIFI_API_REST_MESSAGE_LED_MATRIX','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_LED_MATRIX_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_LED_MATRIX')).appendField(new Blockly.FieldImage('img/blocks/LED_matrix.svg', 34*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField('CS '+Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg',20*options.zoom,20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin'); //.setCheck([Number,'Variable']);
						this.appendValueInput('PINx').appendField('DIN '+Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg',20*options.zoom,20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin'); //.setCheck([Number,'Variable']);
						this.appendValueInput('PINxx').appendField('CLK '+Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg',20*options.zoom,20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin'); //.setCheck([Number,'Variable']);
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_led_strip = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /RGB_LEDStrip/")>=0';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	int pin=_http_header.substring(18,q).toInt();\n';
					branch_code+='	int q_colors=_http_header.indexOf("?colors=");\n';
					branch_code+='	if (q_colors>=0){\n';
					branch_code+='		String str=_http_header.substring(q_colors+8,idx_end);\n';
					branch_code+='		int q_comma = str.indexOf(',');\n';
					branch_code+='		int counter=0;\n';
					branch_code+='		while(q_comma>=0){\n';
					branch_code+='			unsigned long value = 0x00FFFFFF & atol(str.substring(0,q_comma).c_str());\n';
					branch_code+='			str = str.substring(q_comma+1);\n';
					branch_code+='			colors[counter]=value;\n';
					branch_code+='			counter++;\n';
					branch_code+='			q_comma = str.indexOf(',');\n';
					branch_code+='		}\n';
					branch_code+='		colors[counter]= 0x00FFFFFF & atol(str.c_str());\n';
					branch_code+='		counter++;\n';
					branch_end_code+='			_client.println(resp);\n';
					branch_end_code+='	}\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					argument_code='_http_header.indexOf("GET /RGB_LEDStrip/")>=0';
					branch_code='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	int pin=_http_header.substring(18,q).toInt();\n';
					branch_code+='	int q_number=_http_header.indexOf("?number=");\n';
					branch_code+='	if (q_number>=0){\n';
					branch_code+='		int number=_http_header.substring(q_number+8,idx_end).toInt();\n';
					branch_end_code='		_client.println(resp);\n';
					branch_end_code+='	}\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					argument_code='_http_header.indexOf("GET /RGB_LEDStrip/")>=0';
					branch_code='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	int pin=_http_header.substring(18,q).toInt();\n';
					branch_code+='	int q_brightness=_http_header.indexOf("?brightness=");\n';
					branch_code+='	if (q_brightness>=0){\n';
					branch_code+='		int value_brightness=_http_header.substring(q_brightness+12,idx_end).toInt();\n';
					branch_end_code='		_client.println(resp);\n';
					branch_end_code+='	}\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_led_strip = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_led_strip'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_LED_STRIP_NAME','LANG_WIFI_API_REST_MESSAGE_LED_STRIP','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_LED_STRIP_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_LED_STRIP')).appendField(new Blockly.FieldImage('img/blocks/led_strip.svg',22*options.zoom,22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_PIN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin').appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom, 20*options.zoom));
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_bool = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /BooleanVariable/")>=0';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	int index=_http_header.substring(21,q-1).toInt();\n';
					branch_code+='	bool value=_http_header.substring(q+7,idx_end).toInt()==1 ? true: false;\n';
					branch_end_code+='	_client.println(resp);\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					argument_code='_http_header.indexOf("GET /BooleanVariable/")>=0';
					branch_code='int index=_http_header.substring(21,idx_end).toInt();\n';
					branch_end_code='_client.println(resp);\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				
				Blockly.Blocks.communications_wifi_API_REST_bool = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_bool'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_BOOL_READ_NAME','LANG_WIFI_API_REST_MESSAGE_BOOL_READ','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_BOOL_READ_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_BOOL')).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_INDEX')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_integer = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /IntegerVariable/")>=0';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	int index=_http_header.substring(21,q-1).toInt();\n';
					branch_code+='	int value=_http_header.substring(q+7,idx_end).toInt();\n';
					branch_end_code+='	_client.println(resp);\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					argument_code='_http_header.indexOf("GET /IntegerVariable/")>=0';
					branch_code='int index=_http_header.substring(21,idx_end).toInt();\n';
					branch_end_code='_client.println(resp);\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				
				
				Blockly.Blocks.communications_wifi_API_REST_integer = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_integer'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_INTEGER_NAME','LANG_WIFI_API_REST_MESSAGE_INTEGER','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_INTEGER_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_INTEGER')).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_INDEX')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_float = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					argument_code='_http_header.indexOf("GET /FloatVariable/")>=0';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	int index=_http_header.substring(19,q-1).toInt();\n';
					branch_code+='	float value=_http_header.substring(q+7,idx_end).toFloat();\n';
					branch_end_code+='	_client.println(resp);\n';
					branch_end_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					argument_code='_http_header.indexOf("GET /FloatVariable/")>=0';
					branch_code='int index=_http_header.substring(19,idx_end).toInt();\n';
					branch_end_code='_client.println(resp);\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_float = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_float'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_FLOAT_NAME','LANG_WIFI_API_REST_MESSAGE_FLOAT_READ','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_FLOAT_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_FLOAT')).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_INDEX')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(true);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					}
				};
		}
		}
	}
	
	var FacilinoHTTP = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoHTTP;
	} else {
		window.FacilinoHTTP = FacilinoHTTP;
	}
}));
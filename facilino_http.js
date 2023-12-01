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
		if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
		{
			Blockly.Arduino.communications_wifi_API_REST_receive = function()
				{
					var code = '';
					if (Facilino.profiles['processor']==='ESP8266')
						Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
					else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
						Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
					Blockly.Arduino.definitions_['define_arduino_json'] ='#include <ArduinoJson.h>';
					Blockly.Arduino.definitions_['declare_var_wifi_server'] = 'WiFiServer _server(80);\n';
					Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';
					Blockly.Arduino.definitions_['declare_var_http_header']= 'String _http_header;\n';
					//Blockly.Arduino.definitions_['declare_var_http_json_resp']= 'StaticJsonDocument<500> _resp;\n';
					Blockly.Arduino.setups_['setup_wifi_server'] = '_server.begin();\n';
					code+='_client = _server.available();\n';
					code+='	if (_client) {\n'; 
					code+='		String currentLine = "";\n';
					code+='     StaticJsonDocument<500> _resp;\n';
					code+='     _resp["status"]="Unknown error";\n';
					code+='		while (_client.connected()) {\n';
					code+='			if (_client.available()) {\n';
					code+='				char c = _client.read();\n';
					code+='				_http_header += c;\n';
					code+='				if (c == \'\\n\') {\n';
					code+='					if (currentLine.length() == 0) {\n';
					
					code+='			_client.println("HTTP/1.1 200 OK");\n';
					code+='			_client.println("Content-Type: application/json");\n';
					code+='			_client.println("Access-Control-Allow-Origin: *");\n';
					code+='			_client.println("Connection: close");\n';
					code+='			_client.println();\n';
					
					
					code+='						int idx_end=_http_header.indexOf("HTTP")-1;\n';
					var argument;
					var argument_code='';
					var branch_code='';
					var branch_end_code='';
					if (this.getFieldValue('DigitalRead')==='TRUE')
					{
						argument_code='_http_header.indexOf("GET /DigitalRead/")>=0';
						branch_code='int pin=_http_header.substring(17,idx_end).toInt();\n';
						branch_code+='  if (pin>=0){\n';
						branch_code+='    pinMode(pin,INPUT);\n';
						branch_code+='    _resp["status"]="OK";\n';
						branch_code+='    _resp["pin"]=pin;\n';
						branch_code+='    _resp["value"]=digitalRead(pin);\n';
						branch_code+='  }\n';
						branch_code+='  else{\n';
						branch_code+='    _resp["status"]="Incorrect pin.";\n';
						branch_code+='  }\n';
						code += '	\n						if ('+argument_code+') {\n							'+branch_code+'	}';
					}
					
					if (this.getFieldValue('DigitalWrite')==='TRUE')
					{
						argument_code='_http_header.indexOf("GET /DigitalWrite/")>=0';
						branch_code='int q=_http_header.indexOf("?");\n';
						branch_code+='if (q>=0){\n';
						branch_code+='	int pin=_http_header.substring(18,q).toInt();\n';
						branch_code+='  pinMode(pin,OUTPUT);\n';
						branch_code+='	bool value=(_http_header.substring(q+7,idx_end).toInt()==1)? true: false;\n';
						branch_code+='  digitalWrite(pin,value);\n';
						branch_code+='  _resp["pin"]=pin;\n';
						branch_code+='  _resp["status"]="OK";\n';
						branch_code+='}\n';
						branch_code+='else{\n';
						branch_code+='  _resp["status"]="Query not found.";\n';
						branch_code+='}\n';
						code += '	\n						if ('+argument_code+') {\n							'+branch_code+'	}';
					}
					
					if (this.getFieldValue('AnalogRead')==='TRUE')
					{
						argument_code='_http_header.indexOf("GET /AnalogRead/")>=0';
						branch_code='int pin=_http_header.substring(16,idx_end).toInt();\n';
						branch_code+='  if (pin>=0){\n';
						branch_code+='  pinMode(pin,INPUT);\n';
						branch_code+='    _resp["status"]="OK";\n';
						branch_code+='    _resp["pin"]=pin;\n';
						if (Blockly.Arduino.setups_['inout_analog_workaround_adc']!==undefined)
						{
							branch_code+='    WRITE_PERI_REG(SENS_SAR_READ_CTRL2_REG, adc_register);\n';
							branch_code+='    SET_PERI_REG_MASK(SENS_SAR_READ_CTRL2_REG, SENS_SAR2_DATA_INV);\n';
							branch_code+='    _resp["value"]=analogRead(pin);\n';
							branch_code+='    WRITE_PERI_REG(SENS_SAR_READ_CTRL2_REG, wifi_register);\n';
						}
						else
						{
							branch_code+='    _resp["value"]=analogRead(pin);\n';
						}
						branch_code+='  }\n';
						branch_code+='  else{\n';
						branch_code+='    _resp["status"]="Incorrect pin.";\n';
						branch_code+='  }\n';
						code += '	\n						if ('+argument_code+') {\n							'+branch_code+'	}';
					}
					
					if (this.getFieldValue('AnalogWrite')==='TRUE')
					{
						argument_code='_http_header.indexOf("GET /AnalogWrite/")>=0';
						branch_code='int q=_http_header.indexOf("?");\n'
						branch_code+='if (q>=0){\n';
						branch_code+='  _resp["status"]="OK";\n';
						branch_code+='	int pin=_http_header.substring(17,q).toInt();\n';
						branch_code+='  _resp["pin"]=pin;\n';
						branch_code+='	int value=_http_header.substring(q+7,idx_end).toInt();\n';
						
						if (Facilino.profiles['processor']==='ESP32')
						{
							/*branch_code += '     ledcWrite(_channels[pin],value);\n';*/
							var unique = [];
							this.uniqueVariables = [];
							$.each(Object.values(Facilino.PWMChannelsIDs), function(i, el){
								if($.inArray(el, unique) === -1) unique.push(el);
							});
							Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
							var pwms_map = 'std::map<int,ESP32PWM*> _pwms={';
							unique.forEach(function (element,index){if (index===0) {pwms_map+='{'+element+',&_pwm'+element+'}';}else{pwms_map+=',{'+element+',&_pwm'+element+'}';}});
							pwms_map +='};\n';
							Blockly.Arduino.definitions_['declare_var_pwm_map'] = pwms_map;
							branch_code +='if (_pwms.find(pin)==_pwms.end()){\n';
							branch_code +='  ESP32PWM * pwm = new ESP32PWM();\n';
							branch_code +='  pwm->attachPin(pin,1000,10);\n';
							branch_code +='  _pwms.insert({pin,pwm});\n';
							branch_code +='}\n';
							branch_code +='_pwms[pin]->write(value);\n';
						}
						else
							branch_code += '     analogWrite(pin,value);\n';
						
						//branch_end_code='_client.println(resp);\n';
						branch_code+='}\n';
						branch_code+='else{\n';
						branch_code+='  _resp["status"]="Query not found.";\n';
						branch_code+='}\n';
						code += '	\n						if ('+argument_code+') {\n							'+branch_code+'	}\n';
					}
					
					code+=Blockly.Arduino.statementToCode(this,'STACK');
			
					
					code+='			serializeJson(_resp,_client);\n';
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
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_RECEIVE')).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DIGITAL_READ')).appendField(new Blockly.FieldCheckbox(false),'DigitalRead').appendField(' ').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DIGITAL_WRITE')).appendField(new Blockly.FieldCheckbox(false),'DigitalWrite');
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_ANALOG_READ')).appendField(new Blockly.FieldCheckbox(false),'AnalogRead').appendField(' ').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_ANALOG_WRITE')).appendField(new Blockly.FieldCheckbox(false),'AnalogWrite');
				
						this.appendStatementInput('STACK').setCheck('api_rest_item');
						this.setPreviousStatement(true,'code');
						this.setNextStatement(true,'code');
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_TOOLTIP'));
						//this.contextMenu = false;
					}
				};
								
				Blockly.Arduino.communications_wifi_API_REST_bool = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
					Blockly.Arduino.definitions_['declare_var_booleans_map'] = 'std::map<String,bool> _booleans={};\n';
			
					argument_code='_http_header.indexOf("GET /Boolean/")>=0';
					branch_code+='	String name;\n';
					branch_code+='	bool value;\n';
					branch_code+='  _resp["status"]="OK";\n';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	name=_http_header.substring(13,q);\n';
					branch_code +='if (_booleans.find(name)==_booleans.end()){\n';
					branch_code +='  _booleans.insert({name,false});\n';
					branch_code +='}\n';
					branch_code+='	value=_http_header.substring(q+7,idx_end).toInt()==1 ? true: false;\n';
					branch_code+='  _booleans[name]=value;\n';
					branch_code+='}\n';
					branch_code+='else{\n';
					//Get bool variable and build response
					branch_code+='  name=_http_header.substring(13,idx_end);\n';
					branch_code +='if (_booleans.find(name)==_booleans.end()){\n';
					branch_code +='  _booleans.insert({name,false});\n';
					branch_code +='}\n';
					branch_code+='  _resp["name"]=name;\n';
					branch_code+='  value=_booleans[name];\n';
					branch_code+='  value ? _resp["value"]=true : _resp["value"]=false;\n';
					branch_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+Blockly.Arduino.statementToCode(this,'DO')+'	}\n';
					
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
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_BOOL'));
						this.appendValueInput('BOOLEAN_NAME').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setCheck(String).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('BOOLEAN_VALUE').setCheck(Boolean).setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						return '<value name="BOOLEAN_NAME"><block type="communications_wifi_API_REST_item_name"></block></value><value name="BOOLEAN_VALUE"><block type="communications_wifi_API_REST_item_boolean_value"></block></value>';
					},
					onchange: function() {
						if (this.getInputTargetBlock('BOOLEAN_NAME')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_name');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('BOOLEAN_NAME').connection.connect(pinBlock.outputConnection);
							
						}
						if (this.getInputTargetBlock('BOOLEAN_VALUE')===null)
						{
							var valueBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_boolean_value');
							valueBlock.initSvg();
							valueBlock.render();
							this.getInput('BOOLEAN_VALUE').connection.connect(valueBlock.outputConnection);
						}
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_integer = function()
				{					
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
					Blockly.Arduino.definitions_['declare_var_ints_map'] = 'std::map<String,int> _ints={};\n';
			
					argument_code='_http_header.indexOf("GET /Integer/")>=0';
					branch_code+='	String name;\n';
					branch_code+='	int value;\n';
					branch_code+='  _resp["status"]="OK";\n';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					//branch_code+='	index=_http_header.substring(13,q).toInt();\n';
					branch_code+='  name=_http_header.substring(13,q);\n';
					branch_code +='if (_ints.find(name)==_ints.end()){\n';
					branch_code +='  _ints.insert({name,0});\n';
					branch_code +='}\n';
					branch_code+='	value=_http_header.substring(q+7,idx_end).toInt();\n';
					branch_code+='  _ints[name]=value;\n';
					branch_code+='}\n';
					branch_code+='else{\n';
					//Get bool variable and build response
					//branch_code+='  index=_http_header.substring(13,idx_end).toInt();\n';
					branch_code+='  name=_http_header.substring(13,idx_end);\n';
					branch_code +='if (_ints.find(name)==_ints.end()){\n';
					branch_code +='  _ints.insert({name,0});\n';
					branch_code +='}\n';
					branch_code+='  value=_ints[name];\n';
					branch_code+='  _resp["name"]=name;\n';
					branch_code+='  _resp["value"]=value;\n';
					branch_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+Blockly.Arduino.statementToCode(this,'DO')+'	}\n';
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
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_INTEGER'));
						//this.appendValueInput('INT_INDEX').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('INT_NAME').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setCheck(String).setAlign(Blockly.ALIGN_RIGHT);
						
						this.appendValueInput('INT_VALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						return '<value name="INT_NAME"><block type="communications_wifi_API_REST_item_name"></block></value><value name="INT_VALUE"><block type="communications_wifi_API_REST_item_number_value"></block></value>';
					},
					onchange: function() {
						if (this.getInputTargetBlock('INT_NAME')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_name');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('INT_NAME').connection.connect(pinBlock.outputConnection);
							
						}
						if (this.getInputTargetBlock('INT_VALUE')===null)
						{
							var valueBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_number_value');
							valueBlock.initSvg();
							valueBlock.render();
							this.getInput('INT_VALUE').connection.connect(valueBlock.outputConnection);
						}
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_float = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
					Blockly.Arduino.definitions_['declare_var_floats_map'] = 'std::map<String,float> _floats={};\n';
			
					argument_code='_http_header.indexOf("GET /Float/")>=0';
					branch_code+='	String name;\n';
					branch_code+='	float value;\n';
					branch_code+='  _resp["status"]="OK";\n';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='  name=_http_header.substring(11,q);\n';
					branch_code +='if (_floats.find(name)==_floats.end()){\n';
					branch_code +='  _floats.insert({name,0.0});\n';
					branch_code +='}\n';
					branch_code+='	value=_http_header.substring(q+7,idx_end).toFloat();\n';
					branch_code+='  _floats[name]=value;\n';
					branch_code+='}\n';
					branch_code+='else{\n';
					//Get bool variable and build response
					branch_code+='  name=_http_header.substring(11,idx_end);\n';
					branch_code +='if (_floats.find(name)==_floats.end()){\n';
					branch_code +='  _floats.insert({name,0.0});\n';
					branch_code +='}\n';
					branch_code+='  value=_floats[name];\n';
					branch_code+='  _resp["name"]=name;\n';
					branch_code+='  _resp["value"]=value;\n';
					branch_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+Blockly.Arduino.statementToCode(this,'DO')+'	}\n';
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_float = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_float'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_FLOAT_NAME','LANG_WIFI_API_REST_MESSAGE_FLOAT','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_FLOAT_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_FLOAT'));
						this.appendValueInput('FLOAT_NAME').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setCheck(String).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('FLOAT_VALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						return '<value name="FLOAT_NAME"><block type="communications_wifi_API_REST_item_name"></block></value><value name="FLOAT_VALUE"><block type="communications_wifi_API_REST_item_number_value"></block></value>';
					},
					onchange: function() {
						if (this.getInputTargetBlock('FLOAT_NAME')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_name');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('FLOAT_NAME').connection.connect(pinBlock.outputConnection);
							
						}
						if (this.getInputTargetBlock('FLOAT_VALUE')===null)
						{
							var valueBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_number_value');
							valueBlock.initSvg();
							valueBlock.render();
							this.getInput('FLOAT_VALUE').connection.connect(valueBlock.outputConnection);
						}
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_string = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					Blockly.Arduino.definitions_['define_stdc'] ='#include <bits/stdc++.h>';
					Blockly.Arduino.definitions_['declare_var_strings_map'] = 'std::map<String,String> _strings={};\n';
			
					argument_code='_http_header.indexOf("GET /String/")>=0';
					branch_code+='	String name;\n';
					branch_code+='	String value;\n';
					branch_code+='  _resp["status"]="OK";\n';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	name=_http_header.substring(12,q);\n';
					branch_code +='if (_strings.find(name)==_strings.end()){\n';
					branch_code +='  _strings.insert({name,std::string("")});\n';
					branch_code +='}\n';
					branch_code+='	value=_http_header.substring(q+7,idx_end);\n';
					branch_code+='  _strings[name]=value;\n';
					branch_code+='}\n';
					branch_code+='else{\n';
					//Get bool variable and build response
					branch_code+='  name=_http_header.substring(12,idx_end);\n';
					branch_code +='if (_strings.find(name)==_strings.end()){\n';
					branch_code +='  _strings.insert({name,std::string("")});\n';
					branch_code +='}\n';
					branch_code+='  value=_strings[name];\n';
					branch_code+='  _resp["name"]=name;\n';
					branch_code+='  _resp["value"]=value;\n';
					branch_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+Blockly.Arduino.statementToCode(this,'DO')+'	}\n';
					return code;
					
				}
				
				Blockly.Blocks.communications_wifi_API_REST_string = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_string'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_STRING_NAME','LANG_WIFI_API_REST_MESSAGE_STRING','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_STRING_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_STRING'));
						this.appendValueInput('STRING_NAME').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setCheck(String).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('STRING_VALUE').setCheck(String).setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						return '<value name="STRING_NAME"><block type="communications_wifi_API_REST_item_name"></block></value><value name="STRING_VALUE"><block type="communications_wifi_API_REST_item_string_value"></block></value>';
					},
					onchange: function() {
						if (this.getInputTargetBlock('STRING_NAME')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_name');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('STRING_NAME').connection.connect(pinBlock.outputConnection);
							
						}
						if (this.getInputTargetBlock('STRING_VALUE')===null)
						{
							var valueBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_string_value');
							valueBlock.initSvg();
							valueBlock.render();
							this.getInput('STRING_VALUE').connection.connect(valueBlock.outputConnection);
						}
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_servo = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					if (this.getFieldValue('TYPE')==='Servo')
					{
						argument_code='_http_header.indexOf("GET /Servo/")>=0';
						branch_code+='int q=_http_header.indexOf("?");\n'
						branch_code+='if (q>=0){\n';
						branch_code+='	int pin=_http_header.substring(11,q).toInt();\n';
						code +='if (_servos.find(pin)==_servos.end()){\n';
						branch_code +='  Servo * servo = new Servo();\n';
						branch_code +='  servo->attach(pin);\n';
						branch_code +='  _servos.insert({pin,servo});\n';
						branch_code +='}\n';
					}
					else
					{
						argument_code='_http_header.indexOf("GET /ServoCont/")>=0';
						branch_code+='int q=_http_header.indexOf("?");\n'
						branch_code+='if (q>=0){\n';
						branch_code+='	int pin=_http_header.substring(15,q).toInt();\n';
					}
					branch_code+='	int value=_http_header.substring(q+7,idx_end).toInt();\n';
					
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
					branch_code+=Blockly.Arduino.statementToCode(this,'DO');
					branch_code+='  _resp["status"]="OK";\n';
					branch_code+='}\n';
					branch_code+='else{\n';
					branch_code+='  _resp["status"]="Query not found.";\n';
					branch_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'	}\n';
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
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_SERVO')).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_BLUETOOTH_SERVO')||'Servo','Servo'],
						[Facilino.locales.getKey('LANG_BLUETOOTH_SERVO360')||'Servo 360º','Servo360']]),'TYPE');
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('VALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
								
						
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						return ['<value name="PIN"><block type="communications_wifi_API_REST_item_digital_pin"></block></value><value name="VALUE"><block type="communications_wifi_API_REST_item_number_value"></block></value><value name="DO"><block type="movement_servo_move"><value name="PIN"><block type="communications_wifi_API_REST_item_digital_pin"></block></value><value name="DEGREE"><block type="communications_wifi_API_REST_item_number_value"></block></value></block></value>','<field name="TYPE">11</field><value name="PIN"><block type="communications_wifi_API_REST_item_digital_pin"></block></value><value name="VALUE"><block type="communications_wifi_API_REST_item_number_value"></block></value><value name="DO"><block type="movement_servo_cont1"><value name="PIN"><block type="communications_wifi_API_REST_item_digital_pin"></block></value><value name="SPEED"><block type="communications_wifi_API_REST_item_number_value"></block></value></block></value>'];
					},
					onchange: function() {
						if (this.getInputTargetBlock('PIN')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_digital_pin');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('PIN').connection.connect(pinBlock.outputConnection);
							
						}
						if (this.getInputTargetBlock('VALUE')===null)
						{
							var valueBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_number_value');
							valueBlock.initSvg();
							valueBlock.render();
							this.getInput('VALUE').connection.connect(valueBlock.outputConnection);
						}
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
					branch_code+='	int echo_pin=pins.substring(0,q_trigger).toInt();\n';
					branch_code+='	int trigger_pin=pins.substring(q_trigger+1).toInt();\n';
					branch_code+=Blockly.Arduino.statementToCode(this,'DO');
					branch_code+='  int _distance='+Blockly.Arduino.valueToCode(this,'RESP', Blockly.Arduino.ORDER_ATOMIC)+';\n';
					branch_code+='  _resp["status"]="OK";\n';
					branch_code+='  _resp["echo_pin"]=echo_pin;\n';
					branch_code+='  _resp["trigger_pin"]=trigger_pin;\n';
					branch_code+='  _resp["distance"]=_distance;\n';
					branch_code+='}\n';
					branch_code+='else{\n';
					branch_code+='  _resp["status"]="Trigger pin not found";\n';
					branch_code+='}\n';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'	}\n';
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
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_SONAR')).appendField(Facilino.locales.getKey('LANG_BLUETOOTH_SONAR_READ'));
						this.appendValueInput('ECHO_PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('TRIGGER_PIN').setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
						this.appendValueInput('RESP').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_RESPONSE')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
				
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						return '<value name="ECHO_PIN"><block type="communications_wifi_API_REST_item_digital_echo_pin"></block></value><value name="TRIGGER_PIN"><block type="communications_wifi_API_REST_item_digital_trigger_pin"></block></value><value name="RESP"><block type="dyor_us"><value name="RED PIN"><block type="communications_wifi_API_REST_item_digital_echo_pin"></block></value><value name="BLUE PIN"><block type="communications_wifi_API_REST_item_digital_trigger_pin"></block></value></block></value>';
					},
					onchange: function() {
						if (this.getInputTargetBlock('ECHO_PIN')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_digital_echo_pin');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('ECHO_PIN').connection.connect(pinBlock.outputConnection);
						}
						if (this.getInputTargetBlock('TRIGGER_PIN')===null)
						{
							var pinBlock2 = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_digital_trigger_pin');
							pinBlock2.initSvg();
							pinBlock2.render();
							this.getInput('TRIGGER_PIN').connection.connect(pinBlock2.outputConnection);
							
						}
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
					branch_code+='		int frequency=_http_header.substring(q_freq+6,q_dur).toInt();\n';
					branch_code+='		int duration=_http_header.substring(q_dur+5,idx_end).toInt();\n';
					branch_code+= Blockly.Arduino.statementToCode(this,'DO');
					branch_code+='      _resp["status"]="OK";\n';
					branch_code+='  }\n';
					branch_code+='  else{\n';
					branch_code+='      _resp["status"]="Error: freq or dur params not found.";\n';
					branch_code+='  }\n';
					branch_code+='}\n';
					branch_code+='else{\n';
					branch_code+='  _resp["status"]="Query not found.";\n';
					branch_code+='}\n;';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'	}\n';
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
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_BUZZER'));
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setCheck('PWMPin').setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('FREQ').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('DURATION').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
				
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						return '<value name="PIN"><block type="communications_wifi_API_REST_item_pwm_pin"></block></value><value name="FREQ"><block type="communications_wifi_API_REST_item_frequency_value"></block></value><value name="DURATION"><block type="communications_wifi_API_REST_item_duration_value"></block></value><value name="DO"><block type="zum_piezo_buzzerav"><value name="PIN"><block type="communications_wifi_API_REST_item_pwm_pin"></block></value><value name="TONE"><block type="communications_wifi_API_REST_item_frequency_value"></block></value><value name="DURA"><block type="communications_wifi_API_REST_item_duration_value"></block></value></block></value>';
					},
					onchange: function() {
						if (this.getInputTargetBlock('PIN')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_pwm_pin');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('PIN').connection.connect(pinBlock.outputConnection);
							
						}
						if (this.getInputTargetBlock('FREQ')===null)
						{
							var valueBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_frequency_value');
							valueBlock.initSvg();
							valueBlock.render();
							this.getInput('FREQ').connection.connect(valueBlock.outputConnection);
						}
						if (this.getInputTargetBlock('DURATION')===null)
						{
							var valueBlock2 = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_duration_value');
							valueBlock2.initSvg();
							valueBlock2.render();
							this.getInput('DURATION').connection.connect(valueBlock2.outputConnection);
						}
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_temperature = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					
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
						branch_code+=Blockly.Arduino.statementToCode(this,'DO');
					
						argument_code='_http_header.indexOf("GET /Temperature/")>=0';
						branch_code+='  int pin=_http_header.substring(17,idx_end).toInt();\n';
						branch_code+='  if (pin>=0){\n';
						branch_code+=Blockly.Arduino.statementToCode(this,'DO');
						branch_code+='     _resp["status"]="OK";\n';
						branch_code+='     _resp["temperature"]='+Blockly.Arduino.valueToCode(this,'RESP', Blockly.Arduino.ORDER_ATOMIC)+';\n';
						branch_code+='  }\n';
						branch_code+='  else{\n';
						branch_code+='    _resp["status"]="Incorrect pin.";\n';
						branch_code+='  }\n';
						code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					}
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_temperature = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_dht'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_TEMPERATURE_NAME','LANG_WIFI_API_REST_MESSAGE_TEMPERATURE','LANG_WIFI_API_REST_DATA','LANG_WIFI_API_REST_MESSAGE_DO','LANG_WIFI_API_REST_MESSAGE_RESPONSE','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TEMPERATURE_NAME'),
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TEMPERATURE'));
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setCheck(['DigitalPin','AnalogPin']).setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
						this.appendValueInput('RESP').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_RESPONSE')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						return '<value name="PIN"><block type="communications_wifi_API_REST_item_digital_analog_pin"></block></value><value name="RESP"><block type="ambient_temp_temperatureDHT"><value name="PIN"><block type="communications_wifi_API_REST_item_digital_pin"></block></value></block></value>';
					},
					onchange: function() {
						if (this.getInputTargetBlock('PIN')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_digital_analog_pin');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('PIN').connection.connect(pinBlock.outputConnection);
						}
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_humidity = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					
					if (this.getInputTargetBlock('RESP')!==null)
					{
						if (this.getInputTargetBlock('RESP').type==='ambient_humid_humidityDHT')
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
						branch_code+=Blockly.Arduino.statementToCode(this,'DO');
					
						argument_code='_http_header.indexOf("GET /Humidity/")>=0';
						branch_code+='  int pin=_http_header.substring(14,idx_end).toInt();\n';
						branch_code+='  if (pin>=0){\n';
						branch_code+=Blockly.Arduino.statementToCode(this,'DO');
						branch_code+='     _resp["status"]="OK";\n';
						branch_code+='     _resp["humidity"]='+Blockly.Arduino.valueToCode(this,'RESP', Blockly.Arduino.ORDER_ATOMIC)+';\n';
						branch_code+='  }\n';
						branch_code+='  else{\n';
						branch_code+='    _resp["status"]="Incorrect pin.";\n';
						branch_code+='  }\n';
						code += '	\n						if ('+argument_code+') {\n							'+branch_code+'							'+branch_end_code+'	}\n';
					}
					return code;
				}
				
				Blockly.Blocks.communications_wifi_API_REST_humidity = {
					category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
					subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
					subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
					tags: ['wifi','http','api','rest','communication'],
					helpUrl: Facilino.getHelpUrl('communications_wifi_API_REST_dht'),
					colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
					keys: ['LANG_WIFI_API_REST_MESSAGE_HUMIDITY_NAME','LANG_WIFI_API_REST_MESSAGE_HUMIDITY','LANG_WIFI_API_REST_DATA','LANG_WIFI_API_REST_MESSAGE_DO','LANG_WIFI_API_REST_MESSAGE_RESPONSE','LANG_WIFI_API_REST_MESSAGE_TOOLTIP'],
					name: Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_HUMIDITY_NAME'),
					
					init: function() {
						this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_HUMIDITY'));
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
						this.appendValueInput('RESP').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_RESPONSE')).setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						return '<value name="PIN"><block type="communications_wifi_API_REST_item_digital_pin"></block></value><value name="RESP"><block type="ambient_humid_humidityDHT"><value name="PIN"><block type="communications_wifi_API_REST_item_digital_pin"></block></value></block></value>';
					},
					onchange: function() {
						if (this.getInputTargetBlock('PIN')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_digital_pin');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('PIN').connection.connect(pinBlock.outputConnection);
						}
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
					branch_code+='	int clk_pin=-1;\n';
					branch_code+='	int din_pin=-1;\n';
					branch_code+='	int cs_pin=-1;\n';
					branch_code+='	int q_clk=pins.indexOf("_");\n';
					branch_code+='	int q_din=-1;\n';
					branch_code+='	if (q_clk>=0){\n';
					branch_code+='		clk_pin=pins.substring(0,q_clk).toInt();\n';
					branch_code+='		pins=pins.substring(q_clk+1);\n';
					branch_code+='		q_din=pins.indexOf("_");\n';
					branch_code+='		if (q_din>=0){\n';
					branch_code+='			din_pin=pins.substring(0,q_din).toInt();\n';
					branch_code+='			cs_pin=pins.substring(q_din+1).toInt();\n';
					branch_code+='			int q_value=_http_header.indexOf("?value=");\n';
					branch_code+='			if (q_value>=0){\n';
					branch_code+='				int value=_http_header.substring(q_value+7,idx_end).toInt();\n';
					branch_code+= Blockly.Arduino.statementToCode(this,'DO');
					branch_code+='      _resp["status"]="OK";\n';
					branch_code+='			}\n';
					branch_code+='		}\n';
					branch_code+='  else{\n';
					branch_code+='    _resp["status"]="Incorrect pin.";\n';
					branch_code+='  }\n';
					branch_code+='	}\n';
					branch_code+='  else{\n';
					branch_code+='    _resp["status"]="Incorrect pin.";\n';
					branch_code+='  }\n';
					branch_code+='}\n';
					branch_code+='else{\n';
					branch_code+='  _resp["status"]="Query not found.";\n';
					branch_code+='}\n;';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'	}\n';
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
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_LED_MATRIX')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/LED_matrix.svg', 34*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin'); //.setCheck([Number,'Variable']);
						this.appendValueInput('PINx').setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin'); //.setCheck([Number,'Variable']);
						this.appendValueInput('PINxx').setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin'); //.setCheck([Number,'Variable']);
						this.appendValueInput('EXPRESSION').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						var xml;
						xml+='<value name="PINx"><block type="communications_wifi_API_REST_item_digital_din_pin"></block></value>';
						xml+='<value name="PINxx"><block type="communications_wifi_API_REST_item_digital_clk_pin"></block></value>';
						xml+='<value name="PIN"><block type="communications_wifi_API_REST_item_digital_cs_pin"></block></value>';
						xml+='<value name="EXPRESSION"><block type="communications_wifi_API_REST_item_number_value"></block></value>';
						xml+='<value name="DO"><block type="controls_if"><value name="IF0"><block type="logic_compare"><value name="A"><block type="communications_wifi_API_REST_item_number_value"></block></value><value name="B"><block type="math_number"></block></value></block></value><value name="DO0"><block type="dyor_generic_expression1"><value name="CLK_PIN"><block type="communications_wifi_API_REST_item_digital_clk_pin"></block></value><value name="DIN_PIN"><block type="communications_wifi_API_REST_item_digital_din_pin"></block></value><value name="CS_PIN"><block type="communications_wifi_API_REST_item_digital_cs_pin"></block></value><value name="EXPRESSION"><block type="dyor_drawing1"></block></value></block></value></block></value>';
						return xml;
					},
					onchange: function() {
						if (this.getInputTargetBlock('PIN')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_digital_pin');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('PIN').connection.connect(pinBlock.outputConnection);
							
						}
						if (this.getInputTargetBlock('PINx')===null)
						{
							var valueBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_digital_pin');
							valueBlock.initSvg();
							valueBlock.render();
							this.getInput('PINx').connection.connect(valueBlock.outputConnection);
						}
						if (this.getInputTargetBlock('PINxx')===null)
						{
							var valueBlock2 = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_digital_pin');
							valueBlock2.initSvg();
							valueBlock2.render();
							this.getInput('PINxx').connection.connect(valueBlock2.outputConnection);
						}
					}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_led_strip = function()
				{
					var code='';
					var branch_code='';
					var branch_end_code='';
					var argument_code='';
					
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
			
			
					argument_code='_http_header.indexOf("GET /RGB_LEDStrip/")>=0';
					branch_code+='int q=_http_header.indexOf("?");\n';
					branch_code+='if (q>=0){\n';
					branch_code+='	int pin=_http_header.substring(18,q).toInt();\n';
					branch_code+='	int q_value=_http_header.indexOf("?value=");\n';
					branch_code+='	if (q_value>=0){\n';
					branch_code+='		int value=_http_header.substring(q_value+7,idx_end).toInt();\n';
					branch_code+= Blockly.Arduino.statementToCode(this,'DO');
					branch_code+='      _resp["status"]="OK";\n';
					branch_code+='	}\n';
					branch_code+='else{\n';
					branch_code+='  _resp["status"]="Query not found.";\n';
					branch_code+='}\n;';
					branch_code+='}\n';
					branch_code+='else{\n';
					branch_code+='  _resp["status"]="Query not found.";\n';
					branch_code+='}\n;';
					code += '	\n						if ('+argument_code+') {\n							'+branch_code+'	}\n';
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
						this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_LED_STRIP')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/led_strip.svg',22*options.zoom,22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_DATA')).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin'); //.setCheck([Number,'Variable']);
						this.appendValueInput('VALUE').setCheck(Number).setAlign(Blockly.ALIGN_RIGHT);
						this.appendStatementInput('DO').appendField(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_DO')).setAlign(Blockly.ALIGN_RIGHT).setCheck('code');
						this.setPreviousStatement(true,'api_rest_item');
						this.setNextStatement(true,'api_rest_item');
						this.setInputsInline(false);
						this.setTooltip(Facilino.locales.getKey('LANG_WIFI_API_REST_MESSAGE_TOOLTIP'));
					},
					default_inputs: function()
					{
						return '<value name="PIN"><block type="communications_wifi_API_REST_item_digital_pin"></block></value><value name="VALUE"><block type="communications_wifi_API_REST_item_number_value"></block></value><value name="DO"><block type="controls_if"><value name="IF0"><block type="logic_compare"><value name="A"><block type="communications_wifi_API_REST_item_number_value"></block></value><value name="B"><block type="math_number"></block></value></block></value><value name="DO0"><block type="led_strip_generic"><value name="PIN"><block type="communications_wifi_API_REST_item_digital_pin"></block></value><value name="EXPRESSION"><block type="led_strip_customized"></block></value></block></value></block></value>';
					},
					onchange: function() {
						if (this.getInputTargetBlock('PIN')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_digital_pin');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('PIN').connection.connect(pinBlock.outputConnection);
							
						}
						if (this.getInputTargetBlock('VALUE')===null)
						{
							var pinBlock = Blockly.mainWorkspace.newBlock('communications_wifi_API_REST_item_number_value');
							pinBlock.initSvg();
							pinBlock.render();
							this.getInput('VALUE').connection.connect(pinBlock.outputConnection);
							
						}
					}
				};
				
				
				Blockly.Arduino.communications_wifi_API_REST_item_digital_pin = function() {
					var code = 'pin';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_digital_pin = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_digital_analog_pin = function() {
					var code = 'pin';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_digital_analog_pin = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
							this.setOutput(true,['DigitalPin','AnalogPin',Number]);
							this.contextMenu = false;
						}
				};
	
				Blockly.Arduino.communications_wifi_API_REST_item_digital_echo_pin = function() {
					var code = 'echo_pin';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_digital_echo_pin = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_digital_trigger_pin = function() {
					var code = 'trigger_pin';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_digital_trigger_pin = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_digital_clk_pin = function() {
					var code = 'clk_pin';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_digital_clk_pin = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_digital_din_pin = function() {
					var code = 'din_pin';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_digital_din_pin = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_digital_cs_pin = function() {
					var code = 'cs_pin';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_digital_cs_pin = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_analog_pin = function() {
					var code = 'pin';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_analog_pin = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_pwm_pin = function() {
					var code = 'pin';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_pwm_pin = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_name = function() {
					var code = 'name';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_name = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
							this.appendDummyInput('').appendField('name').setAlign(Blockly.ALIGN_RIGHT);
							this.setOutput(true,String);
							this.contextMenu = false;
						}
				};
				
				Blockly.Arduino.communications_wifi_API_REST_item_boolean_value = function() {
					var code = 'value';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_boolean_value = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_number_value = function() {
					var code = 'value';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}
				
				Blockly.Blocks.communications_wifi_API_REST_item_number_value = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_frequency_value = function() {
					var code = 'frequency';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_frequency_value = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_duration_value = function() {
					var code = 'duration';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_duration_value = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_melody = function() {
					var code = 'melody';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}
				
				Blockly.Blocks.communications_wifi_API_REST_item_melody = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_expression = function() {
					var code = '_bt_data[3],_bt_data[4],_bt_data[5],_bt_data[6],_bt_data[7],_bt_data[8],_bt_data[9],_bt_data[10]';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}
				
				Blockly.Blocks.communications_wifi_API_REST_item_expression = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_index = function() {
					var code = 'index';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_index = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
				
				Blockly.Arduino.communications_wifi_API_REST_item_string_value = function() {
					var code = '_strings[name]';
					return [code, Blockly.Arduino.ORDER_ATOMIC];
				}

				Blockly.Blocks.communications_wifi_API_REST_item_string_value = {
						category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
						subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
						subsubcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_HTTP'),
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
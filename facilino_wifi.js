(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560'))
		{
			
			if (window.FacilinoAdvanced===true)
			{

			Blockly.Arduino.communications_wifi_def = function() {
				var SSID, Password;
				SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
				Password = Blockly.Arduino.valueToCode(this, 'PASSWORD', Blockly.Arduino.ORDER_ATOMIC);
				var baud_rate = Blockly.Arduino.valueToCode(this, 'BAUD_RATE', Blockly.Arduino.ORDER_ATOMIC);
				if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4'))
				{
					var rx, tx;
					rx = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC);
					tx = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
					Blockly.Arduino.definitions_['declare_var_WiFiSerial'] = 'SoftwareSerial _wifi_device(' + rx + ',' + tx + ');\n';
					Blockly.Arduino.definitions_['define_softwareserial'] = JST['softwareserial_def_definitions']({});
					Blockly.Arduino.definitions_['define_wifi_serial'] = JST['communications_wifi_def_definitions_serial']({});
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions']({});
					Blockly.Arduino.setups_['setup_wifiserial'] = JST['communications_softwareserial_def_setups']({'device': '_wifi_device', 'baud_rate': baud_rate,'rx': rx,'tx': tx});
				}
				else if ((Facilino.profiles['processor']==='ATmega2560'))
				{
					var port=this.getFieldValue('PORT');
					Blockly.Arduino.definitions_['declare_var_WiFiSerial'] = '#define _wifi_device Serial'+port+'\n';
					Blockly.Arduino.setups_['setup_serial_'+port] = '_wifi_device.begin('+baud_rate+');\n';
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions']({});
					var rx='',tx='';
				}
				Blockly.Arduino.definitions_['declare_var_wifi' + rx+'_'+tx] = 'ESP8266 _wifi(_wifi_device);\n';
				
				Blockly.Arduino.setups_['setup_wifi_'] = '_wifi.setOprToStationSoftAP();\n  _wifi.joinAP('+SSID+','+Password+');\n';
				return '';
			}

			Blockly.Blocks.communications_wifi_def = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_def'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_DEF_NAME','LANG_WIFI_ESP8266_DEF','LANG_WIFI_ESP8266_DEF_SSID','LANG_WIFI_ESP8266_DEF_PASSWORD','LANG_WIFI_ESP8266_DEF_BAUD_RATE','LANG_WIFI_ESP8266_DEF_PIN1','LANG_WIFI_ESP8266_DEF_PIN2','LANG_WIFI_ESP8266_PORT','LANG_WIFI_ESP8266_DEF_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('SSID').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_SSID')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/SSID.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PASSWORD').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_PASSWORD')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/lock.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4'))
					{
						this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN').setCheck('DigitalPin').appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_PIN1')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('PIN2').setCheck('DigitalPin').appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_PIN2')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					}
					else if ((Facilino.profiles['processor']==='ATmega2560'))
					{
						this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_PORT')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.serial_ports),'PORT').setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);
					}

					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_TOOLTIP'));

				},
				default_inputs: function()
				{
					var xml='<value name="SSID"><shadow type="text"><field name="TEXT">MyAccessPoint</field></shadow></value><value name="PASSWORD"><shadow type="text"><field name="TEXT">MyPassword</field></shadow></value><value name="BAUD_RATE"><shadow type="math_number"><field name="NUM">9600</field></shadow></value>';
					if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4'))
					{
						xml+='<value name="PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
						if (Facilino.profiles.default.digital.length>1)
							xml+='<value name="PIN2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
						else
							xml+='<value name="PIN2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
					}
					return xml;
				},
				isNotDuplicable: true
			};

			
			Blockly.Arduino.communications_wifi_tcp_open = function() {
				var IP, Port;
				IP = Blockly.Arduino.valueToCode(this, 'IP', Blockly.Arduino.ORDER_ATOMIC) || '""';
				Port = Blockly.Arduino.valueToCode(this, 'PORT', Blockly.Arduino.ORDER_ATOMIC) ||80;
				var code = '';
				Blockly.Arduino.setups_['setup_wifi_tcp_udp_'] = '_wifi.disableMUX();\n';
				code = '_wifi.createTCP('+IP+','+Port+');\n';

				return code;
			}

			Blockly.Blocks.communications_wifi_tcp_open = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_tcp_open'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_TCP_OPEN_NAME','LANG_WIFI_ESP8266_TCP_OPEN','LANG_WIFI_ESP8266_IP','LANG_WIFI_ESP8266_PORT','LANG_WIFI_ESP8266_TCP_OPEN_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_OPEN_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_OPEN')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('IP').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_IP')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PORT').setCheck(Number).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_PORT')).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_OPEN_TOOLTIP'));
				},
				default_inputs: function ()
				{
					return '<value name="IP"><shadow type="text"><field name="TEXT">192.168.1.1</field></shadow></value><value name="PORT"><shadow type="math_number"><field name="NUM">80</field></shadow></value>';
				}
			};

			Blockly.Arduino.communications_wifi_tcp_close = function() {
				var code = '';
				Blockly.Arduino.setups_['setup_wifi_tcp_udp_'] = '_wifi.disableMUX();\n';
				code = '_wifi.releaseTCP();\n';
				return code;
			}

			Blockly.Blocks.communications_wifi_tcp_close = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_tcp_close'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_TCP_CLOSE_NAME','LANG_WIFI_ESP8266_TCP_CLOSE','LANG_WIFI_ESP8266_TCP_CLOSE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_CLOSE_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_CLOSE')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_CLOSE_TOOLTIP'));
				}
			};

			Blockly.Arduino.communications_wifi_recv = function() {
				var code = '';
				Blockly.Arduino.definitions_['define_wifi_definitions_recv'] = JST['communications_wifi_recv_definitions']({});
				code = '_wifi_recv()';
				return [code,Blockly.Arduino.ORDER_NONE];
			}

			Blockly.Blocks.communications_wifi_recv = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_recv'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_RECV_NAME','LANG_WIFI_ESP8266_RECV','LANG_WIFI_ESP8266_RECV_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_RECV_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_RECV')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.setInputsInline(false);
					this.setPreviousStatement(false);
					this.setNextStatement(false);
					this.setOutput(true,[Number,String]);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_RECV_TOOLTIP'));
				}
			};

			Blockly.Arduino.communications_wifi_send = function() {
				var send_text = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_NONE) ||'""';
				var version = this.getFieldValue('VERSION');
				var code = '';
				try{
					if (this.getInputTargetBlock('TEXT').type==='text')
						code = '_wifi.send((uint8_t*)'+send_text+','+(send_text.length-2)+');\n';
					else if (this.getInputTargetBlock('TEXT').type==='variables_get')
						code = '_wifi.send((uint8_t*)'+send_text+'.c_str(),'+send_text+'.length());\n';
					else
						code = 'String __str='+send_text+';\n_wifi.send((uint8_t*)__str.c_str(),__str.length());\n';
				}
				catch(e) {}

				return code;
			}

			Blockly.Blocks.communications_wifi_send = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_send'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_SEND_NAME','LANG_WIFI_ESP8266_SEND','LANG_WIFI_ESP8266_TEXT','LANG_WIFI_ESP8266_SEND_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_SEND_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_SEND')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('TEXT').setCheck([String,'Variable']).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_TEXT')).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_SEND_TOOLTIP'));
				},
				default_inputs: function ()
				{
					return '<value name="TEXT"><shadow type="text"><field name="TEXT">My message</field></shadow></value>';
				}
			};

			Blockly.Arduino.communications_wifi_html_server = function() {
				//var SSID, Password, HTML_Port;
				var code = '';
				//SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
				//Password = Blockly.Arduino.valueToCode(this, 'PASSWORD', Blockly.Arduino.ORDER_ATOMIC);
				var html = Blockly.Arduino.valueToCode(this, 'HTML', Blockly.Arduino.ORDER_NONE) ||'""';
				HTML_Port = Blockly.Arduino.valueToCode(this, 'PORT', Blockly.Arduino.ORDER_ATOMIC) ||'80';
				//var baud_rate = Blockly.Arduino.valueToCode(this, 'BAUD_RATE', Blockly.Arduino.ORDER_ATOMIC);

				/*if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4'))
				{
					var rx, tx;
					rx = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE);
					tx = Blockly.Arduino.valueToCode(this, 'PIN2', Blockly.Arduino.ORDER_ATOMIC);
					Blockly.Arduino.definitions_['declare_var_WiFiSerial'] = 'SoftwareSerial _wifi_device(' + rx + ',' + tx + ');\n';
					Blockly.Arduino.definitions_['define_softwareserial'] = JST['softwareserial_def_definitions']({});
					Blockly.Arduino.setups_['setup_wifiserial'] = JST['communications_softwareserial_def_setups']({'device': '_wifi_device', 'baud_rate': baud_rate,'rx': rx,'tx': tx});
				}
				else if (Facilino.profiles['processor']==='ATmega2560')
				{
					var port=this.getFieldValue('PORT');
					Blockly.Arduino.definitions_['declare_var_WiFiSerial'] = '#define _wifi_device Serial'+port+'\n';
					Blockly.Arduino.setups_['setup_serial_'+port] = '_wifi_device.begin('+baud_rate+');\n';
					var rx='', tx='';
				}
				Blockly.Arduino.definitions_['declare_var_wifi' + rx+'_'+tx] = 'ESP8266 _wifi(_wifi_device);\n';
				Blockly.Arduino.definitions_['declare_var_muxID'] = 'uint8_t _muxID;\n';
				Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions']({});
				Blockly.Arduino.setups_['setup_wifi_'] = '_wifi.setOprToStationSoftAP();\n  _wifi.joinAP('+SSID+','+Password+');\n';*/
				
				Blockly.Arduino.setups_['setup_wifi_tcp_udp_enable'] = '_wifi.enableMUX();\n';
				Blockly.Arduino.setups_['setup_wifi_tcp_udp_server'] = '_wifi.startTCPServer('+HTML_Port+');\n_wifi.setTCPServerTimeout(10);\n';
				Blockly.Arduino.definitions_['define_wifi_definitions_server_recv'] = JST['communications_wifi_server_recv_definitions']({});
				code += 'if (_wifi_server_recv(&_muxID,100)>0)\n{\n';
				code += '  String str_http = String("HTTP/1.1 200 OK\\r\\nContent-Type: text/html\\r\\n\\r\\n");\n';
				code += '  str_http+='+html+'+String("Client disconnected\\r\\n\\r\\n");\n';
				code += '  _wifi.send(_muxID,(uint8_t*)str_http.c_str(),str_http.length());  _wifi.releaseTCP();\n}\n';
				return code;
			}
			Blockly.Blocks.communications_wifi_html_server = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_html_server'),
				examples: ['communications_wifi_html_server_example.bly','communications_wifi_html_server_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_HTTP_SERVER_NAME','LANG_WIFI_ESP8266_HTTP_SERVER','LANG_WIFI_ESP8266_DEF_SSID','LANG_WIFI_ESP8266_DEF_PASSWORD','LANG_WIFI_ESP8266_HTTP_PORT','LANG_WIFI_ESP8266_DEF_BAUD_RATE','LANG_WIFI_ESP8266_DEF_PIN1','LANG_WIFI_ESP8266_DEF_PIN2','LANG_WIFI_ESP8266_PORT','LANG_WIFI_ESP8266_HTML','LANG_WIFI_ESP8266_HTTP_SERVER_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_SERVER_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_SERVER')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					//this.appendValueInput('SSID').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_SSID')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/SSID.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					//this.appendValueInput('PASSWORD').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_PASSWORD')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/lock.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PORT').setCheck(Number).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_PORT')).setAlign(Blockly.ALIGN_RIGHT);
					/*if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4'))
					{
					this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PIN').setCheck('DigitalPin').appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_PIN1')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PIN2').setCheck('DigitalPin').appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_PIN2')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					}
					else if (Facilino.profiles['processor']==='ATmega2560')
					{
						this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_PORT')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.serial_ports),'PORT').setAlign(Blockly.ALIGN_RIGHT);
						this.appendValueInput('BAUD_RATE').setCheck(Number).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_BAUD_RATE')).setAlign(Blockly.ALIGN_RIGHT);
					}*/
					this.appendValueInput('HTML').setCheck([String,'Html']).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/html.svg', 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_SERVER_TOOLTIP'));
				},
				default_inputs: function()
				{
					/*var xml='<value name="SSID"><shadow type="text"><field name="TEXT">MyAccessPoint</field></shadow></value><value name="PASSWORD"><shadow type="text"><field name="TEXT">MyPassword</field></shadow></value><value name="PORT"><shadow type="math_number"><field name="NUM">80</field></shadow></value><value name="BAUD_RATE"><shadow type="math_number"><field name="NUM">9600</field></shadow></value>';
					if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4'))
					{
						xml+='<value name="PIN"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
						if (Facilino.profiles.default.digital.length>1)
							xml+='<value name="PIN2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
						else
							xml+='<value name="PIN2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
					}*/
					var xml='<value name="PORT"><shadow type="math_number"><field name="NUM">80</field></shadow></value>';
					xml+='<value name="HTML"><shadow type="html_doc"></shadow></value>';
					return xml;
				},
				isNotDuplicable: true
			};
			}

		}
		if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='RP2040'))
		{
			//if ((window.FacilinoOTA===false)||(window.FacilinoOTA==null))
			if (window.FacilinoAdvanced===true)
			{
			Blockly.Arduino.communications_wifi_def = function() {
				var SSID, Password;
				SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
				Password = Blockly.Arduino.valueToCode(this, 'PASSWORD', Blockly.Arduino.ORDER_ATOMIC);
				var console = this.getFieldValue('CONSOLE');
				var AP = this.getFieldValue('AP');
				
				if (Facilino.profiles['processor']==='ESP8266')
				{
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
					Blockly.Arduino.definitions_['define_wifi_dns'] = JST['communications_wifi_esp8266_dns_def_definitions']({});
					if (window.FacilinoOTA)
						Blockly.Arduino.definitions_['define_wifi_web_updater'] = JST['communications_wifi_esp8266_webupdater_def_definitions']({});
				}
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
				{
					Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
					
					if (window.FacilinoOTA)
					{
						if (Facilino.profiles['processor']==='ESP32')
							Blockly.Arduino.definitions_['define_wifi_dns'] = JST['communications_wifi_esp32_dns_def_definitions']({});
						Blockly.Arduino.definitions_['define_wifi_web_updater'] = JST['communications_wifi_esp32_webupdater_def_definitions']({});
					}
					if (Facilino.profiles['processor']==='ESP32')
					{
						Blockly.Arduino.definitions_['define_sens_reg'] ='#include "soc/sens_reg.h"';
						Blockly.Arduino.definitions_['declare_var_adc_register'] = 'uint32_t adc_register;\n';
						Blockly.Arduino.definitions_['declare_var_wifi_register'] = 'uint32_t wifi_register;\n';
						Blockly.Arduino.setups_['inout_analog_workaround_adc'] = 'adc_register = READ_PERI_REG(SENS_SAR_READ_CTRL2_REG);\n';
					}
				}
				/*if (window.FacilinoOTA)
					Blockly.Arduino.definitions_['define_wifi_OTA'] = JST['communications_wifi_ota_def_definitions']({});*/
				/*if (Facilino.profiles['processor']==='ESP8266')
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
				else if (Facilino.profiles['processor']==='ESP32')
					Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';*/
				if (console==='FALSE')
				{
					if (AP==='FALSE')
						Blockly.Arduino.setups_['setup_wifi_'] = JST['communications_wifi_STA_def_setups']({'ssid': SSID, 'password': Password});
					else
						Blockly.Arduino.setups_['setup_wifi_'] = JST['communications_wifi_AP_def_setups2']({'ssid': SSID,'password': Password});
					Blockly.Arduino.definitions_['declare_var_wifi_status'] = 'bool _wifi_status=false;\n';
					//Blockly.Arduino.setups_['setup_wifi_']+='  Serial.begin(115200);\n  Serial.println(); Serial.print("IP: "); Serial.println(WiFi.localIP()); Serial.print("MAC:" ); Serial.println(WiFi.macAddress());\n';
				}
				else
				{
					Blockly.Arduino.setups_['setup_serial'] = JST['communications_serial_begin']({'bitrate': Facilino.profiles.default.serial});
					if (AP==='FALSE')
						Blockly.Arduino.setups_['setup_wifi_'] = JST['communications_wifi_STA_def_setups']({'ssid': SSID,'password': Password})+' Serial.print("IP: "); Serial.println(WiFi.localIP()); Serial.print("MAC:" ); Serial.println(WiFi.macAddress());';
					else
						Blockly.Arduino.setups_['setup_wifi_'] = JST['communications_wifi_AP_def_setups2']({'ssid': SSID,'password': Password})+' \n IPAddress IP = WiFi.softAPIP();\n Serial.print("IP: ");\n Serial.println(IP);';
					Blockly.Arduino.definitions_['declare_var_wifi_status'] = 'bool _wifi_status=true;\n';
				}
				if (Blockly.Arduino.definitions_['declare_var_wifi_register']!==undefined)
						Blockly.Arduino.setups_['inout_analog_workaround_wifi'] = 'wifi_register = READ_PERI_REG(SENS_SAR_READ_CTRL2_REG);\n';
				return '';
			}


			Blockly.Blocks.communications_wifi_def = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_def'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_DEF_NAME','LANG_WIFI_ESP8266_DEF','LANG_WIFI_ESP8266_DEF_SSID','LANG_WIFI_ESP8266_DEF_PASSWORD','LANG_WIFI_ESP8266_DEF_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('SSID').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_SSID')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/SSID.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PASSWORD').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_PASSWORD')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/lock.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_AP')).appendField(new Blockly.FieldCheckbox('FALSE'),'AP').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_CONSOLE')).appendField(new Blockly.FieldCheckbox('FALSE'),'CONSOLE').setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_TOOLTIP'));
				},
				default_inputs: function ()
				{
					return '<value name="SSID"><shadow type="text"><field name="TEXT">MySSID</field></shadow></value><value name="PASSWORD"><shadow type="text"><field name="TEXT">MyPassword</field></shadow></value>';
				},
				isNotDuplicable: true
			};
			
			if (window.FacilinoOTA)
			{
				Blockly.Arduino.communications_wifi_ota_sethostname = function() {
				var DeviceName;
				DeviceName = Blockly.Arduino.valueToCode(this, 'DEVICENAME', Blockly.Arduino.ORDER_ATOMIC);
				return 'ArduinoOTA.setHostname('+DeviceName+');\n';
			}

			Blockly.Blocks.communications_wifi_ota_sethostname = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_def'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_OTA_SET_DEVICENAME_NAME','LANG_WIFI_OTA_SET_DEVICENAME_DEF','LANG_WIFI_OTA_SET_DEVICENAME_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_OTA_SET_DEVICENAME_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendValueInput('DEVICENAME').appendField(Facilino.locales.getKey('LANG_WIFI_OTA_SET_DEVICENAME_DEF')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/cpu-wifi.svg', 20*options.zoom, 20*options.zoom));
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_OTA_SET_DEVICENAME_TOOLTIP'));
				},
				default_inputs: function ()
				{
					return '<value name="DEVICENAME"><shadow type="text"><field name="TEXT">HostName</field></shadow></value>';
				},
				isNotDuplicable: true
			};
			/*	Blockly.Arduino.communications_wifi_ota_setpassword = function() {
				var Password;
				Password = Blockly.Arduino.valueToCode(this, 'PASSWORD', Blockly.Arduino.ORDER_ATOMIC);
				return 'ArduinoOTA.setPassword('+Password+');\n';
			}

			Blockly.Blocks.communications_wifi_ota_setpassword = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_def'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_OTA_SET_PASSWORD_DEF','LANG_WIFI_OTA_SET_PASSWORD_TOOLTIP'],
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendValueInput('PASSWORD').appendField(Facilino.locales.getKey('LANG_WIFI_OTA_SET_PASSWORD_DEF')).appendField(new Blockly.FieldImage('img/blocks/cpu-wifi-password.svg', 20*options.zoom, 20*options.zoom));
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_OTA_SET_PASSWORD_TOOLTIP'));
				},
				isNotDuplicable: true
			};*/
			
			}

			Blockly.Arduino.communications_wifi_localIP = function() {
				if (Facilino.profiles['processor']==='ESP8266')
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='RP2040'))
					Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				code ='WiFi.localIP()';
				return [code,Blockly.Arduino.ORDER_ATOMIC];
			}


			Blockly.Blocks.communications_wifi_localIP = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_localIP'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_LOCALIP_NAME','LANG_WIFI_ESP8266_LOCALIP','LANG_WIFI_ESP8266_LOCALIP_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_LOCALIP_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_LOCALIP')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.setInputsInline(false);
					this.setPreviousStatement(false);
					this.setNextStatement(false);
					this.setOutput(true,String);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_LOCALIP_TOOLTIP'));

				}
			};

			Blockly.Arduino.communications_wifi_MAC = function() {
				if (Facilino.profiles['processor']==='ESP8266')
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='RP2040'))
					Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				code ='WiFi.macAddress()';
				return [code,Blockly.Arduino.ORDER_ATOMIC];
			}


			Blockly.Blocks.communications_wifi_MAC = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_MAC'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_MAC_NAME','LANG_WIFI_ESP8266_MAC','LANG_WIFI_ESP8266_MAC_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_MAC_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_MAC')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.setInputsInline(false);
					this.setPreviousStatement(false);
					this.setNextStatement(false);
					this.setOutput(true,String);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_MAC_TOOLTIP'));

				}
			};

			Blockly.Arduino.communications_wifi_isconnected = function() {
				if (Facilino.profiles['processor']==='ESP8266')
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='RP2040'))
					Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				var code ='(WiFi.status()==WL_CONNECTED)';
				return [code,Blockly.Arduino.ORDER_ATOMIC];
			}


			Blockly.Blocks.communications_wifi_isconnected = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_isconnected'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_ISCONNECTED_NAME','LANG_WIFI_ESP8266_ISCONNECTED','LANG_WIFI_ESP8266_ISCONNECTED_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_ISCONNECTED_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_ISCONNECTED')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.setInputsInline(false);
					this.setPreviousStatement(false);
					this.setNextStatement(false);
					this.setOutput(true,Boolean);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_ISCONNECTED_TOOLTIP'));

				}
			};
			}
			
			if ((window.FacilinoOTA===false)||(window.FacilinoOTA==null))
			{
			
			if (window.FacilinoAdvanced===true)
			{			
			/*Blockly.Arduino.communications_wifi_tcp_open = function() {
				var IP, Port;
				IP = Blockly.Arduino.valueToCode(this, 'IP', Blockly.Arduino.ORDER_ATOMIC) || '""';
				Port = Blockly.Arduino.valueToCode(this, 'PORT', Blockly.Arduino.ORDER_ATOMIC) ||80;
				var code = '';
				if (Facilino.profiles['processor']==='ESP8266')
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
					Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';
				code += '_client.connect('+IP+','+Port+');\n';
				return code;
			}

			Blockly.Blocks.communications_wifi_tcp_open = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_tcp_open'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_TCP_OPEN_NAME','LANG_WIFI_ESP8266_TCP_OPEN','LANG_WIFI_ESP8266_IP','LANG_WIFI_ESP8266_PORT','LANG_WIFI_ESP8266_TCP_OPEN_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_OPEN_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_OPEN')).appendField(new Blockly.FieldImage('img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('IP').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_IP')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PORT').setCheck(Number).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_PORT')).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_OPEN_TOOLTIP'));
				}
			};

			Blockly.Arduino.communications_wifi_tcp_close = function() {
				var code = '';
				if (Facilino.profiles['processor']==='ESP8266')
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
					Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';
				code += _client = '_client.stop();\n';
				return code;
			}

			Blockly.Blocks.communications_wifi_tcp_close = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266','communications'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_tcp_close'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_TCP_CLOSE_NAME','LANG_WIFI_ESP8266_TCP_CLOSE','LANG_WIFI_ESP8266_TCP_CLOSE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_CLOSE_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_CLOSE')).appendField(new Blockly.FieldImage('img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_TCP_CLOSE_TOOLTIP'));
				}
			};

			Blockly.Arduino.communications_wifi_recv = function() {
				var code = '';
				if (Facilino.profiles['processor']==='ESP8266')
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
					Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';
				Blockly.Arduino.definitions_['define_wifi_definitions_recv2'] = JST['communications_wifi_recv2_definitions']({});
				 code = '_wifi_recv2()';
				return [code,Blockly.Arduino.ORDER_NONE];
			}

			Blockly.Blocks.communications_wifi_recv = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_recv'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_RECV_NAME','LANG_WIFI_ESP8266_RECV','LANG_WIFI_ESP8266_RECV_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_RECV_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_RECV')).appendField(new Blockly.FieldImage('img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					//this.appendValueInput('TIMEOUT').setCheck(Number).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_TIMEOUT')).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(false);
					this.setNextStatement(false);
					this.setOutput(true,[Number,String]);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_RECV_TOOLTIP'));
				}
			};

			Blockly.Arduino.communications_wifi_send = function() {
				var send_text = Blockly.Arduino.valueToCode(this, 'TEXT', Blockly.Arduino.ORDER_NONE) ||'""';
				var code = '';
				if (Facilino.profiles['processor']==='ESP8266')
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='ESP8266'))
					Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';
				code = '_client.print('+send_text+');\n';
				return code;
			}

			Blockly.Blocks.communications_wifi_send = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_send'),
				examples: ['communications_wifi_def_example.bly','communications_wifi_def_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_SEND_NAME','LANG_WIFI_ESP8266_SEND','LANG_WIFI_ESP8266_TEXT','LANG_WIFI_ESP8266_SEND_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_SEND_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_SEND')).appendField(new Blockly.FieldImage('img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('TEXT').setCheck([String,'Variable']).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_TEXT')).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_SEND_TOOLTIP'));
				}
			};*/
			
			Blockly.Arduino.communications_wifi_http_server = function() {
				//var SSID, Password;
				var Port;
				var code = '';
				//SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
				//Password = Blockly.Arduino.valueToCode(this, 'PASSWORD', Blockly.Arduino.ORDER_ATOMIC);
				Port = Blockly.Arduino.valueToCode(this, 'PORT', Blockly.Arduino.ORDER_ATOMIC) ||'80';
				Blockly.Arduino.definitions_['declare_var_wifi_server'] = 'WiFiServer _server('+Port+');\n';
				//if (Facilino.profiles['processor']==='ESP8266')
				//	Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
				//else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
				//	Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				
				//Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';

				//Blockly.Arduino.setups_['setup_wifi_'] = JST['communications_wifi_AP_def_setups2']({
				//'ssid': SSID,
				//'password': Password
				//});
				if (Blockly.Arduino.definitions_['declare_var_wifi_register']!==undefined)
					Blockly.Arduino.setups_['inout_analog_workaround_wifi'] = 'wifi_register = READ_PERI_REG(SENS_SAR_READ_CTRL2_REG);\n';
				//Blockly.Arduino.definitions_['setup_wifi_server_not_found']=JST['setup_wifi_server_not_found']({});
				//Blockly.Arduino.setups_['setup_wifi_server'] = '_server.onNotFound(notFound);\n _server.begin();\n';
				return code;
			}
			Blockly.Blocks.communications_wifi_http_server = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_http_server'),
				examples: [],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_HTTP_SERVER_NAME','LANG_WIFI_ESP8266_HTTP_SERVER','LANG_WIFI_ESP8266_DEF_SSID','LANG_WIFI_ESP8266_DEF_PASSWORD','LANG_WIFI_ESP8266_HTTP_PORT','LANG_WIFI_ESP8266_HTML','LANG_WIFI_ESP8266_HTTP_SERVER_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_SERVER_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF')+' Server').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					//this.appendValueInput('SSID').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_SSID')).appendField(new Blockly.FieldImage(Facilino.path+Facilino.path+"img/blocks/SSID.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);	//this.appendValueInput('PASSWORD').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_PASSWORD')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/lock.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					//var defaultArgument = Blockly.Block.obtain(Blockly.mainWorkspace, 'math_number');
					//defaultArgument.setShadow(true);
					//this.appendValueInput('PORT').setCheck(Number).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_PORT')).setAlign(Blockly.ALIGN_RIGHT).connection.connect(defaultArgument.outputConnection);;
					this.appendValueInput('PORT').setCheck(Number).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_PORT')).setAlign(Blockly.ALIGN_RIGHT);
					
					//this.setShadow(true);
					//console.log(this.isShadow());
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_SERVER_TOOLTIP'));
				},
				default_inputs: function()
				{
					var xml='';
					xml+='<value name="SSID"><shadow type="text"><field name="TEXT">MySSID</field></shadow></value>';
					xml+='<value name="PASSWORD"><shadow type="text"><field name="TEXT">MyPassword</field></shadow></value>';
					xml+='<value name="PORT"><shadow type="math_number"><field name="NUM">80</field></shadow></value>';
					return xml;
				},
				isNotDuplicable: true
			};
			
			Blockly.Arduino.communications_wifi_html_server = function() {
				var SSID, Password, Port;
				var code = '';
				SSID = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
				Password = Blockly.Arduino.valueToCode(this, 'PASSWORD', Blockly.Arduino.ORDER_ATOMIC);
				var html = Blockly.Arduino.valueToCode(this, 'HTML', Blockly.Arduino.ORDER_NONE) ||'""';
				Port = Blockly.Arduino.valueToCode(this, 'PORT', Blockly.Arduino.ORDER_ATOMIC) ||'80';
				Blockly.Arduino.definitions_['declare_var_wifi_server'] = 'WiFiServer _server('+Port+');\n';
				if (Facilino.profiles['processor']==='ESP8266')
					Blockly.Arduino.definitions_['define_wifi'] = JST['communications_wifi_def_definitions2']({});
				else if ((Facilino.profiles['processor']==='ESP32')||(Facilino.profiles['processor']==='RP2040'))
					Blockly.Arduino.definitions_['define_wifi'] ='#include <WiFi.h>';
				Blockly.Arduino.definitions_['declare_var_wifi'] = 'WiFiClient _client;\n';

				Blockly.Arduino.setups_['setup_wifi_'] = JST['communications_wifi_AP_def_setups2']({
				'ssid': SSID,
				'password': Password
				});
				if (Blockly.Arduino.definitions_['declare_var_wifi_register']!==undefined)
					Blockly.Arduino.setups_['inout_analog_workaround_wifi'] = 'wifi_register = READ_PERI_REG(SENS_SAR_READ_CTRL2_REG);\n';
				Blockly.Arduino.setups_['setup_wifi_server'] = '_server.begin();\n';
				code += '_client = _server.available();\n  if (!_client) {\n	return;\n  }\n';
				code += 'while(!_client.available()){\n	 delay(1);\n  }\n';
				code += 'String _request = _client.readStringUntil(\'\\r\');\n';
				code += '_client.flush();\n';
				code += 'String str_http = String("HTTP/1.1 200 OK\\r\\nContent-Type: text/html\\r\\n\\r\\n");\n';
				code += ' _client.println('+html+');\n';
				return code;
			}
			Blockly.Blocks.communications_wifi_html_server = {
				category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
				tags: ['wifi','esp8266'],
				helpUrl: Facilino.getHelpUrl('communications_wifi_html_server'),
				examples: ['communications_wifi_html_server_example.bly','communications_wifi_html_server_example1.bly'],
				category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
				colour: Facilino.LANG_COLOUR_COMMUNICATION_WIFI,
				keys: ['LANG_WIFI_ESP8266_HTTP_SERVER_NAME','LANG_WIFI_ESP8266_HTTP_SERVER','LANG_WIFI_ESP8266_DEF_SSID','LANG_WIFI_ESP8266_DEF_PASSWORD','LANG_WIFI_ESP8266_HTTP_PORT','LANG_WIFI_ESP8266_HTML','LANG_WIFI_ESP8266_HTTP_SERVER_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_SERVER_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_COMMUNICATION_WIFI);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_SERVER')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/wifi.svg', 20*options.zoom, 20*options.zoom));
					this.appendValueInput('SSID').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_SSID')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/SSID.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PASSWORD').setCheck(String).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_DEF_PASSWORD')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/lock.svg", 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('PORT').setCheck(Number).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_PORT')).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('HTML').setCheck([String,'Html']).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/html.svg', 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTTP_SERVER_TOOLTIP'));
				},
				default_inputs: function()
				{
					var xml='';
					xml+='<value name="SSID"><shadow type="text"><field name="TEXT">MySSID</field></shadow></value>';
					xml+='<value name="PASSWORD"><shadow type="text"><field name="TEXT">MyPassword</field></shadow></value>';
					xml+='<value name="PORT"><shadow type="math_number"><field name="NUM">80</field></shadow></value>';
					xml+='<value name="HTML"><shadow type="html_doc"></shadow></value>';
					return xml;
				},
				isNotDuplicable: true
			};

			}
			
			}
		}
	}
	
	var FacilinoWiFi = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoWiFi;
	} else {
		window.FacilinoWiFi = FacilinoWiFi;
	}
}));
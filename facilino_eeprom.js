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
		if ((Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32'))
		{
			Blockly.Arduino.eeprom_length= '1';
			
			Blockly.Arduino.eeprom_size = function(block) {
			  var size = this.getFieldValue('SIZE');
			  var code='';
			  Blockly.Arduino.definitions_['define_eeprom_h']='#include <EEPROM.h>';
			  Blockly.Arduino.setups_['setup_eeprom'] = 'EEPROM.begin('+size+');\n';
			  Blockly.Arduino.eeprom_length=size;
			  return code;
			};

			Blockly.Blocks.eeprom_size = {
				category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_EEPROM'),
				category_colour: Facilino.LANG_COLOUR_VARIABLES,
				colour: Facilino.LANG_COLOUR_VARIABLES,
				helpUrl: Facilino.getHelpUrl('eeprom_size'),
				tags: [],
				examples: [],
				keys: ['LANG_EEPROM_SIZE_NAME','LANG_EEPROM_SIZE','LANG_EEPROM_SIZE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_EEPROM_SIZE_NAME'),
				init: function() {
					this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_EEPROM_SIZE')).appendField(new Blockly.FieldNumber(1,0,2048,1),'SIZE');
					this.setOutput(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setColour(Facilino.LANG_COLOUR_VARIABLES);
					this.setTooltip(Facilino.locales.getKey('LANG_EEPROM_SIZE_TOOLTIP'));
				},
				isNotDuplicable: true
			};
		}
		
		
		if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32'))
		{
			Blockly.Arduino.eeprom_clear = function(block) {
			  var code='';
			  Blockly.Arduino.definitions_['define_eeprom_h']='#include <EEPROM.h>';
			  if ((Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32'))
				  Blockly.Arduino.definitions_['define_eeprom_clear']='void EEPROM_clear()\n{\n  for (int i = 0 ; i < '+Blockly.Arduino.eeprom_length+' ; i++)\n	EEPROM.write(i, 0);\n}\n';
			  else
				Blockly.Arduino.definitions_['define_eeprom_clear']='void EEPROM_clear()\n{\n  for (int i = 0 ; i < EEPROM.length() ; i++)\n	EEPROM.write(i, 0);\n}\n';
			  code+='EEPROM_clear();\n';
			  return code;
			};

			Blockly.Blocks.eeprom_clear = {
				category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_EEPROM'),
				category_colour: Facilino.LANG_COLOUR_VARIABLES,
				colour: Facilino.LANG_COLOUR_VARIABLES,
				helpUrl: Facilino.getHelpUrl('eeprom_clear'),
				tags: [],
				examples: [],
				keys: ['LANG_EEPROM_CLEAR_NAME','LANG_EEPROM_CLEAR','LANG_EEPROM_CLEAR_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_EEPROM_CLEAR_NAME'),
				init: function() {
					this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_EEPROM_CLEAR'))
					this.setOutput(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setColour(Facilino.LANG_COLOUR_VARIABLES);
					this.setTooltip(Facilino.locales.getKey('LANG_EEPROM_CLEAR_TOOLTIP'));
				}
			};
		}
		
		
		
		if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32'))
		{
			Blockly.Arduino.eeprom_read_byte = function(block) {
			  //var field_address = block.getFieldValue('ADDRESS');
			  var field_address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC);
			  Blockly.Arduino.definitions_['define_eeprom_h']='#include <EEPROM.h>';
			  var code='';
			  code+='EEPROM.read('+field_address+')';
			  return [code, Blockly.Arduino.ORDER_ATOMIC];
			};



			Blockly.Blocks.eeprom_read_byte = {
				category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_EEPROM'),
				category_colour: Facilino.LANG_COLOUR_VARIABLES,
				colour: Facilino.LANG_COLOUR_VARIABLES,
				helpUrl: Facilino.getHelpUrl('eeprom_read_byte'),
				tags: [],
				examples: [],
				keys: ['LANG_EEPROM_READ_BYTE_NAME','LANG_EEPROM_READ_BYTE','LANG_EEPROM_ADDRESS','LANG_EEPROM_READ_BYTE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_EEPROM_READ_BYTE_NAME'),
				init: function() {
					this.appendValueInput('ADDRESS')
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField(Facilino.locales.getKey('LANG_EEPROM_READ_BYTE'))
						.appendField(Facilino.locales.getKey('LANG_EEPROM_ADDRESS')).setCheck(Number);
						//.appendField(new Blockly.FieldTextInput("0",this.validator_), "ADDRESS");
					this.setOutput(true,Number);
					this.setColour(Facilino.LANG_COLOUR_VARIABLES);
					this.setTooltip(Facilino.locales.getKey('LANG_EEPROM_READ_BYTE_TOOLTIP'));
				}
			};

			Blockly.Arduino.eeprom_read_bytes = function(block) {
			  //var field_address = block.getFieldValue('ADDRESS');
			  var field_address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC);
			  var variable = Blockly.Arduino.valueToCode(this, 'VARIABLE', Blockly.Arduino.ORDER_ATOMIC);
			  var code='';
			  Blockly.Arduino.definitions_['define_eeprom_h']='#include <EEPROM.h>';
			  Blockly.Arduino.definitions_['define_eeprom_read_bytes']='void EEPROM_read_bytes(int address, uint8_t* variable, int bytes) {\n  for (int i=0;i<bytes;i++)\n	variable[i]=EEPROM.read(address+i);\n}\n ';
			  if (this.getInputTargetBlock('VARIABLE')!==null)
			  {
				if ((Facilino.variables[variable][0]==='byte')||(Facilino.variables[variable][0]==='char'))
					code+='EEPROM_read_bytes('+field_address+',(byte*)&'+variable+','+Facilino.variables[variable][3]+');\n ';
				else if (Facilino.variables[variable][0]==='short')
					code+='EEPROM_read_bytes('+field_address+',(byte*)&'+variable+',sizeof(short)*'+Facilino.variables[variable][3]+');\n ';
				else if (Facilino.variables[variable][0]==='int')
					code+='EEPROM_read_bytes('+field_address+',(byte*)&'+variable+',sizeof(int)*'+Facilino.variables[variable][3]+');\n ';
				else if (Facilino.variables[variable][0]==='long')
					code+='EEPROM_read_bytes('+field_address+',(byte*)&'+variable+',sizeof(long)*'+Facilino.variables[variable][3]+');\n ';
				else if (Facilino.variables[variable][0]==='float')
					code+='EEPROM_read_bytes('+field_address+',(byte*)&'+variable+',sizeof(float)*'+Facilino.variables[variable][3]+');\n ';
			  }
			  return code;
			};



			Blockly.Blocks.eeprom_read_bytes = {
				category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_EEPROM'),
				category_colour: Facilino.LANG_COLOUR_VARIABLES,
				colour: Facilino.LANG_COLOUR_VARIABLES,
				helpUrl: Facilino.getHelpUrl('eeprom_read_bytes'),
				tags: [],
				examples: [],
				keys: ['LANG_EEPROM_READ_BYTES_NAME','LANG_EEPROM_READ_BYTES','LANG_EEPROM_READ_BYTES_WITH','LANG_EEPROM_ADDRESS','LANG_EEPROM_READ_BYTES_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_EEPROM_READ_BYTES_NAME'),
				init: function() {
					this.appendValueInput('VARIABLE')
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField(Facilino.locales.getKey('LANG_EEPROM_READ_BYTES'))
						.appendField(Facilino.locales.getKey('LANG_EEPROM_READ_BYTES_WITH')).setCheck('Array');
					this.appendValueInput('ADDRESS')
						.appendField(Facilino.locales.getKey('LANG_EEPROM_ADDRESS')).setCheck(Number);
						//.appendField(new Blockly.FieldTextInput("0",Blockly.Blocks.i2c_read_byte.validator), "ADDRESS");
					this.setOutput(false);
					this.setInputsInline(true);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setColour(Facilino.LANG_COLOUR_VARIABLES);
					this.setTooltip(Facilino.locales.getKey('LANG_EEPROM_READ_BYTES_TOOLTIP'));
				}
			};

			Blockly.Arduino.eeprom_write_bytes = function(block) {
			  //var field_address = block.getFieldValue('ADDRESS');
			  var field_address = Blockly.Arduino.valueToCode(this, 'ADDRESS', Blockly.Arduino.ORDER_ATOMIC);
			  var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
			  var code='';
			  Blockly.Arduino.definitions_['define_eeprom_h']='#include <EEPROM.h>';
			  if ((Facilino.profiles['processor']==='ESP8266')||(Facilino.profiles['processor']==='ESP32'))
				  Blockly.Arduino.definitions_['define_EEPROM_write_bytes']='void EEPROM_write_bytes(byte address, byte* val, int length)\n{\n  for (int i=0;i<length;i++)\n	EEPROM.write(address+i,val[i]);\n  EEPROM.commit();\n}\n';
			  else
			  {
			  Blockly.Arduino.definitions_['define_EEPROM_write_bytes']='void EEPROM_write_bytes(byte address, byte* val, int length)\n{\n  for (int i=0;i<length;i++)\n	EEPROM.write(address+i,val[i]);\n}\n';
			  }
			  if (this.getInputTargetBlock('DATA')!==null)
			  {
				  var data_block = this.getInputTargetBlock('DATA');
				  if (data_block.type==='variables_get')
				  {
					  if (Facilino.variables[data][2]==='variable')
					  {
						  if ((Facilino.variables[data][0]==='byte')||(Facilino.variables[data][0]==='char'))
							code+='EEPROM_write_bytes('+field_address+',(byte*)&'+data+',sizeof(byte));\n ';
						  else if (Facilino.variables[data][0]==='short')
							code+='EEPROM_write_bytes('+field_address+',(byte*)&'+data+',sizeof(short));\n ';
						  else if (Facilino.variables[data][0]==='int')
							code+='EEPROM_write_bytes('+field_address+',(byte*)&'+data+',sizeof(int));\n ';
						  else if (Facilino.variables[data][0]==='long')
							code+='EEPROM_write_bytes('+field_address+',(byte*)&'+data+',sizeof(long));\n ';
						  else if (Facilino.variables[data][0]==='float')
							code+='EEPROM_write_bytes('+field_address+',(byte*)&'+data+',sizeof(float));\n ';
					  }
					  else if (Facilino.variables[data][2]==='1DArray')
					  {
						  if ((Facilino.variables[data][0]==='byte')||(Facilino.variables[data][0]==='char'))
							code+='EEPROM_write_bytes('+field_address+',(byte*)&'+data+','+Facilino.variables[data][3]+');\n ';
						  else if (Facilino.variables[data][0]==='short')
							code+='EEPROM_write_bytes('+field_address+',(byte*)&'+data+',sizeof(short)*'+Facilino.variables[data][3]+');\n ';
						  else if (Facilino.variables[data][0]==='int')
							code+='EEPROM_write_bytes('+field_address+',(byte*)&'+data+',sizeof(int)*'+Facilino.variables[data][3]+');\n ';
						  else if (Facilino.variables[data][0]==='long')
							code+='EEPROM_write_bytes('+field_address+',(byte*)&'+data+',sizeof(long)*'+Facilino.variables[data][3]+');\n ';
						  else if (Facilino.variables[data][0]==='float')
							code+='EEPROM_write_bytes('+field_address+',(byte*)&'+data+',sizeof(float)*'+Facilino.variables[data][3]+');\n ';
					  }
				  }
				  else if (data_block.type==='math_number')
				  {
					  var n;
					  if (data.includes('.'))
					  {
						  n = window.parseFloat(data);
						  if (!window.isNaN(n))
						  {
							  code+='{\n'
								code+='float _eeprom_data='+data+';\n';
								code+='EEPROM_write_bytes('+field_address+',(byte*)&_eeprom_data,4);\n ';
								code+='}\n'
						  }
					  }
					  else
					  {
						  n = window.parseInt(data);
						  if (!window.isNaN(n))
						  {
							  if ((n>=0)&&(n<=127))
							  {
								code+='{\n'
								code+='byte _eeprom_data='+data+';\n';
								code+='EEPROM_write_bytes('+field_address+',&_eeprom_data,sizeof(byte=);\n ';
								code+='}\n'
							  }
							  else if ((n>=128)&&(n<=65535))
							  {
								code+='{\n'
								code+='short _eeprom_data='+data+';\n';
								code+='EEPROM_write_bytes('+field_address+',(byte*)&_eeprom_data,sizeof(short));\n ';
								code+='}\n'
							  }
							  else if ((n>=65536)&&(n<=4294967295))
							  {
								code+='{\n'
								code+='long _eeprom_data='+data+';\n';
								code+='EEPROM_write_bytes('+field_address+',(byte*)&_eeprom_data,sizeof(long));\n ';
								code+='}\n'
							  }
							  /*else if ((n>=4294967296)&&(n<=18446744073709551615))
							  {
								code+='{\n'
								code+='long _eeprom_data='+data+';\n';
								code+='EEPROM_write_bytes('+field_address+',(byte*)&_eeprom_data,8);\n ';
								code+='}\n'
							  }*/
						  }
					  }
				  }
			  }
			  return code;
			};

			Blockly.Blocks.eeprom_write_bytes = {
				category: Facilino.locales.getKey('LANG_CATEGORY_VARIABLES'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_EEPROM'),
				category_colour: Facilino.LANG_COLOUR_VARIABLES,
				colour: Facilino.LANG_COLOUR_VARIABLES,
				helpUrl: Facilino.getHelpUrl('eeprom_write_bytes'),
				tags: [],
				examples: [],
				keys: ['LANG_EEPROM_WRITE_NAME','LANG_EEPROM_WRITE','LANG_EEPROM_ADDRESS','LANG_EEPROM_BYTES','LANG_EEPROM_WRITE_BYTES_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_EEPROM_WRITE_NAME'),
				init: function() {
					this.appendValueInput('ADDRESS')
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField(Facilino.locales.getKey('LANG_EEPROM_WRITE'))
						.appendField(Facilino.locales.getKey('LANG_EEPROM_ADDRESS')).setCheck(Number);
					this.appendValueInput('DATA')
						//.appendField(new Blockly.FieldTextInput("0",Blockly.Blocks.i2c_read_byte.validator), "ADDRESS")
						.appendField(Facilino.locales.getKey('LANG_EEPROM_BYTES'))
						.setCheck([Number,'Variable']);
					this.setOutput(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setInputsInline(true);
					this.setColour(Facilino.LANG_COLOUR_VARIABLES);
					this.setTooltip(Facilino.locales.getKey('LANG_EEPROM_WRITE_BYTES_TOOLTIP'));
				}
			};
			}
		}
	
	}
	
	var FacilinoEEPROM = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoEEPROM;
	} else {
		window.FacilinoEEPROM = FacilinoEEPROM;
	}
}));
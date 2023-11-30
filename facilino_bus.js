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
		Blockly.Arduino.inout_spi_begin = function() {
			var baudrate = Blockly.Arduino.valueToCode(this, 'BAUDRATE', Blockly.Arduino.ORDER_ATOMIC);
			Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>';
			var code = 'SPI.beginTransaction(SPISettings('+baudrate+','+this.getFieldValue('ORDER')+','+ this.getFieldValue('MODE')+'));\n'
			return code;
		};

		Blockly.Blocks.inout_spi_begin = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUS'),
			tags: ['input','output','spi'],
			helpUrl: Facilino.getHelpUrl('inout_spi_begin'),
			examples: ['inout_spi_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_BUS,
			keys: ['LANG_SPI_BEGIN_NAME','LANG_SPI_BEGIN','LANG_SPI_BAUDRATE','LANG_SPI_BEGIN_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SPI_BEGIN_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUS);
				this.appendValueInput('BAUDRATE').appendField(Facilino.locales.getKey('LANG_SPI_BEGIN')).appendField(Facilino.locales.getKey('LANG_SPI_BAUDRATE')).setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([['MSB','MSBFIRST'],['LSB','LSBFIRST']]),'ORDER').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([['MODE0','SPI_MODE0'],['MODE1','SPI_MODE1'],['MODE2','SPI_MODE2'],['MODE3','SPI_MODE3']]),'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_SPI_BEGIN_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="BAUDRATE"><shadow type="math_number"><field name="NUM">4000000</field></shadow></value>';
				return xml;
			}
		};

		Blockly.Arduino.inout_spi_transfer = function() {
			var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
			var mode = this.getFieldValue('MODE');
			Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>';
			var code ='';
			if (mode==='1')
				code += 'SPI.transfer('+data+');\n';
			else if (mode==='2')
				code += 'SPI.transfer16('+data+');\n';
			return code;
		};

		Blockly.Blocks.inout_spi_transfer = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUS'),
			tags: ['input','output','spi'],
			helpUrl: Facilino.getHelpUrl('inout_spi_transfer'),
			examples: ['inout_spi_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_BUS,
			keys: ['LANG_SPI_TRANSFER_NAME','LANG_SPI_TRANSFER','LANG_SPI_TRANSFER_ONE_BYTE','LANG_SPI_TRANSFER_TWO_BYTES','LANG_SPI_TRANSFER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SPI_TRANSFER_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUS);
				this.appendValueInput('DATA').appendField(Facilino.locales.getKey('LANG_SPI_TRANSFER')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				//this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_SPI_TRANSFER_ONE_BYTE'),'1'],[Facilino.locales.getKey('LANG_SPI_TRANSFER_TWO_BYTES'),'2'],[Facilino.locales.getKey('LANG_SPI_TRANSFER_BUFFER'),'3']]),'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_SPI_TRANSFER_ONE_BYTE'),'1'],[Facilino.locales.getKey('LANG_SPI_TRANSFER_TWO_BYTES'),'2']]),'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_SPI_TRANSFER_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="DATA"><shadow type="math_number"><field name="NUM">0</field></shadow></value><field name="MODE">1</field>','<value name="DATA"><shadow type="math_number"><field name="NUM">0</field></shadow></value><field name="MODE">2</field>'];
			}
		};

		Blockly.Arduino.inout_spi_transfer_recv = function() {
			var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
			var mode = this.getFieldValue('MODE');
			Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>';
			var code ='';
			if (mode==='1')
				code += 'SPI.transfer('+data+')';
			else if (mode==='2')
				code += 'SPI.transfer16('+data+')';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.inout_spi_transfer_recv = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUS'),
			tags: ['input','output','spi'],
			helpUrl: Facilino.getHelpUrl('inout_spi_transfer_recv'),
			examples: ['inout_spi_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_BUS,
			keys: ['LANG_SPI_TRANSFER','LANG_SPI_TRANSFER_ONE_BYTE','LANG_SPI_TRANSFER_TWO_BYTES','LANG_SPI_TRANSFER_RECV_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SPI_TRANSFER_RECV_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUS);
				this.appendValueInput('DATA').appendField(Facilino.locales.getKey('LANG_SPI_TRANSFER')).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				//this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_SPI_TRANSFER_ONE_BYTE'),'1'],[Facilino.locales.getKey('LANG_SPI_TRANSFER_TWO_BYTES'),'2'],[Facilino.locales.getKey('LANG_SPI_TRANSFER_BUFFER'),'3']]),'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_SPI_TRANSFER_ONE_BYTE'),'1'],[Facilino.locales.getKey('LANG_SPI_TRANSFER_TWO_BYTES'),'2']]),'MODE').setAlign(Blockly.ALIGN_RIGHT);
				this.setOutput(true,Number);
				this.setPreviousStatement(false,'code');
				this.setNextStatement(false,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_SPI_TRANSFER_RECV_TOOLTIP'));
			},
			default_inputs: function()
			{
				return ['<value name="DATA"><shadow type="math_number"><field name="NUM">0</field></shadow></value><field name="MODE">1</field>','<value name="DATA"><shadow type="math_number"><field name="NUM">0</field></shadow></value><field name="MODE">2</field>'];
			}
		};

		Blockly.Arduino.inout_spi_end = function() {
			Blockly.Arduino.definitions_['include_spi'] = '#include <SPI.h>';
			var code = 'SPI.endTransaction();\n';
			return code;
		};

		Blockly.Blocks.inout_spi_end = {
			category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUS'),
			tags: ['input','output','spi'],
			helpUrl: Facilino.getHelpUrl('inout_spi_end'),
			examples: ['inout_spi_example.bly'],
			category_colour: Facilino.LANG_COLOUR_ADVANCED,
			colour: Facilino.LANG_COLOUR_ADVANCED_BUS,
			keys: ['LANG_SPI_END_NAME','LANG_SPI_END','LANG_SPI_END_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SPI_END_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUS);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SPI_END'));
				this.setOutput(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_SPI_END_TOOLTIP'));
			}
		};
		
		if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
		{
			Blockly.Arduino['i2c_read_byte'] = function(block) {
			  var field_address = block.getFieldValue('ADDRESS');
			  Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			  Blockly.Arduino.definitions_['define_I2C_read_byte']='uint8_t I2C_read_byte(uint8_t address) {\n uint8_t data=0;\n Wire.requestFrom(address,1);\n if (Wire.available()){\n  data=Wire.read();\n }\n\n return data;\n \n }\n ';
			  if (Facilino.profiles['processor']==='ATmega')
			  {  Blockly.Arduino.setups_['setup_wire']='Wire.begin();\n ';  }
			  else if (Facilino.profiles['processor']==='ESP8266')
			  {
				   var sda_pin = Blockly.Arduino.valueToCode(this, 'SDA', Blockly.Arduino.ORDER_ATOMIC);
				   var scl_pin = Blockly.Arduino.valueToCode(this, 'SCL', Blockly.Arduino.ORDER_ATOMIC);
				  Blockly.Arduino.setups_['setup_wire']='Wire.begin('+sda_pin+','+scl_pin+');\n ';
			  }
			  var code='';
			  code+='I2C_read_byte('+field_address+')';
			  return [code, Blockly.Arduino.ORDER_ATOMIC];
			};



			Blockly.Blocks['i2c_read_byte'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUS'),
				category_colour: Facilino.LANG_COLOUR_ADVANCED,
				colour: Facilino.LANG_COLOUR_ADVANCED_BUS,
				helpUrl: Facilino.getHelpUrl('i2c_read_byte'),
				tags: [],
				examples: [],
				keys: ['LANG_I2C_READ_BYTE_NAME','LANG_I2C_READ_BYTE','LANG_I2C_ADDRESS','LANG_I2C_READ_BYTE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_I2C_READ_BYTE_NAME'),
				init: function() {
					{
					this.appendDummyInput().setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_I2C_READ_BYTE')).appendField(Facilino.locales.getKey('LANG_I2C_ADDRESS')).appendField(new Blockly.FieldTextInput("0",this.validator_), "ADDRESS");
					}
					if (Facilino.profiles['processor']==='ESP32')
					{
					this.appendValueInput('SDA').setAlign(Blockly.ALIGN_RIGHT).appendField('SDA').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",22*options.zoom, 22*options.zoom)).setCheck('DigitalPin');
					this.appendValueInput('SCL').setAlign(Blockly.ALIGN_RIGHT).appendField('SCL').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",22*options.zoom, 22*options.zoom)).setCheck('DigitalPin');
					}
					this.setOutput(true,Number);
					this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUS);
					this.setTooltip(Facilino.locales.getKey('LANG_I2C_READ_BYTE_TOOLTIP'));
				},
				validator_: function(value) {

					var n = window.parseInt(value || 0);
					var retVal=null;
					if (!window.isNaN(n))
					{
						if ((n>=0)&(n<=127))
							retVal=n;
					}
					return retVal;
				}
			};

			Blockly.Arduino['i2c_read_bytes'] = function(block) {
			  var field_address = block.getFieldValue('ADDRESS');
			  var variable = Blockly.Arduino.valueToCode(this, 'VARIABLE', Blockly.Arduino.ORDER_ATOMIC);
			  var code='';
			  Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
			  Blockly.Arduino.definitions_['define_I2C_read_bytes']='void I2C_read_bytes(uint8_t address, uint8_t* variable, uint8_t bytes) {\n uint8_t i=0;\n Wire.requestFrom(address,bytes);\n while(Wire.available()){\n  variable[i]=Wire.read();\n  i++;\n }\n\n }\n ';
			  if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560'))
			  {  Blockly.Arduino.setups_['setup_wire']='Wire.begin();\n ';  }
			  else if (Facilino.profiles['processor']==='ESP8266')
			  {
				   var sda_pin = Blockly.Arduino.valueToCode(this, 'SDA', Blockly.Arduino.ORDER_ATOMIC);
				   var scl_pin = Blockly.Arduino.valueToCode(this, 'SCL', Blockly.Arduino.ORDER_ATOMIC);
				  Blockly.Arduino.setups_['setup_wire']='Wire.begin('+sda_pin+','+scl_pin+');\n ';
			  }
			  if (this.getInputTargetBlock('VARIABLE')!==null)
			  {
				  if (Facilino.variables[variable][2]==='variable')
				  {
					  if ((Facilino.variables[variable][0]==='byte')||(Facilino.variables[variable][0]==='char'))
						code+='I2C_read_bytes('+field_address+',(byte*)&'+variable+',sizeof(byte));\n ';
					  else if (Facilino.variables[variable][0]==='short')
						code+='I2C_read_bytes('+field_address+',(byte*)&'+variable+',sizeof(short));\n ';
					  else if (Facilino.variables[variable][0]==='int')
						code+='I2C_read_bytes('+field_address+',(byte*)&'+variable+',sizeof(int));\n ';
					  else if (Facilino.variables[variable][0]==='long')
						code+='I2C_read_bytes('+field_address+',(byte*)&'+variable+',sizeof(long));\n ';
				  }
				  else if (Facilino.variables[variable][2]==='1DArray')
				  {
					  if ((Facilino.variables[variable][0]==='byte')||(Facilino.variables[variable][0]==='char'))
						code+='I2C_read_bytes('+field_address+',(byte*)&'+variable+','+Facilino.variables[variable][3]+');\n ';
					  else if (Facilino.variables[variable][0]==='short')
						code+='I2C_read_bytes('+field_address+',(byte*)&'+variable+',sizeof(short)*'+Facilino.variables[variable][3]+');\n ';
					  else if (Facilino.variables[variable][0]==='int')
						code+='I2C_read_bytes('+field_address+',(byte*)&'+variable+',sizeof(int)*'+Facilino.variables[variable][3]+');\n ';
					  else if (Facilino.variables[variable][0]==='long')
						code+='I2C_read_bytes('+field_address+',(byte*)&'+variable+',sizeof(long)*'+Facilino.variables[variable][3]+');\n ';
				  }
			  }
			  return code;
			};


			Blockly.Blocks['i2c_read_bytes'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUS'),
				category_colour: Facilino.LANG_COLOUR_ADVANCED,
				colour: Facilino.LANG_COLOUR_ADVANCED_BUS,
				helpUrl: Facilino.getHelpUrl('i2c_read_bytes'),
				tags: [],
				examples: [],
				keys: ['LANG_I2C_READ_BYTES_NAME','LANG_I2C_READ_BYTES','LANG_I2C_READ_BYTES_WITH','LANG_I2C_ADDRESS','LANG_I2C_READ_BYTES_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_I2C_READ_BYTES_NAME'),
				init: function() {
					this.appendValueInput('VARIABLE').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_I2C_READ_BYTES')).appendField(Facilino.locales.getKey('LANG_I2C_READ_BYTES_WITH')).setCheck(['Variable','Array']);
					this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_I2C_ADDRESS')).appendField(new Blockly.FieldTextInput("0",Blockly.Blocks.i2c_read_byte.validator), "ADDRESS").setAlign(Blockly.ALIGN_RIGHT);
					if (Facilino.profiles['processor']==='ESP8266')
					{
						this.appendValueInput('SDA').setAlign(Blockly.ALIGN_RIGHT).appendField('SDA').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",22*options.zoom, 22*options.zoom)).setCheck('DigitalPin');
						this.appendValueInput('SCL').setAlign(Blockly.ALIGN_RIGHT).appendField('SCL').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",22*options.zoom, 22*options.zoom)).setCheck('DigitalPin');
					}
					this.setOutput(false);
					if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560'))
									  {	this.setInputsInline(true); }
					else if (Facilino.profiles['processor']==='ESP8266')
									  {	this.setInputsInline(false); }
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUS);
					this.setTooltip(Facilino.locales.getKey('LANG_I2C_READ_BYTES_TOOLTIP'));
				}
			};

			Blockly.Arduino['i2c_send_bytes'] = function(block) {
			  var field_address = block.getFieldValue('ADDRESS');
			  var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
			  var code='';
			  if (this.getInputTargetBlock('DATA')!==null)
			  {
				  var data_block = this.getInputTargetBlock('DATA');
				  Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
				  Blockly.Arduino.definitions_['define_I2C_send_bytes']='void I2C_send_bytes(byte address, byte* val, int length)\n{\n  Wire.beginTransmission(address);\n  for (int i=0;i<length;i++)\n	Wire.write(val[i]);\n  Wire.endTransmission();\n}\n';
				  if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560'))
				  {  Blockly.Arduino.setups_['setup_wire']='Wire.begin();\n ';  }
				  else if (Facilino.profiles['processor']==='ESP8266')
				  {
					   var sda_pin = Blockly.Arduino.valueToCode(this, 'SDA', Blockly.Arduino.ORDER_ATOMIC);
					   var scl_pin = Blockly.Arduino.valueToCode(this, 'SCL', Blockly.Arduino.ORDER_ATOMIC);
					  Blockly.Arduino.setups_['setup_wire']='Wire.begin('+sda_pin+','+scl_pin+');\n ';
				  }

				  if (data_block.type==='variables_get')
				  {
					  if (Facilino.variables[data][2]==='variable')
					  {
						  if ((Facilino.variables[data][0]==='byte')||(Facilino.variables[data][0]==='char'))
							code+='I2C_send_bytes('+field_address+',(byte*)&'+data+',sizeof(byte));\n ';
						  else if (Facilino.variables[data][0]==='short')
							code+='I2C_send_bytes('+field_address+',(byte*)&'+data+',sizeof(short));\n ';
						  else if (Facilino.variables[data][0]==='int')
							code+='I2C_send_bytes('+field_address+',(byte*)&'+data+',sizeof(int));\n ';
						  else if (Facilino.variables[data][0]==='long')
							code+='I2C_send_bytes('+field_address+',(byte*)&'+data+',sizeof(long));\n ';
					  }
					  else if (Facilino.variables[data][2]==='1DArray')
					  {
						  if ((Facilino.variables[data][0]==='byte')||(Facilino.variables[data][0]==='char'))
							code+='I2C_send_bytes('+field_address+',(byte*)&'+data+','+Facilino.variables[data][3]+');\n ';
						  else if (Facilino.variables[data][0]==='short')
							code+='I2C_send_bytes('+field_address+',(byte*)&'+data+',sizeof(short)*'+Facilino.variables[data][3]+');\n ';
						  else if (Facilino.variables[data][0]==='int')
							code+='I2C_send_bytes('+field_address+',(byte*)&'+data+',sizeof(int)*'+Facilino.variables[data][3]+');\n ';
						  else if (Facilino.variables[data][0]==='long')
							code+='I2C_send_bytes('+field_address+',(byte*)&'+data+',sizeof(long)*'+Facilino.variables[data][3]+');\n ';
					  }
				  }
				  else if (data_block.type==='math_number')
				  {
					  var n = window.parseInt(data);
					  if (!window.isNaN(n))
					  {
						  if ((n>=0)&&(n<=127))
						  {
							code+='{\n'
							code+='byte _i2c_data='+data+';\n';
							code+='I2C_send_bytes('+field_address+',&_i2c_data,sizeof(byte));\n ';
							code+='}\n'
						  }
						  else if ((n>=128)&&(n<=65535))
						  {
							code+='{\n'
							code+='short _i2c_data='+data+';\n';
							code+='I2C_send_bytes('+field_address+',(byte*)&_i2c_data,sizeof(short));\n ';
							code+='}\n'
						  }
						  else if ((n>=65536)&&(n<=4294967295))
						  {
							code+='{\n'
							code+='long _i2c_data='+data+';\n';
							code+='I2C_send_bytes('+field_address+',(byte*)&_i2c_data,sizeof(long));\n ';
							code+='}\n'
						  }
					  }
				  }
			  }
			  return code;
			};

			Blockly.Blocks['i2c_send_bytes'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUS'),
				category_colour: Facilino.LANG_COLOUR_ADVANCED,
				colour: Facilino.LANG_COLOUR_ADVANCED_BUS,
				helpUrl: Facilino.getHelpUrl('i2c_send_bytes'),
				tags: [],
				examples: [],
				keys: ['LANG_I2C_SEND_NAME','LANG_I2C_SEND','LANG_I2C_ADDRESS','LANG_I2C_BYTES','LANG_I2C_SEND_BYTES_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_I2C_SEND_NAME'),
				init: function() {
					this.appendValueInput('DATA')
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField(Facilino.locales.getKey('LANG_I2C_SEND'))
						.appendField(Facilino.locales.getKey('LANG_I2C_ADDRESS'))
						.appendField(new Blockly.FieldTextInput("0",Blockly.Blocks.i2c_read_byte.validator), "ADDRESS")
						.appendField(Facilino.locales.getKey('LANG_I2C_BYTES'))
						.setCheck([Number,'Variable','Array']);
				  if (Facilino.profiles['processor']==='ESP8266')
				  {
				  this.appendValueInput('SDA').setAlign(Blockly.ALIGN_RIGHT).appendField('SDA').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",22*options.zoom, 22*options.zoom)).setCheck('DigitalPin');
				  this.appendValueInput('SCL').setAlign(Blockly.ALIGN_RIGHT).appendField('SCL').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/digital_signal.svg",22*options.zoom, 22*options.zoom)).setCheck('DigitalPin');
				  }
					this.setOutput(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUS);
					this.setTooltip(Facilino.locales.getKey('LANG_I2C_SEND_BYTES_TOOLTIP'));
				}
			};
			
		}
		
		if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega2560'))
		{
			Blockly.Arduino['i2c_on_request'] = function(block) {
				var field_address = block.getFieldValue('ADDRESS');
				var data = Blockly.Arduino.valueToCode(this, 'DATA', Blockly.Arduino.ORDER_ATOMIC);
				var statement = Blockly.Arduino.statementToCode(this,'STACK');
				var code='';
				Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
				Blockly.Arduino.setups_['setup_wire']='Wire.begin('+field_address+');\n ';
				Blockly.Arduino.setups_['setup_wire_on_request']='Wire.onRequest(I2C_requestEvent);\n ';
				code+='void I2C_requestEvent(){\n';
				code+=statement;
				if (this.getInputTargetBlock('DATA')!==null)
				{
				  var data_block = this.getInputTargetBlock('DATA');
				  if (data_block.type==='variables_get')
				  {
					  if (Facilino.variables[data][2]==='variable')
					  {
						  if ((Facilino.variables[data][0]==='byte')||(Facilino.variables[data][0]==='char'))
							code+='Wire.write((byte*)&'+data+',1);\n ';
						  else if (Facilino.variables[data][0]==='short')
							code+='Wire.write((byte*)&'+data+',sizeof(short));\n ';
						  else if (Facilino.variables[data][0]==='int')
							code+='Wire.write((byte*)&'+data+',sizeof(int));\n ';
						  else if (Facilino.variables[data][0]==='long')
							code+='Wire.write((byte*)&'+data+',sizeof(long));\n ';
					  }
					  else if (Facilino.variables[data][2]==='1DArray')
					  {
						  if ((Facilino.variables[data][0]==='byte')||(Facilino.variables[data][0]==='char'))
							code+='Wire.write((byte*)&'+data+','+Facilino.variables[data][3]+');\n ';
						  else if (Facilino.variables[data][0]==='short')
							code+='Wire.write((byte*)&'+data+',sizeof(short)*'+Facilino.variables[data][3]+');\n ';
						  else if (Facilino.variables[data][0]==='int')
							code+='Wire.write((byte*)&'+data+',sizeof(short)*'+Facilino.variables[data][3]+');\n ';
						  else if (Facilino.variables[data][0]==='long')
							code+='Wire.write((byte*)&'+data+',sizeof(long)*'+Facilino.variables[data][3]+');\n ';
					  }
				  }
				  else if (data_block.type==='math_number')
				  {
					  var n = window.parseInt(data);
					  if (!window.isNaN(n))
					  {
						  if ((n>=0)&&(n<=127))
						  {
							code+='  Wire.write('+data+');\n ';
						  }
						  else if ((n>=128)&&(n<=65535))
						  {
							code+='  {\n';
							code+='	short _i2c_data='+data+';\n';
							code+='	Wire.write((byte*)&_i2c_data,sizeof(short));\n ';
							code+='  }\n';
						  }
						  else if ((n>=65536)&&(n<=4294967295))
						  {
							code+='  {\n';
							code+='long _i2c_data='+data+';\n';
							code+='	Wire.write((byte*)&_i2c_data,sizeof(long));\n ';
							code+='  }\n';
						  }
						  /*else if ((n>=4294967296)&&(n<=18446744073709551615))
						  {
							code+='  {\n';
							code+='long _i2c_data='+data+';\n';
							code+='	Wire.write((byte*)&_i2c_data,8);\n ';
							code+='  }\n';
						  }*/
					  }
				  }
			  }
			  code+='}\n';
			  Blockly.Arduino.definitions_['I2C_requestEvent'] = code;
			  return '';
			};

			Blockly.Blocks['i2c_on_request'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUS'),
				category_colour: Facilino.LANG_COLOUR_ADVANCED,
				colour: Facilino.LANG_COLOUR_ADVANCED_BUS,
				helpUrl: Facilino.getHelpUrl('i2c_on_request'),
				tags: [],
				examples: [],
				keys: ['LANG_I2C_ON_REQUEST_NAME','LANG_I2C_ON_REQUEST','LANG_I2C_ADDRESS','LANG_I2C_DO','LANG_I2C_SEND_BYTES','LANG_I2C_ON_REQUEST_BYTES_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_I2C_ON_REQUEST_NAME'),
				init: function() {
					this.appendDummyInput()
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField(Facilino.locales.getKey('LANG_I2C_ON_REQUEST'))
						.appendField(Facilino.locales.getKey('LANG_I2C_ADDRESS'))
						.appendField(new Blockly.FieldTextInput("0",this.validator), "ADDRESS");
					this.appendStatementInput('STACK').appendField(Facilino.locales.getKey('LANG_I2C_DO')).setCheck('code');
					this.appendValueInput('DATA').appendField(Facilino.locales.getKey('LANG_I2C_SEND_BYTES')).setCheck([Number,'Variable','Array']).setAlign(Blockly.ALIGN_RIGHT);
					this.setOutput(false);
					this.setPreviousStatement(false);
					this.setNextStatement(false);
					this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUS);
					this.setTooltip(Facilino.locales.getKey('LANG_I2C_ON_REQUEST_BYTES_TOOLTIP'));
				},
				validator_: function(value) {

					var n = window.parseInt(value || 0);
					var retVal=null;
					if (!window.isNaN(n))
					{
						if ((n>=0)&(n<=127))
							retVal=n;
					}
					return retVal;
				}
			};

			Blockly.Arduino['i2c_on_receive'] = function(block) {
				var field_address = block.getFieldValue('ADDRESS');
				var statement = Blockly.Arduino.statementToCode(this,'STACK');
				var code='';
				Blockly.Arduino.definitions_['define_wire_h']=JST['wire_definitions_include']({});
				Blockly.Arduino.setups_['setup_wire']='Wire.begin('+field_address+');\n ';
				Blockly.Arduino.setups_['setup_wire_on_receive']='Wire.onReceive(I2C_receiveEvent);\n ';
				Blockly.Arduino.definitions_['declare_var_define_I2C_data'] = 'uint8_t I2C_data[32];\n';
				code+='void I2C_receiveEvent(int numBytes){\n';
				code+='  for (int i=0;i<numBytes;i++){\n';
				code+='	I2C_data[i]=Wire.read();\n';
				code+='  }\n';
				code+=statement;
				code+='}\n';
				Blockly.Arduino.definitions_['I2C_requestEvent'] = code;
			  return '';
			};

			Blockly.Blocks['i2c_on_receive'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_ADVANCED'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUS'),
				category_colour: Facilino.LANG_COLOUR_ADVANCED,
				colour: Facilino.LANG_COLOUR_ADVANCED_BUS,
				helpUrl: Facilino.getHelpUrl('i2c_on_receive'),
				tags: [],
				examples: [],
				keys: ['LANG_I2C_ON_RECEIVE_NAME','LANG_I2C_ON_RECEIVE','LANG_I2C_ADDRESS','LANG_I2C_DO','LANG_I2C_ON_RECEIVE_BYTES_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_I2C_ON_RECEIVE_NAME'),
				init: function() {
					this.appendDummyInput()
						.setAlign(Blockly.ALIGN_RIGHT)
						.appendField(Facilino.locales.getKey('LANG_I2C_ON_RECEIVE'))
						.appendField(Facilino.locales.getKey('LANG_I2C_ADDRESS'))
						.appendField(new Blockly.FieldTextInput("0",this.validator), "ADDRESS");
					this.appendStatementInput('STACK').appendField(Facilino.locales.getKey('LANG_I2C_DO')).setCheck('code');
					this.setOutput(false);
					this.setPreviousStatement(false);
					this.setNextStatement(false);
					this.setColour(Facilino.LANG_COLOUR_ADVANCED_BUS);
					this.setTooltip(Facilino.locales.getKey('LANG_I2C_ON_RECEIVE_BYTES_TOOLTIP'));
				},
				getVars: function() {
					return ['I2C_data','numBytes'];
				},
				validator_: function(value) {

					var n = window.parseInt(value || 0);
					var retVal=null;
					if (!window.isNaN(n))
					{
						if ((n>=0)&(n<=127))
							retVal=n;
					}
					return retVal;
				}
			};
		}
		}
	
	};
		
		
	var FacilinoBus = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoBus;
	} else {
		window.FacilinoBus = FacilinoBus;
	}
}));
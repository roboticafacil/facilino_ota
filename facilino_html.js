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
	Blockly.Arduino.html_doc = function() {
			var code = 'String("<!DOCTYPE html>\\r\\n';
			code += '<html>\\r\\n';
			var doc = Blockly.Arduino.statementToCode(this,'DOC') || '+';
			code += doc;
			code += '</html>\\r\\n")';
			return [code,Blockly.Arduino.ORDER_NONE];
		}

		Blockly.Blocks.html_doc = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_HTML'),
			tags: ['html'],
			helpUrl: Facilino.getHelpUrl('html_doc'),
			examples: ['communications_wifi_html_server_example2.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_HTML,
			keys: ['LANG_HTML_DOC_NAME','LANG_WIFI_ESP8266_HTML_DOC','LANG_WIFI_ESP8266_HTML_DOC_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_HTML_DOC_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_HTML);
				this.appendDummyInput().appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/html.svg', 20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_DOC'));
				this.appendStatementInput('DOC').setAlign(Blockly.ALIGN_RIGHT).setCheck('html_tag');
				this.setInputsInline(false);
				this.setPreviousStatement(false, null);
				this.setNextStatement(false, null);
				this.setOutput(true,[String,'Html']);
				this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_DOC_TOOLTIP'));
			}
		};

		Blockly.Arduino.html_tag = function() {
			var n = 0;
			var attributes="";
			for (n = 0; n < this.itemCount_; n++)
			{
				attributes += Blockly.Arduino.valueToCode(this, 'ATTRIBUTE' + n, Blockly.Arduino.ORDER_NONE);
				//attributes=attributes.replace('"', "'").replace('"', "'");
			}

			var tag = this.getFieldValue('TAG');
			var code = '<'+tag+' ' +attributes+'>\\r\\n'+Blockly.Arduino.statementToCode(this,'DOC') + '\\r\\n</'+tag+'>\\r\\n';
			return code;
		}

		Blockly.Blocks.html_tag = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_HTML'),
			tags: ['html'],
			helpUrl: Facilino.getHelpUrl('html_tag'),
			examples: ['communications_wifi_html_server_example2.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_HTML,
			keys: ['LANG_HTML_TAG_NAME','LANG_WIFI_ESP8266_HTML_TAG','LANG_WIFI_ESP8266_HTML_ATTRIBUTES','LANG_WIFI_ESP8266_HTML_TAG_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_HTML_TAG_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_HTML);
				this.appendDummyInput().appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/html.svg', 20*options.zoom, 20*options.zoom)).appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_TAG')).appendField(new Blockly.FieldDropdown([
		['head', 'head'],
		['body', 'body'],
		['h1', 'h1'],
		['h2', 'h2'],
		['h3', 'h3'],
		['h4', 'h4'],
		['h5', 'h5'],
		['h6', 'h6'],
		['hr', 'hr'],
		['p', 'p'],
		['br', 'br'],
		['a', 'a'],
		['img', 'img'],
		['ul','ul'],
		['ol','ol'],
		['li','li'],
		['table','table'],
		['tr','tr'],
		['th','th'],
		['td','td'],
		['div','div'],
		['span','span'],
		['style','style'],
		['title', 'title'],
		['caption','caption'],
		['meta','meta'],
		['link','link'],
		['base','base'],
		['script','script'],
		['iframe','iframe']
		]),'TAG').setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('DOC').setAlign(Blockly.ALIGN_RIGHT).setCheck('html_tag');
				this.appendDummyInput('ATTRIBUTES').appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_ATTRIBUTES')).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'html_tag');
				this.setNextStatement(true,'html_tag');
				this.setOutput(false);
				this.setMutator(new Blockly.Mutator(['html_attribute_item']));
				this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_TAG_TOOLTIP'));
				this.itemCount_=0;
				this.last_tag=-1;
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
				for (var x = 0; x < this.itemCount_; x++) {
					this.appendValueInput('ATTRIBUTE' + x).setCheck('ATTRIBUTE').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/attribute.png', 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('html_attribute');
					this.setInputsInline(false);
				}
			},
			decompose: function(workspace) {
				var containerBlock = workspace.newBlock('html_tag_attributes');
				containerBlock.initSvg();
				var connection = containerBlock.getInput('STACK').connection;
				console.log(this.itemCount_);
				for (var x = 0; x < this.itemCount_; x++) {
					var itemBlock = workspace.newBlock('html_attribute_item');
					itemBlock.initSvg();
					connection.connect(itemBlock.previousConnection);
					connection = itemBlock.nextConnection;
				}
				return containerBlock;
			},
			compose: function(containerBlock) {
				// Disconnect all the items input blocks and remove the inputs.
				for (var x = this.itemCount_; x >= 0; x--) {
					this.removeInput('ATTRIBUTE' + x);
				}
				this.itemCount_ = 0;
				// Rebuild the block's optional inputs.
				var clauseBlock = containerBlock.getInputTargetBlock('STACK');
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'html_attribute_item':
							this.setInputsInline(false);
							var attrInput = this.appendValueInput('ATTRIBUTE' + this.itemCount_).setCheck('ATTRIBUTE').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/attribute.png', 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('html_attribute');
							// Reconnect any child blocks.
							if (clauseBlock.valueConnection_) {
								attrInput.connection.connect(clauseBlock.valueConnection_);
							}
							this.itemCount_++;
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
				var x = 0;
				while (clauseBlock) {
					switch (clauseBlock.type) {
						case 'html_attribute_item':
							var inputData = this.getInput('ATTRIBUTE' + x);
							clauseBlock.valueConnection_ =
								inputData && inputData.connection.targetConnection;
							x++;
							break;
						default:
							throw 'Unknown block type.';
					}
					clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
				}
			}/*,
			onchange: function() {
				if (!this.workspace) {
					 // Block has been deleted.
					 return;
				 }
				 if (this.last_tag!=this.getFieldValue('TAG'))
				 {
					 this.last_tag=this.getFieldValue('TAG');
					 for (var x = this.itemCount_; x > 0; x--) {
					   this.removeInput('ATTRIBUTE' + x);
					 }
					 this.removeInput('ATTRIBUTES');
					 this.appendDummyInput('ATTRIBUTES').appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_ATTRIBUTES')+' '+this.getFieldValue('TAG')).setAlign(Blockly.ALIGN_RIGHT);
					 this.itemCount_ = 0;
				 }
			}*/
		};

		Blockly.Blocks.html_tag_attributes = {
			colour: Facilino.LANG_COLOUR_HTML,
			keys: ['LANG_WIFI_ESP8266_HTML_TAG','LANG_WIFI_ESP8266_HTML_TAG_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_HTML);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_TAG')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendStatementInput('STACK').setCheck('html_attribute');
				this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_TAG_TOOLTIP'));
				this.contextMenu = false;
			}
		};

	Blockly.Blocks.html_attribute_item = {
			colour: Facilino.LANG_COLOUR_HTML,
			keys: ['LANG_WIFI_ESP8266_HTML_ATTRIBUTE','LANG_WIFI_ESP8266_HTML_ATTRIBUTE_TOOLTIP'],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_HTML);
				this.appendDummyInput().appendField(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_ATTRIBUTE'));
				this.setPreviousStatement(true,'html_attribute');
				this.setNextStatement(true,'html_attribute');
				this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_ATTRIBUTE_TOOLTIP'));
		this.contextMenu = false;
			}
		};

		Blockly.Arduino.html_attribute = function() {
			var attr = this.getFieldValue('ATTRIBUTE');
			var attr_text = Blockly.Arduino.valueToCode(this,'ATTRIBUTE_TEXT',Blockly.Arduino.ORDER_ATOMIC);
			var code ='';
			try{
			if (this.getInputTargetBlock('ATTRIBUTE_TEXT').type==='text'||this.getInputTargetBlock('ATTRIBUTE_TEXT').type==='math_number')
			{
			  attr_text=attr_text.replace('"','');
			  attr_text=attr_text.replace('"','');
			  code=attr+'=\\"'+attr_text+'\\" ';
			}
			else if (this.getInputTargetBlock('ATTRIBUTE_TEXT').type==='variables_get')
			{
			  code = attr+'=\\"")+'+attr_text+'+String("\\" ';
			}
			}
			catch(e) {}
			return [code,Blockly.Arduino.ORDER_NONE];
		}

		Blockly.Blocks.html_attribute = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_HTML'),
			tags: ['html'],
			helpUrl: Facilino.getHelpUrl('html_attribute'),
			examples: ['communications_wifi_html_server_example2.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_HTML,
			keys: ['LANG_HTML_TAG_ATTR_NAME','LANG_WIFI_ESP8266_HTML_ATTRIBUTE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_HTML_TAG_ATTR_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_HTML);
				this.appendValueInput('ATTRIBUTE_TEXT').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/attribute.png', 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
		['id','id'],
		['href', 'href'],
		['style','style'],
		['disabled','disabled'],
		['src', 'src'],
		['width', 'width'],
		['height', 'height'],
		['alt', 'alt'],
		['title', 'title'],
		['colspan','colspan'],
		['rowspan','rowspan']
		]),'ATTRIBUTE').setCheck(String);
					this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,'html_attribute');
				this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_ATTRIBUTE_TOOLTIP'));
		this.contextMenu = true;
			},
			default_inputs: function()
			{
				return ['<value name="ATTRIBUTE_TEXT"><shadow type="text"></shadow></value><field name="ATTRIBUTE">id</field>','<value name="ATTRIBUTE_TEXT"><shadow type="text"><field name="TEXT">www.roboticafacil.es</field></shadow></value><field name="ATTRIBUTE">href</field>','<value name="ATTRIBUTE_TEXT"><shadow type="text"><field name="TEXT">true</field></shadow></value><field name="ATTRIBUTE">disabled</field>','<value name="ATTRIBUTE_TEXT"><shadow type="text"><field name="TEXT">image.png</field></shadow></value><field name="ATTRIBUTE">src</field>','<value name="ATTRIBUTE_TEXT"><shadow type="text"><field name="TEXT">150</field></shadow></value><field name="ATTRIBUTE">width</field>','<value name="ATTRIBUTE_TEXT"><shadow type="text"><field name="TEXT">150</field></shadow></value><field name="ATTRIBUTE">height</field>','<value name="ATTRIBUTE_TEXT"><shadow type="text"><field name="TEXT"></field></shadow></value><field name="ATTRIBUTE">alt</field>','<value name="ATTRIBUTE_TEXT"><shadow type="text"><field name="TEXT">1</field></shadow></value><field name="ATTRIBUTE">colspan</field>','<value name="ATTRIBUTE_TEXT"><shadow type="text"><field name="TEXT">1</field></shadow></value><field name="ATTRIBUTE">rowspan</field>'];
			}

		};

		Blockly.Arduino.html_text = function() {
			var code ='';

			var textInput = Blockly.Arduino.valueToCode(this,'TEXT',Blockly.Arduino.ORDER_ATOMIC);
			try{
			if (this.getInputTargetBlock('TEXT').type==='text'||this.getInputTargetBlock('TEXT').type==='math_number')
			{
			  textInput=textInput.replace('"','');
			  textInput=textInput.replace('"','');
			  code = textInput;
			}
			else if (this.getInputTargetBlock('TEXT').type==='variables_get')
			{
			  code = '")+'+textInput+'+String("';
			}
			}
			catch(e) {}
			return code;
		}

		Blockly.Blocks.html_text = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_HTML'),
			tags: ['html'],
			helpUrl: Facilino.getHelpUrl('html_text'),
			examples: ['communications_wifi_html_server_example2.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_HTML,
			keys: ['LANG_WIFI_ESP8266_HTML_TEXT_NAME','LANG_WIFI_ESP8266_HTML_TEXT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_TEXT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_HTML);
				this.appendValueInput('TEXT').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/text-font.png', 20*options.zoom, 20*options.zoom)).setCheck([String,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'html_tag');
				this.setNextStatement(true,'html_tag');
				this.setOutput(false);
				this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_TEXT_TOOLTIP'));
			this.contextMenu = true;
			},
			default_inputs: function()
			{
				return '<value name="TEXT"><shadow type="text"></shadow></value>';
			}
		};

		Blockly.Arduino.html_text_format = function() {
			var format = this.getFieldValue('TEXT_FORMAT') || '';
			var textInput = Blockly.Arduino.valueToCode(this,'TEXT',Blockly.Arduino.ORDER_ATOMIC);
			try{
			if (this.getInputTargetBlock('TEXT').type==='text'||this.getInputTargetBlock('TEXT').type==='math_number')
			{
			  textInput=textInput.replace('"','');
			  textInput=textInput.replace('"','');
			  code ='<'+format+'>'+textInput+'</'+format+'>';
			}
			else if (this.getInputTargetBlock('TEXT').type==='variables_get')
			{
			  code = '")+'+textInput+'+String("';
			}
			}
			catch(e) {}
			return code;
		}

		Blockly.Blocks.html_text_format = {
			category: Facilino.locales.getKey('LANG_CATEGORY_COMMUNICATION'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WIFI'),
			subsubcategory: Facilino.locales.getKey('LANG_SUBCATERGORY_HTML'),
			tags: ['html'],
			helpUrl: Facilino.getHelpUrl('html_text_format'),
			examples: ['communications_wifi_html_server_example2.bly'],
			category_colour: Facilino.LANG_COLOUR_COMMUNICATION,
			colour: Facilino.LANG_COLOUR_HTML,
			keys: ['LANG_WIFI_ESP8266_HTML_TEXT_FORMAT_NAME','LANG_WIFI_ESP8266_HTML_TEXT_FORMAT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_TEXT_FORMAT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_HTML);
				this.appendValueInput('TEXT').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/text-font.png', 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).appendField(new Blockly.FieldDropdown([
		['b', 'b'],
		['strong','strong'],
		['i','i'],
		['em','em'],
		['mark', 'mark'],
		['small', 'small'],
		['del', 'del'],
		['ins', 'ins'],
		['sub', 'sub'],
		['sup', 'sup']
		]),'TEXT_FORMAT').setCheck([String,'Variable']);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'html_tag');
				this.setNextStatement(true,'html_tag');
				this.setOutput(false);
				this.setTooltip(Facilino.locales.getKey('LANG_WIFI_ESP8266_HTML_TEXT_FORMAT_TOOLTIP'));
			this.contextMenu = true;
			},
			default_inputs: function()
			{
				return ['<value name="TEXT"><shadow type="text"><field name="TEXT">bold</field></shadow></value><field name="TEXT_FORMAT">b</field>','<value name="TEXT"><shadow type="text"><field name="TEXT">strong</field></shadow></value><field name="TEXT_FORMAT">strong</field>','<value name="TEXT"><shadow type="text"><field name="TEXT">italic</field></shadow></value><field name="TEXT_FORMAT">i</field>','<value name="TEXT"><shadow type="text"><field name="TEXT">emphasized</field></shadow></value><field name="TEXT_FORMAT">em</field>','<value name="TEXT"><shadow type="text"><field name="TEXT">mark</field></shadow></value><field name="TEXT_FORMAT">mark</field>','<value name="TEXT"><shadow type="text"><field name="TEXT">small</field></shadow></value><field name="TEXT_FORMAT">deleted</field>','<value name="TEXT"><shadow type="text"><field name="TEXT">bold</field></shadow></value><field name="TEXT_FORMAT">del</field>','<value name="TEXT"><shadow type="text"><field name="TEXT">inserted</field></shadow></value><field name="TEXT_FORMAT">ins</field>','<value name="TEXT"><shadow type="text"><field name="TEXT">subscript</field></shadow></value><field name="TEXT_FORMAT">sub</field>','<value name="TEXT"><shadow type="text"><field name="TEXT">superscript</field></shadow></value><field name="TEXT_FORMAT">sup</field>'];
			}
		};
		}
	}
	
	var FacilinoHTML = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoHTML;
	} else {
		window.FacilinoHTML = FacilinoHTML;
	}
}));
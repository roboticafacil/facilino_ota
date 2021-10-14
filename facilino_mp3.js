(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		
				Blockly.Arduino.piezo_mp3_def = function() {
			if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ESP8266') || (Facilino.profiles['processor']==='ESP32'))
			{
				var rx, tx;
				rx = Blockly.Arduino.valueToCode(this, 'RX', Blockly.Arduino.ORDER_NONE);
				tx = Blockly.Arduino.valueToCode(this, 'TX', Blockly.Arduino.ORDER_NONE);
				Blockly.Arduino.definitions_['declare_var_MP3Serial'] = 'SoftwareSerial _mp3_device(' + rx + ',' + tx + ');\n';
				Blockly.Arduino.definitions_['define_softwareserial'] = JST['softwareserial_def_definitions']({});
				Blockly.Arduino.setups_['setup_mp3serial'] = JST['communications_softwareserial_def_setups']({'device': '_mp3_device', 'baud_rate': 9600,'rx': rx,'tx': tx});
			}
			else if (Facilino.profiles['processor']==='ATmega2560')
			{
				Blockly.Arduino.definitions_['declare_var_MP3Serial'] = '#define _mp3_device Serial'+port+'\n';
				Blockly.Arduino.setups_['setup_serial_'+port] = '_mp3_device.begin(9600);\n';
			}
			var code='';
			return code;
		};


		Blockly.Blocks.piezo_mp3_def = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound','mp3'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_def'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_NAME','LANG_PIEZO_MP3_PLAYER_DEF','LANG_PIEZO_MP3_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_DEF')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom));
				if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ESP8266') || (Facilino.profiles['processor']==='ESP32'))
				{
					this.appendValueInput('RX').appendField('RX').appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('TX').appendField('TX').appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				}
				else if (Facilino.profiles['processor']==='ATmega2560')
				{
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_BLUETOOTH_DEF_PORT')).appendField(new Blockly.FieldDropdown(Facilino.profiles.default.serial_ports),'PORT').setAlign(Blockly.ALIGN_RIGHT);
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_TOOLTIP'));
			},
			isNotDuplicable: true
		};
		
		Blockly.Arduino.piezo_mp3_play = function() {
			var song_number = Blockly.Arduino.valueToCode(this, 'SONG_NUMBER', Blockly.Arduino.ORDER_NONE);
			var code='_mp3_device.play('+song_number+');\n';
			return code;
		};


		Blockly.Blocks.piezo_mp3_play = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound','mp3'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_play'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_PLAYER_PLAY_NAME','LANG_PIEZO_MP3_PLAYER_PLAY','LANG_PIEZO_MP3_PLAYER_PLAY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_PLAY_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
				this.appendValueInput('SONG_NUMBER').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_PLAY')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/play.svg',32*options.zoom,32*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_PLAY_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{
		Blockly.Arduino.piezo_mp3_play_folder = function() {
			var folder_number = Blockly.Arduino.valueToCode(this, 'FOLDER_NUMBER', Blockly.Arduino.ORDER_NONE);
			var song_number = Blockly.Arduino.valueToCode(this, 'SONG_NUMBER', Blockly.Arduino.ORDER_NONE);
			var code='_mp3_device.playLargeFolder('+folder_number+','+song_number+');\n';
			return code;
		};


		Blockly.Blocks.piezo_mp3_play_folder = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound','mp3'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_play_folder'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_PLAYER_PLAY_FOLDER','LANG_PIEZO_MP3_PLAYER_PLAY_FOLDER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_PLAY_FOLDER_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
				this.appendValueInput('FOLDER_NUMBER').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_PLAY_FOLDER')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/folder.svg',32*options.zoom,32*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('SONG_NUMBER').appendField(new Blockly.FieldImage('img/blocks/play.svg',32*options.zoom,32*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_PLAY_FOLDER_TOOLTIP'));
			}
		};
		
		Blockly.Arduino.piezo_mp3_isplaying_melody = function() {
		var code ='_mp3.device.available()';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.piezo_mp3_isplaying_melody = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_isplaying_melody'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_PLAYER_ISPLAYING_NAME','LANG_PIEZO_MP3_PLAYER_ISPLAYING','LANG_PIEZO_MP3_PLAYER_ISPLAYING_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_ISPLAYING_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
		this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_ISPLAYING')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/play-button.svg',32*options.zoom, 32*options.zoom));
		this.setInputsInline(false);
		this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_ISPLAYING_TOOLTIP'));
			}
		};
		}
		
		Blockly.Arduino.piezo_mp3_volume = function() {
			var volume = Blockly.Arduino.valueToCode(this, 'VOLUME', Blockly.Arduino.ORDER_NONE);
			var code='_mp3_device.volume('+volume+');\n';
			return code;
		};


		Blockly.Blocks.piezo_mp3_volume = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound','mp3'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_volume'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_PLAYER_VOLUME_NAME','LANG_PIEZO_MP3_PLAYER_VOLUME','LANG_PIEZO_MP3_PLAYER_VOLUME_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_VOLUME_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
				this.appendValueInput('VOLUME').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_VOLUME')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/volume.svg',32*options.zoom,32*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_VOLUME_TOOLTIP'));
			}
		};
		
		Blockly.Arduino.piezo_mp3_next = function() {
			var code='_mp3_device.next();\n';
			return code;
		};


		Blockly.Blocks.piezo_mp3_next = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound','mp3'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_next'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_PLAYER_NEXT_NAME','LANG_PIEZO_MP3_PLAYER_NEXT','LANG_PIEZO_MP3_PLAYER_NEXT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_NEXT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_NEXT')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/next.svg',32*options.zoom,32*options.zoom));
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_NEXT_TOOLTIP'));
			}
		};
		
		Blockly.Arduino.piezo_mp3_previous = function() {
			var code='_mp3_device.previous();\n';
			return code;
		};


		Blockly.Blocks.piezo_mp3_previous = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound','mp3'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_previous'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_PLAYER_PREVIOUS_NAME','LANG_PIEZO_MP3_PLAYER_PREVIOUS','LANG_PIEZO_MP3_PLAYER_PREVIOUS_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_PREVIOUS_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_NEXT')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/back.svg',32*options.zoom,32*options.zoom));
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_PREVIOUS_TOOLTIP'));
			}
		};
		
		Blockly.Arduino.piezo_mp3_pause = function() {
			var code='_mp3_device.pause();\n';
			return code;
		};


		Blockly.Blocks.piezo_mp3_pause = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound','mp3'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_pause'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_PLAYER_PAUSE_NAME','LANG_PIEZO_MP3_PLAYER_PAUSE','LANG_PIEZO_MP3_PLAYER_PAUSE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_PAUSE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_PAUSE')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/pause.svg',32*options.zoom,32*options.zoom));
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_PAUSE_TOOLTIP'));
			}
		};
		
		Blockly.Arduino.piezo_mp3_stop = function() {
			var code='_mp3_device.stop();\n';
			return code;
		};


		Blockly.Blocks.piezo_mp3_stop = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound','mp3'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_pause'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_PLAYER_STOP_NAME','LANG_PIEZO_MP3_PLAYER_STOP','LANG_PIEZO_MP3_PLAYER_STOP_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_STOP_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_STOP')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/stop.svg',32*options.zoom,32*options.zoom));
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_STOP_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{
		
		Blockly.Arduino.piezo_mp3_loop_folder = function() {
			var folder_number = Blockly.Arduino.valueToCode(this, 'FOLDER_NUMBER', Blockly.Arduino.ORDER_NONE);
			var code='_mp3_device.loopFolder('+folder_number+');\n';
			return code;
		};


		Blockly.Blocks.piezo_mp3_loop_folder = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound','mp3'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_loop_folder'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_PLAYER_LOOP_FOLDER_NAME','LANG_PIEZO_MP3_PLAYER_LOOP_FOLDER','LANG_PIEZO_MP3_PLAYER_LOOP_FOLDER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_LOOP_FOLDER_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
				this.appendValueInput('FOLDER_NUMBER').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_LOOP_FOLDER')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/folder_loop.svg',32*options.zoom,32*options.zoom));
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_LOOP_FOLDER_TOOLTIP'));
			}
		};
		
		Blockly.Arduino.piezo_mp3_random = function() {
			var code='_mp3_device.randomAll();\n';
			return code;
		};

		Blockly.Blocks.piezo_mp3_random = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound','mp3'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_random'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_PLAYER_RANDOM_NAME','LANG_PIEZO_MP3_PLAYER_RANDOM','LANG_PIEZO_MP3_PLAYER_RANDOM_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_RANDOM_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_RANDOM')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/shuffle.svg',32*options.zoom,32*options.zoom));
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_RANDOM_TOOLTIP'));
			}
		};
		
		Blockly.Arduino.piezo_mp3_eq = function() {
			var mode = this.getFieldValue('EQ');
			var code='_mp3_device.EQ('+mode+');\n';
			return code;
		};


		Blockly.Blocks.piezo_mp3_eq = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MP3'),
			tags: ['buzzer','sound','mp3'],
			helpUrl: Facilino.getHelpUrl('piezo_mp3_eq'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MP3,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_MP3_PLAYER_EQ_NAME','LANG_PIEZO_MP3_PLAYER_EQ','MP3_EQ_NORMAL','MP3_EQ_POP','MP3_EQ_ROCK','MP3_EQ_JAZZ','MP3_EQ_CLASSIC','MP3_EQ_BASS','LANG_PIEZO_MP3_PLAYER_EQ_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_EQ_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MP3);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_EQ')).appendField(new Blockly.FieldImage('img/blocks/DFplayer.svg',32*options.zoom, 32*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/control-settings.svg',32*options.zoom,32*options.zoom)).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('MP3_EQ_NORMAL'),'0'],[Facilino.locales.getKey('MP3_EQ_POP'),'1'],[Facilino.locales.getKey('MP3_EQ_ROCK'),'2'],[Facilino.locales.getKey('MP3_EQ_JAZZ'),'3'],[Facilino.locales.getKey('MP3_EQ_CLASSIC'),'4'],[Facilino.locales.getKey('MP3_EQ_BASS'),'5']]),'EQ');
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_MP3_PLAYER_EQ_TOOLTIP'));
			}
		};
		
		}
	}
	
	var FacilinoMP3 = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoMP3;
	} else {
		window.FacilinoMP3 = FacilinoMP3;
	}
}));
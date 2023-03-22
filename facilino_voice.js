(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {

		//if (options.voice)
		if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ATmega32U4'))
		{
	Blockly.Arduino.dyor_piezo_buzzer_voice = function() {
		var voice = Blockly.Arduino.valueToCode(this, 'VOICE', Blockly.Arduino.ORDER_ATOMIC);

		var code ='';
		Blockly.Arduino.definitions_['declare_var_define_play_voice'] = JST['music_define_variables_play_voice']({});
		Blockly.Arduino.definitions_['define_play_voice_setPtr'] = JST['dyor_music_definitions_play_voice_setPtr']({});
		Blockly.Arduino.definitions_['define_play_voice_rev'] = JST['dyor_music_definitions_play_voice_rev']({});
		Blockly.Arduino.definitions_['define_play_voice_getBits'] = JST['dyor_music_definitions_play_voice_getBits']({});
			Blockly.Arduino.definitions_['define_play_voice_say'] = JST['dyor_music_definitions_play_voice_say']({});

		code += JST['dyor_music_play_voice']({
				'voice': voice
			});

			return code;
		};


		Blockly.Blocks.dyor_piezo_buzzer_voice = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_VOICE'),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_piezo_buzzer_voice'),
			examples: ['dyor_piezo_buzzer_voice_example'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_VOICE,
			keys: ['LANG_PIEZO_BUZZER_VOICE_NAME','LANG_PIEZO_BUZZER_VOICE_DESCRIPTION','LANG_PIEZO_BUZZER_VOICE_INPUT_VOICE','LANG_PIEZO_BUZZER_VOICE','LANG_PIEZO_BUZZER_VOICE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_BUZZER_VOICE_NAME'),
			description: Facilino.locales.getKey('LANG_PIEZO_BUZZER_VOICE_DESCRIPTION'),
			additional: ['dyor_piezo_buzzer_predef_voice'],
			inputs: [Facilino.locales.getKey('LANG_PIEZO_BUZZER_VOICE_INPUT_VOICE')],
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_VOICE);
		this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER_VOICE'))
					.appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/buzzer.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('VOICE').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/voice.svg', 36*options.zoom, 36*options.zoom)).setCheck('Voice').setAlign(Blockly.ALIGN_RIGHT);
		this.setInputsInline(true);
		this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_BUZZER_VOICE_TOOLTIP'));
			}
		};

	Blockly.Arduino.dyor_piezo_buzzer_predef_voice = function() {
		var code ='';
		var word = this.getFieldValue('WORD');

		var declare_var = 'declare_var_define_word_'+word;
		var define_var = 'music_define_variables_word_'+word;
		Blockly.Arduino.definitions_[declare_var] = JST[define_var]({});
			code='sp'+word;
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};


		Blockly.Blocks.dyor_piezo_buzzer_predef_voice = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_VOICE'),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_piezo_buzzer_predef_voice'),
			examples: ['dyor_piezo_buzzer_voice_example'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_VOICE,
			keys: ['LANG_PIEZO_BUZZER_PREDEF_VOICE_NAME','LANG_PIEZO_BUZZER_PREDEF_VOICE_DESCRIPTION','LANG_PIEZO_BUZZER_PREDEF_VOICE_DROPDOWN_WORD','LANG_PIEZO_BUZZER_PREDEF_VOICE_OUTPUT','LANG_PIEZO_BUZZER_PREDEF_VOICE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_BUZZER_PREDEF_VOICE_NAME'),
			description: Facilino.locales.getKey('LANG_PIEZO_BUZZER_PREDEF_VOICE_DESCRIPTION'),
			additional: ['dyor_piezo_buzzer_voice'],
			dropdown: [Facilino.locales.getKey('LANG_PIEZO_BUZZER_PREDEF_VOICE_DROPDOWN_WORD')],
			output: Facilino.locales.getKey('LANG_PIEZO_BUZZER_PREDEF_VOICE_OUTPUT'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_VOICE);
		this.appendDummyInput('')
					.appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/voice.svg',36*options.zoom, 36*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);;
				this.appendDummyInput('')
					.appendField(new Blockly.FieldDropdown([
			['AFTERNOON','AFTERNOON'],
			['ALERT', 'ALERT'],
			['ARE','ARE'],
			['BACK','BACK'],
			['BLACK','BLACK'],
			['BYE','BYE'],
			['CAN','CAN'],
			['COLOR','COLOR'],
			['COMPLETED','COMPLETED'],
			['CONNECTED','CONNECTED'],
						['DANGER', 'DANGER'],
			['DO','DO'],
			['DOES','DOES'],
			['DONE','DONE'],
			['EIGHT','EIGHT'],
			['EVENING','EVENING'],
			['FIRE', 'FIRE'],
			['FIVE','FIVE'],
			['FOUR','FOUR'],
			['FRONT','FRONT'],
			['GO','GO'],
			['GOOD','GOOD'],
			['GOODBYE','GOODBYE'],
			['HASTA LA VISTA','HASTA_LA_VISTA'],
			['HELLO','HELLO'],
			['HELP','HELP'],
			['HMMM BEER!','HMMM_BEER'],
			['I','I'],
			['IS', 'IS'],
			['LEFT','LEFT'],
			['LIKE','LIKE'],
			['LOOK','LOOK'],
			['ME','ME'],
			['MORNING','MORNING'],
			['MOTOR', 'MOTOR'],
			['MOVE','MOVE'],
			['NAME','NAME'],
			['NINE','NINE'],
			['NO','NO'],
			['ON', 'ON'],
			['ONE','ONE'],
			['OFF','OFF'],
			['PLAY','PLAY'],
			['PLEASE','PLEASE'],
			['READY TO START','READY_TO_START'],
			['RED', 'RED'],
			['RIGHT','RIGHT'],
			['SAY','SAY'],
			['SEE','SEE'],
			['SEVEN','SEVEN'],
			['SIX','SIX'],
			['SORRY','SORRY'],
			['STOP','STOP'],
			['TAKE','TAKE'],
			['TEN','TEN'],
			['THREE','THREE'],
			['TURN','TURN'],
			['TWO','TWO'],
			['WAIT','WAIT'],
			['WE','WE'],
			['WHITE','WHITE'],
			['WON','WON'],
			['YELLOW'],
			['YES','YES'],
			['YOU','YOU'],
			['ZERO']
					]), 'WORD').setAlign(Blockly.ALIGN_RIGHT);
		this.setInputsInline(true);
		this.setOutput(true,'Voice');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_BUZZER_PREDEF_VOICE_TOOLTIP'));
			}
		};
		
		}
		
	}
	
	var FacilinoVoice = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoVoice;
	} else {
		window.FacilinoVoice = FacilinoVoice;
	}
}));
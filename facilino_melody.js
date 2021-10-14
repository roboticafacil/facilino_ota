(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
			Blockly.Arduino.dyor_piezo_buzzer_melody = function() {
		var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE) || '';
		var code ='';
		if (this.getInputTargetBlock('MELODY')===null)
			return code;

		if(this.getInputTargetBlock('MELODY').type==='dyor_piezo_buzzer_predef_melody')
		{

			var melody = Blockly.Arduino.valueToCode(this, 'MELODY', Blockly.Arduino.ORDER_ATOMIC);
			var wait_field=this.getFieldValue('WAIT') || 'FALSE';
			if (wait_field==='FALSE')
			{
				if (Facilino.profiles['processor']==='ESP32')
				{
					Facilino.PWMChannelsIDs[this.id]=pin;
					var unique = [];
					this.uniqueVariables = [];
					$.each(Object.values(Facilino.PWMChannelsIDs), function(i, el){
						if($.inArray(el, unique) === -1) unique.push(el);
					});
					var channel = unique.indexOf(pin);
					Blockly.Arduino.setups_['ledc_'+pin] = 'ledcSetup('+channel+',0,8);\n  ledcAttachPin('+pin+','+channel+');\n';
					Blockly.Arduino.definitions_['define_play_melody'] = JST['dyor_music_definitions_play_melody_ESP32']({});
					code += JST['dyor_music_play_melody']({'pin': channel,'melody': melody});
				}
				else
				{
					Blockly.Arduino.definitions_['define_play_melody'] = JST['dyor_music_definitions_play_melody']({});
					code += JST['dyor_music_play_melody']({'pin': pin,'melody': melody});
				}
				Blockly.Arduino.play_melody = '';
			}
			else
			{

				Blockly.Arduino.definitions_['declare_var_current_melody_ptr']='volatile uint16_t* _current_melody_ptr;\n';
				if (Facilino.profiles['processor']==='ESP32')
				{
					Facilino.PWMChannelsIDs[this.id]=pin;
					var unique = [];
					this.uniqueVariables = [];
					$.each(Object.values(Facilino.PWMChannelsIDs), function(i, el){
						if($.inArray(el, unique) === -1) unique.push(el);
					});
					var channel = unique.indexOf(pin);
					Blockly.Arduino.setups_['ledc_'+pin] = 'ledcSetup('+channel+',0,8);\n  ledcAttachPin('+pin+','+channel+');\n';
					Blockly.Arduino.setups_['playMelody_timer']='playMelodyTimer = timerBegin(1, 80, true);\n  timerAttachInterrupt(playMelodyTimer, &playMelodyInterrupt, true);\n  timerAlarmWrite(playMelodyTimer, 1000, true);\n  timerAlarmEnable(playMelodyTimer);\n';
					Blockly.Arduino.definitions_['define_prepare_melody'] = JST['dyor_music_definitions_prepare_melody_ESP32']({});
					Blockly.Arduino.definitions_['declare_var_melody_channel']='volatile int _melody_channel=0;\n';
				}
				else
				{
					Blockly.Arduino.definitions_['define_prepare_melody'] = JST['dyor_music_definitions_prepare_melody']({});
					Blockly.Arduino.definitions_['declare_var_melody_pin']='volatile int _melody_pin=0;\n';
				}
				Blockly.Arduino.definitions_['declare_var_melody_counter']='volatile int _melody_counter=0;\n';
				Blockly.Arduino.definitions_['declare_var_melody_length']='volatile int _melody_length=0;\n';
				Blockly.Arduino.definitions_['declare_var_melody_status']='volatile uint8_t _melody_status=-1;\n';
				Blockly.Arduino.definitions_['declare_var_melody_next_time']='volatile unsigned long _melody_next_time=0;\n';
				if (Facilino.profiles['processor']==='ESP32')
				{
					Blockly.Arduino.definitions_['declare_var_melody_timer'] ='hw_timer_t * playMelodyTimer = NULL;\n';
					Blockly.Arduino.definitions_['declare_var_melody_mux'] ='portMUX_TYPE playMelodyMux = portMUX_INITIALIZER_UNLOCKED;\n';
					Blockly.Arduino.definitions_['define_play_melody_interrupt'] = JST['dyor_music_definitions_play_melody_interrupt_ESP32']({});

					code += JST['dyor_music_prepare_melody']({'pin': channel,'melody': melody});
				}
				else
				{
					Blockly.Arduino.definitions_['define_play_melody_interrupt'] = JST['dyor_music_definitions_play_melody_interrupt']({});
					Blockly.Arduino.play_melody = 'playMelodyInterrupt();\n';
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
					code += JST['dyor_music_prepare_melody']({'pin': pin,'melody': melody});
				}


			}
		}
		else if (this.getInputTargetBlock('MELODY').type==='variables_get')
		{
			//IGNORES THE WAIT CHECKBOX
			var melody = Blockly.Arduino.valueToCode(this, 'MELODY', Blockly.Arduino.ORDER_ATOMIC);
			if (Facilino.profiles['processor']==='ESP32')
			{
				Facilino.PWMChannelsIDs[this.id]=pin;
				var unique = [];
				this.uniqueVariables = [];
				$.each(Object.values(Facilino.PWMChannelsIDs), function(i, el){
					if($.inArray(el, unique) === -1) unique.push(el);
				});
				var channel = unique.indexOf(pin);
				Blockly.Arduino.setups_['ledc_'+pin] = 'ledcSetup('+channel+',0,8);\n  ledcAttachPin('+pin+','+channel+');\n';
				Blockly.Arduino.definitions_['define_play_melody'] = JST['dyor_music_definitions_play_melody_ESP32']({});
				code += JST['dyor_music_play_melody1']({'pin': channel,'melody': melody});
			}
			else
			{
				Blockly.Arduino.definitions_['define_play_melody'] = JST['dyor_music_definitions_play_melody']({});
				code += JST['dyor_music_play_melody1']({'pin': pin,'melody': melody});
			}
			Blockly.Arduino.play_melody = '';
		}
		else
		{
			var melody = Blockly.Arduino.valueToCode(this, 'MELODY', Blockly.Arduino.ORDER_ATOMIC).substring(1);
			var s = melody.replace(',','');
			//k="1";
			var enc='_melody'+this.NumMelodies;
			/*for (var i = 0; i < s.length; i++) {
				// create block
				var a = s.charCodeAt(i);
				// bitwise XOR
				var b = (a ^ k)%26+97;
				enc = enc + String.fromCharCode(b);
			}*/
			melody = melody.substring(0,melody.length-1);
			Blockly.Arduino.definitions_['declare_var_play_melody'+enc] = 'const uint16_t '+enc+'[] = {'+melody+'};\n';

				if (wait_field==='FALSE')
				{
					if (Facilino.profiles['processor']==='ESP32')
					{
						Facilino.PWMChannelsIDs[this.id]=pin;
						var unique = [];
						this.uniqueVariables = [];
						$.each(Object.values(Facilino.PWMChannelsIDs), function(i, el){
							if($.inArray(el, unique) === -1) unique.push(el);
						});
						var channel = unique.indexOf(pin);
						Blockly.Arduino.setups_['ledc_'+pin] = 'ledcSetup('+channel+',0,8);\n  ledcAttachPin('+pin+','+channel+');\n';
						Blockly.Arduino.definitions_['define_play_melody'] = JST['dyor_music_definitions_play_melody_ESP32']({});
						code += JST['dyor_music_play_melody']({'pin': channel,'melody': enc});
					}
					else
					{
						Blockly.Arduino.definitions_['define_play_melody'] = JST['dyor_music_definitions_play_melody']({});
						code += JST['dyor_music_play_melody']({'pin': pin,'melody': enc});
					}
					Blockly.Arduino.play_melody = '';
			/*
					Blockly.Arduino.definitions_['define_play_melody'] = JST['dyor_music_definitions_play_melody']({});
					code += JST['dyor_music_play_melody']({'pin': pin,'melody': enc});
					Blockly.Arduino.play_melody = '';*/
				}
				else
				{
					Blockly.Arduino.definitions_['declare_var_current_melody_ptr']='volatile uint16_t* _current_melody_ptr;\n';
					if (Facilino.profiles['processor']==='ESP32')
					{
						Facilino.PWMChannelsIDs[this.id]=pin;
						var unique = [];
						this.uniqueVariables = [];
						$.each(Object.values(Facilino.PWMChannelsIDs), function(i, el){
							if($.inArray(el, unique) === -1) unique.push(el);
						});
						var channel = unique.indexOf(pin);
						Blockly.Arduino.setups_['ledc_'+pin] = 'ledcSetup('+channel+',0,8);\n  ledcAttachPin('+pin+','+channel+');\n';
						Blockly.Arduino.setups_['playMelody_timer']='playMelodyTimer = timerBegin(1, 80, true);\n  timerAttachInterrupt(playMelodyTimer, &playMelodyInterrupt, true);\n  timerAlarmWrite(playMelodyTimer, 1000, true);\n  timerAlarmEnable(playMelodyTimer);\n';
						Blockly.Arduino.definitions_['define_prepare_melody'] = JST['dyor_music_definitions_prepare_melody_ESP32']({});
						Blockly.Arduino.definitions_['declare_var_melody_channel']='volatile int _melody_channel=0;\n';
					}
					else
					{
						Blockly.Arduino.definitions_['define_prepare_melody'] = JST['dyor_music_definitions_prepare_melody']({});
						Blockly.Arduino.definitions_['declare_var_melody_pin']='volatile int _melody_pin=0;\n';
					}
					Blockly.Arduino.definitions_['declare_var_melody_counter']='volatile int _melody_counter=0;\n';
					Blockly.Arduino.definitions_['declare_var_melody_length']='volatile int _melody_length=0;\n';
					Blockly.Arduino.definitions_['declare_var_melody_status']='volatile uint8_t _melody_status=-1;\n';
					Blockly.Arduino.definitions_['declare_var_melody_next_time']='volatile unsigned long _melody_next_time=0;\n';
					if (Facilino.profiles['processor']==='ESP32')
					{
						Blockly.Arduino.definitions_['declare_var_melody_timer'] ='hw_timer_t * playMelodyTimer = NULL;\n';
						Blockly.Arduino.definitions_['declare_var_melody_mux'] ='portMUX_TYPE playMelodyMux = portMUX_INITIALIZER_UNLOCKED;\n';
						Blockly.Arduino.definitions_['define_play_melody_interrupt'] = JST['dyor_music_definitions_play_melody_interrupt_ESP32']({});

						code += JST['dyor_music_prepare_melody']({'pin': channel,'melody': enc});
					}
					else
					{
						Blockly.Arduino.definitions_['define_play_melody_interrupt'] = JST['dyor_music_definitions_play_melody_interrupt']({});
						Blockly.Arduino.play_melody = 'playMelodyInterrupt();\n';
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
						code += JST['dyor_music_prepare_melody']({'pin': pin,'melody': enc});
					}
				}
		}
		return code;
		};


		Blockly.Blocks.dyor_piezo_buzzer_melody = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MUSIC'),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_piezo_buzzer_melody'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MUSIC,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_BUZZER_MELODY_NAME','LANG_PIEZO_BUZZER','LANG_PIEZO_BUZZER_PIN','LANG_PIEZO_BUZZER_WAIT','LANG_PIEZO_BUZZER_MELODY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_BUZZER_MELODY_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MUSIC);
		this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER'))
					.appendField(new Blockly.FieldImage('img/blocks/buzzer.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom)).setCheck('DigitalPin').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('MELODY').appendField(new Blockly.FieldImage('img/blocks/clef.svg', 36*options.zoom, 36*options.zoom)).setCheck(['Melody','Variable']).setAlign(Blockly.ALIGN_RIGHT);
				if (window.FacilinoAdvanced===true)
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER_WAIT')).appendField(new Blockly.FieldCheckbox('FALSE'),'WAIT').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				Facilino.NumMelodies=Facilino.NumMelodies+1;
				this.NumMelodies=Facilino.NumMelodies;
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_BUZZER_MELODY_TOOLTIP'));
			},
			onchange: function()
			{
				if (this!==undefined)
					Blockly.Arduino.play_melody='';
			}
		};

	Blockly.Arduino.dyor_piezo_buzzer_predef_melody = function() {
	if (window.license===undefined || /^\s*$/.test(window.license)) return '//demo version';
		var code= '';

		var option = this.getFieldValue('OPTION');

		if (option==='1')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_beethoven'] = 'const uint16_t BEETHOVEN[] = {0,187,392,187,392,187,392,187,311,750,0,187,349,187,349,187,349,187,294,375};\n';
			code='BEETHOVEN';
		}
		else if (option==='2')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_break_free'] = 'const uint16_t BREAK_FREE[] = {494,187,659,375,740,375,740,375,740,187,831,1312,0,562,494,187,659,375,740,375,880,375,831,937};\n';
			code='BREAK_FREE';
		}
		else if (option==='3')
		{
		  Blockly.Arduino.definitions_['declare_var_play_melody_champions'] = 'const uint16_t CHAMPIONS[] = {698,750,659,187,698,187,659,375,523,562,440,187,587,375,440,750,0,562,0,375,523,187,698,750,784,187,880,187,1047,375,880,562,587,187,659,187,587,750};\n';
		  code='CHAMPIONS';
		}
		else if (option==='4')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_game_thrones'] = 'const uint16_t GAME_THRONES[] = {1568,562,1047,562,1245,93,1397,93,1568,375,1047,375,1245,93,1397,93,1175,1875,1397,562,932,562,1245,93,1175,93,1397,375,932,562,1245,93,1175,93,1047,750};\n';
			code='GAME_THRONES';
		}
		else if (option==='5')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_imagine'] = 'const uint16_t IMAGINE[] = {440,187,523,187,440,187,523,375,659,187,659,375,587,187,440,750,0,375,494,187,494,562,494,375,523,187,587,937,659,187,784,375,659,93,659,93,523,375};\n';
			code='IMAGINE';
		}
		else if (option==='6')
		{
			//Blockly.Arduino.definitions_['declare_var_play_imperial_march'] = 'const uint16_t IMPERIAL_MARCH[] = {440,375,440,375,440,375,349,250,523,93,440,375,349,250,523,187,440,750,659,375,659,375,659,375,698,250,523,93,415,375,349,250,523,187,440,750};\n';
			Blockly.Arduino.definitions_['declare_var_play_imperial_march'] = 'const uint16_t IMPERIAL_MARCH[] = {440,375,440,375,440,375,349,281,523,93,440,375,349,281,523,93,440,750,659,375,659,375,659,375,698,281,523,93,415,375,349,281,523,93,440,750,880,375,440,281,440,93,880,375,831,281,784,93,740,93,698,93,740,187,0,187,446,281,622,375,587,281,554,93,523,93,494,93,523,187,0,187,349,187,415,375,349,281,392,93,523,375,440,281,523,93,659,750,880,375,440,281,440,93,880,375,831,281,784,93,740,93,698,93,740,187,0,187,446,281,622,375,587,281,554,93,523,93,494,93,523,187,0,187,330,187,415,375,330,281,523,93,440,375,349,281,523,93,440,750};\n';
			code='IMPERIAL_MARCH';
		}
		else if (option==='7')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_love'] = 'const uint16_t LOVE[] = {392,187,392,187,392,187,330,187,392,750,0,375,392,187,392,187,494,187,494,187,523,187,523,187,440,750};\n';
			code='LOVE';
		}
		else if (option==='8')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_no_cry'] = 'const uint16_t NO_CRY[] = {523,562,494,187,523,187,494,187,494,187,440,562,0,562,659,375,698,187,659,187,698,187,523,187};\n';
			code='NO_CRY';
		}
		else if (option==='9')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_thriller'] = 'const uint16_t THRILLER[] = {196,187,220,187,262,187,294,187,220,187,0,93,220,93,0,187,220,93};\n';
			code='THRILLER';
		}
		else if (option==='10')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_batman'] = 'const uint16_t BATMAN[] = {245,250,277,250,294,250,392,500,370,500,349,1333,0,250,245,250,277,250,294,250,370,500,0,250,415,250,446,1000};\n';
			code='BATMAN';
		}
		else if (option==='11')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_wonder_woman'] = 'const uint16_t WONDER_WOMAN[] = {740,187,880,187,1109,187,277,10,1046,177,880,187,277,10,988,177,880,187,277,10,988,177,880,187,277,10,1109,177,277,10,988,187,880,187,277,10,988,177,880,187,277,10,988,177,880,187,277,10,988,177,277,10,1109,177,880,187,277,10,1109,177,880,187,277,10,1109,177,880,187,277,10,1046,177,277,10,1109,177,880,187,277,10,1046,177,880,187,277,10,1046,177,880,187};\n';
			code='WONDER_WOMAN';
		}
		else if (option==='12')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_banana_song'] = 'const uint16_t BANANA_SONG[] = {440,281,440,281,440,562,440,281,440,281,440,140,440,562,554,281,554,281,554,562,554,281,554,281,554,140,554,562,659,281,659,281,659,562,659,281,659,281,659,140,659,562,494,281,554,281,554,281,494,281,440,1125,554,281,659,281,554,281,554,281,494,281,440,1125,494,281,554,281,554,281,494,281,440,1125,494,140,494,140,494,140,494,140,330,281,330,140,554,281,494,140,554,140,494,140,554,140,494,140,440,140,370,140,440,281,440,281,440,562,440,281,440,281,440,140,440,562};\n';
			code='BANANA_SONG';
		}
		else if (option==='13')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_dragon_ball'] = 'const uint16_t DRAGON_BALL[] = {740,244,740,366,659,244,554,122,740,181,0,976,740,122,740,122,740,244,649,244,554,122,740,122,0,976,494,122,494,122,494,122,494,122,494,244,440,244,494,122,494,122,494,122,494,122,494,244,440,244,370,244,370,244,370,244,330,122,370,122,0,976,740,244,740,366,659,244,554,122,740,181,0,976,740,122,740,122,740,244,649,244,554,122,740,122,0,976,494,122,494,122,494,122,494,122,494,244,440,244,494,122,494,122,494,122,494,122,494,244,440,244,554,1220,554,244,659,244,740,488,740,488,740,488,659,244,554,244,659,244,554,244,659,244,740,244,0,488,554,244,659,244,740,488,0,488,880,244,831,244,740,122,659,366,0,488,880,244,831,244,740,122,659,244,740,976};\n';
			code='DRAGON_BALL';
		}
		else if (option==='14')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_seven_nations_army'] = 'const uint16_t SEVEN_NATIONS_ARMY[] = {330,759,330,252,392,378,330,125,0,252,294,252,262,1012,245,1012,330,759,330,252,392,378,330,125,0,252,294,252,262,506,294,252,262,252,245,1012,330,759,330,252,392,378,330,125,0,252,294,252,262,1012,245,1012};\n';
			code='SEVEN_NATIONS_ARMY';
		}
		else if (option==='15')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_spiderman'] = 'const uint16_t SPIDERMAN[] = {440,375,523,187,659,1125,587,375,523,187,440,1125,440,375,523,187,659,375,698,187,659,280,587,375,523,187,440,1125,587,375,698,187,880,1125,784,375,698,187,587,1125,440,375,523,187,659,375,698,187,659,280,587,375,523,187,440,562};\n';
			code='SPIDERMAN';
		}
		else if (option==='16')
		{
			Blockly.Arduino.definitions_['declare_var_play_melody_pokemon'] = 'const uint16_t POKEMON[] = {294,187,294,187,294,187,294,375,0,187,294,187,262,187,220,187,175,187,0,562,175,187,294,375,294,375,262,187,233,187,262,375,0,1500,233,187,311,375,311,375,311,187,294,375,294,187,233,187,233,187,0,375,233,187,294,375,294,187,262,375,233,375,294,1125,0,375,294,187,294,187,294,187,294,375,294,187,262,187,220,187,175,562,294,187,294,562,262,375,233,375,262,937,0,750,311,187,311,187,311,187,311,375,0,187,311,187,294,375,262,187,262,187,233,187,0,187,233,187,294,275,294,187,262,375,233,187,294,1125,0,187,294,187,349,187,392,187};\n';
			code='POKEMON';
		}
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};


		Blockly.Blocks.dyor_piezo_buzzer_predef_melody = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MUSIC'),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_piezo_buzzer_predef_melody'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MUSIC,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_BUZZER_PREDEF_MELODY_NAME','LANG_PIEZO_BUZZER_PREDEF_MELODY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_BUZZER_PREDEF_MELODY_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MUSIC);
		this.appendDummyInput('')
					.appendField(new Blockly.FieldImage('img/blocks/clef.svg',36*options.zoom, 36*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/musical_notes.svg', 48*options.zoom, 48*options.zoom));
				this.appendDummyInput('')
					.appendField(new Blockly.FieldDropdown([
						['BEETHOVEN', '1'],
			['I WANT TO BREAK FREE', '2'],
						['WE\'RE THE CHAMPIONS', '3'],
			['GAME OF THRONES', '4'],
						['IMAGINE', '5'],
			['STAR WARS', '6'],
						['LOVE IS IN THE AIR', '7'],
			['NO WOMAN, NO CRY', '8'],
			['THRILLER', '9'],
			['BATMAN THEME','10'],
			['WONDER WOMAN THEME','11'],
			['BANANA SONG','12'],
			['DRAGON BALL','13'],
			['SEVEN NATIONS ARMY','14'],
			['SPIDERMAN','15'],
			['POKEMON','16']
					]), 'OPTION').setAlign(Blockly.ALIGN_RIGHT);
		this.setInputsInline(false);
		this.setOutput(true,'Melody');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_BUZZER_PREDEF_MELODY_TOOLTIP'));
			}
		};

	if (window.FacilinoAdvanced===true)
	{
	Blockly.Arduino.dyor_piezo_buzzer_stop_melody = function() {
	if (window.license===undefined || /^\s*$/.test(window.license)) return '//demo version\n';
		var code ='';
		Blockly.Arduino.definitions_['declare_var_melody_status']='volatile uint8_t _melody_status=-1;\n';

		code += '_melody_status=0;\n';

		return code;
		};


		Blockly.Blocks.dyor_piezo_buzzer_stop_melody = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MUSIC'),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_piezo_buzzer_stop_melody'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MUSIC,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_BUZZER_STOP_MELODY_NAME','LANG_PIEZO_BUZZER_STOP_MELODY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_BUZZER_STOP_MELODY_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MUSIC);
				this.appendDummyInput('')
					.appendField(new Blockly.FieldImage('img/blocks/stop-button.svg',36*options.zoom, 36*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/musical_notes.svg', 48*options.zoom, 48*options.zoom));
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_BUZZER_STOP_MELODY_TOOLTIP'));
			}
		};

		Blockly.Arduino.dyor_piezo_buzzer_isplaying_melody = function() {
	if (window.license===undefined || /^\s*$/.test(window.license)) return '//demo version\n';
		var code ='';
		Blockly.Arduino.definitions_['declare_var_melody_status']='volatile uint8_t _melody_status=-1;\n';

		code += '(_melody_status==1)';

		return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.dyor_piezo_buzzer_isplaying_melody = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MUSIC'),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_piezo_buzzer_isplaying_melody'),
			examples: ['dyor_piezo_buzzer_melody_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MUSIC,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_BUZZER_ISPLAYING_MELODY_NAME','LANG_PIEZO_BUZZER_ISPLAYING_MELODY_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_BUZZER_ISPLAYING_MELODY_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MUSIC);
		this.appendDummyInput('')
					.appendField(new Blockly.FieldImage('img/blocks/play-button.svg',36*options.zoom, 36*options.zoom)).appendField(new Blockly.FieldImage('img/blocks/musical_notes.svg', 48*options.zoom, 48*options.zoom));
		this.setInputsInline(false);
		this.setOutput(true,Boolean);
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_BUZZER_ISPLAYING_MELODY_TOOLTIP'));
			}
		};
		
	}


		function noteCreator(item,index){
			var duration,note;
			if (item.duration==='redondap')
				duration='2250';
			else if (item.duration==='redonda')
				duration='1500';
			else if (item.duration==='blancap')
				duration='1125';
			else if (item.duration==='blanca')
				duration='750';
			else if (item.duration==='negrap')
				duration='562';
			else if (item.duration==='negra')
				duration='375';
			else if (item.duration==='corcheap')
				duration='281';
			else if (item.duration==='corchea')
				duration='187';
			else if (item.duration==='semicorcheap')
				duration='141';
			else if (item.duration==='semicorchea')
				duration='93';
			if (item.octave==='vb')
			{
				if (item.note==='silencio')
					note='0';
				else if (item.note==='do')
					note='131';
				else if (item.note==='dos')
					note='139';
				else if (item.note==='reb')
					note='139';
				else if (item.note==='re')
					note='147';
				else if (item.note==='res')
					note='156';
				else if (item.note==='mib')
					note='156';
				else if (item.note==='mi')
					note='165';
				else if (item.note==='fa')
					note='175';
				else if (item.note==='fas')
					note='185';
				else if (item.note==='solb')
					note='185';
				else if (item.note==='sol')
					note='196';
				else if (item.note==='sols')
					note='208';
				else if (item.note==='lab')
					note='208';
				else if (item.note==='la')
					note='220';
				else if (item.note==='las')
					note='233';
				else if (item.note==='sib')
					note='233';
				else if (item.note==='si')
					note='245';
			}
			else if (item.octave==='va')
			{
				if (item.note==='silencio')
					note='0';
				else if (item.note==='do')
					note='523';
				else if (item.note==='dos')
					note='554';
				else if (item.note==='reb')
					note='554';
				else if (item.note==='re')
					note='587';
				else if (item.note==='res')
					note='622';
				else if (item.note==='mib')
					note='622';
				else if (item.note==='mi')
					note='659';
				else if (item.note==='fa')
					note='698';
				else if (item.note==='fas')
					note='740';
				else if (item.note==='solb')
					note='740';
				else if (item.note==='sol')
					note='784';
				else if (item.note==='sols')
					note='831';
				else if (item.note==='lab')
					note='831';
				else if (item.note==='la')
					note='880';
				else if (item.note==='las')
					note='932';
				else if (item.note==='sib')
					note='932';
				else if (item.note==='si')
					note='988';
			}
			else
			{
				if (item.note==='silencio')
					note='0';
				else if (item.note==='do')
					note='262';
				else if (item.note==='dos')
					note='277';
				else if (item.note==='reb')
					note='277';
				else if (item.note==='re')
					note='294';
				else if (item.note==='res')
					note='311';
				else if (item.note==='mib')
					note='311';
				else if (item.note==='mi')
					note='330';
				else if (item.note==='fa')
					note='349';
				else if (item.note==='fas')
					note='370';
				else if (item.note==='solb')
					note='370';
				else if (item.note==='sol')
					note='392';
				else if (item.note==='sols')
					note='415';
				else if (item.note==='lab')
					note='415';
				else if (item.note==='la')
					note='440';
				else if (item.note==='las')
					note='446';
				else if (item.note==='sib')
					note='446';
				else if (item.note==='si')
					note='494';
			}
			var octave=item.octave;
			if (octave!=='')
				octave='_'+octave;
			var note_name=item.note+'_'+item.duration+octave;
			//console.log(note_name);
			Blockly.Arduino['dyor_piezo_music_'+note_name] = function() {
			if (window.license===undefined || /^\s*$/.test(window.license)) return '//demo version';
				var melody = Blockly.Arduino.valueToCode(this, 'MELODY', Blockly.Arduino.ORDER_ATOMIC) || '';
				code = ','+note+','+duration+melody;
				return [code, Blockly.Arduino.ORDER_ATOMIC];
			};
			var note_cat;
			if (item.note==='silencio')
			{
				note_cat='LANG_SUBCATEGORY_MUSIC_SILENCE';
			}
			else
			{
				if (item.octave==='vb')
					note_cat='LANG_SUBCATEGORY_C3';
				else if (item.octave==='')
					note_cat='LANG_SUBCATEGORY_C4';
				else if (item.octave==='va')
					note_cat='LANG_SUBCATEGORY_C5';
			}
			var note_path = 'img/blocks/'+note_name+'.svg';
			Blockly.Blocks['dyor_piezo_music_'+note_name] = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MUSIC'),
			subsubcategory: Facilino.locales.getKey(note_cat),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_piezo_music'),
			examples: ['dyor_piezo_buzzer_melody_example1.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MUSIC,
			keys: ['LANG_MUSIC_NOTE_NAME','LANG_MUSIC_NOTE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MUSIC_NOTE_NAME'),
			//dyor_piezo_buzzer initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MUSIC);
				this.appendValueInput('MELODY').appendField(new Blockly.FieldImage(note_path, 30*options.zoom, 86.6*options.zoom)).setCheck('Melody').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setOutput(true,'Melody');
				this.setTooltip(Facilino.locales.getKey('LANG_MUSIC_NOTE_TOOLTIP'));
				}
			};
			
			if (window.FacilinoAdvanced===false)
				delete Blockly.Blocks['dyor_piezo_music_'+note_name].subsubcategory;
		}


		if (window.FacilinoAdvanced===true)
		{
			var d_alt=["redondap","redonda","blancap","blanca","negrap","negra","corcheap","corchea","semicorcheap","semicorchea"];
			var n_alt=["do","dos","reb","re","res","mib","mi","fa","fas","solb","sol","sols","lab","la","las","sib","si"];
			var s_alt=["vb","","va"];
			var notes=[{note: 'silencio',duration: 'redondap',octave:''},
				   {note: 'silencio',duration: 'redonda',octave:''},
				   {note: 'silencio',duration: 'blancap',octave:''},
				   {note: 'silencio',duration: 'blanca',octave:''},
				   {note: 'silencio',duration: 'negrap',octave:''},
				   {note: 'silencio',duration: 'negra',octave:''},
				   {note: 'silencio',duration: 'corcheap',octave:''},
				   {note: 'silencio',duration: 'corchea',octave:''},
				   {note: 'silencio',duration: 'semicorcheap',octave:''},
				   {note: 'silencio',duration: 'semicorchea',octave:''}];
		}
		else
		{
			var d_alt=["redonda","blanca","negra","corchea"];
			var n_alt=["do","re","mi","fa","sol","la","si"];
			var s_alt=[""];
			var notes=[{note: 'silencio',duration: 'redonda',octave:''},
				   {note: 'silencio',duration: 'blanca',octave:''},
				   {note: 'silencio',duration: 'negra',octave:''},
				   {note: 'silencio',duration: 'corchea',octave:''},
				   {note: 'silencio',duration: 'semicorchea',octave:''}];
		}

		var notes_counter=notes.length;
		s_alt.forEach(function (si){
			n_alt.forEach(function (ni){
				d_alt.forEach(function (di){
					notes[notes_counter]={note: ni, duration: di, octave: si};
					notes_counter=notes_counter+1;
				});
			});
		});

		notes.forEach(noteCreator);

	Blockly.Arduino.dyor_piezo_music_end = function() {
	if (window.license===undefined || /^\s*$/.test(window.license)) return '//demo version';
		var code = ';';
		return [code, Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.dyor_piezo_music_end = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_MUSIC'),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_piezo_music'),
			examples: ['dyor_piezo_buzzer_melody_example1.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_MUSIC,
			keys: ['LANG_MUSIC_NOTE_END_NAME','LANG_MUSIC_NOTE_END_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MUSIC_NOTE_END_NAME'),
			//dyor_piezo_buzzer initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_MUSIC);
		this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/end.svg',30*options.zoom, 86.6*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
		this.setOutput(true,'Melody');
				this.setTooltip(Facilino.locales.getKey('LANG_MUSIC_NOTE_END_TOOLTIP'));
			}
		};
		
	}
	
	var FacilinoMelody = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoMelody;
	} else {
		window.FacilinoMelody = FacilinoMelody;
	}
}));
(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
		Blockly.Arduino.dyor_piezo_buzzer = function() {
		var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_ATOMIC) || '';
		var dropdown_freq = this.getFieldValue('FREQ') || '';
		var delay_time = this.getFieldValue('DURA') || '';
		var tie = this.getFieldValue('TIE') || 'FALSE';
		var code = '';
		if (Facilino.profiles['processor']==='ESP32')
		{
			Facilino.PWMChannelsIDs[this.id]=pin;
			var unique = [];
			this.uniqueVariables = [];
			$.each(Object.values(Facilino.PWMChannelsIDs), function(i, el){
				if($.inArray(el, unique) === -1) unique.push(el);
			});
			var channel = unique.indexOf(pin);
			Blockly.Arduino.setups_['ledc_'+pin] = 'ledcSetup('+channel+',0,8);\n  ledcAttachPin('+pin+','+channel+');\n'
			Blockly.Arduino.definitions_['define_adv_buzzer_tone']='void _tone(int channel, float noteFrequency, long noteDuration, int silentDuration){\nledcWriteTone(channel, noteFrequency);\n  delay(noteDuration);\n  ledcWrite(channel, 0);\n  delay(silentDuration);\n}\n';
			if (tie==='FALSE') {
				code+='_tone('+channel+','+dropdown_freq+','+delay_time+','+delay_time+');\n  delay('+delay_time+');\n  ledcWrite('+channel+',0);\n';
			}
			else {
				code+='_tone('+channel+','+dropdown_freq+','+delay_time+','+delay_time+');\n  delay('+delay_time+');\n';
			}
		}
		else
		{
			Blockly.Arduino.definitions_['define_adv_buzzer_tone']='void _tone(int buzzerPin, float noteFrequency, long noteDuration, int silentDuration){\n  tone(buzzerPin, noteFrequency, noteDuration);\n  delay(noteDuration);\n  delay(silentDuration);\n}\n';
			if (tie==='FALSE') {
				code+='_tone('+pin+','+dropdown_freq+','+delay_time+','+delay_time+');\n  delay('+delay_time+');\n  noTone('+pin+');\n';
			}
			else {
				code+='_tone('+pin+','+dropdown_freq+','+delay_time+','+delay_time+');\n  delay('+delay_time+');\n';
			}
		}
		return code;
		};


		Blockly.Blocks.dyor_piezo_buzzer = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUZZER'),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_piezo_buzzer'),
			examples: ['dyor_piezo_buzzer_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_BUZZER,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_BUZZER','LANG_PIEZO_BUZZER_PIN','LANG_PIEZO_BUZZER_NOTONE','LANG_PIEZO_BUZZER_DO','LANG_PIEZO_BUZZER_DOs','LANG_PIEZO_BUZZER_RE','LANG_PIEZO_BUZZER_REs','LANG_PIEZO_BUZZER_MI','LANG_PIEZO_BUZZER_FA','LANG_PIEZO_BUZZER_FAs','LANG_PIEZO_BUZZER_SOL','LANG_PIEZO_BUZZER_SOLs','LANG_PIEZO_BUZZER_LA','LANG_PIEZO_BUZZER_LAs','LANG_PIEZO_BUZZER_SI','LANG_PIEZO_BUZZER_DOp','LANG_PIEZO_BUZZER_DOps','LANG_PIEZO_BUZZER_REp','LANG_PIEZO_BUZZER_REps','LANG_PIEZO_BUZZER_MIp','LANG_PIEZO_BUZZER_FAp','LANG_PIEZO_BUZZER_FAps','LANG_PIEZO_BUZZER_SOLp','LANG_PIEZO_BUZZER_SOLps','LANG_PIEZO_BUZZER_LAp','LANG_PIEZO_BUZZER_LAps','LANG_PIEZO_BUZZER_SIp','LANG_PIEZO_BUZZER_REDONDA','LANG_PIEZO_BUZZER_BLANCA','LANG_PIEZO_BUZZER_NEGRA','LANG_PIEZO_BUZZER_CORCHEA','LANG_PIEZO_BUZZER_SEMICORCHEA','LANG_PIEZO_BUZZER_FUSA','LANG_PIEZO_BUZZER_SEMIFUSA','LANG_PIEZO_BUZZER_TIE','LANG_PIEZO_BUZZER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_BUZZER_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_BUZZER);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER')).appendField(new Blockly.FieldImage('img/blocks/buzzer.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('PIN')
					.appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER_PIN')).appendField(new Blockly.FieldImage("img/blocks/digital_signal.svg",20*options.zoom,20*options.zoom))
					.setCheck('DigitalPin')
					.setAlign(Blockly.ALIGN_RIGHT);

				this.appendDummyInput('')
					.appendField(new Blockly.FieldDropdown([
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_NOTONE') || 'SILENCIO', '0'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_DO') || 'DO', '261'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_DOs') || 'DO#', '277'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_RE') || 'RE', '293'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_REs') || 'RE#', '311'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_MI') || 'MI', '329'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_FA') || 'FA', '349'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_FAs') || 'FA#', '370'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_SOL') || 'SOL', '392'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_SOLs') || 'SOL#', '415'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_LA') || 'LA', '440'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_LAs') || 'LA#', '466'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_SI') || 'SI', '493'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_DOp') || 'DO\'', '523'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_DOps') || 'DO\'#', '554'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_REp') || 'RE\'', '587'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_REps') || 'RE\'#', '622'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_MIp') || 'MI\'', '659'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_FAp') || 'FA\'', '698'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_FAps') || 'FA\'#', '744'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_SOLp') || 'SOL\'', '784'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_SOLps') || 'SOL\'#', '830'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_LAp') || 'LA\'', '880'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_LAps') || 'LA\'#', '932'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_SIp') || 'SI\'', '987'],
					]), 'FREQ') //523
					.appendField(new Blockly.FieldImage('img/blocks/note.png',24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);

		this.appendDummyInput('')
					.appendField(new Blockly.FieldDropdown([
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_REDONDA') || 'REDONDA', '1500'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_BLANCA') || 'BLANCA', '750'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_NEGRA') || 'NEGRA', '375'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_CORCHEA') || 'CORCHEA', '187'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_SEMICORCHEA') || 'SEMICORCHEA', '93'],
			[Facilino.locales.getKey('LANG_PIEZO_BUZZER_FUSA') || 'FUSA', '47'],
						[Facilino.locales.getKey('LANG_PIEZO_BUZZER_SEMIFUSA') || 'SEMIFUSA', '23'],
					]), 'DURA')
					.appendField(new Blockly.FieldImage('img/blocks/tempo.png',24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);

		this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER_TIE'))
					.appendField(new Blockly.FieldCheckbox('FALSE'), 'TIE')
					.appendField(new Blockly.FieldImage('img/blocks/tie.png',24*options.zoom,24*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
		this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_BUZZER_TOOLTIP'));
			}
		};


		Blockly.Arduino.dyor_piezo_buzzer_notone = function() {
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE) || '';
			var code = '';

			if (profiles['processor']==='ESP32')
				{
					Facilino.PWMChannelsIDs[this.id]=pin;
					var unique = [];
					this.uniqueVariables = [];
					$.each(Object.values(Facilino.PWMChannelsIDs), function(i, el){
						if($.inArray(el, unique) === -1) unique.push(el);
					});
					var channel = unique.indexOf(pin);
					Blockly.Arduino.setups_['ledc_'+pin] = 'ledcSetup('+channel+',0,8);\n  ledcAttachPin('+pin+','+channel+');\n';
					code+='ledcWrite('+channel+',0);\n';
			}
			else
			{
				code+='noTone('+pin+');\n';
			}
			return code;
		};


		Blockly.Blocks.dyor_piezo_buzzer_notone = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUZZER'),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_piezo_buzzer_notone'),
			examples: ['dyor_piezo_buzzer_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_BUZZER,
			//dyor_piezo_buzzer initialization
			keys: ['LANG_PIEZO_BUZZER_NO_TONE_NAME','LANG_PIEZO_BUZZER','LANG_PIEZO_BUZZER_PIN','LANG_PIEZO_BUZZER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_BUZZER_NO_TONE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_BUZZER);
				this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER'))
					.appendField(new Blockly.FieldImage('img/blocks/buzzer.svg', 52*options.zoom, 35*options.zoom)).appendField('No tone');
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER_PIN')).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
				this.setInputsInline(true);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_BUZZER_TOOLTIP'));
			}
		};

		Blockly.Arduino.dyor_piezo_buzzer_predef_sounds = function() {
		//if (window.license===undefined || /^\s*$/.test(window.license)) return '//demo version\n';
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE) || '';
			var code= '';
			var pin='';
			if (profiles['processor']==='ESP32')
			{
				//Blockly.Arduino.setups_['setup_simpleexpressions_buzzer_'+pin]='ledcSetup(5,2000,8);\n  ledcAttachPin('+pin+',5);\n';
				Facilino.PWMChannelsIDs[this.id]=pin;
				var unique = [];
				this.uniqueVariables = [];
				$.each(Object.values(Facilino.PWMChannelsIDs), function(i, el){
					if($.inArray(el, unique) === -1) unique.push(el);
				});
				var channel = unique.indexOf(pin);
				Blockly.Arduino.setups_['ledc_'+pin] = 'ledcSetup('+channel+',0,8);\n  ledcAttachPin('+pin+','+channel+');\n';
				Blockly.Arduino.definitions_['define_adv_buzzer_tone']='void _tone(int channel, float noteFrequency, long noteDuration, int silentDuration){\nledcWriteTone(channel, noteFrequency);\n  delay(noteDuration);\n  ledcWrite(channel, 0);\n  delay(silentDuration);\n}\n';
				Blockly.Arduino.definitions_['define_simpleexpressions_buzzer_bendtones']='void bendTones (int channel, float initFrequency, float finalFrequency, float prop, long noteDuration, int silentDuration){\n  if(initFrequency < finalFrequency){\n	for (int i=initFrequency; i<finalFrequency; i=i*prop) {\n	  _tone(channel,i,noteDuration,silentDuration);\n	}\n  }  else{\n	for (int i=initFrequency; i>finalFrequency; i=i/prop) {\n	  _tone(channel,i,noteDuration,silentDuration);\n	}\n  }\n}\n';
				pin = channel+',';
			}
			else
			{
				Blockly.Arduino.definitions_['define_adv_buzzer_tone']='void _tone(int buzzerPin, float noteFrequency, long noteDuration, int silentDuration){\n  tone(buzzerPin, noteFrequency, noteDuration);\n  delay(noteDuration);\n  delay(silentDuration);\n}\n';
				Blockly.Arduino.definitions_['define_simpleexpressions_buzzer_bendtones']='void bendTones (int buzzerPin, float initFrequency, float finalFrequency, float prop, long noteDuration, int silentDuration){\n  if(initFrequency < finalFrequency){\n	for (int i=initFrequency; i<finalFrequency; i=i*prop) {\n	  _tone(buzzerPin,i,noteDuration,silentDuration);\n	}\n  }  else{\n	for (int i=initFrequency; i>finalFrequency; i=i/prop) {\n	  _tone(buzzerPin,i,noteDuration,silentDuration);\n}\n}\n}\n';
				pin = pin+',';
			}
			var option=this.getFieldValue('OPTION');
			if (option==='0')
				code+='_tone('+pin+'659.26,50,30);\n_tone('+pin+'1318.51,55,25);\n_tone('+pin+'1760,60,10);\n';
			else if (option==='1')
				code+='_tone('+pin+'659.26,50,30);\n_tone('+pin+'1760,55,25);\n_tone('+pin+'1318.51,50,10);\n';
			else if (option==='2')
				code+='bendTones('+pin+'1318.51, 1567.98, 1.03, 20, 2);\ndelay(30);\nbendTones('+pin+'1318.51, 2349.32, 1.04, 10, 2);\n';
			else if (option==='3')
				code+='bendTones('+pin+'1318.51, 1760, 1.02, 30, 10);\n';
			else if (option==='4')
				code+='bendTones('+pin+'1567.98, 2349.32, 1.03, 30, 10);\n';
			else if (option==='5')
				code+='_tone('+pin+'1318.51,50,100);\n_tone('+pin+'1567.98,50,80);\n_tone('+pin+'2349.32,300,1);\n';
			else if (option==='6')
				code+='bendTones('+pin+'800, 2150, 1.02, 10, 1);\nbendTones('+pin+'2149, 800, 1.03, 7, 1);\n';
			else if (option==='7')
				code+='bendTones('+pin+'880, 2000, 1.04, 8, 3);\ndelay(200);\nfor (int i=880; i<2000; i=i*1.04) {\n  _tone('+pin+'987.77,5,10);\n}\n';
			else if (option==='8')
				code+='bendTones('+pin+'1880, 3000, 1.03, 8, 3);\ndelay(200);\nfor (int i=1880; i<3000; i=i*1.03) {\n  _tone('+pin+'1046.5,10,10);\n}\n';
			else if (option==='9')
				code+='bendTones('+pin+'700, 900, 1.03, 16, 4);\nbendTones('+pin+'899, 650, 1.01, 18, 7);\n';
			else if (option==='10')
				code+='bendTones('+pin+'100, 500, 1.04, 10, 10);\ndelay(500);\nbendTones('+pin+'400, 100, 1.04, 10, 1);\n';
			else if (option==='11')
				code+='bendTones('+pin+'1500, 2500, 1.05, 20, 8);\nbendTones('+pin+'2499, 1500, 1.05, 25, 8);\n';
			else if (option==='12')
				code+='bendTones('+pin+'2000, 6000, 1.05, 8, 3);\ndelay(50);\nbendTones('+pin+'5999, 2000, 1.05, 13, 2);\n';
			else if (option==='13')
				code+='bendTones('+pin+'1500, 2000, 1.05, 15, 8);\ndelay(100);\nbendTones('+pin+'1900, 2500, 1.05, 10, 8);\n';
			else if (option==='14')
				code+='bendTones('+pin+'880, 669, 1.02, 20, 200);\n';
			else if (option==='15')
				code+='bendTones('+pin+'1000, 1700, 1.03, 8, 2);\nbendTones('+pin+'1699, 500, 1.04, 8, 3);\nbendTones('+pin+'1000, 1700, 1.05, 9, 10);\n';
			else if (option==='16')
				code+='bendTones('+pin+'1600, 3000, 1.02, 2, 15);\n';
			else if (option==='17')
				code+='bendTones('+pin+'2000, 6000, 1.02, 2, 20);\n';
			else if (option==='18')
				code+='bendTones('+pin+'1600, 4000, 1.02, 2, 20);\nbendTones('+pin+'4000, 3000, 1.02, 2, 20);\n';
			return code;
		};

		Blockly.Blocks.dyor_piezo_buzzer_predef_sounds = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUZZER'),
			tags: ['buzzer','sound'],
			helpUrl: Facilino.getHelpUrl('dyor_piezo_buzzer_predef_sounds'),
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_BUZZER,
			keys: ['LANG_PIEZO_BUZZER_PREDEF_SOUND_NAME','LANG_PIEZO_BUZZER','LANG_PIEZO_BUZZER_PIN','LANG_PIEZZO_BUZZER_PREDEF_CONNECTION','LANG_PIEZZO_BUZZER_PREDEF_DISCONNECTION','LANG_PIEZZO_BUZZER_PREDEF_BUTTON_PUSHED','LANG_PIEZZO_BUZZER_PREDEF_MODE1','LANG_PIEZZO_BUZZER_PREDEF_MODE2','LANG_PIEZZO_BUZZER_PREDEF_MODE3','LANG_PIEZZO_BUZZER_PREDEF_SURPRISE','LANG_PIEZZO_BUZZER_PREDEF_OHOOH','LANG_PIEZZO_BUZZER_PREDEF_OHOOH2','LANG_PIEZZO_BUZZER_PREDEF_CUDDLY','LANG_PIEZZO_BUZZER_PREDEF_SLEEPING','LANG_PIEZZO_BUZZER_PREDEF_HAPPY','LANG_PIEZZO_BUZZER_PREDEF_SUPER_HAPPY','LANG_PIEZZO_BUZZER_PREDEF_HAPPY_SHORT','LANG_PIEZZO_BUZZER_PREDEF_SAD','LANG_PIEZZO_BUZZER_PREDEF_CONFUSED','LANG_PIEZZO_BUZZER_PREDEF_FART1','LANG_PIEZZO_BUZZER_PREDEF_FART2','LANG_PIEZZO_BUZZER_PREDEF_FART3','LANG_PIEZO_BUZZER_PREDEF_SOUNDS_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_BUZZER_PREDEF_SOUND_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_BUZZER);
				this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER'))
					.appendField(new Blockly.FieldImage('img/blocks/buzzer.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('PIN').appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER_PIN')).appendField(new Blockly.FieldImage("img/blocks/pwm_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/speaker.svg', 20*options.zoom, 20*options.zoom))
					.appendField(new Blockly.FieldDropdown([
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_CONNECTION'), '0'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_DISCONNECTION'), '1'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_BUTTON_PUSHED'), '2'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_MODE1'), '3'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_MODE2'), '4'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_MODE3'), '5'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_SURPRISE'), '6'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_OHOOH'), '7'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_OHOOH2'), '8'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_CUDDLY'), '9'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_SLEEPING'),'10'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_HAPPY'),'11'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_SUPER_HAPPY'),'12'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_HAPPY_SHORT'),'13'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_SAD'),'14'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_CONFUSED'),'15'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_FART1'),'16'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_FART2'),'17'],
						[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_FART3'),'18']
					]), 'OPTION').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_BUZZER_PREDEF_SOUNDS_TOOLTIP'));
			}
		};
		
		if (window.FacilinoAdvanced===true)
		{

		Blockly.Arduino.zum_piezo_buzzerav = function() {
			if (window.license===undefined || /^\s*$/.test(window.license)) return '//demo version\n';
			var pin = Blockly.Arduino.valueToCode(this, 'PIN', Blockly.Arduino.ORDER_NONE) || '';
			var in1 = Blockly.Arduino.valueToCode(this, 'TONE', Blockly.Arduino.ORDER_ATOMIC);
			var in2 = Blockly.Arduino.valueToCode(this, 'DURA', Blockly.Arduino.ORDER_ATOMIC);
			var code = '';
			var pin='';
			if (profiles['processor']==='ESP32')
			{
				Facilino.PWMChannelsIDs[this.id]=pin;
				var unique = [];
				this.uniqueVariables = [];
				$.each(Object.values(Facilino.PWMChannelsIDs), function(i, el){
					if($.inArray(el, unique) === -1) unique.push(el);
				});
				var channel = unique.indexOf(pin);
				Blockly.Arduino.setups_['ledc_'+pin] = 'ledcSetup('+channel+',0,8);\n  ledcAttachPin('+pin+','+channel+');\n'
				if (this.getFieldValue('OPTION')!=='1')
				{
					Blockly.Arduino.definitions_['define_adv_buzzer_tone']='void _tone(int channel, float noteFrequency, long noteDuration, int silentDuration){\nledcWriteTone(channel, noteFrequency);\n  delay(noteDuration);\n  ledcWrite(channel, 0);\n  delay(silentDuration);\n}\n';
				}
				if (this.getFieldValue('OPTION')==='1')
				{
					Blockly.Arduino.definitions_['define_spacegun']='void spaceGun(int channel, int maximum)\n{\n  ledcSetup(channel,2000,8);\n  for (int i=0;i<maximum;i++){\n	ledcWrite(channel,255);\n	delayMicroseconds(i);\n	ledcWrite(channel,0);\n	delayMicroseconds(i);\n  }\n  ledcSetup(channel,0,8);\n}\n';
				}
				pin+=channel;
			}
			else
			{
				if (this.getFieldValue('OPTION')!=='1')
				{
					Blockly.Arduino.definitions_['define_adv_buzzer_tone']='void _tone(int buzzerPin, float noteFrequency, long noteDuration, int silentDuration){\n  tone(buzzerPin, noteFrequency, noteDuration);\n  delay(noteDuration);\n  delay(silentDuration);\n}\n';
				}
				else
				{
					Blockly.Arduino.definitions_['define_spacegun']='void spaceGun(int pin, int maximum)\n{\n  pinMode(pin,OUTPUT);\n  for (int i=0;i<maximum;i++){\n	digitalWrite(pin,HIGH);\n	delayMicroseconds(i);\n	digitalWrite(pin,LOW);\n	delayMicroseconds(i);\n  }\n  noTone(pin);\n}\n';
				}
				pin+=pin;
			}

			if (this.getFieldValue('OPTION')==='0')
			{
				code+='_tone('+pin+','+in1+','+in2+',0);\n';
			}
			else if (this.getFieldValue('OPTION')==='1')
			{
				code+='{\n  for (int nshot=0;nshot<'+in2+';nshot++){\n	spaceGun('+pin+',map(100-'+in1+',0,100,400,1000));\n	delay(50);\n  }\n}\n';
			}
			else if (this.getFieldValue('OPTION')==='2')
			{
				code+='{\n  int _maximum=map(100-'+in1+',0,100,50,300);\n  for (int nshot=0;nshot<'+in2+';nshot++){\n	_tone('+pin+',random(_maximum,10*_maximum),_maximum,1);\n	delay(50);\n}  \n}\n';
			}
			else if (this.getFieldValue('OPTION')==='3')
			{
				code+='{\n  for (int i='+in1+'; i<'+in2+'; i+=25){\n	_tone('+pin+',i,25,5);\n	}\n  }\n';
			}
			else if (this.getFieldValue('OPTION')==='4')
			{
				code+='{\n  for (int i='+in2+'; i>='+in1+'; i-=25){\n	_tone('+pin+',i,25,5);\n	}\n  }\n';
			}
			else if (this.getFieldValue('OPTION')==='5')
			{
				code+='{\n  for (float i='+in1+'; i<'+in2+'; i=i*1.02){\n	_tone('+pin+',i,25,5);\n	}\n  }\n';
			}
			else if (this.getFieldValue('OPTION')==='6')
			{
				code+='{\n  for (float i='+in2+'; i>='+in1+'; i=i/1.02){\n	_tone('+pin+',i,25,5);\n	}\n  }\n';
			}
			else if (this.getFieldValue('OPTION')==='7')
			{
				code+='{\n  for (int i='+in1+'; i<'+in2+'; i+=25){\n	_tone('+pin+',i,20,5);\n	}\n  for (int i='+in2+'; i>='+in1+'; i-=25){\n	_tone('+pin+',i,20,5);\n	}\n  }\n';
			}
			else if (this.getFieldValue('OPTION')==='8')
			{
				code+='{\n  for (float i='+in1+'; i<'+in2+'; i=i*1.02){\n	_tone('+pin+',i,20,5);\n	}\n  for (float i='+in2+'; i>='+in1+'; i=i/1.02){\n	_tone('+pin+',i,20,5);\n	}\n  }\n';
			}
			else if (this.getFieldValue('OPTION')==='9')
			{
				code+='{\n  long _fib['+in2+'];\n  long _fib1=1;\n  long _fib2=2;\n  for (int nshot=0;nshot<'+in2+';nshot++){\n	_fib[nshot]=_fib1+_fib2;\n	_fib1=_fib2;\n	_fib2=_fib[nshot];\n	_tone('+pin+',_fib[nshot],'+in1+',1);\n	delay(10);\n  }\n}\n';
			}
			else if (this.getFieldValue('OPTION')==='10')
			{
				code+='{\n  long _fib['+in2+'];\n  long _fib1=1;\n  long _fib2=2;\n  for (int nshot=0;nshot<'+in2+';nshot++){\n	_fib[nshot]=_fib1+_fib2;\n	_fib1=_fib2;\n	_fib2=_fib[nshot];\n}\n  for (int nshot=('+in2+'-1);nshot>=0;nshot--){\n	_tone('+pin+',_fib[nshot],'+in1+',1);\n	delay(10);\n}  \n}\n';
			}
			else if (this.getFieldValue('OPTION')==='11')
			{
				code+='_tone('+pin+',('+in1+')*pow(1.059463094359,('+in2+')),100,0);\n';
			}
			return code;
		};
		
		

		Blockly.Blocks.zum_piezo_buzzerav = {
			category: Facilino.locales.getKey('LANG_CATEGORY_SOUND'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_BUZZER'),
			tags: ['buzzer'],
			helpUrl: Facilino.getHelpUrl('zum_piezo_buzzerav'),
			examples: ['zum_piezo_buzzerav_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_BUZZER,
			keys: ['LANG_ZUM_PIEZO_BUZZERAV_NAME','LANG_ZUM_PIEZO_BUZZERAV','LANG_ZUM_PIEZO_BUZZERAV_PIN','LANG_ZUM_PIEZO_BUZZERAV_TONE','LANG_ZUM_PIEZO_BUZZERAV_DURATION','LANG_ZUM_PIEZO_BUZZERAV_TOOLTIP','LANG_PIEZZO_BUZZER_PREDEF_TONE','LANG_PIEZZO_BUZZER_PREDEF_SPACEGUN','LANG_PIEZZO_BUZZER_PREDEF_RANDOM','LANG_PIEZZO_BUZZER_PREDEF_INCREASING','LANG_PIEZZO_BUZZER_PREDEF_DECREASING','LANG_PIEZZO_BUZZER_PREDEF_LINEAR','LANG_PIEZZO_BUZZER_PREDEF_EXP','LANG_PIEZZO_BUZZER_PREDEF_SIREN','LANG_PIEZZO_BUZZER_PREDEF_FIBONACCI','LANG_PIEZZO_BUZZER_PREDEF_DISTANCE','LANG_PIEZZO_BUZZER_PREDEF_SPEED','LANG_PIEZZO_BUZZER_PREDEF_SHOTS','LANG_PIEZZO_BUZZER_PREDEF_TONES','LANG_PIEZZO_BUZZER_PREDEF_INITIAL','LANG_PIEZZO_BUZZER_PREDEF_FINAL','LANG_PIEZZO_BUZZER_PREDEF_MAX'],
			name: Facilino.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_BUZZER);
				this.appendValueInput('PIN')
					.appendField(Facilino.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV'))
					.appendField(new Blockly.FieldImage('img/blocks/buzzer.svg', 52*options.zoom, 35*options.zoom))
					.appendField(Facilino.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_PIN')).setCheck(['DigitalPin','PWMPin']);
				this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/speaker.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_TONE'), '0'],[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_SPACEGUN'), '1'],[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_RANDOM'), '2'],[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_INCREASING')+" "+Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_LINEAR'), '3'],[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_DECREASING')+" "+Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_LINEAR'), '4'],[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_INCREASING')+" "+Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_EXP'), '5'],[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_DECREASING')+" "+Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_EXP'), '6'],[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_SIREN')+"1", '7'],[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_SIREN')+"2", '8'],[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_INCREASING')+" "+Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_FIBONACCI'), '9'],[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_DECREASING')+" "+Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_FIBONACCI'), '10'],[Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_DISTANCE'), '11']]), 'OPTION').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('TONE')
					.setCheck([Number,'Variable'])
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField(Facilino.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_TONE'),'INP1');

				this.appendValueInput('DURA')
					.setCheck([Number,'Variable'])
					.setAlign(Blockly.ALIGN_RIGHT)
					.appendField(Facilino.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_DURATION'),'INP2');

				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_TOOLTIP'));
			},
			onchange: function()
			{
				if (this.getFieldValue('OPTION')==='0')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_TONE'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_DURATION'),'INP2');
				}
				else if (this.getFieldValue('OPTION')==='1')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_SPEED'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_SHOTS'),'INP2');
				}
				else if (this.getFieldValue('OPTION')==='2')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_SPEED'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_TONES'),'INP2');
				}
				else if (this.getFieldValue('OPTION')==='3')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_INITIAL'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_FINAL'),'INP2');
				}
				else if (this.getFieldValue('OPTION')==='4')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_INITIAL'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_FINAL'),'INP2');
				}
				else if (this.getFieldValue('OPTION')==='5')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_INITIAL'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_FINAL'),'INP2');
				}
				else if (this.getFieldValue('OPTION')==='6')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_INITIAL'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_FINAL'),'INP2');
				}
				else if (this.getFieldValue('OPTION')==='7')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_INITIAL'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_MAX'),'INP2');
				}
				else if (this.getFieldValue('OPTION')==='8')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_INITIAL'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_MAX'),'INP2');
				}
				else if (this.getFieldValue('OPTION')==='9')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_DURATION'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_TONES'),'INP2');
				}
				else if (this.getFieldValue('OPTION')==='10')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_ZUM_PIEZO_BUZZERAV_DURATION'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_TONES'),'INP2');
				}
				else if (this.getFieldValue('OPTION')==='11')
				{
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_INITIAL'),'INP1');
					this.setFieldValue(Facilino.locales.getKey('LANG_PIEZZO_BUZZER_PREDEF_DISTANCE'),'INP2');
				}
			}
		};
		
		}

		//if (options.voice)
		if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ATmega32U4'))
		{
	Blockly.Arduino.dyor_piezo_buzzer_voice = function() {
	if (window.license===undefined || /^\s*$/.test(window.license)) return '//demo version\n';
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
			examples: ['dyor_piezo_buzzer_voice_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_VOICE,
			keys: ['LANG_PIEZO_BUZZER_VOICE_NAME','LANG_PIEZO_BUZZER','LANG_PIEZO_BUZZER_VOICE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_BUZZER_VOICE_NAME'),
			//dyor_piezo_buzzer initialization
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_VOICE);
		this.appendDummyInput('')
					.appendField(Facilino.locales.getKey('LANG_PIEZO_BUZZER'))
					.appendField(new Blockly.FieldImage('img/blocks/buzzer.svg', 52*options.zoom, 35*options.zoom));
				this.appendValueInput('VOICE').appendField(new Blockly.FieldImage('img/blocks/voice.svg', 36*options.zoom, 36*options.zoom)).setCheck('Voice').setAlign(Blockly.ALIGN_RIGHT);
		this.setInputsInline(true);
		this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_PIEZO_BUZZER_VOICE_TOOLTIP'));
			}
		};

	Blockly.Arduino.dyor_piezo_buzzer_predef_voice = function() {
	if (window.license===undefined || /^\s*$/.test(window.license)) return '//demo version';
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
			examples: ['dyor_piezo_buzzer_voice_example.bly'],
			category_colour: Facilino.LANG_COLOUR_SOUND,
			colour: Facilino.LANG_COLOUR_SOUND_VOICE,
			keys: ['LANG_PIEZO_BUZZER_PREDEF_VOICE_NAME','LANG_PIEZO_BUZZER_PREDEF_VOICE_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_PIEZO_BUZZER_PREDEF_VOICE_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_SOUND_VOICE);
		this.appendDummyInput('')
					.appendField(new Blockly.FieldImage('img/blocks/voice.svg',36*options.zoom, 36*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);;
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
	
	var FacilinoBuzzer = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoBuzzer;
	} else {
		window.FacilinoBuzzer = FacilinoBuzzer;
	}
}));
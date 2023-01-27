(function(factory) {
	if (typeof define === 'function' && define.amd) {
		define(['underscore', 'blockly-bq', 'blockly.blocks'], factory);
	} else {
		factory(_, window.Blockly, window.Blocks);
	}
}(function(_, Blockly, Blocks) {
	var load = function(options) {
		
	{
		if (window.FacilinoAdvanced===true)
		{
			var robot_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_WALK');
			var robot_colour=Facilino.LANG_COLOUR_MOVEMENT_WALK;
		}
		else
		{
			var robot_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOT');
			var robot_colour=Facilino.LANG_COLOUR_MOVEMENT_ROBOTBASE;
		}
		
	Blockly.Blocks['HIPPIE_init'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: robot_subcategory,
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: robot_colour,
				helpUrl: Facilino.getHelpUrl('HIPPIE_init'),
				tags: [],
				examples: [],
				keys: ['LANG_HIPPIE_INIT_NAME','LANG_MOVEMENT_HIPPIE_ROBOT','LANG_MOVEMENT_HIPPIE_YR','LANG_MOVEMENT_HIPPIE_YL','LANG_MOVEMENT_HIPPIE_RR','LANG_MOVEMENT_HIPPIE_RL','LANG_MOVEMENT_HIPPIE_OFFSET','LANG_HIPPIE_INIT_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_HIPPIE_INIT_NAME'),
				init: function () {
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/hippie.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_HIPPIE_ROBOT'));
					this.appendValueInput('YR').appendField(new Blockly.FieldImage('img/blocks/hippie_YR.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_HIPPIE_YR')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
					this.appendValueInput('YL').appendField(new Blockly.FieldImage('img/blocks/hippie_YL.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_HIPPIE_YL')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
					this.appendValueInput('RR').appendField(new Blockly.FieldImage('img/blocks/hippie_RR.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_HIPPIE_RR')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
					this.appendValueInput('RL').appendField(new Blockly.FieldImage('img/blocks/hippie_RL.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_HIPPIE_RL')).appendField(new Blockly.FieldImage('img/blocks/digital_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck('DigitalPin');
					if (window.FacilinoAdvanced===true)
					{
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVEMENT_HIPPIE_OFFSET'));
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVEMENT_HIPPIE_YR')).appendField('+/-').appendField(new Blockly.FieldTextInput('0'), 'OYR').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVEMENT_HIPPIE_YL')).appendField('+/-').appendField(new Blockly.FieldTextInput('0'), 'OYL').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVEMENT_HIPPIE_RR')).appendField('+/-').appendField(new Blockly.FieldTextInput('0'), 'ORR').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVEMENT_HIPPIE_RL')).appendField('+/-').appendField(new Blockly.FieldTextInput('0'), 'ORL').setAlign(Blockly.ALIGN_RIGHT);
					}
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setInputsInline(false);
					this.setColour(robot_colour);
					this.setTooltip(Facilino.locales.getKey('LANG_HIPPIE_INIT_TOOLTIP'));
				},
			default_inputs: function()
				{
					var xml='';
					xml += '<value name="YR"><shadow type="pin_digital"></shadow></value>';
					if (Facilino.profiles.default.digital.length>1)
						xml+='<value name="YL"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
					else
						xml+='<value name="YL"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
					if (Facilino.profiles.default.digital.length>2)
						xml+='<value name="RR"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[2][1]+'</field></shadow></value>';
					else
						xml+='<value name="RR"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
					if (Facilino.profiles.default.digital.length>3)
						xml+='<value name="RL"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[3][1]+'</field></shadow></value>';
					else
						xml+='<value name="RL"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
					return xml;
				},
				isNotDuplicable: true
			};

			Blockly.Arduino['HIPPIE_init'] = function(block) {
				var code='';
				var input_YR = Blockly.Arduino.valueToCode(this,'YR',Blockly.Arduino.ORDER_NONE) || '26';
				var input_YL = Blockly.Arduino.valueToCode(this,'YL',Blockly.Arduino.ORDER_NONE) || '25';
				var input_RR = Blockly.Arduino.valueToCode(this,'RR',Blockly.Arduino.ORDER_NONE) || '17';
				var input_RL = Blockly.Arduino.valueToCode(this,'RL',Blockly.Arduino.ORDER_NONE) || '16';
				var input_OYR = this.getFieldValue('OYR') || '0';
				var input_OYL = this.getFieldValue('OYL') || '0';
				var input_ORR = this.getFieldValue('ORR') || '0';
				var input_ORL = this.getFieldValue('ORL') || '0';

				if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
				{
					Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
					Blockly.Arduino.definitions_['declare_var_servo_'+input_YR]=JST['servo_definitions_variables']({pin: input_YR});
					Blockly.Arduino.definitions_['declare_var_servo_'+input_YL]=JST['servo_definitions_variables']({pin: input_YL});
					Blockly.Arduino.definitions_['declare_var_servo_'+input_RR]=JST['servo_definitions_variables']({pin: input_RR});
					Blockly.Arduino.definitions_['declare_var_servo_'+input_RL]=JST['servo_definitions_variables']({pin: input_RL});
					Blockly.Arduino.definitions_['declare_var_DEG2GRAD']='#ifndef DEG2RAD\n  #define DEG2RAD(g) ((g)*M_PI)/180\n#endif\n';
					Blockly.Arduino.definitions_['declare_var_RAD2DEG']='#ifndef RAD2DEG\n  #define RAD2DEG(g) ((g)*180)/M_PI\n#endif\n';
				}
				else if (Facilino.profiles['processor']==='ESP32')
				{
					Blockly.Arduino.definitions_['include_servo'] = '#include <ESP32Servo.h>';
					Blockly.Arduino.definitions_['declare_var_servo_'+input_YR]=JST['ESP_servo_definitions_variables']({pin: input_YR});
					Blockly.Arduino.definitions_['declare_var_servo_'+input_YL]=JST['ESP_servo_definitions_variables']({pin: input_YL});
					Blockly.Arduino.definitions_['declare_var_servo_'+input_RR]=JST['ESP_servo_definitions_variables']({pin: input_RR});
					Blockly.Arduino.definitions_['declare_var_servo_'+input_RL]=JST['ESP_servo_definitions_variables']({pin: input_RL});
				}
				Blockly.Arduino.definitions_['declare_var_define_bPED_servos']='Servo* _bPED_servos[4]={&_servo'+input_YR+',&_servo'+input_YL+',&_servo'+input_RR+',&_servo'+input_RL+'};\n';
				Blockly.Arduino.definitions_['declare_var_define_bPED_servo_pins']='int _bPED_servo_pins[4]={'+input_YR+','+input_YL+','+input_RR+','+input_RL+'};\n';
				Blockly.Arduino.definitions_['declare_var_define_bPED_servo_offsets']='int _bPED_servo_offsets[4]={'+input_OYR+','+input_OYL+','+input_ORR+','+input_ORL+'};\n';
				Blockly.Arduino.definitions_['declare_var_define_bPED_servo_positions']='int _bPED_servo_positions[4]={90,90,90,90};\n';

				Blockly.Arduino.definitions_['bPED_moveServos']='void bPED_moveServos(int T, int  servo_target[]) {\n  unsigned long partial_time;\n  unsigned long final_time;\n  double increment[4];\n  double Ts=30.0;\n  double N=(T/Ts);\n  for (int i = 0; i < 4; i++){ \n	increment[i] = ((servo_target[i]) - _bPED_servo_positions[i])/N;\n	if (!_bPED_servos[i]->attached())\n	  _bPED_servos[i]->attach(_bPED_servo_pins[i]);\n  }\n  if(T>10){\n	for (int x=1;x<=(int)N;x++)\n	{\n	  for (int i = 0; i < 4; i++) _bPED_servos[i]->write(_bPED_servo_positions[i] + (x*increment[i])+_bPED_servo_offsets[i]);\n	  delay((int)Ts);\n	}\n  }\n  else\n  {\n	 for (int i = 0; i < 4; i++) _bPED_servos[i]->write(servo_target[i]+_bPED_servo_offsets[i]);\n	 delay((int)Ts);\n  }\n  for (int i = 0; i < 4; i++) _bPED_servo_positions[i] = servo_target[i];\n}\n';
				Blockly.Arduino.definitions_['bPED_oscillateServos']='void bPED_oscillateServos(int A[], int O[], int T, double P[], float cycle){\n  double pos;\n  double Ts=30.0;\n  double N=(T*cycle/Ts);\n  double inc = 6.283185307179586476925286766559/N;\n  double phase=0;\nfor (int i = 0; i < 4; i++){\n	if (!_bPED_servos[i]->attached())\n	  _bPED_servos[i]->attach(_bPED_servo_pins[i]);\n  }\n  for (int x=0;x<=(int)N;x++){\n	for (int i=0; i<4; i++) {\n	  pos = round(A[i]*sin(phase + P[i]) + O[i]);\n	  _bPED_servo_positions[i]=(int)(pos+90);\n	  _bPED_servos[i]->write(_bPED_servo_positions[i]+_bPED_servo_offsets[i]);\n	}\n	phase=phase+inc;\n	delay((int)Ts);\n  }\n}\n';
				Blockly.Arduino.definitions_['bPED_execute']='void bPED_execute(int A[], int O[], int T, double P[], int steps)\n{\n  float cycles=steps;\n  if (cycles >= 1)\n	for(int i = 0; i < cycles; i++)\n	  bPED_oscillateServos(A,O, T,P,cycles+0.5);\n  bPED_home(T);\n}\n';
				Blockly.Arduino.definitions_['bPED_home']='void bPED_home(int T)\n{\n  int home[4]={90,90,90,90};\n  bPED_moveServos(T,home);\n  for (int i = 0; i < 4; i++){if (_bPED_servos[i]->attached()) {_bPED_servos[i]->detach();}}\n}\n';

				Blockly.Arduino.setups_['movement_servo_move_' + input_YR] = JST['dyor_servo_setups']({'pin': input_YR});
				Blockly.Arduino.setups_['movement_servo_move_' + input_YL] = JST['dyor_servo_setups']({'pin': input_YL});
				Blockly.Arduino.setups_['movement_servo_move_' + input_RR] = JST['dyor_servo_setups']({'pin': input_RR});
				Blockly.Arduino.setups_['movement_servo_move_' + input_RL] = JST['dyor_servo_setups']({'pin': input_RL});

				return code;
			};

			Blockly.Arduino['HIPPIE_movement'] = function() {
				var code='';
				var movement = this.getFieldValue('MOVEMENT');
				Blockly.Arduino.definitions_['bPED_moveServos']='void bPED_moveServos(int T, int  servo_target[]) {\n  unsigned long partial_time;\n  unsigned long final_time;\n  double increment[4];\n  double Ts=30.0;\n  double N=(T/Ts);\n  for (int i = 0; i < 4; i++){ \n	increment[i] = ((servo_target[i]) - _bPED_servo_positions[i])/N;\n	if (!_bPED_servos[i]->attached())\n	  _bPED_servos[i]->attach(_bPED_servo_pins[i]);\n  }\n  if(T>10){\n	for (int x=1;x<=(int)N;x++)\n	{\n	  for (int i = 0; i < 4; i++) _bPED_servos[i]->write(_bPED_servo_positions[i] + (x*increment[i])+_bPED_servo_offsets[i]);\n	  delay((int)Ts);\n	}\n  }\n  else\n  {\n	 for (int i = 0; i < 4; i++) _bPED_servos[i]->write(servo_target[i]+_bPED_servo_offsets[i]);\n	 delay((int)Ts);\n  }\n  for (int i = 0; i < 4; i++) _bPED_servo_positions[i] = servo_target[i];\n}\n';
				Blockly.Arduino.definitions_['bPED_oscillateServos']='void bPED_oscillateServos(int A[], int O[], int T, double P[], float cycle){\n  double pos;\n  double Ts=30.0;\n  double N=(T*cycle/Ts);\n  double inc = 6.283185307179586476925286766559/N;\n  double phase=0;\nfor (int i = 0; i < 4; i++){\n	if (!_bPED_servos[i]->attached())\n	  _bPED_servos[i]->attach(_bPED_servo_pins[i]);\n  }\n  for (int x=0;x<=(int)N;x++){\n	for (int i=0; i<4; i++) {\n	  pos = round(A[i]*sin(phase + P[i]) + O[i]);\n	  _bPED_servo_positions[i]=(int)(pos+90);\n	  _bPED_servos[i]->write(_bPED_servo_positions[i]+_bPED_servo_offsets[i]);\n	}\n	phase=phase+inc;\n	delay((int)Ts);\n  }\n}\n';
				Blockly.Arduino.definitions_['bPED_execute']='void bPED_execute(int A[], int O[], int T, double P[], int steps)\n{\n  float cycles=steps;\n  if (cycles >= 1)\n	for(int i = 0; i < cycles; i++)\n	  bPED_oscillateServos(A,O,T/steps,P,cycles+0.5);\n  bPED_home(T);\n}\n';
				Blockly.Arduino.definitions_['bPED_home']='void bPED_home(int T)\n{\n  int home[4]={90,90,90,90};\n  bPED_moveServos(T,home);\n  for (int i = 0; i < 4; i++){if (_bPED_servos[i]->attached()) {_bPED_servos[i]->detach();}}\n}\n';

				if (movement==='0')
				{
					code+='bPED_home(1000);\n';
				}
				else if (movement==='1')
				{
					Blockly.Arduino.definitions_['bPED_droop']='void bPED_droop(int steps, int T)\n{\n  T=1000-map(T,0,100,200,800);\n  int droop[4]={90,90,160,15};\n  for (int i=0;i<steps;i++){\n	bPED_moveServos(T,droop);\n	bPED_home(1000);\n  }\n}\n';
					code+='bPED_droop(1,50);\n';
				}
				else if (movement==='2')
				{
					Blockly.Arduino.definitions_['bPED_walk']='void bPED_walk(int steps, int T, int dir)\n{\n  T=1500-map(T,0,100,300,1200);\n  int walk_A[4]= {15, 15, 50, 50};\n  int walk_O[4] = {0, 0, -10, 10};\n  double walk_P[4] = {0, 0, dir*DEG2RAD(-90), dir*DEG2RAD(-90)};\n  bPED_execute(walk_A,walk_O,T*steps,walk_P,steps);\n}\n';
					code+='bPED_walk(2,50,1);\n';
				}
				else if (movement==='3')
				{
					Blockly.Arduino.definitions_['bPED_walk']='void bPED_walk(int steps, int T, int dir)\n{\n  T=1500-map(T,0,100,300,1200);\n  int walk_A[4]= {15, 15, 50, 50};\n  int walk_O[4] = {0, 0, -10, 10};\n  double walk_P[4] = {0, 0, dir*DEG2RAD(-90), dir*DEG2RAD(-90)};\n  bPED_execute(walk_A,walk_O, T*steps, walk_P,steps);\n}\n';
					code+='bPED_walk(2,50,-1);\n';
				}
				else if (movement==='4')
				{
					Blockly.Arduino.definitions_['bPED_turn']='void bPED_turn(int steps, int T, int dir)\n{\n  T=1200-map(T,0,100,300,900);\n  int turn_A[4]= {15-dir*10, 15+dir*10, 50, 50};\n  int turn_O[4] = {0, 0, -10, 10};\n  double turn_P[4] = {0, 0, DEG2RAD(-90), DEG2RAD(-90)};\n  bPED_execute(turn_A,turn_O, T*steps,turn_P,steps);\n}\n';
					code+='bPED_turn(2,50,1);\n';
				}
				else if (movement==='5')
				{
					Blockly.Arduino.definitions_['bPED_turn']='void bPED_turn(int steps, int T, int dir)\n{\n  T=1200-map(T,0,100,300,900);\n  int turn_A[4]= {15-dir*10, 15+dir*10, 50, 50};\n  int turn_O[4] = {0, 0, -10, 10};\n  double turn_P[4] = {0, 0, DEG2RAD(-90), DEG2RAD(-90)};\n  bPED_execute(turn_A,turn_O, T*steps,turn_P,steps);\n}\n';
					code+='bPED_turn(2,50,-1);\n';
				}
				else if (movement==='6')
				{
					Blockly.Arduino.definitions_['bPED_bend']='void bPED_bend(int steps, int T, int dir){\n  T=2400-map(T,0,100,600,1800);\n  int bend[4]={90, 90, 90, 145};\n  int T2=T-300;\n  if(dir==-1){\n	bend[2]=35;\n	bend[3]=90;\n  }\n  if (T>=300){\n	int T2=T-300;\n	for (int i=0;i<steps;i++)\n	{\n	  bPED_moveServos(T2/2,bend);\n	  delay(T2/2);\n	  bPED_home(300);\n	}\n  }\n}\n';
					code+='bPED_bend(1,50,1);\n';
				}
				else if (movement==='7')
				{
					Blockly.Arduino.definitions_['bPED_bend']='void bPED_bend(int steps, int T, int dir){\n  T=2400-map(T,0,100,600,1800);\n  int bend[4]={90, 90, 90, 145};\n  int T2=T-300;\n  if(dir==-1){\n	bend[2]=35;\n	bend[3]=90;\n  }\n  if (T>=300){\n	int T2=T-300;\n	for (int i=0;i<steps;i++)\n	{\n	  bPED_moveServos(T2/2,bend);\n	  delay(T2/2);\n	  bPED_home(300);\n	}\n  }\n}\n';
					code+='bPED_bend(1,50,-1);\n';
				}
				else if (movement==='8')
				{
					Blockly.Arduino.definitions_['bPED_shakeLeg']='void bPED_shakeLeg(int steps,int T,int dir){\n  T=4600-map(T,0,100,600,4000);\n  int numberLegMoves=4;\n  int shake_leg0[4]={90, 90, 90, 140};\n  int shake_leg01[4]={90, 90, 150, 140};\n  int shake_leg1[4]={90, 90, 150, 40};\n  int shake_leg2[4]={90, 90, 150, 140};\n  int shake_leg3[4]={90, 90, 150, 40};\n  if(dir==-1)\n  {\nshake_leg0[2]=40;\n	shake_leg0[3]=90;\n	shake_leg01[2]=40;\n	shake_leg01[3]=50;\n	shake_leg1[2]=40;\n	shake_leg1[3]=50;\n	shake_leg2[2]=140;\n	shake_leg2[3]=50;\n	shake_leg3[2]=40;\n	shake_leg3[3]=50;\n  }\n  int T2=1000;\n  T=T-T2;\n  T=max(T,200*numberLegMoves);\n  for (int j=0; j<steps;j++)\n  {\n	bPED_moveServos(T2/2,shake_leg0);\n	bPED_moveServos(T2/2,shake_leg01);\n	bPED_moveServos(T2/2,shake_leg1);\n	bPED_moveServos(T2/2,shake_leg2);\n	for (int i=0;i<numberLegMoves;i++)\n	{\n	bPED_moveServos(T/(2*numberLegMoves),shake_leg3);\n	bPED_moveServos(T/(2*numberLegMoves),shake_leg2);\n	}\n	bPED_home(300);\n  }\n  delay(T);\n}\n';
					code+='bPED_shakeLeg(1,50,1);\n';
				}
				else if (movement==='9')
				{
					Blockly.Arduino.definitions_['bPED_shakeLeg']='void bPED_shakeLeg(int steps,int T,int dir){\n  T=4600-map(T,0,100,600,4000);\n  int numberLegMoves=4;\n  int shake_leg0[4]={90, 90, 90, 140};\n  int shake_leg01[4]={90, 90, 150, 140};\n  int shake_leg1[4]={90, 90, 150, 40};\n  int shake_leg2[4]={90, 90, 150, 140};\n  int shake_leg3[4]={90, 90, 150, 40};\n  if(dir==-1)\n  {\nshake_leg0[2]=40;\n	shake_leg0[3]=90;\n	shake_leg01[2]=40;\n	shake_leg01[3]=50;\n	shake_leg1[2]=40;\n	shake_leg1[3]=50;\n	shake_leg2[2]=140;\n	shake_leg2[3]=50;\n	shake_leg3[2]=40;\n	shake_leg3[3]=50;\n  }\n  int T2=1000;\n  T=T-T2;\n  T=max(T,200*numberLegMoves);\n  for (int j=0; j<steps;j++)\n  {\n	bPED_moveServos(T2/2,shake_leg0);\n	bPED_moveServos(T2/2,shake_leg01);\n	bPED_moveServos(T2/2,shake_leg1);\n	bPED_moveServos(T2/2,shake_leg2);\n	for (int i=0;i<numberLegMoves;i++)\n	{\n	bPED_moveServos(T/(2*numberLegMoves),shake_leg3);\n	bPED_moveServos(T/(2*numberLegMoves),shake_leg2);\n	}\n	bPED_home(300);\n  }\n  delay(T);\n}\n';
					code+='bPED_shakeLeg(1,50,-1);\n';
				}
				else if (movement==='10')
				{
					Blockly.Arduino.definitions_['bPED_up_down']='void bPED_up_down(int steps, int T, int height)\n{\n  T=1600-map(T,0,100,600,1000);\n  int angle=map(height,0,100,25,65);\n  int up_down[4]= {90, 90, 90-angle, 90+angle};\n  if (T>=400){\n	int T2=T-300;\n	for (int i=0;i<steps;i++)\n	{\n	  bPED_moveServos(T2/2,up_down);\n	  delay(T2/2);\n	  bPED_home(300);\n	}\n  }\n}\n';
					code+='bPED_up_down(1,50,50);\n';
				}
				else if (movement==='11')
				{
					Blockly.Arduino.definitions_['bPED_swing']='void bPED_swing(int steps, int T, int angle)\n{\n  T=1600-map(T,0,100,600,1000);\n  angle=map(angle,0,100,15,45);\n  int swing_A[4]= {0, 0, angle, angle};\n  int swing_O[4] = {0, 0, angle/2-20, -angle/2+20};\n  double swing_P[4] = {0, 0, DEG2RAD(0), DEG2RAD(0)};\n  bPED_execute(swing_A,swing_O,T,swing_P,steps);\n}\n';
					code+='bPED_swing(2,50,50);\n';
				}
				else if (movement==='12')
				{
					Blockly.Arduino.definitions_['bPED_tiptoeSwing']='void bPED_tiptoeSwing(int steps, int T, int angle)\n{\n  T=1500-map(T,0,100,300,1200);\n  angle=map(angle,0,100,10,30);\n  int tiptoeSwing_A[4]= {angle, angle, 0, 0};\n  int tiptoeSwing_O[4] = {0, 0,0,0};\n  double tiptoeSwing_P[4] = {0, 0, 0, 0};\n  bPED_execute(tiptoeSwing_A,tiptoeSwing_O,T,tiptoeSwing_P,steps);\n}\n';
					code+='bPED_tiptoeSwing(2,50,50);\n';
				}
				else if (movement==='13')
				{
					Blockly.Arduino.definitions_['bPED_jitter']='void bPED_jitter(int steps, int T, int angle)\n{\n  T=400-map(T,0,100,100,300);\n  angle=map(angle,0,100,10,30);\n  int jitter_A[4]= {angle, angle, 0, 0};\n  int jitter_O[4] = {0, 0, 0, 0};\n  double jitter_P[4] = {DEG2RAD(-90), DEG2RAD(90), 0, 0};\n  bPED_execute(jitter_A,jitter_O,T,jitter_P,steps);\n  delay(T);\n}\n';
					code+='bPED_jitter(8,50,50);\n';
				}
				else if (movement==='14')
				{
					Blockly.Arduino.definitions_['bPED_excited']='void bPED_excited(int steps, int T, int angle)\n{\n  T=1600-map(T,0,100,400,1200);\n  angle=map(angle,0,100,5,20);\n  int excited_A[4]= {angle, angle, angle, angle};\n  int excited_O[4] = {0, 0, angle-40, -angle+40};\n  double excited_P[4] = {DEG2RAD(-90), DEG2RAD(90), DEG2RAD(-90), DEG2RAD(90)};\n  bPED_execute(excited_A,excited_O,T,excited_P,steps);\n}\n';
					code+='bPED_excited(1,50,50);\n';
				}
				else if (movement==='15')
				{
					Blockly.Arduino.definitions_['bPED_moonwalker']='void bPED_moonwalker(int steps, int T, int angle, int dir)\n{\n  T=1800-map(T,0,100,600,1200);\n  angle=map(angle,0,100,15,30);\n  int moonwalker_A[4]= {0, 0, angle, angle};\n  int moonwalker_O[4] = {0, 0, angle/2-20, -angle/2+20};\n  int phi = -dir * 90;\n  double moonwalker_P[4] = {0, 0, DEG2RAD(phi), DEG2RAD(-60 * dir + phi)};\n  bPED_execute(moonwalker_A,moonwalker_O,T,moonwalker_P,steps);\n}\n';
					code+='bPED_moonwalker(2,50,50,1);\n';
				}
				else if (movement==='16')
				{
					Blockly.Arduino.definitions_['bPED_moonwalker']='void bPED_moonwalker(int steps, int T, int angle, int dir)\n{\n  T=1800-map(T,0,100,600,1200);\n  angle=map(angle,0,100,15,30);\n  int moonwalker_A[4]= {0, 0, angle, angle};\n  int moonwalker_O[4] = {0, 0, angle/2-20, -angle/2+20};\n  int phi = -dir * 90;\n  double moonwalker_P[4] = {0, 0, DEG2RAD(phi), DEG2RAD(-60 * dir + phi)};\n  bPED_execute(moonwalker_A,moonwalker_O,T,moonwalker_P,steps);\n}\n';
					code+='bPED_moonwalker(2,50,50,-1);\n';
				}
				else if (movement==='17')
				{
					Blockly.Arduino.definitions_['bPED_crusaito']='void bPED_crusaito(int steps, int T, int angle, int dir)\n{\n  T=1800-map(T,0,100,600,1200);\n  angle=map(angle,0,100,5,30);\n  int crusaito_A[4]= {25, 25, angle+10, angle+10};\n  int crusaito_O[4] = {0, 0, angle/2-20, -angle/2+20};\n  double crusaito_P[4] = {90, 90, DEG2RAD(0), DEG2RAD(-60 * dir)};\n  bPED_execute(crusaito_A,crusaito_O,T,crusaito_P,steps);\n}\n';
					code+='bPED_crusaito(2,50,50,1);\n';
				}
				else if (movement==='18')
				{
					Blockly.Arduino.definitions_['bPED_crusaito']='void bPED_crusaito(int steps, int T, int angle, int dir)\n{\n  T=1800-map(T,0,100,600,1200);\n  angle=map(angle,0,100,5,30);\n  int crusaito_A[4]= {25, 25, angle+10, angle+10};\n  int crusaito_O[4] = {0, 0, angle/2-20, -angle/2+20};\n  double crusaito_P[4] = {90, 90, DEG2RAD(0), DEG2RAD(-60 * dir)};\n  bPED_execute(crusaito_A,crusaito_O,T,crusaito_P,steps);\n}\n';
					code+='bPED_crusaito(2,50,50,-1);\n';
				}
				else if (movement==='19')
				{
					Blockly.Arduino.definitions_['bPED_flapping']='void bPED_flapping(int steps, int T, int angle, int dir)\n{\n  T=2000-map(T,0,100,500,1500);\n  angle=map(angle,0,100,10,20);\n  int flapping_A[4]= {20, 20, angle,angle};\n  int flapping_O[4] = {0, 0,angle - 40, -angle + 40};\n  double flapping_P[4] = {DEG2RAD(0), DEG2RAD(180), DEG2RAD(-90 * dir), DEG2RAD(90 * dir)};\n  bPED_execute(flapping_A,flapping_O,T,flapping_P,steps);\n}\n';
					code+='bPED_flapping(2,50,50,1);\n';
				}
				else if (movement==='20')
				{
					Blockly.Arduino.definitions_['bPED_flapping']='void bPED_flapping(int steps, int T, int angle, int dir)\n{\n  T=2000-map(T,0,100,500,1500);\n  angle=map(angle,0,100,10,20);\n  int flapping_A[4]= {20, 20, angle,angle};\n  int flapping_O[4] = {0, 0,angle - 40, -angle + 40};\n  double flapping_P[4] = {DEG2RAD(0), DEG2RAD(180), DEG2RAD(-90 * dir), DEG2RAD(90 * dir)};\n  bPED_execute(flapping_A,flapping_O,T,flapping_P,steps);\n}\n';
					code+='bPED_flapping(2,50,50,-1);\n';
				}
				return code;
			}

			Blockly.Blocks['HIPPIE_movement'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: robot_subcategory,
				tags: [],
				helpUrl: Facilino.getHelpUrl('HIPPIE_movement'),
				examples: [],
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: robot_colour,
				keys: ['LANG_HIPPIE_MOVEMENT_NAME','LANG_HIPPIE_MOVEMENT_HOME','LANG_HIPPIE_MOVEMENT_DROOP','LANG_HIPPIE_MOVEMENT_WALK','LANG_HIPPIE_MOVEMENT_TURN','LANG_HIPPIE_MOVEMENT_BEND','LANG_HIPPIE_MOVEMENT_SHAKE_LEG','LANG_HIPPIE_MOVEMENT_UPDOWN','LANG_HIPPIE_MOVEMENT_SWING','LANG_HIPPIE_MOVEMENT_TIPTOE_SWING','LANG_HIPPIE_MOVEMENT_JITTER','LANG_HIPPIE_MOVEMENT_EXCITED','LANG_HIPPIE_MOVEMENT_MOONWALKER','LANG_HIPPIE_MOVEMENT_CRUSAITO','LANG_HIPPIE_MOVEMENT_FLAPPING','LANG_HIPPIE_MOVEMENT','LANG_HIPPIE_MOVEMENT_MOVEMENT','LANG_HIPPIE_MOVEMENT_TOOLTIP','LANG_HIPPIE_MOVEMENT_FORWARD','LANG_HIPPIE_MOVEMENT_BACKWARD','LANG_HIPPIE_MOVEMENT_LEFT','LANG_HIPPIE_MOVEMENT_RIGHT'],
				name: Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_NAME'),
				init: function() {
					this.setColour(robot_colour);
					var movement = new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_HOME'),'0'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_DROOP'),'1'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_WALK')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_FORWARD'),'2'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_WALK')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_BACKWARD'),'3'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_TURN')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_LEFT'),'4'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_TURN')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_RIGHT'),'5'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_BEND')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_LEFT'),'6'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_BEND')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_RIGHT'),'7'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_SHAKE_LEG')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_LEFT'),'8'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_SHAKE_LEG')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_RIGHT'),'9'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_UPDOWN'),'10'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_SWING'),'11'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_TIPTOE_SWING'),'12'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_JITTER'),'13'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_EXCITED'),'14'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_MOONWALKER')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_LEFT'),'15'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_MOONWALKER')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_RIGHT'),'16'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_CRUSAITO')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_LEFT'),'17'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_CRUSAITO')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_RIGHT'),'18'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_FLAPPING')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_FORWARD'),'19'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_FLAPPING')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_BACKWARD'),'20']
					]);
				this.appendDummyInput().appendField(new Blockly.FieldImage('img/blocks/hippie.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT'));
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_MOVEMENT')).appendField(movement,'MOVEMENT').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
				this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_TOOLTIP'));
				},
				default_inputs: function ()
				{
					return ['<field name="MOVEMENT">0</field>','<field name="MOVEMENT">1</field>','<field name="MOVEMENT">2</field>','<field name="MOVEMENT">3</field>','<field name="MOVEMENT">4</field>','<field name="MOVEMENT">5</field>','<field name="MOVEMENT">6</field>','<field name="MOVEMENT">7</field>','<field name="MOVEMENT">8</field>','<field name="MOVEMENT">9</field>','<field name="MOVEMENT">10</field>','<field name="MOVEMENT">11</field>','<field name="MOVEMENT">12</field>','<field name="MOVEMENT">13</field>','<field name="MOVEMENT">14</field>','<field name="MOVEMENT">15</field>','<field name="MOVEMENT">16</field>','<field name="MOVEMENT">17</field>','<field name="MOVEMENT">18</field>','<field name="MOVEMENT">19</field>','<field name="MOVEMENT">20</field>'];
				}
			};

			if (window.FacilinoAdvanced===true)
			{
			Blockly.Arduino['HIPPIE_adv_movement'] = function() {
				var code='';
				var movement = this.getFieldValue('MOVEMENT');
				Blockly.Arduino.definitions_['bPED_moveServos']='void bPED_moveServos(int T, int  servo_target[]) {\n  unsigned long partial_time;\n  unsigned long final_time;\n  double increment[4];\n  double Ts=30.0;\n  double N=(T/Ts);\n  for (int i = 0; i < 4; i++){ \n	increment[i] = ((servo_target[i]) - _bPED_servo_positions[i])/N;\n	if (!_bPED_servos[i]->attached())\n	  _bPED_servos[i]->attach(_bPED_servo_pins[i]);\n  }\n  if(T>10){\n	for (int x=1;x<=(int)N;x++)\n	{\n	  for (int i = 0; i < 4; i++) _bPED_servos[i]->write(_bPED_servo_positions[i] + (x*increment[i])+_bPED_servo_offsets[i]);\n	  delay((int)Ts);\n	}\n  }\n  else\n  {\n	 for (int i = 0; i < 4; i++) _bPED_servos[i]->write(servo_target[i]+_bPED_servo_offsets[i]);\n	 delay((int)Ts);\n  }\n  for (int i = 0; i < 4; i++) _bPED_servo_positions[i] = servo_target[i];\n}\n';
				Blockly.Arduino.definitions_['bPED_oscillateServos']='void bPED_oscillateServos(int A[], int O[], int T, double P[], float cycle){\n  double pos;\n  double Ts=30.0;\n  double N=(T*cycle/Ts);\n  double inc = 6.283185307179586476925286766559/N;\n  double phase=0;\nfor (int i = 0; i < 4; i++){\n	if (!_bPED_servos[i]->attached())\n	  _bPED_servos[i]->attach(_bPED_servo_pins[i]);\n  }\n  for (int x=0;x<=(int)N;x++){\n	for (int i=0; i<4; i++) {\n	  pos = round(A[i]*sin(phase + P[i]) + O[i]);\n	  _bPED_servo_positions[i]=(int)(pos+90);\n	  _bPED_servos[i]->write(_bPED_servo_positions[i]+_bPED_servo_offsets[i]);\n	}\n	phase=phase+inc;\n	delay((int)Ts);\n  }\n}\n';
				Blockly.Arduino.definitions_['bPED_execute']='void bPED_execute(int A[], int O[], int T, double P[], int steps)\n{\n  float cycles=steps;\n  if (cycles >= 1)\n	for(int i = 0; i < cycles; i++)\n	  bPED_oscillateServos(A,O,T/steps,P,cycles+0.5);\n  bPED_home(T);\n}\n';
				Blockly.Arduino.definitions_['bPED_home']='void bPED_home(int T)\n{\n  int home[4]={90,90,90,90};\n  bPED_moveServos(T,home);\n  for (int i = 0; i < 4; i++){if (_bPED_servos[i]->attached()) {_bPED_servos[i]->detach();}}\n}\n';
				//console.log(movement);
				if (movement==='2')
				{
					Blockly.Arduino.definitions_['bPED_walk']='void bPED_walk(int steps, int T, int dir)\n{\n  T=1500-map(T,0,100,300,1200);\n  int walk_A[4]= {15, 15, 50, 50};\n  int walk_O[4] = {0, 0, -10, 10};\n  double walk_P[4] = {0, 0, dir*DEG2RAD(-90), dir*DEG2RAD(-90)};\n  bPED_execute(walk_A,walk_O,T*steps,walk_P,steps);\n}\n';
					code+='bPED_walk('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '2')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+',1);\n';
				}
				else if (movement==='3')
				{
					Blockly.Arduino.definitions_['bPED_walk']='void bPED_walk(int steps, int T, int dir)\n{\n  T=1500-map(T,0,100,300,1200);\n  int walk_A[4]= {15, 15, 50, 50};\n  int walk_O[4] = {0, 0, -10, 10};\n  double walk_P[4] = {0, 0, dir*DEG2RAD(-90), dir*DEG2RAD(-90)};\n  bPED_execute(walk_A,walk_O,T*steps,walk_P,steps);\n}\n';
					code+='bPED_walk('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '4')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+',-1);\n';
				}
				else if (movement==='4')
				{
					Blockly.Arduino.definitions_['bPED_turn']='void bPED_turn(int steps, int T, int dir)\n{\n  T=1200-map(T,0,100,300,900);\n  int turn_A[4]= {15-dir*10, 15+dir*10, 50, 50};\n  int turn_O[4] = {0, 0, -10, 10};\n  double turn_P[4] = {0, 0, DEG2RAD(-90), DEG2RAD(-90)};\n  bPED_execute(turn_A,turn_O, T*steps,turn_P,steps);\n}\n';
					code+='bPED_turn('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '2')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+',1);\n';
				}
				else if (movement==='5')
				{
					Blockly.Arduino.definitions_['bPED_turn']='void bPED_turn(int steps, int T, int dir)\n{\n  T=1200-map(T,0,100,300,900);\n  int turn_A[4]= {15-dir*10, 15+dir*10, 50, 50};\n  int turn_O[4] = {0, 0, -10, 10};\n  double turn_P[4] = {0, 0, DEG2RAD(-90), DEG2RAD(-90)};\n  bPED_execute(turn_A,turn_O, T*steps,turn_P,steps);\n}\n';
					code+='bPED_turn('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '2')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+',-1);\n';
				}
				else if (movement==='6')
				{
					Blockly.Arduino.definitions_['bPED_bend']='void bPED_bend(int steps, int T, int dir){\n  T=2400-map(T,0,100,600,1800);\n  int bend[4]={90, 90, 90, 145};\n  int T2=T-300;\n  if(dir==-1){\n	bend[2]=35;\n	bend[3]=90;\n  }\n  if (T>=300){\n	int T2=T-300;\n	for (int i=0;i<steps;i++)\n	{\n	  bPED_moveServos(T2/2,bend);\n	  delay(T2/2);\n	  bPED_home(300);\n	}\n  }\n}\n';
					code+='bPED_bend('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+',1);\n';
				}
				else if (movement==='7')
				{
					Blockly.Arduino.definitions_['bPED_bend']='void bPED_bend(int steps, int T, int dir){\n  T=2400-map(T,0,100,600,1800);\n  int bend[4]={90, 90, 90, 145};\n  int T2=T-300;\n  if(dir==-1){\n	bend[2]=35;\n	bend[3]=90;\n  }\n  if (T>=300){\n	int T2=T-300;\n	for (int i=0;i<steps;i++)\n	{\n	  bPED_moveServos(T2/2,bend);\n	  delay(T2/2);\n	  bPED_home(300);\n	}\n  }\n}\n';
					code+='bPED_bend('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+',-1);\n';
				}
				else if (movement==='8')
				{
					Blockly.Arduino.definitions_['bPED_shakeLeg']='void bPED_shakeLeg(int steps,int T,int dir){\n  T=4600-map(T,0,100,600,4000);\n  int numberLegMoves=4;\n  int shake_leg0[4]={90, 90, 90, 140};\n  int shake_leg01[4]={90, 90, 150, 140};\n  int shake_leg1[4]={90, 90, 150, 40};\n  int shake_leg2[4]={90, 90, 150, 140};\n  int shake_leg3[4]={90, 90, 150, 40};\n  if(dir==-1)\n  {\nshake_leg0[2]=40;\n	shake_leg0[3]=90;\n	shake_leg01[2]=40;\n	shake_leg01[3]=50;\n	shake_leg1[2]=40;\n	shake_leg1[3]=50;\n	shake_leg2[2]=140;\n	shake_leg2[3]=50;\n	shake_leg3[2]=40;\n	shake_leg3[3]=50;\n  }\n  int T2=1000;\n  T=T-T2;\n  T=max(T,200*numberLegMoves);\n  for (int j=0; j<steps;j++)\n  {\n	bPED_moveServos(T2/2,shake_leg0);\n	bPED_moveServos(T2/2,shake_leg01);\n	bPED_moveServos(T2/2,shake_leg1);\n	bPED_moveServos(T2/2,shake_leg2);\n	for (int i=0;i<numberLegMoves;i++)\n	{\n	bPED_moveServos(T/(2*numberLegMoves),shake_leg3);\n	bPED_moveServos(T/(2*numberLegMoves),shake_leg2);\n	}\n	bPED_home(300);\n  }\n  delay(T);\n}\n';
					code+='bPED_shakeLeg('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+',1);\n';
				}
				else if (movement==='9')
				{
					Blockly.Arduino.definitions_['bPED_shakeLeg']='void bPED_shakeLeg(int steps,int T,int dir){\n  T=4600-map(T,0,100,600,4000);\n  int numberLegMoves=4;\n  int shake_leg0[4]={90, 90, 90, 140};\n  int shake_leg01[4]={90, 90, 150, 140};\n  int shake_leg1[4]={90, 90, 150, 40};\n  int shake_leg2[4]={90, 90, 150, 140};\n  int shake_leg3[4]={90, 90, 150, 40};\n  if(dir==-1)\n  {\nshake_leg0[2]=40;\n	shake_leg0[3]=90;\n	shake_leg01[2]=40;\n	shake_leg01[3]=50;\n	shake_leg1[2]=40;\n	shake_leg1[3]=50;\n	shake_leg2[2]=140;\n	shake_leg2[3]=50;\n	shake_leg3[2]=40;\n	shake_leg3[3]=50;\n  }\n  int T2=1000;\n  T=T-T2;\n  T=max(T,200*numberLegMoves);\n  for (int j=0; j<steps;j++)\n  {\n	bPED_moveServos(T2/2,shake_leg0);\n	bPED_moveServos(T2/2,shake_leg01);\n	bPED_moveServos(T2/2,shake_leg1);\n	bPED_moveServos(T2/2,shake_leg2);\n	for (int i=0;i<numberLegMoves;i++)\n	{\n	bPED_moveServos(T/(2*numberLegMoves),shake_leg3);\n	bPED_moveServos(T/(2*numberLegMoves),shake_leg2);\n	}\n	bPED_home(300);\n  }\n  delay(T);\n}\n';
					code+='bPED_shakeLeg('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+',-1);\n';
				}
				return code;
			}

			Blockly.Blocks['HIPPIE_adv_movement'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: robot_subcategory,
				tags: [],
				helpUrl: Facilino.getHelpUrl('HIPPIE_adv_movement'),
				examples: [],
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: robot_colour,
				keys: ['LANG_HIPPIE_ADV_MOVEMENT_NAME','LANG_HIPPIE_MOVEMENT_WALK','LANG_HIPPIE_MOVEMENT_TURN','LANG_HIPPIE_MOVEMENT_BEND','LANG_HIPPIE_MOVEMENT_SHAKE_LEG','LANG_HIPPIE_MOVEMENT','LANG_HIPPIE_MOVEMENT_MOVEMENT','LANG_HIPPIE_ADV_MOVEMENT_TOOLTIP','LANG_HIPPIE_MOVEMENT_STEPS','LANG_HIPPIE_MOVEMENT_SPEED','LANG_HIPPIE_MOVEMENT_FORWARD','LANG_HIPPIE_MOVEMENT_BACKWARD','LANG_HIPPIE_MOVEMENT_LEFT','LANG_HIPPIE_MOVEMENT_RIGHT'],
				name: Facilino.locales.getKey('LANG_HIPPIE_ADV_MOVEMENT_NAME'),
				init: function() {
					this.setColour(robot_colour);
					var movement = new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_WALK')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_FORWARD'),'2'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_WALK')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_BACKWARD'),'3'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_TURN')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_LEFT'),'4'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_TURN')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_RIGHT'),'5'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_BEND')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_LEFT'),'6'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_BEND')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_RIGHT'),'7'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_SHAKE_LEG')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_LEFT'),'8'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_SHAKE_LEG')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_RIGHT'),'9']
					]);
				this.appendDummyInput().appendField(new Blockly.FieldImage('img/blocks/hippie.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT'));
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_MOVEMENT')).appendField(movement,'MOVEMENT').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('INP1').setCheck(Number).appendField(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_STEPS'),'TEXT1').setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.appendValueInput('INP2').setCheck(Number).appendField(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_SPEED')+ ' [0~100%]','TEXT2').setAlign(Blockly.ALIGN_RIGHT).setCheck([Number,'Variable']);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setTooltip(Facilino.locales.getKey('LANG_HIPPIE_ADV_MOVEMENT_TOOLTIP'));
				},
				default_inputs: function()
				{
					return '<value name="INP1"><shadow type="math_number"><field name="NUM">4</field></shadow></value><value name="INP2"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
				}
			};

			Blockly.Arduino['HIPPIE_adv_movement2'] = function() {
				var code='';
				var movement = this.getFieldValue('MOVEMENT');
				Blockly.Arduino.definitions_['bPED_moveServos']='void bPED_moveServos(int T, int  servo_target[]) {\n  unsigned long partial_time;\n  unsigned long final_time;\n  double increment[4];\n  double Ts=30.0;\n  double N=(T/Ts);\n  for (int i = 0; i < 4; i++){ \n	increment[i] = ((servo_target[i]) - _bPED_servo_positions[i])/N;\n	if (!_bPED_servos[i]->attached())\n	  _bPED_servos[i]->attach(_bPED_servo_pins[i]);\n  }\n  if(T>10){\n	for (int x=1;x<=(int)N;x++)\n	{\n	  for (int i = 0; i < 4; i++) _bPED_servos[i]->write(_bPED_servo_positions[i] + (x*increment[i])+_bPED_servo_offsets[i]);\n	  delay((int)Ts);\n	}\n  }\n  else\n  {\n	 for (int i = 0; i < 4; i++) _bPED_servos[i]->write(servo_target[i]+_bPED_servo_offsets[i]);\n	 delay((int)Ts);\n  }\n  for (int i = 0; i < 4; i++) _bPED_servo_positions[i] = servo_target[i];\n}\n';
				Blockly.Arduino.definitions_['bPED_oscillateServos']='void bPED_oscillateServos(int A[], int O[], int T, double P[], float cycle){\n  double pos;\n  double Ts=30.0;\n  double N=(T*cycle/Ts);\n  double inc = 6.283185307179586476925286766559/N;\n  double phase=0;\nfor (int i = 0; i < 4; i++){\n	if (!_bPED_servos[i]->attached())\n	  _bPED_servos[i]->attach(_bPED_servo_pins[i]);\n  }\n  for (int x=0;x<=(int)N;x++){\n	for (int i=0; i<4; i++) {\n	  pos = round(A[i]*sin(phase + P[i]) + O[i]);\n	  _bPED_servo_positions[i]=(int)(pos+90);\n	  _bPED_servos[i]->write(_bPED_servo_positions[i]+_bPED_servo_offsets[i]);\n	}\n	phase=phase+inc;\n	delay((int)Ts);\n  }\n}\n';
				Blockly.Arduino.definitions_['bPED_execute']='void bPED_execute(int A[], int O[], int T, double P[], int steps)\n{\n  float cycles=steps;\n  if (cycles >= 1)\n	for(int i = 0; i < cycles; i++)\n	  bPED_oscillateServos(A,O,T/steps,P,cycles+0.5);\n  bPED_home(T);\n}\n';
				Blockly.Arduino.definitions_['bPED_home']='void bPED_home(int T)\n{\n  int home[4]={90,90,90,90};\n  bPED_moveServos(T,home);\n  for (int i = 0; i < 4; i++){if (_bPED_servos[i]->attached()) {_bPED_servos[i]->detach();}}\n}\n';
				if (movement==='10')
				{
					Blockly.Arduino.definitions_['bPED_up_down']='void bPED_up_down(int steps, int T, int height)\n{\n  T=1600-map(T,0,100,600,1000);\n  int angle=map(height,0,100,25,65);\n  int up_down[4]= {90, 90, 90-angle, 90+angle};\n  if (T>=400){\n	int T2=T-300;\n	for (int i=0;i<steps;i++)\n	{\n	  bPED_moveServos(T2/2,up_down);\n	  delay(T2/2);\n	  bPED_home(300);\n	}\n  }\n}\n';
					code+='bPED_up_down('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+','+(Blockly.Arduino.valueToCode(this, 'INP3', Blockly.Arduino.ORDER_ATOMIC) || '50')+');\n';
				}
				else if (movement==='11')
				{
					Blockly.Arduino.definitions_['bPED_swing']='void bPED_swing(int steps, int T, int angle)\n{\n  T=1600-map(T,0,100,600,1000);\n  angle=map(angle,0,100,15,45);\n  int swing_A[4]= {0, 0, angle, angle};\n  int swing_O[4] = {0, 0, angle/2-20, -angle/2+20};\n  double swing_P[4] = {0, 0, DEG2RAD(0), DEG2RAD(0)};\n  bPED_execute(swing_A,swing_O,T,swing_P,steps);\n}\n';
					code+='bPED_swing('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+','+(Blockly.Arduino.valueToCode(this, 'INP3', Blockly.Arduino.ORDER_ATOMIC) || '50')+');\n';
				}
				else if (movement==='12')
				{
					Blockly.Arduino.definitions_['bPED_tiptoeSwing']='void bPED_tiptoeSwing(int steps, int T, int angle)\n{\n  T=1500-map(T,0,100,300,1200);\n  angle=map(angle,0,100,10,30);\n  int tiptoeSwing_A[4]= {angle, angle, 0, 0};\n  int tiptoeSwing_O[4] = {0, 0,0,0};\n  double tiptoeSwing_P[4] = {0, 0, 0, 0};\n  bPED_execute(tiptoeSwing_A,tiptoeSwing_O,T,tiptoeSwing_P,steps);\n}\n';
					code+='bPED_tiptoeSwing('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+','+(Blockly.Arduino.valueToCode(this, 'INP3', Blockly.Arduino.ORDER_ATOMIC) || '50')+');\n';
				}
				else if (movement==='13')
				{
					Blockly.Arduino.definitions_['bPED_jitter']='void bPED_jitter(int steps, int T, int angle)\n{\n  T=400-map(T,0,100,100,300);\n  angle=map(angle,0,100,10,30);\n  int jitter_A[4]= {angle, angle, 0, 0};\n  int jitter_O[4] = {0, 0, 0, 0};\n  double jitter_P[4] = {DEG2RAD(-90), DEG2RAD(90), 0, 0};\n  bPED_execute(jitter_A,jitter_O,T,jitter_P,steps);\n  delay(T);\n}\n';
					code+='bPED_jitter('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+','+(Blockly.Arduino.valueToCode(this, 'INP3', Blockly.Arduino.ORDER_ATOMIC) || '50')+');\n';
				}
				else if (movement==='14')
				{
					Blockly.Arduino.definitions_['bPED_excited']='void bPED_excited(int steps, int T, int angle)\n{\n  T=1600-map(T,0,100,400,1200);\n  angle=map(angle,0,100,5,20);\n  int excited_A[4]= {angle, angle, angle, angle};\n  int excited_O[4] = {0, 0, angle-40, -angle+40};\n  double excited_P[4] = {DEG2RAD(-90), DEG2RAD(90), DEG2RAD(-90), DEG2RAD(90)};\n  bPED_execute(excited_A,excited_O,T,excited_P,steps);\n}\n';
					code+='bPED_excited('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+','+(Blockly.Arduino.valueToCode(this, 'INP3', Blockly.Arduino.ORDER_ATOMIC) || '50')+');\n';
				}
				else if (movement==='15')
				{
					Blockly.Arduino.definitions_['bPED_moonwalker']='void bPED_moonwalker(int steps, int T, int angle, int dir)\n{\n  T=1800-map(T,0,100,600,1200);\n  angle=map(angle,0,100,15,30);\n  int moonwalker_A[4]= {0, 0, angle, angle};\n  int moonwalker_O[4] = {0, 0, angle/2-20, -angle/2+20};\n  int phi = -dir * 90;\n  double moonwalker_P[4] = {0, 0, DEG2RAD(phi), DEG2RAD(-60 * dir + phi)};\n  bPED_execute(moonwalker_A,moonwalker_O,T,moonwalker_P,steps);\n}\n';
					code+='bPED_moonwalker('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+','+(Blockly.Arduino.valueToCode(this, 'INP3', Blockly.Arduino.ORDER_ATOMIC) || '50')+',1);\n';
				}
				else if (movement==='16')
				{
					Blockly.Arduino.definitions_['bPED_moonwalker']='void bPED_moonwalker(int steps, int T, int angle, int dir)\n{\n  T=1800-map(T,0,100,600,1200);\n  angle=map(angle,0,100,15,30);\n  int moonwalker_A[4]= {0, 0, angle, angle};\n  int moonwalker_O[4] = {0, 0, angle/2-20, -angle/2+20};\n  int phi = -dir * 90;\n  double moonwalker_P[4] = {0, 0, DEG2RAD(phi), DEG2RAD(-60 * dir + phi)};\n  bPED_execute(moonwalker_A,moonwalker_O,T,moonwalker_P,steps);\n}\n';
					code+='bPED_moonwalker('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+','+(Blockly.Arduino.valueToCode(this, 'INP3', Blockly.Arduino.ORDER_ATOMIC) || '50')+',-1);\n';
				}
				else if (movement==='17')
				{
					Blockly.Arduino.definitions_['bPED_crusaito']='void bPED_crusaito(int steps, int T, int angle, int dir)\n{\n  T=1800-map(T,0,100,600,1200);\n  angle=map(angle,0,100,5,30);\n  int crusaito_A[4]= {25, 25, angle+10, angle+10};\n  int crusaito_O[4] = {0, 0, angle/2-20, -angle/2+20};\n  double crusaito_P[4] = {90, 90, DEG2RAD(0), DEG2RAD(-60 * dir)};\n  bPED_execute(crusaito_A,crusaito_O,T,crusaito_P,steps);\n}\n';
					code+='bPED_crusaito('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+','+(Blockly.Arduino.valueToCode(this, 'INP3', Blockly.Arduino.ORDER_ATOMIC) || '50')+',1);\n';
				}
				else if (movement==='18')
				{
					Blockly.Arduino.definitions_['bPED_crusaito']='void bPED_crusaito(int steps, int T, int angle, int dir)\n{\n  T=1800-map(T,0,100,600,1200);\n  angle=map(angle,0,100,5,30);\n  int crusaito_A[4]= {25, 25, angle+10, angle+10};\n  int crusaito_O[4] = {0, 0, angle/2-20, -angle/2+20};\n  double crusaito_P[4] = {90, 90, DEG2RAD(0), DEG2RAD(-60 * dir)};\n  bPED_execute(crusaito_A,crusaito_O,T,crusaito_P,steps);\n}\n';
					code+='bPED_crusaito('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+','+(Blockly.Arduino.valueToCode(this, 'INP3', Blockly.Arduino.ORDER_ATOMIC) || '50')+',-1);\n';
				}
				else if (movement==='19')
				{
					Blockly.Arduino.definitions_['bPED_flapping']='void bPED_flapping(int steps, int T, int angle, int dir)\n{\n  T=2000-map(T,0,100,500,1500);\n  angle=map(angle,0,100,10,20);\n  int flapping_A[4]= {20, 20, angle,angle};\n  int flapping_O[4] = {0, 0,angle - 40, -angle + 40};\n  double flapping_P[4] = {DEG2RAD(0), DEG2RAD(180), DEG2RAD(-90 * dir), DEG2RAD(90 * dir)};\n  bPED_execute(flapping_A,flapping_O,T,flapping_P,steps);\n}\n';
					code+='bPED_flapping('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+','+(Blockly.Arduino.valueToCode(this, 'INP3', Blockly.Arduino.ORDER_ATOMIC) || '50')+',1);\n';
				}
				else if (movement==='20')
				{
					Blockly.Arduino.definitions_['bPED_flapping']='void bPED_flapping(int steps, int T, int angle, int dir)\n{\n  T=2000-map(T,0,100,500,1500);\n  angle=map(angle,0,100,10,20);\n  int flapping_A[4]= {20, 20, angle,angle};\n  int flapping_O[4] = {0, 0,angle - 40, -angle + 40};\n  double flapping_P[4] = {DEG2RAD(0), DEG2RAD(180), DEG2RAD(-90 * dir), DEG2RAD(90 * dir)};\n  bPED_execute(flapping_A,flapping_O,T,flapping_P,steps);\n}\n';
					code+='bPED_flapping('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '50')+','+(Blockly.Arduino.valueToCode(this, 'INP3', Blockly.Arduino.ORDER_ATOMIC) || '50')+',-1);\n';
				}
				return code;
			}

			Blockly.Blocks['HIPPIE_adv_movement2'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: robot_subcategory,
				tags: [],
				helpUrl: Facilino.getHelpUrl('HIPPIE_adv_movement2'),
				examples: [],
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: robot_colour,
				keys: ['LANG_HIPPIE_ADV_MOVEMENT_NAME','LANG_HIPPIE_MOVEMENT_UPDOWN','LANG_HIPPIE_MOVEMENT_SWING','LANG_HIPPIE_MOVEMENT_TIPTOE_SWING','LANG_HIPPIE_MOVEMENT_JITTER','LANG_HIPPIE_MOVEMENT_EXCITED','LANG_HIPPIE_MOVEMENT_MOONWALKER','LANG_HIPPIE_MOVEMENT_CRUSAITO','LANG_HIPPIE_MOVEMENT_FLAPPING','LANG_HIPPIE_MOVEMENT','LANG_HIPPIE_MOVEMENT_MOVEMENT','LANG_HIPPIE_ADV_MOVEMENT_TOOLTIP','LANG_HIPPIE_MOVEMENT_STEPS','LANG_HIPPIE_MOVEMENT_SPEED','LANG_HIPPIE_MOVEMENT_FORWARD','LANG_HIPPIE_MOVEMENT_BACKWARD','LANG_HIPPIE_MOVEMENT_LEFT','LANG_HIPPIE_MOVEMENT_RIGHT','LANG_HIPPIE_MOVEMENT_CONF'],
				name: Facilino.locales.getKey('LANG_HIPPIE_ADV_MOVEMENT_NAME'),
				init: function() {
					this.setColour(robot_colour);
					var movement = new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_UPDOWN'),'10'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_SWING'),'11'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_TIPTOE_SWING'),'12'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_JITTER'),'13'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_EXCITED'),'14'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_MOONWALKER')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_LEFT'),'15'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_MOONWALKER')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_RIGHT'),'16'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_CRUSAITO')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_LEFT'),'17'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_CRUSAITO')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_RIGHT'),'18'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_FLAPPING')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_FORWARD'),'19'],
					[Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_FLAPPING')+' '+Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_BACKWARD'),'20']
					]);
				this.appendDummyInput().appendField(new Blockly.FieldImage('img/blocks/hippie.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT'));
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_MOVEMENT')).appendField(movement,'MOVEMENT').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('INP1').setCheck([Number,'Variable']).appendField(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_STEPS'),'TEXT1').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('INP2').setCheck([Number,'Variable']).appendField(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_SPEED')+ ' [0~100%]','TEXT2').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('INP3').setCheck([Number,'Variable']).appendField(Facilino.locales.getKey('LANG_HIPPIE_MOVEMENT_CONF')+ ' [0~100%]','TEXT2').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setOutput(false);
				this.setTooltip(Facilino.locales.getKey('LANG_HIPPIE_ADV_MOVEMENT_TOOLTIP'));
				},
				default_inputs: function()
				{
					return '<value name="INP1"><shadow type="math_number"><field name="NUM">4</field></shadow></value><value name="INP2"><shadow type="math_number"><field name="NUM">50</field></shadow></value><value name="INP3"><shadow type="math_number"><field name="NUM">50</field></shadow></value>';
				}
			};

			/*Blockly.Blocks['LARS_init'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WALK'),
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: Facilino.LANG_COLOUR_MOVEMENT_WALK,
				helpUrl: Facilino.getHelpUrl('LARS_init'),
				tags: [],
				examples: [],
				keys: ['LANG_MOVEMENT_LARS_ROBOT','LANG_MOVEMENT_LARS_FRH','LANG_MOVEMENT_LARS_BRH','LANG_MOVEMENT_LARS_BLH','LANG_MOVEMENT_LARS_FLH','LANG_MOVEMENT_LARS_FRL','LANG_MOVEMENT_LARS_BRL','LANG_MOVEMENT_LARS_BLL','LANG_MOVEMENT_LARS_FLL','LANG_LARS_INIT_TOOLTIP'],
				init: function () {
					this.appendDummyInput('').appendField(new Blockly.FieldImage('img/blocks/LARS.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_ROBOT'));
					this.appendValueInput('FRH').appendField(new Blockly.FieldImage('img/blocks/LARS_FRH.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_FRH')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin','PWMPin']);
					this.appendValueInput('BRH').appendField(new Blockly.FieldImage('img/blocks/LARS_BRH.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_BRH')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin','PWMPin']);
					this.appendValueInput('BLH').appendField(new Blockly.FieldImage('img/blocks/LARS_BLH.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_BLH')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin','PWMPin']);
					this.appendValueInput('FLH').appendField(new Blockly.FieldImage('img/blocks/LARS_FLH.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_FLH')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin','PWMPin']);
					this.appendValueInput('FRL').appendField(new Blockly.FieldImage('img/blocks/LARS_FRL.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_FRL')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin','PWMPin']);
					this.appendValueInput('BRL').appendField(new Blockly.FieldImage('img/blocks/LARS_BRL.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_BRL')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin','PWMPin']);
					this.appendValueInput('BLL').appendField(new Blockly.FieldImage('img/blocks/LARS_BLL.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_BLL')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin','PWMPin']);
					this.appendValueInput('FLL').appendField(new Blockly.FieldImage('img/blocks/LARS_FLL.svg', 22*options.zoom, 22*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVEMENT_LARS_FLL')).appendField(new Blockly.FieldImage('img/blocks/pwm_signal.svg', 22*options.zoom, 22*options.zoom)).setAlign(Blockly.ALIGN_RIGHT).setCheck(['DigitalPin','PWMPin']);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setColour(Facilino.LANG_COLOUR_MOVEMENT_WALK);
					this.setTooltip(Facilino.locales.getKey('LANG_LARS_INIT_TOOLTIP'));
				},
				isNotDuplicable: true
			};

			Blockly.Arduino['LARS_init'] = function(block) {
			  var code='';
			  var input_FRH = Blockly.Arduino.valueToCode(this,'FRH',Blockly.Arduino.ORDER_ATOMIC) || '26';
			  var input_FLH = Blockly.Arduino.valueToCode(this,'FLH',Blockly.Arduino.ORDER_ATOMIC) || '25';
			  var input_BRH = Blockly.Arduino.valueToCode(this,'BRH',Blockly.Arduino.ORDER_ATOMIC) || '17';
			  var input_BLH = Blockly.Arduino.valueToCode(this,'BLH',Blockly.Arduino.ORDER_ATOMIC) || '16';
			  var input_FRL = Blockly.Arduino.valueToCode(this,'FRL',Blockly.Arduino.ORDER_ATOMIC) || '27';
			  var input_FLL = Blockly.Arduino.valueToCode(this,'FLL',Blockly.Arduino.ORDER_ATOMIC) || '5';
			  var input_BRL = Blockly.Arduino.valueToCode(this,'BRL',Blockly.Arduino.ORDER_ATOMIC) || '23';
			  var input_BLL = Blockly.Arduino.valueToCode(this,'BLL',Blockly.Arduino.ORDER_ATOMIC) || '13';
			  Blockly.Arduino.definitions_['define_lars_h'] = '#include <LARS.h>';
			  Blockly.Arduino.definitions_['declare_var_define_lars']='LARS lars;\n';
			  Blockly.Arduino.setups_['setup_lars_init'] = 'lars.init('+input_FRH+','+input_FLH+','+input_BRH+','+input_BLH+','+input_FRL+','+input_FLL+','+input_BRL+','+input_BLL+');\n';
			  return code;
			};

			Blockly.Arduino['LARS_movement'] = function() {
				var code='';
				var movement = this.getFieldValue('MOVEMENT');
				if (movement==='0')
					code+='lars.home();\n';
				else if (movement==='1')
					code+='lars.hello();\n';
				else if (movement==='2')
					code+='lars.wave('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+');\n';
				else if (movement==='3')
					code+='lars.turnL('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '600')+');\n';
				else if (movement==='4')
					code+='lars.turnR('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '600')+');\n';
				else if (movement==='5')
					code+='lars.moonwalk('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '5000')+');\n';
				else if (movement==='6')
					code+='lars.dance('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '600')+');\n';
				else if (movement==='7')
					code+='lars.upDown('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '5000')+');\n';
				else if (movement==='8')
					code+='lars.pushUp('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '600')+');\n';
				else if (movement==='9')
					code+='lars.walk('+this.getFieldValue('FIELD3')+','+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '800')+');\n';
				else if (movement==='10')
					code+='lars.omniWalk('+(Blockly.Arduino.valueToCode(this, 'INP1', Blockly.Arduino.ORDER_ATOMIC) || '1')+','+(Blockly.Arduino.valueToCode(this, 'INP2', Blockly.Arduino.ORDER_ATOMIC) || '800')+','+this.getFieldValue('FIELD3')+','+(Blockly.Arduino.valueToCode(this, 'INP4', Blockly.Arduino.ORDER_ATOMIC) || '0')+');\n';
				return code;
			}

			Blockly.Blocks['LARS_movement'] = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_WALK'),
				tags: [],
				helpUrl: Facilino.getHelpUrl('LARS_movement'),
				examples: [],
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: Facilino.LANG_COLOUR_MOVEMENT_WALK,
				keys: ['LANG_LARS_MOVEMENT_HOME','LANG_LARS_MOVEMENT_HELLO','LANG_LARS_MOVEMENT_WAVE','LANG_LARS_MOVEMENT_TURN_LEFT','LANG_LARS_MOVEMENT_TURN_RIGHT','LANG_LARS_MOVEMENT_MOONWALK','LANG_LARS_MOVEMENT_DANCE','LANG_LARS_MOVEMENT_UPDOWN','LANG_LARS_MOVEMENT_PUSHUP','LANG_LARS_MOVEMENT_WALK','LANG_LARS_MOVEMENT_OMNIWALK','LANG_LARS_MOVEMENT','LANG_LARS_MOVEMENT_MOVEMENT','LANG_LARS_MOVEMENT_TOOLTIP','LANG_LARS_MOVEMENT_LEG_NUMBER','LANG_LARS_MOVEMENT_STEPS','LANG_LARS_MOVEMENT_PERIOD','LANG_LARS_MOVEMENT_DIR','LANG_LARS_MOVEMENT_FORWARD','LANG_LARS_MOVEMENT_BACKWARD','LANG_LARS_MOVEMENT_YES','LANG_LARS_MOVEMENT_NO','LANG_LARS_MOVEMENT_SIDE','LANG_LARS_MOVEMENT_TURN_FACTOR'],
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_MOVEMENT_WALK);
					var movement = new Blockly.FieldDropdown([
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_HOME'),'0'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_HELLO'),'1'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_WAVE'),'2'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_TURN_LEFT'),'3'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_TURN_RIGHT'),'4'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_MOONWALK'),'5'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_DANCE'),'6'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_UPDOWN'),'7'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_PUSHUP'),'8'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_WALK'),'9'],
					[Facilino.locales.getKey('LANG_LARS_MOVEMENT_OMNIWALK'),'10']
					]);
				this.appendDummyInput().appendField(new Blockly.FieldImage('img/blocks/LARS.svg', 32*options.zoom, 32*options.zoom)).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT'));
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_MOVEMENT')).appendField(movement,'MOVEMENT').setAlign(Blockly.ALIGN_RIGHT);
				this.last_movement = -1;
				this._inp1_removed = true;
				this._inp2_removed = true;
				this._inp3_removed = true;
				this._inp4_removed = true;
				this.checkMovement();
				this.last_movement = this.getFieldValue('MOVEMENT');
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
				this.setOutput(false);
					this.setTooltip(Facilino.locales.getKey('LANG_LARS_MOVEMENT_TOOLTIP'));
				},
				checkMovement: function() {
				var _movement = this.getFieldValue('MOVEMENT');
					try {
							if (_movement<10)
							{
								this._inp4_removed=true;
								this.removeInput('INP4');
							}
					} catch (e) {}
					try {
							if (_movement<9)
							{
								this._inp3_removed=true;
								this.removeInput('INP3');
							}
					} catch (e) {}
					try {
							if (_movement<3)
							{
								this._inp2_removed=true;
								this.removeInput('INP2');
							}
					} catch (e) {}
					try {
						if (_movement<2)
							{
								this._inp1_removed=true;
								this.removeInput('INP1');
							}
					} catch (e) {}
					if ( _movement === '2') {
						if (this._inp1_removed)
						{
							this.appendValueInput('INP1').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_LEG_NUMBER'),'TEXT1').setAlign(Blockly.ALIGN_RIGHT);
							this._inp1_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_LEG_NUMBER'),'TEXT1');}catch (e) {}
					} else if (( _movement >= '3')&&( _movement <= '8')) {
						if (this._inp1_removed)
						{
							this.appendValueInput('INP1').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1').setAlign(Blockly.ALIGN_RIGHT);
							this._inp1_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1');}catch (e) {}
						if (this._inp2_removed)
						{
							this.appendValueInput('INP2').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD','TEXT2')).setAlign(Blockly.ALIGN_RIGHT);
							this._inp2_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD'),'TEXT2');}catch (e) {}
					} else if ( _movement === '9') {
						if (this._inp1_removed)
						{
							this.appendValueInput('INP1').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1').setAlign(Blockly.ALIGN_RIGHT);
							this._inp1_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1');}catch (e) {}
						if (this._inp2_removed)
						{
							this.appendValueInput('INP2').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD'),'TEXT2').setAlign(Blockly.ALIGN_RIGHT);
							this._inp2_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD'),'TEXT2');}catch (e) {}
						if (this._inp3_removed)
						{
							this.appendDummyInput('INP3').appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_DIR'),'TEXT3').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_LARS_MOVEMENT_FORWARD'),'0'],[Facilino.locales.getKey('LANG_LARS_MOVEMENT_BACKWARD'),'1']]),'FIELD3').setAlign(Blockly.ALIGN_RIGHT);
							this._inp3_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_DIR'),'TEXT3'); this.getInput('INP3').removeField('FIELD3'); this.getInput('INP3').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_LARS_MOVEMENT_FORWARD'),'0'],[Facilino.locales.getKey('LANG_LARS_MOVEMENT_BACKWARD'),'1']]),'FIELD3');}catch (e) {}
					}
					else if ( _movement === '10') {
						if (this._inp1_removed)
						{
							this.appendValueInput('INP1').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1').setAlign(Blockly.ALIGN_RIGHT);
							this._inp1_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_STEPS'),'TEXT1');}catch (e) {}
						if (this._inp2_removed)
						{
							this.appendValueInput('INP2').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD'),'TEXT2').setAlign(Blockly.ALIGN_RIGHT);
							this._inp2_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_PERIOD'),'TEXT2');}catch (e) {}
						if (this._inp3_removed)
						{
							this.appendDummyInput('INP3').appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_DIR'),'TEXT3').appendField(new Blockly.FieldDropdown([[Facilino.locales.getKey('LANG_LARS_MOVEMENT_YES'),'true'],[Facilino.locales.getKey('LANG_LARS_MOVEMENT_NO'),'false']]),'FIELD3').setAlign(Blockly.ALIGN_RIGHT);
							this._inp3_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_SIDE'),'TEXT3'); this.getInput('INP3').removeField('FIELD3'); this.getInput('INP3').appendField(new Blockly.FieldDropdown([['Yes','true'],['No','false']]),'FIELD3');}catch (e) {}
						if (this._inp4_removed)
						{
							this.appendValueInput('INP4').setCheck(Number).appendField(Facilino.locales.getKey('LANG_LARS_MOVEMENT_TURN_FACTOR'),'TEXT4').setAlign(Blockly.ALIGN_RIGHT);
							this._inp4_removed=false;
						}
						else
							try{this.setFieldValue(Facilino.locales.getKey('LANG_LARS_MOVEMENT_TURN_FACTOR'),'TEXT4');}catch (e) {}

					}
				},
				onchange: function() {
					if (this.getFieldValue('MOVEMENT') !== this.last_movement) {
						this.checkMovement();
						this.last_movement = this.getFieldValue('MOVEMENT');
					}
				}
			};*/
			}
		}
	}
	
	var FacilinoRobotWalk = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoRobotWalk;
	} else {
		window.FacilinoRobotWalk = FacilinoRobotWalk;
	}
}));
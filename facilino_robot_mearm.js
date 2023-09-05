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
			var robot_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ARM');
			var robot_colour=Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM;
		}
		else
		{
			var robot_subcategory=Facilino.locales.getKey('LANG_SUBCATEGORY_ROBOT');
			var robot_colour=Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM;
		}
		
		Blockly.Arduino.movement_move_arm_setup = function() {
			var code = '';
			Blockly.Arduino.definitions_['declare_var_move_mearm_define_joints'] = '#define JOINTS 3';
			
			for (var i=1;i<=3;i++)
			{
				var joint = Blockly.Arduino.valueToCode(this, 'JOINT'+i, Blockly.Arduino.ORDER_NONE);
				if (this.getInputTargetBlock('JOINT'+i)!==undefined)
				{
					if ((this.getInputTargetBlock('JOINT'+i).type==='pin_digital')||(this.getInputTargetBlock('JOINT'+i).type==='pin_pwm'))
					{
						if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
						{
							Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
							Blockly.Arduino.definitions_['declare_var_servo_'+joint]=JST['servo_definitions_variables']({pin: joint});
						}
						else if (Facilino.profiles['processor']==='ESP32')
						{
							Blockly.Arduino.definitions_['include_servo'] = '#include <ESP32Servo.h>';
							Blockly.Arduino.definitions_['declare_var_servo_'+joint]=JST['ESP_servo_definitions_variables']({pin: joint});
						}
						else
							Blockly.Arduino.definitions_['declare_var_servo_'+joint]=JST['servo_definitions_variables']({pin: joint});
					}
				}
			}
			
			Blockly.Arduino.definitions_['declare_var_move_mearm_define_robotservo_t'] = 'typedef struct { Servo* servo; uint8_t pin; double offset; double min_pos; double max_pos; bool attached;} RobotServo_t;\n';
			Blockly.Arduino.definitions_['declare_var_move_mearm_define_robotparams_t'] = 'typedef struct { double l0; double h1; double l1; double l2; double l3; double l3I; double l3O; double l4; double l5; double d5; } RobotParams_t;\n';
			Blockly.Arduino.definitions_['declare_var_move_mearm_define_robotposition_t'] = 'typedef struct { double x; double y; double z; } RobotPosition_t;\n';
			Blockly.Arduino.definitions_['declare_var_move_mearm_define_robotconf_t'] = 'typedef struct { double joint[JOINTS]; } RobotConf_t;\n';
			
			Blockly.Arduino.definitions_['declare_var_move_mearm_define_robotservos'] = 'RobotServo_t robotServos[JOINTS]={{&_servo'+Blockly.Arduino.valueToCode(this, 'JOINT1', Blockly.Arduino.ORDER_NONE)+','+Blockly.Arduino.valueToCode(this, 'JOINT1', Blockly.Arduino.ORDER_NONE)+','+this.getFieldValue('OJ1')+','+this.getFieldValue('J1MIN')+','+this.getFieldValue('J1MAX')+',false},{&_servo'+Blockly.Arduino.valueToCode(this, 'JOINT2', Blockly.Arduino.ORDER_NONE)+','+Blockly.Arduino.valueToCode(this, 'JOINT2', Blockly.Arduino.ORDER_NONE)+','+this.getFieldValue('OJ2')+','+this.getFieldValue('J2MIN')+','+this.getFieldValue('J2MAX')+',false},{&_servo'+Blockly.Arduino.valueToCode(this, 'JOINT3', Blockly.Arduino.ORDER_NONE)+','+Blockly.Arduino.valueToCode(this, 'JOINT3', Blockly.Arduino.ORDER_NONE)+','+this.getFieldValue('OJ3')+','+this.getFieldValue('J3MIN')+','+this.getFieldValue('J3MAX')+',false}};\n';
			Blockly.Arduino.definitions_['declare_var_move_mearm_define_robotparams'] = 'RobotParams_t params={5,64.5,15.1,80,80,23.9,35,80,52,5};\n';
			Blockly.Arduino.definitions_['declare_var_move_mearm_define_currentQ'] = 'RobotConf_t _currentQ={{90.0,90.0,90.0}};\n';
			Blockly.Arduino.definitions_['declare_var_move_mearm_define_currentPos'] = 'RobotPosition_t _currentPos={152.1,-5.0,144.5};\n';
			
			Blockly.Arduino.definitions_['meArm_writeServo']='void writeServo(RobotServo_t &servo, double angle)\n{\n  angle=constrain(angle+servo.offset,servo.min_pos,servo.max_pos);\n  if (!servo.attached)\n  {\n    servo.servo->attach(servo.pin,'+this.getFieldValue('SMIN')+','+this.getFieldValue('SMAX')+');\n    servo.attached=true;\n  }\n  servo.servo->attach(servo.pin);\n  servo.servo->writeMicroseconds((int)map(angle,0,180,'+this.getFieldValue('SMIN')+','+this.getFieldValue('SMAX')+'));\n}\n';
			Blockly.Arduino.definitions_['meArm_servoDetach']='void detachServo(RobotServo_t &servo)\n{\n  servo.servo->detach();\nservo.attached=false;\n}\n';
			
			Blockly.Arduino.definitions_['meArm_forwardKin']='RobotPosition_t forwardKin(const RobotConf_t& q, const RobotParams_t& params){\n  double r, phi, f, mu, tau, q3O,qr[JOINTS];\n  RobotPosition_t tcp;\n  for(int i=0; i<JOINTS; i++)\n    qr[i]=(q.joint[i]*PI)/180;\n  phi=qr[2]+qr[1]-PI/2;\n  f=sqrt(pow(params.l3I,2)+pow(params.l2,2)-2*params.l3I*params.l2*cos(phi));\n  mu=acos(constrain((pow(f,2)+pow(params.l3O,2)-pow(params.l4,2))/(2*f*params.l3O),-1.0,1.0));\n  tau=asin(constrain(params.l3I*sin(phi)/f,-1.0,1.0));\n  q3O=tau+mu;\n  r=params.l1-params.l2*cos(qr[1])-params.l3*cos(qr[1]+q3O);\n  tcp.z=params.h1+params.l2*sin(qr[1])+params.l3*sin(qr[1]+q3O);\n  tcp.x=params.l0+(r+params.l5)*sin(qr[0])-params.d5*cos(qr[0]);\n  tcp.y=-(r+params.l5)*cos(qr[0])-params.d5*sin(qr[0]);\n  return tcp;\n}\n';
			
			Blockly.Arduino.definitions_['meArm_inverseKin']='RobotConf_t inverseKin(const RobotPosition_t& target,const RobotParams_t& params){\n  double pw[3],r,ze,alfa,s,gamma,beta,q3O,e,psi,phi;\n  RobotConf_t q;\n  q.joint[0]=atan2(target.x-params.l0,-target.y)+asin(params.d5/(sqrt(pow(target.x-params.l0,2)+pow(target.y,2))));\n  pw[0]=target.x-params.l5*sin(q.joint[0])-params.l0;\n  pw[1]=target.y+params.l5*cos(q.joint[0]);\n  pw[2]=target.z;\n  r=sqrt(pow(pw[0],2)+pow(pw[1],2))-params.l1;\n  ze=pw[2]-params.h1;\n  alfa=atan2(ze,r);\n  s=sqrt(pow(r,2)+pow(ze,2));\n  gamma=acos(constrain((pow(params.l2,2)+pow(params.l3,2)-pow(s,2))/(2*params.l2*params.l3),-1.0,1.0));\n  beta=acos(constrain((pow(params.l2,2)-pow(params.l3,2)+pow(s,2))/(2*params.l2*s),-1.0,1.0));\n  q.joint[1]=PI-alfa-beta;\n  q3O=PI-gamma;\n  e=sqrt(pow(params.l2,2)+pow(params.l3O,2)-2*params.l3O*params.l2*cos(q3O));\n  phi=acos(constrain((pow(e,2)+pow(params.l3I,2)-pow(params.l4,2))/(2*e*params.l3I),-1.0,1.0));\n  psi=asin(constrain(params.l3O*sin(q3O)/e,-1.0,1.0));\n  q.joint[2]=psi+phi-q.joint[1]+PI/2;\n  for(int i=0; i<JOINTS; i++)\n    q.joint[i]=(q.joint[i]*180)/PI;\n  return q;\n}\n';
			
			code='for (int i=0;i<JOINTS;i++)\n    writeServo(robotServos[i],_currentQ.joint[i]);\n_currentPos=forwardKin(_currentQ,params);\n';
			
			return code;
		};
		
		Blockly.Blocks.movement_move_arm_setup = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARM'),
			tags: ['mearm','movement'],
			helpUrl: Facilino.getHelpUrl('movement_move_arm_setup'),
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM,
			keys: ['LANG_MOVE_ARM_SETUP_NAME','LANG_MOVE_ARM_SETUP','LANG_MOVE_ARM_JOINT','LANG_MOVE_ARM_SETUP_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_ARM_SETUP_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_SETUP')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/robot_arm.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('JOINT1').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_JOINT')+' #1').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('JOINT2').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_JOINT')+' #2').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('JOINT3').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_JOINT')+' #3').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				if (window.FacilinoAdvanced===true)
				{
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_MEARM__OFFSET'));
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_JOINT')+' #1').appendField('+/-').appendField(new Blockly.FieldTextInput('0'), 'OJ1').appendField(Facilino.locales.getKey('LANG_MOVE_MEARM_MIN')).appendField(new Blockly.FieldTextInput('0'), 'J1MIN').appendField(Facilino.locales.getKey('LANG_MOVE_MEARM_MAX')).appendField(new Blockly.FieldTextInput('180'), 'J1MAX').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_JOINT')+' #2').appendField('+/-').appendField(new Blockly.FieldTextInput('0'), 'OJ2').appendField(Facilino.locales.getKey('LANG_MOVE_MEARM_MIN')).appendField(new Blockly.FieldTextInput('50'), 'J2MIN').appendField(Facilino.locales.getKey('LANG_MOVE_MEARM_MAX')).appendField(new Blockly.FieldTextInput('170'), 'J2MAX').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_JOINT')+' #3').appendField('+/-').appendField(new Blockly.FieldTextInput('0'), 'OJ3').appendField(Facilino.locales.getKey('LANG_MOVE_MEARM_MIN')).appendField(new Blockly.FieldTextInput('20'), 'J3MIN').appendField(Facilino.locales.getKey('LANG_MOVE_MEARM_MAX')).appendField(new Blockly.FieldTextInput('160'), 'J3MAX').setAlign(Blockly.ALIGN_RIGHT);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_MEARM_SERVOS')).appendField(Facilino.locales.getKey('LANG_MOVE_MEARM_MIN')).appendField(new Blockly.FieldTextInput('500'), 'SMIN').appendField(Facilino.locales.getKey('LANG_MOVE_MEARM_MAX')).appendField(new Blockly.FieldTextInput('2500'), 'SMAX').setAlign(Blockly.ALIGN_RIGHT);
				}
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_MOVE_ARM_SETUP_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml += '<value name="JOINT1"><shadow type="pin_digital"></shadow></value>';
				if (Facilino.profiles.default.digital.length>1)
					xml+='<value name="JOINT2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[1][1]+'</field></shadow></value>';
				else
					xml+='<value name="JOINT2"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
				if (Facilino.profiles.default.digital.length>2)
					xml+='<value name="JOINT3"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[2][1]+'</field></shadow></value>';
				else
					xml+='<value name="JOINT3"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[2][1]+'</field></shadow></value>';
				return xml;
			},
		};
		
		Blockly.Arduino.movement_move_arm_joints = function() {
			var conf = Blockly.Arduino.valueToCode(this, 'CONF', Blockly.Arduino.ORDER_NONE);
			var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['meArm_moveAbsJ']='void moveAbsJ(const RobotServo_t robotServos[JOINTS], const RobotConf_t qT, const double T, const RobotParams_t& params){\n  double a[JOINTS],b[JOINTS],d[JOINTS],t,t0;\n  for (int i=0; i<JOINTS;i++)\n  {\n    a[i]=-2.0*(qT.joint[i]-_currentQ.joint[i])/pow(T,3);\n    b[i]=3.0*(qT.joint[i]-_currentQ.joint[i])/pow(T,2);\n    d[i]=_currentQ.joint[i];\n  }\n  t0=millis()/1000.0;\n  t=0.0;\n  while(t<T)\n  {\n    for (int i=0;i<JOINTS;i++)\n    {\n      _currentQ.joint[i]=a[i]*pow(t,3)+b[i]*pow(t,2)+d[i];\n      writeServo(robotServos[i],_currentQ.joint[i]);\n    }\n    _currentPos=forwardKin(_currentQ,params);\n    delay(20);\n    t=millis()/1000.0-t0;\n  }\n  for (int i=0;i<JOINTS;i++)\n  {\n    _currentQ.joint[i]=qT.joint[i];\n    writeServo(robotServos[i],_currentQ.joint[i]);\n  }\n  _currentPos=forwardKin(_currentQ,params);\ndelay(20);\n  for (int i=0;i<JOINTS;i++)\n    detachServo(robotServos[i]);\n}\n';
			var code = 'moveAbsJ(robotServos,'+conf+','+time+',params);\n';
			return code;
		};
		
		Blockly.Blocks.movement_move_arm_joints = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARM'),
			tags: ['mearm','movement'],
			helpUrl: Facilino.getHelpUrl('movement_move_arm_joints'),
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM,
			keys: ['LANG_MOVE_ARM_JOINTS_NAME','LANG_MOVE_ARM_JOINTS','LANG_MOVE_ARM_JOINT','LANG_MOVE_ARM_CONF','LANG_MOVE_ARM_TIME','LANG_MOVE_ARM_JOINTS_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_ARM_JOINTS_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_JOINTS')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/robot_arm.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('CONF').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_CONF')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/angle.svg",20*options.zoom,20*options.zoom)).setCheck('MeArmConf').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_TIME')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/chronometer.svg",20*options.zoom,20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_MOVE_ARM_JOINTS_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="CONF"><shadow type="movement_arm_conf">';
				xml += '<value name="JOINT1"><shadow type="math_number"><field name="NUM">90</field></shadow></value>';
				xml += '<value name="JOINT2"><shadow type="math_number"><field name="NUM">90</field></shadow></value>';
				xml += '<value name="JOINT3"><shadow type="math_number"><field name="NUM">90</field></shadow></value>';
				xml += '</shadow></value>';
				xml += '<value name="TIME"><shadow type="math_number"><field name="NUM">5</field></shadow></value>';
				return xml;
			},
		};
		
		Blockly.Arduino.movement_move_arm_point = function() {
			var point = Blockly.Arduino.valueToCode(this, 'TARGET', Blockly.Arduino.ORDER_NONE);
			var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['meArm_moveAbsJ']='void moveAbsJ(const RobotServo_t robotServos[JOINTS], const RobotConf_t qT, const double T, const RobotParams_t& params){\n  double a[JOINTS],b[JOINTS],d[JOINTS],t,t0;\n  for (int i=0; i<JOINTS;i++)\n  {\n    a[i]=-2.0*(qT.joint[i]-_currentQ.joint[i])/pow(T,3);\n    b[i]=3.0*(qT.joint[i]-_currentQ.joint[i])/pow(T,2);\n    d[i]=_currentQ.joint[i];\n  }\n  t0=millis()/1000.0;\n  t=0.0;\n  while(t<T)\n  {\n    for (int i=0;i<JOINTS;i++)\n    {\n      _currentQ.joint[i]=a[i]*pow(t,3)+b[i]*pow(t,2)+d[i];\n      writeServo(robotServos[i],_currentQ.joint[i]);\n    }\n    _currentPos=forwardKin(_currentQ,params);\n    delay(20);\n    t=millis()/1000.0-t0;\n  }\n  for (int i=0;i<JOINTS;i++)\n  {\n    _currentQ.joint[i]=qT.joint[i];\n    writeServo(robotServos[i],_currentQ.joint[i]);\n  }\n  _currentPos=forwardKin(_currentQ,params);\ndelay(20);\n  for (int i=0;i<JOINTS;i++)\n    detachServo(robotServos[i]);\n}\n';
			Blockly.Arduino.definitions_['meArm_moveJ']='void moveJ(const RobotServo_t robotServos[JOINTS], const RobotPosition_t target, const double T, const RobotParams_t& params){\n  RobotConf_t qT=inverseKin(target,params);\n  moveAbsJ(robotServos,qT,T,params);\n}\n';
			var code = 'moveJ(robotServos,'+point+','+time+',params);\n';
			return code;
		};
		
		Blockly.Blocks.movement_move_arm_point = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARM'),
			tags: ['mearm','movement'],
			helpUrl: Facilino.getHelpUrl('movement_move_arm_point'),
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM,
			keys: ['LANG_MOVE_ARM_POINT_NAME','LANG_MOVE_ARM_POINT','LANG_MOVE_ARM_TARGET','LANG_MOVE_ARM_TIME','LANG_MOVE_ARM_POINT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_ARM_POINT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM);
					this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_POINT')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/robot_arm.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('TARGET').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_TARGET')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/target.svg",20*options.zoom,20*options.zoom)).setCheck('MeArmPos').setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_TIME')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/chronometer.svg",20*options.zoom,20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setTooltip(Facilino.locales.getKey('LANG_MOVE_ARM_POINT_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml+='<value name="TARGET"><shadow type="movement_arm_pos">';
				xml += '<value name="X"><shadow type="math_number"><field name="NUM">152.1</field></shadow></value>';
				xml += '<value name="Y"><shadow type="math_number"><field name="NUM">-5</field></shadow></value>';
				xml += '<value name="Z"><shadow type="math_number"><field name="NUM">144.5</field></shadow></value>';
				xml += '</shadow></value>';
				xml += '<value name="TIME"><shadow type="math_number"><field name="NUM">5</field></shadow></value>';
				return xml;
			},
		};
		
		if (window.FacilinoAdvanced===true)
		{
			Blockly.Arduino.movement_move_arm_line = function() {
				var point = Blockly.Arduino.valueToCode(this, 'TARGET', Blockly.Arduino.ORDER_NONE);
				var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_NONE);
				Blockly.Arduino.definitions_['meArm_moveL']='void moveL(const RobotServo_t robotServos[JOINTS], const RobotPosition_t target, const double T, const RobotParams_t& params){\n  RobotPosition_t p;\n  double a,b,c,d,t,t0,v[3],s;\n  RobotConf_t q;\n  p.x=_currentPos.x;\n  p.y=_currentPos.y;\n  p.z=_currentPos.z;\n  double dist=sqrt(pow(target.x-p.x,2)+pow(target.y-p.y,2)+pow(target.z-p.z,2));\n  a=-2.0*dist/(pow(T,3));\n  b=3.0*dist/(pow(T,2));\n  v[0]=(target.x-p.x)/dist;\n  v[1]=(target.y-p.y)/dist;\n  v[2]=(target.z-p.z)/dist;\n  t0=millis()/1000.0;\n  t=0.0;\n  while(t<T)\n  {\n    s=a*pow(t,3)+b*pow(t,2);\n    _currentPos.x=s*v[0]+p.x;\n    _currentPos.y=s*v[1]+p.y;\n    _currentPos.z=s*v[2]+p.z;\n    _currentQ=inverseKin(_currentPos,params);\n    for(int i=0; i<JOINTS; i++)\n      writeServo(robotServos[i],_currentQ.joint[i]);\n    delay(20);\n    t=millis()/1000.0-t0;\n  }\ndelay(20);\n  for (int i=0;i<JOINTS;i++)\n    detachServo(robotServos[i]);}\n';
				var code = 'moveL(robotServos,'+point+','+time+',params);\n';
				return code;
			};
			
			Blockly.Blocks.movement_move_arm_line = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARM'),
				tags: ['mearm','movement'],
				helpUrl: Facilino.getHelpUrl('movement_move_arm_line'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM,
				keys: ['LANG_MOVE_ARM_LINE_NAME','LANG_MOVE_ARM_LINE','LANG_MOVE_ARM_TARGET','LANG_MOVE_ARM_TIME','LANG_MOVE_ARM_LINE_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_MOVE_ARM_LINE_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM);
						this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_LINE')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/robot_arm.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('TARGET').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_TARGET')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/target.svg",20*options.zoom,20*options.zoom)).setCheck('MeArmPos').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_TIME')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/chronometer.svg",20*options.zoom,20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_MOVE_ARM_LINE_TOOLTIP'));
				},
				default_inputs: function()
				{
					var xml='';
					xml+='<value name="TARGET"><shadow type="movement_arm_pos">';
					xml += '<value name="X"><shadow type="math_number"><field name="NUM">152.1</field></shadow></value>';
					xml += '<value name="Y"><shadow type="math_number"><field name="NUM">-5</field></shadow></value>';
					xml += '<value name="Z"><shadow type="math_number"><field name="NUM">144.5</field></shadow></value>';
					xml += '</shadow></value>';
					xml += '<value name="TIME"><shadow type="math_number"><field name="NUM">5</field></shadow></value>';
					return xml;
				},
			};
			
			Blockly.Arduino.movement_move_arm_arc = function() {
				var point1 = Blockly.Arduino.valueToCode(this, 'INTERMEDIATE', Blockly.Arduino.ORDER_NONE);
				var point2 = Blockly.Arduino.valueToCode(this, 'TARGET', Blockly.Arduino.ORDER_NONE);
				var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_NONE);
				Blockly.Arduino.definitions_['meArm_crossProduct']='void crossProduct(const double u[3], const double v[3], double uv[3]){\n  uv[0]=u[1]*v[2]-u[2]*v[1];\n  uv[1]=u[2]*v[0]-u[0]*v[2];\n  uv[2]=u[0]*v[1]-u[1]*v[0];\n}\n';
				Blockly.Arduino.definitions_['meArm_matrixProduct']='void matrixProduct(const double M[4][4], const double p[4], double p1[4]){\n  for(int i=0; i<4; i++)\n    {\n      p1[i]=M[i][0]*p[0]+M[i][1]*p[1]+M[i][2]*p[2]+M[i][3]*p[3];\n    }\n}\n';
				Blockly.Arduino.definitions_['meArm_moveC']='void moveC(const RobotServo_t robotServos[JOINTS], const RobotPosition_t intermediatePoint, const RobotPosition_t target, const double T, const RobotParams_t& params){\n    double q0r[JOINTS];\n    double P0[4]={_currentPos.x,_currentPos.y,_currentPos.z,1};\n    double P1[4]={intermediatePoint.x,intermediatePoint.y,intermediatePoint.z,1};\n    double P2[4]={target.x,target.y,target.z,1};\n    double P01[3]={intermediatePoint.x-_currentPos.x,intermediatePoint.y-_currentPos.y,intermediatePoint.z-_currentPos.z};\n    double P02[3]={target.x-_currentPos.x,target.y-_currentPos.y,target.z-_currentPos.z};\n    double distP01=sqrt(pow(P01[0],2)+pow(P01[1],2)+pow(P01[2],2));\n    double distP02=sqrt(pow(P02[0],2)+pow(P02[1],2)+pow(P02[2],2));\n    double a,b,c,d,t0,t,theta,P[4],Pt[4],Pt1[4],Pt2[4],P01P02[3],X[3],Y[3],Z[3],Tr[4][4],invT[4][4];\n    crossProduct(P01,P02,P01P02);\n    double distP01P02=sqrt(pow(P01P02[0],2)+pow(P01P02[1],2)+pow(P01P02[2],2));\n    for(int i=0; i<3; i++)    {\n      X[i]=P01[i]/distP01;\n      Z[i]=P01P02[i]/distP01P02;\n    }\n    crossProduct(Z,X,Y);\n    for(int i=0; i<3; i++)\n    {\n      Tr[i][0]=X[i];\n      Tr[i][1]=Y[i];\n      Tr[i][2]=Z[i];\n      Tr[i][3]=P0[i];\n      Tr[3][i]=0;\n    }\n    Tr[3][3]=1;\n    for(int i=0; i<3; i++)\n    {\n      for(int j=0; j<3; j++)\n      {\n        invT[i][j]=Tr[j][i];\n      }\n      invT[i][3]=-invT[i][0]*P0[0]-invT[i][1]*P0[1]-invT[i][2]*P0[2];\n      invT[3][i]=0;\n    }\n    invT[3][3]=1;\n    matrixProduct(invT,P1,Pt1);\n    matrixProduct(invT,P2,Pt2);\n    double Ct[4]={Pt1[0]/2,(pow(Pt2[0]-Pt1[0]/2,2)+pow(Pt2[1],2)-pow(Pt1[0]/2,2))/(2*Pt2[1]),0,1};\n    double R=sqrt(pow(Ct[0],2)+pow(Ct[1],2)+pow(Ct[2],2));\n    double theta0=atan2(-Ct[1],-Ct[0]);    double thetaT=theta0+2*PI-acos(constrain(-((Pt2[0]-Ct[0])*Ct[0]+(Pt2[1]-Ct[1])*Ct[1]+(Pt2[2]-Ct[2])*Ct[2])/(pow(R,2)),-1.0,1.0));\n    RobotConf_t q;    a=-2.0*abs(thetaT-theta0)/(pow(T,3));\n    b=3.0*abs(thetaT-theta0)/(pow(T,2));\n    d=theta0;\n    t0=millis()/1000.0;\n    t=0.0;\n    while(t<T)\n    {\n      theta=a*pow(t,3)+b*pow(t,2)+d;\n      Pt[0]=R*cos(theta)+Ct[0];\n      Pt[1]=R*sin(theta)+Ct[1];\n      Pt[2]=Ct[2];\n      Pt[3]=1;\n      matrixProduct(Tr,Pt,P);\n      _currentPos.x=P[0];\n      _currentPos.y=P[1];\n      _currentPos.z=P[2];\n      _currentQ=inverseKin(_currentPos,params);\n      for(int i=0; i<JOINTS; i++)\n        writeServo(robotServos[i],_currentQ.joint[i]);\n      delay(20);\n      t=millis()/1000.0-t0;\n    }\ndelay(20);\n  for (int i=0;i<JOINTS;i++)\n    detachServo(robotServos[i]);}\n';
				var code = 'moveC(robotServos,'+point1+','+point2+','+time+',params);\n';
				return code;
			};
			
			Blockly.Blocks.movement_move_arm_arc = {
				category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
				subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARM'),
				tags: ['mearm','movement'],
				helpUrl: Facilino.getHelpUrl('movement_move_arm_arc'),
				examples: [''],
				category_colour: Facilino.LANG_COLOUR_MOVEMENT,
				colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM,
				keys: ['LANG_MOVE_ARM_ARC_NAME','LANG_MOVE_ARM_ARC','LANG_MOVE_ARM_INTERMEDIATE','LANG_MOVE_ARM_TARGET','LANG_MOVE_ARM_TIME','LANG_MOVE_ARM_ARC_TOOLTIP'],
				name: Facilino.locales.getKey('LANG_MOVE_ARM_ARC_NAME'),
				init: function() {
					this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM);
						this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_ARC')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/robot_arm.svg", 32*options.zoom, 32*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('INTERMEDIATE').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_INTERMEDIATE')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/target.svg",20*options.zoom,20*options.zoom)).setCheck('MeArmPos').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('TARGET').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_TARGET')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/target.svg",20*options.zoom,20*options.zoom)).setCheck('MeArmPos').setAlign(Blockly.ALIGN_RIGHT);
					this.appendValueInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_TIME')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/chronometer.svg",20*options.zoom,20*options.zoom)).setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
					this.setInputsInline(false);
					this.setPreviousStatement(true,'code');
					this.setNextStatement(true,'code');
					this.setTooltip(Facilino.locales.getKey('LANG_MOVE_ARM_ARC_TOOLTIP'));
				},
				default_inputs: function()
				{
					var xml='';
					xml+='<value name="TARGET"><shadow type="movement_arm_pos">';
					xml += '<value name="X"><shadow type="math_number"><field name="NUM">152.1</field></shadow></value>';
					xml += '<value name="Y"><shadow type="math_number"><field name="NUM">-5</field></shadow></value>';
					xml += '<value name="Z"><shadow type="math_number"><field name="NUM">144.5</field></shadow></value>';
					xml += '</shadow></value>';
					xml += '<value name="TIME"><shadow type="math_number"><field name="NUM">5</field></shadow></value>';
					return xml;
				},
			};
		}
		
		
		Blockly.Arduino.movement_arm_conf = function() {
			var joint1 = Blockly.Arduino.valueToCode(this, 'JOINT1', Blockly.Arduino.ORDER_NONE);
			var joint2 = Blockly.Arduino.valueToCode(this, 'JOINT2', Blockly.Arduino.ORDER_NONE);
			var joint3 = Blockly.Arduino.valueToCode(this, 'JOINT3', Blockly.Arduino.ORDER_NONE);
			var code = '{'+joint1+','+joint2+','+joint3+'}';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};
		
		Blockly.Blocks.movement_arm_conf = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARM'),
			tags: ['mearm','movement'],
			helpUrl: Facilino.getHelpUrl('movement_arm_conf'),
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM,
			keys: ['LANG_MOVE_ARM_CONF_NAME','LANG_MOVE_ARM_JOINT','LANG_MOVE_ARM_CONF_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_ARM_CONF_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM);
					this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/angle.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVE_ARM_CONF')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('JOINT1').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_JOINT')+' #1').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('JOINT2').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_JOINT')+' #2').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('JOINT3').appendField(Facilino.locales.getKey('LANG_MOVE_ARM_JOINT')+' #3').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				
				this.setInputsInline(true);
				this.setOutput(true,['MeArmConf']);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				
				this.setTooltip(Facilino.locales.getKey('LANG_MOVE_ARM_CONF_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml += '<value name="JOINT1"><shadow type="math_number"><field name="NUM">90</field></shadow></value>';
				xml += '<value name="JOINT2"><shadow type="math_number"><field name="NUM">90</field></shadow></value>';
				xml += '<value name="JOINT3"><shadow type="math_number"><field name="NUM">90</field></shadow></value>';
				return xml;
			},
		};
		
		Blockly.Arduino.movement_arm_pos = function() {
			var x = Blockly.Arduino.valueToCode(this, 'X', Blockly.Arduino.ORDER_NONE);
			var y = Blockly.Arduino.valueToCode(this, 'Y', Blockly.Arduino.ORDER_NONE);
			var z = Blockly.Arduino.valueToCode(this, 'Z', Blockly.Arduino.ORDER_NONE);
			var code = '{'+x+','+y+','+z+'}';
			return [code, Blockly.Arduino.ORDER_ATOMIC];
		};
		
		Blockly.Blocks.movement_arm_pos = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARM'),
			tags: ['mearm','movement'],
			helpUrl: Facilino.getHelpUrl('movement_arm_pos'),
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM,
			keys: ['LANG_MOVE_ARM_POS_NAME','LANG_MOVE_ARM_TARGET','LANG_MOVE_ARM_POS_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MOVE_ARM_POS_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM);
					this.appendDummyInput('').appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/target.svg",24*options.zoom,24*options.zoom)).appendField(Facilino.locales.getKey('LANG_MOVE_ARM_TARGET')).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('X').appendField('X').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Y').appendField('Y').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('Z').appendField('Z').setCheck([Number,'Variable']).setAlign(Blockly.ALIGN_RIGHT);
				
				this.setInputsInline(true);
				this.setOutput(true,['MeArmPos']);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				
				this.setTooltip(Facilino.locales.getKey('LANG_MOVE_ARM_POS_TOOLTIP'));
			},
			default_inputs: function()
			{
				var xml='';
				xml += '<value name="X"><shadow type="math_number"><field name="NUM">152.1</field></shadow></value>';
				xml += '<value name="Y"><shadow type="math_number"><field name="NUM">-5</field></shadow></value>';
				xml += '<value name="Z"><shadow type="math_number"><field name="NUM">144.5</field></shadow></value>';
				return xml;
			},
		};
		
		Blockly.Arduino.dyor_move_mearm_gripper = function() {
			var gripper = Blockly.Arduino.valueToCode(this, 'GRIPPER', Blockly.Arduino.ORDER_NONE);
			var gripper_close = this.getFieldValue('TO');
			var gripper_open = this.getFieldValue('FROM');
			var code = '';
			var option = this.getFieldValue('OPTION');
			var attach = this.getFieldValue('ATTACH') || 'FALSE';
			//Blockly.Arduino.definitions_['declare_var_define_move_grip'] = JST['movement_move_grip_definitions_variables']({});
			if ((Facilino.profiles['processor']==='ATmega328')||(Facilino.profiles['processor']==='ATmega32U4')||(Facilino.profiles['processor']==='ATmega2560')||(Facilino.profiles['processor']==='ESP8266'))
			{
				Blockly.Arduino.definitions_['include_servo'] = '#include <Servo.h>';
				Blockly.Arduino.definitions_['declare_var_servo_'+gripper]=JST['servo_definitions_variables']({pin: gripper});
			}
			else if (Facilino.profiles['processor']==='ESP32')
			{
				Blockly.Arduino.definitions_['include_servo'] = '#include <ESP32Servo.h>';
				Blockly.Arduino.definitions_['declare_var_servo_'+gripper]=JST['ESP_servo_definitions_variables']({pin: gripper});
			}

			if (attach==='FALSE'){

				Blockly.Arduino.setups_['movement_servo_move_' + gripper] = JST['dyor_servo_setups']({'pin': gripper});

			if (option==='1')
			  code +='_servo'+gripper+'.write('+gripper_close+');\n';
			if (option==='2')
			  code +='_servo'+gripper+'.write('+gripper_open+');\n';
			}
			else
			{
				var time = this.getFieldValue('TIME');
				code +='if (!_servo'+gripper+'.attached())\n	_servo'+gripper+'.attach('+gripper+');\n';
				if (option==='1')
				  code +='_servo'+gripper+'.write('+gripper_close+');\n';
				if (option==='2')
				  code +='_servo'+gripper+'.write('+gripper_open+');\n';
				code +='delay('+time+');\n';
				code +='  _servo'+gripper+'.detach();\n';
			}
			return code;
		};

		Blockly.Blocks.dyor_move_mearm_gripper = {
			category: Facilino.locales.getKey('LANG_CATEGORY_MOVEMENT'),
			subcategory: Facilino.locales.getKey('LANG_SUBCATEGORY_ARM'),
			tags: ['mearm','movement'],
			helpUrl: Facilino.getHelpUrl('dyor_move_mearm_gripper'),
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MOVEMENT,
			colour: Facilino.LANG_COLOUR_MOVEMENT_ROBOTARM,
			keys: ['LANG_MOVE_MEARM_GRIPPER_NAME','LANG_SERVO_MOVE_MEARM_GRIPPER','LANG_SERVO_MOVE','LANG_SERVO_MOVE_FROM','LANG_SERVO_MOVE_TO','LANG_MOVE_GRIP','LANG_MOVE_RELEASE','LANG_MOVE_BASE_ATTACH','LANG_MOVE_BASE_TIME','LANG_MOVE_MEARM_GRIPPER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_SERVO_MOVE_MEARM_GRIPPER'),
			init: function() {
				this.setColour(robot_colour);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_MEARM_GRIPPER')).appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/gripper.svg', 20*options.zoom, 20*options.zoom)).setAlign(Blockly.ALIGN_RIGHT);
				this.appendValueInput('GRIPPER').setAlign(Blockly.ALIGN_RIGHT).appendField(Facilino.locales.getKey('LANG_SERVO_MOVE')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/servo_signal.svg",20*options.zoom,20*options.zoom)).setCheck(['DigitalPin','PWMPin']).setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND_FROM')||'From').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/angle.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(70,0,180,1),'FROM').appendField(Facilino.locales.getKey('LANG_SERVO_MOVE_ATTACK_DEFEND_TO')||'to').appendField(new Blockly.FieldImage(Facilino.path+'img/blocks/angle.svg', 20*options.zoom, 20*options.zoom)).appendField(new Blockly.FieldNumber(90,0,180,1),'TO').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('').appendField(new Blockly.FieldDropdown([
		[Facilino.locales.getKey('LANG_MOVE_GRIP') || 'Grip', '1'],
		[Facilino.locales.getKey('LANG_MOVE_RELEASE') || 'Release', '2']
		]),'OPTION').setAlign(Blockly.ALIGN_RIGHT);
			if (window.FacilinoAdvanced===true)
			{
				this.appendDummyInput('ATTACH').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_ATTACH')).appendField(new Blockly.FieldCheckbox('FALSE'),'ATTACH').setAlign(Blockly.ALIGN_RIGHT);
				this.appendDummyInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_TIME'),'TIME_TEXT').appendField(new Blockly.FieldNumber(1000),'TIME').setAlign(Blockly.ALIGN_RIGHT);
			}
				this.default_time= this.getFieldValue('TIME') || 1000;
				this.setPreviousStatement(true,'code');
				this.setNextStatement(true,'code');
				this.setInputsInline(false);
				this.setTooltip(Facilino.locales.getKey('LANG_MOVE_MEARM_GRIPPER_TOOLTIP'));
			},
			default_inputs: function()
				{
					var xml='';
					xml += '<value name="GRIPPER"><shadow type="pin_digital"><field name="PIN">'+Facilino.profiles.default.digital[0][1]+'</field></shadow></value>';
					return xml;
				},
			onchange: function()
			{
				if (window.FacilinoAdvanced===true)
				{
					if (this.getFieldValue('ATTACH')==='FALSE')
					{
						this.removeInput('TIME');
					}
					else
					{
						if (this.getInput('TIME')===null)
							this.appendDummyInput('TIME').appendField(Facilino.locales.getKey('LANG_MOVE_BASE_TIME'),'TIME_TEXT').appendField(new Blockly.FieldNumber(this.default_time),'TIME').setAlign(Blockly.ALIGN_RIGHT);
					}
				}
			}
		};
		
	};
	
	var FacilinoRobotMeArm = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoRobotMeArm;
	} else {
		window.FacilinoRobotMeArm = FacilinoRobotMeArm;
	}
}));
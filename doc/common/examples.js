function openFunction(bly) {
    $.ajax({type: "GET",url: bly,dataType: "xml" , async: false,success: function(xml) {
			var txt = new XMLSerializer().serializeToString(xml);
			Blockly.getMainWorkspace().clear();
			var xmlDOM = Blockly.Xml.textToDom(txt);
			Blockly.Xml.domToWorkspace(xmlDOM,Blockly.getMainWorkspace());
        }
    });
}

function openReloadFunction(bly) {
    $.ajax({type: "GET",url: bly,dataType: "xml" , async: false,success: function(xml) {
			var txt = new XMLSerializer().serializeToString(xml);
			Blockly.getMainWorkspace().clear();
			var xmlDOM = Blockly.Xml.textToDom(txt);
			localStorage.setItem('saved',txt); 
			location.reload();
        }
    });
}

function getCircuitHTML(circuit)
{
	var html_code='';
	if (circuit===undefined)
	{	html_code='<div class="not_circuit">No valid circuit was found for the current selected processor.</div>';
		return html_code;
	}
	if (circuit.components.length>0)
	{
		html_code+='<h5>Components</h5>';
		html_code+='<ul>';
		circuit.components.forEach(function (item,index){
			if (item.url!==undefined)
				html_code+='<li class="components"><a href="'+item.url+'" target="_blank">'+item.name+'</a></li>';
			else
				html_code+='<li class="components">'+item.name+'</li>';
		});
		html_code+='</ul>';
	}
	html_code+='<h5>Breadboard circuit</h5>';
	var image_extension = circuit.image.slice(-3);
	if (image_extension==='svg')
	{
		html_code+='<div id="circuit_container"><embed id="circuit_embed" style="width: 50%; border:1px solid black;" type="image/svg+xml" src="doc/circuits/'+circuit.image+'"></embed></div>';
	}
	else
	{
		html_code+='<image src="doc/circuits/'+circuit.image+'" width="50%"></image>';
	}
	if (circuit.connections.length>0)
	{
		html_code+='<h5>Connections</h5>';
		html_code+='<ul>';
		circuit.connections.forEach(function (item,index){
			html_code+='<li class="connections">'+item+'</li>';
		});
		html_code+='</ul>';
	}
	return html_code;
}

function getExampleHTML(name)
{
	var html_code='';
	html_code+='<p class=\'components\'>'+examples[name].desc+'</p>';
	/*if (examples[name].circuit[Facilino.profiles['processor']].code_modifier)
	{
		html_code+='<div class="button_wrapper"><p><button align="center" class="button" style="cursor: pointer;" onClick="openReloadFunction(\'doc/examples/'+name+'_'+examples[name].circuit[Facilino.profiles['processor']].code_modifier+'.bly\');">Open</button></p><p class=\'components\'>Be careful, all changes will be lost!</p></div>';
	}
	else
	{
		html_code+='<div class="button_wrapper"><p><button align="center" class="button" style="cursor: pointer;" onClick="openReloadFunction(\'doc/examples/'+name+'.bly\');">Open</button></p><p class=\'components\'>Be careful, all changes will be lost!</p></div>';
	}*/
	var filename='';
	if (examples[name].circuit[Facilino.profiles['processor']].code_modifier)
		filename='doc/examples/'+name+'_'+examples[name].circuit[Facilino.profiles['processor']].code_modifier+'.bly'
	else
		filename='doc/examples/'+name+'.bly';
	html_code+='<div class="form"><form action="dashboard.php?action=import" method="post" name="import"><input name="name" type="hidden" value="'+name+'"/><input name="processor" type="hidden" value="'+Facilino.profiles['processor']+'"/><input name="import_example" type="submit" value="Import to dashboard"/></form></div>';
	return html_code;
}

function showExample(num,total)
{
	var i=1;
	for (i=1;i<=total;i++)
	{
		if (i===num)
			document.getElementById('example'+i).style.display='block';
		else
			document.getElementById('example'+i).style.display='none';
	}
}

function createExamples(names)
{
	names.forEach(function(name,num){
		createExample(name,num+1,names.length);
	});
}

function createExample(name,num,total)
{
	var myExample=document.createElement('div');
	var ref = document.getElementById('examples');
	if (total>1)
	{
		myExample.innerHTML='<h4>Example '+num+': '+examples[name].title+'</h4>';
		myExample.id='example'+num;
	}
	else
		myExample.innerHTML='<h4>Example: '+examples[name].title+'</h4>';
	ref.appendChild(myExample);
	var myExampleDesc=document.createElement('div');
	myExampleDesc.innerHTML=getExampleHTML(name);
	myExample.appendChild(myExampleDesc);
	if (examples[name].grafcet)
	{
		var myExampleGrafcet=document.createElement('div');
		var myExampleGrafcetHeader=document.createElement('h5');
		myExampleGrafcetHeader.innerHTML='Grafcet';
		myExampleGrafcet.appendChild(myExampleGrafcetHeader);
		var myExampleGrafcetImg=document.createElement('img');
		myExampleGrafcetImg.src='doc/common/'+examples[name].grafcet;
		myExampleGrafcetImg.title=examples[name].grafcet;
		myExampleGrafcetImg.alt=examples[name].grafcet;
		myExampleGrafcet.appendChild(myExampleGrafcetImg);
		myExample.appendChild(myExampleGrafcet);
	}

	var myExampleCircuit=document.createElement('div');
	var circuit_info=examples[name].circuit[Facilino.profiles['processor']];
	myExampleCircuit.innerHTML=getCircuitHTML(circuit_info);
	myExample.appendChild(myExampleCircuit);
	var image_extension=circuit_info.image.slice(-3);
	if (image_extension==='svg')
	{
		var embed = document.getElementById('circuit_embed');
		embed.id=embed.id+num;
		lastEventListener = 
		embed.addEventListener('load', function(){
				svgPanZoom(embed, {
				  zoomEnabled: true,
				  controlIconsEnabled: true
				});
			  });
	}
	
	var myExampleFacilino=document.createElement('div');
	var myExampleCodeHeader=document.createElement('h5');
	myExampleCodeHeader.innerHTML='Facilino';
	myExampleFacilino.appendChild(myExampleCodeHeader);
	var myExampleCode=document.createElement('div');
	myExampleFacilino.appendChild(myExampleCode);
	myExample.appendChild(myExampleFacilino);
	if (examples[name].circuit[Facilino.profiles['processor']].code_modifier)
	{
		var mainWorkspace = Blockly.inject(myExampleCode, {readOnly:true, collapse: false});
		openFunction('doc/examples/'+name+'_'+examples[name].circuit[Facilino.profiles['processor']].code_modifier+'.bly');
	}
	else
	{
		var mainWorkspace = Blockly.inject(myExampleCode, {readOnly:true, collapse: false});
		openFunction('doc/examples/'+name+'.bly');
	}
	var bbox = mainWorkspace.svgBlockCanvas_.getBBox();
	myExampleCode.style.height = (bbox.height+25)+ 'px';
	myExampleCode.style.width = (bbox.width+25)+ 'px';
	window.dispatchEvent(new Event('resize'));
}

var components={};
components['ArduinoNano']={};
components['ArduinoNano'].name='Arduino Nano v3.0';
components['ArduinoNano'].url='https://roboticafacil.es/prod/arduino-nano3/';

components['ArduinoNanoShield']={};
components['ArduinoNanoShield'].name='Arduino Nano expansion shield';
components['ArduinoNanoShield'].url='https://roboticafacil.es/prod/arduino-nano-io-extension-shield/';

components['NodeMCU']={};
components['NodeMCU'].name='NodeMCU';
components['NodeMCU'].url='https://roboticafacil.es/prod/nodemcu-v3-esp8266-wifi/';

components['NodeMCUShield']={};
components['NodeMCUShield'].name='NodeMCU shield';
components['NodeMCUShield'].url='https://roboticafacil.es/prod/shield-nodemcu-v3/';

components['WemosD1R32']={};
components['WemosD1R32'].name='Wemos D1 R32';
components['WemosD1R32'].url='https://roboticafacil.es/prod/wemos-esp32/';

components['ArduinoSensorShield']={};
components['ArduinoSensorShield'].name='Arduino sensor shield v5';
components['ArduinoSensorShield'].url='https://roboticafacil.es/prod/i-o-extension-shield-para-arduino-uno-wemos-esp32/';

components['ArduinoLeonardo']={};
components['ArduinoLeonardo'].name='Arduino Leonardo';
//components['ArduinoLeonardo'].url='';

components['fan']={};
components['fan'].name='5V fan';
components['fan'].url='https://roboticafacil.es/prod/mini-ventilador-5v/';

components['dht11']={};
components['dht11'].name='Digital Humidity and Temperature sensor';
components['dht11'].url='https://roboticafacil.es/prod/sensor-humedad-y-temperatura-ky-015-dht11/';

components['semaphore']={};
components['semaphore'].name='GYR Traffic light';
components['semaphore'].url='https://roboticafacil.es/prod/semaforo-led-modulo/';

components['bluetooth_sppc']={};
components['bluetooth_sppc'].name='SPP-C bluetooth module';
components['bluetooth_sppc'].url='https://roboticafacil.es/prod/spp-c-bluetooth/';

components['dupont_cables_FF']={};
components['dupont_cables_FF'].name='DuPont cables F-F';
components['dupont_cables_FF'].url='https://roboticafacil.es/prod/10-cables-dupont-20cm/';

components['switch']={};
components['switch'].name='KY-004 switch module';
components['switch'].url='https://roboticafacil.es/prod/pulsador-ky-004/';

components['guva_s12sd']={};
components['guva_s12sd'].name='GUVA-S12SD UV sensor';
components['guva_s12sd'].url='https://roboticafacil.es/prod/sensor-uv-guva-s12sd/';

components['mq3']={};
components['mq3'].name='MQ3 Gas sensor';
components['mq3'].url='https://roboticafacil.es/prod/sensor-gas-alcohol-mq3/';

components['relay']={};
components['relay'].name='KY-019 Relay module';
components['relay'].url='https://roboticafacil.es/prod/modulo-rele-ky-019/';

components['smartcar_motor']={};
components['smartcar_motor'].name='Smart car DC motor';
components['smartcar_motor'].url='https://roboticafacil.es/prod/motorrueda-smart-car/';

components['lcd_i2c']={};
components['lcd_i2c'].name='LCD I2C Screen';
components['lcd_i2c'].url='https://roboticafacil.es/prod/pantalla-lcd-i2c/';

components['rgb_leds7']={};
components['rgb_leds7'].name='RGB LED (round) with 7 LEDs';
components['rgb_leds7'].url='https://roboticafacil.es/prod/anillo-ws2812/';

components['rgb_leds3']={};
components['rgb_leds3'].name='RGB LED strip';
components['rgb_leds3'].url='https://roboticafacil.es/prod/tira-de-3-rgb-leds/';

components['tcrt5000']={};
components['tcrt5000'].name='TCRT 5000 Infrared sensor';
components['tcrt5000'].url='https://roboticafacil.es/prod/tcrt5000/';

components['bmp180']={};
components['bmp180'].name='BMP180 barometric sensor';
components['bmp180'].url='https://roboticafacil.es/prod/gy68-bmp180/';

components['potentiometer']={};
components['potentiometer'].name='Potentiometer module KY-052';

components['Red_LED']={};
components['Red_LED'].name='Red LED';

components['Green_LED']={};
components['Green_LED'].name='Green LED';

components['Resistors']={};
components['Resistors'].name='Resistor(s)';

components['RGB_LED']={};
components['RGB_LED'].name='RGB LED module';
components['RGB_LED'].url='https://roboticafacil.es/prod/modulo-rgb-led-ky-016/';

components['servo']={};
components['servo'].name='Servo';
components['servo'].url='https://roboticafacil.es/prod/servo-sg90/';

components['RainSensor']={};
components['RainSensor'].name='Rain sensor';
components['RainSensor'].url='https://roboticafacil.es/prod/sensor-de-lluvia/';

components['Buzzer']={};
components['Buzzer'].name='Buzzer module';
components['Buzzer'].url='https://roboticafacil.es/prod/zumbador-ky-006/';


var circuits={};
circuits['Simple']={};
circuits['Simple'].ATmega328={};
circuits['Simple'].ATmega328.image='nano_board.svg';
circuits['Simple'].ATmega328.components=[components['ArduinoNano']];
circuits['Simple'].ATmega328.connections=[];
circuits['Simple'].ATmega32U4={};
circuits['Simple'].ATmega32U4.image='leonardo_board.png';
circuits['Simple'].ATmega32U4.components=[components['ArduinoLeonardo']];
circuits['Simple'].ATmega32U4.connections=[];
circuits['Simple'].ESP8266={};
circuits['Simple'].ESP8266.image='nodemcu_board.png';
circuits['Simple'].ESP8266.components=[components['NodeMCU']];
circuits['Simple'].ESP8266.connections=[];
circuits['Simple'].ESP32={};
circuits['Simple'].ESP32.image='wemosD1R32_board.png';
circuits['Simple'].ESP32.components=[components['WemosD1R32']];
circuits['Simple'].ESP32.connections=[];

circuits['Relay_buttons']={};
circuits['Relay_buttons'].ATmega328={};
circuits['Relay_buttons'].ATmega328.image='relay_buttons_nano.png';
circuits['Relay_buttons'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['relay'],components['fan']];
circuits['Relay_buttons'].ATmega328.connections=['BUT2 connected to D2','BUT3 connected to D3','Relay connected to D4'];
circuits['Relay_buttons'].ATmega32U4={};
circuits['Relay_buttons'].ATmega32U4.image='relay_buttons_leonardo.png';
circuits['Relay_buttons'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['relay'],components['fan']];
circuits['Relay_buttons'].ATmega32U4.connections=['BUT2 connected to D2','BUT3 connected to D3','Relay connected to D4'];
circuits['Relay_buttons'].ESP8266={};
circuits['Relay_buttons'].ESP8266.image='relay_buttons_nodemcu.png';
circuits['Relay_buttons'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['relay'],components['fan']];
circuits['Relay_buttons'].ESP8266.connections=['BUT2 connected to D5 (GPIO14)','BUT3 connected to D6 (GPIO12)','Relay connected to D2 (GPIO4)'];
circuits['Relay_buttons'].ESP8266.code_modifier='nodemcu';
circuits['Relay_buttons'].ESP32={};
circuits['Relay_buttons'].ESP32.image='relay_buttons_wemosD1R32.png';
circuits['Relay_buttons'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['relay'],components['fan']];
circuits['Relay_buttons'].ESP32.connections=['BUT2 connected to D2 (GPIO26)','BUT3 connected to D3 (GPIO25)','Relay connected to D7 (GPIO14)'];
circuits['Relay_buttons'].ESP32.code_modifier='wemosD1R32';

circuits['Relay_buttons3']={};
circuits['Relay_buttons3'].ATmega328={};
circuits['Relay_buttons3'].ATmega328.image='relay_buttons3_nano.png';
circuits['Relay_buttons3'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['fan']];
circuits['Relay_buttons3'].ATmega328.connections=['BUT2 connected to D2','BUT3 connected to D3','BUT4 connected to D4','Relay connected to D5','Light connected to D6'];
circuits['Relay_buttons3'].ATmega32U4={};
circuits['Relay_buttons3'].ATmega32U4.image='relay_buttons3_leonardo.png';
circuits['Relay_buttons3'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['fan']];
circuits['Relay_buttons3'].ATmega32U4.connections=['BUT2 connected to D2','BUT3 connected to D3','BUT4 connected to D4','Relay connected to D5','Light connected to D6'];
circuits['Relay_buttons3'].ESP8266={};
circuits['Relay_buttons3'].ESP8266.image='relay_buttons3_nodemcu.png';
circuits['Relay_buttons3'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['fan']];
circuits['Relay_buttons3'].ESP8266.connections=['BUT2 connected to D5 (GPIO14)','BUT3 connected to D6 (GPIO12)','BUT4 connected to D7 (GPIO13)','Relay connected to D2 (GPIO4)','Light connected to D1 (GPIO5)'];
circuits['Relay_buttons3'].ESP8266.code_modifier='nodemcu';
circuits['Relay_buttons3'].ESP32={};
circuits['Relay_buttons3'].ESP32.image='relay_buttons3_wemosD1R32.png';
circuits['Relay_buttons3'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['fan']];
circuits['Relay_buttons3'].ESP32.connections=['BUT2 connected to D2 (GPIO26)','BUT3 connected to D3 (GPIO25)','BUT4 connected to D4 (GPIO17)','Relay connected to D5 (GPIO16)','Light connected to D6 (GPIO27)'];
circuits['Relay_buttons3'].ESP32.code_modifier='wemosD1R32';


circuits['Bluetooth_leds']={};
circuits['Bluetooth_leds'].ATmega328={};
circuits['Bluetooth_leds'].ATmega328.image='bluetooth_leds_nano.png';
circuits['Bluetooth_leds'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['bluetooth_sppc'],components['semaphore']];
circuits['Bluetooth_leds'].ATmega328.connections=['Green LED connected to D5','Ambar LED connected to D6','Red LED connected to D7','Bluetooth TX connected to D2','Bluetooth RX connected to D4'];
circuits['Bluetooth_leds'].ATmega32U4={};
circuits['Bluetooth_leds'].ATmega32U4.image='bluetooth_leds_leonardo.png';
circuits['Bluetooth_leds'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['bluetooth_sppc'],components['semaphore']];
circuits['Bluetooth_leds'].ATmega32U4.connections=['Green LED connected to D5','Ambar LED connected to D6','Red LED connected to D7','Bluetooth TX connected to D2','Bluetooth RX connected to D4'];
circuits['Bluetooth_leds'].ESP8266={};
circuits['Bluetooth_leds'].ESP8266.image='bluetooth_leds_nodemcu.png';
circuits['Bluetooth_leds'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['semaphore']];
circuits['Bluetooth_leds'].ESP8266.connections=['Green LED connected to D5 (GPIO14)','Ambar LED connected to D6 (GPIO12)','Red LED connected to D7 (GPIO13)'];
circuits['Bluetooth_leds'].ESP8266.code_modifier='nodemcu';
circuits['Bluetooth_leds'].ESP32={};
circuits['Bluetooth_leds'].ESP32.image='bluetooth_leds_wemosD1R32.png';
circuits['Bluetooth_leds'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['semaphore']];
circuits['Bluetooth_leds'].ESP32.connections=['Green LED connected to D5 (GPIO16)','Ambar LED connected to D6 (GPIO27)','Red LED connected to D7 (GPIO14)'];
circuits['Bluetooth_leds'].ESP32.code_modifier='wemosD1R32';


circuits['Switch']={};
circuits['Switch'].ATmega328={};
circuits['Switch'].ATmega328.image='switch_nano.png';
circuits['Switch'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['potentiometer']];
circuits['Switch'].ATmega328.connections=['Switch connected to D2'];
circuits['Switch'].ATmega32U4={};
circuits['Switch'].ATmega32U4.image='switch_leonardo.png';
circuits['Switch'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['potentiometer']];
circuits['Switch'].ATmega32U4.connections=['Switch connected to D2'];
circuits['Switch'].ESP8266={};
circuits['Switch'].ESP8266.image='switch_nodemcu.png';
circuits['Switch'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['potentiometer']];
circuits['Switch'].ESP8266.connections=['Switch connected to D2 (GPIO4)'];
circuits['Switch'].ESP8266.code_modifier='nodemcu';
circuits['Switch'].ESP32={};
circuits['Switch'].ESP32.image='switch_wemosD1R32.png';
circuits['Switch'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['potentiometer']];
circuits['Switch'].ESP32.connections=['Switch connected to D2 (GPIO26)'];
circuits['Switch'].ESP32.code_modifier='wemosD1R32';

circuits['Switches']={};
circuits['Switches'].ATmega328={};
circuits['Switches'].ATmega328.image='switches_example_nano.png';
circuits['Switches'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['switch']];
circuits['Switches'].ATmega328.connections=['Switch 1 connected to D2','Switch 2 connected to D3'];
circuits['Switches'].ATmega32U4={};
circuits['Switches'].ATmega32U4.image='switches_example_leonardo.png';
circuits['Switches'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['switch']];
circuits['Switches'].ATmega32U4.connections=['Switch 1 connected to D2','Switch 2 connected to D3'];
circuits['Switches'].ESP8266={};
circuits['Switches'].ESP8266.image='switches_example_nodemcu.png';
circuits['Switches'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['switch']];
circuits['Switches'].ESP8266.connections=['Switch 1 connected to D2 (GPIO4)','Switch 2 connected to D3 (GPIO0)'];
circuits['Switches'].ESP8266.code_modifier='nodemcu';
circuits['Switches'].ESP32={};
circuits['Switches'].ESP32.image='switches_example_wemosD1R32.png';
circuits['Switches'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['switch']];
circuits['Switches'].ESP32.connections=['Switch 1 connected to D2 (GPIO26)','Switch 2 connected to D3 (GPIO25)'];
circuits['Switches'].ESP32.code_modifier='wemosD1R32';

circuits['Switch_BuiltInLED']={};
circuits['Switch_BuiltInLED'].ATmega328={};
circuits['Switch_BuiltInLED'].ATmega328.image='switch_nano.png';
circuits['Switch_BuiltInLED'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['switch']];
circuits['Switch_BuiltInLED'].ATmega328.connections=['Switch connected to D2','Built-in LED D13'];
circuits['Switch_BuiltInLED'].ATmega32U4={};
circuits['Switch_BuiltInLED'].ATmega32U4.image='switch_leonardo.png';
circuits['Switch_BuiltInLED'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['switch']];
circuits['Switch_BuiltInLED'].ATmega32U4.connections=['Switch connected to D2','Built-in LED D13'];
circuits['Switch_BuiltInLED'].ESP8266={};
circuits['Switch_BuiltInLED'].ESP8266.image='switch_nodemcu.png';
circuits['Switch_BuiltInLED'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['switch']];
circuits['Switch_BuiltInLED'].ESP8266.connections=['Switch connected to D2 (GPIO4)','Built-in LED D0 (GPIO16)'];
circuits['Switch_BuiltInLED'].ESP8266.code_modifier='nodemcu';
circuits['Switch_BuiltInLED'].ESP32={};
circuits['Switch_BuiltInLED'].ESP32.image='switch_wemosD1R32.png';
circuits['Switch_BuiltInLED'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['switch']];
circuits['Switch_BuiltInLED'].ESP32.connections=['Switch connected to D2 (GPIO26)','Built-in LED A0 (GPIO2)'];
circuits['Switch_BuiltInLED'].ESP32.code_modifier='wemosD1R32';

circuits['Pot']={};
circuits['Pot'].ATmega328={};
circuits['Pot'].ATmega328.image='pot_nano.png';
circuits['Pot'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['potentiometer']];
circuits['Pot'].ATmega328.connections=['Potentiometer connected to A0'];
circuits['Pot'].ATmega32U4={};
circuits['Pot'].ATmega32U4.image='pot_leonardo.png';
circuits['Pot'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['potentiometer']];
circuits['Pot'].ATmega32U4.connections=['Potentiometer connected to A0'];
circuits['Pot'].ESP8266={};
circuits['Pot'].ESP8266.image='pot_nodemcu.png';
circuits['Pot'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['potentiometer']];
circuits['Pot'].ESP8266.connections=['Potentiometer connected to A0'];
circuits['Pot'].ESP8266.code_modifier='nodemcu';
circuits['Pot'].ESP32={};
circuits['Pot'].ESP32.image='pot_wemosD1R32.png';
circuits['Pot'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['potentiometer']];
circuits['Pot'].ESP32.connections=['Potentiometer connected to A1 (GPIO4)'];
circuits['Pot'].ESP32.code_modifier='wemosD1R32';


circuits['Pot_BuiltInLED']={};
circuits['Pot_BuiltInLED'].ATmega328={};
circuits['Pot_BuiltInLED'].ATmega328.image='pot_nano.png';
circuits['Pot_BuiltInLED'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['potentiometer']];
circuits['Pot_BuiltInLED'].ATmega328.connections=['Potentiometer connected to A0','Built-in LED D13'];
circuits['Pot_BuiltInLED'].ATmega32U4={};
circuits['Pot_BuiltInLED'].ATmega32U4.image='pot_leonardo.png';
circuits['Pot_BuiltInLED'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['potentiometer']];
circuits['Pot_BuiltInLED'].ATmega32U4.connections=['Potentiometer connected to A0','Built-in LED D13'];
circuits['Pot_BuiltInLED'].ESP8266={};
circuits['Pot_BuiltInLED'].ESP8266.image='pot_nodemcu.png';
circuits['Pot_BuiltInLED'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['potentiometer']];
circuits['Pot_BuiltInLED'].ESP8266.connections=['Potentiometer connected to A0','Built-in LED D0 (GPIO16)'];
circuits['Pot_BuiltInLED'].ESP8266.code_modifier='nodemcu';
circuits['Pot_BuiltInLED'].ESP32={};
circuits['Pot_BuiltInLED'].ESP32.image='pot_wemosD1R32.png';
circuits['Pot_BuiltInLED'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['potentiometer']];
circuits['Pot_BuiltInLED'].ESP32.connections=['Potentiometer connected to A1 (GPIO4)','Built-in LED A0 (GPIO2)'];
circuits['Pot_BuiltInLED'].ESP32.code_modifier='wemosD1R32';

circuits['GUVA_S12SD']={};
circuits['GUVA_S12SD'].ATmega328={};
circuits['GUVA_S12SD'].ATmega328.image='s12sd_example_nano.svg';
circuits['GUVA_S12SD'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['guva_s12sd']];
circuits['GUVA_S12SD'].ATmega328.connections=['GUVA-S12SD connected to A0'];
circuits['GUVA_S12SD'].ATmega32U4={};
circuits['GUVA_S12SD'].ATmega32U4.image='s12sd_example_leonardo.svg';
circuits['GUVA_S12SD'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['guva_s12sd']];
circuits['GUVA_S12SD'].ATmega32U4.connections=['GUVA-S12SD connected to A0'];
circuits['GUVA_S12SD'].ESP8266={};
circuits['GUVA_S12SD'].ESP8266.image='s12sd_example_nodemcu.svg';
circuits['GUVA_S12SD'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['guva_s12sd']];
circuits['GUVA_S12SD'].ESP8266.connections=['GUVA-S12SD connected to A0'];
circuits['GUVA_S12SD'].ESP32={};
circuits['GUVA_S12SD'].ESP32.image='s12sd_example_wemosD1R32.svg';
circuits['GUVA_S12SD'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['guva_s12sd']];
circuits['GUVA_S12SD'].ESP32.connections=['GUVA-S12SD connected to A0 (GPIO2)'];

circuits['gas_mq3']={};
circuits['gas_mq3'].ATmega328={};
circuits['gas_mq3'].ATmega328.image='gas_mq3_nano.png';
circuits['gas_mq3'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['mq3']];
circuits['gas_mq3'].ATmega328.connections=['MQ3 digital output connected to D12','MQ3 analog output connected to A0'];
circuits['gas_mq3'].ATmega32U4={};
circuits['gas_mq3'].ATmega32U4.image='gas_mq3_leonardo.png';
circuits['gas_mq3'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['mq3']];
circuits['gas_mq3'].ATmega32U4.connections=['MQ3 digital output connected to D12','MQ3 analog output connected to A0'];
circuits['gas_mq3'].ESP8266={};
circuits['gas_mq3'].ESP8266.image='gas_mq3_nodemcu.png';
circuits['gas_mq3'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['mq3']];
circuits['gas_mq3'].ESP8266.connections=['MQ3 digital output connected to D2 (GPIO4)','MQ3 analog output connected to A0'];
circuits['gas_mq3'].ESP8266.code_modifier='nodemcu';
circuits['gas_mq3'].ESP32={};
circuits['gas_mq3'].ESP32.image='gas_mq3_wemosD1R32.png';
circuits['gas_mq3'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['mq3']];
circuits['gas_mq3'].ESP32.connections=['MQ3 digital output connected to D12 (GPIO19)','MQ3 analog output connected to A0 (GPIO2)'];
circuits['gas_mq3'].ESP32.code_modifier='wemosD1R32';

circuits['gas_mq3_calibrated']={};
circuits['gas_mq3_calibrated'].ATmega328={};
circuits['gas_mq3_calibrated'].ATmega328.image='gas_mq3_calibrated_nano.png';
circuits['gas_mq3_calibrated'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['mq3'],components['switch']];
circuits['gas_mq3_calibrated'].ATmega328.connections=['Switch connected to D3','MQ3 analog output connected to A0'];
circuits['gas_mq3_calibrated'].ATmega32U4={};
circuits['gas_mq3_calibrated'].ATmega32U4.image='gas_mq3_calibrated_leonardo.png';
circuits['gas_mq3_calibrated'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['mq3'],components['switch']];
circuits['gas_mq3_calibrated'].ATmega32U4.connections=['Switch connected to D3','MQ3 analog output connected to A0'];
circuits['gas_mq3_calibrated'].ESP8266={};
circuits['gas_mq3_calibrated'].ESP8266.image='gas_mq3_calibrated_nodemcu.png';
circuits['gas_mq3_calibrated'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['mq3'],components['switch']];
circuits['gas_mq3_calibrated'].ESP8266.connections=['Switch connected to D3 (GPIO0)','MQ3 analog output connected to A0'];
circuits['gas_mq3_calibrated'].ESP8266.code_modifier='nodemcu';
circuits['gas_mq3_calibrated'].ESP32={};
circuits['gas_mq3_calibrated'].ESP32.image='gas_mq3_calibrated_wemosD1R32.png';
circuits['gas_mq3_calibrated'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['mq3'],components['switch']];
circuits['gas_mq3_calibrated'].ESP32.connections=['Switch connected to D3 (GPIO25)','MQ3 analog output connected to A0 (GPIO2)'];
circuits['gas_mq3_calibrated'].ESP32.code_modifier='wemosD1R32';

circuits['Relay_switch']={};
circuits['Relay_switch'].ATmega328={};
circuits['Relay_switch'].ATmega328.image='relay_example_nano.png';
circuits['Relay_switch'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['switch'],components['relay'],components['smartcar_motor']];
circuits['Relay_switch'].ATmega328.connections=['Switch connected to D2','Relay connected to D3'];
circuits['Relay_switch'].ATmega32U4={};
circuits['Relay_switch'].ATmega32U4.image='relay_example_leonardo.png';
circuits['Relay_switch'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['switch'],components['relay'],components['smartcar_motor']];
circuits['Relay_switch'].ATmega32U4.connections=['Switch connected to D2','Relay connected to D3'];
circuits['Relay_switch'].ESP8266={};
circuits['Relay_switch'].ESP8266.image='relay_example_nodemcu.png';
circuits['Relay_switch'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['switch'],components['relay'],components['smartcar_motor']];
circuits['Relay_switch'].ESP8266.connections=['Switch connected to D2 (GPIO4)','Relay connected to D3 (GPIO0)'];
circuits['Relay_switch'].ESP8266.code_modifier='nodemcu';
circuits['Relay_switch'].ESP32={};
circuits['Relay_switch'].ESP32.image='relay_example_wemosD1R32.png';
circuits['Relay_switch'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['switch'],components['relay'],components['smartcar_motor']];
circuits['Relay_switch'].ESP32.connections=['Switch connected to D2 (GPIO26)','Relay connected to D3 (GPIO25)'];
circuits['Relay_switch'].ESP32.code_modifier='wemosD1R32';


circuits['semaphore_leds']={};
circuits['semaphore_leds'].ATmega328={};
circuits['semaphore_leds'].ATmega328.image='semaphore_leds_nano.png';
circuits['semaphore_leds'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['semaphore']];
circuits['semaphore_leds'].ATmega328.connections=['Green LED connected to D5','Ambar LED connected to D6','Red LED connected to D7'];
circuits['semaphore_leds'].ATmega32U4={};
circuits['semaphore_leds'].ATmega32U4.image='semaphore_leds_leonardo.png';
circuits['semaphore_leds'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['semaphore']];
circuits['semaphore_leds'].ATmega32U4.connections=['Green LED connected to D5','Ambar LED connected to D6','Red LED connected to D7'];
circuits['semaphore_leds'].ESP8266={};
circuits['semaphore_leds'].ESP8266.image='semaphore_leds_nodemcu.png';
circuits['semaphore_leds'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['semaphore']];
circuits['semaphore_leds'].ESP8266.connections=['Green LED connected to D5 (GPIO14)','Ambar LED connected to D6 (GPIO12)','Red LED connected to D7 (GPIO13)'];
circuits['semaphore_leds'].ESP8266.code_modifier='nodemcu';
circuits['semaphore_leds'].ESP32={};
circuits['semaphore_leds'].ESP32.image='semaphore_leds_wemosD1R32.png';
circuits['semaphore_leds'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['semaphore']];
circuits['semaphore_leds'].ESP32.connections=['Green LED connected to D5 (GPIO14)','Ambar LED connected to D6 (GPIO12)','Red LED connected to D7 (GPIO13)'];
circuits['semaphore_leds'].ESP32.code_modifier='wemosD1R32';

circuits['lcd_i2c']={};
circuits['lcd_i2c'].ATmega328={};
circuits['lcd_i2c'].ATmega328.image='lcd_i2c_nano.png';
circuits['lcd_i2c'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['lcd_i2c']];
circuits['lcd_i2c'].ATmega328.connections=['LCD connected to I2C (SDA and SCL)'];
circuits['lcd_i2c'].ATmega32U4={};
circuits['lcd_i2c'].ATmega32U4.image='lcd_i2c_leonardo.png';
circuits['lcd_i2c'].ATmega32U4.components=[components['ArduinoLeonardo'],components['lcd_i2c']];
circuits['lcd_i2c'].ATmega32U4.connections=['LCD connected to I2C (SDA and SCL)'];
circuits['lcd_i2c'].ESP8266={};
circuits['lcd_i2c'].ESP8266.image='lcd_i2c_nodemcu.png';
circuits['lcd_i2c'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['lcd_i2c']];
circuits['lcd_i2c'].ESP8266.connections=['LCD connected to I2C (SDA and SCL)'];
circuits['lcd_i2c'].ESP8266.code_modifier='nodemcu';
circuits['lcd_i2c'].ESP32={};
circuits['lcd_i2c'].ESP32.image='lcd_i2c_wemosD1R32.png';
circuits['lcd_i2c'].ESP32.components=[components['WemosD1R32'],components['lcd_i2c']];
circuits['lcd_i2c'].ESP32.connections=['LCD connected to I2C (SDA and SCL)'];
circuits['lcd_i2c'].ESP32.code_modifier='wemosD1R32';

circuits['ws2812']={};
circuits['ws2812'].ATmega328={};
circuits['ws2812'].ATmega328.image='ws2812_nano.png';
circuits['ws2812'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['rgb_leds7']];
circuits['ws2812'].ATmega328.connections=['RGB LEDs connected to D2'];
circuits['ws2812'].ATmega32U4={};
circuits['ws2812'].ATmega32U4.image='ws2812_leonardo.png';
circuits['ws2812'].ATmega32U4.components=[components['ArduinoLeonardo'],components['rgb_leds7']];
circuits['ws2812'].ATmega32U4.connections=['RGB LEDs connected to D2'];
circuits['ws2812'].ESP8266={};
circuits['ws2812'].ESP8266.image='ws2812_nodemcu.png';
circuits['ws2812'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['rgb_leds7']];
circuits['ws2812'].ESP8266.connections=['RGB LEDs connected to D2'];
circuits['ws2812'].ESP8266.code_modifier='nodemcu';
circuits['ws2812'].ESP32={};
circuits['ws2812'].ESP32.image='ws2812_wemosD1R32.png';
circuits['ws2812'].ESP32.components=[components['WemosD1R32'],components['rgb_leds7']];
circuits['ws2812'].ESP32.connections=['RGB LEDs connected to IO26 (D2)'];
circuits['ws2812'].ESP32.code_modifier='wemosD1R32';

circuits['ws2812_3leds']={};
circuits['ws2812_3leds'].ATmega328={};
circuits['ws2812_3leds'].ATmega328.image='ws2812_3leds_nano.png';
circuits['ws2812_3leds'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['rgb_leds3']];
circuits['ws2812_3leds'].ATmega328.connections=['RGB LEDs connected to D2'];
circuits['ws2812_3leds'].ATmega32U4={};
circuits['ws2812_3leds'].ATmega32U4.image='ws2812_3leds_leonardo.png';
circuits['ws2812_3leds'].ATmega32U4.components=[components['ArduinoLeonardo'],components['rgb_leds3']];
circuits['ws2812_3leds'].ATmega32U4.connections=['RGB LEDs connected to D2'];
circuits['ws2812_3leds'].ESP8266={};
circuits['ws2812_3leds'].ESP8266.image='ws2812_3leds_nodemcu.png';
circuits['ws2812_3leds'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['rgb_leds3']];
circuits['ws2812_3leds'].ESP8266.connections=['RGB LEDs connected to D2'];
circuits['ws2812_3leds'].ESP8266.code_modifier='nodemcu';
circuits['ws2812_3leds'].ESP32={};
circuits['ws2812_3leds'].ESP32.image='ws2812_3leds_wemosD1R32.png';
circuits['ws2812_3leds'].ESP32.components=[components['WemosD1R32'],components['rgb_leds3']];
circuits['ws2812_3leds'].ESP32.connections=['RGB LEDs connected to IO26 (D2)'];
circuits['ws2812_3leds'].ESP32.code_modifier='wemosD1R32';

circuits['tcrt5000']={};
circuits['tcrt5000'].ATmega328={};
circuits['tcrt5000'].ATmega328.image='tcrt5000_nano.png';
circuits['tcrt5000'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['tcrt5000']];
circuits['tcrt5000'].ATmega328.connections=['TCRT5000 output connected to D12','TCRT5000 analog output connected to A0'];
circuits['tcrt5000'].ATmega32U4={};
circuits['tcrt5000'].ATmega32U4.image='tcrt5000_leonardo.png';
circuits['tcrt5000'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['tcrt5000']];
circuits['tcrt5000'].ATmega32U4.connections=['TCRT5000 digital output connected to D12','TCRT5000 analog output connected to A0'];
circuits['tcrt5000'].ESP8266={};
circuits['tcrt5000'].ESP8266.image='tcrt5000_nodemcu.png';
circuits['tcrt5000'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['tcrt5000']];
circuits['tcrt5000'].ESP8266.connections=['TCRT5000 digital output connected to D2 (GPIO4)','TCRT5000 analog output connected to A0'];
circuits['tcrt5000'].ESP8266.code_modifier='nodemcu';
circuits['tcrt5000'].ESP32={};
circuits['tcrt5000'].ESP32.image='tcrt5000_wemosD1R32.png';
circuits['tcrt5000'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['tcrt5000']];
circuits['tcrt5000'].ESP32.connections=['TCRT5000 digital output connected to D12 (GPIO19)','TCRT5000 analog output connected to A0 (GPIO2)'];
circuits['tcrt5000'].ESP32.code_modifier='wemosD1R32';

circuits['bmp180']={};
circuits['bmp180'].ATmega328={};
circuits['bmp180'].ATmega328.image='bmp180_nano.svg';
circuits['bmp180'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['bmp180']];
circuits['bmp180'].ATmega328.connections=['BMP180 SCL connected to I2C SCL','BMP180 SDA connected to I2C SDA'];
circuits['bmp180'].ATmega32U4={};
circuits['bmp180'].ATmega32U4.image='bmp180_leonardo.svg';
circuits['bmp180'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['bmp180']];
circuits['bmp180'].ATmega32U4.connections=['BMP180 SCL connected to I2C SCL','BMP180 SDA connected to I2C SDA'];
circuits['bmp180'].ESP8266={};
circuits['bmp180'].ESP8266.image='bmp180_nodemcu.svg';
circuits['bmp180'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['bmp180']];
circuits['bmp180'].ESP8266.connections=['BMP180 SCL connected to D2 (GPIO4)','BMP180 SDA connected to D1 (GPIO5)'];
circuits['bmp180'].ESP32={};
circuits['bmp180'].ESP32.image='bmp180_wemosD1R32.svg';
circuits['bmp180'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['bmp180']];
circuits['bmp180'].ESP32.connections=['BMP180 SCL connected to I2C SCL (GPIO23)','BMP180 SDA connected to I2C SDA (GPIO22)'];

circuits['two_leds']={};
circuits['two_leds'].ATmega328={};
circuits['two_leds'].ATmega328.image='two_leds_nano.png';
circuits['two_leds'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['Red_LED'],components['Green_LED'],components['Resistors']];
circuits['two_leds'].ATmega328.connections=['Red LED connected to D2','Green LED connected to D3'];
circuits['two_leds'].ATmega32U4={};
circuits['two_leds'].ATmega32U4.image='two_leds_leonardo.png';
circuits['two_leds'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['Red_LED'],components['Green_LED'],components['Resistors']];
circuits['two_leds'].ATmega32U4.connections=['Red LED connected to D2','Green LED connected to D3'];
circuits['two_leds'].ESP8266={};
circuits['two_leds'].ESP8266.image='two_leds_nodemcu.png';
circuits['two_leds'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['Red_LED'],components['Green_LED'],components['Resistors']];
circuits['two_leds'].ESP8266.connections=['Red LED connected to D2 (GPIO4)','Green LED connected to D3 (GPIO0)'];
circuits['two_leds'].ESP8266.code_modifier='nodemcu';
circuits['two_leds'].ESP32={};
circuits['two_leds'].ESP32.image='two_leds_wemosD1R32.png';
circuits['two_leds'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['Red_LED'],components['Green_LED'],components['Resistors']];
circuits['two_leds'].ESP32.connections=['Red LED connected to D2 (GPIO26)','Green LED connected to D3 (GPIO25)'];
circuits['two_leds'].ESP32.code_modifier='wemosD1R32';

circuits['rgb_led']={};
circuits['rgb_led'].ATmega328={};
circuits['rgb_led'].ATmega328.image='RGB_led_nano.png';
circuits['rgb_led'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['RGB_LED']];
circuits['rgb_led'].ATmega328.connections=['Red LED connected to D2','Green LED connected to D3','Blue LED connected to D4'];
circuits['rgb_led'].ATmega32U4={};
circuits['rgb_led'].ATmega32U4.image='RGB_led_leonardo.png';
circuits['rgb_led'].ATmega32U4.components=[components['ArduinoLeonardo'],components['ArduinoSensorShield'],components['RGB_LED']];
circuits['rgb_led'].ATmega32U4.connections=['Red LED connected to D2','Green LED connected to D3','Blue LED connected to D4'];
circuits['rgb_led'].ESP8266={};
circuits['rgb_led'].ESP8266.image='RGB_led_nodemcu.png';
circuits['rgb_led'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['RGB_LED']];
circuits['rgb_led'].ESP8266.connections=['Red LED connected to D2 (GPIO4)','Green LED connected to D3 (GPIO0)','Blue LED connected to D4 (GPIO2)'];
circuits['rgb_led'].ESP8266.code_modifier='nodemcu';
circuits['rgb_led'].ESP32={};
circuits['rgb_led'].ESP32.image='RGB_led_wemosD1R32.png';
circuits['rgb_led'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['RGB_LED']];
circuits['rgb_led'].ESP32.connections=['Red LED connected to D2 (GPIO26)','Green LED connected to D3 (GPIO25)','Blue LED connected to D4 (GPIO17)'];
circuits['rgb_led'].ESP32.code_modifier='wemosD1R32';

circuits['Relay_dht']={};
circuits['Relay_dht'].ESP8266={};
circuits['Relay_dht'].ESP8266.image='read_temp_relay_iot_nodemcu.png';
circuits['Relay_dht'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['dht11'],components['relay'],components['fan']];
circuits['Relay_dht'].ESP8266.connections=['Switch connected to D2 (GPIO4)','Relay connected to D3 (GPIO0)'];
circuits['Relay_dht'].ESP8266.code_modifier='nodemcu';
circuits['Relay_dht'].ESP32={};
circuits['Relay_dht'].ESP32.image='read_temp_relay_iot_wemosD1R32.png';
circuits['Relay_dht'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['dht11'],components['relay'],components['fan']];
circuits['Relay_dht'].ESP32.connections=['Switch connected to D2 (GPIO26)','Relay connected to D3 (GPIO25)'];
circuits['Relay_dht'].ESP32.code_modifier='wemosD1R32';

circuits['Servo']={};
circuits['Servo'].ATmega328={};
circuits['Servo'].ATmega328.image='servo_example.png';
circuits['Servo'].ATmega328.components=[components['ArduinoNano']];
circuits['Servo'].ATmega328.connections=[];
circuits['Servo'].ESP8266={};
circuits['Servo'].ESP8266.image='servo_example_nodemcu.png';
circuits['Servo'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['servo']];
circuits['Servo'].ESP8266.connections=['Servo connected to D3 (GPIO0)'];
circuits['Servo'].ESP8266.code_modifier='nodemcu';
circuits['Servo'].ESP32={};
circuits['Servo'].ESP32.image='servo_example_wemosD1R32.png';
circuits['Servo'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['servo']];
circuits['Servo'].ESP32.connections=['Servo connected to D3 (GPIO25)'];
circuits['Servo'].ESP32.code_modifier='wemosD1R32';

circuits['AnalogRain']={};
circuits['AnalogRain'].ATmega328={};
circuits['AnalogRain'].ATmega328.image='rain_sensor_analog.svg';
circuits['AnalogRain'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['RainSensor']];
circuits['AnalogRain'].ATmega328.connections=['Analog output connected to A1'];
circuits['AnalogRain'].ESP8266={};
circuits['AnalogRain'].ESP8266.image='rain_sensor_analog_nodemcu.svg';
circuits['AnalogRain'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['RainSensor']];
circuits['AnalogRain'].ESP8266.connections=['Analog output connected to A0'];
circuits['AnalogRain'].ESP8266.code_modifier='nodemcu';
circuits['AnalogRain'].ESP32={};
circuits['AnalogRain'].ESP32.image='rain_sensor_analog_wemosD1R32.svg';
circuits['AnalogRain'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['RainSensor']];
circuits['AnalogRain'].ESP32.connections=['Analog output connected to A1 (GPIO4)'];
circuits['AnalogRain'].ESP32.code_modifier='wemosD1R32';

circuits['Rain']={};
circuits['Rain'].ATmega328={};
circuits['Rain'].ATmega328.image='rain_sensor.svg';
circuits['Rain'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['RainSensor']];
circuits['Rain'].ATmega328.connections=['Digital output connected to D2','Analog output connected to A1'];
circuits['Rain'].ESP8266={};
circuits['Rain'].ESP8266.image='rain_sensor_nodemcu.svg';
circuits['Rain'].ESP8266.components=[components['NodeMCU'],components['NodeMCUShield'],components['RainSensor']];
circuits['Rain'].ESP8266.connections=['Digital output connected to D2 (GPIO4)','Analog output connected to A0'];
circuits['Rain'].ESP8266.code_modifier='nodemcu';
circuits['Rain'].ESP32={};
circuits['Rain'].ESP32.image='rain_sensor_wemosD1R32.svg';
circuits['Rain'].ESP32.components=[components['WemosD1R32'],components['ArduinoSensorShield'],components['RainSensor']];
circuits['Rain'].ESP32.connections=['Digital output connected to D2 (GPIO26)','Analog output connected to A1 (GPIO4)'];
circuits['Rain'].ESP32.code_modifier='wemosD1R32';

circuits['BuzzerPWM']={};
circuits['BuzzerPWM'].ATmega328={};
circuits['BuzzerPWM'].ATmega328.image='buzzer_pwm.svg';
circuits['BuzzerPWM'].ATmega328.components=[components['ArduinoNano'],components['ArduinoNanoShield'],components['Buzzer']];
circuits['BuzzerPWM'].ATmega328.connections=['PWM signal connected to D3'];

var examples={};

examples['controls_setupLoop_example']={};
examples['controls_setupLoop_example'].title='Message print setup/loop';
examples['controls_setupLoop_example'].desc='This example shows a message at startup and one at the main loop.';
examples['controls_setupLoop_example'].circuit=circuits['Simple'];

examples['serial_read_example']={};
examples['serial_read_example'].title='Reading the USB serial port';
examples['serial_read_example'].desc='This example waits for the letter \'s\' to begin with the rest of the program. In the ASCII table, the letter \'s\' corresponds to the value 115.';
examples['serial_read_example'].circuit=circuits['Simple'];

examples['controls_statemachine_example1']={};
examples['controls_statemachine_example1'].title='State machine START/STOP';
examples['controls_statemachine_example1'].desc='This example controls the activation or deactivation of a fan motor with a simple two-state START / STOP machine. In state 0 (initially active) the motor will be deactivated, while in state 1, the motor will be activated. The transition conditions from one state to another are defined by the transition instructions. Specifically, to move from state 0 to state 1, we must press the button 2 (BUT2), while to move from state 1 to 0, we will press the button 3 (BUT3).';
examples['controls_statemachine_example1'].circuit=circuits['Relay_buttons'];
examples['controls_statemachine_example1'].grafcet='controls_statemachine_grafcet1.png';

examples['controls_statemachine_example2']={};
examples['controls_statemachine_example2'].title='State machine AND divergence/convergence';
examples['controls_statemachine_example2'].desc='This example controls the activation or deactivation of a fan motor and an LED with a single four state state machine using an AND divergence and AND convergence. In state 0 (initially active) the motor will be deactivated and the LED will be off, while in state 1, the motor will be activated. On the other hand, in state 2 the LED will be on, while in state 3 the LED will be off. The transition conditions from one state to another are defined by the transition instructions. Specifically, to switch from state 0 to state 1, we must press the button 2 (BUT2) connected to pin 2, which will also activate state 2. To switch to state 3 from state 2, we must press the button 3 (BUT3). The transition with states 1 and 3 activated to state 0 is immediate, since it uses a "1" (always true).';
examples['controls_statemachine_example2'].circuit=circuits['Relay_buttons'];
examples['controls_statemachine_example2'].grafcet='controls_statemachine_grafcet2.png';

examples['controls_statemachine_example3']={};
examples['controls_statemachine_example3'].title='State machine OR divergence/convergence';
examples['controls_statemachine_example3'].desc='This example controls the activation or deactivation of a fan and a light with a single three-state state machine using an OR divergence and OR convergence, so that only one of the two can be active. In state 0 (initially active) the fan an the light will be deactivated, while in state 1, the fan will be activated (and light will be deactivated) and in state 2, the light will be activated (and the fan will be deactivated). The transition conditions from one state to another are defined by the transition instructions. Specifically, to go from state 0 to state 1, we must press the button 2 (BUT2). To go to state 2 we must press the button 3 (BUT3). The button 4 (BUT4)  will disable either of the two previous states, that is state 1 or 2.';
examples['controls_statemachine_example3'].circuit=circuits['Relay_buttons3'];
examples['controls_statemachine_example3'].grafcet='controls_statemachine_grafcet3.png';

examples['controls_statemachine_example4']={};
examples['controls_statemachine_example4'].title='Two state machines';
examples['controls_statemachine_example4'].desc='This example controls the activation or deactivation of a fan and a light with a single four state machine, but with two independent state machines. In state 0 (initially active), fan will be deactivated, and activated while in state 1. On the other hand, in state 2 (initially active) the light will be deactivated, and active while in state 3. The transition conditions from one state to another are defined by the transition instructions. Specifically, to go from state 0 to state 1, we must press the button BUT2. To go to state 3 we must press the button BUT3. The button BUT4 will disable any of the two active states, either state 1 or 3.';
examples['controls_statemachine_example4'].circuit=circuits['Relay_buttons3'];
examples['controls_statemachine_example4'].grafcet='controls_statemachine_grafcet4.png';


examples['controls_switch_example']={};
examples['controls_switch_example'].title='Semaphore control through bluetooth';
examples['controls_switch_example'].desc='In this example ASCII characters are read through bluetooth. If the user sends a \'0\' (30 in ASCII), the green LED lights up. If the user sends a \'1\' (31 to ASCII), the ambar LED lights up, whereas if a \'2\' (32 in ASCII) is sent, the red LED lights up. Any other data received will turn off all the LEDs.';
examples['controls_switch_example'].circuit=circuits['Bluetooth_leds'];

examples['controls_whileUntil_example']={};
examples['controls_whileUntil_example'].title='Wait until high state condition';
examples['controls_whileUntil_example'].desc='In this example, the program waits meanwhile the user does not press the button (high state).';
examples['controls_whileUntil_example'].circuit=circuits['Switch'];

examples['controls_whileUntil1_example']={};
examples['controls_whileUntil1_example'].title='Wait until low state condition';
examples['controls_whileUntil1_example'].desc='In this example, the program holds until the user presses the button (low state).';
examples['controls_whileUntil1_example'].circuit=circuits['Switch'];

examples['ambient_guva_s12sd_example']={};
examples['ambient_guva_s12sd_example'].title='Ambient sensor GUVA-S12SD';
examples['ambient_guva_s12sd_example'].desc='In this example, the values of radiation and the UV-index with GUVA S12SD sensor are displayed on the console.';
examples['ambient_guva_s12sd_example'].circuit=circuits['GUVA_S12SD'];

examples['gas_mq3_example']={};
examples['gas_mq3_example'].title='Gas sensor reading';
examples['gas_mq3_example'].desc='This example shows how to measure both analog and digital values of a gas sensor. The result of both measurements is shown through the console.';
examples['gas_mq3_example'].circuit=circuits['gas_mq3'];

examples['gas_mq3_calibrated_example']={};
examples['gas_mq3_calibrated_example'].title='Calibrated gas sensor reading';
examples['gas_mq3_calibrated_example'].desc='In this example we show how to calibrate a gas sensor. First, the program waits until you press a button so that pre-heating time has been accomplished. After that, calibrates the sensor and displays on the console the value of the resistance. Once calibrated, the sensor measurements can be obtained in ppm by selecting the appropriate gas type.';
examples['gas_mq3_calibrated_example'].circuit=circuits['gas_mq3_calibrated'];

examples['array_example1']={};
examples['array_example1'].title='Using array variables';
examples['array_example1'].desc='This example shows how to use array variables and constructor. First, it declares a global and local array and then it creates a copy of the local array. The elements of the new created array are then modified with values of the global array. The resulting operation is shown on the console.';
examples['array_example1'].circuit=circuits['Simple'];

examples['array_example2']={};
examples['array_example2'].title='Using constant array variables';
examples['array_example2'].desc='This example shows how to use constant array variables. First, it declares a global and local array and then it creates another local array. The elements of the new created array are assigned with values of the global and local arrays. The resulting values are shown on the console.';
examples['array_example2'].circuit=circuits['Simple'];

examples['array_example3']={};
examples['array_example3'].title='Using array variables with type for encoding and decoding';
examples['array_example3'].desc='This example shows how to use array variables with type. The example generates three random numbers with different ranges and encodes the numbers into an array. It accumulates the numbers using a for loop and a global array variable and then it decodes the resulting operation and prints the values.';
examples['array_example3'].circuit=circuits['Simple'];

examples['variables_example']={};
examples['variables_example'].title='Using local and global variables';
examples['variables_example'].desc='This example shows the use of local and global variables.';
examples['variables_example'].circuit=circuits['Simple'];



examples['inout_digital_read_example']={};
examples['inout_digital_read_example'].title='AND example with two buttons and a LED';
examples['inout_digital_read_example'].desc='In this example, the built-in LED (GPIO'+Facilino.profiles['default'].builtin+') lights up if the buttons are pressed at the same time, otherwise the LED turns off.';
examples['inout_digital_read_example'].circuit=circuits['Switches'];

examples['inout_highlow_example']={};
examples['inout_highlow_example'].title='Button status';
examples['inout_highlow_example'].desc='In this example, it shows the value of the button status (HIGH or LOW).';
examples['inout_highlow_example'].circuit=circuits['Switch'];

examples['variables_global_volatile_type_example']={};
examples['variables_global_volatile_type_example'].title='Shared variables';
examples['variables_global_volatile_type_example'].desc='This example shows the use of a shared variable.';
examples['variables_global_volatile_type_example'].circuit=circuits['Switch'];

examples['dyor_31_in_1_relay_example']={};
examples['dyor_31_in_1_relay_example'].title='Relay control by interrupt';
examples['dyor_31_in_1_relay_example'].desc='In this example the current of an motor is cut off if an intruder invades a safety area (represented by the pushbutton). As this is a security issue, the code has been included within an interrupt.';
examples['dyor_31_in_1_relay_example'].circuit=circuits['Relay_switch'];


examples['LED_race_console']={};
examples['LED_race_console'].title='Counting button switch (through interrupt)';
examples['LED_race_console'].desc='In this example, we count the amount of time that we press a switch button using interrupts. The idea behind this code is that serves as the basis for LED racing applications where two uses must press as fast as possible their switches. On each button interrupt, an internal counter is increased and after reaching the maximum number of LEDs (150), the counter is set to zero. The example keeps track of which LED position must be swtich on and which LED position must be swithc off.';
examples['LED_race_console'].circuit=circuits['Switches'];


examples['task_shared_var_example']={};
examples['task_shared_var_example'].title='Timed task with a shared variable';
examples['task_shared_var_example'].desc='This example shows how to use a timed-task interrupt with a shared global variable.';
examples['task_shared_var_example'].circuit=circuits['Simple'];

examples['dyor_task_example']={};
examples['dyor_task_example'].title='Timed task with a shared variable';
examples['dyor_task_example'].desc='This example shows how to use a timed-task interrupt with a shared global variable.';
examples['dyor_task_example'].circuit=circuits['Simple'];

examples['semaphore_task_example']={};
examples['semaphore_task_example'].title='Task example with a traffic light';
examples['semaphore_task_example'].desc='This example shows how turn ON and OFF the lights of a traffic light periodically with a timed task interrupt.';
examples['semaphore_task_example'].circuit=circuits['semaphore_leds'];

examples['buttons_ui']={};
examples['buttons_ui'].title='UI with two buttons';
examples['buttons_ui'].desc='In this example, we implement a basic UI with two buttons. There\'s a general UI view that will be displayed when no button is pressed or the refreshed time has elapsed. There are three menus: "Menu0", "Menu1" and "Menu2". Depending on the selected menu, we can access to different options and distinguish between the option is highlighted (it means that the name of the option will be shown on the display) or selected (it means that the option has been actively selected and the corresponding action for that option will be executed).';
examples['buttons_ui'].circuit=circuits['Switches'];

examples['lower_upper_case_example']={};
examples['lower_upper_case_example'].title='Lower and Upper case';
examples['lower_upper_case_example'].desc='This example shows on the console the lower and upper case versions of the text \'HeLLo\'.';
examples['lower_upper_case_example'].circuit=circuits['Simple'];

examples['text_to_text_example']={};
examples['text_to_text_example'].title='Convert to text';
examples['text_to_text_example'].desc='In this example the number 12345 is converted to a String to determine the number of digits. On the other hand, the number 113 that corresponds to the letter \'q\' in ASCII is converted.';
examples['text_to_text_example'].circuit=circuits['Simple'];

examples['toNumber_example']={};
examples['toNumber_example'].title='Convert text to number';
examples['toNumber_example'].desc='This example shows two text to number convertions. The first one is an integer, while the second one is a float (real number). The sum of the numbers is displayed on the console.';
examples['toNumber_example'].circuit=circuits['Simple'];

examples['text_substring_example']={};
examples['text_substring_example'].title='Text substring';
examples['text_substring_example'].desc='In this example the phrase "Hello world!" is cut out, showing only "llo w".';
examples['text_substring_example'].circuit=circuits['Simple'];

examples['text_search_example']={};
examples['text_search_example'].title='Text search';
examples['text_search_example'].desc='In this example the letter "o" is searched for in the phrase "Hello world!". The first instance is in position 4 and the last instance in position 7.';
examples['text_search_example'].circuit=circuits['Simple'];

examples['text_length_example']={};
examples['text_length_example'].title='Text length';
examples['text_length_example'].desc='This example counts the number of characters entered through the console.';
examples['text_length_example'].circuit=circuits['Simple'];

examples['text_join_example']={};
examples['text_join_example'].title='Text concatenation';
examples['text_join_example'].desc='This example shows how you can concatenate a single text string with a number.';
examples['text_join_example'].circuit=circuits['Simple'];

examples['text_equalsIgnoreCase_example']={};
examples['text_equalsIgnoreCase_example'].title='Text is equal?';
examples['text_equalsIgnoreCase_example'].desc='This example shows how "hello" can be compared to "HELLO" (the built-in LED on the board should flash).';
examples['text_equalsIgnoreCase_example'].circuit=circuits['Simple'];

examples['text_contains_example']={};
examples['text_contains_example'].title='Contains text?';
examples['text_contains_example'].desc='This example looks for the expression "wo" in the phrase "Hello world!". If it is found, the integrated LED on the board will turn on, otherwise it will turn it off.';
examples['text_contains_example'].circuit=circuits['Simple'];


examples['charAt_example']={};
examples['charAt_example'].title='Get character from String';
examples['charAt_example'].desc='Character at the indicated position of the text string.';
examples['charAt_example'].circuit=circuits['Simple'];

examples['text_append_example']={};
examples['text_append_example'].title='Append numbers to text';
examples['text_append_example'].desc='This example shows how append number to a text variable. Specifically the numbers from 1 to 10 are added.';
examples['text_append_example'].circuit=circuits['Simple'];

examples['lowpass_filter_example']={};
examples['lowpass_filter_example'].title='Low-pass filter';
examples['lowpass_filter_example'].desc='This example shows how to filter a noisy signal (composed of three sinousoids) using a low-pass filter. In this example, the cut-off frequency is set to 10Hz, corresponding to 10% of the half of the sampling frequency (100Hz).';
examples['lowpass_filter_example'].circuit=circuits['Simple'];

examples['highpass_filter_example']={};
examples['highpass_filter_example'].title='High-pass filter';
examples['highpass_filter_example'].desc='This example shows how to filter a noisy signal (composed of three sinousoids) using a high-pass filter. In this example, the cut-off frequency is set to 80Hz, corresponding to 80% of the half of the sampling frequency (100Hz).';
examples['highpass_filter_example'].circuit=circuits['Simple'];

examples['bandstop_filter_example']={};
examples['bandstop_filter_example'].title='Band-stop filter';
examples['bandstop_filter_example'].desc='This example shows how to filter a noisy signal (composed of three sinousoids) using a band-stop filter. In this example, the cut-off frequencies are set to 35Hz and 45Hz, corresponding to 35% and 45% of the half of the sampling frequency (100Hz).';
examples['bandstop_filter_example'].circuit=circuits['Simple'];

examples['bandpass_filter_example']={};
examples['bandpass_filter_example'].title='Band-pass filter';
examples['bandpass_filter_example'].desc='This example shows how to filter a noisy signal (composed of three sinousoids) using a band-pass filter. In this example, the cut-off frequencies are set to 35Hz and 45Hz, corresponding to 35% and 45% of the half of the sampling frequency (100Hz).';
examples['bandpass_filter_example'].circuit=circuits['Simple'];

examples['controls_lcd1_example']={};
examples['controls_lcd1_example'].title='LCD I2C';
examples['controls_lcd1_example'].desc='This example shows an I2C LCD screen. The code in the example shows the phrase \'Hello world!\' on the LCD.';
examples['controls_lcd1_example'].circuit=circuits['lcd_i2c'];

examples['controls_lcd_clear1_example']={};
examples['controls_lcd_clear1_example'].title='LCD I2C Clear and Set Cursor';
examples['controls_lcd_clear1_example'].desc='This example shows a circuit with an LCD connected to I2C. The code in the example shows the phrase "Hello" in the first row and "world!" on the second row of the LCD.';
examples['controls_lcd_clear1_example'].circuit=circuits['lcd_i2c'];

examples['scrolling_text_example']={};
examples['scrolling_text_example'].title='LCD I2C Clear and Set Cursor';
examples['scrolling_text_example'].desc='This example shows a circuit with an LCD connected to I2C. The code in the example shows the phrase "Hello" in the first row and "world!" on the second row of the LCD.';
examples['scrolling_text_example'].circuit=circuits['lcd_i2c'];

examples['led_strip_demo']={};
examples['led_strip_demo'].title='RGB LED Strip (round with 7 LEDs)';
examples['led_strip_demo'].desc='In this example, we shown activate and deactivate the pixels of a 7-RGB LEDs strip (the pixel in the middle is set fixed to a different colour). The brightness of the pixels varies progresively.';
examples['led_strip_demo'].circuit=circuits['ws2812'];

examples['led_strip2_demo']={};
examples['led_strip2_demo'].title='RGB LED Strip';
examples['led_strip2_demo'].desc='In this example, we shown a coloured sequence of LEDs using a 3 LED RGB strip.';
examples['led_strip2_demo'].circuit=circuits['ws2812_3leds'];

examples['serial_plot_example']={};
examples['serial_plot_example'].title='Serial Plot';
examples['serial_plot_example'].desc='This example plots values from TCRT5000 sensor on the console (plot view).';
examples['serial_plot_example'].circuit=circuits['tcrt5000'];

examples['plot_join_example']={};
examples['plot_join_example'].title='Multiple Plot';
examples['plot_join_example'].desc='This example plots values from TCRT5000 sensor on the console (plot view). The analog and digital signals have been scaled to have the same units.';
examples['plot_join_example'].circuit=circuits['tcrt5000'];

examples['logic_combine_example']={};
examples['logic_combine_example'].title='Logic combine';
examples['logic_combine_example'].desc='This example shows how to combine data of different sizes into one single data. The examples proves two equivalent ways of combining four 8-bit data (bytes) into a 32-bit number (long int). The results are printed in HEX format in the console (no leading zeros added).';
examples['logic_combine_example'].circuit=circuits['Simple'];

examples['ambient_pressureBMP180_example']={};
examples['ambient_pressureBMP180_example'].title='Barometric Preassure Sensor (BMP180) example';
examples['ambient_pressureBMP180_example'].desc='This example shows the barometric pressure, temperature, and estimated altitude measurements with the barometric sensor BMP180.';
examples['ambient_pressureBMP180_example'].circuit=circuits['bmp180'];

examples['procedures_callnoreturn_example']={};
examples['procedures_callnoreturn_example'].title='Simple Procedure';
examples['procedures_callnoreturn_example'].desc='In this example a message is displayed on the console through a function.';
examples['procedures_callnoreturn_example'].circuit=circuits['Simple'];

examples['procedures_callreturn_example']={};
examples['procedures_callreturn_example'].title='Simple Function';
examples['procedures_callreturn_example'].desc='In this example, a simple addition function of two numbers is defined.';
examples['procedures_callreturn_example'].circuit=circuits['Simple'];

examples['procedures_ifreturn_example']={};
examples['procedures_ifreturn_example'].title='Unfair coin';
examples['procedures_ifreturn_example'].desc='This example implements a loaded coin that has 30% chance to return 1 and 70% chance to return 0. In the example, the function is called 100 times to see how many times it has returned 1.';
examples['procedures_ifreturn_example'].circuit=circuits['Simple'];

examples['procedures_return_example']={};
examples['procedures_return_example'].title='Read number';
examples['procedures_return_example'].desc='In this example the user is prompted to provide a number greater than 0 and after entering the number, the function returns the value of the number in case there is any data available on the serial port.';
examples['procedures_return_example'].circuit=circuits['Simple'];

examples['controls_flow_statements_example1']={};
examples['controls_flow_statements_example1'].title='Secret number';
examples['controls_flow_statements_example1'].desc='This example is a guessing game of a secret number. From the console, we can enter numbers from 1 to 100 until we guess with the secret number.';
examples['controls_flow_statements_example1'].circuit=circuits['Simple'];

examples['controls_flow_statements_example2']={};
examples['controls_flow_statements_example2'].title='Stopping a flashing LED';
examples['controls_flow_statements_example2'].desc='In this example, a LED flashes by default, however, when the button is pressed the LED will stop blinking.';
examples['controls_flow_statements_example2'].circuit=circuits['Switch_BuiltInLED'];

examples['controls_repeat_example']={};
examples['controls_repeat_example'].title='Repeating a sentence';
examples['controls_repeat_example'].desc='This example shows a sentence repeated 100 times.';
examples['controls_repeat_example'].circuit=circuits['Simple'];

examples['controls_for_example']={};
examples['controls_for_example'].title='Simple \'For\' loop';
examples['controls_for_example'].desc='This example shows the numbers from 1 to 100';
examples['controls_for_example'].circuit=circuits['Simple'];

examples['controls_if_example']={};
examples['controls_if_example'].title='Flashing Built-in LED based on potentiometer values';
examples['controls_if_example'].desc='In this example, the analog input value of the potentiometer is read. When the value exceeds a given value 800 units (in 10-bit ADCs such Arduino Nano), the integrated LED on the board lights up; if the analog value is between 800 and 300, the LED flashes; if the value is below 300, the LED is off. If the ADCs has 12-bits, then the values to compare are 3200 and 1200, respectively.';
examples['controls_if_example'].circuit=circuits['Pot_BuiltInLED'];

examples['controls_doWhile_example1']={};
examples['controls_doWhile_example1'].title='Execute 10 times (version 1)';
examples['controls_doWhile_example1'].desc='In this example, a code is executed 10 times.';
examples['controls_doWhile_example1'].circuit=circuits['Simple'];

examples['controls_doWhile_example2']={};
examples['controls_doWhile_example2'].title='Execute 10 times (version 2)';
examples['controls_doWhile_example2'].desc='In this example, a code is executed 10 times.';
examples['controls_doWhile_example2'].circuit=circuits['Simple'];

examples['base_delay_example']={};
examples['base_delay_example'].title='Delayed printed message in milliseconds';
examples['base_delay_example'].desc='This example shows a message per console at startup and 10 seconds later (10000 milliseconds) another message is displayed.';
examples['base_delay_example'].circuit=circuits['Simple'];

examples['base_delay_sec_example']={};
examples['base_delay_sec_example'].title='Delayed printed message in seconds';
examples['base_delay_sec_example'].desc='This example shows a message per console at startup and 10 seconds later another message is displayed.';
examples['base_delay_sec_example'].circuit=circuits['Simple'];


examples['base_us_example']={};
examples['base_us_example'].title='Elapsed time';
examples['base_us_example'].desc='This example measures the time elapsed from the start (in milliseconds and microseconds) until a button is pressed.';
examples['base_us_example'].circuit=circuits['Switch'];

examples['dyor_controls_wait_example']={};
examples['dyor_controls_wait_example'].title='Wait until pressed';
examples['dyor_controls_wait_example'].desc='In this example the program waits for a button to be pressed. After pressing it, the integrated LED on the board lights up.';
examples['dyor_controls_wait_example'].circuit=circuits['Switch_BuiltInLED'];

examples['controls_every']={};
examples['controls_every'].title='Blink every specified time';
examples['controls_every'].desc='This example controls the blinking of two LEDs with different switching periods (no interrupts used).';
examples['controls_every'].circuit=circuits['two_leds'];

examples['controls_alternate_example']={};
examples['controls_alternate_example'].title='Blinking alternatively';
examples['controls_alternate_example'].desc='This example controls the blinking of two LEDs with different switching periods.';
examples['controls_alternate_example'].circuit=circuits['two_leds'];

examples['controls_alternate_rgb_example']={};
examples['controls_alternate_rgb_example'].title='Blinking alternatively';
examples['controls_alternate_rgb_example'].desc='In this example, the colour of an RGB LED is changed to alternate red, green and blue colours sequentially.';
examples['controls_alternate_rgb_example'].circuit=circuits['rgb_led'];

examples['comment_example']={};
examples['comment_example'].title='Comments';
examples['comment_example'].desc='In this example, we show how to use a comment instruction. This instruction does not adds a comment on the generated code.';
examples['comment_example'].circuit=circuits['Simple'];

examples['deep_sleep_example']={};
examples['deep_sleep_example'].title='Sleeping at low temperatures';
examples['deep_sleep_example'].desc='This example shows how to use the Deep Sleep functionality of ESP boards. If the temperature is below or equal to 25ºC, the processor enters in a deep sleep mode (for saving energy). Every 60 seconds, wakes up and checks the temperature. If the temperature is above 25ºC then activates a relay connected to fan during at least 60 seconds until the temperature goes down.';
examples['deep_sleep_example'].circuit=circuits['Relay_dht'];

examples['programming_execute_example']={};
examples['programming_execute_example'].title='Arduino Code';
examples['programming_execute_example'].desc='This example shows the phrase "Hello world!" using Arduino instructions (directly).';
examples['programming_execute_example'].circuit=circuits['Simple'];


examples['programming_execute_example']={};
examples['programming_execute_example'].title='Arduino Code';
examples['programming_execute_example'].desc='This example shows the phrase "Hello world!" using Arduino instructions (directly).';
examples['programming_execute_example'].circuit=circuits['Simple'];

examples['logic_compare_example']={};
examples['logic_compare_example'].title='Guess the secret number';
examples['logic_compare_example'].desc='In this example, a set of clues are provided to guess a secret number. Comparisons are being made to see if the indicated clue is met.';
examples['logic_compare_example'].circuit=circuits['Simple'];

examples['logic_operation_example']={};
examples['logic_operation_example'].title='Logic operations';
examples['logic_operation_example'].desc='This example shows, through the integrated LED, the result of the selected logic operation (according to the number entered through the console). The input values ​​are determined based on the logic operation and wether the buttons are pressed.';
examples['logic_operation_example'].circuit=circuits['Switches'];


examples['logic_negate_example']={};
examples['logic_negate_example'].title='Negating an input';
examples['logic_negate_example'].desc='In this example, the value read at digital input 2 (connected to a pusher) is negated. The button is read as LOW in case of being pressed, which is equivalent to false in binary. When negating the input, if we press the button the output of the negation instruction will return true.';
examples['logic_negate_example'].circuit=circuits['Switch'];

examples['logic_to_boolean_example']={};
examples['logic_to_boolean_example'].title='Is it zero?';
examples['logic_to_boolean_example'].desc='Reads a number and check if it a zero or not.';
examples['logic_to_boolean_example'].circuit=circuits['Simple'];

examples['math_number_example']={};
examples['math_number_example'].title='Integers and decimal numbers';
examples['math_number_example'].desc='This example defines an integer and a decimal number.';
examples['math_number_example'].circuit=circuits['Simple'];

examples['math_arithmetic_example']={};
examples['math_arithmetic_example'].title='Some basic math operations';
examples['math_arithmetic_example'].desc='In this example we perform a set of mathematical operations that always return the number 16 as a result.';
examples['math_arithmetic_example'].circuit=circuits['Simple'];

examples['math_single_example']={};
examples['math_single_example'].title='Math operations with decimal numbers';
examples['math_single_example'].desc='In this example, several mathematical operations are performed to demonstrate the use of the instruction.';
examples['math_single_example'].circuit=circuits['Simple'];

examples['base_map_example']={};
examples['base_map_example'].title='Linear mapping ';
examples['base_map_example'].desc='In this example the analog-to-digital conversion is displayed with a rage from 0 to 255 (originally the signal range is from 0 to 1023).';
examples['base_map_example'].circuit=circuits['Pot'];

examples['advanced_map_example']={};
examples['advanced_map_example'].title='Advanced Linear mapping ';
examples['advanced_map_example'].desc='In this example the analog-to-digital conversion is displayed with a range from -10 to 10 (originally the signal range is from 0 to 1023).';
examples['advanced_map_example'].circuit=circuits['Pot'];

examples['minmax_example']={};
examples['minmax_example'].title='Minimum and maximum';
examples['minmax_example'].desc='In this example we compute the minimum and maximum between two numbers.';
examples['minmax_example'].circuit=circuits['Simple'];

examples['math_random_example']={};
examples['math_random_example'].title='Random numbers';
examples['math_random_example'].desc='In this example 100 random numbers are generated.';
examples['math_random_example'].circuit=circuits['Simple'];

examples['math_to_number_example']={};
examples['math_to_number_example'].title='Casting numbers';
examples['math_to_number_example'].desc='In this example different types of conversions are performed that show the possible errors that can be committed if they are not carried out with caution.';
examples['math_to_number_example'].circuit=circuits['Simple'];

examples['math_sinusoid_example']={};
examples['math_sinusoid_example'].title='Oscillating servo';
examples['math_sinusoid_example'].desc='In this example an oscillating motion is performed on a position servo (these movements are those used in some walking robots).';
examples['math_sinusoid_example'].circuit=circuits['Servo'];

examples['array_example1']={};
examples['array_example1'].title='Working with arrays (basic)';
examples['array_example1'].desc='This example shows how to use array variables and constructor. First, it declares a global and local array and then it creates a copy of the local array. The elements of the new created array are then modified with values of the global array. The resulting operation is shown on the console.';
examples['array_example1'].circuit=circuits['Simple'];

examples['array_example2']={};
examples['array_example2'].title='Working with fixed arrays';
examples['array_example2'].desc='This example shows how to use array constructors of fixed size. The examples shows how to access to specific array elements based on their positions.';
examples['array_example2'].circuit=circuits['Simple'];

examples['array_example3']={};
examples['array_example3'].title='Encoding/decoding arrays';
examples['array_example3'].desc='This example shows how to encode a set of numbers into an array or to decode an array into a set of numbers. This blocks might be useful when working with telegrams sent over a serial/bluetooth communication.';
examples['array_example3'].circuit=circuits['Simple'];

examples['linear_function_demo']={};
examples['linear_function_demo'].title='Linear function';
examples['linear_function_demo'].desc='This is a demo example plotting the linear function. You can visualize it using Arduino Plotter tool.';
examples['linear_function_demo'].circuit=circuits['Simple'];

examples['quadratic_function_demo']={};
examples['quadratic_function_demo'].title='Quadratic function';
examples['quadratic_function_demo'].desc='This is a demo example plotting the quadratic function. You can visualize it using Arduino Plotter tool.';
examples['quadratic_function_demo'].circuit=circuits['Simple'];

examples['cubic_function_demo']={};
examples['cubic_function_demo'].title='Cubic function';
examples['cubic_function_demo'].desc='This is a demo example plotting the cubic function. You can visualize it using Arduino Plotter tool.';
examples['cubic_function_demo'].circuit=circuits['Simple'];

examples['reciprocal_function_demo']={};
examples['reciprocal_function_demo'].title='Reciprocal function';
examples['reciprocal_function_demo'].desc='This is a demo example plotting the reciprocal function. You can visualize it using Arduino Plotter tool.';
examples['reciprocal_function_demo'].circuit=circuits['Simple'];

examples['reciprocal_quadratic_function_demo']={};
examples['reciprocal_quadratic_function_demo'].title='Reciprocal Quadratic function';
examples['reciprocal_quadratic_function_demo'].desc='This is a demo example plotting the reciprocal quadratic function. You can visualize it using Arduino Plotter tool.';
examples['reciprocal_quadratic_function_demo'].circuit=circuits['Simple'];

examples['gaussian_function_demo']={};
examples['gaussian_function_demo'].title='Gaussian function';
examples['gaussian_function_demo'].desc='This is a demo example plotting the Gaussian function. You can visualize it using Arduino Plotter tool.';
examples['gaussian_function_demo'].circuit=circuits['Simple'];

examples['rational_function_demo']={};
examples['rational_function_demo'].title='Rational function';
examples['rational_function_demo'].desc='This is a demo example plotting the rational function. You can visualize it using Arduino Plotter tool.';
examples['rational_function_demo'].circuit=circuits['Simple'];

examples['geometric_function_demo']={};
examples['geometric_function_demo'].title='Geometric function';
examples['geometric_function_demo'].desc='This is a demo example plotting the geometric function. You can visualize it using Arduino Plotter tool.';
examples['geometric_function_demo'].circuit=circuits['Simple'];

examples['power_function_demo']={};
examples['power_function_demo'].title='Power function';
examples['power_function_demo'].desc='This is a demo example plotting the power function. You can visualize it using Arduino Plotter tool.';
examples['power_function_demo'].circuit=circuits['Simple'];

examples['root_function_demo']={};
examples['root_function_demo'].title='Root function';
examples['root_function_demo'].desc='This is a demo example plotting the root function. You can visualize it using Arduino Plotter tool.';
examples['root_function_demo'].circuit=circuits['Simple'];

examples['sinusoidal_function_demo']={};
examples['sinusoidal_function_demo'].title='Sinusoidal function';
examples['sinusoidal_function_demo'].desc='This is a demo example plotting the sinusoidal function. You can visualize it using Arduino Plotter tool.';
examples['sinusoidal_function_demo'].circuit=circuits['Simple'];

examples['trunc_fourier_function_demo']={};
examples['trunc_fourier_function_demo'].title='Sinusoidal function';
examples['trunc_fourier_function_demo'].desc='This is a demo example plotting the truncated Fourier function. You can visualize it using Arduino Plotter tool.';
examples['trunc_fourier_function_demo'].circuit=circuits['Simple'];

examples['programming_include_example']={};
examples['programming_include_example'].title='Including a library';
examples['programming_include_example'].desc='This example shows how to include a library. Please, use careful because, generating Arduino code can generate compilation errors if you don\'t know how it works.';
examples['programming_include_example'].circuit=circuits['Simple'];

examples['programming_execute_example']={};
examples['programming_execute_example'].title='Using custom Arduino code';
examples['programming_execute_example'].desc='This example shows how to use Arduino code. Please, use careful because, generating Arduino code can generate compilation errors if you don\'t know how it works.';
examples['programming_execute_example'].circuit=circuits['Simple'];

examples['ambient_raindrop_example']={};
examples['ambient_raindrop_example'].title='Raindrop sensor analog and digital read';
examples['ambient_raindrop_example'].desc='This example shows how to use Arduino code. Please, use careful because, generating Arduino code can generate compilation errors if you don\'t know how it works.';
examples['ambient_raindrop_example'].circuit=circuits['Rain'];

examples['ambient_raindrop_alarm_example']={};
examples['ambient_raindrop_alarm_example'].title='Raindrop sensor alarm';
examples['ambient_raindrop_alarm_example'].desc='In this example, different alarm level messages are displayed on the console depending on whether it rains or not.';
examples['ambient_raindrop_alarm_example'].circuit=circuits['AnalogRain'];

examples['dyor_piezo_buzzer_voice_example']={};
examples['dyor_piezo_buzzer_voice_example'].title='Voice generation using a PWM signal';
examples['dyor_piezo_buzzer_voice_example'].desc='This example shows how to generate a phrase with the words "DANGER DANGER MOTOR IS ON FIRE".';
examples['dyor_piezo_buzzer_voice_example'].circuit=circuits['BuzzerPWM'];
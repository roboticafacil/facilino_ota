<?php
header('Content-Type: application/json');
$core=array("core update-index --additional-urls http://arduino.esp8266.com/stable/package_esp8266com_index.json --additional-urls https://dl.espressif.com/dl/package_esp32_index.json",
"core update-index",
"core install arduino:avr",
"core install arduino:megaavr",
"core install esp8266:esp8266 --additional-urls https://arduino.esp8266.com/stable/package_esp8266com_index.json",
"core install esp32:esp32 --additional-urls https://dl.espressif.com/dl/package_esp32_index.json");
$libs=array("lib update-index",
"lib install Servo",
"lib install LiquidCrystal",
"lib install \"LiquidCrystal I2C\"",
"lib install \"Adafruit BusIO\"",
"lib install StreamUtils",
"lib install ArduinoSTL",
"lib install \"Adafruit Unified Sensor\"",
"lib install \"ArduinoHttpClient\"",
"lib install \"OneWire\"",
"lib install \"Adafruit NeoPixel\"",
"lib install \"Adafruit SSD1306\"",
"lib install \"Adafruit GFX Library\"",
"lib install --zip-path ITEADLIBArduinoESP8266.zip",
"lib install IRremote",
"lib install \"Dimmable Light for Arduino\"",
"lib install DFRobotDFPlayerMini",
"lib install \"DHT sensor library\"",
"lib install \"DHT sensor library for ESPx\"",
"lib install DallasTemperature",
"lib install \"Adafruit BMP085 Library\"",
"lib install ESP32Servo",
"lib install --zip-path ESP32_Servo.zip",
"lib install --zip-path AsyncTCP.zip",
"lib install --zip-path ESPAsyncTCP.zip",
"lib install --zip-path ESPAsyncWebServer.zip",
"lib install ThingsBoard",
"lib install PubSubClient",
"lib install ArduinoJson",
"lib install FauxmoESP",
"lib install ESPUI",
"lib install LittleFS_esp32");
//$instructions=array();
$data=array('version' => '1.1.0','core' => $core,'libs' => $libs);
echo json_encode($data);
?>
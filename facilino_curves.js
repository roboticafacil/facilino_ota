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
		Blockly.Arduino.math_linear_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_linear_function'] = 'float linear(float x, float a, float b){\n return a+b*x;\n}\n';
			var code = 'linear('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_linear_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_linear_function'),
			tags: ['linear'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_LINEAR_NAME','LANG_MATH_FUNCTION_LINEAR','LANG_MATH_FUNCTION_LINEAR_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_LINEAR_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_LINEAR')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/linear.svg", 96*options.zoom, 24*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_LINEAR_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.math_quadratic_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_quadratic_function'] = 'float quadratic(float x, float a, float b, float c){\n return a+b*x+c*x*x;\n}\n';
			var code = 'quadratic('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+','+this.getFieldValue('c')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_quadratic_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_quadratic_function'),
			tags: ['quadratic'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_QUADRATIC_NAME','LANG_MATH_FUNCTION_QUADRATIC','LANG_MATH_FUNCTION_QUADRATIC_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_QUADRATIC_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_QUADRATIC')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/quadratic.svg", 144*options.zoom, 24*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').appendField('c').appendField(new Blockly.FieldTextInput('0'),'c').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_QUADRATIC_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.math_cubic_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_cubic_function'] = 'float cubic(float x, float a, float b, float c, float d){\n return a+b*x+c*x*x+d*x*x*x;\n}\n';
			var code = 'cubic('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+','+this.getFieldValue('c')+','+this.getFieldValue('d')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_cubic_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_cubic_function'),
			tags: ['cubic'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_CUBIC_NAME','LANG_MATH_FUNCTION_CUBIC','LANG_MATH_FUNCTION_CUBIC_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_CUBIC_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_CUBIC')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/cubic.svg", 180*options.zoom, 24*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').appendField('c').appendField(new Blockly.FieldTextInput('0'),'c').appendField('d').appendField(new Blockly.FieldTextInput('0'),'d').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_CUBIC_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.math_reciprocal_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_reciprocal_function'] = 'float reciprocal(float x, float a, float b){\n return 1.0/(a+b*x);\n}\n';
			var code = 'reciprocal('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_reciprocal_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_reciprocal_function'),
			tags: ['reciprocal'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_RECIPROCAL_NAME','LANG_MATH_FUNCTION_RECIPROCAL','LANG_MATH_FUNCTION_RECIPROCAL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_RECIPROCAL_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_RECIPROCAL')).appendField(new Blockly.FieldImage("img/blocks/reciprocal.svg", 120*options.zoom, 24*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_RECIPROCAL_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.math_reciprocal_quadratic_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_reciprocal_quadratic_function'] = 'float reciprocal_quadratic(float x, float a, float b, float c){\n return 1.0/(a+b*x+c*x*x);\n}\n';
			var code = 'reciprocal_quadratic('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+','+this.getFieldValue('c')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_reciprocal_quadratic_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_reciprocal_quadratic_function'),
			tags: ['reciprocal_quadratic'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_RECIPROCAL_QUADRATIC_NAME','LANG_MATH_FUNCTION_RECIPROCAL_QUADRATIC','LANG_MATH_FUNCTION_RECIPROCAL_QUADRATIC_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_RECIPROCAL_QUADRATIC_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_RECIPROCAL_QUADRATIC')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/reciprocal_quadratic.svg", 180*options.zoom, 24*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').appendField('c').appendField(new Blockly.FieldTextInput('0'),'c').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_RECIPROCAL_QUADRATIC_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.math_gaussian_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_gaussian_function'] = 'float gaussian(float x, float a, float b, float c){\n return a*exp(-(x-b)*(x-b)/(2*c*c));\n}\n';
			var code = 'gaussian('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+','+this.getFieldValue('c')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_gaussian_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_gaussian_function'),
			tags: ['gaussian'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_GAUSSIAN_NAME','LANG_MATH_FUNCTION_GAUSSIAN','LANG_MATH_FUNCTION_GAUSSIAN_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_GAUSSIAN_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_GAUSSIAN')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/gaussian.svg", 120*options.zoom, 36*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').appendField('c').appendField(new Blockly.FieldTextInput('0'),'c').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_GAUSSIAN_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.math_rational_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_rational_function'] = 'float rational(float x, float a, float b, float c, float d){\n return (a+b*x)/(1.0+c*x+d*x*x);\n}\n';
			var code = 'rational('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+','+this.getFieldValue('c')+','+this.getFieldValue('d')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_rational_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_rational_function'),
			tags: ['rational'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_RATIONAL_NAME','LANG_MATH_FUNCTION_RATIONAL','LANG_MATH_FUNCTION_RATIONAL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_RATIONAL_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_RATIONAL')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/rational.svg", 144*options.zoom, 48*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').appendField('c').appendField(new Blockly.FieldTextInput('0'),'c').appendField('d').appendField(new Blockly.FieldTextInput('0'),'d').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_RATIONAL_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.math_geometric_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_geometric_function'] = 'float geometric(float x, float a, float b){\n return a*pow(x,b*x);\n}\n';
			var code = 'geometric('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_geometric_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_geometric_function'),
			tags: ['geometric'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_GEOMETRIC_NAME','LANG_MATH_FUNCTION_GEOMETRIC','LANG_MATH_FUNCTION_GEOMETRIC_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_GEOMETRIC_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_GEOMETRIC')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/geometric.svg", 120*options.zoom, 22*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_GEOMETRIC_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.math_power_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_power_function'] = 'float power(float x, float a, float b){\n return a*pow(b,x);\n}\n';
			var code = 'power('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_power_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_power_function'),
			tags: ['power'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_POWER_NAME','LANG_MATH_FUNCTION_POWER','LANG_MATH_FUNCTION_POWER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_POWER_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_POWER')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/power.svg", 86*options.zoom, 24*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_POWER_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.math_root_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_root_function'] = 'float root(float x, float a, float b){\n return a*pow(b,1.0/x);\n}\n';
			var code = 'root('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_root_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_root_function'),
			tags: ['root'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_ROOT_NAME','LANG_MATH_FUNCTION_ROOT','LANG_MATH_FUNCTION_ROOT_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_ROOT_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_ROOT')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/root.svg", 120*options.zoom, 24*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_ROOT_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">1</field></shadow></value>';
			}
		};

		Blockly.Arduino.math_sinusoidal_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_sinusoidal_function'] = 'float sinusoidal(float x, float a, float b, float c, float d){\n return a+b*cos(c*x+d);\n}\n';
			var code = 'sinusoidal('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+','+this.getFieldValue('c')+','+this.getFieldValue('d')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_sinusoidal_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_sinusoidal_function'),
			tags: ['sinusoidal'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_SINUSOIDAL_NAME','LANG_MATH_FUNCTION_SINUSOIDAL','LANG_MATH_FUNCTION_SINUSOIDAL_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_SINUSOIDAL_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_SINUSOIDAL')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/sinusoidal.svg", 180*options.zoom, 24*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').appendField('c').appendField(new Blockly.FieldTextInput('0'),'c').appendField('d').appendField(new Blockly.FieldTextInput('0'),'d').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_SINUSOIDAL_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};

		Blockly.Arduino.math_trunc_fourier_function = function() {
			var x = Blockly.Arduino.valueToCode(this, 'x', Blockly.Arduino.ORDER_NONE);
			Blockly.Arduino.definitions_['define_trunc_fourier_function'] = 'float trunc_fourier(float x, float a, float b, float c, float d){\n return a*cos(x+d)+b*cos(2*x+d)+c*cos(3*x+d);\n}\n';
			var code = 'trunc_fourier('+x+','+this.getFieldValue('a')+','+this.getFieldValue('b')+','+this.getFieldValue('c')+','+this.getFieldValue('d')+')';
			return [code,Blockly.Arduino.ORDER_ATOMIC];
		};

		Blockly.Blocks.math_trunc_fourier_function = {
			// Variable setter.
			category: Facilino.locales.getKey('LANG_CATEGORY_MATH'),
			subcategory: Facilino.locales.getKey('LANG_CATEGORY_CURVE'),
			helpUrl: Facilino.getHelpUrl('math_trunc_fourier_function'),
			tags: ['trunc_fourier'],
			examples: [''],
			category_colour: Facilino.LANG_COLOUR_MATH,
			colour: Facilino.LANG_COLOUR_MATH,
			keys: ['LANG_MATH_FUNCTION_TRUNC_FOURIER_NAME','LANG_MATH_FUNCTION_TRUNC_FOURIER','LANG_MATH_FUNCTION_TRUNC_FOURIER_TOOLTIP'],
			name: Facilino.locales.getKey('LANG_MATH_FUNCTION_TRUNC_FOURIER_NAME'),
			init: function() {
				this.setColour(Facilino.LANG_COLOUR_MATH);
				this.appendValueInput('x').appendField(Facilino.locales.getKey('LANG_MATH_FUNCTION_TRUNC_FOURIER')).appendField(new Blockly.FieldImage(Facilino.path+"img/blocks/trunc_fourier.svg", 320*options.zoom, 24*options.zoom, "*")).setCheck([Number,'Variable']);
				this.appendDummyInput('').appendField('a').appendField(new Blockly.FieldTextInput('0'),'a').appendField('b').appendField(new Blockly.FieldTextInput('0'),'b').appendField('c').appendField(new Blockly.FieldTextInput('0'),'c').appendField('d').appendField(new Blockly.FieldTextInput('0'),'d').setAlign(Blockly.ALIGN_RIGHT);
				this.setInputsInline(false);
				this.setPreviousStatement(false);
				this.setNextStatement(false);
				this.setOutput(true,Number);
				this.setTooltip(Facilino.locales.getKey('LANG_MATH_FUNCTION_TRUNC_FOURIER_TOOLTIP'));
				this.itemCount_ = 0;
			},
			default_inputs: function()
			{
				return '<value name="x"><shadow type="math_number"><field name="NUM">0</field></shadow></value>';
			}
		};
		}
	}
	
	var FacilinoCurves = {
		load: load
	};
	if (typeof define === 'function' && define.amd) {
		return FacilinoCurves;
	} else {
		window.FacilinoCurves = FacilinoCurves;
	}
}));
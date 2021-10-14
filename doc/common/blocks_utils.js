function openFunction(bly) {
	$.ajax({
        type: "GET" ,
        url: bly ,
        dataType: "xml" , async: false,
        success: function(xml) {
			var txt = new XMLSerializer().serializeToString(xml);
			Blockly.mainWorkspace.clear();
			var xmlDOM = Blockly.Xml.textToDom(txt);
			Blockly.Xml.domToWorkspace(xmlDOM,Blockly.getMainWorkspace());
        }
    });
}

function injectInstruction(block,blockDiv) {
	var instructionPreview = document.getElementById(blockDiv);
	var mainWorkspace1 = Blockly.inject(blockDiv, {readOnly:true, collapse: false});
	mainWorkspace1.clear();
	var block = mainWorkspace1.newBlock(block);
	block.initSvg();
	block.render();
	block.setMovable(false);
	block.setDeletable(false);
	block.moveBy(12, 10);
	block.width=block.width+20;
	var bbox = block.getHeightWidth();
	instructionPreview.style.height = (bbox.height+25)+ 'px';
	instructionPreview.style.width = (bbox.width+25) + 'px';
	window.dispatchEvent(new Event('resize'));
}
function injectExample(example,exampleDiv) {
    var instructionPreview = document.getElementById(exampleDiv);
	var mainWorkspace = Blockly.inject(exampleDiv, {readOnly:true, collapse: false});
	openFunction('doc/examples/'+example);
	var bbox = mainWorkspace.svgBlockCanvas_.getBBox();
	instructionPreview.style.height = (bbox.height+50)+ 'px';
	instructionPreview.style.width = (bbox.width+50) + 'px';
	//window.dispatchEvent(new Event('resize'));
}

function injectInstructionTooltipAndName(block,blockDiv,tooltipDiv,nameDiv) {
	var instructionPreview = document.getElementById(blockDiv);
	var mainWorkspace = Blockly.inject(blockDiv, {readOnly:true, collapse: false});
	mainWorkspace.clear();
	var block = mainWorkspace.newBlock(block);
	if (block.name!==undefined)
		document.getElementById(nameDiv).innerHTML=block.name;
	document.getElementById(tooltipDiv).innerHTML=block.tooltip;
	block.initSvg();
	block.render();
	block.setMovable(false);
	block.setDeletable(false);
	block.moveBy(12, 10);
	block.width=block.width+20;
	var bbox = block.getHeightWidth();
	instructionPreview.style.height = (bbox.height+50)+ 'px';
	instructionPreview.style.width = (bbox.width+50) + 'px';
}

function injectInstructionTooltip(block,blockDiv,tooltipDiv) {
	var instructionPreview = document.getElementById(blockDiv);
	var mainWorkspace = Blockly.inject(blockDiv, {readOnly:true, collapse: false});
	mainWorkspace.clear();
	var block = mainWorkspace.newBlock(block);
	document.getElementById(tooltipDiv).innerHTML=block.tooltip;
	block.initSvg();
	block.render();
	block.setMovable(false);
	block.setDeletable(false);
	block.moveBy(15, 10);
	var bbox = block.getHeightWidth();
	instructionPreview.style.height = (bbox.height+25)+ 'px';
	instructionPreview.style.width = (bbox.width+25) + 'px';
}

function getCategoryList() {
	var blocks = { };
	var colours = { };

	for (var block in this.Blocks) {
		// important check that this is objects own property 
		// not from prototype prop inherited
		if (this.Blocks.hasOwnProperty(block) && this.Blocks[block] instanceof Object && this.Blocks[block].category) {
			var category = this.Blocks[block].category;
			var subcategory = this.Blocks[block].subcategory;
			var colour = this.Blocks[block].category_colour;
			var subsubcategory = this.Blocks[block].subsubcategory;
			var found = false;
			if (subcategory===undefined)
			{
				subcategory='root';
				subsubcategory='root';
			}
			else
			{
				if (subsubcategory===undefined)
				{
					subsubcategory='root';
				}
			}
			blocks[category] = blocks[category] || { };
			colours[category] = colours[category] || colour;
			blocks[category][subcategory] = blocks[category][subcategory] || [];
			blocks[category][subcategory][subsubcategory] = blocks[category][subcategory][subsubcategory] || [];
			blocks[category][subcategory][subsubcategory].push(block);
		}
	}

	var instruction_list = '<ul class="instruction">';

	var categoryItem = function(type) {
		instruction_list += '<li>'+type+'</li>';
	};

	for (category in blocks) {
		if (blocks.hasOwnProperty(category)) {
			instruction_list += '<li id="'+category+'">'+category+'<ul>';
			for (subcategory in blocks[category]) {
				if (subcategory!=='root'){
					instruction_list += '<li id="'+subcategory+'">'+subcategory+'<ul>';
					
					instruction_list += '</li></ul>';
				}
			}
			instruction_list += '</li></ul>';
		}
	}
	instruction_list += '</ul>';

	return instruction_list;
};

function createInstructionDoc(instruction)
{
if (Blockly.Blocks[instruction].name)
{
	el_name=document.getElementById('up');
	el_name.innerHTML=Blockly.Blocks[instruction].name;
	injectInstruction(instruction,'blocklyInstruction');
}
if (Blockly.Blocks[instruction].description)
{
	el_desc=document.getElementById('description');
	el_desc.innerHTML=Blockly.Blocks[instruction].description;
}
else
{
	el_desc=document.getElementById('description');
	el_desc.style.display='none';
}
if (Blockly.Blocks[instruction].warning_msg)
{
	el_warning=document.getElementById('warning');
	Blockly.Blocks[instruction].warning_msg.forEach(function callback(element,index,array){
		el_warning_div=document.createElement('div');
		el_warning_div.setAttribute('id','blocklyInstruction'+element);
		el_warning.appendChild(el_warning_div);
		}
	);
	Blockly.Blocks[instruction].warning_msg.forEach(function callback(element,index,array){
		injectInstruction(element,'blocklyInstruction'+element);
	}
	);
}
else
{
	el_warning=document.getElementById('warning');
	el_warning.style.display='none';
}
if (Blockly.Blocks[instruction].additional)
{
	el_add=document.getElementById('additional');
	Blockly.Blocks[instruction].additional.forEach(function callback(element,index,array){
		el_add_div=document.createElement('div');
		el_add_div.setAttribute('id','blocklyInstruction'+element);
		el_add.appendChild(el_add_div);
		}
	);
	Blockly.Blocks[instruction].additional.forEach(function callback(element,index,array){
		injectInstruction(element,'blocklyInstruction'+element);
	}
	);
}
else
{
	el_add=document.getElementById('additional');
	el_add.style.display='none';
}
if (Blockly.Blocks[instruction].must)
{
	el_must=document.getElementById('must');
	Blockly.Blocks[instruction].must.forEach(function callback(element,index,array){
		el_must_div=document.createElement('div');
		el_must_div.setAttribute('id','blocklyInstruction'+element);
		el_must.appendChild(el_must_div);
		}
	);
	Blockly.Blocks[instruction].must.forEach(function callback(element,index,array){
		injectInstruction(element,'blocklyInstruction'+element);
	}
	);
}
else
{
	el_must=document.getElementById('must');
	el_must.style.display='none';
}
if (Blockly.Blocks[instruction].requirements)
{
	el_requirements=document.getElementById('requirement_list');
	el_requirements_ul=document.createElement('ul');
	el_requirements_ul.setAttribute('class','instruction');
	Blockly.Blocks[instruction].requirements.forEach(function callback(element,index,array){
		el_requirements_li=document.createElement('li');
		el_requirements_li.innerHTML=element;
		el_requirements_ul.appendChild(el_requirements_li);
		}
	);
	el_requirements.appendChild(el_requirements_ul);
}
else
{
	el_requirements=document.getElementById('requirements');
	el_requirements.style.display='none';
}
if (Blockly.Blocks[instruction].statements)
{
	el_statements=document.getElementById('statement_list');
	el_statements_ul=document.createElement('ul');
	el_statements_ul.setAttribute('class','instruction');
	Blockly.Blocks[instruction].statements.forEach(function callback(element,index,array){
		el_statements_li=document.createElement('li');
		el_statements_li.innerHTML=element;
		el_statements_ul.appendChild(el_statements_li);
		}
	);
	el_statements.appendChild(el_statements_ul);
}
else
{
	el_statements=document.getElementById('statements');
	el_statements.style.display='none';
}
if (Blockly.Blocks[instruction].dropdown)
{
	el_drop=document.getElementById('dropdown_list');
	el_drop_ul=document.createElement('ul');
	el_drop_ul.setAttribute('class','instruction');
	Blockly.Blocks[instruction].dropdown.forEach(function callback(element,index,array){
		el_drop_li=document.createElement('li');
		el_drop_li.innerHTML=element;
		el_drop_ul.appendChild(el_drop_li);
	}
	);
	el_drop.appendChild(el_drop_ul);
}
else
{
	el_drop=document.getElementById('dropdown');
	el_drop.style.display='none';
}
if (Blockly.Blocks[instruction].fields)
{
	el_fields=document.getElementById('field_list');
	el_fields_ul=document.createElement('ul');
	el_fields_ul.setAttribute('class','instruction');
	Blockly.Blocks[instruction].fields.forEach(function callback(element,index,array){
		el_fields_li=document.createElement('li');
		el_fields_li.innerHTML=element;
		el_fields_ul.appendChild(el_fields_li);
		}
	);
	el_fields.appendChild(el_fields_ul);
}
else
{
	el_fields=document.getElementById('fields');
	el_fields.style.display='none';
}
if (Blockly.Blocks[instruction].mutator_desc)
{
	el_mut=document.getElementById('mutator');
	el_mut_desc=document.getElementById('mutator_desc');
	el_mut_desc.innerHTML=Blockly.Blocks[instruction].mutator_desc;
	injectInstruction(Blockly.Blocks[instruction].mutator_container,'blocklyInstructionContainer');
	Blockly.Blocks[instruction].mutator_items.forEach(function callback(element,index,array){
		el_mut_div=document.createElement('div');
		el_mut_div.setAttribute('id','blocklyInstruction'+element);
		el_mut.appendChild(el_mut_div);
		}
	)
	Blockly.Blocks[instruction].mutator_items.forEach(function callback(element,index,array){
		injectInstruction(element,'blocklyInstruction'+element);
		}
	)
}
else
{
	el_mut=document.getElementById('mutator');
	el_mut.style.display='none';
}
if (Blockly.Blocks[instruction].inputs)
{
	el_inputs=document.getElementById('input_list');
	el_inputs_ul=document.createElement('ul');
	el_inputs_ul.setAttribute('class','instruction');
	Blockly.Blocks[instruction].inputs.forEach(function callback(element,index,array){
		el_inputs_li=document.createElement('li');
		el_inputs_li.innerHTML=element;
		el_inputs_ul.appendChild(el_inputs_li);
		}
	);
	el_inputs.appendChild(el_inputs_ul);
}
else
{
	el_inputs=document.getElementById('inputs');
	el_inputs.style.display='none';
}
if (Blockly.Blocks[instruction].output)
{
	el_out=document.getElementById('output');
	el_out_desc=document.getElementById('output_desc');
	el_out_desc.innerHTML=Blockly.Blocks[instruction].output;
}
else
{
	el_out=document.getElementById('output');
	el_out.style.display='none';
}
createExamples(Blockly.Blocks[instruction].examples);
}
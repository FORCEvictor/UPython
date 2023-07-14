
Blockly.Blocks['custom_exec'] = {
    init: function() {
        this.appendValueInput("PARAM")
            .setCheck("String")
            .appendField("执行代码");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
    }
};

Blockly.Python['custom_exec'] = function(block) {
    var param = Blockly.Python.valueToCode(block, 'PARAM', Blockly.Python.ORDER_ATOMIC);
    var code = 'exec(' + param + ')\n';
    return code;
};

Blockly.Blocks['custom_exec_string'] = {
    init: function() {
        this.appendValueInput("PARAM")
            .setCheck("String")
            .appendField("执行代码");
        this.setOutput(true, 'String');
        this.setColour(230);
    }
};

Blockly.Python['custom_exec_string'] = function(block) {
    var param = Blockly.Python.valueToCode(block, 'PARAM', Blockly.Python.ORDER_ATOMIC);
    var code = 'exec(' + param + ')';
    return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

const toolbox = {
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "逻辑",
            "contents": [
                { "kind": "block", "type": "controls_if" },
                { "kind": "block", "type": "logic_compare" },
                { "kind": "block", "type": "logic_operation" },
                { "kind": "block", "type": "logic_negate" },
                { "kind": "block", "type": "logic_boolean" },
                { "kind": "block", "type": "logic_null" },
                { "kind": "block", "type": "logic_ternary" }
            ]
        },{
            "kind": "category",
            "name": "代码",
            "contents": [

                { "kind": "block", "type": "custom_exec" },
                { "kind": "block", "type": "custom_exec_string" }
            ]
        },{
            "kind": "category",
            "name": "循环",
            "contents": [
                { "kind": "block", "type": "controls_repeat_ext" },
                { "kind": "block", "type": "controls_whileUntil" },
                { "kind": "block", "type": "controls_for" },
                { "kind": "block", "type": "controls_forEach" },
                { "kind": "block", "type": "controls_flow_statements" }
            ]
        },
        {
            "kind": "category",
            "name": "数学",
            "contents": [
                { "kind": "block", "type": "math_number" },
                { "kind": "block", "type": "math_arithmetic" },
                { "kind": "block", "type": "math_single" },
                { "kind": "block", "type": "math_trig" },
                { "kind": "block", "type": "math_constant" },
                { "kind": "block", "type": "math_number_property" },
                { "kind": "block", "type": "math_round" },
                { "kind": "block", "type": "math_on_list" },
                { "kind": "block", "type": "math_modulo" },
                { "kind": "block", "type": "math_constrain" }
            ]
        },
        {
            "kind": "category",
            "name": "文本",
            "contents": [
                { "kind": "block", "type": "text" },
                { "kind": "block", "type": "text_join" },
                { "kind": "block", "type": "text_append" },
                { "kind": "block", "type": "text_length" },
                { "kind": "block", "type": "text_isEmpty" },
                { "kind": "block", "type": "text_indexOf" },
                { "kind": "block", "type": "text_charAt" },
                { "kind": "block", "type": "text_getSubstring" },
                { "kind": "block", "type": "text_changeCase" },
                { "kind": "block", "type": "text_trim" },
                { "kind": "block", "type": "text_print" },
                { "kind": "block", "type": "text_prompt_ext" }
            ]
        },
        {
            "kind": "category",
            "name": "列表",
            "contents": [
                { "kind": "block", "type": "lists_create_with" },
                { "kind": "block", "type": "lists_repeat" },
                { "kind": "block", "type": "lists_length" },
                { "kind": "block", "type": "lists_isEmpty" },
                { "kind": "block", "type": "lists_indexOf" },
                { "kind": "block", "type": "lists_getIndex" },
                { "kind": "block", "type": "lists_setIndex" },
                { "kind": "block", "type": "lists_getSublist" },
                { "kind": "block", "type": "lists_split" },
                { "kind": "block", "type": "lists_sort" }
            ]
        },
        {
            "kind": "category",
            "name": "变量",
            "contents": [
                { "kind": "block", "type": "variables_set" },
                { "kind": "block", "type": "variables_get" }
            ]
        },
        {
            "kind": "category",
            "name": "函数",
            "contents": [
                { "kind": "block", "type": "procedures_defnoreturn" },
                { "kind": "block", "type": "procedures_defreturn" },
                { "kind": "block", "type": "procedures_ifreturn" },
                { "kind": "block", "type": "procedures_callnoreturn" },
                { "kind": "block", "type": "procedures_callreturn" }
            ]
        }
    ]
}

function exportBlocks() {
    var json = 'Blockly.serialization.workspaces.save(workspace);';
    var blob = new Blob([json], { type: 'text/json' });
    var a = document.createElement('a');
    a.download = 'upython_export_blocks.upython_file';
    a.href = window.URL.createObjectURL(blob);
    a.click();
}

function importBlocks() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.upython_file';
    input.onchange = function (event) {
        var reader = new FileReader();
        reader.onload = function () {
            Blockly.serialization.workspaces.load(reader.result);
        };

        reader.readAsText(event.target.files[0]);
    };
    input.click();
}

function exportPython() {
    var pythonCode = Blockly.Python.workspaceToCode(workspace);
    var blob = new Blob([pythonCode], { type: 'text/plain' });
    var a = document.createElement('a');
    a.download = 'code.py';
    a.href = window.URL.createObjectURL(blob);
    a.click();
}
function updateCode() {
    var pythonCode = Blockly.Python.workspaceToCode(workspace);
    document.getElementById('textarea').value = pythonCode;
}


const workspace = Blockly.inject('blocklyDiv', { toolbox: toolbox, renderer: 'zelos' });
workspace.addChangeListener(updateCode);
window.addEventListener('resize', resizeBlocklyArea);
resizeBlocklyArea();

function resizeBlocklyArea() {
    var browserHeight = window.innerHeight;
    var blocklyHeight = browserHeight * 0.7;
    document.getElementById('blocklyDiv').style.height = blocklyHeight + 'px';
    Blockly.svgResize(workspace);
}

function openAssist() {
    window.open("http://127.0.0.1:5000/webapp/upython/is_open/",'_blank');
}
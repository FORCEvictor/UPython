import Blockly from "blockly";

Blockly.defineBlocksWithJsonArray([
  {
    type: "controls_forever",
    message0: "%1",
    args0: [
      {
        type: "field_label",
        text: "重复执行",
      },
    ],
    message1: "%1",
    args1: [
      {
        type: "input_statement",
        name: "DO",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "controller",
    tooltip: "重复执行代码直到跳出循环。",
  },
]);

Blockly.defineBlocksWithJsonArray([
  {
    type: "math_evenly_divisible",
    message0: "%1 能被 %2 整除",
    args0: [
      {
        type: "input_value",
        name: "DIVIDEND",
        check: "Number",
        value: 0,
      },
      {
        type: "input_value",
        name: "DIVISOR",
        check: "Number",
        value: 0,
      },
    ],
    inputsInline: true,
    output: "Boolean",
    style: "calculation",
    tooltip: "判断第一个数是否恰好被第二个数整除。",
  },
]);

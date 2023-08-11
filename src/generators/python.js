/**
 * Python语言生成
 */
import { pythonGenerator } from "blockly/python";

pythonGenerator["controls_forever"] = function (block) {
  const branch = pythonGenerator.statementToCode(block, "DO") || "  pass\n";
  return "while True:\n" + branch;
};

pythonGenerator["math_evenly_divisible"] = function (block) {
  const argument1 = pythonGenerator.valueToCode(block, "DIVIDEND", pythonGenerator["ORDER_ATOMIC"]) || "0";
  const argument2 = pythonGenerator.valueToCode(block, "DIVISOR", pythonGenerator["ORDER_ATOMIC"]) || "0";
  return [argument1 + " % " + argument2 + " == 0", pythonGenerator["ORDER_NONE"]];
};

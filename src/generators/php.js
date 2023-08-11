/**
 * PHP语言生成
 */
import { phpGenerator } from "blockly/php";

phpGenerator["controls_forever"] = function (block) {
  const branch = phpGenerator.statementToCode(block, "DO");
  return "for(;;) {\n" + branch + "}\n";
};

phpGenerator["math_evenly_divisible"] = function (block) {
  const argument1 = phpGenerator.valueToCode(block, "DIVIDEND", phpGenerator["ORDER_ATOMIC"]) || "0";
  const argument2 = phpGenerator.valueToCode(block, "DIVISOR", phpGenerator["ORDER_ATOMIC"]) || "0";
  return [argument1 + " % " + argument2 + " == 0", phpGenerator["ORDER_NONE"]];
};

import Blockly from "blockly";

import toolboxConfig from "../toolbox/toolbox.json";

/**
 * 给积木重写默认样式。
 * @param name 积木名称
 * @param style 想要改成的样式
 */
function block_style(name, style) {
  // https://groups.google.com/g/blockly/c/byDoKnftEcc/m/qbaF9M8vBAAJ
  const savedIfInit = Blockly.Blocks[name].init;
  Blockly.Blocks[name].init = function () {
    savedIfInit.bind(this)();
    this.setStyle(style);
  };
}

// 摘取积木栏配置信息，自动生成补丁
toolboxConfig["contents"].forEach(function (category) {
  if ("contents" in category) {
    let style = category["categorystyle"];
    category["contents"].forEach(function (element) {
      if (element["kind"] === "block") {
        block_style(element.type, style);
      }
    });
  } else {
    console.warn(
      "This category is empty. ",
      "If you are using a custom approach, ",
      "please list all possible blocks in contents for a unified format."
    );
  }
});
// 设置Blockly部分组件数值
Blockly.FlyoutButton.BORDER_RADIUS = 4;
Blockly.FlyoutButton.TEXT_MARGIN_X = 25;
Blockly.FlyoutButton.TEXT_MARGIN_Y = 15;

Blockly.Scrollbar.scrollbarThickness = 10;

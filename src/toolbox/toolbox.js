import Blockly from "blockly";

import superellipse from "../icon/category/superellipse.svg";

// https://blocklycodelabs.dev/codelabs/custom-toolbox/index.html?index=..%2F..index#0

class BoxyCategory extends Blockly.ToolboxCategory {
  /**
   * 用户工具箱类标签
   * @constructor
   */
  constructor(categoryDef, toolbox, opt_parent) {
    super(categoryDef, toolbox, opt_parent);
  }

  /**
   * 类标签选中样式。
   * @method
   * @param {boolean} isSelected
   */
  setSelected = (isSelected) => {
    let labelDom = this.rowDiv_.getElementsByClassName("blocklyTreeLabel")[0];
    if (isSelected) {
      this.rowDiv_.style.backgroundColor = "var(--toolbox-category-background-selected)";
      labelDom.style.color = "var(--toolbox-category-color-selected)";
    } else {
      this.rowDiv_.style.backgroundColor = "";
      labelDom.style.color = "";
    }

    Blockly.utils.aria.setState(this.htmlDiv_, Blockly.utils.aria.State.SELECTED, isSelected);
  };

  /**
   * 创建iconpark的DOM。
   * @method
   * @returns {HTMLElement} 返回一个iconpark标签
   * @private
   */
  createIconDom_ = () => {
    const img = document.createElement("iconpark-icon");
    img.name = this.toolboxItemDef_.categorystyle;
    img.size = "21";
    img.style = `
      -webkit-mask-size: 100% 100%;
      -webkit-mask-image: url(${superellipse});
      mask-size: 100% 100%;
      mask-image: url(${superellipse});
      color: white;
    `;
    return img;
  };

  /**
   * 覆盖 iconpark 的颜色
   * @param colour
   * @private
   */
  addColourBorder_(colour) {
    this.rowDiv_.children[0].children[0].style.backgroundColor = colour;
  }
}

class BoxyToolbox {
  /**
   * 工具箱
   * @constructor
   */
  constructor() {
    this.ariaElements = document.getElementsByClassName("blocklyToolboxCategory");
  }

  /**
   * 注册类标签
   * @method
   */
  load = () => {
    Blockly.registry.register(
      Blockly.registry.Type.TOOLBOX_ITEM,
      Blockly.ToolboxCategory.registrationName,
      BoxyCategory,
      true
    );
  };

  /**
   * 修复aira-level不符合规范的问题。
   * @method
   */
  ariaFix = () => {
    Array.prototype.forEach.call(this.ariaElements, function (element) {
      element.setAttribute("aria-level", "1");
    });
  };

  /**
   * 重置toolbox宽度
   * @method
   */
  resize = () => {
    document.querySelector(".blocklyFlyout").style.width = localStorage.getItem("block_all_shown") ? "" : "320px";
  };
}

let toolbox = new BoxyToolbox();
toolbox.load();
window.addEventListener("resize", toolbox.resize);
export default toolbox;

/**
 * 覆盖原始方法
 * @private
 */
Blockly.VerticalFlyout.prototype["reflowInternal_"] = function () {
  this["workspace_"].scale = 0.8; //对，这是覆盖的唯一地方，实现toolbox大小锁死
  let a = 0;
  let b = this["workspace_"].getTopBlocks(!1);
  let c = 0;
  for (let d = 0, e; (e = b[d]); d++) {
    c = e.getHeightWidth().width;
    e.outputConnection && (c -= this["tabWidth_"]);
    a = Math.max(a, c);
  }
  for (let d = 0, e; (e = this["buttons_"][d]); d++) a = Math.max(a, e.width);
  a += 1.5 * this["MARGIN"] + this["tabWidth_"];
  a *= this["workspace_"].scale;
  a += Blockly.Scrollbar.scrollbarThickness;
  if (this.width_ !== a) {
    for (let d = 0, e; (e = b[d]); d++) {
      if (this["RTL"]) {
        c = e.getRelativeToSurfaceXY().x;
        let f = a / this["workspace_"].scale - this["MARGIN"];
        e.outputConnection || (f -= this["tabWidth_"]);
        e.moveBy(f - c, 0);
      }
      this["rectMap_"].has(e) && this["moveRectToBlock_"](this["rectMap_"].get(e), e);
    }
    if (this["RTL"])
      for (let d = 0, e; (e = this["buttons_"][d]); d++)
        (b = e.getPosition().y),
          e.moveTo(a / this["workspace_"].scale - e.width - this["MARGIN"] - this["tabWidth_"], b);
    this["targetWorkspace"].toolboxPosition !== this["toolboxPosition_"] ||
      this["toolboxPosition_"] !== Blockly.utils.toolbox.Position.LEFT ||
      this["targetWorkspace"].getToolbox() ||
      this["targetWorkspace"].translate(this["targetWorkspace"].scrollX + a, this["targetWorkspace"].scrollY);
    this.width_ = a;
    this["position"]();
    this["targetWorkspace"].recordDragTargets();
  }
};

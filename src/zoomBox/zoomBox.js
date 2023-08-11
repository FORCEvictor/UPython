import Blockly from "blockly";

/**
 * sigmoid函数
 * @function
 * @param {number} x
 * @returns {number}
 */
function sigmoid(x) {
  const ex = Math.E ** x;
  return ex / (ex + 1);
}

class BoxyZoomBox {
  /**
   * 缩放栏
   * @constructor
   */
  constructor(workspace, codespace, workspaceSearch) {
    this.workspace = workspace;
    this.codespace = codespace;
    this.workspaceSearch = workspaceSearch;
    this.zoomBoxDiv = document.getElementById("zoomBox");
    this.blocklyZoomButtons = document.getElementsByClassName("blocklyZoom");
    this.resetButton = this.blocklyZoomButtons[2];
  }
  /**
   * 加载缩放栏图标，禁用右键，监听窗口尺寸变化。
   * @method
   */
  load = () => {
    this.zoomBoxDiv = document.getElementById("zoomBox");
    this.blocklyZoomButtons = document.getElementsByClassName("blocklyZoom");
    this.resetButton = this.blocklyZoomButtons[2];
    // 加载缩放栏图标
    let zoomFunctions = document.getElementsByClassName("zoomFunctions");
    Array.prototype.forEach.call(zoomFunctions, function (zoomFunction) {
      zoomFunction.setAttribute("width", "25px");
      zoomFunction.setAttribute("height", "25px");
      zoomFunction.setAttribute("size", "1em");
    });
    // 禁用右键
    this.zoomBoxDiv.addEventListener("contextmenu", function (event) {
      event.preventDefault();
    });
    // 监听窗口尺寸变化
    window.addEventListener("resize", this.resize);
    this.resize();
    // 为重置按钮赋基础值
    this.reset();
    // 添加缩放大小监听事件
    this.workspace.addChangeListener(
      () =>
        (document.getElementById("zoomBoxReset").innerHTML =
          Math.floor((this.workspace.scale * (5 / 3) - 1 / 3) * 100) + "%")
    );
  };

  /**
   * 根据当前用户窗口大小，重置代码区尺寸。
   * @method
   */
  resize = () => {
    this.zoomBoxDiv = document.getElementById("zoomBox");
    const size = this.zoomBoxDiv.getBoundingClientRect();
    const unit = 55 - 10 * sigmoid(0.005 * size.left - 2);
    this.zoomBoxDiv.style.width = 5.5 * unit + "px";
    this.zoomBoxDiv.style.height = unit + "px";
    this.zoomBoxDiv.style.right = this.codespace.currentWidth() + 40 + "px";
    document.querySelector(".blocklyDiv").style.width = window.innerWidth - this.codespace.currentWidth() + "px";
    Blockly.svgResize(this.workspace);
  };

  /**
   * 搜索按钮。
   * @method
   */
  searchSwitch = () => {
    const workspaceSearchDiv = document.getElementsByClassName("blockly-ws-search")[0];
    if (workspaceSearchDiv.style.display === "none") {
      this.workspaceSearch.workspaceSearch.open();
    } else {
      this.workspaceSearch.workspaceSearch.close();
    }
  };

  /**
   * 代码区切换按钮。
   * @method
   */
  codespaceSwitch = () => {
    this.codespace.switch();
    this.codespace.resize();
    this.resize();
  };

  /**
   * 缩小按钮。
   * @method
   */
  smaller = () => {
    let speed = this.workspace.options.zoomOptions.scaleSpeed;
    let scale = this.workspace.scale;
    this.workspace.zoom(0, 0, Math.log((scale - 0.15) / scale) / Math.log(speed));
  };

  /**
   * 重置按钮。
   * @method
   */
  reset = () => {
    this.resetButton = this.blocklyZoomButtons[2];
    this.resetButton.dispatchEvent(new PointerEvent("pointerdown"));
  };

  /**
   * 放大按钮。
   * @method
   */
  bigger = () => {
    let speed = this.workspace.options.zoomOptions.scaleSpeed;
    let scale = this.workspace.scale;
    this.workspace.zoom(0, 0, Math.log((scale + 0.15) / scale) / Math.log(speed));
  };
}

export default BoxyZoomBox;

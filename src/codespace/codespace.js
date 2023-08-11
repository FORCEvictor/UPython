import "../generators/python";

import { dartGenerator } from "blockly/dart";
import { javascriptGenerator } from "blockly/javascript";
import { luaGenerator } from "blockly/lua";
import { phpGenerator } from "blockly/php";
import { pythonGenerator } from "blockly/python";
import highlight from "highlight.js/lib/core";
import python from "highlight.js/lib/languages/python";
import _ from "lodash";

import platform from "../utils/platform";

class BoxyCodespace {
  /**
   * 代码区
   * @constructor
   */
  constructor(workspace) {
    this.workspace = workspace;
    this.blocklyDiv = document.getElementsByClassName("blocklyDiv")[0];
    this.codespaceDiv = document.getElementById("codespace");
    this.codespaceHeadDiv = document.getElementById("codespaceHead");
    this.codeDiv = document.getElementById("code");
    this.workspaceDiv = document.getElementById("workspace");
    this.codespaceButton = document.getElementById("switchCode");
    this.codeSelect = document.querySelector(".codespace-change");
    this.language = pythonGenerator;
  }

  /**
   * 加载代码区高亮、监听器。
   * @method
   */
  load = () => {
    // 代码区高亮
    highlight.registerLanguage("python", python);
    // 代码区尺寸变化监听器

    window.addEventListener("resize", this.resize);
    this.resize();
  };

  /**
   * 将工作区内容转化为代码，并提供高亮。
   * @method
   */
  updateCode = () => {
    let code = this.language.workspaceToCode(this.workspace);
    if (code === "") {
      this.codeDiv.innerHTML = "未检出可转换代码，请拖动积木到代码区。";
    } else {
      this.codeDiv.innerHTML = _.escape(code);
    }
    highlight.highlightAll();
  };

  /**
   * 根据当前用户窗口大小，重置代码区尺寸。
   * @method
   */
  resize = () => {
    window.changeSize(this.currentWidth());
    if (this.currentWidth() === window.innerWidth) {
      this.codespaceHeadDiv.style.display = "block";
      this.codeDiv.style.marginTop = "0px";
      this.codeSelect.style.top = "15px";
      this.codeSelect.style.left = "20px";
    } else {
      this.codespaceHeadDiv.style.display = "none";
      this.codeDiv.style.marginTop = "20px";
      this.codeSelect.style.top = "0";
      this.codeSelect.style.left = "0";
    }
  };

  /**
   * 打开代码区。
   * @method
   */
  open = () => {
    this.blocklyDiv.setAttribute("code", "");
    this.codespaceDiv.setAttribute("code", "");
    this.codespaceButton = document.getElementById("switchCode");
    this.codespaceButton.style.color = "var(--boxy-color)";
    this.codespaceDiv.style.display = "";
    window.changeDirection(["left"]);
  };

  /**
   * 关闭代码区。
   * @method
   */
  close = () => {
    this.blocklyDiv.removeAttribute("code");
    this.codespaceDiv.removeAttribute("code");
    this.codespaceButton = document.getElementById("switchCode");
    this.codespaceButton.style.color = "var(--zoombox-color)";
    this.codespaceDiv.style.display = "none";
    window.changeDirection([]);
  };

  /**
   * 代码区收放。
   * @method
   */
  switch = () => {
    if (this.blocklyDiv.getAttributeNames().indexOf("code") === -1) {
      this.codespaceDiv.style.width = 350 + "px";
      this.open();
    } else {
      this.close();
    }
    this.resize();
  };

  /**
   * 代码区是否展开。
   * @method
   * @returns {boolean}
   */
  state = () => {
    return this.codespaceDiv.getAttributeNames().indexOf("code") !== -1;
  };

  /**
   * 计算代码区应有宽度。
   * @method
   * @returns {number} 宽度(px)
   */
  dueWidth = () => {
    if (platform() === "PC") {
      return parseInt(this.codespaceDiv.style.width);
    } else {
      return window.innerWidth;
    }
  };

  /**
   * 代码区实际宽度。
   * @returns {number}
   */
  currentWidth = () => {
    return this.state() ? this.dueWidth() : 0;
  };

  /**
   * 切换代码框使用语言
   * @method
   */
  switch_generator = (language) => {
    switch (language) {
      case "Javascript":
        this.language = javascriptGenerator;
        this.codeDiv.className = "language-javascript hljs";
        break;
      case "Dart":
        this.language = dartGenerator;
        this.codeDiv.className = "language-dart hljs";
        break;
      case "Python":
        this.language = pythonGenerator;
        this.codeDiv.className = "language-python hljs";
        break;
      case "Lua":
        this.language = luaGenerator;
        this.codeDiv.className = "language-lua hljs";
        break;
      case "PHP":
        this.language = phpGenerator;
        this.codeDiv.className = "language-php hljs";
        break;
      default:
        break;
    }
    this.updateCode();
  };
}

export default BoxyCodespace;

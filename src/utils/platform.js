/**
 * 返回当前的平台
 * @returns {string} PC/Phone
 */
function platform() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const flyoutDiv = document.querySelector("#boxy > .blocklyDiv > div > svg.blocklyFlyout");
  const toolboxDiv = document.getElementsByClassName("blocklyToolboxDiv")[0];
  const toolboxWidth = toolboxDiv.getBoundingClientRect().width;
  const flyoutWidth = 320;
  const codespaceWidth = 350 + Math.log(window.innerWidth);
  return window.innerWidth > toolboxWidth + flyoutWidth + codespaceWidth ? "PC" : "Phone";
}

export default platform;

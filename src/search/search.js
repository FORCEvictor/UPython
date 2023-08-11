import { WorkspaceSearch } from "@blockly/plugin-workspace-search";

class BoxySearch {
  constructor(workspace) {
    this.workspace = workspace;
  }
  /**
   * 加载搜索
   * @method
   */
  load = () => {
    this.workspaceSearch = new WorkspaceSearch(this.workspace);
    this.workspaceSearch.setSearchPlaceholder("搜索作品中的积木");
    this.workspaceSearch.init();
    this.workspaceSearchDiv = document.getElementsByClassName("blockly-ws-search")[0];
    this.zoomBoxDiv = document.getElementById("zoomBox");
    window.addEventListener("resize", this.resize);
  };
  /**
   * 同步与zoombox的大小
   * @method
   */
  resize = () => {
    this.workspaceSearchDiv.style.width = this.zoomBoxDiv.style.width + "px";
    this.workspaceSearchDiv.style.height = this.zoomBoxDiv.style.height + "px";
  };
}

export default BoxySearch;

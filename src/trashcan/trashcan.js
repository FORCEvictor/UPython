class BoxyTrashcan {
  /**
   * 垃圾桶
   * @constructor
   */
  constructor() {
    this.trashCan = document.getElementById("trashcan");
    this.trashcanLid = document.getElementById("trashcan-lid");
    this.trashcanBody = document.getElementById("trashcan-body");
  }

  /**
   * 通过事件指导垃圾桶状态。
   * @method
   * @param {Event} event 工作区的事件，用于判断当前状态。
   * @example
   * this.workspace.addChangeListener(trashcan.switch);
   */
  switch = (event) => {
    this.trashCan = document.getElementById("trashcan");
    this.trashcanLid = document.getElementById("trashcan-lid");
    this.trashcanBody = document.getElementById("trashcan-body");
    if (event.type === "drag") {
      this.switchOn();
    } else if (event.type === "move") {
      if (event.oldCoordinate !== undefined) {
        this.switchOff();
        this.coverOff();
      }
    }
  };

  /**
   * 显示。
   * @method
   */
  switchOn = () => {
    this.trashCan.style.zIndex = "6";
    this.trashcanLid.style.zIndex = "7";
    this.trashcanBody.style.zIndex = "7";
    this.trashCan.style.opacity = "1";
    this.trashcanLid.style.opacity = "1";
    this.trashcanBody.style.opacity = "1";
  };

  /**
   * 隐藏。
   * @method
   */
  switchOff = () => {
    this.trashCan.style.zIndex = "0";
    this.trashcanLid.style.zIndex = "0";
    this.trashcanBody.style.zIndex = "0";
    this.trashCan.style.opacity = "0";
    this.trashcanLid.style.opacity = "0";
    this.trashcanBody.style.opacity = "0";
  };

  /**
   * 开盖
   * @method
   */
  coverOn = () => {
    this.trashcanLid.style.transform = "translate(-4px,-4px) rotate(-20deg)";
  };

  /**
   * 合盖
   * @method
   */
  coverOff = () => {
    this.trashcanLid.style.transform = "translate(0px, 0px) rotate(0deg)";
  };
}

let trashcan = new BoxyTrashcan();
export default trashcan;

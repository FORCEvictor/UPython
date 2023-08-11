class BoxyTheme {
  /**
   * 主题
   * @constructor
   */
  constructor() {
    this.mode = "light";
    this.root = document.documentElement;
  }

  /**
   * 切换主题
   * @method
   * @param {string} mode 主题名称
   */
  switch(mode) {
    console.log(mode);
    this.mode = mode;
    this.root.setAttribute("mode", mode);
    document.body.setAttribute("arco-theme", mode);
  }
}

let boxyTheme = new BoxyTheme();
export default boxyTheme;

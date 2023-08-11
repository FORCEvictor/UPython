<script setup>
import { IconClose } from "@arco-iconbox/vue-boxy";
import Blockly from "blockly";
import * as zh from "blockly/msg/zh-hans";
import { onMounted, ref, shallowRef } from "vue";

import Dropdown from "@/dropdown/dropdown.vue";

import BoxyCodespace from "../codespace/codespace";
import BoxySearch from "../search/search";
import toolbox from "../toolbox/toolbox";
import trashcan from "../trashcan/trashcan";
import BoxyZoomBox from "../zoomBox/zoomBox";

// 设置Blockly使用语言
Blockly.setLocale(zh);
// 部分汉化修改
Blockly.Msg["CONTROLS_REPEAT_INPUT_DO"] = "";
Blockly.Msg["CONTROLS_IF_MSG_THEN"] = "";
Blockly.Msg["CONTROLS_IF_MSG_ELSE"] = "";
Blockly.Msg["LOGIC_BOOLEAN_TRUE"] = "真";
Blockly.Msg["LOGIC_BOOLEAN_FALSE"] = "假";
Blockly.Msg["NEW_VARIABLE"] = "创建变量";
// 初始化数值
const props = defineProps(["options"]);
const blocklyToolbox = ref();
const blocklyDiv = ref();
const workspace = shallowRef();

const generator_value = ref("Python");
let generator_change;

let directions = ref([]);
let width = ref(0);

defineExpose({ workspace });
// 挂载时运行
onMounted(() => {
  const options = props.options || {};
  if (!options.toolbox) {
    options.toolbox = blocklyToolbox.value;
  }
  // 生成工作区
  workspace.value = Blockly.inject(blocklyDiv.value, options);
  // 添加搜索插件
  const workspaceSearch = new BoxySearch(workspace.value);
  workspaceSearch.load();
  // 添加代码框
  let boxyCodespace = new BoxyCodespace(workspace.value);
  boxyCodespace.load();
  // 代码框代码语言类型切换函数
  generator_change = (value) => {
    generator_value.value = value;
    boxyCodespace.switch_generator(value);
  };
  // 添加zoomBox
  const boxyZoomBox = new BoxyZoomBox(workspace.value, boxyCodespace, workspaceSearch);
  boxyZoomBox.load();
  // 全局函数设置
  window.zoomBoxResize = boxyZoomBox.resize;
  window.searchSwitch = boxyZoomBox.searchSwitch;
  window.codespaceSwitch = boxyZoomBox.codespaceSwitch;
  window.zoomBoxSmaller = boxyZoomBox.smaller;
  window.zoomBoxReset = boxyZoomBox.reset;
  window.zoomBoxBigger = boxyZoomBox.bigger;
  // 监听工作区
  workspace.value.addChangeListener(function (event) {
    // 代码框代码更新
    boxyCodespace.updateCode();
    // 检测垃圾桶是否需要打开
    trashcan.switch(event);
  });
  // 重置toolbox大小
  toolbox.resize();
});
/**
 * 设置代码框的拉条是否启用
 * @method
 */
window.changeDirection = (value) => {
  directions.value = value;
};

/**
 * 设置代码框宽度的最大值
 * @method
 */
window.changeSize = (value) => {
  if (value <= 768) {
    width.value = value;
  }
};
/**
 * 设置代码框伸缩时部分代码
 * @method
 */
let move = (size) => {
  if (size.width <= 768) {
    width.value = size.width;
  } else {
    width.value = 768;
  }
  window.zoomBoxResize();
};
/**
 * 设置代码框伸缩结束时部分代码
 * @method
 */
let moveEnd = () => {
  window.zoomBoxResize();
};
</script>

<template>
  <div>
    <!--下拉框-->
    <Dropdown :workspace="workspace"></Dropdown>
    <!--工作区-->
    <div class="blocklyDiv" ref="blocklyDiv"></div>
    <!--toolbox-->
    <xml ref="blocklyToolbox" style="display: none">
      <slot></slot>
    </xml>
    <!--代码区-->
    <a-resize-box
      id="codespace"
      v-model:width="width"
      :directions="directions"
      @moving="move"
      @moving-end="moveEnd"
      :style="{ width: '0px' }"
      ><a-select
        @change="generator_change"
        v-model:model-value="generator_value"
        :style="{ width: '150px' }"
        default-value="Python"
        class="codespace-change"
      >
        <a-option>Python</a-option>
      </a-select>
      <div id="codespaceHead">
        <iconpark-icon id="codespaceClose" name="close" onclick="codespaceSwitch();zoomBoxResize()"></iconpark-icon>
        <icon-close id="codespaceClose" onclick="codespaceSwitch();zoomBoxResize()" />
      </div>
      <pre><code id="code" class="language-python"></code></pre>
    </a-resize-box>
    <!--垃圾桶-->
    <div id="trashcan" class="blocklyToolboxDelete" style="cursor: grabbing">
      <img src="../icon/trashcan/lid.svg" id="trashcan-lid" class="trashcan" alt="垃圾桶盖" />
      <img src="../icon/trashcan/body.svg" id="trashcan-body" class="trashcan" alt="垃圾桶身" />
    </div>
  </div>
</template>

<style scoped>
.blocklyDiv {
  height: 100%;
  width: 100%;
  text-align: left;
}
</style>

<style>
.codespace-change {
  position: absolute;
  left: 0;
  top: 0;
}
</style>

<script setup>
import { ref } from "vue";

import Screenshot from "@/screenshot/screenshot.vue";
import ZoomBox from "@/zoomBox/zoomBox.vue";

import toolboxConfig from "./toolbox/toolbox.json";
import BoxyWorkSpace from "./workspace/workspace.vue";

const foo = ref();
const options = {
  toolbox: toolboxConfig,
  trashcan: false,
  media: "media/",
  zoom: {
    controls: true,
    wheel: true,
    startScale: 0.8,
    maxScale: 1.4,
    minScale: 0.5,
  },
  move: {
    scrollbars: true,
    drag: true,
    wheel: true,
  },
  theme: "codemao",
  renderer: "codemao",
};
</script>

<template>
  <!--工作区域-->
  <BoxyWorkSpace id="boxy" :options="options" ref="foo"></BoxyWorkSpace>
  <!--缩放栏-->
  <ZoomBox id="zoomBox"></ZoomBox>
  <!--全局预览图片显示-->
  <Screenshot></Screenshot>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: var(--workspace-background);
}

html,
body {
  margin: 0;
}

#boxy {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--workspace-background);
}
</style>

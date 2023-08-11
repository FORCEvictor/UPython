<template>
  <a-space :size="size">
    <!--搜索-->
    <a-tooltip content="搜索" position="top" arrow-class="hide-arrow" content-class="zoomBox-tip">
      <a-button id="switchSearch" type="text" onclick="searchSwitch()" shape="circle">
        <template #icon>
          <icon-search />
        </template>
      </a-button>
    </a-tooltip>
    <!--代码转换-->
    <a-tooltip content="转换代码" position="top" arrow-class="hide-arrow" content-class="zoomBox-tip">
      <a-button id="switchCode" type="text" onclick="codespaceSwitch();zoomBoxResize()" shape="circle">
        <template #icon>
          <icon-code />
        </template>
      </a-button>
    </a-tooltip>
    <!--分割符-->
    <a-divider direction="vertical" margin="2px" />
    <!--缩小键-->
    <a-tooltip content="缩小" position="top" arrow-class="hide-arrow" content-class="zoomBox-tip">
      <a-button id="zoomBoxSmaller" type="text" onclick="zoomBoxSmaller()" shape="circle">
        <template #icon>
          <icon-smaller />
        </template>
      </a-button>
    </a-tooltip>
    <!--100%键-->
    <a-tooltip content="恢复为100%" position="top" arrow-class="hide-arrow" content-class="zoomBox-tip">
      <a-button type="text" onclick="zoomBoxReset()" shape="round">
        <span id="zoomBoxReset">100%</span>
      </a-button>
    </a-tooltip>
    <!--放大键-->
    <a-tooltip content="放大" position="top" arrow-class="hide-arrow" content-class="zoomBox-tip">
      <a-button id="zoomBoxBigger" type="text" onclick="zoomBoxBigger()" shape="circle">
        <template #icon>
          <icon-bigger />
        </template>
      </a-button>
    </a-tooltip>
  </a-space>
</template>

<script>
import { IconBigger, IconCode, IconSearch, IconSmaller } from "@arco-iconbox/vue-boxy";

export default {
  components: { IconSearch, IconCode, IconBigger, IconSmaller },
  data() {
    return {
      size: 0,
    };
  },
};
</script>

<style scoped>
.arco-btn-size-medium.arco-btn-only-icon {
  width: 40px;
  height: 40px;
}
</style>

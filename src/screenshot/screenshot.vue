<script>
import Blockly from "blockly";
import { ref } from "vue";

/**
 * 积木块转图片
 * @function
 */
function setBlockToImage(onClick) {
  const block_to_image = {
    displayText: "生成图片",
    preconditionFn: function () {
      return "enabled";
    },
    callback: function (scope) {
      let a = { blocks: { languageVersion: 0, blocks: [scope.block.toCopyData().saveInfo] } };
      let b = document.createElement("div");
      b.id = "secondaryDiv";
      let secondaryWorkspace = Blockly.inject(b, {
        readOnly: true,
        theme: "codemao",
        renderer: "codemao",
      });
      Blockly.serialization.workspaces.load(a, secondaryWorkspace);
      downloadScreenshot(secondaryWorkspace);
    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
    id: "block_to_image",
    weight: 100,
  };

  Blockly.ContextMenuRegistry.registry.register(block_to_image);

  const workspace_to_image = {
    displayText: "全局预览",
    preconditionFn: function (scope) {
      if (scope.workspace.blockDB.size) {
        return "enabled";
      }
      return "disabled";
    },
    callback: function (scope) {
      workspaceToSvg_(scope.workspace, function (dataUrl) {
        onClick(dataUrl);
      });
      //downloadScreenshot(scope.workspace);
    },
    scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
    id: "workspace_to_image",
    weight: 100,
  };

  Blockly.ContextMenuRegistry.registry.register(workspace_to_image);
}
/**
 * svg图片转png图片
 * @function
 */
function svgToPng_(data, width, height, callback) {
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  let img = new Image();

  let pixelDensity = 1;
  canvas.width = width * pixelDensity;
  canvas.height = height * pixelDensity;
  img.onload = function () {
    context.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
    try {
      let dataUrl = canvas.toDataURL("image/png");
      callback(dataUrl);
    } catch (err) {
      console.warn("Error converting the workspace svg to a png");
      callback("");
    }
  };
  img.src = data;
}

/**
 * 创建工作区的svg图片
 * @param {!Blockly.WorkspaceSvg} workspace 工作区
 * @param {!Function} callback 回调
 * @param {string=} customCss 自定义svg css
 */
function workspaceToSvg_(workspace, callback, customCss) {
  // Go through all text areas and set their value.
  let textAreas = document.getElementsByTagName("textarea");
  for (let i = 0; i < textAreas.length; i++) {
    textAreas[i].innerHTML = textAreas[i].value;
  }

  let bBox = workspace.getBlocksBoundingBox();
  let x = bBox.x || bBox.left;
  let y = bBox.y || bBox.top;
  let width = bBox.width || bBox.right - x;
  let height = bBox.height || bBox.bottom - y;

  let blockCanvas = workspace.getCanvas();
  let clone = blockCanvas.cloneNode(true);
  clone.removeAttribute("transform");

  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.appendChild(clone);
  svg.setAttribute("viewBox", x + " " + y + " " + width + " " + height);

  svg.setAttribute(
    "class",
    "blocklySvg " +
      (workspace.options.renderer || "geras") +
      "-renderer " +
      (workspace.getTheme ? workspace.getTheme().name + "-theme" : "")
  );
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("style", "background-color: transparent");

  let css = [].slice
    .call(document.head.querySelectorAll("style"))
    .filter(function (el) {
      return /\.blocklySvg/.test(el.innerText) || el.id.indexOf("blockly-") === 0;
    })
    .map(function (el) {
      return el.innerText;
    })
    .join("\n");
  let style = document.createElement("style");
  style.innerHTML = css + "\n" + customCss;
  svg.insertBefore(style, svg.firstChild);

  let svgAsXML = new XMLSerializer().serializeToString(svg);
  svgAsXML = svgAsXML.replace(/&nbsp/g, "&#160");
  let data = "data:image/svg+xml," + encodeURIComponent(svgAsXML);

  svgToPng_(data, width, height, callback);
}
/**
 * 下载截图
 * @param {!Blockly.WorkspaceSvg} workspace 工作区
 */
const downloadScreenshot = function (workspace) {
  workspaceToSvg_(workspace, function (dataUrl) {
    let a = document.createElement("a");
    a.download = "block.png";
    a.target = "_self";
    a.href = dataUrl;
    document.body.appendChild(a);
    a.click();
    a.parentNode.removeChild(a);
  });
};

export default {
  setup() {
    const visible = ref(false);
    const src = ref("");
    const onClick = (dataUrl) => {
      visible.value = true;
      src.value = dataUrl;
    };

    setBlockToImage(onClick);

    return {
      visible,
      src,
      onClick,
    };
  },
};
</script>
<template>
  <a-image-preview v-model:src="src" v-model:visible="visible"></a-image-preview>
</template>

<script>
import { Input, Modal } from "@arco-design/web-vue";
import Blockly from "blockly";
import { h } from "vue";
/**
 * Alert框设置
 * @override Blockly.dialog.setAlert
 * @param message 弹出文本
 * @param callback 回调
 */
Blockly.dialog.setAlert(function (message, callback) {
  Modal.confirm({
    title: "注意",
    content: message,
    okText: "确认",
    onCancel: callback,
    onOk: callback,
    hideCancel: true,
  });
});

/**
 * Confirm框设置
 * @override Blockly.dialog.setConfirm
 * @param message 弹出文本
 * @param callback 回调
 */
Blockly.dialog.setConfirm(function (message, callback) {
  Modal.confirm({
    title: "注意",
    content: message,
    okText: "确认",
    cancelText: "取消",
    onCancel: function () {
      callback(false);
    },
    onOk: function () {
      callback(true);
    },
  });
});

/**
 * Prompt框设置
 * @override Blockly.dialog.setConfirm
 * @param message 弹出文本
 * @param defaultValue 默认输入文本
 * @param callback 回调
 */
Blockly.dialog.setPrompt(function (message, defaultValue, callback) {
  Modal.confirm({
    title: message,
    content: () => h(Input, { defaultValue: defaultValue, id: "dialog-input" }),
    okText: "确认",
    cancelText: "取消",
    onCancel: function () {
      callback(null);
    },
    onOk: function () {
      callback(document.querySelector("#dialog-input input").value);
    },
  });
});
</script>

<style>
.arco-modal-container .arco-modal {
  max-width: 520px;
  width: calc(100% - 84px);
}

.arco-modal-container .arco-modal-simple {
  max-width: 400px;
  width: calc(100% - 84px);
}
</style>

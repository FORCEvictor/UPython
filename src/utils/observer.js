/**
 * 监听元素变化
 * @function
 */
function observer(selector, attributeFilter, callback) {
  let element = document.querySelector(selector);
  // eslint-disable-next-line no-func-assign
  observer = new window.MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "attributes") {
        callback(element);
      }
    });
  });
  observer.observe(element, {
    attributes: true,
    attributeFilter: attributeFilter,
  });
}

export default observer;

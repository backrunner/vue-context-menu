/* eslint-disable no-param-reassign */
import ContextMenu from './components/ContextMenu.vue';
import ContextMenuItem from './components/ContextMenuItem.vue';

const eventHandlerName = (eventName) => `__vue_context_menu_${eventName}_handler`;
const contextHandlerName = eventHandlerName('context');
const touchStartHandlerName = eventHandlerName('touchstart');
const touchMoveHandlerName = eventHandlerName('touchmove');
const touchEndHandlerName = eventHandlerName('touchend');
const timerName = '__vue_context_menu_touch_timer';

const component = {
  install(Vue, options) {
    // component
    Vue.component('ContextMenu', ContextMenu);
    if (options && options.useItem) {
      Vue.component('ContextMenuItem', ContextMenuItem);
    }
    // directive
    Vue.directive('context', {
      bind(el, binding, vNode) {
        const contextHandler = (e) => {
          e.preventDefault();
          e.stopPropagation();
          vNode.context.$refs[binding.value].open(e);
        };
        el.addEventListener('contextmenu', contextHandler);
        el[contextHandlerName] = contextHandler;
        if (options && options.mobileSupport) {
          const touchStartHandler = (e) => {
            el[timerName] = setTimeout(() => {
              vNode.context.$refs[binding.value].open(e);
            }, options.touchTimeout || 600);
          };
          const touchMoveHandler = () => {
            clearTimeout(el[timerName]);
            delete el[timerName];
          };
          const touchEndHandler = () => {
            clearTimeout(el[timerName]);
            delete el[timerName];
          };
          el.addEventListener('touchstart', touchStartHandler);
          el.addEventListener('touchmove', touchMoveHandler);
          el.addEventListener('touchend', touchEndHandler);
          el[touchStartHandlerName] = touchStartHandler;
          el[touchMoveHandlerName] = touchMoveHandler;
          el[touchEndHandlerName] = touchEndHandler;
        }
      },
      unbind(el, binding, vNode) {
        el.removeEventListener('contextmenu', el[contextHandlerName]);
        delete el[contextHandlerName];
        vNode.context.$refs[binding.value].close();
        if (options && options.mobileSupport) {
          el.removeEventListener('touchstart', el[touchStartHandlerName]);
          el.removeEventListener('touchmove', el[touchMoveHandlerName]);
          el.removeEventListener('touchend', el[touchEndHandlerName]);
          delete el[touchStartHandlerName];
          delete el[touchMoveHandlerName];
          delete el[touchEndHandlerName];
        }
      },
    });
  },
};

export default component;

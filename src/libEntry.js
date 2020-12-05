/* eslint-disable no-param-reassign */
import ContextMenu from './components/ContextMenu.vue';
import ContextMenuItem from './components/ContextMenuItem.vue';

const contextHandlerName = '__vue_context_menu_context_handler';

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
      },
      unbind(el, binding, vNode) {
        el.removeEventListener('contextmenu', el[contextHandlerName]);
        delete el[contextHandlerName];
        vNode.context.$refs[binding.value].close();
      },
    });
  },
};

export default component;

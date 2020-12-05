import Vue from 'vue';
import App from './App.vue';
import VueContextMenu from './libEntry';

Vue.config.productionTip = false;

Vue.use(VueContextMenu, {
  useItem: true,
  mobileSupport: true,
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');

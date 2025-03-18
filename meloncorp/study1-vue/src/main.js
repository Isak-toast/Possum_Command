// src/main.js
import Vue from 'vue';
import App from './App.vue';
import store from './store';
import loggerMixin from './loggerMixin';

Vue.config.productionTip = false;

Vue.mixin(loggerMixin); // 전역 믹스인 적용

new Vue({
  name: 'RootApp',
  store,
  render: h => h(App)
}).$mount('#app');

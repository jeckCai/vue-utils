import Vue from 'vue';
import App from '@/App';
import store from '@/store';
import router from '@/router';
import vant from 'vant';
import "babel-polyfill";
import * as filters from '@/filters';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import 'normalize.css/normalize.css';
import '@/styles.css';
import 'vant/lib/vant-css/index.css';
import VConsole  from 'vconsole';
Vue.config.productionTip = false;
let vConsole = new VConsole();
Vue.use(vant);
Vue.use(MintUI);
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
})

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
});

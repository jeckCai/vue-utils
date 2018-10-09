import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import { Store } from 'vuex';
import store from '@/store';

Vue.use(Router);

const router = new Router({
  routes
});

router.beforeEach((to, from, next) => {
  // console.log(to.name + '----' + JSON.stringify(from));
  // store.dispatch('getUserInfo').then(rps=>{console.log(rps)});
  next();
  
});

export default router;

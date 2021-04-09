import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';

import Home from './components/Home.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { 
      path: '/', 
      component: Home, 
      name: 'Home', 
      meta: { 
        isPublic: true ,
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to, to.query);
  next();
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

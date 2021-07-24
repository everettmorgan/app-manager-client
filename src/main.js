import Vue from 'vue'
import Vuex from 'vuex';
import App from './App.vue'
import fetch from 'node-fetch';
import VueRouter from 'vue-router';
import vuetify from './plugins/vuetify';

import Home from './components/Home.vue';
import Login from './components/Login.vue';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/8081/sso/',
      component: Login,
      name: 'Login',
      meta: {
        isPublic: true,
      }
    },
    {
      path: '/8081/sso/home',
      component: Home,
      name: 'Home',
      meta: {
        isPublic: false,
      }
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const authed = await isAuthed();

  if (to.name === 'Login' && authed) {
    return router.push({ name: 'Home' });
  }

  if (!to.meta.isPublic && !authed) {
    return router.push({ name: 'Login' });
  }

  next();
});

function isAuthed() {
  return fetch('https://duda.ejmorgan.com/8082/auth/check').then((res) => res.ok);
}

const store = new Vuex.Store({
  state: {
    loggedIn: false,
    aid: null,
  },
  getters: {
    aid: (state) => state.aid,
    loggedIn: (state) => state.loggedIn,
  },
  mutations: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
    },
    setAccount: (state, aid) => {
      state.aid = aid;
    }
  }
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

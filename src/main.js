import Vue from 'vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css' 
import './plugins/vuetify'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import GlobalEvents from 'vue-global-events'
Vue.component('GlobalEvents', GlobalEvents)

import checkView from 'vue-check-view'
Vue.use(checkView)

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
Vue.prototype.$firebase = firebase;

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

const db = firebase
  .initializeApp({
	apiKey: process.env.VUE_APP_apiKey,
	authDomain: process.env.VUE_APP_authDomain,
	databaseURL: process.env.VUE_APP_databaseURL,
	projectId: process.env.VUE_APP_projectId,
	storageBucket: process.env.VUE_APP_storageBucket
}).database()

Vue.prototype.$db = db

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created(){
  firebase.auth().onAuthStateChanged((currentUser) => {
	  if(currentUser){
	  	store.commit('setCurrentUser', currentUser);
	 	store.commit('setIsAuthenticated', true);
	 	store.dispatch('updateItem', {path: "users/"+currentUser.uid, data: {lastSignIn: firebase.database.ServerValue.TIMESTAMP}})
	 	// this.$router.push('/home')
	  } else{
	  	this.$router.push('/start')
		store.commit('setCurrentUser', null);
		store.commit('setIsAuthenticated', false);
	  }
   })
},
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import firebase from 'firebase/app';
import 'firebase/auth';
import router from './router'

import { vuexfireMutations  } from 'vuexfire'

export default new Vuex.Store({
  state: {
  	currentUser: null,
  	isAuthenticated: null,
  	settings: {},
  	snackbar: {
  		show: false,
  		text: ''
  	},
  	win: {
  		width: null,
  		height: null
  	},
  	colors: {
  		default: '#000',
  	},
  	
  },
  getters: {
  	currentUser: state => state.currentUser,
  	settings: state => state.settings,
  	snackbar: state => state.snackbar,
  	win: state => state.win,
  	colors: state => state.colors,
  	isAuthenticated: state => state.currentUser !== null && state.currentUser !== undefined,
  	
  },
  mutations: {
  	...vuexfireMutations,

  	set: function (state, obj) {
      state[obj.key] = obj.value
    },
    setCurrentUser: function(state, payload){
      state.currentUser = payload
    },
	setIsAuthenticated(state, payload) {
	  state.isAuthenticated = payload;
	},
    showSnackbar (state, payload) {
      state.snackbar.show = true
      state.snackbar.text = payload
    },
    hideSnackbar (state) {
      state.snackbar.show = false
    }

  },
  actions: {


  	// bindSomeRef: firestoreAction(context => {
   //    // context contains all original properties like commit, state, etc
   //    // and adds `bindFirestoreRef` and `unbindFirestoreRef`
   //    // we return the promise returned by `bindFirestoreRef` that will
   //    // resolve once data is ready
   //    return context.bindFirestoreRef('something', db.collection('something'))
   //  }),
  	 

  	updateItem: ({ dispatch, commit }, obj) =>{
  	  return firebase.database().ref(obj.path).update(obj.data)
  	    .then(response => {
  	        return response
  	    }, error => {
  	      return error
  	    })
  	},


  	userSignUp({ dispatch, commit, state }, { email, password, persistence }) {
  	      
  	      return firebase
  	            .auth()
  	            .createUserWithEmailAndPassword(email, password)
  	            .then(user => {
  	                commit('setCurrentUser', user);
  	                return dispatch('updateItem', {path: "users/"+state.currentUser.uid, data: {firstSignIn:firebase.database.ServerValue.TIMESTAMP, accountCreated: firebase.database.ServerValue.TIMESTAMP, email: state.currentUser.user.email}})
  	            })
  	            .catch((error) => {
  	                commit('setCurrentUser', null);
  	                return error
  	            })
  	    },

  	    userSignIn({ commit, dispatch, state }, { email, password, persistence }) {
  	        return firebase
  	            .auth()
  	            // .setPersistence(persistence)
  	            .signInWithEmailAndPassword(email, password)
  	            .then(user => {
  	            	console.log('signing in user...')
  	                commit('setCurrentUser', user);
  	                return
  	                // return dispatch('updateItem', { path: "users/"+state.currentUser.uid, data: {lastSignIn: firebase.database.ServerValue.TIMESTAMP}}).then(e=>{

  	                // })
  	            })
  	            .catch((error) => {
  	                commit('setCurrentUser', null);
  	                return error
  	            })

  	          
  	    },

  	    userSignOut({ commit }) {
  	        return firebase
  	            .auth()
  	            .signOut()
  	            .then(() => {
  	                commit('setCurrentUser', null);
  	                router.push({path: '/start'});
  	                return 
  	            })
  	            .catch((e) => {
  	                commit('setCurrentUser', null);
  	                router.push({path: '/start'});
  	                return e 
  	            });
  	    },

  }
})

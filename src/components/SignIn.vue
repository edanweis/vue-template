<template>
  <v-container fluid fill-height px-5 pb-5 px-0 class="wrapper">
  <v-layout row fluid wrap align-start justify-center style="">
    <v-flex xs12 style="max-width: 550px" :px-5="win.width>600" >
         <v-form  dark class="form" autocomplete="off" @submit="submit('SignIn')">
          <v-flex xs12 :px-4="win.width>600">
           <v-text-field dark :color="colors.leaf" class="leaf--text zoom" id="email" placeholder="email" v-model="form.email" v-validate="'required|'" :error-messages="errors.collect('email')" data-vv-name="email" required
           ></v-text-field>
         </v-flex>
         <v-flex xs12 :px-4="win.width>600">
        
           <v-text-field dark :color="colors.leaf" class="pb-5" id="password" placeholder="Password" v-model="form.password" type="password" v-validate="'required|min:6'" :error-messages="errors.collect('password')" data-vv-name="password" required
           ></v-text-field>
         
            <v-btn type="submit" class="elevation-0" @click.prevent="submit('SignIn')" large block>Sign In</span></v-btn>

        <p class="body text-xs-center pt-3">
          OR
          <v-btn class="px-5 elevation-0" flat block large @click.prevent="submit('SignUp')">Create Account</v-btn>
        </p>

        </v-flex>
      </v-form>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vuex from 'vuex'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  name: 'SignIn',
  props: [''],
  components: {},
  data () {
    return {
      submitting: false,
    	form: {
             email: undefined,
              password: undefined,
              remember: true
            },
      dictionary: {
        attributes: {
          email: 'E-mail Address'
          // custom attributes
        },
        custom: {
        }
      }
    }
  },
  watch: {
    
    
  },
  mounted(){
    this.$validator.localize('en', this.dictionary)
  },
  computed:{
	...Vuex.mapGetters(['colors', 'win', 'currentUser', 'isAuthenticated']),
  
  isFormValid() {
      return !Object.keys(this.fields).some(key => this.fields[key].invalid);
    },
  firebasePersistence() {
        return this.form.remember
          ? this.$firebase.auth.Auth.Persistence.LOCAL
          : this.$firebase.auth.Auth.Persistence.SESSION;
      }
  },
  watch:{
  },
  methods:{
	...Vuex.mapMutations(['showSnackbar', 'hideSnackbar']), 
	...Vuex.mapActions(['userSignUp', 'userSignIn']), 
  
  submit (action) {
    console.log('submitting')
    this.$validator.validateAll().then((result)=>{
      if(!result){
      return
      }
      var self = this
      this.submitting = true;
      this.hideSnackbar()

      if(action == 'SignIn'){
        this.userSignIn({email: self.form.email, password: self.form.password, persistence: self.firebasePersistence}).then(e=>{
          if(!this.isAuthenticated){
            this.showSnackbar('not authenticated')
          } else{
           this.showSnackbar("Welcome back!")
           this.$router.replace({name: "home"})
          }
        }).catch((error) => {
          if(error.message == 'EMAIL_EXISTS'){
            this.showSnackbar("That email address has already been used by another account");  
          }
          if(error.message == 'INVALID_PASSWORD' || error.message == 'EMAIL_NOT_FOUND'){
            this.showSnackbar("Your username / password was incorrect")
           }
           this.submitting = false;
           this.form.password = "";
           this.showSnackbar(error.message); 
          
          })
      } else{
        console.log('signing up...')
        this.userSignUp({email: self.form.email, password: self.form.password, persistence: self.firebasePersistence}).then(e=>{
          if(!this.isAuthenticated){
            this.showSnackbar("Something went wrong, try again.")
          } 
        })
        this.showSnackbar("Welcome!")
        this.$router.replace({name: "home"}) // onboarding
      }


    }).catch((error) => {
      console.log('returned the error!')
     this.submitting = false;
     this.form.password = "";
     if(error.message == 'EMAIL_EXISTS'){
      this.showSnackbar("That email address has already been used by another account.")
     } else{
      this.showSnackbar(error.message);  
     }
     
    
    })
    
  },
  clear () {
     this.email = undefined
     this.password = undefined
     this.typ = null
     this.$validator.reset()
   }
  },
}
</script>

<style lang="stylus">
@import '~@/stylus/main'

.wrapper{
  
}
.form .theme--dark.v-input:not(.v-input--is-disabled) input{
    color: var(--v-leaf-base) !important;
}
.form .v-messages__message{
    color: var(--v-shamrock-base) !important; 
}
.zoom{
  // transform: scale(1.3)
}
.scale{
}
p{
  // font-size: calc(14px + )
}
</style>
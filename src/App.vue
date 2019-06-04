<template>
  <v-app v-resize="onResize" dark>
    <!-- <v-toolbar app>
      <v-toolbar-title class="headline">
      </v-toolbar-title>
    </v-toolbar> -->
      <v-snackbar
      bottom
      v-model="snackbar.show"
      color=""
      class="text-xs-center"
        flat
      >
      <span class="body">{{snackbar.text}}</span>

      <v-btn
        @click="hideSnackbar()"
        flat
        icon
      >
        <v-icon class="mdi-icon icon">close</v-icon>
      </v-btn>
    </v-snackbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Vuex from 'vuex'
export default {
  name: 'App',
  directives:{
    'v-resize' : 'v-resize'
  },
  data () {
    return {
      //
    }
  },
  computed: {
    ...Vuex.mapGetters(['win', 'currentUser', 'colors', 'snackbar']),
  },
  methods: {
    ...Vuex.mapMutations(['set', 'showSnackbar', 'hideSnackbar']), 

    onResize(e){
      this.set({key: 'win', value: {
        width: window.innerWidth,
        height: window.innerHeight
      }})
    }
  }
}
</script>
<style lang="stylus">
@import '~@/stylus/main'

</style>

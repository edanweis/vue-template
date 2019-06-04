<template>
<v-layout row wrap>
  <v-flex xs12>

  </v-flex>
</v-layout>
</template>

<script>
import Vuex from 'vuex'

export default {

  name: 'AspectMap',
  props: [''],
  components: {},
  data () {
    return {

    }
  },
  mounted(){

  },
  created(){

  },
  computed:{
  ...Vuex.mapGetters([]),

  },
  watch:{

  },
  methods:{
  ...Vuex.mapMutations([]), 
  ...Vuex.mapActions([]), 

  },
  beforeDestroy(){
  
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/stylus/main'

.wrapper{
  
}

</style>
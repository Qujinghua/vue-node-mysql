<template>
  <div>
    <home-header></home-header>
    <sidebar></sidebar>
    这是首页
  </div>  
</template>
<script>
import homeHeader from "./homeheader/index.vue"
import sidebar from "./sidebar/index.vue"
export default {
  name: 'home',
  data () {
    return {

    }
  },
  components: {
    homeHeader,
    sidebar
  },
  methods: {

  }
}
</script>


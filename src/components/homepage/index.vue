<template>
  <div>
    <home-header></home-header>
    <sidebar></sidebar>
    <home-body></home-body>
  </div>
</template>
<script>
import homeHeader from "./homeheader/index.vue"
import sidebar from "./sidebar/index"
import homeBody from "./homebody/index.vue"
export default {
  name: 'home',
  data () {
    return {

    }
  },
  components: {
    homeHeader,
    sidebar,
    homeBody
  },

  methods: {

  }
}
</script>


<template>
  <div>
    <home-header></home-header>
    <home-body></home-body>
  </div>
</template>
<script>
import homeHeader from "./homeheader/index.vue"
import homeBody from "./homebody/index.vue"
export default {
  name: 'home',
  data () {
    return {

    }
  },
  components: {
    homeHeader,
    homeBody
  },
  methods: {

  }
}
</script>


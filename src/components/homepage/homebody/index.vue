<template>
  <div class="container-right">
    <router-view/>
  </div>
</template>
<script>
// import sideBar from "./sidebar/index.vue"
// import container from "./container/index.vue"
export default {
  data () {
    return {
      breadCrumbA: '',
      breadCrumbB: '',
    }
  },
  components: {
    // sideBar,
    // container
  },
  watch: {

  },
  computed: {
    breadCrumbOne () {
      return this.$store.state.breadCrumbOne
    },
    breadCrumbTwo () {
      return this.$store.state.breadCrumbTwo
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.container-right {
  margin-left: 200px;
  padding: 15px;
}

</style>



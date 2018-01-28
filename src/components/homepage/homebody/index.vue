<template>
  <div class="container-right">
    <router-view/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // breadCrumbA: '',
      // breadCrumbB: '',
    }
  },
  components: {
    // sideBar,
    // container
  },
  watch: {

  },
  computed: {
    // breadCrumbOne () {
    //   return this.$store.state.breadCrumbOne
    // },
    // breadCrumbTwo () {
    //   return this.$store.state.breadCrumbTwo
    // }
  },
  mounted () {
    this.checkSession()
  },
  methods: {
    checkSession () {
      let sessionUser = sessionStorage.getItem('username')
      if(sessionUser == null || sessionUser == '') {
        this.$message({
          message: '登录已失效，请重新登录！',
          type: 'info'
        })
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container-right {
  margin-top: 50px;
  margin-left: 200px;
  padding: 15px;
  &-welcome {
    font-size: 20px;
    text-align: center;
  }
}

</style>



<template>
  <div class="header">
    <div class="header-logo"></div>
    欢迎{{ username }}
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    username () {
      return localStorage.getItem('username')
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 60px;
  background: #434A50;
  color: #fff;
}
</style>



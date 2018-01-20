<template>
  <div class="header">
    <div class="header-logo"></div>
    <div class="header-user">
      <el-dropdown @command="dropdown">
        <span class="el-dropdown-link">
          欢迎{{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
      return sessionStorage.getItem('username')
    }
  },
  methods: {
    dropdown (str) {
      switch(str) {
        case 'userLogout': 
        this.$store.dispatch({type:'UserLogout'})
        this.$message({
          message: '退出成功',
          type: 'success'
        })
        this.$router.push('/login')
        break
        default:
        break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  overflow: hidden;
  width: 100%;
  height: 50px;
  background: #434A50;
  color: #fff;
  line-height: 50px;
  &-logo {
    width: 85%;
    height: 100%;
    float: left;
  }
  &-user {
    width: 15%;
    float: left;
    .el-dropdown-link {
      display: inline-block;
      text-align: center;
      cursor: pointer;
      border-radius: 2px;
      width: 100px;
      height: 100%;
      background: #fff;
    }
  }
}
</style>



<template>
  <div class="header">
    <div class="header-logo">欢迎{{ username }}</div>
    <div class="header-topmenu">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        :router="true">
        <el-menu-item index="/home-page/exhibition">网上展厅</el-menu-item>
        <el-menu-item index="2">处理中心</el-menu-item>
        <!-- <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
        <!-- <el-menu-item index="3">退出登录</el-menu-item> -->
      </el-menu>
      
    </div>
    <div class="header-right">
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
      activeIndex: ''
    }
  },
  computed: {
    username () {
      return sessionStorage.getItem('username')
    }
  },
  created () {
    this.getMenu()
  },
  mounted () {
    
  },
  methods: {
    handleSelect (key, keyPath) {
      
    },
    getMenu () {
      let hashArr = location.hash.split('/').reverse()
      this.activeIndex = '/'+hashArr[1]+'/'+hashArr[0]
    },
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
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e6e6e6;
  &-logo {
    width: 200px;
    height: 100%;
    float: left;
  }
  &-topmenu {
    float: left;
  }
  &-right {
    width: 120px;
    float: right;
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
  .el-menu--horizontal .el-menu-item{
    height: 50px;
    line-height: 50px;
  }
}
// .header {
//   overflow: hidden;
//   width: 100%;
//   height: 50px;
//   background: #434A50;
//   color: #fff;
//   line-height: 50px;
//   &-logo {
//     width: 85%;
//     height: 100%;
//     float: left;
//   }
//   &-user {
//     width: 15%;
//     float: left;
//     .el-dropdown-link {
//       display: inline-block;
//       text-align: center;
//       cursor: pointer;
//       border-radius: 2px;
//       width: 100px;
//       height: 100%;
//       background: #fff;
//     }
//   }
// }
</style>



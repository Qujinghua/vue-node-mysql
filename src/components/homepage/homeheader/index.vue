<template>
  <div class="header">
    <div class="header-content">
      <div class="header-content-logo"><span>未来办公</span></div>
      <div class="header-content-topmenu">
        <el-menu
          :default-active="activeIndex==''?activeIndex2:activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          :router="true">
          <el-menu-item index="/home-page/exhibition">网上展厅</el-menu-item>
          <el-menu-item index="/home-page/customer">客户管理</el-menu-item>
          <!-- <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
          <!-- <el-menu-item index="3">退出登录</el-menu-item> -->
        </el-menu>

      </div>
      <div class="header-content-right">
        <el-dropdown @command="dropdown">
          <span class="el-dropdown-link">
            {{ username }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" style="text-align:center">
            <el-dropdown-item command="modifyInfo">个人信息</el-dropdown-item>
            <el-dropdown-item command="modifyInfoPass">修改密码</el-dropdown-item>
            <el-dropdown-item command="userLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <modify-info :visible.sync="formModel.visible" :action="formModel.action" :receiveForm="formModel.receiveForm" @modifyInfo="modifyInfo"></modify-info>
    <modify-infopass :visible.sync="formModel2.visible" :action="formModel2.action" :receiveForm="formModel2.receiveForm" @modifyInfopass="modifyInfopass"></modify-infopass>
  </div>
</template>
<script>
import axios from '../../../axios'
import modifyInfo from './modifyInfo.vue'
import modifyInfopass from './modifyInfoPass.vue'
export default {
  data () {
    return {
      activeIndex2: '',
      formModel: {
        visible: false,
        receiveForm: {},
        action: ''
      },
      formModel2: {
        visible: false,
        receiveForm: {},
        action: ''
      }
    }
  },
  components: {
    modifyInfo,
    modifyInfopass
  },
  computed: {
    username () {
      return sessionStorage.getItem('username')
    },
    activeIndex () {
      return this.$store.state.topSideMenu
    },
    // activeIndex2 () {
    //   return this.activeIndex
    // }
  },
  watch: {
    // activeIndex2 (now) {
    //   let hashArr = location.hash.split('/').reverse()
    //   this.activeIndex = '/'+hashArr[1]+'/'+hashArr[0]
    // }
  },
  created () {
    this.getMenu()
  },
  mounted () {

  },
  methods: {
    handleSelect (key, keyPath) {
      this.$store.dispatch({type:'topSideMenu', topSideMenu: key})
    },
    getMenu () {
      let hashArr = location.hash.split('/').reverse()
      this.activeIndex2 = '/'+hashArr[1]+'/'+hashArr[0]
    },
    dropdown (str) {
      switch(str) {
        case 'userLogout':
        this.$store.dispatch({type:'UserLogout'})
        this.$store.dispatch({type:'topSideMenu', topSideMenu: ''})
        this.$message({
          message: '退出成功',
          type: 'success'
        })
        this.$router.push('/login')
        break
        case 'modifyInfo':
        const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        axios.post('/config/personalInfo',{username:sessionStorage.getItem('username')})
        .then(data => {
          loading.close();
          // console.log(data.data.data[0])
          this.formModel.action = 'personalInfo'
          this.formModel.receiveForm = data.data.data[0]
          this.formModel.visible = true
        })
        break
        case 'modifyInfoPass':
        this.formModel2.action = 'personalInfoPass'
        this.formModel2.receiveForm.id = sessionStorage.getItem('userid')
        this.formModel2.receiveForm.newPwd = ''
        this.formModel2.receiveForm.checkNewPwd = ''
        this.formModel2.visible = true
        break
        default:
        break
      }
    },
    modifyInfo () {

    },
    modifyInfopass () {

    }
  }
}
</script>
<style lang="scss" scoped>
.header-content {
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
    background: url('../../../assets/logo.png') no-repeat;
    background-size: 50px 50px;
    background-position: 20px 0;
    & span {
      color: #409EFF;
      margin-left: 90px;
      // font-weight: bold;
      font-size: 18px;
    }
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



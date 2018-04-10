<template>
  <!-- 大类 -->
  <el-dialog v-if="action=='addBig'||action=='editBig'" :title="title" :visible="visible" @close="closeModel('big')" width="500px">
    <el-form :model="form" ref="form" :rules="rulesBig" label-width="80px">
      <el-form-item label="大类名称" prop="big_name" >
        <el-input v-model="form.big_name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="大类备注" prop="big_notes" >
        <el-input v-model="form.big_notes" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel('big')" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" size="small">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 子类 -->
  <el-dialog v-else-if="action=='addSmall'||action=='editSmall'" :title="title" :visible="visible" @close="closeModel('small')" width="500px">
    <el-form :model="smallForm" ref="smallForm" :rules="rulesSmall" label-width="80px">
      <el-form-item label="子类名称" prop="small_name" >
        <el-input v-model="smallForm.small_name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="所属大类" prop="big_name" >
        <!-- <el-input v-model="smallForm.big_name" size="mini"></el-input> -->
        <el-select v-model="smallForm.big_id" placeholder="请选择" size="mini">
          <el-option
            v-for="item in bigCLists"
            :key="item.big_id"
            :label="item.big_name"
            :value="item.big_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="子类备注" prop="small_notes" >
        <el-input v-model="smallForm.small_notes" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel('small')" size="small">取 消</el-button>
      <el-button type="primary" @click="submitFormSmall('smallForm')" size="small">确 定</el-button>
    </div>
  </el-dialog>
  <!-- 系列 -->
  <el-dialog v-else-if="action=='addBrand'||action=='editBrand'" :title="title" :visible="visible" @close="closeModel('brand')" width="1000px">
    <el-form :model="brandForm" ref="brandForm" :rules="rulesBrand" label-width="80px">
      <el-form-item label="系列名称" prop="brand_name" >
        <el-input v-model="brandForm.brand_name" size="mini"></el-input>
      </el-form-item>
      <!-- <el-form-item label="所属大类" prop="big_id" >
        <el-select v-model="brandForm.big_id" multiple placeholder="请选择" size="mini" style="width:680px">
          <el-option
            v-for="item in bigCLists"
            :key="item.big_id"
            :label="item.big_name"
            :value="item.big_id">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="所属大类" prop="big_id" >
        <el-checkbox :indeterminate="isIndeterminateBig" v-model="checkAllBig" @change="handleCheckAllChangeBig">全选</el-checkbox>
        <el-checkbox-group v-model="brandForm.big_id" @change="handleCheckedCitiesChangeBig">
          <el-checkbox v-for="item in bigCLists" :label="item.big_id" :key="item.big_id">{{item.big_name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="所属子类" prop="small_id" >
        <!-- <el-select v-model="brandForm.small_id" multiple placeholder="请选择" size="mini" style="width:680px">
          <el-option
            v-for="item in smallCLists"
            :key="item.small_id"
            :label="item.small_name"
            :value="item.small_id">
          </el-option>
        </el-select> -->
        <el-checkbox :indeterminate="isIndeterminateSmall" v-model="checkAllSmall" :disabled="brandForm.big_id.length>0" @change="handleCheckAllChangeSmall">全选</el-checkbox>
        <el-checkbox-group v-model="brandForm.small_id" @change="handleCheckedCitiesChangeSmall">
          <el-checkbox v-for="item in smallCLists" :label="item.small_id" :disabled="brandForm.big_id.indexOf(parseInt(item.big_id)) == -1" :key="item.small_id">{{item.small_name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="系列备注" prop="brand_notes" >
        <el-input v-model="brandForm.brand_notes" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel('brand')" size="small">取 消</el-button>
      <el-button type="primary" @click="submitFormBrand('brandForm')" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from '../../../../../axios'
const defaultBigForm = {
  big_name: '',
  big_notes: ''
}
const defaultSmallForm = {
  small_name: '',
  big_id: '',
  small_notes: ''
}
const defaultBrandForm = {
  brand_name: '',
  small_id: [],
  big_id: [],
  brand_notes: ''
}
export default {
  props: {
    visible: '',
    action: '',
    receiveForm: {},
    bigCLists: {},
    smallCLists: {}
  },
  data () {
    return {
      form: {
        big_name: '',
        big_notes: ''
      },
      smallForm: {
        small_name: '',
        big_id: '',
        small_notes: ''
      },
      brandForm: {
        brand_name: '',
        small_id: [],
        big_id: [],
        brand_notes: ''
      },
      checkAllBig: false,
      isIndeterminateBig: true,
      checkAllSmall: false,
      isIndeterminateSmall: true,
      rulesBig: {
        big_name: [
          { required: true, message:'大类名称不能为空', trigger: 'change' }
        ]
      },
      rulesSmall: {
        small_name: [
          { required: true, message:'子类名称不能为空', trigger: 'change' }
        ]
      },
      rulesBrand: {
        brand_name: [
          { required: true, message:'系列名称不能为空', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    visible (now) {
      // console.log(this.bigCLists)
      // console.log(this.smallCLists)
      if(now && this.action === 'editBig') {
        this.form = {...this.receiveForm}
      } else if(this.action === 'editSmall') {
        this.smallForm = {...this.receiveForm}
      } else if(this.action === 'editBrand') {
        this.brandForm = {...this.receiveForm}
      }
      // if(now && this.action === 'addBig') {
      //   this.form = {...this.defaultBigForm}
      // } else if(this.action === 'addSmall') {
      //   this.smallForm = {...this.defaultSmallForm}
      // } else if(this.action === 'addBrand') {
      //   this.brandForm = {...this.defaultBrandForm}
      // }
      // console.log(this.bigCLists)
    },
    bigChange (now) {
      console.log(now)
      // this.brandForm.small_id = []
        now.forEach(el => {
          this.smallCLists.forEach(el2 => {
            if(el == el2.big_id) {
              this.brandForm.small_id.remove(el2.small_id)
            }
          })
        })
    }

  },
  computed: {
    title () {
      switch(this.action) {
        case 'addBig':
        return '新增大类'
        break
        case 'editBig':
        return '编辑大类'
        break
        case 'addSmall':
        return '新增子类'
        break
        case 'addBrand':
        return '新增产品系列'
        break
        default:
        return
        break
      }
      // return this.action == 'add' ? '新增部门' : '编辑部门'
    },
    bigChange () {
      return this.brandForm.big_id
    }
  },
  methods: {
    closeModel (str) {
      if(str == 'big') {
        this.resetFormBig()
      } else if(str == 'small'){
        this.resetFormSmall()
      } else if(str == 'brand'){
        this.resetFormBrand()
      }
      this.$emit('update:visible', false)
    },
    resetFormBig(str) {
      this.form = {...defaultBigForm}
    },
    resetFormSmall(str) {
      this.smallForm = {...defaultSmallForm}
    },
    resetFormBrand(str) {
      this.brandForm = {...defaultBrandForm}
    },
    submitForm (form) {
      this.form.action = this.action
      this.$refs[form].validate((valid) => {
        if(valid) {
          axios.post('/config/updateMenu',this.form)
          .then(data => {
            if(data && data.data.status == 200 && data.status == 200){
              this.closeModel('big')
              this.$message({
                message: data.data.message || '成功！',
                type: 'success'
              })
              this.$emit('getList', this.action)
            }
          })
        } else {
          return false
        }
      })

    },
    submitFormSmall (smallForm) {
      this.smallForm.action = this.action
      this.bigCLists.forEach(el => {
        if(el.big_name == this.smallForm.big_id) {
          this.smallForm.big_id = el.big_id
        }
      })
      // console.log(this.smallForm)
      this.$refs[smallForm].validate((valid) => {
        if(valid) {
          axios.post('/config/updateMenu',this.smallForm)
          .then(data => {
            if(data && data.data.status == 200 && data.status == 200){
              this.closeModel('small')
              this.$message({
                message: data.data.message || '成功！',
                type: 'success'
              })
              this.$emit('getList', this.action)
            } else {
              this.closeModel('small')
              this.$message({
                message: data.data.message || '失败！',
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })

    },
    handleCheckAllChangeBig(val) {
      this.brandForm.big_id = val ? this.bigCLists.map(el => el.big_id) : [];
      this.isIndeterminateBig = false;
    },
    handleCheckedCitiesChangeBig(value) {
      // console.log(this.brandForm.big_id)
      let checkedCount = value.length;
      this.checkAllBig = checkedCount === this.bigCLists.length;
      this.isIndeterminateBig = checkedCount > 0 && checkedCount < this.bigCLists.length;
    },
    handleCheckAllChangeSmall(val) {
      if(val) {
        this.brandForm.small_id = []
        this.brandForm.big_id.forEach(el => {
          this.smallCLists.forEach(el2 => {
            if(el != el2.big_id) {
              this.brandForm.small_id.push(el2.small_id)
            }
          })
        })
      } else {
        this.brandForm.small_id = []
      }
      // this.brandForm.small_id = val ? this.smallCLists.map(el => el.small_id) : [];
      this.isIndeterminateSmall = false;
    },
    handleCheckedCitiesChangeSmall(value) {
      // console.log(value)
      let checkedCount = value.length;
      this.checkAllSmall = checkedCount === this.smallCLists.length;
      this.isIndeterminateSmall = checkedCount > 0 && checkedCount < this.smallCLists.length;
    },
    submitFormBrand (brandForm) {
      this.brandForm.action = this.action
      this.brandForm.bigIdArr = this.brandForm.big_id.join(',')
      this.brandForm.smallIdArr = this.brandForm.small_id.join(',')
      console.log(this.brandForm)
      debugger
      // this.$refs[brandForm].validate((valid) => {
      //   if(valid) {
      //     axios.post('/config/updateMenu',this.brandForm)
      //     .then(data => {
      //       if(data && data.data.status == 200 && data.status == 200){
      //         this.closeModel('brand')
      //         this.$message({
      //           message: data.data.message || '成功！',
      //           type: 'success'
      //         })
      //         this.$emit('getList', this.action)
      //       } else {
      //         this.closeModel('brand')
      //         this.$message({
      //           message: data.data.message || '失败！',
      //           type: 'error'
      //         })
      //       }
      //     })
      //   } else {
      //     return false
      //   }
      // })

    },
  }
}
</script>

<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
.el-checkbox {
  margin-left: 0px;
  margin-right: 8px;
}
</style>



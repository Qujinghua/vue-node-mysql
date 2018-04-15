<template>
  <el-dialog :title="title" :visible="visible" @close="closeModel" width="900px">
    <el-form :model="form" ref="form" :rules="rules2" label-width="90px" v-loading="loading">
      <el-form-item label="商品名" prop="name" >
        <el-input v-model="form.name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price" >
        <el-input v-model="form.price" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="规格" prop="spec" >
        <el-input v-model="form.spec" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="颜色" prop="color" >
        <el-input v-model="form.color" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="配置" prop="configure" >
        <el-input v-model="form.configure" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="材质" prop="material" >
        <el-input v-model="form.material" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="库存" prop="stock" >
        <el-input v-model="form.stock" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="photo">
        <el-upload
          class="upload-demo"
          action="/config/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :on-success="successUpload"
          multiple
          :limit="5"
          :on-exceed="handleExceed"
          :file-list="form.fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="所属大类" prop="big_id" >
        <el-select v-model="form.big_id" placeholder="请选择" @change="bigChange" size="mini">
          <el-option
            v-for="item in bigC"
            :key="item.big_id"
            :label="item.big_name"
            :value="item.big_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属小类" prop="small_id" >
        <el-select v-model="form.small_id" placeholder="请选择" @change="smallChange" :disabled="bigAndSmall" size="mini">
          <el-option
            v-for="item in smallC2"
            :key="item.small_id"
            :label="item.small_name"
            :value="item.small_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属品牌" prop="brand_id" >
        <el-select v-model="form.brand_id" placeholder="请选择" :disabled="smallAndBrand" size="mini">
          <el-option
            v-for="item in brandC2"
            :key="item.brand_id"
            :label="item.brand_name"
            :value="item.brand_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="介绍" prop="introduce" >
        <el-input v-model="form.introduce" type="textarea" :rows="4" size="mini"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeModel" size="small">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')" size="small">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import axios from '../../../../../axios'
const defaultForm = {
  name: '',
  price: '',
  spec: '',
  color: '',
  configure: '',
  material: '',
  stock: null,
  photo: '',
  introduce: '',
  big_id: null,
  small_id: null,
  brand_id: null
}
export default {
  props: {
    visible: '',
    action: '',
    receiveForm: {},
    bigC: {},
    smallC: {},
    brandC: {}
  },
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback();
      } else {
        if (!(/^1[3|4|5|6|8|9][0-9]\d{8}$/.test(value))) {
          return callback(new Error('请输入正确的手机号码'));
        }
        callback()
      }

    };
    return {
      loading: true,
      form: {
        name: '',
        price: '',
        spec: '',
        color: '',
        configure: '',
        material: '',
        stock: null,
        photo: '',
        introduce: '',
        big_id: null,
        small_id: null,
        brand_id: null
      },
      selDepartment: [],
      
      bigAndSmall: true,
      smallAndBrand: true,
      smallC2: [],
      brandC2: [],
      rules2: {
        name: [
          { required: true, message:'请输入姓名', trigger: 'blur' }
        ],
        phone: [
          { validator:checkPhone, trigger: 'blur' }
        ],
        email: [
          // { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        department: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible (now) {
      if(now && this.action === 'edit') {
        this.form = {...this.receiveForm}
        if(this.form.isSuperAdmin) {
          this.form.isSuperAdmin = true
        } else {
          this.form.isSuperAdmin = false
        }
      }
    }
  },
  computed: {
    title () {
      return this.action == 'add' ? '新增商品' : '编辑商品'
    },
  },
  mounted () {
    this.getDepartment()
  },
  methods: {
    closeModel () {
      this.resetForm()
      this.$emit('update:visible', false)
    },
    resetForm() {
      this.form = {...defaultForm}
    },
    getDepartment () {
      axios.get('/config/getDepartment')
      .then(data => {
        if(data.status==200){
          this.selDepartment = []
          data.data.forEach(el => {
            this.selDepartment.push(el.name)
          })
        }
        this.loading = false
      })
      .catch(error => {
        console.log(error)
      })
    },
    // 上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
      console.log(this.fileList);
      axios.post('/config/deleteFile',{file: file.response.photo})
      .then(data => {
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
    successUpload(response, file, fileList) {
      console.log(response)
      console.log(file)
      console.log(fileList)
      let photoArr = []
      photoArr = fileList.map(el => el.url)
      this.form.photo = photoArr.join(',')
    },
    bigChange (val) {
      this.bigAndSmall = false
      this.smallC2 = this.smallC.filter(el => el.big_id == val)
    },
    smallChange (val) {
      this.smallAndBrand = false
      this.brandC2 = this.brandC
      this.brandC2 = this.brandC.filter(el => {
        let numArr = el.small_id.split(',')
        numArr.forEach(function(data,index,arr){  
          numArr.push(+data);  
        }); 
        return numArr.indexOf(val)!=-1
      })
    },
    submitForm (form) {
      this.form.action = this.action
      console.log(this.form)
      // this.$refs[form].validate((valid) => {
      //   if(valid) {
      //     axios.post('/config/updateUser',this.form)
      //     .then(data => {
      //       if(data && data.data.status == 200 && data.status == 200){
      //         this.closeModel()
      //         this.$message({
      //           message: data.data.message,
      //           type: 'success'
      //         })
      //         this.$emit('getList', this.action)
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
</style>



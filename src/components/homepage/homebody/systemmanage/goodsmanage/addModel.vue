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
          :file-list="fileList">
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
      <el-button @click="$emit('update:visible', false)" size="small">取 消</el-button>
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
  photoName: '',
  photoPath: '',
  photoUrl: '',
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
    brandC: {},
    editFile: {}
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
      loading: false,
      form: {
        name: '',
        price: '',
        spec: '',
        color: '',
        configure: '',
        material: '',
        stock: null,
        photoName: '',
        photoPath: '',
        photoUrl: '',
        introduce: '',
        big_id: null,
        small_id: null,
        brand_id: null
      },
      selDepartment: [],
      fileList: [],
      bigAndSmall: true,
      smallAndBrand: true,
      smallC2: [],
      brandC2: [],
      rules2: {
        name: [
          { required: true, message:'请输入名称', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    visible (now) {
      if(now && this.action === 'edit') {
        this.fileList = this.receiveForm.fileLists
        this.form = {...this.receiveForm}
      }
    }
  },
  computed: {
    title () {
      return this.action == 'add' ? '新增商品' : '编辑商品'

    },
  },
  mounted () {

  },
  methods: {
    closeModel () {
      if(this.action == "add") {
        if(this.form.photoPath!=''){
          // console.log(this.form.photoPath.split(','))
          this.form.photoPath.split(',').forEach(el => {
            axios.post('/config/deleteFile',{file: el})
            .then(data => {
              console.log(data)
            })
          })
        }
      }

      this.resetForm()
      this.$emit('update:visible', false)
    },
    resetForm() {
      this.fileList = []
      this.form = {...defaultForm}
    },
    // 上传图片
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // console.log(this.fileList);
      if(this.action == 'add') {
        axios.post('/config/deleteFile',{file: file.response.photo})
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.log(error)
        })
      } else if(this.action == 'edit' && this.fileList != []) {
        // this.fileList.forEach(el => {
          // console.log(el)
          axios.post('/config/deleteFile',{file: file.path})
          .then(data => {
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          })
        // })
      }

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
      // console.log(response)
      // console.log(file)
      // console.log(fileList)
      // console.log(fileList)
      let photoNameArr = [], photoPathArr = [], photoUrlArr = []
      photoNameArr = fileList.map(el => el.name)
      photoPathArr = fileList.map(el => el.path ? el.path : el.response.photo)
      photoUrlArr = fileList.map(el => el.url)
      this.form.photoName = photoNameArr.join(',')
      this.form.photoPath = photoPathArr.join(',')
      this.form.photoUrl = photoUrlArr.join(',')
    },
    bigChange (val) {
      this.bigAndSmall = false
      this.form.small_id = null
      this.form.brand_id = null
      this.smallC2 = this.smallC.filter(el => el.big_id == val)
    },
    smallChange (val) {
      this.smallAndBrand = false
      this.form.brand_id = null
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
      // console.log(this.form)
      this.$refs[form].validate((valid) => {
        if(valid) {
          axios.post('/config/updateGoods',this.form)
          .then(data => {
            if(data && data.data.status == 200 && data.status == 200){
              this.resetForm()
              this.$emit('update:visible', false)
              this.$message({
                message: data.data.message,
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
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
</style>



<template>
  <div>
    <el-card style="background-color: rgba(255,255,255,0.3)">
      <h3>添加商品品牌</h3>
      <br>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/admin/commodity/list">品牌管理</a></el-breadcrumb-item>
        <el-breadcrumb-item><a href="/admin/commodity/insert">添加商品</a></el-breadcrumb-item>
      </el-breadcrumb>
      <br>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="商品名称" prop="name" label-width="120px" class="item">
          <el-input style="width: 200px" type="text" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="category" label-width="120px" class="item">
          <template>
            <el-select v-model="ruleForm.category" style="width: 150px" placeholder="请选择">
              <el-option v-for ="c in categoryArr" :value="c.name"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="商品价格" prop="price" label-width="120px" class="item">
          <el-input style="width: 200px" type="number" v-model.number="ruleForm.price"></el-input>
        </el-form-item>

        <el-form-item label="商品LOGO" label-width="120px" class="item">
          <el-upload
              :action="uploadURL"
              :headers="headerObj"
              name="picFile"
              :limit="1"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccess"
              :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="类别id" prop="categoryId" label-width="120px" class="item">
          <template>
            <el-select v-model="ruleForm.categoryId" style="width: 150px" placeholder="请选择">
              <el-option v-for ="c in categoryArr" :value="c.id"></el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="品牌简介" prop="description" label-width="120px" class="item">
          <el-input
              style="width: 300px"
              type="textarea"
              placeholder="请输入内容"
              v-model="ruleForm.description"
              maxlength="1000"
              show-word-limit
          >
          </el-input>
        </el-form-item>
        <el-form-item label="关键词列表" prop="keywords" label-width="120px" class="item">
          <el-input style="width: 200px" type="text" v-model.trim="ruleForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="排序查" prop="sort" label-width="120px" class="item">
          <el-input style="width: 100px" type="text" v-model.number="ruleForm.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 130px" type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>

export default {
  data() {
    return {
      uploadURL: 'http://localhost:9080/upload',
      headerObj: {
        'Authorization': localStorage
            .getItem('jwt')
      },
      dialogImageUrl: '',
      dialogVisible: false,

      ruleForm: {
        name: '',
        category: '',
        price: '',
        logo: '',
        categoryId: '',
        description: '',
        keywords: '',
        sort: ''
      },
      categoryArr:[
        {id:1, name:'家电'},
        {id:2, name:'数码'},
        {id:3, name:'服装'},
        {id:4, name:'食品'},
        {id:5, name:'生鲜'},
        {id:6, name:'工业品'},
      ],
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        // category: [
        //   {required: true, message: '请输入商品分类', trigger: 'blur'},
        //   {min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur'}
        // ],
        // sort: [
        //   {pattern: "/^[1-9]{1}[0-9]?$/", message: '必须是0-99之间的数值', trigger: 'blur'},
        // ]
      }
    };
  },


  methods: {
    handleRemove(file, fileList) {
      /*file表示要删除的文件
      * file.response代表是文件上传成功后,服务器响应的数据(文件名)*/
      console.log(file, fileList);
      let logoName = this.ruleForm.logo;
      let url = 'http://localhost:9080/remove/' + logoName
      this.axios.create({
        headers: {
          'Authorization': localStorage
              .getItem('jwt')
        }
      }).post(url).then((response) => {
        let code = response.data.code;//Controller返回的状态码需要从data的json格式中获取code
            if (code == 20000) {
              this.$message({
                type: "success",
                message: "删除图片成功"
              })
            } else {
              this.$message({
                  type: "error",
                  message: "删除图片失败"})
            }
          }
      )
    },
    handlePictureCardPreview(file) {
      console.log("file:" + file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccess(response, file, fileList) {
      console.log("file:" + file.name)
      console.log("fileList" + fileList.name)
      console.log("文件上传成功后,图片名=" + response.data);//他所响应的不需要json格式转换
      if (response.code == 20000) {
        this.$message({
          type: "success",
          message: "添加图片成功"
        })
        let logoName = response.data;//这里的data是Controller返回的图片名称
        this.ruleForm.logo = logoName;//这里是获取到的图片名称赋值给ruleForm的logo作为赋值到sql中的url
      } else {
        this.$message.error(response.message)//这里不能写data.message
      }


    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = "http://localhost:9080/commodity/insert"
          this.axios.create({
            headers: {
              'Authorization': localStorage
                  .getItem('jwt')
            }
          }).post(url, this.ruleForm).then((response) => {//这里传
            console.log(response.data);
            if (response.data.code == 20000) {
              this.$message({
                type: "success",
                message: "添加商品成功"
              })
            } else {
              this.$message.error(response.data.message)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
/deep/ input[type='number'] {
  -moz-appearance: textfield;
}
.item .el-form-item__label {
  color: #acce8a;
}
</style>
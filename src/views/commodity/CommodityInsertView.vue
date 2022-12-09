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
        <el-form-item label="商品分类" prop="pinyin" label-width="120px" class="item">
          <el-input style="width: 200px" type="text" v-model="ruleForm.category"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="pinyin" label-width="120px" class="item">
          <el-input style="width: 200px" type="text" v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品LOGO"  label-width="120px" class="item">
          <el-upload
              action="http://localhost:9080/upload"
              name="picFile"
              headers=""
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
            <el-select style="width: 150px" placeholder="请选择">
              <el-option></el-option>
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
          <el-input style="width: 200px" type="text" v-model="ruleForm.keywords"></el-input>
        </el-form-item>
        <el-form-item label="排序查" prop="sort" label-width="120px" class="item">
          <el-input style="width: 100px" type="text" v-model="ruleForm.sort"></el-input>
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
      dialogImageUrl: '',
      dialogVisible: false,
      ruleForm: {
        name: '',
        category: '',
        price: '',
        categoryId: '',
        description: '',
        keywords: '',
        sort: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入商品名称', trigger: 'blur'},
          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        category: [
          {required: true, message: '请输入商品分类', trigger: 'blur'},
          {min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur'}
        ],
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
      this.axios.create({
        headers: {
          'Authorization': localStorage
              .getItem('jwt')
        }
      }).get("http://localhost:9080/remove?name="+file.response).then(function (response){
            alert("服务器图片删除成功!")
          }
      )
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.logo;
      this.dialogVisible = true;
    },
    handleSuccess(response,file, fileList) {
      //response = file.response
      console.log("文件上传成功后,图片名="+response);
      ruleForm.logo = response;
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
          }).post(url, this.ruleForm).then((response) => {
                console.log(response.data);
                if (response.data.code == 20000) {
                  this.$message({
                    type: "success",
                    message: "添加商品成功"
                  })
                } else {
                  this.$message.error(response.data.message)
                }
              }
          )
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
.item .el-form-item__label {
  color: #acce8a;
}
</style>
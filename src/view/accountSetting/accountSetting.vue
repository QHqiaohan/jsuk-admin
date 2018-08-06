<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      账户设置
    </el-row>

    <div class="container">

      <el-container direction="vertical">

        <div class="form-box">

          <el-form :model="managerUser" status-icon :rules="rules2" ref="managerUser" label-width="100px" class="demo-ruleForm">

            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

            <el-form-item label="昵称：" prop="nickName">
              <el-input  v-model="managerUser.nickName"></el-input>
            </el-form-item>

            <el-form-item label="用户名：" prop="userName">
              <el-input  v-model="managerUser.userName" ></el-input>
            </el-form-item>

            <el-form-item label="旧密码：" prop="password">
              <el-input type="password" v-model="managerUser.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="新密码：" prop="newPassword">
              <el-input type="password" v-model="managerUser.newPassword" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认密码：" prop="checkPass">
              <el-input type="password" v-model="managerUser.checkPass" auto-complete="off"></el-input>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="accountInfoSetting('managerUser','managerUser.newPassword')">提交</el-button>
              <el-button type="primary" @click="resetForm('managerUser')">重置</el-button>
            </el-form-item>

          </el-form>

        </div>
      </el-container>

    </div>


  </div>


</template>

<script>
  export default {

    mounted() {
      this.$nextTick(() => {
        this.$axios.post('/managerUser/getAdmin')
          .then(({data:{data}}) => {
            this.managerUser=data;
          });

      });
    },


    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.managerUser.checkPass !== '') {
            this.$refs.managerUser.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.managerUser.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        managerUser: {
          newPassword: '',
          checkPass: '',
          dialogImageUrl: '',
          dialogVisible: false
        },
        rules2: {
          newPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      accountInfoSetting(managerUser,newPassword) {
        this.$axios.post('/managerUser/accountInfoSetting', this.$axios.form(this.managerUser,newPassword))
          .then(() => {
            this.$message.success('编辑成功！');
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      //头像上传开始
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
      //头像上传结束

    }
  }
</script>

<style>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>

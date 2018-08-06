<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      编辑成员
    </el-row>

    <div class="container">

      <el-container direction="vertical">

      <div class="form-box">


        <el-form :model="managerUser" status-icon :rules="rules2" ref="managerUser" label-width="100px" class="demo-ruleForm">

          <el-form-item label="成员名称：" prop="nickName">
            <el-input  v-model="managerUser.nickName"></el-input>
          </el-form-item>

          <el-form-item label="成员姓名：" prop="name">
            <el-input  v-model="managerUser.name"></el-input>
          </el-form-item>

          <el-form-item label="设置账号：" prop="userName">
            <el-input  v-model="managerUser.userName" ></el-input>
          </el-form-item>

          <el-form-item label="密码：" prop="password">
            <el-input type="password" v-model="managerUser.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码：" prop="checkPass">
            <el-input type="password" v-model="managerUser.checkPass" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="备注信息：" prop="desc">
            <el-input type="textarea" placeholder="请输入内容" rows="5" v-model="managerUser.desc" ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="editManagerUser('managerUser')">提交</el-button>
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

        //alert(this.$route.query.managerUserId);
        this.$axios.post('/managerUser/selectManagerUserById', this.$axios.form({managerUserId: this.$route.query.managerUserId}))
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
        } else if (value !== this.managerUser.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        managerUser: {
          password: '',
          checkPass: ''
        },
        rules2: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      editManagerUser(managerUser) {
        this.$axios.post('/managerUser/editManagerUser', this.$axios.form(this.managerUser))
          .then(() => {
            this.$message.success('编辑成功！');
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }

    }
  }
</script>

<style>

</style>

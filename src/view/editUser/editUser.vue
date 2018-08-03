<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      用户编辑
    </el-row>

    <div class="container">

      <el-container direction="vertical">

        <div class="form-box">


          <el-form :model="user" status-icon :rules="rules2" ref="user" label-width="100px" class="demo-ruleForm">

            <el-form-item label="用户昵称：" prop="nickName">
              <el-input  v-model="user.nickName"></el-input>
            </el-form-item>

            <el-form-item label="手机：" prop="phone">
              <el-input  v-model="user.phone"></el-input>
            </el-form-item>

            <el-form-item label="密码：" prop="password">
              <el-input type="password" v-model="user.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="checkPass">
              <el-input type="password" v-model="user.checkPass" auto-complete="off"></el-input>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="editUser('user')">提交</el-button>
              <el-button type="primary" @click="resetForm('user')">重置</el-button>
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
        this.$axios.post('/user/getUserInfoById', this.$axios.form({userId: this.$route.query.userId}))
          .then(({data:{data}}) => {
            this.user=data;
          });

      });
    },

    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.user.checkPass !== '') {
            this.$refs.user.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        user: {
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
      editUser(user) {
        this.$axios.post('/user/editUser', this.$axios.form(this.user))
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

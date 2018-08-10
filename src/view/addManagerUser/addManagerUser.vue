<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      添加成员
    </el-row>

    <div class="container">
      <div class="form-box">

          <el-form :model="managerUser" status-icon :rules="rules2" ref="managerUser" label-width="100px" class="demo-ruleForm">

          <el-form-item label="成员名称：" prop="nickName">
            <el-input  v-model="managerUser.nickName"></el-input>
          </el-form-item>

          <el-form-item label="成员姓名：" prop="name">
            <el-input  v-model="managerUser.name"></el-input>
          </el-form-item>

          <el-form-item label="用户名：" prop="userName">
            <el-input  v-model="managerUser.userName" ></el-input>
          </el-form-item>

            <el-form-item label="手机号码：" prop="phone">
              <el-input  v-model="managerUser.phone" ></el-input>
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
              <el-button type="primary" @click="addManagerUser('managerUser')">提交</el-button>
              <el-button type="primary" @click="resetForm('managerUser')">重置</el-button>
            </el-form-item>

        </el-form>

      </div>
    </div>
  </div>


</template>

<script>
  export default {
    data() {

      var validatePass0 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号不能为空'));
        } else {
          callback();
        }
      };

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
          phone:'',
          password: '',
          checkPass: ''
        },

        rules2: {
          phone: [
            { validator: validatePass0, trigger: 'blur' }
          ],
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
      addManagerUser(managerUser) {
        this.$axios.post('/managerUser/addManagerUser', this.$axios.form(this.managerUser))
          .then(() => {
            this.$message.success('添加成功！');
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

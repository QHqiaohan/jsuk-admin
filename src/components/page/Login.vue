<template>
  <div class="login-wrap">
    <div class="ms-title">后台管理系统</div>
    <div class="ms-login">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.phone" placeholder="phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="ruleForm.password"
                    @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择活动区域" class="loginSelect">
            <el-option label="平台管理员" value="adm"></el-option>
            <el-option label="商家管理员" value="shp"></el-option>
          </el-select>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>-->
      </el-form>
    </div>
  </div>
</template>

<script>
  import md5 from 'md5';

  export default {

    data: function () {
      return {
        ruleForm: {
          phone: '18780154101',
          password: '123456',
          type: 'shp'
        },
        rules: {
          phone: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          type: [
            {required: true, message: '请选择管理员类型', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const loginObj = {};
            Object.assign(loginObj, this.ruleForm);
            loginObj.password = md5(this.ruleForm.password);
            this.$axios.post('/adm/login', this.$qs.stringify(loginObj))
              .then(res => {
                if (res.status === 200) {
                  if (res.data.code === 200) {
                    localStorage.setItem('token', res.data.data.token);
                    this.$session.load().then(() => {
                      this.$router.push('/');
                    });

                  }
                }
              })
//                            .then(({status,data}) => {
//                            console.log(status)
//                            console.log(data)
//                                const token = data && data.data && data.data.token;
//                                if(token){
//                                    localStorage.setItem('access-token',token);
//                                    this.$axios.defaults.headers.common['access-token'] = token;
//                                }
//                                // this.$auth.load(()=>{
//                                this.$router.push('/')
//                                // })
//                            }).catch(() =>{
//                            setTimeout(()=>{this.loading = false},1000);
//                        });

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  .login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;

  }

  .ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 190px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
  }

  .login-btn {
    text-align: center;
  }

  .login-btn button {
    width: 100%;
    height: 36px;
  }

  .loginSelect {
    width: 100%;
    height: 36px;
  }
</style>

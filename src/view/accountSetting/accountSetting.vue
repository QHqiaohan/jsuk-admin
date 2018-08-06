<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      账户设置
    </el-row>

    <div class="container">

      <el-container direction="vertical">

        <div class="form-box">

          <el-form :model="managerUser" status-icon :rules="rules2" ref="managerUser" label-width="100px" class="demo-ruleForm">

            <!--上传头像-->
            <div class="bannerCont" style="margin-left:200px;">

                  <img :src="managerUser.headImg" class="img-my" style="width:100px;height:100px;"/>
              <div class="after btnBox">
                <p class="subFile">
                  <input type="file" name="file" @change="upload()">
                </p><br>
                <!--<el-button type="primary" >上传头像</el-button>-->
              </div>
            </div>
<br>
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
           // this.headPicture=this.managerUser.headImg;
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
          headPicture:''
        },
        rules2: {
          newPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },

        headPicture:''
      };
    },
    methods: {

      //上传图片到服务器
      upload(e) {
        // let evt = window.event || arguments.callee.caller.arguments[0]; // 获取event对象
        // console.log(evt)
        let file = e.target.files[0];
        console.log(file)
        let param = new FormData(); //创建form对象
        param.append('file', file, file.name);//通过append向form对象添加数据
        this.$axios.post('/upload/imgToOSS', param)
          .then(res => {
            if (res.data.code === 200) {
              console.log(res.data.data)
              this.managerUser.headImg=res.data.data
             // this.managerUser.headImg=res.data.data
             /* let banner = {
                image: res.data.data,
                bannerLocation: data.bannerLocation
              }*/
             // this.imgAddFun(banner);
            }
          });
      },

      accountInfoSetting(managerUser,newPassword) {
        this.$axios.post('/managerUser/accountInfoSetting', this.$axios.form(this.managerUser,newPassword))
          .then(() => {
            this.$message.success('编辑成功！');
          })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },


    }
  }
</script>

<style>



</style>

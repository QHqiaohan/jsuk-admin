<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      乡村旅游编辑
    </el-row>

    <div class="container">
      <div class="form-box">

        <el-form :model="activity"  ref="activity" label-width="100px" class="demo-ruleForm">

          <el-form-item label=" 专题选择：" >
              <el-select v-model="activity.modularId" placeholder="请选择">
                <el-option
                  v-for="modular in modularPortalList"
                  :key="modular.id"
                  :label="modular.name"
                  :value="modular.id">
                </el-option>
              </el-select>
          </el-form-item>

          <el-form-item label="门店地址：" prop="portalAddress">
            <el-input  v-model="activity.portalAddress"></el-input>
          </el-form-item>

          <el-form-item label="联系人：" prop="name">
            <el-input  v-model="activity.name" ></el-input>
          </el-form-item>

          <el-form-item label="手机号码：" prop="phone">
            <el-input  v-model="activity.phone" placeholder="请输入联系人手机号码"></el-input>
          </el-form-item>

          <el-form-item label="活动价格：" prop="price">
            <el-input  v-model="activity.price" placeholder="请输入xxx元/人"></el-input>
          </el-form-item>

          <el-form-item label="活动定金：" prop="fixedPrice">
            <el-input  v-model="activity.fixedPrice" placeholder="请输入xxx元"></el-input>
          </el-form-item>


          <el-form-item label="上传门店照片：" >

<!--            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>-->
            <div class="bannerBox" v-for="item in items">
              <p class="title ">{{item.location}}</p>
              <div class="bannerCont">
                <ul class="after">
                  <li v-for="banner in item.banners">
                    <img :src="banner.image" class="img-my"/>
                    <p @click="delectBannerFun(banner)">
                      X
                    </p>
                  </li>
                </ul>
                <div class="after btnBox">
                  <p class="subFile" v-if="item.banners.length<=3">
                    <input type="file" @change="upload(item)">
                    上传
                  </p>
                </div>
              </div>
            </div>

          </el-form-item>



          <el-form-item label="文字介绍：" prop="content">
            <el-input type="textarea" placeholder="请输入简单介绍" rows="5" v-model="activity.content" ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addVillageActivity('activity')">确定</el-button>
          </el-form-item>

        </el-form>

      </div>
    </div>
  </div>


</template>

<script>
  export default {

    mounted() {
      this.$nextTick(() => {

        //查询乡村旅游子模块
        this.$axios.post('/activity/selectVillageChildModular')
          .then(({data:[data]}) => {
            this.modularPortalList=data;
          });

      });
    },

    data() {


      return {
        activity:{},
        dialogImageUrl: '',
        dialogVisible: false
      };

    },
    methods: {
      addVillageActivity(activity) {
        this.$axios.post('/activity/addVillageActivity', this.$axios.form(this.activity))
          .then(() => {
            this.$message.success('发布成功！');
          })
      },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      upload(data) {
        console.log(data)
        let file = event.target.files[0];
        console.log(file)
        let param = new FormData(); //创建form对象
        param.append('file', file, file.name);//通过append向form对象添加数据
//            param.append('chunk','0');//添加form表单中其他数据
        this.$axios.post('/upload/imgToOSS', param)
          .then(res => {
            if (res.data.code === 200) {
              let banner = {
                image: res.data.data,
                bannerLocation: data.bannerLocation
              }
              this.imgAddFun(banner);
            }
          });
      },


    }
  }
</script>

<style>

</style>

<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      乡村旅游编辑
    </el-row>

    <div class="container">
      <div class="form-box">

        <el-form :model="activity"  ref="activity" label-width="150px" class="demo-ruleForm">

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

         <!-- <el-form-item label="门店地址：" prop="address">
            <el-input  v-model="activity.address"></el-input>
          </el-form-item>-->

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
            <div class="bannerBox" >
              <div class="bannerCont">
                <ul class="after">
                  <li v-for="(picture,index) in images" style="margin:8px;float:left;">
                    <img :src="picture" class="img-my" style="width:100px;height:100px;"/>
                    <p  @click="delectBannerFun(index)">
                      X
                    </p>
                  </li>
                </ul>
                <div class="after btnBox">
                  <p class="subFile" v-if="images.length<=3">
                    <input type="file" @change="upload(picture)">
                    上传
                  </p>
                </div>
              </div>
            </div>
          </el-form-item>


          <el-form-item label="文字介绍：" prop="content">
            <el-input type="textarea" placeholder="请输入简单介绍" rows="5" v-model="activity.content" ></el-input>
          </el-form-item>

          <el-form-item label="是否推荐为热门：">
            <template>
              <div>
                <el-radio v-model="activity.isRecommend" label="1" border>是</el-radio>
                <el-radio v-model="activity.isRecommend" label="0" border>否</el-radio>
              </div>
            </template>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addVillageActivity('activity','images')">确定</el-button>
          </el-form-item>


        </el-form>

      </div>
    </div>
  </div>


</template>

<script>
  export default {

    mounted() {
      let images=new Array();
      this.$nextTick(() => {
        //查询乡村旅游子模块
        this.$axios.post('/activity/selectVillageChildModular')
          .then(({data:{data}}) => {
            this.modularPortalList=data;
          });

      });
    },

    data() {

      return {
        modularPortalList:[],
        activity:{},
        images:[],
        image:'',
        picture:'',
        activityImg:'',
        index:''
      };

    },

    methods: {
      addVillageActivity(activity,images) {
        let activityImg='';
        for(let i=0;i<this.images.length;i++){
          if(i==this.images.length-1){
            this.activityImg+=this.images[i];
          }else{
            this.activityImg+=this.images[i]+',';
          }
        }
        this.activity.images=this.activityImg;
        this.$axios.post('/activity/addVillageActivity', this.$axios.form(this.activity))
          .then(() => {
            this.$message.success('发布成功！');
          })
      },


      //上传图片到服务器
      upload(data) {
        // let evt = window.event || arguments.callee.caller.arguments[0]; // 获取event对象
        // console.log(evt)
        console.log(data)
        let file = event.target.files[0];
        console.log(file)
        let param = new FormData(); //创建form对象
        param.append('file', file, file.name);//通过append向form对象添加数据
        this.$axios.post('/upload/imgToOSS', param)
          .then(res => {
            if (res.data.code === 200) {
              console.log(res.data.data)
              let image=res.data.data
              this.images.push(image);
            }
          });
      },

      delectBannerFun(index) {
        this.images.splice(index,1);
      }

    }
  }
</script>

<style>

</style>

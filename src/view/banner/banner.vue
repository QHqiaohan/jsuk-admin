<template>
  <div>
    <div>首页banner</div>
    <div class="bannerBox">
      <p class="title">管理banner图片</p>
      <div class="bannerCont">
        <ul class="after">
          <li v-for="item in items" >
            <img :src="item.img" class="img-my"/>
            <p @click="delectBannerFun(item)">
              X
            </p>
          </li>
        </ul>
        <div class="after btnBox">
          <!--<p class="delect">-->
            <!--删除-->
          <!--</p>-->
          <p class="subFile" v-if="items.length<=3">
            <input type="file" @change="upload">
            上传
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: {},
        categories: [],
        brands: [],
        count: {},
        items: [{img: 'https://jsuke.oss-cn-shenzhen.aliyuncs.com/image/1528950854236501094.png'},
          {img: 'https://jsuke.oss-cn-shenzhen.aliyuncs.com/image/1528950854236501094.png'},




          {img: 'https://jsuke.oss-cn-shenzhen.aliyuncs.com/image/1528950854236501094.png'}],
      }
    },
    mounted (){
//      this.moreSpecialInit()
    },
    methods: {
      moreSpecialInit(){
        this.$axios.post('/goodsEvaluate/list')
          .then(res => {
            if (res.status === 200) {
              console.log('res.data', res.data);
              if(res.data.code===200){

              }
            }
          })
      },

//      /**
//       * 上传图片
//       * @param
//       */
//
//      upload(data){
//        let file = event.target.files[0];
//        let param = new FormData(); //创建form对象
//        param.append('file',file,file.name);//通过append向form对象添加数据
////            param.append('chunk','0');//添加form表单中其他数据
//        this.$http.post('/upload/imgToOSS',param)
//          .then(res=>{
//            if(res.data.code===200){
////              let arr=[];
////              arr=data.imgArr;
////              arr.push(res.data.data)
////              this.$nextTick(function() {
////                this.$set(data,'imgArr',arr)
////              })
//
//            }
//          })
//      },
//      /**
//       * 删除图片
//       * @param img 图片路径
//       */
//      deleteImgFun(data,img){
////        let arrImg=this.imgArr;
//        let loop = data.imgArr.length;
//        for(let i=0;i<loop;i++){
//          if(img === data.imgArr[i]){
//            console.log(i);
//            data.imgArr.splice(i,1);
//            if(i>=1){
//              i = i-1;
//              console.log(i);
//              loop=loop-1
//            }
//          }
//        }
//      },

      delectBannerFun(data){
        console.log(data)

      }
    },
  }
</script>

<style lang="scss">

  .bannerBox{
    .title{
      font-size: 16px;
      line-height: 50px;
    }
    .bannerCont{
      ul{
        /*display: flex;*/
        /*display: -webkit-flex;*/
        li{
          width: 180px;
          max-height: 180px;
          float: left;
          margin-bottom: 30px;
          margin-right: 15px;
          margin-left: 15px;
          position: relative;
          p{
            width: 30px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            color: #ffffff;
            font-size: 20px;
            background-color: red;
            position: absolute;
            right: -15px;
            top: -15px;
            border-radius: 50%;
            cursor: pointer;
          }
        }
      }
      .btnBox{
        width: 100%;

        padding: 0 15px;
        p{
          display: inline-block;
          vertical-align: middle;
          margin-right: 15px;
          font-size: 14px;
          padding: 5px 20px;
          border-radius: 15px;
          color: #ffffff;
          cursor: pointer;
        }
        .delect{
          background-color: #dd6161;
        }
        .subFile{
          background-color: #13ce66;
          position: relative;
          overflow: hidden;
          input{
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            opacity: 0;
            cursor: pointer;
          }
        }
      }

    }

  }

</style>
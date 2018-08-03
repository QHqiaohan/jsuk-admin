<template>
  <div>

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
        items: [],
      }
    },
    mounted() {
      this.moreSpecialInit()
    },
    methods: {
      moreSpecialInit() {
        this.$axios.get('/banner')
          .then(res => {
            if (res.status === 200) {
              console.log('res.data', res.data);
              if (res.data.code === 200) {
                this.items = res.data.data;
                console.log('this.items', this.items);
              }
            }
          })
      },

//      /**
//       * 上传图片
//       * @param
//       */
//
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
              // let arr=[];
              // arr=data.banners;
              // arr.push(res.data.data);
              // console.log(arr)
              // this.$nextTick(function() {
              //   this.$set(data,'banners',arr)
              // })
              let banner = {
                image: res.data.data,
                bannerLocation: data.bannerLocation
              }
              this.imgAddFun(banner);
            }
          });

      },
      //传图片路径去服务器
      imgAddFun(param) {
        this.$axios.post('/banner/add', param)
          .then(() => {
            this.$message.success('添加成功');
            this.moreSpecialInit();
          });
      },

      delectBannerFun(banner) {
        this.$confirm(`确定要删除?`)
          .then(e => {
            this.$axios.post('/banner/remove', banner)
              .then(() => {
                this.$message.success('删除成功');
                this.moreSpecialInit();
              });
          })
          .catch(e => {
          });
      }
    },
  }
</script>

<style lang="scss">

  .bannerBox {
    margin-bottom: 20px;

  .title {
    font-size: 16px;
    line-height: 50px;
  }

  .bannerCont {

  ul {

  /*display: flex;*/
  /*display: -webkit-flex;*/
  li {
    width: 180px;
    max-height: 180px;
    float: left;
    margin-bottom: 30px;
    margin-right: 15px;
    margin-left: 15px;
    position: relative;

  p {
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
  .btnBox {
    width: 100%;

    padding: 0 15px;

  p {
    display: inline-block;
    vertical-align: middle;
    margin-right: 15px;
    font-size: 14px;
    padding: 5px 20px;
    border-radius: 15px;
    color: #ffffff;
    cursor: pointer;
  }

  .delect {
    background-color: #dd6161;
  }

  .subFile {
    background-color: #13ce66;
    position: relative;
    overflow: hidden;
    margin: 20px;

  input {
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
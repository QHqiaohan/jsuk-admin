<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      商品分类
    </el-row>
    <el-container direction="vertical">
      <div class="pageBox classIficatBox">
        <div class="classIficatCont after">
          <div class="classIficatLeft after">
            <ul>
              <li v-for="(item,$index) in classIfiData" class="base-item" :class="{'active':item.classFlag==true}"
                  @click="oneTitcdFun(item,item.id)">
                <span class="item-title">{{item.name}}</span>
                <span class="edit-box">
                  <el-button type="text" @click="$refs.ae.edit(item)">修改</el-button>
                  <el-button type="text" @click="del(item)">删除</el-button>
                </span>
              </li>
              <li>
                <el-button type="success" @click="$refs.ae.add(0)">添加</el-button>
              </li>
            </ul>
          </div>

          <div class="classIficatRight">
            <div class="classIficatListBox" v-for="item in this.classIfiOneData">
              <p>
                {{item.name}}
                <span class="two-item-edit" style="float: right;margin-top: -5px;">
                  <el-button type="primary" @click="$refs.ae.edit(item)">修改</el-button>
                  <el-button type="danger" @click="del(item)">删除</el-button>
                </span>
              </p>
              <ul class="after">

                <li v-for="itemTwo in item.childMenus" class="image-item">
                  <div>
                    <img :src="itemTwo.icon" alt="">
                  </div>
                  <p class="className">
                    {{itemTwo.name}}
                  </p>
                  <span class="edit-item">
                    <el-button type="primary" @click="$refs.ae.edit(itemTwo)">修改</el-button>
                    <el-button type="danger" @click="del(itemTwo)">删除</el-button>
                  </span>
                </li>
                <li class="image-item image-add-item">
                  <el-button type="success" @click="$refs.ae.add(item.id)">添加</el-button>
                </li>
              </ul>

            </div>
            <div class="after btnBox">
              <div class="classIficatListBox">
                <p style="border: none ;text-align: center">
                  <el-button @click="$refs.ae.add(lv1Item.id)" type="success">添加</el-button>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </el-container>

    <category-ae @success="classInit" ref="ae"/>

  </div>


</template>

<script>

  import CategoryAe from "./CategoryAe";

  export default {

    components: {
      CategoryAe
    },

    data() {
      return {
        classFlag: false,//class标记
        classIfiBanner: [],//banner
        classIfiData: [],//列表
        classIfiOneData: [
          {
            childMenus: []
          }
        ],//一级菜单
        classIfiTwoData: [],//二级级菜单
        lv1Item: null
      }
    },
    mounted() {
      this.classInit()
    },
    methods: {
      /**
       * 页面初始化函数
       */
      classInit() {
        this.$axios.get('/goodsCategory/getAllCategory')
          .then(res => {
            if (res.status === 200) {
              if (res.data.code === 200) {
                this.classIfiBanner = res.data.data.banner;
                this.classIfiData = res.data.data.goodsCategory;
                this.lv1Item = this.classIfiData[0];
                this.$set(this.classIfiData[0], 'classFlag', true)
                this.classCommFun(this.classIfiData[0].id)
              }
            }
          })
      },
      /**
       * 点击菜单查询
       * @param item
       * @param id
       */
      oneTitcdFun(item, id) {
        this.lv1Item = item;
        this.$nextTick(() => {
          this.classIfiData.forEach((item) => {
            this.$set(item, 'classFlag', false)
          });
          this.$set(item, 'classFlag', true)
        });
        this.classCommFun(id)

      },

      del(item) {
        this.$confirm(`确认要删除${item.name},所有子项都会被删除?`)
          .then(() => {
             this.$axios.delete('goodsCategory',{params:{id:item.id}})
               .then(()=>{
                 this.$message.success('删除成功');
                 this.classInit();
               })
          })
          .catch(() => {
          })
      },

      /**
       * 根据id查询分类下所有小分类
       */
      classCommFun(id) {
        for (let i = 0; i < this.classIfiData.length; i++) {
          if (this.classIfiData[i].id === id) {
            this.classIfiOneData = this.classIfiData[i].childMenus
          }
        }
      }
    },
    computed: {}
  }


</script>

<style lang="scss">
  .classIficatBox {
    background-color: #f7f7f7;
    /*padding: 0.9rem 0 0.96rem;*/
    padding: 3rem 0 0.96rem 0;
    /*position: fixed;*/
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
    .classIficatBanner {
      /*height: 3rem;*/
      /*position: fixed;*/
      left: 0;
      right: 0;
      top: 0;
      z-index: 5;
      .mint-swipe-indicator {
        background-color: #c0d2f7;
        opacity: 1;
      }
      .mint-swipe-indicator.is-active {
        background: #ff6f20;
        width: 10px;
        height: 10px;
      }

      .img-my {
        width: 100%;
      }
      .indexBox .indexBanner .mint-swipe-indicator.is-active {
        margin-top: -1px;
      }
      .mint-swipe-indicators {
        bottom: -0.2rem;
      }
    }
    .classIficatCont {
      padding: 0.2rem 0.2rem 0.2rem 0;
      display: flex;
      flex: 1;
      /*position: relative;*/
      .classIficatLeft {
        /*position: fixed;*/
        left: 0;
        /*top: 3.2rem;*/
        /*bottom: 1.1rem;*/
        width: 200px;
        flex: none;
        height: auto;
        background-color: #ffffff;
        /*float: left;*/
        ul {
          li {
            text-align: center;
            font-size: 0.26rem;
            color: #2b2b2b;
            line-height: 35px;
            border-right: 1px solid #eaeaea;
            border-bottom: 1px solid #eaeaea;
            cursor: pointer;
            position: relative;
            &:hover {
              background: #eaeaea;
            }
            .edit-box {
              position: absolute;
              top: 0;
              right: 5px;
              display: none;
            }
          }
          li:hover .edit-box {
            display: block;
          }
          li:first-child {
            border-top: 1px solid #eaeaea;
          }
          .active {
            color: #de3031;
            background-color: #f7f7f7;
            border-right: 1px solid transparent;
          }
        }
      }
      /*.classIficatLeft::-webkit-scrollbar {*/
        /*display: none;*/
      /*}*/
      .image-item {
        padding: 5px;
        position: relative;
        img {
          width: 100%;
        }
        .edit-item {
          position: absolute;
          top: 0;
          right: 5px;
          display: none;
        }
        &:hover .edit-item {
          display: block;
        }
      }
      .image-add-item {
        height: 50px;
        text-align: center;
        line-height: 50px;
        &:hover {
          background: #eaeaea;
        }
      }

      //隐藏滚动条！
      .classIficatRight {
        padding-left: 15px;
        /*flex: 1;*/
        /*overflow-y: scroll;*/

        .two-item-edit {
          display: none;
        }

        .classIficatListBox:hover .two-item-edit {
          display: block;
        }
        .classIficatListBox {
          margin-bottom: 10px;
          p {
            font-size: 16px;
            color: #2b2b2b;
            padding-left: 15px;
            line-height:40px;
            border-bottom: 1px solid #cccccc;
          }
          ul {
            padding: 30px 010px 0;
            /*background-color: #ffffff;*/
            li {
              width: 200px;
              margin-bottom: 20px;
              float: left;
              a {
                width: 100%;
                height: 100%;
                display: block;
                div {
                  width: 180px;
                  height: 180px;
                  margin: auto;
                  display: -webkit-flex;
                  display: flex;
                  background-color: #fff;
                  img {
                    margin: auto;
                  }
                }

              }
            }
          }
          .className {
            color: #2b2b2b;
            font-size: 0.12rem;
            text-align: center;
            border: none;
          }
        }
      }
      .btnBox{
        width: 100%;
        clear: both;
        .classIficatListBox{
          background-color: #ffffff;
          p{
            text-align: center;

          }
        }
      }
    }

  }
</style>

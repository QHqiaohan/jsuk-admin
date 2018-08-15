<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs && auth(item)">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs" v-if="auth(subItem)" :key="i" :index="subItem.index">
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-if="!item.subs && auth(item)">
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import bus from "../common/bus";
  import {isInArr, arrIsInArr, arrUnique} from "../../util/arr";

  export default {
    data() {
      return {
        collapse: false,
        items: [{
          icon: "el-icon-setting",
          index: "1",
          title: "系统首页",
          subs: [{
            index: "dashboard",
            title: "系统首页",
            role: 'ADMIN'
          }, {
            index: "accountSetting",
            title: "个人信息"
          }, {
            index: "members",
            title: "会员等级管理",
            role: 'ADMIN'
          }]
        }, {
          icon: "el-icon-setting",
          index: "2",
          title: "商品管理",
          subs: [{
            index: "commodityList",
            title: "商品列表",
            role: ['SHOP', 'ADMIN']
          }, {
            index: "goodsCategory",
            title: "商品分类",
            role: ['ADMIN']
          }, {
            index: "commodityEvaluate",
            title: "商品评价",
            role: 'SHOP'
          }]
        }, {
          icon: "el-icon-setting",
          index: "3",
          title: "订单管理",
          subs: [{
            index: "orderList",
            title: "订单列表",
            role: ['SHOP', 'ADMIN']
          }, {
            //   index: "orderDistribution",
            //   title: "同城配送订单"
            // }, {
            //   index: "confirmReceipt",
            //   title: "确认收货"
            // }, {
            index: "orderSetting",
            title: "订单设置",
            role: 'ADMIN'
          }, {
            index: "returnGoods",
            title: "退货申请处理",
            role: ['SHOP', 'ADMIN']
          }, {
            index: "refund",
            title: "退款申请处理",
            role: ['SHOP', 'ADMIN']
            // }, {
            //   index: "returnGoodsReason",
            //   title: "退货原因处理"
            // }, {
            //   index: "express",
            //   title: "快递管理"
            // }, {
            //   index: "deliverGoods",
            //   title: "发货点信息管理"
          }]
          // }, {
          //   icon: "el-icon-setting",
          //   index: "4",
          //   title: "库存",
          //   subs: [{
          //     index: "warehousing",
          //     title: "商品入库"
          //   }, {
          //     index: "delivery",
          //     title: "商品出库"
          //   }]
        }, {
          icon: "el-icon-setting",
          index: "5",
          title: "用户管理",
          subs: [{
            index: "userList",
            title: "用户列表",
            role: 'ADMIN'
          },{
            index: "feedBackList",
            title: "意见反馈",
            role: 'ADMIN'
          }]
        }, {
          icon: "el-icon-setting",
          index: "6",
          title: "APP促销管理",
          subs: [{
            index: "secondKillList",
            title: "秒杀活动列表",
            role: ['ADMIN', 'SHOP']
          }, {
            index: "secondKillTime",
            title: "时间段列表",
            role: 'ADMIN'
          }, {
            index: "integralEdit",
            title: "积分设置",
            role: 'ADMIN'
            // }, {
            //   index: "couponList",
            //   title: "优惠卷列表"
            // }, {
            //   index: "couponAdd",
            //   title: "优惠卷添加"
            // }, {
            // index: "recommendCommodities",
            // title: "首页推荐商品设置",
            // role:'ADMIN'
          },
            {
              index: "secondaryMarket",
              title: "二手市场",
              role: 'ADMIN'
            },
            {
              index: "villageActivity",
              title: "乡村旅游",
              role: 'ADMIN'
            }
          ]
        }, {
          icon: "el-icon-setting",
          index: "7",
          title: "APP管理",
          subs: [{
            index: "special",
            title: "APP专题列表",
            role: 'ADMIN'
          }, {
            index: "banner",
            title: "APP banner图片设置",
            role: 'ADMIN'
          },]
        }, {
          icon: "el-icon-setting",
          index: "8",
          title: "商户管理",
          subs: [{
            index: "business",
            title: "商户列表",
            role: 'ADMIN'
          }]
        }, {
          icon: "el-icon-setting",
          index: "9",
          title: "配送管理",
          subs: [{
            index: "distributionPersonnel",
            title: "用户列表",
          }]
        }, {
          icon: "el-icon-setting",
          index: "10",
          title: "财务管理",
          subs: [
            {
              index: "userTiXianRecord",
              title: "用户提现记录"
            },
            {
              index: "shopTiXianRecord",
              title: "商家提现记录"
            },
            {
              index: "distributionUserTiXian",
              title: "骑手提现记录"
            },
            {
              index: "userRechargeRecord",
              title: "充值记录"
            }

          ]
        },
          {
            icon: "el-icon-setting",
            index: "11",
            title: "权限管理",
            subs: [{
              index: "managerUserList",
              title: "成员管理",
              role: 'ADMIN'
            }, {
              index: "addManagerUser",
              title: "添加成员",
              role: 'ADMIN'
            },
         /*     {
                index: "menuManager",
                title: "权限设置",
                role: 'ADMIN'
              }*/]
          }, {
            icon: "el-icon-setting",
            index: "12",
            title: "设置管理",
            subs: [{
              index: "setting",
              title: "跑腿费",
              role: 'ADMIN'
            }, {
              index: "region",
              title: "区域设置",
              role: 'ADMIN'
            }]
          },
          {
            icon: "el-icon-warning",
            index: "roleManagement",
            title: "角色管理",
            role: 'ADMIN'
          }
          //                    {
          //                        icon: 'el-icon-tickets',
          //                        index: 'table',
          //                        title: '基础表格'
          //                    },
          //                    {
          //                        icon: 'el-icon-message',
          //                        index: 'tabs',
          //                        title: 'tab选项卡'
          //                    },
          //                    {
          //                        icon: 'el-icon-date',
          //                        index: '6',
          //                        title: '表单相关',
          //                        subs: [
          //                            {
          //                                index: 'form',
          //                                title: '基本表单'
          //                            },
          //                            {
          //                                index: 'editor',
          //                                title: '富文本编辑器'
          //                            },
          //                            {
          //                                index: 'markdown',
          //                                title: 'markdown编辑器'
          //                            },
          //                            {
          //                                index: 'upload',
          //                                title: '文件上传'
          //                            }
          //                        ]
          //                    },
          //                    {
          //                        icon: 'el-icon-star-on',
          //                        index: 'charts',
          //                        title: 'schart图表'
          //                    },
          //                    {
          //                        icon: 'el-icon-rank',
          //                        index: 'drag',
          //                        title: '拖拽列表'
          //                    },
          //                    {
          //                        icon: 'el-icon-warning',
          //                        index: 'permission',
          //                        title: '权限测试'
          //                    },
          //                    {
          //                        icon: 'el-icon-error',
          //                        index: '404',
          //                        title: '404页面'
          //                    }
        ]
      };
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace("/", "");
      }
    },

    created() {
      // 通过 Event Bus 进行组件间通信，来折叠侧边栏
      // console.log(JSON.stringify(this.items));
      bus.$on("collapse", msg => {
        localStorage.setItem('collapse', msg ? 'true' : 'false');
        this.collapse = msg;
      });
    },

    mounted() {
      bus.$emit('collapse', localStorage.getItem('collapse') == 'true');
    },

    methods: {


      auth(item) {
        // return true;
        const roles = [];
        const addRoles = role => {
          if (!role)
            return;
          if (Array.isArray(role)) {
            for (const v of role) {
              if (!isInArr(v, roles)) {
                roles.push(v);
              }
            }
          } else {
            if (!isInArr(role, roles)) {
              roles.push(role);
            }
          }
        };
        if (item.role) {
          addRoles(item.role);
        } else if (item.subs) {
          for (const v of item.subs) {
            addRoles(v.role);
          }
        }
        if (roles.length === 0)
          return true;
        return this.$session.is(roles);
      }
    }
  };
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>

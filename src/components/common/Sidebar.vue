<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
             text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">
              {{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
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
            title: "系统首页"
          }, {
            index: "accountSetting",
            title: "个人信息"
          }]
        }, {
          icon: "el-icon-setting",
          index: "2",
          title: "商品管理",
          subs: [{
            index: "commodityList",
            title: "商品列表"
          }, {
            index: "commodityEvaluate",
            title: "商品评价"
          }]
        }, {
          icon: "el-icon-setting",
          index: "3",
          title: "订单管理",
          subs: [{
            index: "orderList",
            title: "订单列表"
          }, {
          //   index: "orderDistribution",
          //   title: "同城配送订单"
          // }, {
          //   index: "confirmReceipt",
          //   title: "确认收货"
          // }, {
            index: "orderSetting",
            title: "订单设置"
          }, {
            index: "returnGoods",
            title: "退货申请处理"
          }, {
            index: "refund",
            title: "退款申请处理"
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
          title: "用户",
          subs: [{
            index: "userList",
            title: "用户列表"
          }, {
            index: "ruleSetting",
            title: "更多规则设置"
          }, {
            index: "membershipGrade",
            title: "会员等级"
          }]
        }, {
          icon: "el-icon-setting",
          index: "6",
          title: "促销",
          subs: [{
            index: "secondKillList",
            title: "秒杀活动列表"
          }, {
            index: "secondKillTime",
            title: "时间段列表"
          }, {
          //   index: "couponList",
          //   title: "优惠卷列表"
          // }, {
          //   index: "couponAdd",
          //   title: "优惠卷添加"
          // }, {
            index: "recommendCommodities",
            title: "首页推荐商品设置"
          }]
        }, {
          icon: "el-icon-setting",
          index: "7",
          title: "设置",
          subs: [{
            index: "special",
            title: "专题管理"
          }, {
            index: "PutForward",
            title: "提现管理"
          }, {
            index: "basicSetup",
            title: "基本设置"
          }, {
            index: "messageTi",
            title: "消息提醒"
          }, {
            index: "freight",
            title: "运费管理"
          }, {
            index: "logisticsCompany",
            title: "物流公司"
          }, {
            index: "paymentSetting",
            title: "支付设置"
          }, {
            index: "region",
            title: "区域管理"
          }]
        }, {
          icon: "el-icon-setting",
          index: "8",
          title: "商户管理",
          subs: [{
            index: "business",
            title: "商户列表"
          }]
        }, {
          icon: "el-icon-setting",
          index: "9",
          title: "配送管理",
          subs: [{
            index: "distributionPersonnel",
            title: "用户列表"
          }, {
            index: "distributionAudit",
            title: "订单详情"
          }]
        }, {
          icon: "el-icon-setting",
          index: "10",
          title: "财务管理",
          subs: [
            {
            index: "userTiXianRecord",
            title: "提现记录"
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
              title: "成员管理"
            }, {
              index: "addManagerUser",
              title: "添加成员"
            },
              {
                index: "menuManager",
                title: "权限设置"
              }]
          },


          {
          icon: "el-icon-warning",
          index: "roleManagement",
          title: "角色管理"
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
      bus.$on("collapse", msg => {
        this.collapse = msg;
      });
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

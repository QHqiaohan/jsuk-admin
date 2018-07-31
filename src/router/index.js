import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
  routes: [{
    path: '/',
    redirect: '/dashboard',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    meta: {
      title: '自述文件'
    },
    children: [
      {
        path: '/accountSetting',
        component: resolve => require(['../view/accountSetting/accountSetting.vue'], resolve),
        meta: {
          title: '个人信息'
        }
      }, {
        path: '/commodityList',
        component: resolve => require(['../view/commodityList/commodityList.vue'], resolve),
        meta: {
          title: '商品列表'
        }
      }, {
        path: '/commodityAdd',
        component: resolve => require(['../view/commodityAdd/commodityAdd.vue'], resolve),
        meta: {
          title: '添加商品'
        }
      }, {
        path: '/commodityRecycle',
        component: resolve => require(['../view/commodityRecycle/commodityRecycle.vue'], resolve),
        meta: {
          title: '商品回收站'
        }
      }, {
        path: '/commodityEvaluate',
        component: resolve => require(['../view/commodityEvaluate/commodityEvaluate.vue'], resolve),
        meta: {
          title: '商品评价'
        }
      }, {
        path: '/commodityClassification',
        component: resolve => require(['../view/commodityClassification/commodityClassification.vue'], resolve),
        meta: {
          title: '商品分类'
        }
      }, {
        path: '/commodityType',
        component: resolve => require(['../view/commodityType/commodityType.vue'], resolve),
        meta: {
          title: '商品类型'
        }
      }, {
        path: '/brandManagement',
        component: resolve => require(['../view/brandManagement/brandManagement.vue'], resolve),
        meta: {
          title: '品牌管理'
        }
      }, {
        path: '/pictureManagement',
        component: resolve => require(['../view/pictureManagement/pictureManagement.vue'], resolve),
        meta: {
          title: '图片管理'
        }
      }, {
        path: '/orderList',
        component: resolve => require(['../view/orderList/orderList.vue'], resolve),
        meta: {
          title: '订单列表'
        }
      }, {
        path: '/orderDistribution',
        component: resolve => require(['../view/orderDistribution/orderDistribution.vue'], resolve),
        meta: {
          title: '同城配送订单'
        }
      }, {
        path: '/confirmReceipt',
        component: resolve => require(['../view/confirmReceipt/confirmReceipt.vue'], resolve),
        meta: {
          title: '确认收货'
        }
      }, {
        path: '/orderSetting',
        component: resolve => require(['../view/orderSetting/orderSetting.vue'], resolve),
        meta: {
          title: '订单设置'
        }
      }, {
        path: '/returnGoods',
        component: resolve => require(['../view/returnGoods/returnGoods.vue'], resolve),
        meta: {
          title: '退货申请处理'
        }
      }, {
        path: '/refund',
        component: resolve => require(['../view/refund/refund.vue'], resolve),
        meta: {
          title: '退款申请处理'
        }
      }, {
        path: '/returnGoodsReason',
        component: resolve => require(['../view/returnGoodsReason/returnGoodsReason.vue'], resolve),
        meta: {
          title: '退货原因处理'
        }
      }, {
        path: '/express',
        component: resolve => require(['../view/express/express.vue'], resolve),
        meta: {
          title: '快递管理'
        }
      }, {
        path: '/deliverGoods',
        component: resolve => require(['../view/deliverGoods/deliverGoods.vue'], resolve),
        meta: {
          title: '发货点信息管理'
        }
      }, {
        path: '/warehousing',
        component: resolve => require(['../view/warehousing/warehousing.vue'], resolve),
        meta: {
          title: '商品入库'
        }
      }, {
        path: '/delivery',
        component: resolve => require(['../view/delivery/delivery.vue'], resolve),
        meta: {
          title: '商品出库'
        }
      }, {
        path: '/userList',
        component: resolve => require(['../view/userList/userList.vue'], resolve),
        meta: {
          title: '用户列表'
        }
      }, {
        path: '/ruleSetting',
        component: resolve => require(['../view/ruleSetting/ruleSetting.vue'], resolve),
        meta: {
          title: '更多规则设置'
        }
      }, {
        path: '/membershipGrade',
        component: resolve => require(['../view/membershipGrade/membershipGrade.vue'], resolve),
        meta: {
          title: '会员等级'
        }
      }, {
        path: '/secondKillList',
        component: resolve => require(['../view/secondKillList/secondKillList.vue'], resolve),
        meta: {
          title: '秒杀活动列表'
        }
      }, {
        path: '/secondKillTime',
        component: resolve => require(['../view/secondKillTime/secondKillTime.vue'], resolve),
        meta: {
          title: '时间段列表'
        }
      }, {
        path: '/couponList',
        component: resolve => require(['../view/couponList/couponList.vue'], resolve),
        meta: {
          title: '优惠卷列表'
        }
      }, {
        path: '/couponAdd',
        component: resolve => require(['../view/couponAdd/couponAdd.vue'], resolve),
        meta: {
          title: '优惠卷添加'
        }
      }, {
        path: '/recommendCommodities',
        component: resolve => require(['../view/recommendCommodities/recommendCommodities.vue'], resolve),
        meta: {
          title: '首页推荐商品设置'
        }
      }, {
        path: '/special',
        component: resolve => require(['../view/special/special.vue'], resolve),
        meta: {
          title: '专题管理'
        }
      }, {
        path: '/PutForward',
        component: resolve => require(['../view/PutForward/PutForward.vue'], resolve),
        meta: {
          title: '提现管理'
        }
      }, {
        path: '/basicSetup',
        component: resolve => require(['../view/basicSetup/basicSetup.vue'], resolve),
        meta: {
          title: '基本设置'
        }
      }, {
        path: '/messageTi',
        component: resolve => require(['../view/messageTi/messageTi.vue'], resolve),
        meta: {
          title: '消息提醒'
        }
      }, {
        path: '/freight',
        component: resolve => require(['../view/freight/freight.vue'], resolve),
        meta: {
          title: '运费管理'
        }
      }, {
        path: '/logisticsCompany',
        component: resolve => require(['../view/logisticsCompany/logisticsCompany.vue'], resolve),
        meta: {
          title: '物流公司'
        }
      }, {
        path: '/paymentSetting',
        component: resolve => require(['../view/paymentSetting/paymentSetting.vue'], resolve),
        meta: {
          title: '支付设置'
        }
      }, {
        path: '/region',
        component: resolve => require(['../view/region/region.vue'], resolve),
        meta: {
          title: '区域管理'
        }
      }, {
        path: '/roleManagement',
        component: resolve => require(['../view/roleManagement/roleManagement.vue'], resolve),
        meta: {
          title: '角色管理',
          permission: true
        }
      }, {
        path: '/business',
        component: resolve => require(['../view/business/business.vue'], resolve),
        meta: {
          title: '商家列表'
        }
      }, {
        path: '/businessAudit',
        component: resolve => require(['../view/businessAudit/businessAudit.vue'], resolve),
        meta: {
          title: '商家审核'
        }
      }, {
        path: '/distributionPersonnel',
        component: resolve => require(['../view/distributionPersonnel/distributionPersonnel.vue'], resolve),
        meta: {
          title: '配送人员'
        }
      }, {
        path: '/distributionAudit',
        component: resolve => require(['../view/distributionAudit/distributionAudit.vue'], resolve),
        meta: {
          title: '配送审核'
        }

      },
      //add end

      {
        path: '/userTiXianRecord',
        component: resolve => require(['../view/userTiXianRecord/userTiXian.vue'], resolve),
        meta: {
          title: '提现记录'
        }
      },
      {
        path: '/userRechargeRecord',
        component: resolve => require(['../view/userRechargeRecord/userRechargeRecord.vue'], resolve),
        meta: {
          title: '充值记录'
        }
      },

      {
        path: '/managerUserList',
        component: resolve => require(['../view/managerUserList/managerUserList.vue'], resolve),
        meta: {
          title: '成员管理'
        }
      },
      {
        path: '/addManagerUser',
        component: resolve => require(['../view/addManagerUser/addManagerUser.vue'], resolve),
        meta: {
          title: '添加成员'
        }
      },
      {
        path: '/menuManager',
        component: resolve => require(['../view/menuManager/menuManager.vue'], resolve),
        meta: {
          title: '权限设置'
        }
      },


      {
        path: '/dashboard',
        component: resolve => require(['../components/page/Dashboard.vue'], resolve),
        meta: {
          title: '系统首页'
        }
      }, {
        path: '/table',
        component: resolve => require(['../components/page/BaseTable.vue'], resolve),
        meta: {
          title: '基础表格'
        }
      }, {
        path: '/tabs',
        component: resolve => require(['../components/page/Tabs.vue'], resolve),
        meta: {
          title: 'tab选项卡'
        }
      }, {
        path: '/form',
        component: resolve => require(['../components/page/BaseForm.vue'], resolve),
        meta: {
          title: '基本表单'
        }
      }, {
        // 富文本编辑器组件
        path: '/editor',
        component: resolve => require(['../components/page/VueEditor.vue'], resolve),
        meta: {
          title: '富文本编辑器'
        }
      }, {
        // markdown组件
        path: '/markdown',
        component: resolve => require(['../components/page/Markdown.vue'], resolve),
        meta: {
          title: 'markdown编辑器'
        }
      }, {
        // 图片上传组件
        path: '/upload',
        component: resolve => require(['../components/page/Upload.vue'], resolve),
        meta: {
          title: '文件上传'
        }
      }, {
        // vue-schart组件
        path: '/charts',
        component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
        meta: {
          title: 'schart图表'
        }
      }, {
        // 拖拽列表组件
        path: '/drag',
        component: resolve => require(['../components/page/DragList.vue'], resolve),
        meta: {
          title: '拖拽列表'
        }
      }, {
        // 权限页面
        path: '/permission',
        component: resolve => require(['../components/page/Permission.vue'], resolve),
        meta: {
          title: '权限测试',
          permission: true
        }
      }]
  }, {
    path: '/login',
    component: resolve => require(['../components/page/Login.vue'], resolve)
  }, {
    path: '*',
    component: resolve => require(['../components/page/404.vue'], resolve)
  }, {
    path: '/403',
    component: resolve => require(['../components/page/403.vue'], resolve)
  }]
})

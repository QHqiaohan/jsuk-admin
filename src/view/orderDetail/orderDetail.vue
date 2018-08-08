<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      订单详情
    </el-row>

    <div class="container">

      <el-container direction="vertical">

        <div class="form-box">


          <el-form :model="userOrder" ref="userOrder" label-width="100px" class="demo-ruleForm">

            <el-form-item label="订单号：" prop="orderNum">
              <el-input disabled=true v-model="userOrder.orderNum"></el-input>
            </el-form-item>

            <el-form-item label="订单原始价格：" prop="orderPrice">
              <el-input disabled=true v-model="userOrder.orderPrice"></el-input>
            </el-form-item>

            <el-form-item label="订单实际价格：" prop="orderRealPrice">
              <el-input disabled=true v-model="userOrder.orderRealPrice" ></el-input>
            </el-form-item>

            <el-form-item label="满减：" prop="fullReduce">
              <el-input disabled=true v-model="userOrder.fullReduce" ></el-input>
            </el-form-item>
            <el-form-item label="优惠券优惠：" prop="couponReduce">
              <el-input  disabled=true v-model="userOrder.couponReduce"></el-input>
            </el-form-item>

            <el-form-item label="积分抵扣：" prop="integralReduce">
              <el-input disabled=true v-model="userOrder.integralReduce"></el-input>
            </el-form-item>

            <el-form-item label="运费：" prop="freight">
              <el-input disabled=true v-model="userOrder.freight"></el-input>
            </el-form-item>

            <el-form-item label="配送费：" prop="distributionFee">
              <el-input disabled=true v-model="userOrder.distributionFee"></el-input>
            </el-form-item>

            <el-form-item label="支付时间：" prop="payTime">
              <el-input disabled=true v-model="userOrder.payTime"></el-input>
            </el-form-item>

            <el-form-item label="支付方式：" prop="payType">
              <span v-if="userOrder.payType==0"><el-input  value="余额" disabled="true"></el-input></span>
              <span v-if="userOrder.payType==1"><el-input  value="货到付款" disabled="true"></el-input></span>
              <span v-if="userOrder.payType==2"><el-input  value="支付宝" disabled="true"></el-input></span>
              <span v-if="userOrder.payType==3"><el-input  value="微信" disabled="true"></el-input></span>
              <span v-if="userOrder.payType==4"><el-input  value="银行卡" disabled="true"></el-input></span>
            </el-form-item>

            <el-form-item label="订单状态：" prop="status">
              <span v-if="userOrder.status==0"><el-input  value="待付款" disabled="true"></el-input></span>
              <span v-if="userOrder.status==1"><el-input  value="待发货" disabled="true"></el-input></span>
              <span v-if="userOrder.status==2"><el-input  value="待收货" disabled="true"></el-input></span>
              <span v-if="userOrder.status==3"><el-input  value="售后" disabled="true"></el-input></span>
              <span v-if="userOrder.status==4"><el-input  value="退款" disabled="true"></el-input></span>
              <span v-if="userOrder.status==5"><el-input  value="退货" disabled="true"></el-input></span>
              <span v-if="userOrder.status==6"><el-input  value="拒绝" disabled="true"></el-input></span>
              <span v-if="userOrder.status==7"><el-input  value="取消" disabled="true"></el-input></span>
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
        this.$axios.post('/userOrder/getUserOrderById', this.$axios.form({orderId: this.$route.query.orderId}))
          .then(({data:{data}}) => {
            this.userOrder=data;
          });

      });
    },

    data() {

      return {
        userOrder:{}
      }

    },
    methods: {


      }

  }
</script>

<style>

</style>

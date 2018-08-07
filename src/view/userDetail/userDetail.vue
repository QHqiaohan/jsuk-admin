<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      用户详情
    </el-row>


    <div class="container">
      <el-container direction="vertical">
        <div class="form-box">

        <el-form :model="user"  ref="user" label-width="100px" class="demo-ruleForm">

          <el-form-item label="用户id" prop="id">
            <el-input type="text" v-model="user.id" disabled=true></el-input>
          </el-form-item>

          <el-form-item label="昵称" prop="nickName">
            <el-input type="text" v-model="user.nickName" disabled=true></el-input>
          </el-form-item>

          <el-form-item label="性别" >
            <span v-if="user.sex==0"><el-input value="女" disabled=true></el-input></span>
            <span v-if="user.sex==1"><el-input value="男" disabled=true></el-input></span>
          </el-form-item>

          <el-form-item label="生日" prop="birthday">
            <el-input type="text" v-model="user.birthday" disabled=true></el-input>
          </el-form-item>

          <el-form-item label="城市" prop="address">
            <el-input type="text" v-model="user.address" disabled=true></el-input>
          </el-form-item>

        </el-form>
        </div>

      </el-container>
    </div>

    <div class="container" style="margin-top: 40px">
      <el-container direction="vertical">

        <!--地址-->
          <el-table
            :data="userAddressList"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号码"
              width="180">
            </el-table-column>
            <el-table-column
            prop="address"
            label="详细地址">
            </el-table-column>
            <el-table-column
            prop="postalCode"
            label="邮政编码">
            </el-table-column>
            <el-table-column
              label="默认地址">
<!--              <template slot-scope="{row}">
                <el-switch
                  v-model="row.isDefault"
                  active-value=1
                  inactive-value=0
                  active-color="#5B7BFA"
                  inactive-color="#dadde5"
                  @change="defaultChange(row.id,row.isDefault)"
                >
                </el-switch>
              </template>-->
              <template slot-scope="{row}">
                <el-switch v-model="switches[row.id]" @change="defaultChange(row.id,row)"></el-switch>
              </template>

            </el-table-column>
          </el-table>

      </el-container>
    </div>



    <div class="container" style="margin-top: 40px">
      <el-container direction="vertical">
        <!--订单记录-->
          <el-table
            :data="userOrderList"
            style="width: 100%">
            <el-table-column
              prop="orderNum"
              label="订单编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="creatTime"
              label="提交时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="userId"
              label="用户账号">
            </el-table-column>
            <el-table-column
              prop="orderRealPrice"
              label="订单金额">
            </el-table-column>
            <el-table-column
              label="支付方式">
              <template slot-scope="scope">
              <span v-if="scope.row.payType===0">余额 </span>
              <span v-if="scope.row.payType===1">货到付款 </span>
              <span v-if="scope.row.payType===2">支付宝 </span>
              <span v-if="scope.row.payType===3">微信 </span>
              <span v-if="scope.row.payType===4">银行卡 </span>
              </template>
            </el-table-column>
            <el-table-column
              value="APP订单"
              label="订单来源">
            </el-table-column>
            <el-table-column
              label="订单状态">
              <template slot-scope="scope">
              <span v-if="scope.row.status===0">待付款 </span>
              <span v-if="scope.row.status===1">待发货 </span>
              <span v-if="scope.row.status===2">待收货 </span>
              <span v-if="scope.row.status===3">售后 </span>
              <span v-if="scope.row.status===4">退款 </span>
              <span v-if="scope.row.status===5">退货 </span>
              <span v-if="scope.row.status===6">拒绝 </span>
              <span v-if="scope.row.status===7">取消 </span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button type="text" @click="toOrderDetailPage(row.id)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>

      </el-container>
    </div>


</div>

</template>

<script>
  export default {

    mounted() {
      this.$nextTick(() => {
        /*this.$axios.post('/user/getUserInfo', this.$axios.form({detailUserId: this.$route.query.detailUserId}))
          .then(({data:{data}}) => {
            this.user=data.user;
            this.userOrderList=data.userOrderList;
            this.userAddressList=data.userAddressList;
          });*/
        this.initMethod();
      });
    },

    data() {
      return {
        query: {},
        user: {},
        userOrderList: [],
        userAddressList: [],
        switches:{}
      }
    },

    methods: {

      initMethod(){
        this.$axios.post('/user/getUserInfo', this.$axios.form({detailUserId: this.$route.query.detailUserId}))
          .then(({data:{data}}) => {
            this.user=data.user;
            this.userOrderList=data.userOrderList;
            this.userAddressList=data.userAddressList;
          });

        this.initDefault(this.userAddressList);
      },

      defaultChange(id,row) {
       //this.$axios.post('/userAddress/setDefaultAddress', this.$axios.form({id:id, isDefault:isDefault}));

        if (this.switches[id] == false) {
          this.$confirm(`是否取消默认?`).then(e => {
            this.$axios.post('/userAddress/setDefaultAddress', this.$axios.form({id:id, isDefault:0}))
              .then(() => {
                this.initMethod();
              });
          });
        } else {
          this.$axios.post('/userAddress/setDefaultAddress', this.$axios.form({id:id, isDefault:1}))
            .then(() => {
              this.initMethod();
            });
        }
      },

      initDefault(rows) {
        for (const {id, isDefault} of rows) {
          alert("id:"+id+",isDefault:"+isDefault);
          this.switches[id] = isDefault == 1;
        }
      },

      toOrderDetailPage(id) {
        this.$router.push({path: '/orderDetail', query: {orderId: id}})
      }

    }
  }
</script>

<style>

</style>

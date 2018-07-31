<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      充值记录
    </el-row>

    <el-container direction="vertical">
      <fm-grid url="/userRechargeRecord/getRechargeList" ref="grid" method="get" :params="['rechargeId']">


        <template slot-scope="{rows,loading,search}">

          <div class="filter-container">

            <el-row style="padding-bottom: 20px;">

              <span>流水号：</span>
              <el-input v-model="query.rechargeId" placeholder="充值流水号" style="width:200px;"/>

              <el-button @click="search(query,1)">查询</el-button>
            </el-row>

          </div>
          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            <el-table-column
              prop="id"
              label="流水号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="rechargeMoney"
              label="充值金额"
              width="100">
            </el-table-column>
            <el-table-column
              prop="sendMoney"
              label="赠送金额"
              width="100">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="充值时间"
              width="200">
            </el-table-column>
            <el-table-column
              prop="rechargeMethod"
              label="充值方式"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.rechargeMethod===0">银行卡</span>
                <span v-if="scope.row.rechargeMethod===1">微信</span>
                <span v-if="scope.row.rechargeMethod===2">支付宝</span>
                <span v-if="scope.row.rechargeMethod===3">其它</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="finishTime"
              label="到账时间"
              width="200">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.status===0">未到账</span>
                <span v-if="scope.row.status===1">已到账</span>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </fm-grid>
      <!--<goodsEdit @success="$refs.grid.search()" ref="dictae"/>-->
    </el-container>

  </div>


</template>

<script>
  //import goodsEdit from './goodsEdit';

  export default {
    /*    components: {goodsEdit},
        mounted() {
          this.$nextTick(() => {
            const {kw} = this.$route.query;
            this.query = {...this.query, kw};
            this.$shop.getCategories().then(categories => this.categories = categories);
            this.$shop.getBrands().then(brands => this.brands = brands);
            this.loadCount();
          });
        },*/

    methods: {


      tiXianExamine(id) {
        this.$axios.post('/userTiXian/tiXianExamine', this.$axios.form({tiXianId: id}))
          .then(({data}) => {
            this.$refs.grid.search();
            this.loadCount();
          });
      },
      categoryChange() {

      },

      gSearch(status) {
        this.$refs.grid.search({...this.query, status}, 1);
      }

    },

    data() {
      return {
        /*selected:null,*/
        query: {},
        categories: [],
        brands: [],
        count: {},
      }
    }
  }


</script>

<style>

</style>

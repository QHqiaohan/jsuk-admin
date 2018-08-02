<template>
  <div>
    <el-container direction="vertical">
      <fm-grid url="/distribution/orderDetails?id=237" ref="grid" method="get" >
        <template slot-scope="{rows,loading,search}">
          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            <el-table-column
              prop="orderNo"
              label="订单编号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="publishTime"
              label="提交时间"
              width="220">
            </el-table-column>
            <el-table-column
              prop="user.phone"
              label="用户账号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="price"
              label="订单金额"
              width="200">
            </el-table-column>
            <el-table-column
              prop="status"
              label="订单状态"
              width="180">
              <template slot-scope="scope">
                <span v-if="scope.row.status===0">取消 </span>
                <span v-else-if="0<scope.row.status<=3">待取货 </span>
                <span v-else-if="3<scope.row.status<5">已配送 </span>
                <span v-else>已完成 </span>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </fm-grid>
    </el-container>

  </div>


</template>

<script>

  export default {
    mounted() {
      this.$nextTick(() => {
        const {name} = this.$route.query;
        const {account} = this.$route.query;
        this.query = {...this.query, name, account};
        this.$shop.getCategories().then(categories => this.categories = categories);
        this.$shop.getBrands().then(brands => this.brands = brands);
      });
    },

    methods: {
      data() {
        return {
          query: {},
          categories: [],
          brands: [],
          count: {},
        }
      }
    }
  }

</script>

<style>

</style>

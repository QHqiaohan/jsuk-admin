<template>

  <div>
    <!--<el-row style="padding-bottom: 20px;">
         商品列表
     </el-row>-->
    <el-container direction="vertical">
      <fm-grid url="/distribution/list" ref="grid" method="get" :params="['account','name']">
        <template slot-scope="{rows,loading,search}">
          <div class="filter-container">
            <el-row style="padding-bottom: 20px;">
              <span>用户账号:</span>
              <el-input v-model="query.account" placeholder="用户ID/账号" style="width:200px;"/>
              <span>用户昵称:</span>
              <el-input v-model="query.name" placeholder="用户昵称" style="width:200px;"/>
              <el-button @click="search(query,1)">查询结果</el-button>
            </el-row>

          </div>
          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            <el-table-column
              prop="id"
              label="用户ID"
              width="100">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="用户账号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="手机号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="income"
              label="收入金额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="orderAmount"
              label="订单数量"
              width="80">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.status===0">待审核 </span>
                <span v-else-if="scope.row.status===1">审核通过 </span>
                <span v-else>审核拒绝 </span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button type="text" @click="view(row.id)">查看</el-button>
                <el-button type="text" @click="$refs.ae.edit(row.id)">编辑</el-button>
                <el-button type="text" @click="del(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </fm-grid>
      <distribution-ae @success="$refs.grid.search()" ref="ae"/>
    </el-container>

  </div>


</template>

<script>
  import DistributionAe from "./distributionAe";
  export default {
    components: {DistributionAe},
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

      /*  loadCount() {
          this.$axios.get('/wgoods/allCount')
            .then(({data: {data}}) => {
              this.count = data;
            });
        },*/

      /*upper(id) {
        this.$axios.post('/wgoods/upper', this.$axios.form({goodsId: id}))
          .then(({data}) => {
            this.$refs.grid.search();
            this.loadCount();
          });
      },*/

      /*  lower(id) {
          this.$axios.post('/wgoods/lower', this.$axios.form({goodsId: id}))
            .then(({data}) => {
              this.$refs.grid.search();
              this.loadCount();
            });
        },*/

      del(id) {
        this.$confirm(`确定要删除?`)
          .then(e => {
            this.$axios.post('/distribution/del', this.$axios.form({id: id}))
              .then(({data}) => {
                this.$refs.grid.search();
                this.loadCount();
              });
          })
          .catch(e => {
          });
      },
      review(id, flag) {
        this.$axios.post('/wgoods/review', this.$axios.form({goodsId: id, flag: flag}))
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

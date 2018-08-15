<template>

  <div>
    <!--<el-row style="padding-bottom: 20px;">
         商品列表
     </el-row>-->
    <el-container direction="vertical">
      <fm-grid url="/distribution/list" ref="grid" method="get" :params="['account','name','status']">
        <template slot-scope="{rows,loading,search}">
          <div class="filter-container">
            <!--<el-row style="padding-bottom: 20px;">-->
              <!--<el-button @click="gSearch()">全部骑手{{count.all}}</el-button>-->
              <!--<el-button @click="gSearch(0)">待审核{{count.wcm}}</el-button>-->
              <!--<el-button @click="gSearch(1)">审核通过{{count.cmp}}</el-button>-->
            <!--</el-row>-->
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
                <el-button v-if="row.status === 0 && $session.is('ADMIN')" type="text" @click="review(row.id)">审核通过
                </el-button>
                <el-button type="text" @click="$refs.ae.view(row.id)">查看</el-button>
                <el-button type="text" @click="$refs.ae1.edit(row.id)">编辑</el-button>
                <el-button type="text" @click="del(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </fm-grid>
      <distribution-ae @success="$refs.grid.search()" ref="ae1"/>
      <distribution-detail @success="$refs.grid.search()" ref="ae"/>
    </el-container>

  </div>


</template>

<script>
  import DistributionAe from "./distributionAe";
  import DistributionDetail from "./distributionDetail";

  export default {
    components: {DistributionAe, DistributionDetail},
    mounted() {
      this.$nextTick(() => {
        const {name,account,status} = this.$route.query;
        this.query = {...this.query, name, account,status};
        // this.loadCount();
      });
    },

    methods: {
      loadCount() {
        this.$axios.get('/distribution/allCount')
          .then(({data: {data}}) => {
            this.count = data;
          });
      },
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
      gSearch(status) {
        this.$refs.grid.search({...this.query, status}, 1);
      },
      review(id) {
        this.$axios.post('/distribution/review', this.$axios.form({id}))
          .then(() => {
            this.$refs.grid.search();
            this.loadCount();
          });
      },
    },

    data() {
      return {
        query: {},
        count: {},
      }
    }
  }


</script>

<style>

</style>

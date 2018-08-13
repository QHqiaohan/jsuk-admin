<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      商家提现记录
    </el-row>

    <el-container direction="vertical">
      <fm-grid url="/userTiXian/advanceSearchTiXianPage" ref="grid" method="get" :params="['tixianId','amountScope','categoryId','status']">


        <template slot-scope="{rows,loading,search}">

          <div class="filter-container">

            <el-row style="padding-bottom: 20px;">

              <span>流水号：</span>
              <el-input v-model="query.tixianId" placeholder="充值流水号" style="width:200px;"/>

              <span>金额范围：</span>
              <el-select v-model="query.amountScope" v-bind:loading="null" placeholder="请选择金额范围">
                <el-option
                  value="0-500">
                  0-500
                </el-option>
                <el-option
                  value="500-1000">
                  500-1000
                </el-option>
                <el-option
                  value="1000-1500">
                  1000-1500
                </el-option>
                <el-option
                  value="1500-2000">
                  1500-2000
                </el-option>
                <el-option
                  value="2000-*">
                  2000以上
                </el-option>

              </el-select>


              <el-button @click="search(query,1)">高级检索</el-button>
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
              prop="shopUser.legalPersonName"
              label="用户名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="price"
              label="提现金额"
              width="100">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="提现时间"
              width="200">
            </el-table-column>
            <el-table-column
              prop="destination"
              label="提现渠道"
              width="100">
            </el-table-column>
            <el-table-column
              prop="num"
              label="提现账户"
              width="100">
            </el-table-column>
            <el-table-column
              prop="examine"
              label="提现审核"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.examine===0">审核未通过</span>
                <span v-if="scope.row.examine===1">审核通过</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.status===0">处理中</span>
                <span v-if="scope.row.status===1">已提现</span>
                <span v-if="scope.row.status===2">提现失败</span>
                <span v-if="scope.row.status===3">取消</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <span v-if="row.examine===1">已审核</span>
                <span v-if="row.examine===0"> <el-button type="text" @click="tiXianExamine(row.id,row.shopUser.managerUserId)">审核通过</el-button></span>
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


      tiXianExamine(id,mid) {
       // alert(id);
       // alert(mid);
        this.$axios.post('/userTiXian/shopTiXianExamine', this.$axios.form({tiXianId: id,shopManagerId:mid}))
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

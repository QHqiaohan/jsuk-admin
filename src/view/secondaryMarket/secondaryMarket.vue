<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      二手信息
    </el-row>

    <el-container direction="vertical">
      <fm-grid url="/activity/getSecondaryMarketList"  ref="grid" method="get" :params="['keywords']">


        <template slot-scope="{rows,loading,search}">

          <div class="filter-container">

            <el-row style="padding-bottom: 20px;">
              <span>输入搜索：</span>
              <el-input v-model="query.keywords" placeholder="二手商品名称/商品货号" style="width:200px;"/>
              <el-button type="primary" @click="search(query,1)">搜索</el-button>
            </el-row>

            <el-row style="padding-bottom: 20px;">
              <span style="font-size:20px">数据列表</span>
            </el-row>

          </div>
          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            <el-table-column
              prop="id"
              label="编号"
              width="160">
            </el-table-column>

            <el-table-column
              prop="mainImg"
              label="商户头像"
              width="80">
              <template slot-scope="scope">
                <img v-if="scope.row.imageArray[0]" :src="scope.row.imageArray[0]" alt="" style="width: 50px;height: 50px">
              </template>
            </el-table-column>

            <el-table-column
              prop="title"
              label="商品名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格/货号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="examine"
              label="状态"
              width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.examine===0">未审核</span>
                <span v-if="scope.row.examine===1">已审核</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="modularName"
              label="商品分类"
              width="200">
            </el-table-column>

            <el-table-column
              label="操作"
              width="300">
              <template slot-scope="{row}">
                <el-button type="text" @click="examineToPass(row.id)">审核通过 </el-button>
                <el-button type="text" @click="del(row.id)">删除</el-button>
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
  // import goodsEdit from './goodsEdit';

  export default {
    /*   components: {goodsEdit},
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

      examineToPass(id){
        this.$axios.post('/activity/examineToPass', this.$axios.form({activityId: id}))
          .then(({data}) => {
            this.$refs.grid.search();
            this.loadCount();
          });
      },

      del(id) {
        this.$axios.post('/activity/deleteSecondActivity', this.$axios.form({activityId: id}))
          .then(({data}) => {
            this.$refs.grid.search();
            this.loadCount();
          });
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
        switches: {},
        count: {},
      }
    }
  }


</script>

<style>

</style>

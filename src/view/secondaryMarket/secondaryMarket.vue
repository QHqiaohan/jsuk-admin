<template>

  <div>
    <!--<el-row style="padding-bottom: 20px;">
         商品列表
     </el-row>-->
    <el-container direction="vertical">
      <fm-grid url="/secondGoods/list" ref="grid" method="get" :params="['kw']">
        <template slot-scope="{rows,loading,search}">
          <div class="filter-container">
            <el-row style="padding-bottom: 20px;">
              <span>输入搜索:</span>
              <el-input v-model="query.kw" placeholder="发布内容" style="width:200px;"/>
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
              label="编号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="user.nickName"
              label="发布人"
              width="180">
            </el-table-column>
            <el-table-column
              prop="mainImg"
              label="商品图片"
              width="250">
              <template slot-scope="scope">
                <ul>
                  <li v-for="item in scope.row.imageArray" :key="item" style="float: left">
                    <img :src="item" alt="" style="width: 50px;height: 50px">
                  </li>
                </ul>
                <!--<img v-for="" :src="scope.row.images" alt="" style="width: 50px;height: 50px">-->
              </template>
            </el-table-column>
            <el-table-column
              prop="content"
              label="发布内容"
              width="200">
            </el-table-column>
            <el-table-column
              prop="publishTime"
              label="创建时间"
              width="150">
            </el-table-column>
            <el-table-column
              label="状态"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.examine===0">待审核 </span>
                <span v-else-if="scope.row.examine===1">审核通过 </span>
              </template>
            </el-table-column>


            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button v-if="row.examine===0" type="text" @click="review(row.id,1)">审核通过</el-button>
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

  export default {
    mounted() {
      this.$nextTick(() => {
        const {kw} = this.$route.query;
        this.query = {...this.query, kw};
      });
    },

    methods: {
      del(id) {
        this.$confirm(`确定要删除?`)
          .then(e => {
            this.$axios.post('/secondGoods/del', this.$axios.form({id}))
              .then(() => {
                this.$refs.grid.search();
              });
          })
          .catch(e => {
          });
      },
      review(id) {
        this.$axios.post('/secondGoods/review', this.$axios.form({id}))
          .then(() => {
            this.$refs.grid.search();
          });
      },


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

<template>

  <div>
    <el-container direction="vertical">
      <fm-grid url="/feedback/list" ref="grid" method="get" :params="['kw']">
        <template slot-scope="{rows,loading,search}">
          <div class="filter-container">
            <el-row style="padding-bottom: 20px;">
              <span>输入搜索:</span>
              <el-input v-model="query.kw" placeholder="用户名/评论内容" style="width:200px;"/>
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
              prop="username"
              label="用户名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="content"
              label="反馈内容"
              width="300">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话"
              width="120">
            </el-table-column>
            <el-table-column
              prop="publishTime"
              label="提交时间"
              width="140">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button  type="text" @click="del(row.id)">删除</el-button>
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
            this.$axios.post('/feedback/del', this.$axios.form({id: id}))
              .then(({data}) => {
                this.$refs.grid.search();
                this.loadCount();
              });
          })
          .catch(e => {
          });
      },
    },
    data() {
      return {
        query: {},
      }
    }
  }
</script>
<style>
</style>

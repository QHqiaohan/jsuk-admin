<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      开通城市管理
    </el-row>
    <el-container direction="vertical">
      <fm-grid url="/cities" @init-data="initData" ref="grid" method="get" :params="['kw','date','status']">


        <template slot-scope="{rows,loading,search}">

          <div class="filter-container">

            <el-row style="padding-bottom: 20px;">
              <span>输入搜索:</span>
              <el-input v-model="query.kw" style="width:200px;"/>
              <el-button @click="search(query,1)">查询结果</el-button>
              <div style="float:right">
                <el-button type="text" @click="$refs.ae.add()">添加</el-button>
              </div>
            </el-row>

          </div>


          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            <el-table-column
              prop="city_id"
              label="cityId"
              width="180">
            </el-table-column>
            <el-table-column
              prop="county_name"
              label="天气请求名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="city_name"
              label="城市名"
              width="100">
            </el-table-column>
            <el-table-column
              label="启用"
              width="180">
              <template slot-scope="{row}">
                <el-switch v-model="switches[row.id]" @change="useChange(row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button type="text" @click="del(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </fm-grid>
      <open-cities-ae @success="$refs.grid.search()" ref="ae"/>
    </el-container>

  </div>


</template>

<script>

  import OpenCitiesAe from "./OpenCitiesAe";

  export default {

    components: {OpenCitiesAe},

    mounted() {
      this.$nextTick(() => {
        const {kw} = this.$route.query;
        this.query = {...this.query, kw};
      });

    },

    methods: {

      close(id) {
        this.$axios.post('/userOrder/close', this.$axios.form({orderId: id}))
          .then(({data}) => {
            this.$refs.grid.search();
            this.loadCount();
          });
      },

      del(row) {
        this.$confirm(`确定要删除${row.county_name}?`).then(e => {
          this.$axios.delete('/cities', {params: {id: row.id}})
            .then(() => {
              this.$refs.grid.search();
              this.$message.success('删除成功');
            });
        }).catch(() => {
        });
      },

      useChange(row) {
        const name = row.county_name || '';
        const id = row.id;
        if (this.switches[id] == false) {
          this.$confirm(`确定要禁用${name}?`).then(e => {
            this.$axios.patch('/cities', this.$axios.form({id, status: 0}))
              .then(() => {
                this.$refs.grid.search();
              });
          }).catch(() => {
          });
        } else {
          this.$axios.patch('/cities', this.$axios.form({id, status: 1}))
            .then(() => {
              this.$refs.grid.search();
            });
        }
      },

      categoryChange() {

      },

      gSearch(status) {
        this.$refs.grid.search({...this.query, status}, 1);
      },

      initData(rows) {
        for (const {id, status} of rows) {
          this.switches[id] = status == 1;
        }
      }

    },

    data() {
      return {
        query: {},
        switches: {}
      }
    }
  }


</script>

<style>

</style>

<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      秒杀活动列表
    </el-row>
    <el-container direction="vertical">
      <fm-grid url="/shopRushBuyActivity" @init-data="initData" ref="grid" method="get"
               :params="['kw','brandId','categoryId','status']">


        <template slot-scope="{rows,loading,search}">

          <div class="filter-container">

            <el-row style="padding-bottom: 20px;">
              <el-button type="text" @click="$refs.ae.add()">添加</el-button>
              <el-button type="text" v-if="$session.is('ADMIN')" @click="$router.push('/secondKillTime')">秒杀时间段列表
              </el-button>
            </el-row>

          </div>
          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            <el-table-column
              prop="shop.name"
              label="店铺"
              width="180">
            </el-table-column>
            <el-table-column
              prop="good.name"
              label="商品"
              width="180">
            </el-table-column>
            <el-table-column
              label="每日开始时间"
              width="180">
              <template slot-scope="{row}">
                {{row.time && row.time.startTime | time }}
              </template>
            </el-table-column>
            <el-table-column
              label="每日结束时间"
              width="180">
              <template slot-scope="{row}">
                {{row.time && row.time.endTime | time }}
              </template>
            </el-table-column>
            <el-table-column
              label="启用"
              width="180">
              <template slot-scope="{row}">
                <el-switch v-model="switches[row.id]" @change="useChange(row.id,row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button type="text" @click="$refs.ae.edit(row.id)">编辑</el-button>
                <el-button type="text" @click="del(row.id,row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </fm-grid>
      <kill-ae @success="$refs.grid.search()" ref="ae"/>
    </el-container>

  </div>


</template>

<script>

  import KillAe from './KillAe';

  export default {

    components: {KillAe},

    mounted() {
      this.$nextTick(() => {
        const {kw} = this.$route.query;
        this.query = {...this.query, kw};
      });
    },

    methods: {

      del(id, {good}) {
        const name = good && good.name || '';
        this.$confirm(`确定要删除${name}?`)
          .then(e => {
            this.$axios.delete('/shopRushBuyActivity', {params: {id}})
              .then(() => {
                this.$refs.grid.search();
              });
          })
          .catch(e => {
          });
      },

      categoryChange() {

      },

      gSearch(status) {
        this.$refs.grid.search({...this.query, status}, 1);
      },

      useChange(id, {good}) {
        const name = good && good.name || '';
        if (this.switches[id] == false) {
          this.$confirm(`确定要禁用${name}?`).then(e => {
            this.$axios.patch('/shopRushBuyActivity', {id, isUse: 0})
              .then(() => {
                this.$refs.grid.search();
              });
          }).catch(() => {
          });
        } else {
          this.$axios.patch('/shopRushBuyActivity', {id, isUse: 1})
            .then(() => {
              this.$refs.grid.search();
            });
        }
      },

      initData(rows) {
        for (const {id, isUse} of rows) {
          this.switches[id] = isUse == 1;
        }
      }


    },

    data() {
      return {
        query: {},
        categories: [],
        brands: [],
        count: {},
        switches: {},
        names: {}
      }
    }
  }


</script>

<style>

</style>

<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      订单列表
    </el-row>
    <el-container direction="vertical">
      <fm-grid url="/userOrder/page" ref="grid" method="get" :params="['kw','date','status']">


        <template slot-scope="{rows,loading,search}">

          <div class="filter-container">
            <!--<el-input style="width: 200px;" size="small" v-model="query.kw" class="filter-item"-->
            <!--placeholder="请输入姓名或用户名"/>-->

            <!--<el-button class="filter-item" size="small" style="margin-left: 10px;" @click="search(query,1)"-->
            <!--type="primary" icon="search">搜索-->
            <!--</el-button>-->
            <!--<div style="float:right;margin-right:20px;">-->
            <!--<el-button type="text" icon="document" @click="">-->
            <!--添加-->
            <!--</el-button>-->
            <!--</div>-->
            <el-row style="padding-bottom: 20px;">
              <el-button @click="gSearch('all')">全部订单{{count.all}}</el-button>
              <el-button @click="gSearch('dpay')">待付款{{count.dpay}}</el-button>
              <el-button @click="gSearch('wdlr')">待发货{{count.wdlr}}</el-button>
              <el-button @click="gSearch('dlrd')">已发货{{count.dlrd}}</el-button>
              <el-button @click="gSearch('succ')">已完成{{count.succ}}</el-button>
              <el-button @click="gSearch('clsd')">关闭{{count.clsd}}</el-button>
            </el-row>

            <el-row style="padding-bottom: 20px;">
              <span>输入搜索:</span>
              <el-input v-model="query.kw" style="width:200px;"/>
              <!--<span>收货人:</span>-->
              <!--<el-input v-model="query.kw" style="width:200px;"/>-->
              <span>提交时间:</span>
              <el-date-picker
                v-model="query.date"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions2">
              </el-date-picker>

              <el-button @click="search(query,1)">查询结果</el-button>
            </el-row>

          </div>


          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            <el-table-column
              prop="code"
              label="编码"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="description"
              label="描述"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button type="text" @click="$router.push(`/order/detail/${row.id}`)">查看订单</el-button>
                <el-button type="text" @click="close(row.id)">关闭订单</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </fm-grid>
      <!--<dict-ae @success="$refs.grid.search()" ref="dictae"/>-->
    </el-container>

  </div>


</template>

<script>

  export default {

    mounted() {
      this.$nextTick(() => {
        const {kw} = this.$route.query;
        this.query = {...this.query, kw};
        this.loadCount();
      });
    },

    methods: {

      loadCount(){
        this.$axios.get('/userOrder/count')
          .then(({data: {data}}) => {
            this.count = data;
          });
      },

      close(id){
        this.$axios.post('/userOrder/close',this.$axios.form({orderId:id}))
          .then(({data}) =>{
            this.$refs.grid.search();
            this.loadCount();
          });
      },

      categoryChange() {

      },

      gSearch(status){
        this.$refs.grid.search({...this.query,status},1);
      }

    },

    data() {
      return {
        query: {},
        categories: [],
        brands: [],
        count:{},
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      }
    }
  }


</script>

<style>

</style>

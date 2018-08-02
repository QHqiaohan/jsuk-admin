<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      退款申请列表
    </el-row>
    <el-container direction="vertical">
      <fm-grid url="/userOrderService/pageMoney" ref="grid" method="get" :params="['kw','date','status']">


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
              <el-button @click="gSearch('all')">全部 {{count.all}}</el-button>
              <el-button @click="gSearch('pending')">待处理 {{count.pending}}</el-button>
              <el-button @click="gSearch('refunding')">已处理 {{count.refunding}}</el-button>
              <el-button @click="gSearch('complete')">已拒绝 {{count.complete}}</el-button>
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
              prop="serviceCode"
              label="服务单号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="申请时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户"
              width="180">
            </el-table-column>
            <el-table-column
              prop="price"
              label="退款金额"
              width="180">
            </el-table-column>
            <el-table-column
              label="申请状态"
              width="80">
              <template slot-scope="{row}">
                <dict :dkey="row.status" code="OrderRefundStatus">
                  <template slot-scope="{data}">
                    {{data.value}}
                  </template>
                </dict>
              </template>
            </el-table-column>
            <el-table-column
              prop="completeTime"
              label="处理时间"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button  type="text" @click="$refs.dtl.edit(row.id)">查看详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </fm-grid>
      <return-goods-detail @success="$refs.grid.search() && loadCount()" ref="dtl"/>
    </el-container>

  </div>


</template>

<script>

  import ReturnGoodsDetail from "./ReturnGoodsDetail";

  export default {

    components:{ReturnGoodsDetail},

    mounted() {
      this.$nextTick(() => {
        const {kw} = this.$route.query;
        this.query = {...this.query, kw};
        this.loadCount();
      });
    },

    methods: {

      loadCount(){
        this.$axios.get('/userOrderService/pageCount')
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

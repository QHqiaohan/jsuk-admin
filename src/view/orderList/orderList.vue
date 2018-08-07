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
              <el-button @click="gSearch('all')">全部 {{count.all}}</el-button>
              <el-button @click="gSearch('dpay')">待付款 {{count.dpay}}</el-button>
              <el-button @click="gSearch('wdlr')">待发货 {{count.wdlr}}</el-button>
              <el-button @click="gSearch('dlrd')">已发货 {{count.dlrd}}</el-button>
              <el-button @click="gSearch('succ')">交易成功 {{count.succ}}</el-button>
              <el-button @click="gSearch('rfmy')">退款 {{count.rfmy}}</el-button>
              <el-button @click="gSearch('rfgd')">退货 {{count.rfgd}}</el-button>
              <el-button @click="gSearch('clsd')">拒绝 {{count.clsd}}</el-button>
              <el-button @click="gSearch('casl')">取消 {{count.casl}}</el-button>
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
              prop="orderNum"
              label="订单编号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="creatTime"
              label="提交时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户"
              width="180">
            </el-table-column>
            <el-table-column
              prop="orderRealPrice"
              label="金额"
              width="180">
            </el-table-column>
            <el-table-column
              label="支付方式"
              width="80">
              <template slot-scope="{row}">
                <dict :dkey="row.payType" code="PayType">
                  <template slot-scope="{data}">
                    {{data.value}}
                  </template>
                </dict>
              </template>
            </el-table-column>
            <!--<el-table-column-->
              <!--prop="description"-->
              <!--label="订单来源"-->
              <!--width="80">-->
            <!--</el-table-column>-->
            <el-table-column
              label="订单状态"
              width="80">
              <template slot-scope="{row}">
                <dict :dkey="row.status" code="OrderStatus">
                  <template slot-scope="{data}">
                   {{data.value}}
                  </template>
                </dict>
              </template>
            </el-table-column>
            <el-table-column
              prop="platformNumber"
              label="物流编号"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button v-if="0===row.status" type="text" @click="$refs.edt.edit(row.id)">修改价格</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </fm-grid>
      <order-edit @success="$refs.grid.search()" ref="edt"/>
    </el-container>

  </div>


</template>

<script>

  import OrderEdit from "./OrderEdit";

  export default {

    components:{OrderEdit},

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

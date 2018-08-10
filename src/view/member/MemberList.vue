<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      会员等级管理
    </el-row>
    <el-container direction="vertical">
      <fm-grid url="/member" ref="grid" method="get" :params="['kw','date','status']">


        <template slot-scope="{rows,loading,search}">

          <div class="filter-container">

            <el-row style="padding-bottom: 20px;">
              <span>输入搜索:</span>
              <el-input v-model="query.kw" style="width:200px;"/>
              <el-button @click="search(query,1)">查询结果</el-button>
              <div style="float:right">
                <el-button type="text"@click="$refs.ae.add()" >添加</el-button>
              </div>
            </el-row>

          </div>


          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            <el-table-column
              prop="memberName"
              label="会员名称"
              width="180">ss
            </el-table-column>
            <el-table-column
              prop="memberPrice"
              label="会员价格"
              width="100">
            </el-table-column>
            <el-table-column
              label="折扣"
              width="180">
              <template slot-scope="{row}">
                {{row.memberDiscount | percent}}
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="创建时间"
              width="180">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button type="text" @click="$refs.ae.edit(row.id)">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </fm-grid>
      <member-ae @success="$refs.grid.search()" ref="ae"/>
    </el-container>

  </div>


</template>

<script>

  import MemberAe from "./MemberAe";

  export default {

    components:{MemberAe},

    mounted() {
      this.$nextTick(() => {
        const {kw} = this.$route.query;
        this.query = {...this.query, kw};
      });
    },

    methods: {

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

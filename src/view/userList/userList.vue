<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      用户列表
    </el-row>

    <el-container direction="vertical">
      <fm-grid url="/user/getUserPage"  ref="grid" method="get" :params="['searchKeywords']">


        <template slot-scope="{rows,loading,search}">

          <div class="filter-container">

            <el-row style="padding-bottom: 20px;">
              <span>搜索：</span>
              <el-input v-model="query.searchKeywords" placeholder="输入昵称搜索" style="width:200px;"/>
              <el-button type="primary" @click="search(query,1)">搜索</el-button>
            </el-row>

            <el-row style="padding-bottom: 20px;">
              <span style="font-size:20px">数据列表</span>
              <span style="padding-left: 1000px;">
              <el-button @click="exportData()">导出数据</el-button>999
              </span>
            </el-row>

          </div>
          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="25">
            </el-table-column>
            <el-table-column
              prop="user.id"
              label="用户ID"
              width="160">
            </el-table-column>
            <el-table-column
              prop="user.phone"
              label="用户账号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="user.nickName"
              label="用户昵称"
              width="200">
            </el-table-column>

            <el-table-column
              label="会员等级"
              width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.user.level===0">普通会员 </span>
                <span v-if="scope.row.user.level===1">铜牌会员 </span>
                <span v-if="scope.row.user.level===2">银牌会员 </span>
                <span v-if="scope.row.user.level===3">金牌会员 </span>
              </template>
            </el-table-column>

            <el-table-column
              prop="consumeCount"
              label="消费金额"
              width="200">
            </el-table-column>
            <el-table-column
              prop="orderCount"
              label="订单数量"
              width="200">
            </el-table-column>
            <el-table-column
              prop="integralCount"
              label="可用积分"
              width="200">
            </el-table-column>

            <el-table-column
              label="操作"
              width="300">
              <template slot-scope="{row}">
                <el-button type="text" @click="showDetail(row.user.id)">查看 </el-button>
                <el-button type="text" @click="toEditPage(row.user.id)">编辑</el-button>
                <el-button type="text" @click="del(row.user.id)">删除</el-button>
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
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {

    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      del(id) {
        this.$axios.post('/user/deleteUserById', this.$axios.form({userId: id}))
          .then(({data}) => {
            this.$refs.grid.search();
            this.loadCount();
          });
      },

      toEditPage(id) {
        this.$router.push({path: '/editUser', query: {userId: id}})
      },

      showDetail(id) {
        this.$router.push({path: '/userDetail', query: {detailUserId: id}})
      },

      gSearch(status) {
        this.$refs.grid.search({...this.query, status}, 1);
      },

      //导出数据
      exportData() {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '用户列表.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
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

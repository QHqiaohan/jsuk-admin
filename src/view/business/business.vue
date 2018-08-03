<template>

  <div>
    <el-container direction="vertical">
      <fm-grid url="/shopUser/list" @init-data="initData" ref="grid" method="get"
               :params="['userName','name','sectionTime']">
        <template slot-scope="{rows,loading,search}">
          <div class="filter-container">
            <el-row style="padding-bottom: 20px;">
              <span>商户账号:</span>
              <el-input v-model="query.userName" placeholder="用户账号" style="width:200px;"/>
              <span>法人姓名:</span>
              <el-input v-model="query.name" placeholder="法人姓名" style="width:200px;"/>
              <span>注册时间:</span>
              <el-date-picker
                v-model="query.sectionTime"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
              <el-button @click="search(query,1)">查询结果</el-button>
              <el-button @click="exportShopUsers()">导出选中数据</el-button>
            </el-row>

          </div>
          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            id="out-table"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="25">
            </el-table-column>
            <el-table-column
              prop="shopName"
              label="店铺名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户账号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="legalPersonName"
              label="法人姓名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="idCardNo"
              label="身份证号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="移动电话"
              width="100">
            </el-table-column>
            <el-table-column
              label="专题栏"
              width="180">
              <template slot-scope="scope">
                <span v-for="item in scope.row.modularPortals"> {{item.name}} <b
                  v-show="scope.row.modularPortals.length>1">-</b></span>
              </template>
            </el-table-column>
            <el-table-column
              label="状态"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.isCheck===0">待审核 </span>
                <span v-else-if="scope.row.isCheck===1">审核通过 </span>
                <span v-else>驳回 </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="mainImg"
              label="商户头像"
              width="80">
              <template slot-scope="scope">
                <img :src="scope.row.headImg" alt="" style="width: 50px;height: 50px">
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button type="text" @click="review(row.id,1)">审核通过</el-button>
                <el-button type="text" @click="review(row.id,0)">驳回</el-button>
                <el-button type="text" @click="del(row.id)">删除</el-button>
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
  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'

  export default {
    mounted() {
      this.$nextTick(() => {
        const {userName} = this.$route.query;
        const {name} = this.$route.query;
        const {sectionTime} = this.$route.query;
        this.query = {...this.query, userName, name, sectionTime};
        this.$shop.getCategories().then(categories => this.categories = categories);
        this.$shop.getBrands().then(brands => this.brands = brands);
        this.loadCount();
      });
    },

    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      loadCount() {
        this.$axios.get('/wgoods/allCount')
          .then(({data: {data}}) => {
            this.count = data;
          });
      },
      review(id, flag) {
        this.$axios.post('/shopUser/review', this.$axios.form({id, flag: flag}))
          .then(({data}) => {
            this.$refs.grid.search();
            this.loadCount();
          });
      },
      del(id) {
        this.$confirm(`确定要删除?`)
          .then(e => {
            this.$axios.post('/shopUser/del', this.$axios.form({id: id}))
              .then(({data}) => {
                this.$refs.grid.search();
                this.loadCount();
              });
          })
          .catch(e => {
          });
      },

      /*exportShopUsers(){
        this.$axios.get('/shopUser/export?ids=68')
          .then(({data}) => {
            this.$refs.grid.search();
            this.loadCount();
          });
      },*/
      exportShopUsers() {
        /* generate workbook object from table */
        var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))
        /* get binary string as output */
        var wbout = XLSX.write(wb, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {
          FileSaver.saveAs(new Blob([wbout], {type: 'application/octet-stream'}), '商户列表.xlsx')
        } catch (e) {
          if (typeof console !== 'undefined') console.log(e, wbout)
        }
        return wbout
      },
      initData(rows) {
        for (const {id, isShow} of rows) {
          this.switches[id] = isShow === 1;
        }
        for (const {id, starNumber} of rows) {
          this.values[id] = starNumber;
        }
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
        count: {},
        switches: {},
        values: {},
        value7: '',
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

<template>

  <div>
    <el-container direction="vertical">
      <fm-grid url="/wgoods/listEvaluate" ref="grid" method="get"
               :params="['kw','nickName','brandId','categoryId','status']">
        <template slot-scope="{rows,loading,search}">
          <div class="filter-container">
            <el-row style="padding-bottom: 20px;">
              <span>输入搜索:</span>
              <el-input v-model="query.kw" placeholder="评价关键词/商品名称" style="width:200px;"/>
              <span>用户昵称:</span>
              <el-input v-model="query.nickName" placeholder="输入用户昵称" style="width:200px;"/>
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
              width="180">
            </el-table-column>
            <el-table-column
              prop="userInfo.nickName"
              label="用户昵称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="goodsInfo.goodsName"
              label="商品名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="starNumber"
              label="评价"
              width="180">
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="评论时间"
              width="180">
            </el-table-column>
            <el-table-column
              label="是否显示"
              width="180">
              <template slot-scope="{row}">
                <el-switch v-model="switches[row.id]" @change="useChange(row.id,row)"></el-switch>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="{row}">
                <el-button type="text" @click="view(row.id)">查看</el-button>
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

  export default {

    mounted() {
      this.$nextTick(() => {
        const {kw} = this.$route.query;
        const {nickName} = this.$route.query;
        this.query = {...this.query, kw, nickName};
        this.$shop.getCategories().then(categories => this.categories = categories);
        this.$shop.getBrands().then(brands => this.brands = brands);
        this.loadCount();
      });
    },

    methods: {

      loadCount() {
        this.$axios.get('/wgoods/allCount')
          .then(({data: {data}}) => {
            this.count = data;
          });
      },

      view(id) {
        this.$axios.post('/wgoods/upper', this.$axios.form({goodsId: id}))
          .then(({data}) => {
            this.$refs.grid.search();
            this.loadCount();
          });
      },
      del(id) {
        this.$confirm(`确定要删除?`)
          .then(e => {
            this.$axios.post('/wgoods/evaluate/del', this.$axios.form({evaluateId: id}))
              .then(({data}) => {
                this.$refs.grid.search();
                this.loadCount();
              });
          })
          .catch(e => {
          });
      },

      categoryChange() {

      },
      useChange(id, {goodsEvaluate}) {
        const name = ((goodsEvaluate && goodsEvaluate.userInfo.nickName)) || '';
        if (this.switches[id] === false) {
          this.$confirm(`确定要禁用${name}?`).then(e => {
            this.$axios.post('/wgoods/evaluate', this.$axios.form({id, isShow: 0}))
              .then(() => {
                this.$refs.grid.search();
              });
          }).catch(e => {
          })
        } else {
          this.$axios.post('/wgoods/evaluate', this.$axios.form({id, isShow: 1}))
            .then(() => {
              this.$refs.grid.search();
            });
        }
      },
      initData(rows) {
        for (const {id, isShow} of rows) {
          this.switches[id] = isShow === 1;
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
      }
    }
  }


</script>

<style>

</style>

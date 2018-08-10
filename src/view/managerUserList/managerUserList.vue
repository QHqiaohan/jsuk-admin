<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      成员管理
    </el-row>

    <el-container direction="vertical">
      <fm-grid url="/managerUser/getManagerUserList"  @init-data="initData" ref="grid" method="get" :params="['username']">


        <template slot-scope="{rows,loading,search}">

          <div class="filter-container">

            <el-row style="padding-bottom: 20px;">
              <span>输入搜索：</span>
              <el-input v-model="query.username" placeholder="用户名/姓名" style="width:200px;"/>
              <el-button type="primary" @click="search(query,1)">搜索</el-button>
            </el-row>

            <el-row style="padding-bottom: 20px;">
              <span style="font-size:20px">成员列表</span>
              <span style="padding-left: 1000px;">
              <router-link to="/addManagerUser"><el-button>添加</el-button></router-link>
              </span>
            </el-row>

          </div>
          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            <el-table-column
              prop="phone"
              label="成员账号"
              width="160">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="200">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="账号"
              width="200">
            </el-table-column>

            <el-table-column
              prop="userType"
              label="类型"
              width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.userType===1">平台 </span>
                <span v-if="scope.row.userType===2">商家 </span>
              </template>
            </el-table-column>

            <el-table-column
              prop="createTime"
              label="添加时间"
              width="200">
            </el-table-column>

            <el-table-column
              label="是否启用"
              width="200">
<!--              <template slot-scope="{row}">
                <el-switch
                  active-text ="是"
                  inactive-text = "否"
                  active-color="#5B7BFA"
                  inactive-color="#dadde5"
                  v-model="switches[row.canUse]"
                  @change="setCanUse(row.id,row.canUse)" >
                </el-switch>
              </template>-->
              <template slot-scope="{row}">
                <el-switch v-model="switches[row.id]" @change="useChange(row.id)"></el-switch>
              </template>
            </el-table-column>

            <el-table-column
              label="操作"
              width="300">
              <template slot-scope="{row}">
                <!--<el-button type="text" @click="menuSetting(row.id)">权限设置 </el-button>-->
                <el-button type="text" @click="toEditPage(row.id)">编辑</el-button>
                <el-button type="text" @click="del(row.id)">删除</el-button>
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
  // import goodsEdit from './goodsEdit';

  export default {
/*   components: {goodsEdit},
    mounted() {
      this.$nextTick(() => {
        const {kw} = this.$route.query;
        this.query = {...this.query, kw};
        this.$shop.getCategories().then(categories => this.categories = categories);
        this.$shop.getBrands().then(brands => this.brands = brands);
        this.loadCount();
      });
    },*/

    methods: {
      del(id) {
        this.$axios.post('/managerUser/deleteManagerUserById', this.$axios.form({managerUserId: id}))
          .then(({data}) => {
            this.$refs.grid.search();
            this.loadCount();
          });
      },

      toEditPage(id) {
        /*this.$axios.post('/managerUser/selectManagerUserById', this.$axios.form({managerUserId: id}))
          .then(({data}) => {*/
            this.$router.push({path: '/editManagerUser', query: {managerUserId: id}})
          //});
      },

/*      setCanUse(id,canUse) {
        this.$axios.post('/managerUser/setCanUse', this.$axios.form({userId: id,can_user:canUse}))
          /!*.then(({data}) => {
            this.$refs.grid.search();
            this.loadCount();
          });*!/
      },*/

      useChange(id) {
        alert(id);
        if (this.switches[id] == false) {
          this.$confirm(`确定要禁用?`).then(e => {
            this.$axios.post('/managerUser/setCanUse', this.$axios.form({user_id:id, canUse: 0}))
              .then(() => {
                this.$refs.grid.search();
              });
          });
        } else {
          this.$axios.post('/managerUser/setCanUse', this.$axios.form({user_id:id, canUse: 1}))
            .then(() => {
              this.$refs.grid.search();
            });
        }
      },

      initData(rows) {
        for (const {id, canUse} of rows) {
          this.switches[id] = canUse == 1;
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
        switches: {},
        count: {}
      }
    }
  }


</script>

<style>

</style>

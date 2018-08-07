<template>

  <!--"/distribution/orderDetails?id=" +id-->
  <el-dialog :title="'用户详情' " :visible="visible" @close="visible = false" width="70%">
    <el-container direction="vertical">
      <fm-grid url="/distribution/orderDetails" ref="grid" method="get" :params="['id']">
        <template slot-scope="{rows,loading,search}">
          <el-table
            :data="rows"
            stripe
            v-loading="loading"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            <el-table-column
              prop="orderNo"
              label="订单编号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="publishTime"
              label="提交时间"
              width="220">
            </el-table-column>
            <el-table-column
              prop="user.phone"
              label="用户账号"
              width="200">
            </el-table-column>
            <el-table-column
              prop="price"
              label="订单金额"
              width="200">
            </el-table-column>
            <el-table-column
              prop="status"
              label="订单状态"
              width="180">
              <template slot-scope="scope">
                <span v-if="scope.row.status===0">取消 </span>
                <span v-else-if="0<scope.row.status<=3">待取货 </span>
                <span v-else-if="3<scope.row.status<5">已配送 </span>
                <span v-else>已完成 </span>
              </template>
            </el-table-column>
          </el-table>
        </template>

      </fm-grid>
    </el-container>
  </el-dialog>

</template>

<script>

  const form = () => {
    return {
      items: [],
    }
  };

  export default {
    // components:{DictItem},
    mounted() {
      this.$nextTick(() => {
        const {id} = this.$route.query;
        this.query = {...this.query, id};
      });
    },
    data() {
      return {
        type: 'add',
        loading: false,
        visible: false,
        fm: {},
        query: {},
        form: form(),
      }
    },

    methods: {
      view(id) {
        this.visible = true;
        /* this.fm.url = "/distribution/orderDetails?id=" + id;*/
        this.query.id = id;
        this.$refs.grid.search(this.query, 1);
        // this.visible = true;
      },
    }
  }
</script>
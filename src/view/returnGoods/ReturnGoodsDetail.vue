<template>

  <el-dialog title="退货详情" width="95%" :visible="visible" @close="visible = false">
    <el-table
      :data="sizes"
      stripe
      v-loading="loading"
      style="width: 100%;padding-bottom:20px;border-bottom:none;">
      <el-table-column
        label="商品图片"
        width="180">
        <template slot-scope="{row}">
          <img v-if="row.goodsInfo" style="width: 50px;height:50px; " :src="row.goodsInfo.mainImage"/>
        </template>
      </el-table-column>
      <el-table-column
        label="商品名称"
        width="180">
        <template slot-scope="{row}">
          {{row.goodsInfo && row.goodsInfo.goodsName}}
        </template>
      </el-table-column>
      <el-table-column
        prop="sizeName"
        label="商品规格"
        width="180">
      </el-table-column>
      <el-table-column
        label="数量"
        width="180">
        <template slot-scope="{row}">
          1
        </template>
      </el-table-column>
      <el-table-column
        prop="salesPrice"
        label="小计"
        width="180">
      </el-table-column>
    </el-table>
    <el-form :model="form" label-width="120px">
      <el-form-item label="服务单号">
        {{form.serviceCode}}
      </el-form-item>
      <el-form-item label="申请状态">
        {{form.status}}
      </el-form-item>
      <el-form-item label="订单号">
        {{form.orderInfo && form.orderInfo.orderNum}}
      </el-form-item>
      <el-form-item label="申请时间">
        {{form.createTime}}
      </el-form-item>
      <el-form-item label="用户账号">
        {{form.userName}}
      </el-form-item>
      <el-form-item label="订单价格">
        {{form.orderInfo && form.orderInfo.orderRealPrice}}
      </el-form-item>
      <el-form-item label="确认退款金额">
        {{form.price}}
      </el-form-item>
      <el-form-item label="退款方式">
        退回到原支付渠道
      </el-form-item>
      <el-form-item label="退款类型">
        取消订单
      </el-form-item>
      <el-form-item label="退款原因">
        {{form.refundReason}}
      </el-form-item>
      <el-form-item label="商家备注">
        <el-input v-model="form.shopComment"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="danger" :loading="loading" v-if="form.status === 0" @click="onRefuse">拒绝退货</el-button>
      <el-button type="primary" :loading="loading" v-if="form.status === 0" @click="onOk">确认退货</el-button>
      <el-button type="primary" :loading="loading" v-if="form.status === 1" @click="onComplete">完成</el-button>
    </div>
  </el-dialog>

</template>

<script>

  const form = () => {
    return {}
  };



  export default {



    data() {
      return {
        type: 'add',
        loading: false,
        visible: false,
        form: form(),
        sizes:[]
      };

    },

    methods: {

      onOk() {
        this.loading = true;
        this.$axios.patch('/userOrderService', this.$axios.form({id:this.form.id,status:1,shopComment:this.form.shopComment}))
          .then(() => {
            this.$message.success('开始退货成功');
            this.loading = false;
            this.$emit('success');
            this.visible = false;
          })
          .catch(e => this.loading = false);
      },

      onRefuse() {
        this.loading = true;
        this.$axios.patch('/userOrderService', this.$axios.form({id:this.form.id,status:3,shopComment:this.form.shopComment}))
          .then(() => {
            this.$message.success('拒绝退款成功');
            this.loading = false;
            this.$emit('success');
            this.visible = false;
          })
          .catch(e => this.loading = false);
      },

      onComplete() {
        this.loading = true;
        this.$axios.patch('/userOrderService', this.$axios.form({id:this.form.id,status:3,shopComment:this.form.shopComment}))
          .then(() => {
            this.$message.success('退货成功');
            this.loading = false;
            this.$emit('success');
            this.visible = false;
          })
          .catch(e => this.loading = false);
      },

      add() {
        this.visible = true;
        this.type = 'add';
        this.form = form();
      },

      edit(id) {
        this.visible = true;
        this.type = 'edit';
        this.$axios.get(`/userOrderService/get`, {params: {id}})
          .then(({data: {data}}) => {

            if(data.sizeInfo){
              this.sizes = [data.sizeInfo];
            }

            this.form = data;
          });
      }

    }
  }
</script>


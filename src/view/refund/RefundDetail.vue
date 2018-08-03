<template>

  <el-dialog title="退款详情" :visible="visible" @close="visible = false">
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
      <el-button type="danger" :loading="loading" v-if="form.status !== 2 && form.status !== 3" @click="onRefuse">拒绝退款</el-button>
      <el-button type="primary" :loading="loading" v-if="form.status !== 2 && form.status !== 3" @click="onOk">确认退款</el-button>
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
      };

    },

    methods: {

      onOk() {
        this.loading = true;
        this.$axios.patch('/userOrderService', this.$axios.form({id:this.form.id,status:2,shopComment:this.form.shopComment}))
          .then(() => {
            this.$message.success('退款成功');
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

            console.log(data);

            this.form = data;
          });
      }

    }
  }
</script>


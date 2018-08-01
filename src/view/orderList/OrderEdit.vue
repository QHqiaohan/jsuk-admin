<template>

  <el-dialog title="修改价格" :visible="visible" @close="visible = false">
    <el-form :model="form" label-width="80px">
      <el-form-item label="订单号">
        {{form.orderNum}}
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.orderRealPrice"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk">确 定</el-button>
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
        const exec = (this.type == 'add') ? this.$axios.put : this.$axios.patch;
        exec('/userOrder', this.$axios.form(this.form))
          .then(() => {
            this.$message.success(((this.type == 'add') ? '添加' : '修改') + '成功');
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
        this.$axios.get(`/userOrder/get`, {params: {id}})
          .then(({data: {data}}) => {
            this.form = data;
          });
      }

    }
  }
</script>


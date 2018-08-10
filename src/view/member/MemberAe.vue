<template>


  <el-dialog :title="'会员等级' + (type == 'add'?'添加':'编辑' )" :visible="visible" @close="visible = false">
    <el-form :model="form" label-width="80px">
      <el-form-item label="会员名称">
        <el-input v-model="form.memberName" style="width:200px"/>
      </el-form-item>
      <el-form-item label="会员价格">
        <el-input v-model="form.memberPrice" style="width:200px"/>
      </el-form-item>
      <el-form-item label="会员折扣">
        <el-input v-model="form.memberDiscount" style="width:200px"/>
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
        times: null
      };

    },

    methods: {

      onOk() {
        this.loading = true;
        const exec = (this.type == 'add') ? this.$axios.put : this.$axios.patch;
        exec('/member', this.$axios.form(this.form))
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
        this.times = null;
      },

      edit(id) {
        this.visible = true;
        this.type = 'edit';
        this.$axios.get(`/member/get`, {params: {id}})
          .then(({data: {data}}) => {
            this.form = data;
          });
      }

    }
  }
</script>


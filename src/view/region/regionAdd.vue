<template>


  <el-dialog :title="'添加区域' " :visible="visible" @close="visible = false">
    <el-form :model="form" label-width="80px">
      <el-form-item label="名称：">
        <el-input v-model="form.name"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk">提 交</el-button>
    </div>
  </el-dialog>

</template>

<script>

  const form = () => {
    return {
      items: []
    }
  }

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
        if (this.form.password === this.form.rePassword) {
          this.loading = true;
          const exec = this.$axios.patch;
          exec('/distribution', this.$axios.form(this.form))
            .then(() => {
              this.$message.success('修改成功');
              this.loading = false;
              this.$emit('success');
              this.visible = false;
            })
            .catch(e => this.loading = false);
        }else {
          this.$message.error('两次密码不一致');
        }
      }
      ,

      add() {
        this.visible = true;
        this.type = 'add';
        this.form = form();
      },

      edit(id) {
        this.visible = true;
        this.type = 'edit';
        this.$axios.get(`/distribution/get`, {params: {id}})
          .then(({data: {data}}) => {
            data.canUse = data.canUse === 1;
            this.$set(data,'gender',data.gender)
            // data.gender = parseInt(data.gender);
            this.form = data;
          });
      }

    }
  }
</script>


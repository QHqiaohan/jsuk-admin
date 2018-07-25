<template>


  <el-dialog :title="'秒杀时间段' + (type == 'add'?'添加':'编辑' )" :visible="visible" @close="visible = false">
    <el-form :model="form" label-width="80px">
      <el-form-item label="名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="起止时间">
        <el-time-picker
          v-model="form.startTime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="开始时间">
        </el-time-picker>
        <el-time-picker
          arrow-control
          value-format="yyyy-MM-dd HH:mm:ss"
          v-model="form.endTime"
          placeholder="结束时间">
        </el-time-picker>
      </el-form-item>
      <el-form-item label="启用">
        <el-switch v-model="form.isUse"></el-switch>
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
    return {
      items: []
    }
  }

  export default {

    // components:{DictItem},

    data() {
      return {
        type: 'add',
        loading: false,
        visible: false,
        form: form(),
        value2: new Date(2016, 9, 10, 18, 40),
        value3: new Date(2016, 9, 10, 18, 40)
      };

    },

    methods: {

      onOk() {
        this.loading = true;
        const exec = (this.type == 'add') ? this.$axios.put : this.$axios.patch;
        exec('/shopRushBuy', this.$axios.form(this.form))
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
        this.$axios.get(`/shopRushBuy/get`,{params:{id}})
          .then(({data:{data}}) => {
            data.isUse = data.isUse == 1;
            this.form = data;
          });
      }

    }
  }
</script>


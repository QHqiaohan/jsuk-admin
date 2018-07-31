<template>

  <el-dialog :title="'查看评价'" :visible="visible" @close="visible = false">
    <el-form :model="form" label-width="80px">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
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
      view(id) {
        this.visible = true;
        this.$axios.get(`/wgoods/evaluate/getById`, {params: {evaluateId:id}})
          .then(({data: {data}}) => {
            console.log(data);
            // data.isUse = data.isUse == 1;
            this.form = data;
          });
      }

    }
  }
</script>


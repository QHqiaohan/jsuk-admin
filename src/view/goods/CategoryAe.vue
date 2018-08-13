<template>


  <el-dialog :title="'分类' + (type == 'add'?'添加':'编辑' )" :visible="visible" @close="visible = false">
    <el-form :model="form" label-width="80px">
      <el-form-item label="id">
        <el-input disabled v-model="form.id"/>
      </el-form-item>
      <el-form-item label="parentId">
        <el-input disabled v-model="form.parentId"/>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="upload-demo"
          action="/api/v1/upload/imgToOSS"
          :file-list="fileList"
          :on-remove="onRemove"
          :on-success="onSuccess"
          list-type="picture">
          <el-button type="primary" v-if="fileList.length == 0">点击上传</el-button>
        </el-upload>
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
        fileList: []
      };

    },

    methods: {

      onOk() {
        this.loading = true;
        const exec = (this.type == 'add') ? this.$axios.put : this.$axios.patch;
        exec('/goodsCategory', this.$axios.form({...this.form,pic:this.fileList[0] && this.fileList[0].url}))
          .then(() => {
            this.$message.success(((this.type == 'add') ? '添加' : '修改') + '成功');
            this.loading = false;
            this.$emit('success');
            this.visible = false;
          })
          .catch(e => this.loading = false);
      },

      add(parentId) {
        this.visible = true;
        this.type = 'add';
        this.form = form();
        this.form.parentId = parentId;
        this.fileList = [];
      },

      onSuccess({data}){
        data && (this.fileList = [{
          name: (data || '').match(/[^\/]+$/)[0],
          url: data
        }]);

      },

      onRemove() {
        this.fileList = [];
      },

      edit(item) {
        this.visible = true;
        this.type = 'edit';
        this.form = item;
        item.icon && (this.fileList = [{
          name: (item.icon || '').match(/[^\/]+$/)[0],
          url: item.icon
        }]);
      }

    }
  }
</script>


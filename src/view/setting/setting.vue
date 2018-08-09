<template>

  <div>
    <el-row style="padding-bottom: 20px;">
      跑腿费计算规则
    </el-row>

    <div class="container">
      <div class="form-box">
        <el-form :model="RunningFee" status-icon ref="RunningFee" label-width="150px" class="demo-ruleForm">

          <el-form-item label="起步距离："  prop="startDistance">
            <el-input  v-model="RunningFee.startDistance"></el-input>
          </el-form-item>

          <el-form-item label="起始费用：" prop="startFee">
            <el-input  v-model="RunningFee.startFee"></el-input>
          </el-form-item>

          <el-form-item label="每公里增加费用：" prop="addFee">
            <el-input  v-model="RunningFee.addFee"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"  @click="submit">保存</el-button>
            <el-button  @click="init">取消</el-button>
          </el-form-item>

        </el-form>

      </div>
    </div>
  </div>


</template>

<script>
  export default {
    mounted() {
      this.init();
    },
    data() {
      return {
        RunningFee: {},
      };
    },
    methods: {
      init() {
        this.$axios.get('/runningFee')
          .then(({data: {data}}) => {
            this.RunningFee = data;
          })
      },
      submit() {

        const load = () => {
          setTimeout(this.loading = false, 200);
        };

        this.loading = true;
        this.$axios.post('/runningFee', this.$axios.form(this.RunningFee))
          .then(() => {
            this.$message.success('保存成功！');
            load();
          })
          .catch(load)
      }
    }
  }
</script>

<style>

</style>

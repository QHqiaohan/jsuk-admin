<template>
  <div>
    <el-row style="padding-bottom: 20px;">
      积分设置
    </el-row>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="120px">
          <el-form-item label="积分抵扣比例">
            <el-input style="width: 100px;" v-model="form.integral"/>
            积分 =
            <el-input style="width: 100px;" v-model="form.deduction"/>
            人民币
          </el-form-item>
          <el-form-item label="积分订单比例">
            <el-input style="width: 100px;" v-model="form.consumption"/>
            人民币 获得
            <el-input style="width: 100px;" v-model="form.gainIntegral"/>
            积分
          </el-form-item>
          <!--<el-form-item label="发货超过">-->
            <!--<el-input style="width: 250px;" v-model="form.autoComplete"/>-->
            <!--未收货，订单自动完成-->
          <!--</el-form-item>-->
          <!--<el-form-item label="订单完成超过">-->
            <!--<el-input style="width: 250px;" v-model="form.confirmReceived"/>-->
            <!--自动结束交易，不能申请售后-->
          <!--</el-form-item>-->
          <!--<el-form-item label="订单完成超过">-->
            <!--<el-input style="width: 250px;" v-model="form.autoComment"/>-->
            <!--自动五星好评-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="submit">表单提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>

  const form = () => {
    return {};
  };

  export default {

    mounted() {
      this.$nextTick(() => {
        this.$axios.get('/integralRule')
          .then(({data: {data}}) => {
            this.form = data;
          })

      })
    },

    data: function () {
      return {
        form: form(),
        loading: false
      }
    },
    methods: {

      submit() {

        const load = () => {
          setTimeout(this.loading = false, 200);
        };

        this.loading = true;
        this.$axios.patch('/integralRule', this.$axios.form(this.form))
          .then(() => {
            this.$message.success('提交成功！');
            load();
          })
          .catch(load)

      }

    }
  }
</script>
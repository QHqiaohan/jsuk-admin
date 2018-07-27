<template>

  <el-dialog :title="'秒杀活动列表' + (type == 'add'?'添加':'编辑' )" :visible="visible" @close="visible = false">
    <el-form :model="form" label-width="80px">
      <el-form-item label="店铺">
        <shop-select v-model="form.shopId"/>
      </el-form-item>
      <el-form-item label="商品">
        <goods-select :shop-id="form.shopId" v-model="form.goodsId"/>
      </el-form-item>
      <el-form-item label="规格">
        <goods-size-select :goods-id="form.goodsId" v-model="form.goodsSizeId"/>
      </el-form-item>
      <el-form-item label="起止时间">
        <rush-time-select v-model="form.rushBuyId"/>
      </el-form-item>
      <!--<el-form-item label="启用">-->
        <!--<el-switch v-model="form.isUse"></el-switch>-->
      <!--</el-form-item>-->
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

  import ShopSelect from "@/components/shop/ShopSelect";
  import GoodsSelect from "@/components/shop/GoodsSelect";
  import GoodsSizeSelect from "@/components/shop/GoodsSizeSelect";
  import RushTimeSelect from "@/components/shop/RushTimeSelect";

  export default {

    components: {ShopSelect, GoodsSelect, GoodsSizeSelect, RushTimeSelect},

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
        exec('/shopRushBuyActivity', this.$axios.form(this.form))
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
        this.$axios.get(`/shopRushBuyActivity/get`, {params: {id}})
          .then(({data: {data}}) => {
            console.log(data);
            data.isUse = data.isUse == 1;
            this.form = data;
          });
      }

    }
  }
</script>


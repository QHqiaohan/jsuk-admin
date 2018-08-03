<template>

  <el-dialog :title="'秒杀活动列表' + (type == 'add'?'添加':'编辑' )" :visible="visible" @close="visible = false">
    <el-form :model="form" label-width="80px">
      <el-form-item label="起止时间">
        <rush-time-select v-model="form.rushBuyId"/>
      </el-form-item>
      <el-form-item label="店铺">
        <shop-select v-model="form.shopId"/>
      </el-form-item>
      <el-form-item label="商品">
        <goods-select :shop-id="form.shopId" v-model="form.goodsId"/>
      </el-form-item>

      <goods-sizes-select v-model="form.sizes" :goods-id="form.goodsId" @init-items="initItems">
        <template slot-scope="{items}">
          <el-tabs v-model="tab" type="card">
            <el-tab-pane v-for="size in items" :key="size.id" :label="size.sizeName"  :name="String(size.id)">
              <el-form-item label="库存">
                {{size.stock}}
              </el-form-item>
              <el-form-item label="原价">
                {{size.originalPrice}}
              </el-form-item>
              <el-form-item label="售价">
                {{size.salesPrice}}
              </el-form-item>
              <el-form-item label="秒杀价格">
                <el-input style="width: 225px;" v-model="size.killPrice"/>
              </el-form-item>
              <el-form-item label="秒杀库存">
                <el-input style="width: 225px;" v-model="size.killStock"/>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
          <span v-if="items.length == 0">(没有规格信息)</span>
        </template>
      </goods-sizes-select>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" :disabled="!form.sizes.length" :loading="loading" @click="onOk">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>

  const form = () => {
    return {
      sizes:[]
    }
  };

  import ShopSelect from "@/components/shop/ShopSelect";
  import GoodsSelect from "@/components/shop/GoodsSelect";
  import GoodsSizesSelect from "@/components/shop/GoodsSizesSelect";
  import RushTimeSelect from "@/components/shop/RushTimeSelect";

  export default {

    components: {ShopSelect, GoodsSelect, GoodsSizesSelect, RushTimeSelect},

    data() {
      return {
        type: 'add',
        loading: false,
        visible: false,
        form: form(),
        tab:null
      };

    },

    methods: {

      onOk() {
        this.loading = true;
        const exec = (this.type == 'add') ? this.$axios.put : this.$axios.patch;
        exec('/shopRushBuyActivity', this.form)
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
            this.form = data;
          });
      },

      initItems(items){
        this.tab = String(items[0] && items[0].id||'');
      }

    }
  }
</script>


<template>

  <el-select v-model="goodsId"
             :clearable="true"
             @change="change"
             placeholder="请选择">
    <el-option
      v-for="item in items"
      :key="item.id"
      :label="item.goodsName"
      :value="item.id">
      <!--<p style="float: left">{{ item.goodsName }}</p>-->
      <!--<div style="height:30px;width:100%;">-->
      <!--<img :src="item.goodsImg"/>-->
      <!--</div>-->
    </el-option>
  </el-select>

</template>

<script>

  import _ from "lodash";

  export default {

    props: ['value', 'shopId'],

    mounted() {
      this.$nextTick(this.load);
    },

    watch: {

      value(newVal){
        this.updateVal(newVal);
      },

      shopId() {
        this.load();
      }

    },

    data() {
      return {
        items: [],
        goodsId: null,

        updateVal:_.debounce((va)=>{
          this.goodsId = va;
        },50),

        load:_.debounce(() =>{
          this.$axios.get('/shopGoods/list', {params: {shopId: this.shopId}})
            .then(({data: {data}}) => {
              this.items = data;
            })
        },500),
      }
    },

    methods: {

      change(val) {
        this.$emit('input', val);
      }

    }


  }


</script>

<style>

</style>

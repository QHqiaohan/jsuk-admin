


<template>

  <el-select v-model="shopId"
             :clearable="true"
             @change="change"
             placeholder="请选择">
    <el-option
      v-for="item in shops"
      :key="item.id"
      :label="item.shopName"
      :value="item.id">
    </el-option>
  </el-select>

</template>

<script>

  export default {

    props:['value'],

    mounted(){

      this.$nextTick(()=>{
        this.shopId = this.value;
        this.$shop.getShops().then(shops => this.shops = shops);
      });


    },

    watch:{

      value(newVal){
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(()=>{
          if(!newVal){
            this.shopId = null;
          }
          if(!this.isSelf()){
            this.shopId = newVal;
          }
        },50);
      }

    },

    data(){
      return {
        shops:[],
        shopId:null,
        self:false,
        timeOut:null
      }
    },

    methods:{

      change(val){
        this.prevent();
        this.$emit('input',val);
      },

      prevent(){
        this.self = true;
        setTimeout(()=> this.self = false,200);
      },

      isSelf(){
        return this.self;
      }

    }



  }


</script>

<style>

</style>

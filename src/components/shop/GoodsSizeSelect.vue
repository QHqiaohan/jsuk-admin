


<template>

  <el-select v-model="goodsSizeId"
             :clearable="true"
             @change="change"
             placeholder="请选择">
    <el-option
      v-for="item in items"
      :key="item.id"
      :label="item.sizeName"
      :value="item.id">
      <!--<p style="float: left">{{ item.goodsName }}</p>-->
      <!--<div style="height:30px;width:100%;">-->
        <!--<img :src="item.goodsImg"/>-->
      <!--</div>-->
    </el-option>
  </el-select>

</template>

<script>

  export default {

    props:['value','goodsId'],

    mounted(){

      this.$nextTick(this.load);

    },

    watch:{

      value(newVal){
        clearTimeout(this.vTimeOut);
        this.vTimeOut = setTimeout(()=> {
          if(!this.self){
            this.goodsSizeId = newVal;
          }
        },50);
      },

      goodsId(){
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(() =>{
          this.load();
        },50);
      }

    },

    data(){
      return {
        items:[],
        goodsSizeId:null,
        timeOut:null,
        vTimeOut:null,
        self:false
      }
    },

    methods:{

      prevent(){
        this.self = true;
        setTimeout(()=>this.self = false,200);
      },

      load(){
        if(!this.goodsId)
          return;
        this.$axios.get('/shopGoodsSize/list',{params:{goodsId:this.goodsId}})
          .then(({data:{data}})=>{
            console.log(data);
            this.items = data;
          })

      },

      change(val){
        this.prevent();
        this.$emit('input',val);
      }

    }



  }


</script>

<style>

</style>

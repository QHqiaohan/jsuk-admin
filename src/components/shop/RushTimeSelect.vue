


<template>

  <el-select v-model="id"
             :clearable="true"
             @change="change"
             placeholder="请选择">
    <el-option
      v-for="item in items"
      :key="item.id"
      :label="item.name"
      :value="item.id">
      <span>{{item.name}}&nbsp;({{item.startTime|time}} - {{item.endTime|time}})</span>
    </el-option>
  </el-select>

</template>

<script>

  export default {

    props:['value'],

    mounted(){

      this.$nextTick(this.load);


    },

    watch:{

      value(newVal){
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout(()=>{
          if(!self){
            this.id = newVal;
          }
        },50);
      }

    },

    data(){
      return {
        items:[],
        id:null,
        timeOut:null,
        self:false
      }
    },

    methods:{

      load(){
        this.$axios.get('/shopRushBuy/list')
          .then(({data:{data}})=>{
            console.log(data);
            this.items = data;
          })

      },

      prevent(){
        this.self = true;
        setTimeout(()=>this.self = false,200);
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




<template>

  <el-select v-model="labelId"
             @change="change"
             placeholder="请选择">
    <el-option
      v-for="item in labels"
      :key="item.id"
      :label="item.label"
      :value="item.id">
    </el-option>
  </el-select>

</template>

<script>

  export default {

    props:["value"],

    mounted(){

      this.$nextTick(()=>{
          this.$shop.getLabels().then(labels => this.labels = labels);
      });

    },

    methods:{

      change(va){
        this.$emit('input',va);
      }

    },

    data(){
      return {
        labels:[],
        labelId:null
      }
    },



  }


</script>

<style>

</style>

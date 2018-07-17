


<template>

  <el-select v-model="attributeId"
             :clearable="true"
             @change="change"
             placeholder="请选择">
    <el-option
      v-for="item in attributes"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>

</template>

<script>

  export default {

    props:['value'],

    mounted(){

      this.$nextTick(()=>{
        this.attributeId = this.value;
        this.$shop.getAttributes().then(attributes => this.attributes = attributes);
      });


    },

    watch:{

    },

    data(){
      return {
        attributes:[],
        attributeId:null
      }
    },

    methods:{

      change(val){
        this.$emit('input',val);
      }

    }



  }


</script>

<style>

</style>




<template>

  <el-select v-model="id"
             :clearable="true"
             @change="change"
             placeholder="请选择">
    <el-option
      v-for="item in items"
      :key="item.id"
      :label="parseLabel(item)"
      :value="item.id">
      <span>{{item.startTime|time}} - {{item.endTime|time}}</span>
    </el-option>
  </el-select>

</template>

<script>

  import _ from "lodash";

  export default {

    props:['value'],

    mounted(){

      this.$nextTick(this.load);

    },

    watch:{

      value(newVal){
        this.updateVal(newVal);
      }

    },

    data(){
      return {
        items:[],
        id:null,

        updateVal:_.debounce((va)=>{
          this.id = va;
        },50),

        load:_.debounce(()=>{
          this.$axios.get('/shopRushBuy/list')
            .then(({data:{data}})=>{
              this.items = data;
            })
        },50)

      }
    },

    methods:{

      parseLabel(item){
        return this.$pub.time(item.startTime) + '-' + this.$pub.time(item.endTime);
      },

      change(val){
        this.$emit('input',val);
      }

    }



  }


</script>

<style>

</style>

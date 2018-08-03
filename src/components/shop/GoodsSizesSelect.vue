<template>
  <div>
    <slot :items="items"></slot>
  </div>
</template>

<script>

  import _ from "lodash";

  export default {

    props: ['value', 'goodsId'],

    mounted() {
      this.$nextTick(this.load);
    },

    watch: {

      items: {
        deep: true,
        handler(newVal) {
          this.itemChange(newVal);
        }
      },

      goodsId() {
        this.load();
      }

    },

    data() {
      return {
        items: [],
        self: false,
        load:_.debounce(this._load,50),
        itemChange: _.debounce((newVal)=>{
          if(this.self){
            return;
          }
          this.$emit('input',newVal);
        },200)
      }
    },

    methods: {

      prevent() {
        this.self = true;
        setTimeout(() => this.self = false, 200);
      },

      _load() {
        if (!this.goodsId) {
          this.items = [];
          return;
        }
        this.$axios.get('/shopGoodsSize/sizes', {params: {goodsId: this.goodsId}})
          .then(({data: {data}}) => {
            this.$emit('init-items', data);
            this.prevent();
            this.items = data;
          })

      }

    }


  }


</script>

<style>

</style>

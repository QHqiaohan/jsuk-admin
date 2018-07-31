<template>
  <div>
    <slot :data="data"></slot>
  </div>
</template>


<script>

  export default {

    mounted() {
      this.load().then(()=>{
        this.update(this.dkey);
      });
    },

    watch: {

      dkey(newVal) {
        // console.log(newVal);
        this.load().then(() =>{
          this.update(newVal);
        });
      }

    },

    props: {

      code: {
        type: String
      },

      type: {
        type: String,
        default: 'enum'
      },

      dkey: {
        type: [String, Number,undefined]
      },

      keyName: {
        type: String,
        default: 'key'
      }

    },

    methods: {

      async load() {
        if (!this.datas) {
          this.datas = await this.$dict.load(this.type, this.code);
        }
      },

      update(key) {
        clearTimeout(this.tmr);
        this.tmr = setTimeout(() => {
          // debugger
          // console.log(key);
          if((!key || key == null || key === 'null')&& key !== 0){
            // debugger
            if(this.data){
              for(const i in this.data){
                this.data[i] = null;
              }
            }else {
              this.data = {};
            }
            return;
          }
          for (const i in this.datas) {
            const dt = this.datas[i];
            if (key == dt[this.keyName]) {
              this.data = dt;
              break;
            }
          }
        }, 50);
      }

    },

    data() {
      return {
        datas: null,
        tmr: null,
        data: {}
      }
    }


  }

</script>


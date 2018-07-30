<template>
  <div>
    <slot :data="data"></slot>
  </div>
</template>


<script>

  export default {

    mounted() {
      if (this.dkey) {
        this.load();
      }
    },

    watch: {

      dkey(newVal) {
        if (newVal) {
          this.load();
        }
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
        type:[String,Number]
      }

    },

    methods: {

      async load() {
        const data = await this.$dict.load(this.type, this.code);
        for (const dt of data) {
          if (this.dkey === dt.key) {
            this.data = dt;
            break;
          }
        }
      }

    },

    data() {
      return {
        data: {}
      }
    }


  }

</script>


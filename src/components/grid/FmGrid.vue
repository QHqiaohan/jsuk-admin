<template>

  <div>
    <slot :rows="rows" :loading="loading" :search="search"></slot>
    <el-row>
      <el-pagination
        ref="pgn"
        style="border-top:none;float:right;padding-right:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <!-- <fm-pagination
        style="border-top:none;float:right;padding-right:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </fm-pagination> -->
    </el-row>
  </div>

</template>

<script>

  let _timer = null;
  const delayToRun = (func) => {
    clearTimeout(_timer);
    _timer = setTimeout(func, 50);

  };

  export default {

    name: 'FmGrid',

    props: ['url', 'params', 'method','fparams'],

    data() {
      return {
        __pr_dft: false,
        __tim_out: null,
        page: 1,
        size: 10,
        total: 0,
        loading: false,
        rows: [],
        query: {}
      }
    },

    beforeMount() {
      const pg = this.$route.query.page;
      if (pg) {
        this.page = parseInt(pg);
      }
    },

    mounted() {
      this.$nextTick(this.search);
    },

    methods: {

      search({page, size, ...params} = {}, pg) {

        delayToRun(() => {

          const {query} = this.$route;
          const method = this.method || 'get';
          const url = this.url;
          pg && (page = pg);
          if (!page && query.page) {
            page = parseInt(query.page)
          }
          if (!size && query.size) {
            size = parseInt(query.size)
          }
          page || (page = this.page);
          size || (size = this.size);
          this.size = size;
          this.page = page;
          // this.__pr_dft = true;
          // setTimeout(() => {
          //   this.__pr_dft = false
          // }, 500);
          if (!url) {
            throw new Error('url不能为空！');
          }
          if (page <= 0) {
            page = 1
          }
          if (size < 1 || size > 200) {
            size = 10
          }
          params = {...query, ...params, page, size};
          // params.current = params.page;
          // delete params.page;
          let only = this.params;
          if (only && typeof only == 'object' && only.length > 0) {
            let oly = {}
            for (let i in only) {
              oly[only[i]] = undefined
            }
            for (let i in params) {
              if (i == 'page' || i == 'size') {
                continue
              }
              if (!(i in oly)) {
                delete params[i]
              }
            }
          }
          params = {...params,...this.fparams, page, size}
          for (let i in params) {
            if (!params[i])
              delete params[i]
          }
          this.$router.push({query: params});
          this.loading = true;

          this.$axios({
            url,
            method,
            params: {...params, current: params.page, page: undefined},
            paramsSerializer: this.$pub.toQuery
          }).then((dt) => {
            const {data: {data}, status} = dt;
            if (status !== 200) return;
            const {records, total} = data;
            records && (this.rows = records);
            total && (this.total = total);
          }).catch(e => {
          }).finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 500)
          })

        });


      },
      handleSizeChange(size) {
        this.search({size})
      },

      handleCurrentChange(page) {
        // if (this.__pr_dft) {
        //   this.__pr_dft = false
        //   return
        // }
        this.search({page})
      }

    }
  }
</script>


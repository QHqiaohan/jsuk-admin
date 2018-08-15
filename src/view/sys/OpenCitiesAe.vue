<template>


  <el-dialog :title="'开通城市' + (type == 'add'?'添加':'编辑' )" :visible="visible" @close="visible = false">
    <el-form :model="form" label-width="80px">
      <el-form-item label="城市">
        <el-cascader
          ref="cities"
          :options="cities"
          v-model="city"
          :props="{value:'id',label:'name',children:'cities'}"
          @change="handleChange"
          expand-trigger="hover"
          :clearable="true"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="天气请求名称">
        <el-select v-model="form.weatherCityId" placeholder="请选择">
          <el-option
            v-for="item in wCities"
            :key="item.areaId"
            :label="item.countyName"
            :value="item.areaId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="onOk">确 定</el-button>
    </div>
  </el-dialog>

</template>

<script>

  const form = () => {
    return {}
  };

  export default {

    mounted() {

      this.$shop.getCities().then(cities => {
        this.cities = cities;
      });
      this.$shop.getWCities().then(cts => {
        this.wCities = cts;
      });

    },

    data() {
      return {
        type: 'add',
        loading: false,
        visible: false,
        form: form(),
        cities: null,
        wCities: null,
        city: null
      };

    },

    methods: {

      onOk() {
        this.loading = true;
        const exec = (this.type == 'add') ? this.$axios.put : this.$axios.patch;
        exec('/cities', this.$axios.form(this.form))
          .then(() => {
            this.$message.success(((this.type == 'add') ? '添加' : '修改') + '成功');
            this.loading = false;
            this.$emit('success');
            this.visible = false;
          })
          .catch(e => this.loading = false);
      },

      handleChange(dt) {
        this.form.cityId = dt[dt.length - 1];
        const city = this.$refs.cities.currentLabels[1];
        for (const wc of this.wCities) {
          if (wc.countyName == city.replace(/市/g, '')) {
            this.form.weatherCityId = wc.areaId;
          }
        }

      },

      add() {
        this.visible = true;
        this.type = 'add';
        this.form = form();
        this.times = null;
      },

      edit(id) {
        this.visible = true;
        this.type = 'edit';
        this.$axios.get(`/member/get`, {params: {id}})
          .then(({data: {data}}) => {
            this.form = data;
          });
      }

    }
  }
</script>


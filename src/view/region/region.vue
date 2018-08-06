<template>
  <div>
    <div class="cont">
      <p>省/自治区/直辖市</p>
      <ul>
        <li v-for="item in items1" @click="getCitys(item.id)">
          <span>{{item.provinceName}}</span>
        </li>
        <input type="button" style="font-size: 18px" @click="addAreas(1)" value="新 增"/>
      </ul>
    </div>
    <div class="cont">
      <p>地级市</p>
      <li v-for="item in items2" @click="getAreas(item.id) ">
        <span>{{item.cityName}}</span>
      </li>
      <li>
        <input type="button" style="font-size: 18px" @click="addAreas(2)" value="新 增"/>
      </li>
    </div>
    <div class="cont">
      <p>市辖区/县/县级市</p>
      <li v-for="item in items3">
        <span>{{item.areaName}}</span>
      </li>
      <input type="button" style="font-size: 18px" @click="addAreas(3)" value="新 增"/>
    </div>
    <el-dialog title="添加区域" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="父Id" :label-width="formLabelWidth" hidden>
          <el-input v-model="form.upperId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onOk()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items1: [],
        items2: [],
        items3: [],
        provinceId: 110000,
        cityId: 110100,
        addType: 1,
        form: {
          upperId: 0,
          name: '',
          delivery: false,
        },
        dialogFormVisible: false,
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.$axios.get('/region/getProvinces')
          .then(res => {
            if (res.status === 200) {
              console.log('res.data', res.data);
              if (res.data.code === 200) {
                this.items1 = res.data.data;
                console.log('this.items', this.items);
              }
            }
          })
      },
      getCitys(id) {
        this.provinceId = id;
        this.$axios.get('/region/getCitys?provinceId=' + id)
          .then(res => {
            if (res.status === 200) {
              console.log('res.data', res.data);
              if (res.data.code === 200) {
                this.items2 = res.data.data;
                console.log('this.items', this.items);
              }
            }
          });

      },
      getAreas(id) {
        this.cityId = id;
        this.$axios.get('/region/getAreas?cityId=' + id)
          .then(res => {
            if (res.status === 200) {
              console.log('res.data', res.data);
              if (res.data.code === 200) {
                this.items3 = res.data.data;
                console.log('this.items', this.items);
              }
            }
          });
      },
      addAreas(type) {
        this.dialogFormVisible = true;
        if (type === 2) {
          this.form.upperId = this.provinceId;
          this.addType = 2;
        }
        if (type === 3) {
          this.form.upperId = this.cityId;
          this.addType = 3;
        }
      },
      onOk() {
        if (this.addType === 1) {
          this.$axios.post('/region/addProvinces?name=' + this.form.name)
            .then(res => {
              if (res.status === 200) {
                if (res.data.code === 200) {
                  this.init();
                  this.$message.success('添加成功');
                }
              }
            });
          this.dialogFormVisible = false;
        }
        if (this.addType === 2) {
          this.$axios.post('/region/addCity?name=' + this.form.name + '&upperId=' + this.form.upperId)
            .then(res => {
              if (res.status === 200) {
                if (res.data.code === 200) {
                  this.getCitys(this.provinceId);
                  this.$message.success('添加成功');
                }
              }
            });
          this.dialogFormVisible = false;
        }
        if (this.addType === 3) {
          this.$axios.post('/region/addAreas?name=' + this.form.name + '&upperId=' + this.form.upperId)
            .then(res => {
              if (res.status === 200) {
                if (res.data.code === 200) {
                  this.getAreas(this.cityId);
                  this.$message.success('添加成功');
                }
              }
            });
          this.dialogFormVisible = false;
        }
      }
    },
    computed: {}
  }
</script>

<style>
  .cont {
    float: left;
    width: 300px;
    margin-right: 20px;
    border-right: #20a0ff solid;
  }

  li {
    margin-top: 10px;
  }
</style>

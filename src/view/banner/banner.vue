<template>
  <div>
    <div>首页banner</div>
    <div>
      <div>管理banner图片</div>
      <div>
        <ul style="display: block">
          <li v-for="item in items">
            <img :src="item.img" style="width: 100px;height: 180px;"/>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        query: {},
        categories: [],
        brands: [],
        count: {},
        items: [{img: 'https://jsuke.oss-cn-shenzhen.aliyuncs.com/image/1528950854236501094.png'},
          {img: 'https://jsuke.oss-cn-shenzhen.aliyuncs.com/image/1528950854236501094.png'},
          {img: 'https://jsuke.oss-cn-shenzhen.aliyuncs.com/image/1528950854236501094.png'},
          {img: 'https://jsuke.oss-cn-shenzhen.aliyuncs.com/image/1528950854236501094.png'}],
      }
    }
  }
</script>

<style scoped>
  li {
    text-decoration: none; /*去掉前面的圆点*/
    list-style: none;
    float: left;
    border: 1px solid #FFFFFF;
    background-color: #30DDEB;
  }

</style>
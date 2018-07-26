<template>

    <div>
       <!--<el-row style="padding-bottom: 20px;">
            商品列表
        </el-row>-->
        <el-container direction="vertical">
            <fm-grid url="/shopGoods/addShopGoodsList" ref="grid" method="get" :params="['kw','brandId','categoryId','status']">


                <template slot-scope="{rows,loading,search}">

                    <div class="filter-container">
                        <!--<el-input style="width: 200px;" size="small" v-model="query.kw" class="filter-item"-->
                        <!--placeholder="请输入姓名或用户名"/>-->

                        <!--<el-button class="filter-item" size="small" style="margin-left: 10px;" @click="search(query,1)"-->
                        <!--type="primary" icon="search">搜索-->
                        <!--</el-button>-->
                        <!--<div style="float:right;margin-right:20px;">-->
                        <!--<el-button type="text" icon="document" @click="">-->
                        <!--添加-->
                        <!--</el-button>-->
                        <!--</div>-->
                        <!--<el-row style="padding-bottom: 20px;">
                            <el-button @click="gSearch('all')">全部商品{{count.all}}</el-button>
                            <el-button @click="gSearch('wcm')">待审核{{count.wcm}}</el-button>
                            <el-button @click="gSearch('upr')">已上架{{count.upr}}</el-button>
                            <el-button @click="gSearch('lwr')">已下架{{count.lwr}}</el-button>
                        </el-row>-->
                        <el-row style="padding-bottom: 20px;">
                            <span>输入搜索:</span>
                            <el-input v-model="query.kw" style="width:200px;"/>
                            <!--<span>商品分类:</span>
                            <el-cascader
                                expand-trigger="hover"
                                :options="categories"
                                :props="{value:'id',label:'name'}"
                                v-model="query.categoryId"
                                @change="categoryChange">
                            </el-cascader>
                            <span>商品品牌:</span>
                            <el-select v-model="query.brandId" placeholder="请选择">
                                <el-option
                                    v-for="item in brands"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>-->
                            <el-button @click="search(query,1)">查询结果</el-button>
                        </el-row>

                    </div>
                    <el-table
                        :data="rows"
                        stripe
                        v-loading="loading"
                        style="width: 100%;padding-bottom:20px;border-bottom:none;">
                        <el-table-column
                            prop="id"
                            label="编号"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="goodsName"
                            label="商品图片"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="goodsName"
                            label="商品名称"
                            width="180">
                        </el-table-column>
                         <el-table-column
                            prop="goodsName"
                            label="价格"
                            width="180">
                          </el-table-column>
                        <el-table-column
                            prop="status"
                            label="状态"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="saleAmont"
                            label="销量"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="categoryInfo.name"
                            label="商品分类"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            label="操作">
                            <template slot-scope="{row}">
                                <el-button type="text" @click="">编辑</el-button>
                                <el-button type="text" @click="upper(row.id)">上架</el-button>
                                <el-button type="text" @click="lower(row.id)">下架</el-button>
                                <el-button type="text" @click="del(row.id)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>

            </fm-grid>
            <!--<dict-ae @success="$refs.grid.search()" ref="dictae"/>-->
        </el-container>

    </div>


</template>

<script>

    export default {

        mounted() {
            this.$nextTick(() => {
                const {kw} = this.$route.query;
                this.query = {...this.query, kw};
                this.$shop.getCategories().then(categories =>  this.categories = categories);
                this.$shop.getBrands().then(brands =>  this.brands = brands);
                this.loadCount();
            });
        },

        methods: {

            loadCount(){
                this.$axios.get('/wgoods/allCount')
                    .then(({data: {data}}) => {
                        this.count = data;
                    });
            },

            upper(id){
                this.$axios.post('/wgoods/upper',this.$axios.form({goodsId:id}))
                    .then(({data}) =>{
                        this.$refs.grid.search();
                        this.loadCount();
                    });
            },

            lower(id){
                this.$axios.post('/wgoods/lower',this.$axios.form({goodsId:id}))
                    .then(({data}) =>{
                        this.$refs.grid.search();
                        this.loadCount();
                    });
            },

            del(id){
                this.$axios.post('/wgoods/del',this.$axios.form({goodsId:id}))
                    .then(({data}) =>{
                        this.$refs.grid.search();
                        this.loadCount();
                    });
            },

            categoryChange() {

            },

            gSearch(status){
                this.$refs.grid.search({...this.query,status},1);
            }

        },

        data() {
            return {
                query: {},
                categories: [],
                brands: [],
                count:{},
            }
        }
    }


</script>

<style>

</style>

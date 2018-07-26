<template>

    <div>
        <el-container direction="vertical">
            <fm-grid url="/shopGoods/addShopGoodsList" ref="grid" method="get" :params="['kw','brandId','categoryId','status']">
                <template slot-scope="{rows,loading,search}">
                    <div class="filter-container">
                        <el-row style="padding-bottom: 20px;">
                            <span>输入搜索:</span>
                            <el-input v-model="query.kw" style="width:200px;"/>
                             <span>用户昵称:</span>
                             <el-input v-model="query.kw" style="width:200px;"/>
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
                            prop="userName"
                            label="用户昵称"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="goodsName"
                            label="商品名称"
                            width="180">
                        </el-table-column>
                         <el-table-column
                            prop="goodsName"
                            label="评价"
                            width="180">
                          </el-table-column>
                        <el-table-column
                            prop="status"
                            label="评论时间"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="saleAmont"
                            label="是否显示"
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

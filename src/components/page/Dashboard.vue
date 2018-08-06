<template>
    <div>
        <el-row :gutter="20">
          <!-- <el-col :span="8">
               <el-row>
                   <el-col>
                       <el-card shadow="hover" class="mgb20">
                           <div class="user-info">
                               <img src="static/img/img.jpg" class="user-avator" alt="">
                               <div class="user-info-cont">
                                   <div class="user-info-name">{{name}}</div>
                                   <div>{{role}}</div>
                               </div>
                           </div>
                           <div class="user-info-list">上次登录时间：<span>2018-01-01</span></div>
                           <div class="user-info-list">上次登录地点：<span>东莞</span></div>
                       </el-card>
                       <el-card shadow="hover">
                           <div slot="header" class="clearfix">
                               <span>语言详情</span>
                           </div>
                           Vue
                           <el-progress :percentage="57.2" color="#42b983"></el-progress>
                           JavaScript
                           <el-progress :percentage="29.8" color="#f1e05a"></el-progress>
                           CSS
                           <el-progress :percentage="11.9"></el-progress>
                           HTML
                           <el-progress :percentage="1.1" color="#f56c6c"></el-progress>
                       </el-card>
                   </el-col>
               </el-row>-->
           <!-- </el-col>-->

            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">

                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-view grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{plateformIndexVo.todayOrderCount}}</div>
                                    <div>今日订单总数</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-message grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{plateformIndexVo.todaySalesAmount}}</div>
                                    <div>今日销售总额</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-goods grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">{{plateformIndexVo.yesterdaySalesAmount}}</div>
                                    <div>昨日销售总额</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>

                </el-row>

              <el-row :gutter="20" class="mgb20">
                <el-card shadow="hover" :body-style="{ height: '304px'}">

                    <div slot="header" class="clearfix">
                        <span>待处理事务</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>

                    <div>
                      <ul style="font-size: 20px;">
                        <li><el-button type="text" @click="toNotPaidOrderPage()">待付款订单 {{plateformIndexVo.notPaidOrderCount}}</el-button></li>
                        <li><el-button type="text" @click="toNotSendOrderPage()">待发货订单 {{plateformIndexVo.notSendOrderCount}}</el-button></li>
                        <li><el-button type="text" @click="toFinishedOrderPage()">已完成订单 {{plateformIndexVo.finishedOrderCount}}</el-button></li>
                        <li><el-button type="text" @click="toAlreadySendOrderPage()">已发货订单 {{plateformIndexVo.alreadySendOrderCount}}</el-button></li>
                        <li><el-button type="text" @click="toNotDealRefundOrderPage()">待处理退款申请 {{plateformIndexVo.notDealRefund}}</el-button></li>
                      </ul>
                    </div>
<!--                    <el-table :data="todoList" :show-header="false" height="304" style="width: 100%;font-size:14px;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template slot-scope="scope">
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>-->

                </el-card>
              </el-row>


              <div>
                <span style="font-size:20px;">商品总览</span><br><br>
                <el-row :gutter="20" class="mgb20">
              <el-col :span="8">
                <el-card shadow="hover" :body-style="{padding: '0px'}">
                  <div class="grid-content grid-con-2">
                    <i class="el-icon-message grid-con-icon"></i>
                    <div class="grid-cont-right">
                      <div class="grid-num">{{plateformIndexVo.shoppingGoodsCount}}</div>
                      <div>已上架</div>
                    </div>
                  </div>
                </el-card>
              </el-col>

                <el-col :span="8">
                  <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                      <i class="el-icon-message grid-con-icon"></i>
                      <div class="grid-cont-right">
                        <div class="grid-num">{{plateformIndexVo.allGoodsCount}}</div>
                        <div>全部商品</div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                </el-row>
              </div>

              <div>
                <span style="font-size:20px;">用户总览</span><br><br>
                <el-row :gutter="20" class="mgb20">
                <el-col :span="8">
                  <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                      <i class="el-icon-message grid-con-icon"></i>
                      <div class="grid-cont-right">
                        <div class="grid-num">{{plateformIndexVo.todayAddingUserCount}}</div>
                        <div>今日新增</div>
                      </div>
                    </div>
                  </el-card>
                </el-col>

                <el-col :span="8">
                  <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                      <i class="el-icon-message grid-con-icon"></i>
                      <div class="grid-cont-right">
                        <div class="grid-num">{{plateformIndexVo.yesterdayAddingUserCount}}</div>
                        <div>昨日新增</div>
                      </div>
                    </div>
                  </el-card>
                </el-col>

                <el-col :span="8">
                  <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                      <i class="el-icon-message grid-con-icon"></i>
                      <div class="grid-cont-right">
                        <div class="grid-num">{{plateformIndexVo.thisMonthAddingUserCount}}</div>
                        <div>本月新增</div>
                      </div>
                    </div>
                  </el-card>
                </el-col>

                <el-col :span="8">
                  <el-card shadow="hover" :body-style="{padding: '0px'}">
                    <div class="grid-content grid-con-2">
                      <i class="el-icon-message grid-con-icon"></i>
                      <div class="grid-cont-right">
                        <div class="grid-num">{{plateformIndexVo.vipCount}}</div>
                        <div>会员总数</div>
                      </div>
                    </div>
                  </el-card>
                </el-col>
                </el-row>
              </div>

            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {

      mounted() {
        this.$nextTick(() => {
          this.$axios.post('/platefromIndex/statisticsIndex')
            .then(({data:{data}}) => {
              this.plateformIndexVo=data;
            });

        });
      },

      methods:{
        toNotPaidOrderPage(){
          this.$router.push({path: '/orderList', query: {status: 0}})
        },
        toNotSendOrderPage(){
          this.$router.push({path: '/orderList', query: {status: 1}})
        },
        toFinishedOrderPage(){
          this.$router.push({path: '/orderList', query: {status: 3}})
        },
        toAlreadySendOrderPage(){
          this.$router.push({path: '/orderList', query: {status: 2}})
        },
        toNotDealRefundOrderPage(){
          this.$router.push({path: '/orderList', query: {status: 4}})
        }
      },

        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                plateformIndexVo:{}
/*                todoList: [
                    {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: false,
                    }, {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    }
                ]*/
            }
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

</style>

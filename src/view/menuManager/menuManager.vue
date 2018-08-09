<template>

  <div>
    <el-row style="padding-bottom: 20px;">
     权限设置
    </el-row>

    <div class="container">
       <div class="form-box">
         <span>选择管理员</span>&nbsp;&nbsp;
         <el-select v-model="value" placeholder="请选择" @change="queryMenuByUid(value)">
         <el-option
          v-for="manager in managerList"
          :key="manager.id"
          :label="manager.name"
          :value="manager.id">
         </el-option>
         </el-select>
       </div>
    </div>

    <div class="container" style="margin-top: 30px;">
    <el-container direction="vertical">
     <!-- <fm-grid url="/menu/selectMenuList"   ref="grid" method="get" >-->
        <!--<template slot-scope="{rows,loading,search}">-->

          <el-table
            :data="menuList"
            style="width: 100%;padding-bottom:20px;border-bottom:none;">
            <el-table-column
              prop="menuId"
              label="权限id"
              width="160">
            </el-table-column>
            <el-table-column
              prop="menuName"
              label="权限名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="url"
              label="权限url"
              width="200">
            </el-table-column>
            <el-table-column
              label="开启权限"
              width="200">
                            <!--<template slot-scope="{row}">
                              <el-switch
                                active-text ="是"
                                inactive-text = "否"
                                active-color="#5B7BFA"
                                inactive-color="#dadde5">
                               &lt;!&ndash; v-model="switches[row.canUse]"
                                @change="setCanUse(row.id,row.canUse)" >&ndash;&gt;
                              </el-switch>
                            </template>-->
              <template slot-scope="{row}">
              <!--<el-switch v-model="switches[row.menuId]" @change="useChange(row.menuId,row)"></el-switch>-->
                <el-switch v-model="this.switches[row.menuId]" @change="setMenu(row.menuId)"></el-switch>
            </template>
            </el-table-column>

          </el-table>

       <!-- </template>-->

     <!-- </fm-grid>-->
    </el-container>
  </div>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$nextTick(() => {
        let uid=0;
        let switches=new Array(10)
        //查询管理员列表
        this.$axios.post('/menu/selectMenuManager')
          .then(({data:{data}}) => {
            this.managerList=data;
          });
        //查询所有权限列表
        this.$axios.post('/menu/selectMenuList')
          .then(({data:{data}}) => {
            this.menuList=data;
          });
      });
    },

    data() {

      return {
        managerList:[],
        menuList:[],
        value:'',
        managerUserMenList:[],
        judgeMenu:[],
        switches:[],
      };

    },

    methods: {

      setMenu(menuId){
         alert(menuId);
         alert(this.uid);
      //  this.$axios.post('/menu/setMenu', this.$axios.form({menuId: menuId,userId:this.uid}))
      },

      //根据管理员的用户id查询权限列表
      queryMenuByUid(id){
        this.uid=id;
        this.$axios.post('/menu/queryMenuByUid', this.$axios.form({menuUserId: id}))
          .then(({data:{data}}) => {
            this.managerUserMenList=data;
            this.initUserMenu();
          });
       },

      //初始化,判断选中的管理员拥有哪些权限
      initUserMenu() {
        //遍历权限列表
        alert(this.managerUserMenList.length);
        alert(this.menuList.length);
        for(let i=0;i<this.managerUserMenList.length;i++){
          for(let j=0;j<this.menuList.length;j++){    //选中的管理员的权限
/*            if(this.managerUserMenList[i].menuId==this.menuList[j].menuId){
              alert('true:'+i);
              this.judgeMenu[this.managerUserMenList[i].menuId]=true;
            }else{
              alert('false:'+i);
              this.judgeMenu[this.managerUserMenList[i].menuId]=false;
            }*/
            this.switches[this.menuList[j].menuId]=this.managerUserMenList[i].menuId==this.menuList[j].menuId?true:false
            alert(this.menuList[j].menuName+":"+this.switches[this.menuList[j].menuId])
          }
        }
      },

    }
  }
</script>

<style>

</style>

<!--

-->
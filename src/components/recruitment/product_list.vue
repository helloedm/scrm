<template>
  <div>
    <div class="title">
        <span style="color:#1F2D3D;font-size:16px;font-weight:bold;"><router-link to="/ATS/recruitment">职位管理</router-link></span>
        <span style="margin:0 8px;">></span>
        <span style="color:#465669;font-size:14px;">产品动态</span>
    </div>
    <div class="content">
        <div class="list" v-for="(item,index) in getProductTrends" :key="index" @click="to_detaily(item)">
          <div class="list_info">
            <div style="display:flex;"><div class="red_ball" v-show="!item.isRead"></div>{{item.title}}</div>
            <div>爱聚HR技术部·发表于{{item.createTime.split(" ")[0]}}</div>
          </div>
        </div>
    </div>
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="totalCount">
      </el-pagination>      
    </div>

  </div>
</template>
<script>
export default {
  name:'recruitment',
  data(){
    return{
      getProductTrends:[],
      page:1,
      totalCount:1
    }
  },
  mounted(){
    this.get_ProductTrends();
  },
  methods:{
    to_detaily(item){
        localStorage.setItem("detaily",JSON.stringify(item));
        var _this = this;
        var method = "dashBoard/getProductTrendInfo";
        var param = JSON.stringify({
          id:item.id
        });
        var successd = function(res) {
          console.log(res);
        };
        _this.$http(method, param, successd);
        this.$router.push({"path":'/ATS/detaily'})
    },
    delet(data) { 
      var _this = this;
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var method = "dashBoard/delProductTrend";
        var param = JSON.stringify({
          id : data
        });
        var successd = function(res) {
          console.log(res);
          if(res.data.code == 0){
            _this.$message({
                message: "数据删除成功！",
                type: "warning"
            });
          }
          _this.get_ProductTrends();
        };
        _this.$http(method, param, successd);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    add_act(){
      localStorage.removeItem('edit_prd');
      this.$router.push('/ATS/edit');
    },
    edit(data){
      localStorage.setItem('edit_prd',JSON.stringify(data));
      this.$router.push('/ATS/edit');
    },
    handleSizeChange(val) {

    },
    handleCurrentChange(val) {
      this.page = val;
      this.get_ProductTrends();
    },
    get_ProductTrends(){
      var _this = this;
      var method = "dashBoard/getProductTrends";
      var param = JSON.stringify({
        pageNum: _this.page,
        pageSize: 10
      });
      var successd = function(res) {
        // console.log(res);
        _this.getProductTrends = res.data.data.productTrends;
        _this.totalCount = res.data.data.page.totalCount;
      };
      _this.$http(method, param, successd);
    }
  },
  components:{}
}
</script>

<style scoped>
    .title{
        min-height: 48px;
        background: #ffffff;
        display: flex;
        align-items: center;
        padding-left: 24px;
        cursor: pointer;
        margin-bottom:24px;
    }
  .button{
    margin-bottom: 26px;
  }
  .content{
    display: -ms-flexbox;
    display: flex;
    background: #ffffff;
    min-height: 720px;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-wrap: wrap;
    align-content: flex-start;
    flex-wrap: wrap;
  }
  .list{
    cursor: pointer;
    height: 82px;
    width: 92%;
    border-bottom: 1px solid #EBEEF5;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .list_info div:first-child{
    color: #5CB3FF;
    font-size: 16px;
  }
  .list_info div:last-child{
    color: #98A9BF;
    font-size: 14px;
    margin-top: 8px;
  }
  .pagination{
    margin-top: 15px;
  }
  a{
    color: #ffffff;
  }
  .title a{
      color: #1F2D3D;
  }
  .red_ball{
      margin-right: 10px;
      width: 6px;
      height: 6px;
      background: #FF566B;
      border-radius: 50%;
  }
</style>



<template>
  <div>
    <div class="title">
        <span style="color:#1F2D3D;font-size:16px;font-weight:bold;"><router-link to="/ATS/recruitment">职位管理</router-link></span>
        <span style="margin:0 8px;">></span>
        <span style="color:#465669;font-size:14px;">产品动态</span>
    </div>
    <div class="content">
        <span style="color:#5CB3FF;font-size:16px;margin:16px 0 0 24px">
            <router-link to="/ATS/product_list">更多产品动态</router-link>
        </span>
        <div style="width:100%;color:#1F2D3D;font-size:16px;margin:22px 0 0 24px;font-weight:bold;">{{detaily.title}}</div>
        <div style="width:100%;color:#98A9BF;font-size:14px;margin:8px 0 0 24px">爱聚HR技术部·发表于{{detaily.createTime.split(" ")[0]}}</div>
        <div style="width:100%;height:1px;background:#EBEEF5;margin-top:16px;"></div>
        <div class="container">
            {{detaily.content}}
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'recruitment',
  data(){
    return{
        detaily:JSON.parse(localStorage.detaily)
    }
  },
  mounted(){

  },
  methods:{

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
  .title a{
      color: #1F2D3D;
  }
  .container{
      width: 51%;
    text-align: justify;
    margin: 24px auto;
    font-size: 16px;
    color: #465669;
    word-break:break-all;
  }
</style>



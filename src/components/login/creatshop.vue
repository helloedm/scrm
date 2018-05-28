<template>
    <div id="creatshop">
        <div class="top">
            <div class="app_nav_logo">
                <img src="../../images/logo.jpg" alt=""> 
                <span style="margin-left: 8px; padding-top: 5px;">微招聘，用爱聚</span>
            </div>
            <div class="user_info">
                <span class="user_name" style="font-size:16px;color:#1F2D3D;">15833329884</span>
                <span style="color:#5CB3FF;margin-left:20px;font-size:14px;">退出</span>
            </div>
        </div>
        <div class="which_creat">请选择需要创建的店铺类型</div>
        <div class="shop_type">
            <div><img src="../../images/ds.png" alt=""><div class="creat_now">立即创建</div></div>
            <div><img src="../../images/dinner.png" alt=""><div class="creat_now">立即创建</div></div>
            <div><img src="../../images/ls.png" alt=""><div class="creat_now">立即创建</div></div>
            <div><img src="../../images/sq.png" alt=""><div class="creat_now">立即创建</div></div>
        </div>
    </div>
</template>
<script>
export default {
  name: "creatshop",
  data() {
    return {

    };
  },
  created () {
    
  },
  mounted: function() {

  },
  methods: {

  },
  watch: {
    
  },
};
</script>
<style scoped>
#creatshop{
    width:100%;
    overflow-x: hidden;
}
.which_creat{
    height:50px; 
    font-size:36px;
    font-family:PingFangSC-Regular;
    color:rgba(31,45,61,1);
    line-height:50px;
    text-align: center;
    margin: 98px 0 42px 0;
}
.shop_type{
    width: 100%;
    display:flex;
    justify-content: center;
}
.shop_type>div{
    display: flex;
    flex-direction: column;
    align-items: center;
    color:rgba(255,255,255,1);
}
.shop_type img{
    width:270px;
}
.creat_now {
    width:122px;
    height:40px; 
    background:rgba(92,179,255,1);
    border-radius: 20px ; 
    line-height: 40px;
    text-align: center;
    cursor: pointer;

}
</style>

<style>
.top{
    width:100%;
    height:100px; 
    background:rgba(255,255,255,1);
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.06); 
    display: flex;
    align-items: center;
    padding-left: 19.5%;
}
.app_nav_logo {
    height: 56px;
    line-height: 56px;
    width: 208px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333333;
    font-size: 14px;
    margin-right: 43.5%;
}
.app_nav_logo img{
    width:66px;
}
</style>

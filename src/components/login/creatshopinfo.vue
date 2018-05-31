<template>
    <div id="creatshopinfo">
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
        <div data-v-93c1352a="" class="which_creat">创建店铺信息</div>
        <div class="input_info">
            <el-input 
                v-model="shop_name" 
                placeholder="店铺名称"
                prefix-icon="iconfont icon-dianpu"
            ></el-input>
            <div style="width:368px;position: relative;" class="choseshop">
                <span style="position: absolute;z-index: 9;top: 23px;left:5px;">
                    <i class="iconfont">&#xe733;</i>
                </span>
                <el-cascader
                    style="width:240px;margin-left:-100px;"
                    expand-trigger="hover"
                    :options="workCityLists"
                    prefix-icon="iconfont icon-dizhi1"
                    v-model="address"
                    placeholder="店铺地址"
                    change-on-select>
                </el-cascader>                
            </div>
            <div style="width:368px;position: relative;">
                <span style="position: absolute;z-index: 9;top: 23px;left:5px;">
                    <i class="iconfont">&#xe733;</i>
                </span>
                <el-select v-model="domain" placeholder="选择行业" class="domain_choose">
                    <el-option v-for="item in domainList" :label="item.name" :value="item.name"  :key="item.id"></el-option>
                </el-select>
            </div>
        </div>
        <div class="creat_shop" @click="creat_shop">创建店铺</div>
    </div>
</template>
<script>
import allcity from "../../script/allcity";

export default {
  name: "creatshopinfo",
  data() {
    return {
        shop_name:'',
        address:[],
        domain:'',
        shopid:this.$route.query.id,
        workCityLists:[],
        domainList:[{id: 1,name: "电子商务"}, {id: 2,name: "网络游戏"}, {id: 3,name: "教育/培训"}, {id: 4,name: "计算机软件"}, {id: 5,name: "广告"}, {id: 6,name: "媒体/出版/影视/文化传播"}, {id: 7,name: "通讯/电信/网络设备"}, {id: 8,name: "零售/批发"}, {id: 9,name: "耐用消耗品"}, {id: 10,name: "快速消费品"}, {id: 11,name: "贸易/进出口"}, {id: 12,name: "运输"}, {id: 13,name: "物流"}, {id: 14,name: "汽车"}, {id: 15,name: "自动化"}, {id: 16,name: "机械/设备/重工"}, {id: 17,name: "新能源"}, {id: 18,name: "采掘/冶炼"}, {id: 19,name: "电气/电力/水利"}, {id: 20,name: "石油/化工/矿产"}, {id: 21,name: "娱乐/休闲/体育"}, {id: 22,name: "外包服务"}, {id: 23,name: "专业服务"}, {id: 24,name: "生活服务"}, {id: 25,name: "餐饮"}, {id: 26,name: "家居/室内设计/装潢"}, {id: 27,name: "建筑/建材/工程"}, {id: 28,name: "房地产"}, {id: 29,name: "基金/证券/期货/股票"}, {id: 30,name: "会计/审计"}, {id: 31,name: "保险"}, {id: 32,name: "银行"}, {id: 33,name: "医疗设备/器械"}, {id: 34,name: "护理卫生"}, {id: 35,name: "制药/生物工程"}, {id: 36,name: "计算机硬件"}, {id: 37,name: "电子技术/半导体/集成电路"}, {id: 38,name: "通信/电信运营"}, {id: 39,name: "信托/担保/拍卖/典当"}]
    };
  },
  created () {
    
  },
  mounted: function() {
      this.transitionCityLists();
  },
  methods: {
      check(){
          var check = false;
          var warning = '';
          if (this.shop_name != "" && this.address.length != 0 && this.domain != '') {
            check =true;
          }else{
            if(this.shop_name == ""){
                warning = '店铺名称不得为空！'
            }else if(this.address.length == 0){
                warning = '店铺地址不得为空！'
            }else if(this.domain == ''){
                warning = '行业选择不得为空！'
            }
            this.$message({
              type: 'info',
              message: warning
            });
          }
          return check;
      },
      creat_shop(){
        if (this.check()) {
            var _this = this;
            var method="store/createStore", //创建店铺
            param=JSON.stringify({
                name:_this.shop_name,
                address:_this.address,
                industry:_this.domain,
                storeType:_this.shopid
            }),
            successd=function(res){
                console.log(res);
                if (res.data.code == 0) {
                    switch (_this.shopid) {
                        case 1:
                            _this.$router.push({path:'/scrm/main',query:{type:0}});
                            break;
                        case 2:
                            _this.$router.push({path:'/scrm/main',query:{type:1}});
                            break;
                        case 3:
                            _this.$router.push({path:'/scrm/main',query:{type:2}});
                            break;
                        case 4:
                            _this.$router.push({path:'/scrm/Trading_Area'});
                        default:
                            break;
                    }
                }
            };
            _this.$http(method,param,successd);            
        }
      },
      transitionCityLists() {
        let provinces = allcity.province,
            citys = allcity.city;
        for (let j = 0; j < provinces.length; j++) {
            let item = provinces[j];
            item.value = item.name;
            item.label = item.name;
            item.children = citys[item.id];
        }
        for (let k in citys) {
            let city = citys[k];
            for (let i = 0; i < city.length; i++) {
            let item = city[i];
            item.value = item.name;
            item.label = item.name;
            }
        }
            this.workCityLists = provinces;
      }
  },
  watch: {
    
  },
};
</script>
<style>
    .creat_shop{
        font-size:16px;
        font-family:PingFangSC-Regular;
        color:rgba(255,255,255,1);
        line-height:24px;
        width:368px;
        height:40px;
        background:rgba(92,179,255,1);
        border-radius:4px;
        text-align: center;
        line-height: 40px;
        margin:48px auto;
        cursor: pointer;
    }
    #creatshopinfo .input_info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
       
    }
    #creatshopinfo .input_info .el-input{
        width:368px!important; 
        margin:12px 0 24px 0;
        height:40px;
    }
    #creatshopinfo .input_info .el-input--medium .el-input__inner{
        height: 40px;
        line-height: 40px;
    }
    #creatshopinfo .el-cascader--medium{
        margin-left: 0!important;
    }
    #creatshopinfo .el-cascader__label{
        padding: 13px 6px 0 28px;
    }
    .choseshop .el-input--medium .el-input__inner{
        text-indent: 1em;
    }
    .el-cascader-menus{
        top: 416px!important;
    }
    .domain_choose input{
        text-indent: 1em;
    }
</style>

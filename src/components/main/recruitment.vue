<template>
<div id="recruitment">
    <!-- 试用 -->
    <div class="shop_detaily">
      <div class="shop_detaily_top">
        <div>您现在使用的是爱聚SCRM[{{which_created}}][<span>{{username}}</span>]试用版</div>
        <div class="update_now">立即升级</div>
        <div style="font-size:14px;color:#4A7ECF;cursor: pointer;">了解更多</div>        
      </div>
      <div>
        <span style="color:#557860;">服务热线：<span>0571-89935939</span></span>
        <span style="color:#AC7453;">升级可获得全部高阶营销功能500+微信群邻家好货推广优先权</span>
      </div>
    </div>
    <!-- 已到期 -->
    <div class="Expire" style="display:none;">
      <div class="information">
        <span>店铺免费试用结束，已打烊。如需恢复正常营业，请订购有赞微商城</span>
        <span>官方咨询电话： 0571-89935939</span>
      </div>
      <div class="buy_now">
        立即订购
      </div>
    </div>
    <div class="shop-basic-info">
      <span style="font-size:16px;font-weight:bold;">{{username}}</span>
      <div class="Label" style="background:red;color:#fff;">已到期</div>
      <div class="Label" style="background:green;color:#fff;">试用版</div>
      <div class="Label" style="border:1px solid #ccc;box-sizing: border-box;">VIP</div>
    </div>
    <div style="display:flex;">
      <div class="recruitment_left">
        <section class="store" v-if="store">
          <div class="Order">
            <div class="Order_info">
              <span class="Order_info_num">120</span>
              <span>待付款订单</span>
            </div>
            <div class="Order_info">
              <span class="Order_info_num">120</span>
              <span>待发货订单</span>
            </div>
            <div class="Order_info">
              <span class="Order_info_num">120</span>
              <span>昨日订单量</span>
            </div>
            <div class="Order_info">
              <span class="Order_info_num">120</span>
              <span>昨日交易额</span>
            </div>
            <div class="Order_info">
              <span class="Order_info_num">￥12,120</span>
              <span>会员储值金额</span>
            </div>
          </div>      
        </section>
        <section class="Restaurant" v-if="Restaurant">
          <div class="Order">
            <div class="Order_info">
              <span class="Order_info_num">120</span>
              <span>今日交易额</span>
            </div>
            <div class="Order_info">
              <span class="Order_info_num">120</span>
              <span>今日付款订单</span>
            </div>
            <div class="Order_info">
              <span class="Order_info_num">120</span>
              <span>今日新增会员</span>
            </div>
            <div class="Order_info">
              <span class="Order_info_num">120</span>
              <span>会员储备金额</span>
            </div>
            <div class="Order_info">
              <span class="Order_info_num">￥12,120</span>
              <span>预计毛利</span>
            </div>
          </div>
          <div class="food">
            <div class="Takeoutfood">
              <div class="Takeoutfood_status">
                <span style="margin-right:8px;">外卖（已关闭）</span>
                <el-switch
                  class="foods"
                  style="display: block"
                  v-model="value4"
                  active-color="#5CB3FF"
                  inactive-color="#C0CCDA"
                  @change="Takeoutfood_status(value4)"
                  active-text="开"
                  inactive-text="关">
                </el-switch>
              </div>
              <div class="Receipt">
                <div class="Deliver_goods" :class={active:value4}>
                  <span style="margin-left:20px;font-size:12px;">外卖订单-待接单</span>
                  <span style="margin-right:16px;color:#5CB3FF;">556个订单</span>
                </div>
                <div class="Deliver_goods" :class={active:value4}>
                  <span style="margin-left:20px;font-size:12px;">外卖订单-待发货</span>
                  <span style="margin-right:16px;color:#5CB3FF;">5个订单</span>
                </div>
              </div>
            </div>
            <div class="Takeoutfood">
              <div class="Takeoutfood_status">
                <span style="margin-right:8px;">堂食点餐（已开启）</span>
                <el-switch
                  @change="dinner(value3)"
                  class="foods"
                  style="display: block"
                  v-model="value3"
                  active-color="#5CB3FF"
                  inactive-color="#C0CCDA"
                  active-text="开"
                  inactive-text="关">
                </el-switch>
              </div>
              <div class="Receipt">
                <div class="Deliver_goods" :class={active:value3}>
                  <span style="margin-left:20px;font-size:12px;">堂食订单-待付款</span>
                  <span style="margin-right:16px;color:#5CB3FF;">556个订单</span>
                </div>
              </div>
            </div>
          </div> 
        </section>
        <section class="retail" v-if="retail">
          <div class="Member_zone">
            <div style="font-size:14px;color:rgba(31,45,61,1);line-height:20px;font-weight:bold;margin:16px 0 0 24px;">会员</div>
            <div class="member_num">
              <div class="left">
                <div class="information" style="margin-top:20px;">
                  <img src="../../images/control/1.png" alt="">
                  <div>
                    <span>门店销售额</span>
                    <span>234.00</span>
                  </div>
                  <div>
                    <span>门店支付订单数</span>
                    <span>231</span>
                  </div>
                </div>
                <div class="information" style="margin:41px 0 22px 0;">
                  <img src="../../images/control/2.png" alt="">
                  <div>
                    <span>新增客户</span>
                    <span>23</span>
                  </div>
                  <div>
                    <span>支付客户数</span>
                    <span>33</span>
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="information" style="margin-top:20px;">
                  <img src="../../images/control/3.png" alt="">
                  <div>
                    <span>网店销售额</span>
                    <span>0.00</span>
                  </div>
                  <div>
                    <span>网店支付订单数</span>
                    <span>1000</span>
                  </div>
                </div>
                <div class="information" style="margin:41px 0 22px 0;">
                  <img src="../../images/control/4.png" alt="">
                  <div>
                    <span>新增客户</span>
                    <span>12</span>
                  </div>
                  <div>
                    <span>会员储值金额</span>
                    <span>2312,3340.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="Member_info_Interaction">
          <div class="Member">
            <span>会员</span>
            <div class="Member_info">
              <div class="total_member" style="background:rgba(92,179,255,1);">
                <div style="margin-left:12px;">
                  <img src="../../images/control/hy.png" alt="">
                  <span style="font-size:12px;color:#fff;">总会员数</span>
                </div>
                <span style="font-size:16px;color:#fff;margin-right:12px;">55669</span>
              </div>
              <div class="new_add" style="background:rgba(92,179,255,0.84);">
                <div style="margin-left:12px;">
                  <img src="../../images/control/add.png" alt="" style="width:10px;">
                  <span style="font-size:12px;color:#fff;">昨日新增</span>
                </div>
                <span style="font-size:16px;color:#fff;margin-right:12px;">776</span>
              </div>
              <div class="yesterday_active" style="background:rgba(92,179,255,0.64);">
                <div style="margin-left:12px;">
                  <img src="../../images/control/act.png" alt="" style="width:14px;">
                  <span style="font-size:12px;color:#fff;">昨日活跃</span>
                </div>
                <span style="font-size:16px;color:#fff;margin-right:12px;">55669</span>
              </div>
            </div>
          </div>
          <div class="info">
            <span>消息</span>
            <div class="Member_info">
              <div class="total_member" style="background:rgba(254,139,37,1);">
                <div style="margin-left:12px;">
                  <img src="../../images/control/dx.png" alt="" style="width:13px;">
                  <span style="font-size:12px;color:#fff;">昨日短信群发</span>
                </div>
                <span style="font-size:16px;color:#fff;margin-right:12px;">776</span>
              </div>
              <div class="new_add" style="background:rgba(254,139,37,0.84);">
                <div style="margin-left:12px;">
                  <img src="../../images/control/hd.png" alt="" style="width:12px;">
                  <span style="font-size:12px;color:#fff;">昨日互动群发</span>
                </div>
                <span style="font-size:16px;color:#fff;margin-right:12px;">776</span>
              </div>
              <div class="yesterday_active" style="background:rgba(254,139,37,0.64);">
                <div style="margin-left:12px;">
                  <img src="../../images/control/hf.png" alt="" style="width:15px;">
                  <span style="font-size:12px;color:#fff;">昨日回复</span>
                </div>
                <span style="font-size:16px;color:#fff;margin-right:12px;">776</span>
              </div>
            </div>
          </div>
          <div class="Interaction">
            <span>互动</span>
            <div class="Member_info">
              <div class="total_member" style="background:rgba(73,204,147,1);">
                <div style="margin-left:12px;">
                  <img src="../../images/control/fans.png" alt="" style="width:14px;">
                  <span style="font-size:12px;color:#fff;">近7日客转粉数</span>
                </div>
                <span style="font-size:16px;color:#fff;margin-right:12px;">776</span>
              </div>
              <div class="new_add" style="background:rgba(73,204,147,0.84);">
                <div style="margin-left:12px;">
                  <img src="../../images/control/cj.png" alt="" style="width:14px;">
                  <span style="font-size:12px;color:#fff;">近7日会员成交</span>
                </div>
                <span style="font-size:16px;color:#fff;margin-right:12px;">￥233,344.00</span>
              </div>
              <div class="yesterday_active" style="background:rgba(73,204,147,0.64);">
                <div style="margin-left:12px;">
                  <img src="../../images/control/fg.png" alt="" style="width:14px;">
                  <span style="font-size:12px;color:#fff;">会员复购率</span>
                </div>
                <span style="font-size:16px;color:#fff;margin-right:12px;">23%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="calendar_all">
            <dl class="calendar">
              <dt class="calendar_header">
                <button class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left" @click="preMonth"></button>
                <span class="padding_0_5">{{chooseYear}}</span>年<span class="padding_0_5">{{chooseMonth}}</span>月
                <button class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right" @click="nextMonth"></button>
              </dt>
              <dd class="calendar_con">
                <table class="el-date-table" cellspacing="0" cellpadding="0">
                  <tr>
                    <th>日</th>
                    <th>一</th>
                    <th>二</th>
                    <th>三</th>
                    <th>四</th>
                    <th>五</th>
                    <th>六</th>
                  </tr>
                  <tr v-for="(week,index) in mounthList" :key="index">
                    <td 
                    v-for="day in week" 
                    :key="day.chooseDay" 
                    :class="{'disabled':!day.current,'available':day.current,'today':day.chooseYear==nowYear&&day.chooseMonth==nowMonth&&day.chooseDay==nowDay,'current':day.chooseDay==chooseDay,'hasRecord':day.value==1}" 
                    @click="chooseDate(day)"
                    >{{day.chooseDay}}</td>
                  </tr>
                </table>
              </dd>
            </dl>
            <div style="width: 23px;min-height: 300px;background: #f5f8fa;z-index: 9;"></div>
            <div class="calendar_detaily">
              <span style="font-size:14px;color:rgba(31,45,61,1);line-height:20px;font-weight:bold;margin:18px 0 0 16px;">营销待办</span>
              <div class="all_activity">
                <div class="going_activity">
                  <img src="../../images/control/yingxiao1.png" alt="">
                  <span style="margin:24px 0 16px 0;">进行中的营销活动</span>
                  <span style="font-size:16px;color:#5CB3FF;">340</span>
                </div>
                <div class="linging_activity">
                  <img src="../../images/control/yingxiao2.png" alt="">
                  <span style="margin:24px 0 16px 0;">待上线营销活动</span>
                  <span style="font-size:16px;color:#49CC93">340</span>
                </div>
                <div class="waiting">
                  <img src="../../images/control/yingxiao3.png" alt="">
                  <span style="margin:24px 0 16px 0;">待审核</span>
                  <span style="font-size:16px;color:#FE8B25;">340</span>
                </div>
              </div>
              <div class="look">
                查看营销中心
              </div>
            </div>
        </div>
        <div class="always_function">
          <span>常用功能</span>
          <div class="function">
            <div>
              <img src="../../images/control/new.png" alt="">
              <span style="margin-left:10px;">新建商品</span>
            </div>
            <div>
              <img src="../../images/control/coupon.png" alt="">
              <span style="margin-left:10px;">新建优惠券</span>
            </div>
            <div>
              <img src="../../images/control/discount.png" alt="">
              <span style="margin-left:10px;">设置满减</span>
            </div>
            <div>
              <img src="../../images/control/eat.png" alt="">
              <span style="margin-left:10px;">堂食点餐</span>
            </div>
            <div>
              <img src="../../images/control/member.png" alt="">
              <span style="margin-left:10px;">会员卡</span>
            </div>
            <div>
              <img src="../../images/control/redball.png" alt="">
              <span style="margin-left:10px;">红包管理</span>
            </div>        
          </div>    
        </div>
        <div class="always_function">
          <span>更多服务</span>
          <div class="more_service">
            <div>
              <span>erp</span>
              <span>移动办公软件</span>
            </div>
            <div style="background:rgba(255,147,160,1);">
              <span>智能收银</span>
              <span>移动办公软件</span>
            </div>
            <div style="background:rgba(139,223,186,1);">
              <span>小程序</span>
              <span>移动办公软件</span>
            </div>
            <div style="background:rgba(255,181,116,1);">
              <span>更多</span>
              <span>移动办公软件</span>
            </div>      
          </div>    
        </div>
      </div>
      <div class="recruitment_right">
        <section class="store" v-if="store || retail">
          <div class="add_shop">
            <img src="../../images/control/shop.png" alt="">
            <div class="add"><i class="iconfont">&#xe767;</i>添加门店</div>
          </div>        
        </section>
        <div class="h_user_information">
          <!-- <div class="user_info">
            <div style="display:flex;">
              <img alt="" src="../../images/control/tx.png"> 
              <div style="margin: 19px 0px 0px 16px;">
                <div class="user_name" style="font-size: 14px; color: rgb(31, 45, 61); font-weight: bold;">{{userphone}}</div> 
                <div class="user_company" style="font-size: 12px; color: rgb(152, 169, 191); margin-top: 8px;">{{username}}</div>
              </div>            
            </div>
            <div class="Edition">专业版</div>
          </div>  -->
          <div class="getPercent">
            <div class="personal_activity">
              <div style="margin: 17px 0 0 24px;">红包余额<span style="color:#5CB3FF">9999</span>元</div>
              <div style="margin: 17px 16px 0 0;color:#5CB3FF;cursor: pointer;">发活动<i class="iconfont" style="font-size:12px;">&#xe62d;</i></div>
            </div>
            <div class="personal_activity">
              <div style="margin: 8px 0 16px 24px;">短信余量 <span style="color:#5CB3FF">999999</span>元</div>
              <div style="margin: 8px 16px 16px 0;color:#5CB3FF;cursor: pointer;">发活动<i class="iconfont" style="font-size:12px;">&#xe62d;</i></div>
            </div>
          </div>
        </div>

        <section class="Restaurant" v-if="Restaurant">
          <div class="Printer">
            <div>
              <img src="../../images/control/Printer.png" alt="">
              <span>未连打印机</span>
            </div>
            <div>
              <img src="../../images/control/jd.png" alt="">
              <span>未自动接单</span>
            </div>
          </div>
        </section>

        <div class="Customer_manager">
            <img src="../../images/control/kefu.png" alt="">
            <div class="info">
              <div><span style="color:#98A9BF;font-size:12px;">客户经理</span><span style="margin-left:12px;">巍然</span></div>
              <div style="margin-top:13px;"><span style="color:#98A9BF;font-size:12px;">电话客服</span><span style="margin-left:12px;">199 8889 8738</span></div>            
            </div>
            <div class="online_kf">
              <img src="../../images/control/line.png" alt="" style="margin:0 5px 0 0;width:16px;">
              在线客服
            </div>
        </div>
        <div class="publish">
          <div style="display:flex;justify-content:space-between;padding-right: 25px;">
            <span style="color:rgba(31,45,61,1);line-height:24px;font-weight:bold;margin:0 0 0 24px;">公告</span>
            <span style="color: rgb(152, 169, 191);font-size: 16px;font-weight: bold;letter-spacing: 5px;cursor: pointer;">...</span>
          </div>
          <div class="detaily_info">
              <div style="display: flex; align-items: center; width: 60%;">
                <div class="red_ball"></div> 
                <p style="margin-left: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">关于V10.1.0版本更新</p>
              </div> 
              <div class="time">2018-05-28</div>
            </div>
          <div class="detaily_info">
              <div style="display: flex; align-items: center; width: 60%;">
                <div class="red_ball"></div> 
                <p style="margin-left: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">关于前端框架调整</p>
              </div> 
              <div class="time">2018-05-28</div>
            </div>  
          <div class="detaily_info">
              <div style="display: flex; align-items: center; width: 60%;">
                <div class="red_ball"></div> 
                <p style="margin-left: 10px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">关于前端框架调整</p>
              </div> 
              <div class="time">2018-05-28</div>
          </div>            
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
  name: "recruitment",
  props:['typeMsg'],
  data() {
    var nowYear=new Date().getFullYear();
    var nowMonth=(new Date().getMonth()+1)<10?'0'+(new Date().getMonth()+1):(new Date().getMonth()+1);
    var nowDay=(new Date().getDate())<10?'0'+(new Date().getDate()):(new Date().getDate());
    return {
      value4:false,
      value3:false,
      chooseDateVal:nowYear+'-'+nowMonth+'-'+nowDay,
      chooseMonth:nowMonth,
      chooseYear:nowYear,
      chooseDay:nowDay,
      nowMounths:[],
      mounthList:{},
      nowYear:'',
      nowMonth:'',
      nowDay:'',
      type:this.$route.query.type,
      Restaurant:false,
      store:false,
      retail:false,
      userphone:'',
      username:'',
      which_created:''
    };
  },
  created () {
    this.which_load(this.type);
  },
  mounted: function() {
    this.getStoreInfo();
    this.getDateList();
  },
  methods: {
    getStoreInfo(){
      var _this = this;
      var method="store/getStoreInfo", //店铺信息查询
      param=JSON.stringify({
        id:_this.$route.query.shopid
      }),
      successd=function(res){
        console.log(res);
        _this.userphone = res.data.data.phone;
        _this.username = res.data.data.name;
      };
      _this.$http(method,param,successd);
    },
    which_load(type){
      switch (type) {
        case '1'://电商
          this.store = true; 
          this.retail = false;
          this.Restaurant = false;
          this.which_created = "电商版"
          break;
        case '3'://餐饮
          this.Restaurant = true;
          this.store = false;
          this.retail = false;
          this.which_created = "餐饮版"
          break;
        case '2'://零售
          this.retail = true;
          this.store = false;
          this.Restaurant = false;
          this.which_created = "零售版"
          break;
        default:
          break;
      }
    },
    getDateList(){
      var self=this;
      var method="store/haveRecordDates",
          param=JSON.stringify({
            chooseMonth:self.chooseMonth,
            chooseYear:self.chooseYear
          }),
          successd=function(res){
            var dateObj=res.data.data.haveRecordDates;
            self.nowYear=res.data.data.nowDate.substring(0,4);
            self.nowMonth=res.data.data.nowDate.substring(5,7);
            self.nowDay=res.data.data.nowDate.substring(8,10);
            var nowMounths=new Array();
            for (var key in dateObj) {
              // self.nowMounths.push([key.substring(8)]=dateObj[key]);
              var chooseYear=key.substring(0,4);
              var chooseMonth=key.substring(5,7);
              var chooseDay=key.substring(8,10);
              nowMounths.push({
                'chooseYear':chooseYear,
                'chooseMonth':chooseMonth,
                'chooseDay':chooseDay,
                'value':dateObj[key],
                'current':self.chooseMonth==chooseMonth
              });
            }
            self.nowMounths=JSON.parse(JSON.stringify(nowMounths));
            self.mounthList=new Array();
            console.log(self.mounthList)
            for(var i=0;i<6;i++){
              if(nowMounths.length>0){
                self.mounthList.push(nowMounths.splice(0,7));
              }
            }
          };
      self.$http(method,param,successd);
    },
    preMonth(){//上一月
      this.chooseDateVal=new Date(new Date(this.chooseDateVal).getTime()-30*24*60*60*1000);
      this.chooseYear=this.chooseDateVal.getFullYear();
      this.chooseMonth=this.chooseDateVal.getMonth()<9?'0'+(this.chooseDateVal.getMonth()+1):this.chooseDateVal.getMonth()+1;
      this.chooseDay=this.chooseDateVal.getDate();
      this.chooseDateVal=this.chooseYear+'-'+this.chooseMonth+'-'+this.chooseDay;
      this.getDateList();
      this.interviewArrangement();
    },
    nextMonth(){
      this.chooseDateVal=new Date(new Date(this.chooseDateVal).getTime()+30*24*60*60*1000);
      this.chooseYear=this.chooseDateVal.getFullYear();
      this.chooseMonth=this.chooseDateVal.getMonth()<9?'0'+(this.chooseDateVal.getMonth()+1):this.chooseDateVal.getMonth()+1;
      this.chooseDay=this.chooseDateVal.getDate();
      this.chooseDateVal=this.chooseYear+'-'+this.chooseMonth+'-'+this.chooseDay;
      this.getDateList();
      this.interviewArrangement();
    },
    chooseDate(day){
      // console.log(day)
      var self=this;
      if(!day.current){return false}
      self.chooseYear=day.chooseYear;
      self.chooseMonth=day.chooseMonth;
      self.chooseDay=day.chooseDay;
      self.chooseDateVal=day.chooseYear+'-'+day.chooseMonth+'-'+day.chooseDay;
      self.nowMonth=day.chooseMonth;
      self.nowYear=day.chooseYear;
      self.nowDay=day.chooseDay;
      // console.log(self.chooseDateVal);
      self.interviewArrangement();
    },
    interviewArrangement(){
      console.log(this.chooseDateVal)
    }
  },
  watch: {
    $route(to, form) {
      var type = String(this.$route.query.type);// 路由参数发生变化之后 没有监听url附带参数的变化 需要重新赋值
      if (to.fullPath != form.fullPath) {
        this.which_load(type);
        this.getStoreInfo();
      }
    }
  },
};
</script>
<style scoped>
  .member_num .information{
    display: flex;
    align-items: center;
    margin-left:24px!important;
  }
  .member_num .information div{
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-left:24px;
    width:30%;
  }
  .member_num .information div:last-child{
    margin-left:15%;
  }
  .member_num .information div span:last-child{
    font-size:16px;
    color:rgba(31,45,61,1);
    line-height:22px;
    margin-top:8px;
    font-weight: bold;
  }
  .member_num{
    display: flex;
    font-size:14px;
    color:rgba(31,45,61,1);
    line-height:20px;
  }
  .member_num>div img{
    width:48px;
  }
  .member_num>div{
    width:50%;
  }
  .Member_zone{
    width:100%;
    background: #fff;
    overflow: hidden;
  }
  .Printer>div{
    width:50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .Printer>div img{
    width:24px;
    margin-bottom: 8px;
  }
  .Printer{
    display: flex;
    width:100%;
    height:69px;
    background: #fff;
    margin-top:24px;
    font-size:12px;
    color:rgba(70,86,105,1);
    line-height:17px;
  }
  .Receipt .Deliver_goods{
    width: 89.5%;
    height:40px;
    border:1px solid rgba(228,231,237,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin:16px auto;
    border-left: 4px solid rgba(228,231,237,1);
  }
  .Receipt .Deliver_goods.active{
    border-left: 4px solid #5CB3FF;
  }
  .food>div{
    width:50%;
    overflow: hidden;
  }
  .food .Takeoutfood .Takeoutfood_status{
    display: flex;
    margin: 16px 0 0 24px;
  }
  .Restaurant .food{
    width:100%;
    height:164px;
    background: #fff;
    margin-top: 18px;
    display: flex;
  }
  .red_ball{
    width: 6px;
    height: 6px;
    background: #FF566B;
    border-radius: 50%;
    position: absolute;
  }
  .detaily_info{
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: justify;
      justify-content: space-between;
      padding-right: 26px;
      padding-left: 24px;
      color: #475669;
      font-size: 14px;
      margin-top: 8px;
      cursor: pointer;
      position: relative;
  }
  .detaily_info:hover {
      color: #5CB3FF;
  }
  .publish{
    width: 100%;
    background: #fff;
    overflow: hidden;
    margin-top: 24px;
    padding-top: 17px;
    padding-bottom: 16px;
  }
  .online_kf{
    width:85px;
    height:27px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(220,223,230,1);
    float: right;
    font-size:12px;
    color:rgba(92,179,255,1);
    text-align: center;
    line-height: 27px;
    cursor: pointer;
    position: absolute;
    top: 24px;
    right: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Customer_manager{
    width: 100%;
    height: 109px;
    background: #fff;
    margin-top: 24px;
    overflow: hidden;
    position: relative;
  }
  .Customer_manager img{
    float: left;
    margin: 29px 16px 0 22px;
  }
  .Customer_manager .info{
    margin-top: 24px;
    overflow: hidden;
  }
  .add_shop{
    width: 100%;
    height:69px;
    background:rgba(255,181,116,0.16);
    margin-bottom:24px;
    display: flex;
    align-items: center;
  }
  .add_shop img{
    width:50px;
    margin-left:23px;
  }
  .add_shop .add{
    margin-left:23px;
    width:85px;
    height:27px;
    background:rgba(255,255,255,1);
    border-radius:4px;
    border:1px solid rgba(220,223,230,1);
    text-align: center;
    line-height: 27px;
    cursor: pointer;
  }
  .personal_activity{
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #1F2D3D;
    color:rgba(31,45,61,1);
  }
  .Edition{
    width:58px;
    height:28px;
    background:rgba(92,182,255,1);
    border-radius:5px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    color:rgba(255,255,255,1);
    line-height:28px;
    text-align: center;
    margin: 16px 16px 0 0;
  }
  .more_service>div span:first-child{
    font-size: 16px;
    margin-top: 40px;
  }
  .more_service>div span:last-child{
    font-size: 16px;
    margin-top: 7px;
  }
  .more_service>div{
    cursor: pointer;
    width: 22%;
    height: 121px;
    background: #97CEFF;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    color: rgba(255,255,255,1);
  }
  .look{
    width:118px;
    height:32px;
    background:rgba(92,179,255,1);
    border-radius:4px;
    font-size:14px;
    color:rgba(255,255,255,1);
    line-height:32px;
    text-align: center;
    float: right;
    margin: 16px;
    cursor: pointer;
  }
  .always_function .function,.more_service{
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
  .always_function .function>div{
    width:14.3%;
    height:52px;
    border-radius:5px;
    border:1px solid #EBEEF5;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .always_function{
    background: #fff;
    margin-top:24px;
    overflow: hidden;
    padding: 18px 24px 24px 24px;
    font-size:14px;
    color:rgba(31,45,61,1);
    line-height:20px;
  }
  .all_activity{
    display: flex;
    justify-content: space-between;
    padding: 16px;
  }
  .all_activity>div{
    width:29%;
    min-height: 180px;
    background: #F8F8F8;
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size:14px;
    color:rgba(70,86,105,1);
    line-height:20px;
    justify-content: center;
    align-items: center;
  }
  .calendar_detaily{
    overflow: hidden;
    width:74%;
    padding-top:18px;
  }
  .calendar_all{
    display: flex;
    background: #fff;
    width: 100%;
    margin-top: 24px;
    overflow: hidden;
  }
  .recruitment_left{
    width:66%;
    background: #f5f8fa;
    overflow: hidden;
    float: left;
  }
  .recruitment_right{
    width:346px;
    background: #f5f8fa;
    margin-left: 24px;
    float: left;
  }
  .Order_info{
    width:20%;
    height:96px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-right:1px solid #F2F6FC;
  }
  .Order{
    display: flex;
    background: #fff;
  }
  .Order .Order_info_num{
    font-size:24px;
    color:rgba(31,45,61,1);
    line-height:29px;
  }
  .Order .Order_info span:last-child{
    font-size:14px;
    color:#465669;
    line-height:20px;
    margin-top: 8px;
  }
  .Member_info_Interaction{
    margin-top: 24px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding-top: 16px;
  }
  .Member_info_Interaction>div>span{
    display: block;
    font-size:14px;
    color:rgba(31,45,61,1);
    line-height:20px;
    font-weight: bold;
    padding-bottom: 16px;
    text-align: center;
  }
  .Member_info_Interaction>div{
    padding-bottom: 16px;
    width: 30%;
  }
  .Member_info>div{
    height:40px;
    background: #ccc;
    display: flex;
    line-height: 40px;
    justify-content: space-between;
  }
  .Member_info_Interaction .Member{
    margin-left:24px;
  }
  .Member_info_Interaction .Interaction{
    margin-right:24px;
  }
  .calendar_header{
    text-align: center;
    margin: 12px;
    line-height: 22px;
  }
  .calendar{
    width: 25.3%;
    
    margin-top: 26px;
    margin-bottom: 28px;
    padding: 0 20px;
  }
  .calendar .el-date-table td{
    padding: 8px 0;
    width:40px;
  }
  .calendar .el-date-table th{
    padding: 8px 0;
    width: 40px;
    height: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    position: relative;
  }
  .calendar .el-date-table td:hover {
    color: #ccc!important;
  }
  .calendar .hasRecord:after {
      content: '';
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #ff4949;
      display: block;
      position: absolute;
      bottom: 3px;
      left: 50%;
      margin-left: -2px;
  }
  .calendar .current{
    background: #5aa2e7;
  }
  .el-date-table .disabled{
      background: #F4F4F4;
      cursor: not-allowed;
  }
  .h_user_information {
    overflow: hidden;
    background-color: #fff;
    box-sizing: border-box;
  }
  .h_user_information .user_info{
    overflow: hidden;
    width: 100%;
    height: 82px;
    border-bottom: 1px solid #EBEEF5;
    display: -ms-flexbox;
    display: flex;
    justify-content: space-between;
  }
  .h_user_information .user_info img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-top: 16px;
    margin-left: 24px;
  }
  .getPercent{
    display: flex;
    text-align: center;
    flex-direction: column;
  }
  .getPercent .percent {
    width: 33.3%;
    font-size: 14px;
  }
  .getPercent .percent .percent_detaily{
      color: #1F2D3D;
      font-weight: bold;
      margin-top: 18px;
  }
  .getPercent .percent .percent_introduce{
      color: #465669;
      margin-top: 10px;
  }
  .Member_info_Interaction img{
    width: 16px;
  }
  .calendar_detaily img{
    width: 35px;
  }
</style>
<style>
  .food .Takeoutfood .Takeoutfood_status .el-switch__label.is-active{
    color: #fff;
  }
  .food .el-switch__label--left{
    margin-right: -19px;
    z-index: 9;
    position: relative;
    color:#fff;
    font-size:12px;
  }
  .food .el-switch__label--right{
    margin-left: -19px;
    z-index: 9;
    position: relative;
    color:#fff;
    font-size:12px;
  }
  .food .el-switch__core{
    width:44px!important;
    height:22px;
  }
  .food .el-switch.is-checked .el-switch__core::after{
    margin-left: -19px;
    width:18px;
    height:18px;
  }
  .food .el-switch__core:after{
        width:18px;
    height:18px;
  }
  .shop_detaily {
    width:100%;
    background: #CCF0D6;
    overflow: hidden;
    padding:8px 0;
  }
  .shop_detaily_top{
    display: flex;  
    height: 32px;
    line-height: 34px;
    font-size: 16px;
    font-weight: bold;
  }
  .update_now{
    width: 95px;
    height: 28px;
    line-height: 28px;
    background: red;
    border-radius: 5px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    margin: 0 5px;
    cursor: pointer;
  }
  .shop-basic-info{
    display: flex;
    margin:8px 0 24px 0;
  }
  .shop-basic-info .Label{
    cursor: pointer;
    width:55px;
    height:22px;
    line-height:22px;
    text-align:center;
    border-radius:4px;
    margin:0 5px;
    font-size:12px;
  }
  .Expire{
    background: #ff4343;
    border: 1px solid #e8393a;
    color: #fff;
    padding: 8px 0;
    display: flex;
    align-items: center;
  }
  .Expire .information{
    display: flex;
    flex-direction: column;
  }
  .Expire .information span{
    margin:2px 0;
  }
  .Expire .buy_now{
    width:100px;
    line-height:32px;
    text-align:center;
    border-radius:5px;
    background:#fff;
    color:#f44;
    margin-left:25px;
    cursor: pointer;
  }
</style>
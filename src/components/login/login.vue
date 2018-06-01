<template>
    <div id="login_main">
        <div class="headerBox font_size_14">
            <div class="fixedWidth overflow_hidden">
                <div class="float_left headerBox-logo">
                    <img src="https://appscrm.ecbao.cn/static/images/scrm_logo2.png">
                </div>
                <div class="float_right lineHeight_70">
                    <span class="color_999">还没有账号?</span>
                    <a href="javascript:void(0)" class="sui-btn btn-primary custom-no-bordered btn-large margin_left_6 goRegister" @click="register">立即注册</a>
                </div>
            </div>
        </div>
        <div class="loginWrapper">
            <div class="loginBox">
                <!--密码登录-->
                <div class="loginBox-password">
                    <div class="login-topBox">
                        <div class="changeList">
                            <!-- <div class="listLine"></div> -->
                            <div class="listItem active" id="passLogin">密码登录</div>
                            <!-- <div class="listItem" id="QrLogin" ng-click="weChatLogin.show()">扫码登录</div> -->
                        </div>
                    </div>
                    <!--主账号登录-->
                    <div class="changeBody" id="input1">
                        <form name="loginForm" class="loginForm">
                            <div class="custom-form-item">
                            <span class="itemIcon">
                                <span>
                                    <i class="iconfont">&#xe656;</i>
                                </span>
                            </span>
                                <input type="number" placeholder="手机号" name="phone" @blur="checkphone(phone)" v-model='phone'>
                            </div>
                            <div class="custom-form-item margin_top_12">
                            <span class="itemIcon">
                                <span>
                                    <i class="iconfont">&#xe692;</i>
                                </span>
                            </span>
                                <input type="password" placeholder="密码" name="password" autocomplete="off" v-model="password" @blur="checkpassword(password)">
                            </div>
                            <div class="custom-form-item margin_top_12 overflow_hidden">
                                <!-- <label class="float_left color_797979"><input type="checkbox" ng-model="rememberAccount" ng-click="!rememberAccount" class="margin_right_3">记住账户</label> -->
                                <!-- <a href="javascript:void(0)" class="float_right color_797979" id="findPassword" ng-click="goFindPassword()">忘记密码?</a> -->
                            </div>
                            <div class="custom-form-item margin_top_12">
                                <a href="javascript:void(0)" class="sui-btn btn-primary custom-btn-registr" id="login" @click="login">登&nbsp;录</a>
                                <a href="javascript:void(0)" class="margin_top_12 sui-btn btn-xlarge custom-btn-registr we-chat-btn goRegister" @click='register'>注&nbsp;册</a>
                            </div>
                            <div class="custom-tip text_center">
                                <span ng-show="isError" class="error-tip" style="display: inline;" v-show="phone_warn">{{error_warn}}</span>
                            </div>
                        </form>
                        <!-- <div class="scan_main">
                            <div class="bg_scan">
                                <div class="we-chat-box">
                                    <div id="wechat_autoScan"></div>
                                </div>
                            </div>
                            <div class="bg_scan_tip">
                                <div class="tipWord">
                                    <p>请用微信扫一扫方便登录</p>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
        <div class="copyright1 text_center color_999">
            <div>
                软件证书编号：浙RC-2016-0918 | 软件著作权登记号：2016SR285973 | 浙ICP备12032625号-3 |
                <img src="https://appscrm.ecbao.cn/static/images/icon_safe.png" class="icon-safe">浙公网安备 33010602004534号
            </div>
            <div>杭州爱聚科技有限公司 版权所有2012-2017</div>
        </div>
        <router-view keep-alive></router-view>
    </div>    
</template>
<script>
export default {
  name: "login_main",
  data() {
    return {
        phone:'',
        password:'',
        phone_warn:false,
        error_warn:''
    };
  },
  created () {
    
  },
  mounted: function() {
      
  },
  methods: {
    checkphone(phone){
        var check = false;
        if (phone == "") {
            this.error_warn = "手机号码不能为空";
            this.phone_warn = true;
        } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
            this.error_warn = "手机号码填写错误";
            this.phone_warn = true;
        } else {
            check = true;
            this.phone_warn = false;
        } 
        return check;
    },
    checkpassword(password){
        var check = false;
        if (password == "") {
            this.error_warn = "密码不能为空";
            this.phone_warn = true;
        } else {
            check = true;
        }
        return check;
    },
    login(){
        if (this.checkphone(this.phone)&&this.checkpassword(this.password)) {
            var _this = this;
            let method = 'account/login', //登录
            params = {
                account:_this.phone,
                password:_this.password
            },
            callBack = (res)=>{
                sessionStorage.setItem("token",res.data.data.token)
                if(res.data.code == 0){
                    var method="store/getUserInfo", //是否有店铺 
                    param=JSON.stringify({}),
                    successd=function(res){
                        sessionStorage.setItem("shopid",res.data.data.id);
                        if(res.data.data.hasStore == 1){
                          switch (res.data.data.storeType) {
                              case 1:
                                  _this.$router.push({path:'/scrm/main',query:{type:'1',shopid:res.data.data.id}});//电商
                                  break;
                              case 2:
                                  _this.$router.push({path:'/scrm/main',query:{type:'2',shopid:res.data.data.id}});//零售
                                  break;
                              case 3:
                                  _this.$router.push({path:'/scrm/main',query:{type:'3',shopid:res.data.data.id}});//餐饮
                                  break;
                              case 4:
                                  _this.$router.push({path:'/scrm/Trading_Area',query:{shopid:res.data.data.id}});//商圈
                              default:
                                  break;
                          }
                        }else{
                            _this.$router.push({path:'creatshop'});
                        }
                    };
                    _this.$http(method,param,successd);
                }
            }
            this.$web_Http(method, params, callBack);
        }
    },
    register(){
        this.$router.push({'path':'register'});
    }
  },
  watch: {
    
  },
};
</script>
<style scoped>
#login_main{
    width:100%;
    height:100%;
    position: fixed;
    overflow: hidden;
}
.headerBox {
    height: 70px;
    box-shadow: 1px 3px 3px #eee;
}
.font_size_14 {
    font-size: 14px;
}
.fixedWidth {
    width: 1280px;
    margin: 0 auto;
}
.overflow_hidden {
    overflow: hidden;
}
.headerBox-logo {
    line-height: 70px;
}
.headerBox-logo img {
    max-width: 100%;
    width: auto;
    height: auto;
    vertical-align: middle;
    border: 0;
    -ms-interpolation-mode: bicubic;
}
.lineHeight_70 {
    line-height: 70px;
}
.float_right {
    float: right;
}
.color_999 {
    color: #999;
}
.custom-no-bordered {
    background-color: #fff;
    border: 1px solid #11a0f9;
    color: #11a0f9;
    border-radius: 14px;
    margin-left: 6px;
    font-size: 12px;
    padding: 2px 14px;
    line-height: 22px;
}

.loginWrapper {
    position: absolute;
    top: 70px;
    width: 100%;
    height: 80%;
    max-height: 740px;
    background: #3c5a85 url('https://scrmcdn.ecbao.cn/static/images/login/loginBg.png') repeat center center;
}
.loginBox {
    width: 300px;
    overflow: hidden;
}
.loginBox {
    position: absolute;
    top: 50%;
    right: 20%;
    width: 320px;
    height: 350px;
    margin-top: -211px;
    background-color: #fff;
}
::-webkit-scrollbar {
    width: 0px;
}
::-webkit-scrollbar {
    background: transparent;
    width: 10px;
    height: 10px;
}
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background-color: #e1e1e1;
    width: 6px;
    height: 6px;
    border: 2px solid transparent;
    background-clip: content-box;
}
::-webkit-scrollbar-track {
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    background-color: #fafafa;
}
::-webkit-scrollbar-track-piece {
    display: none;
}
.login-topBox {
    width: 230px;
    background: none;
}
.login-topBox {
    position: relative;
    height: 54px;
    width: 250px;
    border-bottom: 1px solid #e6e6e6;
    font-size: 16px;
    color: #333;
    line-height: 54px;
    margin: 0 auto;
    margin-bottom: 12px;
    /* background: url(../images/login/scan_topBg.png)no-repeat 35px center; */
}
.changeList {
    height: 100%;
    /* display: flex; */
    text-align: center;
    /* align-items: center; */
    /* justify-content: center; */
    color: #999;
    position: relative;
}
.listItem {
    /* flex: 1; */
    cursor: pointer;
    transition: all .3s cubic-bezier(.645,.045,.355,1);
    border-bottom: 2px solid transparent;
    width: 100%;
    float: left;
}
.changeList {
    height: 100%;
    /* display: flex; */
    text-align: center;
    /* align-items: center; */
    /* justify-content: center; */
    color: #999;
    position: relative;
}
.changeList .active {
    color: #333!important;
    border-bottom: 2px solid #11A0F9;
}
.loginForm {
    flex-shrink: 0;
    transition: opacity .45s;
    opacity: 1;
    box-sizing: border-box;
    width: 300px;
    max-width: 100%;
    float: left;
}
.loginForm {
    padding: 15px 35px;
}
form {
    display: block;
    margin-top: 0em;
}
.loginForm .custom-form-item {
    position: relative;
}
.loginForm .itemIcon {
    position: absolute;
    left: 1px;
    top: 1px;
    width: 40px;
    height: 40px;
    line-height: 42px;
    text-align: center;
    background-color: #e8e8e8;
}
.loginForm .itemIcon i {
    color: #c2c2c2;
    font-size: 22px;
}
.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}
.loginForm .custom-form-item input[type=number], .loginForm .custom-form-item input[type=password] {
    padding-left: 50px;
    background-color: #f8f8f8;
    height: 42px;
    line-height: 42px;
}
.custom-form-item input[type=number], .custom-form-item input[type=password] {
    display: block;
    width: 100%;
    height: 42px;
    line-height: 40px;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 14px;
    border: 1px solid #e1e1e1;
}
.loginForm .custom-form-item {
    position: relative;
}
.margin_top_12 {
    margin-top: 12px;
}
.loginForm .custom-form-item {
    position: relative;
}
.color_797979 {
    color: #797979;
}
.float_left {
    float: left;
}
label {
    cursor: default;
}
label, select, button, input[type="button"], input[type="reset"], input[type="submit"], input[type="radio"], input[type="checkbox"] {
    cursor: pointer;
}
.margin_right_3 {
    margin-right: 3px;
}
.color_797979 {
    color: #797979;
}
.float_right {
    float: right;
}
.loginForm .custom-form-item {
    position: relative;
}
.margin_top_12 {
    margin-top: 12px;
}
.loginForm .custom-btn-registr {
    font-size: 16px;
    text-align: center;
}
.text_center {
    text-align: center;
}
.custom-tip {
    /* display: none; */
    height: 18px;
    font-size: 12px;
    color: red;
    padding: 8px 0;
    text-align: center;
}
.we-chat-btn {
    /* color: #11A0F9; */
    border: 1px solid #C8C8C8;
    background-color: #fff;
    border-color: #e1e1e1;
}
.custom-btn-registr {
    line-height: 38px;
}
.custom-btn-registr {
    display: block;
    height: 42px;
    padding: 0;
    line-height: 42px;
    font-size: 14px;
    border-radius: 0;
}
.btn-primary {
    color: #fff;
    background-color: #28a3ef;
    /* filter: progid:DXImageTransform.Microsoft.gradient(enabled = false); */
    border: 1px solid #1299ec;
}
.copyright1 {
    position: absolute;
    top: 92%;
    width: 100%;
    font-size: 12px;
}
.we-chat-btn:hover {
    /* border: none; */
    /* border: 1px solid #e1e1e1; */
    /* background-color: pink; */
    border-color: #e1e1e1;
}
</style>
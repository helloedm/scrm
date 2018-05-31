<template>
    <div id="register">
        <div class="registerBox margin_top_70 ng-scope">
            <div class="text_center headerBox-logo">
                <img src="https://appscrm.ecbao.cn/static/images/SCRMlogo.png">
            </div>
            <div class="myStep">
                <div class="stepItem">
                    <div class="itemNum"></div>
                </div>
                <div class="stepItem"></div>
                <div class="stepItem"></div>
            </div>
            <form class="margin_top_25 ng-pristine ng-valid" name="registerForm" ng-show="isActive[0]">
                <div class="custom-form-item">
                    <input type="text" placeholder="手机号" name="phone" @blur="checkphone(phone)"  v-model='phone' class="ng-pristine ng-untouched ng-valid ng-empty">
                    <span class="custom-tip">
                        <span class="ng-binding ng-hide" v-show="phone_is_warn">{{phone_warn}}</span>
                    </span>
                </div>
                <div class="custom-form-item positionRelative">
                    <input type="text" placeholder="输入短信验证码" name="messCode" @blur="checkVerificationCode(VerificationCode)" v-model='VerificationCode' class="ng-pristine ng-untouched ng-valid ng-empty">
                    <span class="codeBox">
                        <span class="getMessCode ng-binding" @click="getVerificationCode()">{{getcode}}</span>
                    </span>
                    <span class="custom-tip">
                        <span class="ng-binding ng-hide" v-show="VerificationCode_is_warn">{{VerificationCode_warn}}</span>
                    </span>
                </div>
                <div class="custom-form-item">
                    <input type="password" placeholder="密码" @blur="checkpassword(password)" v-model='password' name="password" class="ng-pristine ng-untouched ng-valid ng-empty">
                    <span class="custom-tip">
                        <span class="ng-binding ng-hide" v-show="password_is_warn">{{password_warn}}</span>
                    </span>
                </div>
                <div class="custom-form-item">
                    <input type="password" placeholder="确认密码" @blur="checkpassword_again()" v-model='checkagain' name="passwordRepeat" class="ng-pristine ng-untouched ng-valid ng-empty">
                    <span class="custom-tip">
                        <span class="ng-binding ng-hide" v-show="checkagain_is_warn">{{checkagain_warn}}</span>
                    </span>
                </div>
                <div class="custom-form-item margin_top_20">
                    <a href="javascript:void(0)" class="sui-btn btn-primary custom-btn-registr" @click="register()">立即注册</a>
                </div>
            </form>
            <div class="text_center headerBox-options">
                <span class="color_999">已有账号?</span>
                <a href="javascript:void(0)" class="margin_left_8" @click="login_now">立即登录</a>
            </div>
        </div>
        <div class="copyright text_center color_999 ng-scope">
    <div>
        软件证书编号：浙RC-2016-0918 | 软件著作权登记号：2016SR285973 | 浙ICP备12032625号-3 |
        <img src="https://appscrm.ecbao.cn/static/images/icon_safe.png" class="icon-safe">浙公网安备 33010602004534号
    </div>
    <div>杭州爱聚科技有限公司 版权所有2012-2017</div>
</div>
    </div>
</template>
<script>
import {clearInterval,setInterval} from 'timers'
export default {
  name: "register",
  data() {
    return {
        phone_is_warn:false,
        VerificationCode_is_warn:false,
        password_is_warn:false,
        checkagain_is_warn:false,

        phone:'',
        VerificationCode:'',
        password:'',
        checkagain:'',

        phone_warn:'',
        VerificationCode_warn:'',
        password_warn:'',
        checkagain_warn:'',

        getcode:"获取验证码"
    };
  },
  created () {
    
  },
  mounted: function() {

  },
  methods: {
    login_now(){
        this.$router.push({'path':'login'})
    },
    checkphone(phone){
        var check = false;
        if (phone == "") {
            this.phone_warn = "请填写手机号";
            this.phone_is_warn = true;
        } else if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)) {
            this.phone_warn = "请输入正确的手机号";
            this.phone_is_warn = true;
        } else {
            check = true;
            this.phone_is_warn = false;
        } 
        return check;
    },
    checkVerificationCode(data){
        var check = false;
        if (data == "") {
            this.VerificationCode_warn = "请填写短信验证码";
            this.VerificationCode_is_warn = true;
        } else {
            check = true;
            this.VerificationCode_is_warn = false;
        } 
        return check;
    },
    checkpassword(data){
        var check = false;
        if (data == "") {
            this.password_warn = "密码不能为空";
            this.password_is_warn = true;
        } else if(data.length<8||data.length>25){
            this.password_warn = "密码长度为8-25个字符";
            this.password_is_warn = true;
        } else {
            this.password_is_warn = false;
            check = true;
        }
        return check;
    },
    checkpassword_again(){
        var check = false;
        if (this.password != this.checkagain) {
            this.checkagain_warn = "两次输入的密码不同";
            this.checkagain_is_warn = true;
        } else {
            this.checkagain_is_warn = false;
            check = true;
        }
        return check;
    },
    getVerificationCode(){
        var _this = this;
        if (_this.checkphone(this.phone) && _this.getcode == "获取验证码") {
            let method = 'account/getVerifyCode',
            params = {
                phone:_this.phone,
            },
            callBack = (res)=>{
                if (res.data.code == 0) {
                    var count = 60;
                    _this.timers = setInterval(() => {
                        count--;
                        if (count == 0) {
                            clearInterval(_this.timers);
                            _this.getcode = "获取验证码";
                        } else {
                            _this.getcode = count+"s后重发";
                        }
                    }, 1000);
                }
            }
            this.$web_Http(method, params, callBack);            
        }
    },
    register(){
        if(this.checkphone(this.phone)&&this.checkVerificationCode(this.VerificationCode)&&this.checkpassword(this.password)&&this.checkpassword_again(this.checkagain)){
            var _this = this;
            let method = 'account/registerByPhone',
            params = {
                phone:_this.phone,
                code:_this.VerificationCode,
                password:_this.password
            },
            callBack = (res)=>{
                this.$router.push({"path":'login'})
            }
            this.$web_Http(method, params, callBack);
        }
    }
  },
  watch: {
    
  },
};
</script>
<style scoped>
.copyright {
    position: static;
    margin-top: 80px;
    font-size: 12px;
}
.copyright {
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-bottom: 50px;
}
.text_center {
    text-align: center;
}
.color_999 {
    color: #999;
}
.registerBox {
    width: 304px;
    margin-left: auto;
    margin-right: auto;
}
.margin_top_70 {
    margin-top: 70px;
}
.headerBox-logo {
    margin-bottom: 30px;
}
.headerBox-logo {
    line-height: 70px;
}
.text_center {
    text-align: center;
}
.margin_top_25 {
    margin-top: 25px;
}
.custom-form-item input[type=text], .custom-form-item input[type=password] {
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
.positionRelative {
    position: relative;
}
.codeBox {
    position: absolute;
    right: 0;
    top: 0;
    padding: 4px;
    cursor: pointer;
}
.getMessCode {
    display: inline-block;
    width: 86px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background-color: #f2f2f2;
    cursor: pointer;
}
.custom-tip {
    display: block;
    height: 18px;
    font-size: 12px;
    color: red;
    padding: 6px 0;
}
.custom-btn-registr {
    display: block;
    height: 42px;
    padding: 0;
    line-height: 42px;
    font-size: 14px;
    border-radius: 0;
}
.sui-btn {
    border-radius: 0;
}
.btn-primary {
    color: #fff;
    background-color: #28a3ef;
    filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
    border: 1px solid #1299ec;
}
.sui-btn {
    display: inline-block;
    padding: 2px 14px;
    box-sizing: border-box;
    margin-bottom: 0;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    color: #333;
    background-color: #eee;
    filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
    border: 1px solid #e1e1e1;
    border-color: #ececec;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}
a {
    color: #11a0f9;
}
a {
    color: #28a3ef;
    text-decoration: none;
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
    filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
    border: 1px solid #1299ec;
}
.headerBox-options {
    padding-top: 32px;
}
.text_center {
    text-align: center;
}
.color_999 {
    color: #999;
}
.margin_left_8 {
    margin-left: 8px;
}
a {
    color: #11a0f9;
}
a {
    color: #28a3ef;
    text-decoration: none;
}
</style>


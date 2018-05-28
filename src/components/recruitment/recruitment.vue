<template>
  <div class="recruitment" id="recruitment">
    <!-- <h1>每次相遇有趣的你,都是我的小确幸</h1> -->
    <div class="h_top_info">

      <div class="h_recruitment_progress">
        <div style="margin-top:16px;margin-left:20px;font-size:16px;font-weight:bold;">招聘进展</div>
        <div class="recruitment_progress_detaily">
          
          <div class="detaily">
              <router-link to="talents/newResume">
                <div class="num">{{getRecruitmentProgress.newResumeCount}}</div>
                <div class="class">新简历</div>
              </router-link>
          </div>            
          
          <div class="detaily" @click="setlibrary( 2,'library')">
            <router-link to="talents/library">
              <div class="num">{{getRecruitmentProgress.awaitInterviewCount}}</div>
              <div class="class">待面试</div>
            </router-link>
          </div>

          <div class="detaily" @click="settalentStatus(1,'talentpool')">
              <div class="num">{{getRecruitmentProgress.awaitOfferCount}}</div>
              <div class="class">沟通offer</div>
          </div>

          <div class="detaily" @click="settalentStatus(3,'talentpool')">
              <div class="num">{{getRecruitmentProgress.awaitHireCount}}</div>
              <div class="class">待入职</div>
          </div>
          <div class="detaily">
            <router-link to="talents/enterprise?type=0">
              <div class="num">{{getRecruitmentProgress.confirmJoinCount}}</div>
              <div class="class">已入职</div>              
            </router-link>
          </div>
          <div class="detaily">
            <router-link to="talents/eliminate">
              <div class="num">{{getRecruitmentProgress.eliminateCount}}</div>
              <div class="class">淘汰</div>
            </router-link>
          </div>
        </div>
      </div>

      <div class="h_user_information">

        <div class="user_info">
          <img :src="getPersonalInfo.headImg" alt="">
          <div style="margin:16px 0 0 16px;">
            <div class="user_name" style="font-size:16px;color:#1F2D3D;font-weight:bold;">{{getPersonalInfo.name}}</div>
            <div class="user_company" style="font-size:12px;color:#98A9BF;margin-top:8px;">{{getPersonalInfo.companyName}}</div>            
          </div>
        </div>

        <div class="getPercent">
          <div class="percent">
            <div class="percent_detaily">{{getPercent.interviewPercent}}</div>
            <div class="percent_introduce">面试率</div>
          </div>
          <div class="percent">
            <div class="percent_detaily">{{getPercent.entryPercent}}</div>
            <div class="percent_introduce">录用率</div>
          </div>
          <div class="percent">
            <div class="percent_detaily">{{getPercent.joinPercent}}</div>
            <div class="percent_introduce">入职率</div>
          </div>
        </div>
      </div>

    </div>
    
    <div class="h_middle_info">
      <div class="hrm_module">
        <div class="hrm_module_con recruitment_header">
          <dl class="calendar">
            <div style="margin-top:-17px;font-size:16px;font-weight:bold;margin-bottom:30px;margin-top:-9px;">待办提醒</div>
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
                <tr v-for="week in mounthList">
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
          <div class="work_zone">
            <div class="work_zone_top">
              <span class="date" style="color:#465669;font-size:14px;font-weight:bold;margin-left:24px;float:left;">{{chooseMonth}}月{{chooseDay}}日</span>
              <div class="all_thing" style="margin-left:8px;color:#98A9BF;font-size:12px;float:left;">共有<span>{{interviewerInfos.length}}</span>条工作日程</div>
              <span style="color:#5CB3FF;float:right;margin-right:32px;cursor: pointer;" @click="add_Backlog('','新增待办事项','0')">
                <i class="iconfont">&#xe675;</i>
              </span>
            </div>
            <div class="work_zone_place_none" v-show="!have_schedule">
              <div class="none" >
                <img src="../../images/Dashboard/Page1.png" alt="" style="width:74px;margin-bottom:15px;">
                <div>今日没有日程，点击右上角<span style="color:#5CB3FF;margin:0 5px;"><i class="iconfont" style="font-size:12px;">&#xe675;</i></span>添加工作日程</div>
              </div>
            </div>
            <div class="work_zone_place" v-show="have_schedule">
              <div class="todo_list" v-for="(item,index) in interviewerInfos" @click.prevent="to_resume(item,item.id,item.processStatus)" >
                <div style="width:95%;">
                  <span style="color:#5CB3FF;" :class="{'isgray':item.id == -1&&item.processStatus != 4}">{{item.name}}</span>
                  <span style="margin-left:8px;">{{item.positionName}}</span>
                  <div style="margin-top:4px;" v-if="item.processStatus == 1">待面试</div>
                  <div style="margin-top:4px;" v-else-if="item.processStatus == 2">待录用</div>
                  <div style="margin-top:4px;" v-else-if="item.processStatus == 3">待入职</div>
                  <div style="margin-top:-16px;display: flex;align-items: center;justify-content: space-between;" v-else="item.processStatus == 4">
                    <span style="text-align: justify;">{{item.awaitDeal}}</span>
                    <span style="color:#98A9BF;margin-left:40px;margin-right:32px;cursor: pointer;" @click.stop="delAwaitDeal(item.awaitDealId)">
                      <i class="iconfont">&#xe749;</i>
                    </span>
                  </div>
                </div>
              </div> 
            </div>
          </div>
        </div>

      </div>      
      <div class="Product_dynamics">
          <div class="product_detaily">
            <div style="display:flex;justify-content: space-between;padding-right:26px;margin-bottom:16px;">
              <span style="color:#1F2D3D;font-size:16px;font-weight:bold;margin-left:24px;">产品动态</span>
              <router-link to="/ATS/product_list">
                <span style="color:#1F2D3D;font-size:16px;font-weight:bold;letter-spacing: 5px;color:#98A9BF;cursor: pointer;">...</span>
              </router-link>
            </div>
            <div  class="detaily_info" v-for="(item,index) in getProductTrends" :key="index" @click="to_detaily(item)" v-show="prd_ishow">
              <div style="display:flex;align-items: center;width:60%;">
                <div class="red_ball" v-show="!item.isRead"></div>
                <p style="margin-left:10px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{item.title}}</p>
              </div>
              <div class="time">{{item.createTime.split(" ")[0]}}</div>
            </div>
            <div class="detaily_info_none" v-show="!prd_ishow">
              <img src="../../images/Dashboard/Page2.png" alt="" style="width:60px;">
              <div style="width:100%;margin-top:8px;">还没有产品动态！</div>
            </div>
          </div>  
          <div class="download_micro">
            <div class="micro_img"></div>
            <div class="Copywriting">
              <div style="font-size:16px;color:#1F2D3D;">扫码下载爱聚HR小程序</div>
              <div style="font-size:14px;color:#465669;">随时随地跟进招聘进度</div>
            </div>
          </div>    
      </div>  
    </div>

    <div class="h_bottom_info">
      <span style="font-size: 16px;font-weight: bold;position: absolute;top: 16px;left: 20px;">快捷入口</span>
      <div class="Post" @click="jump_fast('/ATS/recruit/post')" style="margin-left:24px;">
          <img src="../../images/Dashboard/zw.png" alt="">
          <span>发布职位</span>         
      </div>
      <div class="Post" @click="jump_fast('/ATS/talents/newResume')">
        <img src="../../images/Dashboard/Group.png" alt="">
        <span>导入简历</span>
      </div>
      <div class="Post" @click="settalentStatus(1,'talentpool')">
        <img src="../../images/Dashboard/Group10.png" alt="">
        <span>发offer</span>
      </div>
      <div class="Post" @click="jump_fast('/ATS/creatMiniWeb')">
        <img src="../../images/Dashboard/Group13.png" alt="">
        <span>公司主页</span>
      </div>
      <div class="Post" @click="jump_fast('/miniIndex')">
        <img src="../../images/Dashboard/Group14.png" alt="">
        <span>小程序</span>
      </div>
      <div class="Post" @click="jump_fast('/ATS/recommendPost')">
        <img src="../../images/Dashboard/Group17.png" alt="">
        <span>招聘活动</span>
      </div>
      <div class="Post" @click="jump_fast('/channelSet')">
        <img src="../../images/Dashboard/Group18.png" alt="">
        <span>绑定渠道</span>
      </div>
      <div class="Post" @click="jump_fast('/envelopeMain')" style="margin-right:24px;">
        <img src="../../images/Dashboard/Group21.png" alt="">
        <span>充值中心</span>
      </div>
    </div>
    
    <!-- <el-button type="text" @click="add_Backlog"></el-button> -->
    <!-- <el-row :gutter="20">
      <el-col :span="12" class="">
        <div class="position_management">
          <h2>职位管理</h2>
          <el-row class="management_top">
            <el-col :span="12">
              <h6>在招职位数</h6>
              <p @click="toList">{{recruitIndexInfo.recruitingPositionMap.recruitingPositionCount}}</p>
            </el-col>
            <el-col :span="12">
              <dl class="issue_resume" @click="toPost">
                <dt>添加新职位</dt>
                <dd><i class="iconfont">&#xe767;</i></dd>
              </dl>
            </el-col>
          </el-row>
          <el-row class="add_resume_header">
            <el-col :span="20">在招职位</el-col>
            <el-col :span="4" class="icon" @click.native="toList" title="查看更多"><i class="iconfont">&#xe622;</i></el-col>
          </el-row>
          <el-row class="add_resume_con" v-for="(position,index) in recruitIndexInfo.recruitingPositionMap.recruitingPositionList" :key="position.id" v-if="index<3">
            <el-col :span="10" class="white-space-nowrap">{{position.positionName}}</el-col>
            <el-col :span="4" class="white-space-nowrap">{{position.workCity?position.workCity:'不限'}}</el-col>
            <el-col :span="10" class="white-space-nowrap">{{position.posiPublishTime?position.posiPublishTime.substring(0,10):''}}</el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="12" class="">
        <div class="position_management">
          <h2>招聘管理</h2>
          <el-row class="management_top">
            <el-col :span="12">
              <h6>新增投递量</h6>
              <p @click="toNewResume">{{recruitIndexInfo.todaysResumeMap.newResumeCount}}</p>
            </el-col>
            <el-col :span="12">
              <h6>未查阅投递量</h6>
              <p @click="toNewResume">{{recruitIndexInfo.unreadResumeCount}}</p>
            </el-col>
          </el-row>
          <el-row class="add_resume_header">
            <el-col :span="20">新增简历</el-col>
            <el-col :span="4" class="icon" @click.native="toNewResume" title="查看更多"><i class="iconfont">&#xe622;</i></el-col>
          </el-row>
          <el-row class="add_resume_con" v-for="(newResume,index) in recruitIndexInfo.todaysResumeMap.newResumeList" ::key="newResume.id" v-if="index<3">
            <el-col :span="10" class="white-space-nowrap">{{newResume.positionName}}</el-col>
            <el-col :span="4" class="white-space-nowrap">{{newResume.name}}</el-col>
            <el-col :span="10" class="white-space-nowrap" v-if="newResume.workYear">{{newResume.workYear}}年工作经历</el-col>
          </el-row>
          <el-row class="add_resume_con" v-if="recruitIndexInfo.todaysResumeMap.newResumeList==null||recruitIndexInfo.todaysResumeMap.newResumeList.length==0">
            <el-col :span="24" class="color_99a9bf">今日暂无新投递简历</el-col>
          </el-row>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>
<script>
export default {
  name:'recruitment',
  data(){
    var nowYear=new Date().getFullYear();
    var nowMonth=(new Date().getMonth()+1)<10?'0'+(new Date().getMonth()+1):(new Date().getMonth()+1);
    var nowDay=(new Date().getDate())<10?'0'+(new Date().getDate()):(new Date().getDate());
    return{
      have_schedule:false,//待办事项
      getRecruitmentProgress:{},
      getPersonalInfo:{},
      getPercent:{},
      interviewerInfos:[],
      activeName:'1',
      chooseDateVal:nowYear+'-'+nowMonth+'-'+nowDay,
      chooseMonth:nowMonth,
      chooseYear:nowYear,
      chooseDay:nowDay,
      nowMounths:[],
      mounthList:{},
      nowYear:'',
      nowMonth:'',
      nowDay:'',
      page1:{
        pageSize:8,
        pageNum:1,
        totalCount:0
      },
      page2:{
        pageSize:8,
        pageNum:1,
        totalCount:0
      },
      page3:{
        pageSize:8,
        pageNum:1,
        totalCount:0
      },
      getProductTrends:[],//产品动态
      awaitHireRecords:[],//待录用
      awaitEntryRecords:[],//待入职
      awaitInterviewRecords:[],//待面试
      recruitIndexInfo:{
        recruitingPositionMap:{},
        todaysResumeMap:{},
        unreadResumeCount:0
      },
      prd_ishow:true,
      Copywriting:"新建待办事项",
    }
  },
  mounted(){
    this.getDateList();
    this.index();
    this.interviewArrangement();
  },
  created(){
    this.Recruitment_progress();//获取招聘进展
    this.getpersonal_info();//获取个人信息
    this.get_Percent();//获取率
    this.get_ProductTrends();//产品动态
  },
  methods:{
  jump_fast(src){
    this.$router.push(src);
  },
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
  get_ProductTrends(){
    var _this = this;
    var method = "dashBoard/getProductTrends";
    var param = JSON.stringify({
      pageNum: 1,
      pageSize: 10
    });
    var successd = function(res) {
      _this.getProductTrends = res.data.data.productTrends.slice(0,4);
      console.log(_this.getProductTrends)
      _this.getProductTrends.length == 0 ? _this.prd_ishow=false : _this._prd_ishow=true;
    };
    _this.$http(method, param, successd);
  },
  delAwaitDeal(data) {
    var _this = this;
    this.$confirm('此操作将永久删除该事项, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      var method="dashBoard/delAwaitDeal",
      param = JSON.stringify({
        id : data
      }),
      successd = function(res) {
        if(res.data.code == "0"){
          _this.$message({
            type: 'success',
            message: '删除成功'
          });
          _this.interviewArrangement();
          _this.getDateList();
        }
      }
      _this.$http(method,param,successd);
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      });          
    });
    },
    add_Backlog(oridinary,Copywriting,id) {
      var _this = this;
      this.$prompt('待办事项内容', Copywriting, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue:oridinary
      }).then(({ value }) => {
          if( value.length > 100 ){
            _this.$message({
              type: 'success',
              message: '工作日程字数不得超过100字！'
            });
          } else {
            var method="dashBoard/editorAwaitDeal",
            param = JSON.stringify({
              id:id,
              content:value,
              dealDate:_this.chooseDateVal
            }),
            successd = function(res) {
              if(res.data.code == "0"){
                _this.$message({
                  type: 'success',
                  message: '操作成功'
                });
                _this.interviewArrangement();
                _this.getDateList();
              }
            }
            _this.$http(method,param,successd);            
          }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    },
    settalentStatus(data,src){
      localStorage.talentStatus = data;
      this.$router.push({name:src});
    },
    setlibrary(data,src){
      localStorage.library = data;
      this.$router.push({name:src});
    },
    Recruitment_progress(){
      var _this = this;
      var method="dashBoard/getRecruitmentProgress",
          param = JSON.stringify({}),
          successd = function(res) {
            if(res.data.code == "0"){
              _this.getRecruitmentProgress = res.data.data;
            }
          }
      _this.$http(method,param,successd);
    },
    getpersonal_info(){
      var _this = this;
      var method="dashBoard/getPersonalInfo",
          param = JSON.stringify({}),
          successd = function(res) {
            if(res.data.code == "0"){
              _this.getPersonalInfo = res.data.data;
            }
          }
      _this.$http(method,param,successd);
    },
    get_Percent(){
      var _this = this;
      var method="dashBoard/getPercent",
          param = JSON.stringify({}),
          successd = function(res) {
            if(res.data.code == "0"){
              _this.getPercent = res.data.data;
            }
          }
      _this.$http(method,param,successd);
    },
    //获取日历
    getDateList(){
      var self=this;
      var method="promotionPage/haveRecordDates",
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
            for(var i=0;i<6;i++){
              if(nowMounths.length>0){
                self.mounthList.push(nowMounths.splice(0,7));
              }
            }
            // console.log(self.mounthList);
            // console.log(self.nowMounths);
          };
      self.$http(method,param,successd);
    },
    index(){
      var self=this;
      var method="recruitIndexInfo/getRecruitIndexInfo",
          param=JSON.stringify({}),
          successd=function(res){
            self.recruitIndexInfo=res.data.data;
          };
      self.$http(method,param,successd);
    },
    interviewArrangement(){
      var self=this;
      var method="promotionPage/interviewArrangement",
          param=JSON.stringify({
            selectDate:self.chooseDateVal
          }),
          successd=function(res){
            self.interviewerInfos = res.data.data.interviewerInfos;
            if(self.interviewerInfos.length != 0){
              self.have_schedule = true;
            } else {
              self.have_schedule = false;
            }
            // self.awaitInterviewRecords=res.data.data.awaitInterviewRecords;//待面试
            // self.page1=res.data.data.awaitInterviewRecordsPage;
            // self.awaitHireRecords=res.data.data.awaitHireRecords;//待录用
            // self.page2=res.data.data.awaitHireRecordsPage;
            // self.awaitEntryRecords=res.data.data.awaitEntryRecords;//待入职
            // self.page3=res.data.data.awaitEntryRecordsPage;
          };
      self.$http(method,param,successd);
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
    toPost(){
      this.$router.push({name:'publishPosition'});
    },
    toList(){
      this.$router.push({name:'publishList'});
    },
    toNewResume(){
      this.$router.push({name:'newResume'});
    },
    changePageNum1(val){
      this.page1.pageNum=val;
      this.interviewArrangement;
    },
    changePageNum2(val){
      this.page2.pageNum=val;
      this.interviewArrangement;
    },
    changePageNum3(val){
      this.page3.pageNum=val;
      this.interviewArrangement;
    },
    resume(id,btnShow,type){
      if(type=='entry' && id==0){
        this.$router.push({name:'talentpool'});
        localStorage.talentStatus=3;
        return
      }
      this.$router.push({name:'resume',query:{id:id,btnShow:btnShow}})
    },
    to_resume(content,id,processStatus){
      switch (processStatus) {
        case 1: //  待面试
          if(id != -1){
            this.$router.push({name:'resume',query:{id:id,btnShow:3}})
          }
          break;
        case 2://  待录用
          if (id != -1) {
            this.$router.push({name:'resume',query:{id:id,btnShow:5}})
          }
          break;
        case 3://  已入职
          if (id != -1) {
            this.$router.push({name:'resume',query:{id:id,btnShow:5}})
          }
          break;
        case 4://  待办事项
          this.add_Backlog(content.awaitDeal,'编辑待办事项',content.awaitDealId);
          break;
        default:
          break;
      }
    }
  },
  components:{
    
  }
}
</script>

<style scoped>
.recruitment h1{font-size: 16px;font-weight: 500;margin:0 0 20px 20px;overflow: hidden;}
.recruitment_header{
    overflow: hidden;
}
.calendar{width:333px;min-height: 280px;float: left;margin-top:25px;padding: 0 20px;}
.calendar_header{text-align: center;margin:12px;line-height: 22px;}
.calendar_con{text-align: center;}
.right_con{margin-left: 290px;height: 280px;border-left:1px solid #1F2D3D;}
.el-tabs{clear:none;}
.deal_interview{display: inline-block;margin: 0px 30px 15px 20px;cursor: pointer;}
.deal_interview dt {width:60px;height:60px;border-radius: 50%;overflow: hidden;float: left;}
.deal_interview dt img{width:60px;height: 60px;vertical-align: top;}
.deal_interview dd{margin-left: 80px;height: 60px;font-size: 14px;margin-top: 10px;}
.deal_interview dd h2,.deal_interview dd p{font-size: 14px;font-weight: 500;width: 112px;overflow: hidden;text-overflow:ellipsis;white-space:nowrap; }
.position_management{height:310px;background-color: #fff;box-shadow: 1px 1px 10px 1px #eee;}
.position_management h2{height: 50px;border-bottom: 1px solid #E5E9F2;color: #1F2D3D;font-size: 16px;line-height: 50px;padding-left: 20px;font-weight: 500;}
.management_top{text-align: center;height: 100px}
.management_top h6{font-size: 14px;font-weight: 500;margin: 20px 0 10px;}
.management_top p{font-size: 36px;color: #5aa2e7;cursor: pointer;}
.add_resume_header{margin: 10px 20px;height: 40px;;line-height: 40px;font-size: 16px;border-bottom: 1px solid #eee;}
.add_resume_header .icon{text-align: right;cursor: pointer;}
.add_resume_header .icon .iconfont{font-size: 24px;}
.add_resume_con{height: 30px;line-height: 30px;margin: 0 20px;}
.issue_resume{width: 75px;height: 75px;background-color: #46BE8A;color:#fff;border-radius: 4px;margin: 15px auto 0;line-height: 30px;cursor: pointer}
.issue_resume dt{padding-top:10px;}
.issue_resume dd{line-height: 24px;}
.issue_resume dd .iconfont{font-size: 28px;}

.el-date-table td{position: relative;}
.el-date-table .disabled{
  background: #F4F4F4;
  cursor: not-allowed;
}
.hasRecord:after{content:'';width:4px;height:4px;border-radius: 50%;background-color: #ff4949;display: block;position: absolute;bottom: 3px;left: 50%;margin-left: -2px;}
.white-space-nowrap{white-space:nowrap;overflow: hidden;}
.no_data{height: 200px;text-align: center;color: #99a9bf;background: url(../../images/noData.png) no-repeat center center}
.no_data p{padding-top:20px;margin-left: -20px;}
.h_top_info{
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.h_middle_info{
      margin-top: 24px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.h_recruitment_progress{
  overflow: hidden;
  width: 69%;
  height: 166px;
  background-color: #fff;
}
.recruitment_progress_detaily{
  /* padding-left: 24px; */
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
.recruitment_progress_detaily .detaily{
  width: 15.5%;
  height: 96px;
  background: #F2F6FC;
  border-right: 1px solid #fff;
  margin-bottom: 16px;
  cursor: pointer;
}
.recruitment_progress_detaily .detaily:hover{
  color:#5CB3FF;
}
.recruitment_progress_detaily .detaily:hover a{
  color:#5CB3FF;
}
.recruitment_progress_detaily .detaily div{
  width: 100%;
  text-align: center;
  font-size: 16px;
}
.recruitment_progress_detaily .detaily .num{
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
}
.recruitment_progress_detaily .detaily .class{
  margin-top: 8px;
  font-family: 'PingFangSC-Regular';
}
.h_user_information{
  overflow: hidden;
  width: 29%;
  background-color: #fff;
  box-sizing: border-box;
}
.h_user_information .user_info{
  overflow: hidden;
  width: 100%;
  height: 50%;
  border-bottom: 1px solid #EBEEF5;
  display: flex;
}
.h_user_information .user_info img{
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
}
.getPercent .percent{
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
.hrm_module{
  border-bottom: none;
  width: 69%;
}
.hrm_module .hrm_module_con{
  padding: 0;
  /* margin-top: 20px; */
  display: flex;
  background: #fff;
}
.work_zone{
  width: 100%;
  min-height: 305px;
  border-left: 1px solid #EBEEF5;
}
.work_zone_top{
  height: 44px;
  line-height: 44px;
  border-bottom: 1px solid #EBEEF5;
}
.work_zone_place{
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 240px;  
}
.work_zone_place .todo_list{
    cursor: pointer;
    width: 100%;
    border-bottom: 1px solid #EBEEF5;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-left: 24px;
    font-size: 14px;
    color: #465669;
    padding-top: 12px;
    padding-bottom: 12px;
}
.isgray{
  color:#b3b5b9!important;
}
.work_zone_place_none{
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 270px;  
  display: flex;
  justify-content: center;
  align-items: center;
}
.work_zone_place_none .none{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  color: #C0CCDA;
  font-size: 12px;
}
.Product_dynamics{
    overflow: hidden;
    width: 29%;
    box-sizing: border-box;
    height: 305px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.Product_dynamics .product_detaily{
    padding-top: 16px;
    overflow: hidden;
    width: 100%;
    background: #fff;
    padding-bottom: 16px;
    min-height:138px;
}
.Product_dynamics .red_ball{
  width: 6px;
  height: 6px;
  background: #FF566B;
  border-radius: 50%;
  position: absolute;
}
.detaily_info{
    display: flex;
    justify-content: space-between;
    padding-right: 26px;
    padding-left: 24px;
    color: #475669;
    font-size: 14px;
    margin-top: 8px;
    cursor: pointer;
    position: relative;
}
.detaily_info:hover{
  color:#5CB3FF;
}
.download_micro{
  width: 100%;
  background: #fff;
  height: 102px;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  padding-left: 24px;
}
.download_micro .micro_img{
  width: 56px;
  height: 56px;
  border:1px solid #EBEEF5;
  background: url("../../images/Dashboard/micro.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.Copywriting{
    margin-left: 16px;
    color: rgb(31, 45, 61);
    font-size: 16px;
    height: 58px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.h_bottom_info{
  position: relative;
  height: 130px;
  background:#fff;
  overflow: hidden;
  padding-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.h_bottom_info>div{
    cursor: pointer;
    height: 52px;
    border: 1px solid #DCDFE6;
    border-radius: 5px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 14px;
    color: #465669;
    width: 11%;
}
.h_bottom_info img{
  width: 16px;
}
.h_bottom_info>div span{
  margin-left: 12px;
}

a {
    color: #2c3e50;
    text-decoration: none;
}
.detaily_info_none{
  display:flex;
  justify-content:center;
  flex-direction:column;
  align-items: center;
  text-align: center;
  color:#C0CCDA;
  min-height: 140px;
}
.current{
  background:#5aa2e7;
}
.el-date-table td:hover{
  color:#ccc!important;
}
::-webkit-scrollbar   
{   
    width: 8px;   
    height: 16px;   
    background-color: #F2F6FC;   
}   
     
/*定义滚动条轨道 内阴影+圆角*/   
::-webkit-scrollbar-track   
{   
    /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);    */
    border-radius: 10px;   
    background-color: #FAFAFA;   
}   
     
/*定义滑块 内阴影+圆角*/   
::-webkit-scrollbar-thumb   
{   
    border-radius: 10px;   
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.1);   
    background-color: #C3C3C3;   
}   
</style>



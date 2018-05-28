<template>
  <div>
    <div class="mask" v-show="mask_isshow">
      <div class="job_detaily"  :key="index" style="position: relative;">
        <div class="close" style="text-align:right;padding-right:16px;margin-top:16px;cursor: pointer;position: absolute;right: 0;top: 0;z-index:99;">
          <span @click="mask_isshow=0">
            <i class="iconfont" style="font-size:12px;cursor: pointer;">&#xe669;</i>
          </span>
        </div>
        <p class="title">详情</p>
        <div style="display:flex;margin-left:20px;">
          <div class="hurry" v-show="detaily_hurry" style="margin-right:16px;">急招</div>
          <div style="color:#1F2D3D;font-size:14px;line-height: normal;font-weight:bold;">{{job_detaily_prev.positionName}}</div>        
        </div>
        <div style="width:100%;">
            <div class="center">
              <span>{{job_detaily_prev.salary}}</span><span class="line">|</span>
              <span>{{job_detaily_prev.workYear}}</span><span class="line">|</span>
              <span>{{job_detaily_prev.educationRequire}}</span><span class="line">|</span>
              <span>{{job_detaily_prev.workCity}}</span>
            </div>              
        </div>
        <p style="color:#465669;font-size:14px;margin:24px 0 0 20px;font-weight:bold;">详细信息</p>
        <div style="color:#465669;font-size:14px;margin:8px 20px 0 20px;" class="detaily_information">
          <p><span>职位分类：</span>{{job_detaily_prev.categoryName}}</p>
          <p><span>职位名称：</span>{{job_detaily_prev.positionName}}</p>
          <p><span>职位性质：</span>{{job_detaily_prev.positionType}}</p>
          <p><span>招聘人数：</span>{{job_detaily_prev.positionNum}}</p>
          <p><span>工作城市：</span>{{job_detaily_prev.workCity}}</p>
          <p><span>工作地址：</span>{{job_detaily_prev.workAddress}}</p>
          <p><span>简历邮箱：</span>{{job_detaily_prev.receiveEmail}}</p>
        </div>
         <p style="color:#465669;font-size:14px;margin:16px 0 0 20px;font-weight:bold;">职位描述</p>
        <div style="color:#465669;font-size:14px;margin:8px 20px 0 20px;text-align: justify;">
          <p v-html="job_detaily_prev.positionDesc"></p>
          <!-- <p>岗位职责：</p>
          <p>1、负责项目计划的制定、跟踪和维护，管控项目生命周期。 合理制定项目目标和计划，明确划分工作内容，并可根据各种变化及时调整项目计划。 2、负责协调项目之间合理资源分配，保证资源使用最优化。 3、全面管理技术项目的实施，保证项目的进度和质量控制，并确保项目目标的按期实现。</p>
          <p style="margin-top:24px;">任职资格：</p>
          <p>1、负责项目计划的制定、跟踪和维护，管控项目生命周期。 合理制定项目目标和计划，明确划分工作内容，并可根据各种变化及时调整项目计划。 2、负责协调项目之间合理资源分配，保证资源使用最优化。 3、全面管理技术项目的实施，保证项目的进度和质量控制，并确保项目目标的按期实现。</p> -->
        </div>
      </div>
    </div>
    <div style="display:flex;justify-content: space-between;margin-bottom:16px;align-items: center;overflow:hidden;">
      <router-link to="/ATS/recruit/post">
        <el-button type="primary">
          <span>
            <i class="iconfont">&#xe767;</i>
          </span>创建职位
        </el-button>      
      </router-link>      
      <div class="search_about" style="margin-right:12px;">
            <el-select v-model="Creator" clearable placeholder="选择创建人" style="margin-left:24px;" @change="search('select')">
              <el-option
                v-for="(item,index) in getAllPositionCreator"
                :key="index"
                :label="index"
                :value="item">
              </el-option>
            </el-select>
            <el-input placeholder="请输入职位名称、职位分类关键字" v-model="search_job" class="search_all" @change="search('input')"></el-input>
            <span style="margin-left: -29px;z-index: 99;color:#98A9BF;cursor:pointer;" @click="search('input')">
              <i class="iconfont">&#xe7d4;</i>
            </span>
      </div>      
    </div>
  <div class="hrm_module">

      <div class="none_data" style="text-align: center;line-height: 35px;" v-show="none_data">没有相关数据！</div>
      <div>
        <div class="job_list" v-for='(item,index) in positionList' :key='index'>
          <div class="left">
            <div class="top">
              <div class="hurry" v-show="item.isUrgent == 1">急招</div>
              <div class="job_name" @click='get_jobdetaily(item.id,item.isUrgent)'>{{item.positionName}}</div>
            </div>
            <div class="center">
              <span>{{item.salary}}</span><span class="line">|</span>
              <span>{{item.workYear}}</span><span class="line">|</span>
              <span>{{item.educationRequire}}</span><span class="line">|</span>
              <span>{{item.workCity}}</span>
            </div>
            <div class="bottom">
              <span>
                <i class="iconfont" style="color:#98A9BF;margin-right:8px;">&#xe693;</i>
              </span>
              <span>由<span>{{item.creatorName}}</span>创建</span>
              <span>
                <i class="iconfont" style="color:#98A9BF;margin:0 8px 0 16px;">&#xe691;</i>
              </span>
              <span>创建日期:<span>{{item.createDate}}</span></span>
            </div>
          </div>
          <div class="middle">
            <span style="color:#465669;font-size:14px;margin-right:8px;">是否急招</span>
            <el-switch
              active-color='#5CB3FF'
              :on-value= "1"
              :off-value= "0"
              v-model="item.isUrgent"
              @change="checkvalue(item.isUrgent,item.id)"
              active-text="否"
              inactive-text="是">
            </el-switch>
          </div>
          <div class="right">
            <div class="status_class" @click="get_jobinfo(1,item.id)">
              <div>{{item.awaitFilterCount}}</div>
              <div>待筛选</div>
            </div>
            <div class="line"></div>
            <div class="status_class" @click="get_jobinfo(2,item.id)">
              <div>{{item.awaitInterviewCount}}</div>
              <div>待面试</div>
            </div>
            <div class="line"></div>
            <div class="status_class" @click="get_jobinfo(3,item.id)">
              <div>{{item.awaitCommnicateCount}}</div>
              <div>待沟通offer</div>
            </div>
            <div class="line"></div>
            <div class="status_class" @click="get_jobinfo(4,item.id)">
              <div>{{item.awaitJoinCount}}</div>
              <div>待入职</div>
            </div>

            <div class="operate" style="align-self: flex-end;position: absolute;right: 16px;bottom:9px;cursor: pointer;">
              <span style="position:relative;" @click="copyPosition(item.id)">
                <i class="iconfont" style="color:#5CB3FF;font-size:24px;">&#xe67c;</i>
                <div style="position:absolute;">复制职位
                  <div class="sanjiao"></div>
                </div>
              </span>
              <span style="position:relative;" @click="edit(item.id)">
                <i class="iconfont" style="color:#5CB3FF;font-size:24px;">&#xe67d;</i>
                <div style="position:absolute;width: 32px;left: -6px;">修改
                  <div class="sanjiao"></div>
                </div>
              </span>
              <span style="position:relative;" @click="deleteBtn(item.id)">
                <i class="iconfont" style="color:#5CB3FF;font-size:24px;">&#xe67a;</i>
                <div style="position:absolute;width: 32px;left: -6px;">删除
                  <div class="sanjiao"></div>
                </div>
              </span>
            </div>
          </div>
        </div>        
      </div>

      <div id="content" class="hrm_module_con" style="display:none;">
        <div class="left_btn">
          <el-button :disabled="multipleSelection.length != 1" @click="edit()" type="primary">
            <i class="el-icon-edit"></i>
            <span>修改</span>
          </el-button>
          <el-button :disabled="multipleSelection.length == 0" @click="deleteBtn()" type="primary">
            <i class="el-icon-delete"></i>
            <span>删除</span>
          </el-button>

          <!-- <el-button :disabled="multipleSelection.length == 0" @click="setPrice()" type="primary">
            <i class="iconfont" style="font-size: 14px">&#xe624;</i>
            <span>设置奖励</span>
          </el-button> -->
          <el-button :disabled="multipleSelection.length !=1" @click="copyPosition()" type="primary">
            <i class="iconfont" style="font-size: 14px">&#xe65c;</i>
            <span>复制职位</span>
          </el-button>        
          <el-button type="text" class="gj_search" @click="gjSearchCon = !gjSearchCon">高级搜索<i class="el-icon-caret-bottom"
                                                                                              :class="{'el-icon-caret-top':gjSearchCon}"></i>
          </el-button>
          <!-- <el-input v-model="character.value"
            class="search_usercare"
            @keyup.enter.native="search()"
            @blur="search()" placeholder="输入工作年限、应聘职位、学历等搜索" icon="search"></el-input> -->
          <el-input placeholder="输入关键词" v-model="character.value" style="width: 350px; float: right;"
                    @keyup.enter.native="search()"
                    @blur="search()">
            <el-select v-model="character.type" slot="prepend" @blur="search()" placeholder="请选择" style="width: 105px;">
              <el-option label="职位名称" value="1"></el-option>
              <el-option label="创建人" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </div>

        <div class="hrm_module_search" v-show="gjSearchCon">
          <el-form :model="recruitPosition" label-width="100px" class="clearfix">
            <el-form-item label="职位分类" prop="categoryId" style="display: inline-block; width: 300px; ">
              <el-select v-model="recruitPosition.categoryId">
                <el-option v-for="item in positionNameList" :label="item.name" :value="item.id"
                          :key="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建日期" prop="categoryId" style="display: inline-block;">
              <el-date-picker
                v-model="recruitPosition.startDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <el-date-picker
                v-model="recruitPosition.endDate"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="工作城市" prop="workCity">
              <el-cascader
                expand-trigger="hover"
                :options="workCityLists"
                v-model="recruitPosition.workCityArr"
                change-on-select
                @change="handleChange">
              </el-cascader>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">搜索</el-button>
              <el-button @click="resetAdvancedSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </div>

        <el-table
          ref="multipleTable"
          :data="positionList"
          border
          tooltip-effect="dark"
          style="width: 100%"
          class="table-fixed"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            select="selectChange">
          </el-table-column>
          <el-table-column
            prop="positionName"
            width="170"
            label="职位名称"
            class="pos"
            class-name="text-align_left"
          >
            <template scope="scope">
              <a href="javascript:;" @click="getDetail(scope.row)">
                  <el-tag type="danger" class="tips" v-if="scope.row.isUrgent == '1'">{{ scope.row.isUrgent  | urgentFilter }}</el-tag>
                  <span style="margin-left:34px;">{{ scope.row.positionName }}</span>
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="createDate"
            label="创建日期">
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="posiEndDate"-->
            <!--label="截止日期">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="categoryName"
            label="职位分类">
          </el-table-column>
          <el-table-column
            prop="creatorName"
            label="创建人">
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="updateDate"-->
            <!--label="更新日期">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="workCity"
            label="地区">
          </el-table-column>
          <el-table-column
            prop="zhaopinNum"
            label="招聘人数">
            <template scope="scope">
              <span style="margin-left: 10px">{{ scope.row.zhaopinNum | numFilter }}</span>
            </template>
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="isUrgent"-->
            <!--label="是否急招">-->
            <!--<template scope="scope">-->
              <!--<span style="margin-left: 10px">{{ scope.row.isUrgent | isUrgentFilter }}</span>-->
            <!--</template>-->
          <!--</el-table-column>-->
          <!-- <el-table-column
          prop="yingPinNum"
          label="应聘人数">
            <template scope="scope">
            <a href="javascript:;" @click="jump(scope.row)">{{ scope.row.yingPinNum }}</a>
          </template>
        </el-table-column> -->
        </el-table>
        <el-pagination
          class="margin_t_20"
          @size-change="changePageSize"
          @current-change="changePageNum"
          :current-page="config.pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="config.pageSize"
          layout="prev, pager, next"
          :total="config.totalCount">
        </el-pagination>
      </div>

      <el-dialog
        title="红包规制设置"
        :visible.sync="priceVisible"
        width="30%"
        class="priceDialog"
      >
        <div class="main">
          <div>红包类型：固定红包</div>
            <div class="count">
              <p class="priceNum">红包金额：</p>
              <div class="digital-counter-new">
                <div class="u-counter">
                  <!--<a href="javascript:;" class="u-btn" @click="increasePrice">-</a>-->
                  <span class="tot">
                    <input type="number" v-model="recruitPosition.rewardAmount">
                  </span>
                  <!--<a href="javascript:;" class="tot-btn" @click="addPrice">+</a>-->
                </div>
              </div>
              <p class="priceNum">&nbsp;&nbsp; 元 &nbsp;&nbsp;<span>（红包金额应该在1-200之间）</span></p>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="priceVisible = false">取 消</el-button>
        <el-button type="primary" @click="setSuccess">确 定</el-button>
      </span>
      </el-dialog>

    </div>
  
    <el-pagination
      class="margin_t_20"
      @size-change="changePageSize"
      @current-change="changePageNum"
      :current-page="config.pageNum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="config.pageSize"
      layout="prev, pager, next"
      :total="config.totalCount">
    </el-pagination>
  
  
  
  </div> 
</template>
<script>

  import allcity from '../../script/allcity';

  export default {
    name: 'publishList',
    data(){
      return {
        workCity: '',
        recruitPosition: {
          pageNum: '',	//是	int	页码
          pageSize: '',//	是	int	每页大小
          positionName: '',//	否	string	职位名称
          creatorName: '',//	否	string	职位创建人
          categoryId: '',//	否	int	职位分类id
          startDate: '',//	否	string	创建日期 起始时间
          endDate: '',//否	string	创建日期 结束时间
          workCity: '',//	否	string	工作城市,如：杭州
          workCityArr: [],
          isUrgent: '', //是否急招,
          rewardAmount: ''
        },
        workCityLists: [],
        positionNameList: [],//职位名称
        gjSearchCon: false,
        priceVisible: false,
        positionIdList: [],
        config: {
          pageSize: 10,
          pageNum: 1,
          processStatus: '1',
          totalCount: 0
        },
        character: {
          type: '1',
          value: ''
        },
        positionList: [],
        multipleSelection: [],
        newPosition:true,
        getAllPositionCreator: [],
        Creator: '',
        search_job:'',
        mask_isshow:0,
        job_detaily_prev:{},
        detaily_hurry:0,
        none_data:0
      }
    },
    methods: {
      get_jobinfo(processStatus,positionId){
        console.log(processStatus);
        console.log(positionId);
        switch (processStatus) {
          case 1:
            this.$router.push({path:'/ATS/talents/newResume',query:{'processStatus':processStatus,'positionId':positionId}});
            break;
          case 2:
            localStorage.library = 2;// 招聘管理 候选人 面试 已接受面试
            this.$router.push({path:'/ATS/talents/library',query:{'processStatus':processStatus,'positionId':positionId}});
            break;
          case 3:
            localStorage.talentStatus = 1;// 招聘管理 录用 待发送offer
            this.$router.push({path:'/ATS/pool/talentpool',query:{'processStatus':processStatus,'positionId':positionId}});
            break;
          case 4:
            localStorage.talentStatus = 3;
            this.$router.push({path:'/ATS/pool/talentpool',query:{'processStatus':processStatus,'positionId':positionId}});
            break;
          default:
            break;
        }
      },
      get_jobdetaily(id,is_hurry){
          if (is_hurry == 1) {
            this.detaily_hurry = 1;
          }else{
            this.detaily_hurry = 0;
          }
          let method = 'recruitPosition/getPositionDetail',
          self = this,
          params = JSON.stringify({
              id: id,
              type: 1
          }),
          successed = function(res){
              self.job_detaily_prev = res.data.data
              self.mask_isshow = 1;
          }
          this.$http(method, params, successed);
      },
      checkvalue(isUrgent,id){
        let _this = this; 
        isUrgent == true?isUrgent=1:isUrgent=0;
        let methods = 'recruitPosition/setIsUrgent',
        param = JSON.stringify({
          id:id,
          isUrgent:isUrgent
        }),
        successd = function (res) {
          if (res.data.code == '0') {
              _this.$message({
                message: "操作成功！",
                type: "success"
              });
          }
        }
        this.$http(methods, param, successd)
      },
      getAll_PositionCreator(){
        let _this = this;
        let methods = 'recruitPosition/getAllPositionCreator',
        param = JSON.stringify({}),
        successd = function (res) {
          if (res.data.code == '0') {
            _this.getAllPositionCreator = res.data.data;
          }
        }
        this.$http(methods, param, successd)
      },
      transitionWork(){
        let provinces = allcity.province,
          citys = allcity.city;
        for (let j = 0; j < provinces.length; j++) {
          let item = provinces[j]
          item.value = item.name
          item.label = item.name
          item.children = citys[item.id]
        }
        for (let k in citys) {
          let city = citys[k]
          for (let i = 0; i < city.length; i++) {
            let item = city[i]
            item.value = item.name
            item.label = item.name
          }
        }
        this.workCityLists = provinces;
      },
      getDetail(row){
        this.$router.push({path: 'detail', query: {id: row.id}});
      },
      jump(row){
        if (row.interviewerIds) {
          this.$router.push({name: 'newResume', query: {'interviewerIds': row.interviewerIds}});
        }
      },
      getPositionCategoryList(){
        let methods = 'recruitPosition/getPositionCategoryList',
          param = JSON.stringify({}),
          self = this,
          successd = function (res) {
            self.positionNameList = res.data.data;
          }
        this.$http(methods, param, successd)
      },
      handleChange(val){
        this.recruitPosition.workCity = val[1];
      },
      edit(id){
        // let id = this.multipleSelection[0].id;
        this.$router.push({path: 'post', query: {id: id}});
      },
      copyPosition(id){
      //  let id = this.multipleSelection[0].id;
        this.$router.push({
          name:'publishPosition',
          path: 'post',
          query: {id: id},
          params:{
            newPosition:this.newPosition
          }
         });  
      },
      search(data){
        var character;
        if (data == 'select') {
          var id = this.Creator;
        }else if(data == 'input'){
          character = this.search_job;
        }else{
          character =''
        }
        this.recruitPosition.positionName = '';
        this.recruitPosition.creatorName = '';
        if (this.character.type == '1') {
          this.recruitPosition.positionName = this.character.value
        } else if (this.character.type == '2') {
          this.recruitPosition.creatorName = this.character.value
        }
        let method = 'recruitPosition/getPositionListByCondition',
          self = this,
          param = JSON.stringify({
            pageSize: this.config.pageSize,
            pageNum: this.config.pageNum,
            character:character,
            positionName: this.recruitPosition.positionName,
            creatorName: this.recruitPosition.creatorName,
            categoryId: this.recruitPosition.categoryId,
            startDate: this.$date(this.recruitPosition.startDate),
            endDate: this.$date(this.recruitPosition.endDate),
            workCity: this.recruitPosition.workCity,
            isUrgent: this.recruitPosition.isUrgent,
            rewardAmount: this.recruitPosition.rewardAmount,
            creatorId:id
          }),
          successd = function (res) {
            self.positionList = self.$tableNull(res.data.data.positionList);
            for (let index = 0; index < self.positionList.length; index++) {
               if (self.positionList[index].isUrgent == 1) {
                 self.positionList[index].isUrgent = true;
               } else {
                 self.positionList[index].isUrgent = false;
               }
               switch (self.positionList[index].educationRequire) {
                 case 1:
                   self.positionList[index].educationRequire = "不限"
                   self.positionList[index].workYear = "不限"
                   break;
                 case 2:
                   self.positionList[index].educationRequire = "大专以下"
                   self.positionList[index].workYear = "应届毕业生"
                   break;
                 case 3:
                   self.positionList[index].educationRequire = "大专"
                   self.positionList[index].workYear = "1年以下"
                   break;
                 case 4:
                   self.positionList[index].educationRequire = "本科"
                   self.positionList[index].workYear = "1-3年"
                   break;
                 case 5:
                   self.positionList[index].educationRequire = "硕士"
                   self.positionList[index].workYear = "3-5年"
                   break;
                 case 6:
                   self.positionList[index].educationRequire = "博士"
                   self.positionList[index].workYear = "5-10年"
                   break;
                 case 7:
                   self.positionList[index].educationRequire = "博士"
                   self.positionList[index].workYear = "10年以上"
                   break;
                 default:
                   break;
               }
            }
            console.log(self.positionList);
            self.positionList.isUrgent = res.data.data.positionList.isUrgent
            self.config.totalCount = res.data.data.page.totalCount;
            res.data.data.positionList.length == 0? self.none_data = 1: self.none_data = 0
          }
        this.$http(method, param, successd);
      },
      deleteBtn(id) {
        // let str = '';
        // for (var i = 0; i < this.multipleSelection.length; i++) {
        //   str += this.multipleSelection[i].id;
        //   str = this.multipleSelection.length - 1 > i ? str + ',' : str;
        // }
        let self = this;
        self.$confirm("确认删除该职位, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            let method = 'recruitPosition/batchDeletePosition',
              self = this,
              param = JSON.stringify({
                ids: id
              }),
              successd = function (res) {
                self.$message({
                  type: 'info',
                  message: '删除成功！'
                });
                self.search();
              }
            this.$http(method, param, successd);
          })
          .catch(() => {});          
      },
      setPrice(){
        this.priceVisible = true
      },
      setSuccess(){
        var _this = this;
        if (_this.recruitPosition.rewardAmount <= 0 || _this.recruitPosition.rewardAmount >=200) {
          _this.$message({
            showClose: true,
            message: '红包金额应该在1-200之间'
          });
          _this.recruitPosition.rewardAmount = ''
          return;
        }
        var method = "recruitPosition/setRedEnvelopes";
        var param = JSON.stringify({
          positionIdList: String(_this.positionIdList),
          rewardAmount: _this.recruitPosition.rewardAmount
        });
        console.log(param)
        var successd = function (res) {
          if (res.data.code == 0) {
            _this.priceVisible = false
            _this.search()
          }
        }
        _this.$http(method, param, successd);
      },
      increasePrice(){
        if (this.recruitPosition.rewardAmount <= 0) {
          return
        }
        this.recruitPosition.rewardAmount--
      },
      addPrice(){
        this.recruitPosition.rewardAmount++
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        this.positionIdList = this.fileterSelect(val)
      },
      fileterSelect(item) {
        let arr = []
        for (var i = 0; i < item.length; i++) {
          arr[i] = item[i].id
        }
        return arr
      },
      changePageSize(pageSize){
        var self = this;
        self.config.pageSize = pageSize;
        self.config.pageNum = 1;
        this.search();
      },
      changePageNum(pageNum){
        var self = this;
        self.config.pageNum = pageNum;
        this.search();
      },
      resetAdvancedSearch(){
        this.recruitPosition = {
          pageNum: '',	//是	int	页码
          pageSize: '',//	是	int	每页大小
          positionName: '',//	否	string	职位名称
          creatorName: '',//	否	string	职位创建人
          categoryId: '',//	否	int	职位分类id
          startDate: '',//	否	string	创建日期 起始时间
          endDate: '',//否	string	创建日期 结束时间
          workCity: '',//	否	string	工作城市,如：杭州
          workCityArr: [],
        }
      },
    },
    filters: {
      numFilter: function (value) {
        if (value == "0") {
          value = '不限'
        }
        return value;
      },
      isUrgentFilter: function (value) {
        if (value == "1") {
          value = "是"
        } else {
          value = "否"
        }
        return value;
      },
      urgentFilter:function (value) {
        if(value == "1"){
            value = '急'
        }else {
            value = ''
        }
        return value
      },
      rewardAmountFilter:function (value) {
        if(value == ''){
            value = 0.00
        }
        return value
      }
    },
    mounted(){
      this.getAll_PositionCreator();
      this.getPositionCategoryList();
      this.transitionWork();
      this.search();
      this.$nextTick(()=>{
        setTimeout(() => {
          // document.getElementsByClassName('el-table__fixed')[0].style.height = "100%"; 
          // document.getElementsByClassName('el-table__fixed')[0].style.borderRightStyle = "none";
        }, 1000);
      })
    }
  }
</script>
<style scoped>
  .mask{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
  /* display: none; */
}
.mask .job_detaily{
  width: 420px;
  height: 550px;
  background: #fff;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 26px;
  border-radius:4px;
}
.mask .job_detaily .title{
  position: relative;
  padding:15px 0 24px 20px;
  font-size:18px;
}
  .el-form {
    padding: 10px 10px 15px;
    border: 1px solid #BFCBD9;
    margin-bottom: 20px;
  }

  .gj_search {
    float: right;
  }

  .left_btn {
    margin-bottom: 20px;
  }

  .el-input-group__prepend, .el-input-group--append .el-input__inner, .el-input-group__prepend {
    width: 90px;
  }
  .hrm_module .priceDialog .main .count {
    margin-top: 17px;
    overflow: hidden;
  }
  .hrm_module .priceDialog .main .tips{
    margin-top: 10px;
  }



  .hrm_module .priceDialog .main .count .priceNum {
    float: left;
    height: 30px;
    line-height: 30px
  }
  .hrm_module .priceDialog .main .count .priceNum span{
    display: inline-block;
    vertical-align: middle;
    font-size: 13px;
    color: #ccc;
  }
  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter {
    width: 60px;
    height: 30px;
    border: 1px solid #e5e5e5;
    float: left;
    border-left: none;
  }

  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter .u-btn {
    float: left;
    width: 34px;
    height: 30px;
    border-left: 1px solid #e5e5e5;
    line-height: 30px;
    text-align: center;
    font-size: 22px;
    color: #475669;
  }

  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter .tot-btn {
    float: left;
    width: 34px;
    height: 30px;
    border-left: 1px solid #e5e5e5;
    line-height: 30px;
    text-align: center;
    font-size: 20px;
    color: #475669
  }

  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter .tot {
    float: left;
    width: 59px;
    height: 30px;
    border-left: 1px solid #e5e5e5;
  }


  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter .tot input {
    display: block;
    width: 100%;
    margin: 0;
    padding: 0;
    border: none;
    height: 30px;
    line-height: 30px;
    text-align: center;
    outline: none
  }
  

</style>

<style scoped>
  .hrm_module .priceDialog .main .count .digital-counter-new .u-counter .tot .el-form-item .el-form-item__content{margin-left: 0!important;}
  .hrm_module .priceDialog .main  .el-form{
    padding: 0!important;
    border: none;
  }
  .hrm_module .hrm_module_con .el-table .el-table__fixed-body-wrapper .el-table__row td:nth-child(2){padding-left: 39px;text-align: left!important;}
  .hrm_module .hrm_module_con .el-table .el-table__row td .cell a .tips{
    position: absolute!important;
    /*display: inline-block;*/
    width: 24px;
    height: 24px;
    text-align:center;
    line-height: 24px;
    top: 8px;
    left: 10px;
    font-size: 12px;
    /*background: url(../../images/Urgent.png)no-repeat;*/
    /*background-size: cover;*/
    padding:0;
  }
  .hrm_module .hrm_module_con .el-table .el-table__fixed-body-wrapper .el-table__row td .cell a .tips2{
    position: absolute;
    display: inline-block;
    width: 24px;
    height: 24px;
    /*color: #fff;*/
    /*background: red;*/
    /*line-height: 24px;*/
    top: 8px;
    left: 44px;
    font-size: 12px;
  }
  .hrm_module .hrm_module_con .el-table .el-table__fixed-body-wrapper .el-table__row td .cell a .el-tag--warning{
    background-color: rgba(247,186,41,.1);
    border-color: #fceddd;
    color: #f2a654;
  }
  .hrm_module .hrm_module_con .el-table .el-table__fixed-body-wrapper .el-table__row td .cell a .el-tag--danger{
    border-color: #fee1e1;
    color: #f96868;
  }
  .search_about{
    /* width: 100%; */
    height: 56px;
    align-items: center;
    display: flex;
    /* border-bottom: 1px solid #E4E7ED; */
    margin-top: 12px;
  }
  .search_about .el-input--medium .el-input__inner{
    width:116px;
  }
  .search_all{
    width: 292px!important;
  }
  .job_list{
    width:100%;
    border-bottom:1px solid #E4E7ED;
    overflow:hidden;
    display: flex;
    justify-content: space-between;
    position: relative;
  }
  .job_list .top{
    display:flex;
    margin-top:16px;
    margin-left:24px;
  }
  .hurry{
    /* margin-left:20px; */
    width:40px;
    height:22px;
    border:1px solid #FF566B;
    border-radius:4px;
    background:rgba(255, 86, 107, 0.1);
    text-align:center;
    line-height:22px;
    color:#FF566B;
    font-size:12px;
  }
  .job_list .left .hurry{
        margin-right:16px;
    margin-left:0;
    width:40px;
    height:22px;
    border:1px solid #FF566B;
    border-radius:4px;
    background:rgba(255, 86, 107, 0.1);
    text-align:center;
    line-height:22px;
    color:#FF566B;
    font-size:12px;
  }
  .job_list .left .job_name{
    z-index: 99;
    color:#000000;
    font-size:14px;
    font-weight:bold;
    cursor: pointer;
  }
  .job_list .left .job_name:hover{
    color:#5CB3FF;
  }
  .mask .center{
    color:#465669;
    font-size:14px;
    margin:8px 0 0 20px;
  }
  .mask .center .line{
    color:#DCDFE6;
    margin:0 6px;
  }
  .job_list .center{
    color:#465669;
    font-size:14px;
    margin:16px 0 0 24px;
  }
  .job_list .center .line{
    color:#DCDFE6;
    margin:0 6px;
  }
  .job_list .bottom{
    color:#98A9BF;
    margin:16px 0 16px 24px;
    font-size:14px;
  }
  .job_list .middle{
    align-self: center;
    margin-top: 16px;
    position: absolute;
    top: 18px;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    justify-content: center;
  }
  .job_list .middle .el-switch__label--left{
    margin-right: -18px;
    z-index: 99;
    color:#fff;
  }
  .job_list .middle .el-switch__label--right{
    margin-left: -18px;
    z-index: 99;
    color:#fff;
  }
  .job_list .middle .el-switch__label.is-active{
    color: #ffffff00;
  }
  .job_list .middle .el-switch__core{
    width:42px!important;
    height:20px;
  }
  .job_list .middle .el-switch__core:after{
    width:16px;
    height:16px;
    top:0;
  }
  .job_list .right{
    display:flex;
    margin:12px 32px 0 0;
    text-align:center;
    z-index: 9;
    overflow: hidden;
  }
  .job_list .right .line{
    width:1px;
    background:#EBEEF5;
    height:40px;
    margin:0 24px;
  }
  .job_list .right .status_class{
    height:50px;
    cursor: pointer;
  }
  .job_list .right .status_class div:first-child{
    width:100%;
    color:#1F2D3D;
    font-size:20px;
    font-weight:bold;
  }
  .el-input__inner{
    border-top-left-radius: 4px!important;
    border-top-right-radius:0!important;
    border-bottom-right-radius: 0!important;
    border-bottom-left-radius: 4px!important;
    border-right:0px solid #ccc!important;
  }
  .search_all>input{
    width: 292px!important;    
    border-top-left-radius: 0!important;
    border-top-right-radius:4px!important;
    border-bottom-right-radius: 4px!important;
    border-bottom-left-radius: 0!important;
    border-right:1px solid #dcdfe6!important;
  }
  .search_all .input__inner{

    /* border-right:0px solid #ccc!important; */
  }
  .job_list .middle .el-switch__core:after{
    width:16px;
    height:16px;
    top:1.4px;
  }
  .job_list .right .status_class div:last-child{
    width:100%;
    color:#98A9BF;
    font-size:14px;
  }
  .operate span{
    margin-right:24px;
    position: relative;
  }
  .operate span>div{
    top: -32px;
    left: -22px;
    width: 62px;
    background:#465669;
    font-size:14px;
    color:#fff;
    border-radius:4px;
    padding:2px 4px 2px 4px;
    opacity: 0;
  }
  .operate span:hover div{
    opacity: 1;
  }
  .sanjiao{
    width: 10px;
    height: 10px;
    background: #465669;
    position: absolute;
    left: 0px;
    right: 0px;
    margin: auto;
    transform: rotate(45deg);
    top: 17px;
    z-index: 0;
  }
  .detaily_information p{
    margin-top:1px;
  }
  .job_detaily .close:hover span i{
    color:rgb(92, 179, 255);
  }
</style>



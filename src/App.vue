<template>
	<div id="app">
    <router-view keep-alive></router-view>
	</div>
</template>

<script>
import '../static/fonts/iconfont.css';
import Style from "style/main.css"; // 公共样式文件
import Util from "script/util.js"; //公共方法
import Axios from "axios";
import { load, login_onclick } from "script/ukey.js"; //公共方法

export default {
  name: "app",
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

</style>

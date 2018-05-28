<template>
  <div id="expand">
    <div class="download">
      <h1>下载爱聚招聘助手插件</h1>
      <p>一次点击，将你在各大招聘网站看到的简历导入云端人才库。简历自动解析，支持搜索。一键发布职位到各招聘网站，省去不必要的重复劳动。</p>
      <h3>插件未安装</h3>
      <div class="con">
        <a href="">下载插件</a>
        <span>暂只支持谷歌浏览器</span>
      </div>
    </div>
    <div class="install">
      <h2>安装指南</h2>
      <p>1. 点击上方按钮下载.crx插件压缩包并解压缩；</p>
      <p>2. 打开Chrome浏览器，依次点击设置 -> 工具 -> 扩展程序进入插件管理页面；</p>
      <p>3. 将解压缩后的.crx文件拖到Chrome插件管理界面中去，松开鼠标即可；</p>
      <p>4. Chrome会弹出安装插件的提示，点击添加；</p>
      <p>5. 安装完成之后，就能在Chrome插件管理界面看到“爱聚招聘助手”的图标了。</p>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>

<style scoped>
.download{height: 190px;background-color: #fff;padding:20px 20px 0;}
.download h1{font-size: 16px;line-height: 22px;color: #1F2D3D;}
.download p{color: #FE8B25;margin-top:10px;}
.download h3{color: #465669;margin-top: 20px;font-weight: 400;}
.con{height: 56px;background-color: #F2F6FC;line-height: 56px;padding: 0 24px;margin-top:20px;}
.con a{color: #465669;font-size: 16px;}
.con span{float: right;color: #465669;}
.install{background-color: #fff;padding: 20px;margin-top:24px;}
.install h2{font-size: 16px;color: #1F2D3D;margin-bottom:20px;}
.install p{color: #465669;}
</style>


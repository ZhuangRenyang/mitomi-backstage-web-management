<template>
  <div class="home">
    <el-container>
      <el-header style="height: 90px; background-color: black">
      <div style="width: auto;height: 70px; margin: 0 auto;">
        <img src="../assets/logo.png" style="width: 200px;vertical-align: middle">
        <span>
                    <a href="">有品</a><el-divider direction="vertical"></el-divider>
                    <a href="">企业团购</a><el-divider direction="vertical"></el-divider>
                    <a href="">资质证照</a><el-divider direction="vertical"></el-divider>
                    <a href="">协议规则</a><el-divider direction="vertical"></el-divider>
                    <a href="">下载app</a><el-divider direction="vertical"></el-divider>
                    <a href="">Select Location</a>
                    <a style="margin-left: 150px" href="http://localhost:8080/">登录</a><el-divider
            direction="vertical"></el-divider>
                    <a href="javascript:void(0)" @click="logout()">注册</a><el-divider
            direction="vertical"></el-divider>
                    <a href="">消息通知</a>
                </span>
      </div>
      </el-header>
      <el-container class="layout-body">
        <el-aside class="layout-aside" width="200px">
          <el-menu
              router
              :default-active="this.$router.currentRoute.path"
              class="el-menu-vertical-demo">
            <!--              @open="handleOpen"-->
            <!--              @close="handleClose">-->
            <el-submenu class="el-submenu" index="/admin/admins/list">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item class="el-menu-item" index="/admin/admins/list">用户列表</el-menu-item>
              <el-menu-item class="el-menu-item" index="/admin/admins/insert">添加用户</el-menu-item>
            </el-submenu>
            <el-submenu class="el-submenu" index="/admin/brand/list">
              <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item class="el-menu-item" index="/admin/commodity/list">品牌列表</el-menu-item>
              <el-menu-item class="el-menu-item" index="/admin/commodity/insert">添加品牌</el-menu-item>
            </el-submenu>
            <el-submenu class="el-submenu" index="/admin/category/list">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>类别管理</span>
              </template>
              <el-menu-item class="el-menu-item" index="/admin/category/list">类别列表</el-menu-item>
              <el-menu-item class="el-menu-item" index="/admin/category/insert">添加类别</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>

* {
  margin: 0;
}


.el-submenu {
  border-radius: 2px;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #ABC7FF, #C1E3FF);
}

.el-menu-item {
  /*border-radius: 2px;*/
  /*background-clip: padding-box, border-box;*/
  /*background-origin: padding-box, border-box;*/
  /*background-image: linear-gradient(to right, #ABC7FF, #C1E3FF);*/
}

.layout-body {
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 0;
}

.layout-aside {
  /*border-radius: 2px;*/
  /*background-clip: padding-box, border-box;*/
  /*background-origin: padding-box, border-box;*/
  /*background-image: linear-gradient(to right, #99E5A2, #D4FC78);*/
}

.el-main {
  background-image: url("../assets/bg.png");
  background-size: cover; /* cover是专门用来设置全屏背景的 */
}
header a {
  /* 去除下划线 */
  text-decoration: none;
  color: #6c6c6c;
}

</style>

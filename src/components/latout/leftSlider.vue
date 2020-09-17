<template>
  <div class="leftSlider">
    <div class="leftSliderStyle">
      <div @click="changeWidth" style="color:#fff;text-align:center;height:30px;line-height:30px">
        <i class="el-icon-s-unfold" v-if="this.isCollapse"></i>
        <i class="el-icon-s-fold" v-else></i>
      </div>
      <el-menu :default-active="onRouters" router :collapse="isCollapse">
        <template v-for="x in menuList">
          <template v-if="x.childMenu">
            <el-submenu :index="x.menuCode" :key="x.menuCode">
              <template slot="title">
                <i :class="x.icon"></i>
                <span>{{x.menuName}}</span>
              </template>
              <el-menu-item :index="y.menuUrl" :key="y.menuCode" v-for="y in x.childMenu">
                <i :class="y.icon"></i>
                <span slot="title">{{y.menuName}}</span>
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="x.menuUrl" :key="x.menuCode">
              <i :class="x.icon"></i>
              <span slot="title">{{x.menuName}}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuList: [
        {
          id: "1",
          name: "系统管理",
          icon: "el-icon-setting",
          path: "",
          children: [
            { id: "1-1", name: "用户管理", icon: "el-icon-user", path: "user" },
            { id: "1-2", name: "菜单管理", icon: "el-icon-menu", path: "menu" }
          ]
        },
        {
          id: "2",
          name: "商品管理",
          icon: "el-icon-shopping-cart-1",
          path: "goods"
        },
        {
          id: "3",
          name: "轮播图管理",
          icon: "el-icon-picture-outline-round",
          path: "picture"
        },
        {
          id: "4",
          name: "商品分类管理",
          icon: "el-icon-s-goods",
          path: "kinds"
        },
        {
          id: "5",
          name: "客户管理",
          icon: "el-icon-s-custom",
          path: "customer"
        },
        { id: "6", name: "订单管理", icon: "el-icon-message", path: "order" }, 
        {
          id: "7",
          name: "热门位商品管理",
          icon: "el-icon-sort",
          path: "hotGoods"
        },
        { id: "8", name: "门店信息管理", icon: "el-icon-s-shop", path: "shop" },
        { id: "9", name: "司机信息管理", icon: "el-icon-truck", path: "diver" } 
      ]
    };
  },

  computed: {
    onRouters() {
      console.log(this.$route.path);
      return this.$route.name;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods: {
    getDate() {
      this.flag = false;
      this.menuDetail = {};
      this.$axios.post("sysmenu/getMenu").then(res => {
        console.log(res);
        if (200 == res.data.code) {
          this.menuList = res.data.data;
          this.getDate()
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    changeWidth() {
      this.isCollapse = !this.isCollapse;
      this.$emit("chage", this.isCollapse);
    }
  }
};
</script>


<style scoped>
.leftSlider {
  height: 100%;
}
.leftSliderStyle {
  width: 100%;
  height: 100%;
  background: #04294b;
  overflow: auto;
}
</style>
<style >
.leftSlider .el-menu {
  background: #04294b;
  border: 0;
}
.leftSlider .el-submenu__title,
.leftSlider .el-menu-item {
  color: #819cbd;
}
.leftSlider .el-menu-item.is-active {
  color: #409eff;
  background: #154289;
}
.leftSlider .el-menu-item:focus,
.leftSlider .el-menu-item:hover {
  background: #154277;
}
.leftSlider .el-submenu__title:hover {
  background: #154289;
}
</style>
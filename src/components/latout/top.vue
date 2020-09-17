<template>
  <div class="top">
    <div class="topStyle">
      <div class="title">行走书店后台管理系统</div>
      <div class="phone">
        <img src="../../assets/logo.png" alt />
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            {{userName}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="edd">
            <el-dropdown-item command="0">修改密码</el-dropdown-item>
            <el-dropdown-item command="1">退出登陆</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="30%" :modal-append-to-body="flag">
      <el-form>
        <el-form-item label="输入原密码" label-width="100px">
          <el-input v-model="pswData.passwordOld"></el-input>
        </el-form-item>
        <el-form-item label="输入新密码" label-width="100px">
          <el-input v-model="pswData.passwordNew"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEditPsw">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      dialogVisible: false,
      flag: false,
      pswData: {
        passwordOld: "",
        passwordNew: ""
      }
    };
  },
  mounted() {
    this.userName = localStorage.getItem("userName");
  },
  methods: {
    handleCommand(val) {
      if (0 == val) {
        this.$message("您点击的是修改密码");
        this.dialogVisible = true;
      } else {
        this.$message("您点击的是退出登录");
        localStorage.setItem("userName", "");
        //localStorage.setItem('token','')
        this.$axios.post("common/logout").then(res => {
          if (200 == res.data.code) {
            this.$router.push({
              path: "/"
            });
          }
        });
      }
    },
    sureEditPsw() {
      console.log(this.pswData);
      this.dialogVisible = false;
    }
  }
};
</script>


<style scoped>
.topStyle {
  height: 60px;
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.title {
  width: 40%;
  height: 60px;
  line-height: 60px;
  color: #0b69bd;
  float: left;
  margin-left: 20px;
  font-size: 20px;
  font-weight: bold;
}
.phone img {
  border-radius: 20px;
  height: 30px;
  position: relative;
  top: 10px;
}
.phone {
  width: 50%;
  height: 60px;
  color: #0b69bd;
  float: right;
  line-height: 60px;
  text-align: right;
  margin-right: 50px;
}
</style>
<style >
.edd {
  width: 100px;
}
.el-dialog {
  min-width: 400px;
}
</style>

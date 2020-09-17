<template>
  <div class="login">
    <div class="loginStyle">
      <div class="top">
        <div class="LOGO">行走书店后台管理系统</div>
      </div>
      <div class="body">
          <div class="logoRight">
            <div class="loin1">欢迎登录</div>
            <div class="loin2">行走书店后台管理系统</div>
            <div class="lion3">
              <div class="kuang">
                <img src="../assets/login/user.png" class="img2" />
                <input class="inpuu" type="text" v-model="userName" placeholder="用户账号" />
              </div>
              <div class="kuang1">
                <img src="../assets/login/password.png" class="img2" />
                <input class="inpuu" type="password" v-model="passWord" placeholder="登陆密码" @keyup.enter="toLogin" />
              </div>
              <div class="di">
                <div class="deng" @click="toLogin">
                  <span>登陆</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      passWord: "",
      checked: false
    };
  },

  methods: {
    toLogin() {
      //掉接口
      var param = {
        username: this.userName,
        password: this.passWord
      };
      this.$axios.post("common/login", param).then(res => {
        console.log(res);
        if (200 == res.data.code) {
          localStorage.setItem("userName", this.userName);
          localStorage.setItem("token", res.data.token);
          this.$router.push({
            path: "/home"
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>


<style scoped>
.login {
  height: 100%;
  width: 100%;
  margin: 0;
  background: url(../assets/login/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.loginStyle {
  height: 100%;
  width: 100%;
}
.top {
  height: 20%;
  width: 100%;
}
.LOGO{
  width: 385px;
  height: 54px;
  margin: 0px 20px 20px 106px;
  color: #fff;
  font-weight: 700;
  font-size: 37px;
  padding-top: 79px;
}
.body {
  height: 80%;
  width: 100%;
}
.logoRight {
  height: 54%;
  width: 30%;
  background: #fff;
  float: right;
  margin-right: 53px;
  border-radius: 10px;
  opacity:0.8
}
.loin1 {
  color: black;
  font-size: 22px;
  font-weight: 700;
  margin: 45px 0 0 40px;
}
.loin2 {
  color: black;
  font-size: 15px;
  margin: 15px 0 0 40px;
}
.kuang {
  width: 80%;
  height: 40px;
  margin-left: 40px;
  margin-top: 43px;
  background: rgb(248, 248, 248);
}
.kuang1 {
  width: 80%;
  height: 40px;
  margin-left: 40px;
  margin-top: 14px;
  background: rgb(248, 248, 248);
}
.inpuu {
  background: rgb(248, 248, 248);
  width: 80%;
  height: 40px;
  border: 0;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
  margin-left: 10px;
}
.img2 {
  position: relative;
  width: 17px;
  top: 3px;
  left: 10px;
}
.deng {
  height: 35px;
  width: 120px;
  background: #0062ba;
  color: #fff;
  text-align: center;
  line-height: 35px;
  float: right;
  margin-right: 9.5%;
}
.ok {
  float: left;
  padding-left: 40px;
  padding-top: 6px;
}
.di {
  width: 100%;
  height: 50px;
  margin-top: 50px;
}
</style>

<template>
  <div class="diver">
    <div class="input">
      <el-form ref="form" :inline="true" label-width="70px" class="demo-form-inline">
        <el-form-item label="司机编号">
          <el-input v-model="formLine.driverNo" clearable placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="司机姓名">
          <el-input v-model="formLine.userRealname" clearable placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="所在省">
          <el-select
            v-model="formLine.provinceNo"
            clearable
            placeholder="请选择省"
            @change="changeFirst"
          >
            <el-option
              v-for="item in provinceOptions"
              :key="item.provinceCode"
              :label="item.provinceName"
              :value="item.provinceCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在市">
          <el-select v-model="formLine.cityNo" clearable placeholder="请选择市" @change="changeSecond">
            <el-option
              v-for="item in cityOptions"
              :key="item.cityCode"
              :label="item.cityName"
              :value="item.cityCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在区">
          <el-select v-model="formLine.areaNo" clearable placeholder="请选择区">
            <el-option
              v-for="item in areaOptions"
              :key="item.areaCode"
              :label="item.areaName"
              :value="item.areaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="seachButton">
          <el-button type="primary" @click="findDate">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button type="primary" icon="el-icon-setting" @click="find">详情</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addData">新增</el-button>
      <el-button type="primary" icon="el-icon-edit-outline" @click="editShop">修改</el-button>
      <el-button type="danger" icon="el-icon-delete-solid" @click="delShop">删除</el-button>
    </div>
    <div class="tta">
      <div class="table1">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="driverNo" label="司机编号"></el-table-column>
          <el-table-column prop="userRealname" label="司机姓名"></el-table-column>
          <el-table-column prop="phone" label="手机"></el-table-column>
          <el-table-column prop="idCard" label="身份证"></el-table-column>
          <el-table-column prop="userName" label="账号"></el-table-column>
          <el-table-column prop="storeNo" label="门店编号"></el-table-column>
        </el-table>
      </div>
      <div class="yezi">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10,100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="新增司机" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
        <el-form-item label="司机姓名" label-width="120px" prop="diverName">
          <el-input v-model="addForm.diverName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="120px" prop="phone">
          <el-input v-model="addForm.phone" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="司机账号" label-width="120px" prop="userCode">
          <el-input v-model="addForm.userCode" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号" label-width="120px" prop="idCard">
          <el-input v-model="addForm.idCard" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="所在省" label-width="120px" prop="provinceNo">
          <el-select v-model="addForm.provinceNo" placeholder="请选择省" @change="changeFirst">
            <el-option
              v-for="item in provinceOptions"
              :key="item.provinceCode"
              :label="item.provinceName"
              :value="item.provinceCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在市" label-width="120px" prop="cityNo">
          <el-select v-model="addForm.cityNo" placeholder="请选择市" @change="changeSecond">
            <el-option
              v-for="item in cityOptions"
              :key="item.cityCode"
              :label="item.cityName"
              :value="item.cityCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在区" label-width="120px" prop="areaNo">
          <el-select v-model="addForm.areaNo" placeholder="请选择区">
            <el-option
              v-for="item in areaOptions"
              :key="item.areaCode"
              :label="item.areaName"
              :value="item.areaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户姓名" label-width="120px" prop="userRealname">
          <el-input v-model="addForm.userRealname" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户账号" label-width="120px" prop="userName">
          <el-input v-model="addForm.userName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" label-width="120px" prop="nickName">
          <el-input v-model="addForm.nickName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px" prop="sex">
          <el-select v-model="addForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
            <el-option label="未知" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="addForm.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="所在门店" label-width="120px">
          <el-select v-model="addForm.storeNo" placeholder="请选择门店">
            <el-option
              v-for="item in storeList"
              :key="item.storeNo"
              :label="item.storeName"
              :value="item.storeNo"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户密码" label-width="120px" prop="password">
          <el-input type="password" v-model="addForm.password" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item label="角色" label-width="120px" prop="role">
          <el-select v-model="addForm.role" placeholder="请选择角色">
            <el-option label="司机" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改司机" :visible.sync="dialogEditVisible" width="40%">
      <el-form :model="editForm" :inline="true" :rules="rules" ref="editForm">
        <el-form-item label="司机姓名" label-width="120px" prop="userRealname">
          <el-input v-model="editForm.userRealname" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证号" label-width="120px" prop="idCard">
          <el-input v-model="editForm.idCard" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="联系电话" label-width="120px" prop="phone">
          <el-input v-model="editForm.phone" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="所在省" label-width="120px" prop="provinceNo">
          <el-select v-model="editForm.provinceNo" placeholder="请选择省" @change="changeFirst">
            <el-option
              v-for="item in provinceOptions"
              :key="item.provinceCode"
              :label="item.provinceName"
              :value="item.provinceCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在市" label-width="120px" prop="cityNo">
          <el-select v-model="editForm.cityNo" placeholder="请选择市" @change="changeSecond">
            <el-option
              v-for="item in cityOptions"
              :key="item.cityCode"
              :label="item.cityName"
              :value="item.cityCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在区" label-width="120px" prop="areaNo">
          <el-select v-model="editForm.areaNo" placeholder="请选择区">
            <el-option
              v-for="item in areaOptions"
              :key="item.areaCode"
              :label="item.areaName"
              :value="item.areaCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在门店" label-width="120px">
          <el-select v-model="editForm.storeNo" placeholder="请选择门店">
            <el-option
              v-for="item in storeList"
              :key="item.storeNo"
              :label="item.storeName"
              :value="item.storeNo"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEditData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="司机详情" :visible.sync="dialogFindVisible" width="60%">
      <el-form :model="tableDatati" :inline="true" :rules="rules" ref="tableDatati">
        <el-form-item label="司机编码" label-width="120px">
          <el-input v-model="tableDatati.driverNo" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="司机名称" label-width="120px">
          <el-input v-model="tableDatati.userRealname" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="所在省" label-width="120px">
          <el-input v-model="tableDatati.provinceName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="所在市" label-width="120px">
          <el-input v-model="tableDatati.cityName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="所在区" label-width="120px">
          <el-input v-model="tableDatati.areaName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="入公司时间" label-width="120px">
          <el-input v-model="tableDatati.creatTime" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px">
          <el-select v-model="tableDatati.sex">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
            <el-option label="未知" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFindVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      storeList: [],
      formLine: {
        driverNo: "",
        userRealname: "",
        provinceNo: "",
        cityNo: "",
        areaNo: ""
      },
      editForm: {},
      multipleSelection: [],
      addForm: {
        diverName: "",
        provinceNo: "",
        cityNo: "",
        areaNo: "",
        phone: "",
        idCard: "",
        userCode: "",
        password: "",
        userRealname: "",
        userName: "",
        nickName: "",
        sex: "",
        email: "",
        password: "",
        role: ""
      },
      dialogEditVisible: false,
      dialogFormVisible: false,
      dialogFindVisible: false,
      currentPage4: 4,
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      tableData: [],
      tableDatati: {},
      rules: {
        diverName: [
          { required: true, message: "请输入司机名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        userCode: [
          { required: true, message: "请输入司机账号", trigger: "blur" }
        ],
        provinceNo: [
          { required: true, message: "请选择省", trigger: "change" }
        ],
        cityNo: [{ required: true, message: "请选择市", trigger: "change" }],
        areaNo: [{ required: true, message: "请选择区", trigger: "change" }],
        phone: [
          { required: true, message: "请填写电话", trigger: "blur" },
          /*   { required: true,  validator: checkPhone,trigger: "blur" },  */
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: "请输入合法手机号",
            trigger: "blur"
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        idCard: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ],
        userRealname: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [
          { required: true, message: "请填写手机号", trigger: "blur" },
          /*   { required: true,  validator: checkPhone,trigger: "blur" },  */
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: "请输入合法手机号",
            trigger: "blur"
          }
        ],
        role: [{ required: true, message: "请选择角色", trigger: "change" }]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods: {
    find() {
      this.tableDatati = {};
      if (1 == this.multipleSelection.length) {
        this.$axios
          .post("driver/selectdriverinfo", {
            driverNo: this.multipleSelection[0].driverNo
          })
          .then(res => {
            console.log(res);
            if (200 == res.data.code) {
              this.tableDatati = res.data.data;
              this.dialogFindVisible = true;
            } else {
              this.$message.error(res.data.msg);
            }
          });
      } else {
        this.$message("请选择一条数据进行查看");
      }
    },
    changeFirst(val) {
      console.log(val);
      this.formLine.cityNo = "";
      this.formLine.areaNo = "";
      if (this.addForm.cityNo != undefined) {
        this.addForm.cityNo = "";
      }
      this.editForm.cityNo = "";
      this.editForm.areaNo = "";
      if (this.addForm.areaNo != undefined) {
        this.addForm.areaNo = "";
      }
      this.$axios.post("store/findCity", val).then(res => {
        console.log(res);
        if (200 == res.data.code) {
          this.cityOptions = res.data.data;
        }
      });
    },
    changeSecond(val) {
      console.log(val);
      this.formLine.areaNo = "";
      this.editForm.areaNo = "";
      if (this.addForm.areaNo != undefined) {
        this.addForm.areaNo = "";
      }
      this.$axios.post("store/findArea", val).then(res => {
        console.log(res);
        if (200 == res.data.code) {
          this.areaOptions = res.data.data;
        }
      });
    },
    findDetail(index, rows) {
      console.log(rows[index].id);
    },
    //表格勾选变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    //点击查询
    findDate() {
      console.log(this.formLine);
      //然后调接口
      this.getDate();
    },
    getDate() {
      var parm = {
        driverNo: this.formLine.driverNo,
        userRealname: this.formLine.userRealname,
        provinceNo: this.formLine.provinceNo,
        cityNo: this.formLine.cityNo,
        areaNo: this.formLine.areaNo
      };
      this.$axios
        .post(
          "driver/selectdriver?pageSize=" +
            this.pageSize +
            "&pageNum=" +
            this.pageNum,
          parm
        )
        .then(res => {
          if (200 == res.data.code) {
            this.tableData = res.data.rows;
            this.totalNum = res.data.total;
            this.$axios.post("store/findProvince").then(res => {
              if (200 == res.data.code) {
                this.provinceOptions = res.data.data;
              }
            });
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    //点击修改按钮
    editShop() {
      if (this.$refs["editForm"]) {
        this.$refs["editForm"].resetFields();
      }
      if (1 == this.multipleSelection.length) {
        this.dialogEditVisible = true;
        // this.editForm = JSON.parse(JSON.stringify(this.multipleSelection[0]));
        this.$axios
          .post("driver/selectdriverinfo", {
            driverNo: this.multipleSelection[0].driverNo
          })
          .then(res => {
            if (200 == res.data.code) {
              this.editForm = res.data.data;
              console.log(this.editForm);
              console.log(1);
              this.$axios.post("store/findStoreTo").then(res => {
                console.log(res);
                if (200 == res.data.code) {
                  this.storeList = res.data.data;
                }
              });
              this.$axios.post("store/findProvince").then(res => {
                if (200 == res.data.code) {
                  this.provinceOptions = res.data.data;
                  this.$axios
                    .post("store/findCity", this.editForm.provinceNo)
                    .then(res => {
                      console.log(res);
                      if (200 == res.data.code) {
                        this.cityOptions = res.data.data;
                        this.$axios
                          .post("store/findArea", this.editForm.cityNo)
                          .then(res => {
                            console.log(res);
                            if (200 == res.data.code) {
                              this.areaOptions = res.data.data;
                            }
                          });
                      }
                    });
                }
              });
            }
          });
      } else {
        this.$message("请选择一条数据进行修改");
      }
    },
    //确定修改
    sureEditData() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          console.log(this.editForm);
          this.$axios.post("driver/editdriver", this.editForm).then(res => {
            if (200 == res.data.code) {
              this.$message.success(res.data.msg);
              this.getDate()
            }
          });
          this.dialogEditVisible = false;
        } else {
          return false;
        }
      });
      //如何修改
    },
    //重置
    clear() {
      (this.formLine = {
        driverNo: "",
        userRealname: "",
        provinceNo: "",
        cityNo: "",
        areaNo: ""
      }),
        this.findDate();
    },
    //点击新增按钮
    addData() {
      this.addForm = {};
      this.dialogFormVisible = true;
      if (this.$refs["addForm"]) {
        this.$refs["addForm"].resetFields();
      }
      this.$axios.post("store/findProvince").then(res => {
        if (200 == res.data.code) {
          this.provinceOptions = res.data.data;
        }
      });
      this.$axios.post("store/findStoreTo").then(res => {
        console.log(res);
        if (200 == res.data.code) {
          this.storeList = res.data.data;
        }
      });
    },
    //确定新增
    sureAddData() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          console.log(this.addForm);
          this.$axios.post("driver/adddriver", this.addForm).then(res => {
            if (200 == res.data.code) {
              this.$message.success(res.data.msg);
              this.getDate();
            }
          });
          this.dialogFormVisible = false;
        } else {
          return false;
        }
      });
      //判断是否全部录入，如果是就调接口，接口如果返回成功，则关闭弹出框，否则不关闭
    },
    //删除
     delShop() {
      /*    if(0<this.multipleSelection.length){
          //调接口去删除
          console.log(this.multipleSelection)
          var list=[]
          for(var i=0;i<this.multipleSelection.length; i++){
            list.push(this.multipleSelection[i].userName)
          }
          console.log(list)
        }else{
          this.$message('请选择一条数据进行删除');
        } */
      if ( 1 == this.multipleSelection.length) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
           
            this.$axios.post("driver/deldriver", this.multipleSelection[0]).then(res => {
              if (200 == res.data.code) {
                this.$message({
                  type: "success",
                  message: res.data.msg
                })
                this.getDate()
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.$message("请选择一条数据进行删除");
      }
    },

    handleSizeChange(val) {
      this.pageSize = val;
      this.getDate();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getDate();
    }
  }
};
</script>


<style scoped>
.diver {
  height: 100%;
}
.tta {
  height: 68%;
  background: #fff;
}

.input {
  width: 90%;
  background: #fff;
  padding: 20px 5%;
}
.button {
  padding: 20px 5% 10px 5%;
  background: #fff;
  width: 90%;
  margin-top: 20px;
}
.table1 {
  padding: 10px 5% 10px 5%;
  background: #fff;
  width: 90%;
}
.yezi {
  width: 90%;
  padding: 10px 5% 10px 5%;
  text-align: right;
  background: #fff;
}
</style>
<style >
.diver .input .el-form-item {
  margin-bottom: 0;
}
.diver .el-dialog {
  min-width: 645px;
}
</style>
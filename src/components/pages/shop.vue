<template>
  <div class="shop">
    <div class="input">
      <el-form ref="form" :inline="true" label-width="70px" class="demo-form-inline">
        <el-form-item label="门店名称">
          <el-input v-model="formLine.storeName" clearable placeholder="请输入门店名称"></el-input>
        </el-form-item>
        <el-form-item label="门店编号">
          <el-input v-model="formLine.storeNo" clearable placeholder="请输入门店编号"></el-input>
        </el-form-item>
        <el-form-item label="店长名称">
          <el-input v-model="formLine.userRealname" clearable placeholder="请输入店长名称"></el-input>
        </el-form-item>
        <el-form-item label="所在省">
          <el-select v-model="formLine.province" clearable placeholder="请选择省" @change="changeFirst">
            <el-option
              v-for="item in provinceOptions"
              :key="item.provinceCode"
              :label="item.provinceName"
              :value="item.provinceCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在市">
          <el-select v-model="formLine.city" clearable placeholder="请选择市" @change="changeSecond">
            <el-option
              v-for="item in cityOptions"
              :key="item.cityCode"
              :label="item.cityName"
              :value="item.cityCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在区">
          <el-select v-model="formLine.area" clearable placeholder="请选择区">
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
          <el-table-column prop="storeNo" label="门店编号" show-overflow-tooltip></el-table-column>
          <el-table-column prop="storeName" label="门店名称" width="110" show-overflow-tooltip></el-table-column>
          <el-table-column prop="storePhone" label="电话" width="130"></el-table-column>
          <el-table-column prop="storeAddress" label="地址" width="250" show-overflow-tooltip></el-table-column>
          <el-table-column prop="userRealname" label="店长姓名"></el-table-column>
          <el-table-column prop="yqmCode" label="邀请码" show-overflow-tooltip></el-table-column>
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

    <el-dialog title="新增店铺" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
        <el-form-item label="店铺名称" label-width="120px" prop="storeName">
          <el-input v-model="addForm.storeName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="店长编号" label-width="120px" prop="userCode">
          <el-input v-model="addForm.userCode" autocomplete="off" clearable></el-input>
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
        <el-form-item label="电话" label-width="120px" prop="storePhone">
          <el-input v-model="addForm.storePhone" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px" prop="storeAddress">
          <el-input v-model="addForm.storeAddress" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="评价星级" label-width="120px" prop="starLevel">
          <el-input v-model="addForm.starLevel" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="营业执照编号" label-width="120px" prop="businessLicense">
          <el-input v-model="addForm.businessLicense" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改店铺" :visible.sync="dialogEditVisible" width="40%">
      <el-form :model="editForm" :inline="true" :rules="rules" ref="editForm">
        <el-form-item label="店铺名称" label-width="120px" prop="storeName">
          <el-input v-model="editForm.storeName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="店长编码" label-width="120px" prop="userCode">
          <el-input v-model="editForm.userCode" autocomplete="off" clearable></el-input>
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
        <el-form-item label="电话" label-width="120px" prop="storePhone">
          <el-input v-model="editForm.storePhone" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="详细地址" label-width="120px" prop="storeAddress">
          <el-input v-model="editForm.storeAddress" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="邀请码" label-width="120px">
          <el-input v-model="editForm.yqmCode" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEditData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="门店详情" :visible.sync="dialogFindVisible" width="60%">
      <el-form :model="tableDatati" :inline="true" :rules="rules" ref="tableDatati">
        <el-form-item label="门店编码" label-width="120px">
          <el-input v-model="tableDatati.storeNo" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="门店名称" label-width="120px">
          <el-input v-model="tableDatati.storeName" autocomplete="off" clearable></el-input>
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
        <el-form-item label="店长身份证" label-width="120px">
          <el-input v-model="tableDatati.identityCard" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="创建时间" label-width="120px">
          <el-input v-model="tableDatati.creatTime" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="营业执照" label-width="120px">
          <el-input v-model="tableDatati.businessLicense" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="评价星级" label-width="120px">
          <el-input v-model="tableDatati.starLevel" autocomplete="off" clearable></el-input>
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
    /*  var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      }; */
    return {
      provinceOptions: [],
      cityOptions: [],
      areaOptions: [],
      tableDatati: [],
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      formLine: {
        storeName: "",
        storeNo: "",
        userRealname: "",
        province: "",
        city: "",
        area: ""
      },
      editForm: {},
      multipleSelection: [],
      addForm: {
        storeName: "",
        userCode: "",
        provinceNo: "",
        cityNo: "",
        areaNo: "",
        storePhone: "",
        storeAddress: "",
        yqmCode: "",
        starLevel: "",
        businessLicense: ""
      },
      dialogEditVisible: false,
      dialogFormVisible: false,
      dialogFindVisible: false,
      currentPage4: 4,
      tableData: [{
      
      }],
      rules: {
        storeName: [
          { required: true, message: "请输入门店名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        userCode: [
          { required: true, message: "请输入店长编号", trigger: "blur" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
        ],
        provinceNo: [
          { required: true, message: "请选择省", trigger: "change" }
        ],
        cityNo: [{ required: true, message: "请选择市", trigger: "change" }],
        areaNo: [{ required: true, message: "请选择区", trigger: "change" }],
        storePhone: [
          { required: true, message: "请填写电话", trigger: "blur" },
          /*   { required: true,  validator: checkPhone,trigger: "blur" },  */
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: "请输入合法手机号",
            trigger: "blur"
          }
        ],
        storeAddress: [
          { required: true, message: "请输入详细地址", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 3 到 30 个字符", trigger: "blur" }
        ],
        starLevel: [
          { required: true, message: "请输入评价星级", trigger: "blur" },
          { min: 1, max: 2, message: "长度在 1 到 2 个字符", trigger: "blur" }
        ],
        businessLicense: [
          { required: true, message: "请输入营业执照", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods: {
    findDetail(index, rows) {
      console.log(rows[index].id);
    },
    find() {
      this.tableDatati = [];
      if (1 == this.multipleSelection.length) {
        this.$axios
          .post("store/getListStore", {
            storeNo: this.multipleSelection[0].storeNo
          })
          .then(res => {
            console.log(res);
            if (200 == res.data.code) {
              this.tableDatati=res.data.data;
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
      this.formLine.city = "";
      this.formLine.area = "";
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
      this.formLine.area = "";
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
        storeName: this.formLine.storeName,
        storeNo: this.formLine.storeNo,
        userRealname: this.formLine.userRealname,
        provinceNo: this.formLine.province,
        cityNo: this.formLine.city,
        areaNo: this.formLine.area
      };
      this.$axios
        .post(
          "store/getListStoreInfo?pageSize=" +
            this.pageSize +
            "&pageNum=" +
            this.pageNum,
          parm
        )
        .then(res => {
          console.log(res);
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
        this.$axios
          .post("store/findStore", this.multipleSelection[0])
          .then(res => {
            if (200 == res.data.code) {
              this.editForm = res.data.data[0];
              this.$axios.post("store/findProvince").then(res => {
                if (200 == res.data.code) {
                  this.provinceOptions = res.data.data;
                  this.$axios
                    .post("store/findCity", this.editForm.provinceNo)
                    .then(res => {
                      if (200 == res.data.code) {
                        this.cityOptions = res.data.data;
                        this.$axios
                          .post("store/findArea", this.editForm.cityNo)
                          .then(res => {
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
          this.$axios.post("store/editStore", this.editForm).then(res => {
            if (200 == res.data.code) {
              this.$message.success(res.data.msg);
              this.getDate();
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
        storeName: "",
        storeNo: "",
        userRealname: "",
        province: "",
        city: "",
        area: ""
      }),
        this.findDate();
    },
    //点击新增按钮
    addData() {
      this.addForm = {};
      this.cityOptions = [];
      this.dialogFormVisible = true;
      if (this.$refs["addForm"]) {
        this.$refs["addForm"].resetFields();
      }
      this.$axios.post("store/findProvince").then(res => {
        if (200 == res.data.code) {
          this.provinceOptions = res.data.data;
        }
      });
    },
    //确定新增
    sureAddData() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.$axios.post("store/insertStore", this.addForm).then(res => {
            if (200 == res.data.code) {
              this.$message.success(res.data.msg);
              this.dialogFormVisible = false;
              this.getDate();
            } else if (500 == res.data.code) {
              this.$message.error(res.data.msg);
            }
          });
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
      if (0 < this.multipleSelection.length) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //此处调接口
            var list = [];
            for (var i = 0; i < this.multipleSelection.length; i++) {
              list.push({
                storeNo: this.multipleSelection[i].storeNo
              });
            }
            console.log(list);
            this.$axios.post("store/delStore", list).then(res => {
              if (200 == res.data.code) {
                this.getDate();
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
.shop {
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
.shop .input .el-form-item {
  margin-bottom: 0;
}
.shop .el-dialog {
  min-width: 645px;
}
</style>
<template>
  <div class="menu">
    <div class="menuLeftStyle">
      <div class="leftHead">
        <i class="el-icon-plus" @click="addMenu"></i>
        <i class="el-icon-edit-outline" @click="editMenu"></i>
        <i class="el-icon-remove-outline" @click="delMenu"></i>
        <i class="el-icon-refresh-right" @click="refushMenu"></i>
      </div>
      <div class="leftBody">
        <el-tree :data="data" :props="defaultProps" highlight-current @node-click="handleNodeClick"></el-tree>
      </div>
    </div>
    <div class="menuRightStyle">
      <div class="rightTop">
        <div class="frontBlue"></div>
        <div class="zi">菜单管理</div>
      </div>
      <div class="rightBody">
        <el-form :model="menuDetail" :inline="true">
          <el-form-item label="菜单名称" label-width="120px">
            <el-input v-model="menuDetail.menuName" readonly></el-input>
          </el-form-item>
          <el-form-item label="菜单路径" label-width="120px">
            <el-input v-model="menuDetail.menuUrl" readonly></el-input>
          </el-form-item>
          <el-form-item label="菜单图标" label-width="120px">
            <el-input v-model="menuDetail.icon" readonly></el-input>
          </el-form-item>
          <el-form-item label="菜单类型" label-width="120px">
            <el-select v-model="menuDetail.type" disabled>
              <el-option label="目录" value="2"></el-option>
              <el-option label="菜单" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" label-width="120px">
            <el-input v-model="menuDetail.remark" readonly></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="新增菜单" :visible.sync="dialogFormVisible" width="25%">
      <el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
        <el-form-item label="菜单名称" label-width="120px" prop="menuName">
          <el-input v-model="addForm.menuName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" label-width="120px" prop="menuUrl">
          <el-input v-model="addForm.menuUrl" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="图标" label-width="120px" prop="icon">
          <el-input v-model="addForm.icon" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px" prop="type">
          <el-select v-model="addForm.type" :disabled="flag">
            <el-option label="目录" value="2"></el-option>
            <el-option label="菜单" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色编码" label-width="120px" prop="authCode">
          <el-select v-model="addForm.authCode">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="店长" value="1"></el-option>
            <el-option label="用户" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" label-width="120px" prop="remark">
          <el-input v-model="addForm.remark" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改菜单" :visible.sync="dialogEditVisible" width="25%">
      <el-form :model="editForm" :inline="true" :rules="rules" ref="editForm">
        <el-form-item label="菜单名称" label-width="120px" prop="menuName">
          <el-input v-model="editForm.menuName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单路径" label-width="120px" prop="menuUrl">
          <el-input v-model="editForm.menuUrl" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="图标" label-width="120px" prop="icon">
          <el-input v-model="editForm.icon" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px" prop="type">
          <el-select v-model="editForm.type" disabled>
            <el-option label="目录" value="2"></el-option>
            <el-option label="菜单" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色编码" label-width="120px" prop="authCode">
          <el-select v-model="editForm.authCode">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="店长" value="1"></el-option>
            <el-option label="用户" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" label-width="120px" prop="remark">
          <el-input v-model="editForm.remark" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEditData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuDetail: {},
      dialogFormVisible: false,
      dialogEditVisible: false,
      flag: false,
      addForm: {
        remark: "",
        menuName: "",
        menuUrl: "",
        type: "",
        icon: "",
        authCode: "",
        parentMenuCode: ""
      },
      editForm: {},
      data: [],
      defaultProps: {
        children: "childMenu",
        label: "menuName"
      },
      rules: {
        menuName: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        authCode: [
          { required: true, message: "请输入角色编码", trigger: "blur" }
        ],
        // menuUrl: [
        //   { required: true, message: "请输入菜单路径", trigger: "blur" },
        //   { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        // ],
        type: [{ required: true, message: "请选择菜单类型", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.menuDetail = data;
      this.menuDetail.type = data.type + "";
    },
    getDate() {
      this.flag = false;
      this.menuDetail = {};
      this.$axios.post("sysmenu/getMenu").then(res => {
        console.log(res);
        if (200 == res.data.code) {
          this.data = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //新增
    addMenu() {
      //1如果当前无选中,那么新增弹框中菜单类型可以选择菜单和目录
      //2如果当前选择的是目录，那么新增弹框中菜单类型只能是菜单
      //3如果当前选择的是目录，那么无法新增
      this.addForm = {};
      if (this.menuDetail.menuCode) {
        if (2 == this.menuDetail.type) {
          //目录
          this.dialogFormVisible = true;
          this.addForm.type = "1";
          this.flag = true;
        } else {
          //菜单
          this.$message("菜单下无法新增");
        }
      } else {
        //1
        this.dialogFormVisible = true;
      }

      if (this.$refs["addForm"]) {
        this.$refs["addForm"].resetFields();
      }
    },
    //确定新增
    sureAddData() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.addForm.parentMenuCode = this.menuDetail.menuCode;
          this.$axios.post("sysmenu/add", this.addForm).then(res => {
            console.log(res);
            if (200 == res.data.code) {
              this.$message.success(res.data.msg);
              this.dialogFormVisible = false;
              this.getDate();
            }
          });
        } else {
          return false;
        }
      });
    },
    //修改
    editMenu() {
      if (this.menuDetail.menuCode) {
        console.log(this.menuDetail);
        this.dialogEditVisible = true;
        this.editForm = JSON.parse(JSON.stringify(this.menuDetail));
      } else {
        this.$message("请选择修改的数据");
      }
    },
    //确定修改
    sureEditData() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          this.$axios.post("sysmenu/editMenu", this.editForm).then(res => {
            console.log(res);
            if (200 == res.data.code) {
              this.$message.success(res.data.msg);
              this.dialogEditVisible = false;
              this.getDate();
            }
          });
        } else {
          return false;
        }
      });
    },
    //删除
    delMenu() {
      if(this.menuDetail.childMenu){
        this.$message.error("目录下有菜单，不能删除")
      }
      if (this.menuDetail.menuCode) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //此处调接口
            console.log(this.menuDetail.menuCode);
            this.$axios.post("sysmenu/delMenu", this.menuDetail).then(res => {
              if (200 == res.data.code) {
                this.$message.success(res.data.msg);
                this.getDate();
              }else if(500 == res.data.code){
                this.$message.error(res.data.msg);
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
    //刷新
    refushMenu() {
      //调用查询接口
      this.getDate();
    }
  }
};
</script>


<style scoped>
.menu {
  width: 100%;
  height: 100%;
}
.menuLeftStyle {
  width: 20%;
  float: left;
  height: 100%;
  background: #fff;
}
.menuRightStyle {
  width: 76%;
  float: left;
  height: 100%;
  background: #fff;
  margin-left: 2%;
}
.leftHead {
  height: 45px;
  line-height: 40px;
  width: 100%;
  background: #fff;
  text-align: right;
}
.leftHead i {
  padding: 0 3px;
}
.leftBody {
  padding: 0 10px;
}
.rightTop {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
  padding: 0 20px;
}
.frontBlue {
  width: 4px;
  height: 20px;
  background: blue;
  float: left;
  position: relative;
  top: 10px;
}
.zi {
  margin-left: 10px;
}
.rightBody {
  margin-top: 10px;
}
</style>
<style>
.menu .el-dialog {
  min-width: 400px;
}
.menu
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background: #0062ba;
  color: #fff;
}
</style>
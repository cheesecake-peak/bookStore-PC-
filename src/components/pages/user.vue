<template>
  <div class="user">
    <div class="input">
      <el-form ref="form" :inline="true" label-width="70px" class="demo-form-inline">
        <el-form-item label="用户账号">
          <el-input v-model="formLine.userName" clearable placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名">
          <el-input v-model="formLine.userRealname" clearable placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formLine.role" clearable placeholder="请选择角色">
            <el-option label="店长" value="1"></el-option>
            <el-option label="管理员" value="0"></el-option>
             <el-option label="司机" value="2"></el-option>
            <el-option label="用户" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="seachButton">
          <el-button type="primary" @click="findDate">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button type="primary" icon="el-icon-plus" @click="addData">新建</el-button>
      <el-button type="primary" icon="el-icon-edit-outline" @click="editData">修改</el-button>
      <el-button type="danger" icon="el-icon-delete-solid" @click="delUser">删除</el-button>
    </div>
    <div class="tta">
      <div class="table1">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="userName" label="用户账号" width="120"></el-table-column>
          <el-table-column prop="userRealname" label="用户姓名" width="120"></el-table-column>
          <el-table-column prop="role" label="角色" width="100">
            <template slot-scope="scope">{{scope.row.role==0?'管理员':scope.row.role==1?'店长':scope.row.role==3?'用户':'司机'}}</template>
          </el-table-column>
          <el-table-column prop="sex" label="性别" width="60">
            <template slot-scope="scope">{{scope.row.sex==0?'女':scope.row.sex==1?'男':'未知'}}</template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="email" label="用户邮箱"></el-table-column>
          <el-table-column prop="idCard" label="身份证"></el-table-column>
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

    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
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
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="addForm.phone" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="addForm.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证" label-width="120px" prop="idCard">
          <el-input v-model="addForm.idCard" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户密码" label-width="120px" prop="password">
          <el-input type="password" v-model="addForm.password" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="120px" prop="role">
          <el-select v-model="addForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="店长" value="1"></el-option>
            <el-option label="司机" value="2"></el-option>
            <el-option label="用户" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改用户" :visible.sync="dialogEditVisible" width="40%">
      <el-form :model="editForm" :inline="true" :rules="rules" ref="editForm">
        <el-form-item label="用户账号" label-width="120px" prop="userName">
          <el-input v-model="editForm.userName" autocomplete="off" disabled clearable></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" label-width="120px" prop="userRealname">
          <el-input v-model="editForm.userRealname" autocomplete="off" clearable></el-input>
        </el-form-item>
              <el-form-item label="用户昵称" label-width="120px" prop="nickName">
          <el-input v-model="editForm.nickName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px" prop="sex">
          <el-select v-model="editForm.sex" placeholder="请选择性别">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
            <el-option label="未知" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" label-width="120px" prop="phone">
          <el-input v-model="editForm.phone" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="editForm.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="身份证" label-width="120px" prop="idCard">
          <el-input v-model="editForm.idCard" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="角色" label-width="120px" prop="role">
          <el-select v-model="editForm.role" placeholder="请选择性别">
            <el-option label="管理员" value="0"></el-option>
            <el-option label="店长" value="1"></el-option>
           <el-option label="司机" value="2"></el-option>
            <el-option label="用户" value="3"></el-option>
          </el-select>
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
      formLine: {
        userRealname: "",
        userName: "",
        role: ""
      },
      editForm: {},
      multipleSelection: [],
      addForm: {
        userRealname: "",
        userName: "",
        sex: "1",
        phone: "",
        email: "",
        password: "",
        idCard: "",
        role: '',
        idAdmin:0,
        nickName:""
      },
      dialogEditVisible: false,
      dialogFormVisible: false,
      pageNum:1,
      pageSize:10,
      tableData: [],
      totalNum:0,
      rules: {
        userRealname: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        userName: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
         nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        phone: [
          { required: true, message: "请填写手机号", trigger: "blur" },
          // { pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,message: "请输入合法手机号",trigger: "blur"}
          { pattern:/^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/,message:'请输入正确手机号/电话号',trigger:'blur' }
        ],
        role: [{ required: true, message: "请选择角色", trigger: "change" }]
      }
    };
  },
  mounted(){
     this.$nextTick(() => {
        this.getDate()
    })
  },
  methods: {
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
    getDate(){
      console.log(this.formLine)
      var parm={
       // pageSize:this.pageSize,
       // pageNum:this.pageNum,
        userName:this.formLine.userName,
        userRealname:this.formLine.userRealname,
        role:this.formLine.role==''?'':Number(this.formLine.role)
      }
      this.$axios.post("systemuser/finduser?pageSize="+this.pageSize+"&pageNum="+this.pageNum,parm).then(res => {
        console.log(res);
        if(200==res.data.code){
          this.tableData=res.data.rows
          this.totalNum = res.data.total
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    //点击修改按钮
    editData() {
      if (1 == this.multipleSelection.length) {
         var parems={
          userId:this.multipleSelection[0].userId
        }
         this.$axios.post("systemuser/finduser",parems).then(res => {
            console.log(res);
            if(200==res.data.code){
              this.editForm=res.data.rows[0]
              this.editForm.role=res.data.rows[0].role+""
              this.editForm.sex=res.data.rows[0].sex+""
            }else{
              this.$message.error(res.data.msg)
            }
          })
           this.dialogEditVisible = true;
          // (this.editForm = JSON.parse(
          //   JSON.stringify(this.multipleSelection[0])
          // ));
      } else {
        this.$message("请选择一条数据进行修改");
      }
    },
    //确定修改
    sureEditData() {
            this.$refs["editForm"].validate(valid => {
           if (valid) {
            this.$axios.post("systemuser/edituser",this.editForm).then(res => {
            console.log(res);
            if(200==res.data.code){
                this.$message.success(res.data.msg)
                 this.dialogEditVisible = false;
                 this.pageNum=1
                 this.getDate()
            }else{
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false;
        }
      });
      //如何修改
    },
    //重置
    clear() {
      (this.formLine = {
         userRealname: "",
        userName: "",
        role: ""
      }),
        this.findDate();
    },
    //点击新增按钮
    addData() { 
      this.dialogFormVisible = true;
      if (this.$refs["addForm"]) {
        this.$refs["addForm"].resetFields();
      }
    },
    //确定新增
    sureAddData() {
      this.$refs["addForm"].validate(valid => {
      
        if (valid) {
            this.$axios.post("systemuser/adduser",this.addForm).then(res => {
            console.log(res);
            if(200==res.data.code){
                this.$message.success(res.data.msg)
                this.dialogFormVisible = false;
                this.pageNum=1;
                this.getDate();
            }else{
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false;
        }
      });
      //判断是否全部录入，如果是就调接口，接口如果返回成功，则关闭弹出框，否则不关闭
    },
    //删除
    delUser() {
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
              list.push(this.multipleSelection[i].userId);
            }
            console.log(list);
             this.$axios.post("systemuser/deluser",list).then(res => {
               if(200==res.data.code){
                  this.$message.success(res.data.msg)
                  this.pageNum=1;
                 this.getDate();
               }
             })
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
      this.pageSize=val
      this.getDate();
    },
    handleCurrentChange(val) {
      this.pageNum=val
      this.getDate();
    }
  }
};
</script>


<style scoped>
.user {
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
.user .input .el-form-item {
  margin-bottom: 0;
}
.user .el-dialog {
  min-width: 645px;
}
</style>
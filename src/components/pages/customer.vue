<template>
  <div class="customer">
    <div class="input">
      <el-form ref="form" :inline="true" label-width="70px" class="demo-form-inline">
        <el-form-item label="客户账号">
          <el-input v-model="formLine.userName" clearable placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="formLine.userRealname" clearable placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="formLine.sex" clearable placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="0"></el-option>
            <el-option label="未知" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="seachButton">
          <el-button type="primary" @click="findDate">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="tta">
      <div class="table1">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="userName" label="客户账号" width="120"></el-table-column>
          <el-table-column prop="userRealname" label="客户姓名" width="120"></el-table-column>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLine: {
        userRealname: "",
        userName: "",
        sex: ""
      },
      multipleSelection: [],
      pageNum:1,
      pageSize:10,
      totalNum:0,
      currentPage4: 4,
      tableData: [],
    };
  },
  mounted(){
     this.$nextTick(() => {
        this.getDate()
    })
  },
  methods: {
    //点击查询
    findDate() {
      console.log(this.formLine);
       this.getDate();
    },
    getDate(){
      console.log(this.formLine)
      var parm={
        userName:this.formLine.userName,
        userRealname:this.formLine.userRealname,
        sex:this.formLine.sex==''?'':Number(this.formLine.sex)
      }
      this.$axios.post("customer/selectcustomer?pageSize="+this.pageSize+"&pageNum="+this.pageNum,parm).then(res => {
        console.log(res);
        if(200==res.data.code){
          this.tableData=res.data.rows
          this.totalNum = res.data.total
        }else{
          this.$message.error(res.data.msg)
        }
      })
    },
    //重置
    clear() {
      (this.formLine = {
        userAccount: "",
        userName: "",
        userSex: ""
      }),
        this.findDate();
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
.customer {
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
.customer .input .el-form-item {
  margin-bottom: 0;
}
.customer .el-dialog {
  min-width: 645px;
}
</style>
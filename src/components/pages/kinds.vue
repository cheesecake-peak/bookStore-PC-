<template>
  <div class="kinds">
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
        <div class="zi">分类管理</div>
      </div>
      <div class="rightBody">
        <el-form :model="menuDetail" :inline="true">
          <el-form-item label="分类名称" label-width="120px">
            <el-input v-model="menuDetail.cateName" readonly></el-input>
          </el-form-item>
          <el-form-item label="分类层级" label-width="120px">
            <el-select v-model="menuDetail.level" disabled>
              <el-option label="一级分类" value="1"></el-option>
              <el-option label="二级分类" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注" label-width="120px">
            <el-input v-model="menuDetail.remark" readonly></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="新增分类" :visible.sync="dialogFormVisible" width="25%">
      <el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
        <el-form-item label="分类名称" label-width="120px" prop="cateName">
          <el-input v-model="addForm.cateName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="分类层级" label-width="120px" prop="level">
          <el-select v-model="addForm.level" :disabled='flag'>
            <el-option label="一级分类" value="1"></el-option>
            <el-option label="二级分类" value="2"></el-option>
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
    <el-dialog title="修改分类" :visible.sync="dialogEditVisible" width="25%">
      <el-form :model="editForm" :inline="true" :rules="rules" ref="editForm">
        <el-form-item label="分类名称" label-width="120px" prop="cateName">
          <el-input v-model="editForm.cateName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="分类层级" label-width="120px" prop="level">
          <el-select v-model="editForm.level" disabled >
            <el-option label="一级分类" value="1"></el-option>
            <el-option label="二级分类" value="2"></el-option>
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
      dialogEditVisible:false,
      flag:false,
      addForm: {
        remark: "",
        cateName: "",
        level: "",
      },
      editForm:{},
      data: [
        {
          nodeName: "情感",
          nodeId: "1",
          type: "1",
          remark: "我是系统管理备注",
          children: [
            {
              nodeName: "男士情感",
              nodeId: "1-1",
              type: "2",
              remark: "我是用户管理备注"
            },
            {
              nodeName: "女士情感",
              nodeId: "1-2",
              type: "2",
              remark: "我是菜单管理备注",
            }
          ]
        },
        {
          nodeName: "玄幻",
          nodeId: "2",
          type: "1",
          remark: "我是商品管理备注",
        }
      ],
      defaultProps: {
        children: "childMenu",
        label: "cateName"
      },
       rules: {
        cateName: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        level: [
          { required: true, message: "请选择分类层级", trigger: "blur" },
        ],
      }
    };
  },
  mounted(){
     this.$nextTick(() => {
        this.getDate()
    })
  },
  methods: {
    handleNodeClick(data) {
      console.log(data);
      this.menuDetail = data;
       this.menuDetail.level = data.level + "";
    },
    getDate() {
      this.menuDetail = {};
      this.flag=false;
      this.$axios.post("goodscate/getgoodscate",this.menuDetail).then(res => {
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
      if(this.menuDetail.cateCode){
        if('1'==this.menuDetail.level){//目录
            this.addForm.level='2'
            this.dialogFormVisible=true
            this.flag=true
        }else{//菜单
          this.$message('二级分类下下无法新增分类')
        }
      }else {//1
        this.dialogFormVisible=true
         
      }
      if (this.$refs["addForm"]) {
        this.$refs["addForm"].resetFields();
      }
    },
    //修改
    editMenu() {
      if(this.menuDetail.cateCode){
         this.dialogEditVisible=true
        this.editForm=JSON.parse(JSON.stringify(this.menuDetail)) 
      }else{
        this.$message('请选择修改的数据')
      }
    },
    //删除
    delMenu() {
        if (this.menuDetail.cateCode) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //此处调接口
           this.$axios.post("goodscate/delgoodscate", this.menuDetail).then(res => {
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
      this.getDate()
    },
    //确定新增
    sureAddData(){
       this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.addForm.cateCodeParent = this.menuDetail.cateCode;
          this.$axios.post("goodscate/addgoodscate", this.addForm).then(res => {
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
    //确定修改
    sureEditData(){
      this.$refs["editForm"].validate(valid => {
        if (valid) {
            this.$axios.post("goodscate/editgoodscate", this.editForm).then(res => {
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
    }
  }
};
</script>


<style scoped>
.kinds {
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
.kinds .el-dialog {
  min-width: 400px;
}
.kinds .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
  background: #0062ba;
  color: #fff;
}
</style>
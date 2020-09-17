<template>
  <div class="hotGoods">
    <div class="input">
      <el-form ref="form" :inline="true" label-width="70px" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="formLine.skuName" clearable placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品编号">
          <el-input v-model="formLine.skuNo" clearable placeholder="请输入商品编号"></el-input>
        </el-form-item>

        <el-form-item class="seachButton">
          <el-button type="primary" @click="findDate">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button type="primary" icon="el-icon-plus" @click="addData">新增</el-button>
      <el-button type="primary" icon="el-icon-edit-outline" @click="editShop">修改</el-button>
      <el-button type="danger" icon="el-icon-delete-solid" @click="delShop">删除</el-button>
    </div>
    <div class="tta">
      <div class="table1">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" fixed></el-table-column>
          <el-table-column prop="sortNo" label="排序" width="50"></el-table-column>
          <el-table-column prop="skuNo" label="商品编码" width="210"></el-table-column>
          <el-table-column prop="skuName" label="商品名称" width="250"></el-table-column>
          <el-table-column prop="sellingPrice" label="售价" width="50"></el-table-column>
          <el-table-column prop="detail" label="商品介绍"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
    <el-dialog title="新增商品" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
        <el-form-item label="商品名称" label-width="120px" prop="skuName">
          <el-input v-model="addForm.skuName" autocomplete="off" clearable readonly></el-input>
          <el-button type="primary" style="position:absolute;top:4px" @click="openChoose">选择商品</el-button>
        </el-form-item>
        <el-form-item label="排序" label-width="120px" prop="sortNo">
          <el-input type="number" v-model="addForm.sortNo" autocomplete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="选择商品" :visible.sync="dialogFormChooseVisible" width="50%" class="ot">
      <div>
        <el-form ref="form" :inline="true" label-width="70px" class="demo-form-inline">
          <el-form-item label="商品名称">
            <el-input v-model="formLineadd.skuName" clearable placeholder="请输入商品名称"></el-input>
          </el-form-item>
          <el-form-item label="商品编号">
            <el-input v-model="formLineadd.skuNo" clearable placeholder="请输入商品编号"></el-input>
          </el-form-item>
          <el-form-item class="seachButton">
            <el-button type="primary" @click="findDateadd">查询</el-button>
            <el-button @click="clearadd">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-table
          :data="tableDataAdd"
          ref="opp"
          style="width: 100%"
          @selection-change="handleSelectionChangeAdd"
        >
          <el-table-column type="selection" width="55" fixed></el-table-column>
          <el-table-column prop="skuNo" label="商品编码" width="200" fixed></el-table-column>
          <el-table-column prop="skuName" label="商品名称" width="120"></el-table-column>
          <el-table-column prop="fixPrice" label="定价"></el-table-column>
          <el-table-column prop="sellingPrice" label="售价"></el-table-column>
          <el-table-column prop="saleCnt" label="销售数量" width="100"></el-table-column>
          <el-table-column prop="goodCateOneName" label="一级分类名称" width="150"></el-table-column>
          <el-table-column prop="goodCateTwoName" label="二级分类名称" width="150"></el-table-column>
          <el-table-column prop="advertising" label="广告词" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="detail" label="商品介绍" width="150"></el-table-column>
          <el-table-column prop="status" label="商品状态名称" width="120">
            <template
              slot-scope="scope"
            >{{scope.row.status==0?'已下架':scope.row.status==1?'已上架':'未知'}}</template>
          </el-table-column>
          <el-table-column prop="putawayTime" label="上架时间" width="160"></el-table-column>
          <el-table-column prop="getoutTime" label="下架时间" width="160"></el-table-column>
          <el-table-column prop="browseCount" label="浏览量" width="70"></el-table-column>
          <el-table-column prop="outsideNo" label="商家编码" width="120"></el-table-column>
          <el-table-column prop="storeName" label="商家名称" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="amountCnt" label="库存"></el-table-column>
          <el-table-column prop="press" label="出版社"></el-table-column>
          <el-table-column prop="author" label="作者"></el-table-column>
          <el-table-column prop="isbn" label="Isbn书号" width="100"></el-table-column>
        </el-table>
        <div class="yezi">
          <el-pagination
            @size-change="handleSizeChangeadd"
            @current-change="handleCurrentChangeadd"
            :current-page="pageNumAdd"
            :page-sizes="[5,10, 200, 300, 400]"
            :page-size="pageSizeAdd"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalNumAdd"
          ></el-pagination>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormChooseVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureChooseData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改商品" :visible.sync="dialogEditVisible" width="30%">
      <el-form :model="editForm" :inline="true" :rules="rules" ref="editForm">
        <el-form-item label="商品名称" label-width="120px" prop="skuName">
          <el-input v-model="editForm.skuName" autocomplete="off" clearable readonly></el-input>
        </el-form-item>
        <el-form-item label="排序" label-width="120px" prop="sortNo">
          <el-input type="number" v-model="editForm.sortNo" autocomplete="off" clearable></el-input>
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
      formLine: {
        skuName: "",
        skuNo: ""
      },
      formLineadd: {
        skuNo: "",
        skuName: ""
      },
      chooseAddDate: [],
      editForm: {},
      dialogFormChooseVisible: false,
      multipleSelection: [],
      addForm: {
        sortNo: "",
        skuNo: "",
        skuName: ""
      },
      dialogEditVisible: false,
      dialogFormVisible: false,
      currentPage4: 1,
      dialogEditVisibleadd: false,
      dialogFormVisibleadd: false,
      currentPage4add: 1,
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      pageNumAdd: 1,
      pageSizeAdd: 5,
      totalNumAdd: 0,
      tableData: [],
      tableDataAdd: [],
      rules: {
        skuName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        sortNo: [{ required: true, message: "请输入排序", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods: {
    //上下架
    doGoods(val) {
      var name = val == 1 ? "上架" : "下架";
      if (1 == this.multipleSelection.length) {
        this.$confirm("确定要" + name + "吗? 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //此处调接口
            var list = {
              goodsCode: this.multipleSelection[0].goodsCode,
              goodsStatus: this.multipleSelection[0].goodsStatus,
              flag: val
            };
            console.log(list);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作"
            });
          });
      } else {
        this.$message("请选择一条数据进行操作");
      }
    },
    getDate() {
      var parm = {
        skuName: this.formLine.skuName,
        skuNo: this.formLine.skuNo
      };
      this.$axios
        .post(
          "hotGoods/selectHotGoods?pageSize=" +
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
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    //上传之前调用
    bfUpload(file) {
      console.log(file);
      if ("image/png" == file.type || "image/png" == file.type) {
      } else {
        return;
      }
    },
    openChoose() {
      this.dialogFormChooseVisible = true;
      this.formLineadd = {};
      this.getDateAdd();
      if (this.chooseAddDate.length >= 1) {
        this.$refs.opp.clearSelection();
      } else {
        return;
      }
    },
    getDateAdd() {
      var parms = {
        skuNo: this.formLineadd.skuNo,
        skuName: this.formLineadd.skuName
      };
      this.$axios
        .post(
          "goods/seletGoods?pageSize=" +
            this.pageSizeAdd +
            "&pageNum=" +
            this.pageNumAdd,
          parms
        )
        .then(res => {
          if (200 == res.data.code) {
            this.tableDataAdd = res.data.rows;
            this.totalNumAdd = res.data.total;
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
    //选择商品
    sureChooseData() {
      if (this.chooseAddDate.length == 1) {
        this.addForm.skuName = this.chooseAddDate[0].skuName;
        this.addForm.skuNo = this.chooseAddDate[0].skuNo;
        this.addForm.sellingPrice = this.chooseAddDate[0].sellingPrice;
        this.addForm.detail = this.chooseAddDate[0].detail;
        this.dialogFormChooseVisible = false;
        console.log(this.addForm);
      } else {
        this.$message("请选择一条商品");
      }
    },
  
    //表格勾选变化
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleSelectionChangeAdd(val) {
      this.chooseAddDate = val;
    },
    //点击查询
    findDate() {
      console.log(this.formLine);
      //然后调接口
      this.getDate();
    },
    findDateadd() {
      console.log(this.formLineadd);
      //然后调接口
      this.getDateAdd();
    },
    //点击修改按钮
    editShop() {
      if (this.$refs["editForm"]) {
        this.$refs["editForm"].resetFields();
      }
      if (1 == this.multipleSelection.length) {
        this.dialogEditVisible = true;
          (this.editForm = JSON.parse(
            JSON.stringify(this.multipleSelection[0])
          ));
      } else {
        this.$message("请选择一条数据进行修改");
      }
    },
    //确定修改
    sureEditData() {
      console.log(this.editForm)
        this.$axios.post("hotGoods/editHotGoods", this.editForm).then(res => {
          if(200==res.data.code){
            this.$message.success(res.data.msg);
            this.getDate()
            this.dialogEditVisible = false;
          }
          else if(500==res.data.code){
              this.$message.error(res.data.msg);
          }
        })
      //如何修改
    },
    //重置
    clear() {
      (this.formLine = {
        skuName: "",
        skuNo: ""
      }),
        this.findDate();
    },
    clearadd() {
      (this.formLineadd = {
        skuNo: "",
        skuName: ""
      }),
        this.findDateadd();
    },
    //点击新增按钮
    addData() {
      this.addForm = {};
      this.dialogFormVisible = true;
      if (this.$refs["addForm"]) {
        this.$refs["addForm"].resetFields();
      }
    },
    //确定新增
    sureAddData() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          console.log(this.addForm);
          this.$axios.post("hotGoods/addHotGoods", this.addForm).then(res => {
            if (200 == res.data.code) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.getDate();
            } else if (500 == res.data.code) {
              this.$message({
                type: "error",
                message: res.data.msg
              });
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
              list.push({ skuNo: this.multipleSelection[i].skuNo });
            }
            console.log(list);
            this.$axios.post("hotGoods/delHotGoods", list).then(res => {
              if (200 == res.data.code) {
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
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
    },
    handleSizeChangeadd(val) {
      this.pageSizeAdd = val;
      this.getDateAdd();
    },
    handleCurrentChangeadd(val) {
      this.pageNumAdd = val;
      this.getDateAdd();
    }
  }
};
</script>


<style scoped>
.hotGoods {
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
.hotGoods .input .el-form-item {
  margin-bottom: 0;
}
.hotGoods .el-dialog {
  min-width: 450px;
}
.hotGoods .ot .el-dialog {
  min-width: 713px !important;
}
.hotGoods .el-textarea {
  width: 170px;
}
</style>
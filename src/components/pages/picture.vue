<template>
  <div class="picture">
    <div class="input">
      <el-form ref="form" :inline="true" label-width="70px" class="demo-form-inline">
        <el-form-item label="状态">
          <el-select v-model="formLine.isDisable" clearable>
            <el-option label="禁用" value="1"></el-option>
            <el-option label="启用" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="seachButton">
          <el-button type="primary" @click="findDate">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button type="primary" icon="el-icon-plus" @click="addData">新增</el-button>
      <el-button type="primary" icon="el-icon-top" @click="doGoods(0)">启用</el-button>
      <el-button type="primary" icon="el-icon-bottom" @click="doGoods(1)">禁用</el-button>
      <el-button type="danger" icon="el-icon-delete-solid" @click="delShop">删除</el-button>
    </div>
    <div class="tta">
      <div class="table1">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="sort" label="排序" width="50"></el-table-column>
          <el-table-column prop="filePath" label="图片" width="500" show-overflow-tooltip></el-table-column>
          <el-table-column prop="isDisable" label="状态" width="100">
            <template slot-scope="scope">{{scope.row.isDisable==1?'禁用':'启用'}}</template>
          </el-table-column>
          <el-table-column label="预览" width="100">
            <template slot-scope="scope">
              <img :src="scope.row.filePath" width="70px" @click="toImg(scope.row.filePath)" />
            </template>
          </el-table-column>
          <el-table-column prop="startDate" label="有效期起" width="170"></el-table-column>
          <el-table-column prop="endDate" label="有效期止" width="170"></el-table-column>
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

    <el-dialog title="新增轮播图" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
        <el-form-item label="上传图片" label-width="120px">
          <el-upload
            action="http://localhost:8088/homebanner/uploadFile"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :headers="metoke"
            :on-success="uploadSuccess"
            :before-upload="bfUpload"
            :limit="1"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="排序" label-width="120px" prop="sort">
          <el-input v-model="addForm.sort" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="起止时间" label-width="120px" prop="time">
          <el-date-picker
            v-model="addForm.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <el-dialog :visible.sync="dialogVisibleimg">
      <img width="100%" :src="dialogImageUrlimg" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      dialogImageUrlimg: "",
      dialogVisibleimg: false,
      formLine: {
        isDisable: ""
      },
      metoke: { Authorization: localStorage.getItem("token") },
      pageNum: 1,
      fileList: [],
      pageSize: 10,
      totalNum: 0,
      editForm: {},
      multipleSelection: [],
      addForm: {
        sort: "",
        time: "",
        startDate: "",
        endDate: ""
      },
      dialogEditVisible: false,
      dialogFormVisible: false,
      currentPage4: 1,
      tableData: [],
      rules: {
        sort: [{ required: true, message: "请输入商品排序", trigger: "blur" }],
        time: [{ required: true, message: "请输入起止时间", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods: {
    bfUpload(file) {
      console.log(file);
      if ("image/png" == file.type || "image/png" == file.type) {
      } else {
        return;
      }
    },
    //删除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    toImg(val) {
      this.dialogImageUrlimg = val;
      this.dialogVisibleimg = true;
    },
    //放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //上下架
    doGoods(val) {
      var name = val == 1 ? "禁用" : "启用";
      if (1 == this.multipleSelection.length) {
        this.$confirm("确定要" + name + "吗? 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //此处调接口
            var list = {
              sort: this.multipleSelection[0].sort,
              isDisable: this.multipleSelection[0].isDisable,
              flag: val
            };
            if (val == 0) {
              if (list.isDisable == val) {
                this.$message({
                  type: "error",
                  message: "商品已经启用"
                });
              } else {
                this.$axios
                  .post("homebanner/enablehomebanner", list)
                  .then(res => {
                    if (200 == res.data.code) {
                      this.$message({
                        type: "success",
                        message: res.data.msg
                      });
                      this.getDate();
                    }
                  });
              }
            } else if (val == 1) {
              if (list.isDisable == val) {
                this.$message({
                  type: "error",
                  message: "商品已经禁用"
                });
              } else {
                this.$axios
                  .post("homebanner/disablehomebanner", list)
                  .then(res => {
                    console.log(res);
                    if (200 == res.data.code) {
                      this.$message({
                        type: "success",
                        message: res.data.msg
                      });
                      this.getDate();
                    }
                  });
              }
            }
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
    //上传之前调用
    bfUpload(file) {
      console.log(file);
      if ("image/png" == file.type || "image/png" == file.type) {
      } else {
        return;
      }
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
        isDisable: this.formLine.isDisable + ""
      };
      this.$axios
        .post(
          "homebanner/selecthomebanner?pageSize=" +
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
    //重置
    clear() {
      (this.formLine = {
        isDisable: ""
      }),
        this.getDate();
    },
    uploadSuccess(response, file, fileList) {
      this.addForm.filePath = response.url;
    },
    //点击新增按钮
    addData() {
      this.addForm={};
      (this.fileList = []), (this.dialogFormVisible = true);
      if (this.$refs["addForm"]) {
        this.$refs["addForm"].resetFields();
      }
    },
    //确定新增
    resolvingDate(date) {
      var time = new Date(date)
        .toISOString()
        .replace(/T/g, " ")
        .replace(/\.[\d]{3}Z/, "");
      return time;
    },
    sureAddData() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          this.addForm.startDate = this.addForm.time[0];
          this.addForm.endDate = this.addForm.time[1];
          this.$axios
            .post("homebanner/addhomebanner", this.addForm)
            .then(res => {
              console.log(res);
              if (200 == res.data.code) {
                this.getDate();
                this.addForm = {};
              } else if (500 == res.data.code) {
                this.$message.error(res.data.msg);
                this.addForm = {};
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
              list.push({ sort: this.multipleSelection[i].sort });
            }
            console.log(list);
            this.$axios.post("homebanner/delhomebanner", list).then(res => {
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
    }
  }
};
</script>


<style scoped>
.picture {
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
.picture .input .el-form-item {
  margin-bottom: 0;
}
.picture .el-dialog {
  min-width: 711px;
}
.picture .el-textarea {
  width: 170px;
}
.picture .el-date-editor .el-range-separator {
  line-height: 22px;
}
.picture .el-date-editor .el-range__icon {
  line-height: 22px;
}
</style>
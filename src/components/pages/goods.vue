<template>
  <div class="goods">
    <div class="input">
      <el-form ref="form" :inline="true" label-width="70px" class="demo-form-inline">
        <el-form-item label="商品名称">
          <el-input v-model="formLine.skuName" clearable placeholder="请输入商品"></el-input>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select v-model="formLine.status" clearable placeholder="请选择商品状态">
            <el-option label="已下架" value="0"></el-option>
            <el-option label="已上架" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告词">
          <el-input v-model="formLine.advertising" clearable></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="formLine.press" clearable></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formLine.author" clearable></el-input>
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
      <el-button type="primary" icon="el-icon-top" @click="doGoods(1)">上架</el-button>
      <el-button type="primary" icon="el-icon-bottom" @click="doGoods(2)">下架</el-button>
      <el-button type="danger" icon="el-icon-delete-solid" @click="delShop">删除</el-button>
    </div>
    <div class="tta">
      <div class="table1">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" fixed></el-table-column>
          <el-table-column prop="skuNo" label="商品编码" width="178" fixed></el-table-column>
          <el-table-column prop="skuName" label="商品名称" width="100" fixed></el-table-column>
          <el-table-column prop="fixPrice" label="定价" fixed></el-table-column>
          <el-table-column prop="sellingPrice" label="售价" fixed></el-table-column>
          <el-table-column prop="saleCnt" label="销售数量" width="100"></el-table-column>
          <el-table-column prop="goodCateOneName" label="一级分类名称" width="120"></el-table-column>
          <el-table-column prop="goodCateTwoName" label="二级分类名称" width="120"></el-table-column>
          <el-table-column prop="advertising" label="广告词" width="150" show-overflow-tooltip></el-table-column>
          <el-table-column prop="detail" label="商品介绍" width="150"></el-table-column>
          <el-table-column prop="status" label="商品状态名称" width="120">
            <template
              slot-scope="scope"
            >{{scope.row.status==0?'已下架':scope.row.status==1?'已上架':'未知'}}</template>
          </el-table-column>
          <el-table-column prop="putawayTime" label="上架时间" width="160" ></el-table-column>
          <el-table-column prop="getoutTime" label="下架时间" width="160" ></el-table-column>
          <el-table-column prop="browseCount" label="浏览量" width="50"></el-table-column>
          <el-table-column prop="outsideNo" label="商家编码" width="120"></el-table-column>
          <el-table-column prop="storeName" label="商家名称" width="120" show-overflow-tooltip></el-table-column>
          <el-table-column prop="amountCnt" label="库存"></el-table-column>
          <el-table-column prop="press" label="出版社"></el-table-column>
          <el-table-column prop="author" label="作者"></el-table-column>
          <el-table-column prop="isbn" label="Isbn书号" width="100"></el-table-column>
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

    <el-dialog title="新增商品" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="addForm" :inline="true" :rules="rules" ref="addForm">
        <el-form-item label="商品名称" label-width="120px" prop="skuName">
          <el-input v-model="addForm.skuName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="书号名称" label-width="120px" prop="isbn">
          <el-input v-model="addForm.isbn" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px" prop="cateOneName">
          <el-select v-model="addForm.cateOneName" placeholder="请选择一级分类" @change="changeFirst">
            <el-option
              v-for="item in firstCateCodeList"
              :key="item.cateCode"
              :label="item.cateName"
              :value="item.cateCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="cateTwoName">
          <el-select v-model="addForm.cateTwoName" placeholder="请选择二级分类">
            <el-option
              v-for="item in secondCateCodeList"
              :key="item.cateCode"
              :label="item.cateName"
              :value="item.cateCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店" label-width="120px" prop="outsideNo">
          <el-select v-model="addForm.outsideNo" placeholder="请选择门店">
            <el-option
              v-for="item in storeList"
              :key="item.storeNo"
              :label="item.storeName"
              :value="item.storeNo"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告词" label-width="120px" prop="advertising">
          <el-input type="textarea" v-model="addForm.advertising"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" label-width="120px" prop="detail">
          <el-input type="textarea" v-model="addForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="出版社" label-width="120px" prop="press">
          <el-input v-model="addForm.press" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品状态" label-width="120px" prop="status">
          <el-select v-model="addForm.status">
            <el-option label="在售" value="1"></el-option>
            <el-option label="已下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存" label-width="120px" prop="amountCnt">
          <el-input type="number" v-model="addForm.amountCnt" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="定价" label-width="120px" prop="fixPrice">
          <el-input v-model="addForm.fixPrice" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="售价" label-width="120px" prop="sellingPrice">
          <el-input v-model="addForm.sellingPrice" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="上传图片" label-width="120px">
          <el-upload
            action="http://localhost:8088/homebanner/uploadFile"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="uploadSuccess"
            :before-upload="bfUpload"
            :headers="metoke"
            :file-list="fileList"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改商品" :visible.sync="dialogEditVisible" width="40%">
      <el-form :model="editForm" :inline="true" :rules="rules" ref="editForm">
        <el-form-item label="商品名称" label-width="120px" prop="skuName">
          <el-input v-model="editForm.skuName" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="书号名称" label-width="120px" prop="isbn">
          <el-input v-model="editForm.isbn" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="一级分类" label-width="120px" prop="cateOneName">
          <el-select v-model="editForm.cateOneName" placeholder="请选择一级分类" @change="changeSecond">
            <el-option
              v-for="item in firstCateCodeList"
              :key="item.cateCode"
              :label="item.cateName"
              :value="item.cateCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px" prop="cateTwoName">
          <el-select v-model="editForm.cateTwoName" placeholder="请选择二级分类">
            <el-option
              v-for="item in secondCateCodeList"
              :key="item.cateCode"
              :label="item.cateName"
              :value="item.cateCode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="门店" label-width="120px" prop="outsideNo">
          <el-select v-model="editForm.outsideNo" placeholder="请选择门店">
            <el-option
              v-for="item in storeList"
              :key="item.storeNo"
              :label="item.storeName"
              :value="item.storeNo"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广告词" label-width="120px" prop="advertising">
          <el-input type="textarea" v-model="editForm.advertising"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" label-width="120px" prop="detail">
          <el-input type="textarea" v-model="editForm.detail"></el-input>
        </el-form-item>
        <el-form-item label="出版社" label-width="120px" prop="press">
          <el-input v-model="editForm.press" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品状态" label-width="120px" prop="status">
          <el-select v-model="editForm.status" disabled>
            <el-option label="在售" value="1"></el-option>
            <el-option label="已下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存" label-width="120px" prop="amountCnt">
          <el-input type="number" v-model="editForm.amountCnt" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="定价" label-width="120px" prop="fixPrice">
          <el-input v-model="editForm.fixPrice" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="售价" label-width="120px" prop="sellingPrice">
          <el-input v-model="editForm.sellingPrice" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="上传图片" label-width="120px">
          <el-upload
            action="http://localhost:8088/homebanner/uploadFile"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemoveEdit"
            :on-success="uploadSuccessEdit"
            :before-upload="bfUpload"
            :headers="metoke"
            :file-list="fileList1"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureEditData">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      metoke: { Authorization: localStorage.getItem("token") },
      dialogImageUrl: "",
      dialogVisible: false,
      formLine: {
        skuName: "",
        status: "",
        advertising: "",
        press: "",
        author: ""
      },
      imgUrl: [],
      firstCateCodeList: [],
      secondCateCodeList: [],
      storeList: [],
      editForm: {
        picList: []
      },
      fileList: [],
      fileList1: [],
      multipleSelection: [],
      addForm: {
        isbn: "",
        skuName: "",
        cateOneName: "",
        cateTwoName: "",
        advertising: "",
        detail: "",
        press: "",
        status: "",
        amountCnt: "",
        fixPrice: "",
        sellingPrice: "",
        costPrice: "",
        images: "",
        outsideNo: "",
        picList: []
      },
      dialogEditVisible: false,
      dialogFormVisible: false,
      currentPage4: 1,
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      tableData: [],
      rules: {
        detail: [
          { required: true, message: "请输入商品介绍", trigger: "blur" },
          {
            min: 3,
            max: 100,
            message: "长度在 3 到 100 个字符",
            trigger: "blur"
          }
        ],
        advertising: [
          { required: true, message: "请输入商品广告词", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        skuName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        press: [
          { required: true, message: "请输入出版社", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        isbn: [
          { required: true, message: "请输入书号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        fixPrice: [{ required: true, message: "请输入定价", trigger: "blur" }],
        sellingPrice: [
          { required: true, message: "请输入售价", trigger: "blur" }
        ],
        costPrice: [{ required: true, message: "成本价", trigger: "blur" }],
        cateOneName: [
          { required: true, message: "请选择一级分类", trigger: "blur" }
        ],
        cateTwoName: [
          { required: true, message: "请选择二级分类", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择商品状态", trigger: "blur" }
        ],
        outsideNo: [{ required: true, message: "请选择门店", trigger: "blur" }],
        amountCnt: [{ required: true, message: "请输入库存", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods: {
    changeFirst(val) {
      console.log(val);
      this.addForm.cateTwoName = "";
      this.$axios
        .post("goodscate/getgoodscatetwo", { cateCodeParent: val })
        .then(res => {
          console.log(res);
          if (200 == res.data.code) {
            this.secondCateCodeList = res.data.data;
          }
        });
    },
    changeSecond(val) {
      console.log(val);
      this.editForm.cateTwoName = "";
      this.$axios
        .post("goodscate/getgoodscatetwo", { cateCodeParent: val })
        .then(res => {
          console.log(res);
          if (200 == res.data.code) {
            this.secondCateCodeList = res.data.data;
          }
        });
    },
    getDate() {
      var parm = {
        skuName: this.formLine.skuName,
        status: this.formLine.status + "",
        advertising: this.formLine.advertising,
        press: this.formLine.press,
        author: this.formLine.author
      };
      this.$axios
        .post(
          "goods/seletGoods?pageSize=" +
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
              skuNo: this.multipleSelection[0].skuNo,
              status: this.multipleSelection[0].status,
              flag: val
            };
            if (val == 1) {
              if (list.status == val) {
                this.$message({
                  type: "error",
                  message: "商品已经上架"
                });
              } else {
                this.$axios.post("goods/upGoods", list).then(res => {
                  if (200 == res.data.code) {
                    this.$message({
                      type: "success",
                      message: res.data.msg
                    });
                    this.getDate();
                  }
                });
              }
            } else if (val == 2) {
              if (list.status == "0") {
                this.$message({
                  type: "error",
                  message: "商品已经下架"
                });
              } else {
                this.$axios.post("goods/downGoods", list).then(res => {
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
    //删除图片
    handleRemove(file, fileList) {
      for (var i = 0; i < this.addForm.picList.length; i++) {
        if (file.response.url == this.addForm.picList[i]) {
          this.addForm.picList.splice(i, 1);
        }
      }
    },
    handleRemoveEdit(file, fileList) {
      console.log(file.url);
      console.log(this.fileList1);
      for (var i = 0; i < this.fileList1.length; i++) {
        if (file.url == this.fileList1[i].url) {
          this.fileList1.splice(i, 1);
        }
      }
      console.log(this.fileList1);
      console.log(2);
    },
    uploadSuccessEdit(response, file, fileList) {
      console.log(response);
      console.log(1);
      console.log(response.url);
      this.fileList1.push(response);
      console.log(this.fileList1);
      // var lise=[];
      // for(var i=0;i<fileList.length;i++){
      //     lise.push(fileList[i].url)
      // }
      // this.imgUrl=lise
    },
    uploadSuccess(response, file, fileList) {
      // console.log(response, file, fileList);
      // console.log(1)
      this.addForm.picList.push(response.url);
      // var lise=[];
      // for(var i=0;i<fileList.length;i++){
      //     lise.push(fileList[i].url)
      // }
      // this.imgUrl=lise
    },
    //放大图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
    //点击修改按钮
    editShop() {
      if (this.$refs["editForm"]) {
        this.$refs["editForm"].resetFields();
      }
      this.fileList1 = [];
      this.editForm = [];
      if (1 == this.multipleSelection.length) {
        (this.dialogEditVisible = true),
          (this.editForm = JSON.parse(
            JSON.stringify(this.multipleSelection[0])
          ));
        this.editForm.picList = this.fileList;
        this.$axios.post("goods/findGoodsBanner", this.editForm).then(res => {
          // console.log(res)
          // return
          if (200 == res.data.code) {
            for (var i = 0; i < res.data.data.length; i++) {
              var obj = {
                name: res.data.data[i].skuNo,
                url: res.data.data[i].surPicUrl
              };
              this.fileList1.push(obj);
              console.log(this.fileList1)
            }
          }
        });
        this.$axios.post("goodscate/getgoodscateone").then(res => {
          console.log(res);
          if (200 == res.data.code) {
            this.firstCateCodeList = res.data.data;
            console.log(this.editForm.cateTwoName);
            this.$axios
              .post("goodscate/getgoodscatetwo", {
                cateCodeParent: this.editForm.cateOneName
              })
              .then(res => {
                console.log(res);
                if (200 == res.data.code) {
                  this.secondCateCodeList = res.data.data;
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
          //console.log(this.fileList1[0].url)
          for (var i = 0; i < this.fileList1.length; i++) {
            this.editForm.picList.push(this.fileList1[i].url);
          }
          this.$axios.post("goods/editGoods", this.editForm).then(res => {
            console.log(res);
              this.$message.success(res.data.msg);
              this.getDate()
            this.fileList = [];
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
        skuName: "",
        status: "",
        advertising: "",
        press: "",
        author: ""
      }),
        this.findDate();
    },
    //点击新增按钮
    addData() {
      this.dialogFormVisible = true;
      this.firstCateCodeList = {};
      this.secondCateCodeList = {};
      this.imgUrl = {};
      this.fileList = [];
      if (this.$refs["addForm"]) {
        this.$refs["addForm"].resetFields();
      }
      this.$axios.post("goodscate/getgoodscateone").then(res => {
        console.log(res);
        if (200 == res.data.code) {
          this.firstCateCodeList = res.data.data;
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
          this.$axios.post("goods/addGoods", this.addForm).then(res => {
            console.log(res);
            if (200 == res.data.code) {
              this.$message.success(res.data.msg);
              this.dialogFormVisible = false;
              this.pageNum = 1;
              this.getDate();
            } else {
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
              list.push({skuNo: this.multipleSelection[i].skuNo})
            }
            console.log(list);
            this.$axios.post("goods/delGoods", list).then(res => {
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
.goods {
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
.goods .input .el-form-item {
  margin-bottom: 0;
}
.goods .el-dialog {
  min-width: 645px;
  margin-top: 9vh !important;
}
.goods .el-textarea {
  width: 170px;
}
</style>
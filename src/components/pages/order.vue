<template>
  <div class="order">
    <div class="input">
      <el-form ref="form" :inline="true" label-width="70px" class="demo-form-inline">
        <el-form-item label="下单人">
          <el-input v-model="formLine.shippingUser" clearable placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="订单编码">
          <el-input v-model="formLine.orderNo" clearable placeholder="请输入订单编码"></el-input>
        </el-form-item>
        <el-form-item label="起止时间" label-width="110px" prop="time" class="opq">
          <el-date-picker
            v-model="formLine.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="formLine.phone" clearable placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="formLine.orderStatus" clearable placeholder="请选择">
            <el-option label="已下单" value="0"></el-option>
            <el-option label="已发货" value="1"></el-option>
            <el-option label="已取消发货" value="2"></el-option>
            <el-option label="订单已到货" value="3"></el-option>
            <el-option label="已取消订单到货" value="4"></el-option>
            <el-option label="已取消" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="seachButton">
          <el-button type="primary" @click="findDate">查询</el-button>
          <el-button @click="clear">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="button">
      <el-button type="primary" icon="el-icon-setting" @click="addData">详情</el-button>
      <el-button type="primary" icon="" @click="editData(1)">订单发货</el-button>
      <el-button type="primary" icon="" @click="editData(2)">取消发货</el-button>
      <el-button type="primary" icon="" @click="editData(3)">订单已到货</el-button>
      <el-button type="primary" icon="" @click="editData(4)">取消订单到货</el-button>
      <el-button type="primary" icon="" @click="editData(5)">取消订单</el-button>
    </div>
    <div class="tta">
      <div class="table1">
        <el-table :data="tableData" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="orderNo" label="订单编码" width="200"></el-table-column>
          <el-table-column prop="orderMoney" label="订单总价" width="77"></el-table-column>
          <el-table-column prop="orderStatus" label="订单状态" width="120">
            <template
              slot-scope="scope"
            >{{scope.row.orderStatus==0?'已下单':scope.row.orderStatus==1?'已发货':scope.row.orderStatus==2?'已取消发货':scope.row.orderStatus==3?'已到货':scope.row.orderStatus==4?'已取消到货':'已取消'}}</template>
          </el-table-column>
          <el-table-column prop="receiverNo" label="门店编码" width="150"></el-table-column>
          <el-table-column prop="shippingUser" label="下单人姓名" width="95"></el-table-column>
          <el-table-column prop="phone" label="下单人手机号" width="130"></el-table-column>
          <el-table-column prop="payTime" label="确认付款时间" width="170"></el-table-column>
          <el-table-column prop="shippingTime" label="发货时间" width="170"></el-table-column>
          <el-table-column prop="receiveTime" label="到货时间" width="170"></el-table-column>
        </el-table>
      </div>

      <div class="yezi">
        <el-pagination
          size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10,100, 200, 300, 400]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalNum"
        ></el-pagination>
      </div>
      <el-dialog title="订单详情" :visible.sync="dialogFormVisible" width="60%">
        <el-table :data="tableDatati" style="width: 100%">
          <el-table-column prop="orderDetailCode" label="订单编码" width="200"></el-table-column>
          <el-table-column prop="skuNo" label="商品编码" width="200"></el-table-column>
          <el-table-column prop="goodsName" label="商品名称" width="120"></el-table-column>
          <el-table-column prop="goodsCnt" label="购买数量"></el-table-column>
          <el-table-column prop="goodsPrice" label="单价"></el-table-column>
        </el-table>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">关 闭</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLine: {
        shippingUser: "",
        orderNo: "",
        phone: "",
        time: "",
        orderStatus: ""
      },
      editForm: {},
      multipleSelection: [],
      dialogEditVisible: false,
      dialogFormVisible: false,
      currentPage4: 4,
      pageNum: 1,
      pageSize: 10,
      totalNum: 0,
      tableData: [],
      tableDatati: []
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
    addData() {
    
      if (1 == this.multipleSelection.length) {
          this.$axios
        .post(
          "order/selectOrderAll",
          {orderNo: this.multipleSelection[0].orderNo}
        )
        .then(res => {
           console.log(res);
          if (200 == res.data.code) {
            this.tableDatati=res.data.data
            this.dialogFormVisible = true,
            console.log(this.tableData)
            console.log(1)
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }
      else{
         this.$message("请选择一条数据进行查看");
      }
    },
    editData(val) {
      if (1 == this.multipleSelection.length) {
        this.editForm = {
          orderNo: this.multipleSelection[0].orderNo,
          orderStatus: val
        };
        this.$axios.post("order/changeOrderAll",this.editForm).then(res => {
           if (200 == res.data.code) {
               this.$message.success(res.data.msg);
               this.getDate();
           }else if(500 == res.data.code){
             this.$message.error(res.data.msg);
           }
        })
      } else {
        this.$message("请选择一条数据进行修改");
      }
    },
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
        shippingUser: this.formLine.shippingUser,
        orderNo: this.formLine.orderNo,
        phone: this.formLine.phone + "",
        goTime: this.formLine.time[0],
        endTimet: this.formLine.time[1],
        orderStatus: this.formLine.orderStatus
      };
      this.$axios
        .post(
          "order/selectOrder?pageSize=" +
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
        shippingUser: "",
        orderNo: "",
        phone: "",
        time: "",
        orderStatus: ""
      }),
        this.findDate();
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
.order {
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
.order .input .el-form-item {
  margin-bottom: 0;
}
.order .el-dialog {
  min-width: 645px;
}
.order .el-date-editor .el-range-separator {
  line-height: 22px;
}
.order .el-date-editor .el-range__icon {
  line-height: 22px;
}
.order .el-form--inline .el-form-item__label {
  width: 70px !important;
}
.order .el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
  width: 337px;
}
</style>
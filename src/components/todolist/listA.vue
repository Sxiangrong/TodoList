<template>
  <div id="listA">
    <el-row>
      <h1>Todo List
        <el-button type="primary" icon="el-icon-plus" circle class="btnPlus" @click="eventAdd()"></el-button>
      </h1>
    </el-row>
    <el-row>
      <div style="margin-left: -25%">
<!-- <el-row>
          <el-input style="width: 200px" v-model="query" placeholder="请输入事项"></el-input>
          <el-button type="primary" @click="onQuery(query)">查询</el-button>
        </el-row>-->
        <el-form :inline="true" :model="query" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="query.content" placeholder="输入查询事项"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery(query.content)">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="margin-right: -25%;margin-top: -3%">
          <el-row >
              <el-select v-model="filtrate" clearable placeholder="请选择">
                <el-option
                  v-for="(selectItem,index) in filtrates"
                  :key="index"
                  :label="selectItem.label"
                  :value="selectItem.value">
                </el-option>
              </el-select>
            <el-button type="primary" @click="QuerySubmit">查询</el-button>
          </el-row>
      </div>
      <div style="margin-top: 5%">
        <ul style="width: 50%;margin-left: 20%">
          <h4>事项</h4>
          <li v-for="(item,index) in TodoList" :key="index" style="height: 60px">
            <!--   <span class="font">{{index}}</span>-->
            <span class="font" :class="[item.isCompleted ?'isLine':'']" ref="text">{{item.content}}</span>
            <div style="margin-left: 150px;margin-top: -4%">
              <el-button type="primary" :class="[item.isCompleted ? 'isActive':'']" icon="el-icon-check" circle @click="eventChecked(item.id)"></el-button>
              <el-button type="primary" icon="el-icon-edit" circle   @click="eventEdit(item)"></el-button>
              <el-button type="primary" icon="el-icon-delete-solid" circle   @click="eventDeleted(index)"></el-button>
            </div>
            <hr style="width:50%;margin-left: 35%"/>
          </li>
          <span>共{{TodoListLength}}条</span>
        </ul>
      </div>
    </el-row>
    <!--添加模态框-->
    <el-dialog title="添加事项" :visible.sync="dialog.dialogFormVisible" width="400px">
      <el-row>
        <el-input v-model="addTodoItem" ></el-input>
      </el-row>
      <el-row style="padding-top: 5%">
        <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnSubmitClick(addTodoItem)">确 定</el-button>
      </el-row>
    </el-dialog>
    <!--编辑模态框-->
    <el-dialog title="编辑事项" :visible.sync="dialog.dialogVisible" width="400px">
      <el-row>
        <el-input v-model="editTodoItem"></el-input>
      </el-row>
      <el-row style="padding-top: 5%">
        <el-button @click="dialog.dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnEditClick(editTodoItem)">确 定</el-button>
      </el-row>
<!--      <el-form :model="editTodoList"  >
        <el-form-item label="事项" label-width="80px" >
          <el-input v-model="editTodoList.content" ></el-input>
        </el-form-item>
        <el-form-item  class="dialog-footer">
          <el-button @click="dialog.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="btnEditClick(editTodoList.content)">确 定</el-button>
        </el-form-item>
      </el-form>-->
    </el-dialog>
  </div>
</template>

<script>
const TodoList = [
  /*{
    id:'0',
    content:'学习',
    isCompleted:false
  }*/
];
export default {
  name: "listA.vue",
  data(){
    return{
      //整个事项数组
      TodoList,
      //对话框
      dialog:{
        dialogFormVisible:false,
        dialogVisible:false
      },
      //添加事项数组
      addTodoItem:'',
      //编辑事项数组
      editTodoItem:'',
      //搜索
      query:{},
      //筛选数组
      filtrate:'',
      filtrates:[
        {value:'all',label:'全部'},{value:'finished',label:'已完成'},{value:'unfinished',label:'未完成'},
      ],
      // 完成的数组
      finishList: [],
      // 未完成数组
      UnfinishedList: [],
      idAll:'',
      currentEditItemId: null
    }
  },
  mounted() {
    //this.localSet();//页面加载时就是将数据存到localstorage
    this.localGet();//使用页面数据
    //var localTodoList = JSON.parse(localStorage.getItem('todoList'))
  },
  computed:{
    TodoListLength(){
      return this.TodoList.length; //计算属性——计算当前的数组长度
    },
    currentEditItem() {
      const todoItem = this.TodoList.find((item)=>{
        return item.id === this.idAll
      })
      return todoItem || {}
    }
  },
  methods:{

    localSet(){
      localStorage.setItem('List',JSON.stringify(TodoList));
    },
    localGet(){
      var TodoList =JSON.parse(localStorage.getItem('List'));
      if(TodoList){
        //如果数据存在，则将获取到的TodoList保存到刷新后的list
        this.TodoList=TodoList;
      }
    },
    //打开新建模态框事件
    eventAdd(){
      this.dialog.dialogFormVisible=true;
    },
    //将新建模态框中的数据，保存到TodoList清单中
    btnSubmitClick(content){
      //取出数组角标
      const leng = this.TodoList[this.TodoList.length-1];
      //判断第一次是否有ID
      const id = leng ? leng.id+ 1:1;
      this.TodoList.push({
        id:id,
        content:content,
        isCompleted: false,
      });
      this.addTodoItem='';//清空模态框的数据
      localStorage.setItem('List',JSON.stringify(this.TodoList));
      this.dialog.dialogFormVisible=false;
    },
    //编辑按钮
    eventEdit(item){
      this.dialog.dialogVisible=true;
      //在编辑之前    数据回显
      this.editTodoItem = item.content;
      this.idAll = item.id;
      // this.currentEditItemId = item.id

    },
    //编辑按钮事项的模态框
    btnEditClick(EditContent){
      this.TodoList[this.idAll-1].content=EditContent;
     //if(this.editTodoItem == editItem.content){
    //    this.TodoList[editItem.id].content = EditContent;
    //   }
     /* const todoItem = this.TodoList.find((item)=>{
        return item.id === this.idAll
      })
      console.log("todoItem",todoItem);
      todoItem.content = EditContent*/

      this.editTodoItem=''; //清空编辑输入框
      this.dialog.dialogVisible=false;
    },
    //删除按钮事件
    eventDeleted(item){
      this.TodoList.splice(item,1);
      localStorage.setItem('List',JSON.stringify(this.TodoList));
    },
    //确认已完成事件
    eventChecked(checkedId){
       this.TodoList.forEach((item)=>{
        if(item.id==checkedId){
          item.isCompleted = !item.isCompleted;
        };
        localStorage.setItem('List',JSON.stringify(this.TodoList))
      })

    },
    //查询按钮
    onQuery(queryContext){
      if(queryContext == ''){
       this.TodoList = JSON.parse(localStorage.getItem('List'));
      }else{
        this.TodoList = this.TodoList.filter((item)=>{
          return item.content==queryContext;
        })
      }
    },
    //筛选查询
    QuerySubmit(){
      const queryValue = this.filtrate;  // 操作当前的filtater,判断当前选中的值
      if(queryValue == 'all'){
        this.TodoList = JSON.parse(localStorage.getItem('List'));
      }else {
        if(queryValue == 'finished'){
          this.TodoList = JSON.parse(localStorage.getItem('List'));
          this.finishList = this.TodoList.filter((item)=>{
            return item.isCompleted == true;
          })
          this.TodoList = this.finishList;
        }else {
          this.TodoList = JSON.parse(localStorage.getItem('List'));
          this.UnfinishedList = this.TodoList.filter((item)=>{
            return  item.isCompleted == false;
          })
          this.TodoList = this.UnfinishedList;
        }
      }
    }
  }
}
</script>

<style scoped>
.btnPlus{
  margin-left: 30px;
  margin-top: -50%;
}
.font{
  font-family: 宋体;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10%;
  margin-left: -20%;
  text-align: center;
  line-height: 20px;

}
li{
  list-style: none;
}
h4{
  margin-left: -20%;
}
ul span{
  font-family: 宋体;
  font-size: 14px;
  font-weight: 700;
  margin-left: 60%;
}
.btnStatus{

  color:darkred;
  text-decoration: line-through;
}
.isActive {
  background-color: #29be6a;
}
.isLine{
  text-decoration: line-through;
}
</style>

<template>
    <div id="list">
      <el-row>
        <h1>Todo List
          <el-button type="primary" icon="el-icon-plus" circle class="btnPlus" @click="eventAdd()"></el-button>
        </h1>
      </el-row>
      <el-row>
        <div style="margin-left: -25%">
          <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="form.content" placeholder="输入查询事项"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onQuery(form.content)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="margin-right: -25%;margin-top: -3%">
          <el-form :inline="true" :model="falterData" class="demo-form-inline">
            <el-form-item label="筛选">
              <el-select v-model="falterData.seletor" placeholder="条件选择">
                <el-option label="全选"  value="all"></el-option>
                <el-option label="已完成" value="finished"></el-option>
                <el-option label="未完成" value="unfinished"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="QuerySubmit(falterData.seletor)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <ul style="width: 50%;margin-left: 20%">
            <h4>事项</h4>
            <li v-for="(item,index) in TodoList" :key="index" style="height: 60px">
              <!--   <span class="font">{{index}}</span>-->
              <span class="font" :class="[istrue===index?'isLine':'']" ref="text">{{item.content}}</span>
              <div style="margin-left: 150px;margin-top: -4%">
                <el-button type="primary" :class="[istrue===index?'isActive':'']" icon="el-icon-check" circle @click="eventChecked(index)"></el-button>
                <el-button type="primary" icon="el-icon-edit" circle   @click="eventEdit(index,item.content)"></el-button>
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
        <el-form :model="addTodoList"  >
          <el-form-item label="新增事项" label-width="80px" >
            <el-input v-model="addTodoList.content" ></el-input>
          </el-form-item>
          <el-form-item  class="dialog-footer">
            <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="btnSubmitClick(addTodoList.content)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!--编辑模态框-->
      <el-dialog title="编辑事项" :visible.sync="dialog.dialogVisible" width="400px">
        <el-form :model="editTodoList"  >
          <el-form-item label="事项" label-width="80px" >
            <el-input v-model="editTodoList.content" ></el-input>
          </el-form-item>
          <el-form-item  class="dialog-footer">
            <el-button @click="dialog.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="btnEditClick(editTodoList.content)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  const TodoList=[];
    export default {
      name: "list",
      data(){
          return{
            istrue: '', //用于检测当前列表项是否为激活项
            TodoList:TodoList,
            //对话框
            dialog:{
              dialogFormVisible:false,
              dialogVisible:false
            },
            //添加事项数组
            addTodoList:[],
            //编辑事项数组
            editTodoList:{
              content:''
            },
            //搜索数组
            form:[],
            //筛选数组
            falterData:[{
              seletor:''
            }],
            //编辑按钮接受的空数组
            listArr:[],
            finishList: [], // 完成的数组
            consistList: [], // 未完成数组

          }
      },
     mounted() {
        // this.localSet();//页面加载时就是将数据存到localstorage
         // this.localGet();//使用页面数据
        //var localTodoList = JSON.parse(localStorage.getItem('todoList'))

      },
      computed:{
          TodoListLength(){
            return this.TodoList.length;
          },
      },
/*      watch:{
          TodoList:{
            handler:function(){
              localStorage.setItem('todoList',JSON.stringify(TodoList));
            },
            deep:true    //深度监听
          }
      },*/
      methods:{
       /* localSet(){
        localStorage.setItem('todoList',JSON.stringify(TodoList));
        },
       localGet(){
          var TodoList =JSON.parse(localStorage.getItem('todoList'));
          if(TodoList){
            //如果数据存在，则将获取到的TodoList保存到刷新后的list
            this.TodoList=TodoList;
          }
        },*/
        //打开新建模态框事件
        eventAdd(){
          this.dialog.dialogFormVisible=true;
        },
        //将新建模态框中的数据，保存到TodoList清单中
        btnSubmitClick(content){
          this.TodoList.push({
            content:content,
          });
          this.addTodoList.content='';//清空模态框的数据
          localStorage.setItem('todoList',JSON.stringify(this.TodoList));
          this.dialog.dialogFormVisible=false;
        },
        //编辑按钮
        eventEdit(id,DataContent){
          this.dialog.dialogVisible=true;
          //在编辑之前    数据回显
          this.editTodoList.content=DataContent;
        },
        //编辑按钮事项的模态框
        btnEditClick(EditContent){
         // alert(EditContent);
          //var localData = window.localStorage.getItem('todoList');
          console.log(this.TodoList);
          this.TodoList.content = EditContent;

          //this.editTodoList.content=''; //清空编辑输入框
          this.dialog.dialogVisible=false;
        },
        //删除按钮事件
        eventDeleted(item){
           this.TodoList.splice(item,1);
           localStorage.setItem('todoList',JSON.stringify(this.TodoList));
        },
        //确认已完成事件
        eventChecked(checkedId){
         this.istrue= checkedId;
        },
        //查询按钮
        onQuery(queryContext){
          if(queryContext == ''){
           // return this.TodoList;
           return JSON.parse(localStorage.getItem('todoList'));
          }else{
            this.TodoList = this.TodoList.filter((item)=>{
              return item.content==queryContext;
            })
          }
        },
        //筛选查询
        QuerySubmit(selector){
          var select1 = this.falterData.seletor;
          var class1 = this.$refs.text.style;
        /*  alert("class",class1);*/
          if(class1 == 'isLine'){
            this.TodoList.filter(item=>{
              this.finishList = [];
              this.finishList.push(item);
            })
            console.log("已完成数据",this.finishList);
          }else {
            this.TodoList.filter(item => {
              this.consistList = [];
              this.consistList.push(item);
            })
            console.log("未完成数据",this.consistList);
          }
            //分别调用不同的数组
          if(select1 === 'unfinished'){
            return this.TodoList = this.consistList;
          }else if(select1 === 'finished'){
            return this.TodoList = this.finishList;
          }else {
            return this.TodoList;
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
  .isActive {
    background-color: #29be6a;
  }
  .isLine{
    text-decoration: line-through;
  }
</style>

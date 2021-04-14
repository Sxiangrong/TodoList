<template>
    <div id="index">
      <el-row>
        <h1>Todo List
        <el-button type="primary" class="right" circle @click="addEvent()">+</el-button>
        </h1>
      </el-row>
     <el-row class="row">
       <el-table :data="TodoList" height="250" style="width: 100%">
         <el-table-column prop="id" label="序号" width="150">
         </el-table-column>
         <el-table-column prop="context" label="事项" width="300">
         </el-table-column>
         <el-table-column  label="操作">
           <template slot-scope="scope">
             <el-button type="primary" icon="el-icon-check" circle @click="finished(scope.row.id)"></el-button>
             <el-button type="primary" icon="el-icon-edit" circle @click="edit(scope.row.id,scope.row.context)"></el-button>
             <el-button type="primary" icon="el-icon-delete-solid" circle @click="deleted(scope.row.id)"></el-button>
           </template>
         </el-table-column>
       </el-table>
     </el-row>
      <!--添加事项的模态框-->
      <el-dialog title="添加事项" :visible.sync="dialog.dialogFormVisible" width="400px">
        <el-form :model="addTodoList"  >
          <el-form-item label="新增序号" label-width="80px" >
            <el-input v-model="addTodoList.id"></el-input>
          </el-form-item>
          <el-form-item label="新增事项" label-width="80px" >
            <el-input v-model="addTodoList.context" ></el-input>
          </el-form-item>
          <el-form-item  class="dialog-footer">
            <el-button @click="dialog.dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="btnSubmit(addTodoList.id,addTodoList.context)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
<!--编辑模态框-->
      <el-dialog title="编辑事项" :visible.sync="dialog.dialogVisible" width="400px">
        <el-form :model="editTodoList"  >
          <el-form-item label="序号" label-width="80px" >
            <el-input v-model="editTodoList.id" disabled></el-input>
          </el-form-item>
          <el-form-item label="事项" label-width="80px" >
            <el-input v-model="editTodoList.context" ></el-input>
          </el-form-item>
          <el-form-item  class="dialog-footer">
            <el-button @click="dialog.dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="btnEditSubmit(editTodoList.context)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
  const TodoList = [
    {
      id:'1',context:'吃饭',
    },
    {
      id:'2',context:'学习',
    },
  ];
/*  let Isc=(function(){
    return{
      add(TodoList){
        localStorage.setItem('todoList',JSON.stringify(TodoList))

      },
      get(){
        return JSON.parse(localStorage.getItem('todoList'))
      },
      remove(){
        localStorage.red('todoList')
      }
    }
  })()*/
export default {
  name: 'index',
  data(){
    return{
      //整个代做事项的清单
      TodoList:TodoList,
      //对话框
      dialog:{
        dialogFormVisible:false,
        dialogVisible:false
      },
      //添加对话框的数组
      addTodoList:{
        id:'',
        context:'',
      },
      //编辑模态框
      editTodoList:{
        id:'',
        context: '',
      },
      //接收新建
      addList:[]
    }
  },
mounted() {
   /* localStorage.setItem('todoList', JSON.stringify(TodoList));*/
},
  methods:{
    //点击加号事件
    addEvent(){
      this.dialog.dialogFormVisible=true;

    },
    //对话框提交事件
    btnSubmit(id,context){
      if(context != '' && id != ''){
      this.addList.id=id;
      this.addList.context=context;
      this.TodoList.push(this.addList)
      }
      this.dialog.dialogFormVisible=false;
    },
    //已完成的事项
    finished(dataId){
      this.TodoList.id=dataId;

    },
    deleted(deleteId){
      if(deleteId!=''){
        this.addList=this.TodoList.filter((item)=>{
          return item.id = deleteId;
        });
        this.TodoList.splice(item,1);
      }
    },
    //编辑模态框
    edit(editId,editContext){
     this.dialog.dialogVisible=true;
      //先进型数据的回显
     this.TodoList.filter((item)=>{
        this.editTodoList.id=editId;
        this.editTodoList.context=editContext;
      })
    },
    //编辑模态框的确认事项
    btnEditSubmit(text){
      if(text=!''){
       return this.TodoList.context=text;
      }
     this.dialog.dialogVisible=false;
    }
  }
}
</script>

<style scoped>
.row{
  width: 800px;
  margin: 0 auto;
}
.right{
  margin-left: 100px;
}

</style>

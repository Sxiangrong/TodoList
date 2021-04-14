import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
  /*  {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },*/
    {
      path: '/index',
      name: 'index',
      component: ()=>import('../view/index.vue')
    },
    {
      path: '/list',
      name: 'list',
      component: ()=>import('../components/todolist/list.vue')
    },
    {
      path: '/',
      name: 'listA',
      component: ()=>import('../components/todolist/listA.vue')
    },
  ]
})

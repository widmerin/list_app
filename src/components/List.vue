<template>
  <div class="list">
    <list-header :lists="lists" :categories="categories" :currentListId="currentListId" @selectedList="selectList" @refreshedData="refreshData" @selectedCategory="selectCategory"></list-header>
    <div class="list-content">
      <div class="list-content-tasks-active" v-if="this.tasks">
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <list-item v-for="(task, index) in tasksFilteredActive" :key="componentListItem + task.ref['@ref'].id" :task="task" :categories="categories" :index="index" @removedTask="removeTask" @finishedEdit="finishedEdit"></list-item>
        </transition-group>
      </div>
      <div class="list-content-tasks-completed" v-if="this.tasks && tasksFilteredCompleted && tasksFilteredCompleted.length">
        <p class="tasks-title">Completed Tasks
          <i v-if="showCompletedTasks" class="material-icons list-content-tasks-completed-icon" @click="showCompletedTasks=!showCompletedTasks">arrow_drop_up</i>
          <i v-else class="material-icons list-content-tasks-completed-icon" @click="showCompletedTasks=!showCompletedTasks">arrow_drop_down</i></p>
        <list-item v-if="showCompletedTasks" v-for="(task, index) in tasksFilteredCompleted" :key="componentListItem + task.ref['@ref'].id" :task="task" :categories="categories"  :index="index" @removedTask="removeTask" @finishedEdit="finishedEdit"></list-item >
      </div>
    </div>
    <list-footer @addedTask="addTask" :categories="categories"></list-footer>
  </div>

</template>

<script>
import ListItem from './ListItem.vue'
import ListHeader from './ListHeader.vue'
import ListFooter from './ListFooter.vue'
import draggable from 'vuedraggable'
import axios from 'axios';
import { deleteTask, getReferenceId, updateTask } from '@/helpers/utils';

export default {
  components: {
    ListItem,
    ListHeader,
    ListFooter,
    draggable
  },
  name: 'List',
  data() {
    return {
      debug: true,
      componentListItem: 0,
      newTask: '',
      idForTask: 4,
      currentCategory: 0,
      currentListId: 0,
      beforeEditCache: '',
      showCompletedTasks: true,
      lists: [],
      categories: [],
      tasks: [],
    }
  },
  mounted () {
    this.fetchData()
  },
  computed: {
    tasksFilteredActive:{
      get() {
        return this.filterTasksByCategory(this.filterTasksCurrentList(this.filterTasksActive(this.tasks)))
      },
    },
    tasksFilteredCompleted() {
        return this.filterTasksCurrentList(this.filterTasksCompleted(this.tasks))
    }
  },
  methods: {
    fetchData() {
      // Fetch data from faunaDB
      axios
      .get('/.netlify/functions/get-categories')
      .then(response => (this.categories = response.data))
      axios
        .get('/.netlify/functions/get-lists')
        .then(response => (this.lists = response.data))
      axios
        .get('/.netlify/functions/get-tasks')
        .then(response => (this.tasks = response.data))
    },
    filterTasksByCategory: function(tasks){
      if(this.currentCategory != 0) {
        return tasks.filter(task => task.data.category == this.currentCategory)
      }
      return tasks
    },
    filterTasksActive: function(tasks){
        return tasks.filter(task => !task.data.completed)
    },
    filterTasksCompleted: function(tasks){
        return tasks.filter(task => task.data.completed)
    },
    filterTasksCurrentList: function(tasks) {
      return tasks.filter(task => task.data.list == getReferenceId(this.lists[this.currentListId]))
    },
    forceRerender() {
      this.componentListItem += 1;
    },
    selectList(id) {
      if (this.currentListId != id) {
        this.currentListId = id
        this.forceRerender()
      }
    },
    selectCategory(id) {
      if (id > 0) {
        this.currentCategory = id
      }
      else {
        this.currentCategory = 0
      }
      this.forceRerender()
    },
    addTask(title, category) {
      const list = this.lists[this.currentListId].ref['@ref'].id
      axios.post(`/.netlify/functions/create-task`, {
          title: title,
          category: category,
          list: list,
          completed: false,
      })
      .then(response => {
        this.tasks.push(response.data)
      })
      .catch(function (error) {
          console.log(error);
      })
    },
    removeTask(id) {
      let index = this.tasks.map(item => item.ref['@ref'].id).indexOf(id)
      // Delete Task in DB
      deleteTask(id)
      this.tasks.splice(index, 1)
    },
    finishedEdit(data) {
      console.log(data.id)
      let index = this.tasks.map(item => item.ref['@ref'].id).indexOf(data.id)

      this.tasks[index].data.title = data.task.title
      this.tasks[index].data.completed = data.task.completed
      this.tasks[index].data.category = data.task.category

      // Update Task in DB
      updateTask(data.id, data.task)
    },
    refreshData(){
      this.fetchData()
      console.log("refresh data")
    }
  }
}
</script>

<style lang='scss'>
.list-content {
  padding: 0 15px 15px;
  .completed {
    text-decoration: line-through;
  }
  &-tasks-active,
  &-tasks-completed {
    padding-bottom: 50px;
    &-icon {
      float: right;
      margin-right: 0;
      cursor: pointer;
    }
  }
}

</style>

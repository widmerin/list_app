<template>
  <div class="list">
    <list-header :lists="lists" :categories="categories" :currentListId="currentListId" @addedList="addList" @removedList="removeList" @addedCategory="addCategory" @removedCategory="removeCategory" @logoutUser="logout" @selectedList="selectList" @refreshedData="refreshData" @selectedCategory="selectCategory"></list-header>
    <div class="list-content">
      <div class="list-content-tasks-active" v-if="this.tasks">
        <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
          <list-item v-for="(task, index) in tasksFilteredActive" :key="componentListItem + task.ref['@ref'].id" :task="task" :categories="categories" :index="index" @removedTask="removeTask" @finishedEdit="finishedEdit"></list-item>
        </transition-group>
      </div>
      <div class="list-content-tasks-completed" v-if="this.tasks && tasksFilteredCompleted && tasksFilteredCompleted.length">
        <p class="tasks-title">Completed Tasks
          <i v-if="showCompletedTasks" class="material-icons list-content-tasks-completed-icon" @click="showCompletedTasks=!showCompletedTasks">arrow_drop_down</i>
          <i v-else class="material-icons list-content-tasks-completed-icon" @click="showCompletedTasks=!showCompletedTasks">arrow_drop_up</i></p>
        <list-item v-if="showCompletedTasks" v-for="(task, index) in tasksFilteredCompleted" :key="componentListItem + task.ref['@ref'].id" :task="task" :categories="categories"  :index="index" @removedTask="removeTask" @finishedEdit="finishedEdit"></list-item >
      </div>
    </div>
    <list-footer @addedTask="addTask" :categories="categories" :suggestions="getSuggestions"></list-footer>
  </div>
</template>

<script>
import ListItem from './ListItem.vue'
import ListHeader from './ListHeader.vue'
import ListFooter from './ListFooter.vue'
import draggable from 'vuedraggable'
import axios from 'axios';
import { deleteCategory, deleteList, deleteTask, getReferenceId, updateTask } from '@/helpers/utils';

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
      loaded: false,
      componentListItem: 0,
      newTask: '',
      idForTask: 4,
      currentCategory: 0,
      currentListId: 0,
      beforeEditCache: '',
      showCompletedTasks: false,
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
    },
    getSuggestions() {
      let suggestions = []
      this.tasksFilteredCompleted.forEach(task => {
        if(!suggestions.includes(task.data.title)){
          suggestions.push(task.data.title)
        }
      })
      return suggestions
    },
  },
  created() {
    this.loaded = true
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
    addList(name) {
      axios.post(`/.netlify/functions/create-list`, {
          name: name,
      })
      .then(response => {
        this.lists.push(response.data)
      })
      .catch(function (error) {
          console.log(error);
      })
    },
    addCategory(name) {
      axios.post(`/.netlify/functions/create-category`, {
          name: name,
      })
      .then(response => {
        this.categories.push(response.data)
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
    removeList(id, index) {
      // delete all tasks from removed list
      let removeTasks = this.tasks.filter(task => task.data.list == getReferenceId(this.lists[index]))
      removeTasks.forEach(task => {
        console.log("delete" + task.ref['@ref'].id)
        deleteTask(task.ref['@ref'].id)
      });
      deleteList(id)
      this.lists.splice(index, 1)
    },
    removeCategory(id, index) {
      // remove category from all tasks
      deleteCategory(id)
      this.categories.splice(index, 1)
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
    },
    logout(){
      this.$emit('logout', 'logout')
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

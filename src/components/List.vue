<template>
  <div class="list">
    <list-header :lists="lists" :categories="categories" :currentListId="currentListId" @selectedList="selectList" @selectedCategory="selectCategory"></list-header>
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
import { getCategories, createCategory, getReferenceId } from '@/helpers/utils';



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
  computed: {
    tasksFilteredActive:{
      get() {
        return this.filterTasksCurrentList(this.filterTasksActive(this.tasks)) //this.filterTasksCurrentList(this.filterTasksActive((this.tasks)))
      },
    /*  set(tasks) {
        // add completed tasks to active list and save list.
        tasks = tasks.concat((this.tasks.filter(task => task.completed)))
        this.lists[this.currentListId].tasks = tasks
      }*/
    },
    tasksFilteredCompleted() {
        return this.filterTasksCurrentList(this.filterTasksCompleted(this.tasks))
    }
  },
  methods: {
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

     // this.forceRerender()
    },
    addTask(title, category) {
      // Todo: implement unique id
      this.idForTask = Date.now();

      axios('./.netlify/functions/create-task', {
        body: JSON.stringify({
          title: title,
          category: category,
          list: this.lists[this.currentListId],
          completed: false,
        }),
        method: 'POST'
      }).then(response => {
        console.log(response.json())
      })
   /*   this.lists[this.currentListId].tasks.push({
        id: this.idForTask,
        title: title,
        category: category,
        completed: false,
      })*/
    },

    addCategory() {
      // Todo data
      const myTodo = {
        name: 'My todo title'
      }

      // create it!
      createCategory(myTodo).then((response) => {
        console.log('API response', response)
        // set app state
      }).catch((error) => {
        console.log('API error', error)
      })
    },
    cancelEdit(task) {
      task.editing = false
      task.title = this.beforeEditCache
    },
    doneEdit(task) {
      if (task.title.trim() == '') {
        task.title = this.beforeEditCache
      }
      task.editing = false
    },
    removeTask(id) {
      let index = this.tasks.map(item => item.ref['@ref'].id).indexOf(id)

      // Delete Task
      axios.delete(`/.netlify/functions/delete-task/${id}`)
      .then(function (res) {
        console.log(res)
      })
      .catch(function (error) {
          console.log(error);
      })
     this.tasks.splice(index, 1)
    },
    finishedEdit(data) {
      let index = this.tasks.map(item => item.ref['@ref'].id).indexOf(data.id)

      // Update Task
      this.tasks[index].data.title = data.task.title
      this.tasks[index].data.completed = data.task.completed

      axios.put(`/.netlify/functions/update-task/${data.id}`, {
          title: data.task.title,
          completed: data.task.completed,
      })
      .catch(function (error) {
          console.log(error);
      })
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
    padding-bottom: 15px;
    &-icon {
      float: right;
      margin-right: 0;
      cursor: pointer;
    }
  }
}

</style>

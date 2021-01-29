<template>
  <div class="list">
    <list-header :lists="lists" :categories="categories" :currentListId="currentListId" @selectedList="selectList" @selectedCategory="selectCategory"></list-header>
    <div class="list-content">
      <div class="list-content-tasks-active">
        <draggable v-model="tasksFilteredActive" v-if="!currentCategory">
          <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <list-item v-for="(task, index) in tasksFilteredActive" :key="componentListItem + task.id" :task="task" :categories="categories" :index="index" @removedTask="removeTask" @finishedEdit="finishedEdit"></list-item>
          </transition-group>
        </draggable>
        <transition-group v-else name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <list-item v-for="(task, index) in tasksFilteredActive" :key="componentListItem + task.id" :task="task" :categories="categories" :index="index" @removedTask="removeTask" @finishedEdit="finishedEdit"></list-item>
          </transition-group>
      </div>
      <div class="list-content-tasks-completed" v-if="tasksFilteredCompleted && tasksFilteredCompleted.length">
        <p class="tasks-title">Completed Tasks
          <i v-if="showCompletedTasks" class="material-icons list-content-tasks-completed-icon" @click="showCompletedTasks=!showCompletedTasks">arrow_drop_up</i>
          <i v-else class="material-icons list-content-tasks-completed-icon" @click="showCompletedTasks=!showCompletedTasks">arrow_drop_down</i></p>
          <list-item v-if="showCompletedTasks" v-for="(task, index) in tasksFilteredCompleted" :key="componentListItem + task.id" :task="task" :categories="categories"  :index="index" @removedTask="removeTask" @finishedEdit="finishedEdit"></list-item >
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

export default {
  components: {
    ListItem,
    ListHeader,
    ListFooter,
    draggable,
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
      showCompletedTasks: false,
      lists: [
          {
            listId: '11',
            name: 'Einkaufen',
            tasks: [
              {
                'id': 1,
                'title': 'Zitrone',
                'completed': false,
                'editing': false,
                'category': 11
              },
              {
                'id': 2,
                'title': 'Tofu',
                'completed': false,
                'editing': false,
                'category': 12
              },
              {
                'id': 3,
                'title': 'Mehl',
                'completed': true,
                'editing': false,
                'category': 11
              },
                            {
                'id': 4,
                'title': 'Hafermilch',
                'completed': false,
                'editing': false,
                'category': 13
              },
                {
                'id': 5,
                'title': 'Kaffe',
                'completed': false,
                'editing': false,
                'category': 12
              }
            ],
          },
          {
            listId: '12',
            name: 'Wohnen',
            tasks: [
              {
                'id': 11,
                'title': 'Lampe',
                'completed': false,
                'editing': false,
                'category': 12
              },
              {
                'id': 12,
                'title': 'Vorhänge',
                'completed': false,
                'editing': false,
                'category': 13
              }
            ],
          },
          {
            listId: '13',
            name: 'Features',
            tasks: [
              {
                'id': 21,
                'title': 'Sortieren',
                'completed': false,
                'editing': false
              },
              {
                'id': 22,
                'title': 'Daten Speichern',
                'completed': false,
                'editing': false
            }
          ],
        }
      ],
      categories: [
        {
          'id': 11,
          'name': 'Bioladen',
        },
        {
          'id': 12,
          'name': 'Coop',
        },
        {
          'id': 13,
          'name': 'Migros',
        }
      ],
    }
  },
  computed: {
    tasksFilteredActive:{
      get() {
        return this.filterTasksActive(this.filterTasksByCategory(this.lists[this.currentListId].tasks))
      },
      set(tasks) {
        // add completed tasks to active list and save list.
        tasks = tasks.concat((this.lists[this.currentListId].tasks.filter(task => task.completed)))
        this.lists[this.currentListId].tasks = tasks
      }
    },
    tasksFilteredCompleted() {
        return this.filterTasksCompleted(this.lists[this.currentListId].tasks)
    }
  },
  methods: {
    filterTasksByCategory: function(tasks){
      if(this.currentCategory > 0) {
        return tasks.filter(task => task.category == this.currentCategory)
      }
        return tasks
    },
    filterTasksActive: function(tasks){
        return tasks.filter(task => !task.completed)
    },
    filterTasksCompleted: function(tasks){
        return tasks.filter(task => task.completed)
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
      this.lists[this.currentListId].tasks.push({
        id: this.idForTask,
        title: title,
        category: category,
        completed: false,
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
      let index = this.lists[this.currentListId].tasks.map(item => item.id).indexOf( id)
      this.lists[this.currentListId].tasks.splice(index, 1)
    },
    finishedEdit(data) {
      // find index of your todo item
      let index = this.lists[this.currentListId].tasks.map(item => item.id).indexOf(data.task.id)
      // update todo item data
      this.lists[this.currentListId].tasks.splice(index, 1, data.task)
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
    }
  }
}

</style>

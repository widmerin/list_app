<template>
  <div class="list">
    <list-header @addedTask="addTask" :lists="lists" :categories="categories" :currentListId="currentListId" @selectedList="selectList" @selectedCategory="selectCategory"></list-header>
    <div class="list-content">
      <div class="list-content-tasks-active">
        <draggable v-model="tasksFilteredActive">
          <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <list-item v-for="(task, index) in tasksFilteredActive" :key="componentListItem + task.id" :task="task" :categories="categories" :index="index" @removedTask="removeTask" @finishedEdit="finishedEdit"></list-item>
          </transition-group>
        </draggable>
      </div>
      <div class="list-content-tasks-completed" v-if="tasksFilteredCompleted && tasksFilteredCompleted.length">
        <p class="tasks-title">Completed Tasks</p>
        <list-item  v-for="(task, index) in tasksFilteredCompleted" :key="componentListItem + task.id" :task="task" :categories="categories" :index="index" @removedTask="removeTask" @finishedEdit="finishedEdit"></list-item >
      </div>
    </div>
        <div class="input-field list-header-action-add">
      <span class="list-header-action-add-icon">+</span>
      <input type="text" placeholder="Add to List ..." class="list-header-action-add-input" v-model="newTask" @keyup.enter="addTask"/>
    </div>
  </div>
</template>

<script>
import ListItem from '~/components/ListItem.vue'
import ListHeader from './ListHeader.vue'
import draggable from 'vuedraggable'

export default {
  components: {
    ListItem,
    ListHeader,
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
            name: 'Essensideen',
            tasks: [
              {
                'id': 21,
                'title': 'Curry',
                'completed': false,
                'editing': false,
                'category': 11
              },
              {
                'id': 22,
                'title': 'Pizza',
                'completed': false,
                'editing': false,
                'category': 13
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
    addTask(title) {
      // Todo: implement unique id
      this.idForTask = Date.now();
      this.lists[this.currentListId].tasks.push({
        id: this.idForTask,
        title: title,
        completed: false,
      })
      this.newTask = ''
      this.idForTask++
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
  }
}

</style>

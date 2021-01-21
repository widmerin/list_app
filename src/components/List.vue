<template>
  <div class="list">
    <list-header @addedTodo="addTodo" :lists="lists" @selectedList="selectList"></list-header>
    <div class="list-content">
      <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <list-item v-for="(todo, index) in tasksFilteredActive" :key="componentActiveTasks + todo.id" :todo="todo" :index="index" @removedTodo="removeTodo" @finishedEdit="finishedEdit"></list-item>
      </transition-group>
      <div class="tasks-completed" v-if="tasksFilteredCompleted && tasksFilteredCompleted.length">
        <p class="tasks-title">Completed Tasks</p>
        <list-item  v-for="(todo, index) in tasksFilteredCompleted" :key="componentActiveTasks + todo.id" :todo="todo" :index="index" @removedTodo="removeTodo" @finishedEdit="finishedEdit"></list-item >
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from '~/components/ListItem.vue'
import ListHeader from './ListHeader.vue'

export default {
  components: {
    ListItem,
    ListHeader
  },
  name: 'List',
  data() {
    return {
      componentActiveTasks: 0,
      componentCompletedTasks: 0,
      newTodo: '',
      idForTodo: 4,
      currentListId: '0',
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
              },
              {
                'id': 2,
                'title': 'Tofu',
                'completed': false,
                'editing': false,
              },
              {
                'id': 3,
                'title': 'Mehl',
                'completed': true,
                'editing': false,
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
              },
              {
                'id': 12,
                'title': 'Vorhänge',
                'completed': false,
                'editing': false,
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
              },
              {
                'id': 22,
                'title': 'Pizza',
                'completed': false,
                'editing': false,
            }
          ],
        }
      ]
    }
  },
  computed: {
    tasksFilteredActive() {
      return this.lists[this.currentListId].tasks.filter(todo => !todo.completed)
    },
    tasksFilteredCompleted() {
      return this.lists[this.currentListId].tasks.filter(todo => todo.completed)
    }
  },
  methods: {
    forceRerender() {
      this.componentActiveTasks += 1;
      this.componentCompletedTasks += 1;
    },
    selectList(id) {
      this.currentListId = id
      this.forceRerender()
    },
    addTodo(title) {
      this.lists[this.currentListId].tasks.push({
        id: this.idForTodo,
        title: title,
        completed: false,
      })
      this.newTodo = ''
      this.idForTodo++
    },
    cancelEdit(todo) {
      todo.editing = false
      todo.title = this.beforeEditCache
    },
    doneEdit(todo) {
      if (todo.title.trim() == '') {
        todo.title = this.beforeEditCache
      }
      todo.editing = false
    },
    removeTodo(id) {
      let index = this.lists[this.currentListId].tasks.map(item => item.id).indexOf( id)
      this.lists[this.currentListId].tasks.splice(index, 1)
    },
    finishedEdit(data) {
      // find index of your todo item
      let index = this.lists[this.currentListId].tasks.map(item => item.id).indexOf( data.todo.id)
      // update todo item data
      this.lists[this.currentListId].tasks.splice(index, 1, data.todo)
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
  .tasks-completed {
    padding-top: 20px;
    .tasks-title {
      color: #fff;
      text-transform: uppercase;
    }
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    &:hover {
      background: lightgreen;
    }
    &:focus {
      outline: none;
    }
  }
}


</style>

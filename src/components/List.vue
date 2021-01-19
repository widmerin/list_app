<template>
  <div class="list">
    <list-header @addedTodo="addTodo"></list-header>
    <div class="list-content">
      <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
        <list-item v-for="(todo, index) in todosFilteredActive" :key="todo.id" :todo="todo" :index="index" @removedTodo="removeTodo" @finishedEdit="finishedEdit"></list-item>
      </transition-group>
      <div class="todos-completed" v-if="todosFilteredCompleted && todosFilteredCompleted.length">
        <p class="todos-title">Completed Tasks</p>
        <list-item  v-for="(todo, index) in todosFilteredCompleted" :key="todo.id" :todo="todo" :index="index" @removedTodo="removeTodo" @finishedEdit="finishedEdit"></list-item >
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
      newTodo: '',
      idForTodo: 4,
      beforeEditCache: '',
      todos: [
        {
          'id': 1,
          'title': 'Task 1',
          'completed': false,
          'editing': false,
        },
        {
          'id': 2,
          'title': 'Task 2',
          'completed': false,
          'editing': false,
        },
        {
          'id': 3,
          'title': 'Task 3',
          'completed': true,
          'editing': false,
        }
      ],
    }
  },
  computed: {
    todosFilteredActive() {
      return this.todos.filter(todo => !todo.completed)
    },
    todosFilteredCompleted() {
      return this.todos.filter(todo => todo.completed)
    }
  },
  methods: {
    addTodo(title) {
      this.todos.push({
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
      let index = this.todos.map(item => item.id).indexOf( id)
      this.todos.splice(index, 1)
    },
    finishedEdit(data) {
      // find index of your todo item
      let index = this.todos.map(item => item.id).indexOf( data.todo.id)
      // update todo item data
      this.todos.splice(index, 1, data.todo)
    }
  }
}
</script>

<style lang='scss'>
.list-content {
  padding: 15px;
  .completed {
    text-decoration: line-through;
  }
  .todos-completed {
    padding-top: 20px;
    .todos-title {
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

<template>
  <div>
    <input type="text" class="todo-input" placeholder="What do you need?" v-model="newTodo" @keyup.enter="addTodo"/>
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <todo-item v-for="(todo, index) in todosFilteredActive" :key="todo.id" :todo="todo" :index="index" @removedTodo="removeTodo" @finishedEdit="finishedEdit"></todo-item>
    </transition-group>
    <div class="todos-completed" v-if="todosFilteredCompleted && todosFilteredCompleted.length">
      <p>Completed Tasks</p>
      <todo-item  v-for="(todo, index) in todosFilteredCompleted" :key="todo.id" :todo="todo" :index="index" @removedTodo="removeTodo" @finishedEdit="finishedEdit"></todo-item >
    </div>
  </div>
</template>

<script>
import TodoItem from '~/components/TodoItem.vue'

export default {
  components: {
    TodoItem
  },
  name: 'TodoList',
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
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
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
    removeTodo(index) {
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
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    &:focus {
      outline: 0;
    }
  }
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
  .todo-item-left { // later
    display: flex;
    align-items: center;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }
  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; //override defaults
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
    }
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
  .todos-completed {
    padding-top: 20px;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
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
  .active {
    background: lightgreen;
  }
  // CSS Transitions
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<template>
  <div class="list-item">
      <div class="list-item-label">
        <label>
          <input type="checkbox"  v-model="completed" @change="doneEdit" /><span></span>
        </label>
          <span v-if="!editing" @dblclick="editTodo" :class="{ completed : completed }">{{ title }}</span>
          <input v-else class="list-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
      </div>
      <div class="remove-item" @click="removeTodo">&times;</div>


  </div>
</template>

<script>
  export default {
    name: 'list-item',
    props: {
      todo: {
        type: Object,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      }
    },
    data() {
      return {
        'id': this.todo.id,
        'title': this.todo.title,
        'completed': this.todo.completed,
        'editing': this.todo.editing,
        'beforeEditCache': '',
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    methods: {
      cancelEdit() {
        this.editing = false
        this.title = this.beforeEditCache
      },
      doneEdit() {
        if (this.title.trim() == '') {
          this.title = this.beforeEditCache
        }
        this.editing = false
        this.$emit('finishedEdit', {
          'todo': {
            'id': this.id,
            'title': this.title,
            'completed': this.completed,
            'editing': this.editing,
          }
        })
      },
      editTodo() {
        this.beforeEditCache = this.title
        this.editing = true
      },
      removeTodo() {
        this.$emit('removedTodo', this.id)
      }
    }
  }
</script>

<style lang='scss'>
.list-item {
  display: flex;
  padding: 10px;
  border: 1px solid #9e9e9e;
  border-radius: 5px;
  margin: 2px 0;
  background-color: #fff;

  .list-item-label {
    width: 100%;
    display: flex;
    align-items: stretch;
  }

  .list-item-edit {
    height: 2em;
  }
  .remove-item {
    cursor: pointer;
    flex-direction: flex-end;
  }
}
</style>

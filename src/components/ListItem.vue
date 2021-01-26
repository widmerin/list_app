<template>
  <div class="list-item">
      <div class="list-item-label">
        <label>
          <input type="checkbox"  v-model="completed" @change="doneEdit"  @click=" element.fixed=! element.fixed" /><span></span>
        </label>
          <span v-if="!editing" @dblclick="editTask" :class="{ completed : completed }">{{ title }}</span>
          <input v-else class="list-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>
      </div>
      <div class="remove-item" @click="removeTask">&times;</div>


  </div>
</template>

<script>
  export default {
    name: 'list-item',
    props: {
      task: {
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
        'id': this.task.id,
        'title': this.task.title,
        'completed': this.task.completed,
        'editing': this.task.editing,
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
          'task': {
            'id': this.id,
            'title': this.title,
            'completed': this.completed,
            'editing': this.editing,
          }
        })
      },
      editTask() {
        this.beforeEditCache = this.title
        this.editing = true
      },
      removeTask() {
        this.$emit('removedTask', this.id)
      }
    }
  }
</script>

<style lang='scss'>
.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  border: 1px solid #9e9e9e;
  border-radius: 5px;
  margin: 2px 0;
  background-color: #fff;
  color: #48426d;

  .list-item-label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: stretch;
  }

  .list-item-edit {
    height: 2em;
  }
  .remove-item {
    cursor: pointer;
    flex-direction: flex-end;
  }

}
  .tasks-active {
    .list-item {
      .list-item-label {
        [type="checkbox"]+span:not(.lever):before{
          top:2px;
        }
      }
    }
  }
</style>

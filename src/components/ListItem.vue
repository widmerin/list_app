<template>
<!--v-if="filterCategory === 0 || filterCategory == category" -->
  <div class="list-item" >
      <div class="list-item-label">
        <label>
          <input type="checkbox"  v-model="completed" @change="doneEdit"  /><span></span>
        </label>
          <span v-if="!editing" @dblclick="editTask" :class="{ completed : completed }">{{ task.data.title }} </span>
          <input v-else class="list-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>

      </div>
      <div class="list-item-category" v-if="!completed">{{ getCategoryName(task.data.category)}}</div>
      <div class="list-item-remove" @click="removeTask">&times;</div>
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
      },
      categories: {
        type: Array
      }
    },
    data() {
      return {
        'id': this.task.ref['@ref'].id,
        'title': this.task.data.title,
        'completed': this.task.data.completed,
        'editing': this.task.data.editing,
        'category': this.task.data.category,
        'beforeEditCache': ''
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
            'title': this.title,
            'completed': this.completed,
            'editing': this.editing,
          },
          'id': this.id,
        })
      },
      editTask() {
        this.beforeEditCache = this.title
        this.editing = true
      },
      getCategoryName(id) {
      if (id != 0) {
        const categories = this.categories.filter(category => category.ref['@ref'].id == id)
        if(categories[0]) {
          return categories[0].data.name
        }
      }
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

  &-label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: stretch;
  }

  &-edit {
    height: 2em;
  }
  &-category {
    text-transform: uppercase;
    font-size: 12px;
    padding: 0 5px;
  }
  &-remove {
    cursor: pointer;
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

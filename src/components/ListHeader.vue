<template>
  <div>
  <nav class="nav-extended">
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab" v-for="(list, index)  in lists" :key="list"  v-bind:key="list.listId"><a href="#" class="active" @click="selectList(list.listId)">{{ list.name }} {{ list.listId }}</a></li>
      </ul>
    </div>
  </nav>
  <div class="input-field list-header-add">
    <i class="material-icons prefix">add</i>
    <input type="text" placeholder="Add to List ..." class="list-header-add-input" v-model="newTodo" @keyup.enter="addTodo"/>
  </div>

  </div>
  </template>

<script>
  export default {
    name: 'list-header',
    props: {
      lists: {
        type: Array,
        required: true,
      }
    },
    data() {
      return {
        newTodo: '',
      }
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim().length == 0) {
          return
        }
        this.$emit('addedTodo', this.newTodo)
        this.newTodo = ''
      },
      selectList(listId) {
        this.$emit('selectedList', listId)
      }
    }
  }
</script>
<style lang='scss'>
nav {
  background-color: #312c51;
  .brand-logo {
    img {
      max-width: 25px;
    }

  }
}
.list-header-add {
    background-color: #312c51;

  color: #fff;
  padding: 0 10px;
  margin: 15px;
  i {
    border: none;
  }
  .list-header-add-input {
    color: #fff;
    border: none !important;
  }
}


</style>

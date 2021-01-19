<template>
  <div>
  <nav class="nav-extended  grey darken-3">
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
          <li class="tab"><a href="#test1" class="active">Einkaufen</a></li>
          <li class="tab"><a href="#test2">Wohnen</a></li>
          <li class="tab"><a href="#test3">Essensideen</a></li>
      </ul>
    </div>
  </nav>
  <div class="input-field list-header-input">
    <i class="material-icons prefix">add</i>
    <input type="text" placeholder="Add to List ..." v-model="newTodo" @keyup.enter="addTodo"/>
  </div>

  </div>
  <!--<div class="list-header">
    <input type="text" class="list-header-input" placeholder="What do you need?" v-model="newTodo" @keyup.enter="addTodo"/>
  </div>-->
</template>

<script>
  export default {
    name: 'list-header',
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
      }
    }
  }
</script>
<style lang='scss'>
nav {
  .brand-logo {
    img {
      max-width: 25px;
    }

  }
}
.list-header-input {
  padding: 0 10px;
  .prefix {
    color: #424242;
  }
}


</style>

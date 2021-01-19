<template>
  <div>
  <nav class="nav-extended">
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
          <li class="tab"><a href="#test1" class="active">Einkaufen</a></li>
          <li class="tab"><a href="#test2">Wohnen</a></li>
          <li class="tab"><a href="#test3">Essensideen</a></li>
      </ul>
    </div>
  </nav>
  <div class="input-field list-header-add">
    <i class="material-icons prefix">add</i>
    <input type="text" placeholder="Add to List ..." class="list-header-add-input" v-model="newTodo" @keyup.enter="addTodo"/>
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

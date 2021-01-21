<template>
  <div>
  <nav class="nav-extended">
    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab" v-for="(list, index)  in lists" :key="index"><a href="#" class="active" @click="selectList(index)">{{ list.name }}</a></li>
      </ul>
    </div>
  </nav>
  <div class="input-field list-header-add">
    <i class="add-icon">+</i>
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
      selectList(id) {
        this.$emit('selectedList', id)
      },
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
    margin: 0;
    padding: 0;
  }
}


</style>

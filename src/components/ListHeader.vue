<template>
  <div class="list-header">
    <input type="text" class="list-header-input" placeholder="What do you need?" v-model="newTodo" @keyup.enter="addTodo"/>
  </div>
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
.list-header {
  display: flex;
  .list-header-input {
    width: 100%;
    padding: 10px 18px 10px 40px;
    font-size: 18px;
    margin-bottom: 16px;
    background: url(../assets/logo.svg) no-repeat scroll 10px 10px;

    background-size: 20px 20px;
    &:focus {
      outline: 0;
    }
  }

}
</style>

<template>
  <div id="app" class="container">
    <img src="../assets/logo.svg" class="logo">
    <todo-list></todo-list>
  </div>
</template>
<script>
import TodoList from '~/components/TodoList.vue'

export default {
    components: {
    TodoList
  },
  metaInfo: {
    title: 'Shopping App'
  }
}
</script>
<style lang='scss'>
* {
  box-sizing: border-box;
}
.container {
  max-width: 600px;
  margin: 0 auto;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
  padding: 20px;
}
.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>

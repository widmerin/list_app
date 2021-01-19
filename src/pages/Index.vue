<template>
  <div id="app" class="container">
    <list></list>
  </div>
</template>
<script>
import List from '~/components/List.vue'

export default {
    components: {
    List
  },
  metaInfo: {
    title: 'The List'
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
  margin-top: 60px;
  color: #424242;
  font-size: 18px;
  min-height: 350px;
}
</style>

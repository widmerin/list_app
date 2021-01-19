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

body {
  background: url('../assets/background3.jpg') no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #424242;
  font-size: 18px;
  min-height: 350px;
  width: 100%;
}
</style>

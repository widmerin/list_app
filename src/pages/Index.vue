<template>
  <div id="app" class="container">
    <div v-if="!currentUser" >
    <list></list>
      <p>
        <button @click="triggerNetlifyIdentityAction('logout')">Log Out</button>
      </p>
    </div>
    <div v-else>
      <p style="color:white">You are not logged in.</p>
      <p>
        <button @click="triggerNetlifyIdentityAction('login')">Log In</button>
      </p>
    </div>
  </div>
</template>
<script>

import List from '~/components/List.vue'
import { mapGetters, mapActions } from 'vuex';


export default {
  components: {
    List
  },
      mounted() {
        window.netlifyIdentity = require('netlify-identity-widget')
        netlifyIdentity.init({
      APIUrl: "https://jovial-mccarthy-2c45ae.netlify.app/.netlify/identity",
      logo: true // you can try false and see what happens
    })
      },
  metaInfo: {
    title: 'The List'
  },
   computed: {
    ...mapGetters("user", {

    }),
    username() {
      return this.user ? this.user.username : ", there!";
    }
  },
  data: () => ({
    currentUser: null,
  }),
  methods: {
    triggerNetlifyIdentityAction(action) {
      if (action == "login" || action == "signup") {
        netlifyIdentity.open(action);
        netlifyIdentity.on(action, user => {
          this.currentUser = {
            username: user.user_metadata.full_name,
            email: user.email,
            access_token: user.token.access_token,
            expires_at: user.token.expires_at,
            refresh_token: user.token.refresh_token,
            token_type: user.token.token_type
          };
          netlifyIdentity.close();
        });
      } else if (action == "logout") {
        this.currentUser = null;
        netlifyIdentity.logout();
      }
    }
  }
};
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
  background-color: #48426d;
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

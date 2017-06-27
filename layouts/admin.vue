<template lang="pug">
  div
    .login(v-if="!user")
      .login-inner
        .login-title Welcome to Doug Holt Admin
        input(type='text' placeholder="Email" v-model="email")
        input(type='password' placeholder="Password"  v-model="password")
        .button(@click="login")
          | Log in
    .inner(v-if="user")
      .header
        nuxt-link(to="/admin").link Home
        nuxt-link(to="/admin/about").link About
        nuxt-link(to="/admin/contacts").link Contacts
        nuxt
</template>

<script>
import { mapGetters } from 'vuex';
import { firebase } from '~/db';

export default {
  name: 'adminLayout',

  data() {
    return {
      email: null,
      password: null
    }
  },

  methods: {
    login: function () {
      const { email, password } = this

      firebase.auth().signInWithEmailAndPassword(email, password).then((user) => {
        this.$store.dispatch('login', { user })
      }).catch((error) => {
        const errorMessage = error.message
        alert(errorMessage)
      });
    }
  },

  computed: {
    ...mapGetters(['user'])
  }
}
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  .page-enter-active, .page-leave-active {
    transition: opacity .5s ease;
  }

  .page-enter-active {
    transition-delay: .5s;
  }

  .page-enter, .page-leave-active {
    opacity: 0;
  }

  #app {
    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
  }

</style>

<<style scoped lang="scss">
$primary-color: #EBC8B2;

  .login {
    width: 100%;
    height: 100vh;
    background: $primary-color;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .login-inner {
    width: 100%;
    max-width: 600px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .login-title {
    font-size: 30px;
    color: #FFFFFF;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
  }

  .header {
    background: $primary-color;
    padding: 10px 20px;
    
    a {
      color: #fff;
      text-decoration: none;
      margin-left: 10px;
      font-size: 20px;
      font-family: sans-serif;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }

  .button {
    padding: 10px 16px;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    color: #FFFFFF;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    cursor: pointer;

    transition: background .2s ease, color .2s ease;
    will-change: background, color;

    &:hover {
      background: #FFF;
      color: #000;
    }

    span {
      margin-right: 10px;
      font-size: 20px;
    }
  }

  input,
  textarea {
    width: 100%;
    margin-bottom: 20px;
    background: none;
    outline: none;

    padding: 10px 16px;
    border: 1px solid #FFFFFF;
    border-radius: 4px;
    color: #FFFFFF;

    transition: background .2s ease, color .2s ease;
    will-change: background, color;

    &:hover,
    &:focus {
      background: #FFF;
      color: #000;

      &::-webkit-input-placeholder {color: #A3A3A3;}
      &::-moz-placeholder {color: #A3A3A3;}
      &:-moz-placeholder {color: #A3A3A3;}
      &:-ms-input-placeholder {color: #A3A3A3;}
    }

    &::-webkit-input-placeholder {color: #FFFFFF;}
    &::-moz-placeholder {color: #FFFFFF;}
    &:-moz-placeholder {color: #FFFFFF;}
    &:-ms-input-placeholder {color: #FFFFFF;}
  }
</style>

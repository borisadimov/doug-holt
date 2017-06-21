<template lang="pug">
  .admin
    .container
      .portfolio(v-if="editingId === undefined && editingPostId === undefined")
        .portfolio-title
          span 📋
          | Portfolios list:
        .portfolio-list
          .portfolio-item(v-for="item in categories")
            a(:href="'/gallery/' + item.name" target="_blank") {{ item.name }}
            .portfolio-controls
              span.portfolio-edit(v-if="editingId !== item['.key']" @click="edit(item['.key'])")
                | ✏️
              span.portfolio-delete(@click="remove(item['.key'])")
                | ❌

          .buttons(v-if="editingId === undefined")
            .button.add(@click="add")
              span 🗒
              | Add new

      .portfolio(v-if="editingId === undefined && editingPostId === undefined")
        .portfolio-title
          span 📋
          | Posts list:

        .portfolio-list
          .portfolio-item(v-for="item in posts")
            a(:href="'/journal/' + item.name" target="_blank") {{ item.title }}
            .portfolio-controls
              span.portfolio-edit(v-if="editingId !== item['.key']" @click="editPost(item['.key'])")
                | ✏️
              span.portfolio-delete(@click="removePost(item['.key'])")
                | ❌

          .buttons(v-if="editingPostId === undefined")
            .button.add(@click="addPost")
              span 🗒
              | Add new

    .form(v-if="editingId !== undefined", :class="{'form-centered': isAllEmpties}")
      div
        .editing
          .editing-inner
            .editing-title(v-if="!editing")
              span 🗒
              | Create Portfolio
            .editing-title(v-if="editing")
              .editing-title__inner
                span ️️️️️✏️
                | Edit Project
              a.editing-title__open(v-if="portfolioItem.name !== ''" :href="'/gallery/' + portfolioItem.name")
                | open link
            .editing-field
              .editing-label Title
              input(type="text" placeholder="The Project Name" @input="inputChange" v-model="portfolioItem.name")
            .editing-field
              .editing-label Info
              input(type="text" placeholder="Any description" @input="inputChange" v-model="portfolioItem.info")
            .editing-field
              .editing-label Cover Image URL
              input(type="text" placeholder="http://path/to/image/url" v-model="portfolioItem.slides")
            .editing-field
              .editing-label Slides
              .editing-field__new-slide
                input(type="text" placeholder="Title" @input="inputChange" v-model="newSlide.title")
                input(type="text" placeholder="Image" @input="inputChange" v-model="newSlide.image")
                input(type="text" placeholder="Client" @input="inputChange" v-model="newSlide.client")
                .button.save(@click="addNewSlide(portfolioItem.items)")
                    span ✅
                    | Add new slide

            .buttons
              .button.save(@click="save")
                span ✅
                | Save
              .button.cancel(@click="cancel")
                span ❌
                | Cancel


    .form(v-if="editingPostId !== undefined", :class="{'form-centered': isAllEmpties}")
      div
        .editing
          .editing-inner
            .editing-title(v-if="!editing")
              span 🗒
              | Create Post
            .editing-title(v-if="editing")
              .editing-title__inner
                span ️️️️️✏️
                | Edit post
              a.editing-title__open(v-if="postItem.name !== ''" :href="'/journal/' + postItem.id")
                | open link
            .editing-field
              .editing-label Title
              input(type="text" placeholder="The Project Name" @input="inputChange" v-model="postItem.title")
            .editing-field
              .editing-label Text
              input(type="text" placeholder="Text" @input="inputChange" v-model="postItem.text")
            .editing-field
              .editing-label Post Image
              input(type="text" placeholder="http://path/to/image/url" v-model="postItem.image")
            .editing-field
              .editing-label Author
              input(type="text" placeholder="Author" v-model="postItem.author")
            .editing-field
              .editing-label Date
              input(type="text" placeholder="http://path/to/image/url" v-model="postItem.date")
            .editing-field
              .editing-label Post id
              input(type="text" placeholder="http://path/to/image/url" v-model="postItem.id")

            .buttons
              .button.save(@click="savePost")
                span ✅
                | Save
              .button.cancel(@click="cancel")
                span ❌
                | Cancel

    .buttons(v-if="editingId === undefined && editingPostId === undefined")
      .button.deploy(@click="deploy")
        span(v-if="isDeploying === false && deployFailed === false") 🚀
        span(v-if="isDeploying === true").deploying 🤙
        span(v-if="deployFailed === true") 👎
        | Deploy

    .login(v-if="false")
      .login-inner
        .login-title Welcome to Doug Holt Admin
        input(type='text' placeholder="Email" v-model="email")
        input(type='password' placeholder="Password"  v-model="password")
        .button(@click="login")
          | Log in
</template>

<!-- <style src="vue-multiselect/dist/vue-multiselect.min.css"></style> -->
<script>
import { db, firebase } from '~/db';
import { mapGetters } from 'vuex';
import VueMarkdown from 'vue-markdown';
//import Multiselect from 'vue-multiselect';

var Multiselect = process.BROWSER_BUILD ? Multiselect = require('vue-multiselect') : null

const $categories = db.ref('categories')
const $posts = db.ref('posts')
const $about = db.ref('about')

const emptyItem = {
  index: '',
  info: '',
  items: [],
  name: '',
  slides: []
}

const emptyPost = {
  author: '',
  date: '',
  id: '',
  image: '',
  text: '',
  title: ''
}

export default {
  name: 'Admin',
  layout: 'admin',
  head: {
    title: 'DougHolt | Admin'
  },

  components: {
    Multiselect,
    VueMarkdown
  },

  fetch ({ store }) {
    store.dispatch('setCategoriesRef', $categories)
    store.dispatch('setPostsRef', $posts)
  },

  data () {
    return {
      selectedTags: [],
      newItemText: '',
      editingId: undefined,
      editingPostId: undefined,
      portfolioItem: emptyItem,
      postItem: emptyPost,
      email: '',
      password: '',
      editing: false,
      hasFilledField: false,
      isDeploying: false,
      deployFailed: false,
      newSlide: {}
    }
  },

  computed: {
    ...mapGetters(['user', 'categories', 'posts']),

    isAllEmpties () {
      console.log('isAllEmpties', this.portfolioItem)
      return Object.keys(this.portfolioItem)
        .every(key => this.portfolioItem[key] === '')
    },

    lastProjectId () {
      return this.categories.slice(-1)[0] ? this.categories.slice(-1)[0].index : 0
    }
  },

  methods: {
    inputChange: function (event) {
      console.log(this, event)
      this.hasFilledField = event.target.value !== ''
    },

    customLabel ({ type }) {
      return `${type}`
    },

    addNewSlide(cat) {
      cat.push(this.newSlide);
      return this.newSlide = {};
    },

    updateSelected: function (newSelected) {
      this.selected = newSelected
    },

    addTag: function (newTag) {
      this.options.push(newTag)
      this.selected.push(newTag)
    },

    edit: function (key) {
      console.log('edit', key)
      this.editing = true
      this.editingId = key
      $categories.child(key).once('value')
        .then(d => { this.portfolioItem = d.val() })
    },

    editPost: function(key) {
      this.editing = true
      this.editingPostId = key
      $posts.child(key).once('value')
        .then(d => { this.postItem = d.val() })
    },

    savePost: function() {
      if (this.editingPostId !== 'defined') {
        $posts.child(this.editingPostId).set(this.postItem)
      } else {
        $posts.push(this.postItem)
      }

      this.editing = false
      this.editingPostId = undefined
      this.postItem = emptyItem
    },

    save: function () {
      if (this.editingId !== 'defined') {
        let res = this.selectedTags.reduce(function (obj, item) {
          console.log(obj, item)
          obj[item.type] = true
          return obj
        }, {})
        this.portfolioItem.tags = res
        $categories.child(this.editingId).set(this.portfolioItem)
      } else {
        let res = this.selectedTags.reduce(function (obj, item) {
          obj[item.type] = true
          return obj
        }, {})
        this.portfolioItem.tags = res
        this.portfolioItem.index = this.lastProjectId + 1
        $categories.push(this.portfolioItem)
      }

      this.editing = false
      this.editingId = undefined
      this.portfolioItem = emptyItem
    },

    cancel: function () {
      this.editing = false
      this.editingId = undefined
      this.editingPostId = undefined
      this.portfolioItem = emptyItem
      this.postItem = emptyPost
    },

    add: function () {
      this.editingId = 'defined'
      this.portfolioItem = emptyItem
    },

    addPost: function () {
      this.editingPostId = 'defined'
      this.postItem = emptyPost
    },

    remove: function (key) {
      $categories.child(key).remove()
    },

    removePost: function (key) {
      $posts.child(key).remove()
    },

    deploy: function () {
      this.deployFailed = false
      this.isDeploying = true

      fetch('https://api.netlify.com/build_hooks/5942ceca8ebdd929d962e243', {
        method: 'POST'
      })
        .then(setTimeout(() => {
          this.isDeploying = false
        }, 10000))
        .catch(() => {
          this.isDeploying = false
          this.deployFailed = true

          setTimeout(() => {
            this.deployFailed = false
          }, 1000)
        })
    },

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

  created () {
    console.log(this.posts)
    if (process.BROWSER_BUILD) {
      setTimeout(() => {
        this.$store.dispatch('setCategoriesRef', $categories)
      }, 10)
    } else {
      this.$store.dispatch('setPortfolioRef', $categories)
    }
  }

}
</script>

<style scoped lang="scss">
$primary-color: #EBC8B2;
  * {
    box-sizing: border-box;
  }

  .login {
    width: 100%;
    height: 100vh;

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

  .admin {
    padding: 0 50px;
    height: calc(100vh - 43px);
    background: $primary-color;
    width: 100%;

    font-family: 'Source Sans Pro', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .portfolio {
    padding: 50px 0;

    &:not(:first-child) {
      margin-left: 50px;
    }
  }

  .portfolio-title {
    font-size: 30px;
    color: #FFFFFF;
    font-weight: 600;
    margin-bottom: 20px;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    span {
      margin-right: 10px;
      font-size: 20px;
    }
  }

  .portfolio-item {
    margin-bottom: 20px;
    font-size: 26px;
    color: #FFFFFF;

    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    a {
      color: #FFFFFF;
      text-decoration: none;
    }
  }

  .portfolio-controls {
    margin-left: 20px;

    span {
      cursor: pointer;
      font-size: 20px;
    }

    .portfolio-edit {
      margin-right: 10px;
    }
  }

  .form {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: center;

    &-centered .editing {
      transform: translateX(102%);
    }
  }

  .editing {
    position: fixed;
    left: 50px;
    top: 0px;

    height: 100vh;
    width: 30%;
    display: flex;
    flex-flow: column nowrap;

    transition: transform .9s ease;
    will-change: transform;

    .save {
      margin-right: 15px;
    }

    .save, .cancel {
      cursor: pointer;
    }
  }

  .editing-title {
    font-size: 30px;
    color: #FFFFFF;
    font-weight: 600;
    margin-bottom: 20px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;

    span {
      margin-right: 10px;
      font-size: 20px;
    }
  }

  .editing-title__inner {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
  }

  .editing-title__open {
    font-size: 14px;
    color: #FFFFFF;
    font-weight: normal;
    text-decoration: none;
  }

  .editing-inner {
    padding: 50px 0;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;

    padding-right: 28px; /*This would hide the scroll bar of the right. To be sure we hide the scrollbar on every browser, increase this value*/

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .editing-label {
    margin-bottom: 8px;
    font-size: 14px;
    font-weight: 600;
    color: #FFFFFF;
  }

  .buttons {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
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

  .add {
    margin-right: 15px;
    cursor: pointer;
  }

  .deploy {
    cursor: pointer;
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

  textarea {
    min-height: 200px;
    resize: vertical;
    overflow-y: scroll
  }

  .textarea-small {
    min-height: 150px;
  }

  @keyframes deploy {
    0%, 100% {
      transform: rotate(0deg);
    }

    50% {
      transform: rotate(10deg);
    }
  }

  .deploying {
    animation: deploy .3s ease infinite;
  }

  @media (max-width: 768px) {
    .admin {
      padding: 0 30px 50px;
    }

    .form {
      display: block;
    }

    .form-centered .editing {
      transform: translateX(0);
      left: 0;
    }

    .editing {
      position: initial;
      height: initial;
      width: 100%;
    }

    .editing-inner {
      width: 100%;
      padding: 50px 0;
    }

    .mark {
      width: 100%;
      margin: 0;
    }
  }
</style>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter-active {
    transition-delay: .35s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }

  .mark {
    margin: 50px 0;
    background: #FFFFFF;
    margin-left: 40%;
    flex: 1;
    padding: 16px;
    border: 1px solid #f1f1f1;

   .video-wrapper {
      max-width: 100%;
      margin-bottom: 50px;
    }

    .video-container {
      position: relative;
      padding-bottom: 56.25%;
      padding-top: 30px;
      height: 0;
      overflow: hidden;
    }

    .video-container iframe,
    .video-container object,
    .video-container embed {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    p {
      font-size: 12px;
      color: rgba(0,0,0,0.70);
      letter-spacing: 0;
      line-height: 18px;

      margin: 0 auto;
      margin-bottom: 50px;
      max-width: 600px;
    }

    img {
      width: 100%;
      margin-bottom: 50px;
    }

    h1, h2, h3, h4, h5 {
      font-weight: bold;
      font-size: 18px;
      color: rgba(0,0,0,0.70);
      letter-spacing: 2.2px;

      margin: 0 auto;
      margin-bottom: 11px;
      max-width: 600px;
    }
  }

  .mark__title {
    margin-top: 5px;

    text-align: center;
    font-size: 26px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .mark__subtitle {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    color: rgba(0,0,0,0.40);
    letter-spacing: 0;
    line-height: 18px;

    margin-bottom: 50px;
  }

  .mark-info {
    margin: 0 auto;
    margin-top: 50px;
    max-width: 600px;
  }

  .mark-row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .mark-item__label {
    margin-bottom: 11px;
    font-weight: bold;
    font-size: 18px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .mark-item__value {
    font-size: 12px;
    color: rgba(0,0,0,0.70);
    letter-spacing: 0;
    line-height: 18px;
    text-decoration: none;

    .mark-item__value--bold {
      margin-right: 4px;
      font-weight: bold;
    }
  }

  .mark-item {
    margin-bottom: 50px;
  }

  .project-phones {
    max-width: 760px;
    margin: 0 auto;
    margin-bottom: 100px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }

  .project-phones__item {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-end;
  }

  .project-phones__text {
    padding-right: 65px;
    padding-left: 65px;
    margin-top: 80px;
    margin-bottom: 80px;

    font-size: 34px;
    color: rgba(0,0,0,0.70);
  }

  .project-phone {
    width: 288px;
    height: 577.6px;
    overflow: hidden;

    position: relative;
  }

  .project-phone__image {
    width: 282px;
    height: 463px;
    overflow: hidden;
    overflow-y: scroll;

    position: absolute;
    top: 53px;
    left: 19px;

    padding-right: 28px; /*This would hide the scroll bar of the right. To be sure we hide the scrollbar on every browser, increase this value*/

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .project-phone__image img {
    display: block;
    margin-bottom: 0;
  }

  .mark-item__slides-inner {
    display: flex;
    flex-flow: row wrap;
  }

  .mark-item__slide {
    width: 50%;
    padding: 10px;

    &:nth-child(odd) {
      padding-left: 0;
    }

    &:nth-child(even) {
      padding-right: 0;
    }
  }

  .mark-item__image {
    img {
      width: 100%;
      display: block;
    }
  }

  .container {
    display: flex;
    flex-flow: row nowrap;
  }

  @media (max-width: 768px) {
    .project-phones {
      display: none;
    }
  }
</style>

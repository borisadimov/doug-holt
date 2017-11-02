<template lang="pug">
  .admin
    .container
      .form
        .editing
          .editing-inner
            .editing-title
              span 🗒
              | Edit about page
            .editing-field
              .editing-label
                | Edit image

                .button.image-content-btn(@click="handleContentModalClick" v-if="!about.image")
                  span 🏞
                  | add image

                .image-preview(v-if="about.image")
                  span.button.image-content-btn(@click="handleContentModalClick") Change Image 🏞
                  img(:src="about.image")


            .editing-field(v-if="about.text_block1")
              .editing-label
                | Edit texts
              textarea(v-model="about.text_block1.text1")
              textarea(v-model="about.text_block2.text1")


            .editing-field
              .editing-label
                | Edit clients

              .editing-clients
                span.client-block(v-for="(client, index) in clients")
                  span.client
                    | {{ client }}
                    span.remove(@click="removeClient(index)")
                      span ❌

                input.add-client(v-model="newClients" placeholder="New client")
                button.button(@click="addClient") Add new client


            .buttons
              .button.save(@click="save")
                span ✅
                | Save

    transition(name='modal' v-if="showModal" @close="showModal = false")
      .modal-mask
        .modal-wrapper
          .modal-container
            .images(@click="showModal = false")
              admin-image-card( v-for="(image, index) in images"
                                v-bind:key="index"
                                v-bind:image="image"
                                v-on:on-remove-click="remove"
                                v-on:on-card-click="addImageToAbout")
            image-uploader
            .button.modal-default-button(@click="showModal = false")
              | Close

</template>

<!--<style src="vue-multiselect/dist/vue-multiselect.min.css">

</style>-->
<script>
  import {
    db,
    firebase
  } from '~/db';
  import {
    mapGetters
  } from 'vuex';
  import VueMarkdown from 'vue-markdown';

  import ImageUploader from '~/components/ImageUploader'
  import AdminImageCard from '~/components/AdminImageCard'

  var Multiselect = process.browser ? Multiselect = require('vue-multiselect') : null

  const $about = db.ref('about')

  export default {
    name: 'AdminAbout',
    layout: 'admin',
    head: {
      title: 'DougHolt | Admin'
    },

    components: {
      Multiselect,
      VueMarkdown,
      ImageUploader,
      AdminImageCard
    },

    // fetch ({ store }) {
    //   return store.dispatch('setAboutRef', $about)
    // },

    data() {
      return {
        email: '',
        password: '',
        editing: false,
        hasFilledField: false,
        isDeploying: false,
        deployFailed: false,
        newClients: [],
        showModal: false
        // about: null
      }
    },

    computed: {
      ...mapGetters(['images']),

      clients() {
        return this.about.clients;
      },

      about() {
        return this.$store.getters.about
      }

    },

    methods: {
      inputChange: function(event) {
        this.hasFilledField = event.target.value !== ''
      },

      addClient() {
        this.clients.push(this.newClients);
      },

      addImageToAbout: function (params) {
        this.about.image = params.url
      },

      handleContentModalClick: function (e) {
        e.preventDefault()
        e.stopPropagation()
        this.showModal = !this.showModal
        console.log(this.about.image)
      },

      removeClient(index) {
        if (this.clients.length > 1) {
          this.clients.splice(index, 1);
          $about.child('clients').set([...this.clients]);
        }
        else {
          alert('Could not be empty')
        }
      },

      remove: function (image) {
        const storageRef = firebase.storage().ref(image['name'])

        storageRef.delete().then(function () {
          $images.child(image['.key']).remove()
        }).catch(function (error) {
          console.log(error)
        })
      },

      save: function () {
        $about.child('text_block1').set(this.about.text_block1);
        $about.child('text_block2').set(this.about.text_block2);
        $about.child('text_block3').set(this.about.text_block3);
        $about.child('text_block4').set(this.about.text_block4);
        $about.child('image').set(this.about.image)
        $about.child('clients').set(this.clients);
      }
    },

    created() {
      this.$store.dispatch('setAboutRef', $about);
      // this.about = this.$store.getters.about;
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
    width: 100%;
    &-centered .editing {
      transform: translateX(102%);
    }
  }

  .editing {
    height: 100vh;
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-flow: column nowrap;
    transition: transform .9s ease;
    will-change: transform;
    .save {
      margin-right: 15px;
    }
    .save,
    .cancel {
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
    overflow-y: auto;
    padding-right: 28px;
    /*This would hide the scroll bar of the right. To be sure we hide the scrollbar on every browser, increase this value*/
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
    margin-top: 50px;
  }

  .image-preview {
    margin-top: 20px;
    margin-bottom: 20px;

    img {
      display: block;
      width: 100%;
    }

    span {
      display: inline-block;
      margin-bottom: 20px;
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

  .add-client {
    margin-top: 20px;
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
      &::-webkit-input-placeholder {
        color: #A3A3A3;
      }
      &::-moz-placeholder {
        color: #A3A3A3;
      }
      &:-moz-placeholder {
        color: #A3A3A3;
      }
      &:-ms-input-placeholder {
        color: #A3A3A3;
      }
    }
    &::-webkit-input-placeholder {
      color: #FFFFFF;
    }
    &::-moz-placeholder {
      color: #FFFFFF;
    }
    &:-moz-placeholder {
      color: #FFFFFF;
    }
    &:-ms-input-placeholder {
      color: #FFFFFF;
    }
  }
  button {
    background: none;
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
    0%,
    100% {
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .3s
  }

  .fade-enter-active {
    transition-delay: .35s;
  }

  .fade-enter,
  .fade-leave-to
  /* .fade-leave-active in <2.1.8 */

  {
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
      color: rgba(0, 0, 0, 0.70);
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
    h1,
    h2,
    h3,
    h4,
    h5 {
      font-weight: bold;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.70);
      letter-spacing: 2.2px;
      margin: 0 auto;
      margin-bottom: 11px;
      max-width: 600px;
    }
  }

  .client-block {
  }

  .client {
    margin-right: 10px;
    display: inline-block;
  }

  .mark__title {
    margin-top: 5px;
    text-align: center;
    font-size: 26px;
    color: rgba(0, 0, 0, 0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .mark__subtitle {
    margin-top: 10px;
    text-align: center;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.40);
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
    color: rgba(0, 0, 0, 0.70);
    letter-spacing: 2.2px;
    text-transform: uppercase;
  }

  .mark-item__value {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.70);
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
    color: rgba(0, 0, 0, 0.70);
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
    padding-right: 28px;
    /*This would hide the scroll bar of the right. To be sure we hide the scrollbar on every browser, increase this value*/
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

  .editing-clients {
    .remove {
      cursor: pointer;
    }
  }

   // modal
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #EBC8B2;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;

    .images {
      display: flex;
      flex-wrap: wrap;
      max-height: 600px;
      overflow: scroll;
    }

    .button {
      display: block;
      flex: 1 1 100%;
      text-align: center;
      margin: 10px 40%;
    }

    form {
      display: flex;
      flex-direction: column;
      label {
        color: #fff;
        text-transform: capitalize;
        padding: 10px 0;
      }
    }
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    .project-phones {
      display: none;
    }
  }
</style>

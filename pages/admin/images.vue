<template lang="pug">
  .admin
    nuxt-link(:to="'/admin/'").back-link
      span ⬅️
      | back to projects list
    .images
      admin-image-card(v-for="(image, index) in images" v-bind:key="index" v-bind:image="image" v-on:on-remove-click="remove")

    image-uploader
</template>

<script>
import { db, firebase } from '~/db'
import { mapGetters } from 'vuex'
const $images = db.ref('images')
// components
import ImageUploader from '~/components/ImageUploader'
import AdminImageCard from '~/components/AdminImageCard'

export default {
  layout: 'admin',

  components: {
    ImageUploader,
    AdminImageCard
  },

  fetch({store}) {
    return store.dispatch('setImagesRef', $images)
  },

  methods: {
    remove: function (image) {
      const storageRef = firebase.storage().ref(image['name'])

      storageRef.delete().then(function () {
        $images.child(image['.key']).remove()
      }).catch(function (error) {
        console.log(error)
      })
    }
  },

  mounted() {
  },

  computed: {
    ...mapGetters(['images'])
  }
}
</script>

<style scoped lang="scss">
$primary-color: #EBC8B2;
.admin {
  padding: 0 50px;
  padding-bottom: 50px;
  min-height: 100vh;
  background: $primary-color;
  width: 100%;
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}
.images {
  display: flex;
  flex-wrap: wrap;
}

.back-link {
  color: #fff;
  padding: 20px;
  padding-left: 0;
  display: block;
  span  {
    padding-right: 10px;
  }
}

</style>


<template lang="pug">
  form(action="")
    label upload
    input(type="file"
          id='adminImg'
          v-on:change="uploadImage"
          accept="image/*"
          name='image'
          ref='image')
</template>

<script>
import { db, firebase } from '~/db'
const $images = db.ref('images')

export default {
  data () {
    return {
      file: ''
    }
  },

  methods: {
    uploadImage: function (e) {
      const file = this.$refs.image.files[0]
      const timestamp = new Date().getTime().toString()
      const uploadName = file.name + '_' + timestamp
      const storageRef = firebase.storage().ref(uploadName)

      storageRef.put(file).then(function (snapshot) {
        $images.push({
          'url': snapshot.metadata.downloadURLs[0],
          'name': uploadName,
          'created_at': snapshot.metadata.updated
        })
      })
    }
  }
}
</script>


<style lang="scss">

</style>

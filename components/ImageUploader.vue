<template lang="pug">
  form(action="")
    label upload
    input(type="file"
          id='adminImg'
          v-on:change="uploadImage"
          accept="image/*"
          name='image'
          ref='image')

    .progress.hidden(ref="progress")
      .deploying 🤙
</template>

<script>
import { db, firebase } from '~/db'
const $images = db.ref('images')

export default {
  data () {
    return {
      file: '',
      loading: false
    }
  },

  methods: {
    uploadImage: function (e) {
      const file = this.$refs.image.files[0]
      const timestamp = new Date().getTime().toString()
      const uploadName = file.name + '_' + timestamp
      const storageRef = firebase.storage().ref(uploadName).put(file)

      storageRef.then(function (snapshot) {
        $images.push({
          'url': snapshot.metadata.downloadURLs[0],
          'name': uploadName,
          'created_at': snapshot.metadata.updated
        })
      })

      storageRef.on('state_changed', (snapshot) => {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress === 100) {
          this.$refs.progress.classList.add('hidden')
        }
        else {
          this.$refs.progress.classList.remove('hidden')
        }
      })
    }
  }
}
</script>


<style scoped lang="scss">
  .progress {
    display: inline-block;
  }

  .hidden {
    display: none;
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
    margin-left: 20px;
  }
</style>

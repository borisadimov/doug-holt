<template lang="pug">
  form(action="")
    img#preview
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
import { db, firebase } from "~/db";
import ImageTools from "~/utils/scrollhandler";
const $images = db.ref("images");

export default {
  data() {
    return {
      file: "",
      loading: false
    };
  },

  methods: {
    uploadImage: function(e) {
      const file = this.$refs.image.files[0];
      const timestamp = new Date().getTime().toString();
      const uploadName = file.name + "_" + timestamp;
      const reader = new FileReader();
      reader.onloadend = () => {
        let tempImg = new Image();
        tempImg.src = reader.result;
        tempImg.onload = function() {
          const MAX_WIDTH = 400;
          const MAX_HEIGHT = 300;
          let tempW = tempImg.width;
          let tempH = tempImg.height;
          if (tempW > tempH) {
            if (tempW > MAX_WIDTH) {
              tempH *= MAX_WIDTH / tempW;
              tempW = MAX_WIDTH;
            }
          } else {
            if (tempH > MAX_HEIGHT) {
              tempW *= MAX_HEIGHT / tempH;
              tempH = MAX_HEIGHT;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = tempW;
          canvas.height = tempH;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(this, 0, 0, tempW, tempH);
          const dataURL = canvas.toDataURL("image/jpeg");
          fetch(dataURL)
            .then(res => res.blob())
            .then(blob =>
              firebase
                .storage()
                .ref(uploadName + "_thumb")
                .put(blob)
            );
        };
      };
      reader.readAsDataURL(file);
      const storageRef = firebase
        .storage()
        .ref(uploadName)
        .put(file);
      storageRef.then(function(snapshot) {
        $images.push({
          url: snapshot.metadata.downloadURLs[0],
          thumb_url: snapshot.metadata.downloadURLs[0],
          name: uploadName,
          created_at: snapshot.metadata.updated
        });
      });

      storageRef.on("state_changed", snapshot => {
        let progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
        if (progress === 100) {
          this.$refs.progress.classList.add("hidden");
        } else {
          this.$refs.progress.classList.remove("hidden");
        }
      });
    }
  }
};
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

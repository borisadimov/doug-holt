<template lang="pug">
  .about
    .about-title
      | About

    .about-item
      .about-image
        img(:src="about.image" v-on:load="onImgLoaded")
      .about-copy
        | THE STUDIO
        .about-largeText.about-margin-1vw
          | {{ about.text_block1.text1 }}
        .about-text.about-margin-5vw
          | {{ about.text_block1.text2 }}

    .about-item
      .about-copy
        .about-text
          | {{ about.text_block2.text1 }}

    .about-item
      .about-copy
        .about-text
          | {{ about.text_block3.text1 }}
        .about-largeText.about-margin-5vw
          | {{ about.text_block3.text2 }}

    .about-item
      .about-copy
        .about-largeText
          | {{ about.text_block4.text1 }}
        .about-text.about-margin-5vw
          | {{ about.text_block4.text2 }}

    .clients
      .clients-column
        .clients-item
          .clients-letter
            | SELECTED CLIENTS
      .clients-column
        .clients-item(v-for="(client, key) in clients")
          .clients-letter
            | {{ key }}
          span(v-for="item in client")
            | {{ item }}
</template>

<script type="text/babel">
  import { mapMutations, mapGetters } from 'vuex';
  import { db } from '~/db';

  const $about = db.ref('about')
  //images on page
  const IMG_CNT = 1;

  export default {
    name: "AboutComponent",
    layout: 'home',

    fetch ({ store }) {
      store.dispatch('setAboutRef', $about)
    },

    data () {
      return {
        imgLoaded: 0
      }
    },

    mounted() {
      console.log(this.clients)
    },

    methods: {
      onImgLoaded () {
        this.imgLoaded++;
        if (this.imgLoaded == IMG_CNT)
          this.onLoad(100);
        else
          this.onLoad(this.imgLoaded * 100 / IMG_CNT);
      },

      ...mapMutations([
        'onLoad'
      ])
    },

    computed: {
      ...mapGetters(['about']),

      clients() { 
        return this.about.clients.reduce((res, curr) => {
          const firstLetter = curr[0].toLowerCase();
          if (!res.hasOwnProperty(firstLetter)) {
            res[firstLetter] = [];
          }
          res[firstLetter].push(curr)
          return res;
        }, {})
      }
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .about {
    width: 100%;
    height: 100%;
    background: white;

    overflow-y: scroll;

    padding: 0 10% 11vw;

    &-title {
      margin-top: 14vw;

      font-size: 2.2vw;
      color: rgba(0,0,0,0.87);
      letter-spacing: 2px;
      line-height: 3vw;

      text-align: center;
    }

    &-item {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      margin-top: 11vw;

      font-family: 'Marvel', sans-serif;
      font-weight: bold;
      font-size: 1.25vw;
      color: rgba(0,0,0,0.87);
      letter-spacing: 1.55px;
      line-height: 1.35vw;

      &:first-child {
        margin-top: 165px;
      }

      img {
        width: 100%;
      }
    }

    &-item-image {
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-end;

      margin-top: 140px;

      padding-left: 24%;

      img {
        width: 100%;
      }
    }

    &-image,
    &-copy {
      flex: 0 0 40%;
    }

    &-largeText {
      font-family: 'Work Sans', sans-serif;
      font-weight: 400;
      font-size: 2vw;
      line-height: 2.5vw;
      color: rgba(0,0,0,0.87);
      letter-spacing: 2px;
    }

    &-text {
      font-family: 'Work Sans', sans-serif;
      font-weight: 400;
      font-size: 1.55vw;
      color: rgba(0,0,0,0.87);
      letter-spacing: 1px;
      line-height: 2vw;
    }

    &-margin-1vw {
      margin-top: 1vw;
    }

    &-margin-5vw {
      margin-top: 5vw;
    }
  }

  .clients {
    margin-top: 165px;
    border-top: 1px solid rgba(0,0,0,0.24);

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;

    &-column {
      flex: 1;

      &:first-child {
        flex: 0 0 25%;
      }
    }

    &-item {
      margin-top: 1vw;

      display: flex;
      flex-flow: column nowrap;
    }

    &-letter {
      font-family: 'Marvel', sans-serif;
      font-weight: bold;
      font-size: 1.1vw;
      line-height: 1.25vw;
      color: rgba(0,0,0,0.87);
      text-transform: uppercase;
      letter-spacing: 1.55px;

      margin-bottom: 1vw;
    }

    span {
      font-size: 0.9vw;
      color: rgba(0,0,0,0.54);
      letter-spacing: 0;
      line-height: 1.45vw;
    }

  }
</style>

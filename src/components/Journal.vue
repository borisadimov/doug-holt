<template lang="pug">
  transition(appear)
    .about
      .about-title
        | Journal

      .about-item
        .about-image
          img(src="~assets/images/about-studio-1.jpg")
        .about-copy
          | THE STUDIO
          .about-largeText.about-margin-1vw
            | There are a lot of still life, product and fashion photography studios in New York City.
          .about-text.about-margin-5vw
            | The distinction enjoyed by Doug Holt’s Commercial Photography Studio lies in the fact that the Studio demands energy and collaboration. More than just a product photography studio, art direction, styling and retouching can be done in-house (by arrangement).

      .about-item-image
        img(src="~assets/images/about-studio-2.jpg")

      .about-item
        .about-copy
          .about-text
            | You’ll notice, no one spends much time on my comfortable couches. Everyone is standing close to the Set, looking at the shot being taken, discussing what is appearing on the digital monitors; focusing together to capture one excellent image, after another, after another.
        .about-image
          img(src="~assets/images/about-studio-3.jpg")

      .about-item-image
        img(src="~assets/images/about-studio-4.jpg")

      .about-item
        .about-image
          img(src="~assets/images/about-studio-5.jpg")
        .about-copy
          .about-text
            | The studio collaborates with graphics designers, web engineers and social media experts, stylists, models, agenices as well as advertising and marketing professionals. We produce in-studio and on-location photo shoots as well as commercials and documentaries.
          .about-largeText.about-margin-5vw
            | And in the end, we just have FUN!

      .about-item-image
        img(src="~assets/images/about-studio-6.jpg")


      .about-item
        .about-copy
          .about-largeText
            | Doug Holt has 15 years experience as a professional photographer.
          .about-text.about-margin-5vw
            | Coming to the calling after several years as a risk analyst on Wall St. His career’s arc fuses good business sense with a talent for enhancing luxury brands and is apparent in the long client list of Doug Holt Photography.
        .about-image
          img(src="~assets/images/about-studio-7.jpg")

      router-link.about-item-image(to="/journal/item8")
        img(src="~assets/images/about-studio-8.jpg")
</template>

<script>
  import {onLoad} from 'ducks/nav';
  import {store} from 'index';
  import {posts} from 'store/fixtures';
  
  
  export default {
    name: "JournalComponent",
  
    mounted () {
      store.dispatch(onLoad(100));
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

  .v-enter-active {
    transition: transform 1s ease 1s;
  }
  .v-leave-active {
    transition: transform 1s;
  }
  .v-enter, .v-leave-active {
    transform: translate3d(0, 100vh, 0);
  }
</style>

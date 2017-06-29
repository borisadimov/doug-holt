<template lang="pug">
  transition(
    name="main"
    v-bind:leave-active-class="leaveActClass"
    )
    .loader(v-show="loadProgress!=100" v-if="disableLoader")
      .curtain
      transition(name="content")
        .loader-content(v-if="true")
          .loader-title
            | Doug Holt
          .loader-subtitle
            | Photography

          .loader-bar(v-bind:style="{'width': loadProgress+'%'}")
            .loader-bar-line
</template>

<script>
  import Vue from 'vue'
  import {PAGE_HOME} from '~/store/nav';

  export default {
    name: 'LoaderComponent',

    data () {
      return {
        show: false,
        percent: 0,
        show: false,
        canSuccess: true,
        color: 'black',
        failedColor: 'red',
        height: '2px',
        duration: 5000,
        progress: 0,
        // contentShow: false,
        // timeout: 0,


        leaveActClass: 'main-leave-active-menu',
      }
    },

    mounted () {
      // this.onPageUpd();
      // this.show();
    },

    methods: {

    },

    computed: {
      loadProgress() {
        return this.$store.state.nav.loadProgress
      },

      disableLoader() {
        return this.$store.state.nav.disableLoader;
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;

    z-index: 999999999;

    &-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      opacity: 0;

      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      z-index: 11;
      transition-delay: 3s;

      font-weight: 500;
      color: rgba(0,0,0,0.87);
      text-transform: uppercase;
    }

    &-title {
      font-size: 36px;
      letter-spacing: 3px;
    }

    &-subtitle {
      font-size: 28px;
      letter-spacing: 2.33px;
    }

    &-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 30%;
      height: 10px;
      background: #000;
      transition: width 0.4s ease;
    }
  }

  .main-enter-to {
    transition: opacity 2s ease 0;
    opacity: 1;

    .loader-content {
      opacity: 1;
      transition: opacity .5s ease .5s;
      
    }
  }

  .main-enter-active {
    transition: opacity 2s ease 0s;
  }

  // .main-enter-to .loader-content {
  //   opacity: 1;
  //   transition: opacity .5s ease .5s;
  // }

  .main-enter-norm {
    transition: opacity 2s ease 2s;
    opacity: 1;
  }

  .main-leave-active-menu {
    transition: opacity .5s ease 2s;
    opacity: 0;
    z-index: 20;
  }

  .main-leave-active-menu .loader-content {
    opacity: 0;
    transition: opacity 1s ease .5s;
  }
  // .main-leave-active-norm {
  //   transition: opacity .5s ease 1s;
  //   opacity: 0;
  // }

  .main-leave-active-menu .curtain {
    transform: translate3d(0, -100%, 0);
    transition-delay: 1s;
  }

  .main-enter-to .curtain {
    transform: translate3d(0, 0, 0);
  }

  .content-enter-active {
    transition: opacity 1s, transform 3s;
  }
  .content-leave-active {
    transition: opacity .2s, transform .2s;
  }
  .content-enter, .content-leave-active {
    opacity: 0;
    transform: translate3d(0, 70px, 0);
  }
</style>

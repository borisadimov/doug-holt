<template lang="pug">
  transition(
    appear
    name="main"
    v-bind:leave-active-class="leaveActClass"
    )
    .loader(v-show="!isLoaded" v-if="disableLoader")
      .curtain
      .loader-content
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
        leaveActClass: 'main-leave-active-menu',
      }
    },

    mounted () {
      // this.onPageUpd();
      // this.show();
    },

    methods: {
      // start() {
      //   this.loading = true
      // },
      //
      // finish() {
      //   this.loading = false
      // }

      returnActiveClass() {
        return setTimeout(() => 'active', 500)
      },

      start () {
        this.show = true
        this.canSuccess = true
        if (this._timer) {
          clearInterval(this._timer)
          this.percent = 0
        }
        this._cut = 10000 / Math.floor(this.duration)
        this._timer = setInterval(() => {
          this.increase(this._cut * Math.random())
          if (this.percent > 95) {
            this.finish()
          }
        }, 100)
        return this
      },
      set (num) {
        this.show = true
        this.canSuccess = true
        this.percent = Math.floor(num)
        return this
      },
      get () {
        return Math.floor(this.percent)
      },
      increase (num) {
        this.percent = this.percent + Math.floor(num)
        return this
      },
      decrease (num) {
        this.percent = this.percent - Math.floor(num)
        return this
      },
      finish () {
        this.percent = 100
        this.hide()
        return this
      },
      pause () {
        clearInterval(this._timer)
        return this
      },
      hide () {
        clearInterval(this._timer)
        this._timer = null
        setTimeout(() => {
          this.show = false
          Vue.nextTick(() => {
            setTimeout(() => {
              this.percent = 0
            }, 200)
          })
        }, 10000)
        return this
      },
      fail () {
        this.canSuccess = false
        return this
      }
    },

    computed: {
      loadProgress() {
        return this.$store.state.nav.loadProgress
      },

      isLoaded() {
        return this.loadProgress > 99.99 ? true : false;
      },

      disableLoader() {
        return this.$store.state.nav.disableLoader;
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .curtain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #fff;
    opacity: 1;
    z-index: 10;
    transform: translate3d(0, 0, 0);
    transition: transform .5s ease;
    will-change: transform;
  }

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
      opacity: 1;

      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      z-index: 11;
      transition: opacity .5s ease;

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
    transition: opacity 1s ease;
    opacity: 1;
  }

  .main-leave-to {
    transition: opacity 1s ease;
    opacity: 1;
  }

  .main-enter-to .curtain {
    transform: translate3d(0,0,0);
  }

  .main-enter .curtain {
    transform: translate3d(0,-100%,0);
  }

  .main-leave .curtain {
    transform: translate3d(0,0,0);
  }

  .main-leave-active .curtain {
    transform: translate3d(0,0,0);
    transition: transform .5s ease .5s;
  }

  .main-leave-to .curtain {
    transform: translate3d(0,-100%,0);
    transition: transform .5s ease .5s;
  }

  .main-enter .loader-content {
    opacity: 0;
  }

  .main-enter-to .loader-content {
    opacity: 1;
    transition-delay: .5s;
  }

  .main-leave .loader-content {
    opacity: 1;
  }

  .main-leave-to .loader-content {
    opacity: 0;
  }
  
</style>

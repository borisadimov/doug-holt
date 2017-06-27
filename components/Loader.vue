<template lang="pug">
  transition(
    name="main"
    v-bind:enter-class="enterClass"
    v-bind:leave-active-class="leaveActClass"
    )
    .loader(v-show="loadProgress!=100")
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
        enterClass: ''
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
        }, 500)
        return this
      },
      fail () {
        this.canSuccess = false
        return this
      }
    },

    computed: {
      // nav() {
      //   return this.$store.state.nav;
      // },

      loadProgress() {
        return this.$store.state.nav.loadProgress
      },

      // loadProgress() {

      //   if (this.$store.state.nav.loadProgress < 100) {
      //     if (this.loaderShow)
      //       return;
      //     this.show();
      //     setTimeout(() => {
      //       this.loaderCan1 = true;
      //       if (this.loaderCan2)
      //         this.hide();
      //     }, 1500);

      //   } else {
      //     this.loaderCan2 = true;
      //     if (this.loaderCan1)
      //       this.hide();
      //   }
      // },

      // pageCurrent() {
      //   this.onPageUpd();
      //   return this.nav.pageCurrent
      // }
    },

    // watch: {
    //   'nav.loadProgress': {
    //     handler() {
    //       if (this.nav.loadProgress < 100) {
    //         if (this.loaderShow)
    //           return;
    //         this.show();
    //         setTimeout(() => {
    //           this.loaderCan1 = true;
    //           if (this.loaderCan2)
    //             this.hide();
    //         }, 1500);
    //       } else {
    //         this.loaderCan2 = true;

    //         if (this.loaderCan1)
    //           this.hide();
    //       }
    //     }
    //   },
    //   'nav.pageCurrent': {
    //     handler() {
    //       this.onPageUpd();
    //     }
    //   }
    // }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .loader {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;

    z-index: 9999999;

    &-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;

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

  .main-enter-active {
    transition: opacity .5s ease;
  }
  .main-enter-norm {
    opacity: 1;
  }

  .main-leave-active-menu {
    transition: opacity .5s ease;
    opacity: 0;
    z-index: 20;
  }
  .main-leave-active-norm {
    transition: opacity 1s;
    opacity: 0;
  }

  .content-enter-active {
    transition: opacity 1s, transform 1s;
  }
  .content-leave-active {
    transition: opacity .2s, transform .2s;
  }
  .content-enter, .content-leave-active {
    opacity: 0;
    transform: translate3d(0, 70px, 0);
  }
</style>

<template lang="pug">
  transition(
    name="main"
    v-bind:enter-class="enterClass"
    v-bind:leave-active-class="leaveActClass"
    )
    .loader(v-show="loaderShow")
      transition(name="content")
        .loader-content(v-if="contentShow")
          .loader-title
            | Doug Holt
          .loader-subtitle
            | Photography
      
          .loader-bar(v-bind:style="{width: progress + '%'}")
            .loader-bar-line
</template>

<script>
  import {PAGE_HOME} from 'index';
  
  
  export default {
    name: 'LoaderComponent',
  
    data () {
      return {
        nav: this.$select('nav'),
  
        firstRun: true,
  
        loaderShow: true,
        loaderCan1: true,
        loaderCan2: false,
  
        contentShow: false,
        progress: 0,
        timeout: 0,
  
        leaveActClass: 'main-leave-active-menu',
        enterClass: ''
      }
    },
    
    mounted () {
      this.onPageUpd();
      this.show();
    },
    
    methods: {
      onPageUpd () {
        if (this.nav.pageCurrent == PAGE_HOME)
          this.leaveActClass = 'main-leave-active-menu';
        else
          this.leaveActClass = 'main-leave-active-norm';
      },
      
      show () {
        this.loaderShow = true;
  
        if (this.firstRun) {
          this.showContent();
          this.enterClass = 'main-enter-norm';
        } else {
          this.timeout = setTimeout(() => this.showContent(), 1500);
        }
      },
      
      showContent () {
        this.contentShow = true;
  
        if (window.requestAnimationFrame) {
          let animate = () => {
            if (!this.loaderShow)
              return;
            if (this.progress < this.nav.loadProgress)
              this.progress++;
            window.requestAnimationFrame(animate);
          };
          animate();
        }
      },
      
      hide () {
        this.firstRun = false;
        this.contentShow = false;
        this.loaderShow = false;
        this.loaderCan1 = false;
        this.loaderCan2 = false;
        this.progress = 0;
        clearTimeout(this.timeout);
      }
    },
    
    watch: {
      'nav.loadProgress': {
        handler() {
          if (this.nav.loadProgress < 100) {
            if (this.loaderShow)
              return;
            this.show();
            setTimeout(() => {
              this.loaderCan1 = true;
              if (this.loaderCan2)
                this.hide();
            }, 1500);
  
          } else {
            this.loaderCan2 = true;
            if (this.loaderCan1)
              this.hide();
          }
        }
      },
      'nav.pageCurrent': {
        handler() {
          this.onPageUpd();
        }
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
    height: 100%;
    background: #fff;

    z-index: 9999;

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
    }
  }

  .main-enter-active {
    transition: transform 1s ease-in-out;
  }
  .main-enter-norm {
    transform: translate3d(0, -100%, 0);
  }

  .main-leave-active-menu {
    transition: transform 1s ease;
    transform: translate3d(-100%, 0, 0);
    z-index: 20;
  }
  .main-leave-active-norm {
    transition: transform 1s ease-in-out;
    transform: translate3d(0, -100%, 0);
  }

  .content-enter-active {
    transition: opacity .5s, transform .5s;
  }
  .content-leave-active {
    transition: opacity .2s, transform .2s;
  }
  .content-enter, .content-leave-active {
    opacity: 0;
    transform: translate3d(0, 70px, 0);
  }
</style>

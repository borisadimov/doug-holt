<template lang="pug">
  .loader
    transition
      .loader-content(v-if="showContent")
        .loader-title
          | Doug Holt
        .loader-subtitle
          | Photography
    
        .loader-bar(v-if="!destr" v-bind:style="{width: progress + '%'}")
          .loader-bar-line
</template>

<script>
  export default {
    name: 'LoaderComponent',
  
    data () {
      return {
        nav: this.$select('nav'),
        progress: 0,
        destr: false,
        showContent: false,
        timeout: 0
      }
    },
    
    mounted () {
      this.timeout = setTimeout(() => {
        this.showContent = true;
  
        if (window.requestAnimationFrame) {
          let animate = () => {
            if (this.destr)
              return;
            if (this.progress < this.nav.loadProgress)
              this.progress++;
            window.requestAnimationFrame(animate);
          };
          animate();
        }
      }, 1500);
    },
    
    beforeDestroy () {
      console.log('bef');
      clearTimeout(this.timeout);
      this.destr = true;
      this.progress = 0;
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
  
    .v-enter-active, .v-leave-active {
      transition: opacity .5s, transform .5s;
    }
    .v-enter, .v-leave-active {
      opacity: 0;
      transform: translate3d(0, 70px, 0);
    }
  
  }
</style>

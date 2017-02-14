<template lang="pug">
  #app
    loader-component
    transition(name="curtain")
      .curtain(
        v-if="nav.menuOpened && !nav.menuFixed"
        @click="onCurtainClick"
        )
    transition(
      name="view"
      v-bind:mode="RTMode"
      v-bind:enter-active-class="RTEntActClass"
      v-bind:leave-active-class="RTLeaActClass"
      )
      router-view.router-view(v-bind:class="{'router-view-menu': nav.menuOpened && !nav.menuFixed}")
    transition(
      name="menu"
      v-bind:enter-active-class="MEntActClass"
      )
      menu-component(v-if="nav.menuOpened")
    transition(
      name="menu-burger"
      )
      .app-menu-burger(
        ref="burgerMain"
        @click="onMenuToggle"
        v-show="!nav.menuFixed"
        v-html="require('assets/images/burger.inline.svg')"
        )
    .secret
      input(type="password")

      input(type="submit" value="Submit")
</template>

<script>
  import 'whatwg-fetch';

  import MenuComponent from 'components/Menu';
  import LoaderComponent from 'components/Loader';
  import {store, PAGE_CONTACTS, PAGE_HOME, router} from 'index';


  export default {
    name: "App",

    components: {
      MenuComponent,
      LoaderComponent
    },

    data () {
      return {
        nav: this.$select('nav'),

        burgerLines1: null,
        burgerLines3: null,
        burgerArrow: null,

        RTMode: '',

        RTEntActClass: 'view-active-long',
        RTLeaActClass: 'view-active-long',

        MEntActClass: 'menu-active-norm',
        MLeaActClass: 'menu-active-lv-norm',

        MBEntActClass: 'menu-active-norm',

        MPEntActClass: 'menu-active-norm',
        MPLeaActClass: 'menu-active-lv-norm',

        loaderShow: true,
        loaderCan1: true,
        loaderCan2: false

      }
    },

    mounted () {
      this.burgerLine1 = this.$refs.burgerMain.querySelector('.line1');
      this.burgerLine3 = this.$refs.burgerMain.querySelector('.line3');
      this.burgerArrow = this.$refs.burgerMain.querySelector('.arrow');
    },

    methods: {
      onMenuToggle() {
        if (this.nav.menuOpened)
          store.actions.nav.menuClose();
        else
          store.actions.nav.menuOpen();
      },

      onCurtainClick() {
        store.actions.nav.menuClose();
      }
    },

    watch: {
      'nav.menuOpened': {
        handler() {
          if (this.nav.menuOpened) {
            this.burgerArrow.classList.add('arrow-show');
            this.burgerLine1.classList.add('line13-show');
            this.burgerLine3.classList.add('line13-show');
          } else {
            this.burgerArrow.classList.remove('arrow-show');
            this.burgerLine1.classList.remove('line13-show');
            this.burgerLine3.classList.remove('line13-show');
          }
        }
      },
      'nav.pageCurrent': {
        handler() {
          if (this.nav.pageCurrent == PAGE_CONTACTS) {
            this.RTMode = 'in-out';
            this.RTEntActClass = 'view-active-long';
            this.RTLeaActClass = 'view-active-none';
          } else if (this.nav.pagePrev == PAGE_CONTACTS) {
            this.RTMode = '';
            this.RTEntActClass = 'view-active-none';
            this.RTLeaActClass = 'view-active-long view-leave-active';
            this.MPEntActClass = 'menu-active-norm';

          } else {
            this.RTMode = '';
            this.RTEntActClass = 'view-active-dly';
            this.RTLeaActClass = 'view-active-dly';
            if (this.nav.pageCurrent == PAGE_HOME) {
              this.MEntActClass = 'menu-active-dly';
            } else {
              this.MEntActClass = 'menu-active-norm';
          }
        }
      }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @font-face {
  	font-family: 'Marvel';
  	src: url('~assets/fonts/Marvel-Regular.eot');
  	src: url('~assets/fonts/Marvel-Regular.eot?#iefix') format('embedded-opentype'),
  		url('~assets/fonts/Marvel-Regular.woff') format('woff'),
  		url('~assets/fonts/Marvel-Regular.ttf') format('truetype');
  	font-weight: normal;
  	font-style: normal;
  }

  @font-face {
  	font-family: 'Marvel';
  	src: url('~assets/fonts/Marvel-Bold.eot');
  	src: url('~assets/fonts/Marvel-Bold.eot?#iefix') format('embedded-opentype'),
  		url('~assets/fonts/Marvel-Bold.woff') format('woff'),
  		url('~assets/fonts/Marvel-Bold.ttf') format('truetype');
  	font-weight: bold;
  	font-style: normal;
  }

  @import 'normalize.css';
  @import url('https://fonts.googleapis.com/css?family=Work+Sans:100,300,400,500,700');

  * {
    box-sizing: border-box;
  }

  html {
    overflow: hidden;
  }

  body {
    -webkit-font-smoothing: antialiased;
    font-family: 'Work Sans', sans-serif;
    overflow: hidden;
  }

  a {
    text-decoration: none;
  }
</style>

<style lang="scss" rel="stylesheet/scss">
  .app-menu-burger {
    position: absolute;
    top: 26px;
    left: 26px;
    cursor: pointer;

    width: 35px;
    height: 14px;

    opacity: 0.38;
    transition: opacity 0.2s ease;

    z-index: 20;

    &:hover {
      opacity: 1;
    }

    .line1, .line3 {
      transition: transform .6s;
    }

    .arrow {
      transform: scale(0);
      transform-origin: 0 50%;
      transition: transform .6s;
    }

    .line13-show {
      transform: translate3d(11px, 0, 0);
    }

    .arrow-show {
      transform: scale(1);
    }
  }
</style>

<style lang="scss" scoped rel="stylesheet/scss">
  #app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .curtain {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: .4;
    z-index: 3;
  }
  .secret {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200px;
    height: 40px;
    background: #aaa;
    display: none;
  }
  .router-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: transform .5s;
  }

  .menu-padding {
    position: absolute;
    top: 0;
    left: 0;
    width: 216px;
    height: 100%;
    z-index: 4;
    background: #F5F5F5;
  }

  .router-view-menu {
    transform: translate3d(175px, 0, 0);
  }

  .menu-leave-active {
    transition: transform .5s;
  }
  .menu-enter, .menu-leave-active {
    transform: translate3d(-100%, 0, 0);
  }
  .menu-active-norm {
    transition: transform .5s;
  }
  .menu-active-lv-norm {
    transition: transform .5s;
    transform: translate3d(-100%, 0, 0);
  }
  .menu-active-dly {
    transition: transform 1.5s step-end;
  }

  .menu-burger-enter-active, .menu-burger-leave-active {
    transition: opacity 1s step-end;
  }
  .menu-burger-enter, .menu-burger-leave-active {
    opacity: .01
  }

  .curtain-enter-active, .curtain-leave-active {
    transition: opacity .5s;
  }
  .curtain-enter, .curtain-leave-active {
    opacity: .01;
  }

  .loader-enter-active, .loader-leave-active {
    transition: transform 1s ease-in-out .4s;
  }
  .loader-enter, .loader-leave-active {
    transform: translate3d(0, -100%, 0);
  }

  .view-enter, .view-leave-active {
    transform: translate3d(0, 100%, 0);
  }
  .view-active-none {
    transition: none;
  }
  .view-active-long {
    transition: transform .5s;
  }
  .view-active-dly {
    transition: transform 1.5s step-end;
  }

</style>

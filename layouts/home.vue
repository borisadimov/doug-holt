<template lang="pug">
  .inner
    nuxt.router-view(v-bind:class="{'router-view-menu': nav.menuOpened && !nav.menuFixed}")
    .curtain
    .blackCurtain(:class="{'active': nav.menuOpened && !nav.menuFixed}")
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
        )
        |<svg width="35px" height="14px" viewBox="0 0 35 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        |    <defs></defs>
        |    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-opacity="0.87">
        |        <g id="burger" stroke="#000000">
        |            <path class="line1" d="M0,1 L24,1" id="Path-2"></path>
        |            <path d="M0,7 L24,7" id="Path-2-Copy"></path>
        |            <path class="line3" d="M0,13 L24,13" id="Path-2-Copy-2"></path>
        |            <g id="arrow" class="arrow" >
        |                <polyline id="sidebar-close-arrow" transform="translate(3.005204, 7.250000) rotate(90.000000) translate(-3.005204, -7.250000) " points="-3 5 3.00520382 9.5 9.01040763 5"></polyline>
        |            </g>
        |        </g>
        |    </g>
        |</svg>
    .secret
      input(type="password")

      input(type="submit" value="Submit")
</template>

<script>
  import 'whatwg-fetch';
  import MenuComponent from '~/components/Menu';
  import LoaderComponent from '~/components/Loader';
  import {mapMutations} from 'vuex';
  import { db } from '~/db'

  const $categories = db.ref('categories')

  const PAGE_CONTACTS = '/contacts';
  const PAGE_HOME = '/';

  export default {
    name: 'HomeLayout',
    middleware: 'switchPortfolioItems',

    components: {
      MenuComponent,
      LoaderComponent
    },

    fetch ({ store }) {
      return store.dispatch('setCategoriesRef', $categories)
    },

    data () {
      return {

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
          this.menuClose();
        else
          this.menuOpen();
      },

      onCurtainClick() {
        this.menuClose();
      },

      ...mapMutations([
        'menuOpen',
        'menuClose'
      ])
    },

    computed: {
      nav() {
        return this.$store.state.nav;
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

  @import '~assets/normalize.css';
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
  .blackCurtain {
    background: #000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity .2s ease;
    will-change: opacity;
    pointer-events: none;

    &.active {
      opacity: .2;
      pointer-events: initial;
    }
  }
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
  .inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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

</style>

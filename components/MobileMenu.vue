<template lang="pug">
  .menu
    .menu-container.menu-white
      .header
        nuxt-link.logo(to="/" v-if="!title")
          | DOUG HOLT
          .logo-inner
            | PHOTOGRAPHY

        .menu-burger(
          ref="burgerMain"
          @click="toggleMenu"
          )
          |<svg width="35px" height="14px" viewBox="0 0 35 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          |    <defs></defs>
          |    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-opacity="0.87">
          |        <g id="burger" stroke="#000000">
          |            <path class="line1" d="M0,1 L24,1" id="Path-2" :class="{'line13-show': isMenuVisible}"></path>
          |            <path d="M0,7 L24,7" id="Path-2-Copy"></path>
          |            <path class="line3" d="M0,13 L24,13" id="Path-2-Copy-2" :class="{'line13-show': isMenuVisible}"></path>
          |            <g id="arrow" class="arrow" :class="{'arrow-show': isMenuVisible}" >
          |                
          |            </g>
          |        </g>
          |    </g>
          |</svg>

        .title(v-if="title")
          span(:class="{'activeTitle': !isMenuVisible}")
            | {{title}}
          nuxt-link.logo(to="/", :class="{'activeLogo': isMenuVisible}")
            | DOUG HOLT
            .logo-inner
              | PHOTOGRAPHY
          
        

      .nav(:class="{active: isMenuVisible}")
        .nav-content
          .nav-item.nav-work(@click="toggleWorks", :class="{'cats-active': showCats}")
            .nav-workLabel
              | Portfolios
              .nav-arrow(v-bind:class="{'arrow-up': showCats}")
            .nav-inner(ref="cats")
              .nav-innerItem(
                v-for="(category, index) of categories"
                v-bind:key="index")
                  nuxt-link(v-bind:to="'/gallery/' + category.name")
                    | {{category.name}}
          .nav-bottom-cont(ref="bottom")
            .nav-item
              nuxt-link(to="/about") About
            .nav-item
              nuxt-link(to="/journal") Journal
            .nav-item(v-bind:class="{disabled: !!showContacts}")
              a(@click="toContacts") Contact

      .lock
</template>

<script>
  var Velocity = process.BROWSER_BUILD ? Velocity = require('velocity-animate') : null

  import {
    mapGetters,
    mapMutations
  } from 'vuex';
  import {
    db
  } from '~/db'

  export default {
    name: "MobileMenu",
    props: ["title"],

    data() {
      return {
        showCats: false,
        catsHeight: 0,
        bottomCont: null,
        burgerLines1: null,
        burgerLines3: null,
        burgerArrow: null
      }
    },

    mounted() {
      this.catsHeight = this.$refs.cats.getBoundingClientRect().height;

      this.burgerLine1 = this.$refs.burgerMain.querySelector('.line1');
      this.burgerLine3 = this.$refs.burgerMain.querySelector('.line3');
      this.burgerArrow = this.$refs.burgerMain.querySelector('.arrow');
    },

    methods: {
      toggleWorks() {
        this.showCats = !this.showCats;
      },

      toggleMenu() {
        this.toggleMobileMenu()

        if (this.isMenuVisible) {
            this.burgerArrow.classList.add('arrow-show');
            this.burgerLine1.classList.add('line13-show');
            this.burgerLine3.classList.add('line13-show');
          } else {
            this.burgerArrow.classList.remove('arrow-show');
            this.burgerLine1.classList.remove('line13-show');
            this.burgerLine3.classList.remove('line13-show');
            this.showCats = false;
          }
      },

      toContacts() {
        this.$store.commit('setContacts')
        this.$store.commit('toggleMobileMenu')
        this.$router.push('/')
      },

      ...mapMutations(['setContacts', 'toggleMobileMenu'])
    },

    computed: {
      ...mapGetters(['categories']),

      nav() {
        return this.$store.state.nav;
      },

      showContacts() {
        return this.$store.state.firebase.showContacts;
      },

      isMenuVisible() {
        return this.$store.state.nav.mobileMenuOpened;
      }
    },

    created() {
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .menu {
    width: 100%;

    .menu-white {
      background: white;
      .nav-bottom-cont {
        background: white;
      }
    }

    .title {
      position: absolute;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      height: 100%;
      width: 40%;

      span, a {
        opacity: 0;
        transition: opacity .5s ease;
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        width: 100%;
        text-align: center;
        will-change: opacity;
      }

      span {
        font-size: 20px;
      }

      .activeLogo, .activeTitle {
        opacity: 1;
      }
    }

    .lock {
      background: url('~assets/images/lock.svg') no-repeat center center / contain;
      height: 13px;
      width: 10px;
      display: none;
      position: absolute;
      left: 36px;
      bottom: 38px;
      opacity: 0.7;
      transition: opacity 0.2s ease;
      will-change: opacity;
      cursor: pointer;
      &:hover {
        opacity: 1;
      }
    }
    .logo {
      font-weight: 500;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.87);
      letter-spacing: 1.5px;
      -webkit-tap-highlight-color: rgba(0,0,0,0);

      &-inner {
        margin-top: 3px;
        font-size: 14px;
        letter-spacing: 1.16px;

      }
    }
    .nav {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.54);
      background: #fff;
      letter-spacing: 2px;
      line-height: 24px;
      position: absolute;
      bottom: 1px;
      padding: 30px;
      height: calc(100vh - 79px);
      left: 0;
      width: 100%;
      transform: translate3d(0, 100%, 0);
      pointer-events: none;
      opacity: 0;
      transition: opacity .5s ease;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;

      &-content {
        text-align: center;
      }

      a {
        color: rgba(0, 0, 0, 0.54);
        transition: color 0.2s ease;
        will-change: color;
      }
      &-workLabel {
        font-weight: 600;
      }
      &-item {
        padding-top: 4px;
        padding-bottom: 20px;
        cursor: pointer;
        &:hover>a {
          color: #000000;
        }
        &.disabled {
          pointer-events: none;
        }
      }
      &-bottom-cont {
        padding-top: 20px;
        position: relative;
        z-index: 10;
        background: #F5F5F5;
        transition: background-color .5s;
      }
      &-work {
        position: relative;
        max-height: 24px;
        transition: max-height .5s ease-in-out;
        will-change: max-height;
        overflow: hidden;

        &Label {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          justify-content: center;
        }
        .nav-arrow {
          background: url('~assets/images/menu-arrow.svg') no-repeat center center / contain;
          height: 6px;
          width: 12px;
          margin-left: 7px;
          transition: transform 0.2s ease;
          will-change: transform;
        }
        .arrow-up {
          transform: rotate(180deg);
        }
      }
      &-inner {
        font-family: 'Marvel', sans-serif;
        font-weight: bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.54);
        letter-spacing: 1.55px;
        line-height: 18px;
        text-transform: uppercase;
        z-index: 9;
        margin: 0 auto;

        &Item {
          margin-top: 12px;
          margin-left: 12px;
          &:hover a {
            color: #000000;
          }
          &:first-child {
            margin-top: 19px;
          }
        }
      }
    }

    .active {
      opacity: 1;
      pointer-events: initial;
    }

    .cats-active {
      max-height: 500px;
    }
  }

  .hideLogo {
    opacity: 0;
    display: none;
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    position: relative;
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

  @media (min-width: 768px) {
    .menu {
      display: none;
    }
  }
</style>

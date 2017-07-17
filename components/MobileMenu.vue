<template lang="pug">
  .menu
    .menu-container.menu-white
      .header
        nuxt-link.logo(to="/")
          | DOUG HOLT
          .logo-inner
            | PHOTOGRAPHY
        
        .menu-burger(
          ref="burgerMain"
          @click="isMenuVisible = !isMenuVisible"
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
        

      .nav(:class="{active: isMenuVisible}")
        .nav-content
          .nav-item.nav-work(@click="toggleWorks")
            .nav-workLabel
              | Portfolios
              .nav-arrow(v-bind:class="{'arrow-up': showCats}")
            .nav-inner(ref="cats" )
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

    data() {
      return {
        showCats: false,
        isMenuVisible: false,
        catsHeight: 0,
        bottomCont: null,
      }
    },

    mounted() {
      this.catsHeight = this.$refs.cats.getBoundingClientRect().height;
    },

    methods: {
      toggleWorks() {
        this.showCats = !this.showCats;

        if (this.showCats) {
          this.catsClose();
        }
        else {
          this.catsOpen();
        }
      },

      catsOpen() {
        Velocity(this.$refs.bottom, "stop");
        Velocity(
          this.$refs.bottom, {
            translateY: this.catsHeight - 20,
            translateZ: 0
          }, {
            duration: 300,
            complete: () =>
              Velocity(this.$refs.bottom, {
                translateY: 0,
                marginTop: this.catsHeight - 20
              }, {
                duration: 30
              })
          }
        );
      },
      catsClose(el, done) {
        if(!this.$refs.bottom) return
        Velocity(this.$refs.bottom, "stop");
        Velocity(
          this.$refs.bottom, {
            translateY: this.catsHeight,
            marginTop: 0
          }, {
            duration: 30,
            complete: () => {
              if(!this.$refs.bottom) return
              return Velocity(this.$refs.bottom, {
                translateY: 0,
                translateZ: 0
              }, {
                duration: 300
              })
            }
          }
        );
      },

      toContacts() {
        this.$store.commit('setContacts')
        this.$router.push('/')
      },

      ...mapMutations(['setContacts'])
    },

    computed: {
      ...mapGetters(['categories']),

      nav() {
        return this.$store.state.nav;
      },

      showContacts() {
        return this.$store.state.firebase.showContacts;
      },
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
      transition: opacity .2s ease;

      &-content {
        position: absolute;
        margin-top: 10vh;
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
        &Label {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
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
        position: absolute;
        font-family: 'Marvel', sans-serif;
        font-weight: bold;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.54);
        letter-spacing: 1.55px;
        line-height: 18px;
        text-transform: uppercase;
        z-index: 9;
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
    }
  }

  .header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  @media (min-width: 768px) {
    .menu {
      display: none;
    }
  }
</style>

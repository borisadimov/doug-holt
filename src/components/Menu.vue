<template lang="pug">
  .menu
    .menu-container(v-bind:class="{'menu-white': nav.menuFixed}")
      router-link(to="/")
        .logo
          | DOUG HOLT
          .logo-inner
            | PHOTOGRAPHY

      .nav(@mouseleave="onNavLeave")
        .nav-item.nav-work(@mouseenter="onWorksEnter")
          .nav-workLabel
            | Work
            .nav-arrow(v-bind:class="{'arrow-up': showCats}")
          .nav-inner(ref="cats")
            .nav-innerItem(
              v-for="(category, index) of categories"
              v-bind:key="index")
                router-link(v-bind:to="'/gallery/' + category.name")
                  | {{category.name}}
        .nav-bottom-cont(ref="bottom")
          .nav-item
            router-link(to="/about") About
          .nav-item
            router-link(to="/journal") Journal
          .nav-item
            router-link(to="/contacts") Contact

      .lock
</template>

<script type="text/babel">
  import Velocity from 'velocity-animate';

  import {categories} from 'store/fixtures';


  export default {
    name: "MenuComponent",

    data () {
      return {
        categories,
        nav: this.$select('nav'),

        showCats: false,

        catsHeight: 0,
        bottomCont: null
      }
    },

    mounted () {
      this.catsHeight = this.$refs.cats.getBoundingClientRect().height;
    },

    methods: {
      onWorksEnter () {
        if (!this.showCats) {
          this.showCats = true;
          this.catsOpen();
        }
      },

      onNavLeave () {
        if (this.showCats) {
          this.showCats = false;
          this.catsClose();
        }
      },

      catsOpen () {
        Velocity(this.$refs.bottom, "stop");
        Velocity(
          this.$refs.bottom,
          {translateY: this.catsHeight, translateZ: 0},
          {duration: 300, complete: () =>
            Velocity(this.$refs.bottom, {translateY: 0, marginTop: this.catsHeight}, {duration: 30})
          }
        );
      },
      catsClose (el, done) {
        Velocity(this.$refs.bottom, "stop");
        Velocity(
          this.$refs.bottom,
          {translateY: this.catsHeight, marginTop: 0},
          {duration: 30, complete: () =>
            Velocity(this.$refs.bottom, {translateY: 0, translateZ: 0}, {duration: 300})
          }
        );
      },
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 216px;
    height: 100%;

    z-index: 15;

    &-container {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;

      padding: 10vh 36px;
      background: #F5F5F5;
      transition: background .5s;
    }

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
      color: rgba(0,0,0,0.87);
      letter-spacing: 1.5px;

      &-inner {
        margin-top: 3px;

        font-size: 14px;
        letter-spacing: 1.16px;
      }
    }

    .nav {
      margin-top: 18vh;

      font-size: 24px;
      color: rgba(0,0,0,0.54);
      letter-spacing: 2px;
      line-height: 24px;

      a {
        color: rgba(0,0,0,0.54);

        transition: color 0.2s ease;
        will-change: color;
      }

      &-item {
        padding-top: 4px;
        padding-bottom: 20px;

        cursor: pointer;

        &:hover > a {
          color: #000000;
        }
      }

      &-bottom-cont {
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
        color: rgba(0,0,0,0.54);
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
  }

</style>

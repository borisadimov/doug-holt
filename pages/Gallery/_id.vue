<template lang="pug">
  .gallery(@keydown="handleKey" )
    
    .menu-burger(
      ref="burgerGallery"
      @click="onMenuToggle"
      )
      |<svg width="35px" height="14px" viewBox="0 0 35 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      |    <defs></defs>
      |    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      |        <g id="burger-right" transform="translate(0.000000, 1.000000)" stroke="#000000">
      |            <path class="line13" d="M15,0 L35,0" id="Path-2"></path>
      |            <path d="M15,6 L35,6" id="Path-2-Copy"></path>
      |            <path class="line13" d="M15,12 L35,12" id="Path-2-Copy-2"></path>
      |            <path class="line13" d="M11,0 L13,0" id="Path-2-Copy-5"></path>
      |            <path d="M11,6 L13,6" id="Path-2-Copy-4"></path>
      |            <path class="line13" d="M11,12 L13,12" id="Path-2-Copy-3"></path>
      |            <g id="arrow" class="arrow">
      |                <polyline id="sidebar-right-close-arrow" transform="translate(33.010000, 6.250000) rotate(270.000000) translate(-33.010000, -6.250000) " points="27.0047964 4.0000002 33.0100002 8.5000002 39.015204 4.0000002"></polyline>
      |            </g>
      |        </g>
      |    </g>
      |</svg>
    transition(name="curtain")
      .menu-curtain(
        v-if="nav.menuRightOpened"
        @click="onCurtainClick"
        )

    transition(name="menu")
      .menu(v-if="nav.menuRightOpened")
        .menu-title
          | {{ category.name }} List
        .menu-list
          .menu-header
            .menu-order
              | Order
            .menu-name
              | Title
            .menu-client
              | Client
          .menu-item(
            v-for="(item, i) of category.items"
            @click="onMenuItemClick(i)"
            )
            .menu-order
              | {{ i + 1 }}
            .menu-name
              .menu-dot
                .menu-dotBg(
                  v-bind:key="i"
                  v-if="i == itemNum"
                  )
              | {{ item.title }}
            .menu-client
              | {{ item.client }}

    .content(v-bind:class="{'content-menu': nav.menuRightOpened}" v-if="category")
      .title
        | {{ category.name }}

      transition(
        v-bind:css="false"
        v-on:before-enter="scrollBeforeEnter"
        v-on:enter="scrollEnter"
        v-on:leave="scrollLeave"
        )
        .item(
          v-for="(item, i) of category.items"
          v-bind:key="i"
          v-if="i == itemNum"
          )
          .item-pic(v-bind:style="{ backgroundImage: 'url(' + item.image + ')' }")
          .nav-left(@click="itemPrev" v-if="!(itemNum <= 0)")
          .nav-right(@click="itemNext")
      .arrow-left
      .arrow-right
      .count
        .count-index-wrapper(v-bind:style="{ minWidth: counterWidth + 'px' }")
          transition(
            v-bind:css="false"
            v-on:before-enter="counterBeforeEnter"
            v-on:enter="counterEnter"
            v-on:leave="counterLeave"
            )
            .count-index(
              v-for="(item, i) of category.items"
              v-bind:key="i"
              v-if="i == itemNum"
              ) {{ i + 1 }}
        .count-items / {{ category.items.length }}
        .count-name-wrapper
          transition(
            v-bind:css="false"
            v-on:before-enter="counterBeforeEnter"
            v-on:enter="counterEnter"
            v-on:leave="counterLeave"
            )
            .count-name(
              v-for="(item, i) of category.items"
              v-bind:key="i"
              v-if="i == itemNum"
              ) {{ item.title }}
    .info-icon(v-on:click="toggleInfo")
    .info-block(v-bind:class="{shown: showInfo}" v-if="category")
      .info-block-cross(v-on:click="toggleInfo")
      .info-block-label
        | CATEGORY
      .info-block-name
        | {{ category.name }}
      .info-block-label
        | INFO
      .info-block-text
        | {{ category.info }}
</template>

<script>
  var Velocity = process.BROWSER_BUILD ? Velocity = require('velocity-animate') : null;

  import ScrollHandler    from '~/utils/scrollhandler';
  import { mapMutations, mapGetters } from 'vuex';
  import { db } from '~/db'

  const $categories = db.ref('categories')

  export default {
    name: "CatComponent",
    layout: 'home',

    fetch ({ store }) {
      return store.dispatch('setCategoriesRef', $categories)
    },

    data () {
      return {
        active: false,
        showInfo: false,
        itemNum: 0,
        direction: 'right',

        counterWidth: 13
      }
    },

    mounted () {   
      this.active = false;
      this.scrollHandler = new ScrollHandler(this.itemNext, this.itemPrev, 'h');
      this.makeMenuUnfixed();
      this.menuClose();

      if (this.category.items.length > 9)
        this.counterWidth = 24;

      this.burgerLines13 = this.$refs.burgerGallery.querySelectorAll('.line13');
      this.burgerArrow = this.$refs.burgerGallery.querySelector('.arrow');

      let loadCnt = 0;
      for (let item of this.category.items) {
        let img = new Image();
        img.onload = () => {
          loadCnt++;
          if (loadCnt == this.category.items.length)
            this.onLoad(100);
          else
            this.onLoad(loadCnt * 100 / this.category.items.length);
        };
        img.src = '/assets/categories/' + this.category.name + '/items/' + item.image;
      }
    },

    beforeUpdate() {
      // this.active = !this.active;
      // console.log('before updated', this.active)
    },

    updated() {
      this.makeMenuUnfixed();
      this.menuClose();
    },

    beforeDestroy() {
      this.scrollHandler.destroy();
      this.active = true;
      if (process.BROWSER_BUILD)
        window.removeEventListener('keydown', this.handleKey);
    },

    created: function () {
      if (process.BROWSER_BUILD)
        window.addEventListener('keydown', this.handleKey);
    },
    methods: {
      handleKey(e) {
        if (e.keyCode == 37) {
          this.itemPrev();
          return false;
        }
        if (e.keyCode == 39) {
          this.itemNext();
          return false;
        }
        return false;
      },
      toggleInfo (){
        this.showInfo = !this.showInfo;
      },
      hideInfo (){
        this.showInfo = false;
      },
      itemNext () {
        if (this.itemNum >= this.category.items.length - 1)
          return this.itemNum = 0;
        this.itemNum++;
        this.direction = 'right';
        this.hideInfo();
      },
      itemPrev () {
        if (this.itemNum <= 0)
          return;
        this.itemNum--;
        this.direction = 'left';
        this.hideInfo();
      },

      onMenuToggle () {
        if (this.nav.menuRightOpened) {
          this.menuRightClose();
          this.scrollHandler = new ScrollHandler(this.itemNext, this.itemPrev, 'h');
        }

        else {
          this.menuRightOpen();
          this.hideInfo();
          this.scrollHandler.destroy();
        }
      },

      onCurtainClick () {
        this.menuRightClose();
        this.hideInfo();
      },

      onMenuItemClick (i) {
        this.menuRightClose();
        this.direction = i > this.itemNum ? 'right' : 'left';
        this.itemNum = i;
      },

      scrollBeforeEnter (el) {
        let value = this.direction === 'right' ? '100%' : "-100%";
        el.style.transform = `translate3d(${value}, 0, 0)`;
      },
      scrollEnter (el, done) {
        let value = this.direction === 'right' ? '99%' : "-99%";
        Velocity(el, { translateX: [0, value], translateZ: 0 }, { duration: 400, complete: done });
      },
      scrollLeave (el, done) {
        let value = this.direction === 'right' ? '-100%' : "100%";
        Velocity(el, { translateX: value, translateZ: 0}, { duration: 400, complete: done });
      },

      counterBeforeEnter (el) {
        let value = this.direction === 'right' ? '100%' : "-100%";
        el.style.transform = `translate3d(0, ${value}, 0)`;
      },
      counterEnter (el, done) {
        let value = this.direction === 'right' ? '99%' : "-99%";
        Velocity(el, { translateY: [0, value], translateZ: 0 }, { duration: 400, complete: done });
      },
      counterLeave (el, done) {
        let value = this.direction === 'right' ? '-100%' : "100%";
        Velocity(el, { translateY: value, translateZ: 0}, { duration: 400, complete: done });
      },

      ...mapMutations([
        'menuRightClose',
        'menuRightOpen',
        'onLoad',
        'makeMenuUnfixed',
        'menuClose'
      ])
    },

    computed: {
      ...mapGetters(['categories']),

      nav() {
        return this.$store.state.nav;
      },

      portfolio() {
        return this.$store.state.firebase;
      },

      category() {
        this.itemNum = 0;
        return this.categories[this.portfolio.category];
      }
    },

    watch: {
      'nav.menuRightOpened': {
        handler () {
          //this.scrollHandler.disabled = this.nav.menuRightOpened;
          if (this.nav.menuRightOpened) {
            this.burgerArrow.classList.add('arrow-show');
            for (let i = 0; i < this.burgerLines13.length; i++)
              this.burgerLines13[i].classList.add('line13-show');
          } else {
            this.burgerArrow.classList.remove('arrow-show');
            for (let i = 0; i < this.burgerLines13.length; i++)
              this.burgerLines13[i].classList.remove('line13-show');
          }
        }
      },

      'nav.menuOpened': {
        handler() {
          if(this.nav.menuOpened) {
            this.scrollHandler.disabled = true;
          }
          else {
            this.scrollHandler.disabled = false;
          }
        }
      }
    }
  }


</script>

<style lang="scss" rel="stylesheet/scss">
  .gallery {
    .active-curtain {
      transform: translate3d(0,0,0);
    }

    .menu-burger {
      position: absolute;
      top: 24px;
      right: 24px;
      cursor: pointer;

      width: 35px;
      height: 14px;

      opacity: 0.38;
      transition: opacity 0.2s ease;

      z-index: 50;

      &:hover {
        opacity: 1;
      }

      .line13 {
        transition: transform .6s;
      }

      .arrow {
        transform: scale(0);
        transform-origin: 100% 50%;
        transition: transform .6s;
      }

      .line13-show {
        transform: translate3d(-11px, 0, 0);
      }

      .arrow-show {
        transform: scale(1);
      }
    }
  }
</style>

<style lang="scss" scoped rel="stylesheet/scss">
  .gallery {

    .content {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;

      transition: transform .5s;
      .title {
        font-size: 18px;
        color: rgba(0, 0, 0, 0.87);
        letter-spacing: 1.5px;

        position: absolute;
        top: 26px;
        left: 0;

        width: 100%;
        text-align: center;
      }
      .count {
        position: absolute;
        bottom: 26px;
        height: 17px;
        overflow: hidden;

        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        font-size: 15px;
        color: rgba(0, 0, 0, 0.87);
        letter-spacing: 1.2px;

        width: 100%;
        padding: 0 26px;

        &-index-wrapper {
          min-width: 13px;
          min-height: 17px;
          position: relative;
        }

        &-index {
          text-align: right;
          width: 100%;
          position: absolute;
        }

        &-items {
          margin-left: 10px;
        }

        &-name-wrapper {
          min-width: 270px;
          min-height: 17px;
          position: relative;
        }

        &-name {
          margin-left: 25px;
          position: absolute;
          white-space: nowrap;
        }
      }

      .item {
        position: absolute;
        top: 15%;
        left: 10%;
        width: 80%;
        height: 70%;
        .nav-left {
          cursor: url(~assets/images/arrow-left.png), w-resize;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 50%;
          z-index: 5;
        }
        .nav-right {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 50%;
          z-index: 5;
          cursor: url(~assets/images/arrow-right.png), e-resize;
        }
        &-pic {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: center center no-repeat / contain;
        }
      }
    }

    .content-menu {
      transform: translate3d(-175px, 0, 0);
    }

    .menu-curtain {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, .7);
      z-index: 25;
    }

    .menu {
      position: absolute;
      right: 0;
      top: 0;

      background: #FFFFFF;

      width: 502px;
      height: 100%;
      padding: 36px 0;

      z-index: 30;

      &-title {
        font-size: 18px;
        color: rgba(0,0,0,0.87);
        letter-spacing: 1px;
        padding: 0 80px;
      }

      &-list {
        margin-top: 105px;
        padding: 0 80px;
        max-height: calc(100% - 110px);
        overflow-y: auto;
      }

      &-header,
      &-item {
        display: flex;
        flex-flow: row nowrap;
      }

      &-header {
        font-family: 'Marvel', sans-serif;
        font-weight: bold;
        font-size: 13px;
        color: rgba(0,0,0,0.87);
        letter-spacing: 1.26px;
        line-height: 13px;

        padding-bottom: 8px;
        border-bottom: 1px solid rgba(0,0,0,0.24);
      }

      &-item {
        font-size: 14px;
        color: rgba(0,0,0,0.87);
        letter-spacing: 0.5px;
        line-height: 20px;

        padding: 8px 0;
        border-bottom: 1px solid rgba(0,0,0,0.24);

        cursor: pointer;

        transition: background 0.2s ease;
        will-change: background;

        .menu-order {
          text-align: center;
        }

        &:hover {
          background: #f8f8f8;
        }
      }

      &-order {
        flex: 0 0 10%;
      }

      &-name {
        flex: 0 0 50%;
        margin-left: 8%;

        position: relative;
      }

      &-client {
        flex: 0 0 32%;
      }

      &-dot {
        position: absolute;
        left: -14px;
        top: 8px;

        width: 6px;
        height: 6px;
        border: 1px rgba(0,0,0,0.87) solid;
        border-radius: 100px;

        &Bg {
          background: rgba(0,0,0,0.87);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }

    .info-icon {
      background: url('~assets/images/info.svg') no-repeat center center / contain;
      height: 17px;
      width: 16px;
      position: absolute;
      right: 20px;
      bottom: 20px;

      opacity: 0.7;

      transition: opacity 0.2s ease;
      will-change: opacity;

      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }
    .info-block {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50vw;
      height: 74vh;
      background: #212121;
      color: #fff;
      padding: 100px;

      transition: transform .4s ease;
      transform: translate3d(0,100%,0);

      &.shown {
        transform: translate3d(0,0,0);
      }

      &-cross {
        position: absolute;
        top: 35px;
        left: 35px;
        width: 24px;
        height: 24px;
        display: block;
        transform: rotate(45deg);
        transform-origin: 50% 50%;
        opacity: 0.7;
        cursor: pointer;
        transition: opacity 0.3s ease;

        &:hover{
          opacity: 1;
        }
        &:before {
          display: block;
          content: "";
          position: absolute;
          width: 24px;
          height: 1px;
          top: 11.5px;
          left: 0;
          background: #fff;
        }
        &:after {
          display: block;
          content: "";
          position: absolute;
          width: 1px;
          height: 24px;
          top: 0;
          left: 11.5px;
          background: #fff;

        }
      }
      &-label {
        opacity: 0.5;
        margin-bottom: 7px;
      }
      &-name {
        font-size: 30px;
        margin-bottom: 10px;
      }
      &-text {
        opacity: 0.7;
        font-size: 18px;
      }
    }
  }

  .curtain-enter-active, .curtain-leave-active {
    transition: opacity .5s;
  }
  .curtain-enter, .curtain-leave-active {
    opacity: .01;
  }
</style>

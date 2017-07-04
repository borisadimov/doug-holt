<template lang="pug">
  .journal-single(v-bind:class="{ disabled: nav.menuRightOpened }")
    .menu-burger(
      ref="burgerRight"
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
          | Journal List
        .menu-list
          .menu-header
            .menu-year
              | Year
            .menu-title
              | Title
          .menu-item(
            v-for="(tempPost, i) of posts"
            v-bind:key="i"
            @click="onMenuItemClick(tempPost)"
            )
            .menu-year
              | 2016
            .menu-name
              .menu-dot
                .menu-dotBg(v-if="tempPost.id == activePost.id")
              | {{tempPost.title}}

    .journal-content(v-bind:class="{'content-menu': nav.menuRightOpened}")
      .journal-content-image
        img(
          v-bind:src="activePost.image"
          v-on:error="onImgLoaded"
          v-on:load="onImgLoaded"
          )
      .journal-content-info
        .journal-content-title
          | {{activePost.title}}
        .journal-content-date
          | {{activePost.date}}
        .journal-content-titleBig
          | {{activePost.title}}
        .journal-content-author
          | By {{activePost.author}}
        .journal-content-text(v-html="activePost.text")
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';
  import { db } from '~/db'

  const $posts = db.ref('posts')
  const $categories = db.ref('categories')

  export default {
    name: "JournalItemComponent",
    layout: 'home',

    fetch ({ store }) {
      return store.dispatch('setPostsRef', $posts).then(() => store.dispatch('setCategoriesRef', $categories))
    },

    data () {
      return {
        burgerLines13: null,
        burgerArrow: null,
        activePost: this.post || {}
      }
    },

    mounted () {
      this.makeMenuUnfixed();
      this.menuClose();
      this.burgerLines13 = this.$refs.burgerRight.querySelectorAll('.line13');
      this.burgerArrow = this.$refs.burgerRight.querySelector('.arrow');
      this.posts.reverse();
      this.hideContacts();
    },

    created() {
      this.activePost = this.post || {};
    },

    methods: {
      onImgLoaded () {
        this.onLoad(100);
      },

      onMenuToggle () {
        if (this.nav.menuRightOpened)
          this.menuRightClose();
        else
          this.menuRightOpen();
      },

      onCurtainClick () {
        this.menuRightClose();
      },

      onMenuItemClick (post) {
        this.menuRightClose();
        this.activePost = post || {};
        history.replaceState({path: "/journal/" + post.id}, "post.id", "/journal/" + post.id);
      },

      ...mapMutations([
        'onLoad',
        'menuRightClose',
        'menuRightOpen',
        'makeMenuUnfixed',
        'menuClose',
        'hideContacts'
      ])
    },

    computed: {
      nav() {
        return this.$store.state.nav;
      },

      ...mapGetters(['posts', 'getPost']),

      post: {
        get() {
          return this.getPost(this.$route.params.id)
        },

        set(post) {
          return post;
        }
      }

    },

    watch: {
      'nav.menuRightOpened': {
        handler () {
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
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .journal-single {
    .menu-burger {
      position: absolute;
      top: 26px;
      right: 26px;
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
  .journal-single{
    width: 100%;
    height: 100%;
    background: white;

    overflow-y: scroll;
    overflow-x: hidden;

    padding: 0 6% 5vw;
    &.disabled {
      overflow-y: hidden;
    }
    .journal-content {
      padding: 26px 0;

      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      transition: transform .5s;

      &-image {
        margin-top: 50px;

        flex: 0 0 45%;

        img {
          width: 100%;
        }
      }

      &-info {
        flex: 0 0 50%;
      }

      &-title {
        font-size: 18px;
        color: rgba(0,0,0,0.87);
        letter-spacing: 0;
        line-height: 18px;

        margin-top: 50px;
        padding-bottom: 46px;
        border-bottom: 1px solid rgba(0,0,0,0.38);
        text-align: center;
      }

      &-date {
        margin-top: 16px;

        font-family: 'Marvel', sans-serif;
        font-size: 16px;
        color: rgba(0,0,0,0.87);
        letter-spacing: 1.55px;
        line-height: 18px;
        text-align: center;
        padding: 0 30px;
      }

      &-titleBig {
        margin-top: 75px;
        font-size: 40px;
        color: rgba(0,0,0,0.87);
        letter-spacing: 0;
        line-height: 46px;
        text-align: center;
        padding: 0 30px;
      }

      &-author {
        font-size: 18px;
        color: rgba(0,0,0,0.54);
        letter-spacing: 1px;
        line-height: 18px;

        padding: 55px 30px 79px;
        text-align: center;
      }

      &-text {
        margin-top: 18px;

        font-size: 18px;
        color: rgba(0,0,0,0.87);
        letter-spacing: 1px;
        line-height: 24px;
        padding: 0 30px;
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
      padding: 36px 80px;

      z-index: 30;

      & > .menu-title {
        font-size: 18px;
        color: rgba(0,0,0,0.87);
        letter-spacing: 1px;
      }
      &-year {
        width: 33.25px;
      }

      &-list {
        margin-top: 105px;
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

        & .menu-title {
          margin-left: 28px;
        }
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

    .menu-enter-active, .menu-leave-active {
      transition: transform .5s;
    }
    .menu-enter, .menu-leave-active {
      transform: translate3d(100%, 0, 0);
    }

    .curtain-enter-active, .curtain-leave-active {
      transition: opacity .5s;
    }
    .curtain-enter, .curtain-leave-active {
      opacity: .01;
    }
  }
</style>

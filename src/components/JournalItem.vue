<template lang="pug">
  .journal-single
    .menu-burger(
      ref="burgerRight"
      @click="onMenuToggle"
      v-html="require('assets/images/burger-right.inline.svg')"
      )

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
                .menu-dotBg(v-if="tempPost.id == post.id")
              | {{tempPost.title}}
  
    .journal-content(v-bind:class="{'content-menu': nav.menuRightOpened}")
      .journal-content-image
        img(
          v-bind:src="'/assets/posts/' + post.id + '/' + post.image"
          v-on:load="onImgLoaded"
          )
      .journal-content-info
        .journal-content-title
          | {{post.title}}
        .journal-content-date
          | {{post.date}}
        .journal-content-titleBig
          | {{post.title}}
        .journal-content-author
          | By {{post.author}}
        .journal-content-text(v-html="post.text")
</template>

<script>
  import {onLoad} from 'ducks/nav';
  import {store, router} from 'index';
  import {posts, getPost} from 'store/fixtures';


  export default {
    name: "JournalItemComponent",
    
    data () {
      return {
        posts: posts.slice(),
        post: getPost(this.$route.params.post),
        nav: this.$select('nav'),
        
        burgerLines13: null,
        burgerArrow: null
      }
    },
    
    mounted () {
      this.burgerLines13 = this.$refs.burgerRight.querySelectorAll('.line13');
      this.burgerArrow = this.$refs.burgerRight.querySelector('.arrow');
      
      this.posts.reverse();
    },
    
    methods: {
      onImgLoaded () {
        store.dispatch(onLoad(100));
      },
  
      onMenuToggle () {
        if (this.nav.menuRightOpened)
          store.actions.nav.menuRightClose();
        else
          store.actions.nav.menuRightOpen();
      },
  
      onCurtainClick () {
        store.actions.nav.menuRightClose();
      },
  
      onMenuItemClick (post) {
        store.actions.nav.menuRightClose();
        this.post = post;
        history.replaceState({path: "/journal/" + this.post.id}, "post.id", "/journal/" + this.post.id);
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
      
      z-index: 20;
      
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
  .journal-single {
    width: 100%;
    height: 100%;
    background: white;

    overflow-y: scroll;
    overflow-x: hidden;

    padding: 0 6% 5vw;

    .journal-content {
      padding: 26px 0;

      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
  
      transition: transform .5s;
  
      &-image {
        margin-top: 46px;
    
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
    
      &-title {
        font-size: 18px;
        color: rgba(0,0,0,0.87);
        letter-spacing: 1px;
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

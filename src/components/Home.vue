<template lang="pug">
  .home
    .dots(v-bind:class="{'dots-inverse': portfolio.showContacts}")
      .dot(
        v-for="(category, catIndexD) of categories"
        v-bind:class="{'dot-active': catIndexD == portfolio.category}"
        @click="onDotClick(catIndexD)"
        )
      .dot.dot-square(
        v-bind:class="{'dot-active': portfolio.showContacts}"
        @click="onDotClick(categories.length)"
      )

    transition(
      v-bind:css="false"
      v-on:before-enter="scrollBeforeEnter"
      v-on:enter="scrollEnter"
      v-on:leave="scrollLeave"
      )
      router-link.category(
        v-for="(category, catIndex) of categories"
        v-bind:key="catIndex"
        v-if="catIndex == portfolio.category"
        v-bind:to="'/gallery/' + category.name"
        )

        .bg
        .slide(
          v-for="(slide, slIndex) of category.slides"
          v-bind:key="slIndex"
          )
          transition(name="title" appear)
            .slide-title(v-show="slIndex == slideNum")
              | {{category.name}}
              span {{slide.name}}
          transition(name="slide")
            .slide-img(
              v-show="slIndex == slideNum"
              v-bind:style="{ backgroundImage: 'url(assets/categories/' + category.name + '/slides/' + slide.image + ')' }"
              )
      contacts-component(v-if="portfolio.showContacts")
</template>
<script>
  import Velocity from 'velocity-animate';

  import {store} from 'index';
  import {categories} from 'store/fixtures';
  import {onLoad} from 'ducks/nav';
  import ScrollHandler from 'utils/scrollhandler';
  import ContactsComponent from 'components/Contacts';


  export default {
    name: "HomeComponent",

    components: {
      ContactsComponent
    },

    data () {
      return {
        categories,
        portfolio: this.$select('portfolio'),

        category: null,
        slideNum: 0,
        slidesLength: 1,

        timer: 0,

        scrollHandler: null
      }
    },

    mounted () {
      this.onCatUpdate();

      this.scrollHandler = new ScrollHandler(
        store.actions.portfolio.categoryNext,
        store.actions.portfolio.categoryPrev
      );

      let loadCnt = 0;


      categories.forEach((cat) => {
        cat.slides.forEach((slide) => {
          let img = new Image();
          img.onload = () => {
            loadCnt++;
            if (loadCnt == this.slidesLength)
              store.dispatch(onLoad(100));
            else
              store.dispatch(onLoad(loadCnt * 100 / this.slidesLength));
          };
          img.src = 'assets/categories/' + cat.name + '/slides/' + slide.image;
        })
      })

    },

    beforeDestroy () {
      this.scrollHandler.destroy();
    },

    methods: {
      loadOthers() {
        for (let cat of this.categories) {
          if (cat == this.category)
            continue;

          for (let slide of cat.slides) {
            let img = new Image();
            img.src = 'assets/categories/' + cat.name + '/slides/' + slide.image;
          }
        }
      },

      onCatUpdate () {
        if (this.portfolio.showContacts)
          return;
        this.category = this.categories[this.portfolio.category];
        this.slidesLength = this.category.slides.length;
        this.timer = setInterval(() => this.slideNext(), 5000);
      },

      slideNext () {
        if (this.slideNum >= this.slidesLength - 1)
          this.slideNum = 0;
        else
          this.slideNum++;
      },

      scrollBeforeEnter (el) {
        let value = this.portfolio.direction === 'down' ? '100%' : "-100%";
        el.style.transform = `translate3d(0, ${value}, 0)`;
      },
      scrollEnter (el, done) {
        let value = this.portfolio.direction === 'down' ? '99%' : "-99%";
        Velocity(el, { translateY: [0, value], translateZ: 0 }, { duration: 400, complete: done });
      },
      scrollLeave (el, done) {
        let value = this.portfolio.direction === 'down' ? '-100%' : "100%";
        Velocity(el, { translateY: value, translateZ: 0 }, { duration: 400, complete: done });
      },

      onDotClick (catIndex) {
        let diff = catIndex - this.portfolio.category;
        if (diff < 0) {
          for (let i = 0; i < -diff; i++) {
            setTimeout(store.actions.portfolio.categoryPrev, i*400);
          }
        } else if (diff > 0) {
          for (let i = 0; i < diff; i++) {
            setTimeout(store.actions.portfolio.categoryNext, i*400);
          }
        }
      }
    },

    watch: {
      'portfolio.category': {
        handler () {
          clearInterval(this.timer);
          this.onCatUpdate();
        }
      }
    }
  }
</script>
<style lang="scss" scoped rel="stylesheet/scss">
  .home {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    .category {
      display: block;
      position: absolute;
      top: 0;
      left: 216px;
      height: 100%;
      width: 100vw;
      overflow: hidden;

      .bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.38;

        z-index: 9;
      }

      .slide-title {
        font-family: 'Marvel', sans-serif;
        font-weight: bold;
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 1px;
        text-transform: uppercase;

        display: flex;
        flex-flow: column nowrap;

        position: absolute;
        left: 78px;
        bottom: 134px;

        z-index: 10;

        span {
          text-transform: none;
          margin-top: 6px;

          font-family: 'Work Sans', sans-serif;
          font-weight: 500;
          font-size: 22px;
          color: rgba(255,255,255,0.70);
          letter-spacing: 1px;
        }
      }

      .slide-img {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background: center center no-repeat / cover;

        animation-name: starting;
        animation-duration: 4s;
        animation-fill-mode: backwards;
      }
    }

    .dots {
      position: absolute;
      top: 50%;
      right: 36px;
      transform: translateY(-50%);

      z-index: 10;

      .dot {
        border: 1px solid #FFFFFF;
        height: 8px;
        width: 8px;
        cursor: pointer;
        border-radius: 100px;

        margin-bottom: 24px;
        display: block;

        transition: background-color .5s, border-color .5s;

        &.dot-square {
          margin-bottom: 0;
          border-radius: 0;
        }

        &.dot-active {
          background: #FFFFFF;
        }
      }
    }

    .dots-inverse {
      .dot {
        border-color: #707070;

        &.dot-active {
          background: #707070;
        }
      }
    }
  }

  @keyframes starting {
    0% {
      transform: translate3d(-175px, 0, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }


  .slide-enter-active {
    transition: opacity 1s ease, transform 4s ease;
  }

  .slide-leave-active {
    transition: opacity 1s ease-in, transform 4s ease;
  }

  .slide-enter {
    opacity: 0;
    transform: translate3d(-175px, 0, 0);
  }

  .slide-leave-active {
    opacity: 0;
  }


  .title-enter-active {
    transition: opacity 1s ease 1s, transform 1s ease 1s;
  }

  .title-leave-active {
    transition: opacity 1s;
  }

  .title-enter {
    opacity: 0;
    transform: translate3d(0, 50px, 0);
  }

  .title-leave-active {
    opacity: 0;
  }


  .scroll-enter-active {
    transition: transform 2s linear;
  }

  .scroll-leave-active {
    transition: transform 2s linear .05s;
  }

  .scroll-enter {
    transform: translate3d(0, 100%, 0);
  }

  .scroll-leave-active {
    transform: translate3d(0, -100%, 0);
  }
</style>

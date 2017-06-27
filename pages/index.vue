<template lang="pug">
  .home
    .dots(v-bind:class="{'dots-inverse': portfolio.showContacts}")
      .dot(
        v-for="(category, catIndexD) of categories"
        v-bind:class="{'dot-active': catIndexD == categoryId}"
        @click="onDotClick(catIndexD)"
        )
      .dot.dot-square(
        v-bind:class="{'dot-active': portfolio.showContacts}"
        @click="onDotClick(categories.length)"
      )

    transition-group(
      v-bind:css="false"
      v-on:before-enter="scrollBeforeEnter"
      v-on:enter="scrollEnter"
      v-on:leave="scrollLeave"
      name="slide"
      appear
      )
      nuxt-link.category(
        v-for="(category, catIndex) of categories"
        v-bind:key="catIndex"
        v-if="catIndex == portfolio.category"
        v-bind:to="'/gallery/' + category.name"
        )


        .bg
        .slide
          .slide-img(
            v-bind:style="{ backgroundImage: 'url(' + category.cover + ')' }"
            )
      contacts-component(v-if="portfolio.showContacts", key="contacts")
</template>

<script>
  var Velocity = process.BROWSER_BUILD ? Velocity = require('velocity-animate') : null
  
  import ScrollHandler from '~/utils/scrollhandler';
  import {
    mapMutations,
    mapGetters
  } from 'vuex';
  import ContactsComponent from '~/components/Contacts';
  import {
    db
  } from '~/db'

  import firebase from 'firebase';
  
  const $categories = db.ref('categories');
  const $contacts = db.ref('contacts');
  const $about = db.ref('about');
  
  export default {
    name: "HomeComponent",
    layout: 'home',
    middleware: ['switchPortfolioItems'],
  
    components: {
      ContactsComponent
    },
  
    fetch({
      store
    }) {
      return store.dispatch('setCategoriesRef', $categories).then(() => {
        store.dispatch('setContactsRef', $contacts)
      })
    },
  
  
    data() {
      return {
        baseCats: null,
        category: null,
        slideNum: 0,
        slidesLength: 1,
  
        timer: 0,
  
      }
    },
  
    mounted() {
      this.makeMenuFixed();
      this.menuOpen();
      this.onCatUpdate();
      this.onLoad(100);
      this.scrollHandler = new ScrollHandler(
        this.categoryNext,
        this.categoryPrev
      );
    },
  
    beforeDestroy() {
      this.scrollHandler.destroy();
    },
  
    methods: {
  
      onCatUpdate() {
        if (this.portfolio.showContacts)
          return;
        this.category = this.categories[this.categoryId];
        
      },
  
      scrollBeforeEnter(el) {
        let value = this.portfolio.direction === 'down' ? '145px' : "-145px";
        el.style.transform = `translate3d(${value}, 0, 0)`;
        el.style.opacity = '0';
      },
      scrollEnter(el, done) {
        let value = this.portfolio.direction === 'down' ? '145px' : "-145px";
        Velocity(el, {
          translateX: [0, value],
          translateZ: 0,
          opacity: 1
        }, {
          duration: 800,
          complete: done
        });
      },
      scrollLeave(el, done) {
        let value = this.portfolio.direction === 'down' ? '-145px' : "145px";
        Velocity(el, {
          translateX: value,
          translateZ: 0,
          opacity: 0
        }, {
          duration: 800,
          complete: done
        });
      },
  
      onDotClick(catIndex) {
        let diff = catIndex - this.categoryId;
        if (diff < 0) {
          for (let i = 0; i < -diff; i++) {
            setTimeout(this.categoryPrev, i * 400);
          }
        } else if (diff > 0) {
          for (let i = 0; i < diff; i++) {
            setTimeout(this.categoryNext, i * 400);
          }
        }
  
      },
  
      ...mapMutations([
        'categoryNext',
        'categoryPrev',
        'makeMenuFixed',
        'menuOpen',
        'onLoad'
      ])
  
    },
  
    computed: {
      portfolio() {
        return this.$store.state.firebase
      },
  
      nav() {
        return this.$store.state.nav
      },
  
      categoryId() {
        return this.$store.state.firebase.category
      },
  
      isContactsOpen() {
        return this.portfolio.showContacts;
      },
  
      ...mapGetters(['categories', 'contacts'])
    },
  
    watch: {
      'firebase.category': {
        handler() {
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
        display: none;
        span {
          text-transform: none;
          margin-top: 6px;
          font-family: 'Work Sans', sans-serif;
          font-weight: 500;
          font-size: 22px;
          color: rgba(255, 255, 255, 0.70);
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
      bottom: 36px;
      left: calc(50% + 108px);
      transform: translateX(-50%);
      z-index: 10;
      .dot {
        border: 1px solid #FFFFFF;
        height: 8px;
        width: 8px;
        display: inline-block;
        cursor: pointer;
        border-radius: 100px;
        margin-right: 24px;
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

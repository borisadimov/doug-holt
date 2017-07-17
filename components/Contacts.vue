<template lang="pug">
  .contacts
    .contacts-close(@click="onClose" v-if="!!nav.pagePrev")
    .contacts-studio(@click="test")
      | {{contacts.name}}
    .contacts-address
      | {{contacts.address}}


    .contacts-info
      | Contact
      a.contacts-infoItem(href="tel:+19176501132")
        | {{contacts.phone}}
      a.contacts-infoItem(href="mailto:douglasleeholt@gmail.com")
        | {{contacts.email}}

    .contacts-follow
      | Follow
      .contacts-socials
        a.contacts-ig(:href="contacts.instagram" target="_blank")
        | /
        a.contacts-fb(:href="contacts.facebook" target="_blank")
        | /
        a.contacts-tw(:href="contacts.twitter" target="_blank")
</template>

<script>
  import { mapMutations, mapGetters } from 'vuex';
  
  export default {
    name: "ContactsComponent",

    data () {
      return {

      }
    },

    mounted () {
      this.onLoad(100);
    },


    methods: {
      onClose () {
        this.categorySet(0);
      },

      test() {
        this.$store.dispatch('setContactsRef', $contacts)
      },

      ...mapMutations([
        'onLoad',
        'categorySet'
      ])
    },

    computed: {
      ...mapGetters(['contacts']),

      nav() {
        return this.$store.state.nav
      },

      portfolio() {
        return this.$store.state.portfolio
      },

      
    }
  }
</script>

<style lang="scss" scoped rel="stylesheet/scss">
  .contacts {
    margin-left: 216px;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f5f5f5;

    opacity: 1;

    font-size: 28px;
    color: rgba(0,0,0,0.87);
    letter-spacing: 0.2px;
    line-height: 34px;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;

    padding: 0 78px;

    z-index:  10;

    &-studio {
      font-weight: 600;
    }

    &-address {
      margin-top: 6px;
    }

    &-info,
    &-follow {
      font-family: 'Marvel', sans-serif;
      font-weight: bold;
      font-size: 16px;
      color: rgba(0,0,0,0.87);
      letter-spacing: 1.55px;
      line-height: 18px;
      text-transform: uppercase;

      margin-top: 38px;
      cursor: default;
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;

      &Item {
        text-transform: none;

        font-family: 'Work Sans', sans-serif;
        font-weight: 500;
        font-size: 30px;
        color: #000;
        letter-spacing: 0.2px;
        line-height: 30px;

        margin-top: 11px;
        padding-bottom: 4px;

        border-bottom: 1px solid #000;
      }

      &Item:last-child {
        margin-top: 14px;
      }
    }

    &-follow {
      margin-top: 41px;
    }

    &-socials {
      margin-top: 14px;

      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      font-size: 30px;
      color: rgba(0,0,0,0.24);
      letter-spacing: 2.91px;
      line-height: 18px;
    }

    &-ig {
      background: url('~assets/images/ig.svg') no-repeat center center / contain;
      width: 26px;
      height: 26px;
      margin-right: 14px;
    }

    &-fb {
      background: url('~assets/images/fb.svg') no-repeat center center / contain;
      width: 15px;
      height: 28px;
      margin-left: 11px;
      margin-right: 15px;
    }

    &-tw {
      background: url('~assets/images/tw.svg') no-repeat center center / contain;
      width: 26px;
      height: 22px;
      margin-left: 10px;
    }

    &-ig,
    &-fb,
    &-tw {
      opacity: 0.7;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 1;
      }
    }

    &-close {
      background: url('~assets/images/cross-black.svg') no-repeat center center / contain;
      height: 24px;
      width: 24px;
      position: absolute;
      top: 12vh;
      left: 78px;
      cursor: pointer;

      &:hover {
        opacity: .6;
      }
    }
  }

  .v-enter-active {
    transition: transform.5s;
  }
  .v-leave-active {
    transition: transform .5s;
  }
  .v-enter, .v-leave-active {
    transform: translate3d(0, 100vh, 0);
  }

  @media (max-width: 767px) {
    .contacts {
      margin-left: 0;
      padding: 0 30px 30px 30px;

      &-close {
        width: 20px;
        height: 20px;
        left: 30px;
      }

      &-studio {
        font-size: 24px;
      }

      &-address {
        font-size: 18px;
      }

      &-infoItem {
        font-size: 18px;
      }
    }
  }
</style>

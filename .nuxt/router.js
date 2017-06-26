'use strict'

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const _48b1a7a4 = () => import('/Users/valery/Developer/nuxt-doug-holt/pages/index.vue' /* webpackChunkName: "pages/index" */)

const _39274356 = () => import('/Users/valery/Developer/nuxt-doug-holt/pages/journal/index.vue' /* webpackChunkName: "pages/journal" */)

const _33617149 = () => import('/Users/valery/Developer/nuxt-doug-holt/pages/About.vue' /* webpackChunkName: "pages/About" */)

const _78aefa6e = () => import('/Users/valery/Developer/nuxt-doug-holt/pages/admin/index.vue' /* webpackChunkName: "pages/admin" */)

const _4ed6aae7 = () => import('/Users/valery/Developer/nuxt-doug-holt/pages/admin/contacts.vue' /* webpackChunkName: "pages/admin-contacts" */)

const _58f71fa9 = () => import('/Users/valery/Developer/nuxt-doug-holt/pages/admin/about.vue' /* webpackChunkName: "pages/admin-about" */)

const _b313831e = () => import('/Users/valery/Developer/nuxt-doug-holt/pages/gallery/gallery.vue' /* webpackChunkName: "pages/gallery-gallery" */)

const _7b11a059 = () => import('/Users/valery/Developer/nuxt-doug-holt/pages/gallery/_id.vue' /* webpackChunkName: "pages/gallery-id" */)

const _218bb984 = () => import('/Users/valery/Developer/nuxt-doug-holt/pages/journal/_id.vue' /* webpackChunkName: "pages/journal-id" */)



const scrollBehavior = (to, from, savedPosition) => {
  // savedPosition is only available for popstate navigations.
  if (savedPosition) {
    return savedPosition
  } else {
    let position = {}
    // if no children detected
    if (to.matched.length < 2) {
      // scroll to the top of the page
      position = { x: 0, y: 0 }
    }
    else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
      // if one of the children has scrollToTop option set to true
      position = { x: 0, y: 0 }
    }
    // if link has anchor,  scroll to anchor by returning the selector
    if (to.hash) {
      position = { selector: to.hash }
    }
    return position
  }
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
  		{
			path: "/",
			component: _48b1a7a4,
			name: "index"
		},
		{
			path: "/journal",
			component: _39274356,
			name: "journal"
		},
		{
			path: "/About",
			component: _33617149,
			name: "About"
		},
		{
			path: "/admin",
			component: _78aefa6e,
			name: "admin"
		},
		{
			path: "/admin/contacts",
			component: _4ed6aae7,
			name: "admin-contacts"
		},
		{
			path: "/admin/about",
			component: _58f71fa9,
			name: "admin-about"
		},
		{
			path: "/gallery/gallery",
			component: _b313831e,
			name: "gallery-gallery"
		},
		{
			path: "/gallery/:id?",
			component: _7b11a059,
			name: "gallery-id"
		},
		{
			path: "/journal/:id",
			component: _218bb984,
			name: "journal-id"
		}
    ]
  })
}

// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

// Layouts
import DefaultLayout from '~/layouts/Default.vue'

// Icons
import IconLight from '@/assets/images/light.svg?inline'

export default function (Vue, { router, head, isClient }) {
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout)

    // Icons
    Vue.component('IconLight', IconLight)

    // Apply directive
    Vue.directive('resize', {
        bind: function (element) {
            element.style.height = 'auto'
            element.style.height = element.scrollHeight + 'px'
        },
        inserted: function (element) {
            element.style.height = 'auto'
            element.style.height = element.scrollHeight + 'px'
        },
        update: function (element) {
            element.style.height = 'auto'
            element.style.height = element.scrollHeight + 'px'
        },
    })

    // Charset
    head.meta.push({
        name: 'charset',
        content: 'UTF-8'
    })

    // Viewport
    head.meta.push({
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
    })

    // Web app
    head.meta.push({
        name: 'apple-mobile-web-app-capable',
        content: 'yes'
    })
    head.meta.push({
        name: 'apple-mobile-web-app-title',
        content: 'HA Control'
    })
    head.meta.push({
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
    })
}

// Import SASS
import '~/assets/sass/style.scss'

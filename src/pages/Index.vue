<template>
    <Layout>
        <transition name="welcome">
            <div key="intro" v-if="isLoading">
                <div class="intro">
                    <Intro @done="isLoading = false" />
                </div>
            </div>

            <div class="layout" key="layout" v-else>
                <h1 class="logo">
                    <g-link to="/" title="HA Control">
                        <span class="logo__symbol">翻</span>
                        <span class="logo__wordmark">HA Control</span>
                    </g-link>
                </h1>

                <button class="toggle-sidebar" :class="{ 'toggle-sidebar--active': showConsole }" @click="showConsole = !showConsole">
                    <IconSettings />
                </button>

                <div class="panels">
                    <div class="character">
                        <button @click.prevent="speak(output)">
                            <IconVolume />
                        </button>
                    </div>
                    <div class="panel panel--input">
                        <div class="content">
                            <textarea name="input" v-model="input" v-resize rows="1"></textarea>
                        </div>
                    </div>
                    <div class="panel panel--output">
                        <div class="content">
                            <div v-html="$options.filters.withLineBreaks(output)"></div>

                            <button v-if="shareIsAvailable" @click="share()" type="button" name="shareOutput">
                                <IconShare />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
                <div class="sidebar" :class="{ 'sidebar--active': showConsole }">
                    <div class="sidebar__inner">
                        <Console :corrections="corrections" />
                    </div>
                </div>
            </div>
        </transition>
    </Layout>
</template>

<script>
import rules from '../utils/rules'
import Device from '../components/Device'

export default {
    metaInfo: {
        title: 'HA Control',
        meta: [
            {
                name: 'description', content: 'Home Assistans (HomeKit) controller.'
            },
        ],
    },

    components: {
        'Device': Device,
    },

    data: function () {
        return {
            isLoading: true,
            showConsole: false,
            input: 'Jag heter Vincent',
            shareIsAvailable: false,
            synth: null,
            corrections: {},
        }
    },

    computed: {
        output () {
            let separator = ' '
            let words = this.input.split(separator)

            this.corrections = {}

            return words.map((word, index) => {
                let original = word

                rules.forEach(rule => {
                    word = word.replace(rule.find, match => {
                        let corrections = this.corrections[index]

                        if (!corrections) {
                            corrections = {
                                word: original,
                                corrections: []
                            }
                        }

                        corrections.corrections.push({
                            was: match,
                            became: rule.replace(match),
                            description: rule.description
                        })

                        this.corrections[index] = corrections

                        return rule.replace(match)
                    })
                })

                return word
            }).join(separator)
        },
    },

    filters: {
        withLineBreaks: function (value) {
            if (!value) return

            return (value.toString()).replace(/\n/gi, '<br>')
        },
    },

    beforeMount: function () {
        this.synth = window.speechSynthesis
    },

    mounted: function () {
        this.shareIsAvailable = this.isShareApiAvailable()
    },

    watch: {
    },

    methods: {
        isShareApiAvailable: function () {
            return !!(window.navigator && window.navigator.share)
        },

        share: function () {
            let title = document.title
            let url = document.querySelector('link[rel=canonical]') ? document.querySelector('link[rel=canonical]').href : document.location.href

            navigator.share({
                title: title,
                url: url,
            }).then(() => {
                // Ready for callback
            })
        },

        speak: function (text) {
            let utterance = new SpeechSynthesisUtterance(text)
            let voices = this.synth.getVoices()

            utterance.pitch = 1
            utterance.rate = 1

            if (voices[18]) {
                utterance.voice = voices[18]
            }

            if (voices[58]) {
                utterance.voice = voices[58]
            }

            this.synth.speak(utterance)
        },
    }
}
</script>

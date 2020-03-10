<template>
    <div class="intro__symbol" :style="styles">
        {{ symbol }}
    </div>
</template>

<script>
    export default {
        data() {
            return {
                symbol: '日',
                count: 0,
            }
        },

        computed: {
            styles() {
                let positive = this.count
                let negative = (this.count - (this.count * 2))

                let up = negative + 'rem 0 0 #2be2e2'
                let down = positive + 'rem 0 0 #D41D1D'

                return {
                    'text-shadow': up + ', ' + down,
                }
            },
        },

        mounted() {
            let timing = 100
            let symbols = [
                '本',
                '語',
                'に',
                '翻',
                '訳',
                'す',
                'る',
                '日',
                '本',
                '語',
                'に',
                '翻',
                '訳',
                'す',
                'る',
                '翻',
            ]

            symbols.forEach((item, index) => {
                setTimeout(() => {
                    this.symbol = item
                    this.count++
                }, index * timing)
            })

            setTimeout(() => {
                this.$emit('done')
            }, (symbols.length + 1) * timing)
        },
    }
</script>

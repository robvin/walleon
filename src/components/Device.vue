<template>
    <button class="device" :class="classes" @click="toggle()">
        <div class="device__icon">
            <IconLight />
        </div>
        <div class="device__label">
            {{ name }}
        </div>
        <div class="device__description">
            {{ active ? percentage + '%' : '0%' }}
        </div>
    </button>
</template>

<script>
    export default {
        data() {
            return {
                loading: true,
                active: false,
                name: '',
                percentage: 0,
            }
        },

        computed: {
            classes() {
                return {
                    'device--loading': this.loading,
                    'device--active': this.active,
                }
            },
        },

        mounted() {
            const rooms = [
                'Living Room',
                'Hallway',
                'Entrance',
                'Dining room',
                'Garage',
            ]

            this.name = (rooms[Math.floor(Math.random() * rooms.length)]) + ' Light'
            this.percentage = Math.floor(Math.random() * 10) * 10

            setTimeout(() => {
                this.loading = false
                this.active = Math.random() > 0.5
            }, Math.random() * 1000)
        },

        methods: {
            toggle() {
                this.loading = true

                setTimeout(() => {
                    this.loading = false
                    this.active = !this.active
                }, Math.random() * 3000)
            },
        },
    }
</script>

<template>
  <button class="device" :class="classes" @click="toggle()" :disabled="loading">
    <div class="device__icon">
      <img svg-inline src="@/assets/images/light.svg" />
    </div>
    <div class="device__label">
      {{ device.name }}
    </div>
    <div class="device__description">
      Secondary info
    </div>
  </button>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Device",

  data() {
    return {
      loading: false
    };
  },

  props: ["device"],

  computed: {
    active(): boolean {
      return this.device.state === "on";
    },

    classes(): object {
      return {
        "device--loading": this.loading,
        "device--active": this.active
      };
    }
  },

  methods: {
    toggle() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.device.state = this.active ? "off" : "on";
      }, Math.random() * 3000);
    }
  }
});
</script>

<template>
  <button class="device" :class="classes" @click="toggle()" :disabled="loading">
    <div class="device__icon" :class="{ 'bg-yellow': active }">
      <img svg-inline src="@/assets/images/light.svg" />
    </div>
    <div class="device__info">
      <span class="device__room">{{ device.domain }}</span>
      <span class="device__name">{{ device.name }}</span>
      <span class="device__state">{{ device.state }}</span>
    </div>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { Device as DeviceType } from "@/types";

export default Vue.extend({
  name: "LightDevice",

  props: {
    device: {
      type: Object as () => DeviceType,
      required: true
    }
  },

  data() {
    return {
      loading: false
    };
  },

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

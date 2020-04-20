<template>
  <card :active="active" :loading="loading" :disabled="loading" @clicked="toggle()">
    <div class="device__icon" :class="{ 'bg-green': active }">
      <img svg-inline src="@/assets/images/plug.svg" />
    </div>
    <div class="device__info">
      <span class="device__room">{{ device.domain }}</span>
      <span class="device__name">{{ device.name }}</span>
      <span class="device__state">{{ device.state }}</span>
    </div>
  </card>
</template>

<script lang="ts">
import Vue from "vue";
import { Device as DeviceType } from "@/types";
import Card from "@/components/Card.vue";

export default Vue.extend({
  name: "SwitchDevice",

  components: {
    Card
  },

  props: {
    device: {
      type: Object as () => DeviceType,
      required: true
    }
  },

  data() {
    return {
      loading: false as boolean
    };
  },

  computed: {
    active(): boolean {
      return this.device.state === "on";
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

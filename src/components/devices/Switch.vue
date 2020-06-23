<template>
  <button class="device" :class="classes" @click="toggle" :disabled="loading">
    <div class="device__icon" :class="{ 'bg-green': active }">
      <img svg-inline src="@/assets/images/plug.svg" />
    </div>
    <div class="device__info">
      <span class="device__room">{{ domain }}</span>
      <span class="device__name">{{ device.attributes.friendly_name }}</span>
      <span class="device__state">{{ device.state }}</span>
    </div>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import { HassEntity } from "@/types";
import { grabSubstring } from "@/util/helpers";
import HaService from "@/services/ha-service";

export default Vue.extend({
  name: "LightDevice",

  props: {
    device: {
      type: Object as () => HassEntity,
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
    },

    entityId(): string {
      return this.device.entity_id;
    },

    domain(): string {
      return grabSubstring(this.entityId);
    }
  },

  methods: {
    toggle() {
      this.loading = true;

      HaService.toggleDevice(this.entityId).then(() => {
        this.loading = false;
      });
    }
  }
});
</script>

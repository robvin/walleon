<template>
  <button class="device" :class="classes" @click="toggle" :disabled="loading">
    <div class="device__icon" :class="{ 'bg-yellow': active }">
      <img svg-inline src="@/assets/images/light.svg" />
    </div>
    <div v-if="device.attributes.supported_features === 1" class="device__percentage">
      <Progress :value="brightness" />
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
import Progress from "@/components/Progress.vue";
import { grabSubstring } from "@/util/helpers";

export default Vue.extend({
  name: "LightDevice",

  components: {
    Progress
  },

  props: {
    device: {
      type: Object as () => HassEntity,
      required: true
    },
    toggleCb: {
      type: Function
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

    domain(): string {
      return grabSubstring(this.device.entity_id);
    },

    brightness(): number {
      const {
        state,
        attributes: { supported_features: supportedFeatures, brightness }
      } = this.device;

      if (state === "off") {
        return 0;
      } else if (supportedFeatures && !brightness) {
        return 100;
      }

      return Math.floor((brightness / 255) * 100);
    }
  },

  methods: {
    toggle() {
      this.loading = true;

      if (this.toggleCb) {
        this.toggleCb(this.device.entity_id).then(() => {
          this.loading = false;
        });
      }
    }
  }
});
</script>

<template>
  <component :is="deviceComponent" :device="device"></component>
</template>

<script lang="ts">
import Vue from "vue";
import { Device as DeviceType } from "@/types";
import DefaultDevice from "@/components/devices/Default.vue";
import LightDevice from "@/components/devices/Light.vue";
import SwitchDevice from "@/components/devices/Switch.vue";

export default Vue.extend({
  name: "Device",

  props: {
    device: {
      type: Object as () => DeviceType,
      required: true
    }
  },

  computed: {
    deviceComponent() {
      const deviceTypes = new Map([
        ["default", DefaultDevice],
        ["light", LightDevice],
        ["switch", SwitchDevice]
      ]);

      return deviceTypes.get(deviceTypes.has(this.device.domain) ? this.device.domain : "default");
    }
  }
});
</script>

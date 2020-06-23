<template>
  <component :is="deviceComponent" :device="device"></component>
</template>

<script lang="ts">
import Vue from "vue";
import { HassEntity } from "@/types";
import DefaultDevice from "@/components/devices/Default.vue";
import LightDevice from "@/components/devices/Light.vue";
import SwitchDevice from "@/components/devices/Switch.vue";
import { grabSubstring } from "@/util/helpers";

export default Vue.extend({
  name: "Device",

  props: {
    device: {
      type: Object as () => HassEntity,
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

      const entityId = this.device.entity_id;
      return deviceTypes.get(
        deviceTypes.has(grabSubstring(entityId)) ? grabSubstring(entityId) : "default"
      );
    }
  }
});
</script>

<template>
  <card :active="active" :loading="loading" :disabled="loading" @clicked="toggle" @moved="onMoved">
    <div class="device__icon" :class="{ 'bg-yellow': active }">
      <img svg-inline src="@/assets/images/light.svg" />
    </div>
    <div v-if="device.attributes.supported_features === 33" class="device__percentage">
      <Progress :value="brightness" />
    </div>
    <div class="device__info">
      <span class="device__room">{{ domain }}</span>
      <span class="device__name">{{ device.attributes.friendly_name }}</span>
      <span class="device__state">{{ device.state }}</span>
    </div>

    <template v-slot:modal>
      <h1 class="large-title">{{ brightness }}%</h1>
      <DeviceTable :device="device" />
    </template>
  </card>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "@/components/Card.vue";
import DeviceTable from "@/components/DeviceTable.vue";
import { HassEntity } from "@/types";
import Progress from "@/components/Progress.vue";
import { grabSubstring } from "@/util/helpers";
import HaService from "@/services/haService";

export default Vue.extend({
  name: "LightDevice",

  components: {
    Card,
    DeviceTable,
    Progress
  },

  props: {
    device: {
      type: Object as () => HassEntity,
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
    },

    entityId(): string {
      return this.device.entity_id;
    },

    domain(): string {
      return grabSubstring(this.entityId);
    },

    brightness(): number {
      const {
        attributes: { supported_features: supportedFeatures, brightness }
      } = this.device;

      if (!this.active) {
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

      HaService.toggleDevice(this.entityId).then(() => {
        this.loading = false;
      });
    }
  }
});
</script>

<template>
  <card :active="active" :loading="loading" :disabled="loading" @clicked="toggle()">
    <div class="device__info">
      <span class="device__room">{{ domain }}</span>
      <span class="device__name">{{ device.attributes.friendly_name }}</span>
      <span class="device__state">{{ device.state }}</span>
    </div>

    <template v-slot:modal>
      <DeviceTable :device="device" />
    </template>
  </card>
</template>

<script lang="ts">
import Vue from "vue";
import Card from "@/components/Card.vue";
import DeviceTable from "@/components/DeviceTable.vue";
import { HassEntity } from "@/types";
import { grabSubstring } from "@/util/helpers";
import HaService from "@/services/haService";

export default Vue.extend({
  name: "DefaultDevice",

  components: {
    Card,
    DeviceTable
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

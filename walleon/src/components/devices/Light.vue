<template>
  <card
    :active="active"
    :loading="loading"
    :disabled="loading"
    @clicked="onClicked"
    @released="onReleased"
    @moved="onMoved"
  >
    <div class="device__icon" :class="{ 'bg-yellow': active }">
      <img svg-inline src="@/assets/images/light.svg" />
    </div>
    <div class="device__percentage">
      <Progress :value="device.state === 'on' ? 0.75 : 0" :min="0" :max="1" />
    </div>
    <div class="device__info">
      <span class="device__room">{{ device.domain }}</span>
      <span class="device__name">{{ device.name }}</span>
      <span class="device__state">{{ device.state }}</span>
    </div>

    <template v-slot:modal>
      {{ device }}
    </template>
  </card>
</template>

<script lang="ts">
import Vue from "vue";
import { Device as DeviceType } from "@/types";
import Card from "@/components/Card.vue";
import Progress from "@/components/Progress.vue";

export default Vue.extend({
  name: "LightDevice",

  components: {
    Card,
    Progress
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
    onClicked(event: MouseEvent) {
      console.log("Clicked", event);
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.device.state = this.active ? "off" : "on";
      }, Math.random() * 3000);
    },

    onReleased(event: MouseEvent) {
      console.log("Released", event);
    },

    onMoved(event: MouseEvent) {
      console.log("Moved", event);
    }
  }
});
</script>

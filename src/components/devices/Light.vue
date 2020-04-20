<template>
  <card
    :active="active"
    :loading="loading"
    :disabled="loading"
    @clicked="onClicked"
    @moved="onMoved"
  >
    <div class="device__icon" :class="{ 'bg-yellow': active }">
      <img svg-inline src="@/assets/images/light.svg" />
    </div>
    <div class="device__percentage">
      <Progress :value="device.state === 'on' ? percentage : 0" :min="0" :max="1" />
    </div>
    <div class="device__info">
      <span class="device__room">{{ device.domain }}</span>
      <span class="device__name">{{ device.name }}</span>
      <span class="device__state">{{ device.state }}</span>
    </div>

    <template v-slot:modal>
      <h1 class="large-title">{{ Math.floor(percentage * 100) }}%</h1>
      <pre>
        {{ device }}
      </pre>
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
      loading: false as boolean,
      percentage: 0 as number
    };
  },

  computed: {
    active(): boolean {
      return this.device.state === "on";
    }
  },

  methods: {
    onClicked() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.device.state = this.active ? "off" : "on";
      }, Math.random() * 3000);
    },

    onMoved(event: TouchEvent | PointerEvent, x: number, y: number) {
      const percentage = this.percentage + -y / 150;

      if (percentage > 1) {
        this.percentage = 1;
      } else if (percentage < 0) {
        this.percentage = 0;
      } else {
        this.percentage = percentage;
      }
    }
  }
});
</script>

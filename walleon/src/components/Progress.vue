<template>
  <div class="progress" :class="classes">
    <span class="progress__value">{{ percentage }}%</span>
    <svg
      :width="size"
      :height="size"
      :viewPort="'0 0 ' + size + ' ' + size"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="progress__track"
        :r="radius"
        :cx="size / 2"
        :cy="size / 2"
        :stroke-width="strokeWidth"
      ></circle>
      <circle
        class="progress__fill"
        :r="radius"
        :cx="size / 2"
        :cy="size / 2"
        :stroke-width="strokeWidth"
        :stroke-dasharray="dasharray"
        :stroke-dashoffset="dashoffset"
      ></circle>
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Progress",

  props: {
    size: {
      type: Number,
      default: 48
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    value: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      strokeWidth: 2 as number
    };
  },

  computed: {
    radius(): number {
      return this.size / 2 - this.strokeWidth / 2;
    },

    dasharray(): number {
      return 2 * Math.PI * this.radius;
    },

    decimal(): number {
      const value = this.value - this.min;
      const max = this.max - this.min;

      return value / max;
    },

    dashoffset(): number {
      return this.dasharray * (1 - this.decimal);
    },

    percentage(): number {
      return 100 * this.decimal;
    },

    classes(): object {
      return {
        "progress--empty": !this.decimal,
        "progress--full": this.decimal === 1
      };
    }
  }
});
</script>

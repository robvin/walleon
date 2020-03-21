<template>
  <div class="panel">
    <div class="container" v-if="title">
      <div class="row">
        <div class="col-12">
          <h1 class="large-title">{{ title }}</h1>
        </div>
      </div>
    </div>

    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Panel",

  props: {
    title: {
      type: String,
      required: false
    }
  },

  data() {
    return {};
  }
});
</script>

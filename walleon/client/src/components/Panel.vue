<template>
  <div class="panel">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Panel",

  data() {
    return {};
  }
});
</script>

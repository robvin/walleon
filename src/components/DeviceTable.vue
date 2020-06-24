<template>
  <table class="device__table">
    <tbody>
      <tr>
        <th>Entity ID</th>
        <td>{{ device.entity_id }}</td>
      </tr>
      <tr>
        <th>Current state</th>
        <td>{{ device.state }}</td>
      </tr>
      <tr>
        <th>Name</th>
        <td>{{ device.attributes.friendly_name }}</td>
      </tr>
      <tr>
        <th>Supported features</th>
        <td>{{ device.attributes.supported_features }}</td>
      </tr>
      <tr>
        <th>Last changed</th>
        <td>{{ device.last_changed }}</td>
      </tr>
      <tr>
        <th>Last updated</th>
        <td>{{ device.last_updated }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from "vue";
import { HassEntity } from "@/types";

export default Vue.extend({
  name: "DeviceTable",

  props: {
    device: {
      type: Object as () => HassEntity,
      required: true
    }
  }
});
</script>

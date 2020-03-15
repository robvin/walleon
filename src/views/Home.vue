<template>
  <div class="layout">
    <Panel class="panel--1">
      <h1>21:31</h1>
      <h2 style="font-weight: normal;">Tisdag, 10 mars</h2>
      <h3 style="font-weight: normal; color: rgba(255,255,255,.7)">
        Känns som -4° med 0% risk för regn
      </h3>

      <h4 style="margin-top: 3rem;">Kalender</h4>
      <h3 style="color: rgba(255,255,255,.7)">
        Sophämtning imorgon 07.30
      </h3>
      <h3 style="color: rgba(255,255,255,.7)">
        Tvätt om 5 dagar på söndag kl. 19.00
      </h3>
    </Panel>
    <Panel v-for="(panel, index) in panels" :key="panel.id" class="panel--1">
      <h1>{{ index }}</h1>
      <div class="devices">
        <Device v-for="device in panel" :key="device.entityId" :device="device" />
      </div>
    </Panel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ha from "@/util/ha";
import { Device as DeviceType } from "@/types";
import Panel from "@/components/Panel.vue";
import Device from "@/components/Device.vue";

export default Vue.extend({
  name: "Home",

  components: {
    Panel,
    Device
  },

  data: () => ({
    devices: [] as DeviceType[]
  }),

  computed: {
    panels(): object {
      return this.devices.reduce((panels: { [key: string]: DeviceType[] }, device: DeviceType) => {
        (panels[device.domain] = panels[device.domain] || []).push(device);
        return panels;
      }, {});
    }
  },

  mounted(): void {
    ha.getDevices().then((devices: DeviceType[]) => {
      this.devices = devices;
    });
  }
});
</script>

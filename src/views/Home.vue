<template>
  <div class="layout">
    <Panel v-if="user.id !== undefined" class="panel--1" :title="'21:31'">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12">
            <h2 style="font-weight: normal;">Tisdag, 10 mars</h2>
            <h3 class="text-light-secondary">
              Känns som -4° med 0% risk för regn
            </h3>

            <h4 style="margin-top: 3rem;">Kalender</h4>
            <h3 class="text-light-secondary">
              Sophämtning imorgon 07.30
            </h3>
            <h3 class="text-light-secondary">
              Tvätt om 5 dagar på söndag kl. 19.00
            </h3>
          </div>
        </div>
      </div>
    </Panel>
    <Panel
      v-for="(panel, index) in panels"
      :key="index"
      class="panel--1"
      :title="panel.attributes.friendly_name"
    >
      <div class="container-fluid">
        <div class="row grid">
          <div class="col-6" v-for="(device, index) in panel.attributes.entity_id" :key="index">
            <Device :device="entities[device]" />
          </div>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { grabSubstring } from "@/util/helpers";
import { HassEntity, HassEntities, HassUser } from "@/types";
import Panel from "@/components/Panel.vue";
import Device from "@/components/Device.vue";
import HaService from "@/util/HaService";

export default Vue.extend({
  name: "Home",

  components: {
    Panel,
    Device
  },

  data: () => ({
    entities: {} as HassEntities,
    user: {} as HassUser
  }),

  computed: {
    panels(): HassEntity[] {
      const groups: HassEntity[] = [];

      Object.keys(this.entities).forEach(e => {
        if (grabSubstring(e) === "group") {
          groups.push(this.entities[e]);
        }
      });

      return groups;
    }
  },

  async mounted() {
    await HaService.authenticate();

    HaService.getUser().then((user: HassUser) => {
      this.user = user;
    });

    HaService.subscribeEntities((entities: HassEntities) => {
      this.entities = entities;
    });
  }
});
</script>

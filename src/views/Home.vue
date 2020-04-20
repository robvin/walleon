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
            <Device :device="entities[device]" :toggleCb="toggle" />
          </div>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  createConnection,
  callService,
  getAuth,
  getUser,
  subscribeEntities,
  ERR_HASS_HOST_REQUIRED
} from "home-assistant-js-websocket";
// import ha from "@/util/ha";
import { grabSubstring } from "@/util/helpers";
import { /*Device as DeviceType,*/ HassEntity, HassEntities, Connection } from "@/types";
import Panel from "@/components/Panel.vue";
import Device from "@/components/Device.vue";

export default Vue.extend({
  name: "Home",

  components: {
    Panel,
    Device
  },

  data: () => ({
    entities: {} as HassEntities,
    user: {} as object,
    connection: {} as Connection
  }),

  computed: {
    // panels(): object {
    //   return this.devices.reduce((panels: { [key: string]: DeviceType[] }, device: DeviceType) => {
    //     (panels[device.domain] = panels[device.domain] || []).push(device);
    //     return panels;
    //   }, {});
    // }

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

  mounted(): void {
    (async () => {
      let auth;
      try {
        // Try to pick up authentication after user logs in
        auth = await getAuth({
          saveTokens: data => {
            if (data) {
              localStorage.setItem("token", JSON.stringify(data));
            }
          },
          loadTokens: () => {
            return Promise.resolve().then(() => {
              const data = localStorage.getItem("token");
              return data ? JSON.parse(data) : null;
            });
          }
        });
      } catch (err) {
        if (err === ERR_HASS_HOST_REQUIRED) {
          auth = await getAuth({ hassUrl: "http://localhost:9123" });
        } else {
          console.log(`Unknown error: ${err}`);
          return;
        }
      }
      // Clear url if we have been able to establish a connection
      if (location.search.includes("auth_callback=1")) {
        history.replaceState(null, "", location.pathname);
      }

      const connection = await createConnection({ auth });

      getUser(connection).then(user => {
        this.user = user;
      });

      subscribeEntities(connection, (entities: HassEntities) => {
        this.entities = entities;
      });

      this.connection = connection;
    })();
  },
  methods: {
    toggle(entityId: string) {
      return callService(this.connection, "homeassistant", "toggle", {
        // eslint-disable-next-line @typescript-eslint/camelcase
        entity_id: entityId
      });
    }
  }
});
</script>

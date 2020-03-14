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
        <Panel class="panel--1">
            <h1>&nbsp;</h1>
            <h2>Vardagsrum</h2>
            <div class="devices">
                <Device />
                <Device />
                <Device />
                <Device />
                <Device />
                <Device />
                <Device />
                <Device />
                <Device />
            </div>
        </Panel>
        <Panel class="panel--2">
            <h1>&nbsp;</h1>
            <h2>Kök</h2>
            <div class="devices">
                <Device />
                <Device />
                <Device />
                <Device />
                <Device />
                <Device />
                <Device />
                <Device />
                <Device />
            </div>
        </Panel>
        <Panel class="panel--2">
            <h1>&nbsp;</h1>
            <h2>Övrigt</h2>
            <div class="devices">
                <Device />
            </div>
        </Panel>
    </div>
</template>

<script>
import Panel from '@/components/Panel.vue';
import Device from '@/components/Device.vue';

export default {
  name: 'Home',
  components: {
    Panel,
    Device,
  },
};
</script>

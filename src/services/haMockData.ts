/* eslint-disable @typescript-eslint/camelcase */
export const user = {
  credentials: [{ auth_provider_type: "homeassistant", auth_provider_id: null }],
  auth_provider_id: null,
  auth_provider_type: "homeassistant",
  id: "4e4aa07d2b3849f394268574e057ab9a",
  is_admin: true,
  is_owner: true,
  mfa_modules: [{ id: "totp", name: "Authenticator app", enabled: false }],
  name: "Demo King"
};

export const entities = {
  "group.living_room": {
    entity_id: "group.living_room",
    state: "off",
    attributes: {
      entity_id: ["light.light_ceiling_two", "light.light_window", "switch.tv_plug"],
      order: 0,
      friendly_name: "Living Room"
    },
    last_changed: "2020-06-22T21:15:57.262999+00:00",
    last_updated: "2020-06-22T21:15:57.262999+00:00",
    context: {
      id: "4f0fd8a27aa74fa58d95e777fcc56493",
      parent_id: null,
      user_id: null
    }
  },
  "group.bedroom": {
    entity_id: "group.bedroom",
    state: "off",
    attributes: {
      entity_id: ["light.light_ceiling_one"],
      order: 1,
      friendly_name: "Bedroom"
    },
    last_changed: "2020-06-22T21:15:57.261327+00:00",
    last_updated: "2020-06-22T21:15:57.261327+00:00",
    context: {
      id: "18cfad06c3834bb79327c734f12640be",
      parent_id: null,
      user_id: null
    }
  },
  "switch.tv_plug": {
    entity_id: "switch.tv_plug",
    state: "off",
    attributes: {
      friendly_name: "TV plug"
    },
    last_changed: "2020-06-22T21:15:57.251892+00:00",
    last_updated: "2020-06-22T21:15:57.251892+00:00",
    context: {
      id: "63e8d27d7cc94d95aded290069233c16",
      parent_id: null,
      user_id: null
    }
  },
  "light.light_ceiling_one": {
    entity_id: "light.light_ceiling_one",
    state: "off",
    attributes: {
      friendly_name: "Light Ceiling",
      supported_features: 1
    },
    last_changed: "2020-06-22T21:15:57.256268+00:00",
    last_updated: "2020-06-22T21:15:57.256268+00:00",
    context: {
      id: "3c14c12f7a084ef3bae83ec9e200318d",
      parent_id: null,
      user_id: null
    }
  },
  "light.light_ceiling_two": {
    entity_id: "light.light_ceiling_two",
    state: "off",
    attributes: {
      friendly_name: "Light Ceiling",
      supported_features: 1
    },
    last_changed: "2020-06-22T21:15:57.256485+00:00",
    last_updated: "2020-06-22T21:15:57.256485+00:00",
    context: {
      id: "fab0bb9309184a1698d3f4b4c5d56de1",
      parent_id: null,
      user_id: null
    }
  },
  "light.light_window": {
    entity_id: "light.light_window",
    state: "off",
    attributes: {
      friendly_name: "Light Window",
      supported_features: 0
    },
    last_changed: "2020-06-22T21:15:57.256715+00:00",
    last_updated: "2020-06-22T21:15:57.256715+00:00",
    context: {
      id: "dd4db6fb5fc840d3bcb4f2bbc88cb7fb",
      parent_id: null,
      user_id: null
    }
  }
};

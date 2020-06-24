// Utilizing HA types
export {
  HassEntities,
  HassEntity,
  Connection,
  AuthData,
  HassUser
} from "home-assistant-js-websocket";

type DeviceAttributes = {
  // 	Name of the entity
  friendlyName?: string;
  // Icon to use for the entity in the frontend
  icon?: string;
  // URL to a picture that should be used instead of showing the domain icon
  entityPicture?: string;
  // Boolean if the current state is an assumption
  assumedState?: boolean;
  // The unit of measurement the state is expressed in (Used for grouping graphs or understanding the entity)
  unitOfMeasurement?: string;
};

export type Device = {
  // String representation of the current state of the entity
  state: string;
  // Format: <domain>.<object_id>. Example: light.kitchen
  entityId: string;
  // Domain of the entity
  domain: string;
  // Object ID of entity
  objectId: string;
  // Based on friendly_name attribute with fall back to object ID
  name: string;
  // Time the state was written to the state machine in UTC time
  lastUpdated: string;
  // Time the state changed in the state machine in UTC time
  lastChanged: string;
  // Additional attributes (depending on device)
  attributes?: DeviceAttributes;
};

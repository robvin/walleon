import { HassEntities, HassUser, Connection } from "@/types";
import { user, entities } from "./haMockData";
import { HaServiceInterface } from "./haService";

export default class HaMockService implements HaServiceInterface {
  connection!: Connection;
  entities: HassEntities = entities;
  user: HassUser = user;

  async authenticate(): Promise<void> {
    Promise.resolve();
  }

  getUser() {
    return Promise.resolve<HassUser>(user);
  }

  subscribeEntities(cb: Function) {
    cb(this.entities);
  }

  toggleDevice(entityId: string): Promise<unknown> {
    const newState = this.entities[entityId].state === "on" ? "off" : "on";
    const updatedEntities = Object.assign(
      {},
      { ...this.entities },
      (this.entities[entityId].state = newState)
    );

    return Promise.resolve(updatedEntities);
  }
}

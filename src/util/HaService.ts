/* eslint-disable @typescript-eslint/camelcase */
import {
  getAuth,
  getUser,
  callService,
  subscribeEntities,
  createConnection,
  ERR_HASS_HOST_REQUIRED
} from "home-assistant-js-websocket";
import { Connection, HassEntities, AuthData, HassUser } from "@/types";

class HaService {
  connection!: Connection;

  async authenticate(): Promise<void> {
    let auth;
    try {
      // Try to pick up authentication after user logs in
      auth = await getAuth({
        saveTokens: this._saveTokens,
        loadTokens: this._loadTokens
      });
    } catch (err) {
      if (err === ERR_HASS_HOST_REQUIRED) {
        auth = await getAuth({ hassUrl: "http://localhost:8123" });
      } else {
        throw `Unknown error: ${err}`;
      }
    }
    // Clear url if we have been able to establish a connection
    if (location.search.includes("auth_callback=1")) {
      history.replaceState(null, "", location.pathname);
    }

    this.connection = await createConnection({ auth });
  }

  _saveTokens(data: AuthData | null): void {
    if (data) {
      localStorage.setItem("token", JSON.stringify(data));
    }
  }

  async _loadTokens(): Promise<AuthData | null> {
    await Promise.resolve();
    const data = localStorage.getItem("token");
    return data ? JSON.parse(data) : null;
  }

  getUser(): Promise<HassUser> {
    return getUser(this.connection);
  }

  subscribeEntities(cb: Function): void {
    subscribeEntities(this.connection, (entities: HassEntities) => cb(entities));
  }

  toggleDevice(entityId: string): Promise<unknown> {
    return callService(this.connection, "homeassistant", "toggle", {
      entity_id: entityId
    });
  }

  setBrightness(entityId: string, level: number): Promise<unknown> {
    return callService(this.connection, "homeassistant", "turn_on", {
      entity_id: entityId,
      brightness_pct: level
    });
  }
}

export default new HaService();

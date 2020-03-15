import { Device } from "@/types";

export default {
  getDevices(): Promise<Device[]> {
    // Fake response
    const response = [
      {
        state: "off",
        entityId: "light.kitchen",
        domain: "light",
        objectId: "kitchen",
        name: "Kitchen Ceiling",
        lastUpdated: "2017-10-28 08:13:36.715874+00:00",
        lastChanged: "2017-10-28 08:13:36.715874+00:00",
        attributes: {
          friendlyName: "Kitchen Ceiling",
          icon: "mdi:home",
          entityPicture: "http://example.com/picture.jpg",
          assumedState: true,
          unitOfMeasurement: "°C"
        }
      }
    ];

    return new Promise<Device[]>(resolve => {
      resolve(response);
    });
  }
};

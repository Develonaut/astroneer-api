export const ADVERTISERS_CREATE = "AD:UNIT:CREATE";
export const ADVERTISERS_UPDATE = "AD:UNIT:UPDATE";
export const ADVERTISERS_FETCH = "AD:UNITS:FETCH";

import AdvertisersModule from "modules/AdvertisersModule";

export function createAdvertiser(delta) {
  return AdvertisersModule({
    type: ADVERTISERS_CREATE,
    delta
  });
}

export function updateAdvertiser(delta) {
  return AdvertisersModule({
    type: ADVERTISERS_UPDATE,
    delta
  });
}

export function fetchAdvertisers() {
  return AdvertisersModule({
    type: ADVERTISERS_FETCH
  });
}


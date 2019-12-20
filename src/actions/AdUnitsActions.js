export const AD_UNIT_CREATE = "AD:UNIT:CREATE";
export const AD_UNIT_UPDATE = "AD:UNIT:UPDATE";
export const AD_UNITS_FETCH = "AD:UNITS:FETCH";
export const AD_UNITS_PERFORMANCE = "AD:UNITS:PERFORMANCE";
export const AD_UNITS_REMOVE = "AD:UNITS:REMOVE";

import AdUnitsModule from "modules/AdUnitsModule";

export function removeAdUnits(delta) {
  return AdUnitsModule({
    type: AD_UNITS_REMOVE,
    delta
  });
}

export function createAdUnit(delta) {
  return AdUnitsModule({
    type: AD_UNIT_CREATE,
    delta
  });
}

export function updateAdUnit(delta) {
  return AdUnitsModule({
    type: AD_UNIT_UPDATE,
    delta
  });
}

export function fetchAdUnitsPerformance(delta) {
  return AdUnitsModule({
    type: AD_UNITS_PERFORMANCE,
    delta
  });
}

export function fetchAdUnits() {
  return AdUnitsModule({
    type: AD_UNITS_FETCH
  });
}

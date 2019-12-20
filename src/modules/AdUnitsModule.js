import {
  AD_UNIT_CREATE,
  AD_UNIT_UPDATE,
  AD_UNITS_FETCH,
  AD_UNITS_REMOVE,
  AD_UNITS_PERFORMANCE
} from "actions/AdUnitsActions";
import {
  createAdUnit,
  fetchAdUnits,
  fetchAdUnitsPerformance,
  updateAdUnit,
  removeAdUnits
} from "middleware/AdUnitsMiddleware";

function AdUnitsModule(action) {
  switch (action.type) {
    case AD_UNITS_PERFORMANCE:
      return fetchAdUnitsPerformance(action.delta);
    case AD_UNITS_REMOVE:
      return removeAdUnits(action.delta)
    case AD_UNIT_CREATE:
      return createAdUnit(action.delta);
    case AD_UNIT_UPDATE:
      return updateAdUnit(action.delta);
    case AD_UNITS_FETCH:
      return fetchAdUnits();
    default:
      return null;
  }
}

export default AdUnitsModule;

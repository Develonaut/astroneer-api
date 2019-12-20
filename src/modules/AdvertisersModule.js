import { ADVERTISERS_FETCH, ADVERTISERS_CREATE, ADVERTISERS_UPDATE } from "actions/AdvertisersActions";
import { fetchAdvertisers, createAdvertiser, updateAdvertiser } from "middleware/AdvertisersMiddleware";

function AdvertisersModule(action) {
  switch (action.type) {
    case ADVERTISERS_CREATE:
    return createAdvertiser(action.delta);  
    case ADVERTISERS_UPDATE:
    return updateAdvertiser(action.delta);
    case ADVERTISERS_FETCH:
      return fetchAdvertisers();
    default:
      return null;
  }
}

export default AdvertisersModule;

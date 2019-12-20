import { CAMPAIGNS_FETCH, CAMPAIGN_CREATE, CAMPAIGN_UPDATE } from "actions/CampaignsActions";
import { fetchCampaigns, createCampaign, updateCampaign } from "middleware/CampaignsMiddleware";

function CampaignsModule(action) {
  switch (action.type) {
    case CAMPAIGN_CREATE:
    return createCampaign(action.delta);  
    case CAMPAIGN_UPDATE:
    return updateCampaign(action.delta);
    case CAMPAIGNS_FETCH:
      return fetchCampaigns();
    default:
      return null;
  }
}

export default CampaignsModule;

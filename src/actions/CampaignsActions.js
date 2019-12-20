export const CAMPAIGN_CREATE = "CAMPAIGNS:UNIT:CREATE";
export const CAMPAIGN_UPDATE = "CAMPAIGNS:UNIT:UPDATE";
export const CAMPAIGNS_FETCH = "CAMPAIGNS:UNITS:FETCH";

import CampaignsModule from "modules/CampaignsModule";

export function createCampaign(delta) {
  return CampaignsModule({
    type: CAMPAIGN_CREATE,
    delta
  });
}

export function updateCampaign(delta) {
  return CampaignsModule({
    type: CAMPAIGN_UPDATE,
    delta
  });
}

export function fetchCampaigns() {
  return CampaignsModule({
    type: CAMPAIGNS_FETCH
  });
}

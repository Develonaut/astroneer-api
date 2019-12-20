import { query } from "conf/sql";

export async function fetchCampaigns() {
  try {
    const queryString = `SELECT * FROM Operations.dbo.AdCampaigns`;
    const { result: { recordset = null } = {} } = await query(queryString);
    return recordset;
  } catch (err) {
    throw new Error(err);
  }
}

export async function createcampaign(delta) {
  try {
    const deltaKeys = `(${Object.keys(delta).join(",")})`;
    const deltaValues = `('${Object.values(delta).join("' , '")}')`;
    const queryString = `INSERT INTO operations.dbo.upload_campaign ${deltaKeys} values ${deltaValues}`;
    const { result: { recordsets = null } = {} } = await query(queryString);
    return recordsets;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updatecampaign(delta) {
  try {
    const deltaKeys = `(${Object.keys(delta).join(",")})`;
    const deltaValues = `('${Object.values(delta).join("' , '")}')`;
    const queryString = `INSERT INTO operations.dbo.update_campaign ${deltaKeys} values ${deltaValues}`;
    const { result: { recordsets = null } = {} } = await query(queryString);
    return recordsets;
  } catch (err) {
    throw new Error(err);
  }
}

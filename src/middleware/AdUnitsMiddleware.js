import { query } from "conf/sql";
import moment from "moment";

export async function fetchAdUnitsPerformance({
  date = moment().format("YYYY-MM-DD")
} = {}) {
  try {
    const queryString = `exec operations.dbo.SP_ActiveAdUnits '${date}', ''`;
    const { result: { recordset = null } = {} } = await query(queryString);
    return recordset;
  } catch (err) {
    throw new Error(err);
  }
}

export async function removeAdUnits(delta = []) {
  try {
    const values = delta.map(ids => `(${ids})`).join(", ");
    const queryString = `INSERT INTO operations.dbo.delete_adunits (pushId) values ${values}`;
    const { result: { recordsets = null } = {} } = await query(queryString);
    return recordsets;
  } catch (err) {
    throw new Error(err);
  }
}

export async function createAdUnit(delta) {
  try {
    const deltaKeys = `(${Object.keys(delta).join(",")})`;
    const deltaValues = `('${Object.values(delta).join("' , '")}')`;
    const queryString = `INSERT INTO operations.dbo.upload_adunits ${deltaKeys} values ${deltaValues}`;
    console.log({
      keys: deltaKeys,
      values: deltaValues,
      query: queryString
    });
    const { result: { recordsets = null } = {} } = await query(queryString);
    return recordsets;
  } catch (err) {
    throw new Error(err);
  }
}

export async function updateAdUnit(delta) {
  try {
    const deltaKeys = `(${Object.keys(delta).join(",")})`;
    const deltaValues = `('${Object.values(delta).join("' , '")}')`;
    const queryString = `INSERT INTO operations.dbo.update_adunits ${deltaKeys} values ${deltaValues}`;
    const { result: { recordsets = null } = {} } = await query(queryString);
    return recordsets;
  } catch (err) {
    throw new Error(err);
  }
}

export async function fetchAdUnits() {
  try {
    const queryString = `select * FROM operations.dbo.adunits WHERE 1=1 AND PushId IN ( SELECT PushId FROM Operations.dbo.AdUnits ) order by pushid desc`;
    const { result: { recordsets = null } = {} } = await query(queryString);
    return recordsets;
  } catch (err) {
    throw new Error(err);
  }
}

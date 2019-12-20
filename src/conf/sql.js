import sql from "mssql";
import { DBConnection } from "../../config";

export async function query(query) {
  const pool = new sql.ConnectionPool(DBConnection);
  pool.on("error", err => {
    console.log(err);
    throw new Error(err);
  });

  try {
    await pool.connect();
    let result = await pool.request().query(query);
    return { result };
  } catch (err) {
    console.log(err);
    throw new Error(err);
  } finally {
    pool.close(); //closing connection after request is finished.
  }
}

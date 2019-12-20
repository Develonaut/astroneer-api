import cors from "cors";

export function configureCors() {
  const corsParams = {
    origin: "*",
    method: ["GET", "POST"],
    optionsSuccessStatus: 200 //Some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  return cors(corsParams);
}

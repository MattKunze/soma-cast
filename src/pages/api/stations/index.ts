import { NextApiRequest, NextApiResponse } from "next"

import cors from "../_cors"
import { fetchStations } from "services/somafm"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)

  res.send(await fetchStations())
}

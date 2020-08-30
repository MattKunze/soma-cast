import { NextApiRequest, NextApiResponse } from "next"

import cors from "../_cors"
import { fetchPlaylist } from "services/somafm"
import { paramToString } from "utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)

  const { station } = req.query
  res.send(await fetchPlaylist(paramToString(station)))
}

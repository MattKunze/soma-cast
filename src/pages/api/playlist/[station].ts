import { NextApiRequest, NextApiResponse } from "next"

import { fetchPlaylist } from "services/somafm"
import { paramToString } from "utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { station } = req.query
  res.send(await fetchPlaylist(paramToString(station)))
}

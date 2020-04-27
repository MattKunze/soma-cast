import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

import { paramToString, pickOne } from "utils"

const parsePlaylist = (lines: string[]) =>
  lines
    .filter((t) => t.startsWith("File"))
    .map((t) => t.substring(t.indexOf("=") + 1))

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { playlist } = req.query
  const { data } = await axios.get<string>(paramToString(playlist))
  const urls = parsePlaylist(data.split(/\r?\n/))
  res.send(pickOne(urls))
}

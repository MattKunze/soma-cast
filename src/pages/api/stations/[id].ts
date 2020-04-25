import { NextApiRequest, NextApiResponse } from "next"

import { fetchDetails } from "services/somafm"
import { paramToString } from "utils"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const details = await fetchDetails(paramToString(id))
  if (details) {
    res.send(details)
  } else {
    res.status(404).send("not found")
  }
}

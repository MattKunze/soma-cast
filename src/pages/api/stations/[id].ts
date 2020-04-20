import { NextApiRequest, NextApiResponse } from "next"

import { fetchDetails } from "services/somafm"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  const details = await fetchDetails(Array.isArray(id) ? id[0] : id)
  if (details) {
    res.send(details)
  } else {
    res.status(404).send("not found")
  }
}

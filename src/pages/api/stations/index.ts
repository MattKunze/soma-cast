import { NextApiRequest, NextApiResponse } from "next"

import { fetchStations } from "services/somafm"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // await new Promise((resolve) => {
  //   setTimeout(resolve, 1000)
  // })
  res.send(await fetchStations())
}

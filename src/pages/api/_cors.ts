import Cors from "cors"
import { NextApiRequest, NextApiResponse } from "next"

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD", "POST", "OPTIONS"],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default function corsMiddleware(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return runMiddleware(req, res, cors)
}

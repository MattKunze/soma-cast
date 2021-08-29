import { ApolloServer } from 'apollo-server-micro'
import { NextApiRequest, NextApiResponse } from 'next'

import cors from './_cors'
import schema from '../../schema'

const server = new ApolloServer({
  schema,
})

export const config = {
  api: {
    bodyParser: false,
  },
}
const apolloMiddleware = server.createHandler({
  path: '/api/graphql',
})

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res)
  return apolloMiddleware(req, res)
}


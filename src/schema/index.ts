import { makeSchema } from 'nexus'
import path from 'path'

import * as ChannelTypes from './Channel'
import * as PlaylistTypes from './Playlist'
import * as scalarTypes from './scalars'

const schema = makeSchema({
  types: [ChannelTypes, PlaylistTypes, scalarTypes],
  outputs: {
    schema: path.join(process.cwd(), '/src/generated/schema.graphql'),
    typegen: path.join(process.cwd(), '/src/generated/types.ts'),
  },
})
export default schema

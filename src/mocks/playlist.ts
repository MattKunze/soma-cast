import faker from "faker"
console.warn(faker)

import { PlaylistEntry } from "types"

export default (count = 20): PlaylistEntry[] =>
  new Array(count).fill(null).map(() => ({
    title: faker.company.catchPhrase(),
    artist: faker.lorem.words(faker.random.number({ min: 2, max: 5 })),
    album: faker.hacker.phrase(),
    timestamp: faker.date.past(),
  }))

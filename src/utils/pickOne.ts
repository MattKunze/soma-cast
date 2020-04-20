function pickOne<T>(list: Array<T>) {
  return list[Math.floor(Math.random() * list.length)]
}

export default pickOne

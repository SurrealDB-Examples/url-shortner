function rand(min: number, max: number) {
  return (
    (Math.floor(Math.pow(10, 14) * Math.random() * Math.random()) %
      (max - min + 1)) +
    min
  )
}

const nanoid = (
  length: number,
  chars: string = '1234567890abcdefghijklmnopqrstuvwxyz',
) => {
  let id: string[] = []
  let charlist = chars.split('')

  while (id.length < length) {
    const random = charlist[rand(0, charlist.length)]

    if (id[id.length - 1] != random) {
      id.push(random)
    }
  }

  return id.join('')
}

export default nanoid

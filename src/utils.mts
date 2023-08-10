function generateDashLine(message: string, length: number) {
  const dashLine = new Array(Math.max(2, length - message.length + 2)).join('-')
  return ` \x1b[2m${dashLine}\x1b[0m `
}

function error(msg: string) {
  return `\x1b[31m${msg}\x1b[0m`
}

function exit(msg: string) {
  print(error(msg))
  process.exit(1)
}

function print(message: string | string[]) {
  const messages = typeof message === 'string' ? [message] : message
  for (const msg of messages) {
    console.log(msg)
  }
}

export { exit, print, error, generateDashLine }
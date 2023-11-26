const errorMsgs = new Set<string>()

export const logger = {
  errorOnce(msg: string) {
    if (!errorMsgs.has(msg)) {
      errorMsgs.add(msg)
      console.error(msg)
    }
  },
}

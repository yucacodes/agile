export class Timeout {
  private timeoutId?: NodeJS.Timeout

  constructor(callback: () => void, delay: number) {
    this.timeoutId = setTimeout(callback, delay)
  }

  clear() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = undefined
    }
  }
}

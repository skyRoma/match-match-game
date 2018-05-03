export default class Timer {
  constructor() {
    this.m = 0;
    this.s = 0;
    this.total = 0;
    this.count = setInterval(() => {
      this.s += 1;
      this.total += 1;
      if (this.s === 60) {
        this.m += 1;
        this.s = 0;
      }
      document.querySelector('.timer').innerHTML = `${this.m}: ${this.s}`;
    }, 1000);
  }
  stop() {
    clearInterval(this.count);
    return `${this.m}:${this.s}`;
  }
}

export default class Base {
  constructor(){
    this.loading = false
  }

  async request(func){
    this.loading = true
    await func()
    this.loading = false
  }
}

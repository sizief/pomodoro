import { observable, computed, decorate, action } from "mobx";

class User {
  givenName = 'default'
  accessId = null
  loggedIn = false

  get isLogin(){
    return this.loggedIn === true 
  }

  login(name, accessId){
    this.accessId = accessId
    this.givenName = name
    this.loggedIn = true
  }

  logout(){
    this.loggedIn = false
    this.givenName = 'default'
  }

}

decorate(User, {
  givenName: observable,
  loggedIn: observable,
  isLogin: computed,
  login: action,
  logout: action
})

const user = new User()
export default user

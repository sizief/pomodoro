import React, {Component} from 'react';
import GoogleLogin from 'react-google-login'
import UserContext from './context/UserContext'
import Loading from './common/loading'
import axios from 'axios';
import {apiEndpoint, googleAppId} from './config/Vars'

class Login extends Component{
  static contextType = UserContext

  constructor(props, context){
    super(props, context);
    this.state = {
      loading: false,
    }
    this.loginUser = this.loginUser.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.updateUserIfAlreadyLoggedIn()
  }

  updateUserIfAlreadyLoggedIn(){
    if (localStorage.getItem('access_id')){ //User logged in before
      this.loginUser(
        localStorage.getItem('given_name'),
        localStorage.getItem('access_id')
      )
    }
  }


  loginUser(given_name, access_id){
    const userCx = this.context
    userCx.setLoggedIn(true)
    userCx.setGivenName(given_name)
    userCx.setAccessId(access_id)  
  }

  async authenticate(tokenId){
    console.log(`${apiEndpoint}/users`)
    const payload = { token_id: tokenId }
    const response = await axios({
      method: 'post',
      timeout: 3000,
      url: `${apiEndpoint}/users`,
      data: JSON.stringify(payload)
    });
    return response
  }

  responseGoogle(response){
    if (response.error || !response.isSignedIn()) { // User did not login
      return false;
    }
    this.setState({loading: true})
    this.authenticate(response.tokenId)
    .then(user => this.setUser(user))
    .catch(err => console.error(err))
  }

  setUser(remoteUser){
    if (remoteUser.status === 200){
      this.storeUserOnBrowser(remoteUser.data)
      this.loginUser(
        remoteUser.data.given_name,
        remoteUser.data.access_id
      )
    }
    this.setState({loading: false})
  }

  storeUserOnBrowser(user){
    localStorage.setItem('access_id', user.access_id);
    localStorage.setItem('given_name', user.given_name);
  }

  googleLogin(){ 
    return(
      <div id="loginBox">
        <GoogleLogin
          clientId={googleAppId}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          render={renderProps => (
            <button style={{border:0, color: 'white', background: '#2c2c54'}} onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Login
            </button>
          )}
         />
      </div>
    )
  }

  render(){
   const user = this.context
    if (this.state.loading) return <Loading color="white"/>
    if (user.loggedIn) return user.givenName

    return this.googleLogin();
  }
}

export default Login; 

import React, {Component} from 'react';
import GoogleLogin from 'react-google-login'
import UserContext from './context/UserContext'

class Login extends Component{
  static contextType = UserContext
  
  responseGoogle(response){
    console.log('response is');

    if (response.error) {
      console.log(response.error);
    }else{
    console.log(response.isSignedIn());
    console.log(response.getId());
    var profile = response.getBasicProfile();
    console.log(profile.getName());
    console.log(profile.getGivenName());
    console.log(profile.getFamilyName());
    console.log(profile.getImageUrl());
    console.log(profile.getEmail());
    }
  }
    
  googleLogin(){
    return(
      <div id="loginBox">
	<GoogleLogin
          clientId="547377203778-rnas01ng8irns54hpho81roosuoagucq.apps.googleusercontent.com"
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
    
    if (user.loggedIn)
      return user.name
    else {
      return this.googleLogin();
    }
  }
}

export default Login; 


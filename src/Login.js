import React, {Component} from 'react';
import GoogleLogin from 'react-google-login'
import UserContext from './context/UserContext'

class Login extends Component{
  static contextType = UserContext
  
  responseGoogle(response){    
    if (response.error || !response.isSignedIn()) { // User did not login
      console.log(response.error);
      return false;
    }
     console.log(response.tokenId);
    var profile = response.getBasicProfile();
    console.log(profile.getId());
	  //user = 
     // { 
    //	  googleId: profile.getId(),
//	  firstName: profile.getGivenName(),
  //  	  familyName: profile.getFamilyName(),
//	  imageUrl: profile.getImageUrl(),
//	  email: profile.getEmail(),
  //        loggedIn: false 
    //  };
     // console.log(user);
      // send data to server
      // if ok 200 update here else return false
     // const user = this.context
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


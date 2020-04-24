import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { observer } from 'mobx-react';
import Loading from './common/loading';
import { apiEndpoint, googleAppId } from './config/Vars';
import user from './stores/User';

const Login = observer(class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    this.login = this.login.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
    this.updateUserIfAlreadyLoggedIn();
  }

  updateUserIfAlreadyLoggedIn() {
    if (localStorage.getItem('access_id')) { // User logged in before
      this.login(
        localStorage.getItem('given_name'),
        localStorage.getItem('access_id'),
      );
    }
  }

  async authenticate(tokenId) {
    console.log(`${apiEndpoint}/users`);
    const payload = { token_id: tokenId };
    const response = await axios({
      method: 'post',
      timeout: 3000,
      url: `${apiEndpoint}/users`,
      data: JSON.stringify(payload),
    });
    return response;
  }

  responseGoogle(response) {
    if (response.error || !response.isSignedIn()) { // User did not login
      return false;
    }
    this.setState({ loading: true });
    this.authenticate(response.tokenId)
      .then((user) => this.setUser(user))
      .catch((err) => console.error(err));
  }

  setUser(remoteUser) {
    if (remoteUser.status === 200) {
      this.storeUserOnBrowser(remoteUser.data);
      this.login(
        remoteUser.data.given_name,
        remoteUser.data.access_id,
      );
    }
    this.setState({ loading: false });
  }

  login(givenName, accessId) {
    user.login(givenName, accessId);
  }

  storeUserOnBrowser(user) {
    localStorage.setItem('access_id', user.access_id);
    localStorage.setItem('given_name', user.given_name);
  }

  googleLogin() {
    return (
      <div id="loginBox">
        <GoogleLogin
          clientId={googleAppId}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          render={(renderProps) => (
            <button style={{ border: 0, color: 'white', background: '#2c2c54' }} onClick={renderProps.onClick} disabled={renderProps.disabled}>
              Login
            </button>
          )}
        />
      </div>
    );
  }

  logout() {
    localStorage.removeItem('access_id');
    localStorage.removeItem('given_name');
    user.logout();
  }

  loggedInBar() {
    return (
      <div id="loginBox">
        <div>
          { user.givenName }
          {' '}
          |
          <span style={{ paddingLeft: 2 }} onClick={this.logout}>exit</span>
        </div>
      </div>
    );
  }

  render() {
    if (this.state.loading) return <Loading color="white" />;
    if (user.isLogin) return this.loggedInBar();

    return this.googleLogin();
  }
});
export default Login;

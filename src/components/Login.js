import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      auth: cookies.get("token")
    };
  }

  setUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  setPassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  authenticateUser = async e => {
    let that = this;
    var body = {
      username: this.state.username,
      password: this.state.password
    };
    var headers = {
      "Content-Type": "application/json"
    };
    e.preventDefault();
    axios({
      method: "post",
      url: `http://reart.oo/wp-json/jwt-auth/v1/token`,
      data: body,
      headers: headers
    })
      .then(function(response) {
        console.log(response);
        cookies.set("token", response.data.token, { path: "/" });
        that.props.isAuth();
      })
      .catch(function(response) {});
  };

  render() {
    if (!this.state.auth) {
      return (
        <div className="home-section">
          <form onSubmit={this.authenticateUser}>
            <input
              type="text"
              placeholder="Enter username"
              onChange={this.setUsername}
            />
            <input
              type="password"
              placeholder="Enter password"
              onChange={this.setPassword}
              autoComplete={this.state.password}
            />
            <input type="submit" />
          </form>
        </div>
      );
    }
    return (
      <div className="home-section">
        <h3>welcome</h3>
      </div>
    );
  }
}

export default Login;

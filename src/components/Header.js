import React, { Component } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: this.props.auth
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.auth !== this.props.auth) {
      this.setState({ auth: cookies.get("token") });
    }
  }

  render() {
    return (
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            {this.state.auth && (
              <li>
                <Link onClick={this.props.logout} to="/login">
                  Logout
                </Link>
              </li>
            )}
            {!this.state.auth && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;

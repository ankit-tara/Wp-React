import React, { Component } from "react";
import "./App.css";
import Header from "./components/Header";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";
import SinglePost from "./components/SinglePost";
import Login from "./components/Login";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class App extends Component {
  state = {
    loaded: false,
    auth: cookies.get("token")
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, 2000);
  }

  removeAuth = () => {
    cookies.remove("token", { path: "/" });
    this.setState({
      auth: cookies.get("token")
    });
  };

  setAuth = () => {
    this.setState({
      auth: cookies.get("token")
    });
  };

  render() {
    if (this.state.loaded) {
      return (
        <div className="container">
          <Header auth={this.state.auth} logout={this.removeAuth} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/posts" component={Posts} />
            <Route
              exact
              path="/login"
              component={() => <Login isAuth={this.setAuth} />}
            />
            <Route path="/posts/:id" component={SinglePost} />
          </Switch>
        </div>
      );
    }
    return <h3 className="loader">loading.....</h3>;
  }
}
export default App;

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../loader.svg";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export class SinglePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: [],
      loaded: false,
      titleupdated: false,
      id: parseInt(this.props.match.params.id),
      title: "",
      auth: cookies.get("token")
    };
  }

  componentDidMount() {
    let postId = this.state.id;

    axios
      .get(`http://reart.oo/wp-json/wp/v2/posts/${postId}`)
      .then(res =>
        setTimeout(() => {
          this.setState({
            post: res.data,
            loaded: true,
            title: res.data.title.rendered
          });
        }, 1000)
      )
      .catch(err => console.log(err));
  }

  strip_html_tags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();
    return str.replace(/<[^>]*>/g, "");
  }
  render() {
    const token = this.state.auth;
    const updateTitle = e => {
      this.setState({
        title: e.target.value
      });
    };

    const titleChange = e => {
      this.setState({
        titleupdated: true
      });

      let that = this;

      let postId = this.state.id;
      let newTitle = this.state.title;
      var body = {
        title: newTitle
      };
      var headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token
      };
      e.preventDefault();
      axios({
        method: "post",
        url: `http://reart.oo/wp-json/wp/v2/posts/${postId}`,
        data: body,
        headers: headers
      })
        .then(function(response) {
          that.setState({
            titleupdated: false
          });
          console.log(response);
        })
        .catch(function(response) {
          console.log(response);
        });
    };

    const { post, auth, loaded, title, titleupdated } = this.state;
    if (loaded) {
      return (
        <div className="posts-list">
          <div>
            {auth ? (
              <input
                value={title}
                onChange={updateTitle}
                onBlur={titleChange}
              />
            ) : (
              <h4>{title}</h4>
            )}
            {titleupdated && <img src={Loader} alt="loading" />}
          </div>
          <img src={post.featured_image_src} alt="featured img" />
          <p> {this.strip_html_tags(post.content.rendered)}</p>
          <strong>By: {post.acf.author}</strong>
          <Link className="back-btn" to="/posts">
            Go back
          </Link>
        </div>
      );
    }

    return <h3 className="loader">loading....</h3>;
  }
}

export default SinglePost;

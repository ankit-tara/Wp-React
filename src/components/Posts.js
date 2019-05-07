import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export class Posts extends Component {
  state = {
    posts: [],
    sPosts: [],
    loaded: false
  };

  componentDidMount() {
    axios
      .get("http://reart.oo/wp-json/wp/v2/posts")
      .then(res =>
        setTimeout(() => {
          this.setState({
            posts: res.data,
            sposts: res.data,
            loaded: true
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

  filterWpPosts = e => {
    let filterposts = this.state.posts;
    filterposts = filterposts.filter(post => {
      if (
        post.title.rendered
          .toString()
          .toLowerCase()
          .search(e.target.value.toString().toLowerCase()) !== -1
      ) {
        return post;
      }
      return null;
    });
    this.setState({
      sposts: filterposts
    });
  };

  render() {
    const { sposts, loaded } = this.state;
    if (loaded) {
      return (
        <div className="posts-list">
          <input
            type="search"
            placeholder="search...."
            onChange={this.filterWpPosts}
          />
          {sposts.map(post => (
            <div className="list-item" key={post.id}>
              <Link to={`/posts/${post.id}`}>
                <h4>{post.title.rendered}</h4>
              </Link>
              <p> {this.strip_html_tags(post.excerpt.rendered)}</p>
              <Link className="read-more" to={`/posts/${post.id}`}>
                Read More
              </Link>
            </div>
          ))}
        </div>
      );
    }

    return <h3 className="loader">loading....</h3>;
  }
}

export default Posts;

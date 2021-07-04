import React, { Component } from "react";
import NavBar from "./NavBar";
import * as blogService from "../services/blogs";

export default class HomePage extends Component {
  state = {
    blogs: [],
  };

  componentDidMount() {
    this.fetchBlogs();
  }

  /**
   * Function to get list of all blogs
   */
  fetchBlogs = async () => {
    try {
      const response = await blogService.fetchPosts();
      this.setState({ blogs: response.data.data });
      console.log(this.state.blogs);
    } catch (error) {
      console.log("error");
    }
  };

  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <div className="create-blog">
            <button>
              <i className="fas fa-plus"></i>Create New Blog
            </button>
          </div>
          <div className="search">
            <input placeholder="Search Blog"></input>
          </div>
          <div className="blog-list">
            <h3>
              All Blogs <span>{this.state.blogs.length}</span>
            </h3>
            {this.state.blogs.map((blog) => (
              <div key={blog._id} className="blog-post">
                <h1 className="post-title">{blog.title}</h1>
                <span className="user-name">{blog.users.name}</span>
                <p className="post-description">Description: {blog.description}</p>
                <button
                  onClick={() =>
                    this.props.history.push({
                      pathname: "/postdetail",
                      state: blog._id,
                    })
                  }
                  className="detail-button"
                >
                  Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
}

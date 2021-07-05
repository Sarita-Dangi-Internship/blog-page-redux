import React, { Component } from "react";
import NavBar from "./NavBar";
import { connect } from "react-redux";
import { fetchBlogs, searchBlog } from "../actions/actions";

class HomePage extends Component {
  state = {
    search: "",
  };

  componentDidMount() {
    this.props.fetchBlogs();
  }

  /**
   * function to handle search input
   */
  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
    });
    
    this.props.searchBlog(this.state.search);
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
            <input
              type="search"
              id="search"
              placeholder="Search Blog"
              value={this.search}
              onChange={this.handleSearch}
            ></input>
          </div>
          <div className="blog-list">
            <h3>
              All Blogs <span>{this.props.blogs.length}</span>
            </h3>
            {this.props.blogs.map((blog) => (
              <div key={blog._id} className="blog-post">
                <h1 className="post-title">{blog.title}</h1>
                <span className="user-name">{blog.users.name}</span>
                <p className="post-description">
                  Description: {blog.description}
                </p>
                <button
                  onClick={() =>
                    this.props.history.push({
                      pathname: "/postdetail",
                      state: {
                        id: blog._id,
                        title: blog.title,
                        user: blog.users.name,
                        description: blog.description,
                      },
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

const mapStateToProps = (state) => {
  return {
    blogs: state.auth.blogs,
  };
};

export default connect(mapStateToProps, { fetchBlogs, searchBlog })(HomePage);

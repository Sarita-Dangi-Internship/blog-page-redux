import React, { Component } from "react";
import NavBar from "./NavBar";
import { getAccessToken } from "../utils/token";
import * as blogService from "../services/blogs";
import { connect } from "react-redux";
import { fetchBlogs, searchBlog, addNewPost } from "../actions/actions";

class HomePage extends Component {
  state = {
    isCreatePost: false,
    search: "",
    title: "",
    description: "",
    id: "",
  };

  componentDidMount() {
    this.props.getAllBlogs();
  }

  handleOnEdit = () => {
    this.setState({ isCreatePost: true });
  };

  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
    console.log("input", event.target.value);
  };

  handleOnSave = async () => {
    const data = {
      title: this.state.title,
      description: this.state.description,
      users: { _id: this.props.userData.id },
    };

    try {
      const response = await this.props.createNewPost(data);
      console.log(response);

      this.setState({
        title: "",
        description: "",
        isCreatePost: false,
      });
    } catch (error) {
      console.log("error");
    }
  };

  handleOnCancel = () => {
    this.setState({ isCreatePost: false });
  };

  /**
   * function to handle search input
   */
  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
    });

    this.props.searchPosts(this.state.search);
  };

  render() {
    const { isCreatePost, title, description } = this.state;
    const token = getAccessToken();
    return (
      <>
        <NavBar />
        <div className="container">
          {token ? (
            isCreatePost ? (
              <div className="blog-post">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  value={title}
                  onChange={this.handleOnChange}
                />
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  value={description}
                  onChange={this.handleOnChange}
                />
                <button className="button" onClick={this.handleOnSave}>
                  Save
                </button>
                <button
                  className="button"
                  onClick={() => this.handleOnCancel()}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="create-blog">
                <button onClick={() => this.handleOnEdit()}>
                  <i className="fas fa-plus"></i>Create New Blog
                </button>
              </div>
            )
          ) : (
            <></>
          )}

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
                        userId: blog.users._id,
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
    blogs: state.reducer.blogs,
    userData: state.reducer.userData,
    isSignedIn: state.reducer.isSignedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  createNewPost: (title, description, users) =>
    dispatch(addNewPost(title, description, users)),
  getAllBlogs: () => dispatch(fetchBlogs()),
  searchPosts: (searchKey) => dispatch(searchBlog(searchKey)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

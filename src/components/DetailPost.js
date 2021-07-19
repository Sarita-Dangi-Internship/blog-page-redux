import { Component } from "react";
import * as blogService from "../services/blogs";
import { connect } from "react-redux";
import {
  deletePost,
  updatePost,
  addNewComment,
  deleteComment,
  updateComment,
} from "../actions/actions";
import { getAccessToken } from "../utils/token";
import { getUserId } from "../utils/userdata";

import NavBar from "./NavBar";

class DetailPost extends Component {
  state = {
    comments: [],
    comment: "",
    postEdit: false,
    commentEdit: false,
    title: "",
    description: "",
  };

  componentDidMount() {
    this.fetchComments(this.props.history.location.state.id);
  }

  handlePostEdit = () => {
    this.setState({ postEdit: true });
  };

  handlePostCancel = (id) => {
    this.setState({ postEdit: false });
  };
  handleCommentEdit = (id) => {
    this.setState({ commentEdit: true });
  };

  handleCommentCancel = (id) => {
    this.setState({ commentEdit: false });
  };

  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
    console.log("update", event.target.value);
  };

  handlePostUpdate = async (id) => {
    const data = {
      title: this.state.title,
      description: this.state.description,
    };

    try {
      const response = await this.props.updateBlog(
        this.props.history.location.state.id,
        data
      );
      console.log(response);
    } catch (error) {
      console.log("error");
    }
    this.setState({ postEdit: false });
  };

  handlePostDelete = async (id) => {
    try {
      const response = await this.props.deleteBlog(id);
      this.props.history.push("/");
      console.log(response);
    } catch (error) {
      console.log("error");
    }
  };

  /**
   * Function to get list of all blogs
   */
  fetchComments = async (id) => {
    try {
      const response = await blogService.fetchPostById(id);
      this.setState({ comments: response.data.data.comments });
      console.log(this.state.comments);
    } catch (error) {
      console.log("error");
    }
  };

  handleOnComment = async () => {
    const data = {
      description: this.state.comment,
    };

    try {
      const response = await this.props.createNewComment(
        this.props.history.location.state.id,
        data
      );
      console.log(response);
      this.setState({
        comment: "",
      });
    } catch (error) {
      console.log("error");
    }
    this.fetchComments(this.props.history.location.state.id);
  };

  handleCommentDelete = async (id) => {
    try {
      const response = await this.props.removeComment(id);
      console.log(response);
    } catch (error) {
      console.log("error");
    }
    this.fetchComments(this.props.history.location.state.id);
  };

  handleCommentUpdate = async (id) => {
    const data = {
      description: this.state.comment,
    };

    try {
      const response = await this.props.editComment(id, data);
      console.log(response);
    } catch (error) {
      console.log("error");
    }
    this.setState({ commentEdit: false });
    this.fetchComments(this.props.history.location.state.id);
  };

  render() {
    const { id, title, user, description, userId } =
      this.props.history.location.state;
    const { isSignedIn, userData } = this.props;
    const token = getAccessToken();
    const userid = getUserId();

    return (
      <>
        <NavBar />
        <div className="container">
          {!this.state.postEdit ? (
            <div className="blog-post">
              <h1 className="post-title"> {title}</h1>
              <span className="user-name"> {user}</span>
              <p className="post-description">Description: {description}:</p>

              {token && userId === userid && (
                <div className="icons">
                  <span>
                    <i
                      className="fas fa-trash"
                      onClick={() => this.handlePostDelete(id)}
                    ></i>
                  </span>
                  <span>
                    <i
                      className="fas fa-pen"
                      onClick={() => this.handlePostEdit(id)}
                    ></i>
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="blog-post">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                defaultValue={title}
                onChange={this.handleOnChange}
              />
              <label htmlFor="description">Description</label>
              <input
                id="description"
                defaultValue={description}
                onChange={this.handleOnChange}
              />
              <button
                className="button"
                onClick={() => this.handlePostUpdate(id)}
              >
                Update
              </button>
              <button
                className="button"
                onClick={() => this.handlePostCancel(id)}
              >
                Cancel
              </button>
            </div>
          )}
          {token && (
            <div>
              <label htmlFor="comment">Add new comment</label>
              <input
                placeholder="new comment here"
                id="comment"
                value={this.state.comment}
                onChange={this.handleOnChange}
              />
              <button
                className="button"
                onClick={() => this.handleOnComment(id)}
              >
                Comment
              </button>
            </div>
          )}
          <div className="comment-list">
            <h1>Comment List</h1>
            <div key="comment.id" className="blog-post">
              {this.state.comments.length > 0 ? (
                this.state.comments.map((comment) => (
                  <div key={comment._id}>
                    <p className="comment-description">
                      {comment.description}{" "}
                      <span className="user-name">{comment.users.name}</span>
                    </p>
                    <div className="icons">
                      {token && userId === userid ? (
                        <>
                          <span>
                            <i
                              className="fas fa-trash"
                              onClick={() =>
                                this.handleCommentDelete(comment._id)
                              }
                            ></i>
                          </span>
                          {comment.users._id === userid ? (
                            <>
                              <span>
                                <i
                                  className="fas fa-pen"
                                  onClick={() =>
                                    this.handleCommentEdit(comment._id)
                                  }
                                ></i>
                              </span>
                              {this.state.commentEdit ? (
                                <div>
                                  <label htmlFor="comment">description</label>
                                  <input
                                    id="comment"
                                    value={this.state.comment}
                                    onChange={this.handleOnChange}
                                  />
                                  <button
                                    className="button"
                                    onClick={() =>
                                      this.handleCommentUpdate(comment._id)
                                    }
                                  >
                                    Update
                                  </button>
                                  <button
                                    className="button"
                                    onClick={() =>
                                      this.handleCommentCancel(comment._id)
                                    }
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : (
                        <>
                          {userid === comment.users._id ? (
                            <>
                              {" "}
                              <span>
                                <i
                                  className="fas fa-trash"
                                  onClick={() =>
                                    this.handleCommentDelete(comment._id)
                                  }
                                ></i>
                              </span>
                              <span>
                                <i
                                  className="fas fa-pen"
                                  onClick={() =>
                                    this.handleCommentEdit(comment._id)
                                  }
                                ></i>
                              </span>
                              {this.state.commentEdit ? (
                                <div>
                                  <label htmlFor="comment">description</label>
                                  <input
                                    id="comment"
                                    value={this.state.comment}
                                    onChange={this.handleOnChange}
                                  />
                                  <button
                                    className="button"
                                    onClick={() =>
                                      this.handleCommentUpdate(comment._id)
                                    }
                                  >
                                    Update
                                  </button>
                                  <button
                                    className="button"
                                    onClick={() =>
                                      this.handleCommentCancel(comment._id)
                                    }
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments to display</p>
              )}
            </div>
          </div>

          {/* <div>
            <h4>Reply</h4>
            <input></input>
            <button className="button">Reply</button>
          </div> */}
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
  deleteBlog: (id) => dispatch(deletePost(id)),
  updateBlog: (id, data) => dispatch(updatePost(id, data)),
  createNewComment: (id, comment) => dispatch(addNewComment(id, comment)),
  removeComment: (id) => dispatch(deleteComment(id)),
  editComment: (id, data) => dispatch(updateComment(id, data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);

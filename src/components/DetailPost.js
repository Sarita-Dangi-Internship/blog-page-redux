import { Component } from "react";
import * as blogService from "../services/blogs";
import { deletePost } from "../actions/actions";
import { connect } from "react-redux";
import NavBar from "./NavBar";

class DetailPost extends Component {
  state = {
    comments: [],
    iseditMode: false,
  };

  componentDidMount() {
    this.fetchComments(this.props.history.location.state.id);
  }

  handleOnEdit = () => {
    this.setState({ isEditMode: true });
  };

  handleOnCancel = () => {
    this.setState({ isEditMode: false });
  };

  handleOnUpdate = (id) => {
    // this.props.editTask(this.props.id, this.state.title);
    this.setState({ isEditMode: false });
  };

  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleOnDelete = async (id) => {
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

  render() {
    console.log("to", this.props.history.location.state.id);
    const { id, title, user, description } = this.props.history.location.state;
    return (
      <>
        <NavBar />
        <div className="container">
          {!this.state.isEditMode ? (
            <div className="blog-post">
              <h1 className="post-title"> {title}</h1>
              <span className="user-name"> {user}</span>
              <p className="post-description">Description: {description}:</p>
              <div className="icons">
                <span>
                  <i
                    className="fas fa-trash"
                    onClick={()=>this.handleOnDelete(id)}
                  ></i>
                </span>
                <span>
                  <i
                    className="fas fa-pen"
                    onClick={() => this.handleOnEdit(id)}
                  ></i>
                </span>
              </div>
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
                onClick={() => this.handleOnUpdate(id)}
              >
                Update
              </button>
              <button
                className="button"
                onClick={() => this.handleOnCancel(id)}
              >
                Cancel
              </button>
            </div>
          )}

          <div>
            <h3>Add new comment</h3>
            <input placeholder="new comment here"></input>
            <button className="button">Comment</button>
          </div>
          <div className="comment-list">
            <h1>Comment List</h1>
            <div key="comment.id" className="blog-post">
              {this.state.comments.length > 0 ? (
                this.state.comments.map((comment) => (
                  <div key={comment.id}>
                    <p className="comment-description">
                      {comment.description}{" "}
                      <span className="user-name">{comment.users.name}</span>
                    </p>
                    <div className="icons">
                      <span>
                        <i className="fas fa-trash"></i>
                      </span>
                      <span>
                        <i className="fas fa-pen"></i>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments to display</p>
              )}
            </div>
          </div>
          <div>
            <h4>Description</h4>
            <input></input>
            <button className="button">Update</button>
            <button className="button">Cancel</button>
          </div>
          <div>
            <h4>Reply</h4>
            <input></input>
            <button className="button">Reply</button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.auth.blogs,
    userData: state.auth.userData,
    isSignedIn: state.auth.isSignedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  deleteBlog: (id) => dispatch(deletePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailPost);

import React, { Component } from "react";
import firebase from "../../Firebase";
import { Link } from "react-router-dom";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
      key: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("blog")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          blog: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id) {
    firebase
      .firestore()
      .collection("blog")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        this.props.history.push("/Blog");
      })
      .catch(error => {
        console.error("Error removing document: ", error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>
              <Link className="btn btn-primary" to="/Blog">
                All Blog Posts
              </Link>
            </h4>
            <h3 className="panel-title">{this.state.blog.title}</h3>
          </div>
          <div className="panel-body">
            <div>
              <img
                className="responsive-img"
                src={this.state.blog.imageURL}
                alt=""
              />
            </div>
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.blog.description}</dd>
              <dt>Author:</dt>
              <dd>{this.state.blog.author}</dd>
            </dl>
            <Link
              to={`/Blog/edit/${this.state.key}`}
              className="btn btn-success"
            >
              Edit
            </Link>
            &nbsp;
            <button
              onClick={this.delete.bind(this, this.state.key)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;

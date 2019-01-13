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
            <blockquote>
              <h3 className="blue-text">{this.state.blog.title}</h3>
            </blockquote>
            <h6>Author:</h6>
            <p>{this.state.blog.author}</p>
          </div>
          <div className="row">
            <Link to={`/Blog/edit/${this.state.key}`} className="btn green">
              Edit <i className="material-icons left ">edit</i>
            </Link>

            <button
              onClick={this.delete.bind(this, this.state.key)}
              className="btn red right"
            >
              Delete <i className="material-icons left">delete</i>
            </button>
          </div>
          <div className="panel-body">
            <div>
              <img
                className="responsive-img"
                src={this.state.blog.imageURL}
                alt=""
              />
            </div>
            <div>
              <h6>Description:</h6>
              <p>{this.state.blog.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Post;

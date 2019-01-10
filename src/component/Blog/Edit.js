import React, { Component } from "react";
import firebase from "../../Firebase";
import { Link } from "react-router-dom";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: "",
      title: "",
      description: "",
      author: "",
      imageURL: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("blog")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        const blog = doc.data();
        this.setState({
          key: doc.id,
          title: blog.title,
          description: blog.description,
          author: blog.author,
          imageURL: blog.imageURL
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState({ blog: state });
  };

  onSubmit = e => {
    e.preventDefault();

    const { title, description, author, imageURL } = this.state;

    const updateRef = firebase
      .firestore()
      .collection("blog")
      .doc(this.state.key);
    updateRef
      .set({ title, description, author, imageURL })
      .then(docRef => {
        this.setState({
          key: "",
          title: "",
          description: "",
          author: "",
          imageURL: ""
        });
        this.props.history.push("/Blog/Post/" + this.props.match.params.id);
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">EDIT Blog Post {this.state.key} </h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link
                to={`/Blog/Post/${this.state.key}`}
                className="btn btn-primary"
              >
                BACK
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label for="title">Title:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label for="description">Description:</label>
                <textarea
                  type="text"
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label for="author">Author:</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={this.state.author}
                  onChange={this.onChange}
                  placeholder="Author"
                />
              </div>
              <div>
                <img src={this.state.imageURL} alt="" width="600" />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

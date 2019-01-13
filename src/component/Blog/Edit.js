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
      imageURL: "",
      formErrors: { title: "", description: "", author: "" },
      formValid: {
        title: false,
        description: false,
        author: false,
        imageURL: false
      }
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
    const { title, description, author } = this.state;
    return (
      <div className="container">
        <div className="row">
          <blockquote>
            <h1 className="blue-text">EDIT Blog Post {this.state.key} </h1>
          </blockquote>
          <div className="panel-body">
            <div className="row">
              <h4>
                <Link
                  to={`/Blog/Post/${this.state.key}`}
                  className="btn btn-primary"
                >
                  BACK <i className="material-icons right">arrow_back</i>
                </Link>
              </h4>
            </div>
            <form onSubmit={this.onSubmit} className="s12">
              <div className="row">
                <div className="input-field">
                  <label htmlFor="title" className="active">
                    Title:
                  </label>
                  <input
                    type="text"
                    className={
                      this.state.formErrors.title === ""
                        ? "form-control"
                        : "form-control error"
                    }
                    name="title"
                    value={title}
                    onChange={this.onChange}
                    autoComplete="off"
                    placeholder="Title:"
                  />
                  <div className="errorTxt">{this.state.formErrors.title}</div>
                </div>
              </div>
              <div className="row">
                <div className="input-field">
                  <label htmlFor="description" className="active">
                    Description:
                  </label>
                  <textarea
                    className={
                      this.state.formErrors.description === ""
                        ? "materialize-textarea"
                        : "materialize-textarea error"
                    }
                    name="description"
                    value={description}
                    onChange={this.onChange}
                    placeholder="Description:"
                  >
                    {description}
                  </textarea>
                  <div className="errorTxt">
                    {this.state.formErrors.description}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-field">
                  <label htmlFor="author" className="active">
                    Author:
                  </label>
                  <input
                    type="text"
                    className={
                      this.state.formErrors.author === ""
                        ? "form-control"
                        : "form-control error"
                    }
                    name="author"
                    value={author}
                    onChange={this.onChange}
                    autoComplete="off"
                    placeholder="Author:"
                  />
                  <div className="errorTxt">{this.state.formErrors.author}</div>
                </div>
              </div>
              <div>
                <img src={this.state.imageURL} alt="" width="600" />
              </div>
              <button type="submit" className="btn-large green">
                Submit <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;

import React, { Component } from "react";
import firebase from "../../Firebase";
import { Link } from "react-router-dom";
import M from "materialize-css/dist/js/materialize.js";

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
        title: true,
        description: true,
        author: true,
        imageURL: true
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

    //TODO: Have to fix Textarea height
    setTimeout(() => {
      M.textareaAutoResize(document.querySelector(".materialize-textarea"));
    }, 1500);
    //M.textareaAutoResize(document.querySelector(".materialize-textarea"));
  }

  onChange = e => {
    e.preventDefault();
    //console.log(e.target.className);
    const { name, value } = e.target;

    let state = this.state;
    let formErrors = state.formErrors;
    let formValid = state.formValid;
    switch (name) {
      case "title":
        formErrors.title =
          value.length < 6 && value.length > 0
            ? "Minimum  6 chrachters required"
            : "";
        formErrors.title
          ? this.setState({
              formValid: Object.assign({}, formValid, {
                title: false
              })
            })
          : this.setState({
              formValid: Object.assign({}, formValid, {
                title: true
              })
            });
        break;
      case "description":
        formErrors.description =
          value.length < 50 && value.length > 0
            ? "Minimum  50 chrachters required"
            : "";
        formErrors.description
          ? this.setState({
              formValid: Object.assign({}, formValid, {
                description: false
              })
            })
          : this.setState({
              formValid: Object.assign({}, formValid, {
                description: true
              })
            });
        break;
      case "author":
        formErrors.author =
          value.length < 3 && value.length > 0
            ? "Minimum 3 chrachters required"
            : "";
        formErrors.author
          ? this.setState({
              formValid: Object.assign({}, formValid, {
                author: false
              })
            })
          : this.setState({
              formValid: Object.assign({}, formValid, {
                author: true
              })
            });
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value });

    // const state = this.state;
    // state[e.target.name] = e.target.value;
    // this.setState({ state });
  };

  onSubmit = e => {
    e.preventDefault();
    if (Object.values(this.state.formValid).every(x => x === true)) {
      const { title, description, author, imageURL } = this.state;

      const updateRef = firebase
        .firestore()
        .collection("blog")
        .doc(this.state.key);
      updateRef
        .set({ title, description, author, imageURL })
        .then(docRef => {
          // this.setState({
          //   key: "",
          //   title: "",
          //   description: "",
          //   author: "",
          //   imageURL: ""
          // });
          this.props.history.push("/Blog/Post/" + this.props.match.params.id);
        })
        .catch(error => {
          console.error("Error adding document: ", error);
        });
    } else {
    }
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
              <button
                type="submit"
                className="btn-large green"
                disabled={
                  !Object.values(this.state.formValid).every(x => x === true)
                }
              >
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

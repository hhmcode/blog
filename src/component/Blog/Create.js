import React, { Component } from "react";
import firebase from "../../Firebase";
import ImageUpload from "./ImageUpload";

// const formValid = ({ formErrors, ...rest }) => {
//   let valid = true;

//   // validate form errors being empty
//   Object.values(formErrors).forEach(val => {
//     //console.log("FormErrors: " + val.length > 0);
//     val.length > 0 && (valid = false);
//   });

//   // validate the form was filled out
//   Object.values(rest).forEach(val => {
//     console.log("RestErrors: " + val === "");
//     val === "" && (valid = false);
//   });

//   return valid;
// };

class Create extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("blog");
    this.state = {
      title: "",
      titleError: "",
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
    //isSubmitDisabled: true
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

    //console.log(typeof state);
    //console.log(e.target.name);
    //state[name] = value;
    //console.log(state);
    //this.setState({ state });
    //this.canSubmit();
  };
  getFromChildURL = imageURL => {
    let formValid = this.state.formValid;
    this.setState({
      imageURL,
      formValid: Object.assign({}, formValid, {
        imageURL: true
      })
    });
    //this.canSubmit();
  };

  onSubmit = e => {
    e.preventDefault();
    //console.log(Object.values(this.state.formValid));
    //console.log(Object.values(this.state.formValid).every(x => x === true));

    if (Object.values(this.state.formValid).every(x => x === true)) {
      const { title, description, author, imageURL } = this.state;
      this.ref
        .add({ title, description, author, imageURL })
        .then(docRef => {
          this.setState({
            title: "",
            description: "",
            author: "",
            imageURL: ""
          });
          this.props.history.push("/Blog");
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
      <div className="container ">
        <div className="row ">
          <blockquote>
            <h1 className="blue-text">Create Post</h1>
          </blockquote>
          <form onSubmit={this.onSubmit} className="s12">
            <div className="row">
              <div className="input-field">
                <label htmlFor="title">Title:</label>
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
                />
                <div className="errorTxt">{this.state.formErrors.title}</div>
              </div>
            </div>
            <div className="row">
              <div className="input-field">
                <label htmlFor="description">Description:</label>
                <textarea
                  className={
                    this.state.formErrors.description === ""
                      ? "materialize-textarea"
                      : "materialize-textarea error"
                  }
                  name="description"
                  onChange={this.onChange}
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
                <label htmlFor="author">Author:</label>
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
                />
                <div className="errorTxt">{this.state.formErrors.author}</div>
              </div>
            </div>

            <ImageUpload getFromChildURL={this.getFromChildURL} />

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
    );
  }
}

export default Create;

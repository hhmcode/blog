import React, { Component } from "react";
import { storage } from "../../Firebase";

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { coverImage: "", imageURL: "", progress: 0, hide: true };
    this.onUpload = this.onUpload.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }

  onUpload = e => {
    //console.log(e.target.files[0]);
    const coverImage = e.target.files[0];
    this.setState(() => ({
      coverImage,
      hide: false
    }));
  };
  handleUpload = e => {
    e.stopPropagation();
    e.preventDefault();
    const { coverImage } = this.state;
    const uploadTask = storage.ref(`images/${coverImage.name}`).put(coverImage);
    //uploadTask.on("state_changed", progress, error, complete);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // Progress function
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({ progress });
      },
      error => {
        // Progress function
        console.log(error);
      },
      () => {
        // Complete function
        storage
          .ref("images")
          .child(coverImage.name)
          .getDownloadURL()
          .then(imageURL => {
            //console.log(url);
            this.props.getFromChildURL(imageURL);
            this.setState({ imageURL, hide: true });
          });
      }
    );
  };

  render() {
    return (
      <div className="row">
        <div className="file-field input-field">
          <label htmlFor="coverImage" />
          <div className="btn-small teal lighten-3 white-text text-darken-2">
            <span>Select Image</span>
            <input type="file" name="coverImage" onChange={this.onUpload} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
            <span class="helper-text" data-error="wrong" data-success="right">
              Image Should be HI-RES
            </span>
          </div>
        </div>

        <div className={this.state.hide ? "input-field hide" : "input-field"}>
          <button onClick={this.handleUpload} className="btn lighten-5 pulse">
            Upload
            <div className={this.state.hide ? "progress hide" : "progress"}>
              <div
                className="determinate"
                style={{ width: this.state.progress + "%" }}
              />
            </div>
          </button>
        </div>
      </div>
    );
  }
}
export default ImageUpload;

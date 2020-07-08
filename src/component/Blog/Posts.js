import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../Firebase";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("blog");
    this.unsubscribe = null;
    this.state = {
      blog: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const blog = [];
    querySnapshot.forEach(doc => {
      const { title, description, author, imageURL } = doc.data();
      blog.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
        imageURL
      });
    });
    this.setState({
      blog
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <blockquote>
            <h3 className="blue-text">List Of All Blog Posts</h3>
          </blockquote>
          {this.state.blog.map(blog => (
            <div className="col s12 m6" key={blog.key}>
              <div className="card z-depth-3 transparent">
                <div
                  className="card-image"
                  style={{ height: "200px", overflow: "hidden" }}
                >
                  <img className="responsive-img" src={blog.imageURL} alt="" />
                </div>
                <div className="card-content">
                  <span className="card-title">{blog.title}</span>
                  {blog.description.length > 200 ? (
                    <p>{`${blog.description.substring(0, 200)}...`}</p>
                  ) : (
                    <p>{blog.description}</p>
                  )}
                </div>
                <div className="card-action">
                  <Link className="btn" to={`/Blog/Post/${blog.key}`}>
                    Read more
                    <i className="material-icons left">remove_red_eye</i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Posts;

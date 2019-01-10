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
          {this.state.blog.map(blog => (
            <div className="col s12 m4">
              <div className="card ">
                <div
                  className="card-image"
                  style={{ height: "200px", overflow: "hidden" }}
                >
                  <img
                    className="responsive-img"
                    src={blog.imageURL}
                    alt=""
                    style={{ height: "100%" }}
                  />
                  <span className="card-title">{blog.title}</span>
                </div>
                <div className="card-content">
                  {blog.description.length > 200 ? (
                    <div>{`${blog.description.substring(0, 200)}...`}</div>
                  ) : (
                    <p>{blog.description}</p>
                  )}
                </div>
                <div className="card-action">
                  <Link
                    className="btn btn-primary"
                    to={`/Blog/Post/${blog.key}`}
                  >
                    Read more
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

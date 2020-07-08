import React, { Component } from "react";
import { Link } from "react-router-dom";
import firebase from "../../Firebase";

class PostsWithSearch extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("blog");
    this.unsubscribe = null;
    this.state = {
      blog: [],
      blogQueried: [],
      Loading: true,
      SortOrder: true
    };
  }

  doSort = e => {
    let blogQueried = this.state.blogQueried;
    let SortOrder = !this.state.SortOrder;
    if (SortOrder) {
      blogQueried = blogQueried.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else {
      blogQueried = blogQueried.sort((a, b) => (a.title > b.title ? 1 : -1));
      blogQueried = blogQueried.reverse();
    }
    this.setState({ blogQueried, SortOrder });
  };

  doFilterByTitle = e => {
    let blogQueried = this.state.blog;
    blogQueried = blogQueried.filter(item => {
      return (
        item.title.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      );
    });
    console.log(blogQueried === 0 ? "Not Matching " : blogQueried);
    this.setState({ blogQueried: blogQueried });
  };

  onCollectionUpdate = querySnapshot => {
    const blog = [];
    querySnapshot.forEach(doc => {
      const { title, description, author, imageURL, dateCreated } = doc.data();
      blog.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
        imageURL,
        dateCreated: dateCreated.toDate().toDateString()
      });
    });
    this.setState({
      blog,
      blogQueried: blog,
      Loading: false
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
          <div class="input-field col s12">
            <i class="material-icons prefix">search</i>
            <input
              name="searchByTitle"
              type="text"
              value={this.state.searchedText}
              placeholder="Enter blog article title to search from the list..."
              onChange={this.doFilterByTitle}
            />
          </div>
          <div class="input-field col s6">
            <button
              className="btn waves-effect waves-light"
              onClick={this.doSort}
            >
              <i className="material-icons left">sort_by_alpha</i> Sort By Title
            </button>
          </div>
          <div class="input-field col s6">
            <h6>Select new for Sector</h6>
          </div>
          {this.state.blogQueried.map(blog => (
              <div className="col s12 m6" key={blog.key}>
              <div className="card z-depth-3 transparent">
                <div
                  className="card-image"
                  style={{ height: "200px", overflow: "hidden" }}
                >
                  <img className="responsive-img" src={blog.imageURL} alt="" />
                  <span className="card-title">{blog.dateCreated}</span>
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
          {this.state.Loading ? <h3 class="green-text">Loading...</h3> : null}
        </div>
      </div>
    );
  }
}

export default PostsWithSearch;

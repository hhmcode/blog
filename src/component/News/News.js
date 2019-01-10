import React, { Component } from "react";
import NewSingle from "./NewSingle";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  componentDidMount() {
    const url =
      "https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=d1e707c93e2248c8ad455f18ddca094d";

    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          news: data.articles
        });
      })
      .catch(error => console.log(error));
  }

  renderItems() {
    return this.state.news.map(item => (
      <div className="container">
        <NewSingle key={item.url} item={item} />
      </div>
    ));
  }

  render() {
    return <ul> {this.renderItems()} </ul>;
  }
}

export default News;

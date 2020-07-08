import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import "material-icons/iconfont/material-icons.scss";
import "materialize-css/dist/css/materialize.css";

import "./component/Blog/blog.scss";
import Home from "./component/Home/Index";
import News from "./component/News/News";

import registerServiceWorker from "./registerServiceWorker";

import MainNavigation from "./component/Templete/MainNavigation";
import Footer from "./component/Templete/Footer";
import Posts from "./component/Blog/Posts";
import PostsWithSearch from "./component/Blog/PostsWithSearch";
import Create from "./component/Blog/Create";
import Post from "./component/Blog/Post";
import Edit from "./component/Blog/Edit";
import Upload from "./component/Blog/ImageUpload";

ReactDOM.render(
  <BrowserRouter>
    <div className="">
      <MainNavigation />
      <Route exact path="/" component={Home} />
      <Route exact path="/News" component={News} />
      <Route exact path="/Blog" component={Posts} />
      <Route exact path="/PostsWithSearch" component={PostsWithSearch} />
      <Route exact path="/Blog/Create" component={Create} />
      <Route exact path="/Blog/Upload" component={Upload} />
      <Route exact path="/Blog/Edit/:id" component={Edit} />
      <Route exact path="/Blog/Post/:id" component={Post} />
      <Footer />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();

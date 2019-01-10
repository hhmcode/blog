import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Home from "./component/Home/Index";
import News from "./component/News/News";

import registerServiceWorker from "./registerServiceWorker";
import Posts from "./component/Blog/Posts";
import Create from "./component/Blog/Create";
import Post from "./component/Blog/Post";
import Edit from "./component/Blog/Edit";
import Upload from "./component/Blog/ImageUpload";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <nav>
        <div class="nav-wrapper">
          <a href="" class="brand-logo left p4 m4">
            Logo
          </a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li>
              <Link to="/Blog" className="">
                <i class="material-icons left">list</i> Add BLOG List All Blog
                Posts
              </Link>
            </li>
            <li>
              <Link className="" to="/Blog/create">
                <i class="material-icons left">add</i> Add BLOG
              </Link>
            </li>
            <li>
              <Link className="" to="/News">
                <i class="material-icons left">live_tv</i> Media news Fetched
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Route exact path="/" component={Home} />
      <Route exact path="/News" component={News} />
      <Route exact path="/Blog" component={Posts} />
      <Route exact path="/Blog/Create" component={Create} />
      <Route exact path="/Blog/Upload" component={Upload} />
      <Route exact path="/Blog/Edit/:id" component={Edit} />
      <Route exact path="/Blog/Post/:id" component={Post} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();

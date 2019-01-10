import React from "react";

const NewSingle = ({ item }) => (
  <li>
    <img src={item.urlToImage} alt={item.title} style={{ width: 100 + "px" }} />
    <p>{item.title}</p>
  </li>
);

export default NewSingle;

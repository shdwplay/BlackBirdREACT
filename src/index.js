import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

const array = ["luke skywalker", "leia skywalker", "chewbacca"];
const searchFilter = (arr, str) => {
  var reg = new RegExp(str, "gi");
  let filtered = arr.map(el => {
    let textHighlight = el.replace(reg, t => {
      return "<b>" + t + "</b>";
    });
    return textHighlight;
  });
  return filtered;
};
let p = searchFilter(array, "sky");
console.log(p);

{
  /* <div
  id="test"
  dangerouslySetInnerHTML={{
    __html: p
  }}
/> */
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

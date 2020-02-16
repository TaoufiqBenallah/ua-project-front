import React, { Component } from "react";

import "./style.scss";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="loader">
        <div className="loader--cmp"></div>
      </div>
    );
  }
}

export default Loader;

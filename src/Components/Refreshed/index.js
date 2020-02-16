import React, { Component } from "react";
import "./style.scss";

class Refreshed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="refreshed">
        <span>la liste des tables est refraichis</span>
      </div>
    );
  }
}

export default Refreshed;

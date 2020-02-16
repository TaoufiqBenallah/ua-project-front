import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./style.scss";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: true
    };
  }

  manageNavigation = action => {
    this.setState({ isHome: action });
  };

  render() {
    return (
      <div className="navigation">
        <Link
          onClick={() => this.manageNavigation(true)}
          className={this.state.isHome ? "" : "navigation__inactive"}
          to="/"
        >
          Acceuil
        </Link>
        <Link
          onClick={() => this.manageNavigation(false)}
          to="/parameters"
          className={!this.state.isHome ? "" : "navigation__inactive"}
        >
          Paramètres
        </Link>
      </div>
    );
  }
}

export default Navigation;

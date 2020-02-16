import React from "react";
import { connect } from "react-redux";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navigation from "./Components/Navigation";
import Data from "./Components/Data";
import Refreshed from "./Components/Refreshed";

import Parameters from "./Components/Parameters";

import "./style.scss";

function App(props) {
  return (
    <BrowserRouter>
      <div className="app">
        {props.refreshBannerStatus && <Refreshed></Refreshed>}
        <div className="app__container">
          <Navigation></Navigation>
          <Switch>
            <Route path="/parameters" component={Parameters}></Route>
            <Route exact path="/" component={Data}></Route>
            <Route component={App}></Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

function mapStateToProps(state) {
  return { refreshBannerStatus: state.refreshBannerStatus };
}

export default connect(mapStateToProps)(App);

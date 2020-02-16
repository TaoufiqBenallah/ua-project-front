import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import Datatable from "./Datatable";
import Filters from "./Filters";
import Pagination from "./Pagination";

import { manageRefreshedBannerStatus } from "../Refreshed/redux/manageRefreshBanner";
import { manageTasks } from "../Data/Datatable/redux/actions/manageTasks";

import "./style.scss";

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.parameters.pages !== this.props.parameters.pages) {
    }
  }
  componentDidMount() {
    let size = this.props.parameters.pages;
    this.setState({ size });
    setInterval(this.refreshData, this.props.parameters.interval * 1000);
  }

  refreshData = () => {
    this.props.manageTasks({
      page: this.props.parameters.pageActive,
      size: this.state.size
    });

    this.props.manageRefreshedBannerStatus("REFRESH_ACTIVE");
    setTimeout(() => {
      this.props.manageRefreshedBannerStatus("REFRESH_INACTIVE");
    }, 1000);
  };

  render() {
    return (
      <div className="data">
        <Filters></Filters>
        <Datatable></Datatable>
        <Pagination></Pagination>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { parameters: state.parameters };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      manageRefreshedBannerStatus: manageRefreshedBannerStatus,
      manageTasks: manageTasks
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Data);

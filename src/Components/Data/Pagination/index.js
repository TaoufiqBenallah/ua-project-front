import React, { Component } from "react";

import { connect } from "react-redux";
import { manageParameters } from "../../Parameters/Redux/manageParameters";
import { bindActionCreators } from "redux";
import { manageTasks } from "../Datatable/redux/actions/manageTasks";

import "./style.scss";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 7 11
  // if pageSize - 2 == pageActive
  //

  changePage = i => {
    this.props.manageParameters("PARAMETERS_CHANGE_ACTIVE_PAGE", i);
    this.props.manageTasks({
      page: i,
      size: this.props.parameters.pages
    });
  };

  render() {
    let pageActive = this.props.parameters.pageActive;
    let pageSize = this.props.parameters.pageSize;

    return (
      <div>
        {pageSize > 1 && (
          <div className="pagination">
            {(pageActive === 1 || pageActive === 2) && (
              <div className="pagination-first">
                <button
                  className="pagination-first__num-1"
                  onClick={() => this.changePage(1)}
                >
                  1
                </button>
                <button
                  className="pagination-first__num-2"
                  onClick={() => this.changePage(2)}
                >
                  2
                </button>
                <button
                  className="pagination-first__num-3"
                  onClick={() => this.changePage(3)}
                >
                  3
                </button>
                <div className="pagination__pointiers">
                  <span>...</span>
                </div>
              </div>
            )}
            {pageActive < this.props.parameters.pageSize - 2 && pageActive > 2 && (
              <div className="pagination-middle">
                <div className="pagination__pointiers">
                  <span>...</span>
                </div>
                <button
                  className="pagination-first__num-1"
                  onClick={() => this.changePage(pageActive - 1)}
                >
                  {pageActive}
                </button>
                <button
                  className="pagination-first__num-2"
                  onClick={() => this.changePage(pageActive)}
                >
                  {pageActive + 1}
                </button>
                <button
                  className="pagination-first__num-3"
                  onClick={() => this.changePage(pageActive + 1)}
                >
                  {pageActive + 2}
                </button>
                <div className="pagination__pointiers">
                  <span>...</span>
                </div>
              </div>
            )}
            {pageActive >= this.props.parameters.pageSize - 2 && (
              <div className="pagination-last">
                <div className="pagination__pointiers">
                  <span>...</span>
                </div>
                <button
                  className="pagination-first__num-1"
                  onClick={() =>
                    this.changePage(this.props.parameters.pageSize - 3)
                  }
                >
                  {this.props.parameters.pageSize - 2}
                </button>
                <button
                  className="pagination-first__num-2"
                  onClick={() =>
                    this.changePage(this.props.parameters.pageSize - 2)
                  }
                >
                  {this.props.parameters.pageSize - 1}
                </button>
                <button
                  className="pagination-first__num-3"
                  onClick={() =>
                    this.changePage(this.props.parameters.pageSize - 1)
                  }
                >
                  {this.props.parameters.pageSize}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { parameters: state.parameters };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { manageParameters: manageParameters, manageTasks: manageTasks },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);

import React, { Component } from "react";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";

import { manageDetailsContainer } from "./DetailsOfRow/redux/manageDetailsContainer";
import { manageTasks } from "./redux/actions/manageTasks";

import DetailsOfRow from "./DetailsOfRow";
import Loader from "../Loader";

import "./style.scss";

class Datatable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullData: [],
      filteredData: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fullData !== this.props.fullData) {
      let fullData = nextProps.fullData;
      for (let counter = 0; counter < fullData.length; counter++) {
        fullData[counter].index = counter + 1;
        fullData[counter].start = this.getIndex(fullData[counter].startDate);
        fullData[counter].end = this.getIndex(fullData[counter].endDate);
        fullData[counter].creation = this.getIndex(
          fullData[counter].creationDate
        );
        if (fullData[counter].status === null) {
          fullData[counter].status = "AUCUN STATUT";
        }
      }
      this.setState({ fullData });
      //Perform some operation
    }
  }
  componentDidMount() {
    this.props.manageTasks({
      page: this.props.parameters.pageActive,
      size: this.props.parameters.pages
    });
  }

  getIndex = date => {
    let splittedByTiret = date.split("-");
    let year = parseInt(splittedByTiret[0]);
    let month = parseInt(splittedByTiret[1]);
    let splittedBySmalls = splittedByTiret[2].split(":");
    let splittedDayandHours = splittedBySmalls[0].split("T");
    let day = parseInt(splittedDayandHours[0]);
    let hours = parseInt(splittedDayandHours[1]);
    let minutes = parseInt(splittedBySmalls[1]);
    let seconds = parseInt(splittedBySmalls[1].split(".")[0]);

    return (
      year * 365 +
      month * 30 +
      day +
      hours / 24 +
      minutes / (24 * 60) +
      seconds / (24 * 60 * 60)
    );
  };

  sortBy = action => {
    let fullData = this.state.fullData;
    switch (action) {
      case "ID":
        fullData.sort((a, b) => {
          var textA = a.id.toUpperCase();
          var textB = b.id.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        break;
      case "CREATIONDATE":
        fullData.sort((a, b) => a.creation - b.creation);
        break;
      case "CONFIGNAME":
        fullData.sort((a, b) => {
          var textA = a.taskConfigName.toUpperCase();
          var textB = b.taskConfigName.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        break;
      case "DURATION":
        fullData.sort((a, b) => a.durationInSeconds - b.durationInSeconds);
        break;
      case "STATUS":
        fullData.sort((a, b) => {
          var textA = a.status.toUpperCase();
          var textB = b.status.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        break;
      case "TRANSPORTEDFILE":
        fullData.sort((a, b) => {
          var textA = a.transportedFiles.toUpperCase();
          var textB = b.transportedFiles.toUpperCase();
          return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        break;
      case "START":
        fullData.sort((a, b) => a.start - b.start);
        break;
      case "END":
        fullData.sort((a, b) => a.end - b.end);
        break;
      case "NBR":
        fullData.sort(
          (a, b) => a.nbrCheckInProgressCopy - b.nbrCheckInProgressCopy
        );
        break;
      default:
        return;
    }
    this.setState({ fullData });
  };

  showDetailsItem = id => {
    let data = this.state.fullData;
    let item = data.filter(item => item.index === id)[0];
    this.props.manageDetailsContainer("DETAILS_ACTIVE", item);
  };

  render() {
    let { fullData } = this.state;
    let { isLoading } = this.props;
    return (
      <div className="data-table">
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <div>
            <table>
              <thead>
                <tr>
                  <th onClick={() => this.sortBy("ID")}>Id</th>
                  <th onClick={() => this.sortBy("CREATIONDATE")}>
                    Date de Création
                  </th>
                  <th onClick={() => this.sortBy("CONFIGNAME")}>
                    Nom de configuration
                  </th>
                  <th onClick={() => this.sortBy("DURATION")}>Duration</th>
                  <th onClick={() => this.sortBy("STATUS")}>Statut</th>
                  <th onClick={() => this.sortBy("TRANSPORTEDFILE")}>
                    Fichier thansporté
                  </th>
                  <th onClick={() => this.sortBy("START")}>Date de début</th>
                  <th onClick={() => this.sortBy("END")}>Date de fin</th>
                  <th onClick={() => this.sortBy("NBR")}>
                    nbrCheckInProgressCopy
                  </th>
                </tr>
              </thead>
              {fullData.length > 0 && (
                <tbody>
                  {fullData.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() => this.showDetailsItem(item.index)}
                      >
                        <td>{item.id}</td>
                        <td>{item.creationDate.substr(0, 10)}</td>
                        <td>{item.taskConfigName}</td>
                        <td>{item.durationInSeconds}</td>
                        <td>{item.status}</td>
                        <td>{item.transportedFiles}</td>
                        <td>{item.startDate.substr(0, 10)}</td>
                        <td>{item.endDate.substr(0, 10)}</td>
                        <td>{item.nbrCheckInProgressCopy}</td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
            {fullData.length === 0 && (
              <div className="empty">
                <span>Aucune tâche trouvée</span>
              </div>
            )}
            {this.props.detailsTask.active && <DetailsOfRow></DetailsOfRow>}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    parameters: state.parameters,
    fullData: state.tasks.tasks,
    isLoading: state.tasks.loading,
    detailsTask: state.taskDetails
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      manageTasks: manageTasks,
      manageDetailsContainer: manageDetailsContainer
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Datatable);

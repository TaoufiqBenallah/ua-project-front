import React, { Component } from "react";
import "./style.scss";
import { manageTasks } from "../Datatable/redux/actions/manageTasks";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (e, value) => {
    let search = value + ":" + e.target.value;
    this.props.manageTasks({
      page: 0,
      size: 10,
      search: search
    });
  };

  render() {
    return (
      <div className="filters">
        <div className="filters__by-texts">
          <input
            placeholder="Identifiant"
            type="text"
            onChange={e => this.onChange(e, "id")}
          />
          <input
            placeholder="Nom de Configuration"
            type="text"
            onChange={e => this.onChange(e, "taskConfigName")}
          />
          <input
            placeholder="Fichier Transporté"
            type="text"
            onChange={e => this.onChange(e, "transportedFiles")}
          />
          <input
            placeholder="Statut"
            type="text"
            onChange={e => this.onChange(e, "status")}
          />
          <input
            placeholder="Duration"
            type="number"
            onChange={e => this.onChange(e, "durationInSeconds")}
          />
          <input
            placeholder="nbrCheckInProgressCopy"
            type="number"
            onChange={e => this.onChange(e, "nbrCheckInProgressCopy")}
          />
        </div>
        <div className="filters__by-selections">
          <select name="op">
            <option value="">Email d'erreur envoyé</option>
            <option value="">TEST</option>
            <option value="">OK</option>
          </select>
          <select name="op" id="">
            <option value="">inProgressCopyDetected</option>
            <option value="">OK</option>
          </select>
        </div>

        <div className="filters__by-selections">
          <select name="op" id="">
            <option value="">Date de création</option>
            <option value="">TEST</option>
            <option value="">OK</option>
          </select>
          <select name="op" id="">
            <option value="">Date de début</option>
            <option value="">OK</option>
          </select>
          <select name="op" id="">
            <option value="">Date de fin</option>
            <option value="">OK</option>
          </select>
        </div>

        <div className="filters__submit">
          <button>Chercher</button>
        </div>
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
      manageTasks: manageTasks
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);

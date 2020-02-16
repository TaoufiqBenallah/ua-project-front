import React, { Component } from "react";

import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import { manageDetailsContainer } from "./redux/manageDetailsContainer";

import "./style.scss";

class DetailsOfRow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="details">
        <div className="details__close">
          <span
            onClick={() =>
              this.props.manageDetailsContainer("DETAILS_INACTIVE", {})
            }
          >
            X
          </span>
        </div>
        <div className="details__selected">
          <h2>Détails du la tâche choisit</h2>
          <div className="details__selected-value">
            <span>Identifiant : </span>
            <span>{this.props.detailsTask.item.id}</span>
          </div>
          <div className="details__selected-value">
            <span>Date de création : </span>
            <span>{this.props.detailsTask.item.creationDate}</span>
          </div>
          <div className="details__selected-value">
            <span>Nom de la configuration choisi : </span>
            <span>{this.props.detailsTask.item.taskConfigName}</span>
          </div>
          <div className="details__selected-value">
            <span>Statut : </span>
            <span>{this.props.detailsTask.item.status}</span>
          </div>
          <div className="details__selected-value">
            <span>Fichier transporté : </span>
            <span>{this.props.detailsTask.item.transportedFiles}</span>
          </div>
          <div className="details__selected-value">
            <span>Message : </span>
            <span>{this.props.detailsTask.item.message}</span>
          </div>
          <div className="details__selected-value">
            <span>Email d'erreur envoyé : </span>
            <span>{this.props.detailsTask.item.emailErrorSent}</span>
          </div>
          <div className="details__selected-value">
            <span>Date de début : </span>
            <span>{this.props.detailsTask.item.startDate}</span>
          </div>
          <div className="details__selected-value">
            <span>Date de Fin : </span>
            <span>{this.props.detailsTask.item.endDate}</span>
          </div>
          <div className="details__selected-value">
            <span>inProgressCopyDetected : </span>
            <span>{this.props.detailsTask.item.inProgressCopyDetected}</span>
          </div>
          <div className="details__selected-value">
            <span>nbrCheckInProgressCopy : </span>
            <span>{this.props.detailsTask.item.nbrCheckInProgressCopy}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { detailsTask: state.taskDetails };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { manageDetailsContainer: manageDetailsContainer },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsOfRow);

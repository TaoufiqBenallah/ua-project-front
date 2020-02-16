import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { manageParameters } from "./Redux/manageParameters";

import "./style.scss";

class Parameters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: "",
      valueOfPages: 0,
      valueOfInterval: 0
    };
  }

  manageFieldsChanges = (event, target) => {
    let value = event.target.value;
    if (target === "INPUT") {
      this.setState({ valueOfPages: value });
    } else {
      this.setState({ valueOfInterval: value });
    }
  };

  updateParameters = target => {
    if (target === "INPUT") {
      let value = parseInt(this.state.valueOfPages);
      if (value > 0) {
        this.props.manageParamaters("PARAMETERS_CHANGE_PAGES", value);
      } else alert("Veuillez Entrer un numéro valide");
    } else {
      let value = parseInt(this.state.valueOfInterval);
      if (value === 5 || value === 10 || value === 15 || value === 20) {
        this.props.manageParamaters("PARAMETERS_CHANGE_INTERVAL", value);
      } else alert("Veuillez Séléctionner une option valide");
    }
  };

  render() {
    return (
      <div className="parameters">
        <h1>Paramètrer votre Application</h1>
        <div className="parameters__pages">
          <input
            type="number"
            placeholder="Nombre d'Elements par page"
            value={this.state.valueOfPages}
            onChange={event => this.manageFieldsChanges(event, "INPUT")}
          />
          <button
            type="submit"
            onClick={event => this.updateParameters("INPUT")}
          >
            Enrigistrer
          </button>
        </div>
        <div className="parameters__reloading">
          <select
            value={this.state.valueOfInterval}
            onChange={event => this.manageFieldsChanges(event, "SELECT")}
            name=""
            id=""
          >
            <option value="">Refraichir chaque</option>
            <option value="5">5 secondes</option>
            <option value="10">10 secondes</option>
            <option value="15">15 secondes</option>
            <option value="20">20 secondes</option>
          </select>
          <button
            type="submit"
            onClick={event => this.updateParameters("SELECT")}
          >
            Enrigistrer
          </button>
        </div>
        <div>
          <span>
            Valeurs par défaut : 10 élements par page, 20 secondes pour
            rafrichir
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { paramaters: state.paramaters };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ manageParamaters: manageParameters }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Parameters);

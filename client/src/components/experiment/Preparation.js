import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./preparation.css";

import sound from "../../images/sound.png";

class Preparation extends Component {
  onClick = () => {
    this.props.advancePhase("introduction");
  };

  render() {
    return (
      <div className="div-absolute screen-edge-padding div-white-background">
        <h2>Device Preparation</h2>
        <div className="row-upper-15-padding">
          <img className="img-sound" src={sound} alt="" />
          <h4>1. Please turn device volume on</h4>
          <br />
          <br />
          <h4>2. Place the device on a table</h4>
          <br />
          <br />
          <h4>3. Have a good internet connection</h4>
        </div>
        <br />
        <button className="button-main" onClick={this.onClick}>
          Start
        </button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const experimentDispatchers = bindActionCreators(
    experimentActionCreators,
    dispatch
  );

  return {
    advancePhase: nextPhase => {
      experimentDispatchers.advancePhase(nextPhase);
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Preparation);

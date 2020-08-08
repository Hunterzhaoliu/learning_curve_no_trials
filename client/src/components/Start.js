import React, { Component } from "react";
import { connect } from "react-redux";
import * as registerActionCreators from "../actions/register";
import { bindActionCreators } from "redux";

class Start extends Component {
  onClick = () => {
    this.props.startExperiment();
  };

  render() {
    return (
      <div className="screen-edge-padding">
        <h2>Parent Information</h2>
        <div className="text-align-left row-upper-15-padding">
          <p>
            Stay with your child while they play. At some points in the game, we
            will need you to confirm your child’s choices.
          </p>
          <br />
          <br />
          <p>
            We are really interested in what your child will do all by
            themselves! Therefore, we ask that you please don't tell your child
            what to do or communicate with them by talking, using gestures, or
            cheering them on during the game.
          </p>
          <br />
          <br />
          <p>
            For verfication purposes, we will be audio recording this game.
            Please accept the microphone permissions after you press "NEXT".
          </p>
        </div>
        <br />
        <button className="button-main" onClick={this.onClick}>
          Next
        </button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const registerDispatchers = bindActionCreators(
    registerActionCreators,
    dispatch
  );

  return {
    startExperiment: () => {
      registerDispatchers.startExperiment();
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Start);

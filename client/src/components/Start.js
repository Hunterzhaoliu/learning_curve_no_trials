import React, { Component } from "react";
import { connect } from "react-redux";
import * as registerActionCreators from "../actions/register";
import { bindActionCreators } from "redux";
import "./start.css";

import sound from "../images/sound.png";

class Start extends Component {
  constructor() {
    super();
    this.state = {
      parentInstruction: 0
    };
  }

  onClick = () => {
    if (this.state.parentInstruction === 0) {
      this.setState({
        parentInstruction: 1
      });
    } else {
      this.props.startExperiment();
    }
  };

  render() {
    if (this.state.parentInstruction === 0) {
      return (
        <div className="screen-edge-padding">
          <h2>Parent Preparation</h2>
          <div className="text-align-left row-upper-15-padding">
            <p>
              Stay with your child while they play. At some points in the game,
              we will need you to confirm your child’s choices.
            </p>
            <br />
            <br />
            <p>
              We are really interested in what your child will do all by
              themselves! Therefore, we ask that you please don't tell your
              child what to do or communicate with them by talking, using
              gestures, or cheering them on during the game.
            </p>
          </div>
          <br />
          <button className="button-main" onClick={this.onClick}>
            Next
          </button>
        </div>
      );
    } else {
      return (
        <div className="screen-edge-padding">
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
            <br />
            <br />
            <div className="text-align-left">
              <p>
                For verfication purposes, we will be audio recording this game.
                Please accept the microphone permissions after you press
                "START".
              </p>
            </div>
          </div>
          <br />
          <button className="button-main" onClick={this.onClick}>
            Start
          </button>
        </div>
      );
    }
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

import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import Code from "./Code";
import Start from "./Start";
import Experiment from "./experiment/Experiment";
import MicRecorder from "mic-recorder-to-mp3";
import { osName } from "react-device-detect";

const { Content } = Layout;

class Landing extends Component {
  renderDisplay() {
    if (osName === "Android" || osName === "iOS") {
      const { step } = this.props;

      switch (step) {
        case 0:
          return <Code />;
        case 1:
          return <Start />;
        case 2:
          const recorder = new MicRecorder({
            bitRate: 128
          });

          try {
            // start and stop recording to get user permission
            recorder
              .start()
              .then(() => {
                recorder.stop();
              })
              .catch(error => {
                console.error("start blank recording error = ", error);
              });
          } catch (error) {
            console.log("Blank recorder error = ", error);
          }

          return <Experiment recorder={recorder} />;
        default:
          return <Code />;
      }
    } else {
      return (
        <h1 style={{ paddingTop: "60px" }}>
          Please continue this experiment on a mobile device
        </h1>
      );
    }
    // Step 0: Code
    // Step 1: Consent
    // Step 2: Information
    // Step 3: Practice Instructions
    // Step 4: Practice Trial
    // Step 5: Experiment Instructions
    // Step 6: Prediction
    // Step 7: Experiment
    // Step 8: Tall or Short Tree
    // Step 9: Win
    // step 10: Ask Questions
  }

  render() {
    return <Content className="content">{this.renderDisplay()}</Content>;
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    step: state.register.step
  };
}

export default connect(
  mapStateToProps,
  null
)(Landing);

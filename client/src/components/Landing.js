import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import Code from "./Code";
import Start from "./Start";
import Experiment from "./experiment/Experiment";

import MicRecorder from "mic-recorder-to-mp3";

const { Content } = Layout;

class Landing extends Component {
  renderDisplay() {
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
        console.log("recorder = ", recorder);

        // Start recording. Browser will request permission to use your microphone.
        recorder
          .start()
          .then(() => {
            console.log("starting recording");
          })
          .catch(e => {
            console.error(e);
          });
        //
        // // Once you are done singing your best song, stop and get the mp3.
        // recorder
        // .stop()
        // .getMp3().then(([buffer, blob]) => {
        //   // do what ever you want with buffer and blob
        //   // Example: Create a mp3 file and play
        //   const file = new File(buffer, 'me-at-thevoice.mp3', {
        //     type: blob.type,
        //     lastModified: Date.now()
        //   });
        //
        //   const player = new Audio(URL.createObjectURL(file));
        //   player.play();
        //
        // }).catch((e) => {
        //   alert('We could not retrieve your message');
        //   console.log(e);
        // });
        return <Experiment />;
      default:
        return <Code />;
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

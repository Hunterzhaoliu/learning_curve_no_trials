import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import InputField from "../input/InputField";
import "./conclusion.css";

class Conclusion extends Component {
  constructor() {
    super();
    this.state = {
      deviceType: "",
      deviceModel: "",
      submittedDeviceModel: false,
      deviceModelError: false,
      interferenceAnswer: "",
      feedback: "",
      requireFeedback: true
    };
  }

  onClickInterferenceAnswer = e => {
    this.setState({ interferenceAnswer: e.target.value });
  };

  onClickDeviceType = e => {
    this.setState({ deviceType: e.target.value });
  };

  onChangeFeedback = e => {
    this.setState({ feedback: e.target.value });
  };

  onChangeDeviceModel = e => {
    this.setState({ deviceModel: e.target.value });
    if (this.state.deviceModelError) {
      this.setState({ deviceModelError: false });
    }
  };

  onSubmitDeviceModel = () => {
    if (this.state.deviceModel === "") {
      this.setState({ deviceModelError: true });
    } else {
      this.setState({ submittedDeviceModel: true });
    }
  };

  onSubmitFeedback = () => {
    const { recorder } = this.props;

    try {
      recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const file = new File(buffer, "subject_" + this.props.dBID + ".mp3", {
            type: blob.type,
            lastModified: Date.now()
          });

          // file needs to be in this form in order to send to backend
          // https://medium.com/@aresnik11/how-to-upload-a-file-on-the-frontend-and-send-it-using-js-to-a-rails-backend-29755afaad06
          let formData = new FormData();
          formData.append("file", file);

          const conclusionAndAudio = {
            dBID: this.props.dBID,
            interferenceAnswer: this.state.interferenceAnswer,
            feedback: this.state.feedback,
            deviceType: this.state.deviceType,
            deviceModel: this.state.deviceModel,
            audioData: formData
          };

          this.props.saveConclusionAndAudio(conclusionAndAudio);
          this.setState({ requireFeedback: false });
        });
    } catch (error) {
      console.log("Stop recorder error = ", error);

      const conclusionAndAudio = {
        dBID: this.props.dBID,
        interferenceAnswer: this.state.interferenceAnswer,
        feedback: this.state.feedback,
        deviceType: this.state.deviceType,
        deviceModel: this.state.deviceModel,
        audioData: "failed audio"
      };
      this.props.saveConclusionAndAudio(conclusionAndAudio);
      this.setState({ requireFeedback: false });
    }
  };

  render() {
    if (this.state.deviceType === "") {
      return (
        <div className="div-absolute div-white">
          <div className="div-absolute-white-child">
            <h3 className="h3-conclusion-question">
              Parent: Which type of device are you using?
            </h3>
            <button
              value="android"
              onClick={this.onClickDeviceType}
              className="button-main"
            >
              Android
            </button>
            <button
              value="apple"
              onClick={this.onClickDeviceType}
              className="button-main button-right"
            >
              Apple
            </button>
          </div>
        </div>
      );
    } else if (!this.state.submittedDeviceModel) {
      return (
        <div className="div-absolute div-white">
          <div className="div-absolute-white-child">
            <h3 className="h3-conclusion-question">
              Parent: What model is your device (e.g. iPhone 7, Galaxy S7,
              etc.)?
            </h3>
            <InputField
              value={this.state.deviceModel}
              label="Device Model:"
              errorMessage="That doesn't seem to be a valid device model."
              hasError={this.state.deviceModelError}
              onChange={this.onChangeDeviceModel}
              width={"100%"}
              id="deviceModel"
              type="text"
            />
            <button
              onClick={this.onSubmitDeviceModel}
              className="button-main button-device-top-padding"
            >
              Next
            </button>
          </div>
        </div>
      );
    } else if (this.state.interferenceAnswer === "") {
      // need to ask parent if they or another child interfered at any point
      return (
        <div className="div-absolute div-white">
          <div className="div-absolute-white-child">
            <h3 className="h3-conclusion-question">
              Parent: Did another child or adult interfere with the game?
            </h3>
            <button
              value="yes"
              onClick={this.onClickInterferenceAnswer}
              className="button-main"
            >
              Yes
            </button>
            <button
              value="no"
              onClick={this.onClickInterferenceAnswer}
              className="button-main button-right"
            >
              No
            </button>
          </div>
        </div>
      );
    } else if (this.state.requireFeedback) {
      return (
        <div className="div-absolute div-white">
          <div className="div-absolute-white-child">
            <h3 className="h3-conclusion-question">
              Anything else we should know?
            </h3>
            <textarea
              className="textarea-feedback"
              placeholder="Feedback:"
              rows={5}
              onChange={this.onChangeFeedback}
            />
            <button onClick={this.onSubmitFeedback} className="button-main">
              Submit
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="div-absolute div-white">
          <h2 className="h2-thank-you">Thank you!</h2>
          <br />
          <h4>Credits</h4>
          <div className="div-credits">
            <a href="https://www.freepik.com/vectors/background">
              Background vector created by freepik - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/floral">
              Floral vector created by freepik - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/arrow">
              Arrow vector created by macrovector - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/vintage">
              Vintage vector created by freepik - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/background">
              Background vector created by freepik - www.freepik.com
            </a>
            <br />
            <div>
              Icons made by{" "}
              <a href="https://www.flaticon.com/authors/google" title="Google">
                Google{" "}
              </a>
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
              <br />
            </div>
            <a href="https://www.freepik.com/vectors/people">
              People vector created by freepik - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/children">
              Children vector created by macrovector - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/tree">
              Tree vector created by freepik - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/background">
              Background vector created by rawpixel.com - www.freepik.com
            </a>
            <br />
            <div>
              Icons made by{" "}
              <a
                href="https://www.flaticon.com/authors/pixel-perfect"
                title="Pixel perfect"
              >
                Pixel perfect{" "}
              </a>
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
              <br />
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    dBID: state.register.dBID,
    interferenceAnswer: state.experiment.interferenceAnswer
  };
}

function mapDispatchToProps(dispatch) {
  const experimentDispatchers = bindActionCreators(
    experimentActionCreators,
    dispatch
  );

  return {
    saveConclusionAndAudio: conclusionAndAudio => {
      experimentDispatchers.saveConclusionAndAudio(conclusionAndAudio);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conclusion);

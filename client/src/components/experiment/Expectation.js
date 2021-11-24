import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";

import "./expectation.css"

import microphone from "../../images/microphone.png";
import tallLeftExpectHighVideo from "../../audio/egg_drop_tall_left_expect_high.mp4";
import tallLeftExpectLowVideo from "../../audio/egg_drop_tall_left_expect_high.mp4";
import tallRightExpectHighVideo from "../../audio/egg_drop_tall_right_expect_high.mp4";
import tallRightExpectLowVideo from "../../audio/egg_drop_tall_left_expect_high.mp4";
import tallLeftBaselineVideo from "../../audio/egg_drop_tall_left_baseline.mp4";
import tallRightBaselineVideo from "../../audio/egg_drop_tall_right_baseline.mp4";

class Expectation extends Component {
  componentDidMount() {
    document.getElementById("expectationVideo").play();
  }

  onVideoEnded = () => {
    this.props.recorder
      .start()
      .then(() => {
        console.log("starting expectation recording");
      })
      .catch(error => {
        console.error("start expectation recording error = ", error);
      });

    setTimeout(function() {
      document.getElementById("microphoneImg").style.display = "inline-block";
    }, 2000);

    setTimeout(function() {
      document.getElementById("confirmExpectationButton").style.display = "inline-block";
    }, 4000);
  };

  onClick = () => {
    try {
      document.getElementById("microphoneImg").style.display = "none";

      this.props.recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const file = new File(
            buffer,
            "subject_" + this.props.dBID + "_expectation.mp3",
            {
              type: blob.type,
              lastModified: Date.now()
            }
          );

          // file needs to be in this form in order to send to backend
          // https://medium.com/@aresnik11/how-to-upload-a-file-on-the-frontend-and-send-it-using-js-to-a-rails-backend-29755afaad06
          let formData = new FormData();
          formData.append("file", file);

          this.props.saveAudio(formData);
        });
    } catch (error) {
      console.log("Stop expectation recorder error = ", error);
      this.props.saveAudio("failed audio");
    }

    this.props.advancePhase("summary");
  };

  render() {
    let expectationVideo = tallLeftExpectHighVideo;
    switch (this.props.condition) {
      case "tallLeftExpectLow":
        expectationVideo = tallLeftExpectLowVideo;
        break;
      case "tallRightExpectHigh":
        expectationVideo = tallRightExpectHighVideo;
        break;
      case "tallRightExpectLow":
        expectationVideo = tallRightExpectLowVideo;
        break;
      case "tallLeftBaseline":
        expectationVideo = tallLeftBaselineVideo;
        break;
      case "tallRightBaseline":
        expectationVideo = tallRightBaselineVideo;
        break;
      default:
        expectationVideo = tallLeftExpectHighVideo;
    }

    return (
      <div className="div-absolute">
        <video
          id="expectationVideo"
          className="video-expectation"
          onEnded={this.onVideoEnded}
        >
          <source src={expectationVideo} type="video/mp4" />
        </video>
        <div className="div-absolute">
          <button
            onClick={this.onClick}
            id="confirmExpectationButton"
            className="button-main button-introduction"
          >
            Next
          </button>
        <img
          className="img-microphone"
          id="microphoneImg"
          src={microphone}
          alt=""
        />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    condition: state.register.condition
  };
}

function mapDispatchToProps(dispatch) {
  const experimentDispatchers = bindActionCreators(
    experimentActionCreators,
    dispatch
  );

  return {
    advancePhase: nextPhase => {
      experimentDispatchers.advancePhase(nextPhase);
    },
    saveAudio: audiofile => {
      experimentDispatchers.saveAudio(audiofile);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Expectation);

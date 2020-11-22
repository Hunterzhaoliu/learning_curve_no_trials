import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import point from "../../images/point.png";
import "./congratulations.css";
import "./conclusion.css";

class Congratulations extends Component {
  constructor() {
    super();

    this.state = {
      status: "firstQ",
      questionOrder: Math.random()
    };

    // this.props.advancePhase("conclusion");
  }

  onClickNext = () => {
    // answered question
    try {
      document.getElementById("microphone").style.display = "none";
      document.getElementById("saidWhy").style.display = "none";

      this.props.recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const file = new File(
            buffer,
            "subject_" + this.props.dBID + "_question.mp3",
            {
              type: blob.type,
              lastModified: Date.now()
            }
          );

          let formData = new FormData();
          formData.append("file", file);

          this.props.saveAudio(formData);
        });
    } catch (error) {
      console.log("Stop question recorder error = ", error);
      this.props.saveAudio("failed audio");
    }

    // ask next question
    if (this.state.topButton < 0.5) {
      document.getElementById("questionSameAudio").play();
      console.log("questionSameAudio");
    } else {
      document.getElementById("questionBetterAudio").play();
      console.log("questionBetterAudio");
    }
  };

  onAudioEnded(audioId) {
    if (audioId === "confirmTreeAudio") {
      document.getElementById("treeConfirmationButtonDiv").style.display =
        "block";
    } else if (audioId === "askWhyAudio") {
      this.props.recorder
        .start()
        .then(() => {
          console.log("starting why recording");
        })
        .catch(error => {
          console.error("start why recording error = ", error);
        });

      setTimeout(function() {
        document.getElementById("microphone").style.display = "inline-block";
      }, 2000);

      setTimeout(function() {
        document.getElementById("saidWhy").style.display = "inline-block";
      }, 4000);
    }
  }

  render() {
    console.log("this.props = ", this.props);
    if (!this.props.isConfettiDone) {
      return (
        <div className="div-absolute confetti">
          <img className="img-point" src={point} alt="" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
          <div className="confetti-piece" />
        </div>
      );
    } else {
      switch (this.state.status) {
        case "firstQ":
          return (
            <div className="div-absolute div-white div-congratulations-q">
              <div className="div-absolute-white-child">
                <h3 className="h3-conclusion-question">
                  When you see the mic, tell me, would you rather do an EASY{" "}
                  {this.props.firstQuestion} question or a HARD{" "}
                  {this.props.firstQuestion} question?{" "}
                </h3>
                <button
                  id="question"
                  value="next"
                  onClick={this.onClick}
                  className="button-main"
                >
                  Next
                </button>
              </div>
            </div>
          );
        default:
          return <div />;
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    dBID: state.register.dBID
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
)(Congratulations);

import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./introduction.css";

import line1 from "../../audio/line1.wav";
import getParentAudio from "../../audio/get_parent.mp3";
import line2_and_name from "../../audio/line2_and_name.mp3";
import line2_age from "../../audio/line2_age.wav";
import child_assent from "../../audio/child_assent.mp3";
import line3_thank_you from "../../audio/line3_thank_you.wav";
import introductionVideoTallRight from "../../audio/intro_tall_right_no_trials.mp4";
import introductionVideoTallLeft from "../../audio/intro_tall_left_no_trials.mp4";

import parentChild from "../../images/parent_child.png";
import buttonPress from "../../images/button_press.png";
import child from "../../images/child.png";
import microphone from "../../images/microphone.png";
import thumbUp from "../../images/thumb_up.png";
import thumbDown from "../../images/thumb_down.png";
import handsOnLap from "../../images/hands_on_lap.png";

class Introduction extends Component {
  constructor() {
    super()
    this.state = {
      introductionStep: 0
    };
  }

  componentDidMount() {
    document.getElementById("line1").play();
    console.log("line1");
  }

  onClickContinue = () => {
    const introductionStep = this.state.introductionStep;
    switch (introductionStep) {
      case 0:
        // confirmed parent is around
        this.setState({ introductionStep: 1 });
        document.getElementById("line2_and_name").play();
        console.log("line2_and_name");

        // without changing the display, the confirm name button displays for
        // some reason
        document.getElementById("buttonIntroduction00").style.display = "none";
        document.getElementById("buttonIntroduction01").style.display = "none";
        break;
      case 1:
        // confirmed name
        try {
          document.getElementById("microphone").style.display = "none";

          this.props.recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
              const file = new File(
                buffer,
                "subject_" + this.props.dBID + "_name.mp3",
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
          console.log("Stop name recorder error = ", error);
          this.props.saveAudio("failed audio");
        }

        this.setState({ introductionStep: 2 });
        document.getElementById("line2_age").play();
        console.log("line2_age");
        break;
      case 2:
        // confirmed age
        try {
          document.getElementById("microphone").style.display = "none";

          this.props.recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
              const file = new File(
                buffer,
                "subject_" + this.props.dBID + "_age.mp3",
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
          console.log("Stop age recorder error = ", error);
          this.props.saveAudio("failed audio");
        }

        this.setState({ introductionStep: 3 });
        document.getElementById("child_assent").play();
        console.log("child_assent");
        break;
      case 3:
        // confirm child assent
        this.setState({ introductionStep: 4 });
        document.getElementById("line3_thank_you").play();
        console.log("line3_thank_you");
        break;
      case 4:
        // understands button press; display and play video
        document.getElementById("buttonIntroduction30").style.display = "none";
        const video = document.getElementById("introductionVideo");
        video.style.display = "inline-block";
        video.play();
        break;
      case 5:
        // didn't initially confirm child assent, but then confirmed
        this.setState({ introductionStep: 4 });
        document.getElementById("line3_thank_you").play();
        console.log("line3_thank_you");
        break;
      default:
    }
  };

  onClickNo = () => {
    switch (this.state.introductionStep) {
      case 0:
        document.getElementById("buttonIntroduction00").style.display = "none";
        document.getElementById("buttonIntroduction01").style.display = "none";
        document.getElementById("getParentAudio").play();
        console.log("getParentAudio");
        break;
      case 3:
        // Child does not want to play
        this.setState({ introductionStep: 5 });
        break;
      default:
    }
  };

  onTimeUpdate(currentTime, audioId) {
    if (audioId === "line2_and_name") {
      if (currentTime > 12) {
        document.getElementById("child").style.display = "inline-block";
        document.getElementById("buttonPress").style.display = "none";
      } else if (currentTime > 6) {
        document.getElementById("buttonPress").style.display = "inline-block";
      }
    } else if (audioId === "line3_thank_you" && currentTime > 6) {
      document.getElementById("handsOnLap").style.display = "inline-block";
    }
  }

  onAudioEnded(elementId) {
    if (elementId === "line1" || elementId === "getParentAudio") {
      // first number is which introductionStep and second is within introductionStep
      document.getElementById("buttonIntroduction00").style.display =
        "inline-block";
      document.getElementById("buttonIntroduction01").style.display =
        "inline-block";
    } else if (elementId === "line2_and_name") {
      this.props.recorder
        .start()
        .then(() => {
          console.log("starting name recording");
        })
        .catch(error => {
          console.error("start name recording error = ", error);
        });

      setTimeout(function() {
        document.getElementById("microphone").style.display = "inline-block";
      }, 2000);

      setTimeout(function() {
        document.getElementById("buttonIntroduction10").style.display =
          "inline-block";
      }, 4000);
    } else if (elementId === "line2_age") {
      this.props.recorder
        .start()
        .then(() => {
          console.log("starting age recording");
        })
        .catch(error => {
          console.error("start age recording error = ", error);
        });

      setTimeout(function() {
        document.getElementById("microphone").style.display = "inline-block";
      }, 2000);

      setTimeout(function() {
        document.getElementById("buttonIntroduction20").style.display =
          "inline-block";
      }, 4000);
    } else if (elementId === "child_assent") {
      document.getElementById("child").style.display =
        "none";
        document.getElementById("thumbUp").style.display =
        "inline-block";
        document.getElementById("thumbDown").style.display =
        "inline-block";
    } else if (elementId === "line3_thank_you") {
      document.getElementById("buttonIntroduction30").style.display =
        "inline-block";
    }
  }

  onVideoEnded = () => {
    this.props.advancePhase("practice");
  };

  renderIntroduction() {
    switch (this.state.introductionStep) {
      case 0:
        return (
          <div className="div-absolute">
            <audio onEnded={e => this.onAudioEnded(e.target.id)} id="line1">
              <source src={line1} type="audio/wav" />
            </audio>
            <img className="img-background" src={parentChild} alt="" />
            <div className="div-absolute">
              <button
                onClick={this.onClickContinue}
                id="buttonIntroduction00"
                className="button-main button-introduction"
              >
                Yes
              </button>
              <button
                onClick={this.onClickNo}
                id="buttonIntroduction01"
                className="button-main button-introduction button-right"
              >
                No
              </button>
            </div>
            <audio
              onEnded={e => this.onAudioEnded(e.target.id)}
              id="getParentAudio"
            >
              <source src={getParentAudio} type="audio/mp3" />
            </audio>
          </div>
        );
      case 1:
        return (
          <div className="div-absolute">
            <img
              className="img-background img-none"
              src={buttonPress}
              alt=""
              id="buttonPress"
            />
            <div className="div-absolute">
              <button
                onClick={this.onClickContinue}
                id="buttonIntroduction10"
                className="button-main button-introduction"
              >
                Next
              </button>
            </div>
            <img
              className="img-microphone"
              id="microphone"
              src={microphone}
              alt=""
            />
          </div>
        );
      case 2:
        return (
          <div className="div-absolute">
            <div className="div-absolute">
              <button
                onClick={this.onClickContinue}
                id="buttonIntroduction20"
                className="button-main button-introduction"
              >
                Next
              </button>
            </div>
            <img
              className="img-microphone"
              id="microphone"
              src={microphone}
              alt=""
            />
          </div>
        );
      case 3:
        return (
          <div className="div-absolute">
            <div className="div-absolute">
              <button
                onClick={this.onClickContinue}
                id="buttonThumbUp"
                className="button-thumb button-thumb-up"
              >
                <img
                  className="img-thumb"
                  src={thumbUp}
                  alt=""
                  id="thumbUp"
                />
              </button>
              <button
                onClick={this.onClickNo}
                id="buttonThumbDown"
                className="button-thumb button-thumb-down"
              >
                <img
                  className="img-thumb"
                  src={thumbDown}
                  alt=""
                  id="thumbDown"
                />
              </button>
            </div>
          </div>
        );
      case 4:
        const {condition} = this.props;
    
        let introductionVideo = introductionVideoTallLeft;

        const showTallTreeOnRight = condition === "tallRightExpectHigh" || +
          condition === "tallRightExpectLow" || condition === "tallRightBaseline"
        if (showTallTreeOnRight) {
          introductionVideo = introductionVideoTallRight;
        }
        return (
          <div className="div-absolute">
            <video
              id="introductionVideo"
              className="video-introduction"
              onEnded={this.onVideoEnded}
            >
              <source src={introductionVideo} type="video/mp4" />
            </video>
            <img
              className="img-background img-none"
              src={handsOnLap}
              alt=""
              id="handsOnLap"
            />
            <div className="div-absolute">
              <button
                onClick={this.onClickContinue}
                id="buttonIntroduction30"
                className="button-main button-introduction"
              >
                Child Hands on Lap
                <br /> and Ready to Listen
              </button>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="div-absolute">
            <div className="div-absolute content screen-edge-padding">
              <h3 className="row-upper-30-padding">
                Thank you! If you do want to play the game later, revisit the link!
              </h3>
              <button
                onClick={this.onClickContinue}
                id="reload"
                className="button-reload"
              >
                <img
                  className="img-reload"
                  src={thumbUp}
                  alt=""
                  id="reload"
                />
              </button>
            </div>
          </div>
        );
      default:
        return <div />;
    }
  }

  render() {
    return (
      <div className="div-absolute">
        <audio
          onTimeUpdate={e =>
            this.onTimeUpdate(e.target.currentTime, e.target.id)
          }
          onEnded={e => this.onAudioEnded(e.target.id)}
          id="line2_and_name"
        >
          <source src={line2_and_name} type="audio/mpeg" />
        </audio>
        <audio onEnded={e => this.onAudioEnded(e.target.id)} id="line2_age">
          <source src={line2_age} type="audio/wav" />
        </audio>
        <audio onEnded={e => this.onAudioEnded(e.target.id)} id="child_assent">
          <source src={child_assent} type="audio/mpeg" />
        </audio>
        <audio
          onTimeUpdate={e =>
            this.onTimeUpdate(e.target.currentTime, e.target.id)
          }
          onEnded={e => this.onAudioEnded(e.target.id)}
          id="line3_thank_you"
        >
          <source src={line3_thank_you} type="audio/wav" />
        </audio>
        <img
          className="img-background img-none"
          src={child}
          alt=""
          id="child"
        />
        {this.renderIntroduction()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dBID: state.register.dBID,
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
)(Introduction);

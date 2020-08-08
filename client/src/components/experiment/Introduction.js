import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./introduction.css";

import line1 from "../../audio/line1.wav";
import getParentAudio from "../../audio/get_parent.mp3";
import line2_and_name from "../../audio/line2_and_name.mp3";
import line2_age from "../../audio/line2_age.wav";
import line3_thank_you from "../../audio/line3_thank_you.wav";
import introductionVideo from "../../audio/intro.mp4";

import parentChild from "../../images/parent_child.png";
import buttonPress from "../../images/button_press.png";
import child from "../../images/child.png";
import handsOnLap from "../../images/hands_on_lap.png";

class Introduction extends Component {
  constructor() {
    super();
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
        this.setState({ introductionStep: 2 });
        document.getElementById("line2_age").play();
        console.log("line2_age");
        break;
      case 2:
        // confirmed age
        this.setState({ introductionStep: 3 });
        document.getElementById("line3_thank_you").play();
        console.log("line3_thank_you");
        break;
      case 3:
        // understands button press; display and play video
        document.getElementById("buttonIntroduction30").style.display = "none";
        const video = document.getElementById("introductionVideo");
        video.style.display = "inline-block";
        video.play();
        break;
      default:
    }
  };

  onClickNo = () => {
    document.getElementById("buttonIntroduction00").style.display = "none";
    document.getElementById("buttonIntroduction01").style.display = "none";
    document.getElementById("getParentAudio").play();
    console.log("getParentAudio");
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
      setTimeout(function() {
        document.getElementById("buttonIntroduction10").style.display =
          "inline-block";
      }, 2000);
    } else if (elementId === "line2_age") {
      setTimeout(function() {
        document.getElementById("buttonIntroduction20").style.display =
          "inline-block";
      }, 2000);
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
                Confirmed Name
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="div-absolute">
            <button
              onClick={this.onClickContinue}
              id="buttonIntroduction20"
              className="button-main button-introduction"
            >
              Confirmed Age
            </button>
          </div>
        );
      case 3:
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
)(Introduction);

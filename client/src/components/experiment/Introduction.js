import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./introduction.css";

import line1 from "../../audio/line1.wav";
import getParentAudio from "../../audio/get_parent.mp3";
import line2_3 from "../../audio/line2_3.wav";
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

  displayButtons() {
    setTimeout(function() {
      // first number is which introductionStep and second is within introductionStep
      document.getElementById("buttonIntroduction00").style.display =
        "inline-block";
      document.getElementById("buttonIntroduction01").style.display =
        "inline-block";
    }, 4000);
  }

  componentDidMount() {
    document.getElementById("line1").play();
    this.displayButtons();
  }

  onClickYes = () => {
    // confirmed parent is around
    this.setState({ introductionStep: 1 });
    document.getElementById("line2_3").play();
    setTimeout(function() {
      document.getElementById("buttonPress").style.display = "inline-block";
    }, 5000);
    setTimeout(function() {
      document.getElementById("child").style.display = "inline-block";
    }, 9000);
    setTimeout(function() {
      document.getElementById("handsOnLap").style.display = "inline-block";
    }, 20000);
    setTimeout(function() {
      document.getElementById("buttonIntroduction10").style.display =
        "inline-block";
    }, 23000);
  };

  onClickReady() {
    // understands button press; display and play video
    document.getElementById("buttonIntroduction10").style.display = "none";
    const video = document.getElementById("introductionVideo");
    video.style.display = "inline-block";
    video.play();
  }

  onClickNo = () => {
    document.getElementById("buttonIntroduction00").style.display = "none";
    document.getElementById("buttonIntroduction01").style.display = "none";
    document.getElementById("getParentAudio").play();

    setTimeout(() => {
      this.displayButtons();
    }, 5000);
  };

  onVideoEnd = () => {
    this.props.advancePhase("practice");
  };

  renderIntroduction() {
    switch (this.state.introductionStep) {
      case 0:
        return (
          <div className="div-absolute">
            <audio id="line1">
              <source src={line1} type="audio/wav" />
            </audio>
            <img className="img-background" src={parentChild} alt="" />
            <div className="div-absolute">
              <button
                onClick={this.onClickYes}
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
            <audio id="getParentAudio">
              <source src={getParentAudio} type="audio/mp3" />
            </audio>
          </div>
        );
      case 1:
        return (
          <div className="div-absolute">
            <video
              id="introductionVideo"
              className="video-introduction"
              onEnded={this.onVideoEnd}
            >
              <source src={introductionVideo} type="video/mp4" />
            </video>
            <img
              className="img-background img-none"
              src={handsOnLap}
              alt=""
              id="handsOnLap"
            />
            <img
              className="img-background img-none"
              src={child}
              alt=""
              id="child"
            />
            <img
              className="img-background img-none"
              src={buttonPress}
              alt=""
              id="buttonPress"
            />
            <div className="div-absolute">
              <button
                onClick={this.onClickReady}
                id="buttonIntroduction10"
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
        <audio id="line2_3">
          <source src={line2_3} type="audio/wav" />
        </audio>
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

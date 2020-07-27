import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./introduction.css";

import line1 from "../../audio/line1.wav";
import line2_3 from "../../audio/line2_3.wav";
import getParentAudio from "../../audio/bell.mp3";
import introductionVideo from "../../audio/introduction.mp4";

import parent_child from "../../images/parent_child.jpg";
import button_press from "../../images/button_press.png";

class Introduction extends Component {
  constructor() {
    super();
    this.state = {
      introductionStep: 0
    };
  }

  componentDidMount() {
    // document.getElementById("introductionAudio").play();
    setTimeout(() => {
      // first number is which introductionStep and second is within introductionStep
      document.getElementById("buttonIntroduction00").style.display =
        "inline-block";
      document.getElementById("buttonIntroduction01").style.display =
        "inline-block";
    }, 1000);
  }

  onClickTrue = () => {
    switch (this.state.introductionStep) {
      case 0:
        // confirmed parent is around
        this.setState({ introductionStep: 1 });
        // document.getElementById("buttonIntroduction00").style.display =
        //   "inline-block";
        document.getElementById("line2_3").play();
        break;
      case 1:
        // understands button press
        this.setState({ introductionStep: 2 });
        break;
      case 2:
        // understands button press
        this.setState({ introductionStep: 3 });
        break;
      default:
        return;
    }

    // const introductionVideo = document.getElementById("introductionVideo");
    // // display and then play video
    // introductionVideo.style.display = "block";
    // introductionVideo.play();
  };

  onClickFalse() {
    document.getElementById("getParentAudio").play();
  }

  onVideoEnd = () => {
    this.props.advancePhase("practice");
  };
  //   <video
  //     id="introductionVideo"
  //     className="video-introduction"
  //     onEnded={this.onVideoEnd}
  //   >
  //     <source src={introductionVideo} type="video/mp4" />
  //   </video>
  //   <button
  //     onClick={this.onClick}
  //     id="buttonIntroduction"
  //     className="button-main button-introduction"
  //   >
  //     Child Hands on Lap
  //     <br /> and Ready to Listen
  //   </button>

  renderIntroduction() {
    switch (this.state.introductionStep) {
      case 0:
        return (
          <div className="div-absolute">
            <audio id="line1">
              <source src={line1} type="audio/wav" />
            </audio>
            <img className="img-background" src={parent_child} alt="" />
            <div className="div-absolute">
              <button
                onClick={this.onClickTrue}
                id="buttonIntroduction00"
                className="button-main button-introduction"
              >
                Yes
              </button>
              <button
                onClick={this.onClickFalse}
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
        break;
      case 1:
        return (
          <div className="div-absolute">
            <img className="img-background" src={button_press} alt="" />
          </div>
        );
        break;
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

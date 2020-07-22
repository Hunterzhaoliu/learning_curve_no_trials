import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import introductionAudio from "../../audio/bell.mp3";
import introductionVideo from "../../audio/introduction.mp4";
import "./introduction.css";

class Introduction extends Component {
  componentDidMount() {
    document.getElementById("introductionAudio").play();
    setTimeout(() => {
      document.getElementById("buttonIntroduction").style.display =
        "inline-block";
    }, 1000);
  }

  onClick() {
    const introductionVideo = document.getElementById("introductionVideo");
    // display and then play video
    introductionVideo.style.display = "block";
    introductionVideo.play();
  }

  onVideoEnd = () => {
    this.props.advancePhase("practice");
  };

  render() {
    return (
      <div className="div-absolute">
        <audio id="introductionAudio">
          <source src={introductionAudio} type="audio/mpeg" />
        </audio>
        <video
          id="introductionVideo"
          className="video-introduction"
          onEnded={this.onVideoEnd}
        >
          <source src={introductionVideo} type="video/mp4" />
        </video>
        <button
          onClick={this.onClick}
          id="buttonIntroduction"
          className="button-main button-introduction"
        >
          Child Hands on Lap
          <br /> and Ready to Listen
        </button>
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

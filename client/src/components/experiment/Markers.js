import React, { Component } from "react";
import { connect } from "react-redux";
import "./markers.css";
import markTrialAudio from "../../audio/line11_12.mp3";
import markFinalTrialAudio from "../../audio/line11.wav";
import one from "../../images/numbers/one.png";
import two from "../../images/numbers/two.png";
import three from "../../images/numbers/three.png";
import four from "../../images/numbers/four.png";

import { EGG_PLATFORM_WIDTH, EGG_FALL_INCREASING } from "./constants";

class Markers extends Component {
  renderMarkers = () => {
    const { condition, trial } = this.props;

    const markerHeight = 30;
    const markerImageList = [one, two, three, four];

    // need to subtract 1 from trial because once a trial finishes, the trial
    // count in props gets incremented, so need to display markers for previous
    // trials and trial that just finished

    // -35% corresponds to the same amount of space between marker and ladder
    // when displayed on left side compared to 110% space between marker and
    // ladder when displayed on right side
    let markerLeft = "-35%";

    const showTallTreeOnRight = condition === "tallRightExpectHigh" || +
      condition === "tallRightExpectLow" || condition === "tallRightBaseline"
       
    if (showTallTreeOnRight) {
      markerLeft = "110%"
    }

    let markerImages = [];
    
    for (let i = 0; i < trial - 1; i++) {
      const eggFallPercentage = String(100 - EGG_FALL_INCREASING[i]);

      const markerTop =
        "calc(" +
        eggFallPercentage +
        "% - " +
        String(1.1 * markerHeight) + // 1.1 was made up
        "px)";

      markerImages.push(
        <img
          key={i}
          style={{
            top: markerTop,
            left: markerLeft,
            height: markerHeight
          }}
          className="img-number"
          src={markerImageList[i]}
          alt=""
          id={"marker" + String(i)}
        />
      );
    }
    return markerImages;
  };

  render() {
    const markersLeft =
      "calc(50% - " + String(EGG_PLATFORM_WIDTH / 2) + "px)";

    return (
      <div style={{ left: markersLeft, zIndex: 2 }} className="slider-container">
        <audio
          onEnded={e => this.props.onAudioEnded(e.target.id)}
          id="markTrialAudio"
        >
          <source src={markTrialAudio} type="audio/mpeg" />
        </audio>
        <audio
          onEnded={e => this.props.onAudioEnded(e.target.id)}
          id="markFinalTrialAudio"
        >
          <source src={markFinalTrialAudio} type="audio/wav" />
        </audio>
        {this.renderMarkers()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    condition: state.register.condition,
    trial: state.experiment.trial
  };
}

export default connect(
  mapStateToProps,
  null
)(Markers);

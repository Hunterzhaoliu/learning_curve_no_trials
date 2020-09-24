import React, { Component } from "react";
import { connect } from "react-redux";
import "./markers.css";
import markTrialAudio from "../../audio/crack_line11_12.mp3";
import markFinalTrialAudio from "../../audio/crack_line11.mp3";
import one from "../../images/numbers/one.png";
import two from "../../images/numbers/two.png";
import three from "../../images/numbers/three.png";
import four from "../../images/numbers/four.png";

import { EGG_FALL_INCREASING } from "./constants";

class Markers extends Component {
  renderMarkers = () => {
    const { condition, trial } = this.props;

    const markerHeight = 30;
    const markerImageList = [one, two, three, four];

    // need to subtract 1 from trial because once a trial finishes, the trial
    // count in props gets incremented, so need to display markers for previous
    // trials and trial that just finished

    let markerImages = [];
    for (let i = 0; i < trial - 1; i++) {
      let eggFallPercentage;
      let markerLeft;

      if (condition === "constant") {
        // Constant condition where egg gets to the last marker
        eggFallPercentage = String(100 - EGG_FALL_INCREASING[3]);
        markerLeft = "calc(110% + " + String(20 * i) + "px)";
      } else {
        eggFallPercentage = String(100 - EGG_FALL_INCREASING[i]);
        markerLeft = "110%";
      }

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
    return (
      <div>
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
          <source src={markFinalTrialAudio} type="audio/mpeg" />
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

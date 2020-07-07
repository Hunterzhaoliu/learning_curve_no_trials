import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import Markers from "./Markers";
import summaryAudio from "../../audio/bell.mp3";
import background from "../../images/background.png";
import "./summary.css";
import "./trial.css";

class Summary extends Component {
  componentDidMount() {
    setTimeout(function() {
      document.getElementById("summaryAudio").play();
    }, 1000);

    const markerHighlightDelay = [1000, 2000, 3000, 4000];
    for (let i = 0; i < 4; i++) {
      // need to highlight each marker as the audio walks through them
      setTimeout(function() {
        document.getElementById("marker" + String(i)).style.border =
          "2px solid #639a3b";
      }, markerHighlightDelay[i]);
    }

    // highlight the two tree choices
    setTimeout(function() {
      document.getElementById("buttonLeftTree").style.border =
        "2px solid #639a3b";
    }, 6000);
    setTimeout(function() {
      document.getElementById("buttonRightTree").style.border =
        "2px solid #639a3b";
    }, 8000);
  }

  onClick = e => {
    this.props.saveTreeChoice(e.target.value);
  };

  render() {
    // values also in Trial.js file
    const sliderTopPercent = 11;
    const ladderHeightPercent = 83 - 11;
    const eggPlatformWidth = 125;

    // marker left is 110% of eggPlatformWidth in Markers.js
    // after reaching half screen, add an additional 60% of eggPlatformWidth
    const sliderLeft = "calc(50% + " + String(eggPlatformWidth * 0.6) + "px)";
    return (
      <div>
        <div
          style={{
            position: "absolute",
            left: sliderLeft,
            top: String(sliderTopPercent) + "%",
            height: String(ladderHeightPercent) + "%"
          }}
        >
          <Markers />
        </div>
        <audio id="summaryAudio">
          <source src={summaryAudio} type="audio/mpeg" />
        </audio>
        <img className="img-background" src={background} alt="" />
        <button
          value="right"
          onClick={this.onClick}
          className="button-tree right-tree"
          id="buttonRightTree"
        />
        <button
          value="left"
          onClick={this.onClick}
          className="button-tree left-tree"
          id="buttonLeftTree"
        />
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
    saveTreeChoice: treeChoice => {
      experimentDispatchers.saveTreeChoice(treeChoice);
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Summary);

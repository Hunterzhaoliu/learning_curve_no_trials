import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import Markers from "./Markers";
import summaryAudio from "../../audio/bell.mp3";
import "./summary.css";
import "./trial.css";

import {
  SLIDER_TOP_PERCENT,
  SCREEN_TO_LADDER_BOTTOM_PERCENT,
  EGG_PLATFORM_WIDTH
} from "./constants";

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      treeChoice: ""
    };
  }

  componentDidMount() {
    setTimeout(function() {
      document.getElementById("summaryAudio").play();
      console.log("summaryAudio");
    }, 1000);

    const markerHighlightDelay = [1000, 2000, 3000, 4000];
    // highlight the first marker so the for loop can remove the previous
    // marker's highlight in the same iteration
    setTimeout(function() {
      document.getElementById("marker0").style.border = "3px solid #639a3b";
    }, markerHighlightDelay[0]);
    for (let i = 1; i < 4; i++) {
      // need to highlight each marker as the audio walks through them and
      // unhighlight the previous marker
      setTimeout(function() {
        document.getElementById("marker" + String(i - 1)).style.border = "none";
        document.getElementById("marker" + String(i)).style.border =
          "3px solid #639a3b";
      }, markerHighlightDelay[i]);
    }

    // highlight the two tree choices
    setTimeout(function() {
      // unhighlight the last marker
      document.getElementById("marker3").style.border = "none";

      // display and highlight left tree
      document.getElementById("buttonLeftTree").style.display = "block";
      document.getElementById("buttonLeftTree").style.border =
        "5px solid #639a3b";
    }, 6000);
    setTimeout(function() {
      // unhighlight the left tree
      document.getElementById("buttonLeftTree").style.border = "none";

      // display and highlight right tree
      document.getElementById("buttonRightTree").style.display = "block";
      document.getElementById("buttonRightTree").style.border =
        "5px solid #639a3b";

      // unhighlight the last tree
      setTimeout(function() {
        document.getElementById("buttonRightTree").style.border = "none";
      }, 1000);
    }, 8000);
  }

  onClick = e => {
    // this.setState({ treeChoice: e.target.value });
    // ask comprehension questions
    this.props.saveTreeChoice(e.target.value);
  };

  render() {
    const ladderHeightPercent =
      SCREEN_TO_LADDER_BOTTOM_PERCENT - SLIDER_TOP_PERCENT;

    // marker left is 110% of eggPlatformWidth in Markers.js
    // after reaching half screen, add an additional 60% of eggPlatformWidth
    const sliderLeft = "calc(50% + " + String(EGG_PLATFORM_WIDTH * 0.6) + "px)";
    return (
      <div>
        <div
          style={{
            position: "absolute",
            left: sliderLeft,
            top: String(SLIDER_TOP_PERCENT) + "%",
            height: String(ladderHeightPercent) + "%"
          }}
        >
          <Markers />
        </div>
        <audio id="summaryAudio">
          <source src={summaryAudio} type="audio/mpeg" />
        </audio>
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

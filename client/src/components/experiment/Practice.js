import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import practiceAudio from "../../audio/bell.mp3";
import Trial from "./Trial";
import "./practice.css";

class Practice extends Component {
  componentDidMount() {
    document.getElementById("practiceAudio").play();

    setTimeout(() => {
      document.getElementById("buttonPractice").style.display = "inline-block";
    }, 5000);
  }

  onClick = () => {
    this.props.advancePhase("instruction");
  };

  render() {
    // using tree choice to determine whether to show Guess component
    return (
      <div className="div-absolute">
        <audio id="practiceAudio">
          <source src={practiceAudio} type="audio/mpeg" />
        </audio>
        <button
          onClick={this.onClick}
          id="buttonPractice"
          className="button-main button-practice"
        >
          Done with Practice <br />
          Hands Back on Lap
        </button>
        <Trial eggFallPercentage={110} treeChoice="practice" />
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
)(Practice);

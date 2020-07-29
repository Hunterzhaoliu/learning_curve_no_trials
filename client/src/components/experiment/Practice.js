import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import line4 from "../../audio/line4.wav";
import Trial from "./Trial";
import "./practice.css";

class Practice extends Component {
  componentDidMount() {
    document.getElementById("line4").play();
    // don't want to display egg while in practice
    document.getElementById("egg").style.display = "none";
    setTimeout(() => {
      document.getElementById("buttonPractice").style.display = "inline-block";
    }, 5000);
  }

  onClick = () => {
    console.log("onClick to instruction");
    this.props.advancePhase("instruction");
  };

  render() {
    // using tree choice to determine whether to show Guess component
    return (
      <div className="div-absolute">
        <audio id="line4">
          <source src={line4} type="audio/wav" />
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

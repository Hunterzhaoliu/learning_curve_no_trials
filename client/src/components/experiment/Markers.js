import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./markers.css";
import one from "../../images/numbers/one.png";
import markTrialAudio from "../../audio/bell.mp3";

class Markers extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     eggHeight: 0,
  //     platformHeight: 0,
  //     eggAnimation: "none",
  //     eggFalling: false
  //   };
  // }

  render() {
    const { condition, trial } = this.props;

    let eggFallPercentage;
    if (condition === 1) {
      eggFallPercentage = 80;
    } else if (condition === 2) {
      eggFallPercentage = trial * 20;
    }
    // const { windowWidth, windowHeight } = this.props;
    //
    // const ladderHeight = 0.72 * windowHeight;
    //
    // const eggPlatformWidth = 150;
    // const eggPlatformHeight = 20;
    //
    // const sliderLeft = (windowWidth - eggPlatformWidth) / 2;
    //
    // const platformTop =
    //   (1 - this.state.eggHeight * 0.01) * ladderHeight - eggPlatformHeight / 2;
    //
    // const eggHeight = 75;
    // const eggWidth = 57;
    // const eggTop = platformTop - eggHeight;
    // const eggLeft = (eggPlatformWidth - eggWidth) / 2;

    return (
      <div>
        <audio id="markTrialAudio">
          <source src={markTrialAudio} type="audio/mpeg" />
        </audio>
        <img style={{}} className="img-number" src={one} alt="" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    windowWidth: state.initialize.windowWidth,
    windowHeight: state.initialize.windowHeight,
    condition: state.register.condition,
    trial: state.experiment.trial
  };
}

// function mapDispatchToProps(dispatch) {
//   const experimentDispatchers = bindActionCreators(
//     experimentActionCreators,
//     dispatch
//   );
//
//   return {
//     completedTrial: userCode => {
//       experimentDispatchers.completedTrial(userCode);
//     }
//   };
// }

export default connect(
  mapStateToProps,
  null
)(Markers);

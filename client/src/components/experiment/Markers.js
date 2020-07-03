import React, { Component } from "react";
import { connect } from "react-redux";
// import * as experimentActionCreators from "../../actions/experiment";
// import { bindActionCreators } from "redux";
import _ from "lodash";
import "./markers.css";
import markTrialAudio from "../../audio/bell.mp3";
import one from "../../images/numbers/one.png";
// import two from "../../images/numbers/two.png";
// import three from "../../images/numbers/three.png";
// import four from "../../images/numbers/four.png";

class Markers extends Component {
  renderMarkers = () => {
    // const { condition, trial } = this.props;

    // let eggFallPercentage;
    // if (condition === 1) {
    //   eggFallPercentage = 80;
    // } else if (condition === 2) {
    //   eggFallPercentage = trial * 20;
    // }
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

    // return _.map(dropdownOptions[id], (option, optionIndex) => {
    //   return (
    //     <Option key={optionIndex} value={option}>
    //       {option}
    //     </Option>
    //   );
    // });
    for (let i = 0; i < 4; i++) {
      return <img style={{}} className="img-number" src={one} alt="" />;
    }
  };

  render() {
    return (
      <div>
        <audio id="markTrialAudio">
          <source src={markTrialAudio} type="audio/mpeg" />
        </audio>
        {this.renderMarkers()}
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

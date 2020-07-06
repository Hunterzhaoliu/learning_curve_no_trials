import React, { Component } from "react";
import { connect } from "react-redux";
// import * as experimentActionCreators from "../../actions/experiment";
// import { bindActionCreators } from "redux";
import "./markers.css";
import markTrialAudio from "../../audio/bell.mp3";
import one from "../../images/numbers/one.png";
import two from "../../images/numbers/two.png";
import three from "../../images/numbers/three.png";
import four from "../../images/numbers/four.png";

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
      // preset constant condition 1 where egg gets 80% up ladder
      let eggFallPercentage = "20";
      if (condition === 2) {
        eggFallPercentage = String(80 - 20 * i);
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
            left: "110%",
            height: markerHeight
          }}
          className="img-number"
          src={markerImageList[i]}
          alt=""
        />
      );
    }
    return markerImages;
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

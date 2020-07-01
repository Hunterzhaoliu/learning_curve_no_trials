import React, { Component } from "react";
import { connect } from "react-redux";
// import * as experimentActionCreators from "../actions/experiment";
// import { bindActionCreators } from "redux";
import "./experiment.css";
import background from "../images/background.png";
import egg_platform from "../images/egg_platform.png";
import egg from "../images/egg.png";

class Experiment extends Component {
  constructor() {
    super();
    this.state = {
      eggHeight: 0
    };
  }

  onChange = e => {
    // console.log("e.target.value = ", e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { windowWidth, windowHeight } = this.props;

    const eggPlatformWidth = 150;
    const eggPlatformHeight = 20;

    const ladderHeight = 0.74 * windowHeight;

    document.documentElement.style.setProperty(
      "--egg-platform-width",
      String(eggPlatformWidth) + "px"
    );
    document.documentElement.style.setProperty(
      "--egg-platform-height",
      String(eggPlatformHeight) + "px"
    );
    document.documentElement.style.setProperty(
      "--ladder-height",
      String(ladderHeight) + "px"
    );

    const sliderLeft = (windowWidth - eggPlatformWidth) / 2;

    const platformHeight =
      (1 - this.state.eggHeight * 0.01) * ladderHeight - eggPlatformHeight / 2;

    return (
      <div>
        <img className="img-background" src={background} alt="" />
        <div style={{ left: sliderLeft }} className="slider-container">
          <input
            onChange={this.onChange}
            type="range"
            min="1"
            max="100"
            value={this.state.eggHeight}
            className="slider"
            id="eggHeight"
          />
          <img
            style={{ top: platformHeight }}
            className="img-egg-platform"
            src={egg_platform}
            alt=""
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    windowWidth: state.initialize.windowWidth,
    windowHeight: state.initialize.windowHeight
  };
}
//
// function mapDispatchToProps(dispatch) {
//   const experimentDispatchers = bindActionCreators(
//     experimentActionCreators,
//     dispatch
//   );
//
//   return {
//     checkCode: userCode => {
//       experimentDispatchers.checkCode(userCode);
//     }
//   };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Experiment);

export default connect(
  mapStateToProps,
  null
)(Experiment);

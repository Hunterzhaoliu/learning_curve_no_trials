import React, { Component } from "react";
import { connect } from "react-redux";
// import * as experimentActionCreators from "../actions/experiment";
// import { bindActionCreators } from "redux";
import "./experiment.css";
import background from "../images/background.png";

class Experiment extends Component {
  constructor() {
    super();
    this.state = {
      eggHeight: 0
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { windowWidth } = this.props;

    const eggPlatformWidth = 100;
    document.documentElement.style.setProperty(
      "--egg-platform-width",
      String(eggPlatformWidth) + "px"
    );

    const sliderLeft = (windowWidth - eggPlatformWidth) / 2;
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
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    windowWidth: state.initialize.windowWidth
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

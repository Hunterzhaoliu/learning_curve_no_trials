import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./conclusion.css";

class Conclusion extends Component {
  onClick = e => {
    this.props.saveInterferenceAnswer(this.props.dBID, e.target.value);
  };

  render() {
    if (this.props.interferenceAnswer === "") {
      // need to ask parent if they or another child interfered at any point
      return (
        <div className="div-absolute div-white">
          <h3 className="h3-interference-question">
            Parent: Did another child or adult interfere with the game?
          </h3>
          <button value="yes" onClick={this.onClick} className="button-main">
            Yes
          </button>
          <button
            value="no"
            onClick={this.onClick}
            className="button-main button-right"
          >
            No
          </button>
        </div>
      );
    } else {
      return (
        <div className="div-absolute div-white">
          <h2 className="h2-thank-you">Thank you!</h2>
          <br />
          <h4>Credits</h4>
          <div className="div-credits">
            <a href="https://www.freepik.com/vectors/background">
              Background vector created by freepik - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/floral">
              Floral vector created by freepik - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/arrow">
              Arrow vector created by macrovector - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/vintage">
              Vintage vector created by freepik - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/background">
              Background vector created by freepik - www.freepik.com
            </a>
            <br />
            <div>
              Icons made by{" "}
              <a href="https://www.flaticon.com/authors/google" title="Google">
                Google{" "}
              </a>
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
              <br />
            </div>
            <a href="https://www.freepik.com/vectors/people">
              People vector created by freepik - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/children">
              Children vector created by macrovector - www.freepik.com
            </a>
            <br />
            <a href="https://www.freepik.com/vectors/tree">
              Tree vector created by freepik - www.freepik.com
            </a>
            <br />
            <div>
              Icons made by{" "}
              <a
                href="https://www.flaticon.com/authors/pixel-perfect"
                title="Pixel perfect"
              >
                Pixel perfect{" "}
              </a>
              from{" "}
              <a href="https://www.flaticon.com/" title="Flaticon">
                www.flaticon.com
              </a>
              <br />
            </div>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    dBID: state.register.dBID,
    interferenceAnswer: state.experiment.interferenceAnswer
  };
}

function mapDispatchToProps(dispatch) {
  const experimentDispatchers = bindActionCreators(
    experimentActionCreators,
    dispatch
  );

  return {
    saveInterferenceAnswer: (dBID, interferenceAnswer) => {
      experimentDispatchers.saveInterferenceAnswer(dBID, interferenceAnswer);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conclusion);

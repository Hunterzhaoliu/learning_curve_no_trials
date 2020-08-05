import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
// import InputField from "../input/InputField";
import "./conclusion.css";

class Conclusion extends Component {
  constructor() {
    super();
    this.state = {
      interferenceAnswer: "",
      feedback: "",
      requireFeedback: true
    };
  }

  onClick = e => {
    this.setState({ interferenceAnswer: e.target.value });
  };

  onChange = e => {
    this.setState({ feedback: e.target.value });
  };

  onSubmit = () => {
    const conclusionResponses = {
      dBID: this.props.dBID,
      interferenceAnswer: this.state.interferenceAnswer,
      feedback: this.state.feedback
    };
    this.props.saveConclusion(conclusionResponses);
    this.setState({ requireFeedback: false });
  };

  render() {
    if (this.state.interferenceAnswer === "") {
      // need to ask parent if they or another child interfered at any point
      return (
        <div className="div-absolute div-white">
          <h3 className="h3-conclusion-question">
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
    } else if (this.state.requireFeedback) {
      return (
        <div className="div-absolute div-white">
          <h3 className="h3-conclusion-question">
            Anything else we should know?
          </h3>
          <textarea
            className="textarea-feedback"
            placeholder="Feedback:"
            rows={5}
            onChange={this.onChange}
          />
          <button onClick={this.onSubmit} className="button-main">
            Submit
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
    saveConclusion: conclusionResponses => {
      experimentDispatchers.saveConclusion(conclusionResponses);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conclusion);

import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import { osName, browserName, mobileModel } from "react-device-detect";
import "./conclusion.css";

class Conclusion extends Component {
  constructor() {
    super();
    this.state = {
      interferenceAnswer: "",
      feedback: "",
      requireFeedback: true,
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      longitude: null,
      latitude: null
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateWindowDimensions);

    if (navigator.geolocation) {
      // asynchronous function
      navigator.geolocation.getCurrentPosition(this.savePosition);
    }
  }

  updateWindowDimensions() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight
    });
  }

  savePosition = position => {
    this.setState({
      longitude: position.coords.longitude,
      latitude: position.coords.latitude
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  onClick = e => {
    this.setState({ interferenceAnswer: e.target.value });
  };

  onChange = e => {
    this.setState({ feedback: e.target.value });
  };

  onSubmit = () => {
    const conclusionData = {
      dBID: this.props.dBID,
      interferenceAnswer: this.state.interferenceAnswer,
      feedback: this.state.feedback,
      deviceType: osName,
      deviceModel: mobileModel,
      browser: browserName,
      windowWidth: this.state.windowWidth,
      windowHeight: this.state.windowHeight,
      longitude: this.state.longitude,
      latitude: this.state.latitude
    };

    this.props.saveConclusion(conclusionData);
    this.setState({ requireFeedback: false });
  };

  render() {
    if (this.state.interferenceAnswer === "") {
      // need to ask parent if they or another child interfered at any point
      return (
        <div className="div-absolute div-white">
          <div className="div-absolute-white-child">
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
        </div>
      );
    } else if (this.state.requireFeedback) {
      return (
        <div className="div-absolute div-white">
          <div className="div-absolute-white-child">
            <h3 className="h3-conclusion-question">Anything we should know?</h3>
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
            <a href="https://www.freepik.com/vectors/background">
              Background vector created by rawpixel.com - www.freepik.com
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
    saveConclusion: conclusionData => {
      experimentDispatchers.saveConclusion(conclusionData);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Conclusion);

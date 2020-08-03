import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import point from "../../images/point.png";
import "./congratulations.css";

class Congratulations extends Component {
  componentDidMount() {
    setTimeout(() => {
      // ask final interference question and show credits
      this.props.advancePhase("conclusion");
    }, 3000);
  }

  render() {
    console.log("display confetti");
    return (
      <div className="div-absolute confetti">
        <img className="img-point" src={point} alt="" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
        <div className="confetti-piece" />
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
)(Congratulations);

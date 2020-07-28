import React, { Component } from "react";
import { connect } from "react-redux";
// import $ from "jquery";
import congratulationsAudio from "../../audio/congratulations.wav";
import "./congratulations.css";

class Congratulations extends Component {
  render() {
    const { showCongratulations } = this.props;

    if (!showCongratulations) {
      return <div />;
    } else {
      return (
        <div className="confetti">
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
          <audio autoPlay id="congratulationsAudio">
            <source src={congratulationsAudio} type="audio/mpeg" />
          </audio>
        </div>
      );
    }
  }
}

export default connect(
  null,
  null
)(Congratulations);

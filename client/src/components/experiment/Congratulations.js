import React, { Component } from "react";
import { connect } from "react-redux";
import point from "../../images/point.png";
import "./congratulations.css";

import congratulationsAudio from "../../audio/congratulations.wav";

class Congratulations extends Component {
  componentDidMount() {
    document.getElementById("congratulationsAudio").play();
    console.log("congratulationsAudio");
  }
  render() {
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
        <audio id="congratulationsAudio">
          <source src={congratulationsAudio} type="audio/wav" />
        </audio>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Congratulations);

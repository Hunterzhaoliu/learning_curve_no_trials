import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./trial.css";
import "./guess.css";

import confirmGuessAudio from "../../audio/line8.wav";
import guessAgainAudio from "../../audio/line12_cut.wav";

import star from "../../images/star.png";

import { EGG_PLATFORM_WIDTH } from "./constants";

class Guess extends Component {
  constructor() {
    super();
    this.state = {
      guessHeight: 0,
      gavePotentialGuess: false
    };
  }

  onClick = e => {
    if (e.target.value === "yes") {
      // successfully made guess, need to save into redux state and move on
      // with trial
      this.props.saveGuess(this.state.guessHeight);
      this.setState({ guessHeight: 0, gavePotentialGuess: false });
    } else {
      this.setState({ guessHeight: 0, gavePotentialGuess: false });
      document.getElementById("guessAgainAudio").play();
      console.log("guessAgainAudio");
    }
  };

  renderConfirmButtons() {
    const starHeight = 50;
    const starTop =
      "calc(" +
      String(100 - this.state.guessHeight) +
      "% - " +
      String(starHeight / 2) +
      "px)";

    const starLeft = "calc(50% - " + String(starHeight / 2) + "px)";

    document.documentElement.style.setProperty(
      "--star-height",
      String(starHeight) + "px"
    );

    // for the star display after confirmation
    document.documentElement.style.setProperty("--star-top", starTop);
    document.documentElement.style.setProperty("--star-left", starLeft);

    return (
      <div style={{ top: starTop }} className="star-and-buttons">
        <img className="img-star" src={star} alt="" />
        <div>
          <button
            value="yes"
            onClick={this.onClick}
            className="button-main button-confirm-guess"
            id="yesButton"
          >
            Yes
          </button>
          <button
            value="no"
            onClick={this.onClick}
            className="button-main button-confirm-guess"
            id="noButton"
          >
            No
          </button>
        </div>
      </div>
    );
  }

  renderConfirmGuess() {
    if (this.state.gavePotentialGuess) {
      return this.renderConfirmButtons();
    }
  }

  onGuess = e => {
    document.getElementById("confirmGuessAudio").play();
    const rectangle = e.target.getBoundingClientRect();
    // determine how high (%) user guessed and save to state
    const guess = (100 * (rectangle.bottom - e.clientY)) / rectangle.height;
    this.setState({ guessHeight: guess, gavePotentialGuess: true });
  };

  renderGuess() {
    const { hasGuessed } = this.props;
    if (hasGuessed) {
      return <img className="img-star img-guess-star" src={star} alt="" />;
    } else {
      // render slider on tree to allow subject to guess
      return (
        <div className="div-guess">
          <div
            className="div-guess-slider"
            onClick={this.onGuess}
            onMouseUp={this.onChangeEnd}
            onTouchEnd={this.onChangeEnd}
          />
          {this.renderConfirmGuess()}
          <audio id="confirmGuessAudio">
            <source src={confirmGuessAudio} type="audio/wav" />
          </audio>
          <audio id="guessAgainAudio">
            <source src={guessAgainAudio} type="audio/wav" />
          </audio>
        </div>
      );
    }
  }

  render() {
    const guessSliderLeft =
      "calc(50% + " + String(EGG_PLATFORM_WIDTH / 2) + "px)";

    return (
      <div style={{ left: guessSliderLeft }} className="slider-container">
        {this.renderGuess()}
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
    saveGuess: guessHeight => {
      experimentDispatchers.saveGuess(guessHeight);
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(Guess);

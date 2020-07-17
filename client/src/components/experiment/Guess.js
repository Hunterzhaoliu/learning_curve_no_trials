import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./trial.css";
import "./guess.css";
import makeGuessAudio from "../../audio/bell.mp3";
import confirmGuessAudio from "../../audio/bell.mp3";
import confirmTopGuessAudio from "../../audio/bell.mp3";
import guessAgainAudio from "../../audio/bell.mp3";
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

  componentDidMount() {
    setTimeout(function() {
      document.getElementById("makeGuessAudio").play();
      console.log("makeGuessAudio");
    }, 1000);
  }

  onClick = e => {
    if (e.target.value === "yes") {
      // successfully made guess, need to save into redux state and move on
      // with trial
      this.props.saveGuess(this.state.guessHeight);
      this.setState({ guessHeight: 0, gavePotentialGuess: false });
    } else {
      this.setState({ guessHeight: 0, gavePotentialGuess: false });
      setTimeout(function() {
        document.getElementById("guessAgainAudio").play();
        console.log("guessAgainAudio");
      }, 1000);
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
          >
            Yes
          </button>
          <button
            value="no"
            onClick={this.onClick}
            className="button-main button-confirm-guess"
          >
            No
          </button>
        </div>
      </div>
    );
  }

  renderConfirmGuess() {
    console.log("renderConfirmGuess");

    if (this.state.gavePotentialGuess) {
      if (this.state.guessHeight < 97) {
        setTimeout(function() {
          document.getElementById("confirmGuessAudio").play();
          console.log("confirmGuessAudio");
        }, 1000);
        return this.renderConfirmButtons();
      } else {
        // confirm that subject guessed at the top of the tree
        setTimeout(function() {
          document.getElementById("confirmTopGuessAudio").play();
          console.log("confirmTopGuessAudio");
        }, 1000);
        return this.renderConfirmButtons();
      }
    }
  }

  onGuess = e => {
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
          <audio id="makeGuessAudio">
            <source src={makeGuessAudio} type="audio/mpeg" />
          </audio>
          <div
            className="div-guess-slider"
            onClick={this.onGuess}
            onMouseUp={this.onChangeEnd}
            onTouchEnd={this.onChangeEnd}
          />
          {this.renderConfirmGuess()}
          <audio id="confirmGuessAudio">
            <source src={confirmGuessAudio} type="audio/mpeg" />
          </audio>
          <audio id="confirmTopGuessAudio">
            <source src={confirmTopGuessAudio} type="audio/mpeg" />
          </audio>
          <audio id="guessAgainAudio">
            <source src={guessAgainAudio} type="audio/mpeg" />
          </audio>
        </div>
      );
    }
  }

  render() {
    //   const ladderHeightPercent = SCREEN_TO_LADDER_BOTTOM_PERCENT - SLIDER_TOP_PERCENT;
    // const guessSliderTop = SLIDER_TOP_PERCENT;
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

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

  onChange = e => {
    // console.log("e.target.value = ", e.target.value);
    this.setState({ guessHeight: e.target.value });
  };

  onChangeEnd = () => {
    this.setState({ gavePotentialGuess: true });
  };

  onClick = e => {
    if (e.target.value === "yes") {
      // successfully made guess, need to save into redux state and move on
      // with trial
      this.props.saveGuess(this.state.guessHeight);
      this.setState({ guessHeight: 0, gavePotentialGuess: false });
    } else {
      this.setState({ gavePotentialGuess: false });
      setTimeout(function() {
        document.getElementById("guessAgainAudio").play();
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
    document.documentElement.style.setProperty("--star-top", starTop);
    document.documentElement.style.setProperty("--star-left", starLeft);

    return (
      <div>
        <img className="img-guess-star" src={star} alt="" />
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
    );
  }

  renderConfirmGuess() {
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

  renderGuess() {
    const { hasGuessed } = this.props;
    if (hasGuessed) {
      return <img className="img-guess-star" src={star} alt="" />;
    } else {
      // render slider on tree to allow subject to guess
      return (
        <div className="div-guess-slider">
          <audio id="makeGuessAudio">
            <source src={makeGuessAudio} type="audio/mpeg" />
          </audio>
          <input
            onChange={this.onChange}
            type="range"
            min="0"
            max="100"
            value={this.state.guessHeight}
            className="slider"
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
    const { ladderWidth } = this.props;

    const guessSliderLeft = "calc(50% + " + String(ladderWidth / 2) + "px)";
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

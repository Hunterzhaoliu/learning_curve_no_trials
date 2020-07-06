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
    const makeGuessAudio = document.getElementById("makeGuessAudio");
    setTimeout(function() {
      makeGuessAudio.play();
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
    } else {
      this.setState({ gavePotentialGuess: false });
      const guessAgainAudio = document.getElementById("guessAgainAudio");
      setTimeout(function() {
        guessAgainAudio.play();
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

    return (
      <div>
        <img
          style={{
            height: starHeight,
            top: starTop
          }}
          className="img-guess-star"
          src={star}
          alt=""
        />
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
        const confirmGuessAudio = document.getElementById("confirmGuessAudio");
        setTimeout(function() {
          confirmGuessAudio.play();
        }, 1000);
        return this.renderConfirmButtons();
      } else {
        // confirm that subject guessed at the top of the tree
        const confirmTopGuessAudio = document.getElementById(
          "confirmTopGuessAudio"
        );
        setTimeout(function() {
          confirmTopGuessAudio.play();
        }, 1000);
        return this.renderConfirmButtons();
      }
    }
  }

  renderGuessSlider() {
    const { ladderWidth } = this.props;

    const guessSliderLeft = "calc(50% + " + String(ladderWidth / 2) + "px)";
    return (
      <div style={{ left: guessSliderLeft }} className="slider-container">
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

  render() {
    const { hasGuessed } = this.props;
    console.log("hasGuessed = ", hasGuessed);
    if (hasGuessed) {
      return (
        <img
          style={{ top: this.state.guessHeight }}
          className="img-guess-star"
          src={star}
          alt=""
        />
      );
    } else {
      // render slider on tree to allow subject to guess
      return this.renderGuessSlider();
    }
  }
}

// function mapStateToProps(state) {
//   return {
//     experiment: state.experiment
//   };
// }

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

import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./congratulations.css";
import "./conclusion.css";

import successBackgroundEggHighLeft from "../../images/success_background_egg_high_left.png";
import successBackgroundEggLowLeft from "../../images/success_background_egg_low_left.png";
import successBackgroundEggHighRight from "../../images/success_background_egg_high_right.png";
import successBackgroundEggLowRight from "../../images/success_background_egg_low_right.png";

import point from "../../images/point.png";
import microphone from "../../images/microphone.png";
import artAudio from "../../audio/art.wav";
import mathAudio from "../../audio/math.wav";
import puzzleAudio from "../../audio/puzzle.wav";

class Congratulations extends Component {
  constructor() {
    super();

    this.state = {
      currentQuestionIndex: 0,
      questionOrder: []
    };
  }

  componentDidMount() {
    const { firstQuestion } = this.props;
    let threeQuestions = ["math", "puzzle", "art"];

    // removes the first question from the list of questions so that the order
    // of the next two questions can be determined
    threeQuestions.splice(threeQuestions.indexOf(firstQuestion), 1);
    const randomNumber = Math.random();

    if (randomNumber < 0.5) {
      this.setState({
        questionOrder: [firstQuestion, threeQuestions[0], threeQuestions[1]]
      });
    } else {
      this.setState({
        questionOrder: [firstQuestion, threeQuestions[1], threeQuestions[0]]
      });
    }
  }

  onClick = () => {
    // answered question
    const currentQuestionIndex = this.state.currentQuestionIndex;
    try {
      document.getElementById("microphone").style.display = "none";
      document.getElementById("nextQuestion").style.display = "none";

      const currentQuestion = this.state.questionOrder[currentQuestionIndex];

      this.props.recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const file = new File(
            buffer,
            "subject_" + this.props.dBID + "_" + currentQuestion + ".mp3",
            {
              type: blob.type,
              lastModified: Date.now()
            }
          );

          let formData = new FormData();
          formData.append("file", file);

          this.props.saveAudio(formData);
        });
    } catch (error) {
      console.log("Stop question recorder error = ", error);
      this.props.saveAudio("failed audio");
    }

    this.setState({
      currentQuestionIndex: currentQuestionIndex + 1
    });

    // ask next question
    if (currentQuestionIndex < 2) {
      // still have the next question to ask
      const nextQuestion = this.state.questionOrder[currentQuestionIndex + 1];
      if (nextQuestion === "math") {
        document.getElementById("mathAudio").play();
        console.log("mathAudio");
      } else if (nextQuestion === "art") {
        document.getElementById("artAudio").play();
        console.log("artAudio");
      } else {
        document.getElementById("puzzleAudio").play();
        console.log("puzzleAudio");
      }
    } else {
      // done asking questions
      this.props.advancePhase("conclusion");
    }
  };

  onAudioEnded(audioId) {
    this.props.recorder
      .start()
      .then(() => {
        console.log("starting question recording");
      })
      .catch(error => {
        console.error("start question recording error = ", error);
      });

    setTimeout(function() {
      document.getElementById("microphone").style.display = "inline-block";
    }, 2000);

    setTimeout(function() {
      document.getElementById("nextQuestion").style.display = "inline-block";
    }, 4000);
  }

  render() {
    if (!this.props.isConfettiDone) {
      const {condition, treeChoice } = this.props;
      let success_background;

      // four cases
      if (treeChoice === "left" && (condition === "tallLeftExpectHigh" ||
        condition === "tallLeftExpectLow" || condition === "tallLeftBaseline")) {
          success_background = successBackgroundEggHighLeft
      } else if (treeChoice === "left" && (condition === "tallRightExpectHigh" ||
        condition === "tallRightExpectLow" || condition === "tallRightBaseline")) {
        success_background = successBackgroundEggLowLeft
      } else if (treeChoice === "right" && (condition === "tallRightExpectHigh" ||
        condition === "tallRightExpectLow" || condition === "tallRightBaseline")) {
        success_background = successBackgroundEggHighRight
      } else {
        success_background = successBackgroundEggLowRight
      }

      return (
        <div className="div-absolute confetti">
          <img
            className="img-background"
            src={success_background}
            alt=""
            id="success_background"
          />
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
    } else {
      let micDisplay = "none";
      if (this.state.currentQuestionIndex === 0 && this.props.micReady) {
        // only need this for the first question because the audio element is
        // in Trial.js
        micDisplay = "inline-block";

        setTimeout(function() {
          document.getElementById("nextQuestion").style.display =
            "inline-block";
        }, 2000);
      }

      const currentQuestion = this.state.questionOrder[
        this.state.currentQuestionIndex
      ];
      let questionWording;

      if (currentQuestion === "math") {
        questionWording = "math question";
      } else if (currentQuestion === "art") {
        questionWording = "art activity";
      } else {
        questionWording = "puzzle";
      }

      return (
        <div className="div-absolute div-white div-congratulations-q">
          <div className="div-absolute-white-child">
            <h3 className="h3-conclusion-question">
              When you see the mic, tell me, would you rather do an EASY{" "}
              {questionWording} or a HARD {questionWording}?{" "}
            </h3>
            <img
              className="img-microphone"
              style={{ display: micDisplay }}
              id="microphone"
              src={microphone}
              alt=""
            />
            <button
              id="nextQuestion"
              value="nextQuestion"
              onClick={this.onClick}
              className="button-main button-next-question"
            >
              Next
            </button>
            <audio onEnded={e => this.onAudioEnded(e.target.id)} id="mathAudio">
              <source src={mathAudio} type="audio/wav" />
            </audio>
            <audio onEnded={e => this.onAudioEnded(e.target.id)} id="artAudio">
              <source src={artAudio} type="audio/wav" />
            </audio>
            <audio
              onEnded={e => this.onAudioEnded(e.target.id)}
              id="puzzleAudio"
            >
              <source src={puzzleAudio} type="audio/wav" />
            </audio>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    dBID: state.register.dBID,
    condition: state.register.condition,
    treeChoice: state.experiment.treeChoice
  };
}

function mapDispatchToProps(dispatch) {
  const experimentDispatchers = bindActionCreators(
    experimentActionCreators,
    dispatch
  );

  return {
    advancePhase: nextPhase => {
      experimentDispatchers.advancePhase(nextPhase);
    },
    saveAudio: audiofile => {
      experimentDispatchers.saveAudio(audiofile);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Congratulations);

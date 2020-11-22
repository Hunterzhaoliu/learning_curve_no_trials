import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import Markers from "./Markers";
import "./summary.css";

import hand from "../../images/hand.png";
import microphone from "../../images/microphone.png";
import same_2 from "../../images/same_2.png";
import better_2 from "../../images/better_2.png";

import confirmTreeAudio from "../../audio/line15_2.wav";
import askWhyAudio from "../../audio/why_tree.wav";
import reaskTreeAudio from "../../audio/line14_cut.wav";
import questionSameAudio from "../../audio/line16_same_cut.wav";
import questionBetterAudio from "../../audio/line16_better_cut.wav";
import goTopAudio from "../../audio/line15_3.wav";

import {
  SLIDER_TOP_PERCENT,
  SCREEN_TO_LADDER_BOTTOM_PERCENT,
  EGG_PLATFORM_WIDTH
} from "./constants";

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      topButton: Math.random(), // < .5 means same goes on top
      gavePotentialTreeChoice: false,
      treeChoice: "",
      reflection: ""
    };
  }

  onClickTree = e => {
    const chosenTree = e.target.value;
    this.setState({
      gavePotentialTreeChoice: true,
      treeChoice: chosenTree
    });

    // TODO
    document.getElementById("goTopAudio").play();
    console.log("goTopAudio");
    // document.getElementById("buttonLeftTree").style.display = "none";
    // document.getElementById("buttonRightTree").style.display = "none";
    //
    // document.getElementById("confirmTreeAudio").play();
    // console.log("confirmTreeAudio");
    // // hand display is done in onTimeUpdate() function
  };

  onClickConfirmation = e => {
    // remove confirmation buttons
    this.setState({
      gavePotentialTreeChoice: false
    });

    if (this.state.treeChoice === "left") {
      document.getElementById("handLeft").style.display = "none";
    } else {
      document.getElementById("handRight").style.display = "none";
    }

    if (e.target.value === "yes") {
      // ask why they picked that tree
      document.getElementById("askWhyAudio").play();
      console.log("askWhyAudio");
    } else {
      // reask which tree
      document.getElementById("reaskTreeAudio").play();
      console.log("reaskTreeAudio");
    }
  };

  onClickDoneWhy = () => {
    // confirmed why
    try {
      document.getElementById("microphone").style.display = "none";
      document.getElementById("saidWhy").style.display = "none";

      this.props.recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const file = new File(
            buffer,
            "subject_" + this.props.dBID + "_why_tree.mp3",
            {
              type: blob.type,
              lastModified: Date.now()
            }
          );

          // file needs to be in this form in order to send to backend
          // https://medium.com/@aresnik11/how-to-upload-a-file-on-the-frontend-and-send-it-using-js-to-a-rails-backend-29755afaad06
          let formData = new FormData();
          formData.append("file", file);

          this.props.saveAudio(formData);
        });
    } catch (error) {
      console.log("Stop why tree recorder error = ", error);
      this.props.saveAudio("failed audio");
    }

    // ask comprehension questions
    if (this.state.topButton < 0.5) {
      document.getElementById("questionSameAudio").play();
      console.log("questionSameAudio");
    } else {
      document.getElementById("questionBetterAudio").play();
      console.log("questionBetterAudio");
    }
  };

  onClickReflection = value => {
    this.setState({ reflection: value });

    // remove buttons
    document.getElementById("better").style.display = "none";
    document.getElementById("same").style.display = "none";

    // ensure success
    document.getElementById("goTopAudio").play();
    console.log("goTopAudio");
  };

  renderConfirmationButtons() {
    if (this.state.gavePotentialTreeChoice) {
      return (
        <div>
          <div id="treeConfirmationButtonDiv" className="div-confirmation">
            <button
              value="yes"
              onClick={this.onClickConfirmation}
              className="button-main"
            >
              Yes
            </button>
            <button
              value="no"
              onClick={this.onClickConfirmation}
              className="button-main button-right"
            >
              No
            </button>
          </div>
        </div>
      );
    }
  }

  onAudioEnded(audioId) {
    if (audioId === "confirmTreeAudio") {
      document.getElementById("treeConfirmationButtonDiv").style.display =
        "block";
    } else if (audioId === "askWhyAudio") {
      this.props.recorder
        .start()
        .then(() => {
          console.log("starting why recording");
        })
        .catch(error => {
          console.error("start why recording error = ", error);
        });

      setTimeout(function() {
        document.getElementById("microphone").style.display = "inline-block";
      }, 2000);

      setTimeout(function() {
        document.getElementById("saidWhy").style.display = "inline-block";
      }, 4000);
    } else if (audioId === "reaskTreeAudio") {
      document.getElementById("buttonLeftTree").style.display = "block";
      document.getElementById("buttonRightTree").style.display = "block";
    } else if (
      audioId === "questionSameAudio" ||
      audioId === "questionBetterAudio"
    ) {
      // display both reflection buttons
      document.getElementById("better").style.display = "block";
      document.getElementById("same").style.display = "block";
    } else if (audioId === "goTopAudio") {
      const data = {
        dBID: this.props.dBID,
        guesses: this.props.guesses,
        trialLengths: this.props.trialLengths,
        treeChoice: this.state.treeChoice,
        reflection: this.state.reflection
      };
      this.props.saveData(data);
    }
  }

  onTimeUpdate(currentTime) {
    if (currentTime > 1) {
      if (this.state.treeChoice === "left") {
        document.getElementById("handLeft").style.display = "block";
      } else {
        document.getElementById("handRight").style.display = "block";
      }
    }
  }

  render() {
    const ladderHeightPercent =
      SCREEN_TO_LADDER_BOTTOM_PERCENT - SLIDER_TOP_PERCENT;

    // marker left is 110% of eggPlatformWidth in Markers.js
    // after reaching half screen, add an additional 60% of eggPlatformWidth
    const sliderLeft = "calc(50% + " + String(EGG_PLATFORM_WIDTH * 0.6) + "px)";

    // need to decide which reflection button display on left vs. right
    let sameTop;
    let betterTop;
    if (this.state.topButton < 0.5) {
      betterTop = "45%"; // same as height of the reflection buttons
      sameTop = 0;
    } else {
      betterTop = 0;
      sameTop = "45%";
    }

    return (
      <div className="div-absolute">
        <div
          style={{
            position: "absolute",
            left: sliderLeft,
            top: String(SLIDER_TOP_PERCENT) + "%",
            height: String(ladderHeightPercent) + "%"
          }}
        >
          <Markers />
        </div>
        <img
          className="img-hand img-hand-left"
          src={hand}
          id="handLeft"
          alt=""
        />
        <img
          className="img-hand img-hand-right"
          src={hand}
          id="handRight"
          alt=""
        />
        <button
          value="left"
          onClick={this.onClickTree}
          className="button-tree left-tree"
          id="buttonLeftTree"
        />
        <button
          value="right"
          onClick={this.onClickTree}
          className="button-tree right-tree"
          id="buttonRightTree"
        />
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          onTimeUpdate={e => this.onTimeUpdate(e.target.currentTime)}
          id="confirmTreeAudio"
        >
          <source src={confirmTreeAudio} type="audio/wav" />
        </audio>
        {this.renderConfirmationButtons()}
        <audio onEnded={e => this.onAudioEnded(e.target.id)} id="askWhyAudio">
          <source src={askWhyAudio} type="audio/wav" />
        </audio>
        <button
          onClick={this.onClickDoneWhy}
          id="saidWhy"
          className="button-main button-said-why"
        >
          Next
        </button>
        <img
          className="img-microphone"
          id="microphone"
          src={microphone}
          alt=""
        />
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          id="reaskTreeAudio"
        >
          <source src={reaskTreeAudio} type="audio/wav" />
        </audio>
        <img
          style={{
            top: sameTop
          }}
          onClick={e => this.onClickReflection(e.target.id)}
          id="same"
          className="img-plants"
          src={same_2}
          alt=""
        />
        <img
          style={{
            top: betterTop
          }}
          onClick={e => this.onClickReflection(e.target.id)}
          id="better"
          className="img-plants"
          src={better_2}
          alt=""
        />
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          id="questionSameAudio"
        >
          <source src={questionSameAudio} type="audio/wav" />
        </audio>
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          id="questionBetterAudio"
        >
          <source src={questionBetterAudio} type="audio/wav" />
        </audio>
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          onTimeUpdate={e => this.onTimeUpdate(e.target.currentTime)}
          id="goTopAudio"
        >
          <source src={goTopAudio} type="audio/wav" />
        </audio>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dBID: state.register.dBID,
    guesses: state.experiment.guesses,
    trialLengths: state.experiment.trialLengths
  };
}

function mapDispatchToProps(dispatch) {
  const experimentDispatchers = bindActionCreators(
    experimentActionCreators,
    dispatch
  );

  return {
    saveData: data => {
      experimentDispatchers.saveData(data);
    },
    saveAudio: audiofile => {
      experimentDispatchers.saveAudio(audiofile);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary);

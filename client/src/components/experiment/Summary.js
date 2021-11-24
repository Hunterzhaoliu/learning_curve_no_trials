import React, { Component } from "react";
import { connect } from "react-redux";
import * as experimentActionCreators from "../../actions/experiment";
import { bindActionCreators } from "redux";
import "./summary.css";

import hand from "../../images/hand.png";
import microphone from "../../images/microphone.png";

import whichTreeAudio from "../../audio/line14_cut.wav";
import confirmTreeAudio from "../../audio/line15_2.wav";
import askWhyAudio from "../../audio/why_tree.wav";
import reaskTreeAudio from "../../audio/line14_cut.wav";
import goTopAudio from "../../audio/line15_3.wav";

class Summary extends Component {
  constructor() {
    super();
    this.state = {
      gavePotentialTreeChoice: false,
      treeChoice: ""
    };
  }

  componentDidMount() {
    document.getElementById("whichTreeAudio").play();
  }

  onClickTree = e => {
    const chosenTree = e.target.value;
    this.setState({
      gavePotentialTreeChoice: true,
      treeChoice: chosenTree
    });

    document.getElementById("buttonLeftTree").style.display = "none";
    document.getElementById("buttonRightTree").style.display = "none";

    document.getElementById("confirmTreeAudio").play();
    console.log("confirmTreeAudio");
    // hand display is done in onTimeUpdate() function
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
    if (audioId === "whichTreeAudio") {
      document.getElementById("buttonLeftTree").style.display = "block";
      document.getElementById("buttonRightTree").style.display = "block";
    } else if (audioId === "confirmTreeAudio") {
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
    } else if (audioId === "goTopAudio") {
      const data = {
        dBID: this.props.dBID,
        guesses: this.props.guesses,
        trialLengths: this.props.trialLengths,
        treeChoice: this.state.treeChoice
      };

      // advance to next phase in the action
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
    return (
      <div className="div-absolute">
        <audio
          onEnded={e => this.onAudioEnded(e.target.id)}
          id="whichTreeAudio"
        >
          <source src={whichTreeAudio} type="audio/wav" />
        </audio>
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

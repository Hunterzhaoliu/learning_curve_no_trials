import React, { Component } from "react";
import { connect } from "react-redux";
import congratulationsAudio from "../../audio/bell.mp3";

class Congratulations extends Component {
  render() {
    const { showCongratulations } = this.props;
    if (!showCongratulations) {
      return <div />;
    } else {
      return (
        <div>
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

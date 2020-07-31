import React, { Component } from "react";
import { connect } from "react-redux";
// import "./credit.css";

class Conclusion extends Component {
  render() {
    return (
      <div className="div-absolute">
        <a href="https://www.freepik.com/vectors/background">
          Background vector created by freepik - www.freepik.com
        </a>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Conclusion);

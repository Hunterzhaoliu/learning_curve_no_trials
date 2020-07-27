import React, { Component } from "react";
import { connect } from "react-redux";
import "./test.css";

import star from "../images/star.png";
import hand from "../images/hand.png";

class Test extends Component {
  render() {
    return (
      <div
        style={{ backgroundColor: "rgb(95,62,44)" }}
        className="div-absolute"
      >
        <img
          style={{
            position: "absolute",
            height: "200px",
            top: "60%",
            marginLeft: "80px"
          }}
          src={hand}
          alt=""
        />
        <img
          style={{ height: "200px", position: "relative", marginTop: "50%" }}
          src={star}
          alt=""
        />
        <div>
          <button className="button-main button-confirm-guess">Yes</button>
        </div>
        <div>
          <button className="button-main button-confirm-guess">No</button>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  null
)(Test);

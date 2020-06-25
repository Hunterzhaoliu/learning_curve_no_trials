import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";

class Password extends Component {
  render() {
    return (
      <Row>
        <Col>Hello</Col>
      </Row>
    );
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    step: state.initialize.step
  };
}

export default connect(
  mapStateToProps,
  null
)(Password);

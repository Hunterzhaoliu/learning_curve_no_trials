import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import "./error-message.css";

class ErrorMessage extends Component {
  render() {
    const { message, hasError } = this.props;
    if (hasError) {
      return (
        <Row type="flex" justify="start">
          <Col>
            <p className="p-error-message">{message}</p>
          </Col>
        </Row>
      );
    } else {
      return <div />;
    }
  }
}

export default connect(
  null,
  null
)(ErrorMessage);

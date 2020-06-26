import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import ErrorMessage from "./ErrorMessage";
import "./input-field.css";

class InputField extends Component {
  render() {
    const { label, hasError, errorMessage, width, id, type } = this.props;

    let value = this.props.value;

    return (
      <div>
        <Row type="flex" justify="start">
          <Col span={24}>
            <input
              className="input-input-field"
              placeholder={label}
              value={value}
              onChange={this.props.onChange}
              style={{ width: width }}
              id={id}
              type={type}
            />
          </Col>
        </Row>
        <ErrorMessage hasError={hasError} message={errorMessage} />
      </div>
    );
  }
}

export default connect(
  null,
  null
)(InputField);

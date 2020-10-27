import React, { Component } from "react";
import { connect } from "react-redux";
import * as registerActionCreators from "../actions/register";
import { bindActionCreators } from "redux";
import { Row, Col, DatePicker } from "antd";
import InputField from "./input/InputField";
import labLogo from "../images/lab_logo.png";
import "./code.css";

class Code extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
      childBirthDate: "",
      codeError: false
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.codeError !== previousProps.codeError) {
      this.setState({
        codeError: this.props.codeError
      });
    }
  }

  onSubmitCode = e => {
    // prevent cleaning the form
    e.preventDefault();
    this.props.submitCode(this.state.code, this.state.childBirthDate);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeChildBirthDate = (_, dateString) => {
    this.setState({
      childBirthDate: dateString
    });
  };

  render() {
    document.documentElement.style.setProperty(
      "--window-width-minus-padding",
      "calc(100% - 40px)"
    );

    return (
      <div className="screen-edge-padding">
        <Row type="flex" justify="center">
          <Col>
            <img
              className="img-lab-logo"
              src={labLogo}
              alt="Changing Brain Lab"
            />
          </Col>
        </Row>
        <Row className="row-upper-30-padding" type="flex" justify="start">
          <Col>
            <h5 className="text-align-left">
              Please enter the code you received in your email:
            </h5>
          </Col>
        </Row>
        <form onSubmit={this.onSubmitCode}>
          <Row className="row-upper-15-padding" type="flex" justify="start">
            <Col span={24}>
              <InputField
                value={this.state.code}
                label="Code:"
                errorMessage="That doesn't seem to be a valid code."
                hasError={this.state.codeError}
                onChange={this.onChange}
                width={"100%"}
                id="code"
                type="text"
              />
            </Col>
          </Row>
          <Row className="row-upper-15-padding" type="flex" justify="start">
            <Col span={24}>
              <DatePicker
                className="date-picker"
                onChange={this.onChangeChildBirthDate}
                allowClear={false}
                format={"MM/DD/YYYY"}
                size="large"
                placeholder="Child's Birth Date"
              />
            </Col>
          </Row>
          <Row
            className="row-upper-30-padding"
            type="flex"
            justify="center"
            align="middle"
          >
            <Col>
              <button className="button-main" type="submit" disabled={false}>
                Submit
              </button>
            </Col>
          </Row>
        </form>
        <Row className="row-upper-30-padding" type="flex" justify="start">
          <Col>
            <h6 className="text-align-left">
              Interested in participating? Click{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="http://www.allysonmackey.com/"
              >
                here
              </a>
              .
            </h6>
          </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    codeError: state.register.codeError
  };
}

function mapDispatchToProps(dispatch) {
  const registerDispatchers = bindActionCreators(
    registerActionCreators,
    dispatch
  );

  return {
    submitCode: (code, childBirthDate) => {
      registerDispatchers.submitCode(code, childBirthDate);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Code);

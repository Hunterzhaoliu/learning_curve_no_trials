import React, { Component } from "react";
import { connect } from "react-redux";
import * as registerActionCreators from "../actions/register";
import { bindActionCreators } from "redux";
import { Row, Col } from "antd";
import InputField from "./input/InputField";
import labLogo from "../images/lab_logo.png";
import "./code.css";

class Code extends Component {
  constructor() {
    super();
    this.state = {
      code: "",
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
    this.props.checkCode(this.state.code);
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
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
            <h5 className="h5-align-left">
              Please enter the code you received in your email:
            </h5>
          </Col>
        </Row>
        <Row className="row-upper-15-padding" type="flex" justify="start">
          <Col span={24}>
            <form onSubmit={this.onSubmitCode}>
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
            </form>
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
        <Row className="row-upper-30-padding" type="flex" justify="start">
          <Col>
            <h6 className="h5-align-left">
              Interested in participating? Click{" "}
              <a target="_blank" href="http://www.allysonmackey.com/">
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
    step: state.initialize.step,
    codeError: state.register.codeError
  };
}

function mapDispatchToProps(dispatch) {
  const registerDispatchers = bindActionCreators(
    registerActionCreators,
    dispatch
  );

  return {
    checkCode: userCode => {
      registerDispatchers.checkCode(userCode);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Code);

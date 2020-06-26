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
      code: "hello",
      codeError: false
    };
  }

  componentDidUpdate(previousProps) {
    console.log("this.props.codeError = ", this.props.codeError);

    if (this.props.codeError !== previousProps.codeError) {
      this.setState({
        codeError: this.props.codeError
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    console.log("process.env render = ", process.env);

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
        <Row
          style={{ padding: "60px 0px 0px" }}
          type="flex"
          justify="center"
          align="middle"
        >
          <Col>
            <button
              className="button-main"
              type="submit"
              disabled={false}
              onClick={() => this.props.checkCode(this.state.code)}
            >
              Submit
            </button>
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

import React, { Component } from "react";
import { connect } from "react-redux";
import * as registerActionCreators from "../actions/register";
import { bindActionCreators } from "redux";
import { Row, Col, DatePicker } from "antd";
import InputField from "./input/InputField";
import "./consent-form.css";

class ConsentForm extends Component {
  constructor() {
    super();
    const today = new Date();
    const date =
      today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();

    this.state = {
      childName: "",
      childBirthDate: "",
      signature: "",
      signatureDate: date,
      videoPermission: 1,
      phoneNumber: "",
      email: "",
      mailingAddress: "",
      consentError: {}
    };
  }

  componentDidUpdate(previousProps) {
    if (this.props.consentError !== previousProps.consentError) {
      this.setState({
        consentError: this.props.consentError
      });
    }
  }

  onSubmit = e => {
    // prevent cleaning the form
    e.preventDefault();
    // need to create a copy of the state to allow for errors to be removed in
    // the actions
    this.props.register(JSON.parse(JSON.stringify(this.state)));
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeDate = (_, dateString) => {
    this.setState({
      childBirthDate: dateString
    });
  };

  render() {
    console.log(
      "String(this.props.windowWidth) + 'px' = ",
      String(this.props.windowWidth) + "px"
    );
    document.documentElement.style.setProperty(
      "--window-width",
      String(this.props.windowWidth - 40) + "px"
    );

    return (
      <div className="screen-edge-padding">
        <Row type="flex" justify="center">
          <Col>
            <h3>Parental Consent Form</h3>
          </Col>
        </Row>
        <Row className="row-upper-30-padding" type="flex" justify="start">
          <Col>
            <p>Consent information</p>
          </Col>
        </Row>
        <form onSubmit={this.onSubmit}>
          <Row className="row-upper-15-padding" type="flex" justify="start">
            <Col span={24}>
              <InputField
                value={this.state.childName}
                label="Child's Name:"
                errorMessage="That doesn't seem to be a valid name."
                hasError={this.state.consentError.childNameError}
                onChange={this.onChange}
                width={"100%"}
                id="childName"
                type="text"
              />
            </Col>
          </Row>
          <Row className="row-upper-15-padding" type="flex" justify="start">
            <Col span={24}>
              <DatePicker
                className="date-picker"
                onChange={this.onChangeDate}
                allowClear={false}
                format={"MM/DD/YYYY"}
                size="large"
                placeholder="Child's Birth Date"
              />
            </Col>
          </Row>
          <Row
            className="row-upper-15-padding"
            type="flex"
            justify="start"
            align="middle"
          >
            <Col span={16}>
              <InputField
                value={this.state.signature}
                label="Signature:"
                errorMessage="That doesn't seem to be a valid signature."
                hasError={this.state.consentError.signatureError}
                onChange={this.onChange}
                width={"100%"}
                id="signature"
                type="text"
              />
            </Col>
            <Col offset={1}>
              <h6>{this.state.signatureDate}</h6>
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    windowWidth: state.initialize.windowWidth,
    consentError: state.register.consentError
  };
}

function mapDispatchToProps(dispatch) {
  const registerDispatchers = bindActionCreators(
    registerActionCreators,
    dispatch
  );

  return {
    register: (signature, date) => {
      registerDispatchers.register(signature, date);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsentForm);

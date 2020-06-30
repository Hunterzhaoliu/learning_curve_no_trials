import React, { Component } from "react";
import { connect } from "react-redux";
import * as registerActionCreators from "../../actions/register";
import { bindActionCreators } from "redux";
import { Row, Col, DatePicker, Radio } from "antd";
import ConsentInformation from "./ConsentInformation";
import InputField from "../input/InputField";
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
      videoPermission: 0,
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
    this.props.registerConsent(JSON.parse(JSON.stringify(this.state)));
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onChangeDate = (_, dateString) => {
    this.setState({
      childBirthDate: dateString
    });
  };

  onChangeVideoPermission = e => {
    this.setState({ videoPermission: e.target.value });
  };

  render() {
    document.documentElement.style.setProperty(
      "--window-width-minus-padding",
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
            <ConsentInformation />
          </Col>
        </Row>
        <form onSubmit={this.onSubmit}>
          <Row className="row-upper-15-padding" type="flex" justify="start">
            <Col span={24}>
              <InputField
                value={this.state.childName}
                label="Child's Name:"
                errorMessage="That doesn't seem to be a valid name."
                hasError={this.state.consentError.childName}
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
                hasError={this.state.consentError.signature}
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
            className="row-upper-30-padding text-align-left"
            type="flex"
            justify="start"
          >
            <Col span={24}>
              <h6>
                <b>Video Permissions</b>
              </h6>
            </Col>
          </Row>
          <Row className="row-upper-15-padding" type="flex" justify="start">
            <Col span={24}>
              <Radio.Group
                onChange={this.onChangeVideoPermission}
                value={this.state.videoPermission}
              >
                <Radio value={1} className="text-align-left">
                  <h6>
                    <b>Level 1: Private</b>
                  </h6>
                  <p>
                    This privacy level ensures that your video clips will be
                    viewed only be authorized members of our lab.
                  </p>
                </Radio>
                <Radio className="text-align-left" value={2}>
                  <h6>
                    <b>Level 2: Scientific and Educational</b>
                  </h6>
                  <p>
                    This privacy level gives permission to share your video
                    clips with other researchers or students for scientific or
                    educational purposes, for example, we might show a video
                    clip in a talk in a scientific conference or in an
                    undergraduate class about cognitive development. Selecting
                    this option includes level 1 permissions.
                  </p>
                </Radio>
                <Radio className="text-align-left" value={3}>
                  <h6>
                    <b>Level 3: Publicity</b>
                  </h6>
                  <p>
                    This privacy level gives permission to use your video clips
                    to communicate about developmental students to the public,
                    for example, we may use your video in a press release or on
                    our website. This video will never be used for commercial
                    purposes. Selecting this option includes level 1 and level 2
                    permissions.
                  </p>
                </Radio>
                <Radio id="videoPermission" className="float-left" value={4}>
                  <h6>
                    <b>No Video</b>
                  </h6>
                </Radio>
              </Radio.Group>
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
    registerConsent: registerInfo => {
      registerDispatchers.registerConsent(registerInfo);
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConsentForm);

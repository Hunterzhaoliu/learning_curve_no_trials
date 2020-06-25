import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";

const { Content } = Layout;

class Landing extends Component {
  renderDisplay() {
    // const { step } = this.props;
    return <div>hello </div>;
  }

  render() {
    return <Content className="content">{this.renderDisplay()}</Content>;
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps,
  null
)(Landing);

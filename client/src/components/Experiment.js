import React, { Component } from "react";
import { connect } from "react-redux";
// import * as experimentActionCreators from "../actions/experiment";
// import { bindActionCreators } from "redux";
import { Row, Col } from "antd";
import "./experiment.css";
import background from "../images/background.png";

class Experiment extends Component {
  constructor() {
    super();
    this.state = {
      height: 0
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    // const { windowHeight } = this.props;
    return (
      <div>
        <Row type="flex" justify="center">
          <Col>
            <img className="img-background" src={background} alt="" />
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col>hello </Col>
        </Row>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    windowHeight: state.initialize.windowHeight
  };
}
//
// function mapDispatchToProps(dispatch) {
//   const experimentDispatchers = bindActionCreators(
//     experimentActionCreators,
//     dispatch
//   );
//
//   return {
//     checkCode: userCode => {
//       experimentDispatchers.checkCode(userCode);
//     }
//   };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Experiment);

export default connect(
  mapStateToProps,
  null
)(Experiment);

import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as initializeActionCreators from "../actions/initialize";
import { connect } from "react-redux";
import Landing from "./Landing";
import history from "./history";
import { Layout } from "antd";
import "./app.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.props.updateWindowDimensions(window.innerWidth, window.innerHeight);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  // allows to check for why component is re rendering
  //   componentDidUpdate(prevProps, prevState) {
  //   Object.entries(this.props).forEach(([key, val]) =>
  //     prevProps[key] !== val && console.log(`Prop '${key}' changed`)
  //   );
  //   if (this.state) {
  //     Object.entries(this.state).forEach(([key, val]) =>
  //       prevState[key] !== val && console.log(`State '${key}' changed`)
  //     );
  //   }
  // }

  render() {
    return (
      <Router history={history}>
        <Layout style={{ height: "100vh" }}>
          <Route exact path="/" component={Landing} />
        </Layout>
      </Router>
    );
  }
}

function mapDispatchToProps(dispatch) {
  const initializeDispatchers = bindActionCreators(
    initializeActionCreators,
    dispatch
  );

  return {
    updateWindowDimensions: (newWindowWidth, newWindowHeight) => {
      initializeDispatchers.updateWindowDimensions(
        newWindowWidth,
        newWindowHeight
      );
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(App);

import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import Landing from "./Landing";
import history from "./history";
import { Layout } from "antd";
import "./app.css";

class App extends Component {
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

export default connect(
  null,
  null
)(App);

import React, { Component } from "react";
import { connect } from "react-redux";
import Introduction from "./Introduction";
import Trial from "./Trial";
import Summary from "./Summary";
import background from "../../images/background.png";
import "./experiment.css";

class Experiment extends Component {
  renderExperiment() {
    const { condition, trial, treeChoice } = this.props;
    if (trial === 0) {
      return <Introduction />;
    } else if (trial < 5 || treeChoice !== "") {
      let eggFallPercentage;
      if (treeChoice !== "") {
        eggFallPercentage = 110;
      } else if (condition === 1) {
        eggFallPercentage = 80;
      } else if (condition === 2) {
        eggFallPercentage = trial * 20;
      }
      return (
        <Trial eggFallPercentage={eggFallPercentage} treeChoice={treeChoice} />
      );
    } else {
      // subject finished experiment, need to go over results and ask for desired
      // tree
      return <Summary />;
    }
  }

  render() {
    return (
      <div>
        <img className="img-background" src={background} alt="" />
        {this.renderExperiment()}
      </div>
    );
  }
}

/*
So we have a state and a UI(with props).
This function gives the UI the parts of the state it will need to display.
*/
function mapStateToProps(state) {
  return {
    condition: state.register.condition,
    trial: state.experiment.trial,
    treeChoice: state.experiment.treeChoice
  };
}

export default connect(
  mapStateToProps,
  null
)(Experiment);

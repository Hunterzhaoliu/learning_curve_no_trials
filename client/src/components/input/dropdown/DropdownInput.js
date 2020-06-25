import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Select } from "antd";
import _ from "lodash";
import ErrorMessage from "../ErrorMessage";
import "./dropdown.css";

const { Option } = Select;

const dropdownOptions = {
  location: ["dallas", "charlotte", "denver"],
  lob: ["hr", "atc", "dis", "ort", "bank", "ias", "atc", "rcs", "ncc"]
};

class DropdownInput extends Component {
  renderOptions(id) {
    return _.map(dropdownOptions[id], (option, optionIndex) => {
      return (
        <Option key={optionIndex} value={option}>
          {option}
        </Option>
      );
    });
  }

  render() {
    const { value, label, hasError, errorMessage, width, id } = this.props;

    return (
      <div>
        <Row type="flex" justify="start" align="bottom">
          <Col span={7}>
            <h4 className="h4-label">{label}</h4>
          </Col>
          <Col offset={1}>
            <Select
              showSearch
              id={id}
              value={value}
              style={{ width: width }}
              optionFilterProp="children"
              onChange={newValue => this.props.onChange(newValue, id)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.renderOptions(id)}
            </Select>
          </Col>
        </Row>
        <ErrorMessage hasError={hasError} message={errorMessage} />
      </div>
    );
  }
}

export default connect(
  null,
  null
)(DropdownInput);

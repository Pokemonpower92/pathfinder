import React, { Component } from "react";

import "./styles/Node.css";

export class Node extends Component {
  render() {
    const { row, col, type } = this.props;
    return (
      <div
        className={"node" + type}
        onClick={this.props.onClick.bind(this)}
      ></div>
    );
  }
}

export default Node;
